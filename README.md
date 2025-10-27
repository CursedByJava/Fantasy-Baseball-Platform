## Quick Start

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Design Choices & Architecture

### Frontend Architecture

The application follows a component-based architecture with React and TypeScript:

- **Context-based State Management**: Uses React Context for team management and notifications
- **Responsive UI**: Tailwind CSS for adaptive layouts and consistent styling
- **Type Safety**: TypeScript for enhanced development experience and runtime safety

### Player Scoring System

The scoring algorithm (`utils/scoring.ts`) considers multiple factors:

For Hitters:
- Batting average (weighted heavily)
- Home runs (4 points each)
- RBIs (1 point each)
- Stolen bases (2 points each)

For Pitchers:
- ERA (inverse scaling)
- WHIP (inverse scaling)
- K/9 ratio
- Saves (5 points each)

### Draft System

The draft system implements several key features:

1. **Position Validation**: Prevents drafting multiple players at the same position
2. **Smart Suggestions**: Recommends players based on:
   - Team needs (missing positions)
   - Player scoring
   - Statistical projections

3. **Real-time Updates**: Uses React's efficient rendering system for immediate UI updates

### Data Management

- Currently uses in-memory storage with localStorage persistence
- Prepared for backend integration with proper TypeScript interfaces
- Optimized for frequent updates during draft sessions

## Future Enhancements

1. **Backend Integration**
   - RESTful API for player data
   - WebSocket for real-time draft updates
   - Persistent storage with PostgreSQL

2. **Advanced Features**
   - Live stat updates during games
   - Trade proposals
   - Waiver wire system
   - Advanced analytics and projections

3. **Performance Optimizations**
   - Implement virtualization for large player lists
   - Add server-side pagination
   - Optimize bundle size

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

