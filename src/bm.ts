import { API_KEY } from "./auth";

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
  roadstatuscolor: "red" | "orange" | "blue" | "green";
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

export async function getGoals() {
  return api({
    route: "/users/me/goals.json",
  });
}

export async function getGoal(slug: string) {
  return api({
    route: `/users/me/goals/${slug}.json`,
  });
}

export async function refreshGraph(goal: string) {
  return api({
    route: `/users/me/goals/${goal}/refresh_graph.json`,
  });
}

export async function createDatapoint(goal: string, value: number) {
  return api({
    route: `/users/me/goals/${goal}/datapoints.json`,
    method: "post",
    data: {
      value,
      comment: "via bm.taskratchet.com",
    },
  });
}

async function api({
  route,
  method = "get",
  data,
}: {
  route: string;
  method?: "get" | "post" | "put" | "delete";
  data?: Record<string, unknown>;
}) {
  const result = await fetch(`${API_ROOT}${route}?auth_token=${API_KEY}`, {
    method,
    body: JSON.stringify(data),
  });

  return result.json();
}
