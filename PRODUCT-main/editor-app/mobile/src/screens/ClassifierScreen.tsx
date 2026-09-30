import { useState, useRef, useCallback } from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import {
  ArrowLeft,
  Lightning,
  CheckCircle,
  WarningCircle,
  Plus,
  X,
  ChatCircle,
  Palette,
  Video,
  Package,
  Truck,
  SealQuestion,
  Link,
  FileText,
  ArrowSquareOut,
  File,
  Microphone,
  Image,
} from 'phosphor-react-native';
import { colors, fonts, radius, spacing } from '../theme';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { useClassifier } from '../shared/useClassifier';
import { aiApi } from '../shared/api';
import { useAuthStore } from '../shared/auth.store';
import type { ClassificationResult } from '../shared/api';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Props {
  projectId:   string;
  projectName: string;
  onBack:      () => void;
  onApply:     (patch: ProjectPatch) => void;
}

export interface ProjectPatch {
  notes?:        string;
  deadline?:     Date;
  deliverables?: { label: string; done: boolean }[];
  status?:       'pendiente' | 'en progreso' | 'completado';
  links?:        string[];
}

interface DetectedLink {
  url:      string;
  name:     string;
  kind:     LinkKind;
  fetching: boolean;
  content:  string | null;
  error:    string | null;
}

interface MediaItem {
  uri:       string;
  name:      string;
  kind:      'audio' | 'image';
  processing: boolean;
  result:    string | null;   // transcription or image description
  error:     string | null;
}

type LinkKind =
  | 'gdoc' | 'gdrive' | 'tiktok' | 'instagram'
  | 'youtube' | 'wetransfer' | 'dropbox'
  | 'vimeo' | 'notion' | 'figma' | 'other';

// ─── Link utilities ───────────────────────────────────────────────────────────

const URL_REGEX = /https?:\/\/[^\s"'<>]+/g;

function detectLinks(text: string): string[] {
  return Array.from(new Set(text.match(URL_REGEX) ?? []));
}

function classifyLink(url: string): LinkKind {
  if (/docs\.google\.com\/document/.test(url)) return 'gdoc';
  if (/drive\.google\.com/.test(url))          return 'gdrive';
  if (/tiktok\.com/.test(url))                 return 'tiktok';
  if (/instagram\.com/.test(url))              return 'instagram';
  if (/youtu\.be|youtube\.com/.test(url))      return 'youtube';
  if (/wetransfer\.com/.test(url))             return 'wetransfer';
  if (/dropbox\.com/.test(url))                return 'dropbox';
  if (/vimeo\.com/.test(url))                  return 'vimeo';
  if (/notion\.so/.test(url))                  return 'notion';
  if (/figma\.com/.test(url))                  return 'figma';
  return 'other';
}

function inferLinkName(url: string, kind: LinkKind): string {
  try {
    const u = new URL(url);
    if (kind === 'gdoc')   return 'Google Doc';
    if (kind === 'gdrive') {
      const name = u.searchParams.get('name');
      return name ? decodeURIComponent(name) : 'Google Drive';
    }
    const tikMatch = url.match(/@([\w.]+)\/video\/(\d+)/);
    if (tikMatch) return `TikTok @${tikMatch[1]}`;
    const igMatch = url.match(/\/(p|reel|tv)\/([\w-]+)/);
    if (igMatch)  return `Instagram ${igMatch[1] === 'p' ? 'post' : igMatch[1]}`;
    if (kind === 'youtube') return 'YouTube video';
    const wtMatch = url.match(/wetransfer\.com\/downloads\/([\w]+)/);
    if (wtMatch)  return `WeTransfer ${wtMatch[1].slice(0, 8)}`;
    const dbMatch = url.match(/dropbox\.com\/.+\/([^?]+)/);
    if (dbMatch)  return decodeURIComponent(dbMatch[1]);
    const vmMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vmMatch)  return `Vimeo ${vmMatch[1]}`;
    const notMatch = url.match(/notion\.so\/(?:[\w-]+\/)?([\w-]+?)(?:-[\da-f]{32})?(?:\?|$)/);
    if (notMatch) return decodeURIComponent(notMatch[1].replace(/-/g, ' '));
    const figMatch = url.match(/figma\.com\/(?:file|design)\/([\w]+)\/([^/?]+)/);
    if (figMatch) return decodeURIComponent(figMatch[2].replace(/-/g, ' '));
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts.length > 0) {
      return decodeURIComponent(parts[parts.length - 1])
        .replace(/\.[a-z0-9]{2,5}$/i, '')
        .replace(/[-_]/g, ' ');
    }
    return u.hostname;
  } catch {
    return url.slice(0, 40);
  }
}

