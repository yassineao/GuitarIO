# GuitarIO Backend - New Music Learning Features

## Overview
This document outlines the new features added to the GuitarIO backend to support comprehensive guitar learning and music theory education.

## New Entities

### 1. **Tag** - Categorization System
- **Purpose**: Organize and categorize learning resources by topic
- **Fields**: `id`, `name`, `description`
- **Endpoint**: `/tags`

### 2. **Chord** - Chord Library
- **Purpose**: Store and manage guitar chord information
- **Fields**: 
  - `id`: Unique identifier
  - `name`: Chord name (e.g., "C Major")
  - `notation`: Standard notation (e.g., "Cmaj")
  - `description`: Detailed explanation
  - `fingeringPattern`: Visual fingering guide
  - `difficultyLevel`: BEGINNER | INTERMEDIATE | ADVANCED | EXPERT
  - `tags`: Related topics
- **Endpoint**: `/chords`
- **Query Options**:
  - `/chords/{id}` - Get specific chord
  - `/chords/difficulty/{level}` - Filter by difficulty

### 3. **Scale** - Scale Reference
- **Purpose**: Provide scale theory and exercises
- **Fields**:
  - `id`: Unique identifier
  - `name`: Scale name (e.g., "Pentatonic Minor")
  - `root`: Root note (e.g., "C")
  - `pattern`: Interval pattern
  - `description`: Explanation
  - `exercises`: Practice exercises in JSON/text format
  - `difficultyLevel`: BEGINNER | INTERMEDIATE | ADVANCED | EXPERT
  - `tags`: Related topics
- **Endpoint**: `/scales`
- **Query Options**:
  - `/scales/{id}` - Get specific scale
  - `/scales/difficulty/{level}` - Filter by difficulty
  - `/scales/root/{root}` - Filter by root note

### 4. **MusicTheoryExplanation** - Theory Content
- **Purpose**: Provide educational content on music theory
- **Fields**:
  - `id`: Unique identifier
  - `topic`: Theory topic (e.g., "Chord Progressions")
  - `content`: Main explanation (TEXT)
  - `examples`: Code/example snippets
  - `audioOrVisualReference`: Links to resources
  - `difficultyLevel`: BEGINNER | INTERMEDIATE | ADVANCED | EXPERT
  - `createdAt`: Creation timestamp
  - `updatedAt`: Last update timestamp
  - `tags`: Related topics
- **Endpoint**: `/music-theory`
- **Query Options**:
  - `/music-theory/{id}` - Get specific explanation
  - `/music-theory/difficulty/{level}` - Filter by difficulty

### 5. **StrummingPattern** - Strumming Techniques
- **Purpose**: Store and teach various strumming patterns
- **Fields**:
  - `id`: Unique identifier
  - `name`: Pattern name (e.g., "Down-Down-Up")
  - `description`: Detailed explanation
  - `pattern`: Visual representation (e.g., "D D U U D U")
  - `bpm`: Beats per minute for tempo
  - `musicStyleTag`: Associated music genre/style
  - `difficultyLevel`: BEGINNER | INTERMEDIATE | ADVANCED | EXPERT
  - `tags`: Related topics
- **Endpoint**: `/strumming-patterns`
- **Query Options**:
  - `/strumming-patterns/{id}` - Get specific pattern
  - `/strumming-patterns/difficulty/{level}` - Filter by difficulty
  - `/strumming-patterns/style/{style}` - Filter by music style

### 6. **SongExercise** - Practice Songs
- **Purpose**: Provide songs for practice with learning objectives
- **Fields**:
  - `id`: Unique identifier
  - `songTitle`: Name of the song
  - `artist`: Artist name
  - `description`: Learning objectives and notes
  - `lyrics`: Full song lyrics
  - `chordSequence`: Chord progression (e.g., "Am - Dm - G - C")
  - `difficultyLevel`: BEGINNER | INTERMEDIATE | ADVANCED | EXPERT
  - `musicGenre`: Genre classification
  - `bpm`: Tempo
  - `strummingTips`: Technique tips
  - `requiredChords`: Associated chords
  - `tags`: Related topics
- **Endpoint**: `/song-exercises`
- **Query Options**:
  - `/song-exercises/{id}` - Get specific exercise
  - `/song-exercises/difficulty/{level}` - Filter by difficulty
  - `/song-exercises/artist/{artist}` - Filter by artist
  - `/song-exercises/genre/{genre}` - Filter by genre

### 7. **Lesson** - Updated with New Features
- **New Fields Added**:
  - `difficultyLevel`: BEGINNER | INTERMEDIATE | ADVANCED | EXPERT
  - `description`: Lesson overview
  - `chords`: Associated chords (Many-to-Many)
  - `scales`: Associated scales (Many-to-Many)
  - `theories`: Associated music theory content (Many-to-Many)
  - `strummingPatterns`: Associated patterns (Many-to-Many)
  - `songExercises`: Associated songs (Many-to-Many)
  - `tags`: Topic tags (Many-to-Many)
- **Endpoint**: `/lessons` (Enhanced)

## API Endpoints Summary

### Tags
```
GET    /tags                 - List all tags
GET    /tags/{id}            - Get tag by ID
POST   /tags                 - Create tag
PUT    /tags/{id}            - Update tag
DELETE /tags/{id}            - Delete tag
```

