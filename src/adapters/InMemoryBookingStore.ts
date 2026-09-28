import type {Booking, BookingStore} from "../booking/cancelBooking.js";

export class InMemoryBookingStore implements BookingStore {
  private readonly bookings = new Map<string, Booking>();

  constructor(initialBookings: Booking[] = []) {
    for (const booking of initialBookings) this.bookings.set(booking.id, booking);
  }

  async findById(id: string) {
    const booking = this.bookings.get(id);
    return booking ? {...booking} : undefined;
  }

  async save(booking: Booking) {
    this.bookings.set(booking.id, {...booking});
  }
}
