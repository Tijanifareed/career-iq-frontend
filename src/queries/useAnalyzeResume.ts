// src/queries/useAnalyzeResume.ts
import { useMutation } from "@tanstack/react-query";
import { analyzeResume } from "../apis/ai";

export function useAnalyzeResume() {
  return useMutation({
    mutationFn: analyzeResume,
  });
}
