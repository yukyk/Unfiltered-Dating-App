import React from 'react';
import BottomNav from '../components/BottomNav';
import { useDiscoverController } from '../../Controllers/useDiscoverController';

function cn(...classes) { return classes.filter(Boolean).join(' '); }

export default function Discover() {
  const {
    currentTab, setCurrentTab,
    showMatchOverlay, setShowMatchOverlay,
    personOpacity, personTransform, liked,
    swiperState, expandedStories, likedStories,
    goSlide, slidePhoto, toggleExpand, toggleReact,
    doPass, doLike
  } = useDiscoverController();

  return (
    <div className="page active s-in-r discover" style={{ background: 'var(--ink)', zIndex: 10 }}>
      {/* ── FIXED TOP HEADER ── */}
      <div className="disc-header">
        <div className="disc-brand-row">
          <div className="disc-brand">un<span>filtered</span></div>
          <div className="disc-actions">
            <div className="disc-icon-btn" title="Filter">⚙</div>
            <div className="disc-icon-btn" title="Notifications">🔔</div>
          </div>
        </div>

        {/* ── SECTION TABS ── */}
        <div className="section-tabs">
          <div 
            className={cn("stab", currentTab === 'good' && "active-good")} 
            onClick={() => setCurrentTab('good')}
          >
            <div className="stab-icon">🌿</div>
            <span className="stab-label">The Good</span>
            <span className="stab-sub">Bright moments</span>
          </div>

          <div 
            className={cn("stab", currentTab === 'real' && "active-real")} 
            onClick={() => setCurrentTab('real')}
          >
            <div className="stab-icon">🌑</div>
            <span className="stab-label">The Real</span>
            <span className="stab-sub">Raw &amp; honest</span>
          </div>

          <div 
            className={cn("stab", currentTab === 'rare' && "active-rare")} 
            onClick={() => setCurrentTab('rare')}
          >
            <div className="stab-icon">✦</div>
            <span className="stab-label">The Rare</span>
            <span className="stab-sub">Once in a life</span>
          </div>
        </div>
      </div>

      {/* ── PERSON ROW (fixed) ── */}
      <div 
        className="person-row" 
        style={{ 
          opacity: personOpacity, 
          transform: personTransform, 
          transition: 'opacity 0.3s ease, transform 0.3s ease' 
        }}
      >
        <div className="person-avatar">
          🌿
          <div className="person-online"></div>
        </div>
        <div className="person-info">
          <div className="person-name">Sara, 24</div>
          <div className="person-meta">
            <span>Mumbai</span>
            <span className="person-dot"></span>
            <span>2km away</span>
            <span className="person-dot"></span>
            <div className="person-realness">
              <span className="rs-pulse"></span>
              84% real
            </div>
          </div>
        </div>
        <div className="person-action-btns">
          <button className="p-pass" onClick={doPass} title="Pass">✕</button>
          <button 
            className="p-like" 
            onClick={doLike} 
            title="Like"
            style={liked ? { transform: 'scale(1.2)', background: '#e06a44' } : {}}
          >♥</button>
        </div>
      </div>

      {/* ══════════════════════════════
           SCROLLABLE CONTENT PANELS
      ══════════════════════════════ */}
      <div className="panels-wrap">

        {/* ── GOOD PANEL ── */}
        <div className={cn("panel", currentTab === 'good' && "active")}>
          <div className="panel-inner">

            {/* Story Card 1 */}
            <div className="story-card">
              <div className="photo-swiper">
                <div 
                  className="photo-swiper-track" 
                  style={{ transform: `translateX(${-swiperState.g1.current * 100}%)` }}
                >
                  <div className="photo-slide">
                    <div className="ps-placeholder">
                      <span className="psp-emoji">🌅</span>
                      <span className="psp-lbl">Rooftop, 2022</span>
                    </div>
                  </div>
                  <div className="photo-slide">
                    <div className="ps-placeholder">
                      <span className="psp-emoji">☕</span>
                      <span className="psp-lbl">Morning after</span>
                    </div>
                  </div>
                  <div className="photo-slide">
                    <div className="ps-placeholder">
                      <span className="psp-emoji">🌿</span>
                      <span className="psp-lbl">That evening</span>
                    </div>
                  </div>
                </div>
                <button className="photo-arrow prev" onClick={() => slidePhoto('g1',-1)} disabled={swiperState.g1.current === 0}>‹</button>
                <button className="photo-arrow next" onClick={() => slidePhoto('g1',1)} disabled={swiperState.g1.current === swiperState.g1.total - 1}>›</button>
                <div className="photo-dots">
                  {[0,1,2].map(i => (
                    <div key={i} className={cn("photo-dot", swiperState.g1.current === i && "active")} onClick={() => goSlide('g1', i)}></div>
                  ))}
                </div>
                <div className="story-photo-num">{swiperState.g1.current + 1} / 3</div>
              </div>
              <div className="story-content">
                <span className="story-tag tag-good">🌿 Good moment</span>
                <h3 className="story-title">The night I stopped pretending I was okay.</h3>
                <p className={cn("story-body", !expandedStories['g1'] && "collapsed")}>
                  We were on the rooftop. I hadn't told anyone I was exhausted for months — just carrying it quietly. 
                  Then someone asked me a simple question and I actually answered it honestly. For the first time in 
                  a long time. We talked until 4am and I drove home feeling lighter than I had in years. 
                  That night didn't fix anything, but it reminded me what honesty feels like.
                </p>
                <button className="story-expand" onClick={() => toggleExpand('g1')}>
                  {expandedStories['g1'] ? 'Show less ↑' : 'Read more →'}
                </button>
              </div>
              <div className="story-footer">
                <div className="story-react">
                  <button className={cn("react-btn", likedStories['g1-1'] && "liked")} onClick={() => toggleReact('g1-1')}>
                    <span className="react-icon">♥</span>
                    <span>Felt this</span>
                  </button>
                  <button className={cn("react-btn", likedStories['g1-2'] && "liked")} onClick={() => toggleReact('g1-2')}>
                    <span className="react-icon">↩</span>
                    <span>Relate</span>
                  </button>
                </div>
                <span className="story-time">3 days ago</span>
              </div>
            </div>

            {/* Story Card 2 */}
            <div className="story-card">
              <div className="photo-swiper">
                <div 
                  className="photo-swiper-track" 
                  style={{ transform: `translateX(${-swiperState.g2.current * 100}%)` }}
                >
                  <div className="photo-slide">
                    <div className="ps-placeholder">
                      <span className="psp-emoji">🎂</span>
                      <span className="psp-lbl">My 23rd birthday</span>
                    </div>
                  </div>
                  <div className="photo-slide">
                    <div className="ps-placeholder">
                      <span className="psp-emoji">🍰</span>
                      <span className="psp-lbl">Just the four of us</span>
                    </div>
                  </div>
                </div>
                <button className="photo-arrow prev" onClick={() => slidePhoto('g2',-1)} disabled={swiperState.g2.current === 0}>‹</button>
                <button className="photo-arrow next" onClick={() => slidePhoto('g2',1)} disabled={swiperState.g2.current === swiperState.g2.total - 1}>›</button>
                <div className="photo-dots">
                  {[0,1].map(i => (
                    <div key={i} className={cn("photo-dot", swiperState.g2.current === i && "active")} onClick={() => goSlide('g2', i)}></div>
                  ))}
                </div>
                <div className="story-photo-num">{swiperState.g2.current + 1} / 2</div>
              </div>
              <div className="story-content">
                <span className="story-tag tag-good">🌿 Good moment</span>
                <h3 className="story-title">The birthday where no one had to pretend.</h3>
                <p className={cn("story-body", !expandedStories['g2'] && "collapsed")}>
                  I asked for only four people this year. No party. No performance. 
                  Just the people who actually know me. We made too much food, 
                  someone cried (not me for once), and by 11pm I realised that 
                  small and real always beats big and hollow.
                </p>
                <button className="story-expand" onClick={() => toggleExpand('g2')}>
                  {expandedStories['g2'] ? 'Show less ↑' : 'Read more →'}
                </button>
              </div>
              <div className="story-footer">
                <div className="story-react">
                  <button className={cn("react-btn", likedStories['g2-1'] && "liked")} onClick={() => toggleReact('g2-1')}>
                    <span className="react-icon">♥</span>
                    <span>Felt this</span>
                  </button>
                  <button className={cn("react-btn", likedStories['g2-2'] && "liked")} onClick={() => toggleReact('g2-2')}>
                    <span className="react-icon">↩</span>
                    <span>Relate</span>
                  </button>
                </div>
                <span className="story-time">1 week ago</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── REAL PANEL ── */}
        <div className={cn("panel", currentTab === 'real' && "active")}>
          <div className="panel-inner">

            {/* Story Card 1 */}
            <div className="story-card">
              <div className="photo-swiper">
                <div 
                  className="photo-swiper-track" 
                  style={{ transform: `translateX(${-swiperState.r1.current * 100}%)` }}
                >
                  <div className="photo-slide">
                    <div className="ps-placeholder" style={{background:'#0d1018'}}>
                      <span className="psp-emoji">🌑</span>
                      <span className="psp-lbl">Last winter</span>
                    </div>
                  </div>
                  <div className="photo-slide">
                    <div className="ps-placeholder" style={{background:'#0d1018'}}>
                      <span className="psp-emoji">🪟</span>
                      <span className="psp-lbl">3am, couldn't sleep</span>
                    </div>
                  </div>
                </div>
                <button className="photo-arrow prev" onClick={() => slidePhoto('r1',-1)} disabled={swiperState.r1.current === 0}>‹</button>
                <button className="photo-arrow next" onClick={() => slidePhoto('r1',1)} disabled={swiperState.r1.current === swiperState.r1.total - 1}>›</button>
                <div className="photo-dots">
                  {[0,1].map(i => (
                    <div key={i} className={cn("photo-dot", swiperState.r1.current === i && "active")} onClick={() => goSlide('r1', i)}></div>
                  ))}
                </div>
                <div className="story-photo-num">{swiperState.r1.current + 1} / 2</div>
              </div>
              <div className="story-content">
                <span className="story-tag tag-real">🌑 Real story</span>
                <h3 className="story-title">The year I was fine. And wasn't.</h3>
                <p className={cn("story-body", !expandedStories['r1'] && "collapsed")}>
                  I told everyone I was fine for about eleven months. I smiled at 
                  the right times. I showed up. I performed fine so well that even 
                  I started to believe it. Then one night, alone in my room at 3am, 
                  I just stopped. And I cried in a way I hadn't since I was a child. 
                  Not about anything specific. Just about all of it at once. 
                  That was the first honest moment I'd had in almost a year. 
                  I don't think I've pretended since then — at least not with myself.
                </p>
                <button className="story-expand" onClick={() => toggleExpand('r1')}>
                  {expandedStories['r1'] ? 'Show less ↑' : 'Read more →'}
                </button>
              </div>
              <div className="story-footer">
                <div className="story-react">
                  <button className={cn("react-btn", likedStories['r1-1'] && "liked")} onClick={() => toggleReact('r1-1')}>
                    <span className="react-icon">♥</span>
                    <span>Felt this</span>
                  </button>
                  <button className={cn("react-btn", likedStories['r1-2'] && "liked")} onClick={() => toggleReact('r1-2')}>
                    <span className="react-icon">↩</span>
                    <span>Relate</span>
                  </button>
                </div>
                <span className="story-time">2 weeks ago</span>
              </div>
            </div>

            {/* Story Card 2 */}
            <div className="story-card">
              <div className="photo-swiper">
                <div 
                  className="photo-swiper-track" 
                  style={{ transform: `translateX(${-swiperState.r2.current * 100}%)` }}
                >
                  <div className="photo-slide">
                    <div className="ps-placeholder" style={{background:'#100d10'}}>
                      <span className="psp-emoji">🚂</span>
                      <span className="psp-lbl">Train ride home</span>
                    </div>
                  </div>
                </div>
                <div className="story-photo-num">1 / 1</div>
              </div>
              <div className="story-content">
                <span className="story-tag tag-real">🌑 Real story</span>
                <h3 className="story-title">I stayed in something I knew was wrong for eight months.</h3>
                <p className={cn("story-body", !expandedStories['r2'] && "collapsed")}>
                  Not because I didn't know. I knew almost immediately. I stayed 
                  because leaving felt like failure. Because I'd told people it was 
                  going well. Because I convinced myself that effort could substitute 
                  for fit. It can't. I'm still learning what it actually costs to 
                  stay somewhere you don't belong. Not in years — in who you become 
                  while you're there.
                </p>
                <button className="story-expand" onClick={() => toggleExpand('r2')}>
                  {expandedStories['r2'] ? 'Show less ↑' : 'Read more →'}
                </button>
              </div>
              <div className="story-footer">
                <div className="story-react">
                  <button className={cn("react-btn", likedStories['r2-1'] && "liked")} onClick={() => toggleReact('r2-1')}>
                    <span className="react-icon">♥</span>
                    <span>Felt this</span>
                  </button>
                  <button className={cn("react-btn", likedStories['r2-2'] && "liked")} onClick={() => toggleReact('r2-2')}>
                    <span className="react-icon">↩</span>
                    <span>Relate</span>
                  </button>
                </div>
                <span className="story-time">1 month ago</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── RARE PANEL ── */}
        <div className={cn("panel", currentTab === 'rare' && "active")}>
          <div className="panel-inner">

            {/* Story Card 1 */}
            <div className="story-card">
              <div className="photo-swiper">
                <div 
                  className="photo-swiper-track" 
                  style={{ transform: `translateX(${-swiperState.rare1.current * 100}%)` }}
                >
                  <div className="photo-slide">
                    <div className="ps-placeholder" style={{background:'#120e08'}}>
                      <span className="psp-emoji">🏔</span>
                      <span className="psp-lbl">Ladakh, solo</span>
                    </div>
                  </div>
                  <div className="photo-slide">
                    <div className="ps-placeholder" style={{background:'#120e08'}}>
                      <span className="psp-emoji">⛺</span>
                      <span className="psp-lbl">Night one</span>
                    </div>
                  </div>
                  <div className="photo-slide">
                    <div className="ps-placeholder" style={{background:'#120e08'}}>
                      <span className="psp-emoji">🌌</span>
                      <span className="psp-lbl">No phone, no signal</span>
                    </div>
                  </div>
                </div>
                <button className="photo-arrow prev" onClick={() => slidePhoto('rare1',-1)} disabled={swiperState.rare1.current === 0}>‹</button>
                <button className="photo-arrow next" onClick={() => slidePhoto('rare1',1)} disabled={swiperState.rare1.current === swiperState.rare1.total - 1}>›</button>
                <div className="photo-dots">
                  {[0,1,2].map(i => (
                    <div key={i} className={cn("photo-dot", swiperState.rare1.current === i && "active")} onClick={() => goSlide('rare1', i)}></div>
                  ))}
                </div>
                <div className="story-photo-num">{swiperState.rare1.current + 1} / 3</div>
              </div>
              <div className="story-content">
                <span className="story-tag tag-rare">✦ Rare moment</span>
                <h3 className="story-title">Eight days alone in Ladakh — no phone signal after day two.</h3>
                <p className={cn("story-body", !expandedStories['rare1'] && "collapsed")}>
                  I didn't plan to lose signal. I didn't plan much of it honestly. 
                  I just drove and stopped when something looked right. By day four 
                  I'd stopped reaching for my phone. By day six I realised I hadn't 
                  thought about what anyone thought of me in three days. That had 
                  never happened before. I came back different in a way I couldn't 
                  explain to anyone who asked. I still can't.
                </p>
                <button className="story-expand" onClick={() => toggleExpand('rare1')}>
                  {expandedStories['rare1'] ? 'Show less ↑' : 'Read more →'}
                </button>
              </div>
              <div className="story-footer">
                <div className="story-react">
                  <button className={cn("react-btn", likedStories['rare1-1'] && "liked")} onClick={() => toggleReact('rare1-1')}>
                    <span className="react-icon">♥</span>
                    <span>Felt this</span>
                  </button>
                  <button className={cn("react-btn", likedStories['rare1-2'] && "liked")} onClick={() => toggleReact('rare1-2')}>
                    <span className="react-icon">↩</span>
                    <span>Relate</span>
                  </button>
                </div>
                <span className="story-time">Last year</span>
              </div>
            </div>

            {/* Story Card 2 */}
            <div className="story-card">
              <div className="photo-swiper">
                <div 
                  className="photo-swiper-track" 
                  style={{ transform: `translateX(${-swiperState.rare2.current * 100}%)` }}
                >
                  <div className="photo-slide">
                    <div className="ps-placeholder" style={{background:'#0e100e'}}>
                      <span className="psp-emoji">🎹</span>
                      <span className="psp-lbl">That one stage</span>
                    </div>
                  </div>
                  <div className="photo-slide">
                    <div className="ps-placeholder" style={{background:'#0e100e'}}>
                      <span className="psp-emoji">🎵</span>
                      <span className="psp-lbl">My first original</span>
                    </div>
                  </div>
                </div>
                <button className="photo-arrow prev" onClick={() => slidePhoto('rare2',-1)} disabled={swiperState.rare2.current === 0}>‹</button>
                <button className="photo-arrow next" onClick={() => slidePhoto('rare2',1)} disabled={swiperState.rare2.current === swiperState.rare2.total - 1}>›</button>
                <div className="photo-dots">
                  {[0,1].map(i => (
                    <div key={i} className={cn("photo-dot", swiperState.rare2.current === i && "active")} onClick={() => goSlide('rare2', i)}></div>
                  ))}
                </div>
                <div className="story-photo-num">{swiperState.rare2.current + 1} / 2</div>
              </div>
              <div className="story-content">
                <span className="story-tag tag-rare">✦ Rare moment</span>
                <h3 className="story-title">The one time I performed my own song in front of strangers.</h3>
                <p className={cn("story-body", !expandedStories['rare2'] && "collapsed")}>
                  I wrote it during the bad year. I never intended to play it publicly — 
                  it was too honest. Then a friend signed me up for an open mic without 
                  telling me and I only found out the morning of. I almost didn't go. 
                  I went. I played. My hands shook so badly I played the wrong chord 
                  in the second verse. No one cared. Some people cried. 
                  A woman came up after and said "I needed that today." 
                  I've never played it again. That was enough.
                </p>
                <button className="story-expand" onClick={() => toggleExpand('rare2')}>
                  {expandedStories['rare2'] ? 'Show less ↑' : 'Read more →'}
                </button>
              </div>
              <div className="story-footer">
                <div className="story-react">
                  <button className={cn("react-btn", likedStories['rare2-1'] && "liked")} onClick={() => toggleReact('rare2-1')}>
                    <span className="react-icon">♥</span>
                    <span>Felt this</span>
                  </button>
                  <button className={cn("react-btn", likedStories['rare2-2'] && "liked")} onClick={() => toggleReact('rare2-2')}>
                    <span className="react-icon">↩</span>
                    <span>Relate</span>
                  </button>
                </div>
                <span className="story-time">2 years ago</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      <BottomNav active="discover" />

      {/* ══════════ MATCH OVERLAY ══════════ */}
      <div className={cn("match-overlay", showMatchOverlay && "show")}>
        <div className="match-glow"></div>
        <div className="match-avatars">
          <div className="match-av">🌿</div>
          <div className="match-av">🍂</div>
        </div>
        <h2 className="match-title">Sara felt something real.</h2>
        <p className="match-sub">
          Don't open with "hey".<br/>
          Start with a <em>layer.</em>
        </p>
        <button className="match-btn" onClick={() => setShowMatchOverlay(false)}>See what she shared →</button>
        <button className="match-dismiss" onClick={() => setShowMatchOverlay(false)}>Maybe later</button>
      </div>

    </div>
  );
}
