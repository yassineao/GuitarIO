# GuitarIO

GuitarIO is a guitar learning app with a Next.js frontend and a Spring Boot backend. It includes structured lessons, chord and note tools, authentication, and a RAG-powered AI teaching assistant that answers from lesson content.

## Current Flow

The app is split into two services:

- `GuitarIO_Frontend`: Next.js UI, pages, lesson views, note/chord experiences, and small API helpers/proxies.
- `GuitarIO_Backend/springboot`: Spring Boot API for auth, lessons, user progress, music data, embeddings, and RAG.

Frontend requests use `GuitarIO_Frontend/lib/api-url.js`. Set `NEXT_PUBLIC_API_URL` to the backend URL and the frontend will call the backend the same way login does.

The Gemini key is server-side only. Keep it as `GEMINI_API_KEY` in backend/server environments. Never put Gemini keys in public browser environment variables.

## Features

- Login and registration with JWT-backed Spring Security.
- Lesson chapters and individual lesson pages.
- AI Teaching page that calls `POST /rag/ask`.
- RAG flow using lesson embeddings, pgvector similarity search, and Google GenAI through Spring AI.
- Major notes and dynamic note pages such as `/notes/b`.
- Chord, scale, tag, strumming pattern, music theory, and song exercise APIs.
- Songsterr and tab-related frontend API routes.

## Tech Stack

Frontend:

- Next.js 16
- React 18
- CSS modules/global styles used by existing pages
- Jest and React Testing Library
- Vercel-friendly environment variables

Backend:

- Java 21
- Spring Boot 3.5.5
- Spring Security
- Spring Data JPA
- PostgreSQL
- pgvector through Spring AI
- Google GenAI chat and embeddings
- Maven

## Project Structure

```text
GuitarIO/
|-- GuitarIO_Backend/
|   `-- springboot/
|       |-- src/main/java/org/authentification/
|       |   |-- controller/
|       |   |-- dto/
|       |   |-- entity/
|       |   |-- repository/
|       |   `-- service/
|       |-- src/main/resources/application.yml
|       |-- .env.example
|       |-- Dockerfile
|       `-- pom.xml
|-- GuitarIO_Frontend/
|   |-- components/
|   |-- lib/
|   |-- pages/
|   |-- public/
|   |-- styles/
|   |-- .env.example
|   `-- package.json
`-- README.md
```

## Prerequisites

- Node.js 18+
- npm or pnpm
- Java 21
- PostgreSQL
- pgvector enabled in PostgreSQL for lesson similarity search
- Gemini API key for AI/RAG
- Docker optional

## Environment Setup

Real `.env` files are ignored by git. Use the committed example files as templates.

Frontend local env:

```powershell
Copy-Item GuitarIO_Frontend\.env.example GuitarIO_Frontend\.env.local
```

Minimum frontend values:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
API_URL=http://localhost:8080
NEXT_PUBLIC_PYTHON_API_URL=http://localhost:5000
PYTHON_API_URL=http://localhost:5000
```

Backend local env:

```powershell
Copy-Item GuitarIO_Backend\springboot\.env.example GuitarIO_Backend\springboot\.env
```

Minimum backend values:

```env
JWT_SECRET=replace-with-a-32-char-secret
GEMINI_API_KEY=replace-with-your-server-side-gemini-key
URLDATABASE=jdbc:postgresql://localhost:5432/guitario
PGUSER=postgres
PGPASSWORD=postgres
```

For cloud deployment, set those values in the provider dashboard as secrets/sensitive variables. If a real Gemini key was ever committed or shown publicly, rotate it in Google AI Studio or Google Cloud.

## Run Locally

Start the backend:

```powershell
cd GuitarIO_Backend\springboot
.\mvnw.cmd spring-boot:run
```

The backend defaults to `http://localhost:8080`.

Start the frontend in another terminal:

```powershell
cd GuitarIO_Frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:3000`.

## RAG Teaching Assistant

The teaching assistant lives on the frontend at:

```text
/teaching
```

Frontend helper:

```text
GuitarIO_Frontend/pages/api/rag.js
```

Backend endpoint:

```http
POST /rag/ask
```

Request body:

