- [Overview](#overview)
- [Project state](#project-state)
- [Getting started](#getting-started)

## Overview

Speed test for bun runtime compared to node runtime, while executing simple block mining and transfers inside mock blockchain.

## Project state

Currently project works only on node runetime (`/node_version/`) due to module `node:crypto` not being completly implemented in bun sourcecode yet.

## Getting started

<br>

1. Clone repo

```
git clone https://github.com/jakub-jarzabek/bun-chain.git
```

2. Cd into dir and run yarn

```
cd bun-chain && yarn
```

3. Run node version

```
cd node_version && yarn start

```

4. Run bun version (Currently unavailable)

```
yarn start

```
