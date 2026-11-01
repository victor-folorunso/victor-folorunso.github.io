# Folorunso Victor Wonderful, personal website

Plain HTML and CSS, no framework, no build step. Served by GitHub Pages at
https://victor-folorunso.github.io/

## Files

```
index.html           Home: intro, featured apps and websites, stack, contact
websites/index.html  Every website I built
theme.css            The shared theme: home, /websites/ and the /apps/ hub
home.css             Home page only
images/              Portrait, and website screenshots in images/sites/
app-ads.txt          Must stay (see below)
```

`/apps/` is not in this repo. It is built from the `apps` repo, whose hub page
links `/theme.css` from here, so renaming or moving `theme.css` breaks it.

## Adding a website

Put a 1200x750 screenshot in `images/sites/`, add a tile to
`websites/index.html`, and to the featured row in `index.html` if it should
show on the home page.

## Files that must stay

`app-ads.txt` (the line that proves the ads in my apps belong to my AdMob
account) must stay at the root of the published site, whatever happens to
the design. `/apps/` and `/linking-privacy/` are served by other repos, so
nothing here may use those names. Details for anyone, or any AI agent,
editing this repo: `AGENTS.md`.
