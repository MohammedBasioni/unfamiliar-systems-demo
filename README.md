# Unfamiliar booking system

A small teaching repository for Chapter 6, “Exploring and Modifying Unfamiliar Systems.” It gives the video one real request to trace without turning the lesson into a framework tutorial.

## Run it

```bash
npm install
npm start -- --port 3000
```

Open <http://localhost:3000>, then use the browser Network tab while cancelling `BOOKING-42`.

## Starting behavior

- More than 48 hours before the booking: full refund.
- Within 48 hours: cancellation succeeds without a refund.

The new ticket will add a 50% refund from 6 to 48 hours before the booking.
