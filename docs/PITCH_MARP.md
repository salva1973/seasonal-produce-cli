---
marp: true
paginate: true
theme: default
style: |
  :root { --bg:#0b0f0d; --fg:#eaf5ee; --accent:#5bd08a; --accent2:#a7f0c4; --muted:#9fb3a7; }
  section { background: var(--bg); color: var(--fg); font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
  h1, h2 { color: var(--accent); }
  a { color: var(--accent2); text-decoration: none; border-bottom: 1px dotted var(--accent2); }
  blockquote { border-left: 4px solid var(--accent); padding-left: 12px; color: var(--muted); }
  .cta { margin-top: 14px; padding: 10px 12px; border: 1px solid var(--accent); border-radius: 12px; color: var(--accent2); font-weight: 600; display: inline-block; }
---

# Problema

- Consumatori e ristoratori non sanno cosa sia _veramente_ di stagione.
- Supermercati e app di diete propongono fragole a gennaio → incoerenza con sostenibilità.
- Mense e catene hanno pressioni su **trasparenza alimentare** e **green reporting**.

> I dati di stagionalità esistono, ma sono sparsi in PDF o siti regionali, non standardizzati.

---

# Soluzione

## Seasonal Produce API & CLI

- **API globale**: frutta e verdura di stagione per luogo, mese, lingua.
- **Dataset curati** da fonti ufficiali (ministeri, mercati, enti ambientali).
- **Formati developer‑friendly**: JSON, CLI open‑source, SDK.
- Estensioni: prezzi medi, CO₂ stimata, info nutrizionali.

<span class="cta">Un’unica fonte standardizzata → servizio plug‑and‑play</span>

---

# Mercato & Modello

- **Food‑tech & app salute** (meal‑planning, fitness, ricette).
- **Retail & ristorazione** (supermercati online, mense).
- **Edutainment** (scuole, app bambini, divulgazione green).

**Freemium API**

- Free: 100 req/giorno
- Pro: €19/mese → 50k richieste
- Business: €99/mese → 500k + EU dataset
- Enterprise: su misura, SLA, global

_Mercato in crescita: food‑tech × sostenibilità × open data_
