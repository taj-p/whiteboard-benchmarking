## Scratch Notes

### Memory Results

| Element Count | MobX MB | GameDev MB |
| ------------- | ------- | ---------- |
| 100           | 3.0     | 2.9        |
| 1000          | 4.8     | 3.2        |
| 10_000        | 22.0    | 6.3        |
| 50_000        | 76.1    | 20.7       |

So, storing the game state as a POJO is much more memory efficient, as you can expect.

But, it's also likely faster to start up and update (since you don't pay the cost of
setting up the network of observables).

### Page Load Results

| Element Count | MobX (s) | GameDev (s) |
| ------------- | -------- | ----------- |
| 100           | TBD      | TBD         |
| 1000          | TBD      | TBD         |
| 10_000        | TBD      | TBD         |
| 50_000        | TBD      | TBD         |
