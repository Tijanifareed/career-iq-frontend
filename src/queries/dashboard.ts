// src/queries/dashboard.ts
import { useQuery } from "@tanstack/react-query";
import { dashboardKeys } from "./keys";
import { fetchDashboardStats, fetchRecentApplications } from "../apis/dashboard";

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: fetchDashboardStats,
  });
}

export function useRecentApplications() {
  return useQuery({
    queryKey: dashboardKeys.recent(),
    queryFn: fetchRecentApplications,
  });
}
