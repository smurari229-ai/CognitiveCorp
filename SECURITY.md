# Security status

CognitiveCorp is currently a public prototype. Its role picker is client-side UI state, and its business data is seeded in the browser. It is not suitable for confidential data or financial operations.

## Safety controls in this branch

- Live deposit and withdrawal actions return a clear disabled response and do not change balances.
- Autonomous mode remains paused to prevent simulated contracts from being represented as real revenue.
- The UI explicitly identifies demo role switching and sample treasury data.
- Unsupported claims about bank-grade encryption, zero-trust protection, and a 99.999% SLA have been removed from the footer.

## Not yet implemented / verified

- Server-side authentication and authorization
- Persistent database and row-level security
- Real payment provider, signed webhooks, payout controls, or reconciliation
- A protected Gemini API endpoint
- Production intrusion detection, cryptographic audit log integrity, or an SLA
- Automated unit/integration tests and external security review

Never store secrets in frontend code or `VITE_*` variables. Do not deploy live payment or AI capabilities until server-side access controls, abuse prevention, logging, and cost limits are in place.
