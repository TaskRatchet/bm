import { useQuery } from "@tanstack/react-query";
import { API_KEY, logout } from "./auth";
import { getGoals, Goal } from "./bm";
import queryClient from "./queryClient";

export default function useGoals() {
  return useQuery<Goal[], Response>(["goals"], () => getGoals(), {
    enabled: !!API_KEY,
    refetchInterval: () => {
      try {
        const goals = queryClient.getQueryData<Goal[]>(["goals"]);
        const queued = goals?.find((goal) => goal.queued);
        return queued ? 3000 : 60000;
      } catch (e) {
        console.error(e);
        return 60000;
      }
    },
    refetchIntervalInBackground: false,
    retry: false,
    onError: (err: Response) => {
      if (err.status === 401) return logout();
      console.error(err);
    },
  });
}
