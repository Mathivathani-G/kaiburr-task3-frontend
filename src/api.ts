import type { Task, TaskExecution } from './types';

const BASE = import.meta.env.VITE_API_BASE ?? '/api';

async function handleResponse(res: Response) {
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || res.statusText);
  }
  return res.json().catch(() => null);
}

export async function listTasks(): Promise<Task[]> {
  const res = await fetch(`${BASE}/tasks`);
  return handleResponse(res);
}

export async function getTask(id: string): Promise<Task> {
  const res = await fetch(`${BASE}/tasks/${id}`);
  return handleResponse(res);
}

export async function createOrUpdateTask(task: Task): Promise<Task> {
  const res = await fetch(`${BASE}/tasks`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return handleResponse(res);
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${BASE}/tasks/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Delete failed');
}

export async function searchTasks(namePart: string): Promise<Task[]> {
  const res = await fetch(`${BASE}/tasks/search?name=${encodeURIComponent(namePart)}`);
  return handleResponse(res);
}

export async function executeTask(id: string): Promise<TaskExecution> {
  const res = await fetch(`${BASE}/tasks/${id}/execute`, { method: 'PUT' });
  return handleResponse(res);
}
