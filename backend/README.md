# Nicotex Begin (Backend)

## Run (Windows PowerShell)

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\pip install -r requirements.txt
.\.venv\Scripts\uvicorn app.main:app --reload --port 8000
```

API base: `http://localhost:8000`  
Swagger: `http://localhost:8000/docs`

