import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Clock, 
  Edit3, 
  AlertTriangle, 
  X, 
  Save, 
  RefreshCw, 
  Trash2, 
  Calendar,
  Users,
  Activity,
  LogOut,
  ChevronDown,
  ChevronRight,
  MapPin
} from 'lucide-react';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  color: #ffffff;
`;

const DashboardHeader = styled.header`
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #ff0066;
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

const DashboardTitle = styled.h1`
  color: #ff0066;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #ccc;
  font-size: 0.9rem;
`;

const LogoutButton = styled.button`
  background: rgba(255, 0, 102, 0.2);
  color: #ff0066;
  border: 1px solid #ff0066;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(255, 0, 102, 0.3);
    box-shadow: 0 0 20px rgba(255, 0, 102, 0.4);
  }
`;

const DashboardBody = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid #333;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const StatTitle = styled.h3`
  color: #888;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.div`
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EventsSection = styled.section`
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid #333;
  border-radius: 12px;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h2`
  color: #fff;
  font-size: 1.2rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EventsList = styled.div`
  max-height: 600px;
  overflow-y: auto;
`;

const StageSection = styled.div`
  border-bottom: 1px solid #333;
  
  &:last-child {
    border-bottom: none;
  }
`;

const StageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const StageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StageName = styled.h3`
  color: ${props => props.color};
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StageStats = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #888;
`;

const StageStatItem = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 8px;
  border-radius: 12px;
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const StageEventsList = styled.div`
  background: rgba(0, 0, 0, 0.2);
  max-height: ${props => props.isExpanded ? '400px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const EventItem = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const EventInfo = styled.div`
  flex: 1;
`;

const EventTitle = styled.h4`
  color: #fff;
  font-size: 1rem;
  margin: 0 0 0.25rem 0;
  font-weight: 600;
`;

const EventMeta = styled.div`
  color: #888;
  font-size: 0.85rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const EventStage = styled.span`
  background: ${props => props.color}33;
  color: ${props => props.color};
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const EventStatus = styled.span`
  background: ${props => {
    switch (props.status) {
      case 'live': return 'rgba(0, 255, 136, 0.2)';
      case 'delayed': return 'rgba(255, 193, 7, 0.2)';
      case 'cancelled': return 'rgba(255, 68, 68, 0.2)';
      default: return 'rgba(136, 136, 136, 0.2)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'live': return '#00ff88';
      case 'delayed': return '#ffc107';
      case 'cancelled': return '#ff4444';
      default: return '#888';
    }
  }};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const EventActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: ${props => props.variant === 'danger' ? 'rgba(255, 68, 68, 0.2)' : 'rgba(255, 0, 102, 0.2)'};
  color: ${props => props.variant === 'danger' ? '#ff4444' : '#ff0066'};
  border: 1px solid ${props => props.variant === 'danger' ? '#ff4444' : '#ff0066'};
  border-radius: 6px;
  padding: 6px 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  
  &:hover {
    background: ${props => props.variant === 'danger' ? 'rgba(255, 68, 68, 0.3)' : 'rgba(255, 0, 102, 0.3)'};
    box-shadow: 0 0 15px ${props => props.variant === 'danger' ? 'rgba(255, 68, 68, 0.4)' : 'rgba(255, 0, 102, 0.4)'};
  }
