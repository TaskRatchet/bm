import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "preact/hooks";
import { API_KEY, logout } from "./auth";
import { getGoals } from "./bm";

export default function useGoals() {
  const [int, setInt] = useState(1);
  const reset = () => setInt(1);

  return {
    ...useQuery(
      ["goals"],
      () => {
        setInt(Math.min(int * 2, 60));
        return getGoals(API_KEY);
      },
      {
        enabled: !!API_KEY,
        refetchInterval: () => int * 1000,
        refetchIntervalInBackground: false,
        retry: false,
        onError: (err: AxiosError) => {
          switch (err.response?.status) {
            case 401:
              logout();
              break;
            default:
              console.error(err);
          }
        },
      }
    ),
    reset,
  };
}
