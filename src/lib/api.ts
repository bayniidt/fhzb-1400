const API_BASE_URL = 'http://localhost:3001/api';

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  return res.json();
}

export async function cleanupMedia(oldUrl: string) {
  const res = await fetch(`${API_BASE_URL}/media/cleanup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ oldUrl }),
  });
  return res.json();
}

export async function fetchContent() {
  const res = await fetch(`${API_BASE_URL}/content`);
  return res.json();
}

export async function updateContent(key: string, data: { zh: string, en: string, module?: string, type?: string }) {
  const res = await fetch(`${API_BASE_URL}/content/${key}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchNews() {
  const res = await fetch(`${API_BASE_URL}/news`);
  return res.json();
}

export async function postNews(data: any) {
  const res = await fetch(`${API_BASE_URL}/news`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateNews(id: number, data: any) {
  const res = await fetch(`${API_BASE_URL}/news/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteNews(id: number) {
  const res = await fetch(`${API_BASE_URL}/news/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}

export async function fetchQuestions() {
  const res = await fetch(`${API_BASE_URL}/questions`);
  return res.json();
}

export async function updateQuestion(id: number, data: any) {
  const res = await fetch(`${API_BASE_URL}/questions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function postQuestion(data: any) {
  const res = await fetch(`${API_BASE_URL}/questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteQuestion(id: number) {
  const res = await fetch(`${API_BASE_URL}/questions/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}

// Navigation Endpoints
export async function fetchNavigation() {
  const res = await fetch(`${API_BASE_URL}/navigation`);
  return res.json();
}

export async function postNavigation(data: any) {
  const res = await fetch(`${API_BASE_URL}/navigation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateNavigation(id: number, data: any) {
  const res = await fetch(`${API_BASE_URL}/navigation/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteNavigation(id: number) {
  const res = await fetch(`${API_BASE_URL}/navigation/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}

// Contact Info Endpoints
export async function fetchContactInfo() {
  const res = await fetch(`${API_BASE_URL}/contact`);
  return res.json();
}

export async function updateContactInfo(id: number, data: any) {
  const res = await fetch(`${API_BASE_URL}/contact/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
