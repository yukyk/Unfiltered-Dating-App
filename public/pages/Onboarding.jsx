import React, { useState } from 'react';
import { useOnboardingController } from '../../Controllers/useOnboardingController';
import { calculateRealness, getRealnessMessage } from '../../Models/realness';

function cn(...classes) { return classes.filter(Boolean).join(' '); }

// ════════════════════════════════════════
// SCREEN 0: SPLASH
// ════════════════════════════════════════
function Splash({ onEnter }) {
  return (
    <div className="page active s-in-r" id="p-splash">
      <div className="amb"></div>
      <p className="sp-mark">Unfiltered</p>
      <div className="sp-lines">
        <span className="sp-l sp-l1">Most apps want</span>
        <span className="sp-l sp-l2">your best.</span>
        <span className="sp-l sp-l3">We want your real.</span>
      </div>
      <div className="sp-rule"></div>
      <p className="sp-sub">No filters. No performance.</p>
      <div className="sp-cta">
        <button className="btn-ghost" onClick={onEnter}>Begin &nbsp;→</button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// QUESTION PAGE
// ════════════════════════════════════════
function QuestionPage({ question, questionIndex, totalQuestions, answer, onAnswer, onBack, onSkip }) {
  const pct = Math.round(((questionIndex) / totalQuestions) * 100);

  const chapterColors = { good: 'ch-good', sad: 'ch-sad', bad: 'ch-bad' };
  
  // Map chapter string to group index (0, 1, 2)
  const chapterGroupMap = { good: 0, sad: 1, bad: 2 };
  const currentGroup = chapterGroupMap[question.chapter] || 0;

  return (
    <div className="page q-page active s-in-r">
      <div className="q-track">
        <div className="q-track-fill" style={{ width: `${pct}%` }}></div>
      </div>
      <div className="q-group-dots">
        {[0, 1, 2].map((gi) => {
          let cls = 'g-dot';
          if (gi < currentGroup) cls += ' done';
          else if (gi === currentGroup) cls += ' active';
          return <div key={gi} className={cls}></div>;
        })}
      </div>
      <div className="q-scroll">
        <div className="q-meta">
          <span className="q-step">{String(questionIndex + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')}</span>
          <span className={cn('q-ch-pill', chapterColors[question.chapter])}>{question.chapterLabel}</span>
        </div>
        <p className="q-text" dangerouslySetInnerHTML={{ __html: question.question }} />
        <div className="q-opts">
          {question.options.map((opt, oi) => (
            <button
              key={oi}
              className={cn('q-opt', answer === opt && 'sel')}
              onClick={() => onAnswer(question.id, opt)}
            >
              <span className="q-opt-dot"></span>{opt}
            </button>
          ))}
        </div>
      </div>
      <div className="q-foot">
        <button className="btn-back-sm" onClick={onBack}>← back</button>
        <button className="btn-skip-sm" onClick={onSkip}>skip →</button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// INSIGHT 1
// ════════════════════════════════════════
function Insight1({ gender, onContinue, onBack }) {
  const isMale = gender === 'male';

  return (
    <div className="page insight-page active s-in-r" id="ins-1">
      <div className="ticker-wrap">
        <div className="ticker-track">
          <span className="ticker-item">{isMale ? 'Stoic and strong' : 'Picture perfect'} &nbsp;<span className="ticker-sep">·</span>&nbsp;</span>
          <span className="ticker-item">{isMale ? 'Never show the cracks' : 'Highlight reel'} &nbsp;<span className="ticker-sep">·</span>&nbsp;</span>
          <span className="ticker-item">{isMale ? 'Figure it out alone' : 'Best angle'} &nbsp;<span className="ticker-sep">·</span>&nbsp;</span>
          <span className="ticker-item">{isMale ? 'No pressure' : 'Filter on'} &nbsp;<span className="ticker-sep">·</span>&nbsp;</span>
          <span className="ticker-item">{isMale ? 'Always fine' : 'Good vibes only'} &nbsp;<span className="ticker-sep">·</span>&nbsp;</span>
          <span className="ticker-item">{isMale ? 'Hold it together' : 'Living my best life'} &nbsp;<span className="ticker-sep">·</span>&nbsp;</span>
          <span className="ticker-item">{isMale ? 'Stoic and strong' : 'Picture perfect'} &nbsp;<span className="ticker-sep">·</span>&nbsp;</span>
          <span className="ticker-item">{isMale ? 'Never show the cracks' : 'Highlight reel'} &nbsp;<span className="ticker-sep">·</span>&nbsp;</span>
          <span className="ticker-item">{isMale ? 'Figure it out alone' : 'Best angle'} &nbsp;<span className="ticker-sep">·</span>&nbsp;</span>
          <span className="ticker-item">{isMale ? 'No pressure' : 'Filter on'} &nbsp;<span className="ticker-sep">·</span>&nbsp;</span>
          <span className="ticker-item">{isMale ? 'Always fine' : 'Good vibes only'} &nbsp;<span className="ticker-sep">·</span>&nbsp;</span>
          <span className="ticker-item">{isMale ? 'Hold it together' : 'Living my best life'} &nbsp;<span className="ticker-sep">·</span>&nbsp;</span>
        </div>
      </div>
      <div className="ins-body">
        <p className="ins-eyebrow">Pause. Read this.</p>
        <h2 className="ins-headline">
          {isMale ? (
            <>Society gave you<br/>the tools to build<br/><strong>a silent wall</strong><br/>and call it strength.</>
          ) : (
            <>Social media gave us<br/>the tools to build<br/><strong>a perfect stranger</strong><br/>and call it ourselves.</>
          )}
        </h2>
        <div className="ins-stat-row">
          <div className="ins-stat">
            <div className="stat-num">{isMale ? '68%' : '73%'}</div>
            <div className="stat-lbl">{isMale ? 'feel they must hide their struggles to be loved' : 'feel pressure to appear happier online than in real life'}</div>
          </div>
          <div className="ins-stat">
            <div className="stat-num">{isMale ? '1 in 4' : '6hrs'}</div>
            <div className="stat-lbl">{isMale ? 'have no one they can be completely vulnerable with' : 'average time spent curating an image no one fully believes'}</div>
          </div>
        </div>
        <p className="ins-pull">
          {isMale ? (
            <>
              "You spend years trying to be the version of yourself
              that <em>never needs anything</em> — and forget how
              to ask for it when you do."
            </>
          ) : (
            <>
              "You spend years trying to be the version of yourself
              that <em>other people want to see</em> — and forget what
              the real one even looks like."
            </>
          )}
        </p>
        <div className="ins-preview">
          <p className="ins-preview-label">What's coming next</p>
          <div className="ins-preview-items">
            <div className="ins-preview-item"><span className="ins-preview-dot"></span>How you've been hurt — and what that actually taught you</div>
            <div className="ins-preview-item"><span className="ins-preview-dot"></span>The version of you that shows up in relationships — honest version</div>
            <div className="ins-preview-item"><span className="ins-preview-dot"></span>What you really need — not what sounds good to say you need</div>
          </div>
        </div>
      </div>
      <div className="ins-foot">
        <button className="btn-main" onClick={onContinue}>I'm ready &nbsp;→</button>
        <button className="btn-txt" onClick={onBack}>← back</button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// INSIGHT 2
// ════════════════════════════════════════
function Insight2({ gender, onContinue, onBack }) {
  const isMale = gender === 'male';

  return (
    <div className="page insight-page active s-in-r" id="ins-2">
      <div className="ins2-visual">
        <div className="ins2-lines">
          <div className="fake-post">
            <div className="fp-avatar"></div>
            <div className="fp-text">
              <div className="fp-name"></div>
              <div className="fp-caption"></div>
            </div>
          </div>
          <div className="fake-post muted">
            <div className="fp-avatar"></div>
            <div className="fp-text">
              <div className="fp-name" style={{width:'45%'}}></div>
              <div className="fp-caption" style={{width:'70%'}}></div>
            </div>
          </div>
          <div className="fake-post muted" style={{opacity:0.2}}>
            <div className="fp-avatar"></div>
            <div className="fp-text">
              <div className="fp-name" style={{width:'55%'}}></div>
              <div className="fp-caption" style={{width:'90%'}}></div>
            </div>
          </div>
        </div>
        <div className="ins2-overlay"></div>
        <div className="ins2-tag">All performance. No truth.</div>
      </div>
      <div className="ins-body">
        <p className="ins-eyebrow" style={{opacity:0, animation:'fadeUp 0.6s ease 0.1s forwards'}}>Take a breath.</p>
        <h2 className="ins-headline" style={{opacity:0, animation:'fadeUp 0.8s var(--ease) 0.2s forwards'}}>
          Nobody posts the<br/>
          {isMale ? '3am anxiety.' : 'Tuesday at 2am.'}<br/>
          Nobody shows<br/>
          <strong>the actual weight</strong><br/>
          they're carrying.
        </h2>
        <p className="ins-pull" style={{opacity:0, animation:'fadeUp 0.7s ease 0.36s forwards'}}>
          {isMale ? (
            <>
              "Carrying everything silently is exhausting.
              And it's the reason you meet each other's <em>armor</em>
              and wonder why connection never goes deeper."
            </>
          ) : (
            <>
              "Performing happiness is exhausting.
              And it's the reason people meet each other's <em>mask</em>
              and wonder why connection never goes deeper."
            </>
          )}
        </p>
        <div className="ins-preview" style={{opacity:0, animation:'fadeUp 0.7s ease 0.48s forwards'}}>
          <p className="ins-preview-label">What's coming next</p>
          <div className="ins-preview-items">
            <div className="ins-preview-item"><span className="ins-preview-dot"></span>The chapters of you that society said to keep quiet</div>
            <div className="ins-preview-item"><span className="ins-preview-dot"></span>How you've changed — really changed — through difficulty</div>
            <div className="ins-preview-item"><span className="ins-preview-dot"></span>What you'd say if you knew someone was actually listening</div>
          </div>
        </div>
      </div>
      <div className="ins-foot" style={{opacity:0, animation:'fadeUp 0.6s ease 0.58s forwards'}}>
        <button className="btn-main" onClick={onContinue}>Keep going &nbsp;→</button>
        <button className="btn-txt" onClick={onBack}>← back</button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// INSIGHT 3
// ════════════════════════════════════════
function Insight3({ gender, onContinue, onBack }) {
  const isMale = gender === 'male';

  return (
    <div className="page insight-page active s-in-r" id="ins-3">
      <div className="ins3-quote-wrap" style={{flex:'none', padding:'36px 28px 20px'}}>
        <p className="ins3-large-q">"</p>
        <p className="ins3-quote">
          {isMale ? (
            <>The parts of you that you've been told to <em>suppress</em> are exactly the parts someone out there is looking to trust.</>
          ) : (
            <>The parts of you that you've been told to <em>hide</em> are exactly the parts someone out there is looking to love.</>
          )}
        </p>
        <p className="ins3-attr">— Unfiltered</p>
      </div>
      <div className="ins-body" style={{paddingTop:0, flex:1}}>
        <p className="ins-eyebrow" style={{opacity:0, animation:'fadeUp 0.6s ease 0.15s forwards'}}>You made it.</p>
        <h2 className="ins-headline" style={{fontSize:'clamp(1.5rem,5.5vw,2.2rem)', opacity:0, animation:'fadeUp 0.8s var(--ease) 0.28s forwards'}}>
          You just answered<br/>
          thirteen questions that<br/>
          most people never ask<br/>
          <strong>themselves.</strong>
        </h2>
        <p className="ins-pull" style={{opacity:0, animation:'fadeUp 0.7s ease 0.42s forwards'}}>
          "This is the most honest version of you
          that any app has ever asked for.
          Now let's find someone who <em>deserves to read it.</em>"
        </p>
        <div className="ins-preview" style={{opacity:0, animation:'fadeUp 0.7s ease 0.56s forwards', background:'rgba(192,90,52,0.05)', borderColor:'rgba(192,90,52,0.14)'}}>
          <p className="ins-preview-label">What happens next</p>
          <div className="ins-preview-items">
            <div className="ins-preview-item"><span className="ins-preview-dot"></span>Your profile is built for who you are, no curation</div>
            <div className="ins-preview-item"><span className="ins-preview-dot"></span>Match with people who have been equally honest</div>
            <div className="ins-preview-item"><span className="ins-preview-dot"></span>Connect on something real — not a polished version of anyone</div>
          </div>
        </div>
      </div>
      <div className="ins-foot" style={{opacity:0, animation:'fadeUp 0.6s ease 0.68s forwards'}}>
        <button className="btn-main" onClick={onContinue}>Choose my world &nbsp;→</button>
        <button className="btn-txt" onClick={onBack}>← back</button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// SCREEN 13: GENDER SPLIT
// ════════════════════════════════════════
function GenderSplit({ onSelect, onBack }) {
  return (
    <div className="page active s-in-r" id="p-gender">
      <p className="g-label">Choose your world</p>
      <div className="gsplit">
        <div className="ghalf gh-m" id="gh-male" onClick={() => onSelect('male')}>
          <div className="gh-glow"></div>
          <div className="gh-inner">
            <span className="gh-sym">♂</span>
            <span className="gh-word">He</span>
            <span className="gh-cta">Enter →</span>
          </div>
        </div>
        <div className="g-divider">
          <div className="g-div-line"></div>
          <div className="g-div-dot">or</div>
          <div className="g-div-line"></div>
        </div>
        <div className="ghalf gh-f" id="gh-female" onClick={() => onSelect('female')}>
          <div className="gh-glow"></div>
          <div className="gh-inner">
            <span className="gh-sym">♀</span>
            <span className="gh-word">She</span>
            <span className="gh-cta">Enter →</span>
          </div>
        </div>
      </div>
      <div className="g-back-wrap">
        <button className="btn-txt" onClick={onBack}>← back</button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// SCREEN 14: BRIDGE
// ════════════════════════════════════════
function Bridge({ onContinue }) {
  return (
    <div className="page bridge-page active s-in-r">
      <div className="bridge-inner">
        <p className="bridge-mark">Unfiltered</p>
        <h2 className="bridge-h">Now let's make<br/>it official.</h2>
        <div className="bridge-cta">
          <button className="btn-ghost-terra" onClick={onContinue}>Create your account &nbsp;→</button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// SCREEN 15: ACCOUNT CREATION
// ════════════════════════════════════════
function AccountForm({ onContinue, onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getStrength = (pw) => {
    let s = 0;
    if (pw.length >= 6) s++;
    if (pw.length >= 10) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const strength = getStrength(password);
  const isValid = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email) && password.length >= 6;
  
  const ws = ['0%', '20%', '40%', '65%', '85%', '100%'];
  const cs = ['', '#c05a34', '#d4a96a', '#d4a96a', '#6aaa7a', '#6aaa7a'];
  const hs = ['', 'Weak', 'Fair', 'Fair', 'Strong', 'Very strong'];

  return (
    <div className="page acc-page active s-in-r">
      <div className="pg-inner">
        <p className="pg-eyebrow">Step 1 of 3 &nbsp;·&nbsp; Account</p>
        <h2 className="pg-title">Who are<br/>you, <em>really?</em></h2>
        <p className="pg-sub">Just the basics. We won't ask for more than we need.</p>
        <div className="fields">
          <div className="field">
            <label className="field-lbl">Your name</label>
            <input
              className="field-inp" type="text"
              placeholder="What people call you"
              value={name} onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="field">
            <label className="field-lbl">Email address</label>
            <input
              className="field-inp" type="email"
              placeholder="your@email.com"
              value={email} onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <label className="field-lbl">Password</label>
            <input
              className="field-inp" type="password"
              placeholder="Something you'll remember"
              value={password} onChange={e => setPassword(e.target.value)}
            />
            {password.length > 0 && (
              <>
                <div className="pw-str"><div className="pw-bar" style={{ width: ws[strength], background: cs[strength] }}></div></div>
                <span className="field-hint" style={{ color: cs[strength] }}>{hs[strength]}</span>
              </>
            )}
          </div>
        </div>
        <div className="or-row">
          <div className="or-line"></div><span className="or-txt">or</span><div className="or-line"></div>
        </div>
        <div className="foot-stack">
          <button className="btn-outline" onClick={() => onContinue(name || 'Guest', email || 'guest@unfiltered.app')}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#4285F4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#34A853" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          <button className="btn-main" disabled={!isValid} onClick={() => onContinue(name, email)}>Continue →</button>
          <button className="btn-txt" onClick={onBack}>← back</button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// SCREEN 16: SUBSCRIPTION PLANS
// ════════════════════════════════════════
export function PlansScreen({ onContinue, onBack }) {
  const [selected, setSelected] = useState('unfiltered');

  const plans = [
    {
      id: 'free', name: 'Free', price: '$0', per: ' / forever',
      perks: ['5 swipes per day', 'View Layer 1 profiles', 'Up to 10 messages per match', 'Standard matching'],
    },
    {
      id: 'honest', name: 'Honest', price: '$6', per: '.99 / month',
      perks: ['10 swipes per day', 'Layers 1–4 visible on all profiles', 'Unlimited messaging', 'See who liked you', 'Habits & Everyday unlocked'],
    },
    {
      id: 'unfiltered', name: 'Unfiltered', price: '$12', per: '.99 / month', badge: 'Most real',
      perks: ['20 swipes per day', 'All 7 layers fully unlocked', 'AI compatibility read', 'Realness Score visible to matches', 'The Wound & The Ask unlocked', 'Priority in matching algorithm'],
    },
  ];

  return (
    <div className="page plans-page active s-in-r">
      <div className="plans-wrap">
        <p className="pg-eyebrow" style={{opacity:1, animation:'none'}}>Step 2 of 3 &nbsp;·&nbsp; Choose your plan</p>
        <h2 className="pg-title" style={{marginBottom:'4px', opacity:1, animation:'none'}}>How deep do you<br/>want to <em>go?</em></h2>
        <p className="pg-sub" style={{opacity:1, animation:'none'}}>All plans show real people. The difference is how many you can reach.</p>
        <div className="plans-grid" style={{opacity:1, animation:'none'}}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn('plan-card', selected === plan.id && 'picked')}
              onClick={() => setSelected(plan.id)}
            >
              {plan.badge && <span className="plan-badge">{plan.badge}</span>}
              <p className="plan-name">{plan.name}</p>
              <div className="plan-price">
                <span className="plan-curr">$</span>
                <span className="plan-amt">{plan.price.replace('$', '')}</span>
                <span className="plan-per">{plan.per}</span>
              </div>
              <div className="plan-perks">
                {plan.perks.map((perk, j) => (
                  <div key={j} className="plan-perk"><span className="perk-dot"></span>{perk}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="plans-note" style={{opacity:1, animation:'none'}}>Payment not required now.<br/><em>Start free — upgrade anytime from your profile.</em></p>
        <div className="plans-foot" style={{opacity:1, animation:'none'}}>
          <button className="btn-main" onClick={() => onContinue(selected)}>Continue with selected plan →</button>
          {onBack && <button className="btn-txt" onClick={onBack}>← back</button>}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// SCREEN 17: PROFILE SETUP
// ════════════════════════════════════════
function ProfileSetup({ gender, onFinish, onBack }) {
  const [coverPhotos, setCoverPhotos] = useState([]);
  const [goodAnswers, setGoodAnswers] = useState({});
  const [sadAnswers, setSadAnswers] = useState({});
  const [badAnswers, setBadAnswers] = useState({});
  const [habits, setHabits] = useState({ sleep: null, diet: null, screentime: null, faith: null });
  const [theAsk, setTheAsk] = useState('');
  const [expandedChapter, setExpandedChapter] = useState(null);

  const profileData = {
    name: 'filled', email: 'filled',
    layer1_photos: coverPhotos,
    goodChapterDone: Object.keys(goodAnswers).length >= 2,
    sadChapterDone: Object.keys(sadAnswers).length >= 2,
    badChapterDone: Object.keys(badAnswers).length >= 2,
    layer4_habits: (habits.sleep || habits.diet || habits.screentime || habits.faith) ? habits : null,
    layer7_ask: theAsk,
  };
  const score = calculateRealness(profileData);
  const message = getRealnessMessage(score);

  const photoSlots = gender === 'female' ? 4 : 2;
  const gridCls = gender === 'female' ? 'pg-4' : 'pg-2';

  const handlePhotoUpload = (index, file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverPhotos(prev => {
        const next = [...prev];
        next[index] = url;
        return next;
      });
    }
  };

  const removePhoto = (e, index) => {
    e.stopPropagation();
    setCoverPhotos(prev => {
      const next = [...prev];
      delete next[index];
      return next.filter(x => x !== undefined);
    });
  };

  const handleHabit = (type, value) => {
    setHabits(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div className="page profile-page active s-in-r">
      <div className="profile-wrap">
        <p className="pg-eyebrow" style={{opacity:1, animation:'none'}}>Step 3 of 3 &nbsp;·&nbsp; Your profile</p>
        <h2 className="pg-title" style={{marginBottom:'4px', opacity:1, animation:'none'}}>Build your<br/><em>truth.</em></h2>
        <p className="pg-sub" style={{marginBottom:'18px', opacity:1, animation:'none'}}>This is what people see. Be as honest as you can stand to be.</p>

        <div className="rs-wrap">
          <p className="rs-label">Realness Score</p>
          <div className="rs-num">{score}<sup>%</sup></div>
          <div className="rs-track"><div className="rs-fill" style={{ width: score + '%' }}></div></div>
          <p className="rs-msg">{message}</p>
        </div>

        <div className="ps">
          <p className="ps-head">The Cover</p>
          <p className="ps-sub">Your first photos. Not your best — your most honest.</p>
          <div className={`pg ${gridCls}`}>
            {Array.from({ length: photoSlots }).map((_, i) => (
              <div key={i} className={cn("photo-slot", coverPhotos[i] && "filled")} onClick={() => document.getElementById('cov-up-'+i).click()}>
                <input id={'cov-up-'+i} type="file" accept="image/*" onChange={(e) => handlePhotoUpload(i, e.target.files[0])} />
                {coverPhotos[i] ? (
                  <>
                    <img src={coverPhotos[i]} alt="" />
                    <button className="slot-rm" onClick={(e) => removePhoto(e, i)}>✕</button>
                  </>
                ) : (
                  <>
                    <span className="slot-plus">+</span>
                    <span className="slot-lbl">Add photo</span>
                  </>
                )}
              </div>
            ))}
          </div>
          <p className="photo-note">Photos stay private until you match.</p>
        </div>

        <div className="ps">
          <p className="ps-head">Your Chapters</p>
          <p className="ps-sub">Three moments that shaped how you love. Good is required. Sad and Bad are optional — but they matter.</p>
          
          <div className={cn("ch-block", expandedChapter === 'good' && 'open')}>
            <div className="ch-head" onClick={() => setExpandedChapter(prev => prev === 'good' ? null : 'good')}>
              <div className="ch-left">
                <span className="ch-tag tg-good">Chapter 01</span>
                <span className="ch-title">A good moment</span>
              </div>
              <span className={cn("ch-bdg", Object.keys(goodAnswers).length >= 2 ? 'bdg-d' : 'bdg-e')}>{Object.keys(goodAnswers).length >= 2 ? '✓' : 'Empty'}</span>
            </div>
            <div className="ch-body"><div className="ch-inner">
              <p className="ch-q">What kind of moment was it?</p>
              <div className="ch-opts">
                {["Something I didn't plan for", "Something I earned through real effort", "A quiet moment only I know the weight of", "A person made it everything it was"].map((opt) => (
                  <button key={opt} className={cn("ch-opt", goodAnswers['q1'] === opt && 'sel')} onClick={(e) => { e.stopPropagation(); setGoodAnswers({...goodAnswers, q1: opt}); }}><span className="ch-dot"></span>{opt}</button>
                ))}
              </div>
              <p className="ch-q" style={{marginTop:'6px'}}>What did it reveal about what you need?</p>
              <div className="ch-opts">
                {["I need to feel trusted before I open up", "I need someone who notices the small things", "I need space to be myself without performing", "Still figuring that out honestly"].map((opt) => (
                  <button key={opt} className={cn("ch-opt", goodAnswers['q2'] === opt && 'sel')} onClick={(e) => { e.stopPropagation(); setGoodAnswers({...goodAnswers, q2: opt}); }}><span className="ch-dot"></span>{opt}</button>
                ))}
              </div>
            </div></div>
          </div>

          <div className={cn("ch-block", expandedChapter === 'sad' && 'open')}>
            <div className="ch-head" onClick={() => setExpandedChapter(prev => prev === 'sad' ? null : 'sad')}>
              <div className="ch-left">
                <span className="ch-tag tg-sad">Chapter 02 &nbsp;·&nbsp; <span style={{opacity:0.45, fontSize:'0.42rem'}}>optional</span></span>
                <span className="ch-title">Something that hurt</span>
              </div>
              <span className={cn("ch-bdg", Object.keys(sadAnswers).length >= 2 ? 'bdg-d' : 'bdg-e')}>{Object.keys(sadAnswers).length >= 2 ? '✓' : 'Empty'}</span>
            </div>
            <div className="ch-body"><div className="ch-inner">
              <p className="ch-q">What kind of loss was it?</p>
              <div className="ch-opts">
                {["Someone left before I understood why", "I gave everything and it still wasn't enough", "I lost a version of myself in a relationship", "I realised too late that I was the one holding on"].map((opt) => (
                  <button key={opt} className={cn("ch-opt", sadAnswers['q1'] === opt && 'sel')} onClick={(e) => { e.stopPropagation(); setSadAnswers({...sadAnswers, q1: opt}); }}><span className="ch-dot"></span>{opt}</button>
                ))}
              </div>
              <p className="ch-q" style={{marginTop:'6px'}}>What did it teach you about love?</p>
              <div className="ch-opts">
                {["You can't love someone into being ready", "Intensity isn't the same thing as depth", "The right person won't make you feel like too much", "I'm still learning — I haven't figured it out yet"].map((opt) => (
                  <button key={opt} className={cn("ch-opt", sadAnswers['q2'] === opt && 'sel')} onClick={(e) => { e.stopPropagation(); setSadAnswers({...sadAnswers, q2: opt}); }}><span className="ch-dot"></span>{opt}</button>
                ))}
              </div>
            </div></div>
          </div>

          <div className={cn("ch-block", expandedChapter === 'bad' && 'open')}>
            <div className="ch-head" onClick={() => setExpandedChapter(prev => prev === 'bad' ? null : 'bad')}>
              <div className="ch-left">
                <span className="ch-tag tg-bad">Chapter 03 &nbsp;·&nbsp; <span style={{opacity:0.45, fontSize:'0.42rem'}}>optional</span></span>
                <span className="ch-title">A chapter you carry</span>
              </div>
              <span className={cn("ch-bdg", Object.keys(badAnswers).length >= 2 ? 'bdg-d' : 'bdg-e')}>{Object.keys(badAnswers).length >= 2 ? '✓' : 'Empty'}</span>
            </div>
            <div className="ch-body"><div className="ch-inner">
              <p className="ch-q">What kind of chapter was it?</p>
              <div className="ch-opts">
                {["I hurt someone who didn't deserve it", "I stayed quiet when I should have spoken", "I chose comfort over honesty", "I walked away from something I should have stayed for"].map((opt) => (
                  <button key={opt} className={cn("ch-opt", badAnswers['q1'] === opt && 'sel')} onClick={(e) => { e.stopPropagation(); setBadAnswers({...badAnswers, q1: opt}); }}><span className="ch-dot"></span>{opt}</button>
                ))}
              </div>
              <p className="ch-q" style={{marginTop:'6px'}}>How has it changed how you show up now?</p>
              <div className="ch-opts">
                {["I communicate before things build up", "I take responsibility faster instead of defending", "I'm more careful with how I use people's trust", "I don't let important things go unsaid anymore"].map((opt) => (
                  <button key={opt} className={cn("ch-opt", badAnswers['q2'] === opt && 'sel')} onClick={(e) => { e.stopPropagation(); setBadAnswers({...badAnswers, q2: opt}); }}><span className="ch-dot"></span>{opt}</button>
                ))}
              </div>
            </div></div>
          </div>

        </div>

        <div className="ps">
          <p className="ps-head">Daily Habits</p>
          <p className="ps-sub">The truth about how you actually live. No curation.</p>
          <div className="hab-grid">
            {[
              { type: 'sleep', label: 'Sleep', opts: ['Before midnight', '1–3 am', 'Whenever'] },
              { type: 'diet', label: 'Diet', opts: ['Vegetarian', 'Mixed', "Whatever's there"] },
              { type: 'screentime', label: 'Screen time', opts: ['Under 3 hrs', '4–6 hrs', 'Too much'] },
              { type: 'faith', label: 'Faith', opts: ['Daily practice', 'Personal', 'Not religious'] },
            ].map(h => (
              <div key={h.type} className="hab-card">
                <p className="hab-lbl">{h.label}</p>
                <div className="hab-opts">
                  {h.opts.map(opt => (
                    <button key={opt} className={cn("hab-opt", habits[h.type] === opt && 'sel')} onClick={() => handleHabit(h.type, opt)}>{opt}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ps">
          <p className="ps-head">The Ask</p>
          <p className="ps-sub">One honest thing you need from a partner. Not a checklist. One sentence.</p>
          <textarea className="ask-ta" rows="3" maxLength={120}
            placeholder="The thing you've never quite said out loud..."
            onChange={e => setTheAsk(e.target.value)} value={theAsk}
          />
          <p className="char-c">{theAsk.length} / 120</p>
        </div>

        <div className="profile-foot">
          <button className="btn-main" onClick={onFinish}>Enter Unfiltered →</button>
          <button className="btn-txt" onClick={onBack}>← back</button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// MAIN ONBOARDING ORCHESTRATOR
// ════════════════════════════════════════════════════════════
export default function Onboarding() {
  const {
    step,
    goForward,
    goBack,
    stepToQuestionIndex,
    questions,
    selectedGender,
    onboardingAnswers,
    handleAnswer,
    handleGenderSelect,
    handleAccountCreate,
    handlePlanSelect,
    handleProfileFinish
  } = useOnboardingController();

  const renderStep = () => {
    if (step === 0) return <Splash onEnter={() => goForward(1)} />;
    
    if (step === 1) return <GenderSplit onSelect={handleGenderSelect} onBack={goBack} />;
    
    const qIndex = stepToQuestionIndex(step);
    if (qIndex !== -1 && questions) {
      const q = questions[qIndex];
      return (
        <QuestionPage
          key={q.id}
          question={q}
          questionIndex={qIndex}
          totalQuestions={13}
          answer={onboardingAnswers[q.id]}
          onAnswer={handleAnswer}
          onBack={goBack}
          onSkip={() => goForward(step + 1)}
        />
      );
    }

    if (step === 6) return <Insight1 gender={selectedGender} onContinue={() => goForward(7)} onBack={goBack} />;
    if (step === 12) return <Insight2 gender={selectedGender} onContinue={() => goForward(13)} onBack={goBack} />;
    if (step === 17) return <Insight3 gender={selectedGender} onContinue={() => goForward(18)} onBack={goBack} />;

    if (step === 18) return <Bridge onContinue={() => goForward(19)} />;

    if (step === 19) return <AccountForm onContinue={handleAccountCreate} onBack={goBack} />;

    if (step === 20) return <PlansScreen onContinue={handlePlanSelect} onBack={goBack} />;

    if (step === 21) return <ProfileSetup gender={selectedGender} onFinish={handleProfileFinish} onBack={goBack} />;

    return null;
  };

  const getBlendPct = () => {
    if (step <= 2) return 100;
    if (step >= 18) return 0;
    return Math.max(0, 100 - ((step - 2) / 16) * 100);
  };

  return (
    <div 
      className={cn("w-full h-full relative", selectedGender ? `theme-${selectedGender}` : "")}
      style={{ '--blend-pct': `${getBlendPct()}%`, transition: '--blend-pct 0.5s ease-out' }}
    >
      {renderStep()}
    </div>
  );
}
