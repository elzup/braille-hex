const BRAILLE_BASE = 0x2800
const HEX_RADIX = 16

// Z 順 4bit (bit3 = 左上, bit2 = 右上, bit1 = 左下, bit0 = 右下) の各ビットが立てる
// Unicode 点字のドット。添字 = ビット番号 (bit0 = 点 5, bit1 = 点 2, bit2 = 点 4, bit3 = 点 1)
const DOT_MASKS = [0x10, 0x02, 0x08, 0x01]
const UPPER_DOTS_MASK = 0x1b

const TOP_LEFT = 0b1000
const TOP_RIGHT_SHIFT = 2
const BOTTOM_BOTH = 0b0011
const EIGHT_PATTERN = 0b1011

const FIRST_EXCEPTION_DIGIT = 8
const FIRST_LETTER_VALUE = 10

// A〜F は割り当てではなく点字アルファベット a〜f の字形そのものを借りる。
// ここだけは規則で導けない (点字側の定義) ので、点字の文字として持つ
const BRAILLE_A_TO_F = '⠁⠃⠉⠙⠑⠋'

const patternToCell = (pattern: number): string => {
  const mask = DOT_MASKS.reduce(
    (acc, dot, bit) => ((pattern >> bit) & 1 ? acc | dot : acc),
    0
  )
  return String.fromCodePoint(BRAILLE_BASE + mask)
}

const cellToPattern = (cell: string, index: number): number => {
  const mask = (cell.codePointAt(0) ?? 0) - BRAILLE_BASE
  const isUpperFourDots = mask >= 0 && (mask & ~UPPER_DOTS_MASK) === 0
  if (!isUpperFourDots) {
    throw new Error(`invalid braille-hex cell "${cell}" at index ${index}`)
  }
  return DOT_MASKS.reduce(
    (acc, dot, bit) => (mask & dot ? acc | (1 << bit) : acc),
    0
  )
}

const digitToPattern = (digit: number): number =>
  digit < FIRST_EXCEPTION_DIGIT
    ? digit
    : EIGHT_PATTERN | ((digit & 1) << TOP_RIGHT_SHIFT)

const valueToCell = (value: number): string =>
  value < FIRST_LETTER_VALUE
    ? patternToCell(digitToPattern(value))
    : BRAILLE_A_TO_F[value - FIRST_LETTER_VALUE]

const cellToValue = (cell: string, index: number): number => {
  const pattern = cellToPattern(cell, index)
  if ((pattern & TOP_LEFT) === 0) return pattern
  if ((pattern & BOTTOM_BOTH) === BOTTOM_BOTH) {
    return FIRST_EXCEPTION_DIGIT + ((pattern >> TOP_RIGHT_SHIFT) & 1)
  }
  return FIRST_LETTER_VALUE + BRAILLE_A_TO_F.indexOf(cell)
}

/** 16 進文字列 (大文字小文字どちらも可) を点字文字列にする */
export const encode = (hex: string): string =>
  [...hex]
    .map((char, index) => {
      if (!/^[0-9a-fA-F]$/.test(char)) {
        throw new Error(`invalid hex digit "${char}" at index ${index}`)
      }
      return valueToCell(parseInt(char, HEX_RADIX))
    })
    .join('')

/** 点字文字列を小文字の 16 進文字列にする */
export const decode = (braille: string): string =>
  [...braille]
    .map((cell, index) => cellToValue(cell, index).toString(HEX_RADIX))
    .join('')
