# Plim website

Sample website made with indentation based languages like Plim, Python, Stylus, and CoffeeScript.

Described in the blog post **[The complex simplicity of my static websites](https://alinpanaitiu.com/blog/complex-simplicity-of-static-websites/)**.

## Installation

```sh
make deps
```

### Website specific things

Edit the fields of the `Env` class in [utils.py](utils.py) to match your website title, domain, description etc.

## Running for development

```sh
make dev
```

## Building for production

```sh
make build
```

## Deploying to [Cloudflare Pages](https://pages.cloudflare.com/)

This is a dev deployment, with a maximum of 25MB allowed inside the `public/` folder.

```sh
make deploy
```

---

**This is a personal project with no intention to be maintained for the public.**

**Pull requests are not accepted.**
