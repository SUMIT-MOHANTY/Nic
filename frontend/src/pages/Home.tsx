import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../api/client";
import type { OverviewResponse } from "../types";
import WeekStrip from "../components/WeekStrip";
import EmergencyCraving from "../components/EmergencyCraving";
import { getSelectedLanguage, translate } from "../utils/translate";

function timeGreeting(now: Date) {
  const h = now.getHours();
  if (h >= 5 && h < 12) return { text: "Good Morning", icon: "☀️" };
  if (h >= 12 && h < 17) return { text: "Good Afternoon", icon: "🌤️" };
  if (h >= 17 && h < 21) return { text: "Good Evening", icon: "🌅" };
  return { text: "Good Night", icon: "🌙" };
}

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState<OverviewResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Custom states for Smokeless Tobacco features
  const [isCravingOpen, setIsCravingOpen] = useState(false);
  const [cravingsCount, setCravingsCount] = useState(0);
  const [dailyCost, setDailyCost] = useState(50);
  const [quitDateStr, setQuitDateStr] = useState("");
  const [chewProduct, setChewProduct] = useState("Gutkha");

  const lang = getSelectedLanguage();

  useEffect(() => {
    let cancelled = false;
    client
      .overview()
      .then((d) => {
        if (cancelled) return;
        setData(d);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Failed to load");
      });

    // Read smokeless local stats
    const avoided = localStorage.getItem("cravings_avoided");
    if (avoided) setCravingsCount(parseInt(avoided));

    const cost = localStorage.getItem("daily_cost");
    if (cost) setDailyCost(parseInt(cost));

    const product = localStorage.getItem("chew_product");
    if (product) setChewProduct(product);

    const qDate = localStorage.getItem("quit_date");
    if (qDate) setQuitDateStr(qDate);

    return () => {
      cancelled = true;
    };
  }, []);

  const greeting = useMemo(() => timeGreeting(new Date()), []);

  if (error) return <div className="errorState">{error}</div>;
  if (!data) return <div className="loadingState">Loading…</div>;

  const weekComplete = data.weekDays.every((d) => d.totalTasks === 0 || d.completedTasks >= d.totalTasks);
  const unlockText = weekComplete
    ? "Week 1 is unlocked. Keep going! 🎉"
    : "Complete first Week tasks to unlock Week 1 🗝️";

  // Compute days since quit to compute savings
  let daysQuit = 14;
  if (quitDateStr) {
    const qd = new Date(quitDateStr);
    const now = new Date();
    const diff = Math.abs(now.getTime() - qd.getTime());
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (now >= qd) {
      daysQuit = diffDays;
    }
  }

  const moneySaved = daysQuit * dailyCost;

  // Handle a successfully defeated craving
  const handleCravingAvoided = (intensity: string, trigger: string) => {
    const nextCount = cravingsCount + 1;
    setCravingsCount(nextCount);
    localStorage.setItem("cravings_avoided", nextCount.toString());
    
    // Log to console/mock tracking
    console.log(`Avoided ${intensity} craving triggered by ${trigger}`);
  };

  // Health timelines for oral cancer prevention
  const healthMilestones = [
    { 
      label: lang === "od" ? "୨୪ ଘଣ୍ଟା" : lang === "hi" ? "24 घंटे" : "24 Hours", 
      text: lang === "od" ? "ପାଟିର ରାସାୟନିକ ଜ୍ୱଳନ କମିଯାଏ । ଗାଲର କୋଷଗୁଡ଼ିକ ଶ୍ୱାସକ୍ରିୟା ଆରମ୍ଭ କରନ୍ତି ।" : lang === "hi" ? "मुंह की रासायनिक जलन शांत होती है। गाल की कोशिकाएं सांस लेने लगती हैं।" : "Mouth chemical irritation subsides. Cheek tissue starts breathing.", 
      done: daysQuit >= 1 
    },
    { 
      label: lang === "od" ? "୭ ଦିନ" : lang === "hi" ? "7 दिन" : "7 Days", 
      text: lang === "od" ? "ସ୍ୱାଦ ଅନୁଭବ କରିବା ଶକ୍ତି ଫେରିଆସେ । ନୂତନ ସତେଜ ନିଶ୍ୱାସ ।" : lang === "hi" ? "स्वाद कलिकाएँ पुनः उत्पन्न होती हैं। ताजी बिना तंबाकू वाली सांसें।" : "Taste buds regenerate. Fresh non-tobacco breath.", 
      done: daysQuit >= 7 
    },
    { 
      label: lang === "od" ? "୧ ମାସ" : lang === "hi" ? "1 महीना" : "1 Month", 
      text: lang === "od" ? "ଗାଲ ମାଂସପେଶୀର ଟାଣପଣ କମିଯାଏ । OSMF ର ମାତ୍ରା ୨୦% ହ୍ରାସ ହୁଏ ।" : lang === "hi" ? "गाल की मांसपेशियों में अकड़न कम होती है। ओरल सबम्यूकस फाइब्रोसिस (OSMF) का जोखिम 20% कम हो जाता है।" : "Stiffness in cheek muscles recedes. OSFM risk drops by 20%.", 
      done: daysQuit >= 30 
    }
  ];

  return (
    <div className="screen">
      <div className="hero">
        <div className="heroTitle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: '4px' }}>
              {greeting.icon} {greeting.text}
            </span>
            {localStorage.getItem("user_name") || data.user.name}!
          </div>
          <span style={{ fontSize: '12px', background: 'rgba(13, 148, 136, 0.1)', color: 'var(--brand)', padding: '4px 10px', borderRadius: '12px', fontWeight: 800 }}>
            {chewProduct} Free
          </span>
        </div>
        
        {/* Progress Summary Card */}
        <div className="heroCard">
          <div className="heroRow">
            <div className="heroMeta">
              <span className="heroMetaLabel">{translate("quitProgress", lang)}</span>
              <span className="heroMetaValue">
                Week {data.program.currentWeek} <span className="heroMetaSub">of {data.program.totalWeeks}</span>
              </span>
            </div>
            <div className="heroMeta right">
              <span className="heroMetaLabel">{translate("daysTobaccoFree", lang)}</span>
              <span className="heroMetaValue">
                {daysQuit}
              </span>
            </div>
          </div>

          <WeekStrip days={data.weekDays} selectedDay={data.program.currentDay} />

          <div className={`unlockBanner ${weekComplete ? "ok" : ""}`}>{unlockText}</div>

          {/* Money Saved & Cravings Avoided Mini-Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '16px', borderTop: '1.5px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '10px 12px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: 600, textTransform: 'uppercase' }}>{translate("moneySaved", lang)}</div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#fef3c7', marginTop: '2px' }}>₹{moneySaved.toLocaleString()}</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '10px 12px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: 600, textTransform: 'uppercase' }}>{translate("urgesDefeated", lang)}</div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--brand-light)', marginTop: '2px' }}>{cravingsCount} {translate("cravingsAvoided", lang)}</div>
            </div>
          </div>
        </div>

        {/* 🚨 Emergency Craving Trigger Module */}
        <div className="detailCard" style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #fef2f2 0%, #ffe4e6 100%)',
          border: '1.5px dashed #f43f5e',
          borderRadius: 'var(--radius-lg)',
          marginTop: '16px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#9f1239', margin: '0 0 4px 0' }}>
            {lang === "od" ? "ଗୁଟଖା ଖାଇବାକୁ ଇଚ୍ଛା ହେଉଛି କି? ନିୟନ୍ତ୍ରଣ କରନ୍ତୁ!" : lang === "hi" ? "तंबाकू की तलब लगी है? खुद को संभालें!" : "Urge hit? Don't pick up a pouch!"}
          </h3>
          <p style={{ fontSize: '12px', color: '#be123c', margin: '0 0 16px 0', fontWeight: 500 }}>
            {lang === "od" ? "ସୁରକ୍ଷିତ ଶ୍ୱାସକ୍ରିୟା ଦ୍ୱାରା ନିଜକୁ ଶାନ୍ତ ରଖନ୍ତୁ ।" : lang === "hi" ? "60-सेकंड के श्वास अभ्यास से तलब को नियंत्रित करें।" : "Take a 60-second breathing reset to let the craving pass naturally."}
          </p>
          <button
            type="button"
            onClick={() => setIsCravingOpen(true)}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: '#e11d48',
              color: 'white',
              fontWeight: 800,
              fontSize: '14px',
              boxShadow: '0 4px 14px rgba(225, 29, 72, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            🚨 {translate("haveCraving", lang)}
          </button>
        </div>

        {/* Standard Session Card */}
        <div className="stepCard" style={{ marginTop: '16px' }}>
          <div className="stepCardIcon" aria-hidden="true">
             <div className="stepIconBg" />
          </div>
          <div className="stepCardInfo">
            <div className="stepCardTitle">{data.step.name}</div>
            <div className="stepCardSub">
              {data.todayCompletedTasks} of {data.todayTotalTasks} Tasks Completed
            </div>
          </div>
          <button
            type="button"
            className="primaryButton"
            onClick={() => navigate(`/journey?day=${data.program.currentDay}`)}
          >
            {translate("startSession", lang)}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      {/* Oral Health Timeline Section */}
      <div className="section" style={{ marginTop: '24px' }}>
        <div className="sectionTitle">{translate("oralHealthTimeline", lang)}</div>
        <div className="detailCard" style={{ padding: '20px', background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'grid', gap: '16px' }}>
            {healthMilestones.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: m.done ? 'rgba(13, 148, 136, 0.1)' : '#f1f5f9',
                  color: m.done ? 'var(--brand)' : '#94a3b8',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '12px',
                  fontWeight: 800,
                  flexShrink: 0
                }}>
                  {m.done ? '✓' : idx + 1}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: m.done ? 'var(--brand)' : 'var(--text)' }}>
                    {m.label} {lang === "od" ? "ଲକ୍ଷ୍ୟ" : lang === "hi" ? "पड़ाव" : "Milestone"} {m.done ? (lang === "od" ? "• ଉନ୍ମୋଚିତ" : lang === "hi" ? "• अनलॉक" : "• Unlocked") : ""}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px', lineHeight: 1.4 }}>
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button
            type="button"
            onClick={() => navigate("/screening")}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              border: '1.5px solid var(--brand)',
              color: 'var(--brand)',
              fontWeight: 800,
              fontSize: '13px',
              textAlign: 'center',
              background: 'transparent',
              marginTop: '16px'
            }}
          >
            {translate("runScreening", lang)}
          </button>
        </div>
      </div>

      <div className="section" style={{ marginTop: '24px' }}>
        <div className="sectionTitle">{translate("smokelessPrevention", lang)}</div>
        <div className="learnRow">
          {data.learnCards.map((c) => (
            <button
              key={c.id}
              type="button"
              className="learnCard"
              onClick={() => navigate(`/content/${c.contentId}`)}
            >
              <div className="learnTitle">{c.title}</div>
              <div className="learnSub">{c.subtitle}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Craving Modal Drawer */}
      <EmergencyCraving
        isOpen={isCravingOpen}
        onClose={() => setIsCravingOpen(false)}
        onLogged={handleCravingAvoided}
      />
    </div>
  );
}
