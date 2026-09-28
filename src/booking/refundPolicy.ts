import type {Booking} from "./cancelBooking.js";

export function calculateRefundPiasters(booking: Booking, now: Date) {
  const hoursUntilStart =
    (new Date(booking.startAt).getTime() - now.getTime()) / (60 * 60 * 1000);
  if (hoursUntilStart > 48) return booking.pricePiasters;
  if (hoursUntilStart >= 6) return Math.round(booking.pricePiasters * 0.5);
  return 0;
}
