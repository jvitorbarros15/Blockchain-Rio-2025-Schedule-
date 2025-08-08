import React, { useState } from 'react';
import styled from 'styled-components';
import { Calendar, Clock, Info, X } from 'lucide-react';
import ChannelList from './ChannelList';

const GridContainer = styled.div`
  background: rgba(20, 20, 20, 0.9);
  border-radius: 12px;
  border: 1px solid #333;
  overflow-x: auto;
  overflow-y: hidden;
  box-shadow: 0 8px 32px rgba(0, 255, 136, 0.1);
`;

const HeaderSection = styled.div`
  background: rgba(20, 20, 20, 0.9);
  border-bottom: 1px solid #333;
  padding: 1rem;
  min-width: 3800px;
`;

const DateSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const DateLabel = styled.div`
  font-weight: bold;
  color: ${props => props.isSelected ? '#00ff88' : '#fff'};
  min-width: 60px;
  text-align: center;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
  background: ${props => props.isSelected ? 'rgba(0, 255, 136, 0.2)' : 'transparent'};
  border: ${props => props.isSelected ? '1px solid #00ff88' : '1px solid transparent'};
  
  &:hover {
    background: ${props => props.isSelected ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
    color: ${props => props.isSelected ? '#00ff88' : '#00ff88'};
  }
`;

const NowButton = styled.button`
  background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
  color: #000;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 255, 136, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 255, 136, 0.4);
  }
`;

const TimeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 40px;
`;

const TimeLabel = styled.div`
  font-weight: bold;
  color: #fff;
  flex: 1;
  text-align: center;
  font-size: 0.8rem;
  min-width: 0;
`;

const GlobalTimeIndicator = styled.div`
  position: absolute;
  left: ${props => props.position}%;
  top: 0;
          height: calc(${props => props.channelCount || 8} * (100px + 1px) + 40px);
  width: 2px;
  background: linear-gradient(to bottom, #00ff88, #ff0066);
  z-index: 1;
  pointer-events: none;
  transform: translateX(-50%);
  
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    width: 10px;
    height: 10px;
    background: #00ff88;
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.8);
    animation: pulse 2s infinite;
  }

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



const GridBody = styled.div`
  display: flex;
  min-height: 800px;
  min-width: 3910px;
  overflow-x: auto;
`;

