# Nicotex Begin (React + FastAPI)

This repo contains a small full‑stack implementation based on the screens in `Screen shots Nicotex App.docx`.

## Quick start

### 1) Backend (FastAPI)

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\pip install -r requirements.txt
.\.venv\Scripts\uvicorn app.main:app --reload --port 8000
```

### 2) Frontend (React)

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Notes

- API: `GET /api/overview`, `GET /api/journey`, `GET /api/tasks/{id}`, `POST /api/tasks/{id}/complete`, `POST /api/calls/schedule`, `POST /api/reflections`.
- Seed data (task titles/durations/content): `backend/app/seed.py`.
- Progress is stored locally in `backend/.data/state.json` (delete it to reset).

