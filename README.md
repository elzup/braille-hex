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

| Value | Bits | Dots | Plain binary | Braille |
| --- | --- | --- | --- | --- |
| 0 | 0000 | ○○/○○ | ✓ | blank |
| 1 | 0001 | ○○/○● | ✓ |  |
| 2 | 0010 | ○○/●○ | ✓ |  |
| 3 | 0011 | ○○/●● | ✓ |  |
| 4 | 0100 | ○●/○○ | ✓ |  |
| 5 | 0101 | ○●/○● | ✓ |  |
| 6 | 0110 | ○●/●○ | ✓ | i |
| 7 | 0111 | ○●/●● | ✓ | j |
| 8 | 1011 | ●○/●● | 1000 | h |
| 9 | 1111 | ●●/●● | 1001 | g |
| A | 1000 | ●○/○○ | 1010 | a |
| B | 1010 | ●○/●○ | 1011 | b |
| C | 1100 | ●●/○○ | ✓ | c |
| D | 1101 | ●●/○● | ✓ | d |
| E | 1001 | ●○/○● | 1110 | e |
| F | 1110 | ●●/●○ | 1111 | f |

| Top \ Bottom | ○○ | ○● | ●○ | ●● |
| --- | --- | --- | --- | --- |
| ○○ | 0 | 1 | 2 | 3 |
| ○● | 4 | 5 | 6 | 7 |
| ●○ | A | E | B | 8 |
| ●● | C | D | F | 9 |

| | Left | Right |
| --- | --- | --- |
| Top | 8 9 A B C D E F | 4 5 6 7 9 C D F |
| Bottom | 2 3 6 7 8 9 B F | 1 3 5 7 8 9 D E |
