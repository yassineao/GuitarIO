# GuitarIO Backend - Quick Start Guide

## What's Been Implemented

Your GuitarIO backend now supports a complete music learning ecosystem with the following features:

### 1. **Lessons with Rich Content**
- Lessons can now include difficulty levels
- Link chords, scales, music theory, strumming patterns, and song exercises
- Organize with tags for easy filtering

### 2. **Chord Management**
- Store chord information with fingering patterns
- Categorize by difficulty level
- Tag for easy discovery

### 3. **Scale Library**
- Comprehensive scale reference
- Practice exercises per scale
- Root note filtering

### 4. **Music Theory Content**
- Educational explanations for music concepts
- Links to audio/visual resources
- Timestamps for tracking updates

### 5. **Strumming Patterns**
- Learn various strumming techniques
- Tempo (BPM) information
- Genre/style classification

### 6. **Song Exercises**
- Practice songs with learning objectives
- Pre-defined chord sequences
- Artist, genre, and difficulty filtering

## Getting Started

### Step 1: Build and Run
```bash
cd GuitarIO_Backend/springboot
mvn clean install
mvn spring-boot:run
```

### Step 2: Verify Database
The application will automatically create all tables via Hibernate.

### Step 3: Populate Initial Data

#### Create Tags
```bash
curl -X POST http://localhost:8080/tags \
  -H "Content-Type: application/json" \
  -d '{"name": "Beginner Fundamentals", "description": "Basic guitar concepts"}'

curl -X POST http://localhost:8080/tags \
  -H "Content-Type: application/json" \
  -d '{"name": "Rock", "description": "Rock music techniques"}'

curl -X POST http://localhost:8080/tags \
  -H "Content-Type: application/json" \
  -d '{"name": "Jazz", "description": "Jazz guitar concepts"}'
```

#### Create Chords
```bash
curl -X POST http://localhost:8080/chords \
  -H "Content-Type: application/json" \
  -d '{
    "name": "C Major",
    "notation": "Cmaj",
    "description": "The most common starting chord",
    "fingeringPattern": "x32010",
    "difficultyLevel": "BEGINNER"
  }'

curl -X POST http://localhost:8080/chords \
  -H "Content-Type: application/json" \
  -d '{
    "name": "G Major",
    "notation": "Gmaj",
    "description": "Another fundamental chord",
    "fingeringPattern": "320003",
    "difficultyLevel": "BEGINNER"
  }'

curl -X POST http://localhost:8080/chords \
  -H "Content-Type: application/json" \
  -d '{
    "name": "D Major",
    "notation": "Dmaj",
    "description": "Essential for many songs",
    "fingeringPattern": "xx0232",
    "difficultyLevel": "BEGINNER"
  }'
```

#### Create Scales
```bash
curl -X POST http://localhost:8080/scales \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pentatonic Minor",
    "root": "A",
    "pattern": "1-3-4-5-7",
    "description": "Most popular scale for soloing",
    "difficultyLevel": "INTERMEDIATE"
  }'

curl -X POST http://localhost:8080/scales \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Major Scale",
    "root": "C",
    "pattern": "W-W-H-W-W-W-H",
    "description": "The foundation of western music",
    "exercises": "Practice ascending and descending patterns",
    "difficultyLevel": "INTERMEDIATE"
  }'
```

#### Create Strumming Patterns
```bash
curl -X POST http://localhost:8080/strumming-patterns \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Basic Downstroke",
    "description": "Simple downstroke pattern",
    "pattern": "D D D D",
    "bpm": 90,
    "musicStyleTag": "General",
    "difficultyLevel": "BEGINNER"
  }'

curl -X POST http://localhost:8080/strumming-patterns \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Folk Pattern",
    "description": "Common folk strumming",
    "pattern": "D D U U D U",
    "bpm": 120,
    "musicStyleTag": "Folk",
    "difficultyLevel": "BEGINNER"
  }'
```

#### Create Music Theory Content
```bash
curl -X POST http://localhost:8080/music-theory \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Understanding Chord Progressions",
    "content": "A chord progression is a sequence of chords...",
    "examples": "I-IV-V (C-F-G in C major)",
    "difficultyLevel": "INTERMEDIATE"
  }'

curl -X POST http://localhost:8080/music-theory \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Music Intervals",
    "content": "An interval is the distance between two notes...",
    "examples": "Major thirds, perfect fifths, etc.",
    "difficultyLevel": "BEGINNER"
  }'
```

#### Create Song Exercises
```bash
curl -X POST http://localhost:8080/song-exercises \
  -H "Content-Type: application/json" \
  -d '{
    "songTitle": "Wonderwall",
    "artist": "Oasis",
    "description": "Great practice song for chord transitions",
    "chordSequence": "Em7 - Dsus2 - A7sus4",
    "difficultyLevel": "INTERMEDIATE",
    "musicGenre": "Rock",
    "bpm": "87",
    "strummingTips": "Focus on clean transitions between chords"
  }'

curl -X POST http://localhost:8080/song-exercises \
  -H "Content-Type: application/json" \
  -d '{
    "songTitle": "Knocking on Heaven'\''s Door",
    "artist": "Bob Dylan",
    "description": "Perfect for beginners - only 3 chords",
    "chordSequence": "G - D - Am - D",
    "difficultyLevel": "BEGINNER",
    "musicGenre": "Folk",
    "bpm": "72",
    "strummingTips": "Slow and steady strumming"
  }'
```

### Step 4: Link Resources to Lessons

Update a lesson to include all your new content:

