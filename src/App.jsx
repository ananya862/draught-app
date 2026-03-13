import { useState, useEffect } from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import AddLogScreen from "./AddLogScreen";
import { useServiceWorker } from "./useServiceWorker";

const STORAGE_KEY = "alcohol-tracker-data";

const defaultState = {
  users: [],
  drinkLogs: [],
  drinkTypes: [
    { id: "beer",      name: "Beer",      icon: "🍺", defaultAbv: 5.0  },
    { id: "wine",      name: "Wine",      icon: "🍷", defaultAbv: 12.5 },
    { id: "spirits",   name: "Spirits",   icon: "🥃", defaultAbv: 40.0 },
    { id: "cocktail",  name: "Cocktail",  icon: "🍹", defaultAbv: 10.0 },
    { id: "cider",     name: "Cider",     icon: "🍏", defaultAbv: 4.5  },
    { id: "champagne", name: "Champagne", icon: "🥂", defaultAbv: 11.5 },
    { id: "custom",    name: "Custom",    icon: "🫗", defaultAbv: 5.0  },
  ],
  settings: { reminderTime: "20:00", weeklyLimit: 14, dailyLimit: 4 },
};

const calcPureAlcohol = (volumeMl, abv) =>
  parseFloat((volumeMl * (abv / 100) * 0.789).toFixed(2));
const standardDrinks = (g) => parseFloat((g / 10).toFixed(2));
const today = () => new Date().toISOString().split("T")[0];
const fmt = (d) => new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });

const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
};
const getLast30Days = () => {
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
};

// ─── Icons ───
const Icons = {
  plus:     () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  back:     () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>,
  chart:    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  settings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  trash:    () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  export:   () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  fire:     () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
};

// ─── Top Bar ───
// Sticky frosted-glass nav bar that respects the phone notch / Dynamic Island
const TopBar = ({ title, subtitle, onBack, backLabel, right }) => (
  <div className="top-bar">
    <div className="flex items-center justify-between px-4 pb-3 pt-1">

      {/* Left: back button OR app logo */}
      <div style={{ minWidth: "80px" }}>
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-zinc-400 hover:text-zinc-100 transition-colors"
            style={{ minHeight: "44px", minWidth: "44px" }}
          >
            <Icons.back />
            <span className="text-sm">{backLabel || "Back"}</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5" style={{ minHeight: "44px" }}>
            <span className="text-xl">🫗</span>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "17px" }}
              className="text-amber-400">DRAUGHT</span>
          </div>
        )}
      </div>

      {/* Centre: screen title */}
      <div className="flex-1 text-center px-2">
        {title && (
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "15px" }}
            className="text-zinc-100 leading-tight truncate">{title}</p>
        )}
        {subtitle && (
          <p className="text-zinc-600 text-xs truncate">{subtitle}</p>
        )}
      </div>

      {/* Right: action buttons */}
      <div style={{ minWidth: "80px" }} className="flex justify-end gap-2">
        {right ?? <div />}
      </div>

    </div>
  </div>
);

