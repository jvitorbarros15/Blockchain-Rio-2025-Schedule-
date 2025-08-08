import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Calendar, Clock, ChevronLeft, ChevronRight, Play, Info, Zap, Bitcoin, Coins, Database } from 'lucide-react';
import TimelineGrid from './components/TimelineGrid';
import LoginModal from './components/LoginModal';
import OrganizerDashboard from './components/OrganizerDashboard';
import { generateEventData } from './utils/eventData';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  color: #ffffff;
  overflow-x: auto;
  overflow-y: auto;
`;

const Header = styled.header`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #333;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #00ff88;
  
  svg {
    color: #00ff88;
  }
`;

const TechStats = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const ProductionButton = styled.button`
  background: rgba(255, 0, 102, 0.2);
  color: #ff0066;
  border: 1px solid #ff0066;
  border-radius: 20px;
  padding: 8px 16px;
  font-weight: bold;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  box-shadow: 0 0 20px rgba(255, 0, 102, 0.3);
  
  &:hover {
    background: rgba(255, 0, 102, 0.3);
    color: #ff0066;
    border-color: #ff0066;
    box-shadow: 0 0 30px rgba(255, 0, 102, 0.5);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 0 15px rgba(255, 0, 102, 0.6);
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #888;
  
  svg {
    width: 16px;
    height: 16px;
    color: #00ff88;
  }
`;

const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [eventData, setEventData] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('timeline'); // 'timeline' or 'organizer'

  useEffect(() => {
    // Generate initial event data
    setEventData(generateEventData());

    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('organizer');
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('timeline');
  };

  const handleProductionClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleUpdateEvent = (updatedEvents) => {
    setEventData(updatedEvents);
  };

  // Show organizer dashboard if user is logged in
  if (currentView === 'organizer' && user) {
    return (
      <OrganizerDashboard 
        user={user}
        onLogout={handleLogout}
        eventData={eventData}
        onUpdateEvent={handleUpdateEvent}
      />
    );
  }

  return (
    <AppContainer>
      <Header>
        <HeaderContent>
          <Logo>
            <Zap size={24} />
            Blockchain RIO 2025
          </Logo>
          <RightSection>
            <TechStats>
              <StatItem>
                <Bitcoin size={16} />
                <span>6 e 7 de Agosto</span>
              </StatItem>
              <StatItem>
                <Coins size={16} />
                <span>14 Stages</span>
              </StatItem>
              <StatItem>
                <Database size={16} />
                <span>+ {eventData.length} Eventos</span>
              </StatItem>
            </TechStats>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ProductionButton onClick={handleProductionClick}>
                Produção?
              </ProductionButton>
              <span style={{ 
                fontSize: '0.75rem', 
                color: '#666', 
                fontStyle: 'italic' 
              }}>
                (Para Testes, login: organizer senha: blockchain2025)
              </span>
            </div>
          </RightSection>
        </HeaderContent>
      </Header>
      
      <MainContent>
        <TimelineGrid 
          eventData={eventData} 
          currentTime={currentTime}
        />
      </MainContent>

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </AppContainer>
  );
};

export default App; 