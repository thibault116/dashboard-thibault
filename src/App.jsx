import { useState, useEffect } from "react";

const DAYS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

const CONTENT_IDEAS_POOL = [
  { hook: "\"T'as 15 ans et tu fais quoi ?\"", format: "Facecam 7s", angle: "Interpelle la cible directement" },
  { hook: "J'explique aux 20 premiers qui commentent GO...", format: "Screen + texte", angle: "CTA + urgence = engagement" },
  { hook: "\"Le marketing digital c'est de l'arnaque\"", format: "Face swap IA", angle: "Réfutation = curiosité" },
  { hook: "POV : t'as cru que c'était trop tard à 15 ans", format: "Faceless 7s", angle: "Emotion + identification" },
  { hook: "Travailler à 15 ans et pas dans 15 ans 🧠", format: "Screen résultats", angle: "Preuve + aspiration" },
  { hook: "Ce moment où tu réalises que les 5 prochaines années décident tout", format: "Facecam + texte", angle: "Urgence existentielle" },
  { hook: "\"L'IA ne pourra jamais nous remplacer\" — calme toi", format: "Face swap IA", angle: "Débat IA = viral" },
  { hook: "Être pauvre avec un téléphone et internet en 2025 ?", format: "Faceless provoc", angle: "Provocation douce" },
  { hook: "J'offre ma formation GRATUITEMENT 🔥🔥", format: "Facecam + offre", angle: "Générosité = reach massif" },
  { hook: "Ce que les gros ne veulent pas que tu saches", format: "Texte animé", angle: "Secret = curiosité" },
  { hook: "POV : tu viens de créer ta propre formation à 15 ans", format: "Screen Whop", angle: "Aspiration + preuve" },
  { hook: "Tu veux lancer un business mais...", format: "Facecam + pause", angle: "Identification immédiate" },
  { hook: "Résultats après 1 semaine de marketing digital", format: "Screen stats", angle: "Preuve sociale" },
  { hook: "Ils veulent tous devenir riches mais AUCUN n'est prêt à investir", format: "Faceless sombre", angle: "Vérité qui pique" },
  { hook: "Comment faire 0 à 5k/mois en partant de rien", format: "Screen + voix off", angle: "Promesse concrète" },
];

const INITIAL_OBJECTIVES = [
  { id: 1, text: "Finaliser les modules Starter", done: false, category: "Formation" },
  { id: 2, text: "Poster 5x/jour minimum", done: false, category: "Contenu" },
  { id: 3, text: "Closer 2 ventes cette semaine", done: false, category: "Vente" },
  { id: 4, text: "Uploader les 6 skills dans Claude", done: false, category: "IA" },
  { id: 5, text: "Obtenir 3 nouveaux avis Starter", done: false, category: "Formation" },
];

const INITIAL_TASKS = [
  { id: 1, text: "Poster 5 vidéos TikTok/Insta", done: false, priority: "high" },
  { id: 2, text: "Répondre aux DM prospects", done: false, priority: "high" },
  { id: 3, text: "Travailler sur les modules formation", done: false, priority: "medium" },
  { id: 4, text: "Faire la salle (1h)", done: false, priority: "medium" },
  { id: 5, text: "Réviser devoirs scolaires", done: false, priority: "low" },
];

const categoryColor = (c) => {
  const map = { Formation: "#FFD700", Contenu: "#C0A060", Vente: "#FFB347", IA: "#87CEEB", Autre: "#AAA" };
  return map[c] || "#AAA";
};
const priorityColor = (p) => p === "high" ? "#FFD700" : p === "medium" ? "#C0A060" : "#806040";

