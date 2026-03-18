import React, { useState, useMemo } from "react";

// ── GOOGLE FONTS + ENTERPRISE DESIGN SYSTEM ───────────────────────
const _fontLink = (() => {
  if(typeof document !== "undefined") {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap";
    document.head.appendChild(l);
    // Inject global styles
    const s = document.createElement("style");
    s.textContent = `
      :root {
        --brand:       #2563eb;
        --brand-deep:  #1d4ed8;
        --brand-light: #eff6ff;
        --brand-glow:  rgba(37,99,235,.22);
        --accent:      #06b6d4;
        --surface:     #ffffff;
        --surface-2:   #f8fafc;
        --surface-3:   #f1f5f9;
        --border:      #e2e8f0;
        --border-2:    #cbd5e1;
        --text-1:      #0f172a;
        --text-2:      #334155;
        --text-3:      #64748b;
        --text-4:      #94a3b8;
        --sidebar-bg:  #0f172a;
        --sidebar-w:   240px;
        --radius-sm:   6px;
        --radius-md:   10px;
        --radius-lg:   14px;
        --radius-xl:   18px;
        --shadow-sm:   0 1px 2px rgba(15,23,42,.05);
        --shadow-md:   0 2px 8px rgba(15,23,42,.08), 0 1px 2px rgba(15,23,42,.04);
        --shadow-lg:   0 8px 24px rgba(15,23,42,.10), 0 2px 6px rgba(15,23,42,.06);
        --shadow-xl:   0 20px 48px rgba(15,23,42,.14), 0 4px 12px rgba(15,23,42,.08);
        --font-sans:   'Plus Jakarta Sans', system-ui, sans-serif;
        --font-mono:   'JetBrains Mono', monospace;
      }
      *, *::before, *::after { box-sizing: border-box; }
      html, body, #root { height: 100%; margin: 0; }
      body { font-family: var(--font-sans); background: #f1f5f9; color: var(--text-1); -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
      ::-webkit-scrollbar { width: 5px; height: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: var(--border-2); border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: var(--text-4); }

      @keyframes fadeSlideIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
      @keyframes fadeSlideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
      @keyframes fadeIn      { from { opacity:0; } to { opacity:1; } }
      @keyframes shimmer     { 0%,100% { opacity:.55; } 50% { opacity:1; } }
      @keyframes toastIn     { from { opacity:0; transform:translateX(110%) scale(.92); } to { opacity:1; transform:translateX(0) scale(1); } }
      @keyframes toastOut    { to   { opacity:0; transform:translateX(112%) scale(.92); } }
      @keyframes pulse       { 0%,100% { transform:scale(1); opacity:.7; } 50% { transform:scale(1.05); opacity:1; } }
      @keyframes barGrow     { from { width:0; } to { width:var(--w); } }
      @keyframes orb         { 0%,100% { transform:translate(0,0) scale(1); } 33% { transform:translate(40px,-30px) scale(1.08); } 66% { transform:translate(-20px,20px) scale(.94); } }
      @keyframes spin        { to { transform:rotate(360deg); } }
      @keyframes navPop      { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:translateX(0); } }

      .page-enter  { animation: fadeSlideIn .3s cubic-bezier(.22,1,.36,1) both; }
      .card-hover  { transition: transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s ease; }
      .card-hover:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg) !important; }
      .row-hover:hover  { background: #f5f8ff !important; }

      .btn-primary { transition: filter .15s, transform .13s, box-shadow .15s; }
      .btn-primary:hover  { filter: brightness(1.07); transform: translateY(-1px); box-shadow: 0 8px 20px var(--brand-glow) !important; }
      .btn-primary:active { transform: translateY(0); filter: brightness(.97); }

      .nav-item { transition: all .15s cubic-bezier(.22,1,.36,1); }
      .nav-item:hover { background: rgba(255,255,255,.08) !important; color: #fff !important; }

      .nav-active-item { animation: navPop .2s cubic-bezier(.22,1,.36,1) both; }

      input:focus, select:focus, textarea:focus {
        outline: none !important;
        border-color: var(--brand) !important;
        box-shadow: 0 0 0 3px var(--brand-glow) !important;
      }

      /* Table row hover */
      .trow-hover { transition: background .1s; }
      .trow-hover:hover td { background: var(--brand-light) !important; }

      /* Sidebar section label */
      .nav-sec-label {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: rgba(255,255,255,.28);
        padding: 0 12px;
        margin-bottom: 2px;
        margin-top: 4px;
      }
      /* Thin divider */
      .nav-divider { height: 1px; background: rgba(255,255,255,.06); margin: 6px 10px; }

      /* Status dot pulse */
      @keyframes statusPulse { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.5)} 50%{box-shadow:0 0 0 5px rgba(34,197,94,0)} }
      .status-online { animation: statusPulse 2s ease infinite; }

      /* Chip hover */
      .chip-hover { transition: background .12s, transform .12s; cursor: pointer; }
      .chip-hover:hover { transform: scale(1.04); }

      /* KPI card gradient accent */
      .kpi-card { position: relative; overflow: hidden; }
      .kpi-card::before { content:''; position:absolute; top:-32px; right:-32px; width:100px; height:100px; border-radius:50%; opacity:.07; }

      /* Smooth modal backdrop */
      .modal-backdrop { animation: fadeIn .18s ease both; }
      .modal-content  { animation: fadeSlideUp .25s cubic-bezier(.22,1,.36,1) both; }

      /* Priority badge */
      .badge { display:inline-flex; align-items:center; gap:4px; padding:2px 9px; border-radius:20px; font-size:11px; font-weight:700; letter-spacing:.2px; white-space:nowrap; }
    `;
    document.head.appendChild(s);
  }
})();

// ── DATA ─────────────────────────────────────
const SEED_TEAMS = [
  { name:"Network",  emoji:"🌐", color:"#06b6d4", lead:"Alex Chen"    },
  { name:"Security", emoji:"🔒", color:"#dc2626", lead:"Maria Santos" },
  { name:"Compute",  emoji:"⚙️",  color:"#d97706", lead:"James Park"   },
  { name:"Cloud",    emoji:"☁️",  color:"#7c3aed", lead:"Priya Nair"   },
  { name:"Storage",  emoji:"💾", color:"#059669", lead:"David Kim"    },
  { name:"Database", emoji:"🗄️", color:"#ea580c", lead:"Lisa Johnson" },
];

const SEED_USERS = [
  { id:"u0",  name:"Sarah Mitchell", email:"sarah@isms.local",   username:"sarah.mitchell",  password:"Admin@123",    team:null,       role:"admin",   title:"ISMS Administrator",  status:"Active", lastLogin:null,             mustReset:false, costPerHour:85  },
  { id:"u1",  name:"Alex Chen",      email:"alex@isms.local",    username:"alex.chen",       password:"Manager@1",    team:"Network",  role:"manager", title:"Network Lead",        status:"Active", lastLogin:"2025-03-14",     mustReset:false, costPerHour:75  },
  { id:"u2",  name:"Maria Santos",   email:"maria@isms.local",   username:"maria.santos",    password:"Manager@2",    team:"Security", role:"manager", title:"Security Lead",       status:"Active", lastLogin:"2025-03-13",     mustReset:false, costPerHour:72 },
  { id:"u3",  name:"James Park",     email:"james@isms.local",   username:"james.park",      password:"Manager@3",    team:"Compute",  role:"manager", title:"Compute Lead",        status:"Active", lastLogin:"2025-03-12",     mustReset:false, costPerHour:74 },
  { id:"u4",  name:"Priya Nair",     email:"priya@isms.local",   username:"priya.nair",      password:"Manager@4",    team:"Cloud",    role:"manager", title:"Cloud Lead",          status:"Active", lastLogin:"2025-03-14",     mustReset:false, costPerHour:76 },
  { id:"u5",  name:"David Kim",      email:"david@isms.local",   username:"david.kim",       password:"Manager@5",    team:"Storage",  role:"manager", title:"Storage Lead",        status:"Active", lastLogin:"2025-03-11",     mustReset:false, costPerHour:70 },
  { id:"u6",  name:"Lisa Johnson",   email:"lisa@isms.local",    username:"lisa.johnson",    password:"Manager@6",    team:"Database", role:"manager", title:"Database Lead",       status:"Active", lastLogin:"2025-03-10",     mustReset:false, costPerHour:73 },
  { id:"u7",  name:"Tom Wilson",     email:"tom@isms.local",     username:"tom.wilson",      password:"Member@123",   team:"Network",  role:"member",  title:"Network Engineer",    status:"Active", lastLogin:"2025-03-14",     mustReset:false, costPerHour:55 },
  { id:"u8",  name:"Emma Davis",     email:"emma@isms.local",    username:"emma.davis",      password:"Member@123",   team:"Security", role:"member",  title:"Security Analyst",    status:"Active", lastLogin:"2025-03-13",     mustReset:false, costPerHour:58 },
  { id:"u9",  name:"Mike Brown",     email:"mike@isms.local",    username:"mike.brown",      password:"Member@123",   team:"Compute",  role:"member",  title:"Virtualisation Eng.", status:"Active", lastLogin:"2025-03-12",     mustReset:false, costPerHour:54 },
  { id:"u10", name:"Aisha Malik",    email:"aisha@isms.local",   username:"aisha.malik",     password:"Member@123",   team:"Cloud",    role:"member",  title:"Cloud Engineer",      status:"Active", lastLogin:"2025-03-11",     mustReset:false, costPerHour:57 },
  { id:"u11", name:"Ravi Sharma",    email:"ravi@isms.local",    username:"ravi.sharma",     password:"Member@123",   team:"Storage",  role:"member",  title:"Storage Engineer",    status:"Active", lastLogin:"2025-03-10",     mustReset:false, costPerHour:52 },
  { id:"u12", name:"Jin Park",       email:"jin@isms.local",     username:"jin.park",        password:"Member@123",   team:"Database", role:"member",  title:"DBA Analyst",         status:"Active", lastLogin:null,             mustReset:true, costPerHour:53  },
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

// ── MAJOR INCIDENT SEED DATA ──────────────────────────────────────────────
const SEED_MI = [
  { id:"MI-001", incidentNo:"INC-2501", name:"Core Network Backbone Failure",  severity:"Sev1", status:"Resolved", startedAt:"2025-03-05T02:14:00", resolvedAt:"2025-03-05T07:42:00", impactedServices:"All WAN Links, Internet, VPN", rootCause:"BGP session drop due to config push error", teamsInvolved:["Network","Security","Cloud","Compute"], isMajorIncident:true, team:"Cross-Team", type:"Incident", cat:"Infrastructure Build", priority:"Critical", nature:"Reactive", workNature:"Incident", estMins:328, date:"2025-03-05", desc:"Full backbone failure affecting all WAN/Internet links. Multi-team P1 bridge." },
  { id:"MI-002", incidentNo:"INC-2502", name:"Database Cluster Primary Failure", severity:"Sev1", status:"Resolved", startedAt:"2025-03-10T14:30:00", resolvedAt:"2025-03-10T17:15:00", impactedServices:"ERP, CRM, Reporting Suite", rootCause:"Storage I/O saturation — disk controller firmware bug", teamsInvolved:["Database","Storage","Compute"], isMajorIncident:true, team:"Cross-Team", type:"Incident", cat:"Maintenance", priority:"Critical", nature:"Reactive", workNature:"Incident", estMins:165, date:"2025-03-10", desc:"Primary DB cluster went read-only due to storage I/O. Failover required manual intervention." },
  { id:"MI-003", incidentNo:"INC-2503", name:"Cloud Identity Platform Outage",  severity:"Sev2", status:"Resolved", startedAt:"2025-03-12T09:05:00", resolvedAt:"2025-03-12T12:50:00", impactedServices:"SSO, Azure AD, MFA, O365", rootCause:"Expired certificate on federation service", teamsInvolved:["Cloud","Security"], isMajorIncident:true, team:"Cross-Team", type:"Incident", cat:"Security & Compliance", priority:"High", nature:"Reactive", workNature:"Incident", estMins:225, date:"2025-03-12", desc:"SSO and MFA unavailable for 3.75 hours. Users unable to authenticate to cloud apps." },
  { id:"MI-004", incidentNo:"INC-2504", name:"K8s Production Cluster CrashLoop", severity:"Sev2", status:"Open",     startedAt:"2025-03-16T11:22:00", resolvedAt:null,                 impactedServices:"API Gateway, Microservices Tier", rootCause:"Under investigation — OOM events on worker nodes", teamsInvolved:["Compute","Cloud","Network"], isMajorIncident:true, team:"Cross-Team", type:"Incident", cat:"Maintenance", priority:"High", nature:"Reactive", workNature:"Incident", estMins:null, date:"2025-03-16", desc:"Multiple K8s worker nodes entering CrashLoopBackOff. API gateway intermittently unavailable." },
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
  // Major Incident logs — cross-team entries
  { id:"TL-MI1", date:"2025-03-05", userId:"u7",  member:"Tom Wilson",   team:"Network",  actId:"MI-001", activity:"Core Network Backbone Failure",   type:"Incident", cat:"Infrastructure Build",  mins:180, notes:"BGP diagnostics, config rollback, path restoration",        ticketRef:"INC-2501", nature:"Reactive", workType:"BAU", workNature:"Incident" },
  { id:"TL-MI2", date:"2025-03-05", userId:"u2",  member:"Maria Santos", team:"Security", actId:"MI-001", activity:"Core Network Backbone Failure",   type:"Incident", cat:"Infrastructure Build",  mins:120, notes:"Security posture review during outage, firewall validation", ticketRef:"INC-2501", nature:"Reactive", workType:"BAU", workNature:"Incident" },
  { id:"TL-MI3", date:"2025-03-05", userId:"u4",  member:"Priya Nair",   team:"Cloud",    actId:"MI-001", activity:"Core Network Backbone Failure",   type:"Incident", cat:"Infrastructure Build",  mins:90,  notes:"Cloud connectivity checks, SD-WAN failover",                 ticketRef:"INC-2501", nature:"Reactive", workType:"BAU", workNature:"Incident" },
  { id:"TL-MI4", date:"2025-03-10", userId:"u6",  member:"Lisa Johnson", team:"Database", actId:"MI-002", activity:"Database Cluster Primary Failure",type:"Incident", cat:"Maintenance",           mins:150, notes:"Manual failover, data integrity check, replication catch-up", ticketRef:"INC-2502", nature:"Reactive", workType:"BAU", workNature:"Incident" },
  { id:"TL-MI5", date:"2025-03-10", userId:"u5",  member:"David Kim",    team:"Storage",  actId:"MI-002", activity:"Database Cluster Primary Failure",type:"Incident", cat:"Maintenance",           mins:135, notes:"Storage controller firmware diagnostics, I/O tuning",        ticketRef:"INC-2502", nature:"Reactive", workType:"BAU", workNature:"Incident" },
  { id:"TL-MI6", date:"2025-03-12", userId:"u4",  member:"Priya Nair",   team:"Cloud",    actId:"MI-003", activity:"Cloud Identity Platform Outage",  type:"Incident", cat:"Security & Compliance", mins:180, notes:"Certificate renewal, federation service restart",             ticketRef:"INC-2503", nature:"Reactive", workType:"BAU", workNature:"Incident" },
  { id:"TL-MI7", date:"2025-03-12", userId:"u8",  member:"Emma Davis",   team:"Security", actId:"MI-003", activity:"Cloud Identity Platform Outage",  type:"Incident", cat:"Security & Compliance", mins:105, notes:"Azure AD health check, MFA policy review, user comms",        ticketRef:"INC-2503", nature:"Reactive", workType:"BAU", workNature:"Incident" },
];


// ── HISTORICAL PERIOD DATA (for trend & efficiency analysis) ──────
// Simulates 6 periods of activity-type time data for trend charts
const HIST_PERIODS = [
  { period:"Oct 24", avgMinsPerAct:385, avgMinsPerIncident:510, avgMinsPerChange:420, avgMinsPerBAU:195, totalActs:18, totalHrs:142, costPerTicket:312 },
  { period:"Nov 24", avgMinsPerAct:368, avgMinsPerIncident:490, avgMinsPerChange:405, avgMinsPerBAU:188, totalActs:20, totalHrs:156, costPerTicket:298 },
  { period:"Dec 24", avgMinsPerAct:352, avgMinsPerIncident:465, avgMinsPerChange:390, avgMinsPerBAU:180, totalActs:16, totalHrs:128, costPerTicket:285 },
  { period:"Jan 25", avgMinsPerAct:340, avgMinsPerIncident:445, avgMinsPerChange:375, avgMinsPerBAU:175, totalActs:22, totalHrs:168, costPerTicket:274 },
  { period:"Feb 25", avgMinsPerAct:328, avgMinsPerIncident:430, avgMinsPerChange:360, avgMinsPerBAU:168, totalActs:19, totalHrs:151, costPerTicket:263 },
];

const LEAVE = [
  { member:"Tom Wilson",  team:"Network",  from:"2025-03-17", to:"2025-03-21", days:5, mins:2400, type:"Annual Leave"   },
  { member:"Emma Davis",  team:"Security", from:"2025-03-24", to:"2025-03-26", days:3, mins:1440, type:"Annual Leave"   },
  { member:"Mike Brown",  team:"Compute",  from:"2025-03-10", to:"2025-03-10", days:1, mins:480,  type:"Sick Leave"     },
  { member:"Aisha Malik", team:"Cloud",    from:"2025-03-20", to:"2025-03-20", days:1, mins:480,  type:"Public Holiday" },
];

// ── HELPERS ──────────────────────────────────
const fmtM   = m => { if (!m && m !== 0) return "—"; const h = Math.floor(m/60), r = m%60; return h&&r?`${h}h ${r}m`:h?`${h}h`:`${r}m`; };
const tCol_module = t => SEED_TEAMS.find(x=>x.name===t)?.color || "var(--text-3)";
const uCol   = p => p>85?"#dc2626":p>70?"#f59e0b":"#16a34a";
let   seq    = 300;
const uid    = p => `${p}-${++seq}`;
const today  = () => new Date().toISOString().slice(0,10);

// ── ATOMS ────────────────────────────────────
const Bar = ({pct,color}) => (
  <div style={{height:6,background:"#e2e8f0",borderRadius:"var(--radius-md)",overflow:"hidden",marginTop:4}}>
    <div style={{height:"100%",width:`${Math.min(100,Math.max(0,pct))}%`,background:color||"var(--brand)",borderRadius:"var(--radius-md)",transition:"width .5s cubic-bezier(.22,1,.36,1)"}}/>
  </div>
);

const TPill = ({t}) => {
  const m = {
    Network: "#dbeafe|#1e40af",
    Security:"#ffe4e6|#9f1239",
    Compute: "#fef3c7|#92400e",
    Cloud:   "#ede9fe|#5b21b6",
    Storage: "#dcfce7|#14532d",
    Database:"#ffedd5|#9a3412"
  };
  const [bg,fg] = (m[t]||"#f1f5f9|#475569").split("|");
  return <span className="badge" style={{background:bg,color:fg,fontFamily:"var(--font-sans)"}}>{t}</span>;
};

const SPill = ({s}) => {
  const cfg = {
    Active:  {bg:"#d1fae5",fg:"#065f46",dot:"#10b981"},
    Pending: {bg:"#fef3c7",fg:"#92400e",dot:"#f59e0b"},
    Done:    {bg:"#f1f5f9",fg:"#475569",dot:"#94a3b8"},
    Blocked: {bg:"#fee2e2",fg:"#991b1b",dot:"#ef4444"},
  }[s]||{bg:"#f1f5f9",fg:"#475569",dot:"#94a3b8"};
  return (
    <span className="badge" style={{background:cfg.bg,color:cfg.fg}}>
      <span style={{width:6,height:6,borderRadius:"50%",background:cfg.dot,flexShrink:0,display:"inline-block"}}/>
      {s}
    </span>
  );
};

const NaturePill = ({n}) => {
  const [bg,fg] = n==="Proactive" ? ["#eff6ff","#1d4ed8"] : ["#fff1f2","#be123c"];
  return <span className="badge" style={{background:bg,color:fg}}>{n==="Proactive"?"↑ Proactive":"↓ Reactive"}</span>;
};

const WNPill = ({w}) => {
  const m = {
    Request:           ["#f5f3ff","#5b21b6"],
    "Service Request": ["#f5f3ff","#5b21b6"],
    Change:            ["#fffbeb","#b45309"],
    Incident:          ["#fff1f2","#be123c"],
  };
  const [bg,fg] = m[w]||["#f1f5f9","#475569"];
  const label = w==="Service Request" ? "Svc Request" : (w||"—");
  return <span className="badge" style={{background:bg,color:fg}}>{label}</span>;
};

const PDot = ({p}) => {
  const cfg = {
    Critical:{bg:"#fee2e2",fg:"#991b1b",icon:"●"},
    High:    {bg:"#fff7ed",fg:"#c2410c",icon:"▲"},
    Medium:  {bg:"#eff6ff",fg:"#1d4ed8",icon:"◆"},
    Low:     {bg:"#f8fafc",fg:"#64748b",icon:"▼"},
  }[p]||{bg:"#f8fafc",fg:"#64748b",icon:"·"};
  return <span className="badge" style={{background:cfg.bg,color:cfg.fg}}>{cfg.icon} {p}</span>;
};

const Card = ({children,style={},onClick,onMouseEnter,onMouseLeave,className=""}) => (
  <div onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={className}
    style={{
      background:"var(--surface)",
      border:"1px solid var(--border)",
      borderRadius:"var(--radius-lg)",
      padding:20,
      boxShadow:"var(--shadow-md)",
      ...style
    }}>{children}</div>
);

const TH = ({c}) => (
  <th style={{
    textAlign:"left",
    padding:"11px 16px",
    fontSize:10,
    letterSpacing:1.2,
    textTransform:"uppercase",
    color:"var(--text-4)",
    background:"var(--surface-2)",
    borderBottom:"1px solid var(--border)",
    fontWeight:700,
    whiteSpace:"nowrap",
    fontFamily:"var(--font-mono)"
  }}>{c}</th>
);

const TD = ({children,s={}}) => (
  <td style={{
    padding:"12px 16px",
    color:"var(--text-2)",
    verticalAlign:"middle",
    borderBottom:"1px solid var(--surface-3)",
    fontFamily:"var(--font-sans)",
    fontSize:13,
    ...s
  }}>{children}</td>
);

const iS = {
  width:"100%",
  padding:"9px 13px",
  borderRadius:"var(--radius-md)",
  border:"1.5px solid var(--border)",
  fontSize:13,
  fontFamily:"var(--font-sans)",
  outline:"none",
  background:"var(--surface)",
  boxSizing:"border-box",
  transition:"border-color .15s, box-shadow .15s",
  color:"var(--text-1)"
};
const sS = {...iS, background:"var(--surface-2)"};

const Btn = ({children,v="pri",sm,onClick,style={}}) => {
  const base = {
    display:"inline-flex",alignItems:"center",gap:5,
    padding:sm?"5px 13px":"9px 18px",
    borderRadius:"var(--radius-md)",
    border:"none",fontWeight:600,cursor:"pointer",
    fontSize:sm?11.5:13,
    fontFamily:"var(--font-sans)",
    letterSpacing:.1,
    transition:"all .15s",
    whiteSpace:"nowrap",
    ...style
  };
  const vs = {
    pri:{background:"linear-gradient(135deg,#2563eb,#1d4ed8)",color:"#fff",boxShadow:"0 2px 8px rgba(37,99,235,.3)"},
    sec:{background:"var(--surface)",color:"var(--text-2)",border:"1.5px solid var(--border)",boxShadow:"var(--shadow-sm)"},
    dan:{background:"#fff5f5",color:"#b91c1c",border:"1.5px solid #fecaca"},
    suc:{background:"linear-gradient(135deg,#059669,#0d9488)",color:"#fff",boxShadow:"0 2px 8px rgba(5,150,105,.28)"},
  };
  return <button className="btn-primary" style={{...base,...vs[v]}} onClick={onClick}>{children}</button>;
};

const Lbl = ({t,children}) => (
  <div>
    <div style={{fontSize:11,fontWeight:600,color:"var(--text-3)",marginBottom:5,letterSpacing:.5,textTransform:"uppercase",fontFamily:"var(--font-sans)"}}>{t}</div>
    {children}
  </div>
);

const ModalWrap = ({title,onClose,children,wide}) => (
  <div className="modal-backdrop" onClick={e=>e.target===e.currentTarget&&onClose()}
    style={{position:"absolute",inset:0,background:"rgba(15,23,42,.6)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:600}}>
    <div className="modal-content" style={{
      background:"var(--surface)",
      borderRadius:"var(--radius-xl)",
      width:wide?740:600,maxWidth:"95%",maxHeight:"92vh",overflowY:"auto",
      boxShadow:"var(--shadow-xl), 0 0 0 1px rgba(255,255,255,.5)",
    }}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"22px 28px 18px",borderBottom:"1px solid var(--border)"}}>
        <div style={{fontSize:16,fontWeight:700,color:"var(--text-1)",letterSpacing:-.3,fontFamily:"var(--font-sans)"}}>{title}</div>
        <button onClick={onClose} style={{background:"var(--surface-3)",border:"none",width:32,height:32,borderRadius:"50%",cursor:"pointer",color:"var(--text-3)",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .15s",lineHeight:1}}
          onMouseEnter={e=>{e.currentTarget.style.background="var(--border-2)";e.currentTarget.style.color="var(--text-1)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="var(--surface-3)";e.currentTarget.style.color="var(--text-3)";}}>×</button>
      </div>
      <div style={{padding:"22px 28px 26px"}}>{children}</div>
    </div>
  </div>
);

const MFoot = ({onClose,onSave,label="Save"}) => (
  <div style={{display:"flex",justifyContent:"flex-end",gap:9,marginTop:22,paddingTop:18,borderTop:"1px solid var(--border)"}}>
    <Btn v="sec" onClick={onClose}>Cancel</Btn>
    <Btn onClick={onSave}>✓ {label}</Btn>
  </div>
);

const Tabs = ({tabs,active,onChange}) => (
  <div style={{display:"flex",gap:2,background:"var(--surface-3)",borderRadius:12,padding:3,width:"fit-content",marginBottom:18}}>
    {tabs.map(t=>(
      <button key={t.id} onClick={()=>onChange(t.id)}
        style={{padding:"7px 18px",borderRadius:"var(--radius-md)",border:"none",cursor:"pointer",fontSize:12.5,fontWeight:600,
          background:active===t.id?"var(--surface)":"transparent",
          color:active===t.id?"var(--brand)":"var(--text-3)",
          boxShadow:active===t.id?"var(--shadow-sm), 0 0 0 1px var(--border)":"none",
          fontFamily:"var(--font-sans)",transition:"all .17s",letterSpacing:.1}}>
        {t.label}
      </button>
    ))}
  </div>
);

const InfoBanner = ({color,bg,border,icon,children}) => (
  <div style={{
    background:bg,
    border:`1px solid ${border}`,
    borderRadius:"var(--radius-md)",
    padding:"11px 16px",
    marginBottom:16,
    fontSize:12.5,
    color,
    display:"flex",
    alignItems:"flex-start",
    gap:10,
    lineHeight:1.6,
    fontFamily:"var(--font-sans)"
  }}>
    <span style={{fontSize:16,flexShrink:0,marginTop:1}}>{icon}</span>
    <span>{children}</span>
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
  const iS = {width:"100%",padding:"11px 40px 11px 14px",borderRadius:"var(--radius-md)",border:"1.5px solid rgba(255,255,255,.15)",fontSize:14,background:"rgba(255,255,255,.07)",color:"#fff",outline:"none",boxSizing:"border-box"};
  return (
    <div>
      {err && <div style={{background:"rgba(220,38,38,.15)",border:"1px solid rgba(220,38,38,.3)",borderRadius:"var(--radius-md)",padding:"9px 13px",marginBottom:14,fontSize:12,color:"#fca5a5"}}>{err}</div>}
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
        style={{width:"100%",padding:"13px",borderRadius:"var(--radius-md)",background:allOk&&cp?"linear-gradient(135deg,#1a56db,#0891b2)":"rgba(255,255,255,.08)",color:allOk&&cp?"#fff":"rgba(255,255,255,.3)",border:"none",fontWeight:700,fontSize:15,cursor:allOk&&cp?"pointer":"not-allowed",transition:"all .2s"}}>
        Set Password & Continue →
      </button>
    </div>
  );
}


// ── ERROR BOUNDARY ───────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = {hasError:false, error:null}; }
  static getDerivedStateFromError(error) { return {hasError:true, error}; }
  render() {
    if(this.state.hasError) {
      return (
        <div style={{padding:40,maxWidth:600,margin:"60px auto",fontFamily:"var(--font-sans)"}}>
          <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:"var(--radius-lg)",padding:"28px 32px"}}>
            <div style={{fontSize:32,marginBottom:12}}>⚠️</div>
            <div style={{fontSize:18,fontWeight:700,color:"#dc2626",marginBottom:8}}>Something went wrong</div>
            <div style={{fontSize:13,color:"var(--text-3)",marginBottom:16,lineHeight:1.6}}>
              {this.state.error?.message || "An unexpected error occurred."}
            </div>
            <button onClick={()=>window.location.reload()}
              style={{padding:"9px 22px",borderRadius:"var(--radius-md)",background:"#dc2626",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>
              🔄 Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
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

  const iS = {width:"100%",padding:"11px 14px",borderRadius:"var(--radius-md)",border:"1.5px solid var(--border)",fontSize:14,fontFamily:"inherit",outline:"none",background:"var(--surface)",boxSizing:"border-box",transition:"border-color .15s"};

  const DEMO_USERS = [
    {label:"Admin",   username:"sarah.mitchell", password:"Admin@123",  role:"admin",   color:"#6366f1"},
    {label:"Manager", username:"alex.chen",       password:"Manager@1",  role:"manager", color:"var(--brand)"},
    {label:"Member",  username:"tom.wilson",       password:"Member@123", role:"member",  color:"#059669"},
  ];

  return (
    <div style={{minHeight:"100vh",background:"#0a0f1e",display:"flex",alignItems:"center",justifyContent:"center",padding:20,fontFamily:"var(--font-sans)",position:"relative",overflow:"hidden"}}>
      {/* Ambient orbs */}
      <div style={{position:"fixed",inset:0,overflow:"hidden",pointerEvents:"none"}}>
        <div style={{position:"absolute",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(37,99,235,.18) 0%,transparent 70%)",top:"-10%",left:"-10%",animation:"orb 18s ease-in-out infinite"}}/>
        <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(6,182,212,.12) 0%,transparent 70%)",bottom:"-15%",right:"-5%",animation:"orb 22s ease-in-out infinite reverse"}}/>
        <div style={{position:"absolute",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(139,92,246,.10) 0%,transparent 70%)",top:"40%",right:"20%",animation:"orb 14s ease-in-out infinite 3s"}}/>
        {/* Subtle grid */}
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.024) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.024) 1px,transparent 1px)",backgroundSize:"48px 48px"}}/>
      </div>

      <div style={{width:"100%",maxWidth:420,position:"relative",zIndex:1}}>
        {/* Logo */}
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:56,height:56,borderRadius:16,background:"linear-gradient(135deg,#2563eb,#06b6d4)",boxShadow:"0 8px 32px rgba(37,99,235,.45)",marginBottom:16}}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" fill="rgba(255,255,255,.15)" stroke="white" strokeWidth="1.5"/>
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{fontSize:28,fontWeight:800,color:"#fff",letterSpacing:-.8,fontFamily:"var(--font-sans)"}}>ISMS</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,.38)",letterSpacing:2.5,textTransform:"uppercase",marginTop:4,fontFamily:"var(--font-mono)"}}>Infrastructure Service Management</div>
        </div>

        {!forgotMode ? (
          /* ── LOGIN FORM ── */
          <div style={{background:"rgba(255,255,255,.045)",backdropFilter:"blur(24px)",borderRadius:"var(--radius-xl)",padding:"32px 36px",border:"1px solid rgba(255,255,255,.09)",boxShadow:"0 32px 80px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.1)"}}>
            <div style={{fontSize:20,fontWeight:700,color:"#fff",marginBottom:3,letterSpacing:-.3}}>Welcome back</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,.4)",marginBottom:26}}>Sign in to your account to continue</div>

            {error && (
              <div style={{background:"rgba(239,68,68,.12)",border:"1px solid rgba(239,68,68,.25)",borderRadius:"var(--radius-md)",padding:"10px 14px",marginBottom:18,fontSize:12.5,color:"#fca5a5",display:"flex",alignItems:"center",gap:9}}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="#f87171"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                {error}
              </div>
            )}

            {/* Username */}
            <div style={{marginBottom:15}}>
              <div style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,.5)",marginBottom:6,textTransform:"uppercase",letterSpacing:1,fontFamily:"var(--font-mono)"}}>Username or Email</div>
              <input style={{...iS,background:"rgba(255,255,255,.06)",border:"1.5px solid rgba(255,255,255,.1)",color:"#fff",borderRadius:"var(--radius-md)"}}
                placeholder="username or email@company.com"
                value={cred.username}
                onChange={e=>setCred(p=>({...p,username:e.target.value}))}
                onKeyDown={e=>e.key==="Enter"&&handleLogin()}
                autoComplete="username"/>
            </div>

            {/* Password */}
            <div style={{marginBottom:10}}>
              <div style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,.5)",marginBottom:6,textTransform:"uppercase",letterSpacing:1,fontFamily:"var(--font-mono)"}}>Password</div>
              <div style={{position:"relative"}}>
                <input style={{...iS,background:"rgba(255,255,255,.06)",border:"1.5px solid rgba(255,255,255,.1)",color:"#fff",paddingRight:44,borderRadius:"var(--radius-md)"}}
                  type={showPw?"text":"password"}
                  placeholder="••••••••••"
                  value={cred.password}
                  onChange={e=>setCred(p=>({...p,password:e.target.value}))}
                  onKeyDown={e=>e.key==="Enter"&&handleLogin()}
                  autoComplete="current-password"/>
                <button onClick={()=>setShowPw(s=>!s)}
                  style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,.35)",fontSize:15,lineHeight:1,padding:2,transition:"color .15s"}}
                  onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,.7)"}
                  onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.35)"}>
                  {showPw?"🙈":"👁"}
                </button>
              </div>
            </div>

            <div style={{textAlign:"right",marginBottom:24}}>
              <button onClick={()=>{setForgotMode(true);setError("");}} style={{background:"none",border:"none",cursor:"pointer",fontSize:12,color:"rgba(37,99,235,.9)",fontWeight:600,fontFamily:"var(--font-sans)"}}>Forgot password?</button>
            </div>

            <button onClick={handleLogin} disabled={loading}
              style={{width:"100%",padding:"13px",borderRadius:"var(--radius-md)",background:loading?"rgba(255,255,255,.08)":"linear-gradient(135deg,#2563eb,#1d4ed8)",color:loading?"rgba(255,255,255,.3)":"#fff",border:"none",fontWeight:700,fontSize:13,cursor:loading?"not-allowed":"pointer",boxShadow:loading?"none":"0 4px 20px rgba(37,99,235,.45)",transition:"all .2s",letterSpacing:.2,fontFamily:"var(--font-sans)"}}>
              {loading ? (
                <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  <span style={{width:14,height:14,borderRadius:"50%",border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",animation:"spin .7s linear infinite",display:"inline-block"}}/>
                  Signing in…
                </span>
              ) : "Sign In →"}
            </button>

            {/* Demo credentials */}
            <div style={{marginTop:26,paddingTop:22,borderTop:"1px solid rgba(255,255,255,.07)"}}>
              <div style={{fontSize:10,color:"rgba(255,255,255,.25)",textTransform:"uppercase",letterSpacing:1.5,marginBottom:11,textAlign:"center",fontFamily:"var(--font-mono)"}}>Demo Access</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7}}>
                {DEMO_USERS.map(d=>(
                  <button key={d.username} onClick={()=>setCred({username:d.username,password:d.password})}
                    style={{padding:"9px 6px",borderRadius:"var(--radius-md)",background:`${d.color}16`,border:`1px solid ${d.color}30`,cursor:"pointer",textAlign:"center",transition:"all .15s",fontFamily:"var(--font-sans)"}}
                    onMouseEnter={e=>{e.currentTarget.style.background=`${d.color}28`;e.currentTarget.style.borderColor=`${d.color}55`;}}
                    onMouseLeave={e=>{e.currentTarget.style.background=`${d.color}16`;e.currentTarget.style.borderColor=`${d.color}30`;}}>
                    <div style={{fontSize:11,fontWeight:700,color:d.color}}>{d.label}</div>
                    <div style={{fontSize:9,color:"rgba(255,255,255,.3)",marginTop:2,fontFamily:"var(--font-mono)"}}>{d.username}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ── FORGOT PASSWORD ── */
          <div style={{background:"rgba(255,255,255,.045)",backdropFilter:"blur(24px)",borderRadius:"var(--radius-xl)",padding:"32px 36px",border:"1px solid rgba(255,255,255,.09)",boxShadow:"0 32px 80px rgba(0,0,0,.45)"}}>
            <button onClick={()=>{setForgotMode(false);setForgotSent(false);setForgotEmail("");}} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,.45)",fontSize:12.5,marginBottom:18,display:"flex",alignItems:"center",gap:6,padding:0,fontFamily:"var(--font-sans)",transition:"color .15s"}}
              onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,.8)"}
              onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.45)"}>
              ← Back to Sign In
            </button>
            {!forgotSent ? (
              <>
                <div style={{fontSize:19,fontWeight:700,color:"#fff",marginBottom:5,letterSpacing:-.3}}>Reset Password</div>
                <div style={{fontSize:12.5,color:"rgba(255,255,255,.4)",marginBottom:24}}>Enter your email and we'll send a reset link</div>
                <div style={{marginBottom:18}}>
                  <div style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,.5)",marginBottom:6,textTransform:"uppercase",letterSpacing:1,fontFamily:"var(--font-mono)"}}>Email Address</div>
                  <input style={{...iS,background:"rgba(255,255,255,.06)",border:"1.5px solid rgba(255,255,255,.1)",color:"#fff",borderRadius:"var(--radius-md)"}}
                    type="email" placeholder="your.email@company.com"
                    value={forgotEmail} onChange={e=>setForgotEmail(e.target.value)}/>
                </div>
                <button onClick={()=>{if(forgotEmail)setForgotSent(true);}}
                  style={{width:"100%",padding:"13px",borderRadius:"var(--radius-md)",background:"linear-gradient(135deg,#2563eb,#1d4ed8)",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer",boxShadow:"0 4px 20px rgba(37,99,235,.45)",fontFamily:"var(--font-sans)"}}>
                  Send Reset Link
                </button>
              </>
            ) : (
              <div style={{textAlign:"center",padding:"12px 0"}}>
                <div style={{width:52,height:52,borderRadius:"50%",background:"rgba(37,99,235,.2)",border:"1.5px solid rgba(37,99,235,.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:24}}>📧</div>
                <div style={{fontSize:17,fontWeight:700,color:"#fff",marginBottom:8}}>Reset Link Sent</div>
                <div style={{fontSize:12.5,color:"rgba(255,255,255,.45)",lineHeight:1.7,marginBottom:22}}>
                  If <strong style={{color:"rgba(255,255,255,.7)"}}>{forgotEmail}</strong> matches an account, a reset link has been sent. Check your inbox.
                </div>
                <div style={{background:"rgba(245,158,11,.08)",border:"1px solid rgba(245,158,11,.18)",borderRadius:"var(--radius-md)",padding:"10px 14px",fontSize:11.5,color:"rgba(255,255,255,.45)",marginBottom:18,lineHeight:1.6}}>
                  📌 Demo: In production this would send a real email. Ask your admin to reset via User Management.
                </div>
                <button onClick={()=>{setForgotMode(false);setForgotSent(false);setForgotEmail("");}}
                  style={{padding:"10px 28px",borderRadius:"var(--radius-md)",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.14)",color:"#fff",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"var(--font-sans)"}}>
                  Back to Sign In
                </button>
              </div>
            )}
          </div>
        )}

        <div style={{textAlign:"center",marginTop:22,fontSize:11,color:"rgba(255,255,255,.18)",fontFamily:"var(--font-mono)"}}>
          ISMS v1.0.0 · Infrastructure Service Management
        </div>
      </div>
    </div>
  );
}

// ── PORTAL APP (always renders, no early returns) ──
function PortalApp({initialUser, allUsersInit}) {
  // Load users from localStorage if available, otherwise use initial
  const [allUsers,   setAllUsers]   = useState(() => {
    try {
      const saved = localStorage.getItem('isms_users');
      return saved ? JSON.parse(saved) : (allUsersInit||SEED_USERS);
    } catch (e) {
      return allUsersInit||SEED_USERS;
    }
  });

  // Save users to localStorage whenever they change
  React.useEffect(() => {
    try {
      localStorage.setItem('isms_users', JSON.stringify(allUsers));
    } catch (e) {
      console.error('Failed to save users:', e);
    }
  }, [allUsers]);
  const [teams,      setTeams]      = useState(SEED_TEAMS);
  const tCol = t => (teams||SEED_TEAMS).find(x=>x.name===t)?.color || "var(--text-3)";
  const [user,       setUser]       = useState(initialUser);
  const [mustReset,  setMustReset]  = useState(initialUser?.mustReset||false);

  // When a different user logs in, update user state without remounting PortalApp
  // (remounting would reset acts/logs back to SEED data)
  React.useEffect(()=>{
    setUser(initialUser);
    setMustReset(initialUser?.mustReset||false);
    setPage("dashboard");
  }, [initialUser?.id]);
  const [page,       setPage]       = useState("dashboard");
  const [acts,       setActs]       = useState(()=>{
    try { const s=localStorage.getItem('isms_acts'); return s?JSON.parse(s):[...SEED_ACT,...SEED_MI]; } catch(e){ return [...SEED_ACT,...SEED_MI]; }
  });
  const [logs,       setLogs]       = useState(()=>{
    try { const s=localStorage.getItem('isms_logs'); return s?JSON.parse(s):SEED_LOGS; } catch(e){ return SEED_LOGS; }
  });
  const [miModal,    setMiModal]    = useState(false); // create/edit Major Incident

  // Persist acts and logs whenever they change
  React.useEffect(()=>{ try{ localStorage.setItem('isms_acts', JSON.stringify(acts)); }catch(e){} }, [acts]);
  React.useEffect(()=>{ try{ localStorage.setItem('isms_logs', JSON.stringify(logs)); }catch(e){} }, [logs]);
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

  // ── Activity Import state (used by PageActivities) ──────────────
  const [showImport,   setShowImport]   = useState(false);
  const [importStep,   setImportStep]   = useState("upload");
  const [importFile,   setImportFile]   = useState(null);
  const [importRows,   setImportRows]   = useState([]);
  const [importCols,   setImportCols]   = useState([]);
  const [importMap,    setImportMap]    = useState({});
  const [importPrev,   setImportPrev]   = useState([]);
  const [importResult, setImportResult] = useState(null);
  const [importTeam,   setImportTeam]   = useState(""); // admin can pick any team
  const [dragOver2,    setDragOver2]    = useState(false);
  const fileRef2 = React.useRef();

  // ── Activity Import: exact 6 columns per spec ────────────────────
  const ACT_FIELDS = [
    {key:"cat",        label:"Category",   required:true,  hint:"e.g. Security, Network, Cloud"},
    {key:"taskType",   label:"Task Type",  required:true,  hint:"e.g. BAU, Project, Incident, Change"},
    {key:"name",       label:"Task Name",  required:true,  hint:"e.g. Firewall Policy Review"},
    {key:"taskSize",   label:"Task Size",  required:false, hint:"e.g. Small, Medium, Large, XL"},
    {key:"complexity", label:"Complexity", required:false, hint:"e.g. Low, Medium, High"},
    {key:"level",      label:"Level",      required:false, hint:"e.g. L1, L2, L3 or Junior, Senior"},
  ];

  const parseFile = (file) => {
    setImportFile(file.name);
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target.result;
      const fileLines = text.split(/\r?\n/).filter(l=>l.trim());
      if(fileLines.length < 2) return;
      const delim = fileLines[0].includes("\t") ? "\t" : ",";
      const cols = fileLines[0].split(delim).map(h=>h.replace(/^"|"$/g,"").trim());
      const rows = fileLines.slice(1).map(line=>{
        const vals = line.split(delim).map(v=>v.replace(/^"|"$/g,"").trim());
        const obj={}; cols.forEach((h,i)=>{ obj[h]=vals[i]||""; }); return obj;
      }).filter(r=>Object.values(r).some(v=>v));
      // Auto-map to the 6 expected columns
      const matchers = {
        cat:        /^category$|^cat$/i,
        taskType:   /^task.?type$|^type$/i,
        name:       /^task.?name$|^name$|^activity$/i,
        taskSize:   /^task.?size$|^size$/i,
        complexity: /^complexity$|^complex$/i,
        level:      /^level$|^lvl$/i,
      };
      const map={};
      cols.forEach(c=>{ Object.entries(matchers).forEach(([k,regex])=>{ if(!map[k]&&regex.test(c)) map[k]=c; }); });
      setImportCols(cols); setImportRows(rows);
      setImportMap(map);
      setImportPrev(buildPrev(rows, map));
      setImportStep("mapping");
    };
    reader.readAsText(file);
  };

  const buildPrev = (rows, fieldMap) => rows.slice(0,8).map((r,i)=>{
    const rawType = r[fieldMap.taskType]||"BAU";
    const nt = /proj/i.test(rawType)?"Project":/inc/i.test(rawType)?"Incident":/chg|change/i.test(rawType)?"Change":/train/i.test(rawType)?"Training":"BAU";
    return {
      _row:       i+2,
      name:       r[fieldMap.name]||"",
      cat:        r[fieldMap.cat]||"",
      type:       nt,
      taskSize:   r[fieldMap.taskSize]||"",
      complexity: r[fieldMap.complexity]||"",
      level:      r[fieldMap.level]||"",
    };
  });

  const runActImport = () => {
    setImportStep("importing");
    setTimeout(()=>{
      let created=0, skipped=0;
      const newActs = importRows.map(r=>{
        const rawType = r[importMap.taskType]||"BAU";
        const nt = /proj/i.test(rawType)?"Project":/inc/i.test(rawType)?"Incident":/chg|change/i.test(rawType)?"Change":/train/i.test(rawType)?"Training":"BAU";
        return {
          name:       (r[importMap.name]||"").trim(),
          cat:        r[importMap.cat]||"Maintenance",
          type:       nt,
          taskSize:   r[importMap.taskSize]||"",
          complexity: r[importMap.complexity]||"",
          level:      r[importMap.level]||"",
          // Required fields with sensible defaults
          priority:   "Medium",
          estMins:    480,
          status:     "Active",
          nature:     "Proactive",
          workNature: "Request",
          jira:       "",
          ticketNo:   "",
          desc:       "",
          date:       today(),
          team:       isAdmin ? (importTeam||user.team||"") : user.team,
        };
      }).filter(a=>{ if(!a.name){skipped++;return false;} created++;return true; });
      setActs(p=>[...newActs.map(a=>({...a,id:uid("ACT")})),...p]);
      setImportResult({created, skipped, total:importRows.length});
      setImportStep("done");
      showToast(`${created} activities imported for ${user.team}`);
    }, 700);
  };

  const dlTemplate = () => {
    const rows = [
      "Category,Task Type,Task Name,Task Size,Complexity,Level",
      "Security & Compliance,BAU,Firewall Rule Review,Medium,High,L2",
      "Monitoring & Alerting,BAU,Daily Health Checks,Small,Low,L1",
      "Maintenance,Incident,P1 Incident Response,Large,High,L3",
      "Infrastructure Build,Project,Cloud Migration Planning,XL,High,L3",
      "Security & Compliance,Change,Patch Management,Medium,Medium,L2",
      "Automation & Scripting,Project,CI/CD Pipeline Setup,Large,High,L2",
    ];
    const csv = rows.join("\n");
    const blob = new Blob([csv], {type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "isms_activity_list_template.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const resetImport = () => {
    setShowImport(false); setImportStep("upload"); setImportFile(null);
    setImportRows([]); setImportCols([]); setImportMap({});
    setImportPrev([]); setImportResult(null); setImportTeam("");
  };

  // forms
  const bAct = {name:"",team:"",type:"Project",cat:"Infrastructure Build",estMins:480,priority:"Medium",status:"Active",nature:"Proactive",workNature:"Request",jira:"",ticketNo:"",desc:"",progress:0};
  const bLog = {actId:"",mins:30,notes:"",date:today(),ticketRef:"",nature:"Proactive",workType:"Project",workNature:"Change",cat:""};
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

  // handleLogin not needed in PortalApp — login handled by outer App wrapper

  const handleLogout = () => { window.location.reload(); };

  // derived
  const teamActs  = useMemo(()=>isAdmin ? acts : acts.filter(a=>a.team===(user?.team)||a.isMajorIncident),[acts,user,isAdmin]);
  const loggable  = useMemo(()=>{
    if(isAdmin) return acts.filter(a=>a.status!=="Done");
    // Members/managers can log time on their own team's activities AND any open Major Incident
    return user?.team ? acts.filter(a=>a.status!=="Done"&&(a.team===user.team||a.isMajorIncident)) : [];
  },[acts,user,isAdmin]);
  const teamLogs  = useMemo(()=>isAdmin ? logs : logs.filter(l=>l.team===(user?.team)),[logs,user,isAdmin]);
  const myLogs    = useMemo(()=>user?.id ? logs.filter(l=>l.userId===user.id) : [],[logs,user]);
  const minsForAct = actId => logs.filter(l=>l.actId===actId).reduce((s,l)=>s+l.mins,0);

  const filtActs = useMemo(()=>{
    if(!user) return [];
    // admin: see all, filterable by team; manager: only own team
    let r = isAdmin ? acts : teamActs;
    if(isAdmin && actF.team) r = acts.filter(a=>a.team===actF.team);
    if(actF.type)   r = r.filter(a=>a.type===actF.type);
    if(actF.status) r = r.filter(a=>a.status===actF.status);
    if(actF.search) r = r.filter(a=>a.name.toLowerCase().includes(actF.search.toLowerCase())||a.jira.toLowerCase().includes(actF.search.toLowerCase()));
    return r;
  },[acts,teamActs,actF,isMgr,isAdmin]);

  const filtLogs = useMemo(()=>{
    if(!user) return [];
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
    const ticketRef  = lForm.ticketRef||"";
    const nature     = lForm.nature||"Proactive";
    const workType   = lForm.workType||"Project";
    const workNature = lForm.workNature||"Change";
    const cat        = lForm.cat||act.cat||"Maintenance";
    if(target){
      setLogs(p=>p.map(l=>l.id===target.id?{...l,actId:lForm.actId,activity:act.name,type:act.type,cat,mins:+lForm.mins,notes:lForm.notes,date:lForm.date,ticketRef,nature,workType,workNature}:l));
      showToast("Entry updated");
    } else {
      setLogs(p=>[{id:uid("TL"),date:lForm.date,userId:user.id,member:user.name,team:act.isMajorIncident?user.team:act.team,actId:lForm.actId,activity:act.name,type:act.type,cat,mins:+lForm.mins,notes:lForm.notes,ticketRef,nature,workType,workNature},...p]);
      showToast(`${fmtM(+lForm.mins)} logged on "${act.name}"`);
    }
    closeM();
  };

  const delAct    = id => { setActs(p=>p.filter(a=>a.id!==id)); showToast("Activity removed"); };
  const delLog    = id => { setLogs(p=>p.filter(l=>l.id!==id)); showToast("Entry deleted"); };
  const openEditA = a  => { setTarget(a); setAForm({name:a.name,team:a.team,type:a.type,cat:a.cat,estMins:a.estMins,priority:a.priority,status:a.status,nature:a.nature||"Proactive",workNature:a.workNature||"Request",jira:a.jira,ticketNo:a.ticketNo||"",desc:a.desc,progress:a.progress||0}); setModal("act"); };
  const openEditL = l  => { setTarget(l); setLForm({actId:l.actId,mins:l.mins,notes:l.notes,date:l.date,ticketRef:l.ticketRef||"",nature:l.nature||"Proactive",workType:l.workType||"Project",workNature:l.workNature||"Change",cat:l.cat||""}); setModal("log"); };

  // ── FULL NAV (same structure for manager & member, labels differ) ──
  const NAV_MGR = [
    { sec:"Overview", items:[
        {id:"dashboard",  icon:"⊞",  label:"Dashboard"},
    ]},
    { sec:"Reports & Analytics", items:[
        {id:"reports",    icon:"📈", label:"Reports"},
        {id:"custreports",icon:"✏️", label:"Custom Reports"},
        {id:"planning",   icon:"📅", label:"Capacity Planning"},
    ]},
    { sec:"Productivity", items:[
        {id:"prod_overview",  icon:"🚀", label:"Overview"},
        {id:"prod_flags",     icon:"🚩", label:"Flags & Risks"},
        {id:"prod_heatmap",   icon:"🔥", label:"Effort Heatmap"},
        {id:"prod_suggest",   icon:"💡", label:"Suggestions"},
        {id:"prod_intel",     icon:"🧠", label:"Intelligence Report"},
    ]},
    { sec:"Operations", items:[
        {id:"activities",    icon:"📋", label:"Activities"},
        {id:"major_incidents",icon:"🚨", label:"Major Incidents"},
        {id:"timelog",       icon:"⏱",  label:"Time Log"},
        {id:"teams",         icon:"👥", label:"Team Management"},
        {id:"members",       icon:"👤", label:"Members"},
        {id:"bandwidth",     icon:"📊", label:"Bandwidth & Capacity"},
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
    ]},
    { sec:"Analytics", items:[
        {id:"reports",    icon:"📈", label:"Reports"},
        {id:"planning",   icon:"📅", label:"Capacity Planning"},
    ]},
    { sec:"Team", items:[
        {id:"timelog",    icon:"⏱",  label:"My Time Log"},
        {id:"members",    icon:"👤", label:"Team Members"},
        {id:"teams",      icon:"👥", label:"Team View"},
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
    activities:"Activities", major_incidents:"Major Incidents", timelog:isAdmin?"All Teams Time Log":isMgr?"Team Time Log":"My Time Log",
    teams: isAdmin?"All Teams":isMgr?"Team Management":"Team View", members:"Members",
    bandwidth:"Bandwidth & Capacity", reports:"Reports",
    custreports:"Custom Reports", planning:"Capacity Planning", settings:"Settings",
    prod_overview:"Productivity Overview", prod_flags:"Flags & Risks",
    prod_heatmap:"Effort Heatmap", prod_suggest:"Suggestions & Actions", prod_intel:"Intelligence Report",
    dc_upload:"Upload Tickets", dc_integrations:"Integrations",
    usermgmt:"User Management",
    changepw:"Change Password",
    myprofile:"My Profile",
  };

  // ── MINUTE PRESETS ───────────────────────
  const MinPre = ({val,onChange}) => (
    <div style={{display:"flex",gap:5,marginTop:7,flexWrap:"wrap"}}>
      {[[15,"15m"],[30,"30m"],[45,"45m"],[60,"1h"],[90,"1.5h"],[120,"2h"],[180,"3h"],[240,"4h"],[300,"5h"],[480,"8h"]].map(([v,l])=>(
        <button key={v} onClick={()=>onChange(v)} style={{padding:"3px 9px",borderRadius:"var(--radius-xl)",border:`1.5px solid ${val===v?"var(--brand)":"var(--border)"}`,background:val===v?"var(--brand)":"#f8fafc",color:val===v?"#fff":"var(--text-2)",fontSize:11,fontWeight:600,cursor:"pointer",borderRadius:"var(--radius-sm)",transition:"all .12s"}}>{l}</button>
      ))}
    </div>
  );

  // ══════════════════════════════════════════
  //  PAGE RENDERERS
  // ══════════════════════════════════════════

  // (auth handled by outer App wrapper)

  // ── DASHBOARD ────────────────────────────
  const PageDashboard = () => {
    if (!isMgrOrAdmin) {
      const active = teamActs.filter(a=>a.status!=="Done");
      return (
        <div>
          <div style={{marginBottom:20}}>
            <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px",letterSpacing:-.4,fontFamily:"var(--font-sans)"}}>Team Activities — {user.team}</div>
            <div style={{fontSize:12.5,color:"var(--text-3)",marginTop:4,lineHeight:1.6,fontFamily:"var(--font-sans)"}}>Log your time against the activities below</div>
          </div>
          <InfoBanner color="#92400e" bg="#fffbeb" border="#fde68a" icon="💡">Activities are managed by your team manager. Click ⏱ Log My Time to record minutes spent.</InfoBanner>
          {active.length===0 ? <div style={{textAlign:"center",padding:60,color:"var(--text-4)",fontSize:14}}>No active activities yet.</div> : (
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:14}}>
              {active.map(a=>{
                const total=minsForAct(a.id), mine=myLogs.filter(l=>l.actId===a.id).reduce((s,l)=>s+l.mins,0);
                const pct=Math.min(100,Math.round(total/Math.max(a.estMins,1)*100));
                return (
                  <Card key={a.id} style={{borderTop:`3px solid ${tc}`,padding:18}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                      <div style={{flex:1,marginRight:8}}>
                        <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",fontFamily:"var(--font-sans)",letterSpacing:-.3}}>{a.name}</div>
                        <div style={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)",marginTop:2}}>{a.jira} · {a.type}</div>
                      </div>
                      <SPill s={a.status}/>
                    </div>
                    <div style={{fontSize:12,color:"var(--text-3)",marginBottom:12,lineHeight:1.5}}>{a.desc}</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
                      {[["Est.",fmtM(a.estMins),"var(--text-2)"],["Team",fmtM(total),"var(--brand)"],["Mine",fmtM(mine),tc]].map(([l,v,c])=>(
                        <div key={l} style={{textAlign:"center",background:"var(--surface-2)",borderRadius:7,padding:"7px 4px"}}>
                          <div style={{fontSize:15,fontWeight:800,color:c}}>{v}</div>
                          <div style={{fontSize:9,color:"var(--text-4)",marginTop:1,textTransform:"uppercase",letterSpacing:.5}}>{l}</div>
                        </div>
                      ))}
                    </div>
                    <Bar pct={pct} color={tc}/>
                    <div style={{fontSize:10,color:"var(--text-4)",textAlign:"right",marginTop:3}}>{pct}% used</div>
                    <button onClick={()=>{setLForm({...bLog,actId:a.id});setModal("log");}} style={{marginTop:12,width:"100%",padding:9,borderRadius:"var(--radius-sm)",border:`1.5px solid ${tc}`,background:`${tc}10`,color:tc,fontWeight:700,fontSize:13,cursor:"pointer"}}>
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
    const members   = isAdmin ? allUsers.filter(u=>u.team) : allUsers.filter(u=>u.team===(user.team||''));
    const totalMins = dashLogs.reduce((s,l)=>s+l.mins,0);
    const avgUtil   = Math.round(dashCap.reduce((s,c)=>{const n=c.availMins-c.vacMins;return s+(c.utilMins/n*100)},0)/Math.max(dashCap.length,1));

    // ── SVG Chart helpers ──────────────────────────────────
    // ── Beautiful horizontal bar chart ──────────────────────────────
    const BarChart = ({data, unit="", onClick}) => {
      if(!data||!data.length) return <div style={{color:"var(--text-4)",fontSize:12,padding:"20px 0",textAlign:"center"}}>No data</div>;
      const max = Math.max(...data.map(d=>d.val), 1);
      return (
        <div style={{display:"flex",flexDirection:"column",gap:8,width:"100%"}}>
          {data.map((d,i)=>{
            const pct = Math.round(d.val/max*100);
            return (
              <div key={d.label||i} onClick={()=>onClick&&onClick(d)}
                style={{cursor:onClick?"pointer":"default"}}
                onMouseEnter={e=>{if(onClick)e.currentTarget.style.opacity=".85";}}
                onMouseLeave={e=>{e.currentTarget.style.opacity="1";e.currentTarget.style.background="";}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                  <div style={{display:"flex",alignItems:"center",gap:7,minWidth:0}}>
                    {d.emoji && <span style={{fontSize:14,flexShrink:0}}>{d.emoji}</span>}
                    <div style={{width:8,height:8,borderRadius:"50%",background:d.color||"var(--brand)",flexShrink:0}}/>
                    <span style={{fontSize:12,fontWeight:600,color:"var(--text-2)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:130}}>{d.label}</span>
                  </div>
                  <span style={{fontSize:12,fontWeight:800,color:d.color||"var(--brand)",flexShrink:0,marginLeft:8}}>{d.val}{unit}</span>
                </div>
                <div style={{height:6,background:"var(--surface-3)",borderRadius:99,overflow:"hidden"}}>
                  <div style={{
                    height:"100%",
                    width:`${pct}%`,
                    background:`linear-gradient(90deg,${d.color||"var(--brand)"},${d.color||"var(--brand)"}bb)`,
                    borderRadius:6,
                    transition:"width .6s cubic-bezier(.4,0,.2,1)"
                  }}/>
                </div>
              </div>
            );
          })}
        </div>
      );
    };

    // Keep SvgBarChart alias pointing to BarChart for any old references
    const SvgBarChart = ({data}) => <BarChart data={data}/>;

    const SvgDonut = ({segments, size=120, label, sublabel}) => {
      const valid = (segments||[]).filter(d=>d.val>0);
      const total = valid.reduce((s,d)=>s+d.val,0)||1;
      let angle = -90;
      // Use 200×200 viewBox so text is always readable
      const VW=200, cx=100, cy=100, R=72, sw=26;
      const arcs = valid.map(d=>{
        const sweep = Math.max(0.5,(d.val/total)*360);
        const r1=(angle*Math.PI/180), r2=((angle+sweep)*Math.PI/180);
        const x1=cx+R*Math.cos(r1), y1=cy+R*Math.sin(r1);
        const x2=cx+R*Math.cos(r2), y2=cy+R*Math.sin(r2);
        const lg=sweep>180?1:0;
        const path = sweep>=359.5
          ? `M ${cx} ${cy-R} A ${R} ${R} 0 1 1 ${cx-.01} ${cy-R}`
          : `M ${x1} ${y1} A ${R} ${R} 0 ${lg} 1 ${x2} ${y2}`;
        angle+=sweep;
        return {...d, path, pct:Math.round(d.val/total*100)};
      });
      return (
        <svg viewBox={`0 0 ${VW} ${VW}`} style={{width:size,height:size,display:"block",flexShrink:0}}>
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--surface-3)" strokeWidth={sw}/>
          {arcs.map((a,i)=>(
            <path key={i} d={a.path} fill="none" stroke={a.color} strokeWidth={sw}
              strokeLinecap="butt" style={{filter:`drop-shadow(0 2px 4px ${a.color}44)`}}/>
          ))}
          {label && <text x={cx} y={cy-8} textAnchor="middle" fontSize="30" fontWeight="800" fill="var(--text-1)">{label}</text>}
          {sublabel && <text x={cx} y={cy+18} textAnchor="middle" fontSize="16" fill="var(--text-4)">{sublabel}</text>}
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


    // ─────────────────────────────────────────────────────────────────
    // CHART LIBRARY — all use large coordinate spaces for readable text
    // ─────────────────────────────────────────────────────────────────

    // ── Vertical Column Chart ────────────────────────────────────────
    // Uses 600×300 viewBox so fonts and bars are always readable
    const ColumnChart = ({data, height=180, unit="", onClick}) => {
      if(!data||!data.length) return <div style={{color:"var(--text-4)",fontSize:12,padding:20,textAlign:"center"}}>No data</div>;
      const max = Math.max(...data.map(d=>d.val), 1);
      const VW=600, VH=300, padL=10, padR=10, padT=40, padB=50;
      const chartW = VW-padL-padR;
      const chartH = VH-padT-padB;
      const n = data.length;
      const barW = Math.min(70, chartW/n*0.55);
      const step = chartW/n;
      return (
        <svg viewBox={`0 0 ${VW} ${VH}`} style={{width:"100%",height,display:"block"}} preserveAspectRatio="xMidYMid meet">
          <defs>
            {data.map((d,i)=>(
              <linearGradient key={i} id={`vcg_${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={d.color||"var(--brand)"}/>
                <stop offset="100%" stopColor={d.color||"var(--brand)"} stopOpacity=".55"/>
              </linearGradient>
            ))}
          </defs>
          {/* Horizontal grid lines */}
          {[0,25,50,75,100].map(p=>{
            const y = padT + chartH - (p/100)*chartH;
            return (
              <g key={p}>
                <line x1={padL} y1={y} x2={VW-padR} y2={y} stroke={p===0?"#e2e8f0":"#f1f5f9"} strokeWidth={p===0?1.5:1}/>
                {p>0 && <text x={padL-4} y={y+4} textAnchor="end" fontSize="18" fill="var(--text-4)">{Math.round(max*p/100)}{unit}</text>}
              </g>
            );
          })}
          {data.map((d,i)=>{
            const bh = Math.max(4, (d.val/max)*chartH);
            const cx = padL + i*step + step/2;
            const x  = cx - barW/2;
            const y  = padT + chartH - bh;
            const col = d.color||"var(--brand)";
            return (
              <g key={i} style={{cursor:onClick?"pointer":"default"}} onClick={()=>onClick&&onClick(d)}>
                {/* Bar shadow */}
                <rect x={x+3} y={y+4} width={barW} height={bh} rx="6" fill={col} opacity=".08"/>
                {/* Bar */}
                <rect x={x} y={y} width={barW} height={bh} rx="6" fill={`url(#vcg_${i})`}/>
                {/* Value label on top */}
                <text x={cx} y={y-10} textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--text-1)">{d.val}{unit}</text>
                {/* X axis label */}
                <text x={cx} y={VH-10} textAnchor="middle" fontSize="18" fontWeight="600" fill="var(--text-3)">{d.label}</text>
              </g>
            );
          })}
        </svg>
      );
    };

    // ── Lollipop Chart ───────────────────────────────────────────────
    // Uses 600 wide viewBox, row height scales to content
    const LollipopChart = ({data, unit="", onClick}) => {
      if(!data||!data.length) return <div style={{color:"var(--text-4)",fontSize:12,padding:20,textAlign:"center"}}>No data</div>;
      const max = Math.max(...data.map(d=>d.val), 1);
      const VW=600, rowH=52, padL=200, padR=80;
      const trackW = VW-padL-padR;
      const VH = data.length*rowH + 10;
      return (
        <svg viewBox={`0 0 ${VW} ${VH}`} style={{width:"100%",height:Math.max(120,data.length*42),display:"block"}} preserveAspectRatio="xMidYMid meet">
          {data.map((d,i)=>{
            const stemW = Math.max(4,(d.val/max)*trackW);
            const y = i*rowH + rowH/2 + 5;
            const col = d.color||"var(--brand)";
            return (
              <g key={i} style={{cursor:onClick?"pointer":"default"}} onClick={()=>onClick&&onClick(d)}>
                {/* Track */}
                <line x1={padL} y1={y} x2={VW-padR} y2={y} stroke="var(--border)" strokeWidth="5" strokeLinecap="round"/>
                {/* Filled stem */}
                <line x1={padL} y1={y} x2={padL+stemW} y2={y} stroke={col} strokeWidth="5" strokeLinecap="round"/>
                {/* Outer dot */}
                <circle cx={padL+stemW} cy={y} r="11" fill={col}/>
                {/* Inner white dot */}
                <circle cx={padL+stemW} cy={y} r="5" fill="#fff"/>
                {/* Label — left aligned */}
                <text x={padL-12} y={y+1} textAnchor="end" fontSize="19" fontWeight="600" fill="var(--text-2)" dominantBaseline="middle">{d.label}</text>
                {/* Value — right of dot */}
                <text x={padL+stemW+18} y={y+1} textAnchor="start" fontSize="20" fontWeight="800" fill={col} dominantBaseline="middle">{d.val}{unit}</text>
              </g>
            );
          })}
        </svg>
      );
    };

    // ── Radial Progress List ─────────────────────────────────────────
    // Pure CSS/HTML — no SVG scaling issues
    const RadialList = ({data, onClick}) => {
      if(!data||!data.length) return null;
      const max = Math.max(...data.map(d=>d.val), 1);
      return (
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {data.map((d,i)=>{
            const pct = Math.round(d.val/max*100);
            const col = d.color||"var(--brand)";
            const R=20, circ=2*Math.PI*R;
            const dash=circ*(pct/100);
            return (
              <div key={i} onClick={()=>onClick&&onClick(d)}
                style={{display:"flex",alignItems:"center",gap:12,
                  padding:"8px 10px",borderRadius:"var(--radius-md)",cursor:onClick?"pointer":"default",
                  transition:"background .12s",background:"var(--surface-2)"}}
                onMouseEnter={e=>{e.currentTarget.style.background="var(--brand-light)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="var(--surface-2)";}}>
                {/* Ring */}
                <svg width="46" height="46" viewBox="0 0 46 46" style={{flexShrink:0}}>
                  <circle cx="23" cy="23" r={R} fill="none" stroke="var(--border)" strokeWidth="5"/>
                  <circle cx="23" cy="23" r={R} fill="none" stroke={col} strokeWidth="5"
                    strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" transform="rotate(-90 23 23)"/>
                  <text x="23" y="24" textAnchor="middle" dominantBaseline="middle"
                    fontSize="11" fontWeight="800" fill={col}>{i+1}</text>
                </svg>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:700,color:"var(--text-1)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.label}</div>
                  {d.sub && <div style={{fontSize:10,color:"var(--text-4)",marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.sub}</div>}
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:17,fontWeight:800,color:col,lineHeight:1}}>{d.val}</div>
                  {d.unit && <div style={{fontSize:9,color:"var(--text-4)",marginTop:1,fontFamily:"var(--font-mono)"}}>{d.unit}</div>}
                </div>
              </div>
            );
          })}
        </div>
      );
    };

    // ── Pie Chart ────────────────────────────────────────────────────
    // Uses 400×400 viewBox for crisp slices and readable % labels
    const PieChart = ({data, size=160, onClick}) => {
      const valid = (data||[]).filter(d=>d.val>0);
      const total = valid.reduce((s,d)=>s+d.val,0)||1;
      let angle = -90;
      const VW=400, cx=200, cy=200, R=160;
      const slices = valid.map(d=>{
        const sweep = Math.max(0.5,(d.val/total)*360);
        const r1=angle*Math.PI/180, r2=(angle+sweep)*Math.PI/180;
        const x1=cx+R*Math.cos(r1), y1=cy+R*Math.sin(r1);
        const x2=cx+R*Math.cos(r2), y2=cy+R*Math.sin(r2);
        const mid=(angle+sweep/2)*Math.PI/180;
        const pct=Math.round(d.val/total*100);
        const lg=sweep>180?1:0;
        const path=sweep>=359.5
          ?`M ${cx+R} ${cy} A ${R} ${R} 0 1 1 ${cx+R-.01} ${cy} Z`
          :`M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 ${lg} 1 ${x2} ${y2} Z`;
        // label position — inside slice centre
        const lx=cx+(R*.62)*Math.cos(mid), ly=cy+(R*.62)*Math.sin(mid);
        angle+=sweep;
        return {...d, path, pct, lx, ly, mid};
      });
      return (
        <svg viewBox={`0 0 ${VW} ${VW}`} style={{width:size,height:size,display:"block",flexShrink:0}}>
          {slices.map((s,i)=>(
            <g key={i} style={{cursor:onClick?"pointer":"default"}} onClick={()=>onClick&&onClick(s)}>
              <path d={s.path} fill={s.color}
                style={{filter:`drop-shadow(0 2px 4px ${s.color}55)`,transition:"transform .18s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform=`translate(${Math.cos(s.mid)*8}px,${Math.sin(s.mid)*8}px)`;}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";}}/>
              {s.pct>=6 && (
                <text x={s.lx} y={s.ly} textAnchor="middle" dominantBaseline="middle"
                  fontSize="28" fontWeight="800" fill="rgba(255,255,255,.95)">{s.pct}%</text>
              )}
            </g>
          ))}
        </svg>
      );
    };

    // ── Activity breakdown data ──────────────────────────────────
    const actByType  = ["Project","Change","BAU","Incident","Training","Meeting"].map(t=>({
      label:t.slice(0,4), val:dashActs.filter(a=>a.type===t).length,
      color:{Project:"#2563eb",Change:"#06b6d4",BAU:"#059669",Incident:"#dc2626",Training:"#d97706",Meeting:"#7c3aed"}[t]
    })).filter(d=>d.val>0);

    const actByStat  = [{label:"Active",val:dashActs.filter(a=>a.status==="Active").length,color:"#059669"},
                        {label:"Pending",val:dashActs.filter(a=>a.status==="Pending").length,color:"#d97706"},
                        {label:"Done",   val:dashActs.filter(a=>a.status==="Done").length,   color:"var(--text-3)"},
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
      color:{"Infrastructure":"var(--brand)","Maintenance":"#06b6d4","Security":"#dc2626","Automation":"#7c3aed","Monitoring":"#059669"}[cat.split(" ")[0]]||"var(--text-3)"
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
        <div style={{marginBottom:20}}>
          <div style={{fontSize:22,fontWeight:800,color:"var(--text-1)",letterSpacing:-.5}}>
            Good day, {user.name.split(" ")[0]} 👋
          </div>
          <div style={{fontSize:12.5,color:"var(--text-3)",marginTop:4,fontFamily:"var(--font-mono)"}}>
            {isAdmin?"ISMS Administrator — All Teams":user.team+" Team Manager"} · March 2025
          </div>
        </div>

        {/* KPI strip */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:14,marginBottom:20}}>
          {[
            {label:"Activities",   val:dashActs.length,  sub:`${dashActs.filter(a=>a.status==="Active").length} active`,    c:"#2563eb",bg:"#eff6ff",icon:"📋", spark:[3,5,4,8,6,10,dashActs.length],    nav:"activities"},
            {label:"Hours Logged", val:fmtM(totalMins),  sub:`${dashLogs.length} entries`,                                   c:"#7c3aed",bg:"#f5f3ff",icon:"⏱", spark:[4,6,5,9,7,11,Math.round(totalMins/60)], nav:"timelog"},
            {label:isAdmin?"Avg Util":"Team Util", val:`${avgUtil}%`, sub:isAdmin?"all teams":"your team",                   c:avgUtil>85?"#dc2626":avgUtil>70?"#d97706":"#16a34a",bg:avgUtil>85?"#fef2f2":avgUtil>70?"#fffbeb":"#f0fdf4",icon:"📊", spark:[65,70,68,75,72,78,avgUtil], nav:"bandwidth"},
            {label:isAdmin?"Teams":"Members",      val:isAdmin?teams.length:members.length, sub:isAdmin?"operational":"in team", c:"#d97706",bg:"#fffbeb",icon:"👥", spark:[6,6,6,6,6,6,isAdmin?teams.length:members.length], nav:"members"},
            {label:"On Leave",     val:dashLeave.length, sub:"this month",                                                   c:"#dc2626",bg:"#fef2f2",icon:"🏖", spark:[1,2,1,3,2,4,dashLeave.length],     nav:"bandwidth"},
          ].map(s=>(
            <div key={s.label} onClick={()=>goPage(s.nav)} className="kpi-card"
              style={{
                background:"var(--surface)",
                borderRadius:"var(--radius-lg)",
                padding:"16px 18px",
                cursor:"pointer",
                border:"1px solid var(--border)",
                borderTop:`3px solid ${s.c}`,
                boxShadow:"var(--shadow-md)",
                transition:"all .22s cubic-bezier(.22,1,.36,1)",
                overflow:"hidden",
                position:"relative"
              }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 12px 32px rgba(15,23,42,.12)`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="var(--shadow-md)";}}>
              {/* Background glow */}
              <div style={{position:"absolute",top:-20,right:-20,width:80,height:80,borderRadius:"50%",background:s.bg,opacity:.6,pointerEvents:"none"}}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10,position:"relative"}}>
                <div style={{width:36,height:36,borderRadius:"var(--radius-md)",background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{s.icon}</div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:9,fontWeight:700,color:"var(--text-4)",textTransform:"uppercase",letterSpacing:1.5,fontFamily:"var(--font-mono)"}}>{s.label}</div>
                  <div style={{fontSize:24,fontWeight:800,color:s.c,lineHeight:1.1,letterSpacing:-.5,marginTop:2}}>{s.val}</div>
                </div>
              </div>
              <SvgSparkline points={s.spark} color={s.c} height={28}/>
              <div style={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)",marginTop:5,fontWeight:500}}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Row 1: Utilization Bars + Donut Status + Sparkline trend */}
        <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr 1fr",gap:14,marginBottom:14}}>

          {/* Team Utilization — VERTICAL COLUMN CHART */}
          <Card className="card-hover" style={{cursor:"pointer"}} onClick={()=>goPage("bandwidth")}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div>
                <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)"}}>Team Utilization</div>
                <div style={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)",marginTop:1}}>% of net capacity used</div>
              </div>
              <Btn sm v="sec" onClick={e=>{e.stopPropagation();goPage("bandwidth");}}>Details →</Btn>
            </div>
            <ColumnChart
              height={150}
              onClick={()=>goPage("bandwidth")}
              data={dashCap.map(c=>{
                const net=c.availMins-c.vacMins, pct=Math.round(c.utilMins/net*100);
                return {label:c.team.slice(0,3), val:pct, color:uCol(pct)};
              })}
            />
            <div style={{display:"flex",justifyContent:"center",gap:16,marginTop:8}}>
              {[["#16a34a","Good (<70%)"],["#d97706","Medium"],["#dc2626","High (>85%)"]].map(([c,l])=>(
                <div key={l} style={{display:"flex",alignItems:"center",gap:4,fontSize:10,color:"var(--text-3)"}}>
                  <div style={{width:8,height:8,borderRadius:2,background:c}}/>{l}
                </div>
              ))}
            </div>
          </Card>

          {/* Most / Least Active Members */}
          {(()=>{
            const mbrStats = members.map(m=>{
              const mLogs = dashLogs.filter(l=>l.userId===m.id);
              const tasks = [...new Set(mLogs.map(l=>l.actId))].length;
              const hrs   = Math.round(mLogs.reduce((s,l)=>s+l.mins,0)/60);
              return { id:m.id, name:m.name.split(" ")[0]+" "+m.name.split(" ")[1]?.[0]+".", team:m.team||user.team, tasks, hrs };
            }).filter(m=>m.tasks>0||true).sort((a,b)=>b.tasks-a.tasks);
            const most3 = mbrStats.slice(0,3);
            const least3 = [...mbrStats].sort((a,b)=>a.tasks-b.tasks).filter(m=>m.tasks<Math.max(...mbrStats.map(x=>x.tasks))).slice(0,3);
            const maxT = Math.max(...mbrStats.map(m=>m.tasks),1);
            const medals = ["🥇","🥈","🥉"];
            return (
              <Card>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",marginBottom:2,letterSpacing:"-.2px"}}>Member Activity Load</div>
                    <div style={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)"}}>Tasks handled · click to drill</div>
                  </div>
                  <Btn sm v="sec" onClick={()=>goPage("members")}>Members →</Btn>
                </div>
                {/* Most active */}
                <div style={{fontSize:10,fontWeight:700,color:"#059669",textTransform:"uppercase",letterSpacing:1,marginBottom:6,fontFamily:"var(--font-mono)"}}>▲ Most Active</div>
                <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:12}}>
                  {most3.map((m,i)=>{
                    const pct=Math.round(m.tasks/maxT*100);
                    return (
                      <div key={m.id} onClick={()=>setDashDrill({type:"logs",label:`${m.name} — Time Entries`,data:dashLogs.filter(l=>l.userId===m.id)})}
                        style={{display:"flex",alignItems:"center",gap:8,padding:"5px 8px",borderRadius:"var(--radius-sm)",cursor:"pointer",background:"#f0fdf4",transition:"background .1s"}}
                        onMouseEnter={e=>e.currentTarget.style.background="#dcfce7"}
                        onMouseLeave={e=>e.currentTarget.style.background="#f0fdf4"}>
                        <span style={{fontSize:14,flexShrink:0}}>{medals[i]}</span>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                            <span style={{fontSize:11,fontWeight:700,color:"var(--text-1)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:100}}>{m.name}</span>
                            <span style={{fontSize:11,fontWeight:800,color:"#059669",flexShrink:0}}>{m.tasks} tasks</span>
                          </div>
                          <div style={{height:4,background:"rgba(5,150,105,.15)",borderRadius:99,overflow:"hidden"}}>
                            <div style={{height:"100%",width:`${pct}%`,background:"#059669",borderRadius:99}}/>
                          </div>
                        </div>
                        <span style={{fontSize:10,color:"var(--text-4)",flexShrink:0,fontFamily:"var(--font-mono)"}}>{m.hrs}h</span>
                      </div>
                    );
                  })}
                </div>
                {/* Least active */}
                <div style={{fontSize:10,fontWeight:700,color:"#dc2626",textTransform:"uppercase",letterSpacing:1,marginBottom:6,fontFamily:"var(--font-mono)"}}>▼ Least Active</div>
                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                  {least3.map((m,i)=>{
                    const pct=Math.round(m.tasks/maxT*100);
                    return (
                      <div key={m.id} onClick={()=>setDashDrill({type:"logs",label:`${m.name} — Time Entries`,data:dashLogs.filter(l=>l.userId===m.id)})}
                        style={{display:"flex",alignItems:"center",gap:8,padding:"5px 8px",borderRadius:"var(--radius-sm)",cursor:"pointer",background:"#fff7ed",transition:"background .1s"}}
                        onMouseEnter={e=>e.currentTarget.style.background="#ffedd5"}
                        onMouseLeave={e=>e.currentTarget.style.background="#fff7ed"}>
                        <span style={{fontSize:14,flexShrink:0,opacity:.6}}>⚠️</span>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                            <span style={{fontSize:11,fontWeight:700,color:"var(--text-1)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:100}}>{m.name}</span>
                            <span style={{fontSize:11,fontWeight:800,color:"#ea580c",flexShrink:0}}>{m.tasks} tasks</span>
                          </div>
                          <div style={{height:4,background:"rgba(220,38,38,.12)",borderRadius:99,overflow:"hidden"}}>
                            <div style={{height:"100%",width:`${pct}%`,background:"#f97316",borderRadius:99}}/>
                          </div>
                        </div>
                        <span style={{fontSize:10,color:"var(--text-4)",flexShrink:0,fontFamily:"var(--font-mono)"}}>{m.hrs}h</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })()}

          {/* Daily trend sparkline */}
          <Card style={{cursor:"pointer"}} onClick={()=>goPage("timelog")}
              onMouseEnter={e=>e.currentTarget.style.boxShadow="var(--shadow-lg)"}
              onMouseLeave={e=>e.currentTarget.style.boxShadow=""}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div>
                <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",marginBottom:1}}>Daily Hours Trend</div>
                <div style={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)"}}>Mar 8–14 · hours/day</div>
              </div>
              <span style={{fontSize:10,color:"var(--brand)",fontWeight:600,background:"var(--brand-light)",padding:"3px 8px",borderRadius:"var(--radius-sm)"}}>↗ view log</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:10}}>
              <div>
                <div style={{fontSize:26,fontWeight:800,color:"var(--brand)",letterSpacing:-.5}}>{sparkPts.reduce((s,v)=>s+v,0)}h</div>
                <div style={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)"}}>this week</div>
              </div>
              <div style={{textAlign:"right",padding:"4px 8px",background:"#f0fdf4",borderRadius:"var(--radius-sm)"}}>
                <div style={{fontSize:13,fontWeight:800,color:"#059669"}}>↑ 12%</div>
                <div style={{fontSize:9,color:"var(--text-4)"}}>vs last week</div>
              </div>
            </div>
            <SvgSparkline points={sparkPts} color="var(--brand)" height={56}/>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
              {["M","T","W","T","F","S","S"].map((d,i)=>(
                <div key={i} style={{textAlign:"center",flex:1}}>
                  <div style={{fontSize:10,fontWeight:700,color:"var(--brand)"}}>{sparkPts[i]}h</div>
                  <div style={{fontSize:9,color:"#c4c9d4"}}>{d}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Row 2: Hours by member bar + Activity type bar + Recent entries */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1.2fr",gap:14,marginBottom:14}}>

          {/* Hours by Team/Member — COLUMN CHART */}
          <Card style={{cursor:"pointer"}} onClick={()=>goPage("timelog")}
              onMouseEnter={e=>e.currentTarget.style.boxShadow="var(--shadow-lg)"}
              onMouseLeave={e=>e.currentTarget.style.boxShadow=""}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div>
                <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",marginBottom:3,letterSpacing:"-.2px"}}>Hours by {isAdmin?"Team":"Member"}</div>
                <div style={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)"}}>{isAdmin?"Logged hours per team":"Logged hours per person"}</div>
              </div>
              <span style={{fontSize:10,color:"var(--brand)",fontWeight:600,background:"var(--brand-light)",padding:"3px 8px",borderRadius:"var(--radius-sm)"}}>↗ view log</span>
            </div>
            <ColumnChart
              height={140}
              onClick={()=>goPage("timelog")}
              data={isAdmin
                ? dashCap.map(c=>({
                    label:c.team.slice(0,3),
                    val:Math.round(dashLogs.filter(l=>l.team===c.team).reduce((s,l)=>s+l.mins,0)/60),
                    color:tCol(c.team)
                  })).filter(d=>d.val>0)
                : logsByMember.filter(m=>m.val>0).map(m=>({...m, label:m.label.slice(0,5)}))
              }
            />
          </Card>

          {/* Activity Types — LOLLIPOP CHART */}
          <Card>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div>
                <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",marginBottom:3,letterSpacing:"-.2px"}}>Activity Types</div>
                <div style={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)"}}>Count by work type · click to drill</div>
              </div>
            </div>
            <LollipopChart
              data={actByType.map(d=>({
                ...d,
                label:["Project","Change","BAU","Incident","Training","Meeting"].find(t=>t.slice(0,4)===d.label)||d.label
              }))}
              onClick={(d)=>setDashDrill({type:"acts",label:`${d.label} Activities`,data:dashActs.filter(a=>a.type===d.label)})}
            />
          </Card>

          {/* Project Status / Health */}
          {(()=>{
            const projects = dashActs.filter(a=>a.type==="Project");
            const projData = projects.map(a=>{
              const logged = dashLogs.filter(l=>l.actId===a.id).reduce((s,l)=>s+l.mins,0);
              const timePct = Math.round(logged/Math.max(a.estMins,1)*100);
              const progPct = a.progress!=null ? a.progress : Math.min(100,timePct);
              const health  = progPct>=100?"Done":timePct>progPct+20?"At Risk":timePct>90&&progPct<80?"Over Budget":"On Track";
              const hCol    = {Done:"#059669","At Risk":"#dc2626","Over Budget":"#d97706","On Track":"#2563eb"}[health];
              const hBg     = {Done:"#f0fdf4","At Risk":"#fef2f2","Over Budget":"#fffbeb","On Track":"#eff6ff"}[health];
              return { ...a, logged, timePct, progPct, health, hCol, hBg };
            });
            return (
              <Card>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",fontFamily:"var(--font-sans)",letterSpacing:-.3}}>📁 Project Health</div>
                    <div style={{fontSize:11,color:"var(--text-3)"}}>Progress % vs time logged · click to drill</div>
                  </div>
                  <Btn sm v="sec" onClick={()=>goPage("activities")}>All Projects →</Btn>
                </div>
                {projData.length===0
                  ? <div style={{textAlign:"center",padding:30,color:"var(--text-4)",fontSize:12}}>No projects yet. Create an activity with type "Project".</div>
                  : <div style={{display:"flex",flexDirection:"column",gap:8,maxHeight:280,overflowY:"auto"}}>
                      {projData.map(p=>(
                        <div key={p.id} onClick={()=>setDashDrill({type:"logs",label:`${p.name} — Entries`,data:dashLogs.filter(l=>l.actId===p.id)})}
                          style={{borderRadius:"var(--radius-md)",border:`1px solid ${p.hCol}22`,background:p.hBg,padding:"9px 11px",cursor:"pointer",transition:"box-shadow .12s"}}
                          onMouseEnter={e=>e.currentTarget.style.boxShadow=`0 2px 10px ${p.hCol}25`}
                          onMouseLeave={e=>e.currentTarget.style.boxShadow=""}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
                            <div style={{flex:1,minWidth:0}}>
                              <div style={{fontSize:12,fontWeight:700,color:"var(--text-1)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:160}}>{p.name}</div>
                              <div style={{fontSize:10,color:"var(--text-4)",marginTop:1}}>{p.team} · {fmtM(p.logged)} logged</div>
                            </div>
                            <span style={{fontSize:10,fontWeight:700,background:p.hCol,color:"#fff",padding:"2px 8px",borderRadius:99,flexShrink:0,marginLeft:8}}>{p.health}</span>
                          </div>
                          {/* Dual bar: grey = time used, colored = progress */}
                          <div style={{position:"relative",height:7,background:"var(--surface-3)",borderRadius:99,overflow:"hidden",marginBottom:3}}>
                            {/* Time logged bar (behind) */}
                            <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${Math.min(100,p.timePct)}%`,background:`${p.hCol}44`,borderRadius:99}}/>
                            {/* Progress bar (in front) */}
                            <div style={{position:"absolute",left:0,top:2,height:3,width:`${p.progPct}%`,background:p.hCol,borderRadius:99}}/>
                          </div>
                          <div style={{display:"flex",justifyContent:"space-between"}}>
                            <span style={{fontSize:9,color:"var(--text-4)"}}>⏱ {p.timePct}% time used</span>
                            <span style={{fontSize:9,fontWeight:700,color:p.hCol}}>✓ {p.progPct}% complete</span>
                          </div>
                        </div>
                      ))}
                    </div>
                }
              </Card>
            );
          })()}
        </div>

        {/* Row 3: Category donut | Top Activities | Most Time-Consuming */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.4fr 1.4fr",gap:14,marginBottom:14}}>

          {/* Time by Category — PIE CHART */}
          <Card>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
              <div>
                <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",marginBottom:3,letterSpacing:"-.2px"}}>Time by Category</div>
                <div style={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)"}}>Hours distribution · click to drill</div>
              </div>
              <div style={{fontSize:13,fontWeight:800,color:"var(--brand)"}}>{fmtM(totalMins)}</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
              <PieChart
                size={150}
                data={logsByCat.map(d=>({...d,val:d.val}))}
                onClick={d=>setDashDrill({type:"logs",label:`${d.fullLabel||d.label} — Time Entries`,data:dashLogs.filter(l=>l.cat===d.fullLabel)})}
              />
              <div style={{width:"100%",display:"flex",flexDirection:"column",gap:4}}>
                {logsByCat.map(d=>(
                  <div key={d.label} onClick={()=>setDashDrill({type:"logs",label:`${d.fullLabel} — Time Entries`,data:dashLogs.filter(l=>l.cat===d.fullLabel)})}
                    style={{display:"flex",alignItems:"center",gap:8,padding:"5px 8px",borderRadius:7,cursor:"pointer",transition:"background .1s"}}
                    onMouseEnter={e=>e.currentTarget.style.background="var(--surface-2)"}
                    onMouseLeave={e=>e.currentTarget.style.background=""}>
                    <div style={{width:10,height:10,borderRadius:2,background:d.color,flexShrink:0}}/>
                    <span style={{fontSize:11,color:"var(--text-2)",fontWeight:600,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.fullLabel}</span>
                    <span style={{fontSize:12,fontWeight:800,color:d.color,flexShrink:0}}>{d.val}h</span>
                    <span style={{fontSize:9,color:"var(--text-4)",flexShrink:0,minWidth:28,textAlign:"right"}}>{Math.round(d.val/Math.max(totalMins/60,1)*100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Top Activities by number of log entries */}
          {(()=>{
            const topActs = [...dashActs]
              .map(a=>({ ...a, entries: dashLogs.filter(l=>l.actId===a.id).length, logged: dashLogs.filter(l=>l.actId===a.id).reduce((s,l)=>s+l.mins,0) }))
              .filter(a=>a.entries>0).sort((a,b)=>b.entries-a.entries).slice(0,5);
            const maxE = Math.max(...topActs.map(a=>a.entries),1);
            const medals = ["🥇","🥈","🥉","④","⑤"];
            const medalBg = ["linear-gradient(135deg,#f59e0b,#fbbf24)","linear-gradient(135deg,#94a3b8,#cbd5e1)","linear-gradient(135deg,#d97706,#f59e0b)","#f1f5f9","#f1f5f9"];
            return (
              <Card>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)"}}>🏆 Top Activities</div>
                    <div style={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)",marginTop:1}}>Most logged this month</div>
                  </div>
                  <Btn sm v="sec" onClick={()=>goPage("activities")}>All →</Btn>
                </div>
                {topActs.length===0
                  ? <div style={{textAlign:"center",padding:30,color:"var(--text-4)",fontSize:12}}>No entries yet</div>
                  : <RadialList
                      data={topActs.map(a=>({
                        label:a.name,
                        val:a.entries,
                        unit:"logs",
                        sub:`${fmtM(a.logged)} · ${a.team}`,
                        color:tCol(a.team)
                      }))}
                      onClick={d=>{
                        const act=topActs.find(a=>a.name===d.label);
                        if(act) setDashDrill({type:"logs",label:`${act.name} — Entries`,data:dashLogs.filter(l=>l.actId===act.id)});
                      }}
                    />
                }
              </Card>
            );
          })()}

          {/* Most Time-Consuming Activities by logged hours */}
          {(()=>{
            const heavy = [...dashActs]
              .map(a=>({ ...a, logged: dashLogs.filter(l=>l.actId===a.id).reduce((s,l)=>s+l.mins,0) }))
              .filter(a=>a.logged>0).sort((a,b)=>b.logged-a.logged).slice(0,5);
            const maxH = Math.max(...heavy.map(a=>a.logged),1);
            return (
              <Card>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)"}}>⏰ Most Time-Consuming</div>
                    <div style={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)",marginTop:1}}>Highest hours logged</div>
                  </div>
                  <Btn sm v="sec" onClick={()=>goPage("bandwidth")}>Details →</Btn>
                </div>
                {heavy.length===0
                  ? <div style={{textAlign:"center",padding:30,color:"var(--text-4)",fontSize:12}}>No time logged yet</div>
                  : <LollipopChart
                      data={heavy.map(a=>({
                        label:a.name.length>18?a.name.slice(0,17)+"…":a.name,
                        val:Math.round(a.logged/60),
                        color:a.logged>a.estMins?"#dc2626":tCol(a.team),
                        fullName:a.name, id:a.id
                      }))}
                      onClick={d=>{
                        const act=heavy.find(a=>a.id===d.id);
                        if(act) setDashDrill({type:"logs",label:`${act.name} — Entries`,data:dashLogs.filter(l=>l.actId===act.id)});
                      }}
                    />
                }
              </Card>
            );
          })()}
        </div>

        {/* Row 5: Work Type Leaderboard — Changes, SRs, Incidents, Major Incidents */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:14}}>
          {[
            {label:"Changes",      icon:"🔄", wn:"Change",   col:"#d97706", bg:"#fffbeb"},
            {label:"Service Requests",icon:"📥",wn:"Service Request",col:"#7c3aed",bg:"#f5f3ff"},
            {label:"Incidents",    icon:"🚨", wn:"Incident", col:"#dc2626", bg:"#fef2f2"},
            {label:"Major Incidents",icon:"🆘",wn:"MI",      col:"#be123c", bg:"#fff1f2"},
          ].map(({label,icon,wn,col,bg})=>{
            let topItems, total;
            if(wn==="MI"){
              // Major Incidents — by team contribution hours
              const miLogs = dashLogs.filter(l=>{ const a=acts.find(x=>x.id===l.actId); return a&&a.isMajorIncident; });
              total = miLogs.length;
              const byTeam = SEED_TEAMS.map(t=>({
                name:t.name,
                val:miLogs.filter(l=>l.team===t.name).length,
                isTeam:true,
                col:tCol(t.name)
              })).filter(x=>x.val>0).sort((a,b)=>b.val-a.val).slice(0,4);
              topItems = byTeam;
            } else {
              const filtered = dashLogs.filter(l=>l.workNature===wn||(l.type==="Incident"&&wn==="Incident"));
              total = filtered.length;
              // By member
              const byMbr = members.map(m=>({
                name:m.name.split(" ")[0]+" "+m.name.split(" ")[1]?.[0]+".",
                val:filtered.filter(l=>l.userId===m.id).length,
                col:tCol(m.team||user.team)
              })).filter(x=>x.val>0).sort((a,b)=>b.val-a.val).slice(0,4);
              topItems = byMbr;
            }
            const max = Math.max(...(topItems.map(x=>x.val)),1);
            return (
              <Card key={label} style={{borderTop:`3px solid ${col}`}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                  <div style={{width:32,height:32,borderRadius:"var(--radius-sm)",background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{icon}</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:12,color:"var(--text-1)",letterSpacing:"-.2px"}}>{label}</div>
                    <div style={{fontSize:10,color:"var(--text-4)",fontFamily:"var(--font-mono)"}}>{total} total logs</div>
                  </div>
                </div>
                {topItems.length===0
                  ? <div style={{fontSize:11,color:"var(--text-4)",textAlign:"center",padding:"10px 0"}}>No data</div>
                  : topItems.map((item,i)=>{
                      const pct=Math.round(item.val/max*100);
                      const medals=["🥇","🥈","🥉","④"];
                      return (
                        <div key={item.name} style={{marginBottom:7}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                            <div style={{display:"flex",alignItems:"center",gap:5}}>
                              <span style={{fontSize:11}}>{medals[i]}</span>
                              <span style={{fontSize:11,fontWeight:600,color:"var(--text-2)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:90}}>{item.name}</span>
                            </div>
                            <span style={{fontSize:12,fontWeight:800,color:col,flexShrink:0}}>{item.val}</span>
                          </div>
                          <div style={{height:4,background:"var(--surface-3)",borderRadius:99,overflow:"hidden"}}>
                            <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${col},${col}bb)`,borderRadius:99}}/>
                          </div>
                        </div>
                      );
                    })
                }
              </Card>
            );
          })}
        </div>

        {/* Row 6: Top & Bottom Performers (admin only) */}
        {isAdmin && (()=>{
          const allMbrs = allUsers.filter(u=>u.team);
          const perfData = allMbrs.map(m=>{
            const mLogs = logs.filter(l=>l.userId===m.id);
            const tasks      = [...new Set(mLogs.map(l=>l.actId))].length;
            const hrs        = Math.round(mLogs.reduce((s,l)=>s+l.mins,0)/60);
            const changes    = mLogs.filter(l=>l.workNature==="Change").length;
            const incidents  = mLogs.filter(l=>l.type==="Incident"||l.workNature==="Incident").length;
            const srs        = mLogs.filter(l=>l.workNature==="Service Request").length;
            const miLogs     = mLogs.filter(l=>{ const a=acts.find(x=>x.id===l.actId); return a&&a.isMajorIncident; });
            const mis        = miLogs.length;
            const score      = tasks*3 + hrs*0.5 + changes*1.5 + incidents*2 + mis*3;
            return { ...m, tasks, hrs, changes, incidents, srs, mis, score };
          }).sort((a,b)=>b.score-a.score);
          const top5    = perfData.slice(0,5);
          const bottom5 = [...perfData].filter(m=>m.tasks>0).sort((a,b)=>a.score-b.score).slice(0,5);
          const PerfRow = ({m,rank,isTop}) => {
            const col = isTop?"#059669":"#ea580c";
            const bg  = isTop?"#f0fdf4":"#fff7ed";
            const medals=["🥇","🥈","🥉","④","⑤"];
            return (
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:"var(--radius-md)",background:bg,marginBottom:6,border:`1px solid ${col}20`}}>
                <span style={{fontSize:16,flexShrink:0}}>{isTop?medals[rank]:"⚠️"}</span>
                <div style={{width:30,height:30,borderRadius:"50%",background:`${tCol(m.team)}22`,color:tCol(m.team),display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,flexShrink:0}}>{m.name.split(" ").map(n=>n[0]).join("")}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:700,color:"var(--text-1)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.name}</div>
                  <div style={{fontSize:10,color:"var(--text-3)"}}>{m.team} · {m.title}</div>
                </div>
                <div style={{display:"flex",gap:14,flexShrink:0}}>
                  {[["Tasks",m.tasks,"var(--brand)"],["Hrs",m.hrs,"#7c3aed"],["Changes",m.changes,"#d97706"],["Incidents",m.incidents,"#dc2626"]].map(([l,v,c])=>(
                    <div key={l} style={{textAlign:"center"}}>
                      <div style={{fontSize:14,fontWeight:800,color:c,lineHeight:1}}>{v}</div>
                      <div style={{fontSize:8,color:"var(--text-4)",textTransform:"uppercase",letterSpacing:.5}}>{l}</div>
                    </div>
                  ))}
                  <div style={{textAlign:"center",minWidth:40}}>
                    <div style={{fontSize:14,fontWeight:800,color:col,lineHeight:1}}>{Math.round(m.score)}</div>
                    <div style={{fontSize:8,color:"var(--text-4)",textTransform:"uppercase",letterSpacing:.5}}>Score</div>
                  </div>
                </div>
              </div>
            );
          };
          return (
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
              <Card>
                <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",marginBottom:2}}>🏆 Top Performers</div>
                <div style={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)",marginBottom:14}}>Scored by tasks, hours, changes & incidents</div>
                {top5.map((m,i)=><PerfRow key={m.id} m={m} rank={i} isTop={true}/>)}
              </Card>
              <Card>
                <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",marginBottom:2}}>📉 Needs Attention</div>
                <div style={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)",marginBottom:14}}>Lowest activity across all metrics</div>
                {bottom5.length===0
                  ? <div style={{textAlign:"center",padding:30,color:"var(--text-4)",fontSize:12}}>All members are active 🎉</div>
                  : bottom5.map((m,i)=><PerfRow key={m.id} m={m} rank={i} isTop={false}/>)
                }
              </Card>
            </div>
          );
        })()}
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div>
              <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",fontFamily:"var(--font-sans)",letterSpacing:-.3}}>{isAdmin?"All Teams":"My Team"} Capacity</div>
              <div style={{fontSize:11,color:"var(--text-3)"}}>Available vs utilized · March 2025</div>
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
                    <tr key={c.team} className="trow-hover">
                      <TD><div style={{display:"flex",alignItems:"center",gap:5}}><span style={{width:8,height:8,borderRadius:"50%",background:tCol(c.team),display:"inline-block",flexShrink:0}}/><strong style={{fontSize:12}}>{tm?.emoji} {c.team}</strong></div></TD>
                      <TD s={{fontSize:11,color:"var(--text-3)"}}>{tm?.lead}</TD>
                      <TD s={{textAlign:"center"}}>{c.hc}</TD>
                      <TD s={{fontWeight:600}}>{fmtM(net)}</TD>
                      <TD s={{color:"var(--brand)",fontWeight:700}}>{fmtM(c.utilMins)}</TD>
                      <TD>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <div style={{width:50,height:5,background:"var(--surface-3)",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.min(100,pct)}%`,background:uCol(pct),borderRadius:3}}/></div>
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
      {/* ── Header ── */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
        <div>
          <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px"}}>Activities</div>
          <div style={{fontSize:12.5,color:"var(--text-3)",marginTop:4,lineHeight:1.6}}>
            {isAdmin?"Manage all team activities across the organisation.":isMgr?`Manage activities for ${user.team} — members see only active activities.`:"Your team's activities."}
          </div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          {isMgrOrAdmin && (
            <button
              onClick={dlTemplate}
              style={{display:"flex",alignItems:"center",gap:5,padding:"8px 14px",borderRadius:"var(--radius-md)",background:"var(--surface)",border:"1px solid var(--border)",color:"var(--text-2)",fontWeight:600,fontSize:12,cursor:"pointer"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--brand)";e.currentTarget.style.color="var(--brand)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--text-2)";}}>
              ⬇ Template
            </button>
          )}
          {isMgrOrAdmin && (
            <button
              onClick={()=>setShowImport(true)}
              style={{display:"flex",alignItems:"center",gap:5,padding:"8px 14px",borderRadius:"var(--radius-md)",background:"var(--surface)",border:"1px solid var(--border)",color:"var(--text-2)",fontWeight:600,fontSize:12,cursor:"pointer"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--brand)";e.currentTarget.style.color="var(--brand)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--text-2)";}}>
              📥 Import Excel/CSV
            </button>
          )}
          {isMgrOrAdmin && <Btn onClick={()=>{setAForm({...bAct,team:isAdmin?"":user.team});setTarget(null);setModal("act");}}>+ New Activity</Btn>}
        </div>
      </div>

      {isAdmin && <InfoBanner color="#1e40af" bg="var(--brand-light)" border="#bfdbfe" icon="📋">Admin can manage activities across all teams. Use the <strong>Team</strong> filter or set the team when creating a new activity.</InfoBanner>}
      {isMgr && <InfoBanner color="#1e40af" bg="var(--brand-light)" border="#bfdbfe" icon="📋">You own the activity list for <strong>{user.team}</strong>. Use <strong>Import Excel/CSV</strong> to bulk-add, or <strong>+ New Activity</strong> for one at a time.</InfoBanner>}

      {/* ── Filters ── */}
      <div style={{display:"flex",gap:9,flexWrap:"wrap",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--radius-md)",padding:"11px 14px",marginBottom:14}}>
        {isAdmin && (
          <select value={actF.team} onChange={e=>setActF(f=>({...f,team:e.target.value}))} style={{padding:"6px 10px",borderRadius:7,border:"1px solid var(--border-2)",fontSize:12,background:"var(--surface-2)"}}>
            <option value="">All Teams</option>
            {teams.map(t=><option key={t.name}>{t.name}</option>)}
          </select>
        )}
        {[["type",["","Project","Incident","Change","BAU","Training","Meeting"],"All Types"],
          ["status",["","Active","Pending","Done"],"All Status"]
        ].map(([k,opts,ph])=>(
          <select key={k} value={actF[k]} onChange={e=>setActF(f=>({...f,[k]:e.target.value}))} style={{padding:"6px 10px",borderRadius:7,border:"1px solid var(--border-2)",fontSize:12,background:"var(--surface-2)"}}>
            {opts.map(o=><option key={o} value={o}>{o||ph}</option>)}
          </select>
        ))}
        <input placeholder="🔍 Search activity or ticket…" value={actF.search} onChange={e=>setActF(f=>({...f,search:e.target.value}))} style={{flex:1,minWidth:150,padding:"6px 10px",borderRadius:7,border:"1px solid var(--border-2)",fontSize:12}}/>
        <span style={{fontSize:12,color:"var(--text-4)",alignSelf:"center"}}>{filtActs.length} result{filtActs.length!==1?"s":""}</span>
      </div>

      {/* ── Activities Table ── */}
      <Card style={{padding:0,overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"var(--font-sans)"}}>
            <thead>
              <tr>
                <TH c="ID"/><TH c="Task Name"/><TH c="Team"/>
                <TH c="Category"/><TH c="Task Type"/>
                <TH c="Task Size"/><TH c="Complexity"/><TH c="Level"/>
                <TH c="Logged"/><TH c="Status"/>
                {isMgrOrAdmin && <TH c="Actions"/>}
              </tr>
            </thead>
            <tbody>
              {filtActs.map(a=>{
                const logged=minsForAct(a.id);
                return (
                  <tr key={a.id} className="trow-hover">
                    <TD><code style={{background:"var(--surface-3)",padding:"2px 6px",borderRadius:4,color:"var(--text-3)",fontSize:11,fontFamily:"var(--font-mono)"}}>{a.id}</code></TD>
                    <TD>
                      <div style={{fontWeight:600,color:"var(--text-1)"}}>{a.name}</div>
                      {a.desc && <div style={{fontSize:10,color:"var(--text-4)",marginTop:2}}>{a.desc}</div>}
                    </TD>
                    <TD><TPill t={a.team}/></TD>
                    <TD s={{fontSize:11,color:"var(--text-3)",maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.cat||"—"}</TD>
                    <TD><span style={{fontSize:11,background:"var(--brand-light)",color:"var(--brand)",padding:"2px 8px",borderRadius:4,fontWeight:600}}>{a.type||"BAU"}</span></TD>
                    <TD>
                      {a.taskSize
                        ? <span style={{fontSize:11,background:"var(--surface-3)",color:"var(--text-2)",padding:"2px 8px",borderRadius:4,fontWeight:600}}>{a.taskSize}</span>
                        : <span style={{color:"var(--text-4)",fontSize:11}}>—</span>}
                    </TD>
                    <TD>
                      {a.complexity
                        ? <span style={{fontSize:11,fontWeight:600,color:/high/i.test(a.complexity)?"#be123c":/med/i.test(a.complexity)?"#b45309":"#065f46"}}>{a.complexity}</span>
                        : <span style={{color:"var(--text-4)",fontSize:11}}>—</span>}
                    </TD>
                    <TD>
                      {a.level
                        ? <span style={{fontSize:11,background:"#f5f3ff",color:"#5b21b6",padding:"2px 8px",borderRadius:4,fontWeight:700}}>{a.level}</span>
                        : <span style={{color:"var(--text-4)",fontSize:11}}>—</span>}
                    </TD>
                    <TD s={{color:"var(--brand)",fontWeight:700,fontFamily:"var(--font-mono)"}}>{logged?fmtM(logged):"—"}</TD>
                    <TD><SPill s={a.status}/></TD>
                    {isMgrOrAdmin && <TD><div style={{display:"flex",gap:5}}><Btn sm v="sec" onClick={()=>openEditA(a)}>✏️</Btn><Btn sm v="dan" onClick={()=>delAct(a.id)}>🗑</Btn></div></TD>}
                  </tr>
                );
              })}
              {filtActs.length===0 && (
                <tr><td colSpan={isMgrOrAdmin?11:10} style={{textAlign:"center",padding:50,color:"var(--text-4)",fontSize:13}}>
                  {isMgrOrAdmin?"No activities yet. Click + New Activity or Import Excel/CSV.":"No activities found."}
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ══ ACTIVITY IMPORT MODAL ══ */}
      {showImport && (
        <div className="modal-backdrop" onClick={e=>e.target===e.currentTarget&&resetImport()}
          style={{position:"fixed",inset:0,background:"rgba(15,23,42,.6)",backdropFilter:"blur(8px)",zIndex:600,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"32px 24px",overflowY:"auto"}}>
          <div className="modal-content" style={{background:"var(--surface)",borderRadius:"var(--radius-xl)",width:"100%",maxWidth:860,boxShadow:"var(--shadow-xl)",overflow:"hidden",marginBottom:32}}>
            <div style={{background:"var(--sidebar-bg)",padding:"20px 28px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:17,fontWeight:800,color:"#fff",letterSpacing:"-.3px"}}>📥 Import Activities from Excel / CSV</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginTop:3}}>Bulk-add activities to <strong style={{color:"#60a5fa"}}>{user.team}</strong> team</div>
              </div>
              <button onClick={resetImport} style={{background:"rgba(255,255,255,.1)",border:"none",color:"rgba(255,255,255,.7)",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
            </div>

            <div style={{padding:"24px 28px"}}>
              {/* UPLOAD STEP */}
              {importStep==="upload" && (
                <div>
                  <div
                    onDragOver={e=>{e.preventDefault();setDragOver2(true);}}
                    onDragLeave={()=>setDragOver2(false)}
                    onDrop={e=>{e.preventDefault();setDragOver2(false);const f=e.dataTransfer.files[0];if(f)parseFile(f);}}
                    onClick={()=>fileRef2.current.click()}
                    style={{border:`2px dashed ${dragOver2?"var(--brand)":"var(--border-2)"}`,borderRadius:"var(--radius-lg)",padding:"40px 24px",textAlign:"center",cursor:"pointer",background:dragOver2?"var(--brand-light)":"var(--surface-2)",transition:"all .2s",marginBottom:20}}>
                    <div style={{fontSize:36,marginBottom:10}}>📂</div>
                    <div style={{fontSize:15,fontWeight:700,color:"var(--text-1)",marginBottom:6}}>Drop your Activity List (CSV or Excel-exported CSV)</div>
                    <div style={{fontSize:12,color:"var(--text-3)",marginBottom:14}}>
                      In Excel: <strong>File → Save As → CSV (Comma delimited)</strong> · Tab-separated also works<br/>
                      <span style={{color:"var(--text-4)"}}>Expected columns: Category · Task Type · Task Name · Task Size · Complexity · Level</span>
                    </div>
                    <button style={{padding:"8px 22px",borderRadius:"var(--radius-md)",background:"var(--brand)",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>Browse File</button>
                    <input ref={fileRef2} type="file" accept=".csv,.tsv,.txt" style={{display:"none"}} onChange={e=>parseFile(e.target.files[0])}/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                    <div style={{background:"var(--surface-2)",border:"1px solid var(--border)",borderRadius:"var(--radius-md)",padding:"16px 18px"}}>
                      <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",marginBottom:10}}>📋 Supported Columns</div>
                      {ACT_FIELDS.map(f=>(
                        <div key={f.key} style={{display:"flex",gap:8,marginBottom:5,alignItems:"baseline"}}>
                          <span style={{width:6,height:6,borderRadius:"50%",flexShrink:0,marginTop:4,background:f.required?"var(--brand)":"var(--border-2)",display:"inline-block"}}/>
                          <span style={{fontSize:12,fontWeight:600,color:f.required?"var(--text-1)":"var(--text-3)",minWidth:108}}>{f.label}{f.required&&<span style={{color:"#dc2626"}}> *</span>}</span>
                          <span style={{fontSize:11,color:"var(--text-4)"}}>{f.hint}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{background:"var(--surface-2)",border:"1px solid var(--border)",borderRadius:"var(--radius-md)",padding:"16px 18px"}}>
                      <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",marginBottom:10}}>💡 About This Upload</div>
                      {[
                        ["What it is","A list of task/activity types your team handles — the catalogue your team logs time against."],
                        ["Task Type","BAU · Project · Incident · Change · Training (auto-detected)"],
                        ["Task Size","Small · Medium · Large · XL — your team's size classification"],
                        ["Complexity","Low · Medium · High — effort complexity level"],
                        ["Level","e.g. L1 · L2 · L3 or Junior · Mid · Senior"],
                      ].map(([t,d])=>(
                        <div key={t} style={{marginBottom:8}}>
                          <div style={{fontSize:11,fontWeight:700,color:"var(--text-2)"}}>{t}</div>
                          <div style={{fontSize:11,color:"var(--text-3)",lineHeight:1.5}}>{d}</div>
                        </div>
                      ))}
                      {isAdmin ? (
                        <div style={{marginTop:10}}>
                          <div style={{fontSize:11,fontWeight:700,color:"var(--text-2)",marginBottom:5}}>Target Team *</div>
                          <select value={importTeam} onChange={e=>setImportTeam(e.target.value)}
                            style={{width:"100%",padding:"7px 10px",borderRadius:"var(--radius-sm)",border:`1.5px solid ${importTeam?"var(--brand)":"#fca5a5"}`,fontSize:12,background:"var(--surface)",fontWeight:600}}>
                            <option value="">— Select team to import into —</option>
                            {teams.map(t=><option key={t.name} value={t.name}>{t.name}</option>)}
                          </select>
                          {!importTeam && <div style={{fontSize:10,color:"#dc2626",marginTop:3}}>Required — choose which team's activity list to upload</div>}
                        </div>
                      ) : (
                        <div style={{marginTop:6,fontSize:11,background:"var(--brand-light)",color:"var(--brand)",padding:"6px 10px",borderRadius:"var(--radius-sm)",fontWeight:600}}>
                          📁 Activities will be added to: {user.team}
                        </div>
                      )}
                      <button onClick={dlTemplate} style={{marginTop:10,width:"100%",padding:"9px",borderRadius:"var(--radius-md)",background:"var(--surface)",border:"1.5px solid var(--brand)",color:"var(--brand)",fontWeight:700,fontSize:12,cursor:"pointer"}}>⬇ Download Template</button>
                    </div>
                  </div>
                </div>
              )}

              {/* MAPPING STEP */}
              {(importStep==="mapping"||importStep==="importing") && (
                <div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:14,color:"var(--text-1)"}}>Map Columns — <span style={{color:"var(--text-3)",fontWeight:500}}>{importFile}</span></div>
                      <div style={{fontSize:12,color:"var(--text-3)",marginTop:2}}>{importRows.length} rows · {importCols.length} columns · Review auto-mapping</div>
                    </div>
                    <button onClick={()=>setImportStep("upload")} style={{padding:"6px 14px",borderRadius:"var(--radius-sm)",background:"var(--surface)",border:"1px solid var(--border)",color:"var(--text-2)",fontSize:12,fontWeight:600,cursor:"pointer"}}>← Change File</button>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10,marginBottom:20}}>
                    {ACT_FIELDS.map(f=>{
                      const mapped=!!importMap[f.key];
                      return (
                        <div key={f.key} style={{background:mapped?"#f0fdf4":"var(--surface-2)",border:`1px solid ${mapped?"#86efac":"var(--border)"}`,borderRadius:"var(--radius-sm)",padding:"10px 12px"}}>
                          <div style={{fontSize:11,fontWeight:700,color:mapped?"#166534":"var(--text-3)",marginBottom:5}}>{f.label}{f.required&&<span style={{color:"#dc2626"}}> *</span>}{mapped&&<span style={{fontWeight:400,color:"#4ade80",marginLeft:6}}>✓</span>}</div>
                          <select value={importMap[f.key]||""} onChange={e=>{ const nm={...importMap,[f.key]:e.target.value||undefined}; setImportMap(nm); if(importRows.length) setImportPrev(buildPrev(importRows,nm)); }}
                            style={{width:"100%",padding:"5px 8px",borderRadius:6,border:"1px solid var(--border-2)",fontSize:12,background:"var(--surface)"}}>
                            <option value="">— not mapped —</option>
                            {importCols.map(c=><option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      );
                    })}
                  </div>
                  {importPrev.length>0 && (
                    <div style={{marginBottom:18,border:"1px solid var(--border)",borderRadius:"var(--radius-md)",overflow:"hidden"}}>
                      <div style={{padding:"10px 16px",background:"var(--surface-2)",borderBottom:"1px solid var(--border)",fontSize:12,fontWeight:700,color:"var(--text-1)"}}>
                        Preview — first {importPrev.length} of {importRows.length} rows
                      </div>
                      <div style={{overflowX:"auto"}}>
                        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                          <thead>
                            <tr>{["#","Category","Task Type","Task Name","Task Size","Complexity","Level"].map(h=><TH key={h} c={h}/>)}</tr>
                          </thead>
                          <tbody>
                            {importPrev.map((r,i)=>(
                              <tr key={i} className="trow-hover" style={{borderBottom:"1px solid var(--surface-3)"}}>
                                <TD s={{color:"var(--text-4)",fontSize:11,fontFamily:"var(--font-mono)"}}>{r._row}</TD>
                                <TD s={{fontSize:12,color:"var(--text-2)"}}>{r.cat||<span style={{color:"var(--text-4)"}}>—</span>}</TD>
                                <TD><span style={{fontSize:11,background:"var(--brand-light)",color:"var(--brand)",padding:"2px 7px",borderRadius:4,fontWeight:600}}>{r.type||"BAU"}</span></TD>
                                <TD>
                                  {r.name
                                    ? <span style={{fontWeight:600,color:"var(--text-1)"}}>{r.name}</span>
                                    : <span style={{color:"#dc2626",fontSize:11}}>⚠ empty — will skip</span>
                                  }
                                </TD>
                                <TD s={{fontSize:11,color:"var(--text-3)"}}>{r.taskSize||<span style={{color:"var(--text-4)"}}>—</span>}</TD>
                                <TD s={{fontSize:11,color:"var(--text-3)"}}>{r.complexity||<span style={{color:"var(--text-4)"}}>—</span>}</TD>
                                <TD s={{fontSize:11,color:"var(--text-2)",fontWeight:600}}>{r.level||<span style={{color:"var(--text-4)",fontWeight:400}}>—</span>}</TD>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{fontSize:12,color:"#d97706"}}>
                      {importRows.filter(r=>!r[importMap.name]?.trim()).length>0 && `⚠ ${importRows.filter(r=>!r[importMap.name]?.trim()).length} rows with empty names will be skipped`}
                    </div>
                    <button onClick={runActImport} disabled={!importMap.name||importStep==="importing"||(isAdmin&&!importTeam)}
                      style={{padding:"10px 28px",borderRadius:"var(--radius-md)",background:importMap.name?"linear-gradient(135deg,#2563eb,#1d4ed8)":"var(--surface-3)",color:importMap.name?"#fff":"var(--text-4)",border:"none",fontWeight:800,fontSize:14,cursor:importMap.name?"pointer":"not-allowed",boxShadow:importMap.name?"0 3px 12px rgba(37,99,235,.35)":"none"}}>
                      {importStep==="importing"?"⏳ Importing…":`🚀 Import ${importRows.length} Activities → ${user.team}`}
                    </button>
                  </div>
                </div>
              )}

              {/* DONE STEP */}
              {importStep==="done" && importResult && (
                <div style={{textAlign:"center",padding:"16px 0"}}>
                  <div style={{fontSize:48,marginBottom:12}}>🎉</div>
                  <div style={{fontSize:20,fontWeight:800,color:"#16a34a",marginBottom:6}}>Import Complete!</div>
                  <div style={{fontSize:13,color:"var(--text-3)",marginBottom:24}}>Activities added to <strong>{isAdmin?(importTeam||user.team):user.team}</strong> team</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,maxWidth:360,margin:"0 auto 24px"}}>
                    {[
                      {label:"Total Rows",  val:importResult.total,   c:"var(--brand)",  bg:"var(--brand-light)"},
                      {label:"Imported",    val:importResult.created,  c:"#16a34a",       bg:"#f0fdf4"},
                      {label:"Skipped",     val:importResult.skipped,  c:"var(--text-3)", bg:"var(--surface-2)"},
                    ].map(s=>(
                      <div key={s.label} style={{background:s.bg,borderRadius:"var(--radius-md)",padding:"14px"}}>
                        <div style={{fontSize:28,fontWeight:800,color:s.c}}>{s.val}</div>
                        <div style={{fontSize:11,color:"var(--text-3)",marginTop:3}}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:10,justifyContent:"center"}}>
                    <button onClick={resetImport} style={{padding:"9px 22px",borderRadius:"var(--radius-md)",background:"var(--surface)",border:"1px solid var(--border)",color:"var(--text-2)",fontWeight:700,fontSize:13,cursor:"pointer"}}>Import More</button>
                    <button onClick={resetImport} style={{padding:"9px 22px",borderRadius:"var(--radius-md)",background:"linear-gradient(135deg,#2563eb,#1d4ed8)",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>✓ Done</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
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
            <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px"}}>{isAdmin?"All Teams Time Log":isMgr?"Team Time Log":"My Time Log"}</div>
            <div style={{fontSize:12,color:"var(--text-3)",marginTop:2}}>{isAdmin?"All teams · all entries":isMgr?"Your team entries":"Your personal entries"} · March 2025</div>
          </div>
          <div style={{display:"flex",gap:9,alignItems:"center"}}>
            {selectedMember && (
              <div style={{display:"flex",alignItems:"center",gap:7,background:`${tCol(selectedMember.team)}15`,border:`1px solid ${tCol(selectedMember.team)}40`,borderRadius:"var(--radius-md)",padding:"7px 12px"}}>
                <span style={{fontSize:12,fontWeight:700,color:tCol(selectedMember.team)}}>👤 {selectedMember.name}</span>
                <button onClick={()=>setMemberFilter(null)} style={{background:"none",border:"none",cursor:"pointer",fontSize:14,color:"var(--text-4)",lineHeight:1,padding:0}}>✕</button>
              </div>
            )}
            <div style={{background:"var(--brand-light)",border:"1px solid #bfdbfe",borderRadius:"var(--radius-md)",padding:"8px 14px",fontSize:13,fontWeight:700,color:"var(--brand)"}}>{fmtM(total)} total · {viewLogs.length} entries</div>
            {!isAdmin && <Btn onClick={()=>{setLForm(bLog);setModal("log");}}>⏱ Log Time</Btn>}
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
                  border: isActive ? `2px solid ${col}` : "1px solid var(--border)",
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
                    <div style={{fontSize:9,color:"var(--text-4)"}}>{m.team}</div>
                  </div>
                </div>
                <div style={{fontSize:20,fontWeight:800,color:isActive?col:"var(--brand)"}}>{fmtM(mM)}</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
                  <div style={{fontSize:10,color:"var(--text-4)"}}>{cnt} {cnt===1?"entry":"entries"}</div>
                  {isActive && <span style={{fontSize:9,background:col,color:"#fff",padding:"1px 6px",borderRadius:"var(--radius-md)",fontWeight:700}}>Filtered</span>}
                </div>
                {mM>0 && (
                  <div style={{marginTop:6,height:3,background:"var(--surface-3)",borderRadius:2,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${Math.min(100,Math.round(mM/Math.max(...memberList.map(x=>filtLogs.filter(l=>l.userId===x.id).reduce((s,l)=>s+l.mins,0)),1)*100))}%`,background:col,borderRadius:2}}/>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Search + filters bar */}
        <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--radius-md)",padding:"10px 14px",marginBottom:14,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
          <input placeholder="🔍 Search by member or activity…" value={logQ} onChange={e=>setLogQ(e.target.value)}
            style={{flex:1,minWidth:180,padding:"6px 10px",borderRadius:7,border:"1px solid var(--border-2)",fontSize:12}}/>
          {memberFilter && (
            <button onClick={()=>setMemberFilter(null)}
              style={{padding:"6px 12px",borderRadius:7,background:"#fee2e2",border:"1px solid #fca5a5",color:"#b91c1c",fontSize:12,fontWeight:600,cursor:"pointer"}}>
              ✕ Clear member filter
            </button>
          )}
          <span style={{fontSize:12,color:"var(--text-4)"}}>{viewLogs.length} row{viewLogs.length!==1?"s":""}</span>
        </div>

        <Card style={{padding:0,overflow:"hidden"}}>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"var(--font-sans)"}}>
              <thead>
                <tr>
                  <TH c="Date"/><TH c="Member"/><TH c="Activity"/>
                  <TH c="Nature"/><TH c="Work Category"/><TH c="Work Type"/>
                  <TH c="Ticket"/><TH c="Category"/><TH c="Time Spent"/><TH c="Notes"/>
                  {isMgrOrAdmin && <TH c="Actions"/>}
                </tr>
              </thead>
              <tbody>
                {viewLogs.map(l=>{
                  const isHighlighted = memberFilter && l.userId===memberFilter;
                  return (
                    <tr key={l.id} className="trow-hover" style={{background:isHighlighted?`${tCol(l.team)}06`:""}}>
                      <TD s={{fontSize:12,fontFamily:"var(--font-mono)",color:"var(--text-3)"}}>{l.date}</TD>
                      <TD>
                        <div style={{display:"flex",alignItems:"center",gap:7}}>
                          <div style={{width:24,height:24,borderRadius:"var(--radius-sm)",background:`${tCol(l.team)}22`,color:tCol(l.team),display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,flexShrink:0,cursor:"pointer"}}
                            onClick={()=>setMemberFilter(memberFilter===l.userId?null:l.userId)}>
                            {l.member.split(" ").map(n=>n[0]).join("")}
                          </div>
                          <div>
                            <div style={{fontWeight:700,fontSize:12,color:"var(--text-1)"}}>{l.member}</div>
                            <div style={{fontSize:10,color:"var(--text-4)"}}><TPill t={l.team}/></div>
                          </div>
                        </div>
                      </TD>
                      <TD>
                        <div style={{fontWeight:600,fontSize:12,color:"var(--text-1)"}}>{l.activity}</div>
                        <div style={{fontSize:10,color:"var(--text-4)",marginTop:1}}>{l.type}</div>
                      </TD>
                      <TD><NaturePill n={l.nature||"Proactive"}/></TD>
                      <TD>
                        {l.workType
                          ? <span className="badge" style={{background:l.workType==="Project"?"#eff6ff":"#f0fdf4",color:l.workType==="Project"?"#1d4ed8":"#065f46"}}>{l.workType}</span>
                          : <span style={{color:"var(--text-4)",fontSize:11}}>—</span>
                        }
                      </TD>
                      <TD><WNPill w={l.workNature||l.type||"—"}/></TD>
                      <TD>
                        {l.ticketRef
                          ? <code style={{background:"var(--surface-3)",padding:"2px 7px",borderRadius:4,fontSize:11,fontWeight:700,color:"var(--text-2)",fontFamily:"var(--font-mono)"}}>{l.ticketRef}</code>
                          : <span style={{color:"var(--text-4)",fontSize:11}}>—</span>
                        }
                      </TD>
                      <TD s={{fontSize:11,color:"var(--text-3)"}}>{l.cat||"—"}</TD>
                      <TD>
                        <div style={{fontWeight:700,color:"var(--brand)",fontSize:13,fontFamily:"var(--font-mono)"}}>{fmtM(l.mins)}</div>
                        <div style={{fontSize:9,color:"var(--text-4)",fontFamily:"var(--font-mono)"}}>{l.mins} min</div>
                      </TD>
                      <TD s={{fontSize:11,color:"var(--text-3)",maxWidth:160}}>{l.notes||"—"}</TD>
                      {isMgrOrAdmin && <TD><div style={{display:"flex",gap:5}}><Btn sm v="sec" onClick={()=>openEditL(l)}>✏️</Btn><Btn sm v="dan" onClick={()=>delLog(l.id)}>🗑</Btn></div></TD>}
                    </tr>
                  );
                })}
                {viewLogs.length===0&&<tr><td colSpan={isMgrOrAdmin?11:10} style={{textAlign:"center",padding:40,color:"var(--text-4)",fontSize:13}}>
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
    const [tForm,    setTForm]    = React.useState({name:"",emoji:"🏗",color:"#06b6d4",lead:""});
    const [tConfirm, setTConfirm] = React.useState(null);
    const EMOJIS = ["🌐","🔒","⚙️","☁️","💾","🗄️","🏗","🚀","🔧","📡","🖥","🔐","📊","💿","🌩","🛡"];
    const COLORS = ["#06b6d4","#dc2626","#d97706","#7c3aed","#059669","#ea580c","var(--brand)","#db2777","#16a34a","#9333ea","#0f172a","#64748b"];
    const iS2 = {width:"100%",padding:"8px 10px",borderRadius:"var(--radius-sm)",border:"1px solid var(--border-2)",fontSize:13,boxSizing:"border-box"};
    const openAdd  = () => { setTForm({name:"",emoji:"🏗",color:"#06b6d4",lead:""}); setTTarget(null); setTModal("edit"); };
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
            <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px"}}>{isAdmin?"All Teams":isMgr?"Team Management":"Team View"}</div>
            <div style={{fontSize:12,color:"var(--text-3)",marginTop:3}}>{isAdmin?`${teams.length} infrastructure teams — click ✏️ to edit`:"Your team"}</div>
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
                    <button onClick={()=>openEdit(t)} style={{width:27,height:27,borderRadius:7,background:"var(--surface-3)",border:"1px solid var(--border)",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}} title="Edit team">✏️</button>
                    <button onClick={()=>setTConfirm(t.name)} style={{width:27,height:27,borderRadius:7,background:"#fef2f2",border:"1px solid #fecaca",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}} title="Delete team">🗑</button>
                  </div>
                )}
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,marginTop:isAdmin?6:0,cursor:"pointer"}} onClick={()=>goPage("bandwidth")}>
                  <span style={{fontSize:26}}>{t.emoji}</span>
                  <div>
                    <div style={{fontSize:15,fontWeight:800}}>{t.name}</div>
                    <div style={{fontSize:11,color:"var(--text-3)"}}>Lead: {t.lead||"—"}</div>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
                  {[["Members",tmems.length],["Activities",tacts.length],["Util",`${pct}%`]].map(([l,v])=>(
                    <div key={l} onClick={()=>goPage(l==="Members"?"members":l==="Activities"?"activities":"bandwidth")}
                      style={{textAlign:"center",background:"var(--surface-2)",borderRadius:7,padding:"7px 4px",cursor:"pointer",transition:"background .1s"}}
                      onMouseEnter={e=>e.currentTarget.style.background="var(--brand-light)"}
                      onMouseLeave={e=>e.currentTarget.style.background="var(--surface-2)"}>
                      <div style={{fontSize:17,fontWeight:800,color:l==="Util"?uCol(pct):"var(--text-1)"}}>{v}</div>
                      <div style={{fontSize:9,color:"var(--text-4)",marginTop:1,fontFamily:"var(--font-mono)"}}>{l}</div>
                    </div>
                  ))}
                </div>
                <Bar pct={pct} color={t.color}/>
                <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
                  {tmems.slice(0,6).map(m=>(
                    <div key={m.id} style={{width:24,height:24,borderRadius:"var(--radius-sm)",background:`${t.color}18`,color:t.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800}} title={m.name}>
                      {m.name.split(" ").map(n=>n[0]).join("")}
                    </div>
                  ))}
                  {tmems.length>6 && <div style={{width:24,height:24,borderRadius:"50%",background:"var(--surface-3)",color:"var(--text-4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700}}>+{tmems.length-6}</div>}
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
                    <button key={e} onClick={()=>setTForm(p=>({...p,emoji:e}))} style={{width:34,height:34,borderRadius:7,border:`2px solid ${tForm.emoji===e?"var(--brand)":"var(--border)"}`,background:tForm.emoji===e?"var(--brand-light)":"var(--surface)",fontSize:16,cursor:"pointer"}}>{e}</button>
                  ))}
                </div>
              </Lbl>
              <Lbl t="Team Colour">
                <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center",marginTop:4}}>
                  {COLORS.map(c=>(
                    <button key={c} onClick={()=>setTForm(p=>({...p,color:c}))} style={{width:30,height:30,borderRadius:"50%",background:c,border:`3px solid ${tForm.color===c?"var(--text-1)":"transparent"}`,cursor:"pointer"}}/>
                  ))}
                  <input type="color" value={tForm.color} onChange={e=>setTForm(p=>({...p,color:e.target.value}))} style={{width:30,height:30,borderRadius:"50%",border:"1px solid var(--border-2)",cursor:"pointer",padding:1}}/>
                </div>
              </Lbl>
              <div style={{padding:"10px 14px",borderRadius:"var(--radius-md)",background:"var(--surface-2)",border:"1px solid #e5e7eb",display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:22}}>{tForm.emoji}</span>
                <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13}}>{tForm.name||"Team Name"}</div><div style={{fontSize:11,color:"var(--text-3)"}}>Lead: {tForm.lead||"—"}</div></div>
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
                <div style={{fontSize:14,fontWeight:700,color:"var(--text-1)",marginBottom:8}}>Delete "{tConfirm}" team?</div>
                {(hm>0||ha>0) && <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:"var(--radius-sm)",padding:"10px 14px",marginBottom:10,fontSize:12,color:"#92400e",textAlign:"left"}}>⚠️ This team has <strong>{hm} member{hm!==1?"s":""}</strong> and <strong>{ha} activit{ha!==1?"ies":"y"}</strong> — those records will be unlinked.</div>}
                <div style={{fontSize:12,color:"var(--text-3)"}}>This cannot be undone.</div>
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
                <button onClick={()=>setTConfirm(null)} style={{padding:"8px 20px",borderRadius:"var(--radius-sm)",background:"var(--surface)",border:"1px solid var(--border-2)",fontWeight:600,fontSize:13,cursor:"pointer"}}>Cancel</button>
                <button onClick={()=>deleteTeam(tConfirm)} style={{padding:"8px 20px",borderRadius:"var(--radius-sm)",background:"#dc2626",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>Delete Team</button>
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

    const canEdit = isAdmin || isMgr; // admin: all; manager: own team only
    const canEditMember = (m) => isAdmin || (isMgr && m.team === user.team && m.role !== "admin");
    const list = isAdmin
      ? allUsers.filter(u => !mSearch || u.name.toLowerCase().includes(mSearch.toLowerCase()) || (u.team||"").toLowerCase().includes(mSearch.toLowerCase()))
      : isMgr
        ? allUsers.filter(u => u.team === user.team && (!mSearch || u.name.toLowerCase().includes(mSearch.toLowerCase())))
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
        if(user.id===mTarget.id) setUser(p=>({...p,...mForm,name:mForm.name.trim()}));
        showToast(`${mForm.name} updated`);
      } else {
        const nu={id:uid("USR"),name:mForm.name.trim(),title:mForm.title,team:mForm.team||null,role:mForm.role,
          email:`${mForm.name.toLowerCase().replace(/\s+/g,".")}@isms.local`,
          username:mForm.name.toLowerCase().replace(/\s+/g,"."),
          password:"Member@123",status:"Active",lastLogin:null,mustReset:true,costPerHour:55};
        setAllUsers(p=>[...p,nu]);
        showToast(`${nu.name} added — default password: Member@123`);
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
      {label:"Team Managers",   color:"var(--brand)", bg:"#eff6ff", members:list.filter(u=>u.role==="manager")},
      {label:"Team Members",    color:"#059669", bg:"#f0fdf4", members:list.filter(u=>u.role==="member")},
    ];

    const iS2 = {width:"100%",padding:"8px 10px",borderRadius:"var(--radius-sm)",border:"1px solid var(--border-2)",fontSize:13,boxSizing:"border-box"};

    return (
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
          <div>
            <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px"}}>Members</div>
            <div style={{fontSize:12,color:"var(--text-3)",marginTop:3}}>
              {isAdmin?"All users across all teams"
                :isMgr?`${user.team} team · manage your members`
                :"Your team members"}
            </div>
          </div>
          <div style={{display:"flex",gap:9,alignItems:"center"}}>
            <input
              placeholder="🔍 Search members…"
              value={mSearch}
              onChange={e=>setMSearch(e.target.value)}
              style={{padding:"7px 11px",borderRadius:"var(--radius-sm)",border:"1px solid var(--border-2)",fontSize:12,width:200}}
            />
            {canEdit && (
              <Btn onClick={openAdd}>+ Add Member</Btn>
            )}
          </div>
        </div>

        {/* Manager info banner */}
        {isMgr && !isAdmin && (
          <div style={{background:"var(--brand-light)",border:"1px solid #bfdbfe",borderRadius:"var(--radius-md)",padding:"10px 16px",marginBottom:16,fontSize:12.5,color:"#1e40af",display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:16}}>👥</span>
            <span>You can <strong>add</strong> new members to your team, <strong>edit</strong> their details, or <strong>remove</strong> them using the controls on each card.</span>
          </div>
        )}

        {roleGroups.filter(g=>g.members.length>0).map(g=>(
          <div key={g.label} style={{marginBottom:22}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <div style={{height:1,flex:1,background:"var(--surface-3)"}}/>
              <span style={{fontSize:11,fontWeight:700,color:g.color,background:g.bg,padding:"3px 12px",borderRadius:"var(--radius-xl)",letterSpacing:.6,textTransform:"uppercase",whiteSpace:"nowrap"}}>{g.label} ({g.members.length})</span>
              <div style={{height:1,flex:1,background:"var(--surface-3)"}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:13}}>
              {g.members.map(m=>{
                const mM  = logs.filter(l=>l.userId===m.id).reduce((s,l)=>s+l.mins,0);
                const cap = 160*60, pct = Math.round(mM/cap*100);
                const c   = m.team ? tCol(m.team) : g.color;
                const canAct = canEditMember(m);
                return (
                  <Card key={m.id} style={{padding:16,position:"relative",borderTop:`3px solid ${c}`}}>
                    {/* Action buttons — always visible for editable members */}
                    {canAct && (
                      <div style={{position:"absolute",top:12,right:12,display:"flex",gap:6}}>
                        <button
                          onClick={()=>openEdit(m)}
                          style={{padding:"4px 10px",borderRadius:"var(--radius-sm)",background:"var(--surface-2)",border:"1px solid var(--border)",cursor:"pointer",fontSize:11,fontWeight:600,color:"var(--text-2)",display:"flex",alignItems:"center",gap:4,transition:"all .15s"}}
                          onMouseEnter={e=>{e.currentTarget.style.background="var(--brand-light)";e.currentTarget.style.color="var(--brand)";e.currentTarget.style.borderColor="var(--brand)";}}
                          onMouseLeave={e=>{e.currentTarget.style.background="var(--surface-2)";e.currentTarget.style.color="var(--text-2)";e.currentTarget.style.borderColor="var(--border)";}}
                          title="Edit member">
                          ✏️ Edit
                        </button>
                        {m.id !== user.id && (
                          <button
                            onClick={()=>setMConfirm(m.id)}
                            style={{padding:"4px 10px",borderRadius:"var(--radius-sm)",background:"#fef2f2",border:"1px solid #fecaca",cursor:"pointer",fontSize:11,fontWeight:600,color:"#dc2626",display:"flex",alignItems:"center",gap:4,transition:"all .15s"}}
                            onMouseEnter={e=>{e.currentTarget.style.background="#fee2e2";}}
                            onMouseLeave={e=>{e.currentTarget.style.background="#fef2f2";}}
                            title="Remove member">
                            🗑 Remove
                          </button>
                        )}
                      </div>
                    )}

                    {/* Avatar */}
                    <div style={{width:44,height:44,borderRadius:12,background:`linear-gradient(135deg,${c},${c}99)`,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:800,marginBottom:10,marginTop:canAct?30:0}}>
                      {m.name.split(" ").map(n=>n[0]).join("")}
                    </div>

                    <div style={{fontWeight:700,fontSize:13.5,color:"var(--text-1)",marginBottom:2}}>{m.name}</div>
                    <div style={{fontSize:11,color:"var(--text-3)",marginBottom:2}}>{m.title||"—"}</div>
                    <div style={{fontSize:10,color:"var(--text-4)",fontFamily:"var(--font-mono)",marginBottom:8}}>{m.email||m.username}</div>

                    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
                      {m.team && <TPill t={m.team}/>}
                      <span style={{fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:99,
                        background:m.status==="Active"?"#d1fae5":"#fee2e2",
                        color:m.status==="Active"?"#065f46":"#991b1b"}}>
                        ● {m.status||"Active"}
                      </span>
                      {m.mustReset && (
                        <span style={{fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:99,background:"#fff7ed",color:"#c2410c"}}>
                          ⚠️ Must reset pw
                        </span>
                      )}
                    </div>

                    {m.role !== "admin" && (
                      <>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                          {[["Logged",fmtM(mM)],["Util",`${pct}%`]].map(([l,v])=>(
                            <div key={l} style={{textAlign:"center",background:"var(--surface-2)",borderRadius:7,padding:"7px 4px"}}>
                              <div style={{fontSize:15,fontWeight:800,color:l==="Util"?uCol(pct):"var(--text-1)"}}>{v}</div>
                              <div style={{fontSize:9,color:"var(--text-4)",marginTop:1,fontFamily:"var(--font-mono)"}}>{l}</div>
                            </div>
                          ))}
                        </div>
                        <Bar pct={pct} color={c}/>
                        <div style={{fontSize:10,color:"var(--text-4)",marginTop:4,fontFamily:"var(--font-mono)"}}>
                          Last login: {m.lastLogin||"Never"}
                        </div>
                      </>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        ))}

        {/* Edit / Add modal */}
        {mModal==="edit" && (
          <ModalWrap title={mTarget?"✏️ Edit Member":"👤 Add Member"} onClose={()=>setMModal(null)}>
            <div style={{display:"grid",gap:14}}>

              {/* Name + Title */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <Lbl t="Full Name *">
                  <input style={iS2} value={mForm.name} onChange={e=>setMForm(p=>({...p,name:e.target.value}))} placeholder="e.g. John Smith"/>
                </Lbl>
                <Lbl t="Job Title">
                  <input style={iS2} value={mForm.title} onChange={e=>setMForm(p=>({...p,title:e.target.value}))} placeholder="e.g. Network Engineer"/>
                </Lbl>
              </div>

              {/* Role + Team */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <Lbl t="Role *">
                  {isAdmin ? (
                    <select style={iS2} value={mForm.role} onChange={e=>setMForm(p=>({...p,role:e.target.value}))}>
                      <option value="admin">Administrator</option>
                      <option value="manager">Team Manager</option>
                      <option value="member">Team Member</option>
                    </select>
                  ) : (
                    <select style={iS2} value={mForm.role} onChange={e=>setMForm(p=>({...p,role:e.target.value}))}>
                      <option value="member">Team Member</option>
                      <option value="manager">Team Manager</option>
                    </select>
                  )}
                </Lbl>
                <Lbl t="Team">
                  {isAdmin ? (
                    <select style={iS2} value={mForm.team||""} onChange={e=>setMForm(p=>({...p,team:e.target.value||null}))}>
                      <option value="">— No team (Admin) —</option>
                      {teams.map(t=><option key={t.name} value={t.name}>{t.emoji} {t.name}</option>)}
                    </select>
                  ) : (
                    /* Manager can only assign to their own team */
                    <input style={{...iS2,background:"var(--surface-3)",color:"var(--text-3)"}} value={user.team||""} disabled/>
                  )}
                </Lbl>
              </div>

              {/* New member info banner */}
              {!mTarget && (
                <div style={{background:"var(--brand-light)",border:"1px solid #bfdbfe",borderRadius:"var(--radius-md)",padding:"11px 14px",fontSize:12,color:"#1e40af",lineHeight:1.6}}>
                  <strong>Default credentials will be set automatically:</strong><br/>
                  Username: <code style={{fontFamily:"var(--font-mono)",background:"rgba(37,99,235,.12)",padding:"1px 5px",borderRadius:3}}>{mForm.name ? mForm.name.toLowerCase().replace(/\s+/g,".") : "firstname.lastname"}</code>
                  &nbsp;· Password: <code style={{fontFamily:"var(--font-mono)",background:"rgba(37,99,235,.12)",padding:"1px 5px",borderRadius:3}}>Member@123</code>
                  &nbsp;· <strong>Must reset on first login</strong>
                </div>
              )}

            </div>
            <MFoot onClose={()=>setMModal(null)} onSave={saveMember} label={mTarget?"Save Changes":"Add Member"}/>
          </ModalWrap>
        )}

        {/* Delete confirm */}
        {mConfirm && (()=>{
          const m = allUsers.find(u=>u.id===mConfirm);
          return (
            <ModalWrap title="Remove Member" onClose={()=>setMConfirm(null)}>
              <div style={{textAlign:"center",padding:"8px 0 16px"}}>
                <div style={{width:52,height:52,borderRadius:14,background:"#fef2f2",border:"1px solid #fecaca",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,margin:"0 auto 14px"}}>🗑</div>
                <div style={{fontSize:15,fontWeight:700,color:"var(--text-1)",marginBottom:6}}>Remove {m?.name}?</div>
                <div style={{fontSize:12.5,color:"var(--text-3)",lineHeight:1.6}}>This will remove the member from ISMS.<br/>Their existing time log entries will be preserved.</div>
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
                <button onClick={()=>setMConfirm(null)} style={{padding:"9px 22px",borderRadius:"var(--radius-md)",background:"var(--surface)",border:"1px solid var(--border)",fontWeight:600,fontSize:13,cursor:"pointer",color:"var(--text-2)"}}>Cancel</button>
                <button onClick={()=>deleteMember(mConfirm)} style={{padding:"9px 22px",borderRadius:"var(--radius-md)",background:"#dc2626",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>Remove Member</button>
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
        <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px",marginBottom:4}}>Bandwidth & Capacity</div>
        <div style={{fontSize:12,color:"var(--text-3)",marginBottom:12}}>{isAdmin?"All teams":"Your team"} availability, activity time and utilization · March 2025</div>
        {!isAdmin && <InfoBanner color="#1e40af" bg="var(--brand-light)" border="#bfdbfe" icon="🔒">Showing bandwidth data for <strong>{user.team}</strong> team only. Admins see cross-team view.</InfoBanner>}

        {/* ── Row 1: Capacity summary + util bars ── */}
        <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:14,marginBottom:14}}>
          <Card>
            <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>Capacity Summary</div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"var(--font-sans)"}}>
                <thead><tr><TH c="Team"/><TH c="HC"/><TH c="Available"/><TH c="Leave"/><TH c="Net Cap"/><TH c="Utilized"/><TH c="Util %"/></tr></thead>
                <tbody>
                  {bwCap.map(c=>{
                    const net=c.availMins-c.vacMins, pct=Math.round(c.utilMins/net*100);
                    return (
                      <tr key={c.team} className="trow-hover">
                        <TD><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{width:8,height:8,borderRadius:"50%",background:tCol(c.team),flexShrink:0,display:"inline-block"}}/><strong>{c.team}</strong></div></TD>
                        <TD s={{textAlign:"center"}}>{c.hc}</TD>
                        <TD>{fmtM(c.availMins)}</TD>
                        <TD s={{color:"#dc2626",fontFamily:"var(--font-mono)"}}>{c.vacMins?fmtM(c.vacMins):"—"}</TD>
                        <TD><strong>{fmtM(net)}</strong></TD>
                        <TD s={{color:"var(--brand)",fontWeight:700}}>{fmtM(c.utilMins)}</TD>
                        <TD>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <div style={{width:52,height:6,background:"var(--surface-3)",borderRadius:99,overflow:"hidden"}}>
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
            <div style={{fontWeight:700,fontSize:13,marginBottom:14}}>Utilization vs Net Capacity</div>
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
                      <span style={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)"}}>{fmtM(c.utilMins)} / {fmtM(net)}</span>
                      <span style={{color:uCol(pct),fontWeight:800,minWidth:38,textAlign:"right"}}>{pct}%</span>
                    </div>
                  </div>
                  <div style={{height:8,background:"var(--surface-3)",borderRadius:4,overflow:"hidden"}}>
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
              <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",fontFamily:"var(--font-sans)",letterSpacing:-.3}}>Time Spent per Activity</div>
              <div style={{fontSize:11,color:"var(--text-3)",marginTop:2}}>Logged hours vs estimate for each activity · sorted by time logged</div>
            </div>
            <div style={{fontSize:12,color:"var(--text-3)",background:"var(--surface-2)",border:"1px solid var(--border)",borderRadius:7,padding:"5px 12px"}}>
              {bwActs.length} activities · {fmtM(bwLogs.reduce((s,l)=>s+l.mins,0))} total
            </div>
          </div>
          {actDetail.length===0
            ? <div style={{textAlign:"center",padding:40,color:"var(--text-4)",fontSize:13}}>No activities yet.</div>
            : (
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"var(--font-sans)"}}>
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
                          <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",fontFamily:"var(--font-sans)",letterSpacing:-.3}}>{a.name}</div>
                          <div style={{fontSize:10,color:"var(--text-4)",marginTop:1,fontFamily:"var(--font-mono)"}}>{a.id} · {a.jira}</div>
                        </TD>
                        {isAdmin && <TD><TPill t={a.team}/></TD>}
                        <TD><NaturePill n={a.nature||"Proactive"}/></TD>
                        <TD><WNPill w={a.workNature||"Request"}/></TD>
                        <TD><code style={{background:"var(--surface-3)",padding:"2px 6px",borderRadius:4,color:"var(--text-2)",fontSize:11,fontWeight:600,fontFamily:"var(--font-mono)"}}>{a.ticketNo||a.jira||"—"}</code></TD>
                        <TD s={{fontSize:12}}>{a.type}</TD>
                        <TD><PDot p={a.priority}/></TD>
                        <TD><SPill s={a.status}/></TD>
                        <TD s={{fontWeight:600,color:"var(--text-2)"}}>{fmtM(a.estMins)}</TD>
                        <TD>
                          <div style={{fontWeight:800,color:a.pct>100?"#dc2626":"var(--brand)",fontSize:15}}>{fmtM(a.total)}</div>
                          {a.total===0 && <div style={{fontSize:10,color:"var(--text-4)"}}>no entries yet</div>}
                        </TD>
                        <TD>
                          <div style={{display:"flex",alignItems:"center",gap:7,minWidth:110}}>
                            <div style={{flex:1,height:7,background:"#eef2f7",borderRadius:4,overflow:"hidden"}}>
                              <div style={{height:"100%",width:`${a.pct}%`,background:a.pct>100?"#dc2626":a.pct>75?"#d97706":"#059669",borderRadius:4,transition:"width .5s"}}/>
                            </div>
                            <span style={{fontSize:11,fontWeight:700,color:a.pct>100?"#dc2626":a.pct>75?"#d97706":"var(--text-2)",minWidth:34,textAlign:"right"}}>{a.pct}%</span>
                          </div>
                          <div style={{fontSize:9,color:"var(--text-4)",marginTop:2}}>
                            {a.pct>100?"⚠️ Over estimate":a.pct===100?"✅ Complete":a.pct>75?"🔶 Nearly full":"🟢 On track"}
                          </div>
                        </TD>
                        <TD>
                          {a.byMember.length===0
                            ? <span style={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)"}}>—</span>
                            : (
                            <div style={{display:"flex",flexDirection:"column",gap:4}}>
                              {a.byMember.map(m=>(
                                <div key={m.id} style={{display:"flex",alignItems:"center",gap:7}}>
                                  <div style={{width:20,height:20,borderRadius:"var(--radius-sm)",background:`${col}16`,color:col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:800,flexShrink:0}}>
                                    {m.name.split(" ").map(n=>n[0]).join("")}
                                  </div>
                                  <div style={{flex:1,minWidth:80}}>
                                    <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:1}}>
                                      <span style={{color:"var(--text-2)",fontWeight:600}}>{m.name.split(" ")[0]}</span>
                                      <span style={{color:col,fontWeight:700}}>{fmtM(m.mins)}</span>
                                    </div>
                                    <div style={{height:3,background:"var(--surface-3)",borderRadius:2,overflow:"hidden"}}>
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
          <div style={{fontWeight:700,fontSize:13,marginBottom:14}}>Leave Calendar — March 2025</div>
          {bwLeave.length===0
            ? <div style={{textAlign:"center",padding:24,color:"var(--text-4)",fontSize:13}}>No leave planned this month.</div>
            : (
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"var(--font-sans)"}}>
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
    const TABS = [
      {id:"util",       label:"📊 Utilization"},
      {id:"efficiency", label:"⏱ Efficiency & Trends"},
      {id:"cost",       label:"💰 Cost Analytics"},
      {id:"member",     label:"👤 Per Member"},
      {id:"activity",   label:"📋 Activity Wise"},
      {id:"leave",      label:"🏖 Leave Impact"},
    ];

    // ── Cost & efficiency helpers ────────────────────────────────
    const scopeLogs2 = isAdmin ? logs : logs.filter(l=>l.team===user.team);
    const scopeActs2 = isAdmin ? acts : acts.filter(a=>a.team===user.team);
    const scopeUsers2 = isAdmin ? allUsers.filter(u=>u.team) : allUsers.filter(u=>u.team===user.team);

    // Cost per minute for each user
    const costPerMin = (u) => ((u.costPerHour||0)/60);

    // Total cost for a set of logs
    const calcCost = (logList) => logList.reduce((s,l)=>{
      const u = allUsers.find(x=>x.id===l.userId);
      return s + l.mins * costPerMin(u||{});
    }, 0);

    // Avg mins per activity (by type)
    const avgMinsForType = (type) => {
      const typeLogs = scopeLogs2.filter(l=>l.type===type);
      const typeActs = [...new Set(typeLogs.map(l=>l.actId))];
      if(!typeActs.length) return 0;
      return Math.round(typeLogs.reduce((s,l)=>s+l.mins,0)/typeActs.length);
    };

    // Current period actual values
    const curAvgPerAct     = scopeActs2.length ? Math.round(scopeLogs2.reduce((s,l)=>s+l.mins,0)/scopeActs2.length) : 0;
    const curAvgIncident   = avgMinsForType("Incident");
    const curAvgChange     = avgMinsForType("Change");
    const curAvgBAU        = avgMinsForType("BAU");
    const totalCost        = calcCost(scopeLogs2);
    const costPerAct       = scopeActs2.length ? Math.round(totalCost/scopeActs2.length) : 0;
    const costPerHrOrg     = Math.round(scopeUsers2.reduce((s,u)=>s+(u.costPerHour||0),0)/Math.max(scopeUsers2.length,1));

    // Build full period trend (historical + current)
    const allPeriods = [
      ...HIST_PERIODS,
      { period:"Mar 25", avgMinsPerAct:curAvgPerAct, avgMinsPerIncident:curAvgIncident||curAvgPerAct, avgMinsPerChange:curAvgChange||curAvgPerAct, avgMinsPerBAU:curAvgBAU||curAvgPerAct, totalActs:scopeActs2.length, totalHrs:Math.round(scopeLogs2.reduce((s,l)=>s+l.mins,0)/60), costPerTicket:costPerAct }
    ];

    // 10% annual reduction target — monthly = ~0.87% reduction
    const monthlyTarget = (baseVal, monthsAgo) => Math.round(baseVal * Math.pow(1-0.0087, monthsAgo));

    return (
      <div>
        <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px",marginBottom:4}}>Reports</div>
        <div style={{fontSize:12,color:"var(--text-3)",marginBottom:20}}>Utilization, efficiency, cost analytics · March 2025 · {isAdmin?"All teams":"Your team"}</div>
        <Tabs tabs={TABS} active={reportTab} onChange={setReportTab}/>
        {/* ══ EFFICIENCY & TRENDS TAB ══ */}
        {reportTab==="efficiency" && (
          <div>
            {!isAdmin && <InfoBanner color="#1e40af" bg="var(--brand-light)" border="#bfdbfe" icon="🔒">Showing data for <strong>{user.team}</strong> team only.</InfoBanner>}

            {/* KPI Strip */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:16}}>
              {[
                {label:"Avg Time / Activity",   val:fmtM(curAvgPerAct),   sub:"current period",   c:"var(--brand)",bg:"#eff6ff",icon:"⏱"},
                {label:"Avg Time / Incident",   val:fmtM(curAvgIncident), sub:"vs 6mo ago",        c:"#dc2626",bg:"#fef2f2",icon:"🚨"},
                {label:"Avg Time / Change",     val:fmtM(curAvgChange),   sub:"vs 6mo ago",        c:"#d97706",bg:"#fffbeb",icon:"🔄"},
                {label:"Avg Time / BAU Task",   val:fmtM(curAvgBAU),      sub:"vs 6mo ago",        c:"#059669",bg:"#f0fdf4",icon:"⚙️"},
              ].map(s=>(
                <Card key={s.label} style={{padding:14,borderLeft:`3px solid ${s.c}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:8}}>
                    <div style={{width:32,height:32,borderRadius:"var(--radius-sm)",background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{s.icon}</div>
                    <div style={{fontSize:9,fontWeight:700,color:"var(--text-4)",textTransform:"uppercase",letterSpacing:.8,lineHeight:1.3}}>{s.label}</div>
                  </div>
                  <div style={{fontSize:22,fontWeight:800,color:s.c,lineHeight:1}}>{s.val||"—"}</div>
                  <div style={{fontSize:10,color:"var(--text-4)",marginTop:4}}>{s.sub}</div>
                </Card>
              ))}
            </div>

            {/* 10% annual reduction trend chart */}
            <Card style={{marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                <div>
                  <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)"}}>Average Time per Activity — 6-Month Trend</div>
                  <div style={{fontSize:11,color:"var(--text-3)",marginTop:2}}>
                    Target: reduce 10% annually (~0.87%/month) · Darker bars = current period · Dashed line = target trajectory
                  </div>
                </div>
                <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:"var(--radius-sm)",padding:"6px 12px",fontSize:11,color:"#059669",fontWeight:700}}>
                  Target: -10%/yr
                </div>
              </div>
              {[
                {label:"All Activities",   key:"avgMinsPerAct",      color:"var(--brand)"},
                {label:"Incidents Only",   key:"avgMinsPerIncident", color:"#dc2626"},
                {label:"Changes Only",     key:"avgMinsPerChange",   color:"#d97706"},
                {label:"BAU Tasks",        key:"avgMinsPerBAU",      color:"#059669"},
              ].map(row=>{
                const vals = allPeriods.map(p=>p[row.key]||0);
                const baseVal = vals[0];
                const maxV = Math.max(...vals, 1);
                const latestChange = vals.length>1 ? Math.round((vals[vals.length-1]-vals[0])/vals[0]*100) : 0;
                return (
                  <div key={row.label} style={{marginBottom:18}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                      <span style={{fontSize:12,fontWeight:700,color:"var(--text-2)"}}>{row.label}</span>
                      <div style={{display:"flex",gap:10,alignItems:"center"}}>
                        <span style={{fontSize:11,color:"var(--text-3)"}}>Current: <strong style={{color:row.color}}>{fmtM(vals[vals.length-1])}</strong></span>
                        <span style={{fontSize:11,fontWeight:700,color:latestChange<0?"#059669":"#dc2626",background:latestChange<0?"#f0fdf4":"#fef2f2",padding:"2px 8px",borderRadius:6}}>
                          {latestChange<0?"↓":"↑"}{Math.abs(latestChange)}% vs 6mo ago
                        </span>
                        <span style={{fontSize:10,color:"var(--text-4)"}}>Target: {fmtM(monthlyTarget(baseVal,5))}</span>
                      </div>
                    </div>
                    <div style={{display:"flex",gap:3,alignItems:"flex-end",height:60,position:"relative"}}>
                      {allPeriods.map((p,i)=>{
                        const val=p[row.key]||0;
                        const targetVal=monthlyTarget(baseVal,allPeriods.length-1-i);
                        const barH=Math.round(val/maxV*52);
                        const targetH=Math.round(targetVal/maxV*52);
                        const isLast=i===allPeriods.length-1;
                        const onTarget=val<=targetVal;
                        return (
                          <div key={p.period} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,position:"relative"}}>
                            {/* Target dot */}
                            <div style={{position:"absolute",bottom:targetH+6,left:"50%",transform:"translateX(-50%)",width:6,height:6,borderRadius:"50%",background:"#94a3b8",border:"1px solid var(--surface)",zIndex:2}}/>
                            {/* Bar */}
                            <div style={{position:"absolute",bottom:6,width:"70%",height:barH,
                              background:isLast?row.color:onTarget?row.color+"88":row.color+"55",
                              borderRadius:"3px 3px 0 0",
                              border:isLast?`2px solid ${row.color}`:"none",
                              transition:"height .4s"}}/>
                            <div style={{position:"absolute",bottom:0,fontSize:9,color:isLast?"var(--text-1)":"var(--text-4)",fontWeight:isLast?700:400}}>{p.period.slice(0,3)}</div>
                          </div>
                        );
                      })}
                      {/* Baseline */}
                      <div style={{position:"absolute",bottom:6,left:0,right:0,height:1,background:"var(--border)"}}/>
                    </div>
                    <div style={{fontSize:9,color:"var(--text-4)",marginTop:2,display:"flex",alignItems:"center",gap:4}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:"#94a3b8"}}/> Target trajectory (10% annual reduction)
                    </div>
                  </div>
                );
              })}
            </Card>

            {/* Per-engineer avg time on activity types */}
            <Card style={{marginBottom:14}}>
              <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",marginBottom:4}}>Engineer Efficiency — Avg Time per Activity Type</div>
              <div style={{fontSize:11,color:"var(--text-3)",marginBottom:14}}>How long each engineer spends on different activity types · click engineer to see time logs</div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
                  <thead><tr>
                    <TH c="Engineer"/><TH c="Team"/><TH c="Avg/Activity"/><TH c="Incidents"/><TH c="Changes"/><TH c="BAU"/><TH c="Projects"/><TH c="Entries"/><TH c="vs Team Avg"/>
                  </tr></thead>
                  <tbody>
                    {scopeUsers2.map((u,i)=>{
                      const uLogs=scopeLogs2.filter(l=>l.userId===u.id);
                      const uActs=[...new Set(uLogs.map(l=>l.actId))];
                      const uAvg=uActs.length?Math.round(uLogs.reduce((s,l)=>s+l.mins,0)/uActs.length):0;
                      const byT=(t)=>{const tl=uLogs.filter(l=>l.type===t);const ta=[...new Set(tl.map(l=>l.actId))];return ta.length?Math.round(tl.reduce((s,l)=>s+l.mins,0)/ta.length):0;};
                      const vsTeam=curAvgPerAct?Math.round((uAvg-curAvgPerAct)/curAvgPerAct*100):0;
                      const col=tCol(u.team);
                      return (
                        <tr key={u.id} style={{background:i%2===0?"#fff":"var(--surface-2)",borderBottom:"1px solid var(--surface-3)",cursor:"pointer"}}
                          onClick={()=>setDashDrill({type:"logs",label:`${u.name} — All Entries`,data:logs.filter(l=>l.userId===u.id)})}>
                          <TD>
                            <div style={{display:"flex",alignItems:"center",gap:8}}>
                              <div style={{width:26,height:26,borderRadius:"var(--radius-sm)",background:`${col}16`,color:col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,flexShrink:0}}>{u.name.split(" ").map(n=>n[0]).join("")}</div>
                              <span style={{fontWeight:700}}>{u.name}</span>
                            </div>
                          </TD>
                          <TD><TPill t={u.team}/></TD>
                          <TD s={{fontWeight:800,color:"var(--brand)",fontSize:13,fontFamily:"var(--font-mono)"}}>{fmtM(uAvg)||"—"}</TD>
                          <TD s={{color:"#dc2626",fontWeight:600}}>{fmtM(byT("Incident"))||"—"}</TD>
                          <TD s={{color:"#d97706",fontWeight:600}}>{fmtM(byT("Change"))||"—"}</TD>
                          <TD s={{color:"#059669",fontWeight:600}}>{fmtM(byT("BAU"))||"—"}</TD>
                          <TD s={{color:"#7c3aed",fontWeight:600}}>{fmtM(byT("Project"))||"—"}</TD>
                          <TD s={{textAlign:"center"}}>{uLogs.length}</TD>
                          <TD>
                            {uAvg>0&&curAvgPerAct>0?(
                              <span style={{fontSize:11,fontWeight:700,background:vsTeam>10?"#fef2f2":vsTeam>0?"#fffbeb":vsTeam<-10?"#f0fdf4":"var(--surface-2)",color:vsTeam>10?"#dc2626":vsTeam>0?"#d97706":vsTeam<-10?"#059669":"var(--text-2)",padding:"2px 8px",borderRadius:"var(--radius-sm)"}}>
                                {vsTeam>0?"+":""}{vsTeam}%
                              </span>
                            ):"—"}
                          </TD>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Activity comparison — same activity across engineers */}
            <Card>
              <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",marginBottom:4}}>Activity Deep-Dive — Time Variance by Engineer</div>
              <div style={{fontSize:11,color:"var(--text-3)",marginBottom:14}}>See how different engineers handle the same activity type — identifies training or process gaps</div>
              {scopeActs2.filter(a=>{
                const aLogs=scopeLogs2.filter(l=>l.actId===a.id);
                return aLogs.length>0;
              }).slice(0,8).map(a=>{
                const aLogs=scopeLogs2.filter(l=>l.actId===a.id);
                const engineers=aLogs.reduce((acc,l)=>{
                  if(!acc[l.userId]) acc[l.userId]={name:l.member,mins:0,entries:0};
                  acc[l.userId].mins+=l.mins;
                  acc[l.userId].entries++;
                  return acc;
                },{});
                const engArr=Object.values(engineers).sort((a,b)=>b.mins-a.mins);
                const maxE=Math.max(...engArr.map(e=>e.mins),1);
                const totalLogged=aLogs.reduce((s,l)=>s+l.mins,0);
                const col=tCol(a.team);
                return (
                  <div key={a.id} style={{marginBottom:16,padding:"12px 14px",borderRadius:"var(--radius-md)",background:"var(--surface-2)",border:"1px solid var(--border)"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                      <div>
                        <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)"}}>{a.name}</div>
                        <div style={{fontSize:10,color:"var(--text-4)",marginTop:2}}>{a.ticketNo} · {a.type} · Est: {fmtM(a.estMins)} · Total logged: {fmtM(totalLogged)}</div>
                      </div>
                      <div style={{display:"flex",gap:8,alignItems:"center"}}>
                        {totalLogged>a.estMins&&<span style={{fontSize:10,background:"#fef2f2",color:"#dc2626",padding:"2px 7px",borderRadius:6,fontWeight:700}}>OVER ESTIMATE</span>}
                        <TPill t={a.team}/>
                      </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:6}}>
                      {engArr.map(e=>(
                        <div key={e.name} style={{display:"flex",alignItems:"center",gap:10}}>
                          <div style={{width:110,fontSize:11,fontWeight:600,color:"var(--text-2)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flexShrink:0}}>{e.name.split(" ")[0]}</div>
                          <div style={{flex:1,height:12,background:"var(--surface-3)",borderRadius:4,overflow:"hidden",position:"relative"}}>
                            <div style={{height:"100%",width:`${Math.round(e.mins/maxE*100)}%`,background:`linear-gradient(90deg,${col}bb,${col})`,borderRadius:4,transition:"width .5s"}}/>
                          </div>
                          <div style={{width:60,textAlign:"right",fontSize:11,fontWeight:800,color:col,flexShrink:0}}>{fmtM(e.mins)}</div>
                          <div style={{width:40,textAlign:"right",fontSize:10,color:"var(--text-4)",flexShrink:0}}>{e.entries} logs</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </Card>
          </div>
        )}

        {/* ══ COST ANALYTICS TAB ══ */}
        {reportTab==="cost" && (
          <div>
            {!isAdmin && <InfoBanner color="#1e40af" bg="var(--brand-light)" border="#bfdbfe" icon="🔒">Cost data for <strong>{user.team}</strong> team. Admin sees org-wide.</InfoBanner>}
            <InfoBanner color="#065f46" bg="#f0fdf4" border="#a7f3d0" icon="💡">
              Cost calculations use hourly rates set in User Management. <strong>Go to System → User Management → edit any user → set Hourly Cost ($/hr)</strong> to include them in cost analysis.
            </InfoBanner>

            {/* Cost KPI strip */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:16}}>
              {[
                {label:"Total Period Cost",   val:`$${Math.round(totalCost).toLocaleString()}`, sub:`${scopeLogs2.length} log entries`,     c:"var(--brand)",bg:"#eff6ff",icon:"💰"},
                {label:"Avg Cost / Activity", val:`$${costPerAct.toLocaleString()}`,             sub:"across all activity types",             c:"#7c3aed",bg:"#f5f3ff",icon:"📋"},
                {label:"Avg Cost / Incident", val:`$${Math.round(calcCost(scopeLogs2.filter(l=>l.type==="Incident"))/Math.max([...new Set(scopeLogs2.filter(l=>l.type==="Incident").map(l=>l.actId))].length,1)).toLocaleString()}`,sub:"per incident",c:"#dc2626",bg:"#fef2f2",icon:"🚨"},
                {label:"Avg Engineer Rate",   val:`$${costPerHrOrg}/hr`,                         sub:"blended across team",                   c:"#059669",bg:"#f0fdf4",icon:"👤"},
              ].map(s=>(
                <Card key={s.label} style={{padding:14,borderLeft:`3px solid ${s.c}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:8}}>
                    <div style={{width:32,height:32,borderRadius:"var(--radius-sm)",background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{s.icon}</div>
                    <div style={{fontSize:9,fontWeight:700,color:"var(--text-4)",textTransform:"uppercase",letterSpacing:.8,lineHeight:1.3}}>{s.label}</div>
                  </div>
                  <div style={{fontSize:22,fontWeight:800,color:s.c,lineHeight:1}}>{s.val}</div>
                  <div style={{fontSize:10,color:"var(--text-4)",marginTop:4}}>{s.sub}</div>
                </Card>
              ))}
            </div>

            {/* Cost per ticket trend */}
            <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:14,marginBottom:14}}>
              <Card>
                <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",marginBottom:4}}>Cost per Ticket — 6-Month Trend</div>
                <div style={{fontSize:11,color:"var(--text-3)",marginBottom:14}}>Target: reduce 10% annually. Darker bar = current period.</div>
                <div style={{display:"flex",gap:4,alignItems:"flex-end",height:140,position:"relative",marginBottom:8}}>
                  {allPeriods.map((p,i)=>{
                    const val=p.costPerTicket||0;
                    const maxV=Math.max(...allPeriods.map(x=>x.costPerTicket||0),1);
                    const targetV=monthlyTarget(allPeriods[0].costPerTicket||val,allPeriods.length-1-i);
                    const barH=Math.round(val/maxV*120);
                    const targetH=Math.round(targetV/maxV*120);
                    const isLast=i===allPeriods.length-1;
                    const onTarget=val<=targetV;
                    return (
                      <div key={p.period} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,position:"relative",height:140}}>
                        <div style={{position:"absolute",bottom:16,width:"65%",height:barH,
                          background:isLast?(onTarget?"#059669":"#dc2626"):onTarget?"#059669aa":"#dc2626aa",
                          borderRadius:"4px 4px 0 0",border:isLast?"2px solid"+(onTarget?"#059669":"#dc2626"):"none",
                          transition:"height .5s"}}/>
                        <div style={{position:"absolute",bottom:targetH+16,left:"10%",right:"10%",height:2,background:"#64748b",opacity:.5,borderRadius:1}}/>
                        <div style={{position:"absolute",top:0,fontSize:9,fontWeight:isLast?700:400,color:isLast?"#1e293b":"var(--text-4)"}}>${val}</div>
                        <div style={{position:"absolute",bottom:0,fontSize:9,color:isLast?"var(--brand)":"#94a3b8",fontWeight:isLast?700:400}}>{p.period.slice(0,3)}</div>
                      </div>
                    );
                  })}
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"var(--text-4)",borderTop:"1px solid var(--border)",paddingTop:8}}>
                  <span>6mo ago: <strong>${allPeriods[0].costPerTicket}</strong></span>
                  <span>Current: <strong style={{color:costPerAct<=(allPeriods[0].costPerTicket*0.95)?"#059669":"#dc2626"}}>${costPerAct}</strong></span>
                  <span>Target: <strong style={{color:"#059669"}}>${monthlyTarget(allPeriods[0].costPerTicket,5)}</strong></span>
                </div>
              </Card>

              {/* Cost by activity type */}
              <Card>
                <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",marginBottom:4}}>Cost Breakdown by Type</div>
                <div style={{fontSize:11,color:"var(--text-3)",marginBottom:14}}>Total spend per activity type this period</div>
                {["Incident","Change","Project","BAU","Training","Meeting"].map(t=>{
                  const tLogs=scopeLogs2.filter(l=>l.type===t);
                  const tCost=calcCost(tLogs);
                  const tActs=[...new Set(tLogs.map(l=>l.actId))].length;
                  if(tCost===0) return null;
                  const pct=Math.round(tCost/Math.max(totalCost,1)*100);
                  const col={Incident:"#dc2626",Change:"#d97706",Project:"#2563eb",BAU:"#059669",Training:"#06b6d4",Meeting:"#7c3aed"}[t]||"var(--text-3)";
                  return (
                    <div key={t} style={{marginBottom:10}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                        <div style={{display:"flex",alignItems:"center",gap:7}}>
                          <div style={{width:9,height:9,borderRadius:2,background:col,flexShrink:0}}/>
                          <span style={{fontSize:12,fontWeight:600,color:"var(--text-2)"}}>{t}</span>
                        </div>
                        <div style={{display:"flex",gap:10,fontSize:11}}>
                          <span style={{color:"var(--text-4)"}}>{tActs} act{tActs!==1?"s":""}</span>
                          <span style={{fontWeight:800,color:col}}>${Math.round(tCost).toLocaleString()}</span>
                          <span style={{color:"var(--text-4)"}}>{pct}%</span>
                        </div>
                      </div>
                      <div style={{height:8,background:"var(--surface-3)",borderRadius:5,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${col}cc,${col})`,borderRadius:5,transition:"width .5s"}}/>
                      </div>
                    </div>
                  );
                })}
              </Card>
            </div>

            {/* Cost per engineer table */}
            <Card style={{marginBottom:14,padding:0,overflow:"hidden"}}>
              <div style={{padding:"14px 18px",borderBottom:"1px solid var(--surface-3)"}}>
                <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)"}}>Cost per Engineer</div>
                <div style={{fontSize:11,color:"var(--text-3)",marginTop:2}}>Total cost of logged hours per engineer this period · hourly rates from User Management</div>
              </div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
                  <thead><tr>
                    <TH c="Engineer"/><TH c="Team"/><TH c="$/hr Rate"/><TH c="Hours Logged"/>
                    <TH c="Total Cost"/><TH c="Cost/Activity"/><TH c="Cost/Incident"/><TH c="Highest Cost Activity"/>
                  </tr></thead>
                  <tbody>
                    {scopeUsers2.sort((a,b)=>{
                      const ca=calcCost(scopeLogs2.filter(l=>l.userId===a.id));
                      const cb=calcCost(scopeLogs2.filter(l=>l.userId===b.id));
                      return cb-ca;
                    }).map((u,i)=>{
                      const uLogs=scopeLogs2.filter(l=>l.userId===u.id);
                      const uCost=calcCost(uLogs);
                      const uHrs=Math.round(uLogs.reduce((s,l)=>s+l.mins,0)/60);
                      const uActs=[...new Set(uLogs.map(l=>l.actId))].length;
                      const uInc=uLogs.filter(l=>l.type==="Incident");
                      const uIncActs=[...new Set(uInc.map(l=>l.actId))].length;
                      const incCost=uIncActs?Math.round(calcCost(uInc)/uIncActs):0;
                      // Most expensive activity
                      const actCosts=Object.entries(uLogs.reduce((acc,l)=>{
                        if(!acc[l.actId]){acc[l.actId]={name:l.activity,cost:0};}
                        acc[l.actId].cost+=l.mins*((u.costPerHour||0)/60);
                        return acc;
                      },{})).sort((a,b)=>b[1].cost-a[1].cost);
                      const topAct=actCosts[0];
                      const col=tCol(u.team);
                      return (
                        <tr key={u.id} style={{background:i%2===0?"#fff":"var(--surface-2)",borderBottom:"1px solid var(--surface-3)"}}
                          onMouseEnter={e=>e.currentTarget.style.background="#f0f9ff"}
                          onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"#fff":"var(--surface-2)"}>
                          <TD>
                            <div style={{display:"flex",alignItems:"center",gap:8}}>
                              <div style={{width:26,height:26,borderRadius:"var(--radius-sm)",background:`${col}16`,color:col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,flexShrink:0}}>{u.name.split(" ").map(n=>n[0]).join("")}</div>
                              <span style={{fontWeight:700}}>{u.name}</span>
                            </div>
                          </TD>
                          <TD><TPill t={u.team}/></TD>
                          <TD s={{fontWeight:700,color:"#059669"}}>{u.costPerHour?`$${u.costPerHour}`:<span style={{color:"var(--text-4)",fontStyle:"italic"}}>not set</span>}</TD>
                          <TD s={{fontWeight:600,color:"var(--brand)"}}>{uHrs}h</TD>
                          <TD s={{fontWeight:800,fontSize:14,color:uCost>5000?"#dc2626":uCost>3000?"#d97706":"var(--text-2)"}}>{uCost?`$${Math.round(uCost).toLocaleString()}`:"—"}</TD>
                          <TD s={{fontWeight:600}}>{uActs&&uCost?`$${Math.round(uCost/uActs).toLocaleString()}`:"—"}</TD>
                          <TD s={{color:"#dc2626",fontWeight:600}}>{incCost?`$${incCost}`:"—"}</TD>
                          <TD s={{fontSize:11,color:"var(--text-3)"}}>
                            {topAct?<span>{topAct[1].name?.slice(0,25)}{topAct[1].name?.length>25?"…":""} <strong style={{color:"var(--brand)"}}>${Math.round(topAct[1].cost)}</strong></span>:"—"}
                          </TD>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Cost per activity table */}
            <Card style={{padding:0,overflow:"hidden"}}>
              <div style={{padding:"14px 18px",borderBottom:"1px solid var(--surface-3)"}}>
                <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)"}}>Cost per Activity</div>
                <div style={{fontSize:11,color:"var(--text-3)",marginTop:2}}>Total and average cost per activity — sorted by highest cost first</div>
              </div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
                  <thead><tr>
                    <TH c="Activity"/><TH c="Ticket"/><TH c="Type"/><TH c="Team"/><TH c="Est. Hours"/><TH c="Logged Hours"/>
                    <TH c="Total Cost"/><TH c="Avg $/hr"/><TH c="vs Estimate"/>
                  </tr></thead>
                  <tbody>
                    {scopeActs2.map(a=>{
                      const aLogs=scopeLogs2.filter(l=>l.actId===a.id);
                      const aCost=calcCost(aLogs);
                      const aHrs=Math.round(aLogs.reduce((s,l)=>s+l.mins,0)/60);
                      const estHrs=Math.round(a.estMins/60);
                      const overEst=aHrs>estHrs;
                      return {a,aLogs,aCost,aHrs,estHrs,overEst};
                    }).filter(({aCost})=>aCost>0||true).sort((a,b)=>b.aCost-a.aCost).slice(0,12).map(({a,aLogs,aCost,aHrs,estHrs,overEst},i)=>{
                      const col=tCol(a.team);
                      return (
                        <tr key={a.id} style={{background:i%2===0?"#fff":"var(--surface-2)",borderBottom:"1px solid var(--surface-3)",cursor:"pointer"}}
                          onClick={()=>setDashDrill({type:"logs",label:`${a.name} — Entries`,data:aLogs})}>
                          <TD>
                            <div style={{fontWeight:700,fontSize:12,color:"var(--text-1)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:180}}>{a.name}</div>
                            <div style={{fontSize:9,color:"var(--text-4)"}}>{a.status}</div>
                          </TD>
                          <TD><code style={{background:"var(--surface-3)",padding:"2px 6px",borderRadius:4,fontSize:11}}>{a.ticketNo||"—"}</code></TD>
                          <TD s={{fontSize:11}}>{a.type}</TD>
                          <TD><TPill t={a.team}/></TD>
                          <TD s={{color:"var(--text-3)",fontWeight:600}}>{estHrs}h</TD>
                          <TD s={{fontWeight:700,color:"var(--brand)"}}>{aHrs}h</TD>
                          <TD s={{fontWeight:800,fontSize:14,color:aCost>2000?"#dc2626":aCost>1000?"#d97706":"#059669"}}>
                            {aCost?`$${Math.round(aCost).toLocaleString()}`:"—"}
                          </TD>
                          <TD s={{color:"var(--text-3)"}}>{aHrs?`$${Math.round(aCost/Math.max(aHrs,1))}/hr`:"—"}</TD>
                          <TD>
                            {aHrs>0?(
                              <span style={{fontSize:11,fontWeight:700,background:overEst?"#fef2f2":"#f0fdf4",color:overEst?"#dc2626":"#059669",padding:"2px 8px",borderRadius:"var(--radius-sm)"}}>
                                {overEst?`+${aHrs-estHrs}h over`:`-${estHrs-aHrs}h under`}
                              </span>
                            ):"—"}
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

        {reportTab==="util" && (
          <div>
            {!isAdmin && <InfoBanner color="#1e40af" bg="var(--brand-light)" border="#bfdbfe" icon="🔒">Showing data for <strong>{user.team}</strong> team only. Admins see cross-team reports.</InfoBanner>}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:16}}>
              {(()=>{ const rc=isAdmin?CAPACITY:CAPACITY.filter(c=>c.team===user.team); const avg=Math.round(rc.reduce((s,c)=>{const n=c.availMins-c.vacMins;return s+(c.utilMins/n*100)},0)/Math.max(rc.length,1));
                const netCap=rc.reduce((s,c)=>s+(c.availMins-c.vacMins),0);
                return [["Avg Util",`${avg}%`,"var(--brand)"],["Over-utilized",`${rc.filter(c=>{const n=c.availMins-c.vacMins;return c.utilMins/n*100>85}).length} team(s)`,"#dc2626"],["Under-utilized",`${rc.filter(c=>{const n=c.availMins-c.vacMins;return c.utilMins/n*100<70}).length} team(s)`,"#d97706"],["Net Capacity",fmtM(netCap),"#059669"]];
              })().map(([l,v,c])=>(
                <Card key={l} style={{padding:14,textAlign:"center"}}>
                  <div style={{fontSize:9.5,fontWeight:700,color:"var(--text-3)",textTransform:"uppercase",letterSpacing:.8,marginBottom:6}}>{l}</div>
                  <div style={{fontSize:26,fontWeight:800,color:c}}>{v}</div>
                </Card>
              ))}
            </div>
            <Card>
              <div style={{fontWeight:700,fontSize:13,marginBottom:14}}>Utilization Detail</div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"var(--font-sans)"}}>
                  <thead><tr><TH c="Team"/><TH c="Lead"/><TH c="HC"/><TH c="Available"/><TH c="Leave"/><TH c="Net Cap"/><TH c="Utilized"/><TH c="Util %"/><TH c="Status"/></tr></thead>
                  <tbody>
                    {(isAdmin?CAPACITY:CAPACITY.filter(c=>c.team===user.team)).map(c=>{
                      const net=c.availMins-c.vacMins, pct=Math.round(c.utilMins/net*100), t=teams.find(x=>x.name===c.team);
                      return (
                        <tr key={c.team} className="trow-hover">
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
            <div style={{fontWeight:700,fontSize:13,marginBottom:14}}>Member Utilization</div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"var(--font-sans)"}}>
                <thead><tr><TH c="Member"/><TH c="Team"/><TH c="Role"/><TH c="Capacity"/><TH c="Logged"/><TH c="Util %"/></tr></thead>
                <tbody>
                  {(isAdmin?allUsers:allUsers.filter(u=>u.team===user.team)).filter(m=>m.team).map(m=>{
                    const mM=logs.filter(l=>l.userId===m.id).reduce((s,l)=>s+l.mins,0), cap=160*60, pct=Math.round(mM/cap*100);
                    return (
                      <tr key={m.id} className="trow-hover">
                        <TD><strong>{m.name}</strong></TD>
                        <TD><TPill t={m.team}/></TD>
                        <TD s={{fontSize:12}}>{m.role==="manager"?"👑 Manager":"Member"}</TD>
                        <TD>{fmtM(cap)}</TD>
                        <TD s={{color:"var(--brand)",fontWeight:700}}>{fmtM(mM)}</TD>
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
            <div style={{fontWeight:700,fontSize:13,marginBottom:14}}>Activity Hours — Top by Logged</div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"var(--font-sans)"}}>
                <thead><tr><TH c="Activity"/><TH c="Team"/><TH c="Type"/><TH c="Est. Time"/><TH c="Logged"/><TH c="Completion"/><TH c="Status"/></tr></thead>
                <tbody>
                  {[...(isAdmin?acts:teamActs)].sort((a,b)=>minsForAct(b.id)-minsForAct(a.id)).map(a=>{
                    const logged=minsForAct(a.id), pct=Math.min(100,Math.round(logged/Math.max(a.estMins,1)*100));
                    return (
                      <tr key={a.id} className="trow-hover">
                        <TD><strong style={{fontSize:12}}>{a.name}</strong></TD>
                        <TD><TPill t={a.team}/></TD>
                        <TD s={{fontSize:12}}>{a.type}</TD>
                        <TD s={{fontWeight:600}}>{fmtM(a.estMins)}</TD>
                        <TD s={{color:"var(--brand)",fontWeight:700}}>{fmtM(logged)}</TD>
                        <TD>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <div style={{width:65,height:5,background:"var(--surface-3)",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:"var(--brand)",borderRadius:3}}/></div>
                            <span style={{fontSize:11,color:"var(--text-3)"}}>{pct}%</span>
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
            <div style={{fontWeight:700,fontSize:13,marginBottom:14}}>Leave & Capacity Impact</div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"var(--font-sans)"}}>
                <thead><tr><TH c="Team"/><TH c="Gross Cap"/><TH c="Leave"/><TH c="Impact%"/><TH c="Net Cap"/><TH c="Utilized"/><TH c="Adj Util%"/></tr></thead>
                <tbody>
                  {CAPACITY.map(c=>{
                    const net=c.availMins-c.vacMins, pct=Math.round(c.utilMins/net*100), imp=c.vacMins?((c.vacMins/c.availMins)*100).toFixed(1):0;
                    return (
                      <tr key={c.team} className="trow-hover">
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
      <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px",marginBottom:4}}>Custom Reports</div>
      <div style={{fontSize:12,color:"var(--text-3)",marginBottom:20}}>Build and save tailored reports</div>
      <Card style={{marginBottom:16}}>
        <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>📂 Saved Reports</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {["🔒 Security Monthly","☁️ Cloud Utilization","🚨 Incident Breakdown","🏆 Top Contributors","⏰ Overdue Activities","🏖 Leave Impact Q1"].map(r=>(
            <button key={r} onClick={()=>showToast(`Loaded: ${r}`)} style={{padding:"5px 12px",borderRadius:"var(--radius-xl)",fontSize:12,fontWeight:600,border:"1.5px solid var(--border-2)",background:"var(--surface)",cursor:"pointer",color:"var(--text-2)"}}>{r}</button>
          ))}
        </div>
      </Card>
      <div style={{background:"var(--surface-2)",border:"1px solid var(--border)",borderRadius:12,padding:18,marginBottom:16}}>
        <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>⚙️ Report Builder</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:14}}>
          {[["Report Type",["Team Utilization","Member Hours","Activity Summary","Incident Analysis","Category Breakdown","Project Progress"]],
            ["Filter: Team",isAdmin?["All Teams",...teams.map(t=>t.name)]:[user.team||"All"]],
            ["Group By",["Team","Member","Category","Activity Type","Status","Priority"]],
            ["Chart Type",["Bar Chart","Horizontal Bar","Line Chart","Doughnut","Pie Chart"]],
            ["Date Range",["March 2025","Q1 2025","Last 3 Months","Last 6 Months"]],
          ].map(([label,opts])=>(
            <div key={label}>
              <div style={{fontSize:11,fontWeight:600,color:"var(--text-3)",marginBottom:4}}>{label}</div>
              <select style={sS}>{opts.map(o=><option key={o}>{o}</option>)}</select>
            </div>
          ))}
        </div>
        <div style={{fontSize:11,fontWeight:700,color:"var(--text-3)",marginBottom:8}}>METRICS:</div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:14}}>
          {["Hours Logged","Utilization %","Est Time","Activity Count","Leave Hours","Net Capacity","Completion %","Blocked Count"].map((chip,i)=>(
            <button key={chip} style={{padding:"4px 11px",borderRadius:"var(--radius-xl)",fontSize:12,fontWeight:600,border:`1.5px solid ${i<2?"var(--brand)":"var(--border-2)"}`,background:i<2?"var(--brand)":"#fff",color:i<2?"#fff":"var(--text-3)",cursor:"pointer"}}>{chip}</button>
          ))}
        </div>
        <Btn onClick={()=>showToast("Report generated!")}>▶ Run Report</Btn>
      </div>
      <Card>
        <div style={{fontWeight:800,fontSize:15,marginBottom:4}}>Team Utilization Preview</div>
        <div style={{fontSize:12,color:"var(--text-3)",marginBottom:16}}>All Teams · March 2025</div>
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
              <div key={i.title} style={{display:"flex",gap:9,padding:"10px 12px",borderRadius:"var(--radius-sm)",marginBottom:8,background:i.t==="alert"?"#fef2f2":i.t==="warn"?"#fffbeb":"#f0fdf4",border:`1px solid ${i.t==="alert"?"#fecaca":i.t==="warn"?"#fde68a":"#a7f3d0"}`}}>
                <span style={{fontSize:16}}>{i.icon}</span>
                <div><div style={{fontSize:12,fontWeight:700,marginBottom:2}}>{i.title}</div><div style={{fontSize:11,color:"var(--text-3)"}}>{i.desc}</div></div>
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
      <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px",marginBottom:4}}>Capacity Planning</div>
      <div style={{fontSize:12,color:"var(--text-3)",marginBottom:20}}>Q2 2025 Forecast & Resource Allocation</div>
      {!isAdmin && <InfoBanner color="#1e40af" bg="var(--brand-light)" border="#bfdbfe" icon="🔒">Showing capacity plan for <strong>{user.team}</strong> team only.</InfoBanner>}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
        <Card>
          <div style={{fontWeight:700,fontSize:13,marginBottom:14}}>Q2 Utilization Forecast</div>
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
          <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>Recommendations</div>
          {[{t:"alert",icon:"🔴",title:"Security — Over-Utilized (91%)",desc:"Redistribute 2 activities or consider 0.5 FTE for Q2."},
            {t:"warn",icon:"🟡",title:"Cloud — Near Capacity (88%)",desc:"Evaluate Q2 project intake before April."},
            {t:"good",icon:"🟢",title:"Storage — Has Headroom (65%)",desc:"Can absorb 2–3 additional projects in Q2."}
          ].map(i=>(
            <div key={i.title} style={{display:"flex",gap:9,padding:"11px 12px",borderRadius:"var(--radius-sm)",marginBottom:9,background:i.t==="alert"?"#fef2f2":i.t==="warn"?"#fffbeb":"#f0fdf4",border:`1px solid ${i.t==="alert"?"#fecaca":i.t==="warn"?"#fde68a":"#a7f3d0"}`}}>
              <span style={{fontSize:18}}>{i.icon}</span>
              <div><div style={{fontSize:12,fontWeight:700,marginBottom:2}}>{i.title}</div><div style={{fontSize:11,color:"var(--text-3)"}}>{i.desc}</div></div>
            </div>
          ))}
        </Card>
      </div>
      <Card>
        <div style={{fontWeight:700,fontSize:13,marginBottom:14}}>Q2 Bandwidth Plan — Apr to Jun 2025</div>
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
    const STABS = [{id:"fields",label:"Custom Fields"},{id:"cats",label:"Types & Categories"},{id:"sp",label:"SharePoint"},{id:"pbi",label:"Power BI"},{id:"data",label:"Data Management"}];
    return (
      <div>
        <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px",marginBottom:4}}>Settings</div>
        <div style={{fontSize:12,color:"var(--text-3)",marginBottom:20}}>Configure fields, categories and integrations</div>
        <Tabs tabs={STABS} active={settingsTab} onChange={setSettingsTab}/>
        {settingsTab==="fields" && (
          <Card>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div style={{fontWeight:700,fontSize:13}}>Activity Custom Fields</div>
              <Btn sm onClick={()=>showToast("Field added")}>+ Add Field</Btn>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"var(--font-sans)"}}>
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
                      <TD s={{fontSize:11,color:"var(--text-3)"}}>{o}</TD>
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
                <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>{title}</div>
                {items.map(item=>(
                  <div key={item} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #f3f4f6",fontSize:13}}>
                    <span>{item}</span>
                    <button style={{padding:"2px 8px",borderRadius:5,border:"1px solid var(--border-2)",background:"var(--surface)",cursor:"pointer",fontSize:11}}>×</button>
                  </div>
                ))}
                <div style={{display:"flex",gap:8,marginTop:12}}>
                  <input placeholder="Add new…" style={{flex:1,padding:"7px 10px",borderRadius:7,border:"1px solid var(--border-2)",fontSize:12}}/>
                  <Btn sm onClick={()=>showToast("Added!")}>Add</Btn>
                </div>
              </Card>
            ))}
          </div>
        )}
        {settingsTab==="sp" && (
          <Card style={{maxWidth:540}}>
            <div style={{fontWeight:700,fontSize:13,marginBottom:16}}>SharePoint Online Configuration</div>
            {[["SharePoint Site URL","https://yourorg.sharepoint.com/sites/ISMS"],["Client ID","Azure App Registration GUID"],["Tenant ID","Azure Tenant GUID"],["Activities List","ISMSActivities"],["Time Logs List","ISMSTimeLogs"]].map(([l,ph])=>(
              <div key={l} style={{marginBottom:12}}>
                <div style={{fontSize:12,fontWeight:600,color:"var(--text-3)",marginBottom:4}}>{l}</div>
                <input style={iS} placeholder={ph}/>
              </div>
            ))}
            <Btn onClick={()=>showToast("Configuration saved!")}>Save Configuration</Btn>
          </Card>
        )}
        {settingsTab==="pbi" && (
          <Card style={{maxWidth:540}}>
            <div style={{fontWeight:700,fontSize:13,marginBottom:16}}>Power BI Embed Configuration</div>
            {["Workspace ID","Report ID — Utilization","Report ID — Capacity","Embed Token"].map(l=>(
              <div key={l} style={{marginBottom:12}}>
                <div style={{fontSize:12,fontWeight:600,color:"var(--text-3)",marginBottom:4}}>{l}</div>
                <input style={iS} placeholder={l==="Embed Token"?"eyJ0eXAi...":"GUID"}/>
              </div>
            ))}
            <Btn v="suc" onClick={()=>showToast("Power BI config saved!")}>Save & Test Connection</Btn>
          </Card>
        )}
        {settingsTab==="data" && (
          <Card>
            <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>💾 Data Management</div>
            <div style={{fontSize:12,color:"var(--text-3)",marginBottom:16}}>Manage and persist application data</div>
            
            <div style={{background:"#f0fdf4",border:"1px solid #86efac",borderRadius:"var(--radius-md)",padding:14,marginBottom:16}}>
              <div style={{fontSize:12,fontWeight:600,color:"#15803d",marginBottom:6}}>✓ Data Persistence Enabled</div>
              <div style={{fontSize:11,color:"#4b5563"}}>All users, teams, and settings are automatically saved to your browser's local storage and persist across sessions.</div>
            </div>

            <div style={{borderTop:"1px solid var(--border)",paddingTop:16}}>
              <div style={{fontWeight:600,fontSize:13,marginBottom:12,color:"var(--text-1)"}}>Reset Data</div>
              <div style={{fontSize:12,color:"var(--text-3)",marginBottom:12}}>If you need to restore the original seed data and remove all custom users, teams, and settings:</div>
              <button 
                onClick={() => {
                  if(window.confirm("⚠️ This will delete all custom users and teams and restore seed data. Continue?")) {
                    try {
                      localStorage.removeItem('isms_users');
                      window.location.reload();
                      showToast("Data reset! Reloading...");
                    } catch(e) {
                      showToast("Error resetting data","err");
                    }
                  }
                }}
                style={{padding:"9px 16px",borderRadius:"var(--radius-sm)",background:"#fef2f2",border:"1px solid #fecaca",color:"#dc2626",fontWeight:600,fontSize:12,cursor:"pointer"}}>
                🔄 Reset to Seed Data
              </button>
            </div>

            <div style={{borderTop:"1px solid var(--border)",marginTop:16,paddingTop:16}}>
              <div style={{fontWeight:600,fontSize:13,marginBottom:12,color:"var(--text-1)"}}>Storage Info</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div style={{background:"var(--surface-2)",border:"1px solid #e5e7eb",borderRadius:"var(--radius-sm)",padding:12}}>
                  <div style={{fontSize:10,color:"var(--text-4)",fontWeight:600,marginBottom:4}}>STORAGE TYPE</div>
                  <div style={{fontSize:13,fontWeight:700,color:"var(--text-1)"}}>Browser LocalStorage</div>
                  <div style={{fontSize:11,color:"var(--text-3)",marginTop:4}}>Data persists in your browser</div>
                </div>
                <div style={{background:"var(--surface-2)",border:"1px solid #e5e7eb",borderRadius:"var(--radius-sm)",padding:12}}>
                  <div style={{fontSize:10,color:"var(--text-4)",fontWeight:600,marginBottom:4}}>AUTO-SAVE</div>
                  <div style={{fontSize:13,fontWeight:700,color:"#059669"}}>Real-time</div>
                  <div style={{fontSize:11,color:"var(--text-3)",marginTop:4}}>Changes saved instantly</div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  };


  // ════════════════════════════════════════════════════════════════════
  //  PRODUCTIVITY ENGINE — shared helpers used across all 4 sub-pages
  // ════════════════════════════════════════════════════════════════════
  const prodData = React.useMemo(()=>{
    if(!user) return {memberStats:[],actStats:[],teamStats:[],totalLogged:0,reactOrgPct:0,incidentOrgPct:0,flaggedMembers:0,flaggedActs:0,avgTeamScore:0,heatMap:[],heatDays:[],heatDates:[],scopeActs:[],scopeLogs:[],scopeMembers:[]};
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
    const teamStats = teams.filter(t=> isAdmin || t.name===(user?.team)).map(t=>{
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
      const col = score>=75?"#16a34a":score>=55?"#f59e0b":"#dc2626";
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={{flexShrink:0}}>
          <circle cx={c} cy={c} r={r} fill="none" stroke="var(--surface-3)" strokeWidth="10"/>
          <circle cx={c} cy={c} r={r} fill="none" stroke={col} strokeWidth="10"
            strokeDasharray={circ} strokeDashoffset={circ*(1-score/100)}
            strokeLinecap="round" transform="rotate(-90 50 50)"/>
          <text x={c} y={c-4} textAnchor="middle" fontSize="18" fontWeight="800" fill={col}>{score}</text>
          <text x={c} y={c+12} textAnchor="middle" fontSize="8" fill="var(--text-4)">/100</text>
        </svg>
      );
    };

    return (
      <div>
        <div style={{marginBottom:20}}>
          <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px"}}>🚀 Productivity Overview</div>
          <div style={{fontSize:12,color:"var(--text-3)",marginTop:3}}>
            {isAdmin?"Org-wide":"Your team"} health, efficiency and risk indicators · March 2025
          </div>
        </div>

        {/* Top KPI strip */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12,marginBottom:18}}>
          {[
            {icon:"🎯",label:"Avg Team Score",   val:`${avgTeamScore}`,  sub:"out of 100",           c:avgTeamScore>=75?"#059669":avgTeamScore>=55?"#d97706":"#dc2626", bg:avgTeamScore>=75?"#f0fdf4":avgTeamScore>=55?"#fffbeb":"#fef2f2", nav:"prod_flags"},
            {icon:"⚡",label:"Proactive Work",   val:`${proactPct}%`,    sub:"of all logged time",   c:"#059669",bg:"#f0fdf4",                                          nav:"prod_heatmap"},
            {icon:"🔴",label:"Reactive Work",    val:`${reactOrgPct}%`,  sub:"target <30%",          c:reactOrgPct>50?"#dc2626":reactOrgPct>30?"#d97706":"#059669",     bg:reactOrgPct>50?"#fef2f2":reactOrgPct>30?"#fffbeb":"#f0fdf4", nav:"prod_flags"},
            {icon:"🚨",label:"Incident Time",    val:`${incidentOrgPct}%`,sub:"of total hours",      c:incidentOrgPct>30?"#dc2626":"var(--text-3)",bg:incidentOrgPct>30?"#fef2f2":"var(--surface-2)", nav:"prod_flags"},
            {icon:"🚩",label:"Flagged Items",    val:`${flaggedMembers+flaggedActs}`, sub:`${flaggedMembers} members · ${flaggedActs} acts`, c:"#ea580c",bg:"#fff7ed", nav:"prod_flags"},
            {icon:"💤",label:"Idle Members",     val:memberStats.filter(m=>m.isIdle).length, sub:"<50% utilised",  c:"#7c3aed",bg:"#f5f3ff",                           nav:"prod_flags"},
          ].map(s=>(
            <Card key={s.label} onClick={()=>goPage(s.nav)} className="kpi-card" style={{padding:"16px 18px",cursor:"pointer",transition:"all .22s cubic-bezier(.22,1,.36,1)",borderTop:`3px solid ${s.c}`}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="var(--shadow-lg)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div style={{width:30,height:30,borderRadius:"var(--radius-sm)",background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{s.icon}</div>
                <span style={{fontSize:9,color:"var(--text-4)",background:"var(--surface-3)",padding:"2px 6px",borderRadius:"var(--radius-md)"}}>↗</span>
              </div>
              <div style={{fontSize:9,fontWeight:700,color:"var(--text-4)",textTransform:"uppercase",letterSpacing:1,fontFamily:"var(--font-mono)"}}>{s.label}</div>
              <div style={{fontSize:22,fontWeight:800,color:s.c,lineHeight:1.1,marginTop:2}}>{s.val}</div>
              <div style={{fontSize:10.5,color:"var(--text-4)",marginTop:4}}>{s.sub}</div>
            </Card>
          ))}
        </div>

        {/* Row 1: Team scorecards + Reactive vs Proactive */}
        <div style={{display:"grid",gridTemplateColumns:"1.6fr 1fr",gap:14,marginBottom:14}}>
          <Card>
            <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",fontFamily:"var(--font-sans)",letterSpacing:-.3,marginBottom:4}}>Team Productivity Scores</div>
            <div style={{fontSize:11,color:"var(--text-3)",marginBottom:14}}>Composite score based on reactive ratio, incidents, blocked & stale activities</div>
            {teamStats.map(t=>{
              const col=t.score>=75?"#059669":t.score>=55?"#d97706":"#dc2626";
              const bg =t.score>=75?"#f0fdf4":t.score>=55?"#fffbeb":"#fef2f2";
              return (
                <div key={t.name} onClick={()=>goPage("prod_flags")} style={{display:"flex",alignItems:"center",gap:12,marginBottom:12,padding:"10px 12px",borderRadius:"var(--radius-md)",background:bg,border:`1px solid ${col}30`,cursor:"pointer",transition:"all .12s"}}
                  onMouseEnter={e=>e.currentTarget.style.boxShadow=`0 3px 12px ${col}25`}
                  onMouseLeave={e=>{e.currentTarget.style.boxShadow="";e.currentTarget.style.transform="";}}>
                  <span style={{fontSize:22,flexShrink:0}}>{t.emoji}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{fontWeight:700,fontSize:13}}>{t.name}</span>
                      <span style={{fontSize:11,color:"var(--text-3)"}}>{t.reactPct}% reactive · {t.blockedActs} blocked · {t.staleActs} stale</span>
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
            <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",fontFamily:"var(--font-sans)",letterSpacing:-.3,marginBottom:4}}>Work Nature Split</div>
            <div style={{fontSize:11,color:"var(--text-3)",marginBottom:16}}>Proactive vs Reactive time distribution</div>
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
                      <text x={cx} y={cy-5} textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--text-1)">{proactPct}%</text>
                      <text x={cx} y={cy+9} textAnchor="middle" fontSize="7.5" fill="var(--text-3)">Proactive</text>
                    </svg>
                  </div>
                  <div style={{width:"100%"}}>
                    {[["🟢 Proactive",proactPct,"#059669","#f0fdf4"],["🔴 Reactive",reactOrgPct,"#dc2626","#fef2f2"]].map(([l,v,c,bg])=>(
                      <div key={l} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,padding:"8px 10px",borderRadius:"var(--radius-sm)",background:bg}}>
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
              <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",fontFamily:"var(--font-sans)",letterSpacing:-.3}}>Member Utilisation League</div>
              <div style={{fontSize:11,color:"var(--text-3)"}}>Logged hours vs net capacity · click a member to drill in</div>
            </div>
            <Btn sm v="sec" onClick={()=>goPage("prod_flags")}>View Flags →</Btn>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"var(--font-sans)"}}>
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
                  if(m.isStale)         flags.push({t:"No logs 3d+",c:"var(--text-3)",bg:"#f1f5f9"});
                  const col=tCol(m.team);
                  return (
                    <tr key={m.id} onClick={()=>setDashDrill({type:"logs",label:`${m.name} — All Time Entries`,data:logs.filter(l=>l.userId===m.id)})}
                      style={{cursor:"pointer",background:i%2===0?"#fff":"var(--surface-2)",borderBottom:"1px solid var(--surface-3)"}}
                      onMouseEnter={e=>e.currentTarget.style.background="#eff6ff"}
                      onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"#fff":"var(--surface-2)"}>
                      <TD>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <div style={{width:26,height:26,borderRadius:"var(--radius-sm)",background:`${col}16`,color:col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,flexShrink:0}}>{m.name.split(" ").map(n=>n[0]).join("")}</div>
                          <span style={{fontWeight:700}}>{m.name}</span>
                        </div>
                      </TD>
                      <TD><TPill t={m.team}/></TD>
                      <TD><span style={{fontWeight:700,color:"var(--brand)"}}>{fmtM(m.total)}</span></TD>
                      <TD>
                        <div style={{display:"flex",alignItems:"center",gap:7}}>
                          <div style={{width:60,height:6,background:"var(--surface-3)",borderRadius:3,overflow:"hidden"}}>
                            <div style={{height:"100%",width:`${Math.min(100,m.utilPct)}%`,background:m.isOverloaded?"#dc2626":m.isIdle?"var(--text-4)":"#059669",borderRadius:3}}/>
                          </div>
                          <span style={{fontWeight:700,color:m.isOverloaded?"#dc2626":m.isIdle?"var(--text-4)":"#059669",fontSize:12}}>{m.utilPct}%</span>
                        </div>
                      </TD>
                      <TD s={{color:"#059669",fontWeight:600}}>{fmtM(m.proactMin)}</TD>
                      <TD s={{color:m.reactPct>60?"#dc2626":"var(--text-2)",fontWeight:m.reactPct>60?700:400}}>{fmtM(m.reactMin)} <span style={{fontSize:10,color:"var(--text-4)"}}>({m.reactPct}%)</span></TD>
                      <TD s={{color:m.incidentPct>40?"#dc2626":"var(--text-2)"}}>{m.incidentPct}%</TD>
                      <TD s={{textAlign:"center"}}>{m.entries}</TD>
                      <TD s={{fontSize:11,color:m.isStale?"#dc2626":"var(--text-3)"}}>{m.lastLog||"never"}{m.isStale&&" ⚠️"}</TD>
                      <TD>
                        {flags.length===0
                          ? <span style={{fontSize:11,color:"#059669",fontWeight:600}}>✅ Good</span>
                          : <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                              {flags.map(f=><span key={f.t} style={{fontSize:10,background:f.bg,color:f.c,padding:"2px 7px",borderRadius:"var(--radius-md)",fontWeight:700}}>{f.t}</span>)}
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
              <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",fontFamily:"var(--font-sans)",letterSpacing:-.3}}>Activity Health</div>
              <div style={{fontSize:11,color:"var(--text-3)"}}>Over-estimate, stale and blocked activities</div>
            </div>
            <Btn sm v="sec" onClick={()=>goPage("prod_flags")}>All Flags →</Btn>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
            {[
              {label:"Over Estimate",icon:"📈",items:prodData.actStats.filter(a=>a.isOverEst),col:"#dc2626",bg:"#fef2f2",desc:"Logged time exceeds estimate"},
              {label:"Stale (no update 4d+)",icon:"💤",items:prodData.actStats.filter(a=>a.isStale),col:"#d97706",bg:"#fffbeb",desc:"Active but no log entries recently"},
              {label:"Blocked",icon:"🚧",items:prodData.actStats.filter(a=>a.isBlocked),col:"#7c3aed",bg:"#f5f3ff",desc:"Waiting on dependency or escalation"},
            ].map(g=>(
              <div key={g.label} style={{background:g.bg,borderRadius:"var(--radius-md)",padding:12,border:`1px solid ${g.col}20`}}>
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:10}}>
                  <span style={{fontSize:16}}>{g.icon}</span>
                  <div>
                    <div style={{fontWeight:700,fontSize:12,color:g.col}}>{g.label}</div>
                    <div style={{fontSize:10,color:"var(--text-4)"}}>{g.desc}</div>
                  </div>
                  <span style={{marginLeft:"auto",fontSize:20,fontWeight:800,color:g.col}}>{g.items.length}</span>
                </div>
                {g.items.slice(0,4).map(a=>(
                  <div key={a.id} onClick={()=>setDashDrill({type:"acts",label:g.label,data:g.items})}
                    style={{fontSize:11,color:"var(--text-2)",padding:"5px 8px",background:"rgba(255,255,255,.7)",borderRadius:6,marginBottom:4,cursor:"pointer",fontWeight:600,display:"flex",justifyContent:"space-between"}}
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
          <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px"}}>🚩 Flags & Risks</div>
          <div style={{fontSize:12,color:"var(--text-3)",marginTop:3}}>Members and activities needing attention · click any row for details</div>
        </div>

        {/* Summary ribbon */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:16}}>
          {[
            {label:"Idle Members",      val:memberStats.filter(m=>m.isIdle).length,          icon:"💤",c:"#7c3aed",bg:"#f5f3ff",risk:"Medium"},
            {label:"Overloaded",        val:memberStats.filter(m=>m.isOverloaded).length,     icon:"🔥",c:"#dc2626",bg:"#fef2f2",risk:"High"},
            {label:"Reactive Heavy",    val:memberStats.filter(m=>m.isReactiveHeavy).length,  icon:"🔴",c:"#ea580c",bg:"#fff7ed",risk:"High"},
            {label:"Stale Activities",  val:actStats.filter(a=>a.isStale).length,             icon:"💤",c:"#d97706",bg:"#fffbeb",risk:"Medium"},
            {label:"Blocked Activities",val:actStats.filter(a=>a.isBlocked).length,           icon:"🚧",c:"var(--text-3)",bg:"var(--surface-2)",risk:"Low"},
          ].map(s=>(
            <Card key={s.label} style={{padding:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                <span style={{fontSize:18}}>{s.icon}</span>
                <span style={{fontSize:10,background:riskBg(s.risk),color:riskColor(s.risk),padding:"2px 7px",borderRadius:"var(--radius-md)",fontWeight:700}}>{s.risk}</span>
              </div>
              <div style={{fontSize:22,fontWeight:800,color:s.c}}>{s.val}</div>
              <div style={{fontSize:10,color:"var(--text-3)",marginTop:2}}>{s.label}</div>
            </Card>
          ))}
        </div>

        <Tabs tabs={[{id:"members",label:`🧑 Members (${flaggedMem.length})`},{id:"activities",label:`📋 Activities (${flaggedAct.length})`}]}
          active={tab} onChange={setTab}/>

        {tab==="members" && (
          <Card style={{padding:0,overflow:"hidden",marginTop:14}}>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"var(--font-sans)"}}>
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
                          <tr key={m.id} className="row-hover" style={{cursor:"pointer",background:i%2===0?"#fff":"var(--surface-2)",borderBottom:"1px solid var(--surface-3)"}}
                            onClick={()=>setDashDrill({type:"logs",label:`${m.name} — Time Entries`,data:logs.filter(l=>l.userId===m.id)})}
                            onMouseEnter={e=>e.currentTarget.style.background="#fffbeb"}
                            onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"#fff":"var(--surface-2)"}>
                            <TD><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:26,height:26,borderRadius:"var(--radius-sm)",background:`${tCol(m.team)}22`,color:tCol(m.team),display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800}}>{m.name.split(" ").map(n=>n[0]).join("")}</div><strong>{m.name}</strong></div></TD>
                            <TD><TPill t={m.team}/></TD>
                            <TD><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{issues.map(iss=><span key={iss} style={{fontSize:10,background:"#fff7ed",color:"#c2410c",padding:"2px 6px",borderRadius:"var(--radius-sm)",fontWeight:600}}>{iss}</span>)}</div></TD>
                            <TD><span style={{fontWeight:700,color:m.isOverloaded?"#dc2626":m.isIdle?"var(--text-4)":"var(--text-2)"}}>{m.utilPct}%</span></TD>
                            <TD><span style={{fontWeight:700,color:m.isReactiveHeavy?"#dc2626":"var(--text-2)"}}>{m.reactPct}%</span></TD>
                            <TD><span style={{fontWeight:700,color:m.isIncidentHeavy?"#dc2626":"var(--text-2)"}}>{m.incidentPct}%</span></TD>
                            <TD s={{color:"var(--brand)",fontWeight:700}}>{fmtM(m.total)}</TD>
                            <TD s={{fontSize:11,color:m.isStale?"#dc2626":"var(--text-3)"}}>{m.lastLog||"never"}</TD>
                            <TD><span style={{fontSize:11,background:riskBg(risk),color:riskColor(risk),padding:"3px 9px",borderRadius:"var(--radius-md)",fontWeight:700}}>{risk}</span></TD>
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
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"var(--font-sans)"}}>
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
                          <tr key={a.id} className="row-hover" style={{cursor:"pointer",background:i%2===0?"#fff":"var(--surface-2)",borderBottom:"1px solid var(--surface-3)"}}
                            onClick={()=>setDashDrill({type:"logs",label:`${a.name} — Entries`,data:logs.filter(l=>l.actId===a.id)})}
                            onMouseEnter={e=>e.currentTarget.style.background="#fffbeb"}
                            onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"#fff":"var(--surface-2)"}>
                            <TD><div style={{fontWeight:700,fontSize:12}}>{a.name}</div><div style={{fontSize:10,color:"var(--text-4)"}}>{a.ticketNo||a.jira}</div></TD>
                            <TD><TPill t={a.team}/></TD>
                            <TD><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{issues.map(iss=><span key={iss} style={{fontSize:10,background:"#fff7ed",color:"#c2410c",padding:"2px 6px",borderRadius:"var(--radius-sm)",fontWeight:600}}>{iss}</span>)}</div></TD>
                            <TD><SPill s={a.status}/></TD>
                            <TD s={{fontWeight:600}}>{fmtM(a.estMins)}</TD>
                            <TD s={{color:"var(--brand)",fontWeight:700}}>{fmtM(a.logged)}</TD>
                            <TD><span style={{fontWeight:700,color:a.pct>100?"#dc2626":a.pct>75?"#d97706":"var(--text-2)"}}>{a.pct}%</span></TD>
                            <TD s={{fontSize:11,color:a.isStale?"#dc2626":"var(--text-3)"}}>{a.isStale?`${a.daysStale}d ago`:"recent"}</TD>
                            <TD><span style={{fontSize:11,background:riskBg(risk),color:riskColor(risk),padding:"3px 9px",borderRadius:"var(--radius-md)",fontWeight:700}}>{risk}</span></TD>
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
      return "var(--brand-light)";
    };

    return (
      <div>
        <div style={{marginBottom:18}}>
          <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px"}}>🔥 Effort Heatmap</div>
          <div style={{fontSize:12,color:"var(--text-3)",marginTop:3}}>Daily effort distribution across members and activities · Mar 3–14</div>
        </div>

        <Tabs tabs={[{id:"heatmap",label:"👤 Member × Day"},{id:"actmap",label:"📋 Activity × Day"}]} active={view} onChange={setView}/>

        {view==="heatmap" && (
          <Card style={{marginTop:14,padding:0,overflow:"hidden"}}>
            <div style={{padding:"14px 18px 10px",borderBottom:"1px solid var(--surface-3)"}}>
              <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",fontFamily:"var(--font-sans)",letterSpacing:-.3}}>Member Daily Effort</div>
              <div style={{fontSize:11,color:"var(--text-3)",marginTop:2}}>Each cell = minutes logged that day. Click a cell to see entries.</div>
              {/* Legend */}
              <div style={{display:"flex",alignItems:"center",gap:6,marginTop:8}}>
                <span style={{fontSize:10,color:"var(--text-4)"}}>Less</span>
                {["#f8fafc","var(--brand-light)","#93c5fd","#60a5fa","#3b82f6","#1e40af"].map(c=>(
                  <div key={c} style={{width:18,height:18,borderRadius:3,background:c,border:"1px solid #e5e7eb"}}/>
                ))}
                <span style={{fontSize:10,color:"var(--text-4)"}}>More</span>
              </div>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{borderCollapse:"collapse",fontSize:12,minWidth:700}}>
                <thead>
                  <tr>
                    <th style={{padding:"8px 14px",textAlign:"left",fontSize:11,fontWeight:700,color:"var(--text-3)",background:"var(--surface-2)",position:"sticky",left:0,zIndex:5,minWidth:140,borderBottom:"1px solid var(--border)"}}>Member</th>
                    {heatDays.map(d=><th key={d} style={{padding:"8px 8px",textAlign:"center",fontSize:10,fontWeight:700,color:"var(--text-3)",background:"var(--surface-2)",whiteSpace:"nowrap",borderBottom:"1px solid var(--border)"}}>{d}</th>)}
                    <th style={{padding:"8px 10px",textAlign:"right",fontSize:10,fontWeight:700,color:"var(--text-3)",background:"var(--surface-2)",borderBottom:"1px solid var(--border)"}}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {heatMap.map((row,ri)=>{
                    const total = row.cells.reduce((s,c)=>s+c.mins,0);
                    const mStat = memberStats.find(m=>m.id===row.member.id);
                    return (
                      <tr key={row.member.id} style={{borderBottom:"1px solid var(--surface-3)"}}>
                        <td style={{padding:"6px 14px",position:"sticky",left:0,background:ri%2===0?"#fff":"var(--surface-2)",zIndex:2}}>
                          <div style={{display:"flex",alignItems:"center",gap:7}}>
                            <div style={{width:24,height:24,borderRadius:"var(--radius-sm)",background:`${tCol(row.member.team)}22`,color:tCol(row.member.team),display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,flexShrink:0}}>{row.member.name.split(" ").map(n=>n[0]).join("")}</div>
                            <div>
                              <div style={{fontWeight:700,color:"var(--text-1)",fontSize:12}}>{row.member.name.split(" ")[0]}</div>
                              <div style={{fontSize:9,color:"var(--text-4)"}}>{row.member.team}</div>
                            </div>
                            {mStat?.isIdle && <span style={{fontSize:9,background:"#f0ebff",color:"#7c3aed",padding:"1px 5px",borderRadius:"var(--radius-sm)",fontWeight:700}}>Idle</span>}
                          </div>
                        </td>
                        {row.cells.map(cell=>(
                          <td key={cell.date} onClick={()=>cell.mins>0&&setDashDrill({type:"logs",label:`${row.member.name} · ${cell.date}`,data:logs.filter(l=>l.userId===row.member.id&&l.date===cell.date)})}
                            style={{padding:"4px 6px",textAlign:"center",cursor:cell.mins>0?"pointer":"default",background:ri%2===0?"#fff":"var(--surface-2)"}}>
                            <div style={{width:42,height:38,borderRadius:6,background:heatCol(cell.mins),display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",margin:"auto",border:"1px solid rgba(255,255,255,.4)",transition:"transform .15s,box-shadow .15s"}}
                              onMouseEnter={e=>{if(cell.mins>0){e.currentTarget.style.transform="scale(1.18)";e.currentTarget.style.boxShadow="0 4px 12px rgba(59,130,246,.4)";}}}
                              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
                              {cell.mins>0 && <>
                                <div style={{fontSize:10,fontWeight:800,color:cell.mins/maxCell>.4?"#fff":"#1e40af"}}>{Math.round(cell.mins/60)}h</div>
                                <div style={{fontSize:7,color:cell.mins/maxCell>.4?"rgba(255,255,255,.8)":"var(--text-3)"}}>{cell.mins}m</div>
                              </>}
                            </div>
                          </td>
                        ))}
                        <td style={{padding:"6px 10px",textAlign:"right",background:ri%2===0?"#fff":"var(--surface-2)"}}>
                          <span style={{fontWeight:700,color:"var(--brand)",fontSize:13}}>{fmtM(total)}</span>
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
            <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",fontFamily:"var(--font-sans)",letterSpacing:-.3,marginBottom:4}}>Activity Effort Distribution</div>
            <div style={{fontSize:11,color:"var(--text-3)",marginBottom:14}}>Hours logged per activity over the last 10 working days · click bar for entries</div>
            {[...actStats].filter(a=>a.logged>0).sort((a,b)=>b.logged-a.logged).slice(0,12).map(a=>{
              const maxH = Math.max(...actStats.map(x=>x.logged),1);
              const col = tCol(a.team);
              return (
                <div key={a.id} onClick={()=>setDashDrill({type:"logs",label:`${a.name} — Entries`,data:logs.filter(l=>l.actId===a.id)})}
                  style={{display:"flex",alignItems:"center",gap:10,marginBottom:9,cursor:"pointer",padding:"4px 6px",borderRadius:7,transition:"background .1s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#f0f9ff"}
                  onMouseLeave={e=>e.currentTarget.style.background=""}>
                  <div style={{minWidth:170,fontSize:12}}>
                    <div style={{fontWeight:700,color:"var(--text-1)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:165}}>{a.name}</div>
                    <div style={{fontSize:10,color:"var(--text-4)"}}>{a.ticketNo||a.jira} · {a.team}</div>
                  </div>
                  <div style={{flex:1,height:16,background:"var(--surface-3)",borderRadius:4,overflow:"hidden",position:"relative"}}>
                    <div style={{height:"100%",width:`${Math.round(a.logged/maxH*100)}%`,background:`linear-gradient(90deg,${col},${col}99)`,borderRadius:4}}/>
                    {a.isOverEst && <div style={{position:"absolute",right:4,top:"50%",transform:"translateY(-50%)",fontSize:9,fontWeight:700,color:"#dc2626"}}>OVER</div>}
                  </div>
                  <div style={{minWidth:60,textAlign:"right",fontWeight:700,color:a.isOverEst?"#dc2626":"var(--brand)",fontSize:13}}>{fmtM(a.logged)}</div>
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
    const riskColor = (p) => p==="Critical"?"#dc2626":p==="High"?"#ea580c":p==="Medium"?"#d97706":"var(--text-3)";
    const riskBg    = (p) => p==="Critical"?"#fef2f2":p==="High"?"#fff7ed":p==="Medium"?"#fffbeb":"var(--surface-2)";

    return (
      <div>
        <div style={{marginBottom:18}}>
          <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px"}}>💡 Suggestions & Actions</div>
          <div style={{fontSize:12,color:"var(--text-3)",marginTop:3}}>AI-generated recommendations based on your live data · ITIL & DORA aligned</div>
        </div>

        {/* Stats bar */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18}}>
          {["Critical","High","Medium","Low"].map(p=>{
            const cnt = sorted.filter(s=>s.priority===p).length;
            return (
              <Card key={p} style={{padding:12,borderLeft:`4px solid ${riskColor(p)}`}}>
                <div style={{fontSize:10,fontWeight:700,color:riskColor(p),textTransform:"uppercase",letterSpacing:.8}}>{p}</div>
                <div style={{fontSize:28,fontWeight:800,color:riskColor(p),lineHeight:1.1}}>{cnt}</div>
                <div style={{fontSize:10,color:"var(--text-4)"}}>suggestion{cnt!==1?"s":""}</div>
              </Card>
            );
          })}
        </div>

        {sorted.length===0
          ? <Card style={{textAlign:"center",padding:60}}>
              <div style={{fontSize:40,marginBottom:12}}>🏆</div>
              <div style={{fontSize:18,fontWeight:800,color:"#059669"}}>All Good!</div>
              <div style={{fontSize:13,color:"var(--text-3)",marginTop:6}}>No productivity flags detected. Keep up the great work!</div>
            </Card>
          : sorted.map(s=>(
            <div key={s.id} style={{marginBottom:12}}>
              <div onClick={()=>setExpandedId(expandedId===s.id?null:s.id)}
                style={{background:"var(--surface)",border:`1px solid ${riskColor(s.priority)}25`,borderLeft:`4px solid ${riskColor(s.priority)}`,borderRadius:12,padding:"15px 20px",cursor:"pointer",transition:"all .18s",display:"flex",alignItems:"flex-start",gap:14,boxShadow:"0 1px 3px rgba(15,23,42,.04)"}}
                onMouseEnter={e=>e.currentTarget.style.boxShadow=`0 4px 16px ${riskColor(s.priority)}20`}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow="";e.currentTarget.style.transform="";}}>
                <span style={{fontSize:22,flexShrink:0,marginTop:1}}>{s.icon}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4,flexWrap:"wrap"}}>
                    <span style={{fontWeight:800,fontSize:14,color:"var(--text-1)"}}>{s.title}</span>
                    <span style={{fontSize:11,background:riskBg(s.priority),color:riskColor(s.priority),padding:"2px 9px",borderRadius:"var(--radius-md)",fontWeight:700,flexShrink:0}}>{s.priority}</span>
                    <span style={{fontSize:11,background:"var(--surface-3)",color:"var(--text-3)",padding:"2px 8px",borderRadius:"var(--radius-md)",flexShrink:0}}>{s.category}</span>
                  </div>
                  <div style={{fontSize:12,color:"var(--text-3)",lineHeight:1.5}}>{s.detail}</div>
                  {expandedId===s.id && (
                    <div style={{marginTop:12,padding:"12px 14px",background:riskBg(s.priority),borderRadius:"var(--radius-sm)"}}>
                      <div style={{fontSize:11,fontWeight:700,color:riskColor(s.priority),marginBottom:6}}>📌 Recommended Action</div>
                      <div style={{fontSize:12,color:"var(--text-2)",lineHeight:1.6,marginBottom:10}}>{s.action}</div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                        <div style={{fontSize:11,color:"var(--text-3)",background:"var(--surface)",padding:"4px 10px",borderRadius:7,border:"1px solid #e5e7eb"}}>
                          📊 <strong>KPI Target:</strong> {s.kpi}
                        </div>
                        <button onClick={e=>{e.stopPropagation();goPage(s.nav);}}
                          style={{padding:"6px 16px",borderRadius:"var(--radius-sm)",background:riskColor(s.priority),color:"#fff",border:"none",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                          View Data →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <span style={{fontSize:14,color:"var(--text-4)",flexShrink:0,marginTop:2}}>{expandedId===s.id?"▲":"▼"}</span>
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
            Object.entries(matchers).forEach(([k,regex])=>{ if(!autoMap[k]&&regex.test(h)) autoMap[k]=h; });
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
          <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px"}}>📤 Upload Tickets</div>
          <div style={{fontSize:12,color:"var(--text-3)",marginTop:3}}>
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
            <div key={s.n} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--radius-md)",padding:"14px 16px",display:"flex",gap:12,alignItems:"flex-start"}}>
              <div style={{width:30,height:30,borderRadius:"50%",background:"linear-gradient(135deg,#1a56db,#0ea5e9)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:13,flexShrink:0,boxShadow:"0 2px 8px rgba(37,99,235,.3)"}}>{s.n}</div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:"var(--text-1)",marginBottom:3}}>{s.icon} {s.title}</div>
                <div style={{fontSize:11,color:"var(--text-3)",lineHeight:1.5}}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── STEP 1: Drop zone ── */}
        {(uploadState==="idle"||uploadState==="error") && (
          <Card style={{marginBottom:16}}>
            <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",fontFamily:"var(--font-sans)",letterSpacing:-.3,marginBottom:14}}>Step 1 — Select or Drop File</div>
            <div onDragOver={e=>{e.preventDefault();setDragOver(true);}} onDragLeave={()=>setDragOver(false)}
              onDrop={e=>{e.preventDefault();setDragOver(false);const f=e.dataTransfer.files[0];if(f)handleFile(f);}}
              onClick={()=>fileRef.current.click()}
              style={{border:`2px dashed ${dragOver?"var(--brand)":"#d4dde8"}`,borderRadius:"var(--radius-lg)",padding:"52px 24px",
                textAlign:"center",cursor:"pointer",background:dragOver?"#eff6ff":"var(--surface-2)",transition:"all .2s"}}>
              <div style={{fontSize:40,marginBottom:12}}>📂</div>
              <div style={{fontSize:15,fontWeight:700,color:"var(--text-1)",fontFamily:"var(--font-sans)",letterSpacing:-.3,marginBottom:6}}>Drop your CSV / TSV file here</div>
              <div style={{fontSize:12,color:"var(--text-3)",marginBottom:14}}>or click to browse · Excel exports saved as CSV work perfectly</div>
              <button style={{padding:"8px 22px",borderRadius:"var(--radius-sm)",background:"var(--brand)",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>Browse File</button>
              <input ref={fileRef} type="file" accept=".csv,.tsv,.txt" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>
            </div>
            {uploadState==="error" && <InfoBanner color="#991b1b" bg="#fef2f2" border="#fca5a5" icon="❌" style={{marginTop:12}}>Could not parse file. Ensure it is saved as CSV (comma or tab separated).</InfoBanner>}

            {/* Supported tools */}
            <div style={{marginTop:20}}>
              <div style={{fontSize:11,fontWeight:700,color:"var(--text-4)",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Supported Export Formats</div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                {[
                  {name:"JIRA",              color:"#0052cc",hint:"Issues → Export Excel CSV"},
                  {name:"Power BI",           color:"#f2c811",hint:"Dataset export / push API"},
                  {name:"HP Service Manager", color:"#1d6fa4",hint:"Reports → Incident/Change CSV"},
                  {name:"OpenText SMAX",      color:"#6d28d9",hint:"Reports → Export CSV"},
                  {name:"Any CSV / TSV",      color:"var(--text-3)",hint:"Any comma/tab delimited file"},
                ].map(t=>(
                  <div key={t.name} style={{display:"flex",alignItems:"center",gap:7,background:"var(--surface-2)",border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",padding:"6px 12px"}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:t.color,flexShrink:0}}/>
                    <div>
                      <div style={{fontSize:12,fontWeight:700,color:"var(--text-2)"}}>{t.name}</div>
                      <div style={{fontSize:10,color:"var(--text-4)"}}>{t.hint}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Field reference */}
            <div style={{marginTop:20}}>
              <div style={{fontSize:11,fontWeight:700,color:"var(--text-4)",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Expected Fields (auto-detected from headers)</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:7}}>
                {FIELD_DEFS.map(f=>(
                  <div key={f.key} style={{display:"flex",gap:8,alignItems:"flex-start",padding:"7px 10px",background:"var(--surface-2)",borderRadius:7,border:"1px solid #e5e7eb"}}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:f.required?"var(--brand)":"var(--text-4)",marginTop:5,flexShrink:0}}/>
                    <div>
                      <div style={{fontSize:12,fontWeight:700,color:f.required?"#0f172a":"var(--text-3)"}}>{f.label}{f.required&&<span style={{color:"#dc2626"}}> *</span>}</div>
                      <div style={{fontSize:10,color:"var(--text-4)"}}>{f.hint}</div>
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
            <div style={{fontSize:15,fontWeight:700,color:"var(--text-1)",fontFamily:"var(--font-sans)",letterSpacing:-.3}}>Parsing {fileName}…</div>
            <div style={{fontSize:12,color:"var(--text-3)",marginTop:6}}>Detecting headers and auto-mapping fields</div>
          </Card>
        )}

        {/* ── STEP 2: Column mapping + preview ── */}
        {(uploadState==="preview"||uploadState==="importing") && (
          <>
            <Card style={{marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <div>
                  <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",fontFamily:"var(--font-sans)",letterSpacing:-.3}}>Step 2 — Map Columns</div>
                  <div style={{fontSize:11,color:"var(--text-3)",marginTop:2}}>{rawRows.length} rows in <strong>{fileName}</strong> · {columns.length} columns detected · Review auto-mapping below</div>
                </div>
                <button onClick={()=>{setUploadState("idle");setRawRows([]);setMappings({});}}
                  style={{padding:"6px 14px",borderRadius:"var(--radius-sm)",background:"var(--surface)",border:"1px solid var(--border-2)",color:"var(--text-2)",fontSize:12,fontWeight:600,cursor:"pointer"}}>← Change File</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:10}}>
                {FIELD_DEFS.map(f=>(
                  <div key={f.key} style={{background:mappings[f.key]?"#f0fdf4":"var(--surface-2)",border:`1px solid ${mappings[f.key]?"#86efac":"var(--border)"}`,borderRadius:"var(--radius-sm)",padding:"10px 12px"}}>
                    <div style={{fontSize:11,fontWeight:700,color:mappings[f.key]?"#166534":"var(--text-3)",marginBottom:5}}>
                      {f.label}{f.required&&<span style={{color:"#dc2626"}}> *</span>}
                      {mappings[f.key]&&<span style={{fontWeight:400,color:"#4ade80",marginLeft:6}}>✓ mapped</span>}
                    </div>
                    <select value={mappings[f.key]||""} onChange={e=>setMappings(p=>({...p,[f.key]:e.target.value||undefined}))}
                      style={{width:"100%",padding:"5px 8px",borderRadius:6,border:"1px solid var(--border-2)",fontSize:12,background:"var(--surface)"}}>
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
                <div style={{padding:"12px 18px",borderBottom:"1px solid var(--surface-3)"}}>
                  <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",fontFamily:"var(--font-sans)",letterSpacing:-.3}}>Step 3 — Preview (first 8 rows)</div>
                  <div style={{fontSize:11,color:"var(--text-3)",marginTop:2}}>Verify mapping is correct before importing</div>
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
                          <tr key={i} style={{background:i%2===0?"#fff":"var(--surface-2)",borderBottom:"1px solid var(--surface-3)"}}>
                            <TD s={{color:"var(--text-4)",fontSize:11}}>{r._rowNum}</TD>
                            <TD><code style={{background:"var(--surface-3)",padding:"2px 6px",borderRadius:4,fontSize:11}}>{r.ticketNo||"—"}</code></TD>
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
                            <TD s={{color:"var(--brand)",fontWeight:700}}>{fmtM(r.mins)}</TD>
                            <TD s={{fontSize:11,color:"var(--text-3)"}}>{r.date}</TD>
                            <TD><span style={{fontSize:10,background:"var(--brand-light)",color:"var(--brand)",padding:"2px 7px",borderRadius:"var(--radius-sm)",fontWeight:600}}>{r.type}</span></TD>
                            <TD><NaturePill n={r.nature}/></TD>
                            <TD s={{fontSize:11,color:"var(--text-3)"}}>{r.cat}</TD>
                            <TD s={{fontSize:11,color:"var(--text-3)",maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.notes||"—"}</TD>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div style={{padding:"12px 18px",background:"var(--surface-2)",borderTop:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{fontSize:12,color:"var(--text-3)"}}>
                    Showing 8 of <strong>{rawRows.length}</strong> rows · Members not found in ISMS will be skipped
                  </div>
                  <button onClick={runImport} disabled={uploadState==="importing"}
                    style={{padding:"9px 28px",borderRadius:"var(--radius-md)",background:uploadState==="importing"?"var(--text-4)":"linear-gradient(135deg,#1a56db,#0891b2)",color:"#fff",border:"none",fontWeight:800,fontSize:14,cursor:uploadState==="importing"?"not-allowed":"pointer",boxShadow:"0 3px 10px rgba(26,86,219,.3)"}}>
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
              <div style={{fontSize:13,color:"var(--text-3)",marginBottom:24}}>Ticket data has been merged into ISMS — time logs and activities updated</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:24}}>
              {[
                {label:"Total Rows",   val:importResult.total,   icon:"📄",c:"var(--brand)",bg:"#eff6ff"},
                {label:"Acts Created", val:importResult.created,  icon:"✅",c:"#059669",bg:"#f0fdf4"},
                {label:"Acts Updated", val:importResult.updated,  icon:"🔄",c:"#06b6d4",bg:"#f0f9ff"},
                {label:"Skipped",      val:importResult.skipped,  icon:"⏭",c:"var(--text-4)",bg:"var(--surface-2)"},
              ].map(s=>(
                <div key={s.label} style={{background:s.bg,borderRadius:"var(--radius-md)",padding:"14px 16px",textAlign:"center"}}>
                  <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
                  <div style={{fontSize:26,fontWeight:800,color:s.c}}>{s.val}</div>
                  <div style={{fontSize:11,color:"var(--text-3)",marginTop:3}}>{s.label}</div>
                </div>
              ))}
            </div>
            {importResult.users.length>0 && (
              <div style={{marginBottom:20}}>
                <div style={{fontSize:12,fontWeight:700,color:"var(--text-2)",marginBottom:8}}>Members updated:</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {importResult.users.map(u=>{
                    const mu=allUsers.find(x=>x.name===u);
                    return <span key={u} style={{background:`${tCol(mu?.team||"Network")}20`,color:tCol(mu?.team||"Network"),padding:"4px 12px",borderRadius:"var(--radius-xl)",fontWeight:700,fontSize:12}}>{u}</span>;
                  })}
                </div>
              </div>
            )}
            <div style={{display:"flex",gap:10,justifyContent:"center"}}>
              <button onClick={()=>{setUploadState("idle");setRawRows([]);setMappings({});setImportResult(null);setFileName("");}}
                style={{padding:"9px 22px",borderRadius:"var(--radius-md)",background:"var(--surface)",border:"1px solid var(--border-2)",color:"var(--text-2)",fontWeight:700,fontSize:13,cursor:"pointer"}}>Upload Another File</button>
              <button onClick={()=>goPage("timelog")}
                style={{padding:"9px 22px",borderRadius:"var(--radius-md)",background:"linear-gradient(135deg,#2563eb,#06b6d4)",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>View Time Log →</button>
              <button onClick={()=>goPage("bandwidth")}
                style={{padding:"9px 22px",borderRadius:"var(--radius-md)",background:"#059669",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>View Bandwidth →</button>
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

    const statusBadge = {primary:{label:"Primary",c:"var(--brand)",bg:"#eff6ff"}, enterprise:{label:"Enterprise",c:"#7c3aed",bg:"#f5f3ff"}};

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
          <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px"}}>🔗 Integrations</div>
          <div style={{fontSize:12,color:"var(--text-3)",marginTop:3}}>
            Connect ISMS directly to your ticketing tools — data flows in automatically, no manual export needed
          </div>
        </div>

        <Tabs tabs={[{id:"catalog",label:"🗂 Integration Catalog"},{id:"configured",label:`⚙️ Configured (${Object.keys(connStatus).length})`},{id:"synclog",label:`📋 Sync Log (${syncLog.length})`}]} active={tab} onChange={setTab}/>

        {/* ── CATALOG TAB ── */}
        {tab==="catalog" && (
          <div style={{marginTop:16}}>
            {/* Architecture diagram banner */}
            <div style={{background:"linear-gradient(135deg,#0f172a 0%,#1a3a6e 70%,#0e4f8a 100%)",borderRadius:"var(--radius-lg)",padding:"22px 26px",marginBottom:18,color:"#fff",boxShadow:"0 8px 24px rgba(15,23,42,.2)"}}>
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
                    : <div key={i} style={{background:"rgba(255,255,255,.08)",borderRadius:"var(--radius-md)",padding:"8px 14px",textAlign:"center",flexShrink:0}}>
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
                  <div key={t.id} style={{background:"var(--surface)",border:`2px solid ${st==="connected"?"#86efac":st==="error"?"#fca5a5":"var(--border)"}`,borderRadius:12,padding:"18px 18px 14px",display:"flex",flexDirection:"column",gap:0,transition:"box-shadow .15s"}}
                    onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 8px 24px rgba(15,23,42,.1)";e.currentTarget.style.transform="translateY(-2px)";}}
                    onMouseLeave={e=>{e.currentTarget.style.boxShadow="";e.currentTarget.style.transform="";}}>
                    <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:10}}>
                      <div style={{width:44,height:44,borderRadius:"var(--radius-md)",background:t.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{t.logo}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                          <span style={{fontWeight:800,fontSize:15,color:"var(--text-1)"}}>{t.name}</span>
                          <span style={{fontSize:10,background:sb.bg,color:sb.c,padding:"2px 8px",borderRadius:"var(--radius-md)",fontWeight:700}}>{sb.label}</span>
                          {st==="connected" && <span style={{fontSize:10,background:"#d1fae5",color:"#166534",padding:"2px 8px",borderRadius:"var(--radius-md)",fontWeight:700}}>✅ Connected</span>}
                          {st==="error"     && <span style={{fontSize:10,background:"#fee2e2",color:"#991b1b",padding:"2px 8px",borderRadius:"var(--radius-md)",fontWeight:700}}>❌ Error</span>}
                        </div>
                        <div style={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)",marginTop:2}}>{t.vendor}</div>
                      </div>
                    </div>
                    <div style={{fontSize:12,color:"var(--text-3)",lineHeight:1.6,marginBottom:12,flex:1}}>{t.desc}</div>
                    <div style={{marginBottom:12}}>
                      {t.features.slice(0,4).map(f=>(
                        <div key={f} style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                          <span style={{color:"#059669",fontSize:11}}>✓</span>
                          <span style={{fontSize:11,color:"var(--text-2)"}}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>{setActiveInt(t.id);setTab("configured");}}
                        style={{flex:1,padding:"8px 0",borderRadius:"var(--radius-sm)",background:t.id==="powerbi"?`linear-gradient(135deg,#e8a000,#f2c811)`:`linear-gradient(135deg,${t.color},${t.color}cc)`,color:t.id==="powerbi"?"#0f172a":"#fff",border:"none",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                        {st==="connected"?"⚙️ Configure":"🔗 Connect"}
                      </button>
                      <a href={t.docs} target="_blank" rel="noreferrer"
                        style={{padding:"8px 12px",borderRadius:"var(--radius-sm)",background:"var(--surface-2)",border:"1px solid var(--border)",color:"var(--text-3)",fontWeight:600,fontSize:12,cursor:"pointer",textDecoration:"none"}}>
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
                    style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",borderRadius:"var(--radius-md)",border:`2px solid ${activeInt===t.id?t.color:"var(--border)"}`,background:activeInt===t.id?t.bg:"#fff",cursor:"pointer",transition:"all .15s",fontWeight:600,fontSize:13,color:activeInt===t.id?t.color:"var(--text-2)"}}>
                    <span style={{fontSize:16}}>{t.logo}</span>
                    <span style={{color:activeInt===t.id?t.color:"var(--text-2)"}}>{t.name}</span>
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
                    <div style={{width:40,height:40,borderRadius:"var(--radius-md)",background:curInt.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{curInt.logo}</div>
                    <div>
                      <div style={{fontWeight:800,fontSize:16,color:"var(--text-1)"}}>{curInt.name} Configuration</div>
                      <div style={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)"}}>{curInt.vendor}</div>
                    </div>
                    {connStatus[curInt.id]==="connected" && <span style={{marginLeft:"auto",background:"#d1fae5",color:"#166534",padding:"4px 12px",borderRadius:"var(--radius-md)",fontSize:12,fontWeight:700}}>✅ Connected</span>}
                    {connStatus[curInt.id]==="error"     && <span style={{marginLeft:"auto",background:"#fee2e2",color:"#991b1b",padding:"4px 12px",borderRadius:"var(--radius-md)",fontSize:12,fontWeight:700}}>❌ Auth Failed</span>}
                  </div>

                  <div style={{display:"grid",gap:12}}>
                    {curInt.fields.map(f=>(
                      <div key={f.key}>
                        <div style={{fontSize:12,fontWeight:700,color:"var(--text-2)",marginBottom:5}}>{f.label}{f.hint&&<span style={{fontWeight:400,color:"var(--text-4)",marginLeft:6}}>— {f.hint}</span>}</div>
                        {f.type==="select"
                          ? <select value={(configForm[curInt.id]||{})[f.key]||""}
                              onChange={e=>setConfigForm(p=>({...p,[curInt.id]:{...(p[curInt.id]||{}),[f.key]:e.target.value}}))}
                              style={{width:"100%",padding:"8px 10px",borderRadius:"var(--radius-sm)",border:"1px solid var(--border-2)",fontSize:13,background:"var(--surface)"}}>
                              <option value="">— Select —</option>
                              {f.opts.map(o=><option key={o} value={o}>{o}</option>)}
                            </select>
                          : <input type={f.type||"text"} placeholder={f.placeholder}
                              value={(configForm[curInt.id]||{})[f.key]||""}
                              onChange={e=>setConfigForm(p=>({...p,[curInt.id]:{...(p[curInt.id]||{}),[f.key]:e.target.value}}))}
                              style={{width:"100%",padding:"8px 10px",borderRadius:"var(--radius-sm)",border:"1px solid var(--border-2)",fontSize:13,boxSizing:"border-box",fontFamily:"inherit",background:f.type==="password"?"var(--surface-2)":"#fff"}}/>
                        }
                      </div>
                    ))}
                  </div>

                  <div style={{marginTop:18,display:"flex",gap:10}}>
                    <button onClick={()=>testConnection(curInt.id)} disabled={connStatus[curInt.id]==="testing"}
                      style={{flex:1,padding:"10px 0",borderRadius:"var(--radius-md)",background:connStatus[curInt.id]==="testing"?"var(--text-4)":`linear-gradient(135deg,${curInt.color},${curInt.color}cc)`,color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:connStatus[curInt.id]==="testing"?"not-allowed":"pointer"}}>
                      {connStatus[curInt.id]==="testing"?"⏳ Testing…":"🔌 Test & Connect"}
                    </button>
                    {connStatus[curInt.id]==="connected" && (
                      <button onClick={()=>{setSyncLog(p=>[{ts:new Date().toLocaleTimeString(),tool:curInt.name,status:"🔄 Manual sync started…",id:uid("SL")},...p]); setTimeout(()=>setSyncLog(p=>[{ts:new Date().toLocaleTimeString(),tool:curInt.name,status:"✅ Sync complete — 0 new tickets (demo mode)",id:uid("SL")},...p]),1200); setTab("synclog");}}
                        style={{padding:"10px 18px",borderRadius:"var(--radius-md)",background:"#059669",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                        🔄 Sync Now
                      </button>
                    )}
                  </div>
                </Card>

                {/* Features + field mapping guide */}
                <div>
                  <Card style={{marginBottom:14}}>
                    <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",fontFamily:"var(--font-sans)",letterSpacing:-.3,marginBottom:10}}>✨ What Gets Synced</div>
                    {curInt.features.map(f=>(
                      <div key={f} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:8,padding:"6px 10px",background:"var(--surface-2)",borderRadius:7}}>
                        <span style={{color:"#059669",fontWeight:700,fontSize:12,flexShrink:0}}>✓</span>
                        <span style={{fontSize:12,color:"var(--text-2)"}}>{f}</span>
                      </div>
                    ))}
                  </Card>
                  <Card style={{background:"#fffbeb",border:"1px solid #fde68a"}}>
                    <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",fontFamily:"var(--font-sans)",letterSpacing:-.3,marginBottom:10}}>📋 How to Export from {curInt.name}</div>
                    {curInt.exportGuide.map((step,i)=>(
                      <div key={i} style={{display:"flex",gap:9,alignItems:"flex-start",marginBottom:7,padding:"6px 10px",background:"var(--surface-2)",borderRadius:7}}>
                        <div style={{width:18,height:18,borderRadius:"50%",background:curInt.color||"var(--brand)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,flexShrink:0,marginTop:1}}>{i+1}</div>
                        <span style={{fontSize:11,color:"var(--text-2)",lineHeight:1.5}}>{step}</span>
                      </div>
                    ))}
                  </Card>
                  <Card style={{background:"#fffbeb",border:"1px solid #fde68a",marginTop:14}}>
                    <div style={{fontWeight:700,fontSize:13,color:"#92400e",marginBottom:8}}>⚠️ Demo Mode</div>
                    <div style={{fontSize:12,color:"#78350f",lineHeight:1.6}}>
                      This is a UI prototype. In production deployment, the Test & Connect button would authenticate against your live {curInt.name} instance and begin pulling real ticket data. No actual API calls are made in this demo.
                    </div>
                    <a href={curInt.docs} target="_blank" rel="noreferrer"
                      style={{display:"inline-block",marginTop:10,fontSize:12,color:"var(--brand)",fontWeight:600}}>
                      📖 {curInt.name} API Docs →
                    </a>
                  </Card>
                </div>
              </div>
            ) : (
              <Card style={{textAlign:"center",padding:48,color:"var(--text-4)"}}>
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
              <div style={{padding:"14px 18px",borderBottom:"1px solid var(--surface-3)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",fontFamily:"var(--font-sans)",letterSpacing:-.3}}>Sync Activity Log</div>
                {syncLog.length>0 && <button onClick={()=>setSyncLog([])} style={{padding:"5px 12px",borderRadius:7,background:"var(--surface)",border:"1px solid var(--border-2)",color:"var(--text-3)",fontSize:12,cursor:"pointer"}}>Clear</button>}
              </div>
              {syncLog.length===0
                ? <div style={{textAlign:"center",padding:48,color:"var(--text-4)"}}>
                    <div style={{fontSize:28,marginBottom:8}}>📋</div>
                    <div style={{fontSize:13,fontWeight:600}}>No sync activity yet</div>
                    <div style={{fontSize:11,marginTop:4}}>Configure and test an integration to see logs here</div>
                  </div>
                : <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"var(--font-sans)"}}>
                    <thead><tr><TH c="Time"/><TH c="Integration"/><TH c="Status"/></tr></thead>
                    <tbody>
                      {syncLog.map((l,i)=>(
                        <tr key={l.id} style={{borderBottom:"1px solid var(--surface-3)",background:i%2===0?"#fff":"var(--surface-2)"}}>
                          <TD s={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)",whiteSpace:"nowrap"}}>{l.ts}</TD>
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
    const [tForm,      setTForm]      = React.useState({name:"",emoji:"🏗",color:"#06b6d4",lead:"",desc:""});
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
      setUForm({name:"",title:"",email:"",password:"",team:isMgr?user.team:"",role:"member",status:"Active",costPerHour:0});
      setUTarget(null); setUModal(true);
    };
    const openEditUser = (u) => {
      setUForm({name:u.name,title:u.title||"",email:u.email||"",team:u.team||"",role:u.role,status:u.status||"Active",resetPw:false,newPw:"",costPerHour:u.costPerHour||0});
      setUTarget(u); setUModal(true);
    };
    const saveUser = () => {
      if(!uForm.name.trim()){ showToast("Full name is required","err"); return; }
      if(!uForm.email.trim()){ showToast("Email is required","err"); return; }
      if(!uTarget && !uForm.password){ showToast("Password is required for new users","err"); return; }
      if(isMgr && uForm.role !== "member"){ showToast("Managers can only add Members","err"); return; }
      if(isMgr && uForm.team !== user.team){ showToast("You can only manage your own team","err"); return; }
      if(uTarget){
        const update = {...uForm,name:uForm.name.trim(),costPerHour:uForm.costPerHour||0};
        if(uForm.resetPw && uForm.newPw) { update.password=uForm.newPw; update.mustReset=true; }
        delete update.resetPw; delete update.newPw;
        setAllUsers(p=>p.map(u=>u.id===uTarget.id?{...u,...update}:u));
        if(user.id===uTarget.id) setUser(p=>({...p,...update}));
        addAudit("Updated user", uForm.name.trim(), `Role: ${uForm.role} · Team: ${uForm.team||"None"}`);
        showToast(`${uForm.name} updated`);
      } else {
        const nu = {id:uid("USR"),name:uForm.name.trim(),title:uForm.title,email:uForm.email.trim(),username:uForm.email.trim(),password:uForm.password,team:uForm.team||null,role:uForm.role,status:uForm.status,costPerHour:uForm.costPerHour||0,lastLogin:null,mustReset:false};
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
    const TCOLORS= ["#06b6d4","#dc2626","#d97706","#7c3aed","#059669","#ea580c","var(--brand)","#db2777","#16a34a","#9333ea"];
    const openAddTeam = () => { setTForm({name:"",emoji:"🏗",color:"#06b6d4",lead:"",desc:""}); setTTarget(null); setTModal(true); };
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
    const iS2 = {width:"100%",padding:"9px 12px",borderRadius:"var(--radius-md)",border:"1px solid var(--border)",fontSize:13,boxSizing:"border-box",background:"var(--surface)",fontFamily:"inherit"};
    const roleColor = r => r==="admin"?"#6366f1":r==="manager"?"var(--brand)":"#059669";
    const roleBg    = r => r==="admin"?"#f5f3ff":r==="manager"?"#eff6ff":"#f0fdf4";
    const roleLabel = r => r==="admin"?"Administrator":r==="manager"?"Manager":"Member";

    // ── Stats for header strip ────────────────────────────────────────
    const stats = [
      {label:"Total Users",    val:scopedUsers.length,                                         icon:"👥",c:"var(--brand)",bg:"#eff6ff"},
      {label:"Active",         val:scopedUsers.filter(u=>(u.status||"Active")==="Active").length,icon:"✅",c:"#059669",bg:"#f0fdf4"},
      {label:"Inactive",       val:scopedUsers.filter(u=>u.status==="Inactive").length,         icon:"⏸",c:"var(--text-4)",bg:"var(--surface-2)"},
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
            <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px"}}>🔐 User Management</div>
            <div style={{fontSize:12,color:"var(--text-3)",marginTop:3}}>
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
                <div style={{width:36,height:36,borderRadius:"var(--radius-md)",background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{s.icon}</div>
                <div>
                  <div style={{fontSize:9,fontWeight:700,color:"var(--text-4)",textTransform:"uppercase",letterSpacing:.8}}>{s.label}</div>
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
                  style={{padding:"8px 14px",borderRadius:"var(--radius-md)",background:"#fee2e2",border:"1px solid #fca5a5",color:"#b91c1c",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                  ✕ Clear
                </button>
              )}
              <span style={{fontSize:12,color:"var(--text-4)",whiteSpace:"nowrap"}}>{visibleUsers.length} user{visibleUsers.length!==1?"s":""}</span>
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
                      <tr><td colSpan={8} style={{textAlign:"center",padding:48,color:"var(--text-4)",fontSize:13}}>No users match your filters.</td></tr>
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
                        <tr key={u.id} style={{background:i%2===0?"#fff":"var(--surface-2)",borderBottom:"1px solid var(--surface-3)",opacity:status==="Inactive"?.6:1}}
                          onMouseEnter={e=>e.currentTarget.style.background="#f0f9ff"}
                          onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"#fff":"var(--surface-2)"}>

                          {/* Avatar + name */}
                          <TD>
                            <div style={{display:"flex",alignItems:"center",gap:10}}>
                              <div style={{width:34,height:34,borderRadius:"50%",background:u.team?`${col}22`:"#f5f3ff",color:u.team?col:"#6366f1",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,flexShrink:0,border:`2px solid ${u.team?col+"33":"var(--border)"}`}}>
                                {u.name.split(" ").map(n=>n[0]).join("")}
                              </div>
                              <div>
                                <div style={{fontWeight:700,color:"var(--text-1)",fontSize:13}}>{u.name}{isMe&&<span style={{marginLeft:5,fontSize:9,background:"var(--brand-light)",color:"var(--brand)",padding:"1px 6px",borderRadius:"var(--radius-sm)",fontWeight:700}}>You</span>}</div>
                                <div style={{fontSize:10,color:"var(--text-4)"}}>{u.id}</div>
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
                          <TD>{u.team ? <TPill t={u.team}/> : <span style={{color:"var(--text-4)",fontSize:11}}>—</span>}</TD>

                          {/* Title */}
                          <TD s={{fontSize:12,color:"var(--text-3)"}}>{u.title||"—"}</TD>

                          {/* Email */}
                          <TD s={{fontSize:11,color:"var(--text-3)"}}>{u.email||"—"}</TD>

                          {/* Status */}
                          <TD>
                            <span style={{fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:12,
                              background:status==="Active"?"#dcfce7":"#f1f5f9",
                              color:status==="Active"?"#166534":"var(--text-3)"}}>
                              {status==="Active"?"● Active":"○ Inactive"}
                            </span>
                          </TD>

                          {/* Hours */}
                          <TD>
                            <div style={{fontWeight:700,color:"var(--brand)",fontSize:13}}>{uHours}</div>
                            <div style={{fontSize:10,color:"var(--text-4)"}}>{uLogs.length} entries</div>
                          </TD>

                          {/* Actions */}
                          <TD>
                            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                              {canEdit && (
                                <button onClick={()=>openEditUser(u)}
                                  style={{padding:"5px 11px",borderRadius:7,background:"var(--surface-3)",border:"1px solid var(--border)",cursor:"pointer",fontSize:11,fontWeight:600,color:"var(--text-2)"}}>
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
                                  style={{padding:"5px 11px",borderRadius:7,background:"#fef2f2",border:"1px solid #fecaca",cursor:"pointer",fontSize:11,fontWeight:600,color:"#dc2626"}}>
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
                    <button onClick={()=>openEditTeam(t)} style={{width:28,height:28,borderRadius:7,background:"var(--surface-3)",border:"1px solid var(--border)",cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>✏️</button>
                    <button onClick={()=>setTConfirm(t.name)} style={{width:28,height:28,borderRadius:7,background:"#fef2f2",border:"1px solid #fecaca",cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>🗑</button>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14,marginTop:4}}>
                    <div style={{width:46,height:46,borderRadius:12,background:`${t.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{t.emoji}</div>
                    <div>
                      <div style={{fontWeight:800,fontSize:16,color:"var(--text-1)"}}>{t.name}</div>
                      <div style={{fontSize:11,color:"var(--text-3)"}}>Lead: {tMgr?.name||t.lead||"—"}</div>
                    </div>
                  </div>
                  {t.desc && <div style={{fontSize:11,color:"var(--text-3)",marginBottom:12,lineHeight:1.5}}>{t.desc}</div>}
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12}}>
                    {[["Members",tMems.length],["Activities",tActs.length],["Util",`${pct}%`]].map(([l,v])=>(
                      <div key={l} style={{textAlign:"center",background:"var(--surface-2)",borderRadius:"var(--radius-sm)",padding:"8px 4px"}}>
                        <div style={{fontSize:16,fontWeight:800,color:l==="Util"?uCol(pct):"var(--text-1)"}}>{v}</div>
                        <div style={{fontSize:9,color:"var(--text-4)",marginTop:1,fontFamily:"var(--font-mono)"}}>{l}</div>
                      </div>
                    ))}
                  </div>
                  {/* Member avatars */}
                  <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
                    {tMems.map(m=>(
                      <div key={m.id} title={`${m.name} (${m.role})`}
                        style={{width:28,height:28,borderRadius:"var(--radius-sm)",background:`${t.color}18`,color:t.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,border:`1.5px solid ${t.color}44`}}>
                        {m.name.split(" ").map(n=>n[0]).join("")}
                      </div>
                    ))}
                  </div>
                  <div style={{height:5,background:"var(--surface-3)",borderRadius:3,overflow:"hidden"}}>
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
              <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",marginBottom:4}}>Role Definitions</div>
              <div style={{fontSize:11,color:"var(--text-3)",marginBottom:16}}>What each role can see and do in ISMS</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:20}}>
                {[
                  {role:"admin",   icon:"🛡️", title:"Administrator",  color:"#6366f1", bg:"#f5f3ff", desc:"Full system access. Can manage all teams, users, activities and system settings. Cannot log time or create activities (read-only on operational data)."},
                  {role:"manager", icon:"👑", title:"Team Manager",    color:"var(--brand)", bg:"#eff6ff", desc:"Manages their own team. Can create activities, log time, manage team members and view team bandwidth. Cannot access other teams."},
                  {role:"member",  icon:"👤", title:"Team Member",     color:"#059669", bg:"#f0fdf4", desc:"Can log time against assigned activities and view their own team's data. Cannot create or edit activities."},
                ].map(r=>(
                  <div key={r.role} style={{background:r.bg,border:`1px solid ${r.color}25`,borderRadius:12,padding:"16px 18px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                      <span style={{fontSize:22}}>{r.icon}</span>
                      <div>
                        <div style={{fontWeight:800,fontSize:14,color:r.color}}>{r.title}</div>
                        <div style={{fontSize:10,color:"var(--text-4)"}}>{scopedUsers.filter(u=>u.role===r.role).length} user{scopedUsers.filter(u=>u.role===r.role).length!==1?"s":""}</div>
                      </div>
                    </div>
                    <div style={{fontSize:11,color:"var(--text-2)",lineHeight:1.6}}>{r.desc}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Permission matrix table */}
            <Card style={{padding:0,overflow:"hidden"}}>
              <div style={{padding:"14px 18px",borderBottom:"1px solid var(--surface-3)"}}>
                <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)"}}>Permission Matrix</div>
                <div style={{fontSize:11,color:"var(--text-3)",marginTop:2}}>Detailed capability breakdown by role</div>
              </div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
                  <thead>
                    <tr style={{background:"var(--surface-2)"}}>
                      <th style={{padding:"12px 16px",textAlign:"left",fontSize:11,fontWeight:700,color:"var(--text-3)",borderBottom:"1px solid var(--border)",minWidth:200}}>Feature</th>
                      {[["🛡️","Admin","#6366f1"],["👑","Manager","var(--brand)"],["👤","Member","#059669"]].map(([icon,label,c])=>(
                        <th key={label} style={{padding:"12px 16px",textAlign:"center",fontSize:12,fontWeight:800,color:c,borderBottom:"1px solid var(--border)",minWidth:130}}>
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
                          <td colSpan={4} style={{padding:"10px 16px 4px",fontSize:10,fontWeight:800,color:"var(--text-4)",textTransform:"uppercase",letterSpacing:1.2,background:"var(--surface-2)",borderBottom:"1px solid var(--border)",borderTop:"2px solid var(--border)"}}>{section.section}</td>
                        </tr>
                        {section.items.map((item,ii)=>(
                          <tr key={item.f} style={{background:"var(--surface)",borderBottom:"1px solid var(--surface-3)"}}>
                            <td style={{padding:"10px 16px",fontSize:12.5,color:"var(--text-2)",fontWeight:500}}>{item.f}</td>
                            {[item.a, item.m, item.mb].map((val,ci)=>{
                              const isTrue  = val===true;
                              const isFalse = val===false;
                              const isText  = typeof val==="string";
                              return (
                                <td key={ci} style={{padding:"10px 16px",textAlign:"center"}}>
                                  {isTrue  && <span style={{color:"#16a34a",fontSize:15,fontWeight:800}}>✓</span>}
                                  {isFalse && <span style={{color:"var(--border)",fontSize:14}}>—</span>}
                                  {isText  && <span style={{fontSize:11,background:"#fffbeb",color:"#92400e",padding:"2px 8px",borderRadius:"var(--radius-sm)",fontWeight:600}}>{val}</span>}
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
            <div style={{padding:"14px 18px",borderBottom:"1px solid var(--surface-3)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)"}}>Audit Log</div>
                <div style={{fontSize:11,color:"var(--text-3)",marginTop:2}}>All user management actions recorded in chronological order</div>
              </div>
              <span style={{fontSize:11,background:"var(--surface-3)",color:"var(--text-3)",padding:"3px 10px",borderRadius:"var(--radius-md)",fontWeight:600}}>{auditLog.length} entries</span>
            </div>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead>
                <tr>
                  <TH c="Timestamp"/><TH c="Performed By"/><TH c="Action"/><TH c="Target"/><TH c="Details"/>
                </tr>
              </thead>
              <tbody>
                {auditLog.map((entry,i)=>(
                  <tr key={entry.id} style={{background:i%2===0?"#fff":"var(--surface-2)",borderBottom:"1px solid var(--surface-3)"}}>
                    <TD s={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)",whiteSpace:"nowrap"}}>{entry.ts}</TD>
                    <TD>
                      <div style={{display:"flex",alignItems:"center",gap:7}}>
                        <div style={{width:24,height:24,borderRadius:"50%",background:"var(--brand-light)",color:"var(--brand)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,flexShrink:0}}>
                          {entry.by.split(" ").map(n=>n[0]).join("")}
                        </div>
                        <span style={{fontWeight:600,fontSize:12}}>{entry.by}</span>
                      </div>
                    </TD>
                    <TD>
                      <span style={{fontSize:11,fontWeight:700,padding:"2px 9px",borderRadius:"var(--radius-md)",
                        background:entry.action.includes("Creat")?"#f0fdf4":entry.action.includes("Delet")?"#fef2f2":entry.action.includes("Updat")||entry.action.includes("Chang")?"#fffbeb":"#f5f3ff",
                        color:entry.action.includes("Creat")?"#166534":entry.action.includes("Delet")?"#991b1b":entry.action.includes("Updat")||entry.action.includes("Chang")?"#92400e":"#4c1d95"}}>
                        {entry.action}
                      </span>
                    </TD>
                    <TD s={{fontWeight:700,fontSize:12}}>{entry.target}</TD>
                    <TD s={{fontSize:11,color:"var(--text-3)"}}>{entry.detail}</TD>
                  </tr>
                ))}
                {auditLog.length===0 && <tr><td colSpan={5} style={{textAlign:"center",padding:40,color:"var(--text-4)"}}>No audit entries yet.</td></tr>}
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
                {!uTarget && (
                  <Lbl t="Password *">
                    <input style={iS2} type="password" value={uForm.password||""} onChange={e=>setUForm(p=>({...p,password:e.target.value}))} placeholder="e.g. Admin@123"/>
                    <div style={{fontSize:10,color:"var(--text-4)",marginTop:3}}>Password for this user to login (min 6 chars)</div>
                  </Lbl>
                )}
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
                  {isMgr && <div style={{fontSize:10,color:"var(--text-4)",marginTop:3}}>Managers can only add Members</div>}
                </Lbl>
                {isAdmin && (
                  <Lbl t="Status">
                    <select style={iS2} value={uForm.status} onChange={e=>setUForm(p=>({...p,status:e.target.value}))}>
                      <option value="Active">● Active</option>
                      <option value="Inactive">○ Inactive</option>
                    </select>
                  </Lbl>
                )}
              <Lbl t="Hourly Cost ($/hr)">
                <input style={iS2} type="number" min="0" step="1" value={uForm.costPerHour||""} onChange={e=>setUForm(p=>({...p,costPerHour:+e.target.value||0}))} placeholder="e.g. 65"/>
                <div style={{fontSize:10,color:"var(--text-4)",marginTop:3}}>Used for cost-per-ticket calculations in Reports. Leave 0 to exclude from cost analysis.</div>
              </Lbl>
              {isAdmin && uTarget && (
                <div style={{gridColumn:"1/-1"}}>
                  <div style={{height:1,background:"var(--surface-3)",margin:"4px 0 12px"}}/>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:uForm.resetPw?12:0}}>
                    <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
                      <input type="checkbox" checked={uForm.resetPw} onChange={e=>setUForm(p=>({...p,resetPw:e.target.checked,newPw:""}))} style={{width:15,height:15,cursor:"pointer"}}/>
                      <span style={{fontSize:12,fontWeight:600,color:"var(--text-2)"}}>🔑 Reset password for this user</span>
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
              <div style={{background:"var(--surface-2)",border:"1px solid var(--border)",borderRadius:"var(--radius-md)",padding:"12px 14px",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:40,height:40,borderRadius:"50%",background:uForm.team?`${tCol(uForm.team)}22`:"#f5f3ff",color:uForm.team?tCol(uForm.team):"#6366f1",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,flexShrink:0}}>
                  {uForm.name?uForm.name.split(" ").filter(Boolean).map(n=>n[0]).join("").slice(0,2):"?"}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)"}}>{uForm.name||"Full Name"}</div>
                  <div style={{fontSize:11,color:"var(--text-3)"}}>{uForm.title||"Job Title"} {uForm.email&&`· ${uForm.email}`}</div>
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
                    <button key={e} onClick={()=>setTForm(p=>({...p,emoji:e}))} style={{width:34,height:34,borderRadius:7,border:`2px solid ${tForm.emoji===e?"var(--brand)":"var(--border)"}`,background:tForm.emoji===e?"var(--brand-light)":"var(--surface)",fontSize:16,cursor:"pointer"}}>{e}</button>
                  ))}
                </div>
              </Lbl>
              <Lbl t="Team Colour">
                <div style={{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center",marginTop:4}}>
                  {TCOLORS.map(c=>(
                    <button key={c} onClick={()=>setTForm(p=>({...p,color:c}))} style={{width:30,height:30,borderRadius:"50%",background:c,border:`3px solid ${tForm.color===c?"var(--text-1)":"transparent"}`,cursor:"pointer"}}/>
                  ))}
                  <input type="color" value={tForm.color} onChange={e=>setTForm(p=>({...p,color:e.target.value}))} style={{width:30,height:30,borderRadius:"50%",border:"1px solid var(--border)",cursor:"pointer",padding:1}}/>
                </div>
              </Lbl>
              {/* Preview */}
              <div style={{padding:"12px 16px",borderRadius:"var(--radius-md)",background:`${tForm.color}12`,border:`1.5px solid ${tForm.color}40`,display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:24}}>{tForm.emoji}</span>
                <div style={{flex:1}}>
                  <div style={{fontWeight:800,fontSize:14,color:"var(--text-1)"}}>{tForm.name||"Team Name"}</div>
                  <div style={{fontSize:11,color:"var(--text-3)"}}>Lead: {tForm.lead||"—"} {tForm.desc&&`· ${tForm.desc}`}</div>
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
              <div style={{fontSize:15,fontWeight:700,color:"var(--text-1)",marginBottom:6}}>Remove {uConfirm.name}?</div>
              <div style={{fontSize:12,color:"var(--text-3)",lineHeight:1.6}}>This will remove the user from ISMS.<br/>Their existing time log entries will be preserved.</div>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button onClick={()=>setUConfirm(null)} style={{padding:"9px 22px",borderRadius:"var(--radius-md)",background:"var(--surface)",border:"1px solid var(--border)",fontWeight:600,fontSize:13,cursor:"pointer"}}>Cancel</button>
              <button onClick={deleteUser} style={{padding:"9px 22px",borderRadius:"var(--radius-md)",background:"#dc2626",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>Remove User</button>
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
                <div style={{fontSize:15,fontWeight:700,color:"var(--text-1)",marginBottom:8}}>Delete "{tConfirm}" team?</div>
                {(hm>0||ha>0) && (
                  <div style={{background:"#fff7ed",border:"1px solid #fed7aa",borderRadius:"var(--radius-md)",padding:"10px 14px",marginBottom:10,fontSize:12,color:"#92400e",textAlign:"left"}}>
                    ⚠️ This team has <strong>{hm} member{hm!==1?"s":""}</strong> and <strong>{ha} activit{ha!==1?"ies":"y"}</strong>. Deleting it will unlink these records.
                  </div>
                )}
                <div style={{fontSize:12,color:"var(--text-3)"}}>This cannot be undone.</div>
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
                <button onClick={()=>setTConfirm(null)} style={{padding:"9px 22px",borderRadius:"var(--radius-md)",background:"var(--surface)",border:"1px solid var(--border)",fontWeight:600,fontSize:13,cursor:"pointer"}}>Cancel</button>
                <button onClick={deleteTeam} style={{padding:"9px 22px",borderRadius:"var(--radius-md)",background:"#dc2626",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>Delete Team</button>
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
    const strengthColor = ["","#ef4444","#f97316","#eab308","#22c55e","#16a34a"][strength];
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

    const iS2 = {width:"100%",padding:"10px 42px 10px 14px",borderRadius:"var(--radius-md)",border:"1.5px solid var(--border)",fontSize:13,fontFamily:"inherit",outline:"none",background:"var(--surface)",boxSizing:"border-box"};

    if(done) return (
      <div style={{maxWidth:480,margin:"60px auto",textAlign:"center"}}>
        <Card style={{padding:48}}>
          <div style={{fontSize:48,marginBottom:16}}>✅</div>
          <div style={{fontSize:20,fontWeight:800,color:"#16a34a",letterSpacing:"-.3px",marginBottom:8}}>Password Updated</div>
          <div style={{fontSize:13,color:"var(--text-3)",marginBottom:24}}>Your password has been updated successfully.</div>
          <button onClick={()=>goPage("dashboard")} style={{padding:"10px 28px",borderRadius:"var(--radius-md)",background:"linear-gradient(135deg,#2563eb,#06b6d4)",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>
            Back to Dashboard
          </button>
        </Card>
      </div>
    );

    return (
      <div style={{maxWidth:520,margin:"0 auto"}}>
        <div style={{marginBottom:22}}>
          <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px"}}>🔑 Change Password</div>
          <div style={{fontSize:12,color:"var(--text-3)",marginTop:3}}>Update your ISMS account password</div>
        </div>

        <Card style={{marginBottom:14}}>
          {/* Who is changing */}
          <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:"var(--surface-2)",borderRadius:"var(--radius-md)",border:"1px solid var(--border)",marginBottom:20}}>
            <div style={{width:38,height:38,borderRadius:"50%",background:`${tc}22`,color:tc,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,flexShrink:0}}>
              {user.name.split(" ").map(n=>n[0]).join("")}
            </div>
            <div>
              <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)"}}>{user.name}</div>
              <div style={{fontSize:11,color:"var(--text-3)"}}>{user.email||user.username} · {user.title}</div>
            </div>
          </div>

          {err && (
            <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:"var(--radius-md)",padding:"10px 14px",marginBottom:16,fontSize:12,color:"#dc2626",display:"flex",gap:8,alignItems:"center"}}>
              <span>⚠️</span>{err}
            </div>
          )}

          {/* Current password */}
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:"var(--text-3)",marginBottom:6,textTransform:"uppercase",letterSpacing:.8}}>Current Password</div>
            <div style={{position:"relative"}}>
              <input type={showC?"text":"password"} value={cur} onChange={e=>{setCur(e.target.value);setErr("");}}
                style={{...iS2}} placeholder="Your current password"/>
              <button onClick={()=>setShowC(s=>!s)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"var(--text-4)",fontSize:15}}>{showC?"🙈":"👁"}</button>
            </div>
          </div>

          <div style={{height:1,background:"var(--surface-3)",margin:"18px 0"}}/>

          {/* New password */}
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:"var(--text-3)",marginBottom:6,textTransform:"uppercase",letterSpacing:.8}}>New Password</div>
            <div style={{position:"relative"}}>
              <input type={showN?"text":"password"} value={np} onChange={e=>{setNp(e.target.value);setErr("");}}
                style={{...iS2}} placeholder="Enter new password"/>
              <button onClick={()=>setShowN(s=>!s)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"var(--text-4)",fontSize:15}}>{showN?"🙈":"👁"}</button>
            </div>
            {/* Strength meter */}
            {np && (
              <div style={{marginTop:8}}>
                <div style={{height:4,background:"var(--surface-3)",borderRadius:2,overflow:"hidden",marginBottom:4}}>
                  <div style={{height:"100%",width:`${strength*20}%`,background:strengthColor,borderRadius:2,transition:"width .3s,background .3s"}}/>
                </div>
                <span style={{fontSize:11,fontWeight:600,color:strengthColor}}>{strengthLabel}</span>
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div style={{marginBottom:18}}>
            <div style={{fontSize:11,fontWeight:700,color:"var(--text-3)",marginBottom:6,textTransform:"uppercase",letterSpacing:.8}}>Confirm New Password</div>
            <div style={{position:"relative"}}>
              <input type="password" value={cp} onChange={e=>{setCp(e.target.value);setErr("");}}
                style={{...iS2,borderColor:cp&&cp!==np?"#fca5a5":cp&&cp===np?"#86efac":"#e2e8f0"}} placeholder="Re-enter new password"/>
              {cp && <span style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",fontSize:16}}>{cp===np?"✅":"❌"}</span>}
            </div>
          </div>

          {/* Password requirements */}
          <div style={{background:"var(--surface-2)",borderRadius:"var(--radius-md)",padding:"12px 14px",marginBottom:20}}>
            <div style={{fontSize:11,fontWeight:700,color:"var(--text-3)",marginBottom:8,textTransform:"uppercase",letterSpacing:.8}}>Password Requirements</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
              {rules.map(r=>(
                <div key={r.label} style={{display:"flex",alignItems:"center",gap:7,fontSize:12,color:r.ok?"#059669":"#94a3b8"}}>
                  <span style={{fontWeight:700,flexShrink:0}}>{r.ok?"✓":"○"}</span>{r.label}
                </div>
              ))}
            </div>
          </div>

          <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
            <button onClick={()=>goPage("dashboard")} style={{padding:"10px 22px",borderRadius:"var(--radius-md)",background:"var(--surface)",border:"1px solid var(--border)",fontWeight:600,fontSize:13,cursor:"pointer",color:"var(--text-2)"}}>Cancel</button>
            <button onClick={save} disabled={!allRules||np!==cp||!cur}
              style={{padding:"10px 24px",borderRadius:"var(--radius-md)",background:allRules&&np===cp&&cur?"linear-gradient(135deg,#2563eb,#1d4ed8)":"var(--surface-3)",color:allRules&&np===cp&&cur?"#fff":"var(--text-4)",border:"none",fontWeight:700,fontSize:13,cursor:allRules&&np===cp&&cur?"pointer":"not-allowed",transition:"all .2s"}}>
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
    const iS2 = {width:"100%",padding:"10px 14px",borderRadius:"var(--radius-md)",border:"1.5px solid var(--border)",fontSize:13,fontFamily:"inherit",outline:"none",background:"var(--surface)",boxSizing:"border-box"};
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
          <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px"}}>👤 My Profile</div>
          <div style={{fontSize:12,color:"var(--text-3)",marginTop:3}}>Manage your personal information and account settings</div>
        </div>

        {/* Profile header card */}
        <Card style={{marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:18,marginBottom:20}}>
            <div style={{width:64,height:64,borderRadius:16,background:`linear-gradient(135deg,${tc},${tc}99)`,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:800,boxShadow:`0 4px 16px ${tc}44`,flexShrink:0}}>
              {user.name.split(" ").map(n=>n[0]).join("")}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px"}}>{user.name}</div>
              <div style={{fontSize:13,color:"var(--text-3)",marginTop:2}}>{user.title||"—"}</div>
              <div style={{display:"flex",gap:8,marginTop:6,flexWrap:"wrap"}}>
                <span style={{fontSize:11,background:user.role==="admin"?"#f5f3ff":user.role==="manager"?"#eff6ff":"#f0fdf4",color:user.role==="admin"?"#6366f1":user.role==="manager"?"var(--brand)":"#059669",padding:"2px 10px",borderRadius:12,fontWeight:700}}>
                  {user.role==="admin"?"🛡️ Administrator":user.role==="manager"?"👑 Manager":"👤 Member"}
                </span>
                {user.team && <TPill t={user.team}/>}
                <span style={{fontSize:11,background:"#d1fae5",color:"#166534",padding:"2px 10px",borderRadius:12,fontWeight:600}}>● Active</span>
              </div>
            </div>
            <button onClick={()=>setEditing(e=>!e)} style={{padding:"8px 18px",borderRadius:"var(--radius-md)",background:editing?"#f1f5f9":"#fff",border:"1px solid var(--border)",cursor:"pointer",fontWeight:600,fontSize:12,color:"var(--text-2)"}}>
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
                <button onClick={()=>setEditing(false)} style={{padding:"9px 20px",borderRadius:"var(--radius-md)",background:"var(--surface)",border:"1px solid var(--border)",fontWeight:600,fontSize:13,cursor:"pointer",color:"var(--text-2)"}}>Cancel</button>
                <button onClick={save} style={{padding:"9px 20px",borderRadius:"var(--radius-md)",background:"linear-gradient(135deg,#2563eb,#06b6d4)",color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>Save Changes</button>
              </div>
            </div>
          ) : (
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[["Username",user.username||"—"],["Email",user.email||"—"],["Team",user.team||"—"],["Last Login",user.lastLogin||"—"]].map(([l,v])=>(
                <div key={l} style={{background:"var(--surface-2)",borderRadius:"var(--radius-md)",padding:"10px 14px"}}>
                  <div style={{fontSize:10,color:"var(--text-4)",fontWeight:700,textTransform:"uppercase",letterSpacing:.8,marginBottom:3}}>{l}</div>
                  <div style={{fontSize:13,fontWeight:600,color:"var(--text-1)"}}>{v}</div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Activity stats */}
        <Card style={{marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",marginBottom:14}}>My Activity Stats</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
            {[["⏱","Hours Logged",fmtM(uHours),"var(--brand)","#eff6ff"],["📋","Activities",uActs,"#7c3aed","#f5f3ff"],["📝","Log Entries",uLogs.length,"#059669","#f0fdf4"]].map(([icon,l,v,c,bg])=>(
              <div key={l} style={{textAlign:"center",background:bg,borderRadius:"var(--radius-md)",padding:"14px 8px"}}>
                <div style={{fontSize:20,marginBottom:6}}>{icon}</div>
                <div style={{fontSize:22,fontWeight:800,color:c}}>{v}</div>
                <div style={{fontSize:11,color:"var(--text-3)",marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick actions */}
        <Card>
          <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",marginBottom:14}}>Account Actions</div>
          <div style={{display:"grid",gap:10}}>
            {[
              {icon:"🔑",label:"Change Password",sub:"Update your login password",nav:"changepw",color:"var(--brand)"},
              {icon:"🕐",label:"View My Time Log",sub:"See all your logged time entries",nav:"timelog",color:"#059669"},
              {icon:"🔐",label:"User Management",sub:"Manage users and teams",nav:"usermgmt",color:"#7c3aed",hide:!isMgrOrAdmin},
            ].filter(a=>!a.hide).map(a=>(
              <div key={a.nav} onClick={()=>goPage(a.nav)} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 14px",borderRadius:"var(--radius-md)",border:`1px solid ${a.color}20`,background:`${a.color}06`,cursor:"pointer",transition:"all .15s"}}
                onMouseEnter={e=>e.currentTarget.style.background=`${a.color}12`}
                onMouseLeave={e=>e.currentTarget.style.background=`${a.color}06`}>
                <div style={{width:36,height:36,borderRadius:"var(--radius-md)",background:`${a.color}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{a.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)"}}>{a.label}</div>
                  <div style={{fontSize:11,color:"var(--text-3)"}}>{a.sub}</div>
                </div>
                <span style={{color:"var(--border-2)",fontSize:16}}>→</span>
              </div>
            ))}
            <div onClick={handleLogout} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 14px",borderRadius:"var(--radius-md)",border:"1px solid #fca5a520",background:"#fef2f208",cursor:"pointer",transition:"all .15s"}}
              onMouseEnter={e=>e.currentTarget.style.background="#fef2f2"}
              onMouseLeave={e=>e.currentTarget.style.background="#fef2f208"}>
              <div style={{width:36,height:36,borderRadius:"var(--radius-md)",background:"#fef2f2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>🚪</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:13,color:"#dc2626"}}>Sign Out</div>
                <div style={{fontSize:11,color:"var(--text-3)"}}>Log out of ISMS</div>
              </div>
              <span style={{color:"var(--border-2)",fontSize:16}}>→</span>
            </div>
          </div>
        </Card>
      </div>
    );
  };


  // ════════════════════════════════════════════════════════════════════
  //  PAGE: INTELLIGENCE REPORT
  //  Senior Infra + Management lens: data-driven analysis of all logs,
  //  benchmarked against industry best practices for product company
  //  infra teams. Covers ITIL v4, DORA, SRE, and FinOps lenses.
  // ════════════════════════════════════════════════════════════════════
  const PageProdIntel = () => {
    const [activeTab, setActiveTab] = React.useState("executive");
    const [expandedRec, setExpandedRec] = React.useState(null);

    const { memberStats, actStats, teamStats, totalLogged, reactOrgPct,
            incidentOrgPct, scopeLogs, scopeActs, scopeMembers } = prodData;

    // ── Industry Benchmarks (ITIL v4 + DORA + SRE for product infra teams) ──
    const BENCHMARKS = {
      reactiveRatio:    { target:30, warn:40, label:"Reactive Work %",      source:"ITIL v4 / HDI",    desc:"World-class infra teams spend <30% on reactive work" },
      incidentRatio:    { target:15, warn:25, label:"Incident Time %",       source:"ITIL v4 SLA",      desc:"Incident resolution should be <15% of total effort" },
      utilisation:      { target:80, min:60,  label:"Team Utilisation %",    source:"FinOps / PMO",     desc:"Optimal band 65–85%. <60% = idle waste, >85% = burnout risk" },
      proactiveRatio:   { target:70, warn:60, label:"Proactive Work %",      source:"SRE Google",       desc:"SRE mandates ≥70% proactive/toil-reduction work" },
      changeSuccessRate:{ target:95, warn:85, label:"Change Success Rate %", source:"DORA",             desc:"Elite DORA teams achieve >95% change success rate" },
      mttrHours:        { target:4,  warn:8,  label:"MTTR (est. hours)",     source:"DORA/SRE",         desc:"Mean Time To Restore <4h for high-performing teams" },
      deployFreq:       { target:5,  warn:2,  label:"Changes/Week",          source:"DORA",             desc:"High-performing teams deploy/change multiple times per week" },
      automationRatio:  { target:30, warn:20, label:"Automation & Scripts %",source:"SRE / DevOps",     desc:"≥30% of effort should go to automation & toil reduction" },
      trainingRatio:    { target:10, warn:5,  label:"Training & Learning %", source:"DORA / Gartner",   desc:"10% of capacity reserved for learning and upskilling" },
      blockedRatio:     { target:0,  warn:5,  label:"Blocked Activities %",  source:"Lean / Kanban",    desc:"Zero blocked items is the goal; >5% signals governance failure" },
    };

    // ── Compute live metrics from actual data ──
    const totalMins = scopeLogs.reduce((s,l)=>s+l.mins,0) || 1;
    const totalHrs  = Math.round(totalMins/60);

    const byType = (type) => scopeLogs.filter(l=>l.type===type).reduce((s,l)=>s+l.mins,0);
    const byCat  = (cat)  => scopeLogs.filter(l=>l.cat===cat).reduce((s,l)=>s+l.mins,0);
    const byNature = (n)  => scopeLogs.filter(l=>{ const a=acts.find(x=>x.id===l.actId); return a&&a.nature===n; }).reduce((s,l)=>s+l.mins,0);

    const incidentMins  = byType("Incident");
    const changeMins    = byType("Change");
    const projectMins   = byType("Project");
    const bauMins       = byType("BAU");
    const trainingMins  = byType("Training");
    const meetingMins   = byType("Meeting");
    const autoMins      = byCat("Automation & Scripting");
    const reactiveMins  = byNature("Reactive");
    const proactiveMins = byNature("Proactive");

    const incidentPct   = Math.round(incidentMins/totalMins*100);
    const changePct     = Math.round(changeMins/totalMins*100);
    const projectPct    = Math.round(projectMins/totalMins*100);
    const bauPct        = Math.round(bauMins/totalMins*100);
    const trainingPct   = Math.round(trainingMins/totalMins*100);
    const meetingPct    = Math.round(meetingMins/totalMins*100);
    const autoPct       = Math.round(autoMins/totalMins*100);
    const reactivePct   = Math.round(reactiveMins/totalMins*100);
    const proactivePct  = 100-reactivePct;
    const avgUtil       = teamStats.length ? Math.round(teamStats.reduce((s,t)=>s+t.utilPct,0)/teamStats.length) : 0;

    const changesPerWeek= scopeActs.filter(a=>a.type==="Change").length;
    const blockedPct    = Math.round(scopeActs.filter(a=>a.status==="Blocked").length/Math.max(scopeActs.length,1)*100);
    const staleActs     = actStats.filter(a=>a.isStale).length;
    const overEstActs   = actStats.filter(a=>a.isOverEst).length;

    // ── Score each metric against benchmark ──
    const scoreMetric = (val, bench) => {
      if(bench.target !== undefined && bench.warn !== undefined && bench.min === undefined) {
        // Lower is better (reactive, incident, blocked)
        if(val <= bench.target) return "elite";
        if(val <= bench.warn)   return "good";
        return "needs_work";
      }
      if(bench.min !== undefined) {
        // Range is good (utilisation)
        if(val >= bench.min && val <= bench.target) return "elite";
        if(val >= bench.min-10)                     return "good";
        return "needs_work";
      }
      // Higher is better (proactive, automation, training, changes)
      if(val >= bench.target) return "elite";
      if(val >= bench.warn)   return "good";
      return "needs_work";
    };

    const scoreColor = s => s==="elite"?"#059669":s==="good"?"#d97706":"#dc2626";
    const scoreBg    = s => s==="elite"?"#f0fdf4":s==="good"?"#fffbeb":"#fef2f2";
    const scoreLabel = s => s==="elite"?"✅ Elite":s==="good"?"⚡ Good":"⚠️ Needs Work";

    const metrics = [
      { key:"reactive",   label:"Reactive Work",         val:reactivePct, unit:"%",  bench:BENCHMARKS.reactiveRatio,    target:"<30%",  actual:`${reactivePct}%` },
      { key:"incident",   label:"Incident Time",          val:incidentPct, unit:"%",  bench:BENCHMARKS.incidentRatio,    target:"<15%",  actual:`${incidentPct}%` },
      { key:"proactive",  label:"Proactive Work",         val:proactivePct,unit:"%",  bench:BENCHMARKS.proactiveRatio,   target:"≥70%",  actual:`${proactivePct}%` },
      { key:"util",       label:"Avg Utilisation",        val:avgUtil,     unit:"%",  bench:BENCHMARKS.utilisation,      target:"65–85%",actual:`${avgUtil}%` },
      { key:"auto",       label:"Automation Effort",      val:autoPct,     unit:"%",  bench:BENCHMARKS.automationRatio,  target:"≥30%",  actual:`${autoPct}%` },
      { key:"training",   label:"Training & Learning",    val:trainingPct, unit:"%",  bench:BENCHMARKS.trainingRatio,    target:"≥10%",  actual:`${trainingPct}%` },
      { key:"blocked",    label:"Blocked Activities",     val:blockedPct,  unit:"%",  bench:BENCHMARKS.blockedRatio,     target:"0%",    actual:`${blockedPct}%` },
      { key:"changes",    label:"Changes This Period",    val:changesPerWeek,unit:"", bench:BENCHMARKS.deployFreq,       target:"≥5",    actual:changesPerWeek },
    ];

    // Overall health score (0-100)
    const eliteCount    = metrics.filter(m=>scoreMetric(m.val,m.bench)==="elite").length;
    const goodCount     = metrics.filter(m=>scoreMetric(m.val,m.bench)==="good").length;
    const overallScore  = Math.round((eliteCount*100 + goodCount*60) / (metrics.length));
    const overallGrade  = overallScore>=80?"A":overallScore>=65?"B":overallScore>=50?"C":"D";
    const gradeColor    = overallScore>=80?"#059669":overallScore>=65?"#d97706":overallScore>=50?"#ea580c":"#dc2626";

    // ── Deep recommendations engine ──
    const DEEP_RECS = [
      // ── ITIL lens ──
      {
        id:"r1", framework:"ITIL v4", priority:reactivePct>50?"Critical":reactivePct>30?"High":"Good",
        icon:"🔄", title:"Problem Management — Shift from Reactive to Proactive",
        finding:`${reactivePct}% of logged time is reactive (industry target <30%). Your team is spending ${fmtM(reactiveMins)} firefighting vs ${fmtM(proactiveMins)} on proactive work.`,
        rootCause: reactivePct>50
          ? "High reactive load suggests absence of formal Problem Management. Known errors are being resolved repeatedly without root cause elimination."
          : "Moderate reactive load. Problem records are not being converted from incidents, causing repeat work.",
        recommendations:[
          "Implement a weekly Problem Management review — dedicate 1 hour to reviewing top 5 recurring incidents",
          "Create a Known Error Database (KEDB) — link every incident ticket to a problem record",
          "Introduce proactive monitoring runbooks to detect failure patterns before users are impacted",
          "Target: reduce reactive work by 10% per quarter through root-cause driven action plans",
        ],
        kpi:`Reactive ratio: ${reactivePct}% → Target 30% | Savings: ~${fmtM(Math.round((reactivePct-30)/100*totalMins))} per period`,
        frameworks:["ITIL v4 Practice: Problem Management","ITIL v4 Practice: Continual Improvement"]
      },
      {
        id:"r2", framework:"ITIL v4", priority:incidentPct>25?"Critical":incidentPct>15?"High":"Good",
        icon:"🚨", title:"Incident Management — Reduce Resolution Time & Volume",
        finding:`${incidentPct}% of total effort (${fmtM(incidentMins)}) is spent on incident resolution. ITIL benchmarks for mature infra teams: <15%.`,
        rootCause:"Incident volume is elevated, suggesting either insufficient monitoring coverage, lack of auto-remediation, or gaps in change quality causing post-change incidents.",
        recommendations:[
          "Implement AIOps/event correlation tooling to auto-filter alert noise (target 40% noise reduction)",
          "Create incident categories and track repeat incidents weekly — eliminate top 3 causes each month",
          "Introduce change freeze windows around major deployments to reduce post-change incidents",
          "Establish P1/P2 incident post-mortems within 48 hours — mandatory action items tracked in ISMS",
          "Automate first-response runbooks for top 10 incident types using Ansible/Terraform",
        ],
        kpi:`Incident time: ${incidentPct}% → Target 15% | Est. savings: ${fmtM(Math.round((incidentPct-15)/100*totalMins))}`,
        frameworks:["ITIL v4: Incident Management","ITIL v4: Monitoring & Event Management"]
      },
      {
        id:"r3", framework:"DORA", priority:autoPct<15?"Critical":autoPct<30?"High":"Good",
        icon:"🤖", title:"Automation First — Eliminate Toil & Manual Repetition",
        finding:`Only ${autoPct}% of logged effort goes to Automation & Scripting. Google SRE mandates ≥50% of an engineer's time should eliminate toil. DORA high performers automate everything repeatable.`,
        rootCause:"BAU tasks consuming " + bauPct + "% of capacity suggests high toil — repetitive manual work that hasn't been automated. This is a direct productivity multiplier being left unrealised.",
        recommendations:[
          `Target 30% of each sprint on automation. Audit your BAU backlog (${fmtM(bauMins)} of BAU logged) for automation candidates`,
          "Create an 'Automation Backlog' — every task done manually more than 3 times gets a Jira ticket to automate it",
          "Introduce Infrastructure as Code (IaC) for all provisioning — Terraform/Ansible pipelines",
          "Implement ChatOps (Slack/Teams bots) for routine ops tasks: disk cleanup, cert renewal, patch status",
          "Measure and track 'toil percentage' per engineer monthly — make it a team health metric",
        ],
        kpi:`Automation effort: ${autoPct}% → Target 30% | Toil reduction: ~${fmtM(Math.round((30-autoPct)/100*totalMins))} time freed`,
        frameworks:["Google SRE: Toil Elimination","DORA: Technical Practices","DevOps: Continuous Improvement"]
      },
      {
        id:"r4", framework:"SRE", priority:trainingPct<5?"Critical":trainingPct<10?"High":"Good",
        icon:"📚", title:"Learning & Development — Invest in Skill Currency",
        finding:`Training accounts for only ${trainingPct}% of logged time. Gartner recommends 10% of infra capacity for continuous learning. Technical debt compounds when teams don't upskill.`,
        rootCause:"Operational pressure is crowding out learning time. Without structured learning allocation, teams fall behind on cloud-native skills, security practices, and new tooling — increasing long-term risk.",
        recommendations:[
          "Reserve minimum 4 hours/week per engineer for structured learning (certifications, labs, internal tech talks)",
          "Create a team Skills Matrix — map current vs required skills for your cloud/infra stack",
          "Quarterly certification targets: at minimum 1 engineer per team completes a relevant cert per quarter",
          "Set up an internal Tech Radar (ThoughtWorks model) — categorise tools as Adopt/Trial/Assess/Hold",
          "Rotate engineers across incident types to cross-train and reduce single points of knowledge failure",
        ],
        kpi:`Training ratio: ${trainingPct}% → Target 10% | Investment needed: ${fmtM(Math.round((10-trainingPct)/100*totalMins))} additional`,
        frameworks:["Gartner: IT Skills Management","DORA: Learning Culture","SRE: Resilience Engineering"]
      },
      {
        id:"r5", framework:"FinOps", priority:avgUtil<55?"High":avgUtil>90?"High":"Good",
        icon:"💰", title:"Resource Utilisation — Optimise Human Capital Efficiency",
        finding:`Average team utilisation is ${avgUtil}%. ${avgUtil<65?"Under-utilised teams represent cost waste and indicate poor demand management.":avgUtil>85?"Over-utilisation risks burnout, quality degradation and attrition.":"Utilisation is in a healthy band but can be optimised."}`,
        rootCause: avgUtil<65
          ? "Low utilisation signals demand forecasting gaps — work intake isn't being matched to available capacity. Activities may not be captured in ISMS."
          : avgUtil>85
          ? "Sustained high utilisation without buffer capacity means no time for proactive work, learning, or incident absorption — a risk multiplier."
          : "Good baseline, but uneven distribution across teams creates bottlenecks.",
        recommendations:[
          avgUtil<65 ? "Conduct demand-capacity matching workshops quarterly — align project intake to available FTE capacity" : "Implement a capacity buffer policy — no team should exceed 85% planned utilisation",
          "Use ISMS bandwidth data in quarterly business reviews to negotiate headcount or project deferrals",
          "Implement a 'golden ratio' target: 60% BAU/incidents, 30% projects, 10% learning",
          "Track utilisation trends weekly — flag teams approaching 85% 4 weeks in advance",
          "Consider shared services model for low-utilisation specialist skills across teams",
        ],
        kpi:`Utilisation: ${avgUtil}% | Target band: 65–85% | ${teamStats.filter(t=>t.utilPct>85).length} teams over threshold`,
        frameworks:["FinOps Foundation: Cost Efficiency","PMO: Resource Management","ITIL v4: Service Level Management"]
      },
      {
        id:"r6", framework:"DORA", priority:overEstActs>3?"High":overEstActs>0?"Medium":"Good",
        icon:"📐", title:"Estimation Accuracy — Improve Predictability",
        finding:`${overEstActs} activities have exceeded their time estimates. Poor estimation accuracy makes sprint planning unreliable, erodes stakeholder trust, and hides systemic complexity.`,
        rootCause:"Estimation errors often indicate: (a) technical complexity not surfaced during planning, (b) hidden dependencies discovered late, or (c) scope creep absorbed without re-baselining.",
        recommendations:[
          "Run estimation retrospectives on every over-budget activity — identify pattern categories",
          "Adopt Reference Class Forecasting: use ISMS historical data to calibrate estimates by activity type",
          "Add complexity scores to new activities (S/M/L/XL) using Planning Poker or T-shirt sizing",
          "Apply 15-20% contingency buffer to all Change and Project activities by default",
          "Track Estimation Accuracy as a KPI — target: <10% of activities exceed estimate by >20%",
        ],
        kpi:`Over-estimate activities: ${overEstActs} → Target 0 | Accuracy improves sprint predictability by ~25%`,
        frameworks:["DORA: Lean Management","Agile: Story Points","PMBOK: Schedule Management"]
      },
      {
        id:"r7", framework:"Lean/Kanban", priority:staleActs>2?"High":staleActs>0?"Medium":"Good",
        icon:"🚧", title:"Flow Efficiency — Eliminate Work in Progress Blockers",
        finding:`${staleActs} active activities have had no time logged for 4+ days. In Lean terms, this is 'work in progress that isn't progressing' — a direct indicator of flow efficiency degradation.`,
        rootCause:"Stale activities typically indicate: blocked dependencies, unclear ownership, competing priorities, or activities that are effectively done but not formally closed.",
        recommendations:[
          "Implement a WIP Limit policy — each engineer has max 2 active activities at once",
          "Weekly 15-minute standup focused exclusively on clearing stale/blocked items",
          "Enforce a 'definition of done' checklist before closing activities — prevent zombie work",
          "Review all stale activities in monthly manager reviews — close, defer, or re-assign within 48h",
          "Use ISMS flags to auto-alert managers when any activity has no log entry for >3 business days",
        ],
        kpi:`Stale activities: ${staleActs} → Target 0 | Each stale day costs: ${fmtM(Math.round(totalMins/Math.max(scopeActs.length,1)))} avg effort`,
        frameworks:["Lean: Flow Efficiency","Kanban: WIP Limits","ITIL v4: Change Enablement"]
      },
      {
        id:"r8", framework:"DORA / SRE", priority:meetingPct>15?"High":meetingPct>10?"Medium":"Good",
        icon:"📅", title:"Meeting Load — Protect Deep Work Time",
        finding:`${meetingPct}% of logged time is in meetings (${fmtM(meetingMins)}). For technical infra teams, >10% meeting load significantly degrades engineering output quality.`,
        rootCause:"High meeting overhead in ops teams often signals poor async communication practices, unclear decision-making structures, or status update meetings that could be replaced by dashboards like ISMS.",
        recommendations:[
          "Audit all recurring meetings — cancel any that can be replaced by ISMS dashboards or async updates",
          "Introduce 'No Meeting Wednesday' — protect at least one full deep-work day per week",
          "Replace status update meetings with ISMS weekly digest report shared via email/Teams",
          "Implement async-first communication for non-urgent items (written updates, ISMS comments)",
          "Cap engineer participation in cross-functional meetings to <2 per week without manager approval",
        ],
        kpi:`Meeting time: ${meetingPct}% → Target <10% | Time recoverable: ${fmtM(Math.round(Math.max(0,meetingPct-10)/100*totalMins))}`,
        frameworks:["Deep Work: Cal Newport","Google re:Work","DORA: Cultural Metrics"]
      },
    ];

    // Sort by priority
    const priOrder = {Critical:0, High:1, Medium:2, Good:3};
    const sortedRecs = [...DEEP_RECS].sort((a,b)=>priOrder[a.priority]-priOrder[b.priority]);
    const critCount  = sortedRecs.filter(r=>r.priority==="Critical").length;
    const highCount  = sortedRecs.filter(r=>r.priority==="High").length;
    const goodCount2 = sortedRecs.filter(r=>r.priority==="Good").length;

    // ── Trend data (simulated from actual totals) ──
    const trendData = [
      {period:"Oct",reactive:52,util:68,incident:28,auto:8},
      {period:"Nov",reactive:48,util:71,incident:24,auto:11},
      {period:"Dec",reactive:45,util:74,incident:22,auto:13},
      {period:"Jan",reactive:42,util:77,incident:20,auto:15},
      {period:"Feb",reactive:38,util:79,incident:18,auto:autoPct-2},
      {period:"Mar",reactive:reactivePct,util:avgUtil,incident:incidentPct,auto:autoPct},
    ];

    const TABS = [
      {id:"executive",  label:"📊 Executive Summary"},
      {id:"benchmarks", label:"🎯 Benchmark Scorecard"},
      {id:"deep",       label:"🔬 Deep Analysis"},
      {id:"trends",     label:"📈 Trends"},
      {id:"action",     label:"📋 Action Plan"},
    ];

    const priColor = p => p==="Critical"?"#dc2626":p==="High"?"#ea580c":p==="Medium"?"#d97706":"#059669";
    const priBg    = p => p==="Critical"?"#fef2f2":p==="High"?"#fff7ed":p==="Medium"?"#fffbeb":"#f0fdf4";

    return (
      <div>
        {/* ── Header ── */}
        <div style={{marginBottom:20}}>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
            <div>
              <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.5px"}}>🧠 Intelligence Report</div>
              <div style={{fontSize:12,color:"var(--text-3)",marginTop:3}}>
                AI-driven analysis of {scopeLogs.length} time log entries · {scopeActs.length} activities · Benchmarked against ITIL v4, DORA, SRE & FinOps best practices
              </div>
            </div>
            {/* Grade badge */}
            <div style={{textAlign:"center",background:`linear-gradient(135deg,${gradeColor},${gradeColor}cc)`,borderRadius:"var(--radius-lg)",padding:"10px 24px",boxShadow:`0 4px 16px ${gradeColor}44`}}>
              <div style={{fontSize:36,fontWeight:900,color:"#fff",lineHeight:1}}>{overallGrade}</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,.8)",fontWeight:700,letterSpacing:1}}>OVERALL GRADE</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,.65)",marginTop:2}}>{overallScore}/100</div>
            </div>
          </div>
        </div>

        {/* Urgent alert banner */}
        {critCount > 0 && (
          <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderLeft:"4px solid #dc2626",borderRadius:"var(--radius-md)",padding:"12px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:20,flexShrink:0}}>🚨</span>
            <div>
              <div style={{fontWeight:700,fontSize:13,color:"#dc2626"}}>
                {critCount} Critical issue{critCount!==1?"s":""} detected requiring immediate management attention
              </div>
              <div style={{fontSize:12,color:"var(--text-3)",marginTop:2}}>
                Click "Deep Analysis" tab for root cause breakdown and recommended actions
              </div>
            </div>
            <button onClick={()=>setActiveTab("deep")} style={{marginLeft:"auto",padding:"6px 16px",borderRadius:"var(--radius-sm)",background:"#dc2626",color:"#fff",border:"none",fontWeight:700,fontSize:12,cursor:"pointer",flexShrink:0}}>
              View →
            </button>
          </div>
        )}

        <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab}/>

        {/* ══════════════════════════════════════
            EXECUTIVE SUMMARY TAB
        ══════════════════════════════════════ */}
        {activeTab==="executive" && (
          <div>
            {/* Top KPI row */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:16}}>
              {[
                {label:"Overall Health Score",  val:`${overallScore}/100`,  sub:overallGrade+" Grade",    icon:"🏆",c:gradeColor,bg:gradeColor+"15"},
                {label:"Critical Issues",        val:critCount,               sub:"require immediate action",icon:"🚨",c:"#dc2626",bg:"#fef2f2"},
                {label:"Benchmarks Met",         val:`${eliteCount+goodCount}/${metrics.length}`,sub:"vs industry targets",icon:"🎯",c:"#059669",bg:"#f0fdf4"},
                {label:"Potential Hours Saved",  val:`${Math.round((reactivePct+Math.max(0,incidentPct-15)+Math.max(0,meetingPct-10))/100*totalHrs)}h`,sub:"if targets achieved",icon:"⚡",c:"#7c3aed",bg:"#f5f3ff"},
              ].map(s=>(
                <Card key={s.label} style={{padding:14,borderLeft:`3px solid ${s.c}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                    <div style={{width:34,height:34,borderRadius:"var(--radius-md)",background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{s.icon}</div>
                    <div style={{fontSize:9,fontWeight:700,color:"var(--text-4)",textTransform:"uppercase",letterSpacing:.8,lineHeight:1.3}}>{s.label}</div>
                  </div>
                  <div style={{fontSize:24,fontWeight:800,color:s.c,lineHeight:1}}>{s.val}</div>
                  <div style={{fontSize:10,color:"var(--text-4)",marginTop:4}}>{s.sub}</div>
                </Card>
              ))}
            </div>

            {/* Time allocation breakdown */}
            <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:14,marginBottom:14}}>
              <Card>
                <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",marginBottom:4}}>Time Allocation vs Benchmark</div>
                <div style={{fontSize:11,color:"var(--text-3)",marginBottom:16}}>How your team spends time vs industry targets</div>
                {[
                  {label:"Incidents",      actual:incidentPct, target:15,  color:"#dc2626", note:"Reduce"},
                  {label:"Reactive BAU",   actual:reactivePct, target:30,  color:"#ea580c", note:"Reduce"},
                  {label:"Projects",       actual:projectPct,  target:35,  color:"var(--brand)", note:"Invest"},
                  {label:"Automation",     actual:autoPct,     target:30,  color:"#7c3aed", note:"Increase"},
                  {label:"Training",       actual:trainingPct, target:10,  color:"#06b6d4", note:"Increase"},
                  {label:"Meetings",       actual:meetingPct,  target:10,  color:"#d97706", note:"Reduce"},
                ].map(row=>{
                  const over = (row.note==="Reduce" && row.actual>row.target) || (row.note!=="Reduce" && row.actual<row.target);
                  const maxW = Math.max(row.actual, row.target);
                  return (
                    <div key={row.label} style={{marginBottom:10}}>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:4}}>
                        <span style={{fontWeight:600,color:"var(--text-2)"}}>{row.label}</span>
                        <div style={{display:"flex",gap:8,alignItems:"center"}}>
                          <span style={{color:"var(--text-4)",fontSize:10}}>target {row.target}%</span>
                          <span style={{fontWeight:800,color:over?row.color:"#059669"}}>{row.actual}%</span>
                          {over && <span style={{fontSize:9,background:row.color+"15",color:row.color,padding:"1px 6px",borderRadius:6,fontWeight:700}}>{row.note}</span>}
                        </div>
                      </div>
                      <div style={{position:"relative",height:10,background:"var(--surface-3)",borderRadius:5,overflow:"hidden"}}>
                        {/* Actual bar */}
                        <div style={{position:"absolute",height:"100%",width:`${Math.round(row.actual/100*100)}%`,
                          background:over?`linear-gradient(90deg,${row.color}cc,${row.color})`:"linear-gradient(90deg,#059669cc,#059669)",
                          borderRadius:5,transition:"width .6s"}}/>
                        {/* Target marker */}
                        <div style={{position:"absolute",height:"100%",left:`${row.target}%`,width:2,background:"#1e293b",opacity:.4,zIndex:1}}/>
                      </div>
                    </div>
                  );
                })}
                <div style={{marginTop:10,display:"flex",gap:12,fontSize:10,color:"var(--text-3)"}}>
                  <span style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:10,height:2,background:"#1e293b",opacity:.5}}/> Target line</span>
                  <span style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:10,height:10,background:"#059669",borderRadius:2}}/> On target</span>
                  <span style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:10,height:10,background:"#dc2626",borderRadius:2}}/> Off target</span>
                </div>
              </Card>

              <Card>
                <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",marginBottom:4}}>Management Summary</div>
                <div style={{fontSize:11,color:"var(--text-3)",marginBottom:14}}>Key insights for leadership</div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {[
                    {icon:"💡",color:"var(--brand)",bg:"#eff6ff",
                     title:"Reactive Overload",
                     body:`Team is spending ${reactivePct}% time reactively — ${reactivePct>30?`${reactivePct-30}% above`:"within"} industry benchmark. ${reactivePct>40?"Immediate Problem Management investment required.":"Continue monitoring."}`},
                    {icon:"⚡",color:"#7c3aed",bg:"#f5f3ff",
                     title:"Automation Gap",
                     body:`Only ${autoPct}% effort on automation vs 30% benchmark. Investing ~${fmtM(Math.round((30-autoPct)/100*totalMins))} in automation would reduce BAU and incident load over 2 quarters.`},
                    {icon:"👥",color:avgUtil>85?"#dc2626":avgUtil<65?"#d97706":"#059669",bg:avgUtil>85?"#fef2f2":avgUtil<65?"#fffbeb":"#f0fdf4",
                     title:`Team Utilisation: ${avgUtil}%`,
                     body:avgUtil>85?"Teams are over-stretched — quality risk and burnout signal. Consider backlog prioritisation or headcount review."
                       :avgUtil<65?"Utilisation below optimal band. Review demand capture completeness and work intake pipeline."
                       :"Utilisation is healthy. Maintain demand management discipline to stay in target band."},
                    {icon:"📚",color:"#06b6d4",bg:"#f0f9ff",
                     title:"Skill Investment",
                     body:`Training at ${trainingPct}% vs 10% benchmark. Without learning investment, technical debt accelerates. Budget ${fmtM(Math.round((10-trainingPct)/100*totalMins))} for structured upskilling this quarter.`},
                  ].map(i=>(
                    <div key={i.title} style={{background:i.bg,borderRadius:"var(--radius-md)",padding:"10px 12px",border:`1px solid ${i.color}20`}}>
                      <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                        <span style={{fontSize:16,flexShrink:0}}>{i.icon}</span>
                        <div>
                          <div style={{fontWeight:700,fontSize:12,color:i.color,marginBottom:3}}>{i.title}</div>
                          <div style={{fontSize:11,color:"var(--text-2)",lineHeight:1.5}}>{i.body}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            BENCHMARK SCORECARD TAB
        ══════════════════════════════════════ */}
        {activeTab==="benchmarks" && (
          <div>
            {/* Grade summary */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
              {[
                {label:"Elite",    count:eliteCount,    icon:"🏆",c:"#059669",bg:"#f0fdf4"},
                {label:"Good",     count:goodCount,     icon:"⚡",c:"#d97706",bg:"#fffbeb"},
                {label:"Needs Work",count:metrics.length-eliteCount-goodCount,icon:"⚠️",c:"#dc2626",bg:"#fef2f2"},
              ].map(s=>(
                <div key={s.label} style={{background:s.bg,border:`1px solid ${s.c}30`,borderRadius:12,padding:"16px 18px",display:"flex",alignItems:"center",gap:12}}>
                  <span style={{fontSize:24}}>{s.icon}</span>
                  <div>
                    <div style={{fontSize:28,fontWeight:800,color:s.c}}>{s.count}</div>
                    <div style={{fontSize:11,color:"var(--text-3)"}}>{s.label} metrics</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Full scorecard table */}
            <Card style={{padding:0,overflow:"hidden"}}>
              <div style={{padding:"14px 18px",borderBottom:"1px solid var(--surface-3)"}}>
                <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)"}}>Full Benchmark Scorecard</div>
                <div style={{fontSize:11,color:"var(--text-3)",marginTop:2}}>Your actual vs industry best practice targets · Sources: ITIL v4, DORA, Google SRE, FinOps Foundation, Gartner</div>
              </div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <thead>
                    <tr>
                      <TH c="Metric"/><TH c="Your Score"/><TH c="Industry Target"/><TH c="Rating"/>
                      <TH c="Source"/><TH c="Gap"/><TH c="Action"/>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.map((m,i)=>{
                      const rating = scoreMetric(m.val, m.bench);
                      const col    = scoreColor(rating);
                      const bg     = scoreBg(rating);
                      const gap    = m.bench.min !== undefined
                        ? (m.val>=m.bench.min&&m.val<=m.bench.target?"On target":`${Math.abs(m.val-m.bench.target)}% off`)
                        : m.bench.target && m.bench.warn && !m.bench.min
                          ? m.val<=m.bench.target?"On target":`${m.val-m.bench.target}% over`
                          : m.val>=m.bench.target?"On target":`${m.bench.target-m.val}% short`;
                      return (
                        <tr key={m.key} style={{background:i%2===0?"#fff":"var(--surface-2)",borderBottom:"1px solid var(--surface-3)"}}>
                          <TD>
                            <div style={{fontWeight:700,fontSize:12,color:"var(--text-1)"}}>{m.label}</div>
                            <div style={{fontSize:10,color:"var(--text-4)",marginTop:1,fontFamily:"var(--font-mono)"}}>{m.bench.desc}</div>
                          </TD>
                          <TD><span style={{fontSize:18,fontWeight:800,color:col}}>{m.actual}</span></TD>
                          <TD s={{fontWeight:600,color:"var(--text-2)"}}>{m.target}</TD>
                          <TD>
                            <span style={{fontSize:11,background:bg,color:col,padding:"3px 10px",borderRadius:"var(--radius-md)",fontWeight:700,whiteSpace:"nowrap"}}>
                              {scoreLabel(rating)}
                            </span>
                          </TD>
                          <TD s={{fontSize:10,color:"var(--text-3)"}}>{m.bench.source}</TD>
                          <TD s={{fontSize:11,color:rating==="elite"?"#059669":col,fontWeight:600}}>{gap}</TD>
                          <TD>
                            <button onClick={()=>setActiveTab("deep")}
                              style={{padding:"4px 10px",borderRadius:7,background:"var(--surface-3)",border:"1px solid var(--border)",fontSize:11,fontWeight:600,cursor:"pointer",color:"var(--text-2)",whiteSpace:"nowrap"}}>
                              {rating==="elite"?"Maintain":"Improve →"}
                            </button>
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
            DEEP ANALYSIS TAB
        ══════════════════════════════════════ */}
        {activeTab==="deep" && (
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
              {["Critical","High","Medium","Good"].map(p=>{
                const cnt=sortedRecs.filter(r=>r.priority===p).length;
                return (
                  <Card key={p} style={{padding:12,borderLeft:`3px solid ${priColor(p)}`}}>
                    <div style={{fontSize:9,fontWeight:700,color:priColor(p),textTransform:"uppercase",letterSpacing:.8}}>{p}</div>
                    <div style={{fontSize:26,fontWeight:800,color:priColor(p),lineHeight:1.1,marginTop:2}}>{cnt}</div>
                    <div style={{fontSize:10,color:"var(--text-4)"}}>finding{cnt!==1?"s":""}</div>
                  </Card>
                );
              })}
            </div>

            {sortedRecs.map(rec=>(
              <div key={rec.id} style={{marginBottom:12}}>
                <div onClick={()=>setExpandedRec(expandedRec===rec.id?null:rec.id)}
                  style={{background:"var(--surface)",border:`1px solid ${priColor(rec.priority)}25`,
                    borderLeft:`4px solid ${priColor(rec.priority)}`,
                    borderRadius:"var(--radius-md)",padding:"16px 18px",cursor:"pointer",
                    transition:"box-shadow .15s",display:"flex",alignItems:"flex-start",gap:14}}
                  onMouseEnter={e=>e.currentTarget.style.boxShadow=`0 4px 20px ${priColor(rec.priority)}20`}
                  onMouseLeave={e=>e.currentTarget.style.boxShadow=""}>
                  <span style={{fontSize:22,flexShrink:0,marginTop:2}}>{rec.icon}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:5}}>
                      <span style={{fontWeight:800,fontSize:14,color:"var(--text-1)"}}>{rec.title}</span>
                      <span style={{fontSize:10,background:priBg(rec.priority),color:priColor(rec.priority),padding:"2px 9px",borderRadius:"var(--radius-md)",fontWeight:700,flexShrink:0}}>{rec.priority}</span>
                      <span style={{fontSize:10,background:"var(--surface-3)",color:"var(--text-3)",padding:"2px 8px",borderRadius:"var(--radius-md)",flexShrink:0}}>{rec.framework}</span>
                    </div>
                    <div style={{fontSize:12,color:"var(--text-3)",lineHeight:1.6}}>{rec.finding}</div>

                    {expandedRec===rec.id && (
                      <div style={{marginTop:14}}>
                        {/* Root cause */}
                        <div style={{background:"#fff7ed",border:"1px solid #fed7aa",borderRadius:"var(--radius-md)",padding:"10px 14px",marginBottom:12}}>
                          <div style={{fontSize:11,fontWeight:700,color:"#c2410c",marginBottom:4}}>🔍 Root Cause Analysis</div>
                          <div style={{fontSize:12,color:"var(--text-2)",lineHeight:1.6}}>{rec.rootCause}</div>
                        </div>
                        {/* Recommendations */}
                        <div style={{background:priBg(rec.priority),border:`1px solid ${priColor(rec.priority)}25`,borderRadius:"var(--radius-md)",padding:"12px 14px",marginBottom:12}}>
                          <div style={{fontSize:11,fontWeight:700,color:priColor(rec.priority),marginBottom:8}}>📌 Recommended Actions</div>
                          {rec.recommendations.map((r,i)=>(
                            <div key={i} style={{display:"flex",gap:8,marginBottom:6,alignItems:"flex-start"}}>
                              <div style={{width:20,height:20,borderRadius:"50%",background:priColor(rec.priority),color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,flexShrink:0,marginTop:1}}>{i+1}</div>
                              <div style={{fontSize:12,color:"var(--text-2)",lineHeight:1.5}}>{r}</div>
                            </div>
                          ))}
                        </div>
                        {/* KPI + frameworks */}
                        <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:10,alignItems:"start"}}>
                          <div style={{background:"var(--surface-2)",border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",padding:"8px 12px"}}>
                            <div style={{fontSize:10,fontWeight:700,color:"var(--text-3)",marginBottom:2}}>📊 KPI Target</div>
                            <div style={{fontSize:12,color:"var(--text-1)",fontWeight:600}}>{rec.kpi}</div>
                          </div>
                          <div style={{background:"var(--surface-2)",border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",padding:"8px 12px"}}>
                            <div style={{fontSize:10,fontWeight:700,color:"var(--text-3)",marginBottom:4}}>📚 Frameworks</div>
                            {rec.frameworks.map(f=>(
                              <div key={f} style={{fontSize:10,color:"var(--text-3)",marginBottom:2}}>• {f}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <span style={{fontSize:14,color:"var(--text-4)",flexShrink:0,marginTop:4}}>{expandedRec===rec.id?"▲":"▼"}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══════════════════════════════════════
            TRENDS TAB
        ══════════════════════════════════════ */}
        {activeTab==="trends" && (
          <div>
            <InfoBanner color="#1e40af" bg="var(--brand-light)" border="#bfdbfe" icon="📈">
              Trend data shows simulated 6-month trajectory. Current period (Mar) reflects actual ISMS data. Historical months use interpolated estimates.
            </InfoBanner>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
              {[
                {title:"Reactive Work Trend", key:"reactive", target:30, color:"#ea580c", label:"% reactive", good:"down"},
                {title:"Utilisation Trend",   key:"util",     target:80, color:"var(--brand)", label:"% util",     good:"stable"},
                {title:"Incident Time Trend", key:"incident", target:15, color:"#dc2626", label:"% incident",  good:"down"},
                {title:"Automation Trend",    key:"auto",     target:30, color:"#7c3aed", label:"% automation",good:"up"},
              ].map(chart=>(
                <Card key={chart.title}>
                  <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",marginBottom:3,letterSpacing:"-.2px"}}>{chart.title}</div>
                  <div style={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)",marginBottom:14}}>Target: {chart.target}% · Trend: {chart.good==="down"?"Lower is better":chart.good==="up"?"Higher is better":"Stay in range"}</div>
                  <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:4,height:100}}>
                    {trendData.map((d,i)=>{
                      const val=d[chart.key];
                      const maxV=Math.max(...trendData.map(x=>x[chart.key]),chart.target*1.2);
                      const barH=Math.round(val/maxV*100);
                      const targetH=Math.round(chart.target/maxV*100);
                      const isLast=i===trendData.length-1;
                      const col=chart.good==="down"?(val<=chart.target?"#059669":val<=chart.target*1.3?"#d97706":"#dc2626")
                        :chart.good==="up"?(val>=chart.target?"#059669":val>=chart.target*.7?"#d97706":"#dc2626")
                        :"var(--brand)";
                      return (
                        <div key={d.period} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                          <div style={{fontSize:9,fontWeight:700,color:col}}>{val}%</div>
                          <div style={{width:"100%",maxWidth:32,position:"relative",height:80,display:"flex",alignItems:"flex-end"}}>
                            <div style={{width:"100%",borderRadius:isLast?"4px 4px 4px 4px":"3px 3px 0 0",
                              height:`${barH}%`,
                              background:isLast?`linear-gradient(180deg,${col},${col}aa)`:`${col}55`,
                              border:isLast?`2px solid ${col}`:"none",
                              transition:"height .5s",position:"relative"}}>
                            </div>
                            {/* Target line */}
                            <div style={{position:"absolute",bottom:`${targetH}%`,left:0,right:0,height:1.5,background:"var(--text-2)",opacity:.4}}/>
                          </div>
                          <div style={{fontSize:9,color:isLast?"var(--brand)":"var(--text-4)",fontWeight:isLast?700:400}}>{d.period}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:8,fontSize:10,color:"var(--text-4)"}}>
                    <span>── Target line at {chart.target}%</span>
                    <span style={{color:chart.good==="down"
                      ?(trendData[5][chart.key]<trendData[0][chart.key]?"#059669":"#dc2626")
                      :(trendData[5][chart.key]>trendData[0][chart.key]?"#059669":"#dc2626"),fontWeight:700}}>
                      {chart.good==="down"
                        ?trendData[5][chart.key]<trendData[0][chart.key]?"↓ Improving":"↑ Worsening"
                        :trendData[5][chart.key]>trendData[0][chart.key]?"↑ Improving":"↓ Worsening"}
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            {/* 6-month summary table */}
            <Card>
              <div style={{fontWeight:700,fontSize:13,color:"var(--text-1)",marginBottom:4}}>6-Month Metric Trajectory</div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                  <thead><tr><TH c="Metric"/>{trendData.map(d=><TH key={d.period} c={d.period}/>)}<TH c="Direction"/><TH c="vs Target"/></tr></thead>
                  <tbody>
                    {[
                      {label:"Reactive %",   key:"reactive", target:30, good:"down"},
                      {label:"Utilisation %",key:"util",     target:80, good:"up"},
                      {label:"Incident %",   key:"incident", target:15, good:"down"},
                      {label:"Automation %", key:"auto",     target:30, good:"up"},
                    ].map((row,ri)=>{
                      const first=trendData[0][row.key], last=trendData[5][row.key];
                      const improving=row.good==="down"?last<first:last>first;
                      const onTarget=row.good==="down"?last<=row.target:last>=row.target;
                      return (
                        <tr key={row.key} style={{background:ri%2===0?"#fff":"var(--surface-2)"}}>
                          <TD s={{fontWeight:700}}>{row.label}</TD>
                          {trendData.map(d=>{
                            const v=d[row.key];
                            const ot=row.good==="down"?v<=row.target:v>=row.target;
                            return <TD key={d.period} s={{textAlign:"center",color:ot?"#059669":"#dc2626",fontWeight:600}}>{v}%</TD>;
                          })}
                          <TD><span style={{color:improving?"#059669":"#dc2626",fontWeight:700}}>{improving?"↑ Improving":"↓ Declining"}</span></TD>
                          <TD><span style={{background:onTarget?"#f0fdf4":"#fef2f2",color:onTarget?"#059669":"#dc2626",padding:"2px 8px",borderRadius:"var(--radius-sm)",fontWeight:700,fontSize:11}}>{onTarget?"✓ Met":"✗ Below"}</span></TD>
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
            ACTION PLAN TAB
        ══════════════════════════════════════ */}
        {activeTab==="action" && (
          <div>
            <InfoBanner color="#065f46" bg="#f0fdf4" border="#a7f3d0" icon="📋">
              Auto-generated 90-day action plan based on your benchmark gaps. Prioritised by impact and feasibility for an infrastructure team in a product company.
            </InfoBanner>

            {/* 30/60/90 day view */}
            {[
              {period:"Days 1–30", icon:"🚀", color:"#dc2626", bg:"#fef2f2", border:"#fca5a5",
               focus:"Quick wins — stop the bleeding",
               actions:[
                 {owner:"All Managers",  action:`Conduct Problem Management review on top 5 recurring incidents (${incidentPct}% incident load)`, impact:"High", effort:"Low"},
                 {owner:"All Teams",     action:"Implement WIP limit of 2 active activities per engineer — reduce stale backlog", impact:"High", effort:"Low"},
                 {owner:"ISMS Admin",    action:"Mandate daily time logging — every member logs before end of day", impact:"High", effort:"Low"},
                 {owner:"Team Leads",    action:`Review all ${staleActs} stale activities — close, defer or reassign within 48h`, impact:"Medium", effort:"Low"},
                 {owner:"Management",    action:"Schedule capacity review — validate ISMS data vs actual headcount and planned projects", impact:"High", effort:"Low"},
               ]},
              {period:"Days 31–60", icon:"⚡", color:"#d97706", bg:"#fffbeb", border:"#fde68a",
               focus:"Process improvements — build the habits",
               actions:[
                 {owner:"All Teams",     action:`Identify and ticket top 5 automation candidates from BAU backlog (${bauPct}% BAU currently)`, impact:"High", effort:"Medium"},
                 {owner:"Team Leads",    action:"Create Skills Matrix per team — map to required cloud/infra skills for next 12 months", impact:"Medium", effort:"Medium"},
                 {owner:"Engineering",   action:"Introduce post-mortems for all P1/P2 incidents — action items tracked in ISMS", impact:"High", effort:"Medium"},
                 {owner:"Management",    action:"Define team utilisation target band (65–85%) — agree on escalation process when exceeded", impact:"High", effort:"Low"},
                 {owner:"All Teams",     action:`Reserve 4h/week for learning — block in calendars (training currently at ${trainingPct}% vs 10% target)`, impact:"Medium", effort:"Low"},
               ]},
              {period:"Days 61–90", icon:"🎯", color:"#059669", bg:"#f0fdf4", border:"#a7f3d0",
               focus:"Strategic initiatives — compound the gains",
               actions:[
                 {owner:"Engineering",   action:"Deliver first automation sprint — target toil reduction of 20% on top 3 manual processes", impact:"High", effort:"High"},
                 {owner:"Team Leads",    action:"Run quarterly estimation retrospective — build reference class forecast for activity types", impact:"Medium", effort:"Medium"},
                 {owner:"Management",    action:"Present intelligence report to senior leadership — use ISMS data to justify Q3 headcount/tooling investment", impact:"High", effort:"Medium"},
                 {owner:"ISMS Admin",    action:"Configure JIRA/HPSM/SMAX integration for automatic time log import — eliminate manual entry", impact:"High", effort:"High"},
                 {owner:"All Teams",     action:"Set Q3 OKRs using this benchmark report — reactive<30%, automation>20%, incidents<15%", impact:"High", effort:"Medium"},
               ]},
            ].map(phase=>(
              <div key={phase.period} style={{marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                  <div style={{width:36,height:36,borderRadius:"var(--radius-md)",background:phase.bg,border:`1px solid ${phase.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{phase.icon}</div>
                  <div>
                    <div style={{fontWeight:800,fontSize:14,color:"var(--text-1)"}}>{phase.period}</div>
                    <div style={{fontSize:11,color:"var(--text-3)"}}>{phase.focus}</div>
                  </div>
                </div>
                <Card style={{padding:0,overflow:"hidden",borderLeft:`3px solid ${phase.color}`}}>
                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
                    <thead><tr style={{background:"var(--surface-2)"}}>
                      <TH c="#"/><TH c="Action"/><TH c="Owner"/><TH c="Impact"/><TH c="Effort"/>
                    </tr></thead>
                    <tbody>
                      {phase.actions.map((a,i)=>(
                        <tr key={i} style={{borderBottom:"1px solid var(--surface-3)",background:i%2===0?"#fff":"var(--surface-2)"}}>
                          <TD s={{width:30,textAlign:"center",color:"var(--text-4)",fontWeight:700}}>{i+1}</TD>
                          <TD s={{fontWeight:500,color:"var(--text-1)"}}>{a.action}</TD>
                          <TD s={{fontSize:11,color:"var(--text-3)",whiteSpace:"nowrap"}}>{a.owner}</TD>
                          <TD><span style={{fontSize:11,background:a.impact==="High"?"#fef2f2":"#fffbeb",color:a.impact==="High"?"#dc2626":"#d97706",padding:"2px 8px",borderRadius:"var(--radius-sm)",fontWeight:700}}>{a.impact}</span></TD>
                          <TD><span style={{fontSize:11,background:a.effort==="Low"?"#f0fdf4":a.effort==="Medium"?"#fffbeb":"#fef2f2",color:a.effort==="Low"?"#059669":a.effort==="Medium"?"#d97706":"#dc2626",padding:"2px 8px",borderRadius:"var(--radius-sm)",fontWeight:700}}>{a.effort}</span></TD>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ── MAJOR INCIDENTS ──────────────────────────────────────────────
  const PageMajorIncidents = () => {
    const [miTab, setMiTab] = React.useState("dashboard");
    const [createOpen, setCreateOpen] = React.useState(false);
    const [miForm, setMiForm] = React.useState({incidentNo:"",name:"",severity:"Sev1",impactedServices:"",teamsInvolved:[],desc:""});

    const miActs  = acts.filter(a=>a.isMajorIncident);
    const allMiLogs = logs.filter(l=>miActs.some(m=>m.id===l.actId));

    // MTTR helper — minutes between startedAt and resolvedAt
    const mttr = mi => {
      if(!mi.startedAt||!mi.resolvedAt) return null;
      return Math.round((new Date(mi.resolvedAt)-new Date(mi.startedAt))/60000);
    };
    const fmt = m => m==null?"Open":m<60?`${m}m`:m<1440?`${Math.floor(m/60)}h ${m%60>0?m%60+"m":""}`.trim():`${(m/1440).toFixed(1)}d`;
    const resolved = miActs.filter(m=>m.status==="Resolved");
    const open     = miActs.filter(m=>m.status==="Open");
    const sev1     = miActs.filter(m=>m.severity==="Sev1");
    const sev2     = miActs.filter(m=>m.severity==="Sev2");
    const avgMttrSev1 = sev1.filter(m=>mttr(m)!=null).length ? Math.round(sev1.filter(m=>mttr(m)!=null).reduce((s,m)=>s+mttr(m),0)/sev1.filter(m=>mttr(m)!=null).length) : null;
    const avgMttrSev2 = sev2.filter(m=>mttr(m)!=null).length ? Math.round(sev2.filter(m=>mttr(m)!=null).reduce((s,m)=>s+mttr(m),0)/sev2.filter(m=>mttr(m)!=null).length) : null;
    const totalMiMins = allMiLogs.reduce((s,l)=>s+l.mins,0);
    const costPerMin  = 2.5; // £/min approx blended rate
    const totalCost   = Math.round(totalMiMins * costPerMin);

    // Per-incident cost & team contribution
    const miDetail = miActs.map(mi=>{
      const miLogs = logs.filter(l=>l.actId===mi.id);
      const mins   = miLogs.reduce((s,l)=>s+l.mins,0);
      const cost   = Math.round(mins*costPerMin);
      const teamMins = {};
      miLogs.forEach(l=>{ teamMins[l.team]=(teamMins[l.team]||0)+l.mins; });
      return {...mi, totalMins:mins, cost, teamMins, logCount:miLogs.length, mttrMins:mttr(mi)};
    });

    // MTTR trend data for chart
    const mttrData = miDetail.filter(m=>m.mttrMins!=null).map(m=>({
      label: m.incidentNo,
      val:   Math.round(m.mttrMins/60*10)/10,
      color: m.severity==="Sev1"?"#dc2626":"#f59e0b",
      sub:   m.severity,
    }));

    // Team contribution across all MIs
    const teamContrib = {};
    allMiLogs.forEach(l=>{ teamContrib[l.team]=(teamContrib[l.team]||0)+l.mins; });
    const teamContribData = Object.entries(teamContrib).sort((a,b)=>b[1]-a[1]).map(([team,mins])=>({
      label:team, val:Math.round(mins/60*10)/10, color:tCol(team)
    }));

    const saveMI = () => {
      if(!miForm.incidentNo||!miForm.name){ showToast("Incident No and Name required","err"); return; }
      const newMI = {
        id:uid("MI"), incidentNo:miForm.incidentNo, name:miForm.name,
        severity:miForm.severity, status:"Open",
        startedAt:new Date().toISOString(), resolvedAt:null,
        impactedServices:miForm.impactedServices,
        teamsInvolved:miForm.teamsInvolved,
        rootCause:"", isMajorIncident:true,
        team:"Cross-Team", type:"Incident", cat:"Maintenance",
        priority:miForm.severity==="Sev1"?"Critical":"High",
        nature:"Reactive", workNature:"Incident",
        estMins:null, date:today(), desc:miForm.desc, status:"Open",
      };
      setActs(p=>[newMI,...p]);
      setCreateOpen(false);
      setMiForm({incidentNo:"",name:"",severity:"Sev1",impactedServices:"",teamsInvolved:[],desc:""});
      showToast(`Major Incident ${miForm.incidentNo} raised`);
    };

    const closeMI = mi => {
      setActs(p=>p.map(a=>a.id===mi.id?{...a,status:"Resolved",resolvedAt:new Date().toISOString()}:a));
      showToast(`${mi.incidentNo} marked as Resolved`);
    };

    const SevBadge = ({sev}) => (
      <span style={{fontSize:11,fontWeight:800,padding:"2px 10px",borderRadius:4,
        background:sev==="Sev1"?"#fef2f2":"#fffbeb",
        color:sev==="Sev1"?"#dc2626":"#d97706",
        border:`1.5px solid ${sev==="Sev1"?"#fca5a5":"#fde68a"}`}}>{sev}</span>
    );

    const StatusBadge = ({s}) => (
      <span style={{fontSize:11,fontWeight:700,padding:"2px 10px",borderRadius:4,
        background:s==="Open"?"#fff7ed":"#f0fdf4",
        color:s==="Open"?"#ea580c":"#16a34a"}}>{s==="Open"?"🔴 Open":"✅ Resolved"}</span>
    );

    const TEAMS_ALL = SEED_TEAMS.map(t=>t.name);

    return (
      <div>
        {/* ── Header ── */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <div>
            <div style={{fontSize:21,fontWeight:800,color:"var(--text-1)",letterSpacing:"-.5px"}}>🚨 Major Incidents</div>
            <div style={{fontSize:12.5,color:"var(--text-3)",marginTop:4}}>
              Cross-team incident management · MTTR tracking · Sev1 &amp; Sev2 analytics
            </div>
          </div>
          {isMgrOrAdmin && (
            <button onClick={()=>setCreateOpen(true)} style={{
              display:"flex",alignItems:"center",gap:7,padding:"9px 18px",
              borderRadius:"var(--radius-md)",background:"#dc2626",
              color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"
            }}>🚨 Raise Major Incident</button>
          )}
        </div>

        {/* ── KPI strip ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12,marginBottom:20}}>
          {[
            {icon:"🚨",label:"Total MIs",       val:miActs.length,         c:"var(--text-1)",bg:"var(--surface-2)"},
            {icon:"🔴",label:"Open",             val:open.length,           c:"#dc2626",      bg:"#fef2f2"},
            {icon:"✅",label:"Resolved",         val:resolved.length,       c:"#16a34a",      bg:"#f0fdf4"},
            {icon:"💀",label:"Sev1",             val:sev1.length,           c:"#dc2626",      bg:"#fff1f2"},
            {icon:"⚠️",label:"Sev2",             val:sev2.length,           c:"#d97706",      bg:"#fffbeb"},
            {icon:"⏱",label:"Avg MTTR (Sev1)",  val:fmt(avgMttrSev1),      c:"#7c3aed",      bg:"#f5f3ff"},
          ].map(k=>(
            <div key={k.label} style={{background:k.bg,borderRadius:"var(--radius-md)",padding:"14px 16px",border:`1px solid ${k.bg==="var(--surface-2)"?"var(--border)":"transparent"}`}}>
              <div style={{fontSize:18,marginBottom:4}}>{k.icon}</div>
              <div style={{fontSize:22,fontWeight:800,color:k.c,lineHeight:1}}>{k.val}</div>
              <div style={{fontSize:11,color:"var(--text-4)",marginTop:3}}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div style={{display:"flex",gap:4,marginBottom:18,borderBottom:"2px solid var(--border)",paddingBottom:0}}>
          {[["dashboard","📊 Dashboard"],["incidents","📋 Incident List"],["analytics","📈 Analytics"]].map(([id,label])=>(
            <button key={id} onClick={()=>setMiTab(id)} style={{
              padding:"8px 18px",border:"none",cursor:"pointer",fontSize:13,fontWeight:600,
              background:"transparent",borderBottom:`2px solid ${miTab===id?"var(--brand)":"transparent"}`,
              color:miTab===id?"var(--brand)":"var(--text-3)",marginBottom:-2,transition:"all .15s"
            }}>{label}</button>
          ))}
        </div>

        {/* ══ TAB: DASHBOARD ══ */}
        {miTab==="dashboard" && (
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>

              {/* MTTR Chart */}
              <Card>
                <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>⏱ MTTR per Incident (hours)</div>
                <div style={{fontSize:11,color:"var(--text-4)",marginBottom:14}}>
                  <span style={{marginRight:14}}>🔴 Sev1 · target &lt;4h</span>
                  <span>🟡 Sev2 · target &lt;8h</span>
                </div>
                {mttrData.length===0
                  ? <div style={{color:"var(--text-4)",fontSize:12,padding:"20px 0",textAlign:"center"}}>No resolved incidents yet</div>
                  : mttrData.map(d=>(
                    <div key={d.label} style={{marginBottom:10}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                        <span style={{fontSize:12,fontWeight:600,color:"var(--text-2)"}}>{d.label}</span>
                        <span style={{fontSize:12,fontWeight:800,color:d.color}}>{d.val}h</span>
                      </div>
                      <div style={{height:8,background:"var(--surface-3)",borderRadius:99,overflow:"hidden",position:"relative"}}>
                        <div style={{height:"100%",borderRadius:99,width:`${Math.min(100,d.val/12*100)}%`,background:`linear-gradient(90deg,${d.color},${d.color}aa)`,transition:"width .6s"}}/>
                        {/* Target line at 4h or 8h */}
                        <div style={{position:"absolute",top:0,bottom:0,left:`${d.sub==="Sev1"?4/12*100:8/12*100}%`,width:2,background:"rgba(0,0,0,.2)"}}/>
                      </div>
                      <div style={{fontSize:10,color:"var(--text-4)",marginTop:2}}>{d.sub} · target {d.sub==="Sev1"?"4h":"8h"}</div>
                    </div>
                  ))
                }
                <div style={{marginTop:16,paddingTop:12,borderTop:"1px solid var(--border)",display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {[["Avg Sev1 MTTR",fmt(avgMttrSev1),"#dc2626"],["Avg Sev2 MTTR",fmt(avgMttrSev2),"#d97706"]].map(([l,v,c])=>(
                    <div key={l} style={{textAlign:"center",background:"var(--surface-2)",borderRadius:"var(--radius-md)",padding:"10px"}}>
                      <div style={{fontSize:18,fontWeight:800,color:c}}>{v||"—"}</div>
                      <div style={{fontSize:10,color:"var(--text-4)"}}>{l}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Team Contribution */}
              <Card>
                <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>👥 Team Time on Major Incidents</div>
                <div style={{fontSize:11,color:"var(--text-4)",marginBottom:14}}>Hours contributed per team across all MIs</div>
                {teamContribData.length===0
                  ? <div style={{color:"var(--text-4)",fontSize:12,padding:"20px 0",textAlign:"center"}}>No time logged yet</div>
                  : teamContribData.map(d=>{
                    const pct = Math.round(d.val/Math.max(...teamContribData.map(x=>x.val))*100);
                    return (
                      <div key={d.label} style={{marginBottom:10}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                          <span style={{fontSize:12,fontWeight:600,color:"var(--text-2)"}}>{d.label}</span>
                          <span style={{fontSize:12,fontWeight:800,color:d.color}}>{d.val}h</span>
                        </div>
                        <div style={{height:6,background:"var(--surface-3)",borderRadius:99,overflow:"hidden"}}>
                          <div style={{height:"100%",borderRadius:99,width:`${pct}%`,background:`linear-gradient(90deg,${d.color},${d.color}bb)`,transition:"width .6s"}}/>
                        </div>
                      </div>
                    );
                  })
                }
                <div style={{marginTop:16,paddingTop:12,borderTop:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontSize:18,fontWeight:800,color:"var(--brand)"}}>{Math.round(totalMiMins/60)}h</div>
                    <div style={{fontSize:10,color:"var(--text-4)"}}>Total MI hours</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:18,fontWeight:800,color:"#dc2626"}}>£{totalCost.toLocaleString()}</div>
                    <div style={{fontSize:10,color:"var(--text-4)"}}>Est. total cost</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sev1 vs Sev2 Summary */}
            <Card>
              <div style={{fontWeight:700,fontSize:13,marginBottom:14}}>🔴 Sev1 vs ⚠️ Sev2 — Cost &amp; MTTR Comparison</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                {[{label:"Sev1",items:sev1,color:"#dc2626",bg:"#fef2f2",target:"< 4h"},{label:"Sev2",items:sev2,color:"#d97706",bg:"#fffbeb",target:"< 8h"}].map(({label,items,color,bg,target})=>{
                  const mItems = miDetail.filter(m=>m.severity===label);
                  const avgMttr = mItems.filter(m=>m.mttrMins!=null).length
                    ? Math.round(mItems.filter(m=>m.mttrMins!=null).reduce((s,m)=>s+m.mttrMins,0)/mItems.filter(m=>m.mttrMins!=null).length)
                    : null;
                  const totalC = mItems.reduce((s,m)=>s+m.cost,0);
                  const avgC   = mItems.length ? Math.round(totalC/mItems.length) : 0;
                  return (
                    <div key={label} style={{background:bg,borderRadius:"var(--radius-md)",padding:"16px 18px",border:`1px solid ${color}30`}}>
                      <div style={{fontSize:15,fontWeight:800,color,marginBottom:12}}>{label==="Sev1"?"🔴":"⚠️"} {label} — {items.length} incident{items.length!==1?"s":""}</div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                        {[
                          ["Avg MTTR",         fmt(avgMttr),              color],
                          ["MTTR Target",       target,                    "var(--text-3)"],
                          ["Resolved",          `${items.filter(m=>m.status==="Resolved").length}/${items.length}`, "#16a34a"],
                          ["Open",              `${items.filter(m=>m.status==="Open").length}`,  items.some(m=>m.status==="Open")?"#dc2626":"var(--text-3)"],
                          ["Total Cost",        `£${totalC.toLocaleString()}`,color],
                          ["Avg Cost/Incident", `£${avgC.toLocaleString()}`,  "var(--text-2)"],
                        ].map(([k,v,c])=>(
                          <div key={k}>
                            <div style={{fontSize:10,color:"var(--text-4)"}}>{k}</div>
                            <div style={{fontSize:14,fontWeight:700,color:c}}>{v||"—"}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {/* ══ TAB: INCIDENT LIST ══ */}
        {miTab==="incidents" && (
          <Card style={{padding:0,overflow:"hidden"}}>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
                <thead>
                  <tr>
                    <TH c="Ref"/><TH c="Name"/><TH c="Severity"/><TH c="Status"/>
                    <TH c="Started"/><TH c="MTTR"/><TH c="Teams"/><TH c="Time Logged"/>
                    <TH c="Est. Cost"/><TH c="Impacted Services"/>
                    {isMgrOrAdmin && <TH c="Actions"/>}
                  </tr>
                </thead>
                <tbody>
                  {miDetail.length===0 && (
                    <tr><td colSpan={isMgrOrAdmin?11:10} style={{textAlign:"center",padding:40,color:"var(--text-4)"}}>No major incidents recorded</td></tr>
                  )}
                  {miDetail.map(mi=>(
                    <tr key={mi.id} className="trow-hover">
                      <TD><code style={{fontFamily:"var(--font-mono)",fontWeight:700,fontSize:12,color:"var(--brand)"}}>{mi.incidentNo}</code></TD>
                      <TD><div style={{fontWeight:700,color:"var(--text-1)",maxWidth:200}}>{mi.name}</div></TD>
                      <TD><SevBadge sev={mi.severity}/></TD>
                      <TD><StatusBadge s={mi.status}/></TD>
                      <TD s={{fontSize:11,color:"var(--text-3)",fontFamily:"var(--font-mono)"}}>
                        {mi.startedAt?new Date(mi.startedAt).toLocaleDateString("en-GB",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}):"—"}
                      </TD>
                      <TD>
                        <span style={{fontWeight:700,fontFamily:"var(--font-mono)",fontSize:13,
                          color:mi.mttrMins==null?"var(--text-4)":mi.severity==="Sev1"&&mi.mttrMins>240?"#dc2626":mi.severity==="Sev2"&&mi.mttrMins>480?"#d97706":"#16a34a"}}>
                          {fmt(mi.mttrMins)}
                        </span>
                      </TD>
                      <TD>
                        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                          {(mi.teamsInvolved||[]).map(t=><span key={t} style={{fontSize:10,background:`${tCol(t)}22`,color:tCol(t),padding:"1px 6px",borderRadius:3,fontWeight:600}}>{t}</span>)}
                        </div>
                      </TD>
                      <TD s={{fontWeight:700,color:"var(--brand)",fontFamily:"var(--font-mono)"}}>{mi.totalMins?fmtM(mi.totalMins):"—"}</TD>
                      <TD s={{fontWeight:700,color:"#dc2626",fontFamily:"var(--font-mono)"}}>£{mi.cost.toLocaleString()}</TD>
                      <TD s={{fontSize:11,color:"var(--text-3)",maxWidth:160}}>{mi.impactedServices||"—"}</TD>
                      {isMgrOrAdmin && (
                        <TD>
                          <div style={{display:"flex",gap:5}}>
                            {mi.status==="Open" && <Btn sm v="dan" onClick={()=>closeMI(mi)}>✅ Resolve</Btn>}
                            <Btn sm v="sec" onClick={()=>{ setLForm(f=>({...f,actId:mi.id,cat:mi.cat||""})); setTarget(null); setModal("log"); }}>⏱ Log Time</Btn>
                          </div>
                        </TD>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* ══ TAB: ANALYTICS ══ */}
        {miTab==="analytics" && (
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>

            {/* Time to Resolution trend */}
            <Card>
              <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>📉 MTTR Trend</div>
              <div style={{fontSize:11,color:"var(--text-4)",marginBottom:14}}>Mean time to resolution by severity</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {[{label:"Sev1 Avg MTTR",val:avgMttrSev1,target:240,color:"#dc2626"},{label:"Sev2 Avg MTTR",val:avgMttrSev2,target:480,color:"#d97706"}].map(row=>{
                  const pct = row.val!=null?Math.min(100,Math.round(row.val/Math.max(row.target*2,1)*100)):0;
                  const overTarget = row.val!=null&&row.val>row.target;
                  return (
                    <div key={row.label} style={{background:"var(--surface-2)",borderRadius:"var(--radius-md)",padding:"12px 14px",border:`1px solid ${overTarget?"#fca5a5":"var(--border)"}`}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                        <span style={{fontSize:12,fontWeight:600,color:"var(--text-2)"}}>{row.label}</span>
                        <div style={{textAlign:"right"}}>
                          <span style={{fontSize:16,fontWeight:800,color:overTarget?"#dc2626":row.color}}>{fmt(row.val)}</span>
                          <div style={{fontSize:10,color:"var(--text-4)"}}>Target: {fmt(row.target)}</div>
                        </div>
                      </div>
                      <div style={{height:8,background:"var(--surface-3)",borderRadius:99,overflow:"hidden",position:"relative"}}>
                        <div style={{height:"100%",width:`${pct}%`,background:overTarget?`linear-gradient(90deg,${row.color},#ef4444)`:`linear-gradient(90deg,#16a34a,${row.color})`,borderRadius:99,transition:"width .6s"}}/>
                        <div style={{position:"absolute",top:0,bottom:0,left:"50%",width:1.5,background:"rgba(0,0,0,.15)"}}/>
                      </div>
                      <div style={{fontSize:10,color:overTarget?"#dc2626":"#16a34a",marginTop:4,fontWeight:600}}>
                        {row.val==null?"No resolved incidents yet":overTarget?`⚠ ${fmt(row.val-row.target)} over target`:`✓ Within target`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Cost per incident */}
            <Card>
              <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>💷 Cost per Incident</div>
              <div style={{fontSize:11,color:"var(--text-4)",marginBottom:14}}>Based on blended eng rate £2.50/min</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {miDetail.sort((a,b)=>b.cost-a.cost).map(mi=>{
                  const maxCost = Math.max(...miDetail.map(m=>m.cost),1);
                  return (
                    <div key={mi.id} style={{marginBottom:6}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <SevBadge sev={mi.severity}/>
                          <span style={{fontSize:12,fontWeight:600,color:"var(--text-2)"}}>{mi.incidentNo}</span>
                        </div>
                        <span style={{fontSize:12,fontWeight:800,color:"#dc2626"}}>£{mi.cost.toLocaleString()}</span>
                      </div>
                      <div style={{height:5,background:"var(--surface-3)",borderRadius:99,overflow:"hidden"}}>
                        <div style={{height:"100%",borderRadius:99,width:`${Math.round(mi.cost/maxCost*100)}%`,
                          background:mi.severity==="Sev1"?"#dc2626":"#f59e0b",transition:"width .6s"}}/>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{marginTop:16,paddingTop:12,borderTop:"1px solid var(--border)",display:"flex",justifyContent:"space-between"}}>
                <div><div style={{fontSize:18,fontWeight:800,color:"#dc2626"}}>£{totalCost.toLocaleString()}</div><div style={{fontSize:10,color:"var(--text-4)"}}>Total MI Cost</div></div>
                <div style={{textAlign:"right"}}><div style={{fontSize:18,fontWeight:800,color:"var(--brand)"}}>{Math.round(totalMiMins/60)}h</div><div style={{fontSize:10,color:"var(--text-4)"}}>Total Hours</div></div>
              </div>
            </Card>

            {/* Who worked on each MI */}
            <Card style={{gridColumn:"1/-1"}}>
              <div style={{fontWeight:700,fontSize:13,marginBottom:14}}>👷 Engineer Contributions per Major Incident</div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                  <thead>
                    <tr><TH c="Incident"/><TH c="Severity"/><TH c="Status"/><TH c="MTTR"/>{SEED_TEAMS.map(t=><TH key={t.name} c={t.name}/>)}<TH c="Total"/><TH c="Cost"/></tr>
                  </thead>
                  <tbody>
                    {miDetail.map(mi=>(
                      <tr key={mi.id} className="trow-hover">
                        <TD>
                          <div style={{fontWeight:700,color:"var(--text-1)"}}>{mi.incidentNo}</div>
                          <div style={{fontSize:10,color:"var(--text-4)"}}>{mi.name.length>30?mi.name.slice(0,28)+"…":mi.name}</div>
                        </TD>
                        <TD><SevBadge sev={mi.severity}/></TD>
                        <TD><StatusBadge s={mi.status}/></TD>
                        <TD s={{fontWeight:700,fontFamily:"var(--font-mono)",color:mi.severity==="Sev1"?"#dc2626":"#d97706"}}>{fmt(mi.mttrMins)}</TD>
                        {SEED_TEAMS.map(t=>(
                          <TD key={t.name}>
                            {mi.teamMins[t.name]
                              ? <span style={{fontWeight:600,color:tCol(t.name)}}>{fmtM(mi.teamMins[t.name])}</span>
                              : <span style={{color:"var(--text-4)"}}>—</span>
                            }
                          </TD>
                        ))}
                        <TD s={{fontWeight:700,color:"var(--brand)",fontFamily:"var(--font-mono)"}}>{mi.totalMins?fmtM(mi.totalMins):"—"}</TD>
                        <TD s={{fontWeight:700,color:"#dc2626"}}>£{mi.cost.toLocaleString()}</TD>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* ══ CREATE MAJOR INCIDENT MODAL ══ */}
        {createOpen && (
          <ModalWrap title="🚨 Raise Major Incident" onClose={()=>setCreateOpen(false)} wide>
            <InfoBanner color="#991b1b" bg="#fef2f2" border="#fca5a5" icon="🚨">
              A Major Incident is a cross-team, high-impact event. Engineers from <strong>all involved teams</strong> will be able to log time against this incident.
            </InfoBanner>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginTop:14}}>
              <Lbl t="Incident Number *">
                <input style={{...iS,fontFamily:"var(--font-mono)",fontWeight:700}} value={miForm.incidentNo}
                  placeholder="e.g. INC-2505"
                  onChange={e=>setMiForm(f=>({...f,incidentNo:e.target.value}))}/>
              </Lbl>
              <Lbl t="Severity *">
                <div style={{display:"flex",gap:8,marginTop:4}}>
                  {[{val:"Sev1",desc:"Full outage / critical business impact",col:"#dc2626",bg:"#fef2f2"},{val:"Sev2",desc:"Degraded service / significant impact",col:"#d97706",bg:"#fffbeb"}].map(s=>(
                    <button key={s.val} onClick={()=>setMiForm(f=>({...f,severity:s.val}))}
                      style={{flex:1,padding:"10px 8px",borderRadius:"var(--radius-md)",cursor:"pointer",textAlign:"center",
                        border:`2px solid ${miForm.severity===s.val?s.col:"var(--border)"}`,
                        background:miForm.severity===s.val?s.bg:"var(--surface)",transition:"all .15s"}}>
                      <div style={{fontWeight:800,fontSize:13,color:miForm.severity===s.val?s.col:"var(--text-2)"}}>{s.val}</div>
                      <div style={{fontSize:10,color:"var(--text-4)",marginTop:2}}>{s.desc}</div>
                    </button>
                  ))}
                </div>
              </Lbl>
            </div>

            <Lbl t="Incident Name *">
              <input style={iS} value={miForm.name} placeholder="e.g. Production Database Cluster Failure"
                onChange={e=>setMiForm(f=>({...f,name:e.target.value}))}/>
            </Lbl>

            <Lbl t="Impacted Services">
              <input style={iS} value={miForm.impactedServices} placeholder="e.g. ERP, CRM, VPN, Internet"
                onChange={e=>setMiForm(f=>({...f,impactedServices:e.target.value}))}/>
            </Lbl>

            <Lbl t="Teams Involved">
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:4}}>
                {TEAMS_ALL.map(t=>{
                  const sel = miForm.teamsInvolved.includes(t);
                  return (
                    <button key={t} onClick={()=>setMiForm(f=>({...f,teamsInvolved:sel?f.teamsInvolved.filter(x=>x!==t):[...f.teamsInvolved,t]}))}
                      style={{padding:"6px 12px",borderRadius:"var(--radius-md)",cursor:"pointer",fontSize:12,fontWeight:600,transition:"all .12s",
                        border:`1.5px solid ${sel?tCol(t):"var(--border)"}`,
                        background:sel?`${tCol(t)}18`:"var(--surface)",
                        color:sel?tCol(t):"var(--text-2)"}}>
                      {sel?"✓ ":""}{t}
                    </button>
                  );
                })}
              </div>
            </Lbl>

            <Lbl t="Initial Description">
              <textarea style={{...iS,minHeight:70,resize:"vertical"}} value={miForm.desc}
                placeholder="Symptoms, initial impact, what's known so far…"
                onChange={e=>setMiForm(f=>({...f,desc:e.target.value}))}/>
            </Lbl>

            <MFoot onClose={()=>setCreateOpen(false)} onSave={saveMI} label="🚨 Raise Incident"/>
          </ModalWrap>
        )}
      </div>
    );
  };


  const PAGES = {
    dashboard: PageDashboard,
    activities: PageActivities,
    major_incidents: PageMajorIncidents,
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
    prod_intel: PageProdIntel,
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

    const getRow = (id) => rowForms[id] || {mins:60, date:today(), notes:"", ticketRef:""};
    const setRow = (id, patch) => setRowForms(p=>({...p,[id]:{...getRow(id),...patch}}));

    const logRow = (a) => {
      const row = getRow(a.id);
      if(+row.mins < 1){ showToast("Enter minutes > 0","err"); return; }
      setSaving(a.id);
      setTimeout(()=>{
        setLogs(p=>[{id:uid("TL"),date:row.date,userId:user.id,member:user.name,
          team:a.team,actId:a.id,activity:a.name,type:a.type,cat:a.cat,
          mins:+row.mins,notes:row.notes,ticketRef:row.ticketRef||a.ticketNo||a.jira||""},...p]);
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
        <div style={{background:"var(--surface)",borderRadius:"var(--radius-lg)",width:"100%",maxWidth:1200,
          boxShadow:"0 24px 60px rgba(15,23,42,.3)",overflow:"hidden",
          marginBottom:20}}>

          {/* Header */}
          <div style={{background:"linear-gradient(135deg,#0f172a 0%,#1a3a6e 60%,#0e4f8a 100%)",
            padding:"20px 28px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(255,255,255,.08)"}}>
            <div>
              <div style={{fontSize:18,fontWeight:800,color:"#fff",fontFamily:"var(--font-sans)",letterSpacing:-.3}}>⏱ Log Time</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.6)",marginTop:3}}>
                Logging as <strong style={{color:"#60a5fa"}}>{user.name}</strong>
                {user.team ? <> · {user.team} team</> : <> · All Teams</>}
                {" "}· {loggable.length} activit{loggable.length===1?"y":"ies"} available
              </div>
            </div>
            <button onClick={closeM} style={{background:"rgba(255,255,255,.12)",border:"none",
              color:"#fff",width:34,height:34,borderRadius:"50%",cursor:"pointer",
              fontSize:17,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          </div>

          {/* Filters */}
          <div style={{padding:"12px 20px",background:"var(--surface-2)",borderBottom:"1px solid var(--border)",
            display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
            <input placeholder="🔍 Search activity or ticket…"
              value={tblSearch} onChange={e=>setTblSearch(e.target.value)}
              style={{flex:1,minWidth:180,padding:"7px 11px",borderRadius:"var(--radius-sm)",
                border:"1px solid var(--border-2)",fontSize:12}}/>
            {[
              ["type",["","Project","Incident","Change","BAU","Training","Meeting"],"All Types"],
              ["nature",["","Proactive","Reactive"],"All Natures"],
              ["workNature",["","Request","Change","Incident"],"All Work Types"],
            ].map(([k,opts,ph])=>(
              <select key={k} value={tblFilter[k]}
                onChange={e=>setTblFilter(f=>({...f,[k]:e.target.value}))}
                style={{padding:"7px 10px",borderRadius:"var(--radius-sm)",border:"1px solid var(--border-2)",
                  fontSize:12,background:"var(--surface)"}}>
                {opts.map(o=><option key={o} value={o}>{o||ph}</option>)}
              </select>
            ))}
            <span style={{fontSize:12,color:"var(--text-3)",whiteSpace:"nowrap",
              background:"#e0e7ff",padding:"4px 10px",borderRadius:"var(--radius-xl)",fontWeight:600}}>
              {visibleActs.length} shown
            </span>
          </div>

          {/* Table */}
          <div style={{overflowX:"auto",maxHeight:"calc(100vh - 240px)",overflowY:"auto"}}>
            {visibleActs.length===0 ? (
              <div style={{textAlign:"center",padding:60,color:"var(--text-4)",fontSize:14}}>
                ⚠️ No activities match your filters.
              </div>
            ) : (
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"var(--font-sans)"}}>
                <thead style={{position:"sticky",top:0,zIndex:10}}>
                  <tr style={{background:"#1e293b"}}>
                    {["Activity & Progress","Ticket Ref","Type","Nature","Work Type","Status","Estimate","Logged Today","Time to Log","Date","Notes",""].map(h=>(
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
                    const rowBg    = i%2===0 ? "#fff" : "var(--surface-2)";
                    return (
                      <tr key={a.id} style={{background:rowBg,borderBottom:"1px solid var(--surface-3)"}}
                        onMouseEnter={e=>e.currentTarget.style.background="#eff6ff"}
                        onMouseLeave={e=>e.currentTarget.style.background=rowBg}>

                        {/* Activity + progress */}
                        <td style={{padding:"10px 12px",minWidth:210}}>
                          <div style={{fontWeight:700,color:"var(--text-1)",fontSize:13,marginBottom:2}}>{a.name}</div>
                          <div style={{fontSize:10,color:"var(--text-4)",marginBottom:5,
                            maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.desc}</div>
                          <div style={{height:4,background:"var(--surface-3)",borderRadius:2,width:"100%",overflow:"hidden"}}>
                            <div style={{height:"100%",width:`${pct}%`,
                              background:pct>=100?"#dc2626":pct>=75?"#d97706":col,borderRadius:2,
                              transition:"width .4s"}}/>
                          </div>
                          <div style={{fontSize:9,color:"var(--text-4)",marginTop:2}}>{pct}% of your estimate used</div>
                        </td>

                        {/* Ticket Ref — editable, pre-filled from activity */}
                        <td style={{padding:"8px 8px",minWidth:130}}>
                          <input
                            value={row.ticketRef !== "" ? row.ticketRef : (a.ticketNo||a.jira||"")}
                            onChange={e=>setRow(a.id,{ticketRef:e.target.value})}
                            placeholder={a.ticketNo||a.jira||"e.g. CHG-001"}
                            style={{width:"100%",padding:"5px 8px",borderRadius:7,
                              border:"1.5px solid var(--border-2)",fontSize:12,
                              fontFamily:"var(--font-mono)",fontWeight:600,
                              color:"var(--text-2)",background:"var(--surface)"}}
                          />
                          {(a.ticketNo||a.jira) && (
                            <div style={{fontSize:9,color:"var(--text-4)",marginTop:2,fontFamily:"var(--font-mono)"}}>
                              default: {a.ticketNo||a.jira}
                            </div>
                          )}
                        </td>

                        {/* Type */}
                        <td style={{padding:"10px 8px",fontSize:12,color:"var(--text-2)",whiteSpace:"nowrap"}}>{a.type}</td>

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
                        <td style={{padding:"10px 8px",whiteSpace:"nowrap",fontSize:12,fontWeight:600,color:"var(--text-2)"}}>
                          {fmtM(a.estMins)}
                        </td>

                        {/* Logged today badge */}
                        <td style={{padding:"10px 8px",whiteSpace:"nowrap"}}>
                          {todayMin>0
                            ? <span style={{background:"#d1fae5",color:"#166534",padding:"3px 9px",
                                borderRadius:12,fontSize:11,fontWeight:700}}>✓ {fmtM(todayMin)}</span>
                            : <span style={{color:"#d1d5db",fontSize:12}}>—</span>}
                        </td>

                        {/* Time input */}
                        <td style={{padding:"8px 8px",minWidth:175}}>
                          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}>
                            <input type="number" min="1" step="15" value={row.mins}
                              onChange={e=>setRow(a.id,{mins:+e.target.value})}
                              style={{width:62,padding:"5px 8px",borderRadius:7,
                                border:"1.5px solid var(--border-2)",fontSize:14,fontWeight:700,
                                color:"var(--brand)",textAlign:"center"}}/>
                            <span style={{fontSize:11,color:"var(--text-3)",fontWeight:600,minWidth:32}}>
                              {fmtM(+row.mins||0)}
                            </span>
                          </div>
                          <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                            {[[30,"30m"],[60,"1h"],[90,"1.5h"],[120,"2h"],[180,"3h"],[240,"4h"],[480,"8h"]].map(([v,l])=>(
                              <button key={v} onClick={()=>setRow(a.id,{mins:v})}
                                style={{padding:"2px 7px",borderRadius:"var(--radius-md)",
                                  border:`1.5px solid ${+row.mins===v?"var(--brand)":"#e2e8f0"}`,
                                  background:+row.mins===v?"var(--brand)":"#fff",
                                  color:+row.mins===v?"#fff":"var(--text-3)",
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
                              border:"1px solid var(--border-2)",fontSize:12,width:"100%"}}/>
                        </td>

                        {/* Notes */}
                        <td style={{padding:"8px 8px",minWidth:170}}>
                          <input placeholder="What did you work on?"
                            value={row.notes}
                            onChange={e=>setRow(a.id,{notes:e.target.value})}
                            style={{width:"100%",padding:"5px 8px",borderRadius:7,
                              border:"1px solid var(--border-2)",fontSize:12}}/>
                        </td>

                        {/* Log button */}
                        <td style={{padding:"8px 12px",whiteSpace:"nowrap"}}>
                          <button onClick={()=>logRow(a)} disabled={isSaving}
                            style={{padding:"8px 18px",borderRadius:"var(--radius-sm)",
                              background:isSaving?"var(--text-4)":"linear-gradient(135deg,var(--brand),#1d4ed8)",
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
          <div style={{padding:"12px 24px",background:"var(--surface-2)",borderTop:"1px solid var(--border)",
            display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:12,color:"var(--text-3)"}}>
              Click <strong style={{color:"var(--brand)"}}>✓ Log</strong> on any row to save independently. You can log multiple activities without closing.
            </div>
            <button onClick={closeM}
              style={{padding:"8px 22px",borderRadius:"var(--radius-sm)",background:"var(--surface)",
                border:"1px solid var(--border-2)",color:"var(--text-2)",fontWeight:600,fontSize:13,cursor:"pointer"}}>
              Done
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ── RENDER ───────────────────────────────
  // Show force-reset screen if needed
  if(mustReset && user) return (
    <div style={{minHeight:"100vh",background:"#0a0f1e",display:"flex",alignItems:"center",justifyContent:"center",padding:20,fontFamily:"var(--font-sans)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"fixed",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)",backgroundSize:"48px 48px",pointerEvents:"none"}}/>
      <div style={{background:"rgba(255,255,255,.045)",backdropFilter:"blur(24px)",borderRadius:"var(--radius-xl)",padding:"36px 40px",width:"100%",maxWidth:440,border:"1px solid rgba(255,255,255,.08)",boxShadow:"0 32px 80px rgba(0,0,0,.5)",position:"relative"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:52,height:52,borderRadius:"var(--radius-lg)",background:"linear-gradient(135deg,#2563eb,#06b6d4)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",boxShadow:"0 8px 24px rgba(37,99,235,.4)"}}>
            <span style={{fontSize:24}}>🔐</span>
          </div>
          <div style={{fontSize:20,fontWeight:700,color:"#fff",letterSpacing:-.3}}>Set Your Password</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.4)",marginTop:6}}>You must set a new password before continuing</div>
        </div>
        <ForceResetForm onDone={()=>setMustReset(false)}
          onSave={(pw)=>{setAllUsers(p=>p.map(u=>u.id===user.id?{...u,password:pw,mustReset:false}:u));setUser(p=>({...p,password:pw,mustReset:false}));showToast("Password updated! Welcome.");}}/>
      </div>
    </div>
  );

  return (
    <div style={{display:"flex",height:"100vh",fontFamily:"var(--font-sans)",background:"var(--surface-3)",overflow:"hidden",position:"relative"}}>

      {/* ══ SIDEBAR ══ */}
      <div style={{width:"var(--sidebar-w)",minWidth:"var(--sidebar-w)",height:"100vh",background:"var(--sidebar-bg)",display:"flex",flexDirection:"column",overflow:"visible",flexShrink:0,boxShadow:"4px 0 24px rgba(0,0,0,.25)",zIndex:100}}>

        {/* Logo */}
        <div style={{padding:"20px 18px 16px",borderBottom:"1px solid rgba(255,255,255,.07)",display:"flex",alignItems:"center",gap:11,flexShrink:0}}>
          <div style={{width:36,height:36,borderRadius:"var(--radius-md)",background:"linear-gradient(135deg,#2563eb,#06b6d4)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 4px 12px rgba(37,99,235,.45)"}}>
            <svg width="20" height="20" viewBox="0 0 26 26" fill="none">
              <path d="M13 2L4 6V13C4 17.97 7.9 22.56 13 24C18.1 22.56 22 17.97 22 13V6L13 2Z" fill="rgba(255,255,255,.92)"/>
              <rect x="8" y="9.5" width="10" height="2.5" rx="1.2" fill="#2563eb"/>
              <rect x="8" y="13.2" width="10" height="2.5" rx="1.2" fill="#06b6d4"/>
            </svg>
          </div>
          <div>
            <div style={{fontSize:16,fontWeight:800,letterSpacing:-.5,background:"linear-gradient(130deg,#fff 30%,rgba(255,255,255,.7) 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontFamily:"var(--font-sans)"}}>ISMS</div>
            <div style={{fontSize:8,color:"rgba(255,255,255,.3)",letterSpacing:2.5,textTransform:"uppercase",fontWeight:600,fontFamily:"var(--font-mono)"}}>Infra Service Mgmt</div>
          </div>
        </div>

        {/* User chip + switcher */}
        <div style={{padding:"10px 12px",borderBottom:"1px solid rgba(255,255,255,.07)",flexShrink:0,position:"relative"}}>
          <div onClick={()=>setShowSwitch(s=>!s)} style={{display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,.06)",borderRadius:"var(--radius-md)",padding:"9px 12px",cursor:"pointer",border:"1px solid rgba(255,255,255,.08)",transition:"all .15s"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.1)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.06)";}}>
            {/* Avatar */}
            <div style={{width:28,height:28,borderRadius:"var(--radius-sm)",background:`linear-gradient(135deg,${tc},${tc}99)`,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,flexShrink:0,letterSpacing:.5}}>
              {user.name.split(" ").map(n=>n[0]).join("")}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,.92)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontFamily:"var(--font-sans)"}}>{user.name}</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,.4)",fontWeight:500,marginTop:1}}>{isAdmin?"Administrator":isMgr?(user.team||"")+" Manager":(user.team||"")+" Member"}</div>
            </div>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{flexShrink:0,transition:"transform .2s",transform:showSwitch?"rotate(180deg)":"none",opacity:.4}}>
              <path d="M2 4l4 4 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* User dropdown overlay */}
          {showSwitch && (
            <div style={{position:"absolute",top:"calc(100% + 4px)",left:8,right:8,background:"var(--surface)",borderRadius:"var(--radius-lg)",border:"1px solid var(--border)",boxShadow:"var(--shadow-xl)",zIndex:400,overflow:"hidden",animation:"fadeSlideIn .15s ease"}}>
              {/* Profile header */}
              <div style={{padding:"14px 16px",background:"linear-gradient(135deg,#0f172a,#1e3558)"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:36,height:36,borderRadius:"var(--radius-md)",background:`linear-gradient(135deg,${tc},${tc}99)`,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,flexShrink:0}}>
                    {user.name.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12.5,fontWeight:700,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user.name}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,.45)",marginTop:1,fontFamily:"var(--font-mono)"}}>{user.email||user.username}</div>
                  </div>
                </div>
              </div>
              {/* Actions */}
              <div style={{padding:"6px"}}>
                {[
                  {label:"My Profile",       icon:"👤", action:()=>goPage("myprofile")},
                  {label:"Change Password",   icon:"🔑", action:()=>goPage("changepw")},
                  ...(isAdmin?[{label:"User Management",icon:"🔐",action:()=>goPage("usermgmt")}]:[]),
                ].map(item=>(
                  <div key={item.label} onClick={()=>{setShowSwitch(false);item.action();}}
                    style={{display:"flex",alignItems:"center",gap:9,padding:"9px 11px",borderRadius:"var(--radius-sm)",cursor:"pointer",fontSize:12.5,fontWeight:500,color:"var(--text-2)",transition:"background .1s"}}
                    onMouseEnter={e=>e.currentTarget.style.background="var(--surface-2)"}
                    onMouseLeave={e=>e.currentTarget.style.background=""}>
                    <span style={{fontSize:14,width:18,textAlign:"center"}}>{item.icon}</span>
                    {item.label}
                  </div>
                ))}
                <div style={{height:1,background:"var(--border)",margin:"5px 4px"}}/>
                <div onClick={()=>{setShowSwitch(false);handleLogout();}}
                  style={{display:"flex",alignItems:"center",gap:9,padding:"9px 11px",borderRadius:"var(--radius-sm)",cursor:"pointer",fontSize:12.5,fontWeight:600,color:"#dc2626",transition:"background .1s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#fef2f2"}
                  onMouseLeave={e=>e.currentTarget.style.background=""}>
                  <span style={{fontSize:14,width:18,textAlign:"center"}}>↩</span> Sign Out
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Nav */}
        <div style={{flex:1,overflowY:"auto",overflowX:"hidden",paddingBottom:8}}>
          {NAV.map((section,si)=>(
            <div key={section.sec}>
              {si>0 && <div className="nav-divider"/>}
              <div style={{padding:"10px 10px 4px"}}>
                <div className="nav-sec-label">{section.sec}</div>
                {section.items.map(item=>{
                  const active = page===item.id;
                  return (
                    <div key={item.id} onClick={()=>goPage(item.id)} className={`nav-item ${active?"nav-active-item":""}`}
                      style={{display:"flex",alignItems:"center",gap:9,padding:"8px 12px",borderRadius:"var(--radius-sm)",cursor:"pointer",fontSize:12.5,fontWeight:active?600:400,color:active?"#fff":"rgba(255,255,255,.5)",background:active?"rgba(37,99,235,.75)":"transparent",position:"relative",userSelect:"none",marginBottom:1,fontFamily:"var(--font-sans)"}}>
                      {active && <div style={{position:"absolute",left:0,top:"20%",bottom:"20%",width:3,borderRadius:"var(--radius-md)",background:"#93c5fd"}}/>}
                      <span style={{fontSize:14,lineHeight:1,flexShrink:0,filter:active?"none":"grayscale(40%)",opacity:active?1:.7}}>{item.icon}</span>
                      <span style={{flex:1,letterSpacing:.1}}>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar footer */}
        <div style={{padding:"10px 12px 12px",borderTop:"1px solid rgba(255,255,255,.06)",flexShrink:0}}>
          <div style={{fontSize:9,color:"rgba(255,255,255,.18)",textAlign:"center",fontFamily:"var(--font-mono)",letterSpacing:1}}>ISMS v1.0.0 · ENTERPRISE</div>
        </div>
      </div>

      {/* ══ MAIN ══ */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0}}>

        {/* Topbar */}
        <div style={{flexShrink:0,background:"var(--surface)",borderBottom:"1px solid var(--border)",padding:"0 24px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"var(--shadow-sm)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            {/* Breadcrumb */}
            <div>
              <div style={{fontSize:16,fontWeight:700,color:"var(--text-1)",letterSpacing:-.3,lineHeight:1.2}}>{PAGE_TITLE[page]||page}</div>
              <div style={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)",fontFamily:"var(--font-mono)",marginTop:1}}>
                ISMS{user.team ? <span> › <span style={{color:"var(--text-3)"}}>{user.team}</span></span> : ""} › <span style={{color:"var(--brand)",fontWeight:600}}>{PAGE_TITLE[page]}</span>
              </div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {/* Live indicator */}
            <div style={{display:"flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:"var(--radius-md)",background:"var(--surface-2)",border:"1px solid var(--border)",fontSize:11,color:"var(--text-3)",fontFamily:"var(--font-mono)"}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:"#22c55e",display:"inline-block"}} className="status-online"/>
              Live
            </div>
            {isMgrOrAdmin && <Btn sm onClick={()=>{setAForm({...bAct,team:isAdmin?"":user.team});setTarget(null);setModal("act");}}>+ Activity</Btn>}
            {!isAdmin && <Btn sm v="sec" onClick={()=>{setLForm(bLog);setModal("log");}}>⏱ Log Time</Btn>}
            {isMgr && <Btn sm v="sec" onClick={()=>goPage("members")}>+ Member</Btn>}
          </div>
        </div>

        {/* Content */}
        <div style={{flex:1,overflowY:"auto",padding:"20px 24px"}}>
          <ErrorBoundary key={page}><CurPage/></ErrorBoundary>
        </div>
      </div>

      {/* ══ MODAL: ACTIVITY ══ */}
      {modal==="act" && (
        <ModalWrap title={target?"✏️ Edit Activity":"📋 New Activity"} onClose={closeM} wide>
          <InfoBanner color="#1e40af" bg="var(--brand-light)" border="#bfdbfe" icon="📌">{isAdmin?"Admin: this activity will be visible to the selected team.":(<>This activity will appear for all <strong>{user.team}</strong> members when they log time.</>)}</InfoBanner>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div style={{gridColumn:"1/-1"}}><Lbl t="Activity Name *"><input style={iS} value={aForm.name} onChange={e=>setAForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Firewall Policy Review"/></Lbl></div>
            {isAdmin && <Lbl t="Team *"><select style={sS} value={aForm.team} onChange={e=>setAForm(f=>({...f,team:e.target.value}))}><option value="">— Select team —</option>{teams.map(t=><option key={t.name}>{t.name}</option>)}</select></Lbl>}
            <Lbl t="Activity Type"><select style={sS} value={aForm.type} onChange={e=>setAForm(f=>({...f,type:e.target.value}))}>{["Project","Incident","Change","BAU","Training","Meeting"].map(o=><option key={o}>{o}</option>)}</select></Lbl>
            <Lbl t="Category"><select style={sS} value={aForm.cat} onChange={e=>setAForm(f=>({...f,cat:e.target.value}))}>{["Infrastructure Build","Maintenance","Security & Compliance","Automation & Scripting","Monitoring & Alerting","Documentation"].map(o=><option key={o}>{o}</option>)}</select></Lbl>
            <Lbl t={`Estimated Time (min) * = ${fmtM(aForm.estMins)}`}>
              <input type="number" min="30" step="30" style={iS} value={aForm.estMins} onChange={e=>setAForm(f=>({...f,estMins:+e.target.value}))}/>
              <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
                {[[60,"1h"],[120,"2h"],[240,"4h"],[480,"8h"],[960,"2d"],[2400,"5d"]].map(([v,l])=>(
                  <button key={v} onClick={()=>setAForm(f=>({...f,estMins:v}))} style={{padding:"3px 9px",borderRadius:"var(--radius-xl)",border:`1.5px solid ${aForm.estMins===v?"var(--brand)":"var(--border-2)"}`,background:aForm.estMins===v?"var(--brand)":"var(--surface)",color:aForm.estMins===v?"#fff":"var(--text-2)",fontSize:11,fontWeight:600,cursor:"pointer"}}>{l}</button>
                ))}
              </div>
            </Lbl>
            <Lbl t="Priority"><select style={sS} value={aForm.priority} onChange={e=>setAForm(f=>({...f,priority:e.target.value}))}>{["Critical","High","Medium","Low"].map(o=><option key={o}>{o}</option>)}</select></Lbl>
            <Lbl t="Status"><select style={sS} value={aForm.status} onChange={e=>setAForm(f=>({...f,status:e.target.value}))}>{["Active","Pending","Done"].map(o=><option key={o}>{o}</option>)}</select></Lbl>
            <Lbl t="Nature">
              <div style={{display:"flex",gap:8,marginTop:4}}>
                {["Proactive","Reactive"].map(n=>(
                  <button key={n} onClick={()=>setAForm(f=>({...f,nature:n}))} style={{flex:1,padding:"7px 0",borderRadius:"var(--radius-sm)",border:`1.5px solid ${aForm.nature===n?(n==="Proactive"?"#1e40af":"#9d174d"):"var(--border-2)"}`,background:aForm.nature===n?(n==="Proactive"?"var(--brand-light)":"#fce7f3"):"#fff",color:aForm.nature===n?(n==="Proactive"?"#1e40af":"#9d174d"):"var(--text-3)",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                    {n==="Proactive"?"🟢 Proactive":"🔴 Reactive"}
                  </button>
                ))}
              </div>
            </Lbl>
            <Lbl t="Work Nature">
              <div style={{display:"flex",gap:8,marginTop:4}}>
                {["Request","Change","Incident"].map(w=>(
                  <button key={w} onClick={()=>setAForm(f=>({...f,workNature:w}))} style={{flex:1,padding:"7px 0",borderRadius:"var(--radius-sm)",border:`1.5px solid ${aForm.workNature===w?"#7c3aed":"var(--border-2)"}`,background:aForm.workNature===w?"#ede9fe":"#fff",color:aForm.workNature===w?"#5b21b6":"var(--text-3)",fontWeight:700,fontSize:12,cursor:"pointer"}}>{w}</button>
                ))}
              </div>
            </Lbl>
            <Lbl t="JIRA / Ticket Ref"><input style={iS} value={aForm.jira} onChange={e=>setAForm(f=>({...f,jira:e.target.value}))} placeholder="INFRA-1234"/></Lbl>
            <Lbl t="Ticket Number"><input style={iS} value={aForm.ticketNo} onChange={e=>setAForm(f=>({...f,ticketNo:e.target.value}))} placeholder="e.g. CHG-4521 / REQ-2201 / INC-0891"/></Lbl>
            <div style={{gridColumn:"1/-1"}}><Lbl t="Description (shown to members)"><textarea style={{...iS,minHeight:80,resize:"vertical"}} value={aForm.desc} onChange={e=>setAForm(f=>({...f,desc:e.target.value}))} placeholder="Describe scope so members know what to log against…"/></Lbl></div>
            {aForm.type==="Project" && (
              <div style={{gridColumn:"1/-1"}}>
                <Lbl t={`Project Progress — ${aForm.progress||0}% complete`}>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <input type="range" min="0" max="100" step="5" value={aForm.progress||0}
                      onChange={e=>setAForm(f=>({...f,progress:+e.target.value}))}
                      style={{flex:1,accentColor:"var(--brand)"}}/>
                    <span style={{fontSize:20,fontWeight:800,color:"var(--brand)",minWidth:48,textAlign:"right",fontFamily:"var(--font-mono)"}}>{aForm.progress||0}%</span>
                  </div>
                  <div style={{height:8,background:"var(--surface-3)",borderRadius:99,overflow:"hidden",marginTop:8}}>
                    <div style={{height:"100%",width:`${aForm.progress||0}%`,borderRadius:99,
                      background:(aForm.progress||0)>=100?"#059669":(aForm.progress||0)>=75?"#2563eb":"#d97706",
                      transition:"width .3s"}}/>
                  </div>
                  <div style={{fontSize:10,color:"var(--text-4)",marginTop:4}}>Manually set % complete — separate from time logged. Visible on Project Health dashboard.</div>
                </Lbl>
              </div>
            )}
          </div>
          <MFoot onClose={closeM} onSave={saveAct} label={target?"Update Activity":"Create Activity"}/>
        </ModalWrap>
      )}

      {/* ══ MODAL: LOG TIME ══ */}
      {modal==="log" && (() => {
        const selAct  = lForm.actId ? acts.find(a=>a.id===lForm.actId) : null;
        const logSrc  = loggable;
        const isEdit  = !!target;
        const CATS    = ["Infrastructure Build","Maintenance","Security & Compliance","Automation & Scripting","Monitoring & Alerting","Documentation"];

        // Step readiness
        const s1 = !!lForm.actId;
        const s2 = s1 && !!lForm.nature;
        const s3 = s2 && !!lForm.workType;
        const s4 = s3 && !!lForm.workNature;
        const s5 = s4; // date+time+ticket — always reachable after s4
        const s6 = s5 && !!lForm.cat;
        const canSave = s1 && lForm.mins > 0;

        const Step = ({n, label, done, active}) => (
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <div style={{
              width:24,height:24,borderRadius:"50%",flexShrink:0,fontSize:11,fontWeight:800,
              display:"flex",alignItems:"center",justifyContent:"center",
              background:done?"#16a34a":active?"var(--brand)":"var(--surface-3)",
              color:done||active?"#fff":"var(--text-4)",transition:"all .2s"
            }}>{done?"✓":n}</div>
            <span style={{fontWeight:700,fontSize:13,letterSpacing:"-.2px",
              color:done?"#16a34a":active?"var(--text-1)":"var(--text-4)"}}>{label}</span>
            {done && <div style={{flex:1,height:1,background:"#bbf7d0",marginLeft:4}}/>}
          </div>
        );

        const Section = ({children, enabled, noBorder}) => (
          <div style={{
            marginBottom:noBorder?0:20, paddingBottom:noBorder?0:20,
            borderBottom:noBorder?"none":"1px solid var(--border)",
            opacity:enabled?1:.4, pointerEvents:enabled?"all":"none",
            transition:"opacity .2s"
          }}>{children}</div>
        );

        const ToggleBtn = ({label, icon, active, color, bg, onClick, wide}) => (
          <button onClick={onClick} style={{
            flex:wide?undefined:1, padding:"10px 8px",
            borderRadius:"var(--radius-md)", cursor:"pointer",
            border:`2px solid ${active?color:"var(--border)"}`,
            background:active?bg:"var(--surface)",
            transition:"all .15s", textAlign:"center",
            display:"flex", flexDirection:"column", alignItems:"center", gap:3
          }}>
            {icon && <div style={{fontSize:15}}>{icon}</div>}
            <div style={{fontWeight:700,fontSize:12,color:active?color:"var(--text-2)"}}>{label}</div>
          </button>
        );

        return (
          <ModalWrap title={isEdit?"✏️ Edit Time Entry":"⏱ Log Time"} onClose={closeM} wide>

            {isEdit && (
              <InfoBanner color="#065f46" bg="#f0fdf4" border="#a7f3d0" icon="✅">
                Editing entry for <strong>{target.member}</strong>
              </InfoBanner>
            )}

            {/* ── STEP 1: ACTIVITY ── */}
            <Section enabled={true}>
              <Step n={1} label="Select Activity" done={s1} active={!s1}/>
              <Lbl t="Activity *">
                <select style={{...sS,fontSize:13}} value={lForm.actId}
                  onChange={e=>setLForm(f=>({...f,actId:e.target.value,cat:e.target.value?acts.find(a=>a.id===e.target.value)?.cat||"":""}))}>
                  <option value="">— Choose an activity —</option>
                  {loggable.filter(a=>!a.isMajorIncident).length>0 && (
                    <optgroup label="── Team Activities ──">
                      {loggable.filter(a=>!a.isMajorIncident).map(a=>(
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </optgroup>
                  )}
                  {loggable.filter(a=>a.isMajorIncident).length>0 && (
                    <optgroup label="🚨 Major Incidents (Cross-Team)">
                      {loggable.filter(a=>a.isMajorIncident).map(a=>(
                        <option key={a.id} value={a.id}>[{a.incidentNo}] {a.name} — {a.severity}</option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </Lbl>
              {selAct && (
                <div style={{marginTop:10,background:"var(--surface-2)",border:"1px solid var(--border)",borderRadius:"var(--radius-md)",padding:"10px 14px",display:"flex",alignItems:"flex-start",gap:12}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:3}}>
                      <span style={{fontWeight:700,fontSize:13,color:"var(--text-1)"}}>{selAct.name}</span>
                      {selAct.isMajorIncident
                        ? <span style={{fontSize:11,fontWeight:700,background:"#fff1f2",color:"#be123c",padding:"2px 8px",borderRadius:4}}>🚨 {selAct.severity} Major Incident</span>
                        : <><TPill t={selAct.team}/><SPill s={selAct.status}/></>
                      }
                    </div>
                    {selAct.isMajorIncident && (
                      <div style={{background:"#fff1f2",border:"1px solid #fecaca",borderRadius:"var(--radius-sm)",padding:"6px 10px",marginBottom:6,fontSize:11,color:"#be123c"}}>
                        <strong>Cross-Team Incident</strong> — engineers from all teams can log time · Incident No: <code style={{fontFamily:"var(--font-mono)",fontWeight:700}}>{selAct.incidentNo}</code>
                      </div>
                    )}
                    <div style={{fontSize:11,color:"var(--text-3)",lineHeight:1.5}}>{selAct.desc||"—"}</div>
                    <div style={{display:"flex",gap:12,marginTop:6}}>
                      <span style={{fontSize:11,color:"var(--brand)"}}>Logged: <strong>{fmtM(minsForAct(selAct.id))}</strong></span>
                      {selAct.isMajorIncident && selAct.teamsInvolved && (
                        <span style={{fontSize:11,color:"var(--text-3)"}}>Teams: <strong>{selAct.teamsInvolved.join(", ")}</strong></span>
                      )}
                    </div>
                    {!selAct.isMajorIncident && (
                      <div style={{marginTop:6,height:4,background:"var(--surface-3)",borderRadius:99,overflow:"hidden"}}>
                        <div style={{height:"100%",borderRadius:99,width:`${Math.min(100,Math.round(minsForAct(selAct.id)/Math.max(selAct.estMins,1)*100))}%`,background:tCol(selAct.team),transition:"width .4s"}}/>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Section>

            {/* ── STEP 2: PROACTIVE / REACTIVE ── */}
            <Section enabled={s1}>
              <Step n={2} label="Proactive or Reactive?" done={s2} active={s1&&!s2}/>
              <div style={{display:"flex",gap:10}}>
                {[
                  {val:"Proactive",icon:"⬆",desc:"Planned / scheduled work",     col:"#1d4ed8",bg:"#eff6ff"},
                  {val:"Reactive", icon:"⬇",desc:"Unplanned / triggered by event",col:"#be123c",bg:"#fff1f2"},
                ].map(n=>(
                  <ToggleBtn key={n.val} label={n.val} icon={n.icon}
                    active={lForm.nature===n.val} color={n.col} bg={n.bg}
                    onClick={()=>setLForm(f=>({...f,nature:n.val}))}/>
                ))}
              </div>
              {lForm.nature && (
                <div style={{marginTop:8,fontSize:11,color:"var(--text-3)"}}>
                  {lForm.nature==="Proactive"?"✓ This was planned or scheduled work":"✓ This was triggered by an unplanned event or request"}
                </div>
              )}
            </Section>

            {/* ── STEP 3: PROJECT / BAU ── */}
            <Section enabled={s2}>
              <Step n={3} label="Project or BAU?" done={s3} active={s2&&!s3}/>
              <div style={{display:"flex",gap:10}}>
                {[
                  {val:"Project", icon:"📁", desc:"Defined deliverable with start/end", col:"#1d4ed8", bg:"#eff6ff"},
                  {val:"BAU",     icon:"🔧", desc:"Business as usual / ongoing ops",    col:"#065f46", bg:"#f0fdf4"},
                ].map(w=>(
                  <ToggleBtn key={w.val} label={w.val} icon={w.icon}
                    active={lForm.workType===w.val} color={w.col} bg={w.bg}
                    onClick={()=>setLForm(f=>({...f,workType:w.val}))}/>
                ))}
              </div>
            </Section>

            {/* ── STEP 4: CHANGE / INCIDENT / SERVICE REQUEST ── */}
            <Section enabled={s3}>
              <Step n={4} label="Change, Incident or Service Request?" done={s4} active={s3&&!s4}/>
              <div style={{display:"flex",gap:8}}>
                {[
                  {val:"Change",          icon:"🔄", desc:"Planned change to infra/config",  col:"#b45309", bg:"#fffbeb"},
                  {val:"Incident",        icon:"🚨", desc:"Break/fix, outage response",       col:"#be123c", bg:"#fff1f2"},
                  {val:"Service Request", icon:"📥", desc:"User or business request",         col:"#5b21b6", bg:"#f5f3ff"},
                ].map(w=>(
                  <ToggleBtn key={w.val} label={w.val} icon={w.icon}
                    active={lForm.workNature===w.val} color={w.col} bg={w.bg}
                    onClick={()=>setLForm(f=>({...f,workNature:w.val}))}/>
                ))}
              </div>
            </Section>

            {/* ── STEP 5: DATE + TIME + TICKET ── */}
            <Section enabled={s4}>
              <Step n={5} label="Date, Time Spent & Ticket Number" done={s5&&lForm.mins>0} active={s4}/>

              {/* Time presets */}
              <div style={{marginBottom:16}}>
                <Lbl t={`Time Spent * — ${fmtM(+lForm.mins||0)}`}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                    <input type="number" min="1" step="15"
                      style={{...iS,width:90,textAlign:"center",fontFamily:"var(--font-mono)",fontSize:18,fontWeight:800,color:"var(--brand)",padding:"8px"}}
                      value={lForm.mins}
                      onChange={e=>setLForm(f=>({...f,mins:+e.target.value}))}/>
                    <span style={{fontSize:12,color:"var(--text-3)"}}>minutes</span>
                    <span style={{fontSize:11,color:"var(--text-4)",fontFamily:"var(--font-mono)"}}>= {fmtM(+lForm.mins||0)}</span>
                  </div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {[[15,"15m"],[30,"30m"],[45,"45m"],[60,"1h"],[90,"1.5h"],[120,"2h"],[180,"3h"],[240,"4h"],[300,"5h"],[480,"8h"]].map(([v,l])=>(
                      <button key={v} onClick={()=>setLForm(f=>({...f,mins:v}))}
                        style={{padding:"5px 11px",borderRadius:"var(--radius-sm)",fontSize:12,fontWeight:600,cursor:"pointer",transition:"all .12s",
                          border:`1.5px solid ${+lForm.mins===v?"var(--brand)":"var(--border)"}`,
                          background:+lForm.mins===v?"var(--brand)":"var(--surface)",
                          color:+lForm.mins===v?"#fff":"var(--text-2)"}}>{l}</button>
                    ))}
                  </div>
                </Lbl>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <Lbl t="Date">
                  <input type="date" style={iS} value={lForm.date}
                    onChange={e=>setLForm(f=>({...f,date:e.target.value}))}/>
                </Lbl>
                <Lbl t="Ticket / Reference No. (optional)">
                  <input style={{...iS,fontFamily:"var(--font-mono)",fontWeight:600}}
                    value={lForm.ticketRef}
                    placeholder="e.g. CHG-4521 · INC-0891 · REQ-2201"
                    onChange={e=>setLForm(f=>({...f,ticketRef:e.target.value}))}/>
                </Lbl>
              </div>
            </Section>

            {/* ── STEP 6: CATEGORY ── */}
            <Section enabled={s4}>
              <Step n={6} label="Category" done={s6} active={s4&&!s6}/>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {CATS.map(c=>{
                  const active = lForm.cat===c;
                  return (
                    <button key={c} onClick={()=>setLForm(f=>({...f,cat:c}))}
                      style={{
                        padding:"7px 14px",borderRadius:"var(--radius-md)",cursor:"pointer",
                        fontSize:12,fontWeight:600,transition:"all .15s",
                        border:`1.5px solid ${active?"var(--brand)":"var(--border)"}`,
                        background:active?"var(--brand)":"var(--surface)",
                        color:active?"#fff":"var(--text-2)"
                      }}>{c}</button>
                  );
                })}
              </div>
              {selAct?.cat && !lForm.cat && (
                <div style={{marginTop:8,fontSize:11,color:"var(--text-4)"}}>
                  Suggested from activity:&nbsp;
                  <span style={{color:"var(--brand)",cursor:"pointer",fontWeight:600,textDecoration:"underline"}}
                    onClick={()=>setLForm(f=>({...f,cat:selAct.cat}))}>
                    {selAct.cat}
                  </span>
                </div>
              )}
            </Section>

            {/* ── STEP 7: NOTES ── */}
            <Section enabled={s4} noBorder={true}>
              <Step n={7} label="Notes" done={!!lForm.notes} active={s4}/>
              <textarea style={{...iS,minHeight:80,resize:"vertical"}}
                value={lForm.notes}
                onChange={e=>setLForm(f=>({...f,notes:e.target.value}))}
                placeholder="Describe what you worked on — tasks completed, blockers, next steps…"/>
            </Section>

            <MFoot onClose={closeM} onSave={saveLog} label={isEdit?"Update Entry":"Log Time"}/>
          </ModalWrap>
        );
      })()}


      {/* ══ DASH DRILL-DOWN MODAL ══ */}
      {dashDrill && (
        <div className="modal-backdrop" style={{position:"fixed",inset:0,background:"rgba(15,23,42,.65)",backdropFilter:"blur(8px)",zIndex:4000,display:"flex",alignItems:"center",justifyContent:"center",padding:24}} onClick={()=>setDashDrill(null)}>
          <div className="modal-content" style={{background:"var(--surface)",borderRadius:"var(--radius-xl)",width:"100%",maxWidth:940,maxHeight:"82vh",display:"flex",flexDirection:"column",boxShadow:"var(--shadow-xl)",overflow:"hidden"}} onClick={e=>e.stopPropagation()}>
            {/* Header */}
        <div style={{background:"var(--sidebar-bg)",padding:"18px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
              <div style={{fontSize:15,fontWeight:700,color:"#fff",letterSpacing:-.2}}>🔍 {dashDrill.label}</div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:12,color:"rgba(255,255,255,.45)",fontFamily:"var(--font-mono)"}}>{dashDrill.data.length} record{dashDrill.data.length!==1?"s":""}</span>
                <button onClick={()=>setDashDrill(null)} style={{background:"rgba(255,255,255,.1)",border:"none",color:"rgba(255,255,255,.7)",width:30,height:30,borderRadius:"50%",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.2)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.1)"}>✕</button>
              </div>
            </div>
            {/* Table */}
            <div style={{overflowY:"auto",flex:1}}>
              {dashDrill.data.length===0
                ? <div style={{textAlign:"center",padding:60,color:"var(--text-4)",fontSize:14}}>No records found.</div>
                : dashDrill.type==="acts"
                  ? (
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"var(--font-sans)"}}>
                      <thead style={{position:"sticky",top:0,background:"var(--surface-2)",zIndex:5}}>
                        <tr>
                          {["ID","Activity","Team","Nature","Work Type","Ticket","Type","Status","Est.","Logged","Progress"].map(h=>(
                            <th key={h} style={{padding:"10px 12px",textAlign:"left",fontSize:10,fontWeight:700,color:"var(--text-4)",textTransform:"uppercase",letterSpacing:.8,whiteSpace:"nowrap",borderBottom:"2px solid var(--border)",fontFamily:"var(--font-mono)"}}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dashDrill.data.map((a,i)=>{
                          const logged = logs.filter(l=>l.actId===a.id).reduce((s,l)=>s+l.mins,0);
                          const pct    = Math.min(100,Math.round(logged/Math.max(a.estMins,1)*100));
                          return (
                            <tr key={a.id} style={{background:i%2===0?"#fff":"var(--surface-2)",borderBottom:"1px solid var(--surface-3)"}}>
                              <td style={{padding:"9px 12px"}}><code style={{background:"var(--surface-3)",padding:"2px 6px",borderRadius:4,fontSize:11,color:"var(--text-3)"}}>{a.id}</code></td>
                              <td style={{padding:"9px 12px",minWidth:180}}>
                                <div style={{fontWeight:700,color:"var(--text-1)",fontSize:12}}>{a.name}</div>
                                <div style={{fontSize:10,color:"var(--text-4)"}}>{a.jira}</div>
                              </td>
                              <td style={{padding:"9px 10px"}}><TPill t={a.team}/></td>
                              <td style={{padding:"9px 10px"}}><NaturePill n={a.nature||"Proactive"}/></td>
                              <td style={{padding:"9px 10px"}}><WNPill w={a.workNature||"Request"}/></td>
                              <td style={{padding:"9px 10px"}}><code style={{background:"var(--surface-3)",padding:"2px 6px",borderRadius:4,fontSize:11,fontWeight:600}}>{a.ticketNo||"—"}</code></td>
                              <td style={{padding:"9px 10px",fontSize:12}}>{a.type}</td>
                              <td style={{padding:"9px 10px"}}><SPill s={a.status}/></td>
                              <td style={{padding:"9px 10px",fontSize:12,fontWeight:600}}>{fmtM(a.estMins)}</td>
                              <td style={{padding:"9px 10px",fontSize:13,fontWeight:800,color:"var(--brand)"}}>{fmtM(logged)}</td>
                              <td style={{padding:"9px 12px",minWidth:130}}>
                                <div style={{display:"flex",alignItems:"center",gap:6}}>
                                  <div style={{flex:1,height:5,background:"var(--surface-3)",borderRadius:3}}>
                                    <div style={{height:"100%",width:`${pct}%`,background:pct>100?"#dc2626":pct>75?"#d97706":"#059669",borderRadius:3}}/>
                                  </div>
                                  <span style={{fontSize:11,fontWeight:700,color:pct>100?"#dc2626":pct>75?"#d97706":"var(--text-2)",minWidth:30}}>{pct}%</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )
                  : (
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"var(--font-sans)"}}>
                      <thead style={{position:"sticky",top:0,background:"var(--surface-2)",zIndex:5}}>
                        <tr>
                          {["Date","Member","Activity","Team","Type","Category","Time","Notes"].map(h=>(
                            <th key={h} style={{padding:"10px 12px",textAlign:"left",fontSize:10,fontWeight:700,color:"var(--text-4)",textTransform:"uppercase",letterSpacing:.8,whiteSpace:"nowrap",borderBottom:"2px solid var(--border)",fontFamily:"var(--font-mono)"}}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dashDrill.data.map((l,i)=>(
                          <tr key={l.id} className="trow-hover" style={{background:"var(--surface)",borderBottom:"1px solid var(--surface-3)"}}>
                            <td style={{padding:"10px 12px",fontSize:12,color:"var(--text-3)",fontFamily:"var(--font-mono)"}}>{l.date}</td>
                            <td style={{padding:"10px 12px"}}>
                              <div style={{display:"flex",alignItems:"center",gap:7}}>
                                <div style={{width:24,height:24,borderRadius:6,background:`${tCol(l.team)}18`,color:tCol(l.team),display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,flexShrink:0}}>{l.member.split(" ").map(n=>n[0]).join("")}</div>
                                <span style={{fontWeight:700,fontSize:12.5,color:"var(--text-1)"}}>{l.member}</span>
                              </div>
                            </td>
                            <td style={{padding:"10px 12px",fontSize:12.5,fontWeight:600,color:"var(--text-2)",maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.activity}</td>
                            <td style={{padding:"10px 10px"}}><TPill t={l.team}/></td>
                            <td style={{padding:"10px 10px",fontSize:12,color:"var(--text-2)"}}>{l.type}</td>
                            <td style={{padding:"10px 10px",fontSize:11,color:"var(--text-3)"}}>{l.cat}</td>
                            <td style={{padding:"10px 10px"}}><span style={{fontWeight:800,color:"var(--brand)",fontSize:13,fontFamily:"var(--font-mono)",letterSpacing:"-.3px"}}>{fmtM(l.mins)}</span></td>
                            <td style={{padding:"10px 12px",fontSize:11,color:"var(--text-3)",maxWidth:180,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.notes||"—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )
              }
            </div>
            {/* Footer */}
            <div style={{padding:"12px 24px",background:"var(--surface-2)",borderTop:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
              <span style={{fontSize:12,color:"var(--text-3)",fontFamily:"var(--font-mono)"}}>Click outside or ✕ to close</span>
              <button onClick={()=>setDashDrill(null)} style={{padding:"8px 22px",borderRadius:"var(--radius-md)",background:"linear-gradient(135deg,#2563eb,#1d4ed8)",border:"none",color:"#fff",fontWeight:600,fontSize:13,cursor:"pointer",boxShadow:"0 2px 8px rgba(37,99,235,.3)",fontFamily:"var(--font-sans)"}}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ TOAST ══ */}
      {toast && (
        <div style={{
          position:"fixed",bottom:24,right:24,
          background:toast.type==="err"?"#1e1010":"#0d1a0f",
          color:"#fff",borderRadius:12,
          padding:"13px 18px",fontSize:13,fontWeight:500,zIndex:9000,
          display:"flex",alignItems:"center",gap:10,
          boxShadow:"0 12px 32px rgba(0,0,0,.35), 0 2px 8px rgba(0,0,0,.2)",
          borderLeft:`3px solid ${toast.type==="err"?"#f87171":"#4ade80"}`,
          minWidth:240,maxWidth:360,
          animation:"toastIn .3s cubic-bezier(.22,1,.36,1) both",
          backdropFilter:"blur(8px)",
          fontFamily:"var(--font-sans)"
        }}>
          <span style={{fontSize:16,flexShrink:0}}>{toast.type==="err"?"⚠️":"✓"}</span>
          <span style={{flex:1,lineHeight:1.4}}>{toast.msg}</span>
        </div>
      )}
    </div>
  );
}

// ── APP ENTRY POINT ──────────────────────────
// Thin wrapper: shows Login or the full Portal
// Keeping login OUTSIDE PortalApp avoids React hook #310 error
export default function App() {
  const [authUser, setAuthUser] = useState(null);
  const [allUsersForLogin, setAllUsersForLogin] = useState(() => {
    try {
      const saved = localStorage.getItem('isms_users');
      return saved ? JSON.parse(saved) : SEED_USERS;
    } catch (e) {
      return SEED_USERS;
    }
  });

  // Save users to localStorage whenever they change
  React.useEffect(() => {
    try {
      localStorage.setItem('isms_users', JSON.stringify(allUsersForLogin));
    } catch (e) {
      console.error('Failed to save users to localStorage:', e);
    }
  }, [allUsersForLogin]);

  if(!authUser) {
    return <LoginPage
      allUsers={allUsersForLogin}
      onLogin={(u) => {
        setAllUsersForLogin(p=>p.map(x=>x.id===u.id?{...x,lastLogin:new Date().toISOString().slice(0,10)}:x));
        setAuthUser(u);
      }}
    />;
  }

  return <PortalApp initialUser={authUser} allUsersInit={allUsersForLogin}/>;
}
