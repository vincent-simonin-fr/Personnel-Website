# Yuno IT frontend

## Introduction

This is the frontend of the Yuno IT project: a Next.js application (App Router, every page prerendered) using HeroUI and Tailwind CSS, in French, English and German.

## Prerequisites

- Node.js 24 (the version used by the CI)
- npm 10 or higher

The contact form needs the `NEXT_PUBLIC_EMAILJS_*` variables in `.env.local`.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/twentycent/yuno-it.git
```

2. Navigate to the frontend directory:

```bash
cd frontend
```

3. Install the dependencies exactly as locked (`npm install` could rewrite `package-lock.json`):

```bash
npm ci
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`.

## Checks

There is no test runner. Before a commit: `npm run typecheck`, `npm run lint` and `npm run build` (production build, webpack). The CI runs the same on every pull request.

## Reacts Bits

[lien](https://reactbits.dev)
