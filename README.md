# Unfamiliar booking system

A small teaching repository for Chapter 6, “Exploring and Modifying Unfamiliar Systems.” It gives the video one real request to trace without turning the lesson into a framework tutorial.

## Run it

```bash
npm install
npm start -- --port 3000
```

Open <http://localhost:3000>, then use the browser Network tab while cancelling `BOOKING-42`.

## Business rules after the ticket

- More than 48 hours before the booking: full refund.
- From 6 to 48 hours: 50% refund.
- Less than 6 hours: cancellation succeeds without a refund.

## Follow the change

The Git history preserves the teaching sequence:

1. `step-1-unfamiliar-system`: runnable system with the old rule.
2. `step-2-characterization-tests`: tests record current behavior.
3. `step-3-refund-policy`: refund calculation is extracted without changing behavior.
4. `step-4-partial-refunds`: the ticket and its boundary tests are implemented.
