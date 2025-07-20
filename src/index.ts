import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`MCP server listening at http://localhost:${port}`);
}); 