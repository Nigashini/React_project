import React, { useState, useEffect, useRef } from 'react';
import './index.css';

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="countdown-container fade-in delay-6">
      {Object.keys(timeLeft).map((interval) => (
        <div key={interval} className="countdown-item">
          <div className="countdown-number">{timeLeft[interval]}</div>
          <div className="countdown-label">{interval}</div>
        </div>
      ))}
    </div>
  );
};

const Lamp = ({ sideClass, scale, delay }) => {
  return (
    <div className={`hanging-lamp ${sideClass} fade-in`} style={{ animationDelay: delay }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
        <svg width="60" height="300" viewBox="0 0 60 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="30" y1="-50" x2="30" y2="200" stroke="#d4af37" strokeWidth="2" strokeDasharray="8 6" opacity="0.6" />
          <circle cx="30" cy="205" r="5" fill="#d4af37" />
          <path d="M15 210 L45 210 L50 230 L10 230 Z" fill="#d4af37" />
          <path d="M10 235 L50 235 L40 260 L20 260 Z" fill="#d4af37" />
          <circle cx="15" cy="265" r="3" fill="#d4af37" />
          <circle cx="30" cy="268" r="4" fill="#d4af37" />
          <circle cx="45" cy="265" r="3" fill="#d4af37" />
          <circle cx="30" cy="220" r="2" fill="#fff" opacity="0.8" />
          <circle cx="30" cy="220" r="18" fill="#d4af37" opacity="0.4" filter="blur(8px)" className="lamp-glow" />
        </svg>
      </div>
    </div>
  );
};

const LoadingScreen = ({ isLoaded }) => {
  return (
    <div className={`loading-wrapper ${isLoaded ? 'fade-out-loading' : ''}`}>
      <div className="loading-content">
        <div className="loading-initials">S <span className="loading-ampersand">&</span> K</div>
      </div>
    </div>
  );
};

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audio-player" onClick={togglePlay} title={isPlaying ? "Pause Music" : "Play Music"}>
      <audio ref={audioRef} loop src="/background-music.mp3" />
      <div className={`music-icon ${isPlaying ? 'playing' : ''}`}>
        {isPlaying ? '■' : '♪'}
      </div>
    </div>
  );
};

const ScrollReveal = ({ children, animation = 'reveal-slide-up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`reveal-container ${isVisible ? 'reveal-visible' : 'reveal-hidden'} ${animation}`}
    >
      {children}
    </div>
  );
};

