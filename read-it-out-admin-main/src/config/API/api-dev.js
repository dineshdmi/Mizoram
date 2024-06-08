const protocol = "http";

const host = "103.86.177.17";
const port = "5000";
const trailUrl = "";

// const protocol = "https";

// const host = "development.api.katechnologiesgh.com";
// const port = "";
// const trailUrl = "";
// https://api.homiesbusiness.com/v1 https://classmith.eu/api   https://3b4328b12f6f.ngrok.io/
const hostUrl = `${protocol}://${host}${port ? ":" + port : ""}/`;
const endpoint = `${protocol}://${host}${port ? ":" + port : ""}${trailUrl}`;

export default {
  protocol: protocol,
  host: host,
  port: port,
  apiUrl: trailUrl,
  endpoint: endpoint,
  hostUrl: hostUrl,
};
