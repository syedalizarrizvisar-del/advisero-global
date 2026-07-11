import { createApp } from "./app";

const PORT = Number(process.env.PORT ?? 4001);
const HOST = process.env.HOST ?? "0.0.0.0";

const app = createApp();

app.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`[advisero-global-server] listening on http://${HOST}:${PORT}`);
});
