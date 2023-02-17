import axios from "axios";

const API_ROOT = "https://www.beeminder.com/api/v1";

export type Goal = {
  slug: string;
  losedate: number;
  autodata?: string;
  safebuf: number;
  todayta: boolean;
  limsum: string;
  limsumdate: string;
  title: string;
  safebump: number;
  hhmmformat: boolean;
  delta: number;
  queued: boolean;
  integery: boolean;
};

export async function getGoals(token: string) {
  const url = `${API_ROOT}/users/me/goals.json?auth_token=${token}`;
  const response = await axios.get(url);

  return response.data;
}

export async function getGoal(token: string, slug: string) {
  const url = `${API_ROOT}/users/me/goals/${slug}.json?auth_token=${token}`;
  const response = await axios.get(url);

  return response.data;
}

export async function refreshGraph(token: string, goal: string) {
  const url = `${API_ROOT}/users/me/goals/${goal}/refresh_graph.json?auth_token=${token}`;
  const response = await axios.get(url);

  return response.data;
}

export async function createDatapoint(
  token: string,
  goal: string,
  value: number
) {
  const url = `${API_ROOT}/users/me/goals/${goal}/datapoints.json?auth_token=${token}`;
  const response = await axios.post(url, {
    value,
  });

  return response.data;
}
