import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

const lessons = [
  { id: 1, title: 'Workflow basics', description: 'Learn events, jobs, steps, and runners.', duration: '20 min', completed: false },
  { id: 2, title: 'Continuous integration', description: 'Run linting and tests on every pull request.', duration: '30 min', completed: false },
  { id: 3, title: 'Artifacts and environments', description: 'Share build output and deploy safely.', duration: '25 min', completed: false }
];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'github-actions-learning-app' });
});

app.get('/api/lessons', (_request, response) => {
  response.json(lessons);
});

app.patch('/api/lessons/:id', (request, response) => {
  const lesson = lessons.find((item) => item.id === Number(request.params.id));

  if (!lesson) {
    response.status(404).json({ error: 'Lesson not found' });
    return;
  }

  lesson.completed = Boolean(request.body.completed);
  response.json(lesson);
});

app.use((_request, response) => {
  response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

export { app };

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(port, () => {
    console.log(`GitHub Actions Learning app running at http://localhost:${port}`);
  });
}