```bash
curl -X PUT http://localhost:8080/lessons/{lessonId} \
  -H "Content-Type: application/json" \
  -d '{
    "chapter": "Beginner Foundations",
    "number": 1,
    "content": "Learn the basics of guitar playing...",
    "description": "Get started with essential chords and techniques",
    "difficultyLevel": "BEGINNER",
    "chords": [{"id": 1}, {"id": 2}],
    "scales": [{"id": 1}],
    "theories": [{"id": 1}],
    "strummingPatterns": [{"id": 1}],
    "songExercises": [{"id": 2}],
    "tags": [{"id": 1}]
  }'
```

## API Documentation

### Base URL
```
http://localhost:8080
```

### Available Endpoints

#### Tags
- `GET /tags` - List all tags
- `POST /tags` - Create tag
- `GET /tags/{id}` - Get specific tag
- `PUT /tags/{id}` - Update tag
- `DELETE /tags/{id}` - Delete tag

#### Chords
- `GET /chords` - List all chords
- `GET /chords/{id}` - Get specific chord
- `GET /chords/difficulty/{level}` - Get by difficulty (BEGINNER, INTERMEDIATE, ADVANCED, EXPERT)
- `POST /chords` - Create chord
- `PUT /chords/{id}` - Update chord
- `DELETE /chords/{id}` - Delete chord

#### Scales
- `GET /scales` - List all scales
- `GET /scales/{id}` - Get specific scale
- `GET /scales/difficulty/{level}` - Get by difficulty
- `GET /scales/root/{root}` - Get by root note (e.g., "C", "G", "A")
- `POST /scales` - Create scale
- `PUT /scales/{id}` - Update scale
- `DELETE /scales/{id}` - Delete scale

#### Music Theory
- `GET /music-theory` - List all explanations
- `GET /music-theory/{id}` - Get specific explanation
- `GET /music-theory/difficulty/{level}` - Get by difficulty
- `POST /music-theory` - Create explanation
- `PUT /music-theory/{id}` - Update explanation
- `DELETE /music-theory/{id}` - Delete explanation

#### Strumming Patterns
- `GET /strumming-patterns` - List all patterns
- `GET /strumming-patterns/{id}` - Get specific pattern
- `GET /strumming-patterns/difficulty/{level}` - Get by difficulty
- `GET /strumming-patterns/style/{style}` - Get by music style
- `POST /strumming-patterns` - Create pattern
- `PUT /strumming-patterns/{id}` - Update pattern
- `DELETE /strumming-patterns/{id}` - Delete pattern

#### Song Exercises
- `GET /song-exercises` - List all exercises
- `GET /song-exercises/{id}` - Get specific exercise
- `GET /song-exercises/difficulty/{level}` - Get by difficulty
- `GET /song-exercises/artist/{artist}` - Get by artist
- `GET /song-exercises/genre/{genre}` - Get by genre
- `POST /song-exercises` - Create exercise
- `PUT /song-exercises/{id}` - Update exercise
- `DELETE /song-exercises/{id}` - Delete exercise

#### Lessons (Enhanced)
- `GET /lessons` - List user's lessons
- `GET /lessons/{chapter}/{number}` - Get specific lesson
- `POST /lessons` - Create lesson
- `POST /lessons/assign` - Assign lesson to user
- (All updated to support new fields)

## Difficulty Levels
```
BEGINNER       - Suitable for absolute beginners
INTERMEDIATE   - Requires basic knowledge
ADVANCED       - For intermediate players
EXPERT         - For advanced/professional players
```

## File Structure
```
src/main/java/org/authentification/
├── entity/
│   ├── DifficultyLevel.java (enum)
│   ├── Tag.java
│   ├── Chord.java
│   ├── Scale.java
│   ├── MusicTheoryExplanation.java
│   ├── StrummingPattern.java
│   ├── SongExercise.java
│   └── Lesson.java (updated)
├── repository/
│   ├── TagRepository.java
│   ├── ChordRepository.java
│   ├── ScaleRepository.java
│   ├── MusicTheoryExplanationRepository.java
│   ├── StrummingPatternRepository.java
│   └── SongExerciseRepository.java
├── service/
│   ├── TagService.java
│   ├── ChordService.java
│   ├── ScaleService.java
│   ├── MusicTheoryService.java
│   ├── StrummingPatternService.java
│   └── SongExerciseService.java
├── controller/
│   ├── TagController.java
│   ├── ChordController.java
│   ├── ScaleController.java
│   ├── MusicTheoryController.java
│   ├── StrummingPatternController.java
│   └── SongExerciseController.java
└── dto/
    ├── TagDTO.java
    ├── ChordDTO.java
    ├── ScaleDTO.java
    ├── MusicTheoryExplanationDTO.java
    ├── StrummingPatternDTO.java
    ├── SongExerciseDTO.java
    └── LessonDTO.java
```

## Next Steps

1. **Populate More Data**: Add more chords, scales, songs to your database
2. **Frontend Integration**: Update frontend to use new endpoints
3. **User Progress Tracking**: Implement progress tracking for exercises
4. **Recommendations**: Add AI-powered learning path recommendations
5. **Multimedia**: Add support for audio/video attachments

## Troubleshooting

### Migrations Not Running
If tables aren't created, ensure in `application.properties`:
```
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### CORS Issues
Add CORS configuration to handle frontend requests from different origins.

### Security
Ensure all endpoints are properly secured with JWT authentication where needed.

## Support Resources

See `MUSIC_FEATURES_DOCUMENTATION.md` for detailed feature documentation.
See `MUSIC_FEATURES_SCHEMA.sql` for database schema information.
