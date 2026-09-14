# Battle Ships Game

#### Technologies: TypeScript, React 19, Vite, SCSS

Each player places five ships on their board, then the two players take turns firing at each
other's grid. Sink the whole fleet to win.

## Index

- [Installation and Run](#Install)
- [Configuration](#Config)
- [Scripts](#Scripts)
- [Screen Shots](#Shots)
- [Play Battle Ships](#Play)

## <a name="Install">Installation and Run</a>

Node 26 or newer is required (see `.nvmrc`).

```shell
$ git clone https://github.com/adrianeyre/battleships-game
$ cd battleships-game
$ nvm use
$ npm install
$ npm start
```

## <a name="Config">Configuration</a>

Battle Ships is a two-player game played over a socket.io server, so it needs to know where that
server is. Create a `.env` file in the root folder:

```shell
VITE_SERVER=http://localhost:4000
```

Vite inlines the value at build time, so the deployed site needs it set at build time too — the
workflows read it from the `VITE_SERVER` repository variable. Without it the page loads and the
info board renders, but starting a game fails.

## <a name="Scripts">Scripts</a>

| Script                      | What it does                                        |
| --------------------------- | --------------------------------------------------- |
| `npm start` / `npm run dev` | Vite dev server with hot reload                     |
| `npm run build`             | Typecheck, then build the production site to `dist` |
| `npm run preview`           | Serve the built site locally                        |
| `npm test`                  | Run the Vitest suite once                           |
| `npm run test:watch`        | Run the Vitest suite in watch mode                  |
| `npm run test:coverage`     | Run the suite with a V8 coverage report             |
| `npm run typecheck`         | `tsc --noEmit`                                      |
| `npm run lint`              | ESLint over the repository                          |
| `npm run format`            | Rewrite files with Prettier                         |
| `npm run format:check`      | Fail if anything is unformatted (what CI runs)      |

## <a name="Shots">Screen Shots</a>

[![Screenshot](https://raw.githubusercontent.com/adrianeyre/battleships-game/master/src/images/screenshot1.png)](https://raw.githubusercontent.com/adrianeyre/battleships-game/master/src/images/screenshot1.png 'Game View')

[![Screenshot](https://raw.githubusercontent.com/adrianeyre/battleships-game/master/src/images/screenshot2.png)](https://raw.githubusercontent.com/adrianeyre/battleships-game/master/src/images/screenshot2.png 'Game View')

## <a name="Play">Play Battle Ships</a>

- [Battle Ships](https://adrianeyre.github.io/battleships-game/)

## Releases

Merges to `master` run [semantic-release](https://semantic-release.gitbook.io/), which reads the
[conventional commit](https://www.conventionalcommits.org/) messages since the last tag, bumps the
version, writes `CHANGELOG.md`, tags the release, and then builds and deploys the site to GitHub
Pages.
