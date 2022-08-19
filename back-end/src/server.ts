import { app } from '.';
import 'dotenv/config';

const PORT = process.env.APP_PORT || 3001;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
