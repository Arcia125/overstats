import { baseUrl } from "../constants/Api";
import { urlJoin } from "./urlJoin";
import { getJSON } from "./getJSON";

function getUrlForProfile({ platform='pc', region='us', playerName, playerId }) {
  return urlJoin(baseUrl, platform, region, [playerName, playerId].join('-'));
}

async function getProfile({ platform='pc', region='us', playerName, playerId }) {
  const url = getUrlForProfile({ platform, region, playerName, playerId });
  const result = await getJSON(url);
  return { ...result, playerId };
}

export { 
  getProfile
}
