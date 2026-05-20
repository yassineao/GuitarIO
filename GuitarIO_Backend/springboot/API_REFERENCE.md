# GuitarIO Music Learning API Reference

## Quick Reference

### Base URL
```
http://localhost:8080
```

### Content-Type
```
application/json
```

---

## Tags API
**Manage topic/category tags**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tags` | List all tags |
| GET | `/tags/{id}` | Get tag by ID |
| POST | `/tags` | Create new tag |
| PUT | `/tags/{id}` | Update tag |
| DELETE | `/tags/{id}` | Delete tag |

#### Create Tag
```json
POST /tags
{
  "name": "string (unique)",
  "description": "string"
}
```

---

## Chords API
**Manage chord library**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/chords` | List all chords |
| GET | `/chords/{id}` | Get chord by ID |
| GET | `/chords/difficulty/{level}` | Filter by difficulty |
| POST | `/chords` | Create new chord |
| PUT | `/chords/{id}` | Update chord |
| DELETE | `/chords/{id}` | Delete chord |

#### Difficulty Levels
- `BEGINNER`
- `INTERMEDIATE`
- `ADVANCED`
- `EXPERT`

#### Create Chord
```json
POST /chords
{
  "name": "string (e.g., 'C Major')",
  "notation": "string (e.g., 'Cmaj')",
  "description": "string",
  "fingeringPattern": "string (e.g., 'x32010')",
  "difficultyLevel": "BEGINNER|INTERMEDIATE|ADVANCED|EXPERT",
  "tags": [
    { "id": 1 }
  ]
}
```

#### Example Response
```json
{
  "id": 1,
  "name": "C Major",
  "notation": "Cmaj",
  "description": "Basic major chord",
  "fingeringPattern": "x32010",
  "difficultyLevel": "BEGINNER",
  "tags": []
}
```

---

## Scales API
**Manage scale library**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/scales` | List all scales |
| GET | `/scales/{id}` | Get scale by ID |
| GET | `/scales/difficulty/{level}` | Filter by difficulty |
| GET | `/scales/root/{root}` | Filter by root note |
| POST | `/scales` | Create new scale |
| PUT | `/scales/{id}` | Update scale |
| DELETE | `/scales/{id}` | Delete scale |

#### Create Scale
```json
POST /scales
{
  "name": "string (e.g., 'Pentatonic Minor')",
  "root": "string (e.g., 'A')",
  "pattern": "string (e.g., '1-3-4-5-7')",
  "description": "string",
  "exercises": "string (JSON or text)",
  "difficultyLevel": "BEGINNER|INTERMEDIATE|ADVANCED|EXPERT",
  "tags": [
    { "id": 1 }
  ]
}
```

#### Root Note Examples
- C, C#/Db, D, D#/Eb, E, F, F#/Gb, G, G#/Ab, A, A#/Bb, B

---

## Music Theory API
**Educational music theory content**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/music-theory` | List all explanations |
| GET | `/music-theory/{id}` | Get explanation by ID |
| GET | `/music-theory/difficulty/{level}` | Filter by difficulty |
| POST | `/music-theory` | Create new explanation |
| PUT | `/music-theory/{id}` | Update explanation |
| DELETE | `/music-theory/{id}` | Delete explanation |

#### Create Explanation
```json
POST /music-theory
{
  "topic": "string",
  "content": "string (required, can be long text)",
  "examples": "string",
  "audioOrVisualReference": "string (URLs or references)",
  "difficultyLevel": "BEGINNER|INTERMEDIATE|ADVANCED|EXPERT",
  "tags": [
    { "id": 1 }
  ]
}
```

#### Response Includes
- `createdAt` - ISO 8601 timestamp
- `updatedAt` - ISO 8601 timestamp

---

