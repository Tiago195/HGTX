import * as express from 'express';
import 'dotenv/config';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'okay' });
});

export { app };