function LinkIcon({ kind, size = 14 }: { kind: LinkKind; size?: number }) {
  const w = 'fill' as const;
  switch (kind) {
    case 'gdoc':      return <FileText size={size} color="#4285F4" weight={w} />;
    case 'gdrive':    return <File     size={size} color="#34A853" weight={w} />;
    case 'tiktok':    return <Video    size={size} color="#fff"    weight={w} />;
    case 'instagram': return <Video    size={size} color="#E1306C" weight={w} />;
    case 'youtube':   return <Video    size={size} color="#FF0000" weight={w} />;
    case 'vimeo':     return <Video    size={size} color="#1AB7EA" weight={w} />;
    case 'notion':    return <FileText size={size} color="#fff"    weight={w} />;
    case 'figma':     return <Palette  size={size} color="#A259FF" weight={w} />;
    default:          return <Link     size={size} color={colors.primaryLight} weight={w} />;
  }
}

async function fetchGoogleDocContent(url: string): Promise<string> {
  const idMatch = url.match(/\/document\/d\/([\w-]+)/);
  if (!idMatch) throw new Error('ID no encontrado');
  const exportUrl = `https://docs.google.com/document/d/${idMatch[1]}/export?format=txt`;
  const res = await fetch(exportUrl);
  if (!res.ok) throw new Error(`Documento privado (${res.status})`);
  const text = await res.text();
  return text.slice(0, 4000);
}

// ─── Build project patch ─────────────────────────────────────────────────────

function buildPatch(result: ClassificationResult, links: DetectedLink[], media: MediaItem[]): ProjectPatch {
  const patch: ProjectPatch = {};

  const noteLines: string[] = [];
  noteLines.push(`📋 Resumen: ${result.summary}`);
  if (result.colorimetry.log_profile)    noteLines.push(`🎨 Log profile: ${result.colorimetry.log_profile}`);
  if (result.colorimetry.lut_required)   noteLines.push(`🎨 LUT: ${result.colorimetry.lut_required}`);
  if (result.colorimetry.grade_notes)    noteLines.push(`🎨 Grade: ${result.colorimetry.grade_notes}`);
  if (result.colorimetry.mood_palette)   noteLines.push(`🎨 Mood: ${result.colorimetry.mood_palette}`);
  if (result.colorimetry.reference_film) noteLines.push(`🎬 Referencia: ${result.colorimetry.reference_film}`);
  if (result.editorial.edit_style)       noteLines.push(`✂️ Estilo: ${result.editorial.edit_style}`);
  if (result.editorial.rhythm)           noteLines.push(`✂️ Ritmo: ${result.editorial.rhythm}`);
  if (result.audio?.music_ref)           noteLines.push(`🎵 Música: ${result.audio.music_ref}`);
  if (result.audio?.voiceover)           noteLines.push(`🎙️ Voz: ${result.audio.voiceover}`);
  if (result.delivery.platform)          noteLines.push(`📱 Plataforma: ${result.delivery.platform}`);
  if (result.delivery.aspect_ratio)      noteLines.push(`📐 Aspect ratio: ${result.delivery.aspect_ratio}`);
  if (result.brand.campaign)             noteLines.push(`🏷️ Campaña: ${result.brand.campaign}`);

  if (links.length > 0) {
    noteLines.push('');
    noteLines.push('🔗 Archivos de referencia:');
    links.forEach(l => {
      const status = l.content ? '(contenido extraído)' : l.error ? '(solo referencia)' : '';
      noteLines.push(`  • ${l.name} ${status}`.trim());
    });
  }

  if (media.length > 0) {
    noteLines.push('');
    noteLines.push('🎙️ Media analizada:');
    media.forEach(m => {
      const tag = m.kind === 'audio' ? '🎙️' : '🖼️';
      const status = m.result
        ? `(${m.kind === 'audio' ? 'transcripción' : 'descripción'} disponible)`
        : '(solo referencia)';
      noteLines.push(`  ${tag} ${m.name} ${status}`);
    });
  }

  patch.notes = noteLines.join('\n');

  if (result.delivery.deadline) {
    const d = new Date(result.delivery.deadline);
    if (!isNaN(d.getTime())) {
      patch.deadline = d;
    } else {
      patch.notes += '\n⏰ Deadline: ' + result.delivery.deadline;
    }
  }

  const deliverables: { label: string; done: boolean }[] = [];
  if (result.editorial.duration_target)
    deliverables.push({ label: `Duración objetivo: ${result.editorial.duration_target}`, done: false });
  if (result.delivery.platform)
    deliverables.push({ label: `Exportar para ${result.delivery.platform}`, done: false });
  if (result.delivery.aspect_ratio)
    deliverables.push({ label: `Aspecto: ${result.delivery.aspect_ratio}`, done: false });
  if (result.colorimetry.lut_required && result.colorimetry.lut_required !== 'no')
    deliverables.push({ label: `Aplicar LUT: ${result.colorimetry.lut_required}`, done: false });
  if (result.audio?.music_ref)
    deliverables.push({ label: `Música: ${result.audio.music_ref}`, done: false });

  links.forEach(l => {
    if (l.kind === 'gdoc' || l.kind === 'notion')
      deliverables.push({ label: `Revisar brief: ${l.name}`, done: false });
    else if (['gdrive', 'dropbox', 'wetransfer'].includes(l.kind))
      deliverables.push({ label: `Descargar material: ${l.name}`, done: false });
    else if (['tiktok', 'instagram', 'youtube', 'vimeo'].includes(l.kind))
      deliverables.push({ label: `Ver referencia: ${l.name}`, done: false });
    else if (l.kind === 'figma')
      deliverables.push({ label: `Revisar diseño: ${l.name}`, done: false });
  });

  if (deliverables.length > 0) patch.deliverables = deliverables;
  if (result.editorial.priority === 'alta') patch.status = 'en progreso';
  if (links.length > 0) patch.links = links.map(l => l.url);

  // Media deliverables
  media.forEach(m => {
    if (m.kind === 'audio') {
      deliverables.push({ label: `Revisar audio: ${m.name}`, done: false });
    } else {
      deliverables.push({ label: `Aplicar referencia visual: ${m.name}`, done: false });
    }
  });

  return patch;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ConfidencePill({ value }: { value: number }) {
  const pct   = Math.round(value * 100);
  const high  = value >= 0.8;
  const mid   = value >= 0.6;
  const bg    = high ? 'rgba(16,185,129,0.15)' : mid ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)';
  const color = high ? '#34D399' : mid ? '#FBBF24' : '#F87171';
  const label = high ? 'Alta confianza' : mid ? 'Confianza media' : 'Baja confianza';
  return (
    <View style={[S.confidencePill, { backgroundColor: bg, borderColor: color + '40' }]}>
      <View style={[S.confidenceDot, { backgroundColor: color }]} />
      <Text style={[S.confidenceText, { color }]}>{label} · {pct}%</Text>
    </View>
  );
}

