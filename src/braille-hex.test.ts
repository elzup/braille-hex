import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { decode, encode } from './braille-hex.ts'

const HEX_DIGITS = '0123456789abcdef'
const BRAILLE_BASE = 0x2800

type TableRow = { digit: string; bits: string; dots: string; cell: string }

// 点の並びは Z 順 (点 1・4・2・5)
const DOT_MASKS_IN_Z_ORDER = [0x01, 0x08, 0x02, 0x10]

// 表を二重に持つとズレるので、仕様の正本である README の割り当て表をそのまま読む
const readAssignmentTable = (): TableRow[] => {
  const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8')
  const rowPattern = /^\| ([0-9A-F]) \| ([01]{4}) \| ([○●]{2})\/([○●]{2}) \|/gm
  return [...readme.matchAll(rowPattern)].map(([, digit, bits, top, bottom]) => {
    const dots = top + bottom
    const mask = DOT_MASKS_IN_Z_ORDER.reduce(
      (acc, dot, index) => (dots[index] === '●' ? acc | dot : acc),
      0
    )
    return { digit, bits, dots, cell: String.fromCodePoint(BRAILLE_BASE + mask) }
  })
}

test('README の表は 16 行あり、ビット列と点の列が一致している', () => {
  const rows = readAssignmentTable()
  assert.equal(rows.length, HEX_DIGITS.length)
  for (const { digit, bits, dots } of rows) {
    const bitsAsDots = [...bits].map((bit) => (bit === '1' ? '●' : '○')).join('')
    assert.equal(bitsAsDots, dots, `digit ${digit}`)
  }
})

test('16 値すべてが README の割り当て表と一致する', () => {
  const table = readAssignmentTable()
  assert.equal(table.length, HEX_DIGITS.length)
  for (const { digit, cell } of table) {
    assert.equal(encode(digit), cell, `encode ${digit}`)
    assert.equal(decode(cell), digit.toLowerCase(), `decode ${digit}`)
  }
})

test('16 値すべてが往復し、字形が重複しない', () => {
  const cells = [...HEX_DIGITS].map((digit) => encode(digit))
  assert.equal(new Set(cells).size, HEX_DIGITS.length)
  for (const digit of HEX_DIGITS) {
    assert.equal(decode(encode(digit)), digit)
  }
})

test('上 4 点の 16 パターンすべてが decode → encode で往復する', () => {
  const upperMasks = Array.from({ length: 0x20 }, (_, mask) => mask).filter(
    (mask) => (mask & 0x04) === 0
  )
  assert.equal(upperMasks.length, HEX_DIGITS.length)
  for (const mask of upperMasks) {
    const cell = String.fromCodePoint(BRAILLE_BASE + mask)
    assert.equal(encode(decode(cell)), cell)
  }
})

test('A〜F は点字の a〜f と同形', () => {
  assert.equal(encode('abcdef'), '⠁⠃⠉⠙⠑⠋')
  assert.equal(encode('ABCDEF'), '⠁⠃⠉⠙⠑⠋')
})

test('複数桁の文字列を往復する', () => {
  assert.equal(decode(encode('7ce387c')), '7ce387c')
  assert.equal(decode(encode('0123456789abcdef')), '0123456789abcdef')
  assert.equal(encode(''), '')
})

test('不正な入力は例外にする', () => {
  assert.throws(() => encode('7g'), /invalid hex digit "g" at index 1/)
  assert.throws(() => decode('a'), /invalid braille-hex cell/)
  // 下 2 点 (点 3・6・7・8) を使うセルは対象外
  assert.throws(() => decode('⠇'), /invalid braille-hex cell/)
  assert.throws(() => decode('⣀'), /invalid braille-hex cell/)
})
