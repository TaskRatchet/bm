import { useQuery } from "@tanstack/react-query";
import { API_KEY, logout } from "./auth";
import { getGoals, Goal } from "./bm";

export default function useGoals() {
  return useQuery<Goal[], Response>(["goals"], () => getGoals(), {
    enabled: !!API_KEY,
    refetchInterval: (d) => (d?.find((g) => g.queued) ? 3000 : 60000),
    refetchIntervalInBackground: false,
    retry: false,
    onError: (err: Response) => {
      if (err.status === 401) return logout();
      console.error(err);
    },
  });
}
