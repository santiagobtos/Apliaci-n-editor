import { useState, useCallback } from 'react';
import { aiApi, ClassificationResult } from './api';
import { useAuthStore } from './auth.store';

type ClassifierStatus = 'idle' | 'loading' | 'success' | 'error';

interface UseClassifierReturn {
  status:   ClassifierStatus;
  result:   ClassificationResult | null;
  error:    string | null;
  classify: (projectId: string, projectName: string, messages: string[]) => Promise<ClassificationResult | null>;
  reset:    () => void;
}

export function useClassifier(): UseClassifierReturn {
  const token = useAuthStore(s => s.token);

  const [status, setStatus] = useState<ClassifierStatus>('idle');
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [error,  setError]  = useState<string | null>(null);

  const classify = useCallback(async (
    projectId: string,
    projectName: string,
    messages: string[],
  ): Promise<ClassificationResult | null> => {
    if (!token) {
      setError('No hay sesión activa');
      return null;
    }

    const trimmed = messages.map(m => m.trim()).filter(Boolean);
    if (trimmed.length === 0) {
      setError('Ingresa al menos un mensaje');
      return null;
    }

    setStatus('loading');
    setError(null);
    setResult(null);

    try {
      const data = await aiApi.classify(projectId, projectName, trimmed, token);
      setResult(data);
      setStatus('success');
      return data;
    } catch (e: any) {
      setError(e?.message || 'Error al clasificar los mensajes');
      setStatus('error');
      return null;
    }
  }, [token]);

  const reset = useCallback(() => {
    setStatus('idle');
    setResult(null);
    setError(null);
  }, []);

  return { status, result, error, classify, reset };
}