const TimelineGrid = ({ eventData, currentTime }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(0); // 0 = Aug 6, 1 = Aug 7
  const [deselectedEvents, setDeselectedEvents] = useState(new Set()); // Track deselected events

  // Generate dates for August 6th and 7th
  const dates = ['6 Ago', '7 Ago'];

  // Generate time slots with 30-minute intervals extending to 19:00
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', 
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
  ];

  // Calculate current time position as percentage (matching slot-based positioning)
  const getCurrentTimePosition = () => {
    const now = currentTime;
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentMinutes = hour * 60 + minute;
    
    // Use same slot-based calculation as events
    const startTimeInMinutes = 9 * 60; // 9:00 = 540 minutes
    const slotDuration = 30; // minutes per slot
    const totalSlots = timeSlots.length; // 21 slots
    
    const currentSlot = (currentMinutes - startTimeInMinutes) / slotDuration;
    // Adjust position to center within each slot (since TimeLabels are centered)
    const position = ((currentSlot + 0.5) / totalSlots) * 100;
    
    return Math.max(0, Math.min(100, position));
  };

  const handleEventInfo = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleEventClick = (event) => {
    const newDeselectedEvents = new Set(deselectedEvents);
    if (deselectedEvents.has(event.id)) {
      // Re-select the event (remove from deselected)
      newDeselectedEvents.delete(event.id);
    } else {
      // Deselect the event (add to deselected)
      newDeselectedEvents.add(event.id);
    }
    setDeselectedEvents(newDeselectedEvents);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleDateChange = (dateIndex) => {
    setSelectedDate(dateIndex);
  };

  // Filter events based on selected date
  const filteredEventData = eventData.filter(event => {
    return event.startDate <= selectedDate && event.endDate >= selectedDate;
  });





  return (
    <GridContainer>
      <HeaderSection>
        <DateSelector>
          <Calendar size={16} />
          <span>Dates</span>
        </DateSelector>
        
        <DateRow>
          {dates.map((date, index) => (
            <DateLabel 
              key={index} 
              isSelected={selectedDate === index}
              onClick={() => handleDateChange(index)}
            >
              {date}
            </DateLabel>
          ))}
        </DateRow>
        
        <DateRow>
          <NowButton>
            Agora: {currentTime.toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </NowButton>
        </DateRow>
        
        <TimeRow>
          <div style={{ width: '130px' }}></div>
          <div style={{ display: 'flex', position: 'relative', paddingLeft: '2px', minWidth: '3800px', overflow: 'visible', background: 'rgba(20, 20, 20, 0.9)' }}>
            <GlobalTimeIndicator 
              position={getCurrentTimePosition()} 
              channelCount={selectedDate === 0 ? 8 : 10}
            />
            {timeSlots.map((time, index) => (
              <TimeLabel key={index}>{time}</TimeLabel>
            ))}
          </div>
        </TimeRow>
      </HeaderSection>
      
      <GridBody>
        <ChannelList eventData={eventData} selectedDate={selectedDate} />
        <EventGrid timeSlots={timeSlots}>
          {Array.from({ length: selectedDate === 0 ? 8 : 10 }, (_, channelIndex) => {
            const channelId = channelIndex + 1;
            
            // Get events for this channel and selected date
            const channelEvents = filteredEventData.filter(event => event.channelId === channelId);
            
            return (
              <EventCell key={`channel-${channelId}`}>
                {channelEvents.map((event, eventIndex) => (
                  <EventBlock
                    key={event.id}
                    event={event}
                    title={event.title}
                    stage={event.stage}
                    startTime={event.startTime}
                    endTime={event.endTime}
                    currentTime={currentTime}
                    eventIndex={eventIndex}
                    channelEvents={channelEvents}
                    onInfoClick={handleEventInfo}
                    onEventClick={handleEventClick}
                    isDeselected={deselectedEvents.has(event.id)}
                  />
                ))}
              </EventCell>
            );
          })}
        </EventGrid>
      </GridBody>
      {isModalOpen && selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={closeModal} 
          stageColor={selectedEvent.stage}
        />
      )}
    </GridContainer>
  );
};

const EventGrid = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #333;
  position: relative;
  min-height: 800px;
  min-width: 3800px;
`;

const EventCell = styled.div`
  background: rgba(20, 20, 20, 0.8);
  border-bottom: 1px solid #333;
  position: relative;
  height: calc(100px + 1px);
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;



