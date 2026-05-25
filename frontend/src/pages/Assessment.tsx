import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Question {
  id: string;
  text: string;
  options: { text: string; points: number }[];
}

export default function Assessment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [userInfo, setUserInfo] = useState({
    name: "Anshul",
    age: "24",
    productType: "Gutkha",
    dailyCost: "50",
    quitDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  });

  const questions: Question[] = [
    {
      id: "wakeUp",
      text: "How soon after waking up do you use your first chew of tobacco?",
      options: [
        { text: "Within 5 minutes", points: 3 },
        { text: "6 to 30 minutes", points: 2 },
        { text: "31 to 60 minutes", points: 1 },
        { text: "After 60 minutes", points: 0 }
      ]
    },
    {
      id: "swallow",
      text: "How often do you intentionally swallow your tobacco juice?",
      options: [
        { text: "Always", points: 2 },
        { text: "Sometimes", points: 1 },
        { text: "Never / I spit it out", points: 0 }
      ]
    },
    {
      id: "hateGiveUp",
      text: "Which chew would you hate most to give up?",
      options: [
        { text: "The first one in the morning", points: 1 },
        { text: "Any other chew during the day", points: 0 }
      ]
    },
    {
      id: "dailyCount",
      text: "How many times do you chew tobacco per day?",
      options: [
        { text: "10 times or less", points: 0 },
        { text: "11 to 20 times", points: 1 },
        { text: "21 to 30 times", points: 2 },
        { text: "31 times or more", points: 3 }
      ]
    },
    {
      id: "morningFrequency",
      text: "Do you chew more frequently during the first hours after waking than during the rest of the day?",
      options: [
        { text: "Yes", points: 1 },
        { text: "No", points: 0 }
      ]
    },
    {
      id: "illInBed",
      text: "Do you chew even if you are so ill that you are in bed most of the day?",
      options: [
        { text: "Yes", points: 1 },
        { text: "No", points: 0 }
      ]
    }
  ];

  const handleOptionSelect = (points: number) => {
    const qId = questions[currentStep].id;
    setAnswers(prev => ({ ...prev, [qId]: points }));
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCurrentStep(questions.length); // Result phase
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Calculations
  const score = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
  
  let dependenceLevel = "Low Dependence";
  let dependenceColor = "#0d9488"; // Teal
  let dependenceBg = "#f0fdf4";
  let dependenceDesc = "You have a light chemical addiction. Swapping pouches for saunf or cardamoms will feel highly effective!";

  if (score >= 5 && score <= 7) {
    dependenceLevel = "Moderate Dependence";
    dependenceColor = "#f59e0b"; // Orange
    dependenceBg = "#fef3c7";
    dependenceDesc = "You have a moderate chemical dependency. Dynamic craving logs and structured tapering will assist your path.";
  } else if (score >= 8) {
    dependenceLevel = "High Dependence";
    dependenceColor = "#dc2626"; // Red
    dependenceBg = "#fee2e2";
    dependenceDesc = "Your nicotine reliance is high. Consider using low-dosage Nicotex gums, daily breathing guides, and booking a counseling call.";
  }

  const handleFinish = () => {
    // Save to local storage to persist user profiling
    localStorage.setItem("ftnd_score", score.toString());
    localStorage.setItem("dependence_level", dependenceLevel);
    localStorage.setItem("chew_product", userInfo.productType);
    localStorage.setItem("daily_cost", userInfo.dailyCost);
    localStorage.setItem("quit_date", userInfo.quitDate);
    localStorage.setItem("user_name", userInfo.name);
    localStorage.setItem("assessment_completed", "true");

    // Redirect to Home
    navigate("/");
  };

  const progressPct = ((currentStep) / questions.length) * 100;

  return (
    <div className="screen" style={{ minHeight: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      
      {currentStep < questions.length ? (
        // Questionnaire UI
        <div className="detailCard" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              FTND-ST Assessment • Question {currentStep + 1} of {questions.length}
            </span>
            {currentStep > 0 && (
              <button 
                type="button" 
                onClick={handlePrev}
                style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                ← Back
              </button>
            )}
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', marginBottom: '28px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPct}%`, height: '100%', background: 'linear-gradient(90deg, var(--brand), var(--brand-light))', borderRadius: '3px', transition: 'width 0.3s ease' }} />
          </div>

          {/* Question Text */}
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)', marginBottom: '24px', lineHeight: '1.4' }}>
            {questions[currentStep].text}
          </h2>

          {/* Answer Options */}
          <div style={{ display: 'grid', gap: '12px' }}>
            {questions[currentStep].options.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleOptionSelect(opt.points)}
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid #e2e8f0',
                  textAlign: 'left',
                  background: 'white',
                  fontWeight: 600,
                  fontSize: '15px',
                  color: 'var(--text)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--brand)';
                  e.currentTarget.style.background = '#f0fdf4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.background = 'white';
                }}
              >
                <span>{opt.text}</span>
                <span style={{ fontSize: '12px', color: 'var(--muted)', background: '#f1f5f9', padding: '2px 8px', borderRadius: '10px' }}>
                  {opt.points} {opt.points === 1 ? 'pt' : 'pts'}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        // Results & Settings Customization UI
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Dependence Level Card */}
          <div className="detailCard" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', textAlign: 'center', boxShadow: 'var(--shadow-premium)', background: 'white' }}>
            <div style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '99px', background: dependenceBg, color: dependenceColor, fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', marginBottom: '16px' }}>
              {dependenceLevel}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
              <span style={{ fontSize: '64px', fontWeight: 900, color: 'var(--text)', lineHeight: 1 }}>{score}</span>
              <span style={{ fontSize: '20px', fontWeight: 600, color: 'var(--muted)' }}>/ 11 pts</span>
            </div>

            <p style={{ fontSize: '14px', color: 'var(--muted)', margin: '0 auto 16px max-width: 90%', lineHeight: '1.5' }}>
              {dependenceDesc}
            </p>

            <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: '36%', height: '100%', background: '#0d9488' }} /> {/* Low range */}
              <div style={{ width: '27%', height: '100%', background: '#f59e0b' }} /> {/* Mod range */}
              <div style={{ width: '37%', height: '100%', background: '#dc2626' }} /> {/* High range */}
            </div>
            
            {/* Indicator Marker */}
            <div style={{ width: '100%', position: 'relative', height: '12px' }}>
              <div style={{
                position: 'absolute',
                left: `${(score / 11) * 92 + 4}%`,
                top: '-4px',
                width: '0',
                height: '0',
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderBottom: '8px solid var(--text)'
              }} />
            </div>
          </div>

          {/* User Journey Configuration Card */}
          <div className="detailCard" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', background: 'white', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)', margin: 0, borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              Configure Your Quit Journey
            </h3>

            {/* User Name input */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Your Name
              </label>
              <input 
                type="text" 
                value={userInfo.name}
                onChange={e => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1.5px solid #e2e8f0', fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}
              />
            </div>

            {/* Product Type selection */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Chewable Product Used
              </label>
              <select 
                value={userInfo.productType}
                onChange={e => setUserInfo(prev => ({ ...prev, productType: e.target.value }))}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1.5px solid #e2e8f0', fontSize: '14px', fontWeight: 600, color: 'var(--text)', background: 'white' }}
              >
                <option value="Gutkha">Gutkha (ഗുട്ഖ)</option>
                <option value="Khaini">Khaini (ഖൈനി)</option>
                <option value="Pan Masala">Paan Masala with Tobacco</option>
                <option value="Zarda">Zarda / Mishri</option>
                <option value="Gul">Gul / Mishri Powder</option>
                <option value="Betel Quid">Betel Quid with Zarda</option>
              </select>
            </div>

            {/* Daily Expense input */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Daily Expense on Tobacco (₹)
              </label>
              <input 
                type="number" 
                value={userInfo.dailyCost}
                onChange={e => setUserInfo(prev => ({ ...prev, dailyCost: e.target.value }))}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1.5px solid #e2e8f0', fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}
              />
            </div>

            {/* Quit Date Selection */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Target Quit Date
              </label>
              <input 
                type="date" 
                value={userInfo.quitDate}
                onChange={e => setUserInfo(prev => ({ ...prev, quitDate: e.target.value }))}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1.5px solid #e2e8f0', fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}
              />
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            className="primaryButton"
            onClick={handleFinish}
            style={{ width: '100%', padding: '18px', fontSize: '16px', fontWeight: 800 }}
          >
            Save & Start Journey!
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}
