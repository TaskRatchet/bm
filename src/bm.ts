import axios from "axios";

export async function getGoals(token: string) {
  const url = `https://www.beeminder.com/api/v1/users/me/goals.json?access_token=${token}`;
  const response = await axios.get(url);

  return response.data;
}

export async function refreshGraph(token: string, goal: string) {
  const url = `https://www.beeminder.com/api/v1/users/me/goals/${goal}/refresh_graph.json?access_token=${token}`;
  const response = await axios.get(url);

  return response.data;
}

export async function createDatapoint(
  token: string,
  goal: string,
  value: number
) {
  const url = `https://www.beeminder.com/api/v1/users/me/goals/${goal}/datapoints.json?access_token=${token}`;
  const response = await axios.post(url, {
    value,
  });

  return response.data;
}
