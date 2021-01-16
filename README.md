# Zoom Developer Search

The [Zoom Developer Search](https://searchzoom.dev) (ZDS) tool is used to narrow and simplify searches for Zoom
developers.

ZDS is essentially a front-end for a Google Custom Search Engine. It adds some features like automatic searching and
previewing of forum posts.

### Chrome

You
can [add ZDS to chrome as a search engine](https://support.google.com/chrome/answer/95426?co=GENIE.Platform%3DDesktop&hl=en#6395580:~:text=Add%2C%20edit%2C%20or%20remove%20other%20search%20engines)
using the following query URL: `https://searchzoom.dev/?q=%s`


## Project setup

You can clone this repo and attach it to your own CSE by setting the following environment variables:

* Set `ZDS_API_KEY` with your CSE API Key


* Set `ZDS_CX_TOKEN` with your CSE CX Token

#### App Engine

If you're using [Google App Engine](https://cloud.google.com/appengine), populate the env.yaml file with your API Key
and CX Token.

### Install Packages

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Run your end-to-end tests

```
yarn test:e2e
```

### Lints and fixes files

```
yarn lint
```