function PriorityBadge({ value }: { value: 'alta' | 'media' | 'baja' }) {
  const map = {
    alta:  { bg: 'rgba(239,68,68,0.15)',   border: '#EF444440', color: '#F87171', label: 'PRIORIDAD ALTA'  },
    media: { bg: 'rgba(245,158,11,0.15)',  border: '#F59E0B40', color: '#FBBF24', label: 'PRIORIDAD MEDIA' },
    baja:  { bg: 'rgba(156,163,175,0.12)', border: '#9CA3AF30', color: '#9CA3AF', label: 'PRIORIDAD BAJA'  },
  };
  const s = map[value];
  return (
    <View style={[S.priorityBadge, { backgroundColor: s.bg, borderColor: s.border }]}>
      <Text style={[S.priorityText, { color: s.color }]}>{s.label}</Text>
    </View>
  );
}

function Section({ icon, title, children, accent = colors.primaryLight }: {
  icon: React.ReactNode; title: string; children: React.ReactNode; accent?: string;
}) {
  return (
    <View style={S.section}>
      <View style={S.sectionHeader}>
        <View style={[S.sectionIconWrap, { backgroundColor: accent + '20' }]}>{icon}</View>
        <Text style={S.sectionTitle}>{title}</Text>
      </View>
      <View style={S.sectionBody}>{children}</View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <View style={S.row}>
      <Text style={S.rowLabel}>{label}</Text>
      <Text style={S.rowValue}>{value}</Text>
    </View>
  );
}

function LinkChip({ link, onRemove }: { link: DetectedLink; onRemove: () => void }) {
  return (
    <View style={S.linkChip}>
      <View style={S.linkChipIcon}>
        <LinkIcon kind={link.kind} size={13} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={S.linkChipName} numberOfLines={1}>{link.name}</Text>
        {link.fetching && <Text style={S.linkChipStatus}>Leyendo contenido…</Text>}
        {link.content  && <Text style={S.linkChipStatusOk}>Contenido extraído ✓</Text>}
        {link.error    && <Text style={S.linkChipStatusErr}>Solo referencia guardada</Text>}
      </View>
      <Pressable onPress={() => Linking.openURL(link.url)} hitSlop={8}>
        <ArrowSquareOut size={13} color={colors.textSecondary} weight="bold" />
      </Pressable>
      <Pressable onPress={onRemove} hitSlop={8}>
        <X size={12} color={colors.textSecondary} weight="bold" />
      </Pressable>
    </View>
  );
}

