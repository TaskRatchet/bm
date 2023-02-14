import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "preact/hooks";
import { ACCESS_TOKEN, AUTH_URL, LAST_LOGIN, logOut } from "./auth";
import { getGoals } from "./bm";

export default function useGoals() {
  const [int, setInt] = useState(1);
  const reset = () => setInt(1);

  return {
    ...useQuery(
      ["goals"],
      () => {
        setInt(Math.min(int * 2, 60));
        return getGoals(ACCESS_TOKEN);
      },
      {
        enabled: !!ACCESS_TOKEN,
        refetchInterval: () => int * 1000,
        refetchIntervalInBackground: false,
        retry: false,
        onError: (err: AxiosError) => {
          if (err.response?.status !== 401) return;
          logOut();
          if (LAST_LOGIN && LAST_LOGIN < Date.now() - 1000 * 60 * 10) {
            window.location.assign(AUTH_URL);
          }
        },
      }
    ),
    reset,
  };
}
