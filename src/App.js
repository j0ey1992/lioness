import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import GameSection from './components/GameSection';
import lionessImage from './LIONESS.png';

// Global Styles
const GlobalStyle = createGlobalStyle`
  /* CSS Variables from Chakra UI */
  :root {
    --primary-pink: #ff1493;
    --secondary-pink: #ff69b4;
    --accent-pink: #ffc0cb;
    --text-light: #e2e2e2;
    --text-white: #ffffff;
    --background-dark: #0d0d0d;
    --background-darker: #000000;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    background: linear-gradient(135deg, #000000 0%, #1a0033 50%, #000000 100%);
    color: var(--text-light);
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }

  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(255, 20, 147, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(255, 105, 180, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(255, 192, 203, 0.05) 0%, transparent 70%);
    pointer-events: none;
    z-index: -1;
  }
`;

// Styled Components
const SideNav = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 60px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SideNavContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const SideNavText = styled.div`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  color: var(--primary-pink);
`;

const CookieBanner = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  z-index: 1001;
  display: ${props => props.$show ? 'flex' : 'none'};
  align-items: flex-start;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
  opacity: ${props => props.$show ? 1 : 0};
  transform: translateY(${props => props.$show ? '0' : '100%'});
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const CookieContent = styled.div`
  flex: 1;

  p {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 15px;
    color: var(--text-light);
  }
`;

const CookieButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const CookieBtn = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: ${props => props.primary ? 'none' : '1px solid rgba(255, 255, 255, 0.2)'};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.primary ? 'var(--primary-pink)' : 'transparent'};
  color: ${props => props.primary ? 'white' : 'var(--text-light)'};

  &:hover {
    background: ${props => props.primary ? 'var(--secondary-pink)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const CookieClose = styled.button`
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 60px;
  right: 0;
  height: 80px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 999;

  @media (max-width: 768px) {
    left: 0;
    height: 70px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 40px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0 20px;
    height: 70px;
  }

  @media (max-width: 1024px) {
    padding: 0 20px;
  }
`;

const MobileHeaderLeft = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 15px;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-white);
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
  z-index: 998;
  transform: translateY(${props => props.open ? '0' : '-100%'});
  opacity: ${props => props.open ? 1 : 0};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const MobileSocialIcons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
`;

const Logo = styled.div`
  svg {
    color: var(--text-white);
  }

  @media (max-width: 768px) {
    display: none !important;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 40px;

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 1024px) {
    gap: 20px;
  }
`;

const NavLink = styled.a`
  color: var(--text-light);
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 1px;
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: var(--primary-pink);
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    order: 2;
    gap: 15px;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 1024px) {
    gap: 10px;
  }
`;

const SocialIcon = styled.a`
  color: var(--text-light);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: var(--primary-purple);
    transform: scale(1.2);
  }
`;

const PlayBtn = styled.button`
  background: linear-gradient(135deg, var(--primary-purple) 0%, var(--secondary-purple) 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(137, 39, 255, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Main = styled.main`
  margin-left: 60px;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const FullPageHero = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #000000 0%, #1a0033 30%, #2d1b69 60%, #000000 100%);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 25% 25%, rgba(138, 43, 226, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(255, 20, 147, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
    pointer-events: none;
    animation: backgroundShift 10s ease-in-out infinite;
  }
  
  @keyframes backgroundShift {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
`;

const HeroContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
  padding: 0 80px;
  position: relative;
  z-index: 2;
  gap: 100px;
  opacity: ${props => props.loaded ? 1 : 0};
  transform: translateY(${props => props.loaded ? '0' : '50px'});
  transition: all 1.2s ease;

  @media (max-width: 1200px) {
    flex-direction: column;
    justify-content: center;
    gap: 60px;
    padding: 0 40px;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    gap: 40px;
  }
`;

const HugeImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1000;
  
  &::before {
    content: '';
    position: absolute;
    top: -40px;
    left: -40px;
    right: -40px;
    bottom: -40px;
    background: radial-gradient(circle, rgba(255, 20, 147, 0.4) 0%, rgba(138, 43, 226, 0.3) 30%, transparent 70%);
    border-radius: 50%;
    animation: megaPulse 4s ease-in-out infinite;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -60px;
    left: -60px;
    right: -60px;
    bottom: -60px;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, rgba(255, 105, 180, 0.2) 50%, transparent 80%);
    border-radius: 50%;
    animation: megaPulse 6s ease-in-out infinite reverse;
    z-index: -2;
  }

  @keyframes megaPulse {
    0%, 100% { 
      transform: scale(1);
      opacity: 0.6;
    }
    50% { 
      transform: scale(1.15);
      opacity: 1;
    }
  }
`;

const LionessImage = styled.img`
  width: 500px;
  height: 500px;
  max-width: 90vw;
  max-height: 90vw;
  border-radius: 50%;
  border: 6px solid transparent;
  background: linear-gradient(45deg, #FFD700, #FF1493, #8A2BE2) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: exclude;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  box-shadow: 
    0 0 50px rgba(255, 20, 147, 0.7),
    0 0 100px rgba(255, 20, 147, 0.5),
    0 0 150px rgba(255, 20, 147, 0.3),
    0 0 200px rgba(138, 43, 226, 0.2);
  transition: all 0.4s ease;
  filter: brightness(1.1) contrast(1.1);
  position: relative;
  z-index: 9999;

  &:hover {
    transform: scale(1.05);
    box-shadow: 
      0 0 60px rgba(255, 20, 147, 0.9),
      0 0 120px rgba(255, 20, 147, 0.7),
      0 0 180px rgba(255, 20, 147, 0.5),
      0 0 240px rgba(138, 43, 226, 0.3);
  }

  @media (max-width: 1200px) {
    width: 400px;
    height: 400px;
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }

  @media (max-width: 480px) {
    width: 250px;
    height: 250px;
  }
`;

const TextSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  
  @media (max-width: 1200px) {
    align-items: center;
    text-align: center;
  }
`;

const Number212 = styled.div`
  font-size: 180px;
  font-weight: 900;
  line-height: 0.8;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 20%, #FF6347 40%, #FF1493 60%, #8A2BE2 80%, #4B0082 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  font-family: "proxima-nova", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  text-shadow: 0 0 80px rgba(255, 215, 0, 0.3);
  filter: drop-shadow(0 0 20px rgba(255, 20, 147, 0.5));
  animation: shimmer 3s ease-in-out infinite;

  @keyframes shimmer {
    0%, 100% { 
      filter: drop-shadow(0 0 20px rgba(255, 20, 147, 0.5)) brightness(1);
    }
    50% { 
      filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.7)) brightness(1.2);
    }
  }

  @media (max-width: 1200px) {
    font-size: 140px;
  }

  @media (max-width: 768px) {
    font-size: 100px;
  }

  @media (max-width: 480px) {
    font-size: 80px;
  }
`;

const LionessTokenText = styled.h1`
  font-size: 64px;
  font-weight: 900;
  color: #FFFFFF;
  letter-spacing: 0.1em;
  margin-bottom: 30px;
  text-transform: uppercase;
  font-family: "proxima-nova", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  text-shadow: 0 0 30px rgba(255, 20, 147, 0.8);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #FFD700, #FF1493, #8A2BE2);
    border-radius: 2px;
  }

  @media (max-width: 1200px) {
    font-size: 48px;
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const SubtitleText = styled.p`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  max-width: 500px;
  font-family: "proxima-nova", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 18px;
    max-width: 400px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const EventTitle = styled.div`
  margin-bottom: 80px;
  opacity: ${props => props.visible ? 1 : 0};
  transform: translateY(${props => props.visible ? '0' : '30px'});
  transition: opacity 0.6s ease, transform 0.6s ease;

  h1 {
    font-size: 64px;
    font-weight: 900;
    color: var(--text-white);
    letter-spacing: 4px;
    margin-bottom: 20px;
    line-height: 1;

    @media (max-width: 1024px) {
      font-size: 48px;
    }

    @media (max-width: 768px) {
      font-size: 32px;
    }

    @media (max-width: 480px) {
      font-size: 28px;
    }
  }
`;

const Blitz = styled.span`
  background: linear-gradient(135deg, var(--primary-purple) 0%, var(--accent-orange) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const EventDates = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: var(--text-light);
  letter-spacing: 2px;
`;

const PrizeSection = styled.div`
  margin-bottom: 80px;
  opacity: ${props => props.visible ? 1 : 0};
  transform: translateY(${props => props.visible ? '0' : '30px'});
  transition: opacity 0.6s ease, transform 0.6s ease;
`;

const PrizeAmount = styled.div`
  font-size: 96px;
  font-weight: 900;
  background: linear-gradient(135deg, var(--accent-orange) 0%, #ffd700 50%, var(--accent-orange) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 2px;
  margin-bottom: 15px;
  line-height: 1;

  @media (max-width: 1024px) {
    font-size: 64px;
  }

  @media (max-width: 768px) {
    font-size: 48px;
  }

  @media (max-width: 480px) {
    font-size: 36px;
  }
`;

const PrizeSubtitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-light);
  letter-spacing: 2px;
`;

const CTASection = styled.div`
  margin-bottom: 60px;
  opacity: ${props => props.visible ? 1 : 0};
  transform: translateY(${props => props.visible ? '0' : '30px'});
  transition: opacity 0.6s ease, transform 0.6s ease;
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, var(--primary-purple) 0%, var(--secondary-purple) 100%);
  color: white;
  border: none;
  padding: 20px 50px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(137, 39, 255, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(137, 39, 255, 0.5);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    padding: 15px 30px;
    font-size: 14px;
  }
