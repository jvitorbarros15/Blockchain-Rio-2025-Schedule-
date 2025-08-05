import React from 'react';
import styled from 'styled-components';
import { Play, Info, ExternalLink } from 'lucide-react';

const EventBlockContainer = styled.div`
  background: ${props => props.isLive ? 
    'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 204, 106, 0.05) 100%)' : 
    'linear-gradient(135deg, rgba(40, 40, 40, 0.8) 0%, rgba(20, 20, 20, 0.9) 100%)'
  };
  border: 1px solid ${props => props.isLive ? '#00ff88' : '#333'};
  border-radius: 8px;
  padding: 0.75rem;
  margin: 2px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 150px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.isLive ? 
      'linear-gradient(90deg, #00ff88, #00cc6a)' : 
      'linear-gradient(90deg, #666, #444)'
    };
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 255, 136, 0.2);
    border-color: #00ff88;
  }
`;

const EventTitle = styled.div`
  font-weight: bold;
  color: #fff;
  font-size: 0.8rem;
  line-height: 1.2;
  margin-bottom: 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

const EventTime = styled.div`
  font-size: 0.6rem;
  color: #888;
  margin-bottom: 0.2rem;
`;

const EventStage = styled.div`
  font-size: 0.5rem;
  color: #00ff88;
  font-weight: 500;
  margin-bottom: 0.3rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const EventType = styled.div`
  display: inline-block;
  background: ${props => {
    switch(props.type) {
      case 'conference': return 'rgba(0, 255, 136, 0.2)';
      case 'workshop': return 'rgba(255, 107, 107, 0.2)';
      case 'hackathon': return 'rgba(255, 230, 109, 0.2)';
      case 'meetup': return 'rgba(78, 205, 196, 0.2)';
      default: return 'rgba(102, 102, 102, 0.2)';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'conference': return '#00ff88';
      case 'workshop': return '#ff6b6b';
      case 'hackathon': return '#ffe66d';
      case 'meetup': return '#4ecdc4';
      default: return '#888';
    }
  }};
  border: 1px solid ${props => {
    switch(props.type) {
      case 'conference': return '#00ff88';
      case 'workshop': return '#ff6b6b';
      case 'hackathon': return '#ffe66d';
      case 'meetup': return '#4ecdc4';
      default: return '#666';
    }
  }};
  border-radius: 8px;
  padding: 0.05rem 0.3rem;
  font-size: 0.5rem;
  font-weight: 500;
  margin-bottom: 0.3rem;
  align-self: flex-start;
`;

const EventActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  gap: 0.2rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #00ff88;
  cursor: pointer;
  padding: 0.15rem;
  border-radius: 3px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 255, 136, 0.2);
    transform: scale(1.1);
  }
  
  svg {
    width: 12px;
    height: 12px;
  }
`;

const LiveIndicator = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 8px;
  height: 8px;
  background: #00ff88;
  border-radius: 50%;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(0, 255, 136, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(0, 255, 136, 0);
    }
  }
`;

const EventBlock = ({ event, isLive = false }) => {
  const handlePlay = (e) => {
    e.stopPropagation();
    console.log('Play event:', event.title);
  };

  const handleInfo = (e) => {
    e.stopPropagation();
    console.log('Show info for:', event.title);
  };

  const handleExternal = (e) => {
    e.stopPropagation();
    if (event.externalLink) {
      window.open(event.externalLink, '_blank');
    }
  };

  return (
    <EventBlockContainer isLive={isLive}>
      {isLive && <LiveIndicator />}
      
      <EventTitle>{event.title}</EventTitle>
      <EventTime>{event.startTime} - {event.endTime}</EventTime>
      {event.stage && <EventStage>{event.stage}</EventStage>}
      <EventType type={event.type}>{event.type}</EventType>
      
      <EventActions>
        <ActionButton onClick={handlePlay} title="Watch Live">
          <Play size={12} />
        </ActionButton>
        <ActionButton onClick={handleInfo} title="Event Details">
          <Info size={12} />
        </ActionButton>
        {event.externalLink && (
          <ActionButton onClick={handleExternal} title="External Link">
            <ExternalLink size={12} />
          </ActionButton>
        )}
      </EventActions>
    </EventBlockContainer>
  );
};

export default EventBlock; 