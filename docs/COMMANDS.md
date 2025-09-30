## Istruzioni rapide

```bash
# Reveal.js (via reveal-md)
npm install -g reveal-md
reveal-md PITCH_REVEAL.md --css theme-reveal.css

# Esporta statico (HTML)
reveal-md PITCH_REVEAL.md --css theme-reveal.css --static dist

# Marp (PDF)
npm install -g @marp-team/marp-cli
marp PITCH_MARP.md -o pitch.pdf
```
