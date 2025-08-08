import React from 'react';
import styled from 'styled-components';
import { Bitcoin, Coins, Database, Globe, Shield, Zap, DollarSign, Building } from 'lucide-react';

const ChannelListContainer = styled.div`
  width: 130px;
  background: rgba(20, 20, 20, 0.9);
  border-right: 1px solid #333;
  display: flex;
  flex-direction: column;
`;

const ChannelItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid #333;
  height: calc(100px + 1px);
  box-sizing: border-box;
  position: relative;
  
  &:hover {
    background: rgba(0, 255, 136, 0.1);
  }
`;

const IconRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
  position: relative;
`;

const ChannelLogo = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    width: 32px;
    height: 32px;
    color: ${props => props.color || '#00ff88'};
  }
`;

const ChannelNumber = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.color || '#00ff88'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  color: #000;
  box-shadow: 0 2px 6px rgba(0, 255, 136, 0.3);
  position: absolute;
  top: -2px;
  right: -8px;
`;

const ChannelName = styled.span`
  font-size: 0.6rem;
  color: #ccc;
  text-align: center;
  font-weight: 500;
  line-height: 1.1;
  max-width: 110px;
  word-wrap: break-word;
`;

const ChannelList = ({ eventData, selectedDate }) => {
  const channels = [
    {
      id: 1,
      number: '1',
      name: 'Blockchain Insights',
      icon: Bitcoin,
      color: '#00ff88'
    },
    {
      id: 2,
      number: '2',
      name: 'Crypto Summit',
      icon: Coins,
      color: '#627eea'
    },
    {
      id: 3,
      number: '3',
      name: 'Legalhack',
      icon: Database,
      color: '#ff6b6b'
    },
    {
      id: 4,
      number: '4',
      name: 'BRidge',
      icon: Globe,
      color: '#f7931a'
    },
    {
      id: 5,
      number: '5',
      name: 'Regulation ROCKS',
      icon: Shield,
      color: '#4ecdc4'
    },
    {
      id: 6,
      number: '6',
      name: 'RWA Summit',
      icon: Zap,
      color: '#ffe66d'
    },
    {
      id: 7,
      number: '7',
      name: 'Sebrae',
      icon: Bitcoin,
      color: '#ff9f43'
    },
    {
      id: 8,
      number: '8',
      name: 'LFDT - BRAZIL CHAPTER',
      icon: Database,
      color: '#a55eea'
    },
    {
      id: 9,
      number: '9',
      name: 'Digital Finance',
      icon: DollarSign,
      color: '#00bcd4'
    },
    {
      id: 10,
      number: '10',
      name: 'CRIA',
      icon: Building,
      color: '#ff5722'
    }
  ];

  // Filter channels based on selected date
  // Day 0 (6 Ago): channels 1-8, Day 1 (7 Ago): channels 1-10
  const visibleChannels = selectedDate === 0 
    ? channels.filter(channel => channel.id <= 8)
    : channels;

  return (
    <ChannelListContainer>
      {visibleChannels.map((channel) => (
        <ChannelItem key={channel.id}>
          <IconRow>
            <ChannelLogo color={channel.color}>
              <channel.icon />
            </ChannelLogo>
            <ChannelNumber color={channel.color}>
              {channel.number}
            </ChannelNumber>
          </IconRow>
          <ChannelName>{channel.name}</ChannelName>
        </ChannelItem>
      ))}
    </ChannelListContainer>
  );
};

export default ChannelList; 