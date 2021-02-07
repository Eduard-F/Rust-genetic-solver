Rust Genetics Solver
===========
- [Rust Genetics Solver](#rust-genetics-solver)
  - [Description](#description)
  - [Commands](#commands)
  - [Todo](#todo)

## Description
This uses brute forcing to solve the genetics

Just set your `plants' array along with the desired outcome by changing 'g_count' and 'y_count'.
This will output a 'simplified.json' file that will include the exact breeding needed to get the end result.

It also includes the 50/50 method to solve as described in this video: [Rust | Ultimate Cross Breeding Guide (new/updated)](https://www.youtube.com/watch?v=WQ0ixceBZwA)

## Commands
| Command         | Description       |
| --------------- | ----------------- |
| `node index.js` | run genetics solver |

## Todo
- The 50/50 method is not perfect. Instead of every single gene doing a 50/50 check, it does the 50/50 check on a plant that gets preference and all the 50/50 genes would convert to the plant that got selected. Thus gggggy, gggggy, ggggyg and ggggyg would never produce ggggyy
- It could run more efficient by putting genes that are more likely to succeed first in the the array. That reduces the amount of loops needed to produce the result
- A calculator can be writen to see if it would be able to be solved in the first place. This should create an 'ideal array' which would be used in the above todo to make the code solve faster (I have a excel sheet that explains this proccess)