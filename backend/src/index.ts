import express from 'express';
import connectToDatabase from './db';
import { getRouter } from './routes';

const app = express();

app.use(express.json());
app.use('/api', getRouter());

const PORT = 3000;

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Szerver fut: http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('❌ Nem sikerült csatlakozni az adatbázishoz:', err);
});