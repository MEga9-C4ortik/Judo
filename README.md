# Judo Technique Library

An interactive reference library of judo techniques, built for the Sunway University Judo Club.

## Features

- Browse techniques by category (Nage-waza / Ne-waza)
- Search by name (case, spaces and hyphens are ignored)
- Filter by belt level
- Every technique has a Japanese name, a short description and a link to a YouTube demo

## Tech stack

React 19, Vite, React Router, CSS Modules. The React Compiler is enabled.

## Getting started

```bash
npm install
npm run dev
```

| Script             | What it does                                    |
| ------------------ | ----------------------------------------------- |
| `npm run dev`      | Start the dev server                            |
| `npm run build`    | Production build into `dist/`                   |
| `npm run preview`  | Serve the production build locally              |
| `npm run lint`     | Run ESLint                                      |
| `npm run validate` | Check `src/Data/techniques.json` for mistakes   |

## Data

All techniques live in `src/Data/techniques.json`. Run `npm run validate` after editing it.

| Field         | Meaning                                                                    |
| ------------- | -------------------------------------------------------------------------- |
| `id`          | Unique integer                                                             |
| `nameEN`      | Romanised Japanese name, e.g. `O-goshi`                                    |
| `nameJP`      | Name in kanji                                                              |
| `category`    | `Nage-waza` or `Ne-waza`                                                   |
| `difficulty`  | `Yellow`, `Orange`, `Green`, `Blue`, `Brown`, `Black` or `Not graded`      |
| `description` | Short explanation of the technique                                         |
| `youtubeID`   | 11-character YouTube video id                                              |