function MediaChip({ item, onRemove }: { item: MediaItem; onRemove: () => void }) {
  const isAudio = item.kind === 'audio';
  const iconColor = isAudio ? '#A78BFA' : '#34D399';
  return (
    <View style={[S.linkChip, { borderColor: iconColor + '40' }]}>
      <View style={[S.linkChipIcon, { backgroundColor: iconColor + '20' }]}>
        {isAudio
          ? <Microphone size={13} color={iconColor} weight="fill" />
          : <Image     size={13} color={iconColor} weight="fill" />
        }
      </View>
      <View style={{ flex: 1 }}>
        <Text style={S.linkChipName} numberOfLines={1}>{item.name}</Text>
        {item.processing && (
          <Text style={S.linkChipStatus}>
            {isAudio ? 'Transcribiendo con Whisper…' : 'Analizando con Llama Vision…'}
          </Text>
        )}
        {item.result && (
          <Text style={S.linkChipStatusOk}>
            {isAudio ? 'Transcripción lista ✓' : 'Imagen analizada ✓'}
          </Text>
        )}
        {item.error && (
          <Text style={S.linkChipStatusErr}>Solo referencia guardada</Text>
        )}
      </View>
      <Pressable onPress={onRemove} hitSlop={8}>
        <X size={12} color={colors.textSecondary} weight="bold" />
      </Pressable>
    </View>
  );
}

function MessageChip({ text, onRemove }: { text: string; onRemove: () => void }) {
  return (
    <View style={S.chip}>
      <Text style={S.chipText} numberOfLines={2}>{text}</Text>
      <Pressable onPress={onRemove} hitSlop={8} style={S.chipRemove}>
        <X size={12} color={colors.textSecondary} weight="bold" />
      </Pressable>
    </View>
  );
}

