// Generate blockchain event data based on reference file
export const generateEventData = () => {
  const events = [
    // Blockchain Insights Stage Events (Channel 1)
    {
      id: 1,
      channelId: 1,
      title: "Mesa de Abertura Blockchain RIO 2025",
      type: "conference",
      startTime: "09:30",
      endTime: "10:00",
      startDate: 0,
      endDate: 0,
      stage: "Blockchain Insights",
      speakers: ["Opening Committee", "Blockchain RIO Team"],
      description: "Cerimônia oficial de abertura do Blockchain RIO 2025, apresentando a programação completa do evento e dando as boas-vindas a todos os participantes."
    },
    {
      id: 2,
      channelId: 1,
      title: "Presidente do Banco Central do Brasil",
      type: "conference",
      startTime: "10:00",
      endTime: "10:35",
      startDate: 0,
      endDate: 0,
      stage: "Blockchain Insights",
      speakers: ["Roberto Campos Neto"],
      description: "Palestra magna com o Presidente do Banco Central do Brasil sobre o futuro do sistema financeiro nacional e as perspectivas da moeda digital brasileira (DREX)."
    },
    {
      id: 3,
      channelId: 1,
      title: "A Ponte entre DeFi, Tokenização e o Futuro das Finanças Globais",
      type: "conference",
      startTime: "12:25",
      endTime: "12:50",
      startDate: 0,
      endDate: 0,
      stage: "Blockchain Insights"
    },
    {
      id: 4,
      channelId: 1,
      title: "Construindo a Web3: A Infraestrutura por Trás do Futuro Descentralizado",
      type: "conference",
      startTime: "16:00",
      endTime: "16:45",
      startDate: 0,
      endDate: 0,
      stage: "Blockchain Insights"
    },
    {
      id: 5,
      channelId: 1,
      title: "Encerramento",
      type: "conference",
      startTime: "17:55",
      endTime: "18:05",
      startDate: 0,
      endDate: 0,
      stage: "Blockchain Insights"
    },

    // Crypto Summit Stage Events (Channel 2)
    {
      id: 6,
      channelId: 2,
      title: "Construindo a Nova Infraestrutura Financeira com Bitcoin",
      type: "conference",
      startTime: "10:00",
      endTime: "10:35",
      startDate: 0,
      endDate: 0,
      stage: "Crypto Summit"
    },
    {
      id: 7,
      channelId: 2,
      title: "Airdrops ainda Valem a Pena?",
      type: "workshop",
      startTime: "10:50",
      endTime: "11:35",
      startDate: 0,
      endDate: 0,
      stage: "Crypto Summit"
    },
    {
      id: 8,
      channelId: 2,
      title: "DeFi: Soluções Presentes e Futuras",
      type: "conference",
      startTime: "12:20",
      endTime: "13:05",
      startDate: 0,
      endDate: 0,
      stage: "Crypto Summit"
    },
    {
      id: 9,
      channelId: 2,
      title: "Defiverso: Como descobrimos as grande oportunidades do DeFi",
      type: "workshop",
      startTime: "15:25",
      endTime: "15:50",
      startDate: 0,
      endDate: 0,
      stage: "Crypto Summit"
    },

    // Legalhack Stage Events (Channel 3)
    {
      id: 10,
      channelId: 3,
      title: "Estruturação jurídica para Tokenização de Ativos",
      type: "workshop",
      startTime: "10:30",
      endTime: "11:10",
      startDate: 0,
      endDate: 0,
      stage: "Legalhack"
    },
    {
      id: 11,
      channelId: 3,
      title: "Tokenização de Ativos Reais (RWA) – O Futuro do Mercado Digital",
      type: "conference",
      startTime: "11:10",
      endTime: "11:55",
      startDate: 0,
      endDate: 0,
      stage: "Legalhack"
    },
    {
      id: 12,
      channelId: 3,
      title: "Stablecoins no Brasil: A Revolução dos Meios de Pagamento",
      type: "conference",
      startTime: "12:40",
      endTime: "13:25",
      startDate: 0,
      endDate: 0,
      stage: "Legalhack"
    },

    // BRidge Stage Events (Channel 4)
    {
      id: 13,
      channelId: 4,
      title: "BNB Chain",
      type: "conference",
      startTime: "10:50",
      endTime: "11:15",
      startDate: 0,
      endDate: 0,
      stage: "BRidge"
    },
    {
      id: 14,
      channelId: 4,
      title: "Internet Tokenizada: Construindo Comunidades, Identidade e Valor na Web3",
      type: "workshop",
      startTime: "14:00",
      endTime: "14:15",
      startDate: 0,
      endDate: 0,
      stage: "BRidge"
    },

    // Regulation ROCKS Stage Events (Channel 5)
    {
      id: 15,
      channelId: 5,
      title: "Inovação, Regulação e Inclusão: Uma visão de futuro para o sistema financeiro",
      type: "conference",
      startTime: "11:00",
      endTime: "11:45",
      startDate: 0,
      endDate: 0,
      stage: "Regulation ROCKS"
    },
    {
      id: 16,
      channelId: 5,
      title: "IA, soberania de dados e nos impactos da (não) regulação",
      type: "conference",
      startTime: "12:30",
      endTime: "13:15",
      startDate: 0,
      endDate: 0,
      stage: "Regulation ROCKS"
    },
    {
      id: 17,
      channelId: 5,
      title: "Projeto Drex: Passado, Presente e Futuro",
      type: "conference",
      startTime: "14:50",
      endTime: "15:40",
      startDate: 0,
      endDate: 0,
      stage: "Regulation ROCKS"
    },
    {
      id: 18,
      channelId: 3,
      title: "Panorama Regulatório para Prestadores de Serviços de Ativos Virtuais (PSAVs)",
      type: "workshop",
      startTime: "14:55",
      endTime: "15:40",
      startDate: 0,
      endDate: 0,
      stage: "Legalhack"
    },
    {
      id: 19,
      channelId: 5,
      title: "O desafio da regulação global das finanças verdes (Thiago)",
      type: "conference",
      startTime: "16:25",
      endTime: "17:10",
      startDate: 0,
      endDate: 0,
      stage: "Regulation ROCKS"
    },
    {
      id: 20,
      channelId: 5,
      title: "CBDCs e Stablecoins: Qual o papel de cada uma? (Fabio e Rodrigoh)",
      type: "conference",
      startTime: "17:10",
      endTime: "17:55",
      startDate: 0,
      endDate: 0,
      stage: "Regulation ROCKS"
    },

    // RWA Summit Stage Events (Channel 6)
    {
      id: 21,
      channelId: 6,
      title: "Criptoeconomia 2026: Perspectivas e Riscos (Bernado Srur)",
      type: "conference",
      startTime: "11:35",
      endTime: "12:20",
      startDate: 0,
      endDate: 0,
      stage: "RWA Summit"
    },
    {
      id: 22,
      channelId: 6,
      title: "Custódia Crypto: Soluções e Desafios Atuais",
      type: "workshop",
      startTime: "15:05",
      endTime: "15:30",
      startDate: 0,
      endDate: 0,
      stage: "RWA Summit"
    },

    // Sebrae Stage Events (Channel 7)
    {
      id: 23,
      channelId: 7,
      title: "Como captar recursos para sua startup",
      type: "workshop",
      startTime: "12:15",
      endTime: "12:55",
      startDate: 0,
      endDate: 0,
      stage: "Sebrae"
    },

    // LFDT - BRAZIL CHAPTER Stage Events (Channel 8)
    {
      id: 24,
      channelId: 8,
      title: "Aplicações Reais de Hyperledger Fabric e Besu",
      type: "workshop",
      startTime: "13:30",
      endTime: "14:20",
      startDate: 0,
      endDate: 0,
      stage: "LFDT - BRAZIL CHAPTER"
    },
    {
      id: 25,
      channelId: 8,
      title: "Identidade Digital Descentralizada: Casos, Tecnologias e Perspectivas",
      type: "conference",
      startTime: "14:20",
      endTime: "15:10",
      startDate: 0,
      endDate: 0,
      stage: "LFDT - BRAZIL CHAPTER"
    },
    {
      id: 26,
      channelId: 8,
      title: "DeFi, Web3 e o Futuro da Infraestrutura Financeira Global",
      type: "conference",
      startTime: "15:10",
      endTime: "16:00",
      startDate: 0,
      endDate: 0,
      stage: "LFDT - BRAZIL CHAPTER"
    },
    {
      id: 27,
      channelId: 8,
      title: "A Inovação Financeira em Curso no Brasil – Panorama Atual sobre Stablecoins, DREX e Soluções Descentralizadas no Sistema Financeiro Nacional",
      type: "conference",
      startTime: "16:00",
      endTime: "16:50",
      startDate: 0,
      endDate: 0,
      stage: "LFDT - BRAZIL CHAPTER"
    },

    // AUGUST 7TH EVENTS (Day 1) - Real Schedule
    // Digital Finance Stage Events (Channel 9) - Day 2
    {
      id: 28,
      channelId: 9,
      title: "Drex, Reservas Tokenizadas, Stablecoins e Segurança ao Redor do Mundo (joao paulo)",
      type: "conference",
      startTime: "09:30",
      endTime: "10:10",
      startDate: 1,
      endDate: 1,
      stage: "Digital Finance",
      speakers: ["João Paulo"],
      description: "Discussão sobre as principais iniciativas de moedas digitais e stablecoins globalmente."
    },
    {
      id: 29,
      channelId: 9,
      title: "Drex e Outras Iniciativas Globais: Inter&Co, BIS e Valor",
      type: "conference",
      startTime: "10:10",
      endTime: "10:50",
      startDate: 1,
      endDate: 1,
      stage: "Digital Finance"
    },
    {
      id: 30,
      channelId: 9,
      title: "Infraestrutura On-Chain para Stablecoins: DeFi, RWAs e Liquidez Global",
      type: "conference",
      startTime: "10:50",
      endTime: "11:35",
      startDate: 1,
      endDate: 1,
      stage: "Digital Finance"
    },
    {
      id: 31,
      channelId: 9,
      title: "Stablecoins as Global Settlement Infrastructure: the new SWIFT?",
      type: "conference",
      startTime: "11:35",
      endTime: "11:55",
      startDate: 1,
      endDate: 1,
      stage: "Digital Finance"
    },
    {
      id: 32,
      channelId: 9,
      title: "Soluções de Interoperabilidade para o Drex",
      type: "conference",
      startTime: "13:00",
      endTime: "13:40",
      startDate: 1,
      endDate: 1,
      stage: "Digital Finance"
    },

    // CRIA Stage Events (Channel 10) - Day 2
    {
      id: 33,
      channelId: 10,
      title: "Conectando Inovação e Supervisão: Os caminhos do NEXUS e do LEAP",
      type: "conference",
      startTime: "10:50",
      endTime: "11:40",
      startDate: 1,
      endDate: 1,
      stage: "CRIA"
    },
    {
      id: 34,
      channelId: 10,
      title: "O que mudou? Regulações recentes e seus impactos no mercado",
      type: "conference",
      startTime: "15:20",
      endTime: "15:55",
      startDate: 1,
      endDate: 1,
      stage: "CRIA"
    },

    // BRidge Stage Events (Channel 4) - Day 2
    {
      id: 35,
      channelId: 4,
      title: "Permaneça Humano: A Importância de Provar a Humanidade na Era da IA",
      type: "conference",
      startTime: "11:00",
      endTime: "11:25",
      startDate: 1,
      endDate: 1,
      stage: "BRidge"
    },
    {
      id: 36,
      channelId: 4,
      title: "A Era do Genius Act: O Que Isso Significa para as Stablecoins e os Pagamentos Globais",
      type: "conference",
      startTime: "15:30",
      endTime: "16:15",
      startDate: 1,
      endDate: 1,
      stage: "BRidge"
    },

    // Sebrae Stage Events (Channel 7) - Day 2
    {
      id: 37,
      channelId: 7,
      title: "Mercado de trabalho em blockchain",
      type: "conference",
      startTime: "11:15",
      endTime: "11:55",
      startDate: 1,
      endDate: 1,
      stage: "Sebrae"
    },

    // Blockchain Insights Stage Events (Channel 1) - Day 2
    {
      id: 38,
      channelId: 1,
      title: "Explorando o Futuro - Quando o Blockchain se encontra com a Computação Quântica",
      type: "conference",
      startTime: "12:10",
      endTime: "12:35",
      startDate: 1,
      endDate: 1,
      stage: "Blockchain Insights"
    },
    {
      id: 39,
      channelId: 1,
      title: "Humanos, Redes e um Futuro Digital",
      type: "conference",
      startTime: "17:10",
      endTime: "17:35",
      startDate: 1,
      endDate: 1,
      stage: "Blockchain Insights"
    },

    // RWA Summit Stage Events (Channel 6) - Day 2
    {
      id: 40,
      channelId: 6,
      title: "Conectando Blockchain com o Mundo Real",
      type: "conference",
      startTime: "12:35",
      endTime: "13:00",
      startDate: 1,
      endDate: 1,
      stage: "RWA Summit"
    },
    {
      id: 41,
      channelId: 6,
      title: "RWA – Construindo Ativos Tokenizados para o Mundo",
      type: "conference",
      startTime: "15:20",
      endTime: "15:45",
      startDate: 1,
      endDate: 1,
      stage: "RWA Summit"
    },

    // Crypto Summit Stage Events (Channel 2) - Day 2
    {
      id: 42,
      channelId: 2,
      title: "IA - Convergência entre Blockchain e Inteligência Artificial",
      type: "conference",
      startTime: "14:55",
      endTime: "15:20",
      startDate: 1,
      endDate: 1,
      stage: "Crypto Summit"
    },
    {
      id: 43,
      channelId: 2,
      title: "Afinal, a Blockchain é Anônima ou Rastreável?",
      type: "conference",
      startTime: "18:05",
      endTime: "18:50",
      startDate: 1,
      endDate: 1,
      stage: "Crypto Summit"
    }
  ];

  return events;
};

// Helper function to check if an event is currently live
export const isEventLive = (event, currentTime) => {
  const now = currentTime;
  const today = now.getDate();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  const eventStartHour = parseInt(event.startTime.split(':')[0]);
  const eventStartMinute = parseInt(event.startTime.split(':')[1]);
  const eventEndHour = parseInt(event.endTime.split(':')[0]);
  const eventEndMinute = parseInt(event.endTime.split(':')[1]);
  
  const currentTotalMinutes = currentHour * 60 + currentMinute;
  const eventStartTotalMinutes = eventStartHour * 60 + eventStartMinute;
  const eventEndTotalMinutes = eventEndHour * 60 + eventEndMinute;
  
  return event.startDate <= today && event.endDate >= today &&
         currentTotalMinutes >= eventStartTotalMinutes && 
         currentTotalMinutes <= eventEndTotalMinutes;
};

// Helper function to get events for a specific channel and date
export const getEventsForChannelAndDate = (events, channelId, dateIndex) => {
  return events.filter(event => 
    event.channelId === channelId && 
    event.startDate <= dateIndex && 
    event.endDate >= dateIndex
  );
};

 