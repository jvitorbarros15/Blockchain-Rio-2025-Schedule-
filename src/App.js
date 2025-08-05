import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Calendar, Clock, ChevronLeft, ChevronRight, Play, Info, Zap, Bitcoin, Coins, Database } from 'lucide-react';
import TimelineGrid from './components/TimelineGrid';
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

  useEffect(() => {
    // Generate initial event data
    setEventData(generateEventData());

    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <AppContainer>
      <Header>
        <HeaderContent>
          <Logo>
            <Zap size={24} />
            Blockchain RIO 2025
          </Logo>
          <TechStats>
            <StatItem>
              <Bitcoin size={16} />
              <span>6 de Agosto</span>
            </StatItem>
            <StatItem>
              <Coins size={16} />
              <span>8 Stages</span>
            </StatItem>
            <StatItem>
              <Database size={16} />
              <span>{eventData.length} Eventos</span>
            </StatItem>
          </TechStats>
        </HeaderContent>
      </Header>
      
      <MainContent>
        <TimelineGrid 
          eventData={eventData} 
          currentTime={currentTime}
        />
      </MainContent>
    </AppContainer>
  );
};

export default App; 