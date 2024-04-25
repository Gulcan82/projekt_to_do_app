// server.ts

import todoRoutes from './routes/todoRoutes';
import express, { Request, Response } from 'express'





const app = express();
const PORT = process.env.PORT || 4000;

// Middleware für das Parsen von JSON-Daten im Anfragekörper
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// Middleware für die Verwendung der Todo-Routen
app.use(todoRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Hallo Welt! Ich bin ein Express-Server');
});

// Starten des Servers
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;