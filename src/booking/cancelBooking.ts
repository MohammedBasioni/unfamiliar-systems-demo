export type Booking = {
  id: string;
  customerId: string;
  startAt: string;
  pricePiasters: number;
  status: "confirmed" | "cancelled";
};

export interface BookingStore {
  findById(id: string): Promise<Booking | undefined>;
  save(booking: Booking): Promise<void>;
}

export interface RefundGateway {
  refund(input: {bookingId: string; amountPiasters: number}): Promise<void>;
}

type Dependencies = {
  bookingStore: BookingStore;
  refundGateway: RefundGateway;
};

export async function cancelBooking(
  bookingId: string,
  now: Date,
  {bookingStore, refundGateway}: Dependencies,
) {
  const booking = await bookingStore.findById(bookingId);
  if (!booking) throw new Error("Booking not found");
  if (booking.status === "cancelled") throw new Error("Booking already cancelled");

  const hoursUntilStart =
    (new Date(booking.startAt).getTime() - now.getTime()) / (60 * 60 * 1000);
  const refundPiasters = hoursUntilStart > 48 ? booking.pricePiasters : 0;

  if (refundPiasters > 0) {
    await refundGateway.refund({bookingId, amountPiasters: refundPiasters});
  }

  await bookingStore.save({...booking, status: "cancelled"});
  return {bookingId, status: "cancelled" as const, refundPiasters};
}