function ResultView({ result, links }: { result: ClassificationResult; links: DetectedLink[] }) {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(16)).current;
  useState(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 340, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 340, easing: Easing.out(Easing.quad), useNativeDriver: true }),
    ]).start();
  });
  return (
    <Animated.View style={[{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }, { gap: 14 }]}>
      <View style={S.summaryCard}>
        <View style={S.summaryTop}>
          <CheckCircle size={18} color="#34D399" weight="fill" />
          <Text style={S.summaryLabel}>Resultado del clasificador</Text>
          <ConfidencePill value={result.confidence} />
        </View>
        <Text style={S.summaryText}>{result.summary}</Text>
        {result.editorial.priority !== 'media' && <PriorityBadge value={result.editorial.priority} />}
      </View>

      {links.length > 0 && (
        <Section icon={<Link size={14} color="#60A5FA" weight="bold" />} title="Archivos detectados" accent="#60A5FA">
          {links.map((l, i) => (
            <View key={i} style={S.resultLinkRow}>
              <View style={S.linkChipIcon}><LinkIcon kind={l.kind} size={13} /></View>
              <Text style={S.rowValue} numberOfLines={1}>{l.name}</Text>
              {l.content && <Text style={S.linkChipStatusOk}>extraído</Text>}
            </View>
          ))}
        </Section>
      )}

      {(result.brand.brand_name || result.brand.product || result.brand.campaign) && (
        <Section icon={<Package size={14} color="#A78BFA" weight="bold" />} title="Marca y cliente" accent="#A78BFA">
          <Row label="Marca"    value={result.brand.brand_name} />
          <Row label="Producto" value={result.brand.product}    />
          <Row label="Campaña"  value={result.brand.campaign}   />
        </Section>
      )}

      {(result.colorimetry.log_profile || result.colorimetry.lut_required || result.colorimetry.grade_notes || result.colorimetry.mood_palette || result.colorimetry.reference_film) && (
        <Section icon={<Palette size={14} color="#60A5FA" weight="bold" />} title="Colorimetría" accent="#60A5FA">
          <Row label="Color space"  value={result.colorimetry.color_space}    />
          <Row label="Log profile"  value={result.colorimetry.log_profile}    />
          <Row label="LUT"          value={result.colorimetry.lut_required}   />
          <Row label="Grade"        value={result.colorimetry.grade_notes}    />
          <Row label="Mood"         value={result.colorimetry.mood_palette}   />
          <Row label="Referencia"   value={result.colorimetry.reference_film} />
        </Section>
      )}

      {(result.editorial.edit_style || result.editorial.rhythm || result.editorial.duration_target) && (
        <Section icon={<Video size={14} color="#34D399" weight="bold" />} title="Editorial" accent="#34D399">
          <Row label="Estilo"   value={result.editorial.edit_style}      />
          <Row label="Ritmo"    value={result.editorial.rhythm}          />
          <Row label="Duración" value={result.editorial.duration_target} />
        </Section>
      )}

      {(result.delivery.platform || result.delivery.aspect_ratio || result.delivery.deadline) && (
        <Section icon={<Truck size={14} color="#FBBF24" weight="bold" />} title="Entrega" accent="#FBBF24">
          <Row label="Plataforma"   value={result.delivery.platform}     />
          <Row label="Aspect ratio" value={result.delivery.aspect_ratio} />
          <Row label="Deadline"     value={result.delivery.deadline}     />
        </Section>
      )}
    </Animated.View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export function ClassifierScreen({ projectId, projectName, onBack, onApply }: Props) {
  const { status, result, error, classify, reset } = useClassifier();

  const token = useAuthStore(s => s.token);

  const [input,    setInput]    = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [links,    setLinks]    = useState<DetectedLink[]>([]);
  const [media,    setMedia]    = useState<MediaItem[]>([]);

  const pickAudio = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: ['audio/*'],
        copyToCacheDirectory: true,
      });
      if (res.canceled || !res.assets?.[0]) return;
      const asset = res.assets[0];
      const item: MediaItem = {
        uri: asset.uri, name: asset.name, kind: 'audio',
        processing: true, result: null, error: null,
      };
      setMedia(prev => [...prev, item]);

      try {
        if (!token) throw new Error('Sin sesión');
        const data = await aiApi.transcribe(asset.uri, asset.name, token);
        setMedia(prev => prev.map(m =>
          m.uri === asset.uri ? { ...m, processing: false, result: data.text } : m
        ));
      } catch (e: any) {
        setMedia(prev => prev.map(m =>
          m.uri === asset.uri ? { ...m, processing: false, error: e.message ?? 'Error' } : m
        ));
      }
    } catch {
      Alert.alert('Error', 'No se pudo acceder al audio');
    }
  };

  const pickImage = async () => {
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería para analizar imágenes.');
        return;
      }
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        allowsMultipleSelection: false,
      });
      if (res.canceled || !res.assets?.[0]) return;
      const asset = res.assets[0];
      const filename = asset.uri.split('/').pop() ?? 'image.jpg';
      const item: MediaItem = {
        uri: asset.uri, name: filename, kind: 'image',
        processing: true, result: null, error: null,
      };
      setMedia(prev => [...prev, item]);

      try {
        if (!token) throw new Error('Sin sesión');
        const data = await aiApi.describeImage(asset.uri, filename, token);
        setMedia(prev => prev.map(m =>
          m.uri === asset.uri ? { ...m, processing: false, result: data.description } : m
        ));
      } catch (e: any) {
        setMedia(prev => prev.map(m =>
          m.uri === asset.uri ? { ...m, processing: false, error: e.message ?? 'Error' } : m
        ));
      }
    } catch {
      Alert.alert('Error', 'No se pudo acceder a la galería');
    }
  };

  const removeMedia = (uri: string) => setMedia(prev => prev.filter(m => m.uri !== uri));

  const processText = useCallback(async (text: string): Promise<string> => {
    const foundUrls = detectLinks(text);
    if (foundUrls.length === 0) return text;

    const newLinks: DetectedLink[] = foundUrls
      .filter(url => !links.some(l => l.url === url))
      .map(url => {
        const kind = classifyLink(url);
        return { url, name: inferLinkName(url, kind), kind, fetching: false, content: null, error: null };
      });

    if (newLinks.length > 0) {
      setLinks(prev => [...prev, ...newLinks]);

      for (const doc of newLinks.filter(l => l.kind === 'gdoc')) {
        setLinks(prev => prev.map(l => l.url === doc.url ? { ...l, fetching: true } : l));
        try {
          const content = await fetchGoogleDocContent(doc.url);
          const firstLine = content.split('\n').find(line => line.trim().length > 0);
          const name = firstLine && firstLine.length < 80 ? firstLine.trim() : 'Google Doc';
          setLinks(prev => prev.map(l => l.url === doc.url ? { ...l, fetching: false, content, name } : l));
        } catch (e: any) {
          setLinks(prev => prev.map(l => l.url === doc.url ? { ...l, fetching: false, error: e.message ?? 'Error' } : l));
        }
      }
    }

    return text.replace(URL_REGEX, '').replace(/\s{2,}/g, ' ').trim();
  }, [links]);

  const addMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const cleaned = await processText(trimmed);
    if (cleaned) setMessages(prev => [...prev, cleaned]);
    setInput('');
    Keyboard.dismiss();
  };

  const removeMessage = (i: number) => setMessages(prev => prev.filter((_, idx) => idx !== i));
  const removeLink    = (url: string) => setLinks(prev => prev.filter(l => l.url !== url));

  const handleClassify = async () => {
    let all = [...messages];
    if (input.trim()) {
      const cleaned = await processText(input.trim());
      if (cleaned) all = [...all, cleaned];
      setInput('');
    }

    const linkMessages = links.map(l =>
      l.content
        ? `[Contenido de "${l.name}"]: ${l.content.slice(0, 2000)}`
        : `[Archivo de referencia: "${l.name}"] ${l.url}`
    );

    const mediaMessages = media.map(m => {
      if (m.result) {
        const tag = m.kind === 'audio' ? 'Transcripción de audio' : 'Descripción de imagen';
        return `[${tag} "${m.name}"]: ${m.result}`;
      }
      return `[${m.kind === 'audio' ? 'Audio' : 'Imagen'} de referencia: "${m.name}"]`;
    });

    const finalMessages = [...all, ...linkMessages, ...mediaMessages];
    if (finalMessages.length === 0) return;
    setMessages(all);
    classify(projectId, projectName, finalMessages);
  };

  const handleReset = () => {
    reset();
    setMessages([]);
    setLinks([]);
    setMedia([]);
    setInput('');
  };

  const isLoading   = status === 'loading';
  const hasResult   = status === 'success' && result;
  const isFetching  = links.some(l => l.fetching);
  const isProcessing = media.some(m => m.processing);
  const canSubmit   = (messages.length > 0 || links.length > 0 || media.length > 0 || input.trim().length > 0) && !isLoading && !isFetching && !isProcessing;

  return (
    <View style={S.root}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flex: 1 }}>

              <View style={S.header}>
                <AnimatedPressable onPress={onBack} hitSlop={12} style={{ padding: 4 }}>
                  <ArrowLeft size={22} color={colors.textOnDark} weight="bold" />
                </AnimatedPressable>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={S.headerBadge}>CLASIFICADOR IA</Text>
                  <Text style={S.headerTitle} numberOfLines={1}>{projectName}</Text>
                </View>
                <View style={S.headerIcon}>
                  <Lightning size={16} color={colors.primaryLight} weight="fill" />
                </View>
              </View>

              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={S.scroll}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                {!hasResult && (
                  <View style={S.inputCard}>
                    <View style={S.inputCardHeader}>
                      <ChatCircle size={16} color={colors.primaryLight} weight="fill" />
                      <Text style={S.inputCardTitle}>Mensajes y archivos del cliente</Text>
                    </View>
                    <Text style={S.inputCardSubtitle}>
                      Pegá mensajes, links de Drive, TikTok, Docs o cualquier archivo. Los links se detectan solos.
                    </Text>

                    {messages.length > 0 && (
                      <View style={S.chips}>
                        {messages.map((m, i) => (
                          <MessageChip key={i} text={m} onRemove={() => removeMessage(i)} />
                        ))}
                      </View>
                    )}

                    {links.length > 0 && (
                      <View style={S.chips}>
                        {links.map(l => (
                          <LinkChip key={l.url} link={l} onRemove={() => removeLink(l.url)} />
                        ))}
                      </View>
                    )}

                    {media.length > 0 && (
                      <View style={S.chips}>
                        {media.map(m => (
                          <MediaChip key={m.uri} item={m} onRemove={() => removeMedia(m.uri)} />
                        ))}
                      </View>
                    )}

                    <View style={S.inputRow}>
                      <TextInput
                        value={input}
                        onChangeText={setInput}
                        placeholder="Pegá mensajes o links aquí…"
                        placeholderTextColor={colors.textSecondary}
                        style={S.textInput}
                        multiline
                        returnKeyType="done"
                        blurOnSubmit
                        onSubmitEditing={addMessage}
                      />
                    </View>

                    <View style={S.mediaRow}>
                      {input.trim().length > 0 && (
                        <AnimatedPressable
                          onPress={addMessage}
                          style={({ pressed }) => [S.addBtn, pressed && S.pressed]}
                        >
                          <Plus size={14} color={colors.primaryLight} weight="bold" />
                          <Text style={S.addBtnText}>Agregar</Text>
                        </AnimatedPressable>
                      )}
                      <AnimatedPressable
                        onPress={pickAudio}
                        style={({ pressed }) => [S.mediaBtn, { borderColor: '#A78BFA40', backgroundColor: '#A78BFA15' }, pressed && S.pressed]}
                      >
                        <Microphone size={14} color="#A78BFA" weight="fill" />
                        <Text style={[S.mediaBtnText, { color: '#A78BFA' }]}>Audio</Text>
                      </AnimatedPressable>
                      <AnimatedPressable
                        onPress={pickImage}
                        style={({ pressed }) => [S.mediaBtn, { borderColor: '#34D39940', backgroundColor: '#34D39915' }, pressed && S.pressed]}
                      >
                        <Image size={14} color="#34D399" weight="fill" />
                        <Text style={[S.mediaBtnText, { color: '#34D399' }]}>Imagen</Text>
                      </AnimatedPressable>
                    </View>

                    {isFetching && (
                      <View style={S.fetchingRow}>
                        <ActivityIndicator size="small" color={colors.primaryLight} />
                        <Text style={S.fetchingText}>Leyendo Google Doc…</Text>
                      </View>
                    )}
                  </View>
                )}

                {status === 'error' && error && (
                  <View style={S.errorCard}>
                    <WarningCircle size={18} color="#F87171" weight="fill" />
                    <Text style={S.errorText}>{error}</Text>
                  </View>
                )}

                {isLoading && (
                  <View style={S.loadingCard}>
                    <ActivityIndicator color={colors.primaryLight} size="small" />
                    <View style={{ gap: 4 }}>
                      <Text style={S.loadingTitle}>Clasificando…</Text>
                      <Text style={S.loadingSubtitle}>
                        {messages.length} mensaje{messages.length !== 1 ? 's' : ''}
                        {links.length > 0 ? ` + ${links.length} link${links.length !== 1 ? 's' : ''}` : ''}
                        {media.length > 0 ? ` + ${media.length} media` : ''} · Llama 3.3 70B
                      </Text>
                    </View>
                  </View>
                )}

                {hasResult && <ResultView result={result} links={links} />}

                {status === 'idle' && messages.length === 0 && links.length === 0 && (
                  <View style={S.hintCard}>
                    <SealQuestion size={32} color={colors.textSecondary} weight="duotone" />
                    <Text style={S.hintText}>
                      Pegá mensajes de WhatsApp, links de Google Drive, Docs, TikTok, Instagram o YouTube. La IA extrae todo lo relevante y genera entregables automáticamente.
                    </Text>
                  </View>
                )}
              </ScrollView>

              <View style={S.cta}>
                {hasResult ? (
                  <View style={{ gap: 10 }}>
                    <AnimatedPressable
                      onPress={() => onApply(buildPatch(result!, links, media))}
                      style={({ pressed }) => [S.btnPrimary, pressed && S.pressed]}
                    >
                      <CheckCircle size={16} color="#fff" weight="fill" />
                      <Text style={S.btnPrimaryText}>Aplicar al proyecto</Text>
                    </AnimatedPressable>
                    <AnimatedPressable
                      onPress={handleReset}
                      style={({ pressed }) => [S.btnSecondary, pressed && S.pressed]}
                    >
                      <Text style={S.btnSecondaryText}>Clasificar otro lote</Text>
                    </AnimatedPressable>
                  </View>
                ) : (
                  <AnimatedPressable
                    onPress={handleClassify}
                    disabled={!canSubmit}
                    style={({ pressed }) => [S.btnPrimary, !canSubmit && S.btnDisabled, pressed && canSubmit && S.pressed]}
                  >
                    {isLoading
                      ? <ActivityIndicator color="#fff" size="small" />
                      : <>
                          <Lightning size={16} color="#fff" weight="fill" />
                          <Text style={S.btnPrimaryText}>
                            {isFetching ? 'Leyendo docs…' : isProcessing ? 'Procesando media…' : 'Clasificar con IA'}
                          </Text>
                        </>
                    }
                  </AnimatedPressable>
                )}
              </View>

            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.md },
  headerBadge: { fontFamily: fonts.bold, fontSize: 10, color: colors.primaryLight, letterSpacing: 1.8 },
  headerTitle: { fontFamily: fonts.bold, fontSize: 16, color: colors.textOnDark, letterSpacing: -0.5 },
  headerIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.primaryBg, borderWidth: 0.4, borderColor: colors.strokeBlue, alignItems: 'center', justifyContent: 'center' },

  scroll: { paddingHorizontal: spacing.lg, paddingBottom: 24, gap: 14 },

  inputCard: { backgroundColor: colors.surfaceCard, borderWidth: 0.4, borderColor: colors.stroke, borderRadius: 20, padding: 16, gap: 12 },
  inputCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  inputCardTitle: { fontFamily: fonts.semibold, fontSize: 14, color: colors.textOnDark, letterSpacing: -0.3 },
  inputCardSubtitle: { fontFamily: fonts.regular, fontSize: 13, color: colors.textSecondary, lineHeight: 19, letterSpacing: -0.2 },

  chips: { gap: 8 },
  chip: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, backgroundColor: colors.primaryBg, borderWidth: 0.4, borderColor: colors.strokeBlue, borderRadius: 12, padding: 10 },
  chipText: { flex: 1, fontFamily: fonts.regular, fontSize: 13, color: colors.textOnDark, lineHeight: 18, letterSpacing: -0.2 },
  chipRemove: { marginTop: 2 },

  linkChip: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.surfaceCardHi, borderWidth: 0.4, borderColor: colors.stroke, borderRadius: 12, padding: 10 },
  linkChipIcon: { width: 24, height: 24, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  linkChipName: { fontFamily: fonts.medium, fontSize: 13, color: colors.textOnDark, letterSpacing: -0.2 },
  linkChipStatus:    { fontFamily: fonts.regular, fontSize: 11, color: colors.primaryLight },
  linkChipStatusOk:  { fontFamily: fonts.regular, fontSize: 11, color: '#34D399' },
  linkChipStatusErr: { fontFamily: fonts.regular, fontSize: 11, color: colors.textSecondary },

  inputRow: { backgroundColor: colors.bg, borderWidth: 0.4, borderColor: colors.stroke, borderRadius: 14, padding: 12, minHeight: 80 },
  textInput: { fontFamily: fonts.regular, fontSize: 14, color: colors.textOnDark, letterSpacing: -0.2, lineHeight: 20, padding: 0, textAlignVertical: 'top' },

  addBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', backgroundColor: colors.primaryBg, borderWidth: 0.4, borderColor: colors.strokeBlue, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 7 },
  addBtnText: { fontFamily: fonts.semibold, fontSize: 13, color: colors.primaryLight, letterSpacing: -0.2 },

  fetchingRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  fetchingText: { fontFamily: fonts.regular, fontSize: 12, color: colors.primaryLight },

  loadingCard: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colors.primaryBg, borderWidth: 0.4, borderColor: colors.strokeBlue, borderRadius: 16, padding: 16 },
  loadingTitle:    { fontFamily: fonts.semibold, fontSize: 14, color: colors.textOnDark, letterSpacing: -0.3 },
  loadingSubtitle: { fontFamily: fonts.regular,  fontSize: 12, color: colors.primaryLight, letterSpacing: -0.2 },

  errorCard: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(239,68,68,0.1)', borderWidth: 0.4, borderColor: 'rgba(239,68,68,0.3)', borderRadius: 14, padding: 14 },
  errorText: { flex: 1, fontFamily: fonts.regular, fontSize: 14, color: '#F87171', letterSpacing: -0.2, lineHeight: 19 },

  hintCard: { alignItems: 'center', gap: 12, paddingVertical: 32, paddingHorizontal: 24 },
  hintText: { fontFamily: fonts.regular, fontSize: 14, color: colors.textSecondary, textAlign: 'center', lineHeight: 21, letterSpacing: -0.2 },

  summaryCard: { backgroundColor: colors.surfaceCard, borderWidth: 0.4, borderColor: colors.stroke, borderRadius: 20, padding: 16, gap: 10 },
  summaryTop: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  summaryLabel: { fontFamily: fonts.semibold, fontSize: 13, color: colors.textOnDark, flex: 1, letterSpacing: -0.3 },
  summaryText: { fontFamily: fonts.regular, fontSize: 14, color: colors.textOnDarkMuted, lineHeight: 21, letterSpacing: -0.2 },

  confidencePill: { flexDirection: 'row', alignItems: 'center', gap: 5, borderWidth: 0.6, borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 4 },
  confidenceDot: { width: 5, height: 5, borderRadius: 3 },
  confidenceText: { fontFamily: fonts.semibold, fontSize: 11, letterSpacing: 0.2 },

  priorityBadge: { alignSelf: 'flex-start', borderWidth: 0.6, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4 },
  priorityText: { fontFamily: fonts.bold, fontSize: 10, letterSpacing: 1.2 },

  section: { backgroundColor: colors.surfaceCard, borderWidth: 0.4, borderColor: colors.stroke, borderRadius: 18, overflow: 'hidden' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 0.4, borderBottomColor: colors.stroke },
  sectionIconWrap: { width: 26, height: 26, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { fontFamily: fonts.semibold, fontSize: 13, color: colors.textOnDark, letterSpacing: -0.3 },
  sectionBody: { paddingHorizontal: 14, paddingVertical: 10, gap: 8 },
  resultLinkRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },

  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  rowLabel: { fontFamily: fonts.medium, fontSize: 12, color: colors.textSecondary, letterSpacing: -0.2, width: 100, flexShrink: 0, paddingTop: 1 },
  rowValue: { flex: 1, fontFamily: fonts.regular, fontSize: 13, color: colors.textOnDark, lineHeight: 19, letterSpacing: -0.2 },

  cta: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, paddingTop: 8 },
  btnPrimary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.primary, borderRadius: radius.pill, paddingVertical: 18, shadowColor: colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 16, elevation: 6 },
  btnPrimaryText: { fontFamily: fonts.semibold, fontSize: 17, color: '#fff', letterSpacing: 0.2 },
  btnDisabled: { backgroundColor: colors.surfaceCard, shadowOpacity: 0, elevation: 0 },
  btnSecondary: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceCard, borderWidth: 0.4, borderColor: colors.stroke, borderRadius: radius.pill, paddingVertical: 18 },
  btnSecondaryText: { fontFamily: fonts.semibold, fontSize: 17, color: colors.textOnDarkMuted, letterSpacing: 0.2 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },

  mediaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' },
  mediaBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    borderWidth: 0.6, borderRadius: radius.pill,
    paddingHorizontal: 12, paddingVertical: 7,
  },
  mediaBtnText: { fontFamily: fonts.semibold, fontSize: 13, letterSpacing: -0.2 },
});
