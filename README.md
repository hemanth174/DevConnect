# DevConnect — Graph Database Take-Home

A small graph-backed developer discovery application built for the Wexa AI CognoDB assignment.

## Stack

- React + Vite frontend
- Node.js + Express backend
- Official Neo4j JavaScript driver
- CognoDB Cloud using Bolt/openCypher

## Why a graph database?

DevConnect is centered on relationships: developers have skills, work on projects, projects use technologies, and developers know other developers. Questions such as "which skills belong to developers I know?" require graph traversal and are more natural to express as connected patterns than as repeated relational joins.

## Graph model

- `Developer`
- `Skill`
- `Project`
- `Technology`

Relationships:

- `Developer -[:HAS_SKILL]-> Skill`
- `Developer -[:WORKED_ON]-> Project`
- `Project -[:USES]-> Technology`
- `Developer -[:KNOWS]-> Developer`

## Multi-hop query

The application exposes a network view based on:

`Developer -[:KNOWS]-> Developer -[:HAS_SKILL]-> Skill`

This is a two-hop traversal used to discover skills through a developer's direct connections.

## Run locally

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Add your CognoDB values to .env
npm run seed
npm run dev
```

Backend runs at `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend normally runs at `http://localhost:5173`.

## Environment variables

Backend:

- `COGNODB_URI`
- `COGNODB_USERNAME`
- `COGNODB_PASSWORD`
- `PORT`

Frontend:

- `VITE_API_URL`

Do not commit `.env` files.
