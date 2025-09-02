// src/apis/dashboard.ts
import api from "../apis/api";

export type DashboardStats = {
  applied: number;
  interview: number;
  offer: number;
  rejected: number;
};

export type RecentItem = {
  id: number | string;
  job_title: string;
  company_name: string;
  status: "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED" | string;
  time_ago?: string; // e.g. "2 days ago"
};

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const res = await api.get("/applications/stats");
  return res.data.data; // expect { applied, interview, offer, rejected }
}

export async function fetchRecentApplications(): Promise<RecentItem[]> {
  const res = await api.get("/applications/recent");
  return res.data; // expect array of recent items
}
