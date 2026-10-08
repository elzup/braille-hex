#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { parseArgs } from 'node:util'
import { decode, encode } from './braille-hex.ts'

const STDIN_FD = 0

const main = (): void => {
  const { values } = parseArgs({
    options: { decode: { type: 'boolean', short: 'd', default: false } },
  })
  const convert = values.decode ? decode : encode
  // 0 は空白と同形の U+2800 だが、これは White_Space ではないので trim では落ちない
  const lines = readFileSync(STDIN_FD, 'utf8').trim().split(/\r?\n/)
  console.log(lines.map((line) => convert(line.trim())).join('\n'))
}

try {
  main()
} catch (error) {
  console.error(`braille-hex: ${error instanceof Error ? error.message : error}`)
  process.exit(1)
}