### Chords
```
GET    /chords               - List all chords
GET    /chords/{id}          - Get chord by ID
GET    /chords/difficulty/{level}  - Filter by difficulty
POST   /chords               - Create chord
PUT    /chords/{id}          - Update chord
DELETE /chords/{id}          - Delete chord
```

### Scales
```
GET    /scales               - List all scales
GET    /scales/{id}          - Get scale by ID
GET    /scales/difficulty/{level}  - Filter by difficulty
GET    /scales/root/{root}   - Filter by root note
POST   /scales               - Create scale
PUT    /scales/{id}          - Update scale
DELETE /scales/{id}          - Delete scale
```

### Music Theory
```
GET    /music-theory         - List all explanations
GET    /music-theory/{id}    - Get explanation by ID
GET    /music-theory/difficulty/{level}  - Filter by difficulty
POST   /music-theory         - Create explanation
PUT    /music-theory/{id}    - Update explanation
DELETE /music-theory/{id}    - Delete explanation
```

### Strumming Patterns
```
GET    /strumming-patterns   - List all patterns
GET    /strumming-patterns/{id}  - Get pattern by ID
GET    /strumming-patterns/difficulty/{level}  - Filter by difficulty
GET    /strumming-patterns/style/{style}  - Filter by style
POST   /strumming-patterns   - Create pattern
PUT    /strumming-patterns/{id}  - Update pattern
DELETE /strumming-patterns/{id}  - Delete pattern
```

### Song Exercises
```
GET    /song-exercises       - List all exercises
GET    /song-exercises/{id}  - Get exercise by ID
GET    /song-exercises/difficulty/{level}  - Filter by difficulty
GET    /song-exercises/artist/{artist}  - Filter by artist
GET    /song-exercises/genre/{genre}  - Filter by genre
POST   /song-exercises       - Create exercise
PUT    /song-exercises/{id}  - Update exercise
DELETE /song-exercises/{id}  - Delete exercise
```

## Example Usage

### Create a Chord
```json
POST /chords
{
  "name": "C Major",
  "notation": "Cmaj",
  "description": "Basic major chord",
  "fingeringPattern": "x-3-2-0-1-0",
  "difficultyLevel": "BEGINNER",
  "tags": [{"id": 1}, {"id": 2}]
}
```

### Create a Scale
```json
POST /scales
{
  "name": "Pentatonic Minor",
  "root": "A",
  "pattern": "1-3-4-5-7",
  "description": "Popular scale for soloing",
  "difficultyLevel": "INTERMEDIATE"
}
```

### Create a Song Exercise
```json
POST /song-exercises
{
  "songTitle": "Wonderwall",
  "artist": "Oasis",
  "description": "Practice picking pattern and chord changes",
  "chordSequence": "Em7 - Dsus2 - A7sus4",
  "difficultyLevel": "INTERMEDIATE",
  "musicGenre": "Rock",
  "bpm": "87",
  "requiredChords": [{"id": 1}, {"id": 2}]
}
```

### Add Lesson Content
```json
PUT /lessons/{id}
{
  "chapter": "Beginner Fundamentals",
  "content": "...",
  "difficultyLevel": "BEGINNER",
  "description": "Learn basic chords and strumming",
  "chords": [{"id": 1}],
  "scales": [{"id": 1}],
  "strummingPatterns": [{"id": 1}]
}
```

## Difficulty Levels
- **BEGINNER**: Suitable for absolute beginners
- **INTERMEDIATE**: Requires basic knowledge
- **ADVANCED**: For intermediate players
- **EXPERT**: For advanced/professional players

## Data Models Relationships

```
Lesson (1) ────────── (Many) UserLesson (Many) ────────── (1) User
         └──────────────────────┘

Lesson (Many-to-Many) Chord
Lesson (Many-to-Many) Scale
Lesson (Many-to-Many) MusicTheoryExplanation
Lesson (Many-to-Many) StrummingPattern
Lesson (Many-to-Many) SongExercise
Lesson (Many-to-Many) Tag

Chord (Many-to-Many) Tag
Scale (Many-to-Many) Tag
MusicTheoryExplanation (Many-to-Many) Tag
StrummingPattern (Many-to-Many) Tag
SongExercise (Many-to-Many) Chord
SongExercise (Many-to-Many) Tag
```

## Implementation Details

### Technologies Used
- **Framework**: Spring Boot 3.5.5
- **Database**: PostgreSQL
- **ORM**: Hibernate/JPA
- **Language**: Java 21

### Key Features
1. **Type Safety**: Enum for DifficultyLevel ensures consistent data
2. **Flexible Categorization**: Tag system allows cross-cutting concerns
3. **Rich Relationships**: Many-to-many connections enable comprehensive learning paths
4. **Audit Trail**: CreatedAt/UpdatedAt timestamps for tracking changes
5. **API-First Design**: RESTful endpoints with proper HTTP status codes

## Migration Notes
To deploy these changes:
1. Run JPA/Hibernate migration to create new tables
2. Populate initial tags using the `/tags` POST endpoint
3. Add chords, scales, patterns via respective endpoints
4. Link lesson content to new resources using the relationship endpoints

## Future Enhancements
- User progress tracking for each resource type
- Learning path recommendations based on difficulty level
- Multimedia attachments (audio, video, images)
- Community ratings and comments
- AI-powered practice suggestions
