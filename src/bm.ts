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
  goalval: number;
  rate: number;
  weekends_off: boolean;
  goaldate: string;
  svg_url: string;
  safesum: string;
  goal_type: string;
  description: string;
  graph_url: string;
  thumb_url: string;
  healthkitmetric: string;
  autodata_config: object;
  deadline: number;
  leadtime: number;
  alertstart: number;
  use_defaults: boolean;
  id: string;
  ephem: boolean;
  panic: number;
  updated_at: number;
  burner: string;
  yaw: number;
  lane: number;
  runits: string;
  frozen: boolean;
  lost: boolean;
  won: boolean;
  contract: object;
  delta_text: string;
  limsumdays: string;
  baremin: string;
  baremintotal: string;
  roadstatuscolor: string;
  lasttouch: string;
  coasting: boolean;
  fineprint: object;
  gunits: string;
  yaxis: string;
  maxflux: object;
  tmin: object;
  tmax: object;
  initday: number;
  initval: number;
  curday: number;
  curval: number;
  lastday: number;
  dir: number;
  kyoom: boolean;
  odom: boolean;
  noisy: boolean;
  aggday: string;
  plotall: boolean;
  steppy: boolean;
  rosy: boolean;
  movingav: boolean;
  aura: boolean;
  numpts: number;
  road: object;
  roadall: object;
  fullroad: object;
  secret: boolean;
  pledge: number;
  mathishard: object;
  headsum: string;
  datapublic: boolean;
  graphsum: string;
  rah: number;
  last_datapoint: object;
  callback_url: object;
  tags: string[];
  recent_data: {
    canonical: string;
    comment: string;
    created_at: string;
    daystamp: string;
    fulltext: string;
    id: {
      $oid: string;
    };
    measured_at: string;
    origin: string;
    urtext?: string;
    value: number;
  }[];
  dueby: object;
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
    comment: "via bm.taskratchet.com",
  });

  return response.data;
}
