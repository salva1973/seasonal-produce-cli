# seasonal-produce-cli

CLI that prints seasonal fruit & vegetables for **Bologna (Northern Italy)** by **season** or **month**.

## Install (local dev)

```bash
npm install
npm link   # makes `seasonal-produce` available on your PATH
npm unlink -g seasonal-produce # if you want to unlink
ls -l $(npm root -g) # to check what's linked globally
```

## Usage

Current month (Europe/Rome):

```bash
seasonal-produce
```

Specific season (prints the union of that season's 3 months):

```bash
seasonal-produce --season summer
```

Specific month (name in EN/IT or number 1–12):

```bash
seasonal-produce --month settembre
seasonal-produce --month 9
seasonal-produce -m august
```

Output as JSON:

```bash
seasonal-produce -s autumn -f json | jq
```

## Notes

- Location is fixed to **Bologna / Emilia-Romagna** and nearby Po Valley conditions.
- Lists are curated for realism but not exhaustive.
- Seasons:
  - Winter: December–February
  - Spring: March–May
  - Summer: June–August
  - Autumn: September–November
