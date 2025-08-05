# Blockchain RIO 2025 - Timeline

A responsive, dark-themed React web application that displays a timeline grid of the Blockchain RIO 2025 event schedule. The app replicates the visual design of a TV program guide but adapted for blockchain/tech events with a modern, cyberpunk aesthetic. This timeline shows all events from August 6th, 2025 across 6 different stages.

## Features

- **Dark Tech Theme**: Modern dark interface with neon green accents and cyberpunk styling
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Current time indicator and live event highlighting
- **Interactive Events**: Click on events to view details, watch live streams, or access external links
- **Multiple Event Types**: Conferences, workshops, hackathons, and meetups with color-coded badges
- **Event Stages**: 6 dedicated stages: Blockchain Insights, Crypto Summit, Legalhack, BRidge, Regulation ROCKS, and RWA Summit
- **Time Navigation**: Navigate through different time periods with arrow controls
- **Live Indicators**: Pulsing indicators for currently live events

## Tech Stack

- **React 18**: Modern React with hooks and functional components
- **Styled Components**: CSS-in-JS for component styling
- **Lucide React**: Beautiful, customizable icons
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blockchain-event-timeline
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── TimelineGrid.js      # Main timeline grid component
│   ├── ChannelList.js       # Stage sidebar with event stages
│   └── EventBlock.js        # Individual event display component
├── utils/
│   └── eventData.js         # Blockchain RIO 2025 event data and utility functions
├── App.js                   # Main application component
└── index.js                 # React entry point
```

## Customization

### Adding New Events

Edit `src/utils/eventData.js` to add new Blockchain RIO events:

```javascript
{
  id: 28,
  channelId: 1, // 1=Blockchain Insights, 2=Crypto Summit, 3=Legalhack, 4=BRidge, 5=Regulation ROCKS, 6=RWA Summit
  title: "Your Event Title",
  type: "conference", // conference, workshop, hackathon, meetup
  startTime: "10:00",
  endTime: "11:00",
  startDate: 0, // 0 = August 6th, 1 = August 7th, etc.
  endDate: 0,
  stage: "Blockchain Insights" // Stage name
}
```

### Styling

The app uses styled-components for styling. Main theme colors:
- Primary: `#00ff88` (neon green)
- Background: `#0a0a0a` to `#16213e` (dark gradient)
- Text: `#ffffff` (white)
- Accent: `#ff6b6b`, `#ffe66d`, `#4ecdc4` (event type colors)

### Adding New Stages

To add new event stages, update the `channels` array in `src/components/ChannelList.js`:

```javascript
{
  id: 7,
  number: '7',
  name: 'New Stage',
  icon: YourIcon,
  color: '#your-color'
}
```

## Features in Detail

### Event Types
- **Conference**: Green badge - Major blockchain conferences and summits
- **Workshop**: Red badge - Hands-on learning sessions
- **Hackathon**: Yellow badge - Coding competitions and build sessions
- **Meetup**: Cyan badge - Community gatherings and networking

### Live Events
Events that are currently happening are highlighted with:
- Neon green border and background
- Pulsing live indicator
- Enhanced hover effects

### Responsive Behavior
- **Desktop**: Full timeline grid with all features
- **Tablet**: Condensed layout with horizontal scrolling
- **Mobile**: Stacked layout with touch-friendly controls

## Future Enhancements

- [ ] Real-time event data integration
- [ ] User authentication and personalization
- [ ] Event filtering and search
- [ ] Calendar integration
- [ ] Push notifications for upcoming events
- [ ] Multi-language support
- [ ] Dark/light theme toggle

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 