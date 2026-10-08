# braille-hex

[![ooparts](https://raw.githubusercontent.com/elzup/ooparts-spec/main/badge.svg)](https://github.com/elzup/ooparts-spec)

Hex digits in the top four dots of a braille cell.

```
$ echo 7ce387c | braille-hex
⠚⠉⠑⠒⠓⠚⠉
```

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

| Value | Bits | Dots |
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
