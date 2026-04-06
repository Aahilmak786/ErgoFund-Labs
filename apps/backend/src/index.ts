import 'dotenv/config';
import { loadEnv } from './config/env.js';
import { createApp } from './app.js';

const env = loadEnv(process.env);
const { app } = createApp(env);

app.listen(env.PORT, () => {
  console.log(`backend listening on :${env.PORT}`);
});
