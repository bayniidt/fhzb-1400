export type ContactRole = "project" | "partner" | "club" | "institution" | "media";

export type SubmissionStatus = "pending" | "contacted" | "closed";

export interface SubmissionDetail {
  key: string;
  labelZh: string;
  labelEn: string;
  value: string;
}

export interface CreateContactSubmissionInput {
  role: ContactRole;
  roleLabelZh: string;
  roleLabelEn: string;
  submitterName: string;
  phone: string;
  email?: string;
  companyOrOrg?: string;
  region?: string;
  summary?: string;
  details: SubmissionDetail[];
}

export interface ContactSubmission extends CreateContactSubmissionInput {
  id: number;
  status: SubmissionStatus;
  adminNote: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateContactSubmissionInput {
  status: SubmissionStatus;
  adminNote: string;
}
