import assert from "node:assert/strict";
import test from "node:test";
import type {Booking} from "../src/booking/cancelBooking.js";
import {calculateRefundPiasters} from "../src/booking/refundPolicy.js";

const now = new Date("2026-10-01T12:00:00.000Z");

function bookingStartingIn(hours: number): Booking {
  return {
    id: "BOOKING-42",
    customerId: "CUSTOMER-7",
    startAt: new Date(now.getTime() + hours * 60 * 60 * 1000).toISOString(),
    pricePiasters: 12_000,
    status: "confirmed",
  };
}

test("the refund boundaries match the agreed business rule", () => {
  assert.equal(calculateRefundPiasters(bookingStartingIn(48.01), now), 12_000);
  assert.equal(calculateRefundPiasters(bookingStartingIn(48), now), 6_000);
  assert.equal(calculateRefundPiasters(bookingStartingIn(6), now), 6_000);
  assert.equal(calculateRefundPiasters(bookingStartingIn(5.99), now), 0);
});
