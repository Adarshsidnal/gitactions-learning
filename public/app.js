const lessonsElement = document.querySelector('#lessons');
const progressElement = document.querySelector('#progress');
const countElement = document.querySelector('#lesson-count');

function renderLessons(lessons) {
  const completed = lessons.filter((lesson) => lesson.completed).length;
  progressElement.textContent = `${Math.round((completed / lessons.length) * 100)}%`;
  countElement.textContent = `${completed} / ${lessons.length}`;
  lessonsElement.innerHTML = lessons.map((lesson) => `
    <article class="lesson ${lesson.completed ? 'done' : ''}">
      <span class="lesson-number">0${lesson.id}</span>
      <div><h3>${lesson.title}</h3><p>${lesson.description}</p></div>
      <span class="duration">${lesson.duration}</span>
      <button class="complete" data-lesson-id="${lesson.id}">${lesson.completed ? 'COMPLETED' : 'MARK DONE'}</button>
    </article>
  `).join('');
}

async function loadLessons() {
  const response = await fetch('/api/lessons');
  renderLessons(await response.json());
}

lessonsElement.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-lesson-id]');
  if (!button) return;
  const lessonId = button.dataset.lessonId;
  const completed = button.textContent === 'MARK DONE';
  const response = await fetch(`/api/lessons/${lessonId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ completed }) });
  if (response.ok) await loadLessons();
});

loadLessons().catch(() => { lessonsElement.textContent = 'Could not load lessons. Is the API running?'; });