import React, { useState, useMemo } from "react";

// ── GOOGLE FONTS ──────────────────────────────────────
const _fontLink = (() => {
  if(typeof document !== "undefined") {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=DM+Mono:wght@400;500&display=swap";
    document.head.appendChild(l);
    // Inject global styles
    const s = document.createElement("style");
    s.textContent = `
      *, *::before, *::after { box-sizing: border-box; }
      html, body, #root { height: 100%; margin: 0; }
      body { font-family: 'DM Sans', system-ui, sans-serif; background: #f0f4f8; }
      ::-webkit-scrollbar { width: 5px; height: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #c8d2e0; border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      @keyframes fadeSlideIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
      @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
      @keyframes shimmer { 0%,100% { opacity:.6; } 50% { opacity:1; } }
      @keyframes toastIn { from { opacity:0; transform:translateX(100%) scale(.9); } to { opacity:1; transform:translateX(0) scale(1); } }
      @keyframes toastOut { to { opacity:0; transform:translateX(110%) scale(.9); } }
      @keyframes pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.03); } }
      .page-enter { animation: fadeSlideIn .22s ease both; }
      .card-hover { transition: transform .18s ease, box-shadow .18s ease; }
      .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(15,23,42,.10) !important; }
      .row-hover:hover { background: #f5f8ff !important; }
      .btn-primary { transition: filter .15s, transform .12s; }
      .btn-primary:hover { filter: brightness(1.07); transform: translateY(-1px); }
      .btn-primary:active { transform: translateY(0); }
      .nav-item { transition: all .15s cubic-bezier(.4,0,.2,1); }
      .nav-item:hover { background: rgba(26,86,219,.07) !important; color: #1a56db !important; }
    `;
    document.head.appendChild(s);
  }
})();

// ── DATA ─────────────────────────────────────
const SEED_TEAMS = [
  { name:"Network",  emoji:"🌐", color:"#0891b2", lead:"Alex Chen"    },
  { name:"Security", emoji:"🔒", color:"#dc2626", lead:"Maria Santos" },
  { name:"Compute",  emoji:"⚙️",  color:"#d97706", lead:"James Park"   },
  { name:"Cloud",    emoji:"☁️",  color:"#7c3aed", lead:"Priya Nair"   },
  { name:"Storage",  emoji:"💾", color:"#059669", lead:"David Kim"    },
  { name:"Database", emoji:"🗄️", color:"#ea580c", lead:"Lisa Johnson" },
];

const SEED_USERS = [
  { id:"u0",  name:"Sarah Mitchell", email:"sarah@isms.local",   username:"sarah.mitchell",  password:"Admin@123",    team:null,       role:"admin",   title:"ISMS Administrator",  status:"Active", lastLogin:null,             mustReset:false },
  { id:"u1",  name:"Alex Chen",      email:"alex@isms.local",    username:"alex.chen",       password:"Manager@1",    team:"Network",  role:"manager", title:"Network Lead",        status:"Active", lastLogin:"2025-03-14",     mustReset:false },
  { id:"u2",  name:"Maria Santos",   email:"maria@isms.local",   username:"maria.santos",    password:"Manager@2",    team:"Security", role:"manager", title:"Security Lead",       status:"Active", lastLogin:"2025-03-13",     mustReset:false },
  { id:"u3",  name:"James Park",     email:"james@isms.local",   username:"james.park",      password:"Manager@3",    team:"Compute",  role:"manager", title:"Compute Lead",        status:"Active", lastLogin:"2025-03-12",     mustReset:false },
  { id:"u4",  name:"Priya Nair",     email:"priya@isms.local",   username:"priya.nair",      password:"Manager@4",    team:"Cloud",    role:"manager", title:"Cloud Lead",          status:"Active", lastLogin:"2025-03-14",     mustReset:false },
  { id:"u5",  name:"David Kim",      email:"david@isms.local",   username:"david.kim",       password:"Manager@5",    team:"Storage",  role:"manager", title:"Storage Lead",        status:"Active", lastLogin:"2025-03-11",     mustReset:false },
  { id:"u6",  name:"Lisa Johnson",   email:"lisa@isms.local",    username:"lisa.johnson",    password:"Manager@6",    team:"Database", role:"manager", title:"Database Lead",       status:"Active", lastLogin:"2025-03-10",     mustReset:false },
  { id:"u7",  name:"Tom Wilson",     email:"tom@isms.local",     username:"tom.wilson",      password:"Member@123",   team:"Network",  role:"member",  title:"Network Engineer",    status:"Active", lastLogin:"2025-03-14",     mustReset:false },
  { id:"u8",  name:"Emma Davis",     email:"emma@isms.local",    username:"emma.davis",      password:"Member@123",   team:"Security", role:"member",  title:"Security Analyst",    status:"Active", lastLogin:"2025-03-13",     mustReset:false },
  { id:"u9",  name:"Mike Brown",     email:"mike@isms.local",    username:"mike.brown",      password:"Member@123",   team:"Compute",  role:"member",  title:"Virtualisation Eng.", status:"Active", lastLogin:"2025-03-12",     mustReset:false },
  { id:"u10", name:"Aisha Malik",    email:"aisha@isms.local",   username:"aisha.malik",     password:"Member@123",   team:"Cloud",    role:"member",  title:"Cloud Engineer",      status:"Active", lastLogin:"2025-03-11",     mustReset:false },
  { id:"u11", name:"Ravi Sharma",    email:"ravi@isms.local",    username:"ravi.sharma",     password:"Member@123",   team:"Storage",  role:"member",  title:"Storage Engineer",    status:"Active", lastLogin:"2025-03-10",     mustReset:false },
  { id:"u12", name:"Jin Park",       email:"jin@isms.local",     username:"jin.park",        password:"Member@123",   team:"Database", role:"member",  title:"DBA Analyst",         status:"Active", lastLogin:null,             mustReset:true  },
];

const CAPACITY = [
  { team:"Network",  hc:3, availMins:24000, vacMins:2880, utilMins:19680 },
  { team:"Security", hc:4, availMins:38400, vacMins:1920, utilMins:32760 },
  { team:"Compute",  hc:4, availMins:38400, vacMins:480,  utilMins:26640 },
  { team:"Cloud",    hc:4, availMins:38400, vacMins:480,  utilMins:31680 },
  { team:"Storage",  hc:3, availMins:28800, vacMins:0,    utilMins:15600 },
  { team:"Database", hc:3, availMins:28800, vacMins:0,    utilMins:18960 },
];

const SEED_ACT = [
  { id:"ACT-001", name:"Firewall Policy Review",            team:"Security", type:"Change",   cat:"Security & Compliance",  estMins:1440, priority:"High",     status:"Active", jira:"SEC-210", date:"2025-03-10", nature:"Reactive",  workNature:"Change",   ticketNo:"CHG-4521", desc:"Review and update ingress/egress firewall rules for DMZ"         },
  { id:"ACT-002", name:"Network Segmentation – DC Migrate", team:"Network",  type:"Project",  cat:"Infrastructure Build",   estMins:4800, priority:"Critical", status:"Active", jira:"NET-087", date:"2025-03-01", nature:"Proactive", workNature:"Change",   ticketNo:"CHG-4490", desc:"VLAN restructuring for data-centre migration"                    },
  { id:"ACT-003", name:"AWS Landing Zone Setup",            team:"Cloud",    type:"Project",  cat:"Infrastructure Build",   estMins:3600, priority:"High",     status:"Active", jira:"CLD-045", date:"2025-02-20", nature:"Proactive", workNature:"Request",  ticketNo:"REQ-2201", desc:"Setup AWS Landing Zone with SCP policies and account vending"   },
  { id:"ACT-004", name:"SQL Server Upgrade to 2022",        team:"Database", type:"Change",   cat:"Maintenance",            estMins:960,  priority:"Medium",   status:"Active", jira:"DB-334",  date:"2025-03-12", nature:"Proactive", workNature:"Change",   ticketNo:"CHG-4512", desc:"Upgrade SQL Server instances to 2022 edition"                   },
  { id:"ACT-005", name:"SAN Performance Tuning",            team:"Storage",  type:"BAU",      cat:"Monitoring & Alerting",  estMins:480,  priority:"Low",      status:"Active", jira:"STR-112", date:"2025-03-05", nature:"Proactive", workNature:"Request",  ticketNo:"REQ-2188", desc:"Baseline SAN performance metrics and tuning"                    },
  { id:"ACT-006", name:"Kubernetes Cluster Upgrade",        team:"Compute",  type:"Change",   cat:"Maintenance",            estMins:720,  priority:"High",     status:"Active", jira:"CMP-229", date:"2025-03-14", nature:"Proactive", workNature:"Change",   ticketNo:"CHG-4530", desc:"Upgrade K8s cluster from 1.27 to 1.29"                          },
  { id:"ACT-007", name:"Zero Trust Network Access POC",     team:"Security", type:"Project",  cat:"Security & Compliance",  estMins:2400, priority:"High",     status:"Active", jira:"SEC-215", date:"2025-03-03", nature:"Proactive", workNature:"Request",  ticketNo:"REQ-2195", desc:"Proof-of-concept for ZTNA with IdP integration"                 },
  { id:"ACT-008", name:"Azure DevOps Pipeline Setup",       team:"Cloud",    type:"Project",  cat:"Automation & Scripting", estMins:1800, priority:"Medium",   status:"Active", jira:"CLD-048", date:"2025-03-06", nature:"Proactive", workNature:"Request",  ticketNo:"REQ-2199", desc:"CI/CD pipeline templates for cloud workloads"                   },
  { id:"ACT-009", name:"BGP Route Optimisation",            team:"Network",  type:"BAU",      cat:"Infrastructure Build",   estMins:600,  priority:"Medium",   status:"Active", jira:"NET-092", date:"2025-03-11", nature:"Reactive",  workNature:"Request",  ticketNo:"REQ-2205", desc:"Optimise BGP routing tables for DC links"                       },
  { id:"ACT-010", name:"Database Index Optimisation",       team:"Database", type:"BAU",      cat:"Maintenance",            estMins:360,  priority:"Low",      status:"Active", jira:"DB-340",  date:"2025-03-13", nature:"Proactive", workNature:"Change",   ticketNo:"CHG-4518", desc:"Rebuild fragmented indexes on production databases"              },
  { id:"ACT-011", name:"Backup Policy Review",              team:"Storage",  type:"BAU",      cat:"Security & Compliance",  estMins:240,  priority:"Medium",   status:"Active", jira:"STR-115", date:"2025-03-12", nature:"Proactive", workNature:"Change",   ticketNo:"CHG-4515", desc:"Review and update backup retention policies"                    },
  { id:"ACT-012", name:"Incident Response – P1 Outage",     team:"Compute",  type:"Incident", cat:"Maintenance",            estMins:840,  priority:"Critical", status:"Done",   jira:"INC-891", date:"2025-03-08", nature:"Reactive",  workNature:"Incident", ticketNo:"INC-0891", desc:"P1 outage investigation and resolution"                         },
];

const SEED_LOGS = [
  { id:"TL-001", date:"2025-03-14", userId:"u2",  member:"Maria Santos", team:"Security", actId:"ACT-001", activity:"Firewall Policy Review",            type:"Change",  cat:"Security & Compliance",  mins:240, notes:"Reviewed ingress rules for DMZ"           },
  { id:"TL-002", date:"2025-03-14", userId:"u1",  member:"Alex Chen",    team:"Network",  actId:"ACT-002", activity:"Network Segmentation – DC Migrate", type:"Project", cat:"Infrastructure Build",   mins:360, notes:"VLAN tagging config on core switches"      },
  { id:"TL-003", date:"2025-03-13", userId:"u4",  member:"Priya Nair",   team:"Cloud",    actId:"ACT-003", activity:"AWS Landing Zone Setup",            type:"Project", cat:"Infrastructure Build",   mins:480, notes:"SCP policies and account vending machine" },
  { id:"TL-004", date:"2025-03-13", userId:"u9",  member:"Mike Brown",   team:"Compute",  actId:"ACT-006", activity:"Kubernetes Cluster Upgrade",        type:"Change",  cat:"Maintenance",            mins:180, notes:"Pre-upgrade validation and testing"        },
  { id:"TL-005", date:"2025-03-12", userId:"u6",  member:"Lisa Johnson", team:"Database", actId:"ACT-004", activity:"SQL Server Upgrade to 2022",        type:"Change",  cat:"Maintenance",            mins:240, notes:"Compatibility assessment completed"        },
  { id:"TL-006", date:"2025-03-12", userId:"u5",  member:"David Kim",    team:"Storage",  actId:"ACT-005", activity:"SAN Performance Tuning",            type:"BAU",     cat:"Monitoring & Alerting",  mins:240, notes:"Baseline perf metrics captured"           },
  { id:"TL-007", date:"2025-03-11", userId:"u8",  member:"Emma Davis",   team:"Security", actId:"ACT-007", activity:"Zero Trust Network Access POC",     type:"Project", cat:"Security & Compliance",  mins:360, notes:"IdP integration with Azure AD"            },
  { id:"TL-008", date:"2025-03-11", userId:"u10", member:"Aisha Malik",  team:"Cloud",    actId:"ACT-008", activity:"Azure DevOps Pipeline Setup",       type:"Project", cat:"Automation & Scripting", mins:300, notes:"CI/CD template creation for 3 workloads"  },
  { id:"TL-009", date:"2025-03-10", userId:"u7",  member:"Tom Wilson",   team:"Network",  actId:"ACT-009", activity:"BGP Route Optimisation",            type:"BAU",     cat:"Infrastructure Build",   mins:120, notes:"Reviewed and adjusted BGP timers"         },
  { id:"TL-010", date:"2025-03-10", userId:"u11", member:"Ravi Sharma",  team:"Storage",  actId:"ACT-011", activity:"Backup Policy Review",              type:"BAU",     cat:"Security & Compliance",  mins:90,  notes:"Updated retention to 90-day policy"       },
];

const LEAVE = [
  { member:"Tom Wilson",  team:"Network",  from:"2025-03-17", to:"2025-03-21", days:5, mins:2400, type:"Annual Leave"   },
  { member:"Emma Davis",  team:"Security", from:"2025-03-24", to:"2025-03-26", days:3, mins:1440, type:"Annual Leave"   },
  { member:"Mike Brown",  team:"Compute",  from:"2025-03-10", to:"2025-03-10", days:1, mins:480,  type:"Sick Leave"     },
  { member:"Aisha Malik", team:"Cloud",    from:"2025-03-20", to:"2025-03-20", days:1, mins:480,  type:"Public Holiday" },
];

// ── HELPERS ──────────────────────────────────
const fmtM   = m => { if (!m && m !== 0) return "—"; const h = Math.floor(m/60), r = m%60; return h&&r?`${h}h ${r}m`:h?`${h}h`:`${r}m`; };
const tCol_module = t => SEED_TEAMS.find(x=>x.name===t)?.color || "#6b7280";
const uCol   = p => p>85?"#dc2626":p>70?"#d97706":"#059669";
let   seq    = 300;
const uid    = p => `${p}-${++seq}`;
const today  = () => new Date().toISOString().slice(0,10);

// ── ATOMS ────────────────────────────────────
const Bar = ({pct,color}) => (
  <div style={{height:5,background:"#e5e7eb",borderRadius:3,overflow:"hidden",marginTop:4}}>
    <div style={{height:"100%",width:`${Math.min(100,Math.max(0,pct))}%`,background:color||"#1a56db",borderRadius:3,transition:"width .4s"}}/>
  </div>
);

const TPill = ({t}) => {
  const m = {Network:"#dbeafe|#1d4ed8",Security:"#ffe4e6|#be123c",Compute:"#fef9c3|#854d0e",Cloud:"#ede9fe|#5b21b6",Storage:"#dcfce7|#166534",Database:"#ffedd5|#c2410c"};
  const [bg,fg] = (m[t]||"#f1f5f9|#6b7280").split("|");
  return <span style={{background:bg,color:fg,padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:.1}}>{t}</span>;
};

const SPill = ({s}) => {
  const m = {Active:["#dcfce7","#166534"],Pending:["#fef9c3","#854d0e"],Done:["#f1f5f9","#64748b"],Blocked:["#ffe4e6","#be123c"]};
  const [bg,fg] = m[s]||["#f1f5f9","#64748b"];
  const dot = {Active:"🟢",Pending:"🟡",Done:"⚪",Blocked:"🔴"}[s]||"";
  return <span style={{background:bg,color:fg,padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:600,display:"inline-flex",alignItems:"center",gap:4}}><span style={{fontSize:8}}>{dot}</span>{s}</span>;
};

const NaturePill = ({n}) => {
  const [bg,fg] = n==="Proactive" ? ["#eff6ff","#1d4ed8"] : ["#fff1f2","#be123c"];
  return <span style={{background:bg,color:fg,padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:.1}}>{n==="Proactive"?"⬆ Proactive":"⬇ Reactive"}</span>;
};

const WNPill = ({w}) => {
  const m = {Request:["#f5f3ff","#6d28d9"],Change:["#fffbeb","#b45309"],Incident:["#fff1f2","#be123c"]};
  const [bg,fg] = m[w]||["#f1f5f9","#64748b"];
  return <span style={{background:bg,color:fg,padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:.1}}>{w}</span>;
};

const PDot = ({p}) => {
  const cfg = {Critical:["#fff1f2","#be123c","▲"],High:["#fff7ed","#c2410c","↑"],Medium:["#eff6ff","#1d4ed8","→"],Low:["#f8fafc","#94a3b8","↓"]}[p]||["#f8fafc","#94a3b8","·"];
  return <span style={{background:cfg[0],color:cfg[1],padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:.1}}>{cfg[2]} {p}</span>;
};

const Card = ({children,style={},onClick,onMouseEnter,onMouseLeave,className=""}) => (
  <div onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={className}
    style={{background:"#ffffff",border:"1px solid #e8edf5",borderRadius:14,padding:20,
      boxShadow:"0 1px 3px rgba(15,23,42,.05),0 4px 12px rgba(15,23,42,.04)",...style}}>{children}</div>
);

const TH = ({c}) => <th style={{textAlign:"left",padding:"10px 14px",fontSize:10,letterSpacing:1.1,textTransform:"uppercase",color:"#94a3b8",background:"#f8fafc",borderBottom:"1px solid #e8edf5",fontWeight:700,whiteSpace:"nowrap",fontFamily:"'DM Sans',sans-serif"}}>{c}</th>;
const TD = ({children,s={}}) => <td style={{padding:"11px 14px",color:"#374151",verticalAlign:"middle",borderBottom:"1px solid #f1f5f9",fontFamily:"'DM Sans',sans-serif",...s}}>{children}</td>;

const iS = {width:"100%",padding:"9px 12px",borderRadius:9,border:"1px solid #e2e8f0",fontSize:13,fontFamily:"'DM Sans',sans-serif",outline:"none",background:"#fff",boxSizing:"border-box",transition:"border-color .15s,box-shadow .15s",color:"#0f172a"};
const sS = {...iS,background:"#f8fafc"};

const Btn = ({children,v="pri",sm,onClick,style={}}) => {
  const base = {display:"inline-flex",alignItems:"center",gap:5,padding:sm?"5px 12px":"9px 18px",borderRadius:9,border:"none",fontWeight:600,cursor:"pointer",fontSize:sm?11.5:13,fontFamily:"'DM Sans',sans-serif",letterSpacing:.2,transition:"all .15s",whiteSpace:"nowrap",...style};
  const vs   = {
    pri:{background:"linear-gradient(135deg,#1a56db 0%,#1e66f5 100%)",color:"#fff",boxShadow:"0 2px 8px rgba(26,86,219,.3)"},
    sec:{background:"#fff",color:"#475569",border:"1px solid #e2e8f0",boxShadow:"0 1px 3px rgba(15,23,42,.06)"},
    dan:{background:"#fff5f5",color:"#c53030",border:"1px solid #fed7d7"},
    suc:{background:"linear-gradient(135deg,#059669,#0d9488)",color:"#fff",boxShadow:"0 2px 8px rgba(5,150,105,.25)"},
  };
  return <button className="btn-primary" style={{...base,...vs[v]}} onClick={onClick}>{children}</button>;
};

const Lbl = ({t,children}) => (
  <div><div style={{fontSize:11.5,fontWeight:600,color:"#64748b",marginBottom:5,letterSpacing:.3,textTransform:"uppercase"}}>{t}</div>{children}</div>
);

const ModalWrap = ({title,onClose,children,wide}) => (
  <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:"absolute",inset:0,background:"rgba(15,23,42,.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:600}}>
    <div style={{background:"#fff",borderRadius:18,width:wide?720:580,maxWidth:"95%",maxHeight:"92vh",overflowY:"auto",boxShadow:"0 24px 64px rgba(15,23,42,.22),0 0 0 1px rgba(255,255,255,.4)",animation:"fadeSlideIn .2s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 26px 16px",borderBottom:"1px solid #f1f5f9"}}>
        <div style={{fontSize:16,fontWeight:700,color:"#0f172a",letterSpacing:-.2,fontFamily:"'DM Sans',sans-serif"}}>{title}</div>
        <button onClick={onClose} style={{background:"#f1f5f9",border:"none",width:30,height:30,borderRadius:"50%",cursor:"pointer",color:"#64748b",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",transition:"background .15s"}}
          onMouseEnter={e=>e.currentTarget.style.background="#e2e8f0"} onMouseLeave={e=>e.currentTarget.style.background="#f1f5f9"}>×</button>
      </div>
      <div style={{padding:"20px 26px 24px"}}>{children}</div>
    </div>
  </div>
);

const MFoot = ({onClose,onSave,label="Save"}) => (
  <div style={{display:"flex",justifyContent:"flex-end",gap:9,marginTop:22,paddingTop:18,borderTop:"1px solid #f1f5f9"}}>
    <Btn v="sec" onClick={onClose}>Cancel</Btn>
    <Btn onClick={onSave}>✓ {label}</Btn>
  </div>
);

const Tabs = ({tabs,active,onChange}) => (
  <div style={{display:"flex",gap:2,background:"#f1f5f9",borderRadius:11,padding:3,width:"fit-content",marginBottom:18}}>
    {tabs.map(t=>(
      <button key={t.id} onClick={()=>onChange(t.id)}
        style={{padding:"7px 16px",borderRadius:9,border:"none",cursor:"pointer",fontSize:12.5,fontWeight:600,
          background:active===t.id?"#fff":"transparent",
          color:active===t.id?"#1a56db":"#64748b",
          boxShadow:active===t.id?"0 1px 4px rgba(15,23,42,.1),0 0 0 1px rgba(15,23,42,.04)":"none",
          fontFamily:"'DM Sans',sans-serif",transition:"all .15s",letterSpacing:.1}}>
        {t.label}
      </button>
    ))}
  </div>
);

const InfoBanner = ({color,bg,border,icon,children}) => (
  <div style={{background:bg,border:`1px solid ${border}`,borderRadius:10,padding:"11px 16px",marginBottom:16,fontSize:12.5,color,display:"flex",alignItems:"center",gap:10,lineHeight:1.5}}>
    <span style={{fontSize:17,flexShrink:0}}>{icon}</span><span>{children}</span>
  </div>
);


// ── FORCE RESET FORM ─────────────────────────
function ForceResetForm({onDone, onSave}) {
  const [np,   setNp]   = React.useState("");
  const [cp,   setCp]   = React.useState("");
  const [err,  setErr]  = React.useState("");
  const [show, setShow] = React.useState(false);
  const rules = [
    {label:"Min 8 characters",   ok:np.length>=8},
    {label:"Uppercase letter",   ok:/[A-Z]/.test(np)},
    {label:"Number",             ok:/[0-9]/.test(np)},
    {label:"Special character",  ok:/[^A-Za-z0-9]/.test(np)},
  ];
  const allOk = rules.every(r=>r.ok);
  const save = () => {
    if(!allOk){ setErr("Password does not meet all requirements"); return; }
    if(np!==cp){ setErr("Passwords do not match"); return; }
    onSave(np);
    onDone();
  };
  const iS = {width:"100%",padding:"11px 40px 11px 14px",borderRadius:10,border:"1.5px solid rgba(255,255,255,.15)",fontSize:14,background:"rgba(255,255,255,.07)",color:"#fff",outline:"none",boxSizing:"border-box"};
  return (
    <div>
      {err && <div style={{background:"rgba(220,38,38,.15)",border:"1px solid rgba(220,38,38,.3)",borderRadius:9,padding:"9px 13px",marginBottom:14,fontSize:12,color:"#fca5a5"}}>{err}</div>}
      <div style={{marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.6)",marginBottom:5,textTransform:"uppercase",letterSpacing:.8}}>New Password</div>
        <div style={{position:"relative"}}>
          <input type={show?"text":"password"} value={np} onChange={e=>{setNp(e.target.value);setErr("");}} style={iS} placeholder="New password"/>
          <button onClick={()=>setShow(s=>!s)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,.4)",fontSize:15}}>{show?"🙈":"👁"}</button>
        </div>
      </div>
      <div style={{marginBottom:14}}>
        <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.6)",marginBottom:5,textTransform:"uppercase",letterSpacing:.8}}>Confirm Password</div>
        <input type="password" value={cp} onChange={e=>{setCp(e.target.value);setErr("");}}
          style={{...iS,paddingRight:14}} placeholder="Confirm new password"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:18}}>
        {rules.map(r=>(
          <div key={r.label} style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:r.ok?"#4ade80":"rgba(255,255,255,.35)"}}>
            <span>{r.ok?"✓":"○"}</span>{r.label}
          </div>
        ))}
      </div>
      <button onClick={save} disabled={!allOk||!cp}
        style={{width:"100%",padding:"13px",borderRadius:11,background:allOk&&cp?"linear-gradient(135deg,#1a56db,#0891b2)":"rgba(255,255,255,.08)",color:allOk&&cp?"#fff":"rgba(255,255,255,.3)",border:"none",fontWeight:700,fontSize:15,cursor:allOk&&cp?"pointer":"not-allowed",transition:"all .2s"}}>
        Set Password & Continue →
      </button>
    </div>
  );
}

// ── LOGIN PAGE ───────────────────────────────
function LoginPage({allUsers, onLogin}) {
  const [cred,       setCred]       = React.useState({username:"", password:""});
  const [showPw,     setShowPw]     = React.useState(false);
  const [error,      setError]      = React.useState("");
  const [loading,    setLoading]    = React.useState(false);
  const [forgotMode, setForgotMode] = React.useState(false);
  const [forgotSent, setForgotSent] = React.useState(false);
  const [forgotEmail,setForgotEmail]= React.useState("");

  const handleLogin = () => {
    if(!cred.username.trim()||!cred.password){ setError("Please enter username and password"); return; }
    setLoading(true); setError("");
    setTimeout(()=>{
      const found = allUsers.find(u =>
        (u.username===cred.username.trim() || u.email===cred.username.trim()) &&
        u.password===cred.password &&
        (u.status||"Active")==="Active"
      );
      setLoading(false);
      if(found){
        onLogin(found);
      } else {
        const userExists = allUsers.find(u=>u.username===cred.username.trim()||u.email===cred.username.trim());
        if(userExists && (userExists.status||"Active")==="Inactive"){
          setError("This account has been deactivated. Contact your administrator.");
        } else {
          setError("Invalid username or password. Please try again.");
        }
        setCred(p=>({...p,password:""}));
      }
    }, 600);
  };

  const iS = {width:"100%",padding:"11px 14px",borderRadius:10,border:"1.5px solid #e2e8f0",fontSize:14,fontFamily:"inherit",outline:"none",background:"#fff",boxSizing:"border-box",transition:"border-color .15s"};

  const DEMO_USERS = [
    {label:"Admin",   username:"sarah.mitchell", password:"Admin@123",  role:"admin",   color:"#6366f1"},
    {label:"Manager", username:"alex.chen",       password:"Manager@1",  role:"manager", color:"#1a56db"},
    {label:"Member",  username:"tom.wilson",       password:"Member@123", role:"member",  color:"#059669"},
  ];

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#0f2942 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:20,fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      {/* Background pattern */}
      <div style={{position:"fixed",inset:0,overflow:"hidden",pointerEvents:"none"}}>
        {[...Array(6)].map((_,i)=>(
          <div key={i} style={{position:"absolute",borderRadius:"50%",background:"rgba(26,86,219,.06)",
            width:`${[400,300,500,250,350,450][i]}px`,height:`${[400,300,500,250,350,450][i]}px`,
            top:`${[-10,20,60,-5,40,70][i]}%`,left:`${[-5,60,-10,80,30,50][i]}%`,
            animation:`pulse ${[8,10,12,9,11,7][i]}s ease-in-out infinite alternate`}}/>
        ))}
      </div>

      <div style={{width:"100%",maxWidth:440,position:"relative",zIndex:1}}>
        {/* Logo */}
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:60,height:60,borderRadius:16,background:"linear-gradient(135deg,#1a56db,#0891b2)",boxShadow:"0 8px 32px rgba(26,86,219,.4)",marginBottom:14}}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" fill="rgba(255,255,255,.2)" stroke="white" strokeWidth="1.5"/>
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{fontSize:26,fontWeight:800,color:"#fff",letterSpacing:-.5}}>ISMS</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.5)",letterSpacing:1.5,textTransform:"uppercase",marginTop:3}}>Infrastructure Service Management</div>
        </div>

        {!forgotMode ? (
          /* ── LOGIN FORM ── */
          <div style={{background:"rgba(255,255,255,.04)",backdropFilter:"blur(20px)",borderRadius:20,padding:"32px 36px",border:"1px solid rgba(255,255,255,.1)",boxShadow:"0 24px 64px rgba(0,0,0,.4)"}}>
            <div style={{fontSize:18,fontWeight:700,color:"#fff",marginBottom:4}}>Sign In</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.45)",marginBottom:24}}>Enter your credentials to access ISMS</div>

            {error && (
              <div style={{background:"rgba(220,38,38,.15)",border:"1px solid rgba(220,38,38,.3)",borderRadius:10,padding:"10px 14px",marginBottom:16,fontSize:12,color:"#fca5a5",display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:14}}>⚠️</span>{error}
              </div>
            )}

            {/* Username */}
            <div style={{marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.6)",marginBottom:6,textTransform:"uppercase",letterSpacing:.8}}>Username or Email</div>
              <input style={{...iS,background:"rgba(255,255,255,.06)",border:"1.5px solid rgba(255,255,255,.12)",color:"#fff"}}
                placeholder="username or email@company.com"
                value={cred.username}
                onChange={e=>setCred(p=>({...p,username:e.target.value}))}
                onKeyDown={e=>e.key==="Enter"&&handleLogin()}
                autoComplete="username"/>
            </div>

            {/* Password */}
            <div style={{marginBottom:8}}>
              <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.6)",marginBottom:6,textTransform:"uppercase",letterSpacing:.8}}>Password</div>
              <div style={{position:"relative"}}>
                <input style={{...iS,background:"rgba(255,255,255,.06)",border:"1.5px solid rgba(255,255,255,.12)",color:"#fff",paddingRight:44}}
                  type={showPw?"text":"password"}
                  placeholder="••••••••"
                  value={cred.password}
                  onChange={e=>setCred(p=>({...p,password:e.target.value}))}
                  onKeyDown={e=>e.key==="Enter"&&handleLogin()}
                  autoComplete="current-password"/>
                <button onClick={()=>setShowPw(s=>!s)}
                  style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,.4)",fontSize:16,lineHeight:1,padding:2}}>
                  {showPw?"🙈":"👁"}
                </button>
              </div>
            </div>

            <div style={{textAlign:"right",marginBottom:22}}>
              <button onClick={()=>{setForgotMode(true);setError("");}} style={{background:"none",border:"none",cursor:"pointer",fontSize:12,color:"rgba(26,86,219,.9)",fontWeight:600}}>Forgot password?</button>
            </div>

            <button onClick={handleLogin} disabled={loading}
              style={{width:"100%",padding:"13px",borderRadius:11,background:loading?"rgba(255,255,255,.1)":"linear-gradient(135deg,#1a56db,#0891b2)",color:loading?"rgba(255,255,255,.4)":"#fff",border:"none",fontWeight:700,fontSize:15,cursor:loading?"not-allowed":"pointer",boxShadow:loading?"none":"0 4px 16px rgba(26,86,219,.4)",transition:"all .2s",letterSpacing:.2}}>
              {loading?"Signing in…":"Sign In →"}
            </button>

            {/* Demo credentials */}
            <div style={{marginTop:24,paddingTop:20,borderTop:"1px solid rgba(255,255,255,.08)"}}>
              <div style={{fontSize:10,color:"rgba(255,255,255,.3)",textTransform:"uppercase",letterSpacing:1,marginBottom:10,textAlign:"center"}}>Demo Credentials</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7}}>
                {DEMO_USERS.map(d=>(
                  <button key={d.username} onClick={()=>setCred({username:d.username,password:d.password})}
                    style={{padding:"8px 6px",borderRadius:9,background:`${d.color}22`,border:`1px solid ${d.color}44`,cursor:"pointer",textAlign:"center",transition:"all .15s"}}
                    onMouseEnter={e=>e.currentTarget.style.background=`${d.color}35`}
                    onMouseLeave={e=>e.currentTarget.style.background=`${d.color}22`}>
                    <div style={{fontSize:11,fontWeight:700,color:d.color}}>{d.label}</div>
                    <div style={{fontSize:9,color:"rgba(255,255,255,.4)",marginTop:2}}>{d.username}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ── FORGOT PASSWORD ── */
          <div style={{background:"rgba(255,255,255,.04)",backdropFilter:"blur(20px)",borderRadius:20,padding:"32px 36px",border:"1px solid rgba(255,255,255,.1)",boxShadow:"0 24px 64px rgba(0,0,0,.4)"}}>
            <button onClick={()=>{setForgotMode(false);setForgotSent(false);setForgotEmail("");}} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,.5)",fontSize:12,marginBottom:16,display:"flex",alignItems:"center",gap:5,padding:0}}>
              ← Back to Sign In
            </button>
            {!forgotSent ? (
              <>
                <div style={{fontSize:18,fontWeight:700,color:"#fff",marginBottom:4}}>Reset Password</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.45)",marginBottom:24}}>Enter your email and we'll send a reset link</div>
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.6)",marginBottom:6,textTransform:"uppercase",letterSpacing:.8}}>Email Address</div>
                  <input style={{...iS,background:"rgba(255,255,255,.06)",border:"1.5px solid rgba(255,255,255,.12)",color:"#fff"}}
                    type="email" placeholder="your.email@company.com"
                    value={forgotEmail} onChange={e=>setForgotEmail(e.target.value)}/>
                </div>
                <button onClick={()=>{if(forgotEmail)setForgotSent(true);}}
                  style={{width:"100%",padding:"13px",borderRadius:11,background:"linear-gradient(135deg,#1a56db,#0891b2)",color:"#fff",border:"none",fontWeight:700,fontSize:15,cursor:"pointer",boxShadow:"0 4px 16px rgba(26,86,219,.4)"}}>
                  Send Reset Link
                </button>
              </>
            ) : (
              <div style={{textAlign:"center",padding:"10px 0"}}>
                <div style={{fontSize:44,marginBottom:14}}>📧</div>
                <div style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:8}}>Reset Link Sent</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.5)",lineHeight:1.6,marginBottom:20}}>
                  If <strong style={{color:"rgba(255,255,255,.7)"}}>{forgotEmail}</strong> matches an account, a password reset link has been sent.<br/>Check your inbox.
                </div>
                <div style={{background:"rgba(255,193,7,.1)",border:"1px solid rgba(255,193,7,.2)",borderRadius:9,padding:"10px 14px",fontSize:11,color:"rgba(255,255,255,.5)",marginBottom:16}}>
                  📌 Demo note: In production this would send a real email. For now, ask your admin to reset your password via User Management.
                </div>
                <button onClick={()=>{setForgotMode(false);setForgotSent(false);setForgotEmail("");}}
                  style={{padding:"10px 28px",borderRadius:10,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",color:"#fff",fontWeight:600,fontSize:13,cursor:"pointer"}}>
                  Back to Sign In
                </button>
              </div>
            )}
          </div>
        )}

        <div style={{textAlign:"center",marginTop:20,fontSize:11,color:"rgba(255,255,255,.2)"}}>
          ISMS v1.0.0-beta · Infrastructure Service Management System
        </div>
      </div>
    </div>
  );
}

// ── APP ──────────────────────────────────────
export default function App() {
  const [allUsers,   setAllUsers]   = useState(SEED_USERS);
  const [teams,      setTeams]      = useState(SEED_TEAMS);
  const tCol = t => (teams||SEED_TEAMS).find(x=>x.name===t)?.color || "#6b7280";
  const [authUser,   setAuthUser]   = useState(null); // null = not logged in
  const [user,       setUser]       = useState(null);
  const [mustReset,  setMustReset]  = useState(false);
  const [page,       setPage]       = useState("dashboard");
  const [acts,       setActs]       = useState(SEED_ACT);
  const [logs,       setLogs]       = useState(SEED_LOGS);
  const [modal,      setModal]      = useState(null);
  const [target,     setTarget]     = useState(null);
  const [toast,      setToast]      = useState(null);
  const [showSwitch, setShowSwitch] = useState(false);
  const [dashDrill,  setDashDrill]  = useState(null); // {type,label,data}

  // sub-tabs
  const [reportTab,   setReportTab]   = useState("util");
  const [settingsTab, setSettingsTab] = useState("fields");

  // filters
  const [actF, setActF] = useState({team:"",type:"",status:"",search:""});
  const [logQ, setLogQ] = useState("");

  // forms
  const bAct = {name:"",team:"",type:"Project",cat:"Infrastructure Build",estMins:480,priority:"Medium",status:"Active",nature:"Proactive",workNature:"Request",jira:"",ticketNo:"",desc:""};
  const bLog = {actId:"",mins:30,notes:"",date:today()};
  const [aForm, setAForm] = useState(bAct);
  const [lForm, setLForm] = useState(bLog);

  const isAdmin = user?.role === "admin";
  const isMgr   = user?.role === "manager";
  const isMgrOrAdmin = isMgr || isAdmin;
  const tc    = user?.team ? tCol(user.team) : "#6366f1";
  const adminColor = "#6366f1";

  const showToast = (msg,type="ok") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };
  const closeM    = () => { setModal(null); setTarget(null); setAForm(bAct); setLForm(bLog); };
  const goPage    = p  => { setPage(p); setShowSwitch(false); };

  const handleLogin = (loggedInUser) => {
    // Update lastLogin
    const now = new Date().toISOString().slice(0,10);
    setAllUsers(p=>p.map(u=>u.id===loggedInUser.id?{...u,lastLogin:now}:u));
    setAuthUser(loggedInUser);
    setUser(loggedInUser);
    setMustReset(loggedInUser.mustReset||false);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setAuthUser(null);
    setUser(null);
    setPage("dashboard");
    setModal(null);
  };

  // derived
  const teamActs  = useMemo(()=>isAdmin ? acts : acts.filter(a=>a.team===(user?.team)),[acts,user,isAdmin]);
  const loggable  = useMemo(()=>user?.team ? acts.filter(a=>a.team===user.team&&a.status!=="Done") : [],[acts,user,isAdmin]);
  const teamLogs  = useMemo(()=>isAdmin ? logs : logs.filter(l=>l.team===(user?.team)),[logs,user,isAdmin]);
  const myLogs    = useMemo(()=>user?.id ? logs.filter(l=>l.userId===user.id) : [],[logs,user]);
  const minsForAct = actId => logs.filter(l=>l.actId===actId).reduce((s,l)=>s+l.mins,0);

  const filtActs = useMemo(()=>{
    // admin: see all, filterable by team; manager: only own team
    let r = isAdmin ? acts : teamActs;
    if(isAdmin && actF.team) r = acts.filter(a=>a.team===actF.team);
    if(actF.type)   r = r.filter(a=>a.type===actF.type);
    if(actF.status) r = r.filter(a=>a.status===actF.status);
    if(actF.search) r = r.filter(a=>a.name.toLowerCase().includes(actF.search.toLowerCase())||a.jira.toLowerCase().includes(actF.search.toLowerCase()));
    return r;
  },[acts,teamActs,actF,isMgr,isAdmin]);

  const filtLogs = useMemo(()=>{
    let r = isAdmin ? logs : isMgr ? teamLogs : myLogs;
    if(logQ) r = r.filter(l=>l.member.toLowerCase().includes(logQ.toLowerCase())||l.activity.toLowerCase().includes(logQ.toLowerCase()));
    return r;
  },[logs,teamLogs,myLogs,logQ,isMgr,isAdmin]);

  // saves
  const saveAct = () => {
    if(!aForm.name.trim()){ showToast("Activity name required","err"); return; }
    if(target){
      setActs(p=>p.map(a=>a.id===target.id?{...target,...aForm}:a));
      showToast(`"${aForm.name}" updated`);
    } else {
      setActs(p=>[{...aForm,id:uid("ACT"),team:aForm.team||user.team,date:today()},...p]);
      showToast(`"${aForm.name}" created`);
    }
    closeM();
  };

  const saveLog = () => {
    if(!lForm.actId){ showToast("Select an activity","err"); return; }
    if(lForm.mins<1){ showToast("Enter minutes > 0","err"); return; }
    const act = acts.find(a=>a.id===lForm.actId); if(!act) return;
    if(target){
      setLogs(p=>p.map(l=>l.id===target.id?{...l,actId:lForm.actId,activity:act.name,type:act.type,cat:act.cat,mins:+lForm.mins,notes:lForm.notes,date:lForm.date}:l));
      showToast("Entry updated");
    } else {
      setLogs(p=>[{id:uid("TL"),date:lForm.date,userId:user.id,member:user.name,team:act.team,actId:lForm.actId,activity:act.name,type:act.type,cat:act.cat,mins:+lForm.mins,notes:lForm.notes},...p]);
      showToast(`${fmtM(+lForm.mins)} logged on "${act.name}"`);
    }
    closeM();
  };

  const delAct    = id => { setActs(p=>p.filter(a=>a.id!==id)); showToast("Activity removed"); };
  const delLog    = id => { setLogs(p=>p.filter(l=>l.id!==id)); showToast("Entry deleted"); };
  const openEditA = a  => { setTarget(a); setAForm({name:a.name,team:a.team,type:a.type,cat:a.cat,estMins:a.estMins,priority:a.priority,status:a.status,nature:a.nature||"Proactive",workNature:a.workNature||"Request",jira:a.jira,ticketNo:a.ticketNo||"",desc:a.desc}); setModal("act"); };
  const openEditL = l  => { setTarget(l); setLForm({actId:l.actId,mins:l.mins,notes:l.notes,date:l.date}); setModal("log"); };

  // ── FULL NAV (same structure for manager & member, labels differ) ──
  const NAV_MGR = [
    { sec:"Overview", items:[
        {id:"dashboard",  icon:"⊞",  label:"Dashboard"},
        {id:"activities", icon:"📋", label:"Activities"},
        {id:"timelog",    icon:"⏱",  label:"Time Log"},
    ]},
    { sec:"Teams", items:[
        {id:"teams",      icon:"👥", label:"Team Management"},
        {id:"members",    icon:"👤", label:"Members"},
        {id:"bandwidth",  icon:"📊", label:"Bandwidth & Capacity"},
    ]},
    { sec:"Analytics", items:[
        {id:"reports",    icon:"📈", label:"Reports"},
        {id:"custreports",icon:"✏️", label:"Custom Reports"},
        {id:"planning",   icon:"📅", label:"Capacity Planning"},
    ]},
    { sec:"Productivity", items:[
        {id:"prod_overview",  icon:"🚀", label:"Overview"},
        {id:"prod_flags",     icon:"🚩", label:"Flags & Risks"},
        {id:"prod_heatmap",   icon:"🔥", label:"Effort Heatmap"},
        {id:"prod_suggest",   icon:"💡", label:"Suggestions"},
    ]},
    { sec:"Data Connect", items:[
        {id:"dc_upload",      icon:"📤", label:"Upload Tickets"},
        {id:"dc_integrations",icon:"🔗", label:"Integrations"},
    ]},
    { sec:"System", items:[
        {id:"usermgmt",   icon:"🔐", label:"User Management"},
        {id:"settings",   icon:"⚙️",  label:"Settings"},
    ]},
  ];

  const NAV_MBR = [
    { sec:"My Work", items:[
        {id:"dashboard",  icon:"📋", label:"Team Activities"},
        {id:"timelog",    icon:"⏱",  label:"My Time Log"},
    ]},
    { sec:"Team", items:[
        {id:"members",    icon:"👤", label:"Team Members"},
        {id:"teams",      icon:"👥", label:"Team View"},
    ]},
    { sec:"Analytics", items:[
        {id:"reports",    icon:"📈", label:"Reports"},
        {id:"planning",   icon:"📅", label:"Capacity Planning"},
    ]},
    { sec:"Data Connect", items:[
        {id:"dc_upload",      icon:"📤", label:"Upload Tickets"},
        {id:"dc_integrations",icon:"🔗", label:"Integrations"},
    ]},
    { sec:"System", items:[
        {id:"usermgmt",   icon:"🔐", label:"User Management"},
        {id:"settings",   icon:"⚙️",  label:"Settings"},
    ]},
  ];

  const NAV = isMgrOrAdmin ? NAV_MGR : NAV_MBR;

  const PAGE_TITLE = {
    dashboard: isMgrOrAdmin?"Dashboard":"Team Activities",
    activities:"Activities", timelog:isAdmin?"All Teams Time Log":isMgr?"Team Time Log":"My Time Log",
    teams: isAdmin?"All Teams":isMgr?"Team Management":"Team View", members:"Members",
    bandwidth:"Bandwidth & Capacity", reports:"Reports",
    custreports:"Custom Reports", planning:"Capacity Planning", settings:"Settings",
    prod_overview:"Productivity Overview", prod_flags:"Flags & Risks",
    prod_heatmap:"Effort Heatmap", prod_suggest:"Suggestions & Actions",
    dc_upload:"Upload Tickets", dc_integrations:"Integrations",
    usermgmt:"User Management",
    changepw:"Change Password",
    myprofile:"My Profile",
  };

  // ── MINUTE PRESETS ───────────────────────
  const MinPre = ({val,onChange}) => (
    <div style={{display:"flex",gap:5,marginTop:7,flexWrap:"wrap"}}>
      {[[15,"15m"],[30,"30m"],[45,"45m"],[60,"1h"],[90,"1.5h"],[120,"2h"],[180,"3h"],[240,"4h"],[300,"5h"],[480,"8h"]].map(([v,l])=>(
        <button key={v} onClick={()=>onChange(v)} style={{padding:"3px 9px",borderRadius:20,border:`1.5px solid ${val===v?"#1a56db":"#e2e8f0"}`,background:val===v?"#1a56db":"#f8fafc",color:val===v?"#fff":"#475569",fontSize:11,fontWeight:600,cursor:"pointer",borderRadius:8,transition:"all .12s"}}>{l}</button>
      ))}
    </div>
  );

  // ══════════════════════════════════════════
  //  PAGE RENDERERS
  // ══════════════════════════════════════════

  // ── AUTH GATE (must come after all hooks) ───────────────────────
  if(!authUser || !user) return <LoginPage allUsers={allUsers} onLogin={handleLogin}/>;

  // ── DASHBOARD ────────────────────────────
  const PageDashboard = () => {
    if (!isMgrOrAdmin) {
      const active = teamActs.filter(a=>a.status!=="Done");
      return (
        <div>
          <div style={{marginBottom:20}}>
            <div style={{fontSize:21,fontWeight:800,color:"#0f172a",letterSpacing:-.4,fontFamily:"'DM Sans',sans-serif"}}>Team Activities — {user.team}</div>
            <div style={{fontSize:12.5,color:"#64748b",marginTop:4,lineHeight:1.5}}>Log your time against the activities below</div>
          </div>
          <InfoBanner color="#92400e" bg="#fffbeb" border="#fde68a" icon="💡">Activities are managed by your team manager. Click ⏱ Log My Time to record minutes spent.</InfoBanner>
          {active.length===0 ? <div style={{textAlign:"center",padding:60,color:"#9ca3af",fontSize:14}}>No active activities yet.</div> : (
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:14}}>
              {active.map(a=>{
                const total=minsForAct(a.id), mine=myLogs.filter(l=>l.actId===a.id).reduce((s,l)=>s+l.mins,0);
                const pct=Math.min(100,Math.round(total/Math.max(a.estMins,1)*100));
                return (
                  <Card key={a.id} style={{borderTop:`3px solid ${tc}`,padding:18}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                      <div style={{flex:1,marginRight:8}}>
                        <div style={{fontWeight:700,fontSize:14,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2}}>{a.name}</div>
                        <div style={{fontSize:11,color:"#9ca3af",marginTop:2}}>{a.jira} · {a.type}</div>
                      </div>
                      <SPill s={a.status}/>
                    </div>
                    <div style={{fontSize:12,color:"#6b7280",marginBottom:12,lineHeight:1.5}}>{a.desc}</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
                      {[["Est.",fmtM(a.estMins),"#374151"],["Team",fmtM(total),"#1a56db"],["Mine",fmtM(mine),tc]].map(([l,v,c])=>(
                        <div key={l} style={{textAlign:"center",background:"#f7f9fc",borderRadius:7,padding:"7px 4px"}}>
                          <div style={{fontSize:15,fontWeight:800,color:c}}>{v}</div>
                          <div style={{fontSize:9,color:"#9ca3af",marginTop:1,textTransform:"uppercase",letterSpacing:.5}}>{l}</div>
                        </div>
                      ))}
                    </div>
                    <Bar pct={pct} color={tc}/>
                    <div style={{fontSize:10,color:"#9ca3af",textAlign:"right",marginTop:3}}>{pct}% used</div>
                    <button onClick={()=>{setLForm({...bLog,actId:a.id});setModal("log");}} style={{marginTop:12,width:"100%",padding:9,borderRadius:8,border:`1.5px solid ${tc}`,background:`${tc}10`,color:tc,fontWeight:700,fontSize:13,cursor:"pointer"}}>
                      ⏱ Log My Time
                    </button>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    const dashActs  = isAdmin ? acts : teamActs;
    const dashLogs  = isAdmin ? logs : teamLogs;
    const dashCap   = isAdmin ? CAPACITY : CAPACITY.filter(c=>c.team===user.team);
    const dashLeave = isAdmin ? LEAVE : LEAVE.filter(l=>l.team===user.team);
    const members   = isAdmin ? allUsers.filter(u=>u.team) : allUsers.filter(u=>u.team===user.team);
    const totalMins = dashLogs.reduce((s,l)=>s+l.mins,0);
    const avgUtil   = Math.round(dashCap.reduce((s,c)=>{const n=c.availMins-c.vacMins;return s+(c.utilMins/n*100)},0)/Math.max(dashCap.length,1));

    // ── SVG Chart helpers ──────────────────────────────────
    const SvgBarChart = ({data,height=120,showVal=true}) => {
      const max = Math.max(...data.map(d=>d.val),1);
      const bw  = Math.floor(100/data.length);
      return (
        <svg viewBox={`0 0 100 ${height}`} style={{width:"100%",height}} preserveAspectRatio="none">
          {data.map((d,i)=>{
            const bh = Math.max(2,(d.val/max)*(height-22));
            const x  = i*bw+bw*.15, w=bw*.7, y=height-bh-18;
            return (
              <g key={d.label}>
                <rect x={x} y={y} width={w} height={bh} rx="2" fill={d.color||"#1a56db"} opacity=".85"/>
                {showVal && <text x={x+w/2} y={y-3} textAnchor="middle" fontSize="5" fill="#6b7280" fontWeight="600">{d.val}</text>}
                <text x={x+w/2} y={height-4} textAnchor="middle" fontSize="4.5" fill="#9ca3af">{d.label}</text>
              </g>
            );
          })}
        </svg>
      );
    };

    const SvgDonut = ({segments,size=110}) => {
      const total = segments.reduce((s,d)=>s+d.val,0)||1;
      let angle = -90;
      const R=38, cx=50, cy=50, stroke=14;
      const arcs = segments.map(d=>{
        const sweep = (d.val/total)*360;
        const r1 = angle*(Math.PI/180), r2=(angle+sweep)*(Math.PI/180);
        const x1=cx+R*Math.cos(r1), y1=cy+R*Math.sin(r1);
        const x2=cx+R*Math.cos(r2), y2=cy+R*Math.sin(r2);
        const largeArc = sweep>180?1:0;
        const path = sweep>=359.9
          ? `M ${cx+R} ${cy} A ${R} ${R} 0 1 1 ${cx+R-.001} ${cy}`
          : `M ${x1} ${y1} A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2}`;
        angle += sweep;
        return {...d, path};
      });
      return (
        <svg viewBox="0 0 100 100" style={{width:size,height:size,flexShrink:0}}>
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="#f1f5f9" strokeWidth={stroke}/>
          {arcs.map((a,i)=>(
            <path key={i} d={a.path} fill="none" stroke={a.color} strokeWidth={stroke} strokeLinecap="round"/>
          ))}
        </svg>
      );
    };

    const SvgSparkline = ({points,color,height=40}) => {
      if(!points||points.length<2) return null;
      const max=Math.max(...points,1), min=Math.min(...points,0);
      const range=max-min||1, w=100/(points.length-1);
      const pts = points.map((p,i)=>`${i*w},${height-(((p-min)/range)*(height-6)+3)}`).join(" ");
      const area = `0,${height} ${pts} ${(points.length-1)*w},${height}`;
      return (
        <svg viewBox={`0 0 100 ${height}`} style={{width:"100%",height}} preserveAspectRatio="none">
          <defs>
            <linearGradient id={`sg${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity=".25"/>
              <stop offset="100%" stopColor={color} stopOpacity="0"/>
            </linearGradient>
          </defs>
          <polygon points={area} fill={`url(#sg${color.replace("#","")})`}/>
          <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
        </svg>
      );
    };

    // ── Activity breakdown data ──────────────────────────────────
    const actByType  = ["Project","Change","BAU","Incident","Training","Meeting"].map(t=>({
      label:t.slice(0,4), val:dashActs.filter(a=>a.type===t).length,
      color:{Project:"#1a56db",Change:"#0891b2",BAU:"#059669",Incident:"#dc2626",Training:"#d97706",Meeting:"#7c3aed"}[t]
    })).filter(d=>d.val>0);

    const actByStat  = [{label:"Active",val:dashActs.filter(a=>a.status==="Active").length,color:"#059669"},
                        {label:"Pending",val:dashActs.filter(a=>a.status==="Pending").length,color:"#d97706"},
                        {label:"Done",   val:dashActs.filter(a=>a.status==="Done").length,   color:"#6b7280"},
                        {label:"Blocked",val:dashActs.filter(a=>a.status==="Blocked").length,color:"#dc2626"}];

    const logsByMember = members.slice(0,isAdmin?6:members.length).map(m=>({
      label:m.name.split(" ")[0].slice(0,5),
      val:Math.round(dashLogs.filter(l=>l.userId===m.id).reduce((s,l)=>s+l.mins,0)/60),
      color:tCol(m.team||user.team)
    }));

    const logsByCat = ["Infrastructure Build","Maintenance","Security & Compliance","Automation & Scripting","Monitoring & Alerting"].map(cat=>({
      label:cat.split(" ")[0].slice(0,6),
      fullLabel:cat,
      val:Math.round(dashLogs.filter(l=>l.cat===cat).reduce((s,l)=>s+l.mins,0)/60),
      color:{"Infrastructure":"#1a56db","Maintenance":"#0891b2","Security":"#dc2626","Automation":"#7c3aed","Monitoring":"#059669"}[cat.split(" ")[0]]||"#6b7280"
    })).filter(d=>d.val>0);

    const sparkPts = [0,1,2,3,4,5,6].map(d=>{
      const date = `2025-03-${String(8+d).padStart(2,"0")}`;
      return Math.round(dashLogs.filter(l=>l.date===date).reduce((s,l)=>s+l.mins,0)/60);
    });

    const teamCapChart = dashCap.map(c=>{
      const net=c.availMins-c.vacMins, pct=Math.round(c.utilMins/net*100);
      return {label:c.team.slice(0,4), val:pct, color:uCol(pct)};
    });

    return (
      <div>
        {/* Header */}
        <div style={{marginBottom:18}}>
          <div style={{fontSize:20,fontWeight:800,color:"#0f172a"}}>Welcome, {user.name.split(" ")[0]} 👋</div>
          <div style={{fontSize:12,color:"#6b7280",marginTop:3}}>{isAdmin?"ISMS Administrator — All Teams":user.team+" Team Manager"} · March 2025</div>
        </div>

        {/* KPI strip */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:11,marginBottom:18}}>
          {[
            {label:"Activities",   val:dashActs.length,  sub:`${dashActs.filter(a=>a.status==="Active").length} active`,  c:"#1a56db",bg:"#eff6ff",icon:"📋", spark:[3,5,4,8,6,10,dashActs.length],    nav:"activities"},
            {label:"Hours Logged", val:fmtM(totalMins),  sub:`${dashLogs.length} entries`,                                  c:"#7c3aed",bg:"#f5f3ff",icon:"⏱", spark:[4,6,5,9,7,11,Math.round(totalMins/60)], nav:"timelog"},
            {label:isAdmin?"Avg Util":"Team Util", val:`${avgUtil}%`, sub:isAdmin?"all teams":"your team",                  c:avgUtil>85?"#dc2626":avgUtil>70?"#d97706":"#059669",bg:avgUtil>85?"#fef2f2":avgUtil>70?"#fffbeb":"#f0fdf4",icon:"📊", spark:[65,70,68,75,72,78,avgUtil], nav:"bandwidth"},
            {label:isAdmin?"Teams":"Members",      val:isAdmin?6:members.length, sub:isAdmin?"operational":"in team",       c:"#d97706",bg:"#fffbeb",icon:"👥", spark:[6,6,6,6,6,6,isAdmin?6:members.length], nav:"members"},
            {label:"On Leave",     val:dashLeave.length, sub:"this month",                                                  c:"#dc2626",bg:"#fef2f2",icon:"🏖", spark:[1,2,1,3,2,4,dashLeave.length],     nav:"bandwidth"},
            {label:"Blocked",      val:dashActs.filter(a=>a.status==="Blocked").length, sub:"need attention",                c:"#ea580c",bg:"#fff7ed",icon:"⚠️", spark:[0,1,0,0,1,0,dashActs.filter(a=>a.status==="Blocked").length], nav:"activities", drill:()=>setDashDrill({type:"acts",label:"Blocked Activities",data:dashActs.filter(a=>a.status==="Blocked")})},
          ].map(s=>(
            <Card key={s.label} onClick={()=>s.drill?s.drill():goPage(s.nav)} className="card-hover" style={{padding:14,overflow:"hidden",cursor:"pointer"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 6px 20px rgba(15,23,42,.12)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                <div style={{width:32,height:32,borderRadius:9,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>{s.icon}</div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:9,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1,fontFamily:"'DM Mono',monospace"}}>{s.label}</div>
                  <div style={{fontSize:20,fontWeight:800,color:s.c,lineHeight:1.1,fontFamily:"'DM Sans',sans-serif",letterSpacing:-.5}}>{s.val}</div>
                </div>
              </div>
              <SvgSparkline points={s.spark} color={s.c} height={28}/>
              <div style={{fontSize:10.5,color:"#94a3b8",marginTop:4}}>{s.sub}</div>
            </Card>
          ))}
        </div>

        {/* Row 1: Utilization Bars + Donut Status + Sparkline trend */}
        <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr 1fr",gap:14,marginBottom:14}}>

          {/* Team Utilization bar chart */}
          <Card className="card-hover" style={{cursor:"pointer"}} onClick={()=>goPage("bandwidth")}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div>
                <div style={{fontWeight:700,fontSize:13,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2}}>Team Utilization <span style={{fontSize:10,color:"#9ca3af",fontWeight:400}}>↗ click for details</span></div>
                <div style={{fontSize:11,color:"#6b7280"}}>% of net capacity used</div>
              </div>
              <Btn sm v="sec" onClick={e=>{e.stopPropagation();goPage("bandwidth");}}>Details →</Btn>
            </div>
            {dashCap.map(c=>{
              const net=c.availMins-c.vacMins, pct=Math.round(c.utilMins/net*100);
              const col=tCol(c.team);
              return (
                <div key={c.team} style={{marginBottom:9}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,marginBottom:3}}>
                    <span style={{fontWeight:600,display:"flex",alignItems:"center",gap:5}}>
                      <span style={{width:8,height:8,borderRadius:"50%",background:col,display:"inline-block"}}/>
                      {c.team}
                    </span>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:10,color:"#9ca3af"}}>{fmtM(c.utilMins)} / {fmtM(net)}</span>
                      <span style={{color:uCol(pct),fontWeight:800,fontSize:13,minWidth:38,textAlign:"right"}}>{pct}%</span>
                    </div>
                  </div>
                  <div style={{height:7,background:"#eef2f7",borderRadius:4,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${Math.min(100,pct)}%`,background:`linear-gradient(90deg,${col},${col}cc)`,borderRadius:4,transition:"width .5s"}}/>
                  </div>
                </div>
              );
            })}
          </Card>

          {/* Activity Status Donut */}
          <Card>
            <div style={{fontWeight:700,fontSize:13,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2,marginBottom:4}}>Activity Status <span style={{fontSize:10,color:"#9ca3af",fontWeight:400}}>↗ click status to drill in</span></div>
            <div style={{fontSize:11,color:"#6b7280",marginBottom:12}}>Breakdown by status</div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{position:"relative",cursor:"pointer"}} onClick={()=>goPage("activities")}>
                <SvgDonut segments={actByStat.filter(s=>s.val>0)} size={100}/>
                <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center"}}>
                  <div style={{fontSize:18,fontWeight:800,color:"#0f172a"}}>{dashActs.length}</div>
                  <div style={{fontSize:8,color:"#9ca3af",lineHeight:1}}>total</div>
                </div>
              </div>
              <div style={{flex:1}}>
                {actByStat.map(s=>(
                  <div key={s.label} onClick={()=>s.val>0&&setDashDrill({type:"acts",label:`${s.label} Activities`,data:dashActs.filter(a=>a.status===s.label)})}
                    style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7,padding:"3px 6px",borderRadius:6,cursor:s.val>0?"pointer":"default",transition:"background .1s"}}
                    onMouseEnter={e=>{if(s.val>0)e.currentTarget.style.background="#f7f9fc";}}
                    onMouseLeave={e=>{e.currentTarget.style.background="";}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{width:8,height:8,borderRadius:2,background:s.color,display:"inline-block"}}/>
                      <span style={{fontSize:11,color:"#6b7280"}}>{s.label}</span>
                    </div>
                    <span style={{fontSize:13,fontWeight:700,color:s.color}}>{s.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Daily trend sparkline */}
          <Card style={{cursor:"pointer"}} onClick={()=>goPage("timelog")}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 16px rgba(15,23,42,.1)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="";}}>
            <div style={{fontWeight:700,fontSize:13,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2,marginBottom:4}}>Daily Hours Trend <span style={{fontSize:10,color:"#9ca3af",fontWeight:400}}>↗ view time log</span></div>
            <div style={{fontSize:11,color:"#6b7280",marginBottom:8}}>Mar 8–14 · logged hours/day</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:6}}>
              <div>
                <div style={{fontSize:22,fontWeight:800,color:"#1a56db"}}>{sparkPts.reduce((s,v)=>s+v,0)}h</div>
                <div style={{fontSize:10,color:"#6b7280"}}>total this week</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:13,fontWeight:700,color:"#059669"}}>↑ 12%</div>
                <div style={{fontSize:10,color:"#9ca3af"}}>vs last week</div>
              </div>
            </div>
            <SvgSparkline points={sparkPts} color="#1a56db" height={52}/>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
              {["M8","M9","M10","M11","M12","M13","M14"].map((d,i)=>(
                <div key={d} style={{fontSize:9,color:"#9ca3af",textAlign:"center",flex:1}}>
                  <div style={{fontWeight:600,color:"#374151"}}>{sparkPts[i]}h</div>
                  <div>{d}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Row 2: Hours by member bar + Activity type bar + Recent entries */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1.2fr",gap:14,marginBottom:14}}>

          {/* Hours by Member */}
          <Card style={{cursor:"pointer"}} onClick={()=>goPage("timelog")}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 16px rgba(15,23,42,.1)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="";}}>
            <div style={{fontWeight:700,fontSize:13,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2,marginBottom:2}}>Hours by {isAdmin?"Team":"Member"} <span style={{fontSize:10,color:"#9ca3af",fontWeight:400}}>↗ view log</span></div>
            <div style={{fontSize:11,color:"#6b7280",marginBottom:10}}>{isAdmin?"Logged hours per team":"Logged hours per person"}</div>
            {isAdmin ? (
              <SvgBarChart height={110} data={dashCap.map(c=>({
                label:c.team.slice(0,4),
                val:Math.round(dashLogs.filter(l=>l.team===c.team).reduce((s,l)=>s+l.mins,0)/60),
                color:tCol(c.team)
              }))}/>
            ) : (
              <SvgBarChart height={110} data={logsByMember}/>
            )}
          </Card>

          {/* Activity Type distribution bar chart */}
          <Card>
            <div style={{fontWeight:700,fontSize:13,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2,marginBottom:2}}>Activity Types <span style={{fontSize:10,color:"#9ca3af",fontWeight:400}}>↗ click type to drill in</span></div>
            <div style={{fontSize:11,color:"#6b7280",marginBottom:10}}>Count by work type</div>
            <SvgBarChart height={110} data={actByType}/>
            <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:8}}>
              {actByType.map(d=>(
                <span key={d.label} onClick={()=>{ const fullType=["Project","Change","BAU","Incident","Training","Meeting"].find(t=>t.slice(0,4)===d.label)||d.label; setDashDrill({type:"acts",label:`${fullType} Activities`,data:dashActs.filter(a=>a.type===fullType)}); }}
                  style={{fontSize:10,display:"flex",alignItems:"center",gap:3,cursor:"pointer",padding:"2px 6px",borderRadius:5,background:"#f7f9fc",border:"1px solid #e5e7eb"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="#eff6ff";e.currentTarget.style.borderColor="#bfdbfe";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="#f7f9fc";e.currentTarget.style.borderColor="#e5e7eb";}}>
                  <span style={{width:6,height:6,borderRadius:1,background:d.color,display:"inline-block"}}/>
                  <span style={{color:"#6b7280"}}>{d.label} <strong style={{color:"#374151"}}>{d.val}</strong></span>
                </span>
              ))}
            </div>
          </Card>

          {/* Recent entries table */}
          <Card>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div>
                <div style={{fontWeight:700,fontSize:13,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2}}>Recent Entries</div>
                <div style={{fontSize:11,color:"#6b7280"}}>Latest time logs</div>
              </div>
              <Btn sm v="sec" onClick={()=>goPage("timelog")}>All →</Btn>
            </div>
            {dashLogs.slice(0,6).map(l=>(
              <div key={l.id} style={{display:"flex",alignItems:"center",gap:9,padding:"6px 0",borderBottom:"1px solid #f8fafc"}}>
                <div style={{width:24,height:24,borderRadius:"50%",background:`${tCol(l.team)}20`,color:tCol(l.team),display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,flexShrink:0}}>{l.member.split(" ").map(n=>n[0]).join("")}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:11,fontWeight:600,color:"#374151",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.activity.slice(0,22)}{l.activity.length>22?"…":""}</div>
                  <div style={{fontSize:10,color:"#9ca3af"}}>{l.member.split(" ")[0]} · {l.date.slice(5)}</div>
                </div>
                <div style={{fontWeight:800,color:"#1a56db",fontSize:12,flexShrink:0}}>{fmtM(l.mins)}</div>
              </div>
            ))}
          </Card>
        </div>

        {/* Row 3: Category donut | Top Activities | Most Time-Consuming */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.4fr 1.4fr",gap:14,marginBottom:14}}>

          {/* Time by Category donut */}
          <Card>
            <div style={{fontWeight:700,fontSize:13,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2,marginBottom:4}}>Time by Category <span style={{fontSize:10,color:"#9ca3af",fontWeight:400}}>↗ click category</span></div>
            <div style={{fontSize:11,color:"#6b7280",marginBottom:12}}>Logged hours per category</div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{position:"relative",flexShrink:0}}>
                <SvgDonut segments={logsByCat.map(d=>({...d,val:d.val}))} size={88}/>
                <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center"}}>
                  <div style={{fontSize:13,fontWeight:800,color:"#0f172a"}}>{fmtM(totalMins)}</div>
                  <div style={{fontSize:7,color:"#9ca3af"}}>total</div>
                </div>
              </div>
              <div style={{flex:1}}>
                {logsByCat.map(d=>{
                  return (
                  <div key={d.label} onClick={()=>setDashDrill({type:"logs",label:`${d.fullLabel} — Time Entries`,data:dashLogs.filter(l=>l.cat===d.fullLabel)})}
                    style={{marginBottom:6,cursor:"pointer",padding:"2px 4px",borderRadius:4,transition:"background .1s"}}
                    onMouseEnter={e=>{e.currentTarget.style.background="#f7f9fc";}}
                    onMouseLeave={e=>{e.currentTarget.style.background="";}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:2}}>
                      <span style={{color:"#374151",fontWeight:600}}>{d.label}</span>
                      <span style={{color:d.color,fontWeight:700}}>{d.val}h</span>
                    </div>
                    <div style={{height:3,background:"#f1f5f9",borderRadius:2,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${Math.round(d.val/Math.max(...logsByCat.map(x=>x.val),1)*100)}%`,background:d.color,borderRadius:2}}/>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Top Activities by number of log entries */}
          {(()=>{
            const topActs = [...dashActs]
              .map(a=>({ ...a, entries: dashLogs.filter(l=>l.actId===a.id).length, logged: dashLogs.filter(l=>l.actId===a.id).reduce((s,l)=>s+l.mins,0) }))
              .filter(a=>a.entries>0)
              .sort((a,b)=>b.entries-a.entries)
              .slice(0,6);
            const maxE = Math.max(...topActs.map(a=>a.entries),1);
            return (
              <Card>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2}}>🏆 Top Activities</div>
                    <div style={{fontSize:11,color:"#6b7280"}}>Most log entries this month</div>
                  </div>
                  <Btn sm v="sec" onClick={()=>goPage("activities")}>View All →</Btn>
                </div>
                {topActs.length===0
                  ? <div style={{textAlign:"center",padding:30,color:"#9ca3af",fontSize:12}}>No entries yet</div>
                  : topActs.map((a,i)=>{
                    const col = tCol(a.team);
                    return (
                      <div key={a.id} style={{display:"flex",alignItems:"center",gap:9,marginBottom:9,padding:"7px 9px",borderRadius:8,background:i===0?"#fffbeb":i===1?"#f7f9fc":i===2?"#f7f9fc":"transparent",border:i<3?"1px solid #f3f4f6":"none"}}>
                        <div style={{width:20,height:20,borderRadius:"50%",background:i===0?"#f59e0b":i===1?"#9ca3af":i===2?"#cd7f32":"#e5e7eb",color:i<3?"#fff":"#9ca3af",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,flexShrink:0}}>{i+1}</div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:12,fontWeight:700,color:"#1e293b",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontFamily:"'DM Sans',sans-serif"}}>{a.name}</div>
                          <div style={{display:"flex",alignItems:"center",gap:6,marginTop:3}}>
                            <div style={{flex:1,height:4,background:"#f1f5f9",borderRadius:2,overflow:"hidden"}}>
                              <div style={{height:"100%",width:`${Math.round(a.entries/maxE*100)}%`,background:col,borderRadius:2}}/>
                            </div>
                          </div>
                        </div>
                        <div style={{textAlign:"right",flexShrink:0}}>
                          <div style={{fontSize:14,fontWeight:800,color:col}}>{a.entries}</div>
                          <div style={{fontSize:9,color:"#9ca3af"}}>entries</div>
                        </div>
                        {isAdmin && <TPill t={a.team}/>}
                      </div>
                    );
                  })
                }
              </Card>
            );
          })()}

          {/* Most Time-Consuming Activities by logged hours */}
          {(()=>{
            const heavy = [...dashActs]
              .map(a=>({ ...a, logged: dashLogs.filter(l=>l.actId===a.id).reduce((s,l)=>s+l.mins,0) }))
              .filter(a=>a.logged>0)
              .sort((a,b)=>b.logged-a.logged)
              .slice(0,6);
            const maxH = Math.max(...heavy.map(a=>a.logged),1);
            return (
              <Card>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2}}>⏰ Most Time-Consuming</div>
                    <div style={{fontSize:11,color:"#6b7280"}}>Highest hours logged</div>
                  </div>
                  <Btn sm v="sec" onClick={()=>goPage("bandwidth")}>Details →</Btn>
                </div>
                {heavy.length===0
                  ? <div style={{textAlign:"center",padding:30,color:"#9ca3af",fontSize:12}}>No time logged yet</div>
                  : heavy.map((a,i)=>{
                    const col = tCol(a.team);
                    const overEst = a.logged > a.estMins;
                    return (
                      <div key={a.id} style={{marginBottom:9}}>
                        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{display:"flex",alignItems:"center",gap:5}}>
                              <span style={{fontSize:11,fontWeight:700,color:"#0f172a",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.name}</span>
                              {overEst && <span style={{fontSize:9,background:"#fee2e2",color:"#b91c1c",padding:"1px 5px",borderRadius:3,fontWeight:700,flexShrink:0}}>OVER</span>}
                            </div>
                            <div style={{fontSize:10,color:"#9ca3af",marginTop:1}}>
                              {a.workNature||a.type} · {a.ticketNo||a.jira||"—"}
                              {isAdmin && <span style={{marginLeft:5}}><TPill t={a.team}/></span>}
                            </div>
                          </div>
                          <div style={{textAlign:"right",flexShrink:0}}>
                            <div style={{fontSize:14,fontWeight:800,color:overEst?"#dc2626":"#1a56db"}}>{fmtM(a.logged)}</div>
                            <div style={{fontSize:9,color:"#9ca3af"}}>of {fmtM(a.estMins)}</div>
                          </div>
                        </div>
                        <div style={{height:6,background:"#f1f5f9",borderRadius:3,overflow:"hidden",position:"relative"}}>
                          <div style={{height:"100%",width:`${Math.round(a.logged/maxH*100)}%`,background:`linear-gradient(90deg,${col},${col}bb)`,borderRadius:3}}/>
                          {a.estMins<=maxH && (
                            <div style={{position:"absolute",top:0,bottom:0,left:`${Math.min(99,Math.round(a.estMins/maxH*100))}%`,width:2,background:"#374151",opacity:.4}}/>
                          )}
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:9,marginTop:2,color:"#9ca3af"}}>
                          <span>Est: {fmtM(a.estMins)}</span>
                          <span style={{color:overEst?"#dc2626":"#059669"}}>{Math.round(a.logged/Math.max(a.estMins,1)*100)}% of estimate</span>
                        </div>
                      </div>
                    );
                  })
                }
              </Card>
            );
          })()}
        </div>

        {/* Row 4: Capacity summary table */}
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div>
              <div style={{fontWeight:700,fontSize:13,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2}}>{isAdmin?"All Teams":"My Team"} Capacity</div>
              <div style={{fontSize:11,color:"#6b7280"}}>Available vs utilized · March 2025</div>
            </div>
            <Btn sm v="sec" onClick={()=>goPage("reports")}>Reports →</Btn>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr><TH c="Team"/><TH c="Lead"/><TH c="HC"/><TH c="Net Cap"/><TH c="Utilized"/><TH c="Util %"/><TH c="Leave"/></tr></thead>
              <tbody>
                {dashCap.map(c=>{
                  const net=c.availMins-c.vacMins, pct=Math.round(c.utilMins/net*100), tm=teams.find(t=>t.name===c.team);
                  return (
                    <tr key={c.team}>
                      <TD><div style={{display:"flex",alignItems:"center",gap:5}}><span style={{width:8,height:8,borderRadius:"50%",background:tCol(c.team),display:"inline-block",flexShrink:0}}/><strong style={{fontSize:12}}>{tm?.emoji} {c.team}</strong></div></TD>
                      <TD s={{fontSize:11,color:"#6b7280"}}>{tm?.lead}</TD>
                      <TD s={{textAlign:"center"}}>{c.hc}</TD>
                      <TD s={{fontWeight:600}}>{fmtM(net)}</TD>
                      <TD s={{color:"#1a56db",fontWeight:700}}>{fmtM(c.utilMins)}</TD>
                      <TD>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <div style={{width:50,height:5,background:"#f1f5f9",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.min(100,pct)}%`,background:uCol(pct),borderRadius:3}}/></div>
                          <strong style={{color:uCol(pct),fontSize:12}}>{pct}%</strong>
                        </div>
                      </TD>
                      <TD s={{color:"#dc2626",fontSize:12}}>{c.vacMins?fmtM(c.vacMins):"—"}</TD>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  };

  // ── ACTIVITIES ────────────────────────────
  const PageActivities = () => (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
        <div>
          <div style={{fontSize:20,fontWeight:800,color:"#0f172a"}}>Activities</div>
          <div style={{fontSize:12.5,color:"#64748b",marginTop:4,lineHeight:1.5}}>
            {isAdmin?"Manage all team activities across the organisation.":isMgr?"Manage activities your team logs time against — members only see their team's active activities.":"Your team's activities."}
          </div>
        </div>
        {isMgr && <Btn onClick={()=>{setAForm({...bAct,team:user.team});setTarget(null);setModal("act");}}>+ New Activity</Btn>}
      </div>
      {isAdmin && <InfoBanner color="#1e40af" bg="#eff6ff" border="#bfdbfe" icon="📋">Admin view — read-only. Activities are created and managed by team managers.</InfoBanner>}{isMgr && <InfoBanner color="#1e40af" bg="#eff6ff" border="#bfdbfe" icon="📋">You own the activity list for <strong>{user.team}</strong>. Members only see active activities from their own team.</InfoBanner>}
      <div style={{display:"flex",gap:9,flexWrap:"wrap",background:"#fff",border:"1px solid #dde3ed",borderRadius:10,padding:"11px 14px",marginBottom:14}}>
        {isAdmin && (
          <select value={actF.team} onChange={e=>setActF(f=>({...f,team:e.target.value}))} style={{padding:"6px 10px",borderRadius:7,border:"1px solid #c8d2e0",fontSize:12,background:"#f7f9fc"}}>
            <option value="">All Teams</option>
            {teams.map(t=><option key={t.name}>{t.name}</option>)}
          </select>
        )}
        {[["type",["","Project","Incident","Change","BAU","Training","Meeting"],"All Types"],
          ["status",["","Active","Pending","Done","Blocked"],"All Status"]
        ].map(([k,opts,ph])=>(
          <select key={k} value={actF[k]} onChange={e=>setActF(f=>({...f,[k]:e.target.value}))} style={{padding:"6px 10px",borderRadius:7,border:"1px solid #c8d2e0",fontSize:12,background:"#f7f9fc"}}>
            {opts.map(o=><option key={o} value={o}>{o||ph}</option>)}
          </select>
        ))}
        <input placeholder="🔍 Search…" value={actF.search} onChange={e=>setActF(f=>({...f,search:e.target.value}))} style={{flex:1,minWidth:150,padding:"6px 10px",borderRadius:7,border:"1px solid #c8d2e0",fontSize:12}}/>
      </div>
      <Card style={{padding:0,overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"'DM Sans',sans-serif"}}>
            <thead><tr><TH c="ID"/><TH c="Activity"/><TH c="Team"/><TH c="Nature"/><TH c="Work Type"/><TH c="Ticket"/><TH c="Type"/><TH c="Est. Time"/><TH c="Logged"/><TH c="Progress"/><TH c="Priority"/><TH c="Status"/>{isMgr&&<TH c="Actions"/>}</tr></thead>
            <tbody>
              {filtActs.map(a=>{
                const logged=minsForAct(a.id), pct=Math.min(100,Math.round(logged/Math.max(a.estMins,1)*100));
                return (
                  <tr key={a.id}>
                    <TD><code style={{background:"#f1f5f9",padding:"2px 6px",borderRadius:4,color:"#6b7280",fontSize:11}}>{a.id}</code></TD>
                    <TD><div style={{fontWeight:600}}>{a.name}</div><div style={{fontSize:10,color:"#9ca3af",marginTop:1}}>{a.jira}</div></TD>
                    <TD><TPill t={a.team}/></TD>
                    <TD><NaturePill n={a.nature||"Proactive"}/></TD>
                    <TD><WNPill w={a.workNature||"Request"}/></TD>
                    <TD><code style={{background:"#f1f5f9",padding:"2px 6px",borderRadius:4,color:"#374151",fontSize:11,fontWeight:600}}>{a.ticketNo||a.jira||"—"}</code></TD>
                    <TD s={{fontSize:12}}>{a.type}</TD>
                    <TD s={{fontSize:11,color:"#6b7280"}}>{a.cat}</TD>
                    <TD s={{fontWeight:600}}>{fmtM(a.estMins)}</TD>
                    <TD s={{color:"#1a56db",fontWeight:700}}>{fmtM(logged)}</TD>
                    <TD>
                      <div style={{display:"flex",alignItems:"center",gap:7}}>
                        <div style={{width:65,height:5,background:"#e5e7eb",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:pct>90?"#dc2626":pct>60?"#059669":"#1a56db",borderRadius:3}}/></div>
                        <span style={{fontSize:11,color:"#6b7280",fontWeight:600}}>{pct}%</span>
                      </div>
                    </TD>
                    <TD><PDot p={a.priority}/></TD>
                    <TD><SPill s={a.status}/></TD>
                    {isMgr && <TD><div style={{display:"flex",gap:5}}><Btn sm v="sec" onClick={()=>openEditA(a)}>✏️ Edit</Btn><Btn sm v="dan" onClick={()=>delAct(a.id)}>🗑</Btn></div></TD>}
                  </tr>
                );
              })}
              {filtActs.length===0&&<tr><td colSpan={isMgr?14:13} style={{textAlign:"center",padding:50,color:"#9ca3af",fontSize:13}}>{isMgr?"No activities yet. Click + New Activity.":"No activities found."}</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  // ── TIME LOG ─────────────────────────────
  const PageTimelog = () => {
    const [memberFilter, setMemberFilter] = React.useState(null); // userId or null = all
    const memberList = isAdmin ? allUsers.filter(u=>u.team) : allUsers.filter(u=>u.team===user.team);
    const viewLogs = memberFilter ? filtLogs.filter(l=>l.userId===memberFilter) : filtLogs;
    const total = viewLogs.reduce((s,l)=>s+l.mins,0);
    const selectedMember = memberFilter ? memberList.find(m=>m.id===memberFilter) : null;
    return (
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <div>
            <div style={{fontSize:20,fontWeight:800,color:"#0f172a"}}>{isAdmin?"All Teams Time Log":isMgr?"Team Time Log":"My Time Log"}</div>
            <div style={{fontSize:12,color:"#6b7280",marginTop:2}}>{isAdmin?"All teams · all entries":isMgr?"Your team entries":"Your personal entries"} · March 2025</div>
          </div>
          <div style={{display:"flex",gap:9,alignItems:"center"}}>
            {selectedMember && (
              <div style={{display:"flex",alignItems:"center",gap:7,background:`${tCol(selectedMember.team)}15`,border:`1px solid ${tCol(selectedMember.team)}40`,borderRadius:9,padding:"7px 12px"}}>
                <span style={{fontSize:12,fontWeight:700,color:tCol(selectedMember.team)}}>👤 {selectedMember.name}</span>
                <button onClick={()=>setMemberFilter(null)} style={{background:"none",border:"none",cursor:"pointer",fontSize:14,color:"#9ca3af",lineHeight:1,padding:0}}>✕</button>
              </div>
            )}
            <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:9,padding:"8px 14px",fontSize:13,fontWeight:700,color:"#1a56db"}}>{fmtM(total)} total · {viewLogs.length} entries</div>
            {isMgr && <Btn onClick={()=>{setLForm(bLog);setModal("log");}}>⏱ Log Time</Btn>}
          </div>
        </div>

        {/* Per-member summary cards — clickable to filter */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:11,marginBottom:18}}>
          {memberList.map(m=>{
            const mM = filtLogs.filter(l=>l.userId===m.id).reduce((s,l)=>s+l.mins,0);
            const cnt = filtLogs.filter(l=>l.userId===m.id).length;
            const isActive = memberFilter===m.id;
            const col = tCol(m.team);
            return (
              <Card key={m.id}
                onClick={()=>setMemberFilter(isActive ? null : m.id)}
                style={{padding:14, cursor:"pointer", transition:"all .15s",
                  border: isActive ? `2px solid ${col}` : "1px solid #dde3ed",
                  background: isActive ? `${col}08` : "#fff",
                  transform: isActive ? "translateY(-2px)" : "",
                  boxShadow: isActive ? `0 4px 16px ${col}30` : "0 1px 4px rgba(15,23,42,.07)"
                }}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                  <div style={{width:30,height:30,borderRadius:"50%",background:isActive?col:`${col}22`,color:isActive?"#fff":col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,flexShrink:0}}>
                    {m.name.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div>
                    <div style={{fontSize:12,fontWeight:700,color:isActive?col:"#0f172a",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:90}}>{m.name.split(" ")[0]}</div>
                    <div style={{fontSize:9,color:"#9ca3af"}}>{m.team}</div>
                  </div>
                </div>
                <div style={{fontSize:20,fontWeight:800,color:isActive?col:"#1a56db"}}>{fmtM(mM)}</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
                  <div style={{fontSize:10,color:"#9ca3af"}}>{cnt} {cnt===1?"entry":"entries"}</div>
                  {isActive && <span style={{fontSize:9,background:col,color:"#fff",padding:"1px 6px",borderRadius:10,fontWeight:700}}>Filtered</span>}
                </div>
                {mM>0 && (
                  <div style={{marginTop:6,height:3,background:"#f1f5f9",borderRadius:2,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${Math.min(100,Math.round(mM/Math.max(...memberList.map(x=>filtLogs.filter(l=>l.userId===x.id).reduce((s,l)=>s+l.mins,0)),1)*100))}%`,background:col,borderRadius:2}}/>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Search + filters bar */}
        <div style={{background:"#fff",border:"1px solid #dde3ed",borderRadius:10,padding:"10px 14px",marginBottom:14,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
          <input placeholder="🔍 Search by member or activity…" value={logQ} onChange={e=>setLogQ(e.target.value)}
            style={{flex:1,minWidth:180,padding:"6px 10px",borderRadius:7,border:"1px solid #c8d2e0",fontSize:12}}/>
          {memberFilter && (
            <button onClick={()=>setMemberFilter(null)}
              style={{padding:"6px 12px",borderRadius:7,background:"#fee2e2",border:"1px solid #fca5a5",color:"#b91c1c",fontSize:12,fontWeight:600,cursor:"pointer"}}>
              ✕ Clear member filter
            </button>
          )}
          <span style={{fontSize:12,color:"#9ca3af"}}>{viewLogs.length} row{viewLogs.length!==1?"s":""}</span>
        </div>

        <Card style={{padding:0,overflow:"hidden"}}>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"'DM Sans',sans-serif"}}>
              <thead>
                <tr>
                  <TH c="Date"/><TH c="Member"/><TH c="Activity"/><TH c="Team"/>
                  <TH c="Type"/><TH c="Category"/><TH c="Time Spent"/><TH c="Notes"/>
                  {!isMgrOrAdmin&&<TH c="Actions"/>}
                </tr>
              </thead>
              <tbody>
                {viewLogs.map(l=>{
                  const isHighlighted = memberFilter && l.userId===memberFilter;
                  return (
                    <tr key={l.id} style={{background:isHighlighted?`${tCol(l.team)}06`:""}}>
                      <TD s={{fontSize:12}}>{l.date}</TD>
                      <TD>
                        <div style={{display:"flex",alignItems:"center",gap:7}}>
                          <div style={{width:24,height:24,borderRadius:"50%",background:`${tCol(l.team)}22`,color:tCol(l.team),display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,flexShrink:0,cursor:"pointer"}}
                            onClick={()=>setMemberFilter(memberFilter===l.userId?null:l.userId)}>
                            {l.member.split(" ").map(n=>n[0]).join("")}
                          </div>
                          <strong style={{fontSize:12}}>{l.member}</strong>
                        </div>
                      </TD>
                      <TD s={{fontSize:12,fontWeight:600}}>{l.activity}</TD>
                      <TD><TPill t={l.team}/></TD>
                      <TD s={{fontSize:11}}>{l.type}</TD>
                      <TD s={{fontSize:11,color:"#6b7280"}}>{l.cat}</TD>
                      <TD><div style={{fontWeight:700,color:"#1a56db",fontSize:14}}>{fmtM(l.mins)}</div><div style={{fontSize:10,color:"#9ca3af"}}>{l.mins} min</div></TD>
                      <TD s={{fontSize:11,color:"#6b7280",maxWidth:200}}>{l.notes||"—"}</TD>
                      {!isMgrOrAdmin && <TD><div style={{display:"flex",gap:5}}><Btn sm v="sec" onClick={()=>openEditL(l)}>✏️</Btn><Btn sm v="dan" onClick={()=>delLog(l.id)}>🗑</Btn></div></TD>}
                    </tr>
                  );
                })}
                {viewLogs.length===0&&<tr><td colSpan={isAdmin?8:isMgr?8:9} style={{textAlign:"center",padding:40,color:"#9ca3af",fontSize:13}}>
                  {memberFilter?"No entries for this member.":"No entries yet."}
                </td></tr>}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  };

  // ── TEAMS ────────────────────────────────
  const PageTeams = () => {
    const [tModal,   setTModal]   = React.useState(null);
    const [tTarget,  setTTarget]  = React.useState(null);
    const [tForm,    setTForm]    = React.useState({name:"",emoji:"🏗",color:"#0891b2",lead:""});
    const [tConfirm, setTConfirm] = React.useState(null);
    const EMOJIS = ["🌐","🔒","⚙️","☁️","💾","🗄️","🏗","🚀","🔧","📡","🖥","🔐","📊","💿","🌩","🛡"];
    const COLORS = ["#0891b2","#dc2626","#d97706","#7c3aed","#059669","#ea580c","#1a56db","#db2777","#16a34a","#9333ea","#0f172a","#64748b"];
    const iS2 = {width:"100%",padding:"8px 10px",borderRadius:8,border:"1px solid #c8d2e0",fontSize:13,boxSizing:"border-box"};
    const openAdd  = () => { setTForm({name:"",emoji:"🏗",color:"#0891b2",lead:""}); setTTarget(null); setTModal("edit"); };
    const openEdit = (t) => { setTForm({name:t.name,emoji:t.emoji,color:t.color,lead:t.lead||""}); setTTarget(t); setTModal("edit"); };
    const saveTeam = () => {
      if(!tForm.name.trim()){ showToast("Team name is required","err"); return; }
      if(tTarget){
        const oldName=tTarget.name, newName=tForm.name.trim();
        setTeams(p=>p.map(t=>t.name===oldName?{...t,...tForm,name:newName}:t));
        if(oldName!==newName){
          setActs(p=>p.map(a=>a.team===oldName?{...a,team:newName}:a));
          setLogs(p=>p.map(l=>l.team===oldName?{...l,team:newName}:l));
          setAllUsers(p=>p.map(u=>u.team===oldName?{...u,team:newName}:u));
        }
        showToast(`${newName} updated`);
      } else {
        setTeams(p=>[...p,{name:tForm.name.trim(),emoji:tForm.emoji,color:tForm.color,lead:tForm.lead}]);
        showToast(`${tForm.name} team added`);
      }
      setTModal(null);
    };
    const deleteTeam = (name) => { setTeams(p=>p.filter(t=>t.name!==name)); setTConfirm(null); showToast(`${name} removed`); };
    const viewTeams = isAdmin ? teams : teams.filter(t=>t.name===user.team);
    return (
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
          <div>
            <div style={{fontSize:20,fontWeight:800,color:"#0f172a"}}>{isAdmin?"All Teams":isMgr?"Team Management":"Team View"}</div>
            <div style={{fontSize:12,color:"#6b7280",marginTop:3}}>{isAdmin?`${teams.length} infrastructure teams — click ✏️ to edit`:"Your team"}</div>
          </div>
          {isAdmin && <Btn onClick={openAdd}>+ New Team</Btn>}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:14}}>
          {viewTeams.map(t=>{
            const cap=CAPACITY.find(c=>c.team===t.name)||{};
            const net=(cap.availMins||0)-(cap.vacMins||0), pct=net?Math.round((cap.utilMins||0)/net*100):0;
            const tacts=acts.filter(a=>a.team===t.name);
            const tmems=allUsers.filter(u=>u.team===t.name);
            return (
              <Card key={t.name} style={{borderTop:`3px solid ${t.color}`,padding:18,position:"relative"}}>
                {isAdmin && (
                  <div style={{position:"absolute",top:10,right:10,display:"flex",gap:5}}>
                    <button onClick={()=>openEdit(t)} style={{width:27,height:27,borderRadius:7,background:"#f1f5f9",border:"1px solid #dde3ed",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}} title="Edit team">✏️</button>
                    <button onClick={()=>setTConfirm(t.name)} style={{width:27,height:27,borderRadius:7,background:"#fef2f2",border:"1px solid #fca5a5",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}} title="Delete team">🗑</button>
                  </div>
                )}
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,marginTop:isAdmin?6:0,cursor:"pointer"}} onClick={()=>goPage("bandwidth")}>
                  <span style={{fontSize:26}}>{t.emoji}</span>
                  <div>
                    <div style={{fontSize:15,fontWeight:800}}>{t.name}</div>
                    <div style={{fontSize:11,color:"#6b7280"}}>Lead: {t.lead||"—"}</div>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
                  {[["Members",tmems.length],["Activities",tacts.length],["Util",`${pct}%`]].map(([l,v])=>(
                    <div key={l} onClick={()=>goPage(l==="Members"?"members":l==="Activities"?"activities":"bandwidth")}
                      style={{textAlign:"center",background:"#f7f9fc",borderRadius:7,padding:"7px 4px",cursor:"pointer",transition:"background .1s"}}
                      onMouseEnter={e=>e.currentTarget.style.background="#e8f0fe"}
                      onMouseLeave={e=>e.currentTarget.style.background="#f7f9fc"}>
                      <div style={{fontSize:17,fontWeight:800,color:l==="Util"?uCol(pct):"#0f172a"}}>{v}</div>
                      <div style={{fontSize:9,color:"#9ca3af",marginTop:1}}>{l}</div>
                    </div>
                  ))}
                </div>
                <Bar pct={pct} color={t.color}/>
                <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
                  {tmems.slice(0,6).map(m=>(
                    <div key={m.id} style={{width:24,height:24,borderRadius:"50%",background:`${t.color}22`,color:t.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800}} title={m.name}>
                      {m.name.split(" ").map(n=>n[0]).join("")}
                    </div>
                  ))}
                  {tmems.length>6 && <div style={{width:24,height:24,borderRadius:"50%",background:"#f1f5f9",color:"#9ca3af",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700}}>+{tmems.length-6}</div>}
                </div>
              </Card>
            );
          })}
        </div>
        {/* Edit/Add modal */}
        {tModal==="edit" && (
          <ModalWrap title={tTarget?"✏️ Edit Team":"🏗 New Team"} onClose={()=>setTModal(null)}>
            <div style={{display:"grid",gap:13}}>
              <Lbl t="Team Name *"><input style={iS2} value={tForm.name} onChange={e=>setTForm(p=>({...p,name:e.target.value}))} placeholder="e.g. DevOps"/></Lbl>
              <Lbl t="Team Lead">
                <select style={iS2} value={tForm.lead} onChange={e=>setTForm(p=>({...p,lead:e.target.value}))}>
                  <option value="">— Select lead —</option>
                  {allUsers.filter(u=>u.role==="manager"||u.role==="admin").map(u=><option key={u.id} value={u.name}>{u.name}</option>)}
                </select>
              </Lbl>
              <Lbl t="Emoji Icon">
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:4}}>
                  {EMOJIS.map(e=>(
                    <button key={e} onClick={()=>setTForm(p=>({...p,emoji:e}))} style={{width:34,height:34,borderRadius:7,border:`2px solid ${tForm.emoji===e?"#1a56db":"#e5e7eb"}`,background:tForm.emoji===e?"#eff6ff":"#fff",fontSize:16,cursor:"pointer"}}>{e}</button>
                  ))}
                </div>
              </Lbl>
              <Lbl t="Team Colour">
                <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center",marginTop:4}}>
                  {COLORS.map(c=>(
                    <button key={c} onClick={()=>setTForm(p=>({...p,color:c}))} style={{width:30,height:30,borderRadius:"50%",background:c,border:`3px solid ${tForm.color===c?"#0f172a":"transparent"}`,cursor:"pointer"}}/>
                  ))}
                  <input type="color" value={tForm.color} onChange={e=>setTForm(p=>({...p,color:e.target.value}))} style={{width:30,height:30,borderRadius:"50%",border:"1px solid #c8d2e0",cursor:"pointer",padding:1}}/>
                </div>
              </Lbl>
              <div style={{padding:"10px 14px",borderRadius:9,background:"#f7f9fc",border:"1px solid #e5e7eb",display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:22}}>{tForm.emoji}</span>
                <div style={{flex:1}}><div style={{fontWeight:700,fontSize:14}}>{tForm.name||"Team Name"}</div><div style={{fontSize:11,color:"#6b7280"}}>Lead: {tForm.lead||"—"}</div></div>
                <div style={{width:38,height:8,borderRadius:4,background:tForm.color}}/>
              </div>
            </div>
            <MFoot onClose={()=>setTModal(null)} onSave={saveTeam} label={tTarget?"Save Changes":"Create Team"}/>
          </ModalWrap>
        )}
        {/* Delete confirm */}
        {tConfirm && (()=>{
          const hm=allUsers.filter(u=>u.team===tConfirm).length, ha=acts.filter(a=>a.team===tConfirm).length;
          return (
            <ModalWrap title="🗑 Delete Team" onClose={()=>setTConfirm(null)}>
              <div style={{textAlign:"center",padding:"8px 0 16px"}}>
                <div style={{fontSize:40,marginBottom:12}}>⚠️</div>
                <div style={{fontSize:14,fontWeight:700,color:"#0f172a",marginBottom:8}}>Delete "{tConfirm}" team?</div>
                {(hm>0||ha>0) && <div style={{background:"#fff7ed",border:"1px solid #fde68a",borderRadius:8,padding:"10px 14px",marginBottom:10,fontSize:12,color:"#92400e",textAlign:"left"}}>⚠️ This team has <strong>{hm} member{hm!==1?"s":""}</strong> and <strong>{ha} activit{ha!==1?"ies":"y"}</strong> — those records will be unlinked.</div>}
                <div style={{fontSize:12,color:"#6b7280"}}>This cannot be undone.</div>
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
                <button onClick={()=>setTConfirm(null)} style={{padding:"8px 20px",borderRadius:8,background:"#fff",border:"1px solid #c8d2e0",fontWeight:600,fontSize:13,cursor:"pointer"}}>Cancel</button>
                <button onClick={()=>deleteTeam(tConfirm)} style={{padding:"8px 20px",borderRadius:8,background:"#dc2626",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>Delete Team</button>
              </div>
            </ModalWrap>
          );
        })()}
      </div>
    );
  };

  // ── MEMBERS ──────────────────────────────
  const PageMembers = () => {
    const [mModal,   setMModal]   = React.useState(null); // null | "edit" | "add"
    const [mTarget,  setMTarget]  = React.useState(null);
    const [mForm,    setMForm]    = React.useState({name:"",title:"",team:"",role:"member"});
    const [mConfirm, setMConfirm] = React.useState(null); // userId to delete
    const [mSearch,  setMSearch]  = React.useState("");

    const canEdit = isAdmin; // only admin can add/edit/delete any member
    const list = isAdmin
      ? allUsers.filter(u => !mSearch || u.name.toLowerCase().includes(mSearch.toLowerCase()) || (u.team||"").toLowerCase().includes(mSearch.toLowerCase()))
      : allUsers.filter(u => u.team === user.team);

    const openAdd = () => {
      setMForm({name:"",title:"",team:isAdmin?"":user.team,role:"member"});
      setMTarget(null); setMModal("edit");
    };
    const openEdit = (m) => {
      setMForm({name:m.name,title:m.title||"",team:m.team||"",role:m.role||"member"});
      setMTarget(m); setMModal("edit");
    };
    const saveMember = () => {
      if(!mForm.name.trim()){ showToast("Name is required","err"); return; }
      if(mTarget){
        setAllUsers(p=>p.map(u=>u.id===mTarget.id?{...u,...mForm,name:mForm.name.trim()}:u));
        // if editing the currently logged-in user, update user state too
        if(user.id===mTarget.id) setUser(p=>({...p,...mForm,name:mForm.name.trim()}));
        showToast(`${mForm.name} updated`);
      } else {
        const nu={id:uid("USR"),name:mForm.name.trim(),title:mForm.title,team:mForm.team||null,role:mForm.role};
        setAllUsers(p=>[...p,nu]);
        showToast(`${nu.name} added`);
      }
      setMModal(null);
    };
    const deleteMember = (id) => {
      setAllUsers(p=>p.filter(u=>u.id!==id));
      setMConfirm(null);
      showToast("Member removed");
    };

    const roleGroups = [
      {label:"Administrator",   color:"#6366f1", bg:"#f5f3ff", members:list.filter(u=>u.role==="admin")},
      {label:"Team Managers",   color:"#1a56db", bg:"#eff6ff", members:list.filter(u=>u.role==="manager")},
      {label:"Team Members",    color:"#059669", bg:"#f0fdf4", members:list.filter(u=>u.role==="member")},
    ];

    const iS2 = {width:"100%",padding:"8px 10px",borderRadius:8,border:"1px solid #c8d2e0",fontSize:13,boxSizing:"border-box"};

    return (
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
          <div>
            <div style={{fontSize:20,fontWeight:800,color:"#0f172a"}}>Members</div>
            <div style={{fontSize:12,color:"#6b7280",marginTop:3}}>{isAdmin?"All users across all teams — click ✏️ to edit any member":"Your team members"}</div>
          </div>
          <div style={{display:"flex",gap:9,alignItems:"center"}}>
            {isAdmin && <input placeholder="🔍 Search members…" value={mSearch} onChange={e=>setMSearch(e.target.value)} style={{padding:"7px 11px",borderRadius:8,border:"1px solid #c8d2e0",fontSize:12,width:200}}/>}
            {isAdmin && <Btn onClick={openAdd}>+ Add Member</Btn>}
          </div>
        </div>

        {roleGroups.filter(g=>g.members.length>0).map(g=>(
          <div key={g.label} style={{marginBottom:22}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <div style={{height:1,flex:1,background:"#e5e7eb"}}/>
              <span style={{fontSize:11,fontWeight:700,color:g.color,background:g.bg,padding:"3px 12px",borderRadius:20,letterSpacing:.6,textTransform:"uppercase",whiteSpace:"nowrap"}}>{g.label} ({g.members.length})</span>
              <div style={{height:1,flex:1,background:"#e5e7eb"}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:13}}>
              {g.members.map(m=>{
                const mM  = logs.filter(l=>l.userId===m.id).reduce((s,l)=>s+l.mins,0);
                const cap = 160*60, pct = Math.round(mM/cap*100);
                const c   = m.team ? tCol(m.team) : g.color;
                return (
                  <Card key={m.id} style={{padding:16,position:"relative"}}>
                    {canEdit && (
                      <div style={{position:"absolute",top:10,right:10,display:"flex",gap:5}}>
                        <button onClick={()=>openEdit(m)} style={{width:26,height:26,borderRadius:6,background:"#f1f5f9",border:"1px solid #dde3ed",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}} title="Edit">✏️</button>
                        {m.id!==user.id && <button onClick={()=>setMConfirm(m.id)} style={{width:26,height:26,borderRadius:6,background:"#fef2f2",border:"1px solid #fca5a5",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}} title="Remove">🗑</button>}
                      </div>
                    )}
                    <div style={{width:44,height:44,borderRadius:"50%",background:`${c}22`,color:c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,marginBottom:9,marginTop:canEdit?8:0}}>
                      {m.name.split(" ").map(n=>n[0]).join("")}
                    </div>
                    <div style={{fontWeight:700,fontSize:13,color:"#0f172a"}}>{m.name}</div>
                    <div style={{fontSize:11,color:"#6b7280",marginBottom:8}}>{m.title||m.role}</div>
                    {m.team && <TPill t={m.team}/>}
                    {m.role!=="admin" && (
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:10}}>
                        {[["Logged",fmtM(mM)],["Util",`${pct}%`]].map(([l,v])=>(
                          <div key={l} style={{textAlign:"center",background:"#f7f9fc",borderRadius:7,padding:"7px 4px"}}>
                            <div style={{fontSize:15,fontWeight:800,color:l==="Util"?uCol(pct):"#0f172a"}}>{v}</div>
                            <div style={{fontSize:9,color:"#9ca3af",marginTop:1}}>{l}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {m.role!=="admin" && <Bar pct={pct} color={c}/>}
                  </Card>
                );
              })}
            </div>
          </div>
        ))}

        {/* Edit / Add modal */}
        {mModal==="edit" && (
          <ModalWrap title={mTarget?"✏️ Edit Member":"👤 Add Member"} onClose={()=>setMModal(null)}>
            <div style={{display:"grid",gap:13}}>
              <Lbl t="Full Name *">
                <input style={iS2} value={mForm.name} onChange={e=>setMForm(p=>({...p,name:e.target.value}))} placeholder="e.g. John Smith"/>
              </Lbl>
              <Lbl t="Job Title">
                <input style={iS2} value={mForm.title} onChange={e=>setMForm(p=>({...p,title:e.target.value}))} placeholder="e.g. Network Engineer"/>
              </Lbl>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <Lbl t="Role *">
                  <select style={iS2} value={mForm.role} onChange={e=>setMForm(p=>({...p,role:e.target.value}))}>
                    <option value="admin">Administrator</option>
                    <option value="manager">Team Manager</option>
                    <option value="member">Team Member</option>
                  </select>
                </Lbl>
                <Lbl t="Team">
                  <select style={iS2} value={mForm.team||""} onChange={e=>setMForm(p=>({...p,team:e.target.value||null}))}>
                    <option value="">— No team (Admin) —</option>
                    {teams.map(t=><option key={t.name} value={t.name}>{t.emoji} {t.name}</option>)}
                  </select>
                </Lbl>
              </div>
            </div>
            <MFoot onClose={()=>setMModal(null)} onSave={saveMember} label={mTarget?"Save Changes":"Add Member"}/>
          </ModalWrap>
        )}

        {/* Delete confirm */}
        {mConfirm && (()=>{
          const m = allUsers.find(u=>u.id===mConfirm);
          return (
            <ModalWrap title="🗑 Remove Member" onClose={()=>setMConfirm(null)}>
              <div style={{textAlign:"center",padding:"8px 0 16px"}}>
                <div style={{fontSize:40,marginBottom:12}}>⚠️</div>
                <div style={{fontSize:14,fontWeight:700,color:"#0f172a",marginBottom:6}}>Remove {m?.name}?</div>
                <div style={{fontSize:12,color:"#6b7280"}}>This will remove the member from ISMS. Their existing time log entries will be preserved.</div>
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
                <button onClick={()=>setMConfirm(null)} style={{padding:"8px 20px",borderRadius:8,background:"#fff",border:"1px solid #c8d2e0",fontWeight:600,fontSize:13,cursor:"pointer"}}>Cancel</button>
                <button onClick={()=>deleteMember(mConfirm)} style={{padding:"8px 20px",borderRadius:8,background:"#dc2626",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>Remove</button>
              </div>
            </ModalWrap>
          );
        })()}
      </div>
    );
  };

  // ── BANDWIDTH ────────────────────────────
  const PageBandwidth = () => {
    const bwCap  = isAdmin ? CAPACITY : CAPACITY.filter(c=>c.team===user.team);
    const bwActs = isAdmin ? acts     : acts.filter(a=>a.team===user.team);
    const bwLogs = isAdmin ? logs     : logs.filter(l=>l.team===user.team);
    const bwLeave= isAdmin ? LEAVE    : LEAVE.filter(l=>l.team===user.team);

    // Per-activity: total logged + per-member breakdown
    const actDetail = bwActs.map(a=>{
      const aLogs   = bwLogs.filter(l=>l.actId===a.id);
      const total   = aLogs.reduce((s,l)=>s+l.mins,0);
      const pct     = Math.min(100,Math.round(total/Math.max(a.estMins,1)*100));
      // per-member roll-up
      const byMember = allUsers
        .filter(u=>u.team===a.team)
        .map(u=>({...u, mins:aLogs.filter(l=>l.userId===u.id).reduce((s,l)=>s+l.mins,0)}))
        .filter(u=>u.mins>0);
      return {...a, total, pct, byMember};
    }).sort((a,b)=>b.total-a.total);

    // Team-level: activities and hours
    const teamActDetail = bwCap.map(cap=>{
      const tActs = bwActs.filter(a=>a.team===cap.team);
      const tLogs = bwLogs.filter(l=>l.team===cap.team);
      const tMin  = tLogs.reduce((s,l)=>s+l.mins,0);
      const net   = cap.availMins-cap.vacMins;
      const pct   = Math.round(cap.utilMins/net*100);
      return {...cap, tActs, tMin, net, pct, tm:teams.find(t=>t.name===cap.team)};
    });

    return (
      <div>
        <div style={{fontSize:20,fontWeight:800,color:"#0f172a",marginBottom:4}}>Bandwidth & Capacity</div>
        <div style={{fontSize:12,color:"#6b7280",marginBottom:12}}>{isAdmin?"All teams":"Your team"} availability, activity time and utilization · March 2025</div>
        {!isAdmin && <InfoBanner color="#1e40af" bg="#eff6ff" border="#bfdbfe" icon="🔒">Showing bandwidth data for <strong>{user.team}</strong> team only. Admins see cross-team view.</InfoBanner>}

        {/* ── Row 1: Capacity summary + util bars ── */}
        <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:14,marginBottom:14}}>
          <Card>
            <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Capacity Summary</div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"'DM Sans',sans-serif"}}>
                <thead><tr><TH c="Team"/><TH c="HC"/><TH c="Available"/><TH c="Leave"/><TH c="Net Cap"/><TH c="Utilized"/><TH c="Util %"/></tr></thead>
                <tbody>
                  {bwCap.map(c=>{
                    const net=c.availMins-c.vacMins, pct=Math.round(c.utilMins/net*100);
                    return (
                      <tr key={c.team}>
                        <TD><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{width:8,height:8,borderRadius:"50%",background:tCol(c.team),flexShrink:0,display:"inline-block"}}/><strong>{c.team}</strong></div></TD>
                        <TD s={{textAlign:"center"}}>{c.hc}</TD>
                        <TD>{fmtM(c.availMins)}</TD>
                        <TD s={{color:"#dc2626"}}>{c.vacMins?fmtM(c.vacMins):"—"}</TD>
                        <TD><strong>{fmtM(net)}</strong></TD>
                        <TD s={{color:"#1a56db",fontWeight:700}}>{fmtM(c.utilMins)}</TD>
                        <TD>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <div style={{width:48,height:5,background:"#f1f5f9",borderRadius:3,overflow:"hidden"}}>
                              <div style={{height:"100%",width:`${Math.min(100,pct)}%`,background:uCol(pct),borderRadius:3}}/>
                            </div>
                            <strong style={{color:uCol(pct)}}>{pct}%</strong>
                          </div>
                        </TD>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
          <Card>
            <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Utilization vs Net Capacity</div>
            {bwCap.map(c=>{
              const net=c.availMins-c.vacMins, pct=Math.round(c.utilMins/net*100), col=tCol(c.team);
              return (
                <div key={c.team} style={{marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,marginBottom:3}}>
                    <span style={{fontWeight:600,display:"flex",alignItems:"center",gap:5}}>
                      <span style={{width:8,height:8,borderRadius:"50%",background:col,display:"inline-block"}}/>
                      {teams.find(t=>t.name===c.team)?.emoji} {c.team}
                    </span>
                    <div style={{display:"flex",gap:10,alignItems:"center"}}>
                      <span style={{fontSize:11,color:"#9ca3af"}}>{fmtM(c.utilMins)} / {fmtM(net)}</span>
                      <span style={{color:uCol(pct),fontWeight:800,minWidth:38,textAlign:"right"}}>{pct}%</span>
                    </div>
                  </div>
                  <div style={{height:8,background:"#f1f5f9",borderRadius:4,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${Math.min(100,pct)}%`,background:`linear-gradient(90deg,${col},${col}bb)`,borderRadius:4,transition:"width .5s"}}/>
                  </div>
                </div>
              );
            })}
          </Card>
        </div>

        {/* ── Row 2: Time spent per activity (the main new section) ── */}
        <Card style={{marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div>
              <div style={{fontWeight:700,fontSize:14,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2}}>Time Spent per Activity</div>
              <div style={{fontSize:11,color:"#6b7280",marginTop:2}}>Logged hours vs estimate for each activity · sorted by time logged</div>
            </div>
            <div style={{fontSize:12,color:"#6b7280",background:"#f7f9fc",border:"1px solid #dde3ed",borderRadius:7,padding:"5px 12px"}}>
              {bwActs.length} activities · {fmtM(bwLogs.reduce((s,l)=>s+l.mins,0))} total
            </div>
          </div>
          {actDetail.length===0
            ? <div style={{textAlign:"center",padding:40,color:"#9ca3af",fontSize:13}}>No activities yet.</div>
            : (
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"'DM Sans',sans-serif"}}>
                <thead>
                  <tr>
                    <TH c="Activity"/>
                    {isAdmin && <TH c="Team"/>}
                    <TH c="Nature"/>
                    <TH c="Work Type"/>
                    <TH c="Ticket"/>
                    <TH c="Type"/>
                    <TH c="Priority"/>
                    <TH c="Status"/>
                    <TH c="Est. Time"/>
                    <TH c="Time Logged"/>
                    <TH c="Progress"/>
                    <TH c="Logged by Members"/>
                  </tr>
                </thead>
                <tbody>
                  {actDetail.map(a=>{
                    const col = tCol(a.team);
                    return (
                      <tr key={a.id} style={{verticalAlign:"middle"}}>
                        <TD>
                          <div style={{fontWeight:700,fontSize:13,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2}}>{a.name}</div>
                          <div style={{fontSize:10,color:"#9ca3af",marginTop:1}}>{a.id} · {a.jira}</div>
                        </TD>
                        {isAdmin && <TD><TPill t={a.team}/></TD>}
                        <TD><NaturePill n={a.nature||"Proactive"}/></TD>
                        <TD><WNPill w={a.workNature||"Request"}/></TD>
                        <TD><code style={{background:"#f1f5f9",padding:"2px 6px",borderRadius:4,color:"#374151",fontSize:11,fontWeight:600}}>{a.ticketNo||a.jira||"—"}</code></TD>
                        <TD s={{fontSize:12}}>{a.type}</TD>
                        <TD><PDot p={a.priority}/></TD>
                        <TD><SPill s={a.status}/></TD>
                        <TD s={{fontWeight:600,color:"#374151"}}>{fmtM(a.estMins)}</TD>
                        <TD>
                          <div style={{fontWeight:800,color:a.pct>100?"#dc2626":"#1a56db",fontSize:15}}>{fmtM(a.total)}</div>
                          {a.total===0 && <div style={{fontSize:10,color:"#9ca3af"}}>no entries yet</div>}
                        </TD>
                        <TD>
                          <div style={{display:"flex",alignItems:"center",gap:7,minWidth:110}}>
                            <div style={{flex:1,height:7,background:"#eef2f7",borderRadius:4,overflow:"hidden"}}>
                              <div style={{height:"100%",width:`${a.pct}%`,background:a.pct>100?"#dc2626":a.pct>75?"#d97706":"#059669",borderRadius:4,transition:"width .5s"}}/>
                            </div>
                            <span style={{fontSize:11,fontWeight:700,color:a.pct>100?"#dc2626":a.pct>75?"#d97706":"#374151",minWidth:34,textAlign:"right"}}>{a.pct}%</span>
                          </div>
                          <div style={{fontSize:9,color:"#9ca3af",marginTop:2}}>
                            {a.pct>100?"⚠️ Over estimate":a.pct===100?"✅ Complete":a.pct>75?"🔶 Nearly full":"🟢 On track"}
                          </div>
                        </TD>
                        <TD>
                          {a.byMember.length===0
                            ? <span style={{fontSize:11,color:"#9ca3af"}}>—</span>
                            : (
                            <div style={{display:"flex",flexDirection:"column",gap:4}}>
                              {a.byMember.map(m=>(
                                <div key={m.id} style={{display:"flex",alignItems:"center",gap:7}}>
                                  <div style={{width:20,height:20,borderRadius:"50%",background:`${col}22`,color:col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:800,flexShrink:0}}>
                                    {m.name.split(" ").map(n=>n[0]).join("")}
                                  </div>
                                  <div style={{flex:1,minWidth:80}}>
                                    <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:1}}>
                                      <span style={{color:"#374151",fontWeight:600}}>{m.name.split(" ")[0]}</span>
                                      <span style={{color:col,fontWeight:700}}>{fmtM(m.mins)}</span>
                                    </div>
                                    <div style={{height:3,background:"#f1f5f9",borderRadius:2,overflow:"hidden"}}>
                                      <div style={{height:"100%",width:`${Math.round(m.mins/Math.max(a.total,1)*100)}%`,background:col,borderRadius:2}}/>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </TD>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* ── Row 3: Leave Calendar ── */}
        <Card>
          <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Leave Calendar — March 2025</div>
          {bwLeave.length===0
            ? <div style={{textAlign:"center",padding:24,color:"#9ca3af",fontSize:13}}>No leave planned this month.</div>
            : (
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"'DM Sans',sans-serif"}}>
                <thead><tr><TH c="Member"/><TH c="Team"/><TH c="From"/><TH c="To"/><TH c="Days"/><TH c="Hours"/><TH c="Type"/></tr></thead>
                <tbody>
                  {bwLeave.map((l,i)=>(
                    <tr key={i}>
                      <TD><strong>{l.member}</strong></TD>
                      <TD><TPill t={l.team}/></TD>
                      <TD s={{fontSize:12}}>{l.from}</TD>
                      <TD s={{fontSize:12}}>{l.to}</TD>
                      <TD>{l.days}</TD>
                      <TD s={{color:"#dc2626",fontWeight:700}}>{fmtM(l.mins)}</TD>
                      <TD s={{fontSize:12}}>{l.type}</TD>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    );
  };

  // ── REPORTS ──────────────────────────────
  const PageReports = () => {
    const TABS = [{id:"util",label:"Team Utilization"},{id:"member",label:"Per Member"},{id:"activity",label:"Activity Wise"},{id:"leave",label:"Leave Impact"}];
    return (
      <div>
        <div style={{fontSize:20,fontWeight:800,color:"#0f172a",marginBottom:4}}>Reports</div>
        <div style={{fontSize:12,color:"#6b7280",marginBottom:20}}>Utilization and capacity analytics · March 2025</div>
        <Tabs tabs={TABS} active={reportTab} onChange={setReportTab}/>
        {reportTab==="util" && (
          <div>
            {!isAdmin && <InfoBanner color="#1e40af" bg="#eff6ff" border="#bfdbfe" icon="🔒">Showing data for <strong>{user.team}</strong> team only. Admins see cross-team reports.</InfoBanner>}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
              {(()=>{ const rc=isAdmin?CAPACITY:CAPACITY.filter(c=>c.team===user.team); const avg=Math.round(rc.reduce((s,c)=>{const n=c.availMins-c.vacMins;return s+(c.utilMins/n*100)},0)/Math.max(rc.length,1));
                const netCap=rc.reduce((s,c)=>s+(c.availMins-c.vacMins),0);
                return [["Avg Util",`${avg}%`,"#1a56db"],["Over-utilized",`${rc.filter(c=>{const n=c.availMins-c.vacMins;return c.utilMins/n*100>85}).length} team(s)`,"#dc2626"],["Under-utilized",`${rc.filter(c=>{const n=c.availMins-c.vacMins;return c.utilMins/n*100<70}).length} team(s)`,"#d97706"],["Net Capacity",fmtM(netCap),"#059669"]];
              })().map(([l,v,c])=>(
                <Card key={l} style={{padding:14,textAlign:"center"}}>
                  <div style={{fontSize:9.5,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:.8,marginBottom:6}}>{l}</div>
                  <div style={{fontSize:26,fontWeight:800,color:c}}>{v}</div>
                </Card>
              ))}
            </div>
            <Card>
              <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Utilization Detail</div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"'DM Sans',sans-serif"}}>
                  <thead><tr><TH c="Team"/><TH c="Lead"/><TH c="HC"/><TH c="Available"/><TH c="Leave"/><TH c="Net Cap"/><TH c="Utilized"/><TH c="Util %"/><TH c="Status"/></tr></thead>
                  <tbody>
                    {(isAdmin?CAPACITY:CAPACITY.filter(c=>c.team===user.team)).map(c=>{
                      const net=c.availMins-c.vacMins, pct=Math.round(c.utilMins/net*100), t=teams.find(x=>x.name===c.team);
                      return (
                        <tr key={c.team}>
                          <TD><strong>{t?.emoji} {c.team}</strong></TD>
                          <TD s={{fontSize:12}}>{t?.lead}</TD>
                          <TD>{c.hc}</TD>
                          <TD>{fmtM(c.availMins)}</TD>
                          <TD s={{color:"#dc2626"}}>{fmtM(c.vacMins)}</TD>
                          <TD><strong>{fmtM(net)}</strong></TD>
                          <TD>{fmtM(c.utilMins)}</TD>
                          <TD><strong style={{color:uCol(pct)}}>{pct}%</strong></TD>
                          <TD><SPill s={pct>85?"Blocked":pct>75?"Pending":"Active"}/></TD>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
        {reportTab==="member" && (
          <Card>
            <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Member Utilization</div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"'DM Sans',sans-serif"}}>
                <thead><tr><TH c="Member"/><TH c="Team"/><TH c="Role"/><TH c="Capacity"/><TH c="Logged"/><TH c="Util %"/></tr></thead>
                <tbody>
                  {(isAdmin?allUsers:allUsers.filter(u=>u.team===user.team)).filter(m=>m.team).map(m=>{
                    const mM=logs.filter(l=>l.userId===m.id).reduce((s,l)=>s+l.mins,0), cap=160*60, pct=Math.round(mM/cap*100);
                    return (
                      <tr key={m.id}>
                        <TD><strong>{m.name}</strong></TD>
                        <TD><TPill t={m.team}/></TD>
                        <TD s={{fontSize:12}}>{m.role==="manager"?"👑 Manager":"Member"}</TD>
                        <TD>{fmtM(cap)}</TD>
                        <TD s={{color:"#1a56db",fontWeight:700}}>{fmtM(mM)}</TD>
                        <TD><strong style={{color:uCol(pct)}}>{pct}%</strong></TD>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
        {reportTab==="activity" && (
          <Card>
            <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Activity Hours — Top by Logged</div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"'DM Sans',sans-serif"}}>
                <thead><tr><TH c="Activity"/><TH c="Team"/><TH c="Type"/><TH c="Est. Time"/><TH c="Logged"/><TH c="Completion"/><TH c="Status"/></tr></thead>
                <tbody>
                  {[...(isAdmin?acts:teamActs)].sort((a,b)=>minsForAct(b.id)-minsForAct(a.id)).map(a=>{
                    const logged=minsForAct(a.id), pct=Math.min(100,Math.round(logged/Math.max(a.estMins,1)*100));
                    return (
                      <tr key={a.id}>
                        <TD><strong style={{fontSize:12}}>{a.name}</strong></TD>
                        <TD><TPill t={a.team}/></TD>
                        <TD s={{fontSize:12}}>{a.type}</TD>
                        <TD s={{fontWeight:600}}>{fmtM(a.estMins)}</TD>
                        <TD s={{color:"#1a56db",fontWeight:700}}>{fmtM(logged)}</TD>
                        <TD>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <div style={{width:65,height:5,background:"#e5e7eb",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:"#1a56db",borderRadius:3}}/></div>
                            <span style={{fontSize:11,color:"#6b7280"}}>{pct}%</span>
                          </div>
                        </TD>
                        <TD><SPill s={a.status}/></TD>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
        {reportTab==="leave" && (
          <Card>
            <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Leave & Capacity Impact</div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"'DM Sans',sans-serif"}}>
                <thead><tr><TH c="Team"/><TH c="Gross Cap"/><TH c="Leave"/><TH c="Impact%"/><TH c="Net Cap"/><TH c="Utilized"/><TH c="Adj Util%"/></tr></thead>
                <tbody>
                  {CAPACITY.map(c=>{
                    const net=c.availMins-c.vacMins, pct=Math.round(c.utilMins/net*100), imp=c.vacMins?((c.vacMins/c.availMins)*100).toFixed(1):0;
                    return (
                      <tr key={c.team}>
                        <TD><strong>{c.team}</strong></TD>
                        <TD>{fmtM(c.availMins)}</TD>
                        <TD s={{color:"#dc2626",fontWeight:700}}>{fmtM(c.vacMins)}</TD>
                        <TD>{imp}%</TD>
                        <TD><strong>{fmtM(net)}</strong></TD>
                        <TD>{fmtM(c.utilMins)}</TD>
                        <TD><strong style={{color:uCol(pct)}}>{pct}%</strong></TD>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    );
  };

  // ── CUSTOM REPORTS ───────────────────────
  const PageCustomReports = () => (
    <div>
      <div style={{fontSize:20,fontWeight:800,color:"#0f172a",marginBottom:4}}>Custom Reports</div>
      <div style={{fontSize:12,color:"#6b7280",marginBottom:20}}>Build and save tailored reports</div>
      <Card style={{marginBottom:16}}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>📂 Saved Reports</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {["🔒 Security Monthly","☁️ Cloud Utilization","🚨 Incident Breakdown","🏆 Top Contributors","⏰ Overdue Activities","🏖 Leave Impact Q1"].map(r=>(
            <button key={r} onClick={()=>showToast(`Loaded: ${r}`)} style={{padding:"5px 12px",borderRadius:20,fontSize:12,fontWeight:600,border:"1.5px solid #c8d2e0",background:"#fff",cursor:"pointer",color:"#374151"}}>{r}</button>
          ))}
        </div>
      </Card>
      <div style={{background:"#f7f9fc",border:"1px solid #dde3ed",borderRadius:12,padding:18,marginBottom:16}}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>⚙️ Report Builder</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:14}}>
          {[["Report Type",["Team Utilization","Member Hours","Activity Summary","Incident Analysis","Category Breakdown","Project Progress"]],
            ["Filter: Team",isAdmin?["All Teams",...teams.map(t=>t.name)]:[user.team]],
            ["Group By",["Team","Member","Category","Activity Type","Status","Priority"]],
            ["Chart Type",["Bar Chart","Horizontal Bar","Line Chart","Doughnut","Pie Chart"]],
            ["Date Range",["March 2025","Q1 2025","Last 3 Months","Last 6 Months"]],
          ].map(([label,opts])=>(
            <div key={label}>
              <div style={{fontSize:11,fontWeight:600,color:"#6b7280",marginBottom:4}}>{label}</div>
              <select style={sS}>{opts.map(o=><option key={o}>{o}</option>)}</select>
            </div>
          ))}
        </div>
        <div style={{fontSize:11,fontWeight:700,color:"#6b7280",marginBottom:8}}>METRICS:</div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:14}}>
          {["Hours Logged","Utilization %","Est Time","Activity Count","Leave Hours","Net Capacity","Completion %","Blocked Count"].map((chip,i)=>(
            <button key={chip} style={{padding:"4px 11px",borderRadius:20,fontSize:12,fontWeight:600,border:`1.5px solid ${i<2?"#1a56db":"#c8d2e0"}`,background:i<2?"#1a56db":"#fff",color:i<2?"#fff":"#6b7280",cursor:"pointer"}}>{chip}</button>
          ))}
        </div>
        <Btn onClick={()=>showToast("Report generated!")}>▶ Run Report</Btn>
      </div>
      <Card>
        <div style={{fontWeight:800,fontSize:15,marginBottom:4}}>Team Utilization Preview</div>
        <div style={{fontSize:12,color:"#6b7280",marginBottom:16}}>All Teams · March 2025</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div>
            {CAPACITY.map(c=>{
              const net=c.availMins-c.vacMins, pct=Math.round(c.utilMins/net*100);
              return (
                <div key={c.team} style={{marginBottom:11}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:2}}>
                    <span style={{fontWeight:600}}>{c.team}</span>
                    <span style={{color:uCol(pct),fontWeight:700}}>{pct}%</span>
                  </div>
                  <Bar pct={pct} color={tCol(c.team)}/>
                </div>
              );
            })}
          </div>
          <div>
            {[{t:"alert",icon:"🔴",title:"Security 91% — Over-utilized",desc:"Consider redistributing 2 activities"},
              {t:"warn",icon:"🟡",title:"Cloud 88% — Near capacity",desc:"Review Q2 project intake"},
              {t:"good",icon:"🟢",title:"Storage 65% — Has headroom",desc:"Can absorb 2–3 more activities"}
            ].map(i=>(
              <div key={i.title} style={{display:"flex",gap:9,padding:"10px 12px",borderRadius:8,marginBottom:8,background:i.t==="alert"?"#fef2f2":i.t==="warn"?"#fffbeb":"#f0fdf4",border:`1px solid ${i.t==="alert"?"#fecaca":i.t==="warn"?"#fde68a":"#a7f3d0"}`}}>
                <span style={{fontSize:16}}>{i.icon}</span>
                <div><div style={{fontSize:12,fontWeight:700,marginBottom:2}}>{i.title}</div><div style={{fontSize:11,color:"#6b7280"}}>{i.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );

  // ── CAPACITY PLANNING ────────────────────
  const PagePlanning = () => (
    <div>
      <div style={{fontSize:20,fontWeight:800,color:"#0f172a",marginBottom:4}}>Capacity Planning</div>
      <div style={{fontSize:12,color:"#6b7280",marginBottom:20}}>Q2 2025 Forecast & Resource Allocation</div>
      {!isAdmin && <InfoBanner color="#1e40af" bg="#eff6ff" border="#bfdbfe" icon="🔒">Showing capacity plan for <strong>{user.team}</strong> team only.</InfoBanner>}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
        <Card>
          <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Q2 Utilization Forecast</div>
          {(isAdmin?teams:teams.filter(t=>t.name===user.team)).map((t,i)=>{
            const pct=[72,78,75,80,73,77][i];
            return (
              <div key={t.name} style={{marginBottom:11}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:2}}>
                  <span style={{fontWeight:600}}>{t.emoji} {t.name}</span>
                  <span style={{color:uCol(pct),fontWeight:700}}>{pct}% (forecast)</span>
                </div>
                <Bar pct={pct} color={t.color}/>
              </div>
            );
          })}
        </Card>
        <Card>
          <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Recommendations</div>
          {[{t:"alert",icon:"🔴",title:"Security — Over-Utilized (91%)",desc:"Redistribute 2 activities or consider 0.5 FTE for Q2."},
            {t:"warn",icon:"🟡",title:"Cloud — Near Capacity (88%)",desc:"Evaluate Q2 project intake before April."},
            {t:"good",icon:"🟢",title:"Storage — Has Headroom (65%)",desc:"Can absorb 2–3 additional projects in Q2."}
          ].map(i=>(
            <div key={i.title} style={{display:"flex",gap:9,padding:"11px 12px",borderRadius:8,marginBottom:9,background:i.t==="alert"?"#fef2f2":i.t==="warn"?"#fffbeb":"#f0fdf4",border:`1px solid ${i.t==="alert"?"#fecaca":i.t==="warn"?"#fde68a":"#a7f3d0"}`}}>
              <span style={{fontSize:18}}>{i.icon}</span>
              <div><div style={{fontSize:12,fontWeight:700,marginBottom:2}}>{i.title}</div><div style={{fontSize:11,color:"#6b7280"}}>{i.desc}</div></div>
            </div>
          ))}
        </Card>
      </div>
      <Card>
        <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Q2 Bandwidth Plan — Apr to Jun 2025</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr><TH c="Team"/><TH c="Apr Cap"/><TH c="Apr Plan"/><TH c="Apr Gap"/><TH c="May Cap"/><TH c="May Plan"/><TH c="May Gap"/><TH c="Jun Cap"/><TH c="Jun Plan"/><TH c="Jun Gap"/></tr></thead>
            <tbody>
              {[{t:"Network",ac:24000,ap:22800,mc:24000,mp:23400,jc:24000,jp:21600},
                {t:"Security",ac:38400,ap:33600,mc:38400,mp:34800,jc:38400,jp:32400},
                {t:"Compute",ac:38400,ap:28800,mc:38400,mp:31200,jc:38400,jp:30000},
                {t:"Cloud",ac:38400,ap:35400,mc:38400,mp:36000,jc:38400,jp:34800},
                {t:"Storage",ac:28800,ap:16800,mc:28800,mp:18000,jc:28800,jp:19200},
                {t:"Database",ac:28800,ap:21000,mc:28800,mp:22800,jc:28800,jp:21600}
              ].filter(r=>isAdmin||r.t===user.team).map(r=>(
                <tr key={r.t}>
                  <TD><strong>{r.t}</strong></TD>
                  <TD>{fmtM(r.ac)}</TD><TD>{fmtM(r.ap)}</TD><TD s={{color:r.ac-r.ap<1800?"#dc2626":"#059669",fontWeight:700}}>{fmtM(r.ac-r.ap)}</TD>
                  <TD>{fmtM(r.mc)}</TD><TD>{fmtM(r.mp)}</TD><TD s={{color:r.mc-r.mp<1200?"#dc2626":"#059669",fontWeight:700}}>{fmtM(r.mc-r.mp)}</TD>
                  <TD>{fmtM(r.jc)}</TD><TD>{fmtM(r.jp)}</TD><TD s={{color:r.jc-r.jp<1800?"#dc2626":"#059669",fontWeight:700}}>{fmtM(r.jc-r.jp)}</TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  // ── SETTINGS ─────────────────────────────
  const PageSettings = () => {
    const STABS = [{id:"fields",label:"Custom Fields"},{id:"cats",label:"Types & Categories"},{id:"sp",label:"SharePoint"},{id:"pbi",label:"Power BI"}];
    return (
      <div>
        <div style={{fontSize:20,fontWeight:800,color:"#0f172a",marginBottom:4}}>Settings</div>
        <div style={{fontSize:12,color:"#6b7280",marginBottom:20}}>Configure fields, categories and integrations</div>
        <Tabs tabs={STABS} active={settingsTab} onChange={setSettingsTab}/>
        {settingsTab==="fields" && (
          <Card>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div style={{fontWeight:700,fontSize:14}}>Activity Custom Fields</div>
              <Btn sm onClick={()=>showToast("Field added")}>+ Add Field</Btn>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"'DM Sans',sans-serif"}}>
                <thead><tr><TH c="Field Name"/><TH c="Type"/><TH c="Teams"/><TH c="Required"/><TH c="Options"/><TH c="Actions"/></tr></thead>
                <tbody>
                  {[["Priority Level","Dropdown","All","Yes","Critical, High, Medium, Low"],
                    ["JIRA Ticket","Text","All","No","—"],
                    ["VLAN ID","Number","Network","No","—"],
                    ["CVE Reference","Text","Security","No","—"],
                    ["Cloud Provider","Dropdown","Cloud","Yes","AWS, Azure, GCP, OCI"]
                  ].map(([n,t,tm,r,o])=>(
                    <tr key={n}>
                      <TD><strong>{n}</strong></TD>
                      <TD s={{fontSize:12}}>{t}</TD>
                      <TD><TPill t={tm==="All"?"Network":tm}/></TD>
                      <TD><SPill s={r==="Yes"?"Active":"Done"}/></TD>
                      <TD s={{fontSize:11,color:"#6b7280"}}>{o}</TD>
                      <TD><Btn sm v="sec" onClick={()=>showToast(`Editing ${n}`)}>Edit</Btn></TD>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
        {settingsTab==="cats" && (
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {[["Activity Types",["📦 Project","🚨 Incident","🔄 Change","⚙️ BAU","📚 Training","💬 Meeting"]],
              ["Categories",["Infrastructure Build","Maintenance","Security & Compliance","Automation & Scripting","Monitoring & Alerting","Documentation"]]
            ].map(([title,items])=>(
              <Card key={title}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>{title}</div>
                {items.map(item=>(
                  <div key={item} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #f3f4f6",fontSize:13}}>
                    <span>{item}</span>
                    <button style={{padding:"2px 8px",borderRadius:5,border:"1px solid #c8d2e0",background:"#fff",cursor:"pointer",fontSize:11}}>×</button>
                  </div>
                ))}
                <div style={{display:"flex",gap:8,marginTop:12}}>
                  <input placeholder="Add new…" style={{flex:1,padding:"7px 10px",borderRadius:7,border:"1px solid #c8d2e0",fontSize:12}}/>
                  <Btn sm onClick={()=>showToast("Added!")}>Add</Btn>
                </div>
              </Card>
            ))}
          </div>
        )}
        {settingsTab==="sp" && (
          <Card style={{maxWidth:540}}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:16}}>SharePoint Online Configuration</div>
            {[["SharePoint Site URL","https://yourorg.sharepoint.com/sites/ISMS"],["Client ID","Azure App Registration GUID"],["Tenant ID","Azure Tenant GUID"],["Activities List","ISMSActivities"],["Time Logs List","ISMSTimeLogs"]].map(([l,ph])=>(
              <div key={l} style={{marginBottom:12}}>
                <div style={{fontSize:12,fontWeight:600,color:"#6b7280",marginBottom:4}}>{l}</div>
                <input style={iS} placeholder={ph}/>
              </div>
            ))}
            <Btn onClick={()=>showToast("Configuration saved!")}>Save Configuration</Btn>
          </Card>
        )}
        {settingsTab==="pbi" && (
          <Card style={{maxWidth:540}}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:16}}>Power BI Embed Configuration</div>
            {["Workspace ID","Report ID — Utilization","Report ID — Capacity","Embed Token"].map(l=>(
              <div key={l} style={{marginBottom:12}}>
                <div style={{fontSize:12,fontWeight:600,color:"#6b7280",marginBottom:4}}>{l}</div>
                <input style={iS} placeholder={l==="Embed Token"?"eyJ0eXAi...":"GUID"}/>
              </div>
            ))}
            <Btn v="suc" onClick={()=>showToast("Power BI config saved!")}>Save & Test Connection</Btn>
          </Card>
        )}
      </div>
    );
  };


  // ════════════════════════════════════════════════════════════════════
  //  PRODUCTIVITY ENGINE — shared helpers used across all 4 sub-pages
  // ════════════════════════════════════════════════════════════════════
  const prodData = React.useMemo(()=>{
    const scopeActs = isAdmin ? acts : acts.filter(a=>a.team===user.team);
    const scopeLogs = isAdmin ? logs : logs.filter(l=>l.team===user.team);
    const scopeMembers = isAdmin ? allUsers.filter(u=>u.team) : allUsers.filter(u=>u.team===user.team);
    const scopeCap  = isAdmin ? CAPACITY : CAPACITY.filter(c=>c.team===user.team);

    // ── Per-member stats ──
    const memberStats = scopeMembers.map(m=>{
      const mLogs   = scopeLogs.filter(l=>l.userId===m.id);
      const total   = mLogs.reduce((s,l)=>s+l.mins,0);
      const entries = mLogs.length;
      const avgPerEntry = entries ? Math.round(total/entries) : 0;
      const reactLogs = mLogs.filter(l=>{ const a=acts.find(x=>x.id===l.actId); return a&&a.nature==="Reactive"; });
      const reactMin  = reactLogs.reduce((s,l)=>s+l.mins,0);
      const proactMin = total - reactMin;
      const reactPct  = total ? Math.round(reactMin/total*100) : 0;
      const incidentMin = mLogs.filter(l=>l.type==="Incident").reduce((s,l)=>s+l.mins,0);
      const incidentPct = total ? Math.round(incidentMin/total*100) : 0;
      const uniqueActs  = [...new Set(mLogs.map(l=>l.actId))].length;
      const cap = scopeCap.find(c=>c.team===m.team)||{availMins:0,vacMins:0};
      const netCap = cap.availMins - cap.vacMins;
      const utilPct = netCap ? Math.round(total/netCap*100) : 0;
      // Idle: logged < 50% of net capacity
      const isIdle    = netCap>0 && utilPct < 50;
      // Over: logged > 90% of net capacity  
      const isOverloaded = netCap>0 && utilPct > 90;
      // Flag: >60% reactive
      const isReactiveHeavy = reactPct > 60;
      // Flag: >40% incident
      const isIncidentHeavy = incidentPct > 40;
      // Last log date
      const lastLog = mLogs.length ? mLogs.sort((a,b)=>b.date.localeCompare(a.date))[0].date : null;
      const daysSinceLog = lastLog ? Math.floor((new Date("2025-03-14")-new Date(lastLog))/(864e5)) : 999;
      const isStale = daysSinceLog >= 3;
      return { ...m, total, entries, avgPerEntry, reactMin, proactMin, reactPct, incidentMin, incidentPct,
               uniqueActs, utilPct, isIdle, isOverloaded, isReactiveHeavy, isIncidentHeavy,
               lastLog, daysSinceLog, isStale, netCap };
    });

    // ── Per-activity stats ──
    const actStats = scopeActs.map(a=>{
      const aLogs  = scopeLogs.filter(l=>l.actId===a.id);
      const logged = aLogs.reduce((s,l)=>s+l.mins,0);
      const entries= aLogs.length;
      const overEst= logged > a.estMins;
      const pct    = Math.round(logged/Math.max(a.estMins,1)*100);
      const contributors = [...new Set(aLogs.map(l=>l.userId))].length;
      // Flag: zero activity for >5 days while Active
      const lastEntry = aLogs.length ? aLogs.sort((a,b)=>b.date.localeCompare(a.date))[0].date : null;
      const daysStale = lastEntry ? Math.floor((new Date("2025-03-14")-new Date(lastEntry))/(864e5)) : 999;
      const isStale = a.status==="Active" && daysStale>=4;
      const isBlocked = a.status==="Blocked";
      const isOverEst  = overEst && a.status!=="Done";
      return { ...a, logged, entries, pct, overEst, isStale, isBlocked, isOverEst, contributors, daysStale };
    });

    // ── Team-level stats ──
    const teamStats = teams.filter(t=> isAdmin || t.name===user.team).map(t=>{
      const tLogs = scopeLogs.filter(l=>l.team===t.name);
      const tActs = scopeActs.filter(a=>a.team===t.name);
      const total = tLogs.reduce((s,l)=>s+l.mins,0);
      const reactPct = total ? Math.round(tLogs.filter(l=>{ const a=acts.find(x=>x.id===l.actId); return a&&a.nature==="Reactive"; }).reduce((s,l)=>s+l.mins,0)/total*100) : 0;
      const incidentPct = total ? Math.round(tLogs.filter(l=>l.type==="Incident").reduce((s,l)=>s+l.mins,0)/total*100) : 0;
      const cap = scopeCap.find(c=>c.team===t.name)||{availMins:0,vacMins:0,utilMins:0};
      const net = cap.availMins - cap.vacMins;
      const utilPct = net ? Math.round(cap.utilMins/net*100) : 0;
      const blockedActs = tActs.filter(a=>a.status==="Blocked").length;
      const staleActs   = actStats.filter(a=>a.team===t.name&&a.isStale).length;
      const overEstActs = actStats.filter(a=>a.team===t.name&&a.isOverEst).length;
      const score = Math.max(0,100 - reactPct*.4 - incidentPct*.3 - blockedActs*5 - staleActs*8 - Math.max(0,utilPct-90)*0.5);
      return { ...t, total, reactPct, incidentPct, utilPct, blockedActs, staleActs, overEstActs, net, score:Math.round(score) };
    });

    // ── Org-level KPIs ──
    const totalLogged   = scopeLogs.reduce((s,l)=>s+l.mins,0);
    const reactTotal    = scopeLogs.filter(l=>{ const a=acts.find(x=>x.id===l.actId); return a&&a.nature==="Reactive"; }).reduce((s,l)=>s+l.mins,0);
    const reactOrgPct   = totalLogged ? Math.round(reactTotal/totalLogged*100) : 0;
    const incidentTotal = scopeLogs.filter(l=>l.type==="Incident").reduce((s,l)=>s+l.mins,0);
    const incidentOrgPct= totalLogged ? Math.round(incidentTotal/totalLogged*100) : 0;
    const flaggedMembers= memberStats.filter(m=>m.isIdle||m.isReactiveHeavy||m.isIncidentHeavy||m.isStale).length;
    const flaggedActs   = actStats.filter(a=>a.isStale||a.isBlocked||a.isOverEst).length;
    const avgTeamScore  = teamStats.length ? Math.round(teamStats.reduce((s,t)=>s+t.score,0)/teamStats.length) : 0;

    // ── Heatmap: member × week-day (Mon-Fri × last 2 weeks) ──
    const heatDays = ["Mar 3","Mar 4","Mar 5","Mar 6","Mar 7","Mar 10","Mar 11","Mar 12","Mar 13","Mar 14"];
    const heatDates= ["2025-03-03","2025-03-04","2025-03-05","2025-03-06","2025-03-07","2025-03-10","2025-03-11","2025-03-12","2025-03-13","2025-03-14"];
    const heatMap  = scopeMembers.map(m=>({
      member: m, 
      cells: heatDates.map(d=>({ date:d, mins: scopeLogs.filter(l=>l.userId===m.id&&l.date===d).reduce((s,l)=>s+l.mins,0) }))
    }));

    return { memberStats, actStats, teamStats, totalLogged, reactOrgPct, incidentOrgPct,
             flaggedMembers, flaggedActs, avgTeamScore, heatMap, heatDays, heatDates,
             scopeActs, scopeLogs, scopeMembers };
  },[acts,logs,user,isAdmin]);

  // ════════════════════════════════════════════════════════════════════
  //  PAGE: PRODUCTIVITY OVERVIEW
  // ════════════════════════════════════════════════════════════════════
  const PageProdOverview = () => {
    const { memberStats, teamStats, totalLogged, reactOrgPct, incidentOrgPct,
            flaggedMembers, flaggedActs, avgTeamScore, scopeLogs } = prodData;
    const proactPct = 100 - reactOrgPct;

    const ScoreRing = ({score,size=80}) => {
      const r=32, c=50, circ=2*Math.PI*r;
      const col = score>=75?"#059669":score>=55?"#d97706":"#dc2626";
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={{flexShrink:0}}>
          <circle cx={c} cy={c} r={r} fill="none" stroke="#f1f5f9" strokeWidth="10"/>
          <circle cx={c} cy={c} r={r} fill="none" stroke={col} strokeWidth="10"
            strokeDasharray={circ} strokeDashoffset={circ*(1-score/100)}
            strokeLinecap="round" transform="rotate(-90 50 50)"/>
          <text x={c} y={c-4} textAnchor="middle" fontSize="18" fontWeight="800" fill={col}>{score}</text>
          <text x={c} y={c+12} textAnchor="middle" fontSize="8" fill="#9ca3af">/100</text>
        </svg>
      );
    };

    return (
      <div>
        <div style={{marginBottom:20}}>
          <div style={{fontSize:20,fontWeight:800,color:"#0f172a"}}>🚀 Productivity Overview</div>
          <div style={{fontSize:12,color:"#6b7280",marginTop:3}}>
            {isAdmin?"Org-wide":"Your team"} health, efficiency and risk indicators · March 2025
          </div>
        </div>

        {/* Top KPI strip */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12,marginBottom:18}}>
          {[
            {icon:"🎯",label:"Avg Team Score",   val:`${avgTeamScore}`,  sub:"out of 100",           c:avgTeamScore>=75?"#059669":avgTeamScore>=55?"#d97706":"#dc2626", bg:avgTeamScore>=75?"#f0fdf4":avgTeamScore>=55?"#fffbeb":"#fef2f2", nav:"prod_flags"},
            {icon:"⚡",label:"Proactive Work",   val:`${proactPct}%`,    sub:"of all logged time",   c:"#059669",bg:"#f0fdf4",                                          nav:"prod_heatmap"},
            {icon:"🔴",label:"Reactive Work",    val:`${reactOrgPct}%`,  sub:"target <30%",          c:reactOrgPct>50?"#dc2626":reactOrgPct>30?"#d97706":"#059669",     bg:reactOrgPct>50?"#fef2f2":reactOrgPct>30?"#fffbeb":"#f0fdf4", nav:"prod_flags"},
            {icon:"🚨",label:"Incident Time",    val:`${incidentOrgPct}%`,sub:"of total hours",      c:incidentOrgPct>30?"#dc2626":"#6b7280",bg:incidentOrgPct>30?"#fef2f2":"#f7f9fc", nav:"prod_flags"},
            {icon:"🚩",label:"Flagged Items",    val:`${flaggedMembers+flaggedActs}`, sub:`${flaggedMembers} members · ${flaggedActs} acts`, c:"#ea580c",bg:"#fff7ed", nav:"prod_flags"},
            {icon:"💤",label:"Idle Members",     val:memberStats.filter(m=>m.isIdle).length, sub:"<50% utilised",  c:"#7c3aed",bg:"#f5f3ff",                           nav:"prod_flags"},
          ].map(s=>(
            <Card key={s.label} onClick={()=>goPage(s.nav)} style={{padding:14,cursor:"pointer",transition:"all .15s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 6px 20px rgba(15,23,42,.1)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div style={{width:30,height:30,borderRadius:8,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{s.icon}</div>
                <span style={{fontSize:9,color:"#9ca3af",background:"#f1f5f9",padding:"2px 6px",borderRadius:10}}>↗</span>
              </div>
              <div style={{fontSize:9,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1,fontFamily:"'DM Mono',monospace"}}>{s.label}</div>
              <div style={{fontSize:22,fontWeight:800,color:s.c,lineHeight:1.1,marginTop:2}}>{s.val}</div>
              <div style={{fontSize:10.5,color:"#94a3b8",marginTop:4}}>{s.sub}</div>
            </Card>
          ))}
        </div>

        {/* Row 1: Team scorecards + Reactive vs Proactive */}
        <div style={{display:"grid",gridTemplateColumns:"1.6fr 1fr",gap:14,marginBottom:14}}>
          <Card>
            <div style={{fontWeight:700,fontSize:14,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2,marginBottom:4}}>Team Productivity Scores</div>
            <div style={{fontSize:11,color:"#6b7280",marginBottom:14}}>Composite score based on reactive ratio, incidents, blocked & stale activities</div>
            {teamStats.map(t=>{
              const col=t.score>=75?"#059669":t.score>=55?"#d97706":"#dc2626";
              const bg =t.score>=75?"#f0fdf4":t.score>=55?"#fffbeb":"#fef2f2";
              return (
                <div key={t.name} onClick={()=>goPage("prod_flags")} style={{display:"flex",alignItems:"center",gap:12,marginBottom:12,padding:"10px 12px",borderRadius:10,background:bg,border:`1px solid ${col}30`,cursor:"pointer",transition:"all .12s"}}
                  onMouseEnter={e=>e.currentTarget.style.boxShadow=`0 3px 12px ${col}25`}
                  onMouseLeave={e=>{e.currentTarget.style.boxShadow="";e.currentTarget.style.transform="";}}>
                  <span style={{fontSize:22,flexShrink:0}}>{t.emoji}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{fontWeight:700,fontSize:13}}>{t.name}</span>
                      <span style={{fontSize:11,color:"#6b7280"}}>{t.reactPct}% reactive · {t.blockedActs} blocked · {t.staleActs} stale</span>
                    </div>
                    <div style={{height:7,background:"rgba(255,255,255,.6)",borderRadius:4,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${t.score}%`,background:col,borderRadius:4,transition:"width .6s"}}/>
                    </div>
                  </div>
                  <div style={{fontWeight:900,fontSize:18,color:col,minWidth:36,textAlign:"right"}}>{t.score}</div>
                </div>
              );
            })}
          </Card>

          <Card>
            <div style={{fontWeight:700,fontSize:14,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2,marginBottom:4}}>Work Nature Split</div>
            <div style={{fontSize:11,color:"#6b7280",marginBottom:16}}>Proactive vs Reactive time distribution</div>
            {/* Big donut */}
            {(()=>{
              const R=34,cx=50,cy=50,sw=16,circ=2*Math.PI*R;
              const reactDash = circ*(reactOrgPct/100);
              return (
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
                  <div style={{position:"relative"}}>
                    <svg width={130} height={130} viewBox="0 0 100 100">
                      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#dcfce7" strokeWidth={sw}/>
                      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#fca5a5" strokeWidth={sw}
                        strokeDasharray={`${reactDash} ${circ}`} strokeDashoffset={0}
                        strokeLinecap="round" transform="rotate(-90 50 50)"/>
                      <text x={cx} y={cy-5} textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a">{proactPct}%</text>
                      <text x={cx} y={cy+9} textAnchor="middle" fontSize="7.5" fill="#6b7280">Proactive</text>
                    </svg>
                  </div>
                  <div style={{width:"100%"}}>
                    {[["🟢 Proactive",proactPct,"#059669","#f0fdf4"],["🔴 Reactive",reactOrgPct,"#dc2626","#fef2f2"]].map(([l,v,c,bg])=>(
                      <div key={l} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,padding:"8px 10px",borderRadius:8,background:bg}}>
                        <span style={{fontSize:12,flex:1,fontWeight:600,color:c}}>{l}</span>
                        <span style={{fontSize:18,fontWeight:800,color:c}}>{v}%</span>
                      </div>
                    ))}
                  </div>
                  <div style={{fontSize:11,color:reactOrgPct>30?"#dc2626":"#059669",fontWeight:600,textAlign:"center",padding:"6px 10px",borderRadius:7,background:reactOrgPct>30?"#fef2f2":"#f0fdf4"}}>
                    {reactOrgPct>50?"⚠️ High reactive load — review workload triggers":reactOrgPct>30?"⚡ Reactive slightly elevated — monitor trends":"✅ Healthy proactive ratio"}
                  </div>
                </div>
              );
            })()}
          </Card>
        </div>

        {/* Row 2: Member utilisation league table */}
        <Card style={{marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div>
              <div style={{fontWeight:700,fontSize:14,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2}}>Member Utilisation League</div>
              <div style={{fontSize:11,color:"#6b7280"}}>Logged hours vs net capacity · click a member to drill in</div>
            </div>
            <Btn sm v="sec" onClick={()=>goPage("prod_flags")}>View Flags →</Btn>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"'DM Sans',sans-serif"}}>
              <thead><tr>
                <TH c="Member"/><TH c="Team"/><TH c="Hours Logged"/><TH c="Utilisation"/>
                <TH c="Proactive"/><TH c="Reactive"/><TH c="Incident %"/>
                <TH c="Entries"/><TH c="Last Log"/><TH c="Status"/>
              </tr></thead>
              <tbody>
                {[...memberStats].sort((a,b)=>b.utilPct-a.utilPct).map((m,i)=>{
                  const flags=[];
                  if(m.isIdle)          flags.push({t:"Idle",c:"#7c3aed",bg:"#f5f3ff"});
                  if(m.isOverloaded)    flags.push({t:"Overloaded",c:"#dc2626",bg:"#fef2f2"});
                  if(m.isReactiveHeavy) flags.push({t:"Reactive↑",c:"#ea580c",bg:"#fff7ed"});
                  if(m.isIncidentHeavy) flags.push({t:"Incident↑",c:"#b91c1c",bg:"#fee2e2"});
                  if(m.isStale)         flags.push({t:"No logs 3d+",c:"#6b7280",bg:"#f1f5f9"});
                  const col=tCol(m.team);
                  return (
                    <tr key={m.id} onClick={()=>setDashDrill({type:"logs",label:`${m.name} — All Time Entries`,data:logs.filter(l=>l.userId===m.id)})}
                      style={{cursor:"pointer",background:i%2===0?"#fff":"#fafbfc",borderBottom:"1px solid #f1f5f9"}}
                      onMouseEnter={e=>e.currentTarget.style.background="#eff6ff"}
                      onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"#fff":"#fafbfc"}>
                      <TD>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <div style={{width:26,height:26,borderRadius:"50%",background:`${col}22`,color:col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,flexShrink:0}}>{m.name.split(" ").map(n=>n[0]).join("")}</div>
                          <span style={{fontWeight:700}}>{m.name}</span>
                        </div>
                      </TD>
                      <TD><TPill t={m.team}/></TD>
                      <TD><span style={{fontWeight:700,color:"#1a56db"}}>{fmtM(m.total)}</span></TD>
                      <TD>
                        <div style={{display:"flex",alignItems:"center",gap:7}}>
                          <div style={{width:60,height:6,background:"#f1f5f9",borderRadius:3,overflow:"hidden"}}>
                            <div style={{height:"100%",width:`${Math.min(100,m.utilPct)}%`,background:m.isOverloaded?"#dc2626":m.isIdle?"#9ca3af":"#059669",borderRadius:3}}/>
                          </div>
                          <span style={{fontWeight:700,color:m.isOverloaded?"#dc2626":m.isIdle?"#9ca3af":"#059669",fontSize:12}}>{m.utilPct}%</span>
                        </div>
                      </TD>
                      <TD s={{color:"#059669",fontWeight:600}}>{fmtM(m.proactMin)}</TD>
                      <TD s={{color:m.reactPct>60?"#dc2626":"#374151",fontWeight:m.reactPct>60?700:400}}>{fmtM(m.reactMin)} <span style={{fontSize:10,color:"#9ca3af"}}>({m.reactPct}%)</span></TD>
                      <TD s={{color:m.incidentPct>40?"#dc2626":"#374151"}}>{m.incidentPct}%</TD>
                      <TD s={{textAlign:"center"}}>{m.entries}</TD>
                      <TD s={{fontSize:11,color:m.isStale?"#dc2626":"#6b7280"}}>{m.lastLog||"never"}{m.isStale&&" ⚠️"}</TD>
                      <TD>
                        {flags.length===0
                          ? <span style={{fontSize:11,color:"#059669",fontWeight:600}}>✅ Good</span>
                          : <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                              {flags.map(f=><span key={f.t} style={{fontSize:10,background:f.bg,color:f.c,padding:"2px 7px",borderRadius:10,fontWeight:700}}>{f.t}</span>)}
                            </div>
                        }
                      </TD>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Row 3: Activity health bars */}
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div>
              <div style={{fontWeight:700,fontSize:14,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2}}>Activity Health</div>
              <div style={{fontSize:11,color:"#6b7280"}}>Over-estimate, stale and blocked activities</div>
            </div>
            <Btn sm v="sec" onClick={()=>goPage("prod_flags")}>All Flags →</Btn>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
            {[
              {label:"Over Estimate",icon:"📈",items:prodData.actStats.filter(a=>a.isOverEst),col:"#dc2626",bg:"#fef2f2",desc:"Logged time exceeds estimate"},
              {label:"Stale (no update 4d+)",icon:"💤",items:prodData.actStats.filter(a=>a.isStale),col:"#d97706",bg:"#fffbeb",desc:"Active but no log entries recently"},
              {label:"Blocked",icon:"🚧",items:prodData.actStats.filter(a=>a.isBlocked),col:"#7c3aed",bg:"#f5f3ff",desc:"Waiting on dependency or escalation"},
            ].map(g=>(
              <div key={g.label} style={{background:g.bg,borderRadius:10,padding:12,border:`1px solid ${g.col}20`}}>
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:10}}>
                  <span style={{fontSize:16}}>{g.icon}</span>
                  <div>
                    <div style={{fontWeight:700,fontSize:12,color:g.col}}>{g.label}</div>
                    <div style={{fontSize:10,color:"#9ca3af"}}>{g.desc}</div>
                  </div>
                  <span style={{marginLeft:"auto",fontSize:20,fontWeight:800,color:g.col}}>{g.items.length}</span>
                </div>
                {g.items.slice(0,4).map(a=>(
                  <div key={a.id} onClick={()=>setDashDrill({type:"acts",label:g.label,data:g.items})}
                    style={{fontSize:11,color:"#374151",padding:"5px 8px",background:"rgba(255,255,255,.7)",borderRadius:6,marginBottom:4,cursor:"pointer",fontWeight:600,display:"flex",justifyContent:"space-between"}}
                    onMouseEnter={e=>e.currentTarget.style.background="#fff"}
                    onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.7)"}>
                    <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:150}}>{a.name}</span>
                    {a.isOverEst && <span style={{color:g.col,flexShrink:0}}>{a.pct}%</span>}
                    {a.isStale   && <span style={{color:g.col,flexShrink:0}}>{a.daysStale}d</span>}
                  </div>
                ))}
                {g.items.length>4 && <div style={{fontSize:10,color:g.col,fontWeight:600,textAlign:"center",marginTop:4}}>+{g.items.length-4} more →</div>}
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  // ════════════════════════════════════════════════════════════════════
  //  PAGE: FLAGS & RISKS
  // ════════════════════════════════════════════════════════════════════
  const PageProdFlags = () => {
    const { memberStats, actStats } = prodData;
    const [tab, setTab] = React.useState("members");
    const flaggedMem = memberStats.filter(m=>m.isIdle||m.isOverloaded||m.isReactiveHeavy||m.isIncidentHeavy||m.isStale);
    const flaggedAct = actStats.filter(a=>a.isStale||a.isBlocked||a.isOverEst);
    const riskColor  = (level) => level==="Critical"?"#dc2626":level==="High"?"#ea580c":level==="Medium"?"#d97706":"#059669";
    const riskBg     = (level) => level==="Critical"?"#fef2f2":level==="High"?"#fff7ed":level==="Medium"?"#fffbeb":"#f0fdf4";

    return (
      <div>
        <div style={{marginBottom:18}}>
          <div style={{fontSize:20,fontWeight:800,color:"#0f172a"}}>🚩 Flags & Risks</div>
          <div style={{fontSize:12,color:"#6b7280",marginTop:3}}>Members and activities needing attention · click any row for details</div>
        </div>

        {/* Summary ribbon */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:16}}>
          {[
            {label:"Idle Members",      val:memberStats.filter(m=>m.isIdle).length,          icon:"💤",c:"#7c3aed",bg:"#f5f3ff",risk:"Medium"},
            {label:"Overloaded",        val:memberStats.filter(m=>m.isOverloaded).length,     icon:"🔥",c:"#dc2626",bg:"#fef2f2",risk:"High"},
            {label:"Reactive Heavy",    val:memberStats.filter(m=>m.isReactiveHeavy).length,  icon:"🔴",c:"#ea580c",bg:"#fff7ed",risk:"High"},
            {label:"Stale Activities",  val:actStats.filter(a=>a.isStale).length,             icon:"💤",c:"#d97706",bg:"#fffbeb",risk:"Medium"},
            {label:"Blocked Activities",val:actStats.filter(a=>a.isBlocked).length,           icon:"🚧",c:"#6b7280",bg:"#f7f9fc",risk:"Low"},
          ].map(s=>(
            <Card key={s.label} style={{padding:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                <span style={{fontSize:18}}>{s.icon}</span>
                <span style={{fontSize:10,background:riskBg(s.risk),color:riskColor(s.risk),padding:"2px 7px",borderRadius:10,fontWeight:700}}>{s.risk}</span>
              </div>
              <div style={{fontSize:22,fontWeight:800,color:s.c}}>{s.val}</div>
              <div style={{fontSize:10,color:"#6b7280",marginTop:2}}>{s.label}</div>
            </Card>
          ))}
        </div>

        <Tabs tabs={[{id:"members",label:`🧑 Members (${flaggedMem.length})`},{id:"activities",label:`📋 Activities (${flaggedAct.length})`}]}
          active={tab} onChange={setTab}/>

        {tab==="members" && (
          <Card style={{padding:0,overflow:"hidden",marginTop:14}}>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"'DM Sans',sans-serif"}}>
                <thead><tr>
                  <TH c="Member"/><TH c="Team"/><TH c="Issue"/><TH c="Util %"/>
                  <TH c="Reactive %"/><TH c="Incident %"/><TH c="Hours"/><TH c="Last Log"/><TH c="Risk"/>
                </tr></thead>
                <tbody>
                  {flaggedMem.length===0
                    ? <tr><td colSpan={9} style={{textAlign:"center",padding:40,color:"#059669",fontSize:14,fontWeight:600}}>✅ No flagged members — all good!</td></tr>
                    : flaggedMem.map((m,i)=>{
                        const issues=[];
                        if(m.isIdle)           issues.push("Idle (<50% util)");
                        if(m.isOverloaded)     issues.push("Overloaded (>90%)");
                        if(m.isReactiveHeavy)  issues.push("Reactive heavy (>60%)");
                        if(m.isIncidentHeavy)  issues.push("Incident heavy (>40%)");
                        if(m.isStale)          issues.push(`No log ${m.daysSinceLog}d`);
                        const risk = m.isOverloaded||m.isIncidentHeavy?"Critical":m.isReactiveHeavy?"High":"Medium";
                        return (
                          <tr key={m.id} className="row-hover" style={{cursor:"pointer",background:i%2===0?"#fff":"#fafbfc",borderBottom:"1px solid #f1f5f9"}}
                            onClick={()=>setDashDrill({type:"logs",label:`${m.name} — Time Entries`,data:logs.filter(l=>l.userId===m.id)})}
                            onMouseEnter={e=>e.currentTarget.style.background="#fffbeb"}
                            onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"#fff":"#fafbfc"}>
                            <TD><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:26,height:26,borderRadius:"50%",background:`${tCol(m.team)}22`,color:tCol(m.team),display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800}}>{m.name.split(" ").map(n=>n[0]).join("")}</div><strong>{m.name}</strong></div></TD>
                            <TD><TPill t={m.team}/></TD>
                            <TD><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{issues.map(iss=><span key={iss} style={{fontSize:10,background:"#fff7ed",color:"#c2410c",padding:"2px 6px",borderRadius:8,fontWeight:600}}>{iss}</span>)}</div></TD>
                            <TD><span style={{fontWeight:700,color:m.isOverloaded?"#dc2626":m.isIdle?"#9ca3af":"#374151"}}>{m.utilPct}%</span></TD>
                            <TD><span style={{fontWeight:700,color:m.isReactiveHeavy?"#dc2626":"#374151"}}>{m.reactPct}%</span></TD>
                            <TD><span style={{fontWeight:700,color:m.isIncidentHeavy?"#dc2626":"#374151"}}>{m.incidentPct}%</span></TD>
                            <TD s={{color:"#1a56db",fontWeight:700}}>{fmtM(m.total)}</TD>
                            <TD s={{fontSize:11,color:m.isStale?"#dc2626":"#6b7280"}}>{m.lastLog||"never"}</TD>
                            <TD><span style={{fontSize:11,background:riskBg(risk),color:riskColor(risk),padding:"3px 9px",borderRadius:10,fontWeight:700}}>{risk}</span></TD>
                          </tr>
                        );
                      })
                  }
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {tab==="activities" && (
          <Card style={{padding:0,overflow:"hidden",marginTop:14}}>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"'DM Sans',sans-serif"}}>
                <thead><tr>
                  <TH c="Activity"/><TH c="Team"/><TH c="Issue"/><TH c="Status"/>
                  <TH c="Est."/><TH c="Logged"/><TH c="% Est."/><TH c="Last Entry"/><TH c="Risk"/>
                </tr></thead>
                <tbody>
                  {flaggedAct.length===0
                    ? <tr><td colSpan={9} style={{textAlign:"center",padding:40,color:"#059669",fontSize:14,fontWeight:600}}>✅ No flagged activities!</td></tr>
                    : flaggedAct.map((a,i)=>{
                        const issues=[];
                        if(a.isOverEst) issues.push(`Over estimate (${a.pct}%)`);
                        if(a.isStale)   issues.push(`Stale ${a.daysStale}d`);
                        if(a.isBlocked) issues.push("Blocked");
                        const risk = a.isBlocked||a.pct>120?"Critical":a.isStale?"High":"Medium";
                        return (
                          <tr key={a.id} className="row-hover" style={{cursor:"pointer",background:i%2===0?"#fff":"#fafbfc",borderBottom:"1px solid #f1f5f9"}}
                            onClick={()=>setDashDrill({type:"logs",label:`${a.name} — Entries`,data:logs.filter(l=>l.actId===a.id)})}
                            onMouseEnter={e=>e.currentTarget.style.background="#fffbeb"}
                            onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"#fff":"#fafbfc"}>
                            <TD><div style={{fontWeight:700,fontSize:12}}>{a.name}</div><div style={{fontSize:10,color:"#9ca3af"}}>{a.ticketNo||a.jira}</div></TD>
                            <TD><TPill t={a.team}/></TD>
                            <TD><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{issues.map(iss=><span key={iss} style={{fontSize:10,background:"#fff7ed",color:"#c2410c",padding:"2px 6px",borderRadius:8,fontWeight:600}}>{iss}</span>)}</div></TD>
                            <TD><SPill s={a.status}/></TD>
                            <TD s={{fontWeight:600}}>{fmtM(a.estMins)}</TD>
                            <TD s={{color:"#1a56db",fontWeight:700}}>{fmtM(a.logged)}</TD>
                            <TD><span style={{fontWeight:700,color:a.pct>100?"#dc2626":a.pct>75?"#d97706":"#374151"}}>{a.pct}%</span></TD>
                            <TD s={{fontSize:11,color:a.isStale?"#dc2626":"#6b7280"}}>{a.isStale?`${a.daysStale}d ago`:"recent"}</TD>
                            <TD><span style={{fontSize:11,background:riskBg(risk),color:riskColor(risk),padding:"3px 9px",borderRadius:10,fontWeight:700}}>{risk}</span></TD>
                          </tr>
                        );
                      })
                  }
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    );
  };

  // ════════════════════════════════════════════════════════════════════
  //  PAGE: EFFORT HEATMAP
  // ════════════════════════════════════════════════════════════════════
  const PageProdHeatmap = () => {
    const { heatMap, heatDays, memberStats, actStats } = prodData;
    const [view, setView] = React.useState("heatmap");
    const maxCell = Math.max(...heatMap.flatMap(r=>r.cells.map(c=>c.mins)),1);
    const heatCol = (mins) => {
      if(!mins) return "#f8fafc";
      const p = mins/maxCell;
      if(p>0.8) return "#1e40af";
      if(p>0.6) return "#3b82f6";
      if(p>0.4) return "#60a5fa";
      if(p>0.2) return "#93c5fd";
      return "#dbeafe";
    };

    return (
      <div>
        <div style={{marginBottom:18}}>
          <div style={{fontSize:20,fontWeight:800,color:"#0f172a"}}>🔥 Effort Heatmap</div>
          <div style={{fontSize:12,color:"#6b7280",marginTop:3}}>Daily effort distribution across members and activities · Mar 3–14</div>
        </div>

        <Tabs tabs={[{id:"heatmap",label:"👤 Member × Day"},{id:"actmap",label:"📋 Activity × Day"}]} active={view} onChange={setView}/>

        {view==="heatmap" && (
          <Card style={{marginTop:14,padding:0,overflow:"hidden"}}>
            <div style={{padding:"14px 18px 10px",borderBottom:"1px solid #f1f5f9"}}>
              <div style={{fontWeight:700,fontSize:14,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2}}>Member Daily Effort</div>
              <div style={{fontSize:11,color:"#6b7280",marginTop:2}}>Each cell = minutes logged that day. Click a cell to see entries.</div>
              {/* Legend */}
              <div style={{display:"flex",alignItems:"center",gap:6,marginTop:8}}>
                <span style={{fontSize:10,color:"#9ca3af"}}>Less</span>
                {["#f8fafc","#dbeafe","#93c5fd","#60a5fa","#3b82f6","#1e40af"].map(c=>(
                  <div key={c} style={{width:18,height:18,borderRadius:3,background:c,border:"1px solid #e5e7eb"}}/>
                ))}
                <span style={{fontSize:10,color:"#9ca3af"}}>More</span>
              </div>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{borderCollapse:"collapse",fontSize:12,minWidth:700}}>
                <thead>
                  <tr>
                    <th style={{padding:"8px 14px",textAlign:"left",fontSize:11,fontWeight:700,color:"#6b7280",background:"#f7f9fc",position:"sticky",left:0,zIndex:5,minWidth:140,borderBottom:"1px solid #dde3ed"}}>Member</th>
                    {heatDays.map(d=><th key={d} style={{padding:"8px 8px",textAlign:"center",fontSize:10,fontWeight:700,color:"#6b7280",background:"#f7f9fc",whiteSpace:"nowrap",borderBottom:"1px solid #dde3ed"}}>{d}</th>)}
                    <th style={{padding:"8px 10px",textAlign:"right",fontSize:10,fontWeight:700,color:"#6b7280",background:"#f7f9fc",borderBottom:"1px solid #dde3ed"}}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {heatMap.map((row,ri)=>{
                    const total = row.cells.reduce((s,c)=>s+c.mins,0);
                    const mStat = memberStats.find(m=>m.id===row.member.id);
                    return (
                      <tr key={row.member.id} style={{borderBottom:"1px solid #f1f5f9"}}>
                        <td style={{padding:"6px 14px",position:"sticky",left:0,background:ri%2===0?"#fff":"#fafbfc",zIndex:2}}>
                          <div style={{display:"flex",alignItems:"center",gap:7}}>
                            <div style={{width:24,height:24,borderRadius:"50%",background:`${tCol(row.member.team)}22`,color:tCol(row.member.team),display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,flexShrink:0}}>{row.member.name.split(" ").map(n=>n[0]).join("")}</div>
                            <div>
                              <div style={{fontWeight:700,color:"#0f172a",fontSize:12}}>{row.member.name.split(" ")[0]}</div>
                              <div style={{fontSize:9,color:"#9ca3af"}}>{row.member.team}</div>
                            </div>
                            {mStat?.isIdle && <span style={{fontSize:9,background:"#f5f3ff",color:"#7c3aed",padding:"1px 5px",borderRadius:8,fontWeight:700}}>Idle</span>}
                          </div>
                        </td>
                        {row.cells.map(cell=>(
                          <td key={cell.date} onClick={()=>cell.mins>0&&setDashDrill({type:"logs",label:`${row.member.name} · ${cell.date}`,data:logs.filter(l=>l.userId===row.member.id&&l.date===cell.date)})}
                            style={{padding:"4px 6px",textAlign:"center",cursor:cell.mins>0?"pointer":"default",background:ri%2===0?"#fff":"#fafbfc"}}>
                            <div style={{width:42,height:38,borderRadius:6,background:heatCol(cell.mins),display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",margin:"auto",border:"1px solid rgba(255,255,255,.4)",transition:"transform .15s,box-shadow .15s"}}
                              onMouseEnter={e=>{if(cell.mins>0){e.currentTarget.style.transform="scale(1.18)";e.currentTarget.style.boxShadow="0 4px 12px rgba(59,130,246,.4)";}}}
                              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
                              {cell.mins>0 && <>
                                <div style={{fontSize:10,fontWeight:800,color:cell.mins/maxCell>.4?"#fff":"#1e40af"}}>{Math.round(cell.mins/60)}h</div>
                                <div style={{fontSize:7,color:cell.mins/maxCell>.4?"rgba(255,255,255,.8)":"#6b7280"}}>{cell.mins}m</div>
                              </>}
                            </div>
                          </td>
                        ))}
                        <td style={{padding:"6px 10px",textAlign:"right",background:ri%2===0?"#fff":"#fafbfc"}}>
                          <span style={{fontWeight:700,color:"#1a56db",fontSize:13}}>{fmtM(total)}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {view==="actmap" && (
          <Card style={{marginTop:14}}>
            <div style={{fontWeight:700,fontSize:14,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2,marginBottom:4}}>Activity Effort Distribution</div>
            <div style={{fontSize:11,color:"#6b7280",marginBottom:14}}>Hours logged per activity over the last 10 working days · click bar for entries</div>
            {[...actStats].filter(a=>a.logged>0).sort((a,b)=>b.logged-a.logged).slice(0,12).map(a=>{
              const maxH = Math.max(...actStats.map(x=>x.logged),1);
              const col = tCol(a.team);
              return (
                <div key={a.id} onClick={()=>setDashDrill({type:"logs",label:`${a.name} — Entries`,data:logs.filter(l=>l.actId===a.id)})}
                  style={{display:"flex",alignItems:"center",gap:10,marginBottom:9,cursor:"pointer",padding:"4px 6px",borderRadius:7,transition:"background .1s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#f0f9ff"}
                  onMouseLeave={e=>e.currentTarget.style.background=""}>
                  <div style={{minWidth:170,fontSize:12}}>
                    <div style={{fontWeight:700,color:"#0f172a",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:165}}>{a.name}</div>
                    <div style={{fontSize:10,color:"#9ca3af"}}>{a.ticketNo||a.jira} · {a.team}</div>
                  </div>
                  <div style={{flex:1,height:16,background:"#f1f5f9",borderRadius:4,overflow:"hidden",position:"relative"}}>
                    <div style={{height:"100%",width:`${Math.round(a.logged/maxH*100)}%`,background:`linear-gradient(90deg,${col},${col}99)`,borderRadius:4}}/>
                    {a.isOverEst && <div style={{position:"absolute",right:4,top:"50%",transform:"translateY(-50%)",fontSize:9,fontWeight:700,color:"#dc2626"}}>OVER</div>}
                  </div>
                  <div style={{minWidth:60,textAlign:"right",fontWeight:700,color:a.isOverEst?"#dc2626":"#1a56db",fontSize:13}}>{fmtM(a.logged)}</div>
                  <NaturePill n={a.nature||"Proactive"}/>
                </div>
              );
            })}
          </Card>
        )}
      </div>
    );
  };

  // ════════════════════════════════════════════════════════════════════
  //  PAGE: SUGGESTIONS & ACTIONS
  // ════════════════════════════════════════════════════════════════════
  const PageProdSuggest = () => {
    const { memberStats, actStats, teamStats, reactOrgPct, incidentOrgPct } = prodData;
    const [expandedId, setExpandedId] = React.useState(null);

    // ── Generate smart suggestions from live data ──
    const suggestions = React.useMemo(()=>{
      const items = [];

      // 1. Reactive ratio
      if(reactOrgPct>50) items.push({id:"s1",priority:"Critical",category:"Work Balance",icon:"🔴",title:"High Reactive Workload",detail:`${reactOrgPct}% of all logged time is reactive. Industry best practice for infra teams is <30% reactive. Root-cause analysis and proactive maintenance scheduling is strongly recommended.`,action:"Review incident logs for repeat patterns. Schedule a Problem Management review. Create proactive maintenance activities to reduce firefighting.",kpi:`Target: <30% reactive (currently ${reactOrgPct}%)`,nav:"prod_flags"});
      else if(reactOrgPct>30) items.push({id:"s2",priority:"High",category:"Work Balance",icon:"⚡",title:"Reactive Work Slightly Elevated",detail:`${reactOrgPct}% reactive time is above the 30% industry benchmark. Consider shifting recurring reactive tasks into scheduled BAU activities.`,action:"Identify the top 3 reactive activities in the last 30 days and convert them to planned BAU tickets.",kpi:`Target: <30% reactive (currently ${reactOrgPct}%)`,nav:"prod_flags"});

      // 2. Incident ratio
      if(incidentOrgPct>30) items.push({id:"s3",priority:"Critical",category:"Incident Management",icon:"🚨",title:"Excessive Incident Time",detail:`${incidentOrgPct}% of all time is spent on incidents. This signals systemic instability. ITIL best practice recommends <15% incident time for mature infra teams.`,action:"Implement Problem Management process. Run Root Cause Analysis on top 5 incidents. Publish a Known Error Database (KEDB).",kpi:`Target: <15% incident time (currently ${incidentOrgPct}%)`,nav:"prod_heatmap"});

      // 3. Idle members
      const idleMembers = memberStats.filter(m=>m.isIdle);
      if(idleMembers.length>0) items.push({id:"s4",priority:"High",category:"Resource Utilisation",icon:"💤",title:`${idleMembers.length} Member${idleMembers.length>1?"s":""} Under-utilised`,detail:`${idleMembers.map(m=>m.name).join(", ")} logged <50% of available capacity. Under-utilisation may indicate unclear ownership, blocked tasks, or poor activity coverage.`,action:"Assign open activities to under-utilised members. Review if activity backlog is up to date. Conduct 1:1 to uncover blockers.",kpi:"Target: 65–85% utilisation per member",nav:"prod_flags"});

      // 4. Overloaded members
      const overloaded = memberStats.filter(m=>m.isOverloaded);
      if(overloaded.length>0) items.push({id:"s5",priority:"High",category:"Resource Utilisation",icon:"🔥",title:`${overloaded.length} Member${overloaded.length>1?"s":""} Overloaded`,detail:`${overloaded.map(m=>m.name).join(", ")} exceeded 90% utilisation. Sustained overloading leads to burnout and quality degradation.`,action:"Redistribute activities. Review if any BAU tasks can be automated or delegated. Check if overtime is being worked silently.",kpi:"Target: <85% peak utilisation",nav:"prod_flags"});

      // 5. Stale activities
      const staleActs = actStats.filter(a=>a.isStale);
      if(staleActs.length>0) items.push({id:"s6",priority:"Medium",category:"Activity Governance",icon:"📋",title:`${staleActs.length} Stale Active Activit${staleActs.length>1?"ies":"y"}`,detail:`Active activities with no time logged for 4+ days: ${staleActs.map(a=>a.name).join("; ")}. Stale activities distort utilisation metrics and indicate planning gaps.`,action:"Manager to review each stale activity. Either close/defer or re-assign with a clear owner and target date.",kpi:"Target: 0 active activities with >3 day logging gap",nav:"prod_flags"});

      // 6. Over-estimate activities
      const overEst = actStats.filter(a=>a.isOverEst);
      if(overEst.length>0) items.push({id:"s7",priority:"Medium",category:"Estimation Accuracy",icon:"📈",title:`${overEst.length} Activit${overEst.length>1?"ies":"y"} Exceeding Estimate`,detail:`${overEst.map(a=>a.name).join(", ")} have exceeded original time estimates. Poor estimation leads to capacity planning failures and missed commitments.`,action:"Run a retrospective on over-estimated activities. Update estimation baselines. Consider using reference class forecasting for similar future tasks.",kpi:"Target: <10% of activities over estimate by >20%",nav:"bandwidth"});

      // 7. Blocked activities
      const blocked = actStats.filter(a=>a.isBlocked);
      if(blocked.length>0) items.push({id:"s8",priority:"Medium",category:"Delivery Flow",icon:"🚧",title:`${blocked.length} Blocked Activit${blocked.length>1?"ies":"y"}`,detail:`${blocked.map(a=>a.name).join(", ")} are blocked. Each blocked activity ties up capacity and delays delivery. DORA metrics show blocked work is a key lead-time killer.`,action:"Escalate dependencies. Assign a dedicated owner for each blocker. Run a weekly 'blocked items' standup to clear impediments faster.",kpi:"Target: 0 blocked activities >2 days",nav:"prod_flags"});

      // 8. Reactive-heavy members
      const reactHeavy = memberStats.filter(m=>m.isReactiveHeavy);
      if(reactHeavy.length>0) items.push({id:"s9",priority:"Medium",category:"Work Balance",icon:"🎯",title:`${reactHeavy.length} Member${reactHeavy.length>1?"s":""} Reactive-Heavy`,detail:`${reactHeavy.map(m=>m.name).join(", ")} are spending >60% of their time on reactive work. This limits strategic/proactive contribution.`,action:"Protect at least 40% of each member's time for proactive/project work. Use time-boxing in weekly sprint planning.",kpi:"Target: <40% reactive per member",nav:"prod_flags"});

      // 9. No-log streaks
      const staleMembers = memberStats.filter(m=>m.isStale);
      if(staleMembers.length>0) items.push({id:"s10",priority:"Low",category:"Time Tracking Compliance",icon:"📝",title:`${staleMembers.length} Member${staleMembers.length>1?"s":""} Not Logging Regularly`,detail:`${staleMembers.map(m=>m.name).join(", ")} have not logged time in 3+ days. Incomplete time tracking makes capacity planning and performance reporting unreliable.`,action:"Send reminder to log daily. Manager to review in next 1:1. Consider setting a daily 5-min log-time reminder at end of workday.",kpi:"Target: 100% members log at least once every 2 business days",nav:"timelog"});

      // 10. Best practice: automation recommendation
      const bauPct = prodData.scopeLogs ? Math.round(prodData.scopeLogs.filter(l=>l.type==="BAU").reduce((s,l)=>s+l.mins,0)/Math.max(prodData.totalLogged,1)*100) : 0;
      if(bauPct>40) items.push({id:"s11",priority:"Low",category:"Automation Opportunity",icon:"🤖",title:"High BAU Volume — Automation Candidate",detail:`${bauPct}% of logged time is BAU work. A significant BAU proportion often indicates manual repetitive tasks that could be automated (monitoring scripts, patching pipelines, backup validation).`,action:"Audit top 5 BAU activities by hours. Identify automation candidates. Assign an Automation & Scripting sprint to reduce recurring manual work by 30%.",kpi:`Target: BAU <30% of total effort (currently ${bauPct}%)`,nav:"activities"});

      return items;
    },[memberStats, actStats, reactOrgPct, incidentOrgPct]);

    const priorityOrder = {Critical:0,High:1,Medium:2,Low:3};
    const sorted = [...suggestions].sort((a,b)=>priorityOrder[a.priority]-priorityOrder[b.priority]);
    const riskColor = (p) => p==="Critical"?"#dc2626":p==="High"?"#ea580c":p==="Medium"?"#d97706":"#6b7280";
    const riskBg    = (p) => p==="Critical"?"#fef2f2":p==="High"?"#fff7ed":p==="Medium"?"#fffbeb":"#f7f9fc";

    return (
      <div>
        <div style={{marginBottom:18}}>
          <div style={{fontSize:20,fontWeight:800,color:"#0f172a"}}>💡 Suggestions & Actions</div>
          <div style={{fontSize:12,color:"#6b7280",marginTop:3}}>AI-generated recommendations based on your live data · ITIL & DORA aligned</div>
        </div>

        {/* Stats bar */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18}}>
          {["Critical","High","Medium","Low"].map(p=>{
            const cnt = sorted.filter(s=>s.priority===p).length;
            return (
              <Card key={p} style={{padding:12,borderLeft:`4px solid ${riskColor(p)}`}}>
                <div style={{fontSize:10,fontWeight:700,color:riskColor(p),textTransform:"uppercase",letterSpacing:.8}}>{p}</div>
                <div style={{fontSize:28,fontWeight:800,color:riskColor(p),lineHeight:1.1}}>{cnt}</div>
                <div style={{fontSize:10,color:"#9ca3af"}}>suggestion{cnt!==1?"s":""}</div>
              </Card>
            );
          })}
        </div>

        {sorted.length===0
          ? <Card style={{textAlign:"center",padding:60}}>
              <div style={{fontSize:40,marginBottom:12}}>🏆</div>
              <div style={{fontSize:18,fontWeight:800,color:"#059669"}}>All Good!</div>
              <div style={{fontSize:13,color:"#6b7280",marginTop:6}}>No productivity flags detected. Keep up the great work!</div>
            </Card>
          : sorted.map(s=>(
            <div key={s.id} style={{marginBottom:12}}>
              <div onClick={()=>setExpandedId(expandedId===s.id?null:s.id)}
                style={{background:"#fff",border:`1px solid ${riskColor(s.priority)}25`,borderLeft:`4px solid ${riskColor(s.priority)}`,borderRadius:12,padding:"15px 20px",cursor:"pointer",transition:"all .18s",display:"flex",alignItems:"flex-start",gap:14,boxShadow:"0 1px 3px rgba(15,23,42,.04)"}}
                onMouseEnter={e=>e.currentTarget.style.boxShadow=`0 4px 16px ${riskColor(s.priority)}20`}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow="";e.currentTarget.style.transform="";}}>
                <span style={{fontSize:22,flexShrink:0,marginTop:1}}>{s.icon}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4,flexWrap:"wrap"}}>
                    <span style={{fontWeight:800,fontSize:14,color:"#0f172a"}}>{s.title}</span>
                    <span style={{fontSize:11,background:riskBg(s.priority),color:riskColor(s.priority),padding:"2px 9px",borderRadius:10,fontWeight:700,flexShrink:0}}>{s.priority}</span>
                    <span style={{fontSize:11,background:"#f1f5f9",color:"#6b7280",padding:"2px 8px",borderRadius:10,flexShrink:0}}>{s.category}</span>
                  </div>
                  <div style={{fontSize:12,color:"#6b7280",lineHeight:1.5}}>{s.detail}</div>
                  {expandedId===s.id && (
                    <div style={{marginTop:12,padding:"12px 14px",background:riskBg(s.priority),borderRadius:8}}>
                      <div style={{fontSize:11,fontWeight:700,color:riskColor(s.priority),marginBottom:6}}>📌 Recommended Action</div>
                      <div style={{fontSize:12,color:"#374151",lineHeight:1.6,marginBottom:10}}>{s.action}</div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                        <div style={{fontSize:11,color:"#6b7280",background:"#fff",padding:"4px 10px",borderRadius:7,border:"1px solid #e5e7eb"}}>
                          📊 <strong>KPI Target:</strong> {s.kpi}
                        </div>
                        <button onClick={e=>{e.stopPropagation();goPage(s.nav);}}
                          style={{padding:"6px 16px",borderRadius:8,background:riskColor(s.priority),color:"#fff",border:"none",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                          View Data →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <span style={{fontSize:14,color:"#9ca3af",flexShrink:0,marginTop:2}}>{expandedId===s.id?"▲":"▼"}</span>
              </div>
            </div>
          ))
        }
      </div>
    );
  };


  // ════════════════════════════════════════════════════════════════════
  //  PAGE: DATA CONNECT — UPLOAD TICKETS (Excel)
  // ════════════════════════════════════════════════════════════════════
  const PageDCUpload = () => {
    const [uploadState, setUploadState]     = React.useState("idle"); // idle|parsing|preview|importing|done|error
    const [fileName,    setFileName]        = React.useState("");
    const [rawRows,     setRawRows]         = React.useState([]);      // parsed excel rows
    const [mappings,    setMappings]        = React.useState({});      // colName → fieldKey
    const [preview,     setPreview]         = React.useState([]);      // mapped preview rows
    const [importResult,setImportResult]    = React.useState(null);    // {created,updated,skipped}
    const [dragOver,    setDragOver]        = React.useState(false);
    const fileRef = React.useRef();

    const FIELD_DEFS = [
      {key:"ticketNo",   label:"Ticket Number",  required:true,  hint:"CHG-xxxx / INC-xxxx / REQ-xxxx"},
      {key:"member",     label:"Assignee",       required:true,  hint:"Full name of team member"},
      {key:"team",       label:"Team",           required:false, hint:"Network / Security / Compute…"},
      {key:"activity",   label:"Activity / Title",required:true, hint:"Short description of work"},
      {key:"mins",       label:"Time Spent (min)",required:true, hint:"Numeric minutes or hours (h suffix)"},
      {key:"date",       label:"Date",           required:false, hint:"YYYY-MM-DD or DD/MM/YYYY"},
      {key:"type",       label:"Ticket Type",    required:false, hint:"Incident / Change / Request / BAU"},
      {key:"nature",     label:"Work Nature",    required:false, hint:"Proactive / Reactive"},
      {key:"cat",        label:"Category",       required:false, hint:"Infrastructure Build / Maintenance…"},
      {key:"notes",      label:"Notes / Desc",   required:false, hint:"Any additional context"},
    ];

    // ── Parse mins: accepts "90", "1.5h", "2h 30m" ──
    const parseMins = (v="") => {
      const s = String(v).trim().toLowerCase();
      if(!s) return 0;
      if(s.includes("h") && s.includes("m")) {
        const [h,m] = s.split("h"); return Math.round(parseFloat(h)*60 + parseFloat(m));
      }
      if(s.endsWith("h")) return Math.round(parseFloat(s)*60);
      return Math.round(parseFloat(s)) || 0;
    };

    // ── Parse date ──
    const parseDate = (v="") => {
      const s = String(v).trim();
      if(!s) return today();
      if(/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
      if(/^\d{2}\/\d{2}\/\d{4}$/.test(s)) { const [d,m,y]=s.split("/"); return `${y}-${m}-${d}`; }
      if(/^\d{2}-\d{2}-\d{4}$/.test(s)) { const [d,m,y]=s.split("-"); return `${y}-${m}-${d}`; }
      // Excel serial number
      const n = parseInt(s); if(n>40000&&n<50000){ const d=new Date(1899,11,30); d.setDate(d.getDate()+n); return d.toISOString().slice(0,10); }
      return today();
    };

    // ── Normalise type ──
    const normaliseType = (v="") => {
      const s = String(v).toLowerCase();
      if(s.includes("inc")) return "Incident";
      if(s.includes("chg")||s.includes("change")) return "Change";
      if(s.includes("req")||s.includes("request")||s.includes("sr")) return "BAU";
      if(s.includes("proj")) return "Project";
      return "BAU";
    };

    // ── Handle file selection (real FileReader + SheetJS-style CSV fallback) ──
    const handleFile = (file) => {
      if(!file) return;
      setFileName(file.name);
      setUploadState("parsing");
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target.result;
          // Detect delimiter
          const lines = text.split(/\r?\n/).filter(l=>l.trim());
          const delim = lines[0].includes("\t") ? "\t" : ",";
          const headers = lines[0].split(delim).map(h=>h.replace(/^"|"$/g,"").trim());
          const rows = lines.slice(1).filter(l=>l.trim()).map(line=>{
            const vals = line.split(delim).map(v=>v.replace(/^"|"$/g,"").trim());
            const obj={};
            headers.forEach((h,i)=>{ obj[h]=vals[i]||""; });
            return obj;
          });
          setRawRows(rows);
          // Auto-map columns
          const autoMap={};
          const matchers = {
            ticketNo:  /ticket|id|number|ref|key|issue/i,
            member:    /assign|member|name|owner|engineer|analyst/i,
            team:      /team|group|dept|squad/i,
            activity:  /title|summary|subject|activity|description|work/i,
            mins:      /time|hours|mins|spent|effort|duration/i,
            date:      /date|created|updated|resolved|closed/i,
            type:      /type|kind|category|class/i,
            nature:    /nature|mode|reactive|proactive/i,
            cat:       /category|cat|service|worktype/i,
            notes:     /notes|comment|detail|remark|descr/i,
          };
          headers.forEach(h=>{
            Object.entries(matchers).forEach(([k,re])=>{ if(!autoMap[k]&&re.test(h)) autoMap[k]=h; });
          });
          setMappings(autoMap);
          setUploadState("preview");
        } catch(err) {
          setUploadState("error");
        }
      };
      reader.readAsText(file);
    };

    // ── Build preview from mappings ──
    const buildPreview = React.useMemo(()=>{
      if(!rawRows.length||!Object.keys(mappings).length) return [];
      return rawRows.slice(0,8).map((r,i)=>({
        _rowNum: i+2,
        ticketNo: r[mappings.ticketNo]||"",
        member:   r[mappings.member]||"",
        team:     r[mappings.team]||"",
        activity: r[mappings.activity]||"Imported Ticket",
        mins:     parseMins(r[mappings.mins]),
        date:     parseDate(r[mappings.date]),
        type:     normaliseType(r[mappings.type]),
        nature:   /react/i.test(r[mappings.nature]||"")?"Reactive":"Proactive",
        cat:      r[mappings.cat]||"Maintenance",
        notes:    r[mappings.notes]||"",
      }));
    },[rawRows, mappings]);

    React.useEffect(()=>{ setPreview(buildPreview); },[buildPreview]);

    // ── Execute import ──
    const runImport = () => {
      setUploadState("importing");
      setTimeout(()=>{
        let created=0, updated=0, skipped=0;
        const allRows = rawRows.map(r=>({
          ticketNo: r[mappings.ticketNo]||"",
          member:   r[mappings.member]||"",
          team:     r[mappings.team]||"",
          activity: r[mappings.activity]||"Imported Ticket",
          mins:     parseMins(r[mappings.mins]),
          date:     parseDate(r[mappings.date]),
          type:     normaliseType(r[mappings.type]),
          nature:   /react/i.test(r[mappings.nature]||"")?"Reactive":"Proactive",
          cat:      r[mappings.cat]||"Maintenance",
          notes:    r[mappings.notes]||"",
        }));

        const newLogs=[];
        allRows.forEach(row=>{
          if(!row.member||row.mins<1){ skipped++; return; }
          // Find matching user (case-insensitive first name or full name)
          const matchUser = allUsers.find(u=>
            u.name.toLowerCase()===row.member.toLowerCase()||
            u.name.toLowerCase().startsWith(row.member.toLowerCase().split(" ")[0])
          );
          if(!matchUser){ skipped++; return; }
          // Find or create a matching activity by ticketNo
          let act = acts.find(a=>a.ticketNo&&a.ticketNo===row.ticketNo);
          if(!act){
            const newAct={id:uid("ACT"),name:row.activity,team:matchUser.team||row.team||"Network",
              type:row.type,cat:row.cat,estMins:row.mins*2,priority:"Medium",status:"Active",
              nature:row.nature,workNature:row.type==="Incident"?"Incident":row.type==="Change"?"Change":"Request",
              ticketNo:row.ticketNo,jira:row.ticketNo,date:row.date,desc:row.notes};
            setActs(p=>[...p,newAct]);
            act=newAct; created++;
          } else { updated++; }
          newLogs.push({id:uid("TL"),date:row.date,userId:matchUser.id,member:matchUser.name,
            team:matchUser.team,actId:act.id,activity:act.name,type:row.type,cat:row.cat,
            mins:row.mins,notes:row.notes});
        });
        setLogs(p=>[...newLogs,...p]);
        setImportResult({created, updated, skipped, total:allRows.length, users: [...new Set(newLogs.map(l=>l.member))]});
        setUploadState("done");
      }, 900);
    };

    const columns = rawRows.length ? Object.keys(rawRows[0]) : [];

    return (
      <div>
        <div style={{marginBottom:20}}>
          <div style={{fontSize:20,fontWeight:800,color:"#0f172a"}}>📤 Upload Tickets</div>
          <div style={{fontSize:12,color:"#6b7280",marginTop:3}}>
            Import bandwidth data from JIRA, HP Service Manager, OpenText SMAX, or any CSV export · CSV or TSV
          </div>
        </div>

        {/* How it works banner */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          {[
            {n:1,icon:"📊",title:"Export from tool",desc:"Download CSV from JIRA, HP Service Manager, OpenText SMAX, or Power BI"},
            {n:2,icon:"📤",title:"Upload here",desc:"Drag & drop your CSV file. Headers are auto-detected."},
            {n:3,icon:"🔀",title:"Map columns",desc:"Review and adjust field mappings to ISMS fields"},
            {n:4,icon:"✅",title:"Import data",desc:"Time logs & activities are created automatically per member"},
          ].map(s=>(
            <div key={s.n} style={{background:"#fff",border:"1px solid #dde3ed",borderRadius:10,padding:"14px 16px",display:"flex",gap:12,alignItems:"flex-start"}}>
              <div style={{width:30,height:30,borderRadius:"50%",background:"linear-gradient(135deg,#1a56db,#0ea5e9)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:13,flexShrink:0,boxShadow:"0 2px 8px rgba(26,86,219,.3)"}}>{s.n}</div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:"#0f172a",marginBottom:3}}>{s.icon} {s.title}</div>
                <div style={{fontSize:11,color:"#6b7280",lineHeight:1.5}}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── STEP 1: Drop zone ── */}
        {(uploadState==="idle"||uploadState==="error") && (
          <Card style={{marginBottom:16}}>
            <div style={{fontWeight:700,fontSize:14,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2,marginBottom:14}}>Step 1 — Select or Drop File</div>
            <div onDragOver={e=>{e.preventDefault();setDragOver(true);}} onDragLeave={()=>setDragOver(false)}
              onDrop={e=>{e.preventDefault();setDragOver(false);const f=e.dataTransfer.files[0];if(f)handleFile(f);}}
              onClick={()=>fileRef.current.click()}
              style={{border:`2px dashed ${dragOver?"#1a56db":"#d4dde8"}`,borderRadius:14,padding:"52px 24px",
                textAlign:"center",cursor:"pointer",background:dragOver?"#eff6ff":"#f7f9fc",transition:"all .2s"}}>
              <div style={{fontSize:40,marginBottom:12}}>📂</div>
              <div style={{fontSize:15,fontWeight:700,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2,marginBottom:6}}>Drop your CSV / TSV file here</div>
              <div style={{fontSize:12,color:"#6b7280",marginBottom:14}}>or click to browse · Excel exports saved as CSV work perfectly</div>
              <button style={{padding:"8px 22px",borderRadius:8,background:"#1a56db",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>Browse File</button>
              <input ref={fileRef} type="file" accept=".csv,.tsv,.txt" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>
            </div>
            {uploadState==="error" && <InfoBanner color="#991b1b" bg="#fef2f2" border="#fca5a5" icon="❌" style={{marginTop:12}}>Could not parse file. Ensure it is saved as CSV (comma or tab separated).</InfoBanner>}

            {/* Supported tools */}
            <div style={{marginTop:20}}>
              <div style={{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Supported Export Formats</div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                {[
                  {name:"JIRA",              color:"#0052cc",hint:"Issues → Export Excel CSV"},
                  {name:"Power BI",           color:"#f2c811",hint:"Dataset export / push API"},
                  {name:"HP Service Manager", color:"#1d6fa4",hint:"Reports → Incident/Change CSV"},
                  {name:"OpenText SMAX",      color:"#6d28d9",hint:"Reports → Export CSV"},
                  {name:"Any CSV / TSV",      color:"#6b7280",hint:"Any comma/tab delimited file"},
                ].map(t=>(
                  <div key={t.name} style={{display:"flex",alignItems:"center",gap:7,background:"#f7f9fc",border:"1px solid #dde3ed",borderRadius:8,padding:"6px 12px"}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:t.color,flexShrink:0}}/>
                    <div>
                      <div style={{fontSize:12,fontWeight:700,color:"#374151"}}>{t.name}</div>
                      <div style={{fontSize:10,color:"#9ca3af"}}>{t.hint}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Field reference */}
            <div style={{marginTop:20}}>
              <div style={{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Expected Fields (auto-detected from headers)</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:7}}>
                {FIELD_DEFS.map(f=>(
                  <div key={f.key} style={{display:"flex",gap:8,alignItems:"flex-start",padding:"7px 10px",background:"#f7f9fc",borderRadius:7,border:"1px solid #e5e7eb"}}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:f.required?"#1a56db":"#9ca3af",marginTop:5,flexShrink:0}}/>
                    <div>
                      <div style={{fontSize:12,fontWeight:700,color:f.required?"#0f172a":"#6b7280"}}>{f.label}{f.required&&<span style={{color:"#dc2626"}}> *</span>}</div>
                      <div style={{fontSize:10,color:"#9ca3af"}}>{f.hint}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* ── Parsing indicator ── */}
        {uploadState==="parsing" && (
          <Card style={{textAlign:"center",padding:60}}>
            <div style={{fontSize:32,marginBottom:12}}>⏳</div>
            <div style={{fontSize:15,fontWeight:700,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2}}>Parsing {fileName}…</div>
            <div style={{fontSize:12,color:"#6b7280",marginTop:6}}>Detecting headers and auto-mapping fields</div>
          </Card>
        )}

        {/* ── STEP 2: Column mapping + preview ── */}
        {(uploadState==="preview"||uploadState==="importing") && (
          <>
            <Card style={{marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <div>
                  <div style={{fontWeight:700,fontSize:14,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2}}>Step 2 — Map Columns</div>
                  <div style={{fontSize:11,color:"#6b7280",marginTop:2}}>{rawRows.length} rows in <strong>{fileName}</strong> · {columns.length} columns detected · Review auto-mapping below</div>
                </div>
                <button onClick={()=>{setUploadState("idle");setRawRows([]);setMappings({});}}
                  style={{padding:"6px 14px",borderRadius:8,background:"#fff",border:"1px solid #c8d2e0",color:"#374151",fontSize:12,fontWeight:600,cursor:"pointer"}}>← Change File</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:10}}>
                {FIELD_DEFS.map(f=>(
                  <div key={f.key} style={{background:mappings[f.key]?"#f0fdf4":"#fafbfc",border:`1px solid ${mappings[f.key]?"#86efac":"#e5e7eb"}`,borderRadius:8,padding:"10px 12px"}}>
                    <div style={{fontSize:11,fontWeight:700,color:mappings[f.key]?"#166534":"#6b7280",marginBottom:5}}>
                      {f.label}{f.required&&<span style={{color:"#dc2626"}}> *</span>}
                      {mappings[f.key]&&<span style={{fontWeight:400,color:"#4ade80",marginLeft:6}}>✓ mapped</span>}
                    </div>
                    <select value={mappings[f.key]||""} onChange={e=>setMappings(p=>({...p,[f.key]:e.target.value||undefined}))}
                      style={{width:"100%",padding:"5px 8px",borderRadius:6,border:"1px solid #c8d2e0",fontSize:12,background:"#fff"}}>
                      <option value="">— not mapped —</option>
                      {columns.map(c=><option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </Card>

            {/* Preview table */}
            {preview.length>0 && (
              <Card style={{marginBottom:14,padding:0,overflow:"hidden"}}>
                <div style={{padding:"12px 18px",borderBottom:"1px solid #f1f5f9"}}>
                  <div style={{fontWeight:700,fontSize:14,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2}}>Step 3 — Preview (first 8 rows)</div>
                  <div style={{fontSize:11,color:"#6b7280",marginTop:2}}>Verify mapping is correct before importing</div>
                </div>
                <div style={{overflowX:"auto"}}>
                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                    <thead><tr>
                      {["#","Ticket","Member","Team","Activity","Time","Date","Type","Nature","Category","Notes"].map(h=><TH key={h} c={h}/>)}
                    </tr></thead>
                    <tbody>
                      {preview.map((r,i)=>{
                        const matchUser = allUsers.find(u=>u.name.toLowerCase()===r.member.toLowerCase()||u.name.toLowerCase().startsWith(r.member.toLowerCase().split(" ")[0]));
                        return (
                          <tr key={i} style={{background:i%2===0?"#fff":"#fafbfc",borderBottom:"1px solid #f1f5f9"}}>
                            <TD s={{color:"#9ca3af",fontSize:11}}>{r._rowNum}</TD>
                            <TD><code style={{background:"#f1f5f9",padding:"2px 6px",borderRadius:4,fontSize:11}}>{r.ticketNo||"—"}</code></TD>
                            <TD>
                              <div style={{display:"flex",alignItems:"center",gap:6}}>
                                <div style={{width:22,height:22,borderRadius:"50%",background:matchUser?`${tCol(matchUser.team)}22`:"#fee2e2",color:matchUser?tCol(matchUser.team):"#dc2626",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,flexShrink:0}}>
                                  {r.member?r.member[0].toUpperCase():"?"}
                                </div>
                                <span style={{fontWeight:600,color:matchUser?"#0f172a":"#dc2626"}}>{r.member||"—"}{!matchUser&&<span style={{fontSize:9,color:"#dc2626"}}> ⚠ no match</span>}</span>
                              </div>
                            </TD>
                            <TD s={{fontSize:11}}>{r.team||"—"}</TD>
                            <TD s={{maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:600}}>{r.activity}</TD>
                            <TD s={{color:"#1a56db",fontWeight:700}}>{fmtM(r.mins)}</TD>
                            <TD s={{fontSize:11,color:"#6b7280"}}>{r.date}</TD>
                            <TD><span style={{fontSize:10,background:"#eff6ff",color:"#1a56db",padding:"2px 7px",borderRadius:8,fontWeight:600}}>{r.type}</span></TD>
                            <TD><NaturePill n={r.nature}/></TD>
                            <TD s={{fontSize:11,color:"#6b7280"}}>{r.cat}</TD>
                            <TD s={{fontSize:11,color:"#6b7280",maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.notes||"—"}</TD>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div style={{padding:"12px 18px",background:"#f7f9fc",borderTop:"1px solid #f1f5f9",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{fontSize:12,color:"#6b7280"}}>
                    Showing 8 of <strong>{rawRows.length}</strong> rows · Members not found in ISMS will be skipped
                  </div>
                  <button onClick={runImport} disabled={uploadState==="importing"}
                    style={{padding:"9px 28px",borderRadius:9,background:uploadState==="importing"?"#9ca3af":"linear-gradient(135deg,#1a56db,#0891b2)",color:"#fff",border:"none",fontWeight:800,fontSize:14,cursor:uploadState==="importing"?"not-allowed":"pointer",boxShadow:"0 3px 10px rgba(26,86,219,.3)"}}>
                    {uploadState==="importing"?"⏳ Importing…":"🚀 Import All "+rawRows.length+" Rows"}
                  </button>
                </div>
              </Card>
            )}
          </>
        )}

        {/* ── DONE ── */}
        {uploadState==="done" && importResult && (
          <Card>
            <div style={{textAlign:"center",padding:"20px 0 10px"}}>
              <div style={{fontSize:48,marginBottom:12}}>🎉</div>
              <div style={{fontSize:20,fontWeight:800,color:"#059669",marginBottom:6}}>Import Complete!</div>
              <div style={{fontSize:13,color:"#6b7280",marginBottom:24}}>Ticket data has been merged into ISMS — time logs and activities updated</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:24}}>
              {[
                {label:"Total Rows",   val:importResult.total,   icon:"📄",c:"#1a56db",bg:"#eff6ff"},
                {label:"Acts Created", val:importResult.created,  icon:"✅",c:"#059669",bg:"#f0fdf4"},
                {label:"Acts Updated", val:importResult.updated,  icon:"🔄",c:"#0891b2",bg:"#f0f9ff"},
                {label:"Skipped",      val:importResult.skipped,  icon:"⏭",c:"#9ca3af",bg:"#f7f9fc"},
              ].map(s=>(
                <div key={s.label} style={{background:s.bg,borderRadius:10,padding:"14px 16px",textAlign:"center"}}>
                  <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
                  <div style={{fontSize:26,fontWeight:800,color:s.c}}>{s.val}</div>
                  <div style={{fontSize:11,color:"#6b7280",marginTop:3}}>{s.label}</div>
                </div>
              ))}
            </div>
            {importResult.users.length>0 && (
              <div style={{marginBottom:20}}>
                <div style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:8}}>Members updated:</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {importResult.users.map(u=>{
                    const mu=allUsers.find(x=>x.name===u);
                    return <span key={u} style={{background:`${tCol(mu?.team||"Network")}20`,color:tCol(mu?.team||"Network"),padding:"4px 12px",borderRadius:20,fontWeight:700,fontSize:12}}>{u}</span>;
                  })}
                </div>
              </div>
            )}
            <div style={{display:"flex",gap:10,justifyContent:"center"}}>
              <button onClick={()=>{setUploadState("idle");setRawRows([]);setMappings({});setImportResult(null);setFileName("");}}
                style={{padding:"9px 22px",borderRadius:9,background:"#fff",border:"1px solid #c8d2e0",color:"#374151",fontWeight:700,fontSize:13,cursor:"pointer"}}>Upload Another File</button>
              <button onClick={()=>goPage("timelog")}
                style={{padding:"9px 22px",borderRadius:9,background:"linear-gradient(135deg,#1a56db,#0891b2)",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>View Time Log →</button>
              <button onClick={()=>goPage("bandwidth")}
                style={{padding:"9px 22px",borderRadius:9,background:"#059669",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>View Bandwidth →</button>
            </div>
          </Card>
        )}
      </div>
    );
  };

  // ════════════════════════════════════════════════════════════════════
  //  PAGE: DATA CONNECT — INTEGRATIONS
  // ════════════════════════════════════════════════════════════════════
  const PageDCIntegrations = () => {
    const [activeInt,  setActiveInt]  = React.useState(null); // tool id being configured
    const [configForm, setConfigForm] = React.useState({});
    const [connStatus, setConnStatus] = React.useState({});   // toolId → "connected"|"testing"|"error"
    const [syncLog,    setSyncLog]    = React.useState([]);
    const [tab,        setTab]        = React.useState("catalog");

    const INTEGRATIONS = [
      {
        id:"jira", name:"JIRA", vendor:"Atlassian",
        logo:"🟦", color:"#0052cc", bg:"#e8f0ff",
        desc:"Connect Atlassian JIRA to automatically pull issues, worklogs, and sprint data into ISMS time logs and activities. Supports both JIRA Cloud and JIRA Data Center (on-premise).",
        features:[
          "Sync issues & epics as ISMS Activities",
          "Import worklogs per issue as Time Log entries",
          "Map JIRA issue types → ISMS work types (Incident/Change/Request)",
          "Filter by project key, board, sprint, or label",
          "Bulk export via JIRA CSV and direct REST API sync",
          "Scheduled auto-sync configurable by hour",
          "JIRA Service Management (JSM) ticket support",
        ],
        fields:[
          {key:"baseUrl",   label:"JIRA Base URL",      placeholder:"https://yourcompany.atlassian.net",  type:"text",     hint:"Cloud: atlassian.net · DC: your internal JIRA URL"},
          {key:"email",     label:"Account Email",      placeholder:"admin@yourcompany.com",               type:"text"},
          {key:"apiToken",  label:"API Token",          placeholder:"Your JIRA API token",                 type:"password", hint:"Atlassian account → Security → API tokens"},
          {key:"project",   label:"Project Key(s)",     placeholder:"OPS, INFRA, NOC",                     type:"text",     hint:"Comma-separated JIRA project keys"},
          {key:"issueTypes",label:"Issue Types",        placeholder:"Bug, Task, Story, Incident",          type:"text",     hint:"Leave blank to sync all types"},
          {key:"syncHours", label:"Sync Interval (h)",  placeholder:"4",                                   type:"number",   hint:"0 = manual only"},
          {key:"mapTeam",   label:"Default Team",       placeholder:"Network",                             type:"select",   opts:["Network","Security","Compute","Cloud","Storage","Database"]},
          {key:"jsmQueue",  label:"JSM Queue ID (opt)", placeholder:"e.g. 12",                             type:"text",     hint:"ServiceManagement queue to pull SRs from"},
        ],
        exportGuide:[
          "In JIRA: Issues → Advanced search → Export → Export Excel CSV",
          "Recommended columns: Issue key, Summary, Assignee, Time Spent, Created, Issue Type, Priority, Status",
          "For JSM: Reports → Workload → Export to CSV",
          "Date format: DD/MMM/YY — ISMS auto-parses this on upload",
        ],
        docs:"https://developer.atlassian.com/cloud/jira/platform/basic-auth-for-rest-apis/",
        status:"primary",
      },
      {
        id:"powerbi", name:"Power BI", vendor:"Microsoft",
        logo:"📊", color:"#f2c811", color2:"#e8a000", bg:"#fffbeb",
        desc:"Publish ISMS bandwidth, utilisation, and productivity data to Microsoft Power BI for executive dashboards, trend analysis, and cross-system reporting. Push data via Power BI REST API or export datasets.",
        features:[
          "Push ISMS activity & time log data to Power BI datasets",
          "Pre-built ISMS report template (.pbix) for import",
          "Scheduled dataset refresh (hourly / daily)",
          "Executive KPI dashboard: utilisation, reactive ratio, SLA",
          "Cross-system joins: JIRA + ISMS + AD data in one report",
          "Row-level security mapped to ISMS roles",
          "Embed Power BI reports back inside ISMS (iframe)",
        ],
        fields:[
          {key:"tenantId",    label:"Azure Tenant ID",     placeholder:"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", type:"text",     hint:"Azure AD → App registrations → Directory (tenant) ID"},
          {key:"clientId",    label:"App Client ID",       placeholder:"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", type:"text",     hint:"Azure AD registered app for Power BI API access"},
          {key:"clientSecret",label:"Client Secret",       placeholder:"Your Azure app client secret",        type:"password", hint:"Azure AD → App → Certificates & secrets"},
          {key:"workspaceId", label:"Workspace ID",        placeholder:"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", type:"text",     hint:"Power BI workspace where datasets will be pushed"},
          {key:"datasetName", label:"Dataset Name",        placeholder:"ISMS_Bandwidth",                      type:"text",     hint:"Name for the pushed dataset in Power BI"},
          {key:"syncHours",   label:"Push Interval (h)",   placeholder:"6",                                   type:"number",   hint:"How often to push fresh data to Power BI"},
          {key:"embedUrl",    label:"Embed Report URL (opt)",placeholder:"https://app.powerbi.com/reportEmbed?...", type:"text",hint:"Paste embed URL to show report inside ISMS"},
        ],
        exportGuide:[
          "Download the ISMS Power BI Template (.pbix) and open in Power BI Desktop",
          "Connect the template to this ISMS instance URL as the data source",
          "Publish from Power BI Desktop to your workspace",
          "Or use Push Dataset mode: ISMS sends data directly via REST API on schedule",
          "Row-level security: map Power BI roles to Admin / Manager / Member",
        ],
        docs:"https://learn.microsoft.com/en-us/rest/api/power-bi/",
        status:"primary",
      },
      {
        id:"hpsm", name:"HP Service Manager", vendor:"Micro Focus / OpenText",
        logo:"🔷", color:"#1d6fa4", bg:"#e8f4fb",
        desc:"Connect HP Service Manager (HPSM / Micro Focus ITSM) to pull Incidents, Changes, and Service Requests. Supports both legacy HPSM REST and SOAP interfaces, as well as the newer OpenText ITSM REST API.",
        features:[
          "Pull Incidents, Changes, Problems, SRs from HPSM",
          "Map HPSM assignment groups to ISMS teams",
          "Import time tracking from ActualDuration field",
          "Support for HPSM 9.x REST API and legacy SOAP",
          "Integration with OpenText ITSM (post-Micro Focus acquisition)",
          "Certificate-based auth for on-premise deployments",
          "Filter by category, urgency, and assignment group",
        ],
        fields:[
          {key:"serverUrl",  label:"HPSM Server URL",    placeholder:"https://hpsm.yourcompany.com:13080",  type:"text",     hint:"Include port — typically 13080 (REST) or 443 (HTTPS)"},
          {key:"username",   label:"Username",           placeholder:"svc_isms_integration",                type:"text"},
          {key:"password",   label:"Password",           placeholder:"••••••••",                            type:"password", hint:"Use a dedicated service account with read permissions"},
          {key:"apiType",    label:"API Type",           placeholder:"REST",                                type:"select",   opts:["REST (HPSM 9.x+)","SOAP (legacy)","OpenText ITSM REST"]},
          {key:"modules",    label:"Modules to sync",    placeholder:"incident,change,request",             type:"text",     hint:"Comma-separated: incident, change, request, problem"},
          {key:"groupFilter",label:"Assignment Groups",  placeholder:"Infra-L2, NOC, Security-Ops",        type:"text",     hint:"Leave blank for all groups"},
          {key:"syncHours",  label:"Sync Interval (h)",  placeholder:"4",                                   type:"number"},
          {key:"certPath",   label:"SSL Certificate (opt)",placeholder:"/path/to/cert.pem",                type:"text",     hint:"Required for self-signed certs on on-premise HPSM"},
        ],
        exportGuide:[
          "In HPSM: Reports → Create Report → Incident / Change list",
          "Select columns: Incident ID, Title, Assignee, Assignment Group, Time Spent, Open Time, Category",
          "Export as CSV (Excel-compatible) from the report viewer",
          "For bulk exports: use HPSM Scheduled Report to email CSV daily",
          "For Changes: Change Management → My Changes → Export",
        ],
        docs:"https://docs.microfocus.com/itom/ITSM:2020.05/RESTAPI",
        status:"enterprise",
      },
      {
        id:"smax", name:"OpenText SMAX", vendor:"OpenText (Micro Focus)",
        logo:"🟣", color:"#6d28d9", bg:"#f5f3ff",
        desc:"Integrate OpenText SMAX (Service Management Automation X) — the AI-driven ITSM platform — to sync requests, incidents, changes, and time entries. SMAX uses a modern OData REST API with OAuth 2.0.",
        features:[
          "OAuth 2.0 / SAML authentication (enterprise-grade)",
          "Sync Requests, Incidents, Changes, Problems",
          "Import time tracking from SMAX time entries",
          "OData query filtering by group, category, phase",
          "Real-time webhook support for instant sync",
          "Map SMAX groups & roles to ISMS teams & members",
          "SLA and KPI data import for productivity overlay",
        ],
        fields:[
          {key:"baseUrl",      label:"SMAX Base URL",      placeholder:"https://smax.yourcompany.com",        type:"text",     hint:"Your SMAX tenant or on-premise URL"},
          {key:"tenantId",     label:"Tenant ID",          placeholder:"Your SMAX tenant ID",                 type:"text",     hint:"Found in SMAX Admin → Tenant settings"},
          {key:"clientId",     label:"OAuth Client ID",    placeholder:"isms_integration_client",             type:"text",     hint:"Register ISMS as OAuth client in SMAX → Administration"},
          {key:"clientSecret", label:"OAuth Client Secret",placeholder:"••••••••",                            type:"password"},
          {key:"modules",      label:"Modules to sync",    placeholder:"incident,change,request,problem",     type:"text",     hint:"Comma-separated SMAX entity types"},
          {key:"groupFilter",  label:"Groups / Teams",     placeholder:"Infra, NOC, Security (SMAX group names)", type:"text"},
          {key:"syncHours",    label:"Sync Interval (h)",  placeholder:"2",                                   type:"number",   hint:"SMAX webhooks can push on-change for real-time sync"},
          {key:"webhookSecret",label:"Webhook Secret (opt)",placeholder:"For real-time push from SMAX",       type:"password", hint:"Configure in SMAX → Integration → Outbound webhooks"},
        ],
        exportGuide:[
          "In SMAX: Reports & Dashboards → Create Report → Incident / Request list",
          "Add columns: Id, Title, Assignee, Group, Time Logged, Creation Date, Phase, Category",
          "Export as CSV using the Download button in the report toolbar",
          "For time entries: Timesheet module → Export to Excel",
          "Alternatively use SMAX OData endpoint: /rest/{tenantId}/ems/Incident?$select=...",
        ],
        docs:"https://docs.microfocus.com/itom/SMAX:latest/PN/SMAX_REST_API",
        status:"enterprise",
      },
    ];

    const statusBadge = {primary:{label:"Primary",c:"#1a56db",bg:"#eff6ff"}, enterprise:{label:"Enterprise",c:"#7c3aed",bg:"#f5f3ff"}};

    const testConnection = (id) => {
      setConnStatus(p=>({...p,[id]:"testing"}));
      setTimeout(()=>{
        // Simulate: connected if all required fields filled
        const tool = INTEGRATIONS.find(t=>t.id===id);
        const required = tool.fields.filter(f=>f.type!=="number"&&f.type!=="select");
        const filled = required.every(f=>(configForm[id]||{})[f.key]);
        setConnStatus(p=>({...p,[id]:filled?"connected":"error"}));
        setSyncLog(p=>[{ts:new Date().toLocaleTimeString(),tool:tool.name,status:filled?"✅ Connection successful":"❌ Auth failed — check credentials",id:uid("SL")},...p.slice(0,19)]);
      }, 1400);
    };

    const curInt = INTEGRATIONS.find(t=>t.id===activeInt);

    return (
      <div>
        <div style={{marginBottom:20}}>
          <div style={{fontSize:20,fontWeight:800,color:"#0f172a"}}>🔗 Integrations</div>
          <div style={{fontSize:12,color:"#6b7280",marginTop:3}}>
            Connect ISMS directly to your ticketing tools — data flows in automatically, no manual export needed
          </div>
        </div>

        <Tabs tabs={[{id:"catalog",label:"🗂 Integration Catalog"},{id:"configured",label:`⚙️ Configured (${Object.keys(connStatus).length})`},{id:"synclog",label:`📋 Sync Log (${syncLog.length})`}]} active={tab} onChange={setTab}/>

        {/* ── CATALOG TAB ── */}
        {tab==="catalog" && (
          <div style={{marginTop:16}}>
            {/* Architecture diagram banner */}
            <div style={{background:"linear-gradient(135deg,#0f172a 0%,#1a3a6e 70%,#0e4f8a 100%)",borderRadius:14,padding:"22px 26px",marginBottom:18,color:"#fff",boxShadow:"0 8px 24px rgba(15,23,42,.2)"}}>
              <div style={{fontSize:14,fontWeight:800,marginBottom:6}}>📡 How Integration Works</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.7)",marginBottom:14}}>ISMS connects to your tool's REST API, authenticates, and pulls ticket data on a scheduled or on-demand basis</div>
              <div style={{display:"flex",alignItems:"center",gap:0,overflowX:"auto",paddingBottom:4}}>
                {[
                  {icon:"🎫",label:"Ticketing Tool",sub:"JIRA/SNOW/BMC"},
                  {arrow:"→"},
                  {icon:"🔐",label:"Auth Layer",sub:"API Key / OAuth2"},
                  {arrow:"→"},
                  {icon:"🔄",label:"Sync Engine",sub:"Scheduled pull"},
                  {arrow:"→"},
                  {icon:"🗃",label:"Field Mapper",sub:"Auto-normalise"},
                  {arrow:"→"},
                  {icon:"📊",label:"ISMS Portal",sub:"Activities + Logs"},
                ].map((s,i)=>
                  s.arrow
                    ? <div key={i} style={{color:"rgba(255,255,255,.4)",fontSize:18,flexShrink:0,margin:"0 6px"}}>→</div>
                    : <div key={i} style={{background:"rgba(255,255,255,.08)",borderRadius:9,padding:"8px 14px",textAlign:"center",flexShrink:0}}>
                        <div style={{fontSize:18,marginBottom:3}}>{s.icon}</div>
                        <div style={{fontSize:11,fontWeight:700,color:"#fff"}}>{s.label}</div>
                        <div style={{fontSize:9,color:"rgba(255,255,255,.5)"}}>{s.sub}</div>
                      </div>
                )}
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:14}}>
              {INTEGRATIONS.map(t=>{
                const st = connStatus[t.id];
                const sb = statusBadge[t.status];
                return (
                  <div key={t.id} style={{background:"#fff",border:`2px solid ${st==="connected"?"#86efac":st==="error"?"#fca5a5":"#dde3ed"}`,borderRadius:12,padding:"18px 18px 14px",display:"flex",flexDirection:"column",gap:0,transition:"box-shadow .15s"}}
                    onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 8px 24px rgba(15,23,42,.1)";e.currentTarget.style.transform="translateY(-2px)";}}
                    onMouseLeave={e=>{e.currentTarget.style.boxShadow="";e.currentTarget.style.transform="";}}>
                    <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:10}}>
                      <div style={{width:44,height:44,borderRadius:10,background:t.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{t.logo}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                          <span style={{fontWeight:800,fontSize:15,color:"#0f172a"}}>{t.name}</span>
                          <span style={{fontSize:10,background:sb.bg,color:sb.c,padding:"2px 8px",borderRadius:10,fontWeight:700}}>{sb.label}</span>
                          {st==="connected" && <span style={{fontSize:10,background:"#dcfce7",color:"#166534",padding:"2px 8px",borderRadius:10,fontWeight:700}}>✅ Connected</span>}
                          {st==="error"     && <span style={{fontSize:10,background:"#fee2e2",color:"#991b1b",padding:"2px 8px",borderRadius:10,fontWeight:700}}>❌ Error</span>}
                        </div>
                        <div style={{fontSize:11,color:"#9ca3af",marginTop:2}}>{t.vendor}</div>
                      </div>
                    </div>
                    <div style={{fontSize:12,color:"#6b7280",lineHeight:1.6,marginBottom:12,flex:1}}>{t.desc}</div>
                    <div style={{marginBottom:12}}>
                      {t.features.slice(0,4).map(f=>(
                        <div key={f} style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                          <span style={{color:"#059669",fontSize:11}}>✓</span>
                          <span style={{fontSize:11,color:"#374151"}}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>{setActiveInt(t.id);setTab("configured");}}
                        style={{flex:1,padding:"8px 0",borderRadius:8,background:t.id==="powerbi"?`linear-gradient(135deg,#e8a000,#f2c811)`:`linear-gradient(135deg,${t.color},${t.color}cc)`,color:t.id==="powerbi"?"#0f172a":"#fff",border:"none",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                        {st==="connected"?"⚙️ Configure":"🔗 Connect"}
                      </button>
                      <a href={t.docs} target="_blank" rel="noreferrer"
                        style={{padding:"8px 12px",borderRadius:8,background:"#f7f9fc",border:"1px solid #dde3ed",color:"#6b7280",fontWeight:600,fontSize:12,cursor:"pointer",textDecoration:"none"}}>
                        📖
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── CONFIGURE TAB ── */}
        {tab==="configured" && (
          <div style={{marginTop:16}}>
            {/* Tool selector */}
            <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"}}>
              {INTEGRATIONS.map(t=>{
                const st=connStatus[t.id];
                return (
                  <button key={t.id} onClick={()=>setActiveInt(t.id)}
                    style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",borderRadius:9,border:`2px solid ${activeInt===t.id?t.color:"#dde3ed"}`,background:activeInt===t.id?t.bg:"#fff",cursor:"pointer",transition:"all .15s",fontWeight:600,fontSize:13,color:activeInt===t.id?t.color:"#374151"}}>
                    <span style={{fontSize:16}}>{t.logo}</span>
                    <span style={{color:activeInt===t.id?t.color:"#374151"}}>{t.name}</span>
                    {st==="connected"&&<span style={{fontSize:10,color:"#059669"}}>✅</span>}
                    {st==="error"    &&<span style={{fontSize:10,color:"#dc2626"}}>❌</span>}
                    {st==="testing"  &&<span style={{fontSize:10,color:"#d97706"}}>⏳</span>}
                  </button>
                );
              })}
            </div>

            {curInt ? (
              <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:16}}>
                {/* Config form */}
                <Card>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                    <div style={{width:40,height:40,borderRadius:9,background:curInt.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{curInt.logo}</div>
                    <div>
                      <div style={{fontWeight:800,fontSize:16,color:"#0f172a"}}>{curInt.name} Configuration</div>
                      <div style={{fontSize:11,color:"#9ca3af"}}>{curInt.vendor}</div>
                    </div>
                    {connStatus[curInt.id]==="connected" && <span style={{marginLeft:"auto",background:"#dcfce7",color:"#166534",padding:"4px 12px",borderRadius:10,fontSize:12,fontWeight:700}}>✅ Connected</span>}
                    {connStatus[curInt.id]==="error"     && <span style={{marginLeft:"auto",background:"#fee2e2",color:"#991b1b",padding:"4px 12px",borderRadius:10,fontSize:12,fontWeight:700}}>❌ Auth Failed</span>}
                  </div>

                  <div style={{display:"grid",gap:12}}>
                    {curInt.fields.map(f=>(
                      <div key={f.key}>
                        <div style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:5}}>{f.label}{f.hint&&<span style={{fontWeight:400,color:"#9ca3af",marginLeft:6}}>— {f.hint}</span>}</div>
                        {f.type==="select"
                          ? <select value={(configForm[curInt.id]||{})[f.key]||""}
                              onChange={e=>setConfigForm(p=>({...p,[curInt.id]:{...(p[curInt.id]||{}),[f.key]:e.target.value}}))}
                              style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1px solid #c8d2e0",fontSize:13,background:"#fff"}}>
                              <option value="">— Select —</option>
                              {f.opts.map(o=><option key={o} value={o}>{o}</option>)}
                            </select>
                          : <input type={f.type||"text"} placeholder={f.placeholder}
                              value={(configForm[curInt.id]||{})[f.key]||""}
                              onChange={e=>setConfigForm(p=>({...p,[curInt.id]:{...(p[curInt.id]||{}),[f.key]:e.target.value}}))}
                              style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1px solid #c8d2e0",fontSize:13,boxSizing:"border-box",fontFamily:"inherit",background:f.type==="password"?"#f7f9fc":"#fff"}}/>
                        }
                      </div>
                    ))}
                  </div>

                  <div style={{marginTop:18,display:"flex",gap:10}}>
                    <button onClick={()=>testConnection(curInt.id)} disabled={connStatus[curInt.id]==="testing"}
                      style={{flex:1,padding:"10px 0",borderRadius:9,background:connStatus[curInt.id]==="testing"?"#9ca3af":`linear-gradient(135deg,${curInt.color},${curInt.color}cc)`,color:"#fff",border:"none",fontWeight:700,fontSize:14,cursor:connStatus[curInt.id]==="testing"?"not-allowed":"pointer"}}>
                      {connStatus[curInt.id]==="testing"?"⏳ Testing…":"🔌 Test & Connect"}
                    </button>
                    {connStatus[curInt.id]==="connected" && (
                      <button onClick={()=>{setSyncLog(p=>[{ts:new Date().toLocaleTimeString(),tool:curInt.name,status:"🔄 Manual sync started…",id:uid("SL")},...p]); setTimeout(()=>setSyncLog(p=>[{ts:new Date().toLocaleTimeString(),tool:curInt.name,status:"✅ Sync complete — 0 new tickets (demo mode)",id:uid("SL")},...p]),1200); setTab("synclog");}}
                        style={{padding:"10px 18px",borderRadius:9,background:"#059669",color:"#fff",border:"none",fontWeight:700,fontSize:14,cursor:"pointer"}}>
                        🔄 Sync Now
                      </button>
                    )}
                  </div>
                </Card>

                {/* Features + field mapping guide */}
                <div>
                  <Card style={{marginBottom:14}}>
                    <div style={{fontWeight:700,fontSize:13,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2,marginBottom:10}}>✨ What Gets Synced</div>
                    {curInt.features.map(f=>(
                      <div key={f} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:8,padding:"6px 10px",background:"#f7f9fc",borderRadius:7}}>
                        <span style={{color:"#059669",fontWeight:700,fontSize:12,flexShrink:0}}>✓</span>
                        <span style={{fontSize:12,color:"#374151"}}>{f}</span>
                      </div>
                    ))}
                  </Card>
                  <Card style={{background:"#fffbeb",border:"1px solid #fde68a"}}>
                    <div style={{fontWeight:700,fontSize:13,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2,marginBottom:10}}>📋 How to Export from {curInt.name}</div>
                    {curInt.exportGuide.map((step,i)=>(
                      <div key={i} style={{display:"flex",gap:9,alignItems:"flex-start",marginBottom:7,padding:"6px 10px",background:"#f7f9fc",borderRadius:7}}>
                        <div style={{width:18,height:18,borderRadius:"50%",background:curInt.color||"#1a56db",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,flexShrink:0,marginTop:1}}>{i+1}</div>
                        <span style={{fontSize:11,color:"#374151",lineHeight:1.5}}>{step}</span>
                      </div>
                    ))}
                  </Card>
                  <Card style={{background:"#fffbeb",border:"1px solid #fde68a",marginTop:14}}>
                    <div style={{fontWeight:700,fontSize:13,color:"#92400e",marginBottom:8}}>⚠️ Demo Mode</div>
                    <div style={{fontSize:12,color:"#78350f",lineHeight:1.6}}>
                      This is a UI prototype. In production deployment, the Test & Connect button would authenticate against your live {curInt.name} instance and begin pulling real ticket data. No actual API calls are made in this demo.
                    </div>
                    <a href={curInt.docs} target="_blank" rel="noreferrer"
                      style={{display:"inline-block",marginTop:10,fontSize:12,color:"#1a56db",fontWeight:600}}>
                      📖 {curInt.name} API Docs →
                    </a>
                  </Card>
                </div>
              </div>
            ) : (
              <Card style={{textAlign:"center",padding:48,color:"#9ca3af"}}>
                <div style={{fontSize:32,marginBottom:10}}>🔗</div>
                <div style={{fontWeight:600,fontSize:14}}>Select a tool above to configure it</div>
              </Card>
            )}
          </div>
        )}

        {/* ── SYNC LOG TAB ── */}
        {tab==="synclog" && (
          <div style={{marginTop:16}}>
            <Card style={{padding:0,overflow:"hidden"}}>
              <div style={{padding:"14px 18px",borderBottom:"1px solid #f1f5f9",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontWeight:700,fontSize:14,color:"#0f172a",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.2}}>Sync Activity Log</div>
                {syncLog.length>0 && <button onClick={()=>setSyncLog([])} style={{padding:"5px 12px",borderRadius:7,background:"#fff",border:"1px solid #c8d2e0",color:"#6b7280",fontSize:12,cursor:"pointer"}}>Clear</button>}
              </div>
              {syncLog.length===0
                ? <div style={{textAlign:"center",padding:48,color:"#9ca3af"}}>
                    <div style={{fontSize:28,marginBottom:8}}>📋</div>
                    <div style={{fontSize:13,fontWeight:600}}>No sync activity yet</div>
                    <div style={{fontSize:11,marginTop:4}}>Configure and test an integration to see logs here</div>
                  </div>
                : <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"'DM Sans',sans-serif"}}>
                    <thead><tr><TH c="Time"/><TH c="Integration"/><TH c="Status"/></tr></thead>
                    <tbody>
                      {syncLog.map((l,i)=>(
                        <tr key={l.id} style={{borderBottom:"1px solid #f1f5f9",background:i%2===0?"#fff":"#fafbfc"}}>
                          <TD s={{fontSize:11,color:"#9ca3af",whiteSpace:"nowrap"}}>{l.ts}</TD>
                          <TD s={{fontWeight:700}}>{l.tool}</TD>
                          <TD s={{fontSize:12}}>{l.status}</TD>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              }
            </Card>
          </div>
        )}
      </div>
    );
  };


  // ════════════════════════════════════════════════════════════════════
  //  PAGE: USER MANAGEMENT
  //  Admin  → all teams: create/edit/delete any user or team
  //  Manager → own team only: add/edit members of their team
  // ════════════════════════════════════════════════════════════════════
  const PageUserMgmt = () => {
    // ── Local state ──────────────────────────────────────────────────
    const [tab,        setTab]        = React.useState("users");   // users | teams | roles | audit
    const [uModal,     setUModal]     = React.useState(false);
    const [uTarget,    setUTarget]    = React.useState(null);
    const [uForm,      setUForm]      = React.useState({name:"",title:"",email:"",team:"",role:"member",status:"Active"});
    const [uConfirm,   setUConfirm]   = React.useState(null);
    const [uSearch,    setUSearch]    = React.useState("");
    const [uTeamF,     setUTeamF]     = React.useState("");
    const [uRoleF,     setURoleF]     = React.useState("");
    const [tModal,     setTModal]     = React.useState(false);
    const [tTarget,    setTTarget]    = React.useState(null);
    const [tForm,      setTForm]      = React.useState({name:"",emoji:"🏗",color:"#0891b2",lead:"",desc:""});
    const [tConfirm,   setTConfirm]   = React.useState(null);
    const [auditLog,   setAuditLog]   = React.useState([
      {id:"a1", ts:"2025-03-14 09:12", by:"Sarah Mitchell", action:"Created user",   target:"Jin Park",     detail:"Role: Member · Team: Database"},
      {id:"a2", ts:"2025-03-13 14:30", by:"Sarah Mitchell", action:"Changed role",   target:"Tom Wilson",   detail:"Member → Member (team reassigned)"},
      {id:"a3", ts:"2025-03-12 11:05", by:"Alex Chen",      action:"Added member",   target:"Ravi Sharma",  detail:"Added to Network team"},
      {id:"a4", ts:"2025-03-11 16:44", by:"Sarah Mitchell", action:"Created team",   target:"Database",     detail:"New team created"},
      {id:"a5", ts:"2025-03-10 09:00", by:"Sarah Mitchell", action:"Updated user",   target:"Lisa Johnson", detail:"Title updated to Database Lead"},
    ]);

    const addAudit = (action, target, detail) => {
      setAuditLog(p=>[{id:uid("AUD"),ts:new Date().toLocaleString("en-GB").replace(",",""),by:user.name,action,target,detail},...p.slice(0,49)]);
    };

    // ── Scoped data ───────────────────────────────────────────────────
    // Admin sees all users; Manager sees only their team members (+ themselves)
    const scopedUsers = isAdmin
      ? allUsers
      : allUsers.filter(u => u.team === user.team || u.id === user.id);

    const scopedTeams = isAdmin
      ? teams
      : teams.filter(t => t.name === user.team);

    // Filtered user list
    const visibleUsers = scopedUsers.filter(u => {
      const q = uSearch.toLowerCase();
      const matchQ = !q || u.name.toLowerCase().includes(q) || (u.email||"").toLowerCase().includes(q) || (u.title||"").toLowerCase().includes(q);
      const matchT = !uTeamF || u.team === uTeamF;
      const matchR = !uRoleF || u.role === uRoleF;
      return matchQ && matchT && matchR;
    });

    // ── User CRUD ────────────────────────────────────────────────────
    const openAddUser = () => {
      setUForm({name:"",title:"",email:"",team:isMgr?user.team:"",role:"member",status:"Active"});
      setUTarget(null); setUModal(true);
    };
    const openEditUser = (u) => {
      setUForm({name:u.name,title:u.title||"",email:u.email||"",team:u.team||"",role:u.role,status:u.status||"Active",resetPw:false,newPw:""});
      setUTarget(u); setUModal(true);
    };
    const saveUser = () => {
      if(!uForm.name.trim()){ showToast("Full name is required","err"); return; }
      if(isMgr && uForm.role !== "member"){ showToast("Managers can only add Members","err"); return; }
      if(isMgr && uForm.team !== user.team){ showToast("You can only manage your own team","err"); return; }
      if(uTarget){
        const update = {...uForm,name:uForm.name.trim()};
        if(uForm.resetPw && uForm.newPw) { update.password=uForm.newPw; update.mustReset=true; }
        delete update.resetPw; delete update.newPw;
        setAllUsers(p=>p.map(u=>u.id===uTarget.id?{...u,...update}:u));
        if(user.id===uTarget.id) setUser(p=>({...p,...update}));
        addAudit("Updated user", uForm.name.trim(), `Role: ${uForm.role} · Team: ${uForm.team||"None"}`);
        showToast(`${uForm.name} updated`);
      } else {
        const nu = {id:uid("USR"),name:uForm.name.trim(),title:uForm.title,email:uForm.email,team:uForm.team||null,role:uForm.role,status:uForm.status};
        setAllUsers(p=>[...p,nu]);
        addAudit("Created user", nu.name, `Role: ${nu.role} · Team: ${nu.team||"None"}`);
        showToast(`${nu.name} added`);
      }
      setUModal(false);
    };
    const toggleStatus = (u) => {
      const newStatus = (u.status||"Active")==="Active"?"Inactive":"Active";
      setAllUsers(p=>p.map(x=>x.id===u.id?{...x,status:newStatus}:x));
      addAudit(`${newStatus==="Active"?"Activated":"Deactivated"} user`, u.name, `Status → ${newStatus}`);
      showToast(`${u.name} ${newStatus==="Active"?"activated":"deactivated"}`);
    };
    const confirmDeleteUser = (u) => setUConfirm(u);
    const deleteUser = () => {
      setAllUsers(p=>p.filter(u=>u.id!==uConfirm.id));
      addAudit("Deleted user", uConfirm.name, `Removed from ISMS`);
      showToast(`${uConfirm.name} removed`); setUConfirm(null);
    };

    // ── Team CRUD ────────────────────────────────────────────────────
    const EMOJIS = ["🌐","🔒","⚙️","☁️","💾","🗄️","🏗","🚀","🔧","📡","🖥","🔐","📊","💿","🌩","🛡"];
    const TCOLORS= ["#0891b2","#dc2626","#d97706","#7c3aed","#059669","#ea580c","#1a56db","#db2777","#16a34a","#9333ea"];
    const openAddTeam = () => { setTForm({name:"",emoji:"🏗",color:"#0891b2",lead:"",desc:""}); setTTarget(null); setTModal(true); };
    const openEditTeam = (t) => { setTForm({name:t.name,emoji:t.emoji,color:t.color,lead:t.lead||"",desc:t.desc||""}); setTTarget(t); setTModal(true); };
    const saveTeam = () => {
      if(!tForm.name.trim()){ showToast("Team name required","err"); return; }
      if(tTarget){
        const old=tTarget.name, nw=tForm.name.trim();
        setTeams(p=>p.map(t=>t.name===old?{...t,...tForm,name:nw}:t));
        if(old!==nw){ setActs(p=>p.map(a=>a.team===old?{...a,team:nw}:a)); setLogs(p=>p.map(l=>l.team===old?{...l,team:nw}:l)); setAllUsers(p=>p.map(u=>u.team===old?{...u,team:nw}:u)); }
        addAudit("Updated team", nw, old!==nw?`Renamed from ${old}`:"Details updated");
        showToast(`${nw} updated`);
      } else {
        setTeams(p=>[...p,{name:tForm.name.trim(),emoji:tForm.emoji,color:tForm.color,lead:tForm.lead,desc:tForm.desc}]);
        addAudit("Created team", tForm.name.trim(), `Colour: ${tForm.color}`);
        showToast(`${tForm.name} team created`);
      }
      setTModal(false);
    };
    const deleteTeam = () => {
      setTeams(p=>p.filter(t=>t.name!==tConfirm));
      addAudit("Deleted team", tConfirm, "Team removed");
      showToast(`${tConfirm} removed`); setTConfirm(null);
    };

    // ── Shared style ─────────────────────────────────────────────────
    const iS2 = {width:"100%",padding:"9px 12px",borderRadius:9,border:"1px solid #e2e8f0",fontSize:13,boxSizing:"border-box",background:"#fff",fontFamily:"inherit"};
    const roleColor = r => r==="admin"?"#6366f1":r==="manager"?"#1a56db":"#059669";
    const roleBg    = r => r==="admin"?"#f5f3ff":r==="manager"?"#eff6ff":"#f0fdf4";
    const roleLabel = r => r==="admin"?"Administrator":r==="manager"?"Manager":"Member";

    // ── Stats for header strip ────────────────────────────────────────
    const stats = [
      {label:"Total Users",    val:scopedUsers.length,                                         icon:"👥",c:"#1a56db",bg:"#eff6ff"},
      {label:"Active",         val:scopedUsers.filter(u=>(u.status||"Active")==="Active").length,icon:"✅",c:"#059669",bg:"#f0fdf4"},
      {label:"Inactive",       val:scopedUsers.filter(u=>u.status==="Inactive").length,         icon:"⏸",c:"#9ca3af",bg:"#f7f9fc"},
      {label:isAdmin?"Teams":"Team Members", val:isAdmin?scopedTeams.length:scopedUsers.filter(u=>u.role==="member").length, icon:isAdmin?"🏗":"👤",c:"#7c3aed",bg:"#f5f3ff"},
      {label:"Managers",       val:scopedUsers.filter(u=>u.role==="manager").length,            icon:"👑",c:"#d97706",bg:"#fffbeb"},
    ];

    const TABS = [
      {id:"users", label:`👤 Users (${scopedUsers.length})`},
      ...(isAdmin?[{id:"teams", label:`🏗 Teams (${teams.length})`}]:[]),
      {id:"roles",  label:"🔐 Role Matrix"},
      {id:"audit",  label:`📋 Audit Log (${auditLog.length})`},
    ];

    return (
      <div>
        {/* ── Header ── */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
          <div>
            <div style={{fontSize:20,fontWeight:800,color:"#0f172a"}}>🔐 User Management</div>
            <div style={{fontSize:12,color:"#6b7280",marginTop:3}}>
              {isAdmin
                ? "Full control — manage all users, teams, roles and permissions across the organisation"
                : `Manager view — manage members of your ${user.team} team`}
            </div>
          </div>
          <div style={{display:"flex",gap:9}}>
            {tab==="users" && <Btn onClick={openAddUser}>+ Add User</Btn>}
            {tab==="teams" && isAdmin && <Btn onClick={openAddTeam}>+ New Team</Btn>}
          </div>
        </div>

        {/* ── KPI strip ── */}
        <div style={{display:"grid",gridTemplateColumns:`repeat(${stats.length},1fr)`,gap:11,marginBottom:18}}>
          {stats.map(s=>(
            <Card key={s.label} style={{padding:14}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:36,height:36,borderRadius:10,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{s.icon}</div>
                <div>
                  <div style={{fontSize:9,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:.8}}>{s.label}</div>
                  <div style={{fontSize:22,fontWeight:800,color:s.c,lineHeight:1.1}}>{s.val}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* ── Tabs ── */}
        <Tabs tabs={TABS} active={tab} onChange={setTab}/>

        {/* ══════════════════════════════════════
            TAB: USERS
        ══════════════════════════════════════ */}
        {tab==="users" && (
          <div>
            {/* Filter bar */}
            <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
              <input placeholder="🔍 Search name, email or title…" value={uSearch} onChange={e=>setUSearch(e.target.value)}
                style={{flex:1,minWidth:200,...iS2,padding:"8px 12px"}}/>
              {isAdmin && (
                <select value={uTeamF} onChange={e=>setUTeamF(e.target.value)} style={{...iS2,width:160}}>
                  <option value="">All Teams</option>
                  {teams.map(t=><option key={t.name} value={t.name}>{t.emoji} {t.name}</option>)}
                  <option value="">No Team</option>
                </select>
              )}
              <select value={uRoleF} onChange={e=>setURoleF(e.target.value)} style={{...iS2,width:150}}>
                <option value="">All Roles</option>
                <option value="admin">Administrator</option>
                <option value="manager">Manager</option>
                <option value="member">Member</option>
              </select>
              {(uSearch||uTeamF||uRoleF) && (
                <button onClick={()=>{setUSearch("");setUTeamF("");setURoleF("");}}
                  style={{padding:"8px 14px",borderRadius:9,background:"#fee2e2",border:"1px solid #fca5a5",color:"#b91c1c",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                  ✕ Clear
                </button>
              )}
              <span style={{fontSize:12,color:"#9ca3af",whiteSpace:"nowrap"}}>{visibleUsers.length} user{visibleUsers.length!==1?"s":""}</span>
            </div>

            {/* User table */}
            <Card style={{padding:0,overflow:"hidden"}}>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <thead>
                    <tr>
                      <TH c="User"/><TH c="Role"/><TH c="Team"/>
                      <TH c="Title"/><TH c="Email"/>
                      <TH c="Status"/><TH c="Hours Logged"/>
                      <TH c="Actions"/>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleUsers.length===0 && (
                      <tr><td colSpan={8} style={{textAlign:"center",padding:48,color:"#9ca3af",fontSize:13}}>No users match your filters.</td></tr>
                    )}
                    {visibleUsers.map((u,i)=>{
                      const uLogs   = logs.filter(l=>l.userId===u.id);
                      const uHours  = fmtM(uLogs.reduce((s,l)=>s+l.mins,0));
                      const isMe    = u.id===user.id;
                      const status  = u.status||"Active";
                      const canDel  = isAdmin && !isMe;
                      const canEdit = isAdmin || (isMgr && u.team===user.team && u.role==="member");
                      const col     = tCol(u.team);
                      return (
                        <tr key={u.id} style={{background:i%2===0?"#fff":"#fafbfc",borderBottom:"1px solid #f1f5f9",opacity:status==="Inactive"?.6:1}}
                          onMouseEnter={e=>e.currentTarget.style.background="#f0f9ff"}
                          onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"#fff":"#fafbfc"}>

                          {/* Avatar + name */}
                          <TD>
                            <div style={{display:"flex",alignItems:"center",gap:10}}>
                              <div style={{width:34,height:34,borderRadius:"50%",background:u.team?`${col}22`:"#f5f3ff",color:u.team?col:"#6366f1",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,flexShrink:0,border:`2px solid ${u.team?col+"33":"#e5e7eb"}`}}>
                                {u.name.split(" ").map(n=>n[0]).join("")}
                              </div>
                              <div>
                                <div style={{fontWeight:700,color:"#0f172a",fontSize:13}}>{u.name}{isMe&&<span style={{marginLeft:5,fontSize:9,background:"#eff6ff",color:"#1a56db",padding:"1px 6px",borderRadius:8,fontWeight:700}}>You</span>}</div>
                                <div style={{fontSize:10,color:"#9ca3af"}}>{u.id}</div>
                              </div>
                            </div>
                          </TD>

                          {/* Role badge */}
                          <TD>
                            <span style={{fontSize:11,background:roleBg(u.role),color:roleColor(u.role),padding:"3px 10px",borderRadius:12,fontWeight:700}}>
                              {u.role==="admin"?"🛡️":u.role==="manager"?"👑":"👤"} {roleLabel(u.role)}
                            </span>
                          </TD>

                          {/* Team */}
                          <TD>{u.team ? <TPill t={u.team}/> : <span style={{color:"#9ca3af",fontSize:11}}>—</span>}</TD>

                          {/* Title */}
                          <TD s={{fontSize:12,color:"#6b7280"}}>{u.title||"—"}</TD>

                          {/* Email */}
                          <TD s={{fontSize:11,color:"#6b7280"}}>{u.email||"—"}</TD>

                          {/* Status */}
                          <TD>
                            <span style={{fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:12,
                              background:status==="Active"?"#dcfce7":"#f1f5f9",
                              color:status==="Active"?"#166534":"#6b7280"}}>
                              {status==="Active"?"● Active":"○ Inactive"}
                            </span>
                          </TD>

                          {/* Hours */}
                          <TD>
                            <div style={{fontWeight:700,color:"#1a56db",fontSize:13}}>{uHours}</div>
                            <div style={{fontSize:10,color:"#9ca3af"}}>{uLogs.length} entries</div>
                          </TD>

                          {/* Actions */}
                          <TD>
                            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                              {canEdit && (
                                <button onClick={()=>openEditUser(u)}
                                  style={{padding:"5px 11px",borderRadius:7,background:"#f1f5f9",border:"1px solid #e2e8f0",cursor:"pointer",fontSize:11,fontWeight:600,color:"#374151"}}>
                                  ✏️ Edit
                                </button>
                              )}
                              {isAdmin && !isMe && (
                                <button onClick={()=>toggleStatus(u)}
                                  style={{padding:"5px 11px",borderRadius:7,fontSize:11,fontWeight:600,cursor:"pointer",
                                    background:status==="Active"?"#fff7ed":"#f0fdf4",
                                    border:`1px solid ${status==="Active"?"#fed7aa":"#86efac"}`,
                                    color:status==="Active"?"#c2410c":"#166534"}}>
                                  {status==="Active"?"⏸ Deactivate":"▶ Activate"}
                                </button>
                              )}
                              {canDel && (
                                <button onClick={()=>confirmDeleteUser(u)}
                                  style={{padding:"5px 11px",borderRadius:7,background:"#fef2f2",border:"1px solid #fca5a5",cursor:"pointer",fontSize:11,fontWeight:600,color:"#dc2626"}}>
                                  🗑
                                </button>
                              )}
                              {!canEdit && !isMe && (
                                <span style={{fontSize:11,color:"#d1d5db",fontStyle:"italic"}}>View only</span>
                              )}
                            </div>
                          </TD>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB: TEAMS (admin only)
        ══════════════════════════════════════ */}
        {tab==="teams" && isAdmin && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
            {teams.map(t=>{
              const tMems = allUsers.filter(u=>u.team===t.name);
              const tMgr  = tMems.find(u=>u.role==="manager");
              const tActs = acts.filter(a=>a.team===t.name);
              const cap   = CAPACITY.find(c=>c.team===t.name)||{};
              const net   = (cap.availMins||0)-(cap.vacMins||0);
              const pct   = net?Math.round((cap.utilMins||0)/net*100):0;
              return (
                <Card key={t.name} style={{borderTop:`4px solid ${t.color}`,padding:18,position:"relative"}}>
                  <div style={{position:"absolute",top:14,right:14,display:"flex",gap:6}}>
                    <button onClick={()=>openEditTeam(t)} style={{width:28,height:28,borderRadius:7,background:"#f1f5f9",border:"1px solid #e2e8f0",cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>✏️</button>
                    <button onClick={()=>setTConfirm(t.name)} style={{width:28,height:28,borderRadius:7,background:"#fef2f2",border:"1px solid #fca5a5",cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>🗑</button>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14,marginTop:4}}>
                    <div style={{width:46,height:46,borderRadius:12,background:`${t.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{t.emoji}</div>
                    <div>
                      <div style={{fontWeight:800,fontSize:16,color:"#0f172a"}}>{t.name}</div>
                      <div style={{fontSize:11,color:"#6b7280"}}>Lead: {tMgr?.name||t.lead||"—"}</div>
                    </div>
                  </div>
                  {t.desc && <div style={{fontSize:11,color:"#6b7280",marginBottom:12,lineHeight:1.5}}>{t.desc}</div>}
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12}}>
                    {[["Members",tMems.length],["Activities",tActs.length],["Util",`${pct}%`]].map(([l,v])=>(
                      <div key={l} style={{textAlign:"center",background:"#f8fafc",borderRadius:8,padding:"8px 4px"}}>
                        <div style={{fontSize:16,fontWeight:800,color:l==="Util"?uCol(pct):"#0f172a"}}>{v}</div>
                        <div style={{fontSize:9,color:"#9ca3af",marginTop:1}}>{l}</div>
                      </div>
                    ))}
                  </div>
                  {/* Member avatars */}
                  <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
                    {tMems.map(m=>(
                      <div key={m.id} title={`${m.name} (${m.role})`}
                        style={{width:28,height:28,borderRadius:"50%",background:`${t.color}22`,color:t.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,border:`1.5px solid ${t.color}44`}}>
                        {m.name.split(" ").map(n=>n[0]).join("")}
                      </div>
                    ))}
                  </div>
                  <div style={{height:5,background:"#f1f5f9",borderRadius:3,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${Math.min(100,pct)}%`,background:t.color,borderRadius:3,transition:"width .5s"}}/>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB: ROLE MATRIX
        ══════════════════════════════════════ */}
        {tab==="roles" && (
          <div>
            <Card style={{marginBottom:14}}>
              <div style={{fontWeight:700,fontSize:14,color:"#0f172a",marginBottom:4}}>Role Definitions</div>
              <div style={{fontSize:11,color:"#6b7280",marginBottom:16}}>What each role can see and do in ISMS</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:20}}>
                {[
                  {role:"admin",   icon:"🛡️", title:"Administrator",  color:"#6366f1", bg:"#f5f3ff", desc:"Full system access. Can manage all teams, users, activities and system settings. Cannot log time or create activities (read-only on operational data)."},
                  {role:"manager", icon:"👑", title:"Team Manager",    color:"#1a56db", bg:"#eff6ff", desc:"Manages their own team. Can create activities, log time, manage team members and view team bandwidth. Cannot access other teams."},
                  {role:"member",  icon:"👤", title:"Team Member",     color:"#059669", bg:"#f0fdf4", desc:"Can log time against assigned activities and view their own team's data. Cannot create or edit activities."},
                ].map(r=>(
                  <div key={r.role} style={{background:r.bg,border:`1px solid ${r.color}25`,borderRadius:12,padding:"16px 18px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                      <span style={{fontSize:22}}>{r.icon}</span>
                      <div>
                        <div style={{fontWeight:800,fontSize:14,color:r.color}}>{r.title}</div>
                        <div style={{fontSize:10,color:"#9ca3af"}}>{scopedUsers.filter(u=>u.role===r.role).length} user{scopedUsers.filter(u=>u.role===r.role).length!==1?"s":""}</div>
                      </div>
                    </div>
                    <div style={{fontSize:11,color:"#374151",lineHeight:1.6}}>{r.desc}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Permission matrix table */}
            <Card style={{padding:0,overflow:"hidden"}}>
              <div style={{padding:"14px 18px",borderBottom:"1px solid #f1f5f9"}}>
                <div style={{fontWeight:700,fontSize:14,color:"#0f172a"}}>Permission Matrix</div>
                <div style={{fontSize:11,color:"#6b7280",marginTop:2}}>Detailed capability breakdown by role</div>
              </div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
                  <thead>
                    <tr style={{background:"#f8fafc"}}>
                      <th style={{padding:"12px 16px",textAlign:"left",fontSize:11,fontWeight:700,color:"#6b7280",borderBottom:"1px solid #e8edf5",minWidth:200}}>Feature</th>
                      {[["🛡️","Admin","#6366f1"],["👑","Manager","#1a56db"],["👤","Member","#059669"]].map(([icon,label,c])=>(
                        <th key={label} style={{padding:"12px 16px",textAlign:"center",fontSize:12,fontWeight:800,color:c,borderBottom:"1px solid #e8edf5",minWidth:130}}>
                          {icon} {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {section:"Dashboard & Reports", items:[
                        {f:"Dashboard — org overview",     a:true,  m:"Team only",    mb:false},
                        {f:"Bandwidth & Capacity",         a:true,  m:"Team only",    mb:false},
                        {f:"Reports",                      a:true,  m:"Team only",    mb:"View"},
                        {f:"Custom Reports",               a:true,  m:"Team only",    mb:false},
                        {f:"Capacity Planning",            a:true,  m:"Team only",    mb:"View"},
                        {f:"Productivity Analytics",       a:true,  m:"Team only",    mb:"View"},
                      ]},
                      {section:"Activities", items:[
                        {f:"View activities",              a:true,  m:true,           mb:"Team only"},
                        {f:"Create new activity",          a:false, m:true,           mb:false},
                        {f:"Edit / delete activity",       a:false, m:"Own team",     mb:false},
                      ]},
                      {section:"Time Logging", items:[
                        {f:"Log time",                     a:false, m:true,           mb:true},
                        {f:"Edit own time entries",        a:false, m:true,           mb:true},
                        {f:"Delete time entries",          a:false, m:true,           mb:true},
                        {f:"View all team time logs",      a:true,  m:"Team only",    mb:"Own only"},
                      ]},
                      {section:"User & Team Management", items:[
                        {f:"View all users",               a:true,  m:"Team only",    mb:"Team only"},
                        {f:"Add users",                    a:true,  m:"Own team",     mb:false},
                        {f:"Edit users",                   a:true,  m:"Own members",  mb:false},
                        {f:"Deactivate / delete users",    a:true,  m:false,          mb:false},
                        {f:"Create teams",                 a:true,  m:false,          mb:false},
                        {f:"Edit / rename teams",          a:true,  m:false,          mb:false},
                        {f:"Delete teams",                 a:true,  m:false,          mb:false},
                      ]},
                      {section:"Data Connect", items:[
                        {f:"Upload ticket CSV",            a:true,  m:true,           mb:false},
                        {f:"Configure integrations",       a:true,  m:false,          mb:false},
                      ]},
                      {section:"System", items:[
                        {f:"System settings",              a:true,  m:"Limited",      mb:false},
                        {f:"User Management page",         a:true,  m:"Own team",     mb:false},
                        {f:"Audit log",                    a:true,  m:"Own actions",  mb:false},
                      ]},
                    ].map(section=>(
                      <React.Fragment key={section.section}>
                        <tr>
                          <td colSpan={4} style={{padding:"10px 16px 4px",fontSize:10,fontWeight:800,color:"#9ca3af",textTransform:"uppercase",letterSpacing:1.2,background:"#f8fafc",borderBottom:"1px solid #e8edf5",borderTop:"2px solid #e8edf5"}}>{section.section}</td>
                        </tr>
                        {section.items.map((item,ii)=>(
                          <tr key={item.f} style={{background:ii%2===0?"#fff":"#fafbfc",borderBottom:"1px solid #f1f5f9"}}>
                            <td style={{padding:"10px 16px",fontSize:12.5,color:"#374151",fontWeight:500}}>{item.f}</td>
                            {[item.a, item.m, item.mb].map((val,ci)=>{
                              const isTrue  = val===true;
                              const isFalse = val===false;
                              const isText  = typeof val==="string";
                              return (
                                <td key={ci} style={{padding:"10px 16px",textAlign:"center"}}>
                                  {isTrue  && <span style={{color:"#059669",fontSize:16,fontWeight:700}}>✓</span>}
                                  {isFalse && <span style={{color:"#e5e7eb",fontSize:14}}>—</span>}
                                  {isText  && <span style={{fontSize:11,background:"#fffbeb",color:"#92400e",padding:"2px 8px",borderRadius:8,fontWeight:600}}>{val}</span>}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB: AUDIT LOG
        ══════════════════════════════════════ */}
        {tab==="audit" && (
          <Card style={{padding:0,overflow:"hidden"}}>
            <div style={{padding:"14px 18px",borderBottom:"1px solid #f1f5f9",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontWeight:700,fontSize:14,color:"#0f172a"}}>Audit Log</div>
                <div style={{fontSize:11,color:"#6b7280",marginTop:2}}>All user management actions recorded in chronological order</div>
              </div>
              <span style={{fontSize:11,background:"#f1f5f9",color:"#6b7280",padding:"3px 10px",borderRadius:10,fontWeight:600}}>{auditLog.length} entries</span>
            </div>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead>
                <tr>
                  <TH c="Timestamp"/><TH c="Performed By"/><TH c="Action"/><TH c="Target"/><TH c="Details"/>
                </tr>
              </thead>
              <tbody>
                {auditLog.map((entry,i)=>(
                  <tr key={entry.id} style={{background:i%2===0?"#fff":"#fafbfc",borderBottom:"1px solid #f1f5f9"}}>
                    <TD s={{fontSize:11,color:"#9ca3af",whiteSpace:"nowrap"}}>{entry.ts}</TD>
                    <TD>
                      <div style={{display:"flex",alignItems:"center",gap:7}}>
                        <div style={{width:24,height:24,borderRadius:"50%",background:"#eff6ff",color:"#1a56db",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,flexShrink:0}}>
                          {entry.by.split(" ").map(n=>n[0]).join("")}
                        </div>
                        <span style={{fontWeight:600,fontSize:12}}>{entry.by}</span>
                      </div>
                    </TD>
                    <TD>
                      <span style={{fontSize:11,fontWeight:700,padding:"2px 9px",borderRadius:10,
                        background:entry.action.includes("Creat")?"#f0fdf4":entry.action.includes("Delet")?"#fef2f2":entry.action.includes("Updat")||entry.action.includes("Chang")?"#fffbeb":"#f5f3ff",
                        color:entry.action.includes("Creat")?"#166534":entry.action.includes("Delet")?"#991b1b":entry.action.includes("Updat")||entry.action.includes("Chang")?"#92400e":"#4c1d95"}}>
                        {entry.action}
                      </span>
                    </TD>
                    <TD s={{fontWeight:700,fontSize:12}}>{entry.target}</TD>
                    <TD s={{fontSize:11,color:"#6b7280"}}>{entry.detail}</TD>
                  </tr>
                ))}
                {auditLog.length===0 && <tr><td colSpan={5} style={{textAlign:"center",padding:40,color:"#9ca3af"}}>No audit entries yet.</td></tr>}
              </tbody>
            </table>
          </Card>
        )}

        {/* ══════════════════════════════════════
            MODALS
        ══════════════════════════════════════ */}

        {/* Add / Edit User modal */}
        {uModal && (
          <ModalWrap title={uTarget?"✏️ Edit User":"👤 Add User"} onClose={()=>setUModal(false)}>
            <div style={{display:"grid",gap:13}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div style={{gridColumn:"1/-1"}}>
                  <Lbl t="Full Name *">
                    <input style={iS2} value={uForm.name} onChange={e=>setUForm(p=>({...p,name:e.target.value}))} placeholder="e.g. John Smith"/>
                  </Lbl>
                </div>
                <Lbl t="Job Title">
                  <input style={iS2} value={uForm.title} onChange={e=>setUForm(p=>({...p,title:e.target.value}))} placeholder="e.g. Network Engineer"/>
                </Lbl>
                <Lbl t="Email">
                  <input style={iS2} type="email" value={uForm.email} onChange={e=>setUForm(p=>({...p,email:e.target.value}))} placeholder="john@company.com"/>
                </Lbl>
                <Lbl t={isMgr?"Team (fixed)":"Team"}>
                  <select style={iS2} value={uForm.team||""} onChange={e=>setUForm(p=>({...p,team:e.target.value||null}))} disabled={isMgr}>
                    <option value="">— No team —</option>
                    {(isMgr?teams.filter(t=>t.name===user.team):teams).map(t=>(
                      <option key={t.name} value={t.name}>{t.emoji} {t.name}</option>
                    ))}
                  </select>
                </Lbl>
                <Lbl t={isMgr?"Role (fixed)":"Role *"}>
                  <select style={iS2} value={uForm.role} onChange={e=>setUForm(p=>({...p,role:e.target.value}))} disabled={isMgr}>
                    <option value="admin">🛡️ Administrator</option>
                    <option value="manager">👑 Manager</option>
                    <option value="member">👤 Member</option>
                  </select>
                  {isMgr && <div style={{fontSize:10,color:"#9ca3af",marginTop:3}}>Managers can only add Members</div>}
                </Lbl>
                {isAdmin && (
                  <Lbl t="Status">
                    <select style={iS2} value={uForm.status} onChange={e=>setUForm(p=>({...p,status:e.target.value}))}>
                      <option value="Active">● Active</option>
                      <option value="Inactive">○ Inactive</option>
                    </select>
                  </Lbl>
                )}
              {isAdmin && uTarget && (
                <div style={{gridColumn:"1/-1"}}>
                  <div style={{height:1,background:"#f1f5f9",margin:"4px 0 12px"}}/>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:uForm.resetPw?12:0}}>
                    <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
                      <input type="checkbox" checked={uForm.resetPw} onChange={e=>setUForm(p=>({...p,resetPw:e.target.checked,newPw:""}))} style={{width:15,height:15,cursor:"pointer"}}/>
                      <span style={{fontSize:12,fontWeight:600,color:"#374151"}}>🔑 Reset password for this user</span>
                    </label>
                  </div>
                  {uForm.resetPw && (
                    <div style={{marginTop:8}}>
                      <Lbl t="Temporary Password">
                        <input style={iS2} type="text" value={uForm.newPw} onChange={e=>setUForm(p=>({...p,newPw:e.target.value}))} placeholder="Temporary password (user must change on next login)"/>
                      </Lbl>
                      <div style={{fontSize:10,color:"#f97316",marginTop:4}}>⚠️ User will be forced to change this password on next login</div>
                    </div>
                  )}
                </div>
              )}
              </div>

              {/* Preview card */}
              <div style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:40,height:40,borderRadius:"50%",background:uForm.team?`${tCol(uForm.team)}22`:"#f5f3ff",color:uForm.team?tCol(uForm.team):"#6366f1",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,flexShrink:0}}>
                  {uForm.name?uForm.name.split(" ").filter(Boolean).map(n=>n[0]).join("").slice(0,2):"?"}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:700,fontSize:13,color:"#0f172a"}}>{uForm.name||"Full Name"}</div>
                  <div style={{fontSize:11,color:"#6b7280"}}>{uForm.title||"Job Title"} {uForm.email&&`· ${uForm.email}`}</div>
                </div>
                <span style={{fontSize:11,background:roleBg(uForm.role),color:roleColor(uForm.role),padding:"3px 10px",borderRadius:12,fontWeight:700,flexShrink:0}}>
                  {roleLabel(uForm.role)}
                </span>
                {uForm.team && <TPill t={uForm.team}/>}
              </div>
            </div>
            <MFoot onClose={()=>setUModal(false)} onSave={saveUser} label={uTarget?"Save Changes":"Add User"}/>
          </ModalWrap>
        )}

        {/* Add / Edit Team modal */}
        {tModal && (
          <ModalWrap title={tTarget?"✏️ Edit Team":"🏗 New Team"} onClose={()=>setTModal(false)}>
            <div style={{display:"grid",gap:13}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <Lbl t="Team Name *">
                  <input style={iS2} value={tForm.name} onChange={e=>setTForm(p=>({...p,name:e.target.value}))} placeholder="e.g. DevOps"/>
                </Lbl>
                <Lbl t="Team Lead">
                  <select style={iS2} value={tForm.lead} onChange={e=>setTForm(p=>({...p,lead:e.target.value}))}>
                    <option value="">— Select lead —</option>
                    {allUsers.filter(u=>u.role==="manager"||u.role==="admin").map(u=><option key={u.id} value={u.name}>{u.name}</option>)}
                  </select>
                </Lbl>
                <div style={{gridColumn:"1/-1"}}>
                  <Lbl t="Description">
                    <input style={iS2} value={tForm.desc} onChange={e=>setTForm(p=>({...p,desc:e.target.value}))} placeholder="Short description of this team's function"/>
                  </Lbl>
                </div>
              </div>
              <Lbl t="Emoji Icon">
                <div style={{display:"flex",gap:7,flexWrap:"wrap",marginTop:4}}>
                  {EMOJIS.map(e=>(
                    <button key={e} onClick={()=>setTForm(p=>({...p,emoji:e}))} style={{width:34,height:34,borderRadius:7,border:`2px solid ${tForm.emoji===e?"#1a56db":"#e5e7eb"}`,background:tForm.emoji===e?"#eff6ff":"#fff",fontSize:16,cursor:"pointer"}}>{e}</button>
                  ))}
                </div>
              </Lbl>
              <Lbl t="Team Colour">
                <div style={{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center",marginTop:4}}>
                  {TCOLORS.map(c=>(
                    <button key={c} onClick={()=>setTForm(p=>({...p,color:c}))} style={{width:30,height:30,borderRadius:"50%",background:c,border:`3px solid ${tForm.color===c?"#0f172a":"transparent"}`,cursor:"pointer"}}/>
                  ))}
                  <input type="color" value={tForm.color} onChange={e=>setTForm(p=>({...p,color:e.target.value}))} style={{width:30,height:30,borderRadius:"50%",border:"1px solid #e2e8f0",cursor:"pointer",padding:1}}/>
                </div>
              </Lbl>
              {/* Preview */}
              <div style={{padding:"12px 16px",borderRadius:10,background:`${tForm.color}12`,border:`1.5px solid ${tForm.color}40`,display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:24}}>{tForm.emoji}</span>
                <div style={{flex:1}}>
                  <div style={{fontWeight:800,fontSize:14,color:"#0f172a"}}>{tForm.name||"Team Name"}</div>
                  <div style={{fontSize:11,color:"#6b7280"}}>Lead: {tForm.lead||"—"} {tForm.desc&&`· ${tForm.desc}`}</div>
                </div>
                <div style={{width:40,height:8,borderRadius:4,background:tForm.color}}/>
              </div>
            </div>
            <MFoot onClose={()=>setTModal(false)} onSave={saveTeam} label={tTarget?"Save Changes":"Create Team"}/>
          </ModalWrap>
        )}

        {/* Delete User confirm */}
        {uConfirm && (
          <ModalWrap title="🗑 Remove User" onClose={()=>setUConfirm(null)}>
            <div style={{textAlign:"center",padding:"8px 0 18px"}}>
              <div style={{fontSize:44,marginBottom:12}}>⚠️</div>
              <div style={{fontSize:15,fontWeight:700,color:"#0f172a",marginBottom:6}}>Remove {uConfirm.name}?</div>
              <div style={{fontSize:12,color:"#6b7280",lineHeight:1.6}}>This will remove the user from ISMS.<br/>Their existing time log entries will be preserved.</div>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button onClick={()=>setUConfirm(null)} style={{padding:"9px 22px",borderRadius:9,background:"#fff",border:"1px solid #e2e8f0",fontWeight:600,fontSize:13,cursor:"pointer"}}>Cancel</button>
              <button onClick={deleteUser} style={{padding:"9px 22px",borderRadius:9,background:"#dc2626",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>Remove User</button>
            </div>
          </ModalWrap>
        )}

        {/* Delete Team confirm */}
        {tConfirm && (()=>{
          const hm=allUsers.filter(u=>u.team===tConfirm).length;
          const ha=acts.filter(a=>a.team===tConfirm).length;
          return (
            <ModalWrap title="🗑 Delete Team" onClose={()=>setTConfirm(null)}>
              <div style={{textAlign:"center",padding:"8px 0 18px"}}>
                <div style={{fontSize:44,marginBottom:12}}>⚠️</div>
                <div style={{fontSize:15,fontWeight:700,color:"#0f172a",marginBottom:8}}>Delete "{tConfirm}" team?</div>
                {(hm>0||ha>0) && (
                  <div style={{background:"#fff7ed",border:"1px solid #fed7aa",borderRadius:9,padding:"10px 14px",marginBottom:10,fontSize:12,color:"#92400e",textAlign:"left"}}>
                    ⚠️ This team has <strong>{hm} member{hm!==1?"s":""}</strong> and <strong>{ha} activit{ha!==1?"ies":"y"}</strong>. Deleting it will unlink these records.
                  </div>
                )}
                <div style={{fontSize:12,color:"#6b7280"}}>This cannot be undone.</div>
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
                <button onClick={()=>setTConfirm(null)} style={{padding:"9px 22px",borderRadius:9,background:"#fff",border:"1px solid #e2e8f0",fontWeight:600,fontSize:13,cursor:"pointer"}}>Cancel</button>
                <button onClick={deleteTeam} style={{padding:"9px 22px",borderRadius:9,background:"#dc2626",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>Delete Team</button>
              </div>
            </ModalWrap>
          );
        })()}
      </div>
    );
  };


  // ════════════════════════════════════════════════════════════════════
  //  PAGE: CHANGE PASSWORD
  // ════════════════════════════════════════════════════════════════════
  const PageChangePw = () => {
    const [cur,  setCur]  = React.useState("");
    const [np,   setNp]   = React.useState("");
    const [cp,   setCp]   = React.useState("");
    const [showC,setShowC]= React.useState(false);
    const [showN,setShowN]= React.useState(false);
    const [err,  setErr]  = React.useState("");
    const [done, setDone] = React.useState(false);

    const rules = [
      {label:"At least 8 characters",  ok:np.length>=8},
      {label:"Uppercase letter (A-Z)", ok:/[A-Z]/.test(np)},
      {label:"Lowercase letter (a-z)", ok:/[a-z]/.test(np)},
      {label:"Number (0-9)",           ok:/[0-9]/.test(np)},
      {label:"Special character",      ok:/[^A-Za-z0-9]/.test(np)},
    ];
    const strength = rules.filter(r=>r.ok).length;
    const strengthLabel = ["","Weak","Fair","Good","Strong","Very Strong"][strength];
    const strengthColor = ["","#dc2626","#f97316","#eab308","#22c55e","#059669"][strength];
    const allRules = rules.every(r=>r.ok);

    const save = () => {
      setErr("");
      if(!cur){ setErr("Enter your current password"); return; }
      if(user.password !== cur){ setErr("Current password is incorrect"); return; }
      if(!allRules){ setErr("New password does not meet all requirements"); return; }
      if(np !== cp){ setErr("Passwords do not match"); return; }
      if(np === cur){ setErr("New password must be different from current password"); return; }
      setAllUsers(p=>p.map(u=>u.id===user.id?{...u,password:np,mustReset:false}:u));
      setUser(p=>({...p,password:np}));
      setDone(true);
    };

    const iS2 = {width:"100%",padding:"10px 42px 10px 14px",borderRadius:10,border:"1.5px solid #e2e8f0",fontSize:13,fontFamily:"inherit",outline:"none",background:"#fff",boxSizing:"border-box"};

    if(done) return (
      <div style={{maxWidth:480,margin:"60px auto",textAlign:"center"}}>
        <Card style={{padding:48}}>
          <div style={{fontSize:48,marginBottom:16}}>✅</div>
          <div style={{fontSize:20,fontWeight:800,color:"#059669",marginBottom:8}}>Password Changed!</div>
          <div style={{fontSize:13,color:"#6b7280",marginBottom:24}}>Your password has been updated successfully.</div>
          <button onClick={()=>goPage("dashboard")} style={{padding:"10px 28px",borderRadius:10,background:"linear-gradient(135deg,#1a56db,#0891b2)",color:"#fff",border:"none",fontWeight:700,fontSize:14,cursor:"pointer"}}>
            Back to Dashboard
          </button>
        </Card>
      </div>
    );

    return (
      <div style={{maxWidth:520,margin:"0 auto"}}>
        <div style={{marginBottom:22}}>
          <div style={{fontSize:20,fontWeight:800,color:"#0f172a"}}>🔑 Change Password</div>
          <div style={{fontSize:12,color:"#6b7280",marginTop:3}}>Update your ISMS account password</div>
        </div>

        <Card style={{marginBottom:14}}>
          {/* Who is changing */}
          <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:"#f8fafc",borderRadius:10,border:"1px solid #e2e8f0",marginBottom:20}}>
            <div style={{width:38,height:38,borderRadius:"50%",background:`${tc}22`,color:tc,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,flexShrink:0}}>
              {user.name.split(" ").map(n=>n[0]).join("")}
            </div>
            <div>
              <div style={{fontWeight:700,fontSize:14,color:"#0f172a"}}>{user.name}</div>
              <div style={{fontSize:11,color:"#6b7280"}}>{user.email||user.username} · {user.title}</div>
            </div>
          </div>

          {err && (
            <div style={{background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:9,padding:"10px 14px",marginBottom:16,fontSize:12,color:"#dc2626",display:"flex",gap:8,alignItems:"center"}}>
              <span>⚠️</span>{err}
            </div>
          )}

          {/* Current password */}
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:6,textTransform:"uppercase",letterSpacing:.8}}>Current Password</div>
            <div style={{position:"relative"}}>
              <input type={showC?"text":"password"} value={cur} onChange={e=>{setCur(e.target.value);setErr("");}}
                style={{...iS2}} placeholder="Your current password"/>
              <button onClick={()=>setShowC(s=>!s)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:15}}>{showC?"🙈":"👁"}</button>
            </div>
          </div>

          <div style={{height:1,background:"#f1f5f9",margin:"18px 0"}}/>

          {/* New password */}
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:6,textTransform:"uppercase",letterSpacing:.8}}>New Password</div>
            <div style={{position:"relative"}}>
              <input type={showN?"text":"password"} value={np} onChange={e=>{setNp(e.target.value);setErr("");}}
                style={{...iS2}} placeholder="Enter new password"/>
              <button onClick={()=>setShowN(s=>!s)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:15}}>{showN?"🙈":"👁"}</button>
            </div>
            {/* Strength meter */}
            {np && (
              <div style={{marginTop:8}}>
                <div style={{height:4,background:"#f1f5f9",borderRadius:2,overflow:"hidden",marginBottom:4}}>
                  <div style={{height:"100%",width:`${strength*20}%`,background:strengthColor,borderRadius:2,transition:"width .3s,background .3s"}}/>
                </div>
                <span style={{fontSize:11,fontWeight:600,color:strengthColor}}>{strengthLabel}</span>
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div style={{marginBottom:18}}>
            <div style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:6,textTransform:"uppercase",letterSpacing:.8}}>Confirm New Password</div>
            <div style={{position:"relative"}}>
              <input type="password" value={cp} onChange={e=>{setCp(e.target.value);setErr("");}}
                style={{...iS2,borderColor:cp&&cp!==np?"#fca5a5":cp&&cp===np?"#86efac":"#e2e8f0"}} placeholder="Re-enter new password"/>
              {cp && <span style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",fontSize:16}}>{cp===np?"✅":"❌"}</span>}
            </div>
          </div>

          {/* Password requirements */}
          <div style={{background:"#f8fafc",borderRadius:10,padding:"12px 14px",marginBottom:20}}>
            <div style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:8,textTransform:"uppercase",letterSpacing:.8}}>Password Requirements</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
              {rules.map(r=>(
                <div key={r.label} style={{display:"flex",alignItems:"center",gap:7,fontSize:12,color:r.ok?"#059669":"#94a3b8"}}>
                  <span style={{fontWeight:700,flexShrink:0}}>{r.ok?"✓":"○"}</span>{r.label}
                </div>
              ))}
            </div>
          </div>

          <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
            <button onClick={()=>goPage("dashboard")} style={{padding:"10px 22px",borderRadius:10,background:"#fff",border:"1px solid #e2e8f0",fontWeight:600,fontSize:13,cursor:"pointer",color:"#374151"}}>Cancel</button>
            <button onClick={save} disabled={!allRules||np!==cp||!cur}
              style={{padding:"10px 24px",borderRadius:10,background:allRules&&np===cp&&cur?"linear-gradient(135deg,#1a56db,#0891b2)":"#e2e8f0",color:allRules&&np===cp&&cur?"#fff":"#9ca3af",border:"none",fontWeight:700,fontSize:13,cursor:allRules&&np===cp&&cur?"pointer":"not-allowed",transition:"all .2s"}}>
              🔑 Update Password
            </button>
          </div>
        </Card>
      </div>
    );
  };

  // ════════════════════════════════════════════════════════════════════
  //  PAGE: MY PROFILE
  // ════════════════════════════════════════════════════════════════════
  const PageMyProfile = () => {
    const [editing, setEditing] = React.useState(false);
    const [form,    setForm]    = React.useState({name:user.name,title:user.title||"",email:user.email||""});
    const iS2 = {width:"100%",padding:"10px 14px",borderRadius:10,border:"1.5px solid #e2e8f0",fontSize:13,fontFamily:"inherit",outline:"none",background:"#fff",boxSizing:"border-box"};
    const uLogs  = logs.filter(l=>l.userId===user.id);
    const uHours = uLogs.reduce((s,l)=>s+l.mins,0);
    const uActs  = [...new Set(uLogs.map(l=>l.actId))].length;

    const save = () => {
      if(!form.name.trim()){ showToast("Name is required","err"); return; }
      setAllUsers(p=>p.map(u=>u.id===user.id?{...u,...form,name:form.name.trim()}:u));
      setUser(p=>({...p,...form,name:form.name.trim()}));
      setEditing(false);
      showToast("Profile updated");
    };

    return (
      <div style={{maxWidth:640,margin:"0 auto"}}>
        <div style={{marginBottom:22}}>
          <div style={{fontSize:20,fontWeight:800,color:"#0f172a"}}>👤 My Profile</div>
          <div style={{fontSize:12,color:"#6b7280",marginTop:3}}>Manage your personal information and account settings</div>
        </div>

        {/* Profile header card */}
        <Card style={{marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:18,marginBottom:20}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:`${tc}22`,color:tc,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:800,border:`3px solid ${tc}44`,flexShrink:0}}>
              {user.name.split(" ").map(n=>n[0]).join("")}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:20,fontWeight:800,color:"#0f172a"}}>{user.name}</div>
              <div style={{fontSize:13,color:"#6b7280",marginTop:2}}>{user.title||"—"}</div>
              <div style={{display:"flex",gap:8,marginTop:6,flexWrap:"wrap"}}>
                <span style={{fontSize:11,background:user.role==="admin"?"#f5f3ff":user.role==="manager"?"#eff6ff":"#f0fdf4",color:user.role==="admin"?"#6366f1":user.role==="manager"?"#1a56db":"#059669",padding:"2px 10px",borderRadius:12,fontWeight:700}}>
                  {user.role==="admin"?"🛡️ Administrator":user.role==="manager"?"👑 Manager":"👤 Member"}
                </span>
                {user.team && <TPill t={user.team}/>}
                <span style={{fontSize:11,background:"#dcfce7",color:"#166534",padding:"2px 10px",borderRadius:12,fontWeight:600}}>● Active</span>
              </div>
            </div>
            <button onClick={()=>setEditing(e=>!e)} style={{padding:"8px 18px",borderRadius:9,background:editing?"#f1f5f9":"#fff",border:"1px solid #e2e8f0",cursor:"pointer",fontWeight:600,fontSize:12,color:"#374151"}}>
              {editing?"✕ Cancel":"✏️ Edit"}
            </button>
          </div>

          {editing ? (
            <div style={{display:"grid",gap:12,paddingTop:4}}>
              <Lbl t="Full Name *"><input style={iS2} value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Full name"/></Lbl>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <Lbl t="Job Title"><input style={iS2} value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="e.g. Network Engineer"/></Lbl>
                <Lbl t="Email"><input style={iS2} type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="your@email.com"/></Lbl>
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"flex-end",paddingTop:4}}>
                <button onClick={()=>setEditing(false)} style={{padding:"9px 20px",borderRadius:9,background:"#fff",border:"1px solid #e2e8f0",fontWeight:600,fontSize:13,cursor:"pointer",color:"#374151"}}>Cancel</button>
                <button onClick={save} style={{padding:"9px 20px",borderRadius:9,background:"linear-gradient(135deg,#1a56db,#0891b2)",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>Save Changes</button>
              </div>
            </div>
          ) : (
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[["Username",user.username||"—"],["Email",user.email||"—"],["Team",user.team||"—"],["Last Login",user.lastLogin||"—"]].map(([l,v])=>(
                <div key={l} style={{background:"#f8fafc",borderRadius:9,padding:"10px 14px"}}>
                  <div style={{fontSize:10,color:"#9ca3af",fontWeight:700,textTransform:"uppercase",letterSpacing:.8,marginBottom:3}}>{l}</div>
                  <div style={{fontSize:13,fontWeight:600,color:"#0f172a"}}>{v}</div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Activity stats */}
        <Card style={{marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:14,color:"#0f172a",marginBottom:14}}>My Activity Stats</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
            {[["⏱","Hours Logged",fmtM(uHours),"#1a56db","#eff6ff"],["📋","Activities",uActs,"#7c3aed","#f5f3ff"],["📝","Log Entries",uLogs.length,"#059669","#f0fdf4"]].map(([icon,l,v,c,bg])=>(
              <div key={l} style={{textAlign:"center",background:bg,borderRadius:10,padding:"14px 8px"}}>
                <div style={{fontSize:20,marginBottom:6}}>{icon}</div>
                <div style={{fontSize:22,fontWeight:800,color:c}}>{v}</div>
                <div style={{fontSize:11,color:"#6b7280",marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick actions */}
        <Card>
          <div style={{fontWeight:700,fontSize:14,color:"#0f172a",marginBottom:14}}>Account Actions</div>
          <div style={{display:"grid",gap:10}}>
            {[
              {icon:"🔑",label:"Change Password",sub:"Update your login password",nav:"changepw",color:"#1a56db"},
              {icon:"🕐",label:"View My Time Log",sub:"See all your logged time entries",nav:"timelog",color:"#059669"},
              {icon:"🔐",label:"User Management",sub:"Manage users and teams",nav:"usermgmt",color:"#7c3aed",hide:!isMgrOrAdmin},
            ].filter(a=>!a.hide).map(a=>(
              <div key={a.nav} onClick={()=>goPage(a.nav)} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 14px",borderRadius:10,border:`1px solid ${a.color}20`,background:`${a.color}06`,cursor:"pointer",transition:"all .15s"}}
                onMouseEnter={e=>e.currentTarget.style.background=`${a.color}12`}
                onMouseLeave={e=>e.currentTarget.style.background=`${a.color}06`}>
                <div style={{width:36,height:36,borderRadius:9,background:`${a.color}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{a.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:13,color:"#0f172a"}}>{a.label}</div>
                  <div style={{fontSize:11,color:"#6b7280"}}>{a.sub}</div>
                </div>
                <span style={{color:"#c8d2e0",fontSize:16}}>→</span>
              </div>
            ))}
            <div onClick={handleLogout} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 14px",borderRadius:10,border:"1px solid #fca5a520",background:"#fef2f208",cursor:"pointer",transition:"all .15s"}}
              onMouseEnter={e=>e.currentTarget.style.background="#fef2f2"}
              onMouseLeave={e=>e.currentTarget.style.background="#fef2f208"}>
              <div style={{width:36,height:36,borderRadius:9,background:"#fef2f2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>🚪</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:13,color:"#dc2626"}}>Sign Out</div>
                <div style={{fontSize:11,color:"#6b7280"}}>Log out of ISMS</div>
              </div>
              <span style={{color:"#c8d2e0",fontSize:16}}>→</span>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const PAGES = {
    dashboard: PageDashboard,
    activities: PageActivities,
    timelog: PageTimelog,
    teams: PageTeams,
    members: PageMembers,
    bandwidth: PageBandwidth,
    reports: PageReports,
    custreports: PageCustomReports,
    planning: PagePlanning,
    settings: PageSettings,
    prod_overview: PageProdOverview,
    prod_flags: PageProdFlags,
    prod_heatmap: PageProdHeatmap,
    prod_suggest: PageProdSuggest,
    dc_upload: PageDCUpload,
    dc_integrations: PageDCIntegrations,
    usermgmt: PageUserMgmt,
    changepw: PageChangePw,
    myprofile: PageMyProfile,
  };
  const CurPage = PAGES[page] || PageDashboard;

  // ── LOG TIME TABLE COMPONENT (proper component so hooks are legal) ──
  const LogTimeTable = () => {
    const [tblSearch,  setTblSearch]  = React.useState("");
    const [tblFilter,  setTblFilter]  = React.useState({type:"",nature:"",workNature:""});
    const [rowForms,   setRowForms]   = React.useState({});
    const [saving,     setSaving]     = React.useState(null);

    const visibleActs = loggable.filter(a=>{
      const q = tblSearch.toLowerCase();
      const matchQ = !q || a.name.toLowerCase().includes(q) || (a.ticketNo||"").toLowerCase().includes(q) || (a.jira||"").toLowerCase().includes(q);
      const matchT = !tblFilter.type       || a.type===tblFilter.type;
      const matchN = !tblFilter.nature     || a.nature===tblFilter.nature;
      const matchW = !tblFilter.workNature || a.workNature===tblFilter.workNature;
      return matchQ && matchT && matchN && matchW;
    });

    const getRow = (id) => rowForms[id] || {mins:60, date:today(), notes:""};
    const setRow = (id, patch) => setRowForms(p=>({...p,[id]:{...getRow(id),...patch}}));

    const logRow = (a) => {
      const row = getRow(a.id);
      if(+row.mins < 1){ showToast("Enter minutes > 0","err"); return; }
      setSaving(a.id);
      setTimeout(()=>{
        setLogs(p=>[{id:uid("TL"),date:row.date,userId:user.id,member:user.name,
          team:a.team,actId:a.id,activity:a.name,type:a.type,cat:a.cat,
          mins:+row.mins,notes:row.notes},...p]);
        showToast(`${fmtM(+row.mins)} logged on "${a.name}"`);
        setRowForms(p=>{const n={...p}; delete n[a.id]; return n;});
        setSaving(null);
      }, 300);
    };

    const todayLogged = (id) => logs.filter(l=>l.actId===id&&l.userId===user.id&&l.date===today()).reduce((s,l)=>s+l.mins,0);

    return (
      <div style={{position:"fixed",inset:0,background:"rgba(15,23,42,.55)",zIndex:3000,
        display:"flex",alignItems:"flex-start",justifyContent:"center",
        padding:"20px 16px",overflowY:"auto"}}>
        <div style={{background:"#fff",borderRadius:14,width:"100%",maxWidth:1200,
          boxShadow:"0 24px 60px rgba(15,23,42,.3)",overflow:"hidden",
          marginBottom:20}}>

          {/* Header */}
          <div style={{background:"linear-gradient(135deg,#0f172a 0%,#1a3a6e 60%,#0e4f8a 100%)",
            padding:"20px 28px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(255,255,255,.08)"}}>
            <div>
              <div style={{fontSize:18,fontWeight:800,color:"#fff",fontFamily:"'DM Sans',sans-serif",letterSpacing:-.3}}>⏱ Log Time</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.6)",marginTop:3}}>
                Logging as <strong style={{color:"#60a5fa"}}>{user.name}</strong>
                {user.team && <> · {user.team} team</>}
                {" "}· {loggable.length} activit{loggable.length===1?"y":"ies"} available
              </div>
            </div>
            <button onClick={closeM} style={{background:"rgba(255,255,255,.12)",border:"none",
              color:"#fff",width:34,height:34,borderRadius:"50%",cursor:"pointer",
              fontSize:17,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          </div>

          {/* Filters */}
          <div style={{padding:"12px 20px",background:"#f7f9fc",borderBottom:"1px solid #dde3ed",
            display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
            <input placeholder="🔍 Search activity or ticket…"
              value={tblSearch} onChange={e=>setTblSearch(e.target.value)}
              style={{flex:1,minWidth:180,padding:"7px 11px",borderRadius:8,
                border:"1px solid #c8d2e0",fontSize:12}}/>
            {[
              ["type",["","Project","Incident","Change","BAU","Training","Meeting"],"All Types"],
              ["nature",["","Proactive","Reactive"],"All Natures"],
              ["workNature",["","Request","Change","Incident"],"All Work Types"],
            ].map(([k,opts,ph])=>(
              <select key={k} value={tblFilter[k]}
                onChange={e=>setTblFilter(f=>({...f,[k]:e.target.value}))}
                style={{padding:"7px 10px",borderRadius:8,border:"1px solid #c8d2e0",
                  fontSize:12,background:"#fff"}}>
                {opts.map(o=><option key={o} value={o}>{o||ph}</option>)}
              </select>
            ))}
            <span style={{fontSize:12,color:"#6b7280",whiteSpace:"nowrap",
              background:"#e0e7ff",padding:"4px 10px",borderRadius:20,fontWeight:600}}>
              {visibleActs.length} shown
            </span>
          </div>

          {/* Table */}
          <div style={{overflowX:"auto",maxHeight:"calc(100vh - 240px)",overflowY:"auto"}}>
            {visibleActs.length===0 ? (
              <div style={{textAlign:"center",padding:60,color:"#9ca3af",fontSize:14}}>
                ⚠️ No activities match your filters.
              </div>
            ) : (
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"'DM Sans',sans-serif"}}>
                <thead style={{position:"sticky",top:0,zIndex:10}}>
                  <tr style={{background:"#1e293b"}}>
                    {["Activity & Progress","Ticket","Type","Nature","Work Type","Status","Estimate","Logged Today","Time to Log","Date","Notes",""].map(h=>(
                      <th key={h} style={{padding:"11px 12px",textAlign:"left",fontSize:10,
                        fontWeight:700,color:"rgba(255,255,255,.7)",textTransform:"uppercase",
                        letterSpacing:.8,whiteSpace:"nowrap",borderBottom:"none"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visibleActs.map((a,i)=>{
                    const row      = getRow(a.id);
                    const todayMin = todayLogged(a.id);
                    const myTotal  = logs.filter(l=>l.actId===a.id&&l.userId===user.id).reduce((s,l)=>s+l.mins,0);
                    const pct      = Math.min(100,Math.round(myTotal/Math.max(a.estMins,1)*100));
                    const col      = tCol(a.team);
                    const isSaving = saving===a.id;
                    const rowBg    = i%2===0 ? "#fff" : "#fafbfc";
                    return (
                      <tr key={a.id} style={{background:rowBg,borderBottom:"1px solid #f1f5f9"}}
                        onMouseEnter={e=>e.currentTarget.style.background="#eff6ff"}
                        onMouseLeave={e=>e.currentTarget.style.background=rowBg}>

                        {/* Activity + progress */}
                        <td style={{padding:"10px 12px",minWidth:210}}>
                          <div style={{fontWeight:700,color:"#0f172a",fontSize:13,marginBottom:2}}>{a.name}</div>
                          <div style={{fontSize:10,color:"#9ca3af",marginBottom:5,
                            maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.desc}</div>
                          <div style={{height:4,background:"#f1f5f9",borderRadius:2,width:"100%",overflow:"hidden"}}>
                            <div style={{height:"100%",width:`${pct}%`,
                              background:pct>=100?"#dc2626":pct>=75?"#d97706":col,borderRadius:2,
                              transition:"width .4s"}}/>
                          </div>
                          <div style={{fontSize:9,color:"#9ca3af",marginTop:2}}>{pct}% of your estimate used</div>
                        </td>

                        {/* Ticket */}
                        <td style={{padding:"10px 10px",whiteSpace:"nowrap"}}>
                          <code style={{background:"#f1f5f9",padding:"3px 7px",borderRadius:5,
                            fontSize:11,fontWeight:700,color:"#374151"}}>
                            {a.ticketNo||a.jira||"—"}
                          </code>
                        </td>

                        {/* Type */}
                        <td style={{padding:"10px 8px",fontSize:12,color:"#374151",whiteSpace:"nowrap"}}>{a.type}</td>

                        {/* Nature */}
                        <td style={{padding:"10px 8px",whiteSpace:"nowrap"}}>
                          <NaturePill n={a.nature||"Proactive"}/>
                        </td>

                        {/* Work Type */}
                        <td style={{padding:"10px 8px",whiteSpace:"nowrap"}}>
                          <WNPill w={a.workNature||"Request"}/>
                        </td>

                        {/* Status */}
                        <td style={{padding:"10px 8px",whiteSpace:"nowrap"}}>
                          <SPill s={a.status}/>
                        </td>

                        {/* Estimate */}
                        <td style={{padding:"10px 8px",whiteSpace:"nowrap",fontSize:12,fontWeight:600,color:"#374151"}}>
                          {fmtM(a.estMins)}
                        </td>

                        {/* Logged today badge */}
                        <td style={{padding:"10px 8px",whiteSpace:"nowrap"}}>
                          {todayMin>0
                            ? <span style={{background:"#dcfce7",color:"#166534",padding:"3px 9px",
                                borderRadius:12,fontSize:11,fontWeight:700}}>✓ {fmtM(todayMin)}</span>
                            : <span style={{color:"#d1d5db",fontSize:12}}>—</span>}
                        </td>

                        {/* Time input */}
                        <td style={{padding:"8px 8px",minWidth:175}}>
                          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}>
                            <input type="number" min="1" step="15" value={row.mins}
                              onChange={e=>setRow(a.id,{mins:+e.target.value})}
                              style={{width:62,padding:"5px 8px",borderRadius:7,
                                border:"1.5px solid #c8d2e0",fontSize:14,fontWeight:700,
                                color:"#1a56db",textAlign:"center"}}/>
                            <span style={{fontSize:11,color:"#6b7280",fontWeight:600,minWidth:32}}>
                              {fmtM(+row.mins||0)}
                            </span>
                          </div>
                          <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                            {[[30,"30m"],[60,"1h"],[90,"1.5h"],[120,"2h"],[180,"3h"],[240,"4h"],[480,"8h"]].map(([v,l])=>(
                              <button key={v} onClick={()=>setRow(a.id,{mins:v})}
                                style={{padding:"2px 7px",borderRadius:10,
                                  border:`1.5px solid ${+row.mins===v?"#1a56db":"#e2e8f0"}`,
                                  background:+row.mins===v?"#1a56db":"#fff",
                                  color:+row.mins===v?"#fff":"#6b7280",
                                  fontSize:10,fontWeight:600,cursor:"pointer"}}>
                                {l}
                              </button>
                            ))}
                          </div>
                        </td>

                        {/* Date */}
                        <td style={{padding:"8px 8px",minWidth:125}}>
                          <input type="date" value={row.date}
                            onChange={e=>setRow(a.id,{date:e.target.value})}
                            style={{padding:"5px 8px",borderRadius:7,
                              border:"1px solid #c8d2e0",fontSize:12,width:"100%"}}/>
                        </td>

                        {/* Notes */}
                        <td style={{padding:"8px 8px",minWidth:170}}>
                          <input placeholder="What did you work on?"
                            value={row.notes}
                            onChange={e=>setRow(a.id,{notes:e.target.value})}
                            style={{width:"100%",padding:"5px 8px",borderRadius:7,
                              border:"1px solid #c8d2e0",fontSize:12}}/>
                        </td>

                        {/* Log button */}
                        <td style={{padding:"8px 12px",whiteSpace:"nowrap"}}>
                          <button onClick={()=>logRow(a)} disabled={isSaving}
                            style={{padding:"8px 18px",borderRadius:8,
                              background:isSaving?"#9ca3af":"linear-gradient(135deg,#1a56db,#0891b2)",
                              color:"#fff",border:"none",fontWeight:700,fontSize:13,
                              cursor:isSaving?"not-allowed":"pointer",whiteSpace:"nowrap",
                              boxShadow:isSaving?"none":"0 2px 8px rgba(26,86,219,.3)",
                              transition:"all .15s"}}>
                            {isSaving?"Saving…":"✓ Log"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Footer */}
          <div style={{padding:"12px 24px",background:"#f7f9fc",borderTop:"1px solid #dde3ed",
            display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:12,color:"#6b7280"}}>
              Click <strong style={{color:"#1a56db"}}>✓ Log</strong> on any row to save independently. You can log multiple activities without closing.
            </div>
            <button onClick={closeM}
              style={{padding:"8px 22px",borderRadius:8,background:"#fff",
                border:"1px solid #c8d2e0",color:"#374151",fontWeight:600,fontSize:13,cursor:"pointer"}}>
              Done
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Force password reset on first login
  if(mustReset) return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0f172a,#1e3a5f)",display:"flex",alignItems:"center",justifyContent:"center",padding:20,fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <div style={{background:"rgba(255,255,255,.05)",backdropFilter:"blur(20px)",borderRadius:20,padding:"32px 36px",width:"100%",maxWidth:420,border:"1px solid rgba(255,255,255,.1)",boxShadow:"0 24px 64px rgba(0,0,0,.4)"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:40,marginBottom:10}}>🔐</div>
          <div style={{fontSize:18,fontWeight:700,color:"#fff"}}>Set Your Password</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.45)",marginTop:6}}>You must set a new password before continuing</div>
        </div>
        <ForceResetForm onDone={()=>{setMustReset(false);showToast("Password set! Welcome to ISMS.");}}
          onSave={(pw)=>{setAllUsers(p=>p.map(u=>u.id===user.id?{...u,password:pw,mustReset:false}:u));setUser(p=>({...p,password:pw,mustReset:false}));}}/>
      </div>
    </div>
  );

  // ── RENDER ───────────────────────────────
  return (
    <div style={{display:"flex",height:"100vh",fontFamily:"'Segoe UI',system-ui,sans-serif",background:"#f0f4f8",overflow:"hidden",position:"relative"}}>

      {/* ══ SIDEBAR ══ */}
      <div style={{width:236,minWidth:236,height:"100vh",background:"#ffffff",borderRight:"1px solid #eaeef4",display:"flex",flexDirection:"column",overflow:"visible",flexShrink:0,boxShadow:"2px 0 16px rgba(15,23,42,.05)",zIndex:100,fontFamily:"'DM Sans',sans-serif"}}>

        {/* Logo */}
        <div style={{padding:"18px 16px 14px",borderBottom:"1px solid #eaeef4",display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
          <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#1a56db,#0891b2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 3px 8px rgba(26,86,219,.3)"}}>
            <svg width="20" height="20" viewBox="0 0 26 26" fill="none">
              <path d="M13 2L4 6V13C4 17.97 7.9 22.56 13 24C18.1 22.56 22 17.97 22 13V6L13 2Z" fill="rgba(255,255,255,.92)"/>
              <rect x="8" y="9.5" width="10" height="2.5" rx="1.2" fill="#1a56db"/>
              <rect x="8" y="13.2" width="10" height="2.5" rx="1.2" fill="#0891b2"/>
            </svg>
          </div>
          <div>
            <div style={{fontSize:16,fontWeight:800,letterSpacing:-.5,background:"linear-gradient(130deg,#1a56db 30%,#0ea5e9 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontFamily:"'DM Sans',sans-serif"}}>ISMS</div>
            <div style={{fontSize:8,color:"#94a3b8",letterSpacing:2,textTransform:"uppercase",fontWeight:700,fontFamily:"'DM Mono',monospace"}}>Infra Service Mgmt</div>
          </div>
        </div>

        {/* User chip + switcher — dropdown floats as overlay so it never pushes nav items */}
        <div style={{padding:"10px 12px",borderBottom:"1px solid #eaeef4",flexShrink:0,position:"relative"}}>
          <div onClick={()=>setShowSwitch(s=>!s)} style={{display:"flex",alignItems:"center",gap:9,background:"#f8fafc",borderRadius:10,padding:"8px 11px",cursor:"pointer",border:"1px solid #e8edf5",transition:"all .15s"}}>
            <div style={{width:26,height:26,borderRadius:"50%",background:`${tc}25`,color:tc,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,flexShrink:0}}>
              {user.name.split(" ").map(n=>n[0]).join("")}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,fontWeight:700,color:"#1e293b",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontFamily:"'DM Sans',sans-serif"}}>{user.name}</div>
              <div style={{fontSize:10,color:tc,fontWeight:600}}>{isAdmin?"🛡️ Administrator":isMgr?"👑 "+user.team+" Manager":user.team+" Member"}</div>
            </div>
            <span style={{fontSize:9,color:"#94a3b8",transition:"transform .2s",transform:showSwitch?"rotate(180deg)":"rotate(0deg)"}}>{showSwitch?"▲":"▼"}</span>
          </div>
          {/* floating overlay — does NOT affect sidebar flex layout */}
          {showSwitch && (
            <div style={{position:"absolute",top:"100%",left:8,right:8,background:"#fff",borderRadius:10,border:"1px solid #dde3ed",boxShadow:"0 8px 24px rgba(15,23,42,.15)",zIndex:400,overflow:"hidden"}}>
              {/* Profile header */}
              <div style={{padding:"12px 14px",background:"linear-gradient(135deg,#0f172a,#1e3a5f)",borderBottom:"1px solid #dde3ed"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:34,height:34,borderRadius:"50%",background:`${tc}40`,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,flexShrink:0,border:"2px solid rgba(255,255,255,.2)"}}>
                    {user.name.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:700,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user.name}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,.5)"}}>{user.email||user.username}</div>
                  </div>
                </div>
              </div>
              {/* Actions */}
              <div style={{padding:"6px"}}>
                <div onClick={()=>{setShowSwitch(false);goPage("usermgmt");}} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 10px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:500,color:"#374151",transition:"background .1s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#f1f5f9"}
                  onMouseLeave={e=>e.currentTarget.style.background=""}>
                  <span style={{fontSize:14}}>👤</span> My Profile
                </div>
                <div onClick={()=>{setShowSwitch(false);goPage("changepw");}} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 10px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:500,color:"#374151",transition:"background .1s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#f1f5f9"}
                  onMouseLeave={e=>e.currentTarget.style.background=""}>
                  <span style={{fontSize:14}}>🔑</span> Change Password
                </div>
                {isAdmin && (
                  <div onClick={()=>{setShowSwitch(false);goPage("usermgmt");}} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 10px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:500,color:"#374151",transition:"background .1s"}}
                    onMouseEnter={e=>e.currentTarget.style.background="#f1f5f9"}
                    onMouseLeave={e=>e.currentTarget.style.background=""}>
                    <span style={{fontSize:14}}>🔐</span> User Management
                  </div>
                )}
                <div style={{height:1,background:"#f1f5f9",margin:"4px 0"}}/>
                <div onClick={()=>{setShowSwitch(false);handleLogout();}} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 10px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:600,color:"#dc2626",transition:"background .1s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#fef2f2"}
                  onMouseLeave={e=>e.currentTarget.style.background=""}>
                  <span style={{fontSize:14}}>🚪</span> Sign Out
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Nav — compact padding so all 10 items always visible */}
        <div style={{flex:1,overflowY:"auto",overflowX:"hidden",paddingBottom:4}}>
          {NAV.map(section=>(
            <div key={section.sec} style={{padding:"8px 8px 2px"}}>
              <div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"#b0bcc9",padding:"0 10px",marginBottom:3,fontWeight:700,fontFamily:"'DM Mono',monospace"}}>{section.sec}</div>
              {section.items.map(item=>{
                const active = page===item.id;
                return (
                  <div key={item.id} onClick={()=>goPage(item.id)}
                    style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",borderRadius:9,cursor:"pointer",fontSize:13,fontWeight:active?600:400,color:active?"#1a56db":"#64748b",background:active?"linear-gradient(90deg,#eff6ff,#e8f0fe)":"transparent",position:"relative",userSelect:"none",marginBottom:1,transition:"all .15s cubic-bezier(.4,0,.2,1)",fontFamily:"'DM Sans',sans-serif"}}>
                    {active && <div style={{position:"absolute",left:0,top:"15%",bottom:"15%",width:3,borderRadius:3,background:"linear-gradient(180deg,#1a56db,#0ea5e9)"}}/>}
                    <span style={{fontSize:14,lineHeight:1,flexShrink:0,opacity:active?1:.55}}>{item.icon}</span>
                    <span style={{flex:1}}>{item.label}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ══ MAIN ══ */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0}}>

        {/* Topbar */}
        <div style={{flexShrink:0,background:"rgba(255,255,255,.97)",borderBottom:"1px solid #dde3ed",padding:"11px 22px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:16,fontWeight:700,color:"#0f172a"}}>{PAGE_TITLE[page]||page}</div>
            <div style={{fontSize:11,color:"#6b7280"}}>ISMS › {user.team} › <span style={{color:"#0f172a",fontWeight:600}}>{PAGE_TITLE[page]}</span></div>
          </div>
          <div style={{display:"flex",gap:9}}>
            {isMgr && <Btn sm onClick={()=>{setAForm({...bAct,team:user.team});setTarget(null);setModal("act");}}>+ New Activity</Btn>}
            {isMgr && <Btn sm onClick={()=>{setLForm(bLog);setModal("log");}}>⏱ Log Time</Btn>}
          </div>
        </div>

        {/* Content */}
        <div style={{flex:1,overflowY:"auto",padding:22}}>
          <CurPage/>
        </div>
      </div>

      {/* ══ MODAL: ACTIVITY ══ */}
      {modal==="act" && (
        <ModalWrap title={target?"✏️ Edit Activity":"📋 New Activity"} onClose={closeM} wide>
          <InfoBanner color="#1e40af" bg="#eff6ff" border="#bfdbfe" icon="📌">{isAdmin?"Admin: this activity will be visible to the selected team.":(<>This activity will appear for all <strong>{user.team}</strong> members when they log time.</>)}</InfoBanner>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div style={{gridColumn:"1/-1"}}><Lbl t="Activity Name *"><input style={iS} value={aForm.name} onChange={e=>setAForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Firewall Policy Review"/></Lbl></div>
            {isAdmin && <Lbl t="Team *"><select style={sS} value={aForm.team} onChange={e=>setAForm(f=>({...f,team:e.target.value}))}><option value="">— Select team —</option>{teams.map(t=><option key={t.name}>{t.name}</option>)}</select></Lbl>}
            <Lbl t="Activity Type"><select style={sS} value={aForm.type} onChange={e=>setAForm(f=>({...f,type:e.target.value}))}>{["Project","Incident","Change","BAU","Training","Meeting"].map(o=><option key={o}>{o}</option>)}</select></Lbl>
            <Lbl t="Category"><select style={sS} value={aForm.cat} onChange={e=>setAForm(f=>({...f,cat:e.target.value}))}>{["Infrastructure Build","Maintenance","Security & Compliance","Automation & Scripting","Monitoring & Alerting","Documentation"].map(o=><option key={o}>{o}</option>)}</select></Lbl>
            <Lbl t={`Estimated Time (min) * = ${fmtM(aForm.estMins)}`}>
              <input type="number" min="30" step="30" style={iS} value={aForm.estMins} onChange={e=>setAForm(f=>({...f,estMins:+e.target.value}))}/>
              <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
                {[[60,"1h"],[120,"2h"],[240,"4h"],[480,"8h"],[960,"2d"],[2400,"5d"]].map(([v,l])=>(
                  <button key={v} onClick={()=>setAForm(f=>({...f,estMins:v}))} style={{padding:"3px 9px",borderRadius:20,border:`1px solid ${aForm.estMins===v?"#1a56db":"#c8d2e0"}`,background:aForm.estMins===v?"#1a56db":"#fff",color:aForm.estMins===v?"#fff":"#374151",fontSize:11,fontWeight:600,cursor:"pointer"}}>{l}</button>
                ))}
              </div>
            </Lbl>
            <Lbl t="Priority"><select style={sS} value={aForm.priority} onChange={e=>setAForm(f=>({...f,priority:e.target.value}))}>{["Critical","High","Medium","Low"].map(o=><option key={o}>{o}</option>)}</select></Lbl>
            <Lbl t="Status"><select style={sS} value={aForm.status} onChange={e=>setAForm(f=>({...f,status:e.target.value}))}>{["Active","Pending","Done","Blocked"].map(o=><option key={o}>{o}</option>)}</select></Lbl>
            <Lbl t="Nature">
              <div style={{display:"flex",gap:8,marginTop:4}}>
                {["Proactive","Reactive"].map(n=>(
                  <button key={n} onClick={()=>setAForm(f=>({...f,nature:n}))} style={{flex:1,padding:"7px 0",borderRadius:8,border:`1.5px solid ${aForm.nature===n?(n==="Proactive"?"#1e40af":"#9d174d"):"#c8d2e0"}`,background:aForm.nature===n?(n==="Proactive"?"#dbeafe":"#fce7f3"):"#fff",color:aForm.nature===n?(n==="Proactive"?"#1e40af":"#9d174d"):"#6b7280",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                    {n==="Proactive"?"🟢 Proactive":"🔴 Reactive"}
                  </button>
                ))}
              </div>
            </Lbl>
            <Lbl t="Work Nature">
              <div style={{display:"flex",gap:8,marginTop:4}}>
                {["Request","Change","Incident"].map(w=>(
                  <button key={w} onClick={()=>setAForm(f=>({...f,workNature:w}))} style={{flex:1,padding:"7px 0",borderRadius:8,border:`1.5px solid ${aForm.workNature===w?"#7c3aed":"#c8d2e0"}`,background:aForm.workNature===w?"#ede9fe":"#fff",color:aForm.workNature===w?"#5b21b6":"#6b7280",fontWeight:700,fontSize:12,cursor:"pointer"}}>{w}</button>
                ))}
              </div>
            </Lbl>
            <Lbl t="JIRA / Ticket Ref"><input style={iS} value={aForm.jira} onChange={e=>setAForm(f=>({...f,jira:e.target.value}))} placeholder="INFRA-1234"/></Lbl>
            <Lbl t="Ticket Number"><input style={iS} value={aForm.ticketNo} onChange={e=>setAForm(f=>({...f,ticketNo:e.target.value}))} placeholder="e.g. CHG-4521 / REQ-2201 / INC-0891"/></Lbl>
            <div style={{gridColumn:"1/-1"}}><Lbl t="Description (shown to members)"><textarea style={{...iS,minHeight:80,resize:"vertical"}} value={aForm.desc} onChange={e=>setAForm(f=>({...f,desc:e.target.value}))} placeholder="Describe scope so members know what to log against…"/></Lbl></div>
          </div>
          <MFoot onClose={closeM} onSave={saveAct} label={target?"Update Activity":"Create Activity"}/>
        </ModalWrap>
      )}

      {/* ══ MODAL: LOG TIME ══ */}
      {modal==="log" && (
        target ? (
          /* ── EDIT MODE: compact modal (manager/admin editing existing entry) ── */
          <ModalWrap title="✏️ Edit Time Entry" onClose={closeM}>
            <InfoBanner color="#065f46" bg="#f0fdf4" border="#a7f3d0" icon="✅">Editing entry for <strong>{target.member}</strong></InfoBanner>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div style={{gridColumn:"1/-1"}}>
                <Lbl t="Activity">
                  <select style={sS} value={lForm.actId} onChange={e=>setLForm(f=>({...f,actId:e.target.value}))}>
                    <option value="">— Select activity —</option>
                    {loggable.map(a=><option key={a.id} value={a.id}>{a.name} ({a.type})</option>)}
                  </select>
                </Lbl>
              </div>
              <Lbl t={`Time Spent * = ${fmtM(+lForm.mins)}`}>
                <input type="number" min="1" step="15" style={iS} value={lForm.mins} onChange={e=>setLForm(f=>({...f,mins:+e.target.value}))}/>
                <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
                  {[[15,"15m"],[30,"30m"],[60,"1h"],[90,"1.5h"],[120,"2h"],[180,"3h"],[240,"4h"],[480,"8h"]].map(([v,l])=>(
                    <button key={v} onClick={()=>setLForm(f=>({...f,mins:v}))} style={{padding:"3px 8px",borderRadius:20,border:`1px solid ${+lForm.mins===v?"#1a56db":"#c8d2e0"}`,background:+lForm.mins===v?"#1a56db":"#fff",color:+lForm.mins===v?"#fff":"#374151",fontSize:11,fontWeight:600,cursor:"pointer"}}>{l}</button>
                  ))}
                </div>
              </Lbl>
              <Lbl t="Date"><input type="date" style={iS} value={lForm.date} onChange={e=>setLForm(f=>({...f,date:e.target.value}))}/></Lbl>
              <div style={{gridColumn:"1/-1"}}><Lbl t="Notes"><textarea style={{...iS,minHeight:70,resize:"vertical"}} value={lForm.notes} onChange={e=>setLForm(f=>({...f,notes:e.target.value}))} placeholder="What did you work on?"/></Lbl></div>
            </div>
            <MFoot onClose={closeM} onSave={saveLog} label="Update Entry"/>
          </ModalWrap>
        ) : (
          <LogTimeTable/>
        )
      )}


      {/* ══ DASH DRILL-DOWN MODAL ══ */}
      {dashDrill && (
        <div style={{position:"fixed",inset:0,background:"rgba(15,23,42,.6)",backdropFilter:"blur(8px)",zIndex:4000,display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"fadeIn .2s"}} onClick={()=>setDashDrill(null)}>
          <div style={{background:"#fff",borderRadius:14,width:"100%",maxWidth:900,maxHeight:"80vh",display:"flex",flexDirection:"column",boxShadow:"0 24px 60px rgba(15,23,42,.3)",overflow:"hidden"}} onClick={e=>e.stopPropagation()}>
            {/* Header */}
            <div style={{background:"linear-gradient(135deg,#0f172a,#1e3a5f)",padding:"16px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
              <div style={{fontSize:15,fontWeight:700,color:"#0f172a",letterSpacing:-.2}}>🔍 {dashDrill.label}</div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:12,color:"#64748b"}}>{dashDrill.data.length} record{dashDrill.data.length!==1?"s":""}</span>
                <button onClick={()=>setDashDrill(null)} style={{background:"#f1f5f9",border:"none",color:"#64748b",width:30,height:30,borderRadius:"50%",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background="#e2e8f0"} onMouseLeave={e=>e.currentTarget.style.background="#f1f5f9"}>✕</button>
              </div>
            </div>
            {/* Table */}
            <div style={{overflowY:"auto",flex:1}}>
              {dashDrill.data.length===0
                ? <div style={{textAlign:"center",padding:60,color:"#9ca3af",fontSize:14}}>No records found.</div>
                : dashDrill.type==="acts"
                  ? (
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"'DM Sans',sans-serif"}}>
                      <thead style={{position:"sticky",top:0,background:"#f1f5f9",zIndex:5}}>
                        <tr>
                          {["ID","Activity","Team","Nature","Work Type","Ticket","Type","Status","Est.","Logged","Progress"].map(h=>(
                            <th key={h} style={{padding:"9px 12px",textAlign:"left",fontSize:11,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:.6,whiteSpace:"nowrap",borderBottom:"2px solid #dde3ed"}}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dashDrill.data.map((a,i)=>{
                          const logged = logs.filter(l=>l.actId===a.id).reduce((s,l)=>s+l.mins,0);
                          const pct    = Math.min(100,Math.round(logged/Math.max(a.estMins,1)*100));
                          return (
                            <tr key={a.id} style={{background:i%2===0?"#fff":"#fafbfc",borderBottom:"1px solid #f1f5f9"}}>
                              <td style={{padding:"9px 12px"}}><code style={{background:"#f1f5f9",padding:"2px 6px",borderRadius:4,fontSize:11,color:"#6b7280"}}>{a.id}</code></td>
                              <td style={{padding:"9px 12px",minWidth:180}}>
                                <div style={{fontWeight:700,color:"#0f172a",fontSize:12}}>{a.name}</div>
                                <div style={{fontSize:10,color:"#9ca3af"}}>{a.jira}</div>
                              </td>
                              <td style={{padding:"9px 10px"}}><TPill t={a.team}/></td>
                              <td style={{padding:"9px 10px"}}><NaturePill n={a.nature||"Proactive"}/></td>
                              <td style={{padding:"9px 10px"}}><WNPill w={a.workNature||"Request"}/></td>
                              <td style={{padding:"9px 10px"}}><code style={{background:"#f1f5f9",padding:"2px 6px",borderRadius:4,fontSize:11,fontWeight:600}}>{a.ticketNo||"—"}</code></td>
                              <td style={{padding:"9px 10px",fontSize:12}}>{a.type}</td>
                              <td style={{padding:"9px 10px"}}><SPill s={a.status}/></td>
                              <td style={{padding:"9px 10px",fontSize:12,fontWeight:600}}>{fmtM(a.estMins)}</td>
                              <td style={{padding:"9px 10px",fontSize:13,fontWeight:800,color:"#1a56db"}}>{fmtM(logged)}</td>
                              <td style={{padding:"9px 12px",minWidth:130}}>
                                <div style={{display:"flex",alignItems:"center",gap:6}}>
                                  <div style={{flex:1,height:5,background:"#f1f5f9",borderRadius:3}}>
                                    <div style={{height:"100%",width:`${pct}%`,background:pct>100?"#dc2626":pct>75?"#d97706":"#059669",borderRadius:3}}/>
                                  </div>
                                  <span style={{fontSize:11,fontWeight:700,color:pct>100?"#dc2626":pct>75?"#d97706":"#374151",minWidth:30}}>{pct}%</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )
                  : (
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"'DM Sans',sans-serif"}}>
                      <thead style={{position:"sticky",top:0,background:"#f1f5f9",zIndex:5}}>
                        <tr>
                          {["Date","Member","Activity","Team","Type","Category","Time","Notes"].map(h=>(
                            <th key={h} style={{padding:"9px 12px",textAlign:"left",fontSize:11,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:.6,whiteSpace:"nowrap",borderBottom:"2px solid #dde3ed"}}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dashDrill.data.map((l,i)=>(
                          <tr key={l.id} style={{background:i%2===0?"#fff":"#fafbfc",borderBottom:"1px solid #f1f5f9"}}>
                            <td style={{padding:"9px 12px",fontSize:12,color:"#6b7280"}}>{l.date}</td>
                            <td style={{padding:"9px 12px"}}>
                              <div style={{display:"flex",alignItems:"center",gap:7}}>
                                <div style={{width:22,height:22,borderRadius:"50%",background:`${tCol(l.team)}20`,color:tCol(l.team),display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:800,flexShrink:0}}>{l.member.split(" ").map(n=>n[0]).join("")}</div>
                                <span style={{fontWeight:700,fontSize:12}}>{l.member}</span>
                              </div>
                            </td>
                            <td style={{padding:"9px 12px",fontSize:12,fontWeight:600,color:"#374151",maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.activity}</td>
                            <td style={{padding:"9px 10px"}}><TPill t={l.team}/></td>
                            <td style={{padding:"9px 10px",fontSize:12}}>{l.type}</td>
                            <td style={{padding:"9px 10px",fontSize:11,color:"#6b7280"}}>{l.cat}</td>
                            <td style={{padding:"9px 10px"}}><span style={{fontWeight:800,color:"#1a56db",fontSize:14}}>{fmtM(l.mins)}</span></td>
                            <td style={{padding:"9px 12px",fontSize:11,color:"#6b7280",maxWidth:180,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.notes||"—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )
              }
            </div>
            {/* Footer */}
            <div style={{padding:"10px 22px",background:"#f7f9fc",borderTop:"1px solid #dde3ed",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
              <span style={{fontSize:12,color:"#6b7280"}}>Click outside or press ✕ to close</span>
              <button onClick={()=>setDashDrill(null)} style={{padding:"8px 20px",borderRadius:9,background:"linear-gradient(135deg,#1a56db,#1e66f5)",border:"none",color:"#fff",fontWeight:600,fontSize:13,cursor:"pointer",boxShadow:"0 2px 8px rgba(26,86,219,.3)"}}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ TOAST ══ */}
      {toast && (
        <div style={{position:"absolute",bottom:20,right:20,background:"#0f172a",color:"#fff",borderRadius:9,padding:"11px 16px",fontSize:13,fontWeight:500,zIndex:9000,display:"flex",alignItems:"center",gap:8,boxShadow:"0 8px 20px rgba(15,23,42,.25)",borderLeft:`3px solid ${toast.type==="err"?"#dc2626":"#34d399"}`,minWidth:220}}>
          {toast.type==="err"?"⚠️":"✓"} {toast.msg}
        </div>
      )}
    </div>
  );
}
