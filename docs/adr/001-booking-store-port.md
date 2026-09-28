# ADR 001: Keep booking storage behind a port

## Context

Cancellation rules belong to the booking domain, while storage technology may change. Tests also need a fast store without a database.

## Options considered

1. Call a database client directly from `cancelBooking`.
2. Let `cancelBooking` depend on a small `BookingStore` contract.

## Decision

Use a `BookingStore` port. The application supplies a technology-specific adapter at startup.

## Consequences

The core cancellation rule can run without a database and storage adapters can change independently. The application has one additional boundary to name and maintain.
