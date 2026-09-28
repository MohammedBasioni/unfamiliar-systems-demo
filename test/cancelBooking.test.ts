import assert from "node:assert/strict";
import test from "node:test";
import {InMemoryBookingStore} from "../src/adapters/InMemoryBookingStore.js";
import {RecordingRefundGateway} from "../src/adapters/RecordingRefundGateway.js";
import {cancelBooking, type Booking} from "../src/booking/cancelBooking.js";

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

async function cancelStartingIn(hours: number) {
  const bookingStore = new InMemoryBookingStore([bookingStartingIn(hours)]);
  const refundGateway = new RecordingRefundGateway();
  const result = await cancelBooking("BOOKING-42", now, {bookingStore, refundGateway});
  return {bookingStore, refundGateway, result};
}

test("fully refunds a cancellation more than 48 hours before the booking", async () => {
  const {bookingStore, refundGateway, result} = await cancelStartingIn(72);

  assert.equal(result.refundPiasters, 12_000);
  assert.deepEqual(refundGateway.refunds, [
    {bookingId: "BOOKING-42", amountPiasters: 12_000},
  ]);
  assert.equal((await bookingStore.findById("BOOKING-42"))?.status, "cancelled");
});

test("refunds half for a cancellation from 6 to 48 hours before the booking", async () => {
  const {bookingStore, refundGateway, result} = await cancelStartingIn(24);

  assert.equal(result.refundPiasters, 6_000);
  assert.deepEqual(refundGateway.refunds, [
    {bookingId: "BOOKING-42", amountPiasters: 6_000},
  ]);
  assert.equal((await bookingStore.findById("BOOKING-42"))?.status, "cancelled");
});
