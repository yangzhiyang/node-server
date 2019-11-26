import * as http from "http";
import * as path from "path";
import * as fs from "fs";
import { IncomingMessage, ServerResponse } from "http";
const server = http.createServer();

const publicPath = path.resolve(__dirname, "public");

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const { method, url, headers } = request;
  switch (url) {
    case "/index.html":
      fs.readFile(path.resolve(publicPath, "index.html"), (err, data) => {
        if (err) throw err;
        response.end(data.toString());
      });
      break;
    case "/index.css":
      response.setHeader("content-type", "text/css;charset=utf-8");
      fs.readFile(path.resolve(publicPath, "index.css"), (err, data) => {
        if (err) throw err;
        response.end(data.toString());
      });
      break;
    case "/index.js":
      response.setHeader("content-type", "text/javascript;charset=utf-8");
      fs.readFile(path.resolve(publicPath, "index.js"), (err, data) => {
        if (err) throw err;
        response.end(data.toString());
      });
      break;
  }
});

server.listen(8080);
