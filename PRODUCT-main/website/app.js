// Lucide-style icon set
    const Icon = ({ d, size = 18, fill = 'none', stroke = 'currentColor', sw = 1.6, children, vb = '0 0 24 24', style }) => (
      <svg viewBox={vb} width={size} height={size} fill={fill} stroke={stroke} strokeWidth={sw}
        strokeLinecap="round" strokeLinejoin="round" style={style}>
        {d ? <path d={d} /> : children}
      </svg>
    );

    const Icons = {
      Home: (p) => <Icon {...p}><path d="M3 12L12 4l9 8" /><path d="M5 10v10h14V10" /></Icon>,
      Folder: (p) => <Icon {...p} d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
      Bolt: (p) => <Icon {...p} d="M13 2L3 14h7l-1 8 10-12h-7z" fill="currentColor" stroke="none" />,
      User: (p) => <Icon {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a8 8 0 0 1 16 0v1" /></Icon>,
      Plus: (p) => <Icon {...p}><path d="M12 5v14M5 12h14" /></Icon>,
      Bell: (p) => <Icon {...p}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8" /><path d="M10 21a2 2 0 0 0 4 0" /></Icon>,
      Search: (p) => <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.5-4.5" /></Icon>,
      ChevronRight: (p) => <Icon {...p} d="M9 6l6 6-6 6" />,
      ChevronLeft: (p) => <Icon {...p} d="M15 6l-6 6 6 6" />,
      ChevronDown: (p) => <Icon {...p} d="M6 9l6 6 6-6" />,
      Check: (p) => <Icon {...p} d="M5 12l5 5 9-11" />,
      X: (p) => <Icon {...p}><path d="M6 6l12 12M18 6L6 18" /></Icon>,
      ArrowRight: (p) => <Icon {...p}><path d="M5 12h14M13 5l7 7-7 7" /></Icon>,
      ArrowUp: (p) => <Icon {...p}><path d="M5 12L12 5l7 7M12 5v14" /></Icon>,
      Cal: (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></Icon>,
      Pkg: (p) => <Icon {...p}><path d="M21 8L12 3 3 8v8l9 5 9-5z" /><path d="M3 8l9 5 9-5M12 13v8" /></Icon>,
      Trash: (p) => <Icon {...p}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></Icon>,
      Pencil: (p) => <Icon {...p}><path d="M14 4l6 6L8 22H2v-6z" /></Icon>,
      Dots: (p) => <Icon {...p}><circle cx="6" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="18" cy="12" r="1.5" fill="currentColor" stroke="none" /></Icon>,
      Lock: (p) => <Icon {...p}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></Icon>,
      Globe: (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></Icon>,
      Link: (p) => <Icon {...p}><path d="M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1.5 1.5" /><path d="M14 10a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1.5-1.5" /></Icon>,
      Help: (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2.5-2.5 4M12 17.5v.5" /></Icon>,
      Logout: (p) => <Icon {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></Icon>,
      Mic: (p) => <Icon {...p}><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></Icon>,
      Wa: (p) => <Icon {...p}><path d="M3 21l1.6-5.4A8 8 0 1 1 8.5 19.5z" /></Icon>,
      Cam: (p) => <Icon {...p}><rect x="2" y="6" width="20" height="14" rx="3" /><circle cx="12" cy="13" r="4" /></Icon>,
      Share: (p) => <Icon {...p}><circle cx="6" cy="12" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 11l8-4M8 13l8 4" /></Icon>,
      Sparkles: (p) => <Icon {...p}><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2zM19 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="currentColor" stroke="none" /></Icon>,
      Filter: (p) => <Icon {...p}><path d="M3 5h18l-7 9v6l-4-2v-4z" /></Icon>,
      Cell: (p) => <Icon {...p}><path d="M2 6.5l1-1V4l2-1 2 2.5M22 17.5L21 19l1.5 1L20 21l-1-2" /></Icon>,
      Wifi: (p) => <Icon {...p}><path d="M2 8a14 14 0 0 1 20 0M5 11.5a10 10 0 0 1 14 0M8 15a6 6 0 0 1 8 0" /><circle cx="12" cy="19" r="1" fill="currentColor" /></Icon>,
      Battery: (p) => <Icon {...p}><rect x="2" y="7" width="18" height="10" rx="2" /><rect x="4" y="9" width="14" height="6" rx="1" fill="currentColor" stroke="none" /><path d="M22 10v4" /></Icon>,
      Warn: (p) => <Icon {...p}><path d="M12 3l10 18H2z" /><path d="M12 10v5M12 18v.5" /></Icon>,
    };
    window.Icons = Icons;

  

    // ── Sample data ──────────────────────────────────────
    const PALETTES = [
      { label: 'Rojo',     colors: ['#EF4444', '#1F0A0A', '#FEE2E2'] },
      { label: 'Naranja',  colors: ['#F97316', '#1F1108', '#FFEDD5'] },
      { label: 'Ambar',    colors: ['#F59E0B', '#1F1408', '#FEF6E7'] },
      { label: 'Verde',    colors: ['#22C55E', '#071F12', '#DCFCE7'] },
      { label: 'Turquesa', colors: ['#14B8A6', '#061F1C', '#CCFBF1'] },
      { label: 'Azul',     colors: ['#3B82F6', '#0F1729', '#F8FAFC'] },
      { label: 'Indigo',   colors: ['#6366F1', '#13102B', '#E0E7FF'] },
      { label: 'Purpura',  colors: ['#A855F7', '#1A0D2E', '#F3E8FF'] },
      { label: 'Rosa',     colors: ['#E85D75', '#2B1030', '#FDEEF2'] },
    ];
    window.PALETTES = PALETTES;
  

    // ── Even Web App ─────────────────────────────────────
    const { useState, useEffect } = React;

    // ─────────────────────────────────────────────────────
    // API Contract
    // Backend developer: reemplaza cada funcion con el
    // fetch real al endpoint indicado.
    //
    // Project {
    //   id: string
    //   name: string
    //   client: string
    //   colors: string[]           // [primary, bg, accent]
    //   typography: string
    //   startDate: string          // ISO 8601
    //   deadline: string           // ISO 8601
    //   progress: number           // 0-100
    //   deliverables: { id: string, label: string, done: boolean }[]
    //   status: 'pendiente' | 'en progreso' | 'completado'
    //   notes: string
    //   links: string[]
    //   members: { id: string, name: string, color: string }[]
    //   workspace_id: string
    //   created_by: string
    //   created_at: string
    // }
    // Member {
    //   id: string, name: string, email: string
    //   role: 'owner' | 'member'
    //   color: string
    // }
    // ─────────────────────────────────────────────────────
    const API = {
      getProjects:    function() { /* GET    /api/projects            */ return Promise.resolve([]); },
      createProject:  function(d){ /* POST   /api/projects            */ return Promise.resolve(Object.assign({}, d, { id: '_' + Date.now(), created_at: new Date().toISOString() })); },
      updateProject:  function(id,d){ /* PATCH /api/projects/:id     */ return Promise.resolve(Object.assign({ id: id }, d)); },
      deleteProject:  function(id){ /* DELETE /api/projects/:id      */ return Promise.resolve(); },
      getTeamMembers: function() { /* GET    /api/workspace/members  */ return Promise.resolve([]); },
      inviteMember:   function(email, role){ /* POST /api/workspace/invite */ return Promise.resolve({ success: true }); },
      removeMember:   function(id){ /* DELETE /api/workspace/members/:id */ return Promise.resolve(); },
    };
    window.API = API;

    // ── Demo data (solo cuando isDemo=true) ──────────────
    var _now = new Date();
    function demoDate(n) {
      var d = new Date(_now);
      d.setDate(d.getDate() + n);
      return d.toISOString();
    }
    var DEMO_TEAM = [
      { id: 'dm1', name: 'Maria', email: 'maria@even.app', role: 'member', color: '#A855F7' },
      { id: 'dm2', name: 'Lucas', email: 'lucas@even.app', role: 'member', color: '#22C55E' },
    ];
    var DEMO_PROJECTS = [
      {
        id: 'dp1', name: 'Identidad Cafe Norte', client: 'Cafe Norte',
        colors: ['#F59E0B','#1F1408','#FEF6E7'], typography: 'Plus Jakarta Sans',
        startDate: demoDate(-12), deadline: demoDate(5), progress: 65,
        deliverables: [
          { id:'d1', label:'Logotipo principal',  done: true  },
          { id:'d2', label:'Paleta tipografia',   done: true  },
          { id:'d3', label:'Manual de marca PDF', done: false },
          { id:'d4', label:'Aplicaciones',        done: false },
        ],
        status: 'en progreso',
        notes: 'El cliente quiere look calido y terroso.',
        links: ['https://drive.google.com/...'],
        members: [{ id:'dm1', name:'Maria', color:'#A855F7' }],
        workspace_id: 'ws1', created_by: 'owner', created_at: demoDate(-12),
      },
      {
        id: 'dp2', name: 'Reel Lanzamiento Verano', client: 'Studio Marea',
        colors: ['#3B82F6','#0F1729','#F8FAFC'], typography: 'Plus Jakarta Sans',
        startDate: demoDate(-3), deadline: demoDate(2), progress: 35,
        deliverables: [
          { id:'d5', label:'Storyboard',  done: true  },
          { id:'d6', label:'Edit v1 30s', done: false },
          { id:'d7', label:'Sound design',done: false },
        ],
        status: 'en progreso',
        notes: 'Ritmo alto, cortes secos.',
        links: ['https://wetransfer.com/...'],
        members: [{ id:'dm2', name:'Lucas', color:'#22C55E' }],
        workspace_id: 'ws1', created_by: 'owner', created_at: demoDate(-3),
      },
      {
        id: 'dp3', name: 'Branding Studio Lila', client: 'Lila Wellness',
        colors: ['#A855F7','#1A0D2E','#F3E8FF'], typography: 'Plus Jakarta Sans',
        startDate: demoDate(-25), deadline: demoDate(-2), progress: 100,
        deliverables: [
          { id:'d8', label:'Logo',   done: true },
          { id:'d9', label:'Paleta', done: true },
          { id:'d10',label:'Manual', done: true },
        ],
        status: 'completado', notes: 'Cliente feliz, mando testimonio.',
        links: [],
        members: [{ id:'dm1', name:'Maria', color:'#A855F7' }, { id:'dm2', name:'Lucas', color:'#22C55E' }],
        workspace_id: 'ws1', created_by: 'owner', created_at: demoDate(-25),
      },
      {
        id: 'dp4', name: 'Web Restaurante Olivo', client: 'Olivo Co',
        colors: ['#22C55E','#071F12','#DCFCE7'], typography: 'Plus Jakarta Sans',
        startDate: demoDate(8), deadline: demoDate(28), progress: 0,
        deliverables: [
          { id:'d11', label:'Wireframes',   done: false },
          { id:'d12', label:'Diseno UI',    done: false },
          { id:'d13', label:'Desarrollo',   done: false },
        ],
        status: 'pendiente', notes: 'Pendiente revisar referencias.',
        links: [], members: [],
        workspace_id: 'ws1', created_by: 'owner', created_at: demoDate(0),
      },
    ];

    // ── Helpers ───────────────────────────────────────────
    var STATUS_OPTIONS = [
      { label:'Pendiente',   value:'pendiente',   cls:'pendiente'  },
      { label:'En progreso', value:'en progreso', cls:'progreso'   },
      { label:'Completado',  value:'completado',  cls:'completado' },
    ];
    function calcProgress(dels) {
      if (!dels || !dels.length) return 0;
      return Math.round(dels.filter(function(d){ return d.done; }).length / dels.length * 100);
    }
    function sClass(s) { return s === 'completado' ? 'completado' : s === 'pendiente' ? 'pendiente' : 'progreso'; }
    function sLabel(s) {
      for (var i = 0; i < STATUS_OPTIONS.length; i++) { if (STATUS_OPTIONS[i].value === s) return STATUS_OPTIONS[i].label; }
      return 'En progreso';
    }
    function shortDate(iso) {
      if (!iso) return '';
      var d = new Date(iso);
      var m = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
      return d.getDate() + ' ' + m[d.getMonth()];
    }
    function uid() { return '_' + Math.random().toString(36).slice(2, 9); }

    // ── StatCard ──────────────────────────────────────────
    function StatCard(props) {
      return (
        <div className={'app__stat' + (props.accent ? ' app__stat--accent' : '')}>
          <div className="v">{props.value}</div>
          <div className="l">{props.label}</div>
        </div>
      );
    }

    // ── Facepile ──────────────────────────────────────────
    function Facepile(props) {
      var members = props.members;
      if (!members || !members.length) return null;
      var shown = members.slice(0, 3);
      var rest = members.length - 3;
      return (
        <div className="facepile">
          {shown.map(function(m) {
            return <div key={m.id} className="facepile__av" style={{ background: m.color }} title={m.name}>{m.name[0].toUpperCase()}</div>;
          })}
          {rest > 0 && <div className="facepile__av facepile__more">+{rest}</div>}
        </div>
      );
    }

    // ── LoadingSkeleton ───────────────────────────────────
    function LoadingSkeleton() {
      return (
        <div style={{ padding: '24px 32px' }}>
          <div style={{ height:32, width:200, background:'var(--surface-card-hi)', borderRadius:8, marginBottom:24 }}></div>
          <div className="skeleton-grid">
            {[1,2,3,4].map(function(i) {
              return (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-line skeleton-line--title"></div>
                  <div className="skeleton-line skeleton-line--sub"></div>
                  <div className="skeleton-line skeleton-line--short"></div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // ── ErrorState ────────────────────────────────────────
    function ErrorState(props) {
      return (
        <div className="error-state">
          <Icons.Warn size={40} stroke="var(--danger)" />
          <h3>Algo salio mal</h3>
          <p>{props.message || 'No se pudieron cargar los datos.'}</p>
          <button className="app__btn app__btn--primary" onClick={props.onRetry}>Reintentar</button>
        </div>
      );
    }

    // ── InviteModal ───────────────────────────────────────
    function InviteModal(props) {
      var onClose   = props.onClose;
      var onSuccess = props.onSuccess;
      var _e = useState('');     var email   = _e[0]; var setEmail   = _e[1];
      var _r = useState('member');var role    = _r[0]; var setRole    = _r[1];
      var _s = useState(false);  var sending = _s[0]; var setSending = _s[1];
      var _d = useState(false);  var done    = _d[0]; var setDone    = _d[1];

      function send() {
        if (!email) return;
        setSending(true);
        Promise.resolve(onSuccess(email, role)).then(function() {
          setSending(false); setDone(true);
          setTimeout(onClose, 1800);
        });
      }

      return (
        <div className="modal-bg show" onClick={onClose}>
          <div className="modal" onClick={function(e){ e.stopPropagation(); }}>
            {done ? (
              <div>
                <div className="modal__icon" style={{ background:'rgba(16,185,129,0.15)' }}>
                  <Icons.Check size={28} stroke="var(--success)" sw={2.5} />
                </div>
                <h3>Invitacion enviada</h3>
                <p>{email} recibira un enlace para unirse al workspace.</p>
              </div>
            ) : (
              <div>
                <h3>Invitar miembro</h3>
                <p>Se enviara un enlace de acceso al email indicado.</p>
                <div className="invite-form">
                  <input type="email" placeholder="correo@ejemplo.com" value={email}
                    onChange={function(e){ setEmail(e.target.value); }} autoFocus />
                  <div className="invite-role-row">
                    <button className={'invite-role-btn' + (role==='member'?' active':'')} onClick={function(){ setRole('member'); }}>Editor</button>
                    <button className={'invite-role-btn' + (role==='owner'?' active':'')}  onClick={function(){ setRole('owner');  }}>Owner</button>
                  </div>
                </div>
                <div className="modal__actions" style={{ marginTop:16 }}>
                  <button className="modal__btn modal__btn--cancel" onClick={onClose}>Cancelar</button>
                  <button className="modal__btn modal__btn--delete" style={{ background:'var(--primary)' }}
                    onClick={send} disabled={!email || sending}>
                    {sending ? 'Enviando...' : 'Enviar invitacion'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // ── ProjectCard ───────────────────────────────────────
    function ProjectCard(props) {
      var project = props.project; var onOpen = props.onOpen;
      var sc = sClass(project.status);
      return (
        <div className="proj-card" onClick={onOpen}>
          <div className="proj-card__bar" style={{ background: project.colors[0] }}></div>
          <div className="proj-card__body">
            <div className="proj-card__row1">
              <div className="proj-card__name">{project.name}</div>
              <div className={'proj-card__status proj-card__status--' + (sc==='completado'?'done':sc==='pendiente'?'pending':'')}>
                {sLabel(project.status)}
              </div>
            </div>
            <div className="proj-card__client">
              <span>{project.client} &middot; {project.deliverables.length} entregables</span>
              <Facepile members={project.members} />
            </div>
            <div className="proj-card__row2">
              <div className="proj-card__date">Entrega {shortDate(project.deadline)}</div>
              <div className="proj-card__progress"><i style={{ width: project.progress + '%' }}></i></div>
              <div className="proj-card__pct">{project.progress}%</div>
            </div>
          </div>
        </div>
      );
    }

    // ── HomeView ──────────────────────────────────────────
    function HomeView(props) {
      var projects     = props.projects;
      var currentUser  = props.currentUser;
      var teamMembers  = props.teamMembers;
      var filter       = props.filter;      var setFilter       = props.setFilter;
      var memberFilter = props.memberFilter; var setMemberFilter = props.setMemberFilter;
      var onOpen = props.onOpen; var onNew = props.onNew; var onAuto = props.onAuto;

      var isOwner = currentUser.role === 'owner';
      var base = isOwner ? projects : projects.filter(function(p) {
        return p.members && p.members.some(function(m){ return m.id === currentUser.id; });
      });
      var byStatus = filter === 'todos' ? base : base.filter(function(p){ return p.status === filter; });
      var visible = (isOwner && memberFilter !== 'todos')
        ? (memberFilter === '__sin__'
            ? byStatus.filter(function(p){ return !p.members || !p.members.length; })
            : byStatus.filter(function(p){ return p.members && p.members.some(function(m){ return m.id === memberFilter; }); }))
        : byStatus;

      var enP  = base.filter(function(p){ return p.status === 'en progreso'; }).length;
      var pend = base.filter(function(p){ return p.status === 'pendiente';   }).length;
      var comp = base.filter(function(p){ return p.status === 'completado';  }).length;
      var prox = base.filter(function(p){
        var diff = Math.ceil((new Date(p.deadline) - new Date()) / 86400000);
        return diff >= 0 && diff <= 7;
      }).length;

      return (
        <React.Fragment>
          <div className="app__topbar">
            <div>
              <div className="greet">{isOwner ? 'Bienvenido de nuevo' : 'Tus proyectos asignados'}</div>
              <h1>Hola, {currentUser.name}</h1>
            </div>
            <div className="app__top-actions">
              <button className="app__btn"><Icons.Search size={14} /> Buscar</button>
              <button className="app__btn"><Icons.Bell size={14} /></button>
              {isOwner && <button className="app__btn app__btn--primary" onClick={onNew}><Icons.Plus size={14} /> Nuevo proyecto</button>}
            </div>
          </div>

          <div className="app__stats">
            <StatCard value={enP}  label="Proyectos activos" accent />
            <StatCard value={pend} label="Pendientes" />
            <StatCard value={comp} label="Completados" />
            <StatCard value={prox} label="Proximos vencimientos" />
          </div>

          {isOwner && (
            <div className="app__banner" onClick={onAuto}>
              <div className="app__banner__icon"><Icons.Bolt /></div>
              <div style={{ flex:1 }}>
                <h3>Automatiza tu proximo proyecto</h3>
                <p>Comparte un mensaje y Even organiza branding, fechas y entregables.</p>
              </div>
              <Icons.ChevronRight size={16} stroke="#6DA4FF" />
            </div>
          )}

          <div className="app__section-head">
            <h2>{isOwner ? 'Proyectos' : 'Mis proyectos'}</h2>
            <div className="filters">
              {[
                {k:'todos',l:'Todos'},{k:'en progreso',l:'En progreso'},
                {k:'pendiente',l:'Pendientes'},{k:'completado',l:'Completados'},
              ].map(function(f){
                return <div key={f.k} className={'app__filter-chip'+(filter===f.k?' active':'')} onClick={function(){ setFilter(f.k); }}>{f.l}</div>;
              })}
            </div>
            <span className="count">{visible.length}</span>
          </div>

          {isOwner && teamMembers.length > 0 && (
            <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:14, marginTop:-6 }}>
              <div className={'app__filter-chip'+(memberFilter==='todos'?' active':'')} onClick={function(){ setMemberFilter('todos'); }}>Todos</div>
              {teamMembers.map(function(m){
                return (
                  <div key={m.id} className={'app__filter-chip'+(memberFilter===m.id?' active':'')}
                    onClick={function(){ setMemberFilter(m.id); }}
                    style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <div style={{ width:10, height:10, borderRadius:'50%', background:m.color, flexShrink:0 }}></div>
                    {m.name}
                  </div>
                );
              })}
              <div className={'app__filter-chip'+(memberFilter==='__sin__'?' active':'')} onClick={function(){ setMemberFilter('__sin__'); }}>Sin asignar</div>
            </div>
          )}

          {visible.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state__icon">
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                  <defs><linearGradient id="esg" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#93C5FD"/><stop offset="100%" stopColor="#3B82F6"/></linearGradient></defs>
                  {base.length === 0 && isOwner
                    ? <path d="M19 1C20.8 13 24.5 16.5 38 19C24.5 21.5 20.8 25 19 37C17.2 25 13.5 21.5 1 19C13.5 16.5 17.2 13 19 1Z" fill="url(#esg)"/>
                    : base.length === 0
                    ? <React.Fragment><circle cx="19" cy="14" r="6" fill="url(#esg)"/><path d="M6 34C6 26.8 11.9 21 19 21C26.1 21 32 26.8 32 34" stroke="url(#esg)" strokeWidth="2.5" strokeLinecap="round"/></React.Fragment>
                    : <React.Fragment><rect x="4" y="12" width="30" height="4" rx="2" fill="url(#esg)" opacity="0.4"/><rect x="4" y="20" width="22" height="4" rx="2" fill="url(#esg)" opacity="0.7"/><rect x="4" y="28" width="14" height="4" rx="2" fill="url(#esg)" opacity="0.3"/></React.Fragment>
                  }
                </svg>
              </div>
              <div className="empty-state__title">
                {base.length === 0
                  ? (isOwner ? 'Tu espacio esta listo' : 'Sin proyectos asignados aun')
                  : 'Sin resultados'}
              </div>
              <div className="empty-state__body">
                {base.length === 0
                  ? (isOwner
                    ? 'Crea tu primer proyecto o comparte un mensaje para que Even lo organice automaticamente.'
                    : 'El owner de tu workspace te asignara proyectos. Te notificaremos cuando esten listos.')
                  : 'Ningun proyecto coincide con los filtros. Prueba cambiando la vista.'}
              </div>
              {base.length === 0 && isOwner && (
                <div className="empty-state__actions">
                  <button className="app__btn app__btn--primary" onClick={onNew}><Icons.Plus size={14} /> Nuevo proyecto</button>
                  <button className="app__btn" onClick={onAuto}><Icons.Bolt size={14} /> Automatizar</button>
                </div>
              )}
              {base.length > 0 && visible.length === 0 && (
                <button className="app__btn" onClick={function(){ setFilter('todos'); setMemberFilter('todos'); }}>Limpiar filtros</button>
              )}
            </div>
          ) : (
            <div className="proj-grid">
              {visible.map(function(p){ return <ProjectCard key={p.id} project={p} onOpen={function(){ onOpen(p); }} />; })}
            </div>
          )}
        </React.Fragment>
      );
    }

    // ── DetailView ────────────────────────────────────────
    function DetailView(props) {
      var project = props.project; var teamMembers = props.teamMembers;
      var currentUser = props.currentUser;
      var onBack = props.onBack; var onUpdate = props.onUpdate;
      var onEdit = props.onEdit; var onDelete = props.onDelete;
      var isOwner = currentUser.role === 'owner';

      function toggle(i) {
        var nd = project.deliverables.map(function(d,j){ return j===i ? Object.assign({},d,{done:!d.done}) : d; });
        var prog = calcProgress(nd);
        var stat = prog===100 ? 'completado' : (project.status==='completado' ? 'en progreso' : project.status);
        onUpdate(Object.assign({},project,{deliverables:nd,progress:prog,status:stat}));
      }

      var bg = 'linear-gradient(135deg,' + project.colors[0] + ',' + (project.colors[1]||'#000') + ')';
      return (
        <React.Fragment>
          <div className="detail__hero" style={{ background: bg }}>
            <button className="detail__back" onClick={onBack}><Icons.ChevronLeft size={14} /> Volver</button>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <div className="status-pill"><span className="dot"></span>{sLabel(project.status)}</div>
                <h1>{project.name}</h1>
                <div className="client">{project.client}</div>
              </div>
              {isOwner && (
                <div style={{ display:'flex', gap:8 }}>
                  <button className="app__btn" style={{ background:'rgba(0,0,0,.25)', borderColor:'rgba(255,255,255,.2)', color:'white' }} onClick={onEdit}><Icons.Pencil size={14} /> Editar</button>
                  <button className="app__btn" style={{ background:'rgba(0,0,0,.25)', borderColor:'rgba(255,255,255,.2)', color:'white' }} onClick={function(){ onDelete(project); }}><Icons.Trash size={14} /></button>
                </div>
              )}
            </div>
            <div className="progress">
              <div className="row"><span>Progreso general</span><strong>{project.progress}%</strong></div>
              <div className="track"><div className="fill" style={{ width:project.progress+'%' }}></div></div>
            </div>
            <div className="meta">
              <div className="chip"><Icons.Cal size={12} /> Inicio {shortDate(project.startDate)}</div>
              <div className="chip"><Icons.Cal size={12} /> Entrega {shortDate(project.deadline)}</div>
              <div className="chip"><Icons.Pkg size={12} /> {project.deliverables.length} entregables</div>
            </div>
          </div>

          <div className="detail__body">
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div className="detail__section">
                <h3>Estado</h3>
                <div className="detail__status-row">
                  {STATUS_OPTIONS.map(function(o){
                    return (
                      <button key={o.value}
                        className={'detail__status-btn '+o.cls+(project.status===o.value?' active':'')}
                        onClick={function(){
                          if(isOwner) onUpdate(Object.assign({},project,{status:o.value,progress:o.value==='completado'?100:calcProgress(project.deliverables)}));
                        }}>
                        {o.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="detail__section">
                <h3>Entregables &middot; {project.deliverables.filter(function(d){return d.done;}).length}/{project.deliverables.length}</h3>
                {project.deliverables.map(function(d,i){
                  return (
                    <div key={d.id||i} className={'deliv-row'+(d.done?' done':'')} onClick={function(){toggle(i);}}>
                      <div className="check"><Icons.Check size={12} stroke="white" sw={3} /></div>
                      <div className="label">{d.label}</div>
                    </div>
                  );
                })}
              </div>
              <div className="detail__section">
                <h3>Notas</h3>
                <div className="notes-text">{project.notes || 'Sin notas.'}</div>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div className="detail__section">
                <h3>Equipo</h3>
                {project.members && project.members.length > 0 ? (
                  <div className="team-chips">
                    {project.members.map(function(m){
                      return (
                        <div key={m.id} className="team-chip">
                          <div className="team-chip__av" style={{ background:m.color }}>{m.name[0].toUpperCase()}</div>
                          {m.name}
                        </div>
                      );
                    })}
                  </div>
                ) : <div className="notes-text">Sin miembros asignados.</div>}
              </div>
              <div className="detail__section">
                <h3>Branding</h3>
                <div className="brand-row">
                  <div className="brand-swatches">
                    {project.colors.map(function(c,i){ return <div key={i} className="brand-sw" style={{ background:c }}></div>; })}
                  </div>
                  <div className="brand-typo" style={{ color:project.colors[0] }}>Aa</div>
                </div>
                <div className="brand-name">{project.typography}</div>
              </div>
              <div className="detail__section">
                <h3>Enlaces</h3>
                {project.links.length
                  ? project.links.map(function(l,i){
                    return <div key={i} className="link-row"><Icons.Link size={14} /> <span style={{ flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{l}</span><Icons.ChevronRight size={12} /></div>;
                  })
                  : <div className="notes-text">No hay enlaces configurados.</div>}
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }

    // ── NewProjectView ────────────────────────────────────
    function NewProjectView(props) {
      var initial = props.initial; var teamMembers = props.teamMembers || [];
      var onSave = props.onSave; var onCancel = props.onCancel; var isEdit = props.isEdit;
      var today = new Date().toISOString();
      var week  = new Date(Date.now() + 7*86400000).toISOString();
      var _dr = useState(initial || {
        name:'', client:'', colors:PALETTES[5].colors, typography:'Plus Jakarta Sans',
        startDate:today, deadline:week,
        deliverables:[{id:uid(),label:'',done:false}],
        notes:'', links:[], members:[], status:'pendiente', progress:0,
      });
      var draft = _dr[0]; var setDraft = _dr[1];
      function upd(k,v){ setDraft(Object.assign({},draft,{[k]:v})); }
      function toggleM(m){
        var cur = draft.members||[];
        var ex = cur.some(function(x){return x.id===m.id;});
        upd('members', ex ? cur.filter(function(x){return x.id!==m.id;}) : cur.concat([{id:m.id,name:m.name,color:m.color}]));
      }
      return (
        <React.Fragment>
          <div className="app__topbar">
            <div>
              <div className="greet">{isEdit?'Editando':'Nuevo'}</div>
              <h1>{isEdit?'Editar proyecto':'Crear nuevo proyecto'}</h1>
            </div>
            <button className="app__btn" onClick={onCancel}><Icons.ChevronLeft size={14} /> Volver</button>
          </div>
          <div className="npform">
            <div className="npform__card">
              <div className="npform__label">Nombre del proyecto</div>
              <input className="npform__input" value={draft.name} onChange={function(e){upd('name',e.target.value);}} placeholder="Ej. Identidad Cafe Norte" />
            </div>
            <div className="npform__card">
              <div className="npform__label">Cliente</div>
              <input className="npform__input" value={draft.client} onChange={function(e){upd('client',e.target.value);}} placeholder="Nombre del cliente" />
            </div>
            <div className="npform__card">
              <div className="npform__label">Estado</div>
              <div className="npform__row">
                {STATUS_OPTIONS.map(function(o){
                  return <button key={o.value} className={'npform__chip '+o.cls+(draft.status===o.value?' active':'')} onClick={function(){upd('status',o.value);}}>{o.label}</button>;
                })}
              </div>
            </div>
            <div className="npform__card">
              <div className="npform__label">Branding</div>
              <div className="npform__pal">
                {PALETTES.map(function(p){
                  var act = JSON.stringify(p.colors)===JSON.stringify(draft.colors);
                  return (
                    <div key={p.label} className={'npform__pal-opt'+(act?' active':'')} onClick={function(){upd('colors',p.colors);}}>
                      <div className="swrow">{p.colors.map(function(c){return <div key={c} className="sw" style={{background:c}}></div>;})}</div>
                      <div className="nm">{p.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="npform__card">
              <div className="npform__label">Tipografia</div>
              <input className="npform__input" value={draft.typography} onChange={function(e){upd('typography',e.target.value);}} />
            </div>
            <div className="npform__card">
              <div className="npform__label">Fechas</div>
              <div style={{ display:'flex', gap:10 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, color:'var(--text-secondary)', marginBottom:6 }}>Inicio</div>
                  <input className="npform__input" type="date" value={draft.startDate.slice(0,10)} onChange={function(e){upd('startDate',e.target.value);}} />
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, color:'var(--text-secondary)', marginBottom:6 }}>Entrega</div>
                  <input className="npform__input" type="date" value={draft.deadline.slice(0,10)} onChange={function(e){upd('deadline',e.target.value);}} />
                </div>
              </div>
            </div>
            <div className="npform__card">
              <div className="npform__label">Entregables</div>
              {draft.deliverables.map(function(d,i){
                return (
                  <div key={d.id||i} className="npform__deliv">
                    <input className="npform__input" value={d.label} placeholder="Ej. Logotipo principal"
                      onChange={function(e){
                        var nd=draft.deliverables.map(function(x,j){return j===i?Object.assign({},x,{label:e.target.value}):x;});
                        upd('deliverables',nd);
                      }} />
                    <span className="x" onClick={function(){upd('deliverables',draft.deliverables.filter(function(_,j){return j!==i;}));}}>x</span>
                  </div>
                );
              })}
              <span className="npform__add" onClick={function(){upd('deliverables',draft.deliverables.concat([{id:uid(),label:'',done:false}]));}}>+ Anadir entregable</span>
            </div>
            <div className="npform__card">
              <div className="npform__label">Asignar equipo</div>
              {teamMembers.length > 0 ? (
                <div className="member-opts">
                  {teamMembers.map(function(m){
                    var sel=draft.members&&draft.members.some(function(x){return x.id===m.id;});
                    return (
                      <div key={m.id} className={'member-opt'+(sel?' selected':'')} onClick={function(){toggleM(m);}}>
                        <div className="member-opt__av" style={{background:m.color}}>{m.name[0].toUpperCase()}</div>
                        {m.name}
                        {sel && <Icons.Check size={12} sw={3} stroke="var(--primary-light)" />}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <button className="app__btn" disabled style={{ opacity: 0.5, cursor: 'not-allowed', width: '100%', justifyContent: 'center' }}>
                  Aún no hay miembros en el equipo
                </button>
              )}
            </div>
            <div className="npform__card">
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div className="npform__label">Notas</div>
                <span className="npform__counter">{draft.notes.length}/500</span>
              </div>
              <textarea className="npform__textarea" value={draft.notes} placeholder="Instrucciones, referencias..."
                onChange={function(e){if(e.target.value.length<=500)upd('notes',e.target.value);}} />
            </div>
            <div className="npform__card">
              <div className="npform__label">Enlaces</div>
              {draft.links.map(function(l,i){
                return (
                  <div key={i} className="npform__deliv">
                    <input className="npform__input" value={l} placeholder="https://"
                      onChange={function(e){var nl=draft.links.slice();nl[i]=e.target.value;upd('links',nl);}} />
                    <span className="x" onClick={function(){upd('links',draft.links.filter(function(_,j){return j!==i;}));}}>x</span>
                  </div>
                );
              })}
              <span className="npform__add" onClick={function(){upd('links',draft.links.concat(['']));}}>+ Anadir enlace</span>
            </div>
            <div className="npform__sticky">
              <button className="app__btn" onClick={onCancel}>Cancelar</button>
              <button className="app__btn app__btn--primary" onClick={function(){onSave(Object.assign({},draft,{progress:calcProgress(draft.deliverables)}));}}>
                <Icons.Check size={14} /> {isEdit?'Guardar cambios':'Crear proyecto'}
              </button>
            </div>
          </div>
        </React.Fragment>
      );
    }

    // ── AutoView ──────────────────────────────────────────
    function AutoView(props) {
      return (
        <React.Fragment>
          <div className="app__topbar">
            <div><div className="greet">Flujo automatico</div><h1>Comparte un mensaje, recibe un proyecto</h1></div>
            <button className="app__btn" onClick={props.onBack}><Icons.ChevronLeft size={14} /> Volver</button>
          </div>
          <div className="auto">
            <div className="auto__badge">FLUJO AUTOMATICO</div>
            <h1>De un mensaje a un proyecto completo.</h1>
            <p className="lead">Nuestra IA organiza branding, fechas, entregables y notas desde cualquier conversacion de WhatsApp, Instagram o nota de voz.</p>
            <div className="auto__platforms">
              <div className="tile wa"><Icons.Wa /></div>
              <div className="tile ig"><Icons.Cam /></div>
              <div className="tile audio"><Icons.Mic /></div>
              <div className="tile share"><Icons.Share /></div>
              <div className="cap">WhatsApp, Instagram y mas</div>
            </div>
            <div className="auto__steps">
              <div className="auto__step"><div className="num">1</div><div className="body"><h4>Abre la conversacion</h4><p>Ve al chat del cliente donde recibas el brief.</p></div></div>
              <div className="auto__step"><div className="num">2</div><div className="body"><h4>Toca Compartir y elige Even</h4><p>Selecciona el mensaje, nota de voz o hilo completo.</p></div></div>
              <div className="auto__step"><div className="num">3</div><div className="body"><h4>Even organiza tu proyecto</h4><p>En segundos tendras branding, fechas y entregables estructurados.</p></div></div>
            </div>
            <button className="app__btn app__btn--primary" onClick={props.onBack}>Entendido, empezar <Icons.ArrowRight size={14} /></button>
          </div>
        </React.Fragment>
      );
    }

    // ── ProfileView ───────────────────────────────────────
    function ProfileView(props) {
      var user = props.user; var projects = props.projects; var onSignOut = props.onSignOut;
      return (
        <React.Fragment>
          <div className="app__topbar">
            <div><div className="greet">Configuracion</div><h1>Tu perfil</h1></div>
            {onSignOut && <button className="app__btn" onClick={onSignOut}><Icons.Logout size={14} /> Cerrar sesion</button>}
          </div>
          <div className="profile">
            <div className="profile__hero">
              <div className="profile__avatar"><span>{user.name[0].toUpperCase()}</span><div className="edit"><Icons.Pencil /></div></div>
              <div className="profile__name">{user.name}</div>
              <div className="profile__email">{user.email || (user.name.toLowerCase().replace(/\s/g,'') + '@even.app')}</div>
            </div>
            <div className="plan-card">
              <div className="head"><div className="badge">Plus</div><div className="price">$9 / mes</div></div>
              <div className="tagline">Ideal para freelancers en crecimiento</div>
              <ul>
                <li><Icons.Check sw={3}/> 5 proyectos simultaneos</li>
                <li><Icons.Check sw={3}/> Revision avanzada con cliente</li>
                <li><Icons.Check sw={3}/> Automatizacion IA basica</li>
                <li><Icons.Check sw={3}/> 20 GB de almacenamiento</li>
              </ul>
              <button className="cta">Mejorar a Ultra</button>
            </div>
            <div className="usage-card">
              <h3>Uso este mes</h3>
              <div className="usage-row">
                <div className="usage-stat"><div className="v">{projects.length}<small>/5</small></div><div className="l">Proyectos</div></div>
                <div className="usage-stat"><div className="v">8.4 GB<small>/20</small></div><div className="l">Almacenamiento</div></div>
                <div className="usage-stat"><div className="v">7<small>/10</small></div><div className="l">Automatizaciones</div></div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }

    // ── EvenApp ───────────────────────────────────────────
    function EvenApp(props) {
      var currentUser = props.currentUser;
      var onSignOut   = props.onSignOut;
      var isDemo      = props.isDemo || false;

      var DEMO_USER = { id:'demo-owner', name:'Juan', email:'juan@even.app', role:'owner', color:'#3B82F6' };
      var user = isDemo ? DEMO_USER : (currentUser || DEMO_USER);

      var _p  = useState(isDemo ? DEMO_PROJECTS : []);
      var projects = _p[0]; var setProjects = _p[1];
      var _tm = useState(isDemo ? DEMO_TEAM : []);
      var teamMembers = _tm[0]; var setTeamMembers = _tm[1];
      var _ld = useState(!isDemo);
      var loading = _ld[0]; var setLoading = _ld[1];
      var _er = useState(null);
      var error = _er[0]; var setError = _er[1];
      var _v  = useState('home');
      var view = _v[0]; var setView = _v[1];
      var _ac = useState(null);
      var active = _ac[0]; var setActive = _ac[1];
      var _f  = useState('todos');
      var filter = _f[0]; var setFilter = _f[1];
      var _mf = useState('todos');
      var memberFilter = _mf[0]; var setMemberFilter = _mf[1];
      var _t  = useState(null);
      var toast = _t[0]; var setToast = _t[1];
      var _cd = useState(null);
      var confirmDel = _cd[0]; var setConfirmDel = _cd[1];
      var _si = useState(false);
      var showInvite = _si[0]; var setShowInvite = _si[1];

      useEffect(function() {
        if (isDemo) return;
        Promise.all([API.getProjects(), API.getTeamMembers()])
          .then(function(r){ setProjects(r[0]); setTeamMembers(r[1]); setLoading(false); })
          .catch(function(e){ setError(e.message||'Error'); setLoading(false); });
      }, []);

      function showToast(msg){ setToast(msg); setTimeout(function(){ setToast(null); }, 2400); }

      function addProject(data) {
        var p = Object.assign({},data,{id:uid(),workspace_id:user.id,created_by:user.id,created_at:new Date().toISOString()});
        API.createProject(p).then(function(saved){ setProjects(function(prev){return prev.concat([saved]);});  setView('home'); showToast('Proyecto creado'); });
      }
      function editProject(id, data) {
        API.updateProject(id,data).then(function(saved){ setProjects(function(prev){return prev.map(function(p){return p.id===id?saved:p;});}); setActive(saved); setView('detail'); showToast('Cambios guardados'); });
      }
      function updateProject(updated) {
        API.updateProject(updated.id,updated).then(function(saved){ setProjects(function(prev){return prev.map(function(p){return p.id===updated.id?saved:p;});}); setActive(saved); });
      }
      function doDelete() {
        var id = confirmDel.id;
        API.deleteProject(id).then(function(){ setProjects(function(prev){return prev.filter(function(p){return p.id!==id;});}); setConfirmDel(null); setActive(null); setView('home'); showToast('Proyecto eliminado'); });
      }
      function inviteMember(email, role) {
        return API.inviteMember(email,role).then(function(){
          if (!isDemo) return API.getTeamMembers().then(function(m){ setTeamMembers(m); });
        });
      }

      if (loading) return <LoadingSkeleton />;
      if (error)   return <ErrorState message={error} onRetry={function(){ setError(null); setLoading(true); }} />;

      var isOwner = user.role === 'owner';
      var myCount = isOwner ? projects.length : projects.filter(function(p){ return p.members && p.members.some(function(m){ return m.id === user.id; }); }).length;

      return (
        <div className="app">
          <div className="app__layout">
            <aside className="app__sidebar">
              <div className="app__brand">Even</div>
              <nav className="app__nav">
                <div className={'app__navitem'+(view==='home'?' active':'')} onClick={function(){setView('home');setActive(null);}}>
                  <Icons.Home /> Inicio <span className="badge">{myCount}</span>
                </div>
                {isOwner && (
                  <div className={'app__navitem'+(view==='auto'?' active':'')} onClick={function(){setView('auto');}}>
                    <Icons.Bolt /> Automatizar
                  </div>
                )}
                <div className="app__navitem"><Icons.Folder /> Archivados</div>
                <div className="app__navitem"><Icons.Bell /> Notificaciones</div>
                <div className={'app__navitem'+(view==='profile'?' active':'')} onClick={function(){setView('profile');}}>
                  <Icons.User /> Perfil
                </div>
              </nav>

              {(isOwner || teamMembers.length > 0) && (
                <div className="sidebar-team">
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 8px 6px' }}>
                    <div className="sidebar-team__head" style={{ padding:0 }}>Equipo</div>
                    {isOwner && <button className="sidebar-invite-btn" onClick={function(){setShowInvite(true);}}>+ Invitar</button>}
                  </div>
                  {teamMembers.map(function(m){
                    return (
                      <div key={m.id} className="sidebar-team__item">
                        <div className="sidebar-team__av" style={{ background:m.color }}>{m.name[0].toUpperCase()}</div>
                        <div className="sidebar-team__info">
                          <div className="sidebar-team__name">{m.name}</div>
                          <div className="sidebar-team__role">{m.role==='owner'?'Owner':'Editor'}</div>
                        </div>
                      </div>
                    );
                  })}
                  {teamMembers.length === 0 && isOwner && (
                    <div style={{ fontSize:12, color:'var(--text-secondary)', padding:'4px 8px', lineHeight:1.5 }}>
                      Invita editores para asignarles proyectos.
                    </div>
                  )}
                </div>
              )}

              <div className="app__sidebar-foot">
                <div className="av" style={{ background:user.color, color:'white' }}>{user.name[0].toUpperCase()}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div className="nm">{user.name}</div>
                  <div className="pl">{isOwner?'Owner - Plan Plus':'Editor'}</div>
                </div>
              </div>
            </aside>

            <main className="app__main" key={view+(active?active.id:'')}>
              {view==='home' && (
                <HomeView
                  projects={projects} currentUser={user} teamMembers={teamMembers}
                  filter={filter} setFilter={setFilter}
                  memberFilter={memberFilter} setMemberFilter={setMemberFilter}
                  onOpen={function(p){setActive(p);setView('detail');}}
                  onNew={function(){setView('new');}}
                  onAuto={function(){setView('auto');}}
                />
              )}
              {view==='detail' && active && (
                <DetailView
                  project={active} teamMembers={teamMembers} currentUser={user}
                  onBack={function(){setView('home');}}
                  onUpdate={updateProject}
                  onEdit={function(){setView('edit');}}
                  onDelete={function(p){setConfirmDel(p);}}
                />
              )}
              {view==='new' && isOwner && (
                <NewProjectView teamMembers={teamMembers} onSave={addProject} onCancel={function(){setView('home');}} />
              )}
              {view==='edit' && active && isOwner && (
                <NewProjectView initial={active} isEdit teamMembers={teamMembers}
                  onSave={function(d){editProject(active.id,d);}}
                  onCancel={function(){setView('detail');}} />
              )}
              {view==='auto' && <AutoView onBack={function(){setView('home');}} />}
              {view==='profile' && <ProfileView user={user} projects={projects} onSignOut={onSignOut} />}
            </main>
          </div>

          <div className={'toast'+(toast?' show':'')}>
            <Icons.Check sw={3} /> {toast}
          </div>

          <div className={'modal-bg'+(confirmDel?' show':'')} onClick={function(){setConfirmDel(null);}}>
            <div className="modal" onClick={function(e){e.stopPropagation();}}>
              <div className="modal__icon"><Icons.Warn /></div>
              <h3>Eliminar proyecto</h3>
              <p>Estas seguro de que quieres eliminar <strong>{confirmDel?confirmDel.name:''}</strong>? Esta accion no se puede deshacer.</p>
              <div className="modal__actions">
                <button className="modal__btn modal__btn--cancel" onClick={function(){setConfirmDel(null);}}>Cancelar</button>
                <button className="modal__btn modal__btn--delete" onClick={doDelete}>Eliminar</button>
              </div>
            </div>
          </div>

          {showInvite && <InviteModal onClose={function(){setShowInvite(false);}} onSuccess={inviteMember} />}
        </div>
      );
    }

    window.EvenApp = EvenApp;

  

    // ── Even — Landing page ───────────────────────────────
    const { useState: useS_L, useEffect: useE_L } = React;

    function Nav({ onLaunchApp }) {
      return (
        <nav className="nav">
          <div className="nav__brand">
            <div className="nav__brand-mark"><img src="data:image/png;base64,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" alt="Even" /></div>
            Even
          </div>
          <div className="nav__menu">
            <a href="#how">Cómo funciona</a>
            <a href="#features">Funciones</a>
            <a href="#demo">Demo</a>
            <a href="#pricing">Precios</a>
            <a href="#faq">Preguntas</a>
          </div>
          <button className="nav__cta" onClick={onLaunchApp}>
            Empezar gratis <Icons.ArrowRight />
          </button>
        </nav>
      );
    }

    function Hero({ onLaunchApp }) {
      return (
        <section className="hero">
          <div className="hero__copy">
            <div className="hero__eyebrow"><span className="dot"></span>Disponible en beta · iOS, Android y Web</div>
            <h1 className="hero__title">
              Automatiza tu día.<br />
              <span className="gradient">Recupera</span> <span className="italic">tu tiempo.</span>
            </h1>
            <p className="hero__lead">
              Even convierte cualquier mensaje, nota de voz o conversación en un <strong>proyecto completo</strong>.
              Branding, fechas, entregables y notas — organizados sin esfuerzo.
            </p>
            <div className="hero__actions">
              <button className="btn btn--primary btn--lg" onClick={onLaunchApp}>
                Empezar gratis <Icons.ArrowRight size={14} />
              </button>
              <a className="btn btn--ghost btn--lg" href="#demo">Ver demo</a>
            </div>
            <div className="hero__metrics">
              <div className="hero__metric">
                <span className="v"><span className="accent">94%</span></span>
                <span className="k">Tiempo ahorrado en triage</span>
              </div>
              <div className="hero__metric">
                <span className="v">3.2k</span>
                <span className="k">Freelancers activos</span>
              </div>
              <div className="hero__metric">
                <span className="v">+120k</span>
                <span className="k">Proyectos creados</span>
              </div>
            </div>
          </div>

          <div className="hero__visual">
            <div className="chip-float chip-float--wa">
              <div className="ico"><Icons.Wa stroke="white" sw={2} /></div>
              <div>
                <div style={{ fontWeight: 600 }}>Mensaje recibido</div>
                <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>WhatsApp · Café Norte</div>
              </div>
            </div>
            <div className="chip-float chip-float--ai">
              <div className="ico"><Icons.Sparkles size={14} stroke="white" /></div>
              <div>
                <div style={{ fontWeight: 600 }}>Even procesando…</div>
                <div style={{ fontSize: 10, color: 'var(--primary-light)' }}>3 entregables detectados</div>
              </div>
            </div>
            <div className="chip-float chip-float--note">
              <div className="ico"><Icons.Mic size={14} /></div>
              <div>
                <div style={{ fontWeight: 600 }}>Nota de voz · 0:42</div>
                <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Transcrita automáticamente</div>
              </div>
            </div>

            <div className="phone phone--floating">
              <div className="phone__notch"></div>
              <div className="phone__statusbar">
                <span>9:41</span>
                <div className="icons"><Icons.Cell size={14} /><Icons.Wifi size={14} /><Icons.Battery size={14} /></div>
              </div>
              <div className="phone__screen">
                <div className="mini-greet">Bienvenido de nuevo</div>
                <div className="mini-title">Hola, Juan</div>
                <div className="mini-stats">
                  <div className="mini-stat mini-stat--accent"><div className="n">2</div><div className="l">Activos</div></div>
                  <div className="mini-stat"><div className="n">1</div><div className="l">Pendiente</div></div>
                  <div className="mini-stat"><div className="n">1</div><div className="l">Hechos</div></div>
                </div>
                <div className="mini-banner">
                  <div className="mini-banner__icon"><Icons.Bolt /></div>
                  <div>
                    <div className="mini-banner__t">Automatiza tu día</div>
                    <div className="mini-banner__s">Comparte un mensaje</div>
                  </div>
                </div>
                <div className="mini-section">Proyectos</div>
                <div className="mini-row">
                  <div className="mini-row__bar" style={{ background: '#F59E0B' }}></div>
                  <div>
                    <div className="mini-row__name">Identidad Café Norte</div>
                    <div className="mini-row__client">Café Norte · 4 entregables</div>
                  </div>
                  <div className="mini-row__date">5 may</div>
                </div>
                <div className="mini-row">
                  <div className="mini-row__bar" style={{ background: '#3B82F6' }}></div>
                  <div>
                    <div className="mini-row__name">Reel Lanzamiento Verano</div>
                    <div className="mini-row__client">Studio Marea · 3 entregables</div>
                  </div>
                  <div className="mini-row__date">2 may</div>
                </div>
                <div className="mini-row">
                  <div className="mini-row__bar" style={{ background: '#22C55E' }}></div>
                  <div>
                    <div className="mini-row__name">Web Restaurante Olivo</div>
                    <div className="mini-row__client">Olivo & Co.</div>
                  </div>
                  <div className="mini-row__date">28 may</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    function Strip() {
      const items = ['Studio Marea', 'Café Norte', 'Lila Wellness', 'Olivo & Co.', 'Casa Lima', 'Atelier Sur'];
      return (
        <section className="strip">
          <div className="strip__inner">
            <div className="strip__label">Confiado por estudios y freelancers</div>
            <div className="strip__items">
              {items.map(i => <div key={i} className="strip__item">{i}</div>)}
            </div>
          </div>
        </section>
      );
    }

    function HowItWorks() {
      return (
        <section className="section" id="how">
          <div className="section__head">
            <div className="section__eyebrow"><i></i>Cómo funciona</div>
            <h2 className="section__title">De un mensaje a un <span className="italic">proyecto completo.</span></h2>
            <p className="section__lead">Tres pasos. Sin formularios. Sin triage manual. Even entiende lo que llega y lo organiza por ti.</p>
          </div>

          <div className="how__grid">
            <div className="how__card">
              <div className="how__num">01</div>
              <h3 className="how__title">Comparte el mensaje</h3>
              <p className="how__body">Reenvía un texto, nota de voz o hilo desde WhatsApp, Instagram o tu correo.</p>
              <div className="how__visual">
                <div className="wa-mock">
                  <div className="wa-bubble">Hola! necesito el video para mi cafetería antes del 15 de mayo.<span className="time">10:24</span></div>
                  <div className="wa-bubble wa-bubble--audio">
                    <div className="play"><Icons.ArrowRight size={10} stroke="white" /></div>
                    <div className="wave"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
                    <span style={{ fontSize: 10 }}>0:42</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="how__card">
              <div className="how__num">02</div>
              <h3 className="how__title">Even lo procesa</h3>
              <p className="how__body">La IA extrae fechas, branding, entregables y notas. En segundos.</p>
              <div className="how__visual">
                <div className="ai-mock">
                  <div className="ai-mock__core"></div>
                  <div className="ai-mock__chips">
                    <div className="ai-chip"><span className="dot"></span>Fechas detectadas</div>
                    <div className="ai-chip"><span className="dot dot--p"></span>Branding sugerido</div>
                    <div className="ai-chip"><span className="dot dot--w"></span>4 entregables</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="how__card">
              <div className="how__num">03</div>
              <h3 className="how__title">Recibe tu proyecto</h3>
              <p className="how__body">Listo para revisar, editar y compartir con tu cliente. Todo en un lugar.</p>
              <div className="how__visual">
                <div className="proj-mock">
                  <div className="proj-mock__head">
                    <div className="proj-mock__bar"></div>
                    <div>
                      <div className="proj-mock__title">Identidad Café Norte</div>
                      <div className="proj-mock__sub">Café Norte · 4 entregables</div>
                    </div>
                  </div>
                  <div className="proj-mock__meta">
                    <div className="proj-mock__chip">15 may</div>
                    <div className="proj-mock__chip">Branding</div>
                  </div>
                  <div className="proj-mock__bar2"><i></i></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    function Features() {
      return (
        <section className="section" id="features" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <div className="section__eyebrow"><i></i>Funciones</div>
            <h2 className="section__title">Todo lo que necesitas, <span className="italic">nada que no.</span></h2>
            <p className="section__lead">Una vista por proyecto. Estado, branding, fechas y entregables. Sin tableros infinitos.</p>
          </div>

          <div className="features__grid">
            <div className="feat feat--lg">
              <h3 className="feat__title">Vista de proyecto unificada</h3>
              <p className="feat__body">Estado, progreso, branding, fechas y entregables — en una sola pantalla diseñada para que decidas rápido.</p>
              <div className="feat__visual">
                <div className="fviz-project">
                  <div className="fviz-project__badge"><span className="dot"></span>En progreso</div>
                  <div className="fviz-project__title">Identidad<br />Café Norte</div>
                  <div className="fviz-project__client">Café Norte · 4 entregables</div>
                  <div className="fviz-project__chips">
                    <span className="fviz-project__chip">15 may</span>
                    <span className="fviz-project__chip">Branding</span>
                    <span className="fviz-project__chip">Logo</span>
                  </div>
                  <div className="fviz-project__progress">
                    <div className="row"><span>Progreso</span><span>65%</span></div>
                    <div className="bar"><div className="fill"></div></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="feat">
              <h3 className="feat__title">Fechas y entregas</h3>
              <p className="feat__body">Even detecta fechas en cualquier formato y te avisa antes de que pase.</p>
              <div className="feat__visual">
                <div className="fviz-cal">
                  {Array.from({ length: 21 }, (_, i) => {
                    const cls =
                      i === 14 ? 'fviz-cal__day fviz-cal__day--active' :
                        i === 7 || i === 16 ? 'fviz-cal__day fviz-cal__day--soon' :
                          i < 6 ? 'fviz-cal__day fviz-cal__day--past' : 'fviz-cal__day';
                    return <div key={i} className={cls}>{i + 1}</div>;
                  })}
                </div>
              </div>
            </div>

            <div className="feat">
              <h3 className="feat__title">Branding sugerido</h3>
              <p className="feat__body">Paleta y tipografía propuestas según el tono del cliente. Lista para iterar.</p>
              <div className="feat__visual">
                <div className="fviz-brand">
                  <div className="fviz-brand__row">
                    <div className="fviz-brand__sw" style={{ background: '#F59E0B' }}></div>
                    <div className="fviz-brand__sw" style={{ background: '#1F1408' }}></div>
                    <div className="fviz-brand__sw" style={{ background: '#FEF6E7' }}></div>
                  </div>
                  <div className="fviz-brand__type">Aa <span>cálido</span></div>
                  <div className="fviz-brand__meta">Plus Jakarta Sans · 700 / 500 / 400</div>
                </div>
              </div>
            </div>

            <div className="feat">
              <h3 className="feat__title">Notas y entregables</h3>
              <p className="feat__body">Checklist automático. Marca lo hecho, Even actualiza el progreso.</p>
              <div className="feat__visual">
                <div className="fviz-notes">
                  <div className="fviz-notes__check done"><div className="box"></div><div className="label">Logotipo principal</div></div>
                  <div className="fviz-notes__check done"><div className="box"></div><div className="label">Paleta + tipografía</div></div>
                  <div className="fviz-notes__check"><div className="box"></div><div className="label">Manual de marca</div></div>
                  <div className="fviz-notes__check"><div className="box"></div><div className="label">Aplicaciones (taza, bolsa)</div></div>
                </div>
              </div>
            </div>

            <div className="feat">
              <h3 className="feat__title">Captura desde donde sea</h3>
              <p className="feat__body">WhatsApp, Instagram, correo o nota de voz. Comparte y listo.</p>
              <div className="feat__visual" style={{ display: 'grid', placeItems: 'center' }}>
                <div style={{ display: 'flex', gap: 14 }}>
                  <div className="auto__platforms" style={{ background: 'transparent', border: 'none', padding: 0, gap: 14 }}>
                    <div className="tile wa"><Icons.Wa /></div>
                    <div className="tile ig"><Icons.Cam /></div>
                    <div className="tile audio"><Icons.Mic /></div>
                    <div className="tile share"><Icons.Share /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    function Demo({ onLaunchApp }) {
      return (
        <section className="demo" id="demo">
          <div className="demo__container">
            <div className="demo__head">
              <div className="section__eyebrow"><i></i>Demo en vivo</div>
              <h2 className="section__title">Pruébalo ahora.</h2>
              <p className="section__lead">Esta es la app real. Crea, edita y completa proyectos. Lo que hagas aquí queda en tu sesión.</p>
              <div style={{ marginTop: 18 }}>
                <button className="btn btn--primary" onClick={onLaunchApp}>Abrir en pantalla completa <Icons.ArrowRight size={14} /></button>
              </div>
            </div>

            <div className="demo__frame">
              <div className="demo__chrome">
                <span className="dot dot--r"></span>
                <span className="dot dot--y"></span>
                <span className="dot dot--g"></span>
                <span className="url">app.even.app</span>
              </div>
              <div className="demo__viewport">
                <EvenApp isDemo={true} />
              </div>
            </div>
          </div>
        </section>
      );
    }

    function Pricing({ onLaunchApp }) {
      return (
        <section className="section" id="pricing">
          <div className="section__head">
            <div className="section__eyebrow"><i></i>Precios</div>
            <h2 className="section__title">Empieza gratis. <span className="italic">Crece cuando quieras.</span></h2>
            <p className="section__lead">Sin tarjeta de crédito. Cancela en un clic. Diseñado para freelancers que valoran su tiempo.</p>
          </div>

          <div className="pricing__grid">
            <div className="plan">
              <div className="plan__name">Free</div>
              <div className="plan__price"><span className="v">$0</span><span className="u">/mes</span></div>
              <p className="plan__tagline">Para empezar a recuperar tu tiempo.</p>
              <ul className="plan__features">
                <li><Icons.Check sw={3} /> 2 proyectos simultáneos</li>
                <li><Icons.Check sw={3} /> Captura desde WhatsApp</li>
                <li><Icons.Check sw={3} /> 1 GB de almacenamiento</li>
                <li><Icons.Check sw={3} /> Notas y entregables ilimitados</li>
              </ul>
              <button className="plan__cta" onClick={onLaunchApp}>Empezar gratis</button>
            </div>

            <div className="plan plan--featured">
              <div className="plan__tag">Más popular</div>
              <div className="plan__name">Plus</div>
              <div className="plan__price"><span className="v">$9</span><span className="u">/mes</span></div>
              <p className="plan__tagline">Para freelancers en crecimiento.</p>
              <ul className="plan__features">
                <li><Icons.Check sw={3} /> 5 proyectos simultáneos</li>
                <li><Icons.Check sw={3} /> Automatización IA básica</li>
                <li><Icons.Check sw={3} /> Revisión avanzada con cliente</li>
                <li><Icons.Check sw={3} /> 20 GB de almacenamiento</li>
                <li><Icons.Check sw={3} /> Branding sugerido</li>
              </ul>
              <button className="plan__cta plan__cta--primary" onClick={onLaunchApp}>Empezar Plus</button>
            </div>

            <div className="plan">
              <div className="plan__name">Ultra</div>
              <div className="plan__price"><span className="v">$24</span><span className="u">/mes</span></div>
              <p className="plan__tagline">Para estudios y equipos pequeños.</p>
              <ul className="plan__features">
                <li><Icons.Check sw={3} /> Proyectos ilimitados</li>
                <li><Icons.Check sw={3} /> Automatización IA avanzada</li>
                <li><Icons.Check sw={3} /> Espacios compartidos por equipo</li>
                <li><Icons.Check sw={3} /> 200 GB de almacenamiento</li>
                <li><Icons.Check sw={3} /> Soporte prioritario</li>
              </ul>
              <button className="plan__cta" onClick={onLaunchApp}>Hablar con ventas</button>
            </div>
          </div>
        </section>
      );
    }

    function FAQ() {
      const items = [
        { q: '¿Cómo entiende Even un mensaje?', a: 'Usamos modelos de lenguaje entrenados específicamente en briefs creativos. Detectamos fechas (incluso cuando dicen "para el viernes"), entregables, paleta sugerida y tono del cliente.' },
        { q: '¿Funciona con notas de voz de WhatsApp?', a: 'Sí. Reenvía la nota a Even y la transcribimos antes de procesarla. Soporta español neutro, andaluz, mexicano, colombiano y argentino.' },
        { q: '¿Mis datos están seguros?', a: 'Cifrado en tránsito y reposo (AES-256). No entrenamos modelos con tus mensajes. Puedes eliminar todo desde tu cuenta.' },
        { q: '¿Hay versión de escritorio?', a: 'Esta web es nuestra versión de escritorio oficial. Funciona en Chrome, Safari y Firefox. La app móvil está en iOS y Android.' },
        { q: '¿Puedo cancelar cuando quiera?', a: 'Sí. Sin contratos, sin permanencia. Conservas el acceso hasta el final del período pagado.' },
      ];
      return (
        <section className="section" id="faq" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <div className="section__eyebrow"><i></i>FAQ</div>
            <h2 className="section__title">Preguntas frecuentes</h2>
          </div>
          <div className="faq__list">
            {items.map((it, i) => (
              <details key={i} className="faq__item">
                <summary>{it.q}</summary>
                <div className="faq__answer">{it.a}</div>
              </details>
            ))}
          </div>
        </section>
      );
    }

    function CTABanner({ onLaunchApp }) {
      return (
        <section className="cta-banner">
          <h2 className="cta-banner__title">Recupera tu tiempo. <span className="italic">Hoy.</span></h2>
          <p className="cta-banner__lead">Únete a 3.000+ freelancers que ya automatizan sus proyectos con Even.</p>
          <div className="cta-banner__actions">
            <button className="btn btn--primary btn--lg" onClick={onLaunchApp}>Empezar gratis <Icons.ArrowRight size={14} /></button>
            <a className="btn btn--ghost btn--lg" href="#demo">Ver demo</a>
          </div>
        </section>
      );
    }

    function Foot() {
      return (
        <footer className="foot">
          <div className="foot__inner">
            <div className="foot__brand">
              <div className="foot__brand-row"><img src="data:image/png;base64,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" alt="Even" /> Even</div>
              <p className="foot__tagline">Automatiza tu día. Recupera tu tiempo. Diseñado para freelancers y estudios creativos.</p>
            </div>
            <div className="foot__col">
              <h4>Producto</h4>
              <ul>
                <li><a href="#features">Funciones</a></li>
                <li><a href="#pricing">Precios</a></li>
                <li><a href="#demo">Demo</a></li>
                <li><a href="#">Cambios</a></li>
              </ul>
            </div>
            <div className="foot__col">
              <h4>Compañía</h4>
              <ul>
                <li><a href="#">Sobre nosotros</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contacto</a></li>
              </ul>
            </div>
            <div className="foot__col">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Privacidad</a></li>
                <li><a href="#">Términos</a></li>
                <li><a href="#">Seguridad</a></li>
              </ul>
            </div>
          </div>
          <div className="foot__giant">Even</div>
          <div className="foot__bottom">
            <span>© 2026 Even. Todos los derechos reservados.</span>
            <span>Hecho con cariño en Bogotá</span>
          </div>
        </footer>
      );
    }

    function Site({ onLaunchApp }) {
      return (
        <div className="site">
          <Nav onLaunchApp={onLaunchApp} />
          <Hero onLaunchApp={onLaunchApp} />
          <Strip />
          <HowItWorks />
          <Features />
          <Demo onLaunchApp={onLaunchApp} />
          <Pricing onLaunchApp={onLaunchApp} />
          <FAQ />
          <CTABanner onLaunchApp={onLaunchApp} />
          <Foot />
        </div>
      );
    }

    window.Site = Site;

  

    // ── Even — Landing v2 (Cinematic) ─────────────────────
    // Same brand. Same palette. Same logo. Premium polish layer.
    const { useState: useS_LV, useEffect: useE_LV, useRef: useR_LV, useLayoutEffect: useLE_LV } = React;

    // ── Reveal hook ─────────────────────────────────────
    // Adds .reveal--in to elements with class .reveal as they intersect.
    function useScrollReveal() {
      useE_LV(() => {
        const els = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) {
          els.forEach(el => el.classList.add('reveal--in'));
          return;
        }
        const io = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal--in');
              io.unobserve(entry.target);
            }
          });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
        els.forEach(el => io.observe(el));
        return () => io.disconnect();
      }, []);
    }

    // ── Mouse-reactive ambient light ────────────────────
    function useMouseLight() {
      useE_LV(() => {
        const root = document.querySelector('.site-v2');
        if (!root) return;
        let raf = null;
        let tx = 50, ty = 30;   // target %
        let cx = 50, cy = 30;   // current %

        const onMove = (e) => {
          tx = (e.clientX / window.innerWidth) * 100;
          ty = (e.clientY / window.innerHeight) * 100;
          if (!raf) raf = requestAnimationFrame(tick);
        };
        const tick = () => {
          cx += (tx - cx) * 0.06;
          cy += (ty - cy) * 0.06;
          root.style.setProperty('--mx', cx + '%');
          root.style.setProperty('--my', cy + '%');
          if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
            raf = requestAnimationFrame(tick);
          } else { raf = null; }
        };
        window.addEventListener('mousemove', onMove);
        return () => { window.removeEventListener('mousemove', onMove); if (raf) cancelAnimationFrame(raf); };
      }, []);
    }

    // ── Card pointer tracking (for border glow) ─────────
    function useCardCursors(selector) {
      useE_LV(() => {
        const cards = document.querySelectorAll(selector);
        const handlers = [];
        cards.forEach(card => {
          const onMove = (e) => {
            const r = card.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width) * 100;
            const y = ((e.clientY - r.top) / r.height) * 100;
            card.style.setProperty('--cx', x + '%');
            card.style.setProperty('--cy', y + '%');
          };
          card.addEventListener('mousemove', onMove);
          handlers.push([card, onMove]);
        });
        return () => handlers.forEach(([c, h]) => c.removeEventListener('mousemove', h));
      }, []);
    }

    // ── Hero phone parallax ─────────────────────────────
    function usePhoneParallax() {
      useE_LV(() => {
        const stage = document.querySelector('.hero__visual-stage');
        const visual = document.querySelector('.hero__visual');
        if (!stage || !visual) return;
        let raf = null;
        let tx = 0, ty = 0, cx = 0, cy = 0;

        const onMove = (e) => {
          const r = visual.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width - 0.5);
          const y = ((e.clientY - r.top) / r.height - 0.5);
          tx = x * 6;   // degrees Y
          ty = -y * 4;  // degrees X
          if (!raf) raf = requestAnimationFrame(tick);
        };
        const onLeave = () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(tick); };
        const tick = () => {
          cx += (tx - cx) * 0.08;
          cy += (ty - cy) * 0.08;
          stage.style.transform = `rotateY(${cx}deg) rotateX(${cy}deg)`;
          if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
            raf = requestAnimationFrame(tick);
          } else { raf = null; }
        };
        visual.addEventListener('mousemove', onMove);
        visual.addEventListener('mouseleave', onLeave);
        return () => {
          visual.removeEventListener('mousemove', onMove);
          visual.removeEventListener('mouseleave', onLeave);
          if (raf) cancelAnimationFrame(raf);
        };
      }, []);
    }

    // ── Sticky-nav scroll state ─────────────────────────
    function useStickyNav() {
      useE_LV(() => {
        const nav = document.querySelector('.site-v2 .nav');
        if (!nav) return;
        const onScroll = () => {
          if (window.scrollY > 24) nav.classList.add('is-stuck');
          else nav.classList.remove('is-stuck');
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
      }, []);
    }

    // ── Subtle parallax for hero visual on scroll ───────
    function useHeroScrollParallax() {
      useE_LV(() => {
        const visual = document.querySelector('.hero__visual');
        const chips = document.querySelectorAll('.chip-float');
        if (!visual) return;
        let raf = null;
        const onScroll = () => {
          if (raf) return;
          raf = requestAnimationFrame(() => {
            const y = window.scrollY;
            if (y < 1000) {
              visual.style.transform = `translateY(${y * 0.06}px)`;
              chips.forEach((c, i) => {
                const factor = [0.10, -0.08, 0.04][i] || 0;
                c.style.translate = `0 ${y * factor}px`;
              });
            }
            raf = null;
          });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
      }, []);
    }

    // ── Trigger hero entrance ───────────────────────────
    function useHeroEntrance() {
      useE_LV(() => {
        const t = setTimeout(() => document.body.classList.add('is-loaded'), 60);
        return () => clearTimeout(t);
      }, []);
    }

    // ── Components ─────────────────────────────────────
    function SceneBg() {
      return (
        <React.Fragment>
          <div className="scene-bg" aria-hidden="true">
            <div className="scene-bg__orb scene-bg__orb--a"></div>
            <div className="scene-bg__orb scene-bg__orb--b"></div>
            <div className="scene-bg__orb scene-bg__orb--c"></div>
          </div>
          <div className="scene-grid" aria-hidden="true"></div>
        </React.Fragment>
      );
    }

    function TopBar() {
      return (
        <div className="top-bar">
          <span className="top-bar__badge">Beta</span>
          <span className="top-bar__dot" />
          <span>Even ya esta disponible &middot; <a href="#demo">Ver la demo en vivo &rarr;</a></span>
        </div>
      );
    }

    function NavV2({ onLaunchApp }) {
      return (
        <nav className="nav">
          <div className="nav__brand">
            <div className="nav__brand-mark"><img src="data:image/png;base64,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" alt="Even" /></div>
            <span>Even</span>
          </div>
          <div className="nav__menu">
            <a href="#how">Como funciona</a>
            <a href="#features">Funciones</a>
            <a href="#demo">Demo</a>
            <a href="#pricing">Precios</a>
            <a href="#faq">Preguntas</a>
          </div>
          <button className="nav__cta" onClick={onLaunchApp}>
            Empezar gratis <Icons.ArrowRight />
          </button>
        </nav>
      );
    }

    function HeroV2({ onLaunchApp }) {
      return (
        <section className="hero">
          <div className="hero__copy">
            <a className="hero__announce reveal" href="#features" style={{ '--reveal-delay': '0ms' }}>
              <span className="hero__announce-badge">Nuevo</span>
              <span>Captura desde notas de voz en WhatsApp</span>
              <Icons.ChevronRight size={12} />
            </a>

            <h1 className="hero__title">
              <span className="hero__title-line"><span style={{ '--line-delay': '120ms' }}>Automatiza tu día.</span></span>
              <span className="hero__title-line">
                <span style={{ '--line-delay': '320ms' }}>
                  <span className="gradient">Recupera</span>{' '}
                  <span className="italic">tu tiempo.</span>
                </span>
              </span>
            </h1>

            <p className="hero__lead reveal" style={{ '--reveal-delay': '420ms' }}>
              Even convierte cualquier mensaje, nota de voz o conversación en un <strong>proyecto completo</strong>.
              Branding, fechas, entregables y notas — organizados sin esfuerzo.
            </p>

            <div className="hero__actions reveal" style={{ '--reveal-delay': '560ms' }}>
              <button className="btn btn--primary btn--lg" onClick={onLaunchApp}>
                Empezar gratis <Icons.ArrowRight size={14} />
              </button>
              <a className="btn btn--ghost btn--lg" href="#demo">Ver demo en vivo</a>
            </div>

            <div className="hero__trust reveal" style={{ '--reveal-delay': '680ms' }}>
              <span className="ic"><Icons.Check sw={3} /> Sin tarjeta</span>
              <span className="sep"></span>
              <span className="ic"><Icons.Check sw={3} /> 2 min para configurar</span>
              <span className="sep"></span>
              <span className="ic"><Icons.Check sw={3} /> Cancela cuando quieras</span>
            </div>

            <div className="hero__metrics reveal" style={{ '--reveal-delay': '820ms' }}>
              <div className="hero__metric">
                <span className="v"><span className="accent">95%</span></span>
                <span className="k">Menos tiempo en organizar briefs</span>
              </div>
              <div className="hero__metric">
                <span className="v">30<span style={{fontSize:'0.5em',color:'var(--text-muted)'}}>s</span></span>
                <span className="k">De mensaje a proyecto listo</span>
              </div>
              <div className="hero__metric">
                <span className="v">3</span>
                <span className="k">Integraciones: WA, Drive, Cal</span>
              </div>
              <div className="hero__metric">
                <span className="v"><span className="accent">∞</span></span>
                <span className="k">Notas y entregables sin límite</span>
              </div>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__visual-stage">
              <div className="chip-float chip-float--wa">
                <div className="ico"><Icons.Wa stroke="white" sw={2} /></div>
                <div>
                  <div style={{ fontWeight: 600 }}>Mensaje recibido</div>
                  <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>WhatsApp · Café Norte</div>
                </div>
              </div>
              <div className="chip-float chip-float--ai">
                <div className="ico"><Icons.Sparkles size={14} stroke="white" /></div>
                <div>
                  <div style={{ fontWeight: 600 }}>Even procesando…</div>
                  <div style={{ fontSize: 10, color: 'var(--primary-light)' }}>3 entregables detectados</div>
                </div>
              </div>
              <div className="chip-float chip-float--note">
                <div className="ico"><Icons.Mic size={14} /></div>
                <div>
                  <div style={{ fontWeight: 600 }}>Nota de voz · 0:42</div>
                  <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Transcrita automáticamente</div>
                </div>
              </div>

              <div className="phone phone--floating">
                <div className="phone__notch"></div>
                <div className="phone__statusbar">
                  <span>9:41</span>
                  <div className="icons"><Icons.Cell size={14} /><Icons.Wifi size={14} /><Icons.Battery size={14} /></div>
                </div>
                <div className="phone__screen">
                  <div className="mini-greet">Bienvenido de nuevo</div>
                  <div className="mini-title">Hola, Juan</div>
                  <div className="mini-stats">
                    <div className="mini-stat mini-stat--accent"><div className="n">2</div><div className="l">Activos</div></div>
                    <div className="mini-stat"><div className="n">1</div><div className="l">Pendiente</div></div>
                    <div className="mini-stat"><div className="n">1</div><div className="l">Hechos</div></div>
                  </div>
                  <div className="mini-banner">
                    <div className="mini-banner__icon"><Icons.Bolt /></div>
                    <div>
                      <div className="mini-banner__t">Automatiza tu día</div>
                      <div className="mini-banner__s">Comparte un mensaje</div>
                    </div>
                  </div>
                  <div className="mini-section">Proyectos</div>
                  <div className="mini-row">
                    <div className="mini-row__bar" style={{ background: '#F59E0B' }}></div>
                    <div>
                      <div className="mini-row__name">Identidad Café Norte</div>
                      <div className="mini-row__client">Café Norte · 4 entregables</div>
                    </div>
                    <div className="mini-row__date">5 may</div>
                  </div>
                  <div className="mini-row">
                    <div className="mini-row__bar" style={{ background: '#3B82F6' }}></div>
                    <div>
                      <div className="mini-row__name">Reel Lanzamiento Verano</div>
                      <div className="mini-row__client">Studio Marea · 3 entregables</div>
                    </div>
                    <div className="mini-row__date">2 may</div>
                  </div>
                  <div className="mini-row">
                    <div className="mini-row__bar" style={{ background: '#22C55E' }}></div>
                    <div>
                      <div className="mini-row__name">Web Restaurante Olivo</div>
                      <div className="mini-row__client">Olivo & Co.</div>
                    </div>
                    <div className="mini-row__date">28 may</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero__scroll" aria-hidden="true">
            <span>Scroll</span>
            <div className="hero__scroll-line"></div>
          </div>
        </section>
      );
    }

    function StripV2() {
      // Doubled for marquee loop
      const items = ['Studio Marea', 'Café Norte', 'Lila Wellness', 'Olivo & Co.', 'Casa Lima', 'Atelier Sur', 'Bruma Studio', 'Norte Visual'];
      return (
        <section className="strip">
          <div className="strip__inner">
            <div className="strip__label">Confiado por estudios y freelancers</div>
            <div className="strip__items">
              <div className="strip__track">
                {items.concat(items).map((i, idx) => <div key={idx} className="strip__item">{i}</div>)}
              </div>
            </div>
          </div>
        </section>
      );
    }

    function HowV2() {
      return (
        <section className="section" id="how">
          <div className="section__head">
            <div className="section__eyebrow reveal"><i></i>Cómo funciona</div>
            <h2 className="section__title reveal" style={{ '--reveal-delay': '120ms' }}>
              De un mensaje a un <span className="italic">proyecto completo.</span>
            </h2>
            <p className="section__lead reveal" style={{ '--reveal-delay': '240ms' }}>
              Tres pasos. Sin formularios. Sin triage manual. Even entiende lo que llega y lo organiza por ti.
            </p>
          </div>

          <div className="how__grid">
            <div className="how__card reveal" style={{ '--reveal-delay': '0ms' }}>
              <div className="how__num">01</div>
              <h3 className="how__title">Comparte el mensaje</h3>
              <p className="how__body">Reenvía un texto, nota de voz o hilo desde WhatsApp, Instagram o tu correo.</p>
              <div className="how__visual">
                <div className="wa-mock">
                  <div className="wa-bubble">Hola! necesito el video para mi cafetería antes del 15 de mayo.<span className="time">10:24</span></div>
                  <div className="wa-bubble wa-bubble--audio">
                    <div className="play"><Icons.ArrowRight size={10} stroke="white" /></div>
                    <div className="wave"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
                    <span style={{ fontSize: 10 }}>0:42</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="how__card reveal" style={{ '--reveal-delay': '160ms' }}>
              <div className="how__num">02</div>
              <h3 className="how__title">Even lo procesa</h3>
              <p className="how__body">La IA extrae fechas, branding, entregables y notas. En segundos.</p>
              <div className="how__visual">
                <div className="ai-mock">
                  <div className="ai-mock__core"></div>
                  <div className="ai-mock__chips">
                    <div className="ai-chip"><span className="dot"></span>Fechas detectadas</div>
                    <div className="ai-chip"><span className="dot dot--p"></span>Branding sugerido</div>
                    <div className="ai-chip"><span className="dot dot--w"></span>4 entregables</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="how__card reveal" style={{ '--reveal-delay': '320ms' }}>
              <div className="how__num">03</div>
              <h3 className="how__title">Recibe tu proyecto</h3>
              <p className="how__body">Listo para revisar, editar y compartir con tu cliente. Todo en un lugar.</p>
              <div className="how__visual">
                <div className="proj-mock">
                  <div className="proj-mock__head">
                    <div className="proj-mock__bar"></div>
                    <div>
                      <div className="proj-mock__title">Identidad Café Norte</div>
                      <div className="proj-mock__sub">Café Norte · 4 entregables</div>
                    </div>
                  </div>
                  <div className="proj-mock__meta">
                    <div className="proj-mock__chip">15 may</div>
                    <div className="proj-mock__chip">Branding</div>
                  </div>
                  <div className="proj-mock__bar2"><i></i></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    function FeaturesV2() {
      return (
        <section className="section" id="features" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <div className="section__eyebrow reveal"><i></i>Funciones</div>
            <h2 className="section__title reveal" style={{ '--reveal-delay': '120ms' }}>
              Todo lo que necesitas, <span className="italic">nada que no.</span>
            </h2>
            <p className="section__lead reveal" style={{ '--reveal-delay': '240ms' }}>
              Una vista por proyecto. Estado, branding, fechas y entregables. Sin tableros infinitos.
            </p>
          </div>

          <div className="features__grid">
            <div className="feat feat--lg reveal" style={{ '--reveal-delay': '0ms' }}>
              <h3 className="feat__title">Vista de proyecto unificada</h3>
              <p className="feat__body">Estado, progreso, branding, fechas y entregables — en una sola pantalla diseñada para que decidas rápido.</p>
              <div className="feat__visual">
                <div className="fviz-project">
                  <div className="fviz-project__badge"><span className="dot"></span>En progreso</div>
                  <div className="fviz-project__title">Identidad<br />Café Norte</div>
                  <div className="fviz-project__client">Café Norte · 4 entregables</div>
                  <div className="fviz-project__chips">
                    <span className="fviz-project__chip">15 may</span>
                    <span className="fviz-project__chip">Branding</span>
                    <span className="fviz-project__chip">Logo</span>
                  </div>
                  <div className="fviz-project__progress">
                    <div className="row"><span>Progreso</span><span>65%</span></div>
                    <div className="bar"><div className="fill"></div></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="feat reveal" style={{ '--reveal-delay': '120ms' }}>
              <h3 className="feat__title">Fechas y entregas</h3>
              <p className="feat__body">Even detecta fechas en cualquier formato y te avisa antes de que pase.</p>
              <div className="feat__visual">
                <div className="fviz-cal">
                  {Array.from({ length: 21 }, (_, i) => {
                    const cls =
                      i === 14 ? 'fviz-cal__day fviz-cal__day--active' :
                        i === 7 || i === 16 ? 'fviz-cal__day fviz-cal__day--soon' :
                          i < 6 ? 'fviz-cal__day fviz-cal__day--past' : 'fviz-cal__day';
                    return <div key={i} className={cls}>{i + 1}</div>;
                  })}
                </div>
              </div>
            </div>

            <div className="feat reveal" style={{ '--reveal-delay': '240ms' }}>
              <h3 className="feat__title">Branding sugerido</h3>
              <p className="feat__body">Paleta y tipografía propuestas según el tono del cliente. Lista para iterar.</p>
              <div className="feat__visual">
                <div className="fviz-brand">
                  <div className="fviz-brand__row">
                    <div className="fviz-brand__sw" style={{ background: '#F59E0B' }}></div>
                    <div className="fviz-brand__sw" style={{ background: '#1F1408' }}></div>
                    <div className="fviz-brand__sw" style={{ background: '#FEF6E7' }}></div>
                  </div>
                  <div className="fviz-brand__type">Aa <span>cálido</span></div>
                  <div className="fviz-brand__meta">Plus Jakarta Sans · 700 / 500 / 400</div>
                </div>
              </div>
            </div>

            <div className="feat reveal" style={{ '--reveal-delay': '180ms' }}>
              <h3 className="feat__title">Notas y entregables</h3>
              <p className="feat__body">Checklist automático. Marca lo hecho, Even actualiza el progreso.</p>
              <div className="feat__visual">
                <div className="fviz-notes">
                  <div className="fviz-notes__check done"><div className="box"></div><div className="label">Logotipo principal</div></div>
                  <div className="fviz-notes__check done"><div className="box"></div><div className="label">Paleta + tipografía</div></div>
                  <div className="fviz-notes__check"><div className="box"></div><div className="label">Manual de marca</div></div>
                  <div className="fviz-notes__check"><div className="box"></div><div className="label">Aplicaciones (taza, bolsa)</div></div>
                </div>
              </div>
            </div>

            <div className="feat reveal" style={{ '--reveal-delay': '300ms' }}>
              <h3 className="feat__title">Captura desde donde sea</h3>
              <p className="feat__body">WhatsApp, Instagram, correo o nota de voz. Comparte y listo.</p>
              <div className="feat__visual" style={{ display: 'grid', placeItems: 'center' }}>
                <div style={{ display: 'flex', gap: 14 }}>
                  <div className="auto__platforms" style={{ background: 'transparent', border: 'none', padding: 0, gap: 14 }}>
                    <div className="tile wa"><Icons.Wa /></div>
                    <div className="tile ig"><Icons.Cam /></div>
                    <div className="tile audio"><Icons.Mic /></div>
                    <div className="tile share"><Icons.Share /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    function DemoV2({ onLaunchApp }) {
      return (
        <section className="demo" id="demo">
          <div className="demo__container">
            <div className="demo__head">
              <div className="section__eyebrow reveal"><i></i>Demo en vivo</div>
              <h2 className="section__title reveal" style={{ '--reveal-delay': '120ms' }}>Pruébalo ahora.</h2>
              <p className="section__lead reveal" style={{ '--reveal-delay': '240ms' }}>
                Esta es la app real. Crea, edita y completa proyectos. Lo que hagas aquí queda en tu sesión.
              </p>
              <div className="reveal" style={{ marginTop: 22, '--reveal-delay': '360ms' }}>
                <button className="btn btn--primary" onClick={onLaunchApp}>
                  Abrir en pantalla completa <Icons.ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="demo__frame reveal" style={{ '--reveal-delay': '120ms' }}>
              <div className="demo__chrome">
                <span className="dot dot--r"></span>
                <span className="dot dot--y"></span>
                <span className="dot dot--g"></span>
                <span className="url">app.even.app</span>
              </div>
              <div className="demo__viewport">
                <EvenApp isDemo={true} />
              </div>
            </div>
          </div>
        </section>
      );
    }

    function PricingV2({ onLaunchApp }) {
      const [annual, setAnnual] = React.useState(false);
      const price = (mo, yr) => annual ? yr : mo;
      return (
        <section className="section" id="pricing">
          <div className="section__head">
            <div className="section__eyebrow reveal"><i></i>Precios</div>
            <h2 className="section__title reveal" style={{ '--reveal-delay': '120ms' }}>
              Empieza gratis. <span className="italic">Crece cuando quieras.</span>
            </h2>
            <p className="section__lead reveal" style={{ '--reveal-delay': '240ms' }}>
              Sin tarjeta de crédito. Cancela en un clic. Diseñado para freelancers que valoran su tiempo.
            </p>
          </div>

          <div className="pricing__toggle reveal" style={{ '--reveal-delay': '200ms' }}>
            <span className={`pricing__toggle-label${!annual ? ' is-active' : ''}`}>Mensual</span>
            <div className={`pricing__toggle-track${annual ? ' is-annual' : ''}`} onClick={() => setAnnual(a => !a)}>
              <div className="pricing__toggle-thumb" />
            </div>
            <span className={`pricing__toggle-label${annual ? ' is-active' : ''}`}>Anual</span>
            {annual && <span className="pricing__save-badge">Ahorra 20%</span>}
          </div>

          <div className="pricing__grid">
            <div className="plan reveal" style={{ '--reveal-delay': '0ms' }}>
              <div className="plan__name">Free</div>
              <div className="plan__price"><span className="v">$0</span><span className="u">/mes</span></div>
              <p className="plan__tagline">Para empezar a recuperar tu tiempo.</p>
              <ul className="plan__features">
                <li><Icons.Check sw={3} /> 2 proyectos simultáneos</li>
                <li><Icons.Check sw={3} /> Captura desde WhatsApp</li>
                <li><Icons.Check sw={3} /> 1 GB de almacenamiento</li>
                <li><Icons.Check sw={3} /> Notas y entregables ilimitados</li>
              </ul>
              <button className="plan__cta" onClick={onLaunchApp}>Empezar gratis</button>
            </div>

            <div className="plan plan--featured reveal" style={{ '--reveal-delay': '160ms' }}>
              <div className="plan__tag">Más popular</div>
              <div className="plan__name">Plus</div>
              <div className="plan__price"><span className="v">{price('$9','$7')}</span><span className="u">/mes</span></div>
              <p className="plan__tagline">Para freelancers en crecimiento.</p>
              <ul className="plan__features">
                <li><Icons.Check sw={3} /> 5 proyectos simultáneos</li>
                <li><Icons.Check sw={3} /> Automatización IA básica</li>
                <li><Icons.Check sw={3} /> Revisión avanzada con cliente</li>
                <li><Icons.Check sw={3} /> 20 GB de almacenamiento</li>
                <li><Icons.Check sw={3} /> Branding sugerido</li>
              </ul>
              <button className="plan__cta plan__cta--primary" onClick={onLaunchApp}>Empezar Plus</button>
            </div>

            <div className="plan reveal" style={{ '--reveal-delay': '320ms' }}>
              <div className="plan__name">Ultra</div>
              <div className="plan__price"><span className="v">{price('$24','$19')}</span><span className="u">/mes</span></div>
              <p className="plan__tagline">Para estudios y equipos pequeños.</p>
              <ul className="plan__features">
                <li><Icons.Check sw={3} /> Proyectos ilimitados</li>
                <li><Icons.Check sw={3} /> Automatización IA avanzada</li>
                <li><Icons.Check sw={3} /> Espacios compartidos por equipo</li>
                <li><Icons.Check sw={3} /> 200 GB de almacenamiento</li>
                <li><Icons.Check sw={3} /> Soporte prioritario</li>
              </ul>
              <button className="plan__cta" onClick={onLaunchApp}>Hablar con ventas</button>
            </div>
          </div>
        </section>
      );
    }

    function FAQV2() {
      const items = [
        { q: '¿Cómo entiende Even un mensaje?', a: 'Usamos modelos de lenguaje entrenados específicamente en briefs creativos. Detectamos fechas (incluso cuando dicen "para el viernes"), entregables, paleta sugerida y tono del cliente.' },
        { q: '¿Funciona con notas de voz de WhatsApp?', a: 'Sí. Reenvía la nota a Even y la transcribimos antes de procesarla. Soporta español neutro, andaluz, mexicano, colombiano y argentino.' },
        { q: '¿Mis datos están seguros?', a: 'Cifrado en tránsito y reposo (AES-256). No entrenamos modelos con tus mensajes. Puedes eliminar todo desde tu cuenta.' },
        { q: '¿Hay versión de escritorio?', a: 'Esta web es nuestra versión de escritorio oficial. Funciona en Chrome, Safari y Firefox. La app móvil está en iOS y Android.' },
        { q: '¿Puedo cancelar cuando quiera?', a: 'Sí. Sin contratos, sin permanencia. Conservas el acceso hasta el final del período pagado.' },
      ];
      return (
        <section className="section" id="faq" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <div className="section__eyebrow reveal"><i></i>FAQ</div>
            <h2 className="section__title reveal" style={{ '--reveal-delay': '120ms' }}>Preguntas frecuentes</h2>
          </div>
          <div className="faq__list">
            {items.map((it, i) => (
              <details key={i} className="faq__item reveal" style={{ '--reveal-delay': `${i * 80}ms` }}>
                <summary>{it.q}</summary>
                <div className="faq__answer">{it.a}</div>
              </details>
            ))}
          </div>
        </section>
      );
    }

    function CTABannerV2({ onLaunchApp }) {
      return (
        <section className="cta-banner reveal">
          <div className="cta-banner__avatars">
            <div className="av">M</div>
            <div className="av">J</div>
            <div className="av">L</div>
            <div className="av">+</div>
            <span className="label"><strong>0</strong> freelancers ya recuperaron su tiempo</span>
          </div>
          <h2 className="cta-banner__title">
            Recupera tu tiempo. <span className="italic">Hoy.</span>
          </h2>
          <p className="cta-banner__lead">
            Empieza gratis. Configura en 2 minutos. Tu próximo proyecto se organiza solo.
          </p>
          <div className="cta-banner__actions">
            <button className="btn btn--primary btn--lg" onClick={onLaunchApp}>
              Empezar gratis <Icons.ArrowRight size={14} />
            </button>
            <a className="btn btn--ghost btn--lg" href="#demo">Ver demo</a>
          </div>
        </section>
      );
    }

    function FootV2() {
      return (
        <footer className="foot">
          <div className="foot__inner">
            <div className="foot__brand">
              <div className="foot__brand-row"><img src="data:image/png;base64,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" alt="Even" /> Even</div>
              <p className="foot__tagline">Automatiza tu día. Recupera tu tiempo. Diseñado para freelancers y estudios creativos.</p>
            </div>
            <div className="foot__col">
              <h4>Producto</h4>
              <ul>
                <li><a href="#features">Funciones</a></li>
                <li><a href="#pricing">Precios</a></li>
                <li><a href="#demo">Demo</a></li>
                <li><a href="#">Cambios</a></li>
              </ul>
            </div>
            <div className="foot__col">
              <h4>Compañía</h4>
              <ul>
                <li><a href="#">Sobre nosotros</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contacto</a></li>
              </ul>
            </div>
            <div className="foot__col">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Privacidad</a></li>
                <li><a href="#">Términos</a></li>
                <li><a href="#">Seguridad</a></li>
              </ul>
            </div>
          </div>
          <div className="foot__giant">Even</div>
          <div className="foot__bottom">
            <span>© 2026 Even. Todos los derechos reservados.</span>
            <span>Hecho con cariño en Bogotá</span>
          </div>
        </footer>
      );
    }

    function SiteV2({ onLaunchApp, onGoToPricing }) {
      // All effects kicked off here
      useScrollReveal();
      useMouseLight();
      usePhoneParallax();
      useStickyNav();
      useHeroScrollParallax();
      useHeroEntrance();
      useCardCursors('.site-v2 .how__card, .site-v2 .feat, .site-v2 .plan');

      return (
        <div className="site site-v2">
          <SceneBg />
          <TopBar />
          <NavV2 onLaunchApp={onLaunchApp} />
          <HeroV2 onLaunchApp={onLaunchApp} />
          <HowV2 />
          <FeaturesV2 />
          <DemoV2 onLaunchApp={onLaunchApp} />
          <PricingV2 onLaunchApp={onLaunchApp} />
          <FAQV2 />
          <CTABannerV2 onLaunchApp={onLaunchApp} />
          <FootV2 />
        </div>
      );
    }

    window.SiteV2 = SiteV2;

  

    // ── Mount ─────────────────────────────────────────────
    const { useState: useS_M } = React;

    function PricingPage({ onBack, onLaunchApp }) {
      return (
        <div className="site site-v2">
          <SceneBg />
          <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--bg-deep)', padding: '12px 24px', borderBottom: '1px solid var(--stroke)' }}>
            <button className="app__btn" onClick={onBack}><Icons.ChevronLeft size={14} /> Volver al inicio</button>
          </div>
          <PricingV2 onLaunchApp={onLaunchApp} />
          <FootV2 />
        </div>
      );
    }

    function GoogleLoginModal({ onClose, onSuccess }) {
      React.useEffect(() => {
        window.__evenOnLoginSuccess = (user) => {
          onSuccess(user);
        };
        return () => { delete window.__evenOnLoginSuccess; };
      }, [onSuccess]);

      return (
        <div className="gl-overlay">
          <div className="gl-modal">
            <button className="gl-x" onClick={onClose}><Icons.X /></button>
            <div style={{ marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--surface-card-hi)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Icons.Lock size={24} color="var(--primary-light)" />
              </div>
              <h2>Bienvenido a Even</h2>
              <p>Inicia sesión o regístrate en segundos.</p>
            </div>
            <button className="gl-btn" onClick={() => {
              if (window.__evenStartGoogleLogin) {
                window.__evenStartGoogleLogin();
              } else {
                console.warn("Google login not hooked yet. Forcing success for demo...");
                window.__evenOnLoginSuccess({ uid: '123', name: '' });
              }
            }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="G" />
              Continuar con Google
            </button>
          </div>
        </div>
      );
    }

    function WebNameScreen({ uid, onSaveName }) {
      const [name, setName] = React.useState('');

      const handleSave = () => {
        if (!name.trim()) return;
        window.__evenSaveName?.(uid, name.trim());
        onSaveName(name.trim());
      };

      return (
        <div style={{ position: 'fixed', inset: 0, background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 100 }}>
          <div style={{ width: '100%', maxWidth: 360, textAlign: 'center' }}>
            <h1 style={{ fontSize: 24, marginBottom: 12, color: 'var(--text-on-dark)' }}>¿Cómo te llamas?</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>Solo tomaremos un segundo para personalizar tu experiencia.</p>

            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Tu nombre (Ej. Juan)"
              style={{ width: '100%', padding: '16px', background: 'var(--surface-card)', border: '1px solid var(--stroke)', borderRadius: 12, color: 'var(--text)', fontSize: 16, marginBottom: 24 }}
              autoFocus
            />

            <button className="app__btn app__btn--primary" style={{ width: '100%', padding: 16, fontSize: 16, justifyContent: 'center' }} onClick={handleSave} disabled={!name.trim()}>
              Continuar
            </button>
          </div>
        </div>
      );
    }

    function Root() {
      const [mode, setMode] = useS_M('site'); // 'site' | 'login' | 'name' | 'app' | 'pricing'
      const [authUser, setAuthUser] = React.useState(null);

      const handleLoginSuccess = (user) => {
        setAuthUser(user);
        if (!user.name) {
          setMode('name');
        } else {
          setMode('app');
        }
      };

      const handleLaunchApp = () => {
        setMode('login');
      };

      if (mode === 'name') {
        return <WebNameScreen uid={authUser?.uid} onSaveName={(name) => { setAuthUser({ ...authUser, name }); setMode('app'); }} />;
      }

      if (mode === 'app') {
        return (
          <div style={{ position: 'fixed', inset: 0, background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <EvenApp userName={authUser?.name || 'Invitado'} onExit={() => setMode('site')} />
            </div>
          </div>
        );
      }

      if (mode === 'pricing') {
        return <PricingPage onBack={() => setMode('site')} onLaunchApp={handleLaunchApp} />
      }

      return (
        <>
          <SiteV2 onLaunchApp={handleLaunchApp} onGoToPricing={() => setMode('pricing')} />
          {mode === 'login' && <GoogleLoginModal onClose={() => setMode('site')} onSuccess={handleLoginSuccess} />}
        </>
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<Root />);