import http from "node:http";
import url from "node:url";
import fs from "node:fs";

const port = 8080;

const fetchData = async () => {
  const response = await fetch("https://solar-search.api.keil.arm.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: "query { boards{ id name vendor { name slug } devices { name id } } }" })
  });
  return await response.json();
}

const server = http.createServer(async (req, res) => {
  const path = url.parse(req.url).pathname;

  switch (path) {
    case "/": {
      const data = fs.readFileSync("./index.html");
      res.setHeader("Content-Type", "text/html");
      res.end(data);
      break;
    }
    case "/client.mjs": {
      const data = fs.readFileSync("./client.mjs");
      res.setHeader("Content-Type", "text/javascript");
      res.end(data);
      break;
    }
    case "/d3.js": {
      const data = fs.readFileSync("./d3.js");
      res.setHeader("Content-Type", "text/javascript");
      res.end(data);
      break;
    }
    // Proxy the GraphQL server to avoid CORS problems
    case "/data": {
      const data = await fetchData();
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
      break;
    }
    default:
      res.statusCode = 404;
      res.end("Not Found");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