// Simple test event block
const TestEventBlock = styled.div`
  position: absolute;
  left: 5%;
  width: 20%;
  height: 80px;
  background: #ff6b6b;
  border: 2px solid #00ff88;
  border-radius: 8px;
  padding: 8px;
  color: white;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const EventBlock = ({ event, title, stage, startTime, endTime, currentTime, eventIndex, channelEvents, onInfoClick, onEventClick, isDeselected }) => {
  // Time slots array - 30-minute intervals extended to 19:00
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', 
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
  ];

  // Stage color mapping
  const getStageColor = (stageName) => {
    const stageColors = {
      'Blockchain Insights': '#00ff88',
      'Crypto Summit': '#627eea',
      'Legalhack': '#ff6b6b',
      'BRidge': '#f7931a',
      'Regulation ROCKS': '#4ecdc4',
      'RWA Summit': '#ffe66d',
      'Sebrae': '#ff9f43',
      'LFDT - BRAZIL CHAPTER': '#a55eea',
      'Digital Finance': '#00bcd4',
      'CRIA': '#ff5722'
    };
    return stageColors[stageName] || '#00ff88'; // Default to green if not found
  };

  const stageColor = getStageColor(stage);

  // Convert time to minutes for precise positioning
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  
  // Calculate position based on time slot distribution
  // Each time slot represents 30 minutes and takes up equal space (flex: 1)
  const startTimeInMinutes = timeToMinutes('09:00');
  const totalTimeSpan = timeToMinutes('19:00') - startTimeInMinutes; // 600 minutes total
  
  // Position based on 30-minute slots (since TimeLabels use flex: 1)
  const slotDuration = 30; // minutes per slot
  const totalSlots = timeSlots.length; // 21 slots
  
  const startSlot = (startMinutes - startTimeInMinutes) / slotDuration;
  const endSlot = (endMinutes - startTimeInMinutes) / slotDuration;
  
  const left = (startSlot / totalSlots) * 100;
  const width = ((endSlot - startSlot) / totalSlots) * 100;

  // Handle overlapping events by checking for time conflicts
  let verticalOffset = 0;
  let eventHeight = 'calc(100% - 8px)';
  
  // Check for overlapping events in the same channel
  const overlappingEvents = channelEvents.filter((otherEvent, otherIndex) => {
    if (otherIndex >= eventIndex) return false; // Only check previous events
    
    const otherStartMinutes = timeToMinutes(otherEvent.startTime);
    const otherEndMinutes = timeToMinutes(otherEvent.endTime);
    
    // Check if events overlap
    return (startMinutes < otherEndMinutes && endMinutes > otherStartMinutes);
  });
  
  if (overlappingEvents.length > 0) {
    // Stack overlapping events vertically
    verticalOffset = overlappingEvents.length * 45; // 45px offset per overlapping event
    eventHeight = 'calc(50% - 4px)'; // Make overlapping events smaller
  }

  // Determine event status based on current time and event status
  const now = currentTime;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  let eventStatus, statusColor, statusBg;
  
  // Check if event is cancelled first
  if (event.status === 'cancelled') {
    eventStatus = 'CANCELADO';
    statusColor = '#fff';
    statusBg = 'linear-gradient(90deg, #ff4444, #cc0000)';
  } else if (event.status === 'delayed') {
    if (currentMinutes < startMinutes) {
      eventStatus = `ATRASADO ${event.delayMinutes}min`;
      statusColor = '#000';
      statusBg = `linear-gradient(90deg, #ffc107, #ff9800)`;
    } else if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
      eventStatus = 'AO VIVO';
      statusColor = '#000';
      statusBg = `linear-gradient(90deg, ${stageColor}, ${stageColor}dd)`;
    } else {
      eventStatus = 'FINALIZADO';
      statusColor = '#fff';
      statusBg = 'linear-gradient(90deg, #666, #444)';
    }
  } else if (currentMinutes < startMinutes) {
    eventStatus = 'EM BREVE';
    statusColor = '#000';
    statusBg = `linear-gradient(90deg, ${stageColor}99, ${stageColor}66)`; // Semi-transparent stage color
  } else if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
    eventStatus = 'AO VIVO';
    statusColor = '#000';
    statusBg = `linear-gradient(90deg, ${stageColor}, ${stageColor}dd)`;
  } else {
    eventStatus = 'FINALIZADO';
    statusColor = '#fff';
    statusBg = 'linear-gradient(90deg, #666, #444)';
  }

  // Debug positioning (commented out)
  // console.log(`Event: ${title} (${startTime}-${endTime}), Channel: ${stage}, Position: ${left.toFixed(2)}%, Width: ${width.toFixed(2)}%`);

  return (
    <div 
      onClick={() => onEventClick(event)}
      style={{
        position: 'absolute',
        left: `${left}%`,
        width: `${width}%`,
        height: eventHeight,
        top: `${4 + verticalOffset}px`,
        background: isDeselected 
          ? `linear-gradient(135deg, rgba(136, 136, 136, 0.15) 0%, rgba(102, 102, 102, 0.08) 50%, rgba(20, 20, 20, 0.95) 100%)`
          : event.status === 'cancelled' 
            ? `linear-gradient(135deg, rgba(255, 68, 68, 0.15) 0%, rgba(204, 0, 0, 0.08) 50%, rgba(20, 20, 20, 0.95) 100%)`
            : `linear-gradient(135deg, ${stageColor}26 0%, ${stageColor}14 50%, rgba(20, 20, 20, 0.95) 100%)`,
        border: isDeselected
          ? `1px solid rgba(136, 136, 136, 0.4)`
          : event.status === 'cancelled' 
            ? `1px solid rgba(255, 68, 68, 0.4)`
            : `1px solid ${stageColor}66`,
        borderLeft: isDeselected
          ? `3px solid #888888`
          : event.status === 'cancelled' 
            ? `3px solid #ff4444`
            : `3px solid ${stageColor}`,
        borderRadius: '6px',
        padding: '8px 10px',
        color: isDeselected ? '#888' : 'white',
        fontSize: '11px',
        display: 'flex',
        flexDirection: 'column',
        gap: '3px',
        backdropFilter: 'blur(10px)',
        boxShadow: isDeselected
          ? `0 2px 8px rgba(136, 136, 136, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
          : event.status === 'cancelled' 
            ? `0 2px 8px rgba(255, 68, 68, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
            : `0 2px 8px ${stageColor}26, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        overflow: 'hidden',
        boxSizing: 'border-box',
        margin: '0 2px',
        opacity: isDeselected ? 0.6 : (event.status === 'cancelled' ? 0.8 : 1)
      }}>
      {/* Top glow bar */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '2px',
        background: isDeselected
          ? `linear-gradient(90deg, transparent, #888888, transparent)`
          : event.status === 'cancelled' 
            ? `linear-gradient(90deg, transparent, #ff4444, transparent)`
            : `linear-gradient(90deg, transparent, ${stageColor}, transparent)`,
        opacity: '0.8'
      }} />
      
      {/* Header with time and status */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '4px'
      }}>
        <div style={{
          fontSize: '10px',
          color: isDeselected 
            ? '#888888'
            : event.status === 'cancelled' ? '#ff4444' : stageColor,
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.3px'
        }}>
          {startTime} - {endTime}
        </div>
        <div style={{
          background: statusBg,
          color: statusColor,
          padding: '1px 5px',
          borderRadius: '8px',
          fontSize: '8px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.3px',
          boxShadow: `0 0 6px ${eventStatus === 'LIVE' ? `${stageColor}66` : eventStatus === 'SOON' ? `${stageColor}66` : 'rgba(102, 102, 102, 0.4)'}`
        }}>
          {eventStatus}
        </div>
      </div>
      
      {/* Event title */}
      <div style={{
        fontWeight: 'bold',
        color: '#fff',
        fontSize: '11px',
        lineHeight: '1.2',
        marginBottom: '3px',
        display: '-webkit-box',
        WebkitLineClamp: '2',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
        flex: '1'
      }}>
        {title}
      </div>
      
      {/* Stage tag */}
      <div style={{
        background: isDeselected
          ? `rgba(136, 136, 136, 0.1)`
          : event.status === 'cancelled' ? `rgba(255, 68, 68, 0.1)` : `${stageColor}1A`,
        border: isDeselected
          ? `1px solid rgba(136, 136, 136, 0.3)`
          : event.status === 'cancelled' ? `1px solid rgba(255, 68, 68, 0.3)` : `1px solid ${stageColor}4D`,
        color: isDeselected
          ? '#888888'
          : event.status === 'cancelled' ? '#ff4444' : stageColor,
        padding: '1px 6px',
        borderRadius: '10px',
        fontSize: '9px',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.3px',
        alignSelf: 'flex-start',
        marginTop: 'auto'
      }}>
        {stage}
      </div>
      
      {/* Info button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onInfoClick(event);
        }}
        style={{
          position: 'absolute',
          bottom: '6px',
          right: '6px',
          background: `${stageColor}33`,
          border: `1px solid ${stageColor}66`,
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          color: stageColor
        }}
        onMouseEnter={(e) => {
          e.target.style.background = `${stageColor}66`;
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = `${stageColor}33`;
          e.target.style.transform = 'scale(1)';
        }}
      >
        <Info size={12} />
      </button>
    </div>
  );
};

// Styled components for the new event block design
const StyledEventBlock = styled.div`
  position: absolute;
  left: ${props => props.left}%;
  width: ${props => props.width}%;
  height: 85px;
  background: linear-gradient(135deg, 
    rgba(0, 255, 136, 0.15) 0%, 
    rgba(0, 204, 106, 0.08) 50%, 
    rgba(20, 20, 20, 0.95) 100%
  );
  border: 1px solid rgba(0, 255, 136, 0.4);
  border-left: 3px solid #00ff88;
  border-radius: 8px;
  padding: 8px 12px;
  color: white;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 4px 15px rgba(0, 255, 136, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    border-color: #00ff88;
    box-shadow: 
      0 8px 25px rgba(0, 255, 136, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    background: linear-gradient(135deg, 
      rgba(0, 255, 136, 0.25) 0%, 
      rgba(0, 204, 106, 0.15) 50%, 
      rgba(20, 20, 20, 0.95) 100%
    );
  }
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const EventTime = styled.div`
  font-size: 10px;
  color: #00ff88;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const EventStatus = styled.div`
  background: linear-gradient(90deg, #00ff88, #00cc6a);
  color: #000;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 8px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 0 8px rgba(0, 255, 136, 0.4);
`;

const EventTitle = styled.div`
  font-weight: bold;
  color: #fff;
  font-size: 11px;
  line-height: 1.3;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;

const EventStageTag = styled.div`
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  color: #00ff88;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 9px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  align-self: flex-start;
  margin-top: auto;
`;

const EventGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00ff88, transparent);
  opacity: 0.8;
`;

// Event Modal Component
const EventModal = ({ event, onClose, stageColor }) => {
  // Get stage color from the same mapping
  const getStageColor = (stageName) => {
    const stageColors = {
      'Blockchain Insights': '#00ff88',
      'Crypto Summit': '#627eea',
      'Legalhack': '#ff6b6b',
      'BRidge': '#f7931a',
      'Regulation ROCKS': '#4ecdc4',
      'RWA Summit': '#ffe66d',
      'Sebrae': '#ff9f43',
      'LFDT - BRAZIL CHAPTER': '#a55eea',
      'Digital Finance': '#00bcd4',
      'CRIA': '#ff5722'
    };
    return stageColors[stageName] || '#00ff88';
  };

  const modalStageColor = getStageColor(event.stage);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} stageColor={modalStageColor}>
        <ModalHeader stageColor={modalStageColor}>
          <div>
            <ModalTitle>{event.title}</ModalTitle>
            <ModalTime>{event.startTime} - {event.endTime}</ModalTime>
          </div>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <StageInfo stageColor={modalStageColor}>
            <strong>Stage:</strong> {event.stage}
          </StageInfo>
          
          <EventType stageColor={modalStageColor}>
            <strong>Type:</strong> {event.type}
          </EventType>
          
          <SpeakersSection>
            <strong>Speakers:</strong>
            <SpeakersList>
              {event.speakers ? event.speakers.join(', ') : 'TBD'}
            </SpeakersList>
          </SpeakersSection>
          
          {event.description && (
            <DescriptionSection>
              <strong>Description:</strong>
              <Description>{event.description}</Description>
            </DescriptionSection>
          )}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

// Modal Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%);
  border: 1px solid ${props => props.stageColor}66;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px ${props => props.stageColor}33;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  border-bottom: 1px solid ${props => props.stageColor}33;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, ${props => props.stageColor}, transparent);
  }
`;

const ModalTitle = styled.h2`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const ModalTime = styled.div`
  color: #888;
  font-size: 14px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const StageInfo = styled.div`
  color: ${props => props.stageColor};
  font-size: 14px;
  margin-bottom: 12px;
  
  strong {
    color: #fff;
  }
`;

const EventType = styled.div`
  color: #ccc;
  font-size: 14px;
  margin-bottom: 16px;
  text-transform: capitalize;
  
  strong {
    color: #fff;
  }
`;

const SpeakersSection = styled.div`
  margin-bottom: 16px;
  
  strong {
    color: #fff;
    display: block;
    margin-bottom: 8px;
  }
`;

const SpeakersList = styled.div`
  color: #ccc;
  font-size: 14px;
  line-height: 1.4;
`;

const DescriptionSection = styled.div`
  strong {
    color: #fff;
    display: block;
    margin-bottom: 8px;
  }
`;

const Description = styled.div`
  color: #ccc;
  font-size: 14px;
  line-height: 1.5;
`;

export default TimelineGrid; 