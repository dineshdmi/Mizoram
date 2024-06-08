const protocol = "http";
const host = "103.86.177.17";
const port = "5000";
const trailUrl = "";

// const protocol = "https";
// const host = "development.api.katechnologiesgh.com";
// const port = "";
// const trailUrl = "";

// const protocol = "http";

// const host = "192.168.29.135";
// const port = "5000";
// const trailUrl = "";

// http://exhibit-env.eba-p3syg9d4.ap-south-1.elasticbeanstalk.com

// https://api.unicornui.com/
const hostUrl = `${protocol}://${host}${port ? ":" + port : ""}`;
const endpoint = `${protocol}://${host}${port ? ":" + port : ""}${trailUrl}`;
// const hostUrl = `http://192.168.29.134:5000`;
// const endpoint = `http://192.168.29.134:5000`;

const config = {
  protocol: protocol,
  host: host,
  port: port,
  apiUrl: trailUrl,
  endpoint: endpoint,
  hostUrl: hostUrl,
};
export default config;
