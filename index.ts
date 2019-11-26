import * as http from "http";
import * as path from "path";
import * as fs from "fs";
import * as url from "url";
import { IncomingMessage, ServerResponse } from "http";

const server = http.createServer();
const publicPath = path.resolve(__dirname, "public");

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const { method, url: requsetPath, headers } = request;
  const { pathname, search } = url.parse(requsetPath);

  if (method === "POST") {
    response.statusCode = 405;
    return response.end();
  }

  let filename = pathname.substr(1);
  if (filename === "") {
    filename = "index.html";
  }

  fs.readFile(path.resolve(publicPath, filename), (err, data) => {
    if (err) {
      if (err.errno === -4058) {
        response.statusCode = 404;
      } else {
        response.statusCode = 500;
      }
      response.end();
    } else {
      response.setHeader("Cache-Control", "max-age=3600");
      response.end(data.toString());
    }
  });
});

server.listen(8080);