function App() {
  const weddingDate = '2026-07-05T00:00:00';
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2500);
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <LoadingScreen isLoaded={isLoaded} />
      <AudioPlayer />
      <div className="app-container">
        <img
          src="/bride.png"
          alt="Bride decor"
          className={`floating-bride ${scrollY > 300 ? 'visible' : ''}`}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <img
          src="/groom.png"
          alt="Groom decor"
          className={`floating-groom ${scrollY > 300 ? 'visible' : ''}`}
          onError={(e) => { e.target.style.display = 'none'; }}
        />

        <header className="hero">
          <div className="parallax-layer" style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}>
            <Lamp sideClass="left-0" scale={1.1} delay="0s" />
            <Lamp sideClass="left-1" scale={0.85} delay="0.5s" />
            <Lamp sideClass="left-2" scale={0.65} delay="1s" />

            <Lamp sideClass="right-0" scale={1.1} delay="0.2s" />
            <Lamp sideClass="right-1" scale={0.85} delay="0.7s" />
            <Lamp sideClass="right-2" scale={0.65} delay="1.2s" />
          </div>

          <div className="hero-content" style={{
            transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15 + scrollY * 0.3}px)`,
            opacity: 1 - scrollY / 700
          }}>
            <div className="floating-ornament">✧</div>
            <p className="subtitle tracking-in-expand">Save The Date</p>

            <div className="names-wrapper">
              <h1 className="name-left slide-in-left">Santhosh Metha</h1>
              <span className="weds-text text-focus-in">weds</span>
              <h1 className="name-right slide-in-right">Keerthana</h1>
            </div>

            <div className="divider fade-in delay-3"></div>

            <p className="date fade-in delay-4">July 05 <span className="dot">•</span> 2026</p>
            <p className="location-hint fade-in delay-5">Thiruthuraipoondi</p>

            <Countdown targetDate={weddingDate} />
          </div>
        </header>

        <ScrollReveal>
          <section className="meet-couple delay-7">
            <h2 className="section-title">The Bride & Groom</h2>
            <div className="couple-profiles">
              <div className="profile-card">
                <div className="profile-image-container">
                  <img src="/groom.jpg" alt="Santhosh Metha" onError={(e) => { e.target.src = 'https://via.placeholder.com/220x280/0d291d/D4AF37?text=Groom' }} />
                </div>
                <h3 className="profile-name">Santhosh</h3>
                <p className="profile-role">The Groom</p>
              </div>

              <div className="profile-card">
                <div className="profile-image-container">
                  <img src="/bride.jpg" alt="Keerthana" onError={(e) => { e.target.src = 'https://via.placeholder.com/220x280/0d291d/D4AF37?text=Bride' }} />
                </div>
                <h3 className="profile-name">Keerthana</h3>
                <p className="profile-role">The Bride</p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal animation="reveal-slide-up">
          <section className="events-section">
            <h2 className="section-title">Wedding Events</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content glass-card">
                  <h3>Reception</h3>
                  <p className="time">July 4, 2026 • 7:00 PM Onwards</p>
                  <p>Join us for an evening of music, dance, and joyous celebration ahead of our big day.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content glass-card">
                  <h3>Muhurtham</h3>
                  <p className="time">July 5, 2026 • 9:00 AM - 10:30 AM</p>
                  <p>The sacred wedding ceremony and tying of the knot. Please bless us with your presence.</p>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal animation="reveal-zoom-in">
          <section className="gallery-section">
            <h2 className="section-title">Moments of Joy</h2>
            <div className="gallery-grid">
              <div className="gallery-img-container span-col-2 span-row-2">
                <img src="/moment-1.png" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?auto=format&fit=crop&w=800&q=80' }} />
                <div className="overlay-text"></div>
              </div>
              <div className="gallery-img-container">
                <img src="/moment-2.png"onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1607065096536-ea339244ee31?auto=format&fit=crop&w=800&q=80' }} />
                <div className="overlay-text"></div>
              </div>
              <div className="gallery-img-container span-row-2">
                <img src="/moment-3.png" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1558237976-1b4e2ebbf857?auto=format&fit=crop&w=800&q=80' }} />
                <div className="overlay-text"></div>
              </div>
              <div className="gallery-img-container">
                <img src="/moment-4.png" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80' }} />
                <div className="overlay-text"></div>
              </div>
              <div className="gallery-img-container span-col-2">
                <img src="/moment-5.png"onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80' }} />
                <div className="overlay-text"></div>
              </div>
              <div className="gallery-img-container span-col-2">
                <img src="/moment-6.png" alt="Our Journey" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80' }} />
                <div className="overlay-text"></div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal animation="reveal-slide-up">
          <section className="venue-details">
            <div className="invitation-card-wrapper">
              <div className="invitation-card">
                {/* Complex SVG Ornaments */}
                <div className="svg-ornament top-left">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                    <path d="M0 0 L40 0 Q20 20 0 40 Z" fill="var(--color-gold)" opacity="0.15" />
                    <path d="M10 0 Q10 10 0 10" stroke="var(--color-gold)" strokeWidth="0.8" />
                    <path d="M0 20 Q20 20 20 0" stroke="var(--color-gold)" strokeWidth="0.8" />
                    <path d="M30 0 Q30 30 0 30" stroke="var(--color-gold)" strokeWidth="0.4" />
                    <circle cx="4" cy="4" r="1.5" fill="var(--color-gold)" />
                  </svg>
                </div>
                <div className="svg-ornament top-right">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" style={{ transform: 'rotate(90deg)' }}>
                    <path d="M0 0 L40 0 Q20 20 0 40 Z" fill="var(--color-gold)" opacity="0.15" />
                    <path d="M10 0 Q10 10 0 10" stroke="var(--color-gold)" strokeWidth="0.8" />
                    <path d="M0 20 Q20 20 20 0" stroke="var(--color-gold)" strokeWidth="0.8" />
                    <circle cx="4" cy="4" r="1.5" fill="var(--color-gold)" />
                  </svg>
                </div>
                <div className="svg-ornament bottom-left">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" style={{ transform: 'rotate(-90deg)' }}>
                    <path d="M0 0 L40 0 Q20 20 0 40 Z" fill="var(--color-gold)" opacity="0.15" />
                    <path d="M10 0 Q10 10 0 10" stroke="var(--color-gold)" strokeWidth="0.8" />
                    <path d="M0 20 Q20 20 20 0" stroke="var(--color-gold)" strokeWidth="0.8" />
                    <circle cx="4" cy="4" r="1.5" fill="var(--color-gold)" />
                  </svg>
                </div>
                <div className="svg-ornament bottom-right">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" style={{ transform: 'rotate(180deg)' }}>
                    <path d="M0 0 L40 0 Q20 20 0 40 Z" fill="var(--color-gold)" opacity="0.15" />
                    <path d="M10 0 Q10 10 0 10" stroke="var(--color-gold)" strokeWidth="0.8" />
                    <path d="M0 20 Q20 20 20 0" stroke="var(--color-gold)" strokeWidth="0.8" />
                    <circle cx="4" cy="4" r="1.5" fill="var(--color-gold)" />
                  </svg>
                </div>

                <div className="monogram-bg">S & K</div>

                <div className="invitation-content">
                  <div className="card-header-flourish gold-shimmer">✧ ❂ ✧</div>
                  <h2 className="card-subtitle">The Wedding Venue</h2>
                  <h1 className="venue-title-script gold-foil-text">Vijila Mahal</h1>

                  <div className="card-divider-ornamental">
                    <span className="line"></span>
                    <span className="dot"></span>
                    <span className="line"></span>
                  </div>

                  <div className="venue-info">
                    <p className="venue-address-premium">
                      Thiruthuraipoondi<br />
                      <span>Tiruvarur District, Tamil Nadu</span>
                    </p>
                  </div>

                  <div className="card-footer-flourish">
                    <svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 20 Q45 0 90 20 Q135 40 170 20" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" />
                      <defs>
                        <linearGradient id="goldGradient" x1="0" y1="0" x2="180" y2="0" gradientUnits="userSpaceOnUse">
                          <stop offset="0" stopColor="#d4af37" />
                          <stop offset="0.5" stopColor="#f3e5ab" />
                          <stop offset="1" stopColor="#d4af37" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <a href="https://maps.google.com/?q=Vijila+Mahal,Thiruthuraipoondi" target="_blank" rel="noopener noreferrer">
                    <button className="premium-directions-btn">
                      <span className="btn-icon">📍</span> Get Directions
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>


        <ScrollReveal animation="reveal-zoom-in">
          <section className="final-invitation">
            <div className="final-content">
              <img src="/closing-couple.png" alt="Santhosh & Keerthana" className="final-couple-img" />
              <div className="invitation-text-wrapper">
                <h2 className="final-message-title">We invite you all!</h2>
                <p className="final-message-text">
                  Your presence and blessings will make our special day truly unforgettable.<br />
                  Please join us as we embark on our beautiful new journey together.
                </p>
                <div className="final-heart">❤</div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <footer className="footer">
          <p>With joyous hearts, we invite you to share in our happiness.</p>
          <p className="signature">S & K</p>
        </footer>
      </div>
    </>
  );
}

export default App;
