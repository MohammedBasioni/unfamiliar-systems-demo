import type {Booking} from "./cancelBooking.js";

export function calculateRefundPiasters(booking: Booking, now: Date) {
  const hoursUntilStart =
    (new Date(booking.startAt).getTime() - now.getTime()) / (60 * 60 * 1000);
  return hoursUntilStart > 48 ? booking.pricePiasters : 0;
}
