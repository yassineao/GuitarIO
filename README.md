# GuitarIO

A comprehensive guitar learning platform that combines interactive lessons, AI-powered assistance, and modern web technologies to help musicians master the guitar.

## 🌐 Live Demo

Experience GuitarIO live: [https://guitar-io.vercel.app/](https://guitar-io.vercel.app/)

## 🚀 Features

- **Interactive Guitar Lessons**: Structured learning path with chapters and exercises
- **Chord Diagrams & Charts**: Visual chord representations for guitar and piano
- **Tab Rendering & Playback**: Display and play guitar tablature using AlphaTab
- **AI-Powered Chat**: Get help from AI assistants for music theory and practice
- **Song Integration**: Connect with Songsterr API for additional song resources
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Modern UI built with Next.js and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 with React 18
- **Styling**: Tailwind CSS with custom components
- **UI Library**: NextUI
- **State Management**: React hooks and SWR
- **Audio**: Tone.js for music playback
- **Charts**: Custom chord visualization components
- **Database**: Vercel Postgres with Prisma ORM

### Backend
- **Framework**: Spring Boot 3.5.5
- **Language**: Java 21
- **Database**: PostgreSQL
- **Security**: Spring Security
- **ORM**: Spring Data JPA (Hibernate)

### Key Dependencies
- **AI Integration**: Google AI SDK, OpenAI
- **Music Processing**: AlphaTab, ChordPro, ChordSheet.js
- **Authentication**: JWT, bcrypt
- **HTTP Client**: Axios
- **Drag & Drop**: React DnD

## 📁 Project Structure

```
GuitarIO/
├── GuitarIO_Backend/
│   └── springboot/          # Spring Boot authentication service
│       ├── src/main/java/org/authentification/
│       ├── Dockerfile
│       └── pom.xml
└── GuitarIO_Frontend/       # Next.js web application
    ├── components/          # React components
    │   ├── cyberpunk/       # Main app components
    │   └── lessons/         # Lesson-related components
    ├── pages/               # Next.js pages and API routes
    │   ├── api/            # Backend API endpoints
    │   └── Chapters/       # Lesson chapters
    ├── public/             # Static assets
    ├── styles/             # CSS stylesheets
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and pnpm
- Java 21
- PostgreSQL database
- Docker (optional, for containerized deployment)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GuitarIO/GuitarIO_Frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file with:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
   POSTGRES_URL=your-postgres-connection-string
   POSTGRES_USER=your-db-user
   POSTGRES_PASSWORD=your-db-password
   POSTGRES_DATABASE=your-db-name
   JWT_SECRET=your-jwt-secret
   ```

4. **Database Setup**
   ```bash
   pnpm run seed
   ```

5. **Run Tests**
   ```bash
   pnpm run test
   ```
   For test coverage:
   ```bash
   pnpm run test:coverage
   ```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd ../GuitarIO_Backend/springboot
   ```

2. **Configure Database**
   Update `application.properties` or environment variables for PostgreSQL connection

3. **Run Tests**
   ```bash
   ./mvnw test
   ```

4. **Run Spring Boot Application**
   ```bash
   ./mvnw spring-boot:run
   ```
   The API will be available at [http://localhost:8080](http://localhost:8080)

## 🐳 Docker Deployment

### Backend
```bash
cd GuitarIO_Backend/springboot
docker build -t guitar-io-backend .
docker run -p 8080:8080 guitar-io-backend
```

### Frontend
```bash
cd GuitarIO_Frontend
docker build -t guitar-io-frontend .
docker run -p 3000:3000 guitar-io-frontend
```

## 📚 Available Scripts

### Frontend
- `pnpm run dev` / `npm run dev` - Start development server
- `pnpm run build` / `npm run build` - Build for production
- `pnpm run start` / `npm start` - Start production server
- `pnpm run lint` / `npm run lint` - Run ESLint
- `pnpm run seed` / `npm run seed` - Seed the database
- `npm test` / `pnpm run test` - Run tests
- `npm run test:coverage` / `pnpm run test:coverage` - Run tests with coverage

### Backend
- `./mvnw clean compile` - Compile the project
- `./mvnw spring-boot:run` - Run the application
- `./mvnw test` - Run tests
- `./mvnw package` - Package for deployment

## 🔧 API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration

### Music Data
- `GET /api/chord` - Get chord information
- `GET /api/tabs` - Get guitar tabs
- `GET /api/songsterr` - Songsterr API integration

### Lessons
- `GET /api/lessons` - Get available lessons
- `GET /api/lessons/[id]` - Get specific lesson

### AI Chat
- `POST /api/chat` - Interact with AI assistant

## � Testing

### Backend Tests
- **Unit Tests**: Service layer testing with Mockito
  - `UserServiceTest`: User registration, authentication, and validation
  - `JwtServiceTest`: JWT token generation and parsing
- **Integration Tests**: Controller testing with Spring Boot Test
  - `UserControllerTest`: Authentication endpoints (register, login)

### Frontend Tests
- **Component Tests**: React component testing with Jest and React Testing Library
  - `Note.test.js`: Note component rendering and props
  - `ChordChart.test.js`: Chord chart component functionality
- **API Tests**: Authentication API testing
  - `login.test.js`: Login API function testing with mocked fetch

### Running Tests

**Frontend:**
```bash
cd GuitarIO_Frontend
npm install  # or pnpm install
npm test
npm run test:coverage
```

**Backend:**
```bash
cd GuitarIO_Backend/springboot
./mvnw test
```

### Test Coverage
- Backend: Service layer and basic controller functionality
- Frontend: React components and API utilities
- All tests include proper mocking and edge case handling

## �🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [AlphaTab](https://www.alphatab.net/) for guitar tablature rendering
- [VexFlow](https://vexflow.com/) for music notation
- [Next.js](https://nextjs.org/) for the React framework
- [Spring Boot](https://spring.io/projects/spring-boot) for the backend framework
- [Songsterr](https://www.songsterr.com/) for guitar tab resources

## 📞 Support

For questions or support, please open an issue on GitHub or contact the development team.

---

**Happy Playing! 🎸**