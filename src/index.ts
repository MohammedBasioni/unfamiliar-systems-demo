import {parseArgs} from "node:util";
import {InMemoryBookingStore} from "./adapters/InMemoryBookingStore.js";
import {RecordingRefundGateway} from "./adapters/RecordingRefundGateway.js";
import {createServer} from "./http/server.js";

const {values} = parseArgs({
  options: {port: {type: "string", default: "3000"}},
});
const port = Number(values.port);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("--port must be an integer between 1 and 65535");
}

const now = new Date();
const bookingStore = new InMemoryBookingStore([
  {
    id: "BOOKING-42",
    customerId: "CUSTOMER-7",
    startAt: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
    pricePiasters: 12_000,
    status: "confirmed",
  },
]);

createServer({bookingStore, refundGateway: new RecordingRefundGateway()}).listen(port, () => {
  console.log(`Booking demo running at http://localhost:${port}`);
});
