import server from "./src";
const port = process.env.PORT || 8088;
server.listen(port || 5000, () => {
  console.log("\x1b[41m", `server started on port ${port}`, "\x1b[0m");
});