```json
{
  "question": "How should I practice B major?",
  "limit": 4
}
```

Response shape:

```json
{
  "answer": "Practice-focused answer from the assistant.",
  "sources": [
    {
      "id": 1,
      "title": "Lesson #1",
      "chapter": "Basics",
      "number": 1,
      "description": "Lesson description"
    }
  ]
}
```

How it works:

1. The backend validates the question.
2. `EmbeddingService` creates an embedding using Gemini.
3. `LessonRepository.findSimilarLessons` searches lesson embeddings with pgvector.
4. `RagService` builds a grounded teaching prompt from the retrieved lessons and user progress.
5. Spring AI calls Google GenAI and returns an answer plus lesson sources.

## Important API Routes

Backend:

- `GET /health`
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `GET /lessons`
- `POST /lessons`
- `POST /lessons/assign`
- `GET /lessons/lesson/{chapter}/{number}`
- `GET /lessons/chapters-with-numbers`
- `POST /rag/ask`
- `GET /chords`
- `GET /scales`
- `GET /tags`
- `GET /music-theory`
- `GET /strumming-patterns`
- `GET /song-exercises`

Frontend pages:

- `/`
- `/options`
- `/teaching`
- `/majorNotes`
- `/notes`
- `/notes/[id]`
- `/Chapters`
- `/Chapters/[chapter]/[lesson]`
- `/login`
- `/register`

## Scripts

Frontend:

```powershell
cd GuitarIO_Frontend
npm run dev
npm run build
npm run start
npm test
npm run test:coverage
```

Backend:

```powershell
cd GuitarIO_Backend\springboot
.\mvnw.cmd clean compile
.\mvnw.cmd test
.\mvnw.cmd package
.\mvnw.cmd spring-boot:run
```

## Docker

Build and run the Spring Boot backend:

```powershell
cd GuitarIO_Backend\springboot
docker build -t guitar-io-backend .
docker run --rm -p 8000:8000 `
  -e PORT=8000 `
  -e JWT_SECRET=replace-with-a-32-char-secret `
  -e GEMINI_API_KEY=replace-with-your-server-side-gemini-key `
  -e URLDATABASE=jdbc:postgresql://host.docker.internal:5432/guitario `
  -e PGUSER=postgres `
  -e PGPASSWORD=postgres `
  guitar-io-backend
```

When using Docker, point the frontend to:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
API_URL=http://localhost:8000
```

## Deployment Notes

Backend:

- Set `PORT` if your host requires a specific port.
- Set `JWT_SECRET`, `GEMINI_API_KEY`, database URL/user/password as sensitive env vars.
- Koyeb-style `DATABASE_URL` is supported when provided as `postgres://user:password@host:5432/dbname`.
- The Dockerfile currently uses `public.ecr.aws/docker/library/maven:3.9.9-eclipse-temurin-21` for both build and runtime to avoid Docker Hub TLS timeouts and the separate `eclipse-temurin:21-jre` pull that timed out before.

Frontend:

- Set `NEXT_PUBLIC_API_URL` to the deployed backend URL.
- Do not put Gemini keys in `NEXT_PUBLIC_*` variables.
- `GEMINI_API_KEY` may be used only by server-side Next.js API routes such as `pages/api/chat.js`.

## Security Rules

- Commit `.env.example` files only.
- Never commit `.env`, `.env.local`, real database credentials, JWT secrets, or API keys.
- Keep `GEMINI_API_KEY` server-side.
- Rotate any key that was pasted into chat, committed, logged, or exposed in a browser bundle.
- Keep production `JWT_SECRET` long, random, and different from local development.

## Verification

Useful checks after changes:

```powershell
cd GuitarIO_Frontend
npm run build
```

```powershell
cd GuitarIO_Backend\springboot
.\mvnw.cmd clean compile
```

To scan for Gemini-related env usage:

```powershell
rg -n "GEMINI" .
```

## Notes For Future Work

- Keep frontend backend calls going through `lib/api-url.js`.
- Keep RAG behavior in `RagService`, `EmbeddingService`, and `LessonRepository`.
- If lesson content changes, regenerate/store embeddings so retrieval stays useful.
- Prefer backend endpoints for authenticated or secret-bearing work.
