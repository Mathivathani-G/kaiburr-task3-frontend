# Kaiburr - Task 3: Web UI (React + TypeScript + Ant Design) &
# Kaiburr - Task 4 : CI-CD pipeline for The Web UI 


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
git clone https://github.com/Mathivathani-G/kaiburr-task3-frontend.git
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
```
**Initial Setup**


![Setup](https://github.com/Mathivathani-G/kaiburr-task3-frontend/blob/main/Screenshots%20Task3/Initial%20Setup%20Frontend%20and%20Backend.png)

**Create Task**


![Create task](https://github.com/Mathivathani-G/kaiburr-task3-frontend/blob/main/Screenshots%20Task3/Create%20task%20frontend.png)

**Execute Task**


![execution](https://github.com/Mathivathani-G/kaiburr-task3-frontend/blob/main/Screenshots%20Task3/Execute%20Task%20fronend%20%26%20Backend.png)

**Execution History**


![execution history](https://github.com/Mathivathani-G/kaiburr-task3-frontend/blob/main/Screenshots%20Task3/Execution%20History%20Frontend.png)

**Execution History along with Backend**


![Setup](https://github.com/Mathivathani-G/kaiburr-task3-frontend/blob/main/Screenshots%20Task3/Execution%20History%20Frontend%20%26%20Backend.png)

**Search Task**


![Search](https://github.com/Mathivathani-G/kaiburr-task3-frontend/blob/main/Screenshots%20Task3/Search%20Task%20Frontend.png)

**Delete Task**


![delete](https://github.com/Mathivathani-G/kaiburr-task3-frontend/blob/main/Screenshots%20Task3/Delete%20Task%20Frontend.png)

**Deleted Task Backend**


![deleted](https://github.com/Mathivathani-G/kaiburr-task3-frontend/blob/main/Screenshots%20Task3/Delete%20Task%20Frontend%20%26%20Backend.png)



# Kaiburr — Task 4 : CI-CD pipeline for Web UI (React + TypeScript + Ant Design)

## CI/CD Pipeline – Frontend

This project uses **GitHub Actions** to implement a fully automated **CI/CD pipeline** for the React frontend.

### Workflow

1. **Trigger**: Workflow runs on every `push` or `pull request` to the `main` branch.
2. **Steps**:
   - **Checkout code** from GitHub.
   - **Setup Node.js** environment.
   - **Install dependencies** using `npm install`.
   - **Build React app** using `npx vite build`.
   - **Build Docker image** using the provided `Dockerfile`.
   - **Run Docker container** to verify the frontend app.
3. **Dockerfile**:
   - Stage 1: Build React app (`npx vite build`).
   - Stage 2: Serve app using Nginx on port `80`.

### Outcome

- Docker image for frontend is built automatically on every push.
- Workflow status visible in GitHub Actions.
- Frontend app can be run locally using:

```bash
docker build -t kaiburr-frontend:latest .
docker run -p 3000:80 kaiburr-frontend:latest
