# NdoaMatch — Know Who You're Called to Marry

A conversational personality quiz that generates a personalised marriage partner report using AI. Built for the Kenyan market.

---

## What it does

1. User visits the quiz page and answers 15 progressive questions
2. Questions branch based on their faith track (Deep Faith / Faith-Informed / Spiritual / Secular)
3. After completing the quiz, they pay **KES 250** via Paystack (Mpesa, Visa, Mastercard)
4. On payment, answers are sent to Zapier
5. Zapier sends the answers to Claude AI, which generates a personalised report
6. The report is emailed to the user via Gmail within minutes

---

## Tech stack

| Layer | Tool |
|---|---|
| Quiz frontend | Plain HTML/CSS/JS (this file) |
| Hosting | GitHub Pages |
| Payment | Paystack |
| Automation | Zapier |
| Answer storage | Airtable |
| Report generation | Anthropic Claude API |
| Email delivery | Gmail via Zapier |

---

## Files in this repo

```
ndoamatch/
├── index.html       ← The entire quiz (this is your product)
├── README.md        ← This file
├── .gitignore       ← Keeps secrets out of GitHub
└── LICENSE          ← Copyright protection
```

---

## Setup instructions

### Step 1 — Accounts you need
- [Paystack](https://paystack.com) — payment processing
- [Airtable](https://airtable.com) — quiz answer storage
- [Zapier](https://zapier.com) — automation between tools
- [Anthropic](https://console.anthropic.com) — Claude AI for report generation

### Step 2 — Before going live, update these two lines in `index.html`

Open `index.html` in any text editor and find the CONFIG section near the top of the `<script>` block:

```javascript
const PAYSTACK_PUBLIC_KEY = 'pk_test_YOUR_PAYSTACK_PUBLIC_KEY';
const ZAPIER_WEBHOOK_URL  = 'https://hooks.zapier.com/hooks/catch/YOUR_HOOK_ID/';
```

Replace:
- `pk_test_YOUR_PAYSTACK_PUBLIC_KEY` → your Paystack **live** public key (`pk_live_...`)
- The Zapier URL → your actual Zapier webhook URL

That is all you need to change in the HTML file.

### Step 3 — Deploy to GitHub Pages

1. Create a new GitHub repository named `ndoamatch`
2. Upload `index.html` — **rename it to `index.html` exactly** (lowercase)
3. Go to Settings → Pages → Source: Deploy from branch → Branch: main → Save
4. Your quiz will be live at `https://yourusername.github.io/ndoamatch`

### Step 4 — Zapier automation flow

Build this sequence in Zapier:

```
Trigger:  Paystack → New Successful Payment
Step 2:   Airtable → Create Record (save all quiz answers)
Step 3:   Webhooks → POST to Claude API (generate report)
Step 4:   Gmail → Send Email (deliver report to user)
```

### Step 5 — Paystack webhook (security)

In your Paystack dashboard → Settings → Webhooks → add your Zapier webhook URL.

This means Paystack notifies Zapier directly after every payment — a second layer of confirmation beyond what the browser sends.

---

## Security notes

**Safe to have in this file (public):**
- Paystack public key (`pk_live_...`) — this is designed to be public. It can only open a payment popup, nothing else.

**Never put these in this file:**
- Anthropic API secret key
- Airtable API token
- Paystack secret key (`sk_live_...`)

All secret keys live in Zapier only, where they are encrypted and never exposed.

---

## Faith tracks

The quiz branches into 4 tracks based on the first question:

| Track | Label | Claude prompt |
|---|---|---|
| A | Faith is everything | Deep Faith prompt |
| B | Faith matters to me | Faith-Informed prompt |
| C | Spiritual but not religious | Spiritual prompt |
| D | Not religious | Secular prompt |

Questions Q6, Q10, and Q15 show different versions depending on the track selected.

---

## Pricing

- Quiz: **KES 250** per report
- Amount in code: `25000` kobo (100 kobo = 1 KES)
- To change the price, update `AMOUNT_KOBO` in `index.html`

---

## License

Copyright © 2026 IPWORTH LTD. All rights reserved. See LICENSE file.
