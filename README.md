# Understanding and Modifying Unfamiliar Systems — Demo

The companion TypeScript repository for the educational video **Understanding and Modifying Unfamiliar Systems**.

It keeps the system deliberately small so you can practise the real workflow: find an entry point, follow one request across boundaries, capture existing behaviour, refactor safely, and then change a business rule.

## Quick start

Requires Node.js 22 or newer.

```bash
npm ci
npm start -- --port 3000
```

Open <http://localhost:3000>, then cancel `BOOKING-42` while watching the browser Network panel.

Run the checks with:

```bash
npm test
npm run typecheck
```

## Follow one request

The cancellation path is intentionally short:

```text
public/index.html
  → src/http/server.ts
  → src/booking/cancelBooking.ts
  → BookingStore + RefundGateway ports
  → in-memory + recording adapters
```

## Replay the teaching checkpoints

The four Git tags match the stages shown in the video:

```bash
git switch --detach step-1-unfamiliar-system
git switch --detach step-2-characterization-tests
git switch --detach step-3-refund-policy
git switch --detach step-4-partial-refunds
git switch main
```

| Tag | Purpose |
| --- | --- |
| `step-1-unfamiliar-system` | Runnable system with the original cancellation rule. |
| `step-2-characterization-tests` | Tests record the observed behaviour. |
| `step-3-refund-policy` | Refund calculation is extracted without changing behaviour. |
| `step-4-partial-refunds` | The new rule and its boundary tests are introduced. |

## Final business rule

- More than 48 hours before departure: full refund.
- From 6 through 48 hours: 50% refund.
- Less than 6 hours: cancellation succeeds without a refund.

The application stores bookings only in memory. `RecordingRefundGateway` records the requested refund for inspection; it does **not** transfer real money. The operator, route, customer, booking, price, and policy are fictional teaching data.
