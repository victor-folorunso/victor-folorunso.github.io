# Notes for AI agents working on this repo

This is Victor's personal portfolio, served by GitHub Pages at
https://victor-folorunso.github.io/ . The site may be redesigned or rebuilt
from scratch at any time. Whatever you change, these must survive:

## Keep `app-ads.txt` at the root of the published site

`app-ads.txt` must stay reachable at
https://victor-folorunso.github.io/app-ads.txt with its exact content. It
tells advertisers that the ads in Victor's apps (publisher name
"wonderperk" on Google Play) really belong to his AdMob account
(pub-2133459960621292). If it disappears, his apps earn less from ads and
AdMob flags them. It covers every app under that AdMob account.

- Do not delete, rename, move or reformat it.
- If you switch to a framework or build step, make sure the file still ends
  up at the root of the published output (for example in `public/`).
- If more AdMob accounts or ad networks are added later, add lines to it;
  never remove the existing line.

## Do not take over these paths

These addresses are served by Victor's other repositories, not this one.
Do not create files or folders with these names here:

- `/apps/` (repo `apps`: his app pages, tester pages and privacy policies)
- `/linking-privacy/` (repo `linking-privacy`: LINKING's privacy policy,
  linked from Google Play)
