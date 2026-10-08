# braille-hex

[![ooparts](https://raw.githubusercontent.com/elzup/ooparts-spec/main/badge.svg)](https://github.com/elzup/ooparts-spec)

Hex digits drawn with the top four dots of a braille cell. `A`–`F` are the braille letters a–f.

```
$ echo 7ce387c | braille-hex
⠚⠉⠑⠒⠓⠚⠉
$ echo ⠚⠉⠑⠒⠓⠚⠉ | braille-hex -d
7ce387c
```

## Glyphs

```
0 ○○  1 ○○  2 ○○  3 ○○
  ○○    ○●    ●○    ●●

4 ○●  5 ○●  6 ○●  7 ○●
  ○○    ○●    ●○    ●●

8 ●○  9 ●●  A ●○  B ●○
  ●●    ●●    ○○    ●○

C ●●  D ●●  E ●○  F ●●
  ○○    ○●    ○●    ●○
```

Dots are read top-left → top-right → bottom-left → bottom-right, most significant bit first.

| Value | Bits | Dots (top/bottom) |
| --- | --- | --- |
| 0 | 0000 | ○○/○○ |
| 1 | 0001 | ○○/○● |
| 2 | 0010 | ○○/●○ |
| 3 | 0011 | ○○/●● |
| 4 | 0100 | ○●/○○ |
| 5 | 0101 | ○●/○● |
| 6 | 0110 | ○●/●○ |
| 7 | 0111 | ○●/●● |
| 8 | 1011 | ●○/●● |
| 9 | 1111 | ●●/●● |
| A | 1000 | ●○/○○ |
| B | 1010 | ●○/●○ |
| C | 1100 | ●●/○○ |
| D | 1101 | ●●/○● |
| E | 1001 | ●○/○● |
| F | 1110 | ●●/●○ |

`0`–`7` are their own bit value. `8` and `9` are top-left plus both bottom dots, with the ones bit in the top-right dot.

## Usage

```bash
echo 7ce387c | node src/cli.ts        # hex → braille
echo ⠚⠉⠑⠒⠓⠚⠉ | node src/cli.ts -d    # braille → hex
```