// ─── Badge ───
const Badge = ({ children, color = "amber" }) => {
  const colors = {
    amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    green: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    red:   "bg-red-500/20 text-red-300 border-red-500/30",
    blue:  "bg-sky-500/20 text-sky-300 border-sky-500/30",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${colors[color]}`}>
      {children}
    </span>
  );
};

// ─── Stat Card ───
const StatCard = ({ label, value, unit, sub }) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-1">
    <p className="text-zinc-500 text-xs uppercase tracking-widest font-medium">{label}</p>
    <p className="font-black text-2xl text-zinc-100 leading-none">
      {value}<span className="text-sm ml-1 font-normal text-amber-400">{unit}</span>
    </p>
    {sub && <p className="text-zinc-600 text-xs">{sub}</p>}
  </div>
);

// ─── Main App ───
export default function App() {
  const { updateAvailable, applyUpdate } = useServiceWorker();

  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return defaultState;
  });

  const [screen, setScreen] = useState("home");
  const [activeUser, setActiveUser] = useState(null);
  const [analyticsTab, setAnalyticsTab] = useState("week");
  const [editLog, setEditLog] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
  }, [data]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const saveData = (updates) => setData(prev => ({ ...prev, ...updates }));

  const addUser = (user) => {
    const newUser = { ...user, id: Date.now().toString(), createdAt: today() };
    saveData({ users: [...data.users, newUser] });
    setActiveUser(newUser);
    setScreen("profile");
    showToast(`Welcome, ${user.name}! 🥂`);
  };

  const addLog = (log) => {
    const newLog = {
      ...log,
      id: Date.now().toString(),
      userId: activeUser.id,
      date: log.date || today(),
      pureAlcohol: calcPureAlcohol(log.volumeMl, log.abv),
    };
    if (editLog) {
      saveData({ drinkLogs: data.drinkLogs.map(l => l.id === editLog.id ? { ...newLog, id: editLog.id } : l) });
      showToast("Log updated ✓");
    } else {
      saveData({ drinkLogs: [newLog, ...data.drinkLogs] });
      showToast("Drink logged! 🍺");
    }
    setEditLog(null);
    setScreen("profile");
  };

  const deleteLog = (id) => {
    saveData({ drinkLogs: data.drinkLogs.filter(l => l.id !== id) });
    showToast("Entry removed", "info");
  };

  const userLogs   = activeUser ? data.drinkLogs.filter(l => l.userId === activeUser.id) : [];
  const todayLogs  = userLogs.filter(l => l.date === today());

  const getStreak = () => {
    const dates = [...new Set(userLogs.map(l => l.date))].sort().reverse();
    if (!dates.length) return 0;
    let streak = 0, cur = new Date();
    for (const d of dates) {
      const diff = Math.round((cur - new Date(d + "T12:00:00")) / 86400000);
      if (diff <= 1) { streak++; cur = new Date(d + "T12:00:00"); } else break;
    }
    return streak;
  };

  const exportCSV = () => {
    const rows = [
      ["Date","Type","Name","Volume (ml)","ABV %","Pure Alcohol (g)","Standard Drinks"],
      ...userLogs.map(l => [l.date, l.drinkType, l.drinkName||"", l.volumeMl, l.abv, l.pureAlcohol, standardDrinks(l.pureAlcohol)])
    ];
    const csv  = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url;
    a.download = `alcohol-log-${activeUser.name}-${today()}.csv`;
    a.click();
    showToast("CSV exported 📊");
  };

  return (
    <div
      style={{ fontFamily: "'DM Mono','Courier New',monospace", background: "#0a0a0a", minHeight: "100vh" }}
      className="text-zinc-100 max-w-sm mx-auto relative"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 0; }
        input, select { background: #141414 !important; color: #e4e4e7 !important; }
        input::placeholder { color: #52525b; }
        input[type=range] { accent-color: #f59e0b; }
        @keyframes slideUp  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        .slide-up  { animation: slideUp 0.35s ease forwards; }
        .fade-in   { animation: fadeIn 0.25s ease forwards; }
        .btn-press { transition: transform 0.1s; }
        .btn-press:active { transform: scale(0.96); }

        /* ── Safe-area / notch support ── */
        .top-bar {
          position: sticky;
          top: 0;
          z-index: 40;
          background: rgba(10,10,10,0.93);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid #27272a;
          padding-top: max(14px, env(safe-area-inset-top));
        }
        .page-body {
          padding-bottom: max(96px, calc(env(safe-area-inset-bottom) + 80px));
        }
        button { min-height: 36px; }
      `}</style>

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 fade-in" style={{ top: "max(64px, calc(env(safe-area-inset-top) + 56px))" }}>
          <div className={`px-4 py-2.5 rounded-xl text-sm font-medium shadow-2xl border ${
            toast.type === "info"
              ? "bg-zinc-800 border-zinc-700 text-zinc-200"
              : "bg-amber-500/90 border-amber-400/50 text-zinc-900"
          }`}>{toast.msg}</div>
        </div>
      )}

      {/* ══════════════════════════════════════
          HOME — Profile selection
      ══════════════════════════════════════ */}
      {screen === "home" && (
        <div className="slide-up">
          <TopBar />
          <div className="p-6 page-body">
            <p className="text-zinc-600 text-xs tracking-wider mb-8">alcohol awareness tracker</p>

            {/* ── Update banner — home screen only ── */}
            {updateAvailable && (
              <div className="mb-4 bg-amber-500/15 border border-amber-500/40 rounded-2xl p-4 flex items-center justify-between fade-in">
                <div>
                  <p className="text-amber-300 font-bold text-sm">Update Available</p>
                  <p className="text-amber-500/70 text-xs">New version of Draught is ready</p>
                </div>
                <button onClick={applyUpdate}
                  className="px-4 py-2 bg-amber-500 text-zinc-900 font-bold rounded-xl text-sm">
                  Refresh
                </button>
              </div>
            )}

            <h2 className="text-zinc-400 text-xs uppercase tracking-widest mb-4 font-medium">Select Profile</h2>

            {data.users.length === 0 && (
              <div className="border border-dashed border-zinc-800 rounded-2xl p-8 text-center mb-4">
                <p className="text-zinc-600 text-sm mb-1">No profiles yet</p>
                <p className="text-zinc-700 text-xs">Create one to start tracking</p>
              </div>
            )}

            <div className="flex flex-col gap-3 mb-6">
              {data.users.map(u => {
                const uLogs      = data.drinkLogs.filter(l => l.userId === u.id);
                const todayTotal = uLogs.filter(l => l.date === today()).reduce((s, l) => s + l.pureAlcohol, 0);
                return (
                  <button key={u.id}
                    onClick={() => { setActiveUser(u); setScreen("profile"); }}
                    className="btn-press w-full bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 rounded-2xl p-4 text-left transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-lg font-bold text-amber-400">
                          {u.name[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-zinc-100">{u.name}</p>
                          <p className="text-zinc-600 text-xs">{uLogs.length} logs total</p>
                        </div>
                      </div>
                      {todayTotal > 0 && <Badge color="amber">{todayTotal.toFixed(1)}g today</Badge>}
                    </div>
                  </button>
                );
              })}
            </div>

            <button onClick={() => setScreen("newUser")}
              className="btn-press w-full border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-2xl p-3.5 flex items-center justify-center gap-2 font-medium transition-all text-sm">
              <Icons.plus /> New Profile
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          NEW USER
      ══════════════════════════════════════ */}
      {screen === "newUser" && (
        <NewUserScreen onBack={() => setScreen("home")} onSave={addUser} />
      )}

      {/* ══════════════════════════════════════
          PROFILE / DAILY SUMMARY
      ══════════════════════════════════════ */}
      {screen === "profile" && activeUser && (
        <ProfileScreen
          user={activeUser} logs={userLogs} todayLogs={todayLogs}
          drinkTypes={data.drinkTypes} streak={getStreak()} limit={data.settings.dailyLimit}
          onBack={() => setScreen("home")}
          onAddLog={() => { setEditLog(null); setScreen("addLog"); }}
          onEditLog={(log) => { setEditLog(log); setScreen("addLog"); }}
          onDeleteLog={deleteLog}
          onAnalytics={() => setScreen("analytics")}
          onSettings={() => setScreen("settings")}
          onExport={exportCSV}
        />
      )}

      {/* ══════════════════════════════════════
          ADD / EDIT LOG
      ══════════════════════════════════════ */}
      {screen === "addLog" && activeUser && (
        <AddLogScreen
          editLog={editLog}
          onBack={() => { setEditLog(null); setScreen("profile"); }}
          onSave={addLog}
        />
      )}

      {/* ══════════════════════════════════════
          ANALYTICS
      ══════════════════════════════════════ */}
      {screen === "analytics" && activeUser && (
        <AnalyticsScreen
          logs={userLogs} drinkTypes={data.drinkTypes}
          tab={analyticsTab} setTab={setAnalyticsTab}
          limit={data.settings.weeklyLimit}
          onBack={() => setScreen("profile")}
        />
      )}

      {/* ══════════════════════════════════════
          SETTINGS
      ══════════════════════════════════════ */}
      {screen === "settings" && (
        <SettingsScreen
          settings={data.settings} users={data.users}
          onBack={() => setScreen("profile")}
          onSave={(s) => { saveData({ settings: s }); showToast("Settings saved ✓"); setScreen("profile"); }}
          onDeleteUser={(id) => {
            saveData({
              users:     data.users.filter(u => u.id !== id),
              drinkLogs: data.drinkLogs.filter(l => l.userId !== id),
            });
            setActiveUser(null); setScreen("home");
          }}
          activeUser={activeUser}
        />
      )}
    </div>
  );
}

// ══════════════════════════════════════
// NEW USER SCREEN
// ══════════════════════════════════════
function NewUserScreen({ onBack, onSave }) {
  const [form, setForm] = useState({ name: "", weight: "", gender: "" });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  return (
    <div className="slide-up">
      <TopBar
        title="New Profile"
        subtitle="Your details help calculate metrics"
        onBack={onBack}
        backLabel="Profiles"
      />
      <div className="p-6 page-body">
        <div className="flex flex-col gap-4 mt-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-zinc-500 text-xs uppercase tracking-widest">Name *</span>
            <input
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500/60 transition-colors"
              placeholder="e.g. Alex"
              value={form.name} onChange={e => set("name", e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-zinc-500 text-xs uppercase tracking-widest">Weight (kg) — optional</span>
            <input type="number"
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500/60 transition-colors"
              placeholder="70"
              value={form.weight} onChange={e => set("weight", e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-zinc-500 text-xs uppercase tracking-widest">Gender — optional</span>
            <select
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500/60 transition-colors"
              value={form.gender} onChange={e => set("gender", e.target.value)}
            >
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        <button
          onClick={() => form.name.trim() && onSave(form)}
          disabled={!form.name.trim()}
          className="btn-press mt-8 w-full bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-900 font-bold rounded-2xl p-4 transition-all text-sm"
        >
          Create Profile
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// PROFILE SCREEN
// ══════════════════════════════════════
function ProfileScreen({ user, logs, todayLogs, drinkTypes, streak, limit, onBack, onAddLog, onEditLog, onDeleteLog, onAnalytics, onSettings, onExport }) {
  const todayTotal = todayLogs.reduce((s, l) => s + l.pureAlcohol, 0);
  const todayStd   = standardDrinks(todayTotal);
  const pct        = Math.min((todayStd / limit) * 100, 100);
  const weekLogs   = logs.filter(l => (new Date() - new Date(l.date + "T12:00:00")) / 86400000 <= 7);
  const weekTotal  = weekLogs.reduce((s, l) => s + l.pureAlcohol, 0);

  return (
    <div className="slide-up">
      <TopBar
        title={user.name}
        subtitle={user.weight ? `${user.weight}kg${user.gender ? ` · ${user.gender}` : ""}` : undefined}
        onBack={onBack}
        backLabel="Profiles"
        right={
          <div className="flex gap-2">
            <button onClick={onExport}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors">
              <Icons.export />
            </button>
            <button onClick={onSettings}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors">
              <Icons.settings />
            </button>
          </div>
        }
      />

      <div className="p-6 pb-4 page-body">
        {/* Streak badge */}
        {streak > 0 && (
          <div className="flex justify-end mb-3">
            <div className="flex items-center gap-1 bg-orange-500/20 border border-orange-500/30 px-3 py-1.5 rounded-xl">
              <Icons.fire /><span className="text-orange-400 text-xs font-bold">{streak}d streak</span>
            </div>
          </div>
        )}

        {/* Today card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-zinc-500 text-xs uppercase tracking-widest">Today</p>
            <Badge color={todayStd > limit ? "red" : todayStd > limit * 0.7 ? "amber" : "green"}>
              {todayStd > limit ? "Over limit" : todayStd > 0 ? "Within limit" : "No drinks"}
            </Badge>
          </div>
          <div className="flex items-end gap-3 mb-3">
            <span className="text-4xl font-black text-zinc-100" style={{ fontFamily: "'Syne',sans-serif" }}>{todayStd.toFixed(1)}</span>
            <span className="text-amber-400 text-sm mb-1">std drinks</span>
            <span className="text-zinc-600 text-sm mb-1 ml-auto">{todayTotal.toFixed(1)}g pure</span>
          </div>
          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: pct > 100 ? "#ef4444" : pct > 70 ? "#f59e0b" : "#10b981" }} />
          </div>
          <p className="text-zinc-700 text-xs mt-1.5">Daily limit: {limit} standard drinks</p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <StatCard label="This Week" value={standardDrinks(weekTotal).toFixed(1)} unit="std" sub={`${weekLogs.length} entries`} />
          <StatCard label="Total Logs" value={logs.length} unit="" sub="all time" />
        </div>

        {/* CTA buttons */}
        <button onClick={onAddLog}
          className="btn-press w-full bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold rounded-2xl p-4 flex items-center justify-center gap-2 transition-all mb-2">
          <Icons.plus /> Log a Drink
        </button>
        <button onClick={onAnalytics}
          className="btn-press w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded-2xl p-3 flex items-center justify-center gap-2 transition-all text-sm mb-6">
          <Icons.chart /> View Analytics
        </button>

        {/* Today's logs */}
        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">Today's Entries</p>
        {todayLogs.length === 0
          ? <div className="text-center py-8 text-zinc-700 text-sm">Nothing logged today</div>
          : <div className="flex flex-col gap-2">
              {todayLogs.map(log => <LogItem key={log.id} log={log} onDelete={onDeleteLog} onEdit={onEditLog} />)}
            </div>
        }

        {logs.length > todayLogs.length && (
          <>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mt-6 mb-3">Recent History</p>
            <div className="flex flex-col gap-2">
              {logs.filter(l => l.date !== today()).slice(0, 8).map(log =>
                <LogItem key={log.id} log={log} onDelete={onDeleteLog} onEdit={onEditLog} compact />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Log Item ───
function LogItem({ log, onDelete, onEdit, compact }) {
  const typeIcons = { beer:"🍺", wine:"🍷", spirits:"🥃", cocktail:"🍹", cider:"🍏", champagne:"🥂", custom:"🫗" };
  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-xl ${compact ? "px-3 py-2.5" : "px-4 py-3"} flex items-center gap-3`}>
      <span className="text-lg">{typeIcons[log.drinkType] || "🫗"}</span>
      <div className="flex-1 min-w-0">
        <p className="text-zinc-200 text-sm font-medium truncate">{log.drinkName || log.drinkType}</p>
        <p className="text-zinc-600 text-xs">{log.volumeMl}ml · {log.abv}% · {log.pureAlcohol}g pure</p>
      </div>
      {!compact && <p className="text-zinc-700 text-xs">{log.time || ""}</p>}
      <div className="flex gap-1">
        <button onClick={() => onEdit(log)}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-700 hover:text-amber-400 hover:bg-amber-500/10 transition-colors text-xs">✎</button>
        <button onClick={() => onDelete(log.id)}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-700 hover:text-red-400 hover:bg-red-500/10 transition-colors">
          <Icons.trash />
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// ANALYTICS SCREEN
// ══════════════════════════════════════
const COLORS = ["#f59e0b","#10b981","#3b82f6","#ec4899","#8b5cf6","#f97316","#06b6d4"];

function AnalyticsScreen({ logs, drinkTypes, tab, setTab, limit, onBack }) {
  const days = tab === "week" ? getLast7Days() : getLast30Days();

  const chartData = days.map(d => {
    const dl = logs.filter(l => l.date === d);
    return {
      label: tab === "week" ? fmt(d) : fmt(d).split(" ")[1],
      grams: parseFloat(dl.reduce((s, l) => s + l.pureAlcohol, 0).toFixed(1)),
    };
  });

  const periodLogs  = logs.filter(l => days.includes(l.date));
  const totalGrams  = periodLogs.reduce((s, l) => s + l.pureAlcohol, 0);
  const totalStd    = standardDrinks(totalGrams);
  const drinkDays   = new Set(periodLogs.map(l => l.date)).size;
  const avgPerDay   = (totalStd / days.length).toFixed(2);

  const typeMap = {};
  periodLogs.forEach(l => { typeMap[l.drinkType] = (typeMap[l.drinkType] || 0) + l.pureAlcohol; });
  const pieData = Object.entries(typeMap).map(([id, val]) => {
    const dt = drinkTypes.find(t => t.id === id);
    return { name: dt ? dt.name : id, value: parseFloat(val.toFixed(1)), icon: dt?.icon || "🫗" };
  }).sort((a, b) => b.value - a.value);

  const weeklyLimitG = limit * 10 * (tab === "week" ? 1 : 4);
  const limitPct     = Math.min((totalGrams / weeklyLimitG) * 100, 100);

  return (
    <div className="slide-up">
      <TopBar title="Analytics" onBack={onBack} backLabel="Back" />
      <div className="p-6 page-body">

        {/* Week / Month toggle */}
        <div className="flex gap-2 mb-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-1">
          {["week","month"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${tab === t ? "bg-amber-500 text-zinc-900" : "text-zinc-500 hover:text-zinc-300"}`}>
              {t === "week" ? "7 Days" : "30 Days"}
            </button>
          ))}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatCard label="Pure Alcohol" value={totalGrams.toFixed(0)} unit="g" />
          <StatCard label="Std Drinks"   value={totalStd.toFixed(1)}   unit="" />
          <StatCard label="Drinking Days" value={drinkDays} unit={`/ ${days.length}`} />
          <StatCard label="Avg / Day"    value={avgPerDay} unit="std" />
        </div>

        {/* Limit progress */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-6">
          <div className="flex justify-between mb-2">
            <p className="text-zinc-500 text-xs uppercase tracking-widest">vs. Limit</p>
            <span className="text-xs text-zinc-500">{totalGrams.toFixed(0)}g / {weeklyLimitG}g</span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${limitPct}%`, background: limitPct > 100 ? "#ef4444" : limitPct > 75 ? "#f59e0b" : "#10b981" }} />
          </div>
          <p className="text-zinc-700 text-xs mt-1.5">
            {limitPct > 100
              ? `Over by ${(totalGrams - weeklyLimitG).toFixed(0)}g`
              : `${(weeklyLimitG - totalGrams).toFixed(0)}g remaining`}
          </p>
        </div>

        {/* Bar chart */}
        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">Consumption Trend</p>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-6">
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={chartData} barSize={tab === "week" ? 24 : 8}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="label" tick={{ fill:"#52525b", fontSize:10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:"#52525b", fontSize:10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background:"#141414", border:"1px solid #3f3f46", borderRadius:"12px", color:"#e4e4e7" }} />
              <Bar dataKey="grams" fill="#f59e0b" radius={[4,4,0,0]} name="Pure Alcohol (g)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        {pieData.length > 0 && (
          <>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">By Drink Type</p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-4">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={40}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background:"#141414", border:"1px solid #3f3f46", borderRadius:"12px", color:"#e4e4e7" }} />
                  <Legend formatter={(v) => <span style={{ color:"#a1a1aa", fontSize:11 }}>{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 flex flex-col gap-2">
                {pieData.map((d, i) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                      <span className="text-zinc-400 text-sm">{d.icon} {d.name}</span>
                    </div>
                    <span className="text-zinc-300 text-sm font-medium">
                      {((d.value / totalGrams) * 100).toFixed(0)}%
                      <span className="text-zinc-600 ml-1 text-xs">{d.value}g</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Health summary */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Health Summary</p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {totalStd === 0
              ? "🌿 No alcohol logged in this period. Great work!"
              : totalStd <= 7  * (tab === "week" ? 1 : 4)
              ? `✅ Within recommended guidelines. ${drinkDays} drinking day${drinkDays !== 1 ? "s" : ""} recorded.`
              : totalStd <= 14 * (tab === "week" ? 1 : 4)
              ? "⚠️ Moderate consumption. Consider tracking closely over the next period."
              : "🚨 High consumption detected. Consider speaking to a health professional."}
          </p>
        </div>

      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SETTINGS SCREEN
// ══════════════════════════════════════
function SettingsScreen({ settings, users, onBack, onSave, onDeleteUser, activeUser }) {
  const [form, setForm] = useState(settings);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="slide-up">
      <TopBar title="Settings" onBack={onBack} backLabel="Back" />
      <div className="p-6 page-body">

        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3 mt-2">Limits</p>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl divide-y divide-zinc-800 mb-6">
          {[["dailyLimit","Daily Limit","Standard drinks per day"],["weeklyLimit","Weekly Limit","Standard drinks per week"]].map(([key, label, sub]) => (
            <div key={key} className="p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-zinc-200 text-sm">{label}</p>
                <p className="text-zinc-600 text-xs">{sub}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => form[key] > 1 && set(key, form[key] - 1)}
                  className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold">−</button>
                <span className="text-amber-400 font-bold w-6 text-center">{form[key]}</span>
                <button onClick={() => set(key, form[key] + 1)}
                  className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold">+</button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">Reminder</p>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-6">
          <p className="text-zinc-200 text-sm mb-1">Daily Reminder Time</p>
          <p className="text-zinc-600 text-xs mb-3">Set when to receive your daily log reminder</p>
          <input type="time"
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500/60 w-full"
            value={form.reminderTime} onChange={e => set("reminderTime", e.target.value)} />
          <p className="text-zinc-600 text-xs mt-2">Browser notifications require permission</p>
        </div>

        {activeUser && (
          <>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">Danger Zone</p>
            <div className="bg-zinc-900 border border-red-900/30 rounded-2xl p-4 mb-6">
              <p className="text-zinc-200 text-sm mb-1">Delete Profile</p>
              <p className="text-zinc-600 text-xs mb-3">Permanently delete {activeUser.name}'s profile and all logs</p>
              <button
                onClick={() => { if (confirm(`Delete ${activeUser.name}? This cannot be undone.`)) onDeleteUser(activeUser.id); }}
                className="btn-press px-4 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm font-medium hover:bg-red-500/30 transition-all">
                Delete Profile
              </button>
            </div>
          </>
        )}

        <button onClick={() => onSave(form)}
          className="btn-press w-full bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold rounded-2xl p-4 transition-all">
          Save Settings
        </button>

        <p className="text-center text-zinc-700 text-xs mt-8">
          DRAUGHT · Alcohol Awareness Tracker<br />Built for responsible consumption tracking
        </p>
      </div>
    </div>
  );
}