## Strumming Patterns API
**Strumming technique library**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/strumming-patterns` | List all patterns |
| GET | `/strumming-patterns/{id}` | Get pattern by ID |
| GET | `/strumming-patterns/difficulty/{level}` | Filter by difficulty |
| GET | `/strumming-patterns/style/{style}` | Filter by music style |
| POST | `/strumming-patterns` | Create new pattern |
| PUT | `/strumming-patterns/{id}` | Update pattern |
| DELETE | `/strumming-patterns/{id}` | Delete pattern |

#### Create Pattern
```json
POST /strumming-patterns
{
  "name": "string (e.g., 'Folk Pattern')",
  "description": "string",
  "pattern": "string (e.g., 'D D U U D U')",
  "bpm": 120,
  "musicStyleTag": "string (e.g., 'Folk', 'Rock')",
  "difficultyLevel": "BEGINNER|INTERMEDIATE|ADVANCED|EXPERT",
  "tags": [
    { "id": 1 }
  ]
}
```

#### Pattern Notation
- `D` - Down strum
- `U` - Up strum
- `-` - Rest/skip
- `|` - Beat separator

---

## Song Exercises API
**Practice songs with learning objectives**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/song-exercises` | List all exercises |
| GET | `/song-exercises/{id}` | Get exercise by ID |
| GET | `/song-exercises/difficulty/{level}` | Filter by difficulty |
| GET | `/song-exercises/artist/{artist}` | Filter by artist |
| GET | `/song-exercises/genre/{genre}` | Filter by genre |
| POST | `/song-exercises` | Create new exercise |
| PUT | `/song-exercises/{id}` | Update exercise |
| DELETE | `/song-exercises/{id}` | Delete exercise |

#### Create Exercise
```json
POST /song-exercises
{
  "songTitle": "string",
  "artist": "string",
  "description": "string",
  "lyrics": "string",
  "chordSequence": "string (e.g., 'C - G - Am - F')",
  "difficultyLevel": "BEGINNER|INTERMEDIATE|ADVANCED|EXPERT",
  "musicGenre": "string",
  "bpm": "string (e.g., '120')",
  "strummingTips": "string",
  "requiredChords": [
    { "id": 1 }
  ],
  "tags": [
    { "id": 1 }
  ]
}
```

#### Common Genres
- Rock
- Pop
- Folk
- Country
- Jazz
- Blues
- Classical
- Alternative

---

## Enhanced Lessons API
**Updated to support new music learning features**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/lessons` | Get user's lessons |
| GET | `/lessons/{chapter}/{number}` | Get specific lesson |
| POST | `/lessons` | Create lesson |
| POST | `/lessons/assign` | Assign lesson to user |
| PUT | `/lessons/{id}` | Update lesson |

#### Create/Update Lesson with Resources
```json
POST /lessons
PUT /lessons/{id}
{
  "chapter": "string",
  "number": 1,
  "content": "string",
  "description": "string",
  "difficultyLevel": "BEGINNER|INTERMEDIATE|ADVANCED|EXPERT",
  "chords": [
    { "id": 1 },
    { "id": 2 }
  ],
  "scales": [
    { "id": 1 }
  ],
  "theories": [
    { "id": 1 }
  ],
  "strummingPatterns": [
    { "id": 1 }
  ],
  "songExercises": [
    { "id": 1 }
  ],
  "tags": [
    { "id": 1 }
  ]
}
```

---

## Common Response Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Server Error |

---

## Error Response Format
```json
{
  "error": "Description of the error"
}
```

---

## Authentication
All endpoints require JWT authentication in the `Authorization` header:
```
Authorization: Bearer {token}
```

---

## Pagination (Future)
Currently all endpoints return full datasets. Pagination will be added in future versions.

---

## Rate Limiting
No rate limiting currently implemented. Subject to change.

---

## Examples

### Get All Beginner Chords
```bash
curl http://localhost:8080/chords/difficulty/BEGINNER
```

### Create a New Chord
```bash
curl -X POST http://localhost:8080/chords \
  -H "Content-Type: application/json" \
  -d '{
    "name": "A Minor",
    "notation": "Am",
    "description": "Natural minor chord",
    "fingeringPattern": "x02210",
    "difficultyLevel": "BEGINNER"
  }'
```

### Get Intermediate Scales
```bash
curl http://localhost:8080/scales/difficulty/INTERMEDIATE
```

### Get Pentatonic Minor Scales
```bash
curl http://localhost:8080/scales/root/A
```

### Get Rock Genre Songs
```bash
curl http://localhost:8080/song-exercises/genre/Rock
```

### Get Songs by Artist
```bash
curl http://localhost:8080/song-exercises/artist/Oasis
```

### Get Folk Strumming Patterns
```bash
curl http://localhost:8080/strumming-patterns/style/Folk
```

---

## Version History

### v1.0 (Current)
- Initial release
- Full CRUD for Tags, Chords, Scales, Music Theory, Strumming Patterns, Song Exercises
- Difficulty level filtering
- Enhanced Lesson entity with relationships
- Comprehensive REST API

---

## Support
For issues or questions, refer to:
- `MUSIC_FEATURES_DOCUMENTATION.md` - Detailed feature documentation
- `QUICK_START.md` - Setup and initial data population
- `MUSIC_FEATURES_SCHEMA.sql` - Database schema details