`;

const NavDots = styled.div`
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 100;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? 'var(--primary-purple)' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: all 0.2s ease;
  transform: scale(${props => props.active ? 1.5 : 1});

  &:hover {
    background: var(--primary-purple);
    transform: scale(1.2);
  }
`;


// React Component
function App() {
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [activeDot, setActiveDot] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    logo: false,
    event: false,
    prize: false,
    cta: false,
    game: false
  });
  const [playButtonLoading, setPlayButtonLoading] = useState(false);
  const [headerPlayButtonLoading, setHeaderPlayButtonLoading] = useState(false);

  const observerRef = useRef();

  useEffect(() => {
    // Check if user has already made a cookie choice
    const cookiePreference = localStorage.getItem('cookiePreference');
    if (cookiePreference) {
      setShowCookieBanner(false);
    }

    // Set loaded state after component mounts
    setTimeout(() => setLoaded(true), 300);

    // Intersection Observer for animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('data-section');
            setVisibleSections(prev => ({
              ...prev,
              [sectionName]: true
            }));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe sections
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const hideCookieBanner = () => {
    setShowCookieBanner(false);
  };

  const handleCookieChoice = (choice) => {
    localStorage.setItem('cookiePreference', choice);
    if (choice !== 'customize') {
      hideCookieBanner();
    }
  };

  const handleDotClick = (index) => {
    setActiveDot(index);
    console.log(`Navigating to section ${index + 1}`);
  };

  const handlePlayButtonClick = (isHeader = false) => {
    const setLoading = isHeader ? setHeaderPlayButtonLoading : setPlayButtonLoading;
    
    setLoading(true);
    console.log('Redirecting to game...');
    
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleNavClick = (section) => {
    if (section === 'LEARN MORE') {
      const infoSection = document.getElementById('info-section');
      if (infoSection) {
        infoSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (section === 'HOME') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    console.log(`Navigating to: ${section}`);
  };

  const handleSocialClick = (platform) => {
    console.log(`Opening ${platform} link...`);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <GlobalStyle />
      
      {/* Side Navigation */}
      <SideNav>
        <SideNavContent>
          <SideNavText>LIONESS</SideNavText>
          <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
        </SideNavContent>
      </SideNav>

      {/* Cookie Banner */}
      <CookieBanner $show={showCookieBanner}>
        <CookieContent>
          <p>We use cookies on our website to operate our site, enhance your experience, analyze traffic and conduct analytics and advertising. For more information or to customize your preferences, tap "Customize Settings".</p>
          <CookieButtons>
            <CookieBtn onClick={() => handleCookieChoice('customize')}>Customize Settings</CookieBtn>
            <CookieBtn onClick={() => handleCookieChoice('disabled')}>Disable All</CookieBtn>
            <CookieBtn primary onClick={() => handleCookieChoice('accepted')}>Accept All</CookieBtn>
          </CookieButtons>
        </CookieContent>
        <CookieClose onClick={hideCookieBanner}>×</CookieClose>
      </CookieBanner>

      {/* Header */}
      <Header>
        <HeaderContent>
          {/* Mobile Header Left */}
          <MobileHeaderLeft>
            <HamburgerButton onClick={toggleMobileMenu} aria-label="open nav menu">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <line x1="5.5" y1="6.5" x2="26.5" y2="6.5" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <line x1="5.5" y1="15.5" x2="26.5" y2="15.5" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <line x1="5.5" y1="24.5" x2="26.5" y2="24.5" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </HamburgerButton>
            <Logo>
              <img 
                src="/cto-removebg-preview.png" 
                alt="Lioness CTO Logo" 
                style={{
                  width: '40px',
                  height: '40px',
                  objectFit: 'contain'
                }}
              />
            </Logo>
          </MobileHeaderLeft>

          {/* Desktop Logo */}
          <Logo style={{ display: 'block' }}>
            <img 
              src="/cto-removebg-preview.png" 
              alt="Lioness CTO Logo" 
              style={{
                width: '50px',
                height: '50px',
                objectFit: 'contain'
              }}
            />
          </Logo>
          
          {/* Desktop Navigation */}
          <Nav>
            <NavLink onClick={() => handleNavClick('HOME')}>HOME</NavLink>
            <NavLink onClick={() => handleNavClick('LEARN MORE')}>LEARN MORE</NavLink>
          </Nav>

          {/* Header Right */}
          <HeaderRight>
            <SocialIcons>
              <SocialIcon href="https://x.com/lionesscro?s=21" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </SocialIcon>
            </SocialIcons>
          </HeaderRight>
        </HeaderContent>
      </Header>

      {/* Mobile Menu */}
      <MobileMenu open={mobileMenuOpen}>
        <MobileNavLinks>
          <NavLink onClick={() => { handleNavClick('HOME'); setMobileMenuOpen(false); }}>HOME</NavLink>
          <NavLink onClick={() => { handleNavClick('LEARN MORE'); setMobileMenuOpen(false); }}>LEARN MORE</NavLink>
        </MobileNavLinks>
        
        <MobileSocialIcons>
          <SocialIcon href="https://x.com/lionesscro?s=21" target="_blank" rel="noopener noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </SocialIcon>
        </MobileSocialIcons>
      </MobileMenu>

      {/* Main Content */}
      <Main>
        {/* Simple Working Hero */}
        <div style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #000000 0%, #1a0033 30%, #2d1b69 60%, #000000 100%)',
          padding: '0 20px',
          gap: '60px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1400px',
            width: '100%',
            flexDirection: 'column',
            gap: '40px'
          }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <img 
                src={lionessImage} 
                alt="Lioness Token" 
                style={{
                  width: '300px',
                  height: '300px',
                  borderRadius: '50%',
                  border: '4px solid #ff1493',
                  boxShadow: '0 0 50px rgba(255, 20, 147, 0.7)',
                  maxWidth: '80vw',
                  maxHeight: '80vw'
                }}
              />
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(60px, 15vw, 120px)',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #FFD700 0%, #FF1493 50%, #8A2BE2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: '0.8',
                marginBottom: '20px'
              }}>
                #212
              </div>
              <h1 style={{
                fontSize: 'clamp(28px, 8vw, 48px)',
                fontWeight: '900',
                color: '#ffffff',
                marginBottom: '20px',
                textTransform: 'uppercase'
              }}>
                Lioness Token
              </h1>
              <p style={{
                fontSize: 'clamp(16px, 4vw, 18px)',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '30px',
                maxWidth: '500px',
                margin: '0 auto 30px'
              }}>
                Just a meme coin returning as a Community Take Over. 
                The pride lives on.
              </p>
              <a href="https://vvs.finance/swap?outputCurrency=0x335Ac13e6399d55F3f26698884D2AD9E74cB2201" target="_blank" rel="noopener noreferrer" style={{
                background: 'linear-gradient(135deg, #8927ff 0%, #ff1493 100%)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '8px',
                fontSize: 'clamp(12px, 3vw, 14px)',
                fontWeight: '700',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'transform 0.2s ease',
                minWidth: '120px',
                textAlign: 'center'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                BUY LIONESS
              </a>
            </div>
          </div>
        </div>

        {/* Additional Content with proper layout */}
        <div id="info-section" style={{ background: 'var(--background-dark)', padding: '80px 0' }}>
          {/* CTO Title Section */}
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px', padding: '0 20px' }}>
            <div style={{
              marginBottom: '0px',
              opacity: 1,
              transform: 'translateY(0px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease'
            }}>
              <h1 style={{
                fontSize: '64px',
                fontWeight: '900',
                color: 'var(--text-white)',
                letterSpacing: '4px',
                marginBottom: '20px',
                lineHeight: '1'
              }}>
                LIONESS IS BACK AS A <span style={{
                  background: 'linear-gradient(135deg, #8927ff 0%, #ea9459 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>CTO</span>
              </h1>
              <div style={{
                fontSize: '18px',
                fontWeight: '500',
                color: 'var(--text-light)',
                letterSpacing: '2px'
              }}>
                COMMUNITY TAKEOVER
              </div>
            </div>
          </div>

          {/* Game Section */}
          <div style={{ marginBottom: '40px' }}>
            <GameSection visible={visibleSections.game} />
          </div>
          
          {/* Contract Address */}
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
            <div style={{
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '14px',
              wordBreak: 'break-all'
            }}>
              <div style={{ marginBottom: '10px', color: 'var(--text-light)' }}>
                <strong>Contract Address:</strong>
              </div>
              <div style={{ color: 'var(--primary-pink)' }}>
                0x335Ac13e6399d55F3f26698884D2AD9E74cB2201
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <NavDots>
          {[...Array(5)].map((_, index) => (
            <Dot
              key={index}
              active={activeDot === index}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </NavDots>
      </Main>
    </>
  );
}

export default App;
