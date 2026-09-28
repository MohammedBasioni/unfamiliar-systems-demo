import {readFile} from "node:fs/promises";
import {createServer as createNodeServer} from "node:http";
import {fileURLToPath} from "node:url";
import {cancelBooking, type BookingStore, type RefundGateway} from "../booking/cancelBooking.js";

const pagePath = fileURLToPath(new URL("../../public/index.html", import.meta.url));

type Dependencies = {
  bookingStore: BookingStore;
  refundGateway: RefundGateway;
  now?: () => Date;
};

export function createServer({bookingStore, refundGateway, now = () => new Date()}: Dependencies) {
  return createNodeServer(async (request, response) => {
    const url = new URL(request.url ?? "/", "http://localhost");

    if (request.method === "GET" && url.pathname === "/") {
      response.writeHead(200, {"content-type": "text/html; charset=utf-8"});
      response.end(await readFile(pagePath, "utf8"));
      return;
    }

    const match = url.pathname.match(/^\/api\/bookings\/([^/]+)\/cancel$/);
    if (request.method === "POST" && match) {
      try {
        const result = await cancelBooking(
          decodeURIComponent(match[1]),
          now(),
          {bookingStore, refundGateway},
        );
        response.writeHead(200, {"content-type": "application/json"});
        response.end(JSON.stringify(result));
      } catch (error) {
        response.writeHead(400, {"content-type": "application/json"});
        response.end(JSON.stringify({error: error instanceof Error ? error.message : "Unknown error"}));
      }
      return;
    }

    response.writeHead(404).end();
  });
}
