#!/usr/bin/env node
import { main } from '../src/index.js'
main().catch((err) => {
  console.error('Unexpected error:', err?.message || err)
  process.exit(1)
})
