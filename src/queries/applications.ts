import { useQuery } from "@tanstack/react-query";
import { fetchApplications, fetchApplicationById } from "../apis/applications";

// Get all applications
export const useApplications = () => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });
};

// Get single application
export const useApplication = (id: string) => {
  return useQuery({
    queryKey: ["applications", id],
    queryFn: () => fetchApplicationById(id),
    enabled: !!id,
  });
};
