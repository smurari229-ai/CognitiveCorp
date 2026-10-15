# CognitiveCorp

CognitiveCorp is a React + TypeScript + Vite interface prototype for exploring an AI-assisted enterprise dashboard.

## Current status

**This is a prototype, not a live autonomous company.** The dashboard contains seeded/sample records and local UI state. It does not currently connect to real customers, bank accounts, UPI, card processors, crypto wallets, identity providers, a persistent database, or a production security-monitoring service.

- Demo role selection is not authentication and must not be used to protect real data.
- Treasury deposits and withdrawals are disabled. No real money is moved.
- Autonomous mode is disabled because the existing contract/revenue loop is simulated.
- Security incidents, audit entries, balances, KPIs, invoices, and agent activity shown by the UI are not independently verified real-world events.
- The `@google/genai` dependency being present does **not** mean a working Gemini feature or secure API endpoint has been implemented.

Do not enter real bank details, passwords, API keys, or customer personal data into this prototype.

## Run locally

Requirements: Node.js 22.12+ (or a version supported by the installed Vite release) and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To check the production bundle:

```bash
npm run lint
npm run build
```

## Deploy

The repository is connected to Vercel. Pushes to `main` are production deployments; other branches should create preview deployments. This safety work is being made on a feature branch and must be reviewed in its pull request before it is merged.

No environment variables are currently required for the UI prototype. Do not add a Gemini key until a server-side AI route with access control, request validation, and abuse/cost limits has been implemented.

## Before real users or money

1. Implement server-side authentication and authorization; remove client-controlled role elevation.
2. Add a persistent database with least-privilege access policies and migrations.
3. Implement a verified payment provider on the server, including signed webhook validation, idempotency, reconciliation, and audit trails. Never treat client state as proof of payment.
4. Add a server-side AI endpoint with secret handling, input/output limits, authentication, rate limits, and usage monitoring.
5. Replace simulated security claims with actual configured controls and monitoring.
6. Add automated tests for permission boundaries, payment state transitions, webhook verification, and failure paths.
7. Review privacy, security, compliance, and operational readiness before production use.
