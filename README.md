# Experiment Chrome Remote Interface Node

In one terminal, start chrome devtools protocol:

```
google-chrome --headless --remote-debugging-port=9222
```

In another terminal:

```
node examples/print.js ; open test.pdf
```

Tested on Node v10.