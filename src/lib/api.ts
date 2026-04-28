const API_BASE_URL = '/fhzb/api';

import type {
  ContactRole,
  ContactSubmission,
  CreateContactSubmissionInput,
  UpdateContactSubmissionInput,
} from "@/types/contact-submission";

async function parseJsonResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      data && typeof data === "object" && "error" in data && typeof data.error === "string"
        ? data.error
        : "Request failed";
    throw new Error(message);
  }

  return data as T;
}

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

export async function getNews() {
  const res = await fetch(`${API_BASE_URL}/news`);
  return res.json();
}

export async function createNews(data: any) {
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

// Gateway Endpoints
export async function fetchGateways() {
  const res = await fetch(`${API_BASE_URL}/gateways`);
  return res.json();
}

export async function updateGateway(id: number, data: any) {
  const res = await fetch(`${API_BASE_URL}/gateways/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Member Endpoints
export async function fetchMembers() {
  const res = await fetch(`${API_BASE_URL}/members`);
  return res.json();
}

export async function createMember(data: { name: string, phone: string }) {
  const res = await fetch(`${API_BASE_URL}/members`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateMember(id: number, data: { name: string, phone: string }) {
  const res = await fetch(`${API_BASE_URL}/members/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteMember(id: number) {
  const res = await fetch(`${API_BASE_URL}/members/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}

// Login Endpoint
export async function login(phone: string) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  });
  return res.json();
}

export async function createContactSubmission(data: CreateContactSubmissionInput) {
  const res = await fetch(`${API_BASE_URL}/contact-submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return parseJsonResponse<{ id: number; success: boolean }>(res);
}

export async function fetchContactSubmissions(role?: ContactRole) {
  const query = role ? `?role=${role}` : "";
  const res = await fetch(`${API_BASE_URL}/contact-submissions${query}`);
  return parseJsonResponse<ContactSubmission[]>(res);
}

export async function updateContactSubmission(id: number, data: UpdateContactSubmissionInput) {
  const res = await fetch(`${API_BASE_URL}/contact-submissions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return parseJsonResponse<{ success: boolean; submission: ContactSubmission }>(res);
}

export async function deleteContactSubmission(id: number) {
  const res = await fetch(`${API_BASE_URL}/contact-submissions/${id}`, {
    method: "DELETE",
  });

  return parseJsonResponse<{ success: boolean }>(res);
}
