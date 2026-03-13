// seeds.js
import { Pool } from '@vercel/postgres';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
});

async function seedDatabase() {
  // Define your initial data here
  const pokemons = [
    { name: 'Pikachu', vectorEmbedding: [0.5, 0.3, 0.2] },
    { name: 'Charizard', vectorEmbedding: [0.8, 0.1, 0.1] },
    // ...
  ];

  // Insert data into the database
  await pool.query(`CREATE TABLE IF NOT EXISTS pokemons (id SERIAL PRIMARY KEY, name TEXT, vector_embedding FLOAT[]);`);
  await pokemons.forEach(async (pokemon) => {
    await pool.query(`INSERT INTO pokemons (name, vector_embedding) VALUES ($1, $2)`, [pokemon.name, pokemon.vectorEmbedding]);
  });
}

seedDatabase();