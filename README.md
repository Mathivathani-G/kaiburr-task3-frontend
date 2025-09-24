# Kaiburr — Task 3: Web UI (React + TypeScript + Ant Design)

**Name**: Mathivathani G

**Date**: 23-09-2025  

---

##  Overview
This project is my implementation of **Task 3** from the Kaiburr assessment.  

It is a **frontend Web UI** built with:
- **React 19**
- **TypeScript**
- **Vite**
- **Ant Design** (UI components)

The UI connects to the **Task Manager backend** (Task 1: Spring Boot + MongoDB) and allows complete task lifecycle management:
- Create / Update tasks
- List and search tasks
- Run commands and view execution results
- Show execution history
- Delete tasks

This README explains **how I set up, ran, tested, and verified** everything. I have also included screenshots with date/time and my name in terminal, as requested in the instructions.

## Setup & Installation

### 1. Prerequisites
- **Node.js 18+** and **npm**
- **Backend from Task 1** running locally on `http://localhost:8080`
- **MongoDB** running via Docker (from Task 1):
  ```bash
  docker run -d --name kaiburr-mongo -p 27017:27017 -v kaiburr_mongo_data:/data/db mongo:6.0

**Clone repository**
```bash
git clone https://github.com/<your-username>/kaiburr-task3-frontend.git
cd kaiburr-task3-frontend
```
**Install dependencies**
```
npm install
```
**Development server**
Start frontend with Vite:
```
npm run dev
```
VITE vX.Y.Z ready in ...
Local:   http://localhost:5173/


**Project Structure**

```graphql
kaiburr-task3-frontend/
├─ src/
│  ├─ App.tsx                  # Main app layout
│  ├─ main.tsx                 # React entry
│  ├─ api.ts                   # API client (fetch calls to backend)
│  ├─ types.ts                 # Task and TaskExecution interfaces
│  └─ components/
│     ├─ TaskForm.tsx          # Add/Edit Task form
│     ├─ TaskTable.tsx         # Table with CRUD + Run buttons
│     └─ ExecHistoryModal.tsx  # Modal showing execution history
├─ vite.config.ts              # Proxy config (/api → backend)
├─ package.json
├─ README.md
└─ screenshots/                # Screenshots 

