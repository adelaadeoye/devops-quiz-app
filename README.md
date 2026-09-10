# DevOps &amp; Build/Release Engineering Quiz

Practice quiz app with two role tracks, modelled on [kcna-quiz-app](https://github.com/adelaadeoye/kcna-quiz-app).

| Track | Questions | Topics |
| --- | --- | --- |
| **DevOps Engineer** | 173 | CI/CD · Containers · Kubernetes · Infrastructure as Code · Cloud &amp; Networking · Observability &amp; SRE · Linux &amp; Scripting |
| **Build &amp; Release Engineer** | 154 | Build Systems · Version Control &amp; Branching · Artifacts &amp; Dependencies · Release Management · Pipeline Automation · Supply Chain &amp; Packaging |

Every question has a written explanation. Multi-select questions are labelled with how many options to pick.

## Features

- **Practice mode** — check each answer immediately and read the explanation as you go.
- **Exam mode** — answers stay hidden until you submit the whole paper.
- Topic filters, quiz length selection, and optional answer-option shuffling.
- Question navigator with answered/flagged/correct state, and flag-for-review.
- Results with per-topic breakdown, a filterable review of every question, and a "retry missed" run.
- Progress is saved to `localStorage`, so an interrupted attempt can be resumed.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` — [.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds and publishes automatically.

The workflow sets `VITE_BASE_PATH` from the repository name, so the app works at
`https://<owner>.github.io/<repo>/` without editing config. If you deploy to a custom domain or a
user/organisation page (served from `/`), set `VITE_BASE_PATH=/` in the workflow instead.

## Adding questions

Question banks live in [src/data](src/data), grouped by track and topic:

```
src/data/
├── devops/           # cicd.ts, containers.ts, kubernetes.ts, iac.ts, cloud.ts, observability.ts, linux.ts
├── buildRelease/     # buildSystems.ts, versionControl.ts, artifacts.ts, releaseManagement.ts, pipelineAutomation.ts, supplyChain.ts
└── index.ts          # assembles the two tracks
```

Each entry follows the `Question` type in [src/types.ts](src/types.ts):

```ts
{
  id: 'do-cicd-027',              // unique, stable
  topic: 'CI/CD',                 // drives topic filters and score breakdown
  difficulty: 'medium',           // 'easy' | 'medium' | 'hard'
  question: 'Why ...?',
  options: ['...', '...', '...', '...'],
  answers: [1],                   // indices into `options`; more than one = multi-select
  explanation: 'Because ...',
}
```

Add the question to the relevant topic file; the track picks it up automatically. To add a new topic,
create a file exporting a `Question[]` and spread it into the track in `src/data/index.ts`.

## Disclaimer

These questions are original study material written for interview and self-assessment practice. They
are not affiliated with, endorsed by, or drawn from any official certification exam.

## Licence

[MIT](LICENSE)
