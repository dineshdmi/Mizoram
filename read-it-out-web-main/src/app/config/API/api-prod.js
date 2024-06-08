// const protocol = "https"; //for server
const protocol = "http"; //for localhost
// const host = "api.elibrarysmartcityadmin.education"; // for server
const host = "localhost:3000"; // for localhost
const port = "";
const trailUrl = "";

// const protocol = "http";
// const host = "192.168.29.22";
// const port = "8088";
// const trailUrl = "";

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
