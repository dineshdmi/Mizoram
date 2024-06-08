// const protocol = "http";

// const host = "exhibit-env.eba-p3syg9d4.ap-south-1.elasticbeanstalk.com";
// const port = "80";
// const trailUrl = "";
const protocol = "http";

const host = "103.86.177.17";
const port = "5000";
const trailUrl = ""

// const protocol = "https";
// const host = "development.api.katechnologiesgh.com";
// const port = "";
// const trailUrl = "";

const hostUrl = `${protocol}://${host}${port ? ":" + port : ""}`;
const endpoint = `${protocol}://${host}${port ? ":" + port : ""}${trailUrl}`;

export default {
  protocol: protocol,
  host: host,
  port: port,
  apiUrl: trailUrl,
  endpoint: endpoint,
  hostUrl: hostUrl,
};
