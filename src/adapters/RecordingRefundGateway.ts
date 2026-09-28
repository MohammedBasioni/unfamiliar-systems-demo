import type {RefundGateway} from "../booking/cancelBooking.js";

export class RecordingRefundGateway implements RefundGateway {
  readonly refunds: Array<{bookingId: string; amountPiasters: number}> = [];

  async refund(input: {bookingId: string; amountPiasters: number}) {
    this.refunds.push({...input});
  }
}
