import React from 'react';
import styled from 'styled-components';

// Styled Components for GameSection
const GameSectionContainer = styled.section`
  padding: 100px 0;
  max-width: 1200px;
  margin: 0 auto;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? '0' : '50px'});
  transition: opacity 0.8s ease, transform 0.8s ease;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const GameContent = styled.div`
  text-align: center;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const GameLogoContainer = styled.div`
  margin-bottom: 40px;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? '0' : '30px'});
  transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
`;

const GameLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  svg {
    max-width: 100%;
    height: auto;
    
    @media (max-width: 768px) {
      width: 280px;
    }
    
    @media (max-width: 480px) {
      width: 240px;
    }
  }
`;

const GameTagline = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 40px;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? '0' : '30px'});
  transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const GameDescription = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-light);
  max-width: 800px;
  margin: 0 auto;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? '0' : '30px'});
  transition: opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s;

  .loaded-lions {
    color: var(--primary-pink);
    font-weight: 700;
  }

  a {
    color: var(--primary-pink);
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;

    &:hover {
      color: var(--secondary-pink);
    }
  }

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.7;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const GameSection = ({ visible }) => {
  return (
    <GameSectionContainer data-section="game" $visible={visible}>
      <GameContent>
        <GameLogoContainer $visible={visible}>
          <GameLogo>
            <svg width="320" height="120" viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8927ff"/>
                  <stop offset="50%" stopColor="#ea9459"/>
                  <stop offset="100%" stopColor="#8927ff"/>
                </linearGradient>
              </defs>
              <text x="160" y="60" textAnchor="middle" fontSize="32" fontWeight="900" fill="url(#logoGradient)" letterSpacing="3px">
                LIONESS
              </text>
              <circle cx="50" cy="60" r="25" fill="none" stroke="url(#logoGradient)" strokeWidth="3"/>
              <circle cx="270" cy="60" r="25" fill="none" stroke="url(#logoGradient)" strokeWidth="3"/>
              <path d="M40 55 L60 55 M45 50 L55 50 M45 65 L55 65" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round"/>
              <path d="M260 55 L280 55 M265 50 L275 50 M265 65 L275 65" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </GameLogo>
        </GameLogoContainer>

        <GameTagline $visible={visible}>
          Rise from the ashes, stronger than ever
        </GameTagline>

        <GameDescription $visible={visible}>
          <span className="loaded-lions">Lioness</span> was once a promising token that captivated the crypto community with its fierce spirit and bold vision. 
          But like many in the wild west of DeFi, it fell victim to a devastating rug pull that left holders heartbroken and wallets empty. 
          
          <br/><br/>

          Yet from the darkness came light. The community refused to let the lioness die. 
          United by shared loss and unwavering belief, they orchestrated something unprecedented - a complete community takeover. 
          No original developers. No corporate backing. Just pure, grassroots determination.

          <br/><br/>

          Today, <span className="loaded-lions">Lioness #212</span> roars louder than ever before. 
          This isn't just about reclaiming what was lost - it's about proving that true power lies in community, 
          resilience, and the unbreakable spirit of those who refuse to give up.

          <br/><br/>

          <strong style={{color: 'var(--primary-pink)', fontSize: '18px'}}>
            Fortune favours the brave. The lioness has returned to reclaim her throne.
          </strong>
        </GameDescription>
      </GameContent>
    </GameSectionContainer>
  );
};

export default GameSection;
