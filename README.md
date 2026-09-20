# Actions Lab

Actions Lab is a small full-stack learning project for practicing GitHub Actions. It has an Express backend, a browser frontend, automated tests, a build step, and a Docker image workflow.

This is the test project to learn.

## Run locally

```bash
npm install
npm run dev

```

Open <http://localhost:3000>.

Useful commands:

```bash
npm test       # run backend tests
npm run lint   # syntax-check frontend and backend JavaScript
npm run build  # create dist/ from public/
npm start      # run production-style server
```

## GitHub Actions exercises

1. Push this repository to GitHub and open a pull request. Read the checks created by `.github/workflows/ci.yml`.
2. Break a test or syntax error, push again, and inspect the failed job logs.
3. Change the Node matrix to include another version.
4. Add a new test for completing a lesson.
5. Make the build produce a second artifact, then download it in a later job.
6. Run `.github/workflows/docker.yml` from the Actions tab with **Run workflow**.
7. Add a deployment job that depends on `validate` with `needs: validate`.

## Project map

- `server.js`: API routes and static file server.
- `public/`: frontend UI.
- `test/`: backend tests using Node's built-in test runner.
- `scripts/build.js`: intentionally simple build step for artifact practice.
- `.github/workflows/`: CI and container workflows.