`;

// Modal for editing events
const EditModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const EditModalContent = styled.div`
  background: linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%);
  border: 1px solid #ff0066;
  border-radius: 12px;
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`;

const EditModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 0, 102, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditModalBody = styled.div`
  padding: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  display: block;
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  background: rgba(255, 0, 102, 0.1);
  border: 1px solid rgba(255, 0, 102, 0.3);
  border-radius: 6px;
  padding: 0.75rem;
  color: #fff;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #ff0066;
    box-shadow: 0 0 15px rgba(255, 0, 102, 0.3);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  background: rgba(255, 0, 102, 0.1);
  border: 1px solid rgba(255, 0, 102, 0.3);
  border-radius: 6px;
  padding: 0.75rem;
  color: #fff;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #ff0066;
    box-shadow: 0 0 15px rgba(255, 0, 102, 0.3);
  }
  
  option {
    background: #1a1a1a;
    color: #fff;
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

const OrganizerDashboard = ({ user, onLogout, eventData, onUpdateEvent }) => {
  const [events, setEvents] = useState(eventData);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [expandedStages, setExpandedStages] = useState({});

  // Helper functions (defined first to avoid hoisting issues)
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const addMinutesToTime = (timeStr, minutes) => {
    const [hours, mins] = timeStr.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60);
    const newMins = totalMinutes % 60;
    return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
  };

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
    return stageColors[stageName] || '#00ff88';
  };

  // Group events by stage
  const eventsByStage = events.reduce((acc, event) => {
    if (!acc[event.stage]) {
      acc[event.stage] = [];
    }
    acc[event.stage].push(event);
    return acc;
  }, {});

  // Sort events within each stage by start time
  Object.keys(eventsByStage).forEach(stage => {
    eventsByStage[stage].sort((a, b) => {
      const timeA = timeToMinutes(a.startTime);
      const timeB = timeToMinutes(b.startTime);
      return timeA - timeB;
    });
  });

  // Calculate event statistics
  const stats = {
    total: events.length,
    live: events.filter(e => e.status === 'live').length,
    delayed: events.filter(e => e.status === 'delayed').length,
    cancelled: events.filter(e => e.status === 'cancelled').length
  };

  const toggleStageExpansion = (stageName) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageName]: !prev[stageName]
    }));
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEditForm({
      id: event.id,
      title: event.title,
      startTime: event.startTime,
      endTime: event.endTime,
      status: event.status || 'scheduled',
      delayMinutes: event.delayMinutes || 0,
      speakers: event.speakers ? event.speakers.join(', ') : ''
    });
  };

  const handleSaveEdit = () => {
    const updatedEvents = events.map(event => 
      event.id === editForm.id 
        ? { 
            ...event, 
            title: editForm.title,
            startTime: editForm.startTime,
            endTime: editForm.endTime,
            status: editForm.status,
            delayMinutes: editForm.delayMinutes,
            speakers: editForm.speakers ? editForm.speakers.split(',').map(s => s.trim()).filter(s => s.length > 0) : []
          }
        : event
    );
    
    setEvents(updatedEvents);
    onUpdateEvent(updatedEvents);
    setEditingEvent(null);
  };

  const handleDelayEvent = (event, minutes) => {
    // Find all events that need to be cascaded
    const eventsToUpdate = findCascadingEvents(event, minutes);
    
    const updatedEvents = events.map(e => {
      const updateInfo = eventsToUpdate.find(update => update.id === e.id);
      if (updateInfo) {
        return {
          ...e,
          status: updateInfo.delayMinutes > 0 ? 'delayed' : e.status,
          delayMinutes: (e.delayMinutes || 0) + updateInfo.delayMinutes,
          startTime: addMinutesToTime(e.startTime, updateInfo.delayMinutes),
          endTime: addMinutesToTime(e.endTime, updateInfo.delayMinutes)
        };
      }
      return e;
    });
    
    setEvents(updatedEvents);
    onUpdateEvent(updatedEvents);
  };

  const findCascadingEvents = (initialEvent, delayMinutes) => {
    const eventsToUpdate = [{ id: initialEvent.id, delayMinutes }];
    const stageEvents = eventsByStage[initialEvent.stage] || [];
    
    // Find the index of the initial event
    const eventIndex = stageEvents.findIndex(e => e.id === initialEvent.id);
    if (eventIndex === -1) return eventsToUpdate;
    
    // Check subsequent events for cascading delays
    for (let i = eventIndex + 1; i < stageEvents.length; i++) {
      const currentEvent = stageEvents[i];
      const previousEvent = stageEvents[i - 1];
      
      // Check if current event starts when the previous event ends (or within 5 minutes)
      const currentStartMinutes = timeToMinutes(currentEvent.startTime);
      const previousEndMinutes = timeToMinutes(previousEvent.endTime);
      const timeDifference = currentStartMinutes - previousEndMinutes;
      
      // If events are back-to-back (within 5 minutes), cascade the delay
      if (timeDifference <= 5) {
        eventsToUpdate.push({ id: currentEvent.id, delayMinutes });
      } else {
        // Stop cascading if there's a significant gap
        break;
      }
    }
    
    return eventsToUpdate;
  };

  const handleCancelEvent = (event) => {
    const updatedEvents = events.map(e => 
      e.id === event.id ? { ...e, status: 'cancelled' } : e
    );
    
    setEvents(updatedEvents);
    onUpdateEvent(updatedEvents);
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <HeaderContent>
          <DashboardTitle>
            <Activity size={24} />
            Painel de Organização
          </DashboardTitle>
          <UserInfo>
            <span>Olá, {user.name}</span>
            <LogoutButton onClick={onLogout}>
              <LogOut size={16} />
              Sair
            </LogoutButton>
          </UserInfo>
        </HeaderContent>
      </DashboardHeader>

      <DashboardBody>
        <StatsGrid>
          <StatCard>
            <StatTitle>Total de Eventos</StatTitle>
            <StatValue>
              <Calendar size={24} color="#00ff88" />
              {stats.total}
            </StatValue>
          </StatCard>
          
          <StatCard>
            <StatTitle>Ao Vivo</StatTitle>
            <StatValue>
              <Activity size={24} color="#00ff88" />
              {stats.live}
            </StatValue>
          </StatCard>
          
          <StatCard>
            <StatTitle>Atrasados</StatTitle>
            <StatValue>
              <Clock size={24} color="#ffc107" />
              {stats.delayed}
            </StatValue>
          </StatCard>
          
          <StatCard>
            <StatTitle>Cancelados</StatTitle>
            <StatValue>
              <Trash2 size={24} color="#ff4444" />
              {stats.cancelled}
            </StatValue>
          </StatCard>
        </StatsGrid>

        <EventsSection>
          <SectionHeader>
            <SectionTitle>
              <MapPin size={20} />
              Gerenciar por Stage
            </SectionTitle>
          </SectionHeader>
          
          <EventsList>
            {Object.entries(eventsByStage).map(([stageName, stageEvents]) => {
              const stageColor = getStageColor(stageName);
              const stageStats = {
                total: stageEvents.length,
                live: stageEvents.filter(e => e.status === 'live').length,
                delayed: stageEvents.filter(e => e.status === 'delayed').length,
                cancelled: stageEvents.filter(e => e.status === 'cancelled').length
              };
              
              return (
                <StageSection key={stageName}>
                  <StageHeader onClick={() => toggleStageExpansion(stageName)}>
                    <StageInfo>
                      <StageName color={stageColor}>
                        <MapPin size={16} />
                        {stageName}
                      </StageName>
                      <StageStats>
                        <StageStatItem>{stageStats.total} eventos</StageStatItem>
                        {stageStats.live > 0 && <StageStatItem style={{color: '#00ff88'}}>{stageStats.live} ao vivo</StageStatItem>}
                        {stageStats.delayed > 0 && <StageStatItem style={{color: '#ffc107'}}>{stageStats.delayed} atrasados</StageStatItem>}
                        {stageStats.cancelled > 0 && <StageStatItem style={{color: '#ff4444'}}>{stageStats.cancelled} cancelados</StageStatItem>}
                      </StageStats>
                    </StageInfo>
                    <ExpandButton>
                      {expandedStages[stageName] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </ExpandButton>
                  </StageHeader>
                  
                  <StageEventsList isExpanded={expandedStages[stageName]}>
                    {stageEvents.map(event => (
                      <EventItem key={event.id}>
                        <EventInfo>
                          <EventTitle>{event.title}</EventTitle>
                          <EventMeta>
                            <span>{event.startTime} - {event.endTime}</span>
                            <EventStatus status={event.status || 'scheduled'}>
                              {event.status === 'live' ? 'Ao Vivo' :
                               event.status === 'delayed' ? `Atrasado ${event.delayMinutes}min` :
                               event.status === 'cancelled' ? 'Cancelado' : 'Agendado'}
                            </EventStatus>
                          </EventMeta>
                        </EventInfo>
                        
                        <EventActions>
                          <ActionButton onClick={() => handleEditEvent(event)}>
                            <Edit3 size={14} />
                            Editar
                          </ActionButton>
                          
                          <ActionButton onClick={() => handleDelayEvent(event, 15)}>
                            <Clock size={14} />
                            +15min
                          </ActionButton>
                          
                          <ActionButton 
                            variant="danger" 
                            onClick={() => handleCancelEvent(event)}
                          >
                            <X size={14} />
                            Cancelar
                          </ActionButton>
                        </EventActions>
                      </EventItem>
                    ))}
                  </StageEventsList>
                </StageSection>
              );
            })}
          </EventsList>
        </EventsSection>
      </DashboardBody>

      {editingEvent && (
        <EditModal onClick={() => setEditingEvent(null)}>
          <EditModalContent onClick={(e) => e.stopPropagation()}>
            <EditModalHeader>
              <h3 style={{ color: '#fff', margin: 0 }}>Editar Evento</h3>
              <ActionButton onClick={() => setEditingEvent(null)}>
                <X size={16} />
              </ActionButton>
            </EditModalHeader>
            
            <EditModalBody>
              <FormGroup>
                <FormLabel>Título</FormLabel>
                <FormInput
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Palestrantes</FormLabel>
                <FormInput
                  type="text"
                  placeholder="Separe os nomes com vírgulas (ex: João Silva, Maria Santos, Pedro Costa)"
                  value={editForm.speakers || ''}
                  onChange={(e) => setEditForm({...editForm, speakers: e.target.value})}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Horário de Início</FormLabel>
                <FormInput
                  type="time"
                  value={editForm.startTime}
                  onChange={(e) => setEditForm({...editForm, startTime: e.target.value})}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Horário de Término</FormLabel>
                <FormInput
                  type="time"
                  value={editForm.endTime}
                  onChange={(e) => setEditForm({...editForm, endTime: e.target.value})}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Status</FormLabel>
                <FormSelect
                  value={editForm.status}
                  onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                >
                  <option value="scheduled">Agendado</option>
                  <option value="live">Ao Vivo</option>
                  <option value="delayed">Atrasado</option>
                  <option value="cancelled">Cancelado</option>
                </FormSelect>
              </FormGroup>
              
              <ModalActions>
                <ActionButton onClick={() => setEditingEvent(null)}>
                  Cancelar
                </ActionButton>
                <ActionButton onClick={handleSaveEdit}>
                  <Save size={14} />
                  Salvar
                </ActionButton>
              </ModalActions>
            </EditModalBody>
          </EditModalContent>
        </EditModal>
      )}
    </DashboardContainer>
  );
};

export default OrganizerDashboard;