export default function Dashboard() {
  const [now, setNow] = useState(new Date());
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [objectives, setObjectives] = useState(INITIAL_OBJECTIVES);
  const [stats, setStats] = useState({ tiktok: "", instagram: "", ventes: "", dm: "" });
  const [newTask, setNewTask] = useState("");
  const [newObj, setNewObj] = useState("");
  const [contentIdeas, setContentIdeas] = useState([]);
  const [activeTab, setActiveTab] = useState("brief");

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    const shuffled = [...CONTENT_IDEAS_POOL].sort(() => Math.random() - 0.5).slice(0, 5);
    setContentIdeas(shuffled);
    return () => clearInterval(timer);
  }, []);

  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const toggleObj = (id) => setObjectives(objectives.map(o => o.id === id ? { ...o, done: !o.done } : o));
  const addTask = () => { if (!newTask.trim()) return; setTasks([...tasks, { id: Date.now(), text: newTask, done: false, priority: "medium" }]); setNewTask(""); };
  const addObj = () => { if (!newObj.trim()) return; setObjectives([...objectives, { id: Date.now(), text: newObj, done: false, category: "Autre" }]); setNewObj(""); };
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  const deleteObj = (id) => setObjectives(objectives.filter(o => o.id !== id));
  const refreshIdeas = () => { const s = [...CONTENT_IDEAS_POOL].sort(() => Math.random() - 0.5).slice(0, 5); setContentIdeas(s); };

  const completedTasks = tasks.filter(t => t.done).length;
  const completedObjs = objectives.filter(o => o.done).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
  const objPercent = objectives.length > 0 ? Math.round((completedObjs / objectives.length) * 100) : 0;

  const greeting = now.getHours() < 12 ? "Bonjour" : now.getHours() < 18 ? "Bon après-midi" : "Bonsoir";
  const dateStr = `${DAYS[now.getDay()]} ${now.getDate()} ${MONTHS[now.getMonth()]}`;
  const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const tabs = [
    { id: "brief", label: "☀️" },
    { id: "tasks", label: "✅" },
    { id: "content", label: "🎬" },
    { id: "objectives", label: "🎯" },
    { id: "stats", label: "📊" },
  ];

  const tabLabels = { brief: "Brief", tasks: "Tâches", content: "Contenu", objectives: "Objectifs", stats: "Stats" };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: "'Georgia', serif", color: "#E8D5A3", paddingBottom: "80px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #FFD700; border-radius: 2px; }
        .task-row:hover { background: rgba(255,215,0,0.05) !important; }
        .idea-card { transition: all 0.2s; }
        .idea-card:hover { border-color: rgba(255,215,0,0.5) !important; }
        input::placeholder { color: rgba(232,213,163,0.3); }
        input:focus { outline: none; border-color: rgba(255,215,0,0.6) !important; }
        .shimmer {
          background: linear-gradient(90deg, #FFD700 0%, #FFF8DC 50%, #FFD700 100%);
          background-size: 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s infinite;
        }
        @keyframes shimmer { 0%{background-position:200%} 100%{background-position:-200%} }
        .inner { max-width: 960px; margin: 0 auto; padding: 0 16px; }
        .content-inner { max-width: 960px; margin: 0 auto; padding: 16px; }
        @media (min-width: 768px) {
          .content-inner { padding: 28px 32px; }
          .brief-grid { display: grid !important; grid-template-columns: 1fr 1fr; gap: 16px; }
          .stats-inline { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>

      <div style={{ background: "linear-gradient(180deg, rgba(255,215,0,0.08) 0%, transparent 100%)", borderBottom: "1px solid rgba(255,215,0,0.15)", padding: "20px 0 16px" }}>
        <div className="inner">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "3px", color: "#806040", marginBottom: "3px", textTransform: "uppercase" }}>L'Archipel</div>
              <div className="shimmer" style={{ fontFamily: "'Cinzel', serif", fontSize: "20px", fontWeight: "700" }}>{greeting} 👑</div>
              <div style={{ fontSize: "12px", color: "#806040", marginTop: "2px", fontFamily: "'Lato', sans-serif" }}>{dateStr}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "20px", color: "#FFD700" }}>{timeStr}</div>
              <div style={{ fontSize: "11px", color: "#806040", fontFamily: "'Lato', sans-serif", marginTop: "2px" }}>{completedTasks}/{tasks.length} tâches</div>
            </div>
          </div>
          <div style={{ height: "2px", background: "rgba(255,215,0,0.1)", marginTop: "12px", borderRadius: "1px" }}>
            <div style={{ height: "100%", width: `${progressPercent}%`, background: "linear-gradient(90deg, #806040, #FFD700)", transition: "width 0.5s", borderRadius: "1px" }} />
          </div>
        </div>
      </div>

      <div className="content-inner">

        {activeTab === "brief" && (
          <div className="brief-grid" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: "12px", padding: "14px" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: "#FFD700", letterSpacing: "2px", marginBottom: "10px" }}>🎬 IDÉE DU JOUR</div>
              {contentIdeas[0] && (<>
                <div style={{ fontSize: "14px", color: "#FFD700", fontFamily: "'Lato', sans-serif", fontWeight: "700", marginBottom: "6px" }}>"{contentIdeas[0].hook}"</div>
                <div style={{ fontSize: "12px", color: "#C0A060", fontFamily: "'Lato', sans-serif", marginBottom: "3px" }}>📱 {contentIdeas[0].format}</div>
                <div style={{ fontSize: "11px", color: "#806040", fontFamily: "'Lato', sans-serif" }}>💡 {contentIdeas[0].angle}</div>
              </>)}
            </div>

            <div style={{ background: "rgba(255,215,0,0.03)", border: "1px solid rgba(255,215,0,0.15)", borderRadius: "12px", padding: "14px" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: "#FFD700", letterSpacing: "2px", marginBottom: "10px" }}>✅ TÂCHES DU JOUR</div>
              {tasks.slice(0, 4).map(task => (
                <div key={task.id} onClick={() => toggleTask(task.id)} className="task-row" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 4px", borderRadius: "6px", cursor: "pointer" }}>
                  <div style={{ width: "16px", height: "16px", borderRadius: "4px", border: `1px solid ${priorityColor(task.priority)}`, background: task.done ? priorityColor(task.priority) : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {task.done && <span style={{ fontSize: "10px", color: "#000" }}>✓</span>}
                  </div>
                  <span style={{ fontSize: "13px", fontFamily: "'Lato', sans-serif", textDecoration: task.done ? "line-through" : "none", color: task.done ? "#504030" : "#E8D5A3" }}>{task.text}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(255,215,0,0.03)", border: "1px solid rgba(255,215,0,0.15)", borderRadius: "12px", padding: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: "#FFD700", letterSpacing: "2px" }}>🎯 OBJECTIFS SEMAINE</div>
                <span style={{ fontSize: "12px", color: "#FFD700", fontFamily: "'Cinzel', serif" }}>{objPercent}%</span>
              </div>
              <div style={{ height: "3px", background: "rgba(255,215,0,0.1)", borderRadius: "2px", marginBottom: "10px" }}>
                <div style={{ height: "100%", width: `${objPercent}%`, background: "linear-gradient(90deg, #806040, #FFD700)", borderRadius: "2px" }} />
              </div>
              {objectives.slice(0, 3).map(obj => (
                <div key={obj.id} onClick={() => toggleObj(obj.id)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "7px 4px", cursor: "pointer" }}>
                  <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: `1px solid ${categoryColor(obj.category)}`, background: obj.done ? categoryColor(obj.category) : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {obj.done && <span style={{ fontSize: "9px", color: "#000" }}>✓</span>}
                  </div>
                  <span style={{ fontSize: "13px", fontFamily: "'Lato', sans-serif", textDecoration: obj.done ? "line-through" : "none", color: obj.done ? "#504030" : "#E8D5A3", flex: 1 }}>{obj.text}</span>
                </div>
              ))}
            </div>

            <div className="stats-inline" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {[
                { key: "tiktok", label: "TikTok", emoji: "🎵" },
                { key: "instagram", label: "Instagram", emoji: "📸" },
                { key: "ventes", label: "Ventes", emoji: "💰" },
                { key: "dm", label: "DM", emoji: "💬" },
              ].map(({ key, label, emoji }) => (
                <div key={key} style={{ background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.1)", borderRadius: "10px", padding: "10px 12px" }}>
                  <div style={{ fontSize: "11px", color: "#806040", fontFamily: "'Lato', sans-serif" }}>{emoji} {label}</div>
                  <input value={stats[key]} onChange={e => setStats({ ...stats, [key]: e.target.value })} placeholder="—" style={{ width: "100%", background: "transparent", border: "none", color: stats[key] ? "#FFD700" : "#403020", fontFamily: "'Cinzel', serif", fontSize: "20px", marginTop: "4px", padding: "0" }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <div style={{ background: "rgba(255,215,0,0.03)", border: "1px solid rgba(255,215,0,0.15)", borderRadius: "12px", padding: "16px" }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: "#FFD700", letterSpacing: "2px", marginBottom: "16px" }}>✅ TÂCHES DU JOUR</div>
            {["high", "medium", "low"].map(priority => {
              const filtered = tasks.filter(t => t.priority === priority);
              if (!filtered.length) return null;
              const labels = { high: "🔥 Urgent", medium: "⚡ Important", low: "📌 Quand possible" };
              return (
                <div key={priority} style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "10px", color: priorityColor(priority), letterSpacing: "2px", marginBottom: "8px", fontFamily: "'Lato', sans-serif", fontWeight: "700", textTransform: "uppercase" }}>{labels[priority]}</div>
                  {filtered.map(task => (
                    <div key={task.id} className="task-row" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 6px", borderRadius: "6px", marginBottom: "2px" }}>
                      <div onClick={() => toggleTask(task.id)} style={{ width: "18px", height: "18px", borderRadius: "4px", border: `1px solid ${priorityColor(priority)}`, background: task.done ? priorityColor(priority) : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        {task.done && <span style={{ fontSize: "11px", color: "#000" }}>✓</span>}
                      </div>
                      <span onClick={() => toggleTask(task.id)} style={{ flex: 1, fontSize: "14px", fontFamily: "'Lato', sans-serif", textDecoration: task.done ? "line-through" : "none", color: task.done ? "#504030" : "#E8D5A3", cursor: "pointer" }}>{task.text}</span>
                      <button onClick={() => deleteTask(task.id)} style={{ background: "transparent", border: "none", color: "#403020", cursor: "pointer", fontSize: "16px", padding: "0 4px" }}>✕</button>
                    </div>
                  ))}
                </div>
              );
            })}
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()} placeholder="Ajouter une tâche..." style={{ flex: 1, background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: "8px", padding: "10px 12px", color: "#E8D5A3", fontFamily: "'Lato', sans-serif", fontSize: "13px" }} />
              <button onClick={addTask} style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", color: "#FFD700", padding: "10px 14px", borderRadius: "8px", cursor: "pointer", fontFamily: "'Lato', sans-serif", fontSize: "13px" }}>+</button>
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: "#FFD700", letterSpacing: "2px" }}>🎬 IDÉES DU JOUR</div>
              <button onClick={refreshIdeas} style={{ background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.2)", color: "#806040", padding: "5px 12px", borderRadius: "6px", cursor: "pointer", fontFamily: "'Lato', sans-serif", fontSize: "11px" }}>🔄 Nouvelles</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "10px" }}>
              {contentIdeas.map((idea, i) => (
                <div key={i} className="idea-card" style={{ background: "rgba(255,215,0,0.03)", border: "1px solid rgba(255,215,0,0.15)", borderRadius: "10px", padding: "14px" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: "14px", color: "rgba(255,215,0,0.3)", flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "13px", color: "#FFD700", fontFamily: "'Lato', sans-serif", fontWeight: "700", marginBottom: "5px" }}>"{idea.hook}"</div>
                      <div style={{ fontSize: "11px", color: "#806040", fontFamily: "'Lato', sans-serif", marginBottom: "3px" }}>📱 {idea.format}</div>
                      <div style={{ fontSize: "11px", color: "#604020", fontFamily: "'Lato', sans-serif" }}>💡 {idea.angle}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "objectives" && (
          <div style={{ background: "rgba(255,215,0,0.03)", border: "1px solid rgba(255,215,0,0.15)", borderRadius: "12px", padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: "#FFD700", letterSpacing: "2px" }}>🎯 OBJECTIFS SEMAINE</div>
              <span style={{ fontSize: "13px", color: "#FFD700", fontFamily: "'Cinzel', serif" }}>{objPercent}%</span>
            </div>
            <div style={{ height: "4px", background: "rgba(255,215,0,0.1)", borderRadius: "2px", marginBottom: "14px" }}>
              <div style={{ height: "100%", width: `${objPercent}%`, background: "linear-gradient(90deg, #806040, #FFD700)", borderRadius: "2px", transition: "width 0.5s" }} />
            </div>
            {objectives.map(obj => (
              <div key={obj.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 4px", borderBottom: "1px solid rgba(255,215,0,0.06)" }}>
                <div onClick={() => toggleObj(obj.id)} style={{ width: "18px", height: "18px", borderRadius: "50%", border: `1px solid ${categoryColor(obj.category)}`, background: obj.done ? categoryColor(obj.category) : "transparent", flexShrink: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {obj.done && <span style={{ fontSize: "10px", color: "#000" }}>✓</span>}
                </div>
                <span style={{ flex: 1, fontSize: "13px", fontFamily: "'Lato', sans-serif", textDecoration: obj.done ? "line-through" : "none", color: obj.done ? "#504030" : "#E8D5A3" }}>{obj.text}</span>
                <span style={{ fontSize: "9px", padding: "2px 7px", borderRadius: "10px", background: `${categoryColor(obj.category)}20`, color: categoryColor(obj.category), fontFamily: "'Lato', sans-serif", flexShrink: 0 }}>{obj.category}</span>
                <button onClick={() => deleteObj(obj.id)} style={{ background: "transparent", border: "none", color: "#403020", cursor: "pointer", fontSize: "14px" }}>✕</button>
              </div>
            ))}
            <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
              <input value={newObj} onChange={e => setNewObj(e.target.value)} onKeyDown={e => e.key === "Enter" && addObj()} placeholder="Ajouter un objectif..." style={{ flex: 1, background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: "8px", padding: "10px 12px", color: "#E8D5A3", fontFamily: "'Lato', sans-serif", fontSize: "13px" }} />
              <button onClick={addObj} style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", color: "#FFD700", padding: "10px 14px", borderRadius: "8px", cursor: "pointer", fontFamily: "'Lato', sans-serif", fontSize: "13px" }}>+</button>
            </div>
          </div>
        )}

        {activeTab === "stats" && (
          <div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: "#FFD700", letterSpacing: "2px", marginBottom: "14px" }}>📊 STATS QUOTIDIENNES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "10px" }}>
              {[
                { key: "tiktok", label: "TikTok", emoji: "🎵", desc: "Vues hier" },
                { key: "instagram", label: "Instagram", emoji: "📸", desc: "Vues hier" },
                { key: "ventes", label: "Ventes", emoji: "💰", desc: "Transactions" },
                { key: "dm", label: "DM", emoji: "💬", desc: "Messages reçus" },
              ].map(({ key, label, emoji, desc }) => (
                <div key={key} style={{ background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.1)", borderRadius: "10px", padding: "14px" }}>
                  <div style={{ fontSize: "18px", marginBottom: "4px" }}>{emoji}</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: "#806040", letterSpacing: "1px", marginBottom: "6px" }}>{label}</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "26px", color: stats[key] ? "#FFD700" : "#302010" }}>{stats[key] || "—"}</div>
                  <div style={{ fontSize: "10px", color: "#504030", fontFamily: "'Lato', sans-serif", marginTop: "3px", marginBottom: "8px" }}>{desc}</div>
                  <input value={stats[key]} onChange={e => setStats({ ...stats, [key]: e.target.value })} placeholder="Entrer..." style={{ width: "100%", background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.15)", borderRadius: "6px", padding: "6px 8px", color: "#E8D5A3", fontFamily: "'Lato', sans-serif", fontSize: "13px" }} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: "12px", background: "rgba(255,215,0,0.03)", border: "1px solid rgba(255,215,0,0.1)", borderRadius: "10px", padding: "14px" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: "#806040", letterSpacing: "2px", marginBottom: "8px" }}>COMPTES</div>
              <div style={{ fontSize: "12px", fontFamily: "'Lato', sans-serif", color: "#C0A060", lineHeight: "1.8" }}>
                🎵 TikTok : 584 abonnés<br/>
                📸 Instagram : 160 abonnés<br/>
                💰 Objectif : 3-5 ventes/semaine
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(10,10,10,0.95)", borderTop: "1px solid rgba(255,215,0,0.15)", display: "flex", backdropFilter: "blur(10px)" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", display: "flex", width: "100%" }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, background: activeTab === tab.id ? "rgba(255,215,0,0.1)" : "transparent", border: "none", borderTop: activeTab === tab.id ? "2px solid #FFD700" : "2px solid transparent", color: activeTab === tab.id ? "#FFD700" : "#806040", padding: "12px 0 8px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
              <span style={{ fontSize: "18px" }}>{tab.label}</span>
              <span style={{ fontSize: "9px", fontFamily: "'Lato', sans-serif", letterSpacing: "0.5px" }}>{tabLabels[tab.id]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
