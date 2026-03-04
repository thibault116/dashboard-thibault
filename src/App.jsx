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

export default function Dashboard() {
  const [now, setNow] = useState(new Date());
  const [tasks, setTasks] = useState([
    { id: 1, text: "Poster 5 vidéos TikTok/Insta", done: false, priority: "high" },
    { id: 2, text: "Répondre aux DM prospects", done: false, priority: "high" },
    { id: 3, text: "Travailler sur les modules formation", done: false, priority: "medium" },
    { id: 4, text: "Faire la salle (1h)", done: false, priority: "medium" },
    { id: 5, text: "Réviser devoirs scolaires", done: false, priority: "low" },
  ]);
  const [objectives, setObjectives] = useState(INITIAL_OBJECTIVES);
  const [stats, setStats] = useState({ tiktok: "", instagram: "", ventes: "", dm: "" });
  const [editingStats, setEditingStats] = useState(false);
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
  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, done: false, priority: "medium" }]);
    setNewTask("");
  };
  const addObj = () => {
    if (!newObj.trim()) return;
    setObjectives([...objectives, { id: Date.now(), text: newObj, done: false, category: "Autre" }]);
    setNewObj("");
  };
  const refreshIdeas = () => {
    const shuffled = [...CONTENT_IDEAS_POOL].sort(() => Math.random() - 0.5).slice(0, 5);
    setContentIdeas(shuffled);
  };
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  const deleteObj = (id) => setObjectives(objectives.filter(o => o.id !== id));

  const completedTasks = tasks.filter(t => t.done).length;
  const completedObjs = objectives.filter(o => o.done).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
  const objPercent = objectives.length > 0 ? Math.round((completedObjs / objectives.length) * 100) : 0;

  const greeting = now.getHours() < 12 ? "Bonjour" : now.getHours() < 18 ? "Bon après-midi" : "Bonsoir";
  const dateStr = `${DAYS[now.getDay()]} ${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`;
  const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const priorityColor = (p) => p === "high" ? "#FFD700" : p === "medium" ? "#C0A060" : "#806040";
  const categoryColor = (c) => {
    const map = { Formation: "#FFD700", Contenu: "#C0A060", Vente: "#FFB347", IA: "#87CEEB", Autre: "#AAA" };
    return map[c] || "#AAA";
  };

  const tabs = [
    { id: "brief", label: "☀️ Brief" },
    { id: "tasks", label: "✅ Tâches" },
    { id: "content", label: "🎬 Contenu" },
    { id: "objectives", label: "🎯 Objectifs" },
    { id: "stats", label: "📊 Stats" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0a 0%, #111108 50%, #0a0a0a 100%)",
      fontFamily: "'Georgia', serif",
      color: "#E8D5A3",
      padding: "0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #FFD700; border-radius: 2px; }
        .gold-border { border: 1px solid rgba(255,215,0,0.3); }
        .gold-border:hover { border-color: rgba(255,215,0,0.6); }
        .tab-btn { transition: all 0.2s; }
        .tab-btn:hover { background: rgba(255,215,0,0.1) !important; }
        .task-row:hover { background: rgba(255,215,0,0.05) !important; }
        .idea-card:hover { border-color: rgba(255,215,0,0.5) !important; transform: translateY(-1px); }
        .idea-card { transition: all 0.2s; }
        .btn-gold { transition: all 0.2s; }
        .btn-gold:hover { background: #FFD700 !important; color: #000 !important; }
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
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, rgba(255,215,0,0.08) 0%, transparent 100%)",
        borderBottom: "1px solid rgba(255,215,0,0.2)",
        padding: "24px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "4px", color: "#806040", marginBottom: "4px", textTransform: "uppercase" }}>
            L'Archipel — Dashboard
          </div>
          <div className="shimmer" style={{ fontFamily: "'Cinzel', serif", fontSize: "26px", fontWeight: "700" }}>
            {greeting}, Thibault 👑
          </div>
          <div style={{ fontSize: "13px", color: "#806040", marginTop: "4px", fontFamily: "'Lato', sans-serif" }}>{dateStr}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: "28px", color: "#FFD700", letterSpacing: "2px" }}>{timeStr}</div>
          <div style={{ fontSize: "12px", color: "#806040", fontFamily: "'Lato', sans-serif", marginTop: "4px" }}>
            {completedTasks}/{tasks.length} tâches · {objPercent}% objectifs
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: "3px", background: "rgba(255,215,0,0.1)" }}>
        <div style={{
          height: "100%",
          width: `${progressPercent}%`,
          background: "linear-gradient(90deg, #806040, #FFD700)",
          transition: "width 0.5s ease",
        }} />
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        gap: "4px",
        padding: "16px 32px 0",
        borderBottom: "1px solid rgba(255,215,0,0.1)",
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className="tab-btn"
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? "rgba(255,215,0,0.15)" : "transparent",
              border: activeTab === tab.id ? "1px solid rgba(255,215,0,0.4)" : "1px solid transparent",
              borderBottom: activeTab === tab.id ? "1px solid rgba(255,215,0,0.15)" : "1px solid transparent",
              color: activeTab === tab.id ? "#FFD700" : "#806040",
              padding: "8px 18px",
              borderRadius: "6px 6px 0 0",
              cursor: "pointer",
              fontFamily: "'Lato', sans-serif",
              fontSize: "13px",
              fontWeight: activeTab === tab.id ? "700" : "400",
              letterSpacing: "0.5px",
            }}
          >{tab.label}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "28px 32px", maxWidth: "1000px", margin: "0 auto" }}>

        {/* BRIEF DU MATIN */}
        {activeTab === "brief" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

            {/* Tâches du jour */}
            <div className="gold-border" style={{ background: "rgba(255,215,0,0.03)", borderRadius: "12px", padding: "20px" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", color: "#FFD700", letterSpacing: "2px", marginBottom: "16px" }}>
                ✅ TÂCHES DU JOUR
              </div>
              {tasks.slice(0, 5).map(task => (
                <div key={task.id} className="task-row" onClick={() => toggleTask(task.id)} style={{
                  display: "flex", alignItems: "center", gap: "10px", padding: "8px 6px",
                  borderRadius: "6px", cursor: "pointer", marginBottom: "4px",
                }}>
                  <div style={{
                    width: "16px", height: "16px", borderRadius: "4px",
                    border: `1px solid ${priorityColor(task.priority)}`,
                    background: task.done ? priorityColor(task.priority) : "transparent",
                    flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {task.done && <span style={{ fontSize: "10px", color: "#000" }}>✓</span>}
                  </div>
                  <span style={{
                    fontSize: "13px", fontFamily: "'Lato', sans-serif",
                    textDecoration: task.done ? "line-through" : "none",
                    color: task.done ? "#504030" : "#E8D5A3",
                  }}>{task.text}</span>
                </div>
              ))}
              <div style={{ marginTop: "12px", fontSize: "12px", color: "#806040", fontFamily: "'Lato', sans-serif" }}>
                {completedTasks}/{tasks.length} complétées
              </div>
            </div>

            {/* Objectifs semaine */}
            <div className="gold-border" style={{ background: "rgba(255,215,0,0.03)", borderRadius: "12px", padding: "20px" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", color: "#FFD700", letterSpacing: "2px", marginBottom: "16px" }}>
                🎯 OBJECTIFS SEMAINE
              </div>
              {objectives.map(obj => (
                <div key={obj.id} onClick={() => toggleObj(obj.id)} style={{
                  display: "flex", alignItems: "center", gap: "10px", padding: "8px 6px",
                  borderRadius: "6px", cursor: "pointer", marginBottom: "4px",
                }}>
                  <div style={{
                    width: "16px", height: "16px", borderRadius: "50%",
                    border: `1px solid ${categoryColor(obj.category)}`,
                    background: obj.done ? categoryColor(obj.category) : "transparent",
                    flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {obj.done && <span style={{ fontSize: "9px", color: "#000" }}>✓</span>}
                  </div>
                  <span style={{
                    fontSize: "13px", fontFamily: "'Lato', sans-serif", flex: 1,
                    textDecoration: obj.done ? "line-through" : "none",
                    color: obj.done ? "#504030" : "#E8D5A3",
                  }}>{obj.text}</span>
                  <span style={{ fontSize: "10px", color: categoryColor(obj.category), fontFamily: "'Lato', sans-serif" }}>{obj.category}</span>
                </div>
              ))}
              <div style={{ marginTop: "12px" }}>
                <div style={{ height: "4px", background: "rgba(255,215,0,0.1)", borderRadius: "2px" }}>
                  <div style={{ height: "100%", width: `${objPercent}%`, background: "linear-gradient(90deg, #806040, #FFD700)", borderRadius: "2px", transition: "width 0.5s" }} />
                </div>
                <div style={{ fontSize: "11px", color: "#806040", marginTop: "6px", fontFamily: "'Lato', sans-serif" }}>{objPercent}% complété</div>
              </div>
            </div>

            {/* Idée du jour */}
            <div className="gold-border" style={{ background: "rgba(255,215,0,0.03)", borderRadius: "12px", padding: "20px" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", color: "#FFD700", letterSpacing: "2px", marginBottom: "16px" }}>
                🎬 IDÉE DU JOUR
              </div>
              {contentIdeas[0] && (
                <div>
                  <div style={{ fontSize: "15px", fontFamily: "'Lato', sans-serif", color: "#FFD700", marginBottom: "8px", fontWeight: "700" }}>
                    "{contentIdeas[0].hook}"
                  </div>
                  <div style={{ fontSize: "12px", color: "#C0A060", fontFamily: "'Lato', sans-serif", marginBottom: "4px" }}>
                    📱 Format : {contentIdeas[0].format}
                  </div>
                  <div style={{ fontSize: "12px", color: "#806040", fontFamily: "'Lato', sans-serif" }}>
                    💡 {contentIdeas[0].angle}
                  </div>
                </div>
              )}
            </div>

            {/* Stats veille */}
            <div className="gold-border" style={{ background: "rgba(255,215,0,0.03)", borderRadius: "12px", padding: "20px" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", color: "#FFD700", letterSpacing: "2px", marginBottom: "16px" }}>
                📊 STATS DE LA VEILLE
              </div>
              {editingStats ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { key: "tiktok", label: "🎵 TikTok vues" },
                    { key: "instagram", label: "📸 Instagram vues" },
                    { key: "ventes", label: "💰 Ventes" },
                    { key: "dm", label: "💬 DM reçus" },
                  ].map(({ key, label }) => (
                    <div key={key} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "12px", color: "#806040", fontFamily: "'Lato', sans-serif", width: "130px" }}>{label}</span>
                      <input
                        value={stats[key]}
                        onChange={e => setStats({ ...stats, [key]: e.target.value })}
                        placeholder="0"
                        style={{
                          background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.2)",
                          borderRadius: "4px", padding: "4px 8px", color: "#E8D5A3",
                          fontFamily: "'Lato', sans-serif", fontSize: "13px", width: "80px",
                        }}
                      />
                    </div>
                  ))}
                  <button className="btn-gold" onClick={() => setEditingStats(false)} style={{
                    marginTop: "4px", background: "transparent", border: "1px solid rgba(255,215,0,0.4)",
                    color: "#FFD700", padding: "6px 12px", borderRadius: "6px", cursor: "pointer",
                    fontFamily: "'Lato', sans-serif", fontSize: "12px", alignSelf: "flex-start",
                  }}>Sauvegarder</button>
                </div>
              ) : (
                <div>
                  {[
                    { label: "🎵 TikTok vues", val: stats.tiktok },
                    { label: "📸 Instagram vues", val: stats.instagram },
                    { label: "💰 Ventes", val: stats.ventes },
                    { label: "💬 DM reçus", val: stats.dm },
                  ].map(({ label, val }) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,215,0,0.08)" }}>
                      <span style={{ fontSize: "12px", color: "#806040", fontFamily: "'Lato', sans-serif" }}>{label}</span>
                      <span style={{ fontSize: "14px", color: val ? "#FFD700" : "#403020", fontFamily: "'Cinzel', serif" }}>{val || "—"}</span>
                    </div>
                  ))}
                  <button className="btn-gold" onClick={() => setEditingStats(true)} style={{
                    marginTop: "12px", background: "transparent", border: "1px solid rgba(255,215,0,0.3)",
                    color: "#806040", padding: "5px 10px", borderRadius: "6px", cursor: "pointer",
                    fontFamily: "'Lato', sans-serif", fontSize: "11px",
                  }}>✏️ Mettre à jour</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TÂCHES */}
        {activeTab === "tasks" && (
          <div className="gold-border" style={{ background: "rgba(255,215,0,0.03)", borderRadius: "12px", padding: "24px" }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", color: "#FFD700", letterSpacing: "2px", marginBottom: "20px" }}>
              ✅ TOUTES LES TÂCHES DU JOUR
            </div>
            {["high", "medium", "low"].map(priority => {
              const filtered = tasks.filter(t => t.priority === priority);
              if (!filtered.length) return null;
              const labels = { high: "🔥 Urgent", medium: "⚡ Important", low: "📌 Quand possible" };
              return (
                <div key={priority} style={{ marginBottom: "20px" }}>
                  <div style={{ fontSize: "11px", color: priorityColor(priority), letterSpacing: "2px", marginBottom: "8px", fontFamily: "'Lato', sans-serif", fontWeight: "700", textTransform: "uppercase" }}>
                    {labels[priority]}
                  </div>
                  {filtered.map(task => (
                    <div key={task.id} className="task-row" style={{
                      display: "flex", alignItems: "center", gap: "10px", padding: "10px 8px",
                      borderRadius: "6px", marginBottom: "4px",
                    }}>
                      <div onClick={() => toggleTask(task.id)} style={{
                        width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0,
                        border: `1px solid ${priorityColor(priority)}`,
                        background: task.done ? priorityColor(priority) : "transparent",
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {task.done && <span style={{ fontSize: "11px", color: "#000" }}>✓</span>}
                      </div>
                      <span onClick={() => toggleTask(task.id)} style={{
                        flex: 1, fontSize: "14px", fontFamily: "'Lato', sans-serif", cursor: "pointer",
                        textDecoration: task.done ? "line-through" : "none",
                        color: task.done ? "#504030" : "#E8D5A3",
                      }}>{task.text}</span>
                      <button onClick={() => deleteTask(task.id)} style={{
                        background: "transparent", border: "none", color: "#403020", cursor: "pointer", fontSize: "14px",
                      }}>✕</button>
                    </div>
                  ))}
                </div>
              );
            })}
            <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
              <input
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addTask()}
                placeholder="Ajouter une tâche..."
                style={{
                  flex: 1, background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.2)",
                  borderRadius: "8px", padding: "10px 14px", color: "#E8D5A3",
                  fontFamily: "'Lato', sans-serif", fontSize: "13px",
                }}
              />
              <button className="btn-gold" onClick={addTask} style={{
                background: "transparent", border: "1px solid rgba(255,215,0,0.4)",
                color: "#FFD700", padding: "10px 16px", borderRadius: "8px", cursor: "pointer",
                fontFamily: "'Lato', sans-serif", fontSize: "13px",
              }}>+ Ajouter</button>
            </div>
          </div>
        )}

        {/* CONTENU */}
        {activeTab === "content" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", color: "#FFD700", letterSpacing: "2px" }}>
                🎬 5 IDÉES DE CONTENU DU JOUR
              </div>
              <button className="btn-gold" onClick={refreshIdeas} style={{
                background: "transparent", border: "1px solid rgba(255,215,0,0.3)",
                color: "#806040", padding: "6px 14px", borderRadius: "6px", cursor: "pointer",
                fontFamily: "'Lato', sans-serif", fontSize: "12px",
              }}>🔄 Nouvelles idées</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {contentIdeas.map((idea, i) => (
                <div key={i} className="idea-card gold-border" style={{
                  background: "rgba(255,215,0,0.03)", borderRadius: "10px", padding: "16px 20px",
                  display: "grid", gridTemplateColumns: "24px 1fr auto", gap: "12px", alignItems: "center",
                }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: "rgba(255,215,0,0.3)" }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: "14px", color: "#FFD700", fontFamily: "'Lato', sans-serif", fontWeight: "700", marginBottom: "4px" }}>
                      "{idea.hook}"
                    </div>
                    <div style={{ fontSize: "12px", color: "#806040", fontFamily: "'Lato', sans-serif" }}>
                      💡 {idea.angle}
                    </div>
                  </div>
                  <div style={{
                    background: "rgba(255,215,0,0.08)", borderRadius: "6px", padding: "4px 10px",
                    fontSize: "11px", color: "#C0A060", fontFamily: "'Lato', sans-serif", whiteSpace: "nowrap",
                  }}>{idea.format}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OBJECTIFS */}
        {activeTab === "objectives" && (
          <div className="gold-border" style={{ background: "rgba(255,215,0,0.03)", borderRadius: "12px", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", color: "#FFD700", letterSpacing: "2px" }}>
                🎯 OBJECTIFS DE LA SEMAINE
              </div>
              <div style={{ fontSize: "13px", color: "#FFD700", fontFamily: "'Cinzel', serif" }}>{objPercent}%</div>
            </div>
            <div style={{ height: "6px", background: "rgba(255,215,0,0.1)", borderRadius: "3px", marginBottom: "20px" }}>
              <div style={{ height: "100%", width: `${objPercent}%`, background: "linear-gradient(90deg, #806040, #FFD700)", borderRadius: "3px", transition: "width 0.5s" }} />
            </div>
            {objectives.map(obj => (
              <div key={obj.id} style={{
                display: "flex", alignItems: "center", gap: "12px", padding: "12px 8px",
                borderBottom: "1px solid rgba(255,215,0,0.06)", marginBottom: "4px",
              }}>
                <div onClick={() => toggleObj(obj.id)} style={{
                  width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
                  border: `1px solid ${categoryColor(obj.category)}`,
                  background: obj.done ? categoryColor(obj.category) : "transparent",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {obj.done && <span style={{ fontSize: "11px", color: "#000" }}>✓</span>}
                </div>
                <span style={{
                  flex: 1, fontSize: "14px", fontFamily: "'Lato', sans-serif",
                  textDecoration: obj.done ? "line-through" : "none",
                  color: obj.done ? "#504030" : "#E8D5A3",
                }}>{obj.text}</span>
                <span style={{
                  fontSize: "10px", padding: "2px 8px", borderRadius: "10px",
                  background: `${categoryColor(obj.category)}20`, color: categoryColor(obj.category),
                  fontFamily: "'Lato', sans-serif",
                }}>{obj.category}</span>
                <button onClick={() => deleteObj(obj.id)} style={{ background: "transparent", border: "none", color: "#403020", cursor: "pointer" }}>✕</button>
              </div>
            ))}
            <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
              <input
                value={newObj}
                onChange={e => setNewObj(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addObj()}
                placeholder="Ajouter un objectif..."
                style={{
                  flex: 1, background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.2)",
                  borderRadius: "8px", padding: "10px 14px", color: "#E8D5A3",
                  fontFamily: "'Lato', sans-serif", fontSize: "13px",
                }}
              />
              <button className="btn-gold" onClick={addObj} style={{
                background: "transparent", border: "1px solid rgba(255,215,0,0.4)",
                color: "#FFD700", padding: "10px 16px", borderRadius: "8px", cursor: "pointer",
                fontFamily: "'Lato', sans-serif", fontSize: "13px",
              }}>+ Ajouter</button>
            </div>
          </div>
        )}

        {/* STATS */}
        {activeTab === "stats" && (
          <div className="gold-border" style={{ background: "rgba(255,215,0,0.03)", borderRadius: "12px", padding: "24px" }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", color: "#FFD700", letterSpacing: "2px", marginBottom: "20px" }}>
              📊 SUIVI STATS QUOTIDIEN
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
              {[
                { key: "tiktok", label: "TikTok", emoji: "🎵", desc: "Vues hier" },
                { key: "instagram", label: "Instagram", emoji: "📸", desc: "Vues hier" },
                { key: "ventes", label: "Ventes", emoji: "💰", desc: "Transactions" },
                { key: "dm", label: "DM", emoji: "💬", desc: "Messages reçus" },
              ].map(({ key, label, emoji, desc }) => (
                <div key={key} style={{
                  background: "rgba(255,215,0,0.05)", borderRadius: "10px", padding: "16px",
                  border: "1px solid rgba(255,215,0,0.1)",
                }}>
                  <div style={{ fontSize: "20px", marginBottom: "4px" }}>{emoji}</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", color: "#806040", letterSpacing: "1px", marginBottom: "6px" }}>{label}</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "28px", color: stats[key] ? "#FFD700" : "#302010" }}>
                    {stats[key] || "—"}
                  </div>
                  <div style={{ fontSize: "11px", color: "#504030", fontFamily: "'Lato', sans-serif", marginTop: "4px" }}>{desc}</div>
                  <input
                    value={stats[key]}
                    onChange={e => setStats({ ...stats, [key]: e.target.value })}
                    placeholder="Entrer..."
                    style={{
                      marginTop: "10px", width: "100%", background: "rgba(255,215,0,0.05)",
                      border: "1px solid rgba(255,215,0,0.15)", borderRadius: "6px",
                      padding: "6px 10px", color: "#E8D5A3", fontFamily: "'Lato', sans-serif", fontSize: "13px",
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{ padding: "16px", background: "rgba(255,215,0,0.05)", borderRadius: "8px", border: "1px solid rgba(255,215,0,0.1)" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", color: "#806040", letterSpacing: "2px", marginBottom: "8px" }}>OBJECTIFS SEMAINE</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "13px", fontFamily: "'Lato', sans-serif" }}>
                <div style={{ color: "#C0A060" }}>🎵 TikTok : 584 abonnés</div>
                <div style={{ color: "#C0A060" }}>📸 Instagram : 160 abonnés</div>
                <div style={{ color: "#C0A060" }}>💰 Ventes Archipel : en cours</div>
                <div style={{ color: "#C0A060" }}>📈 Objectif : 3-5 ventes/semaine</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
