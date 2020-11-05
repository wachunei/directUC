<h1 align="center">
  <img src="./.github/readme/header.svg" alt="directUC" />
</h1>

<p align="center">
  <img src="https://img.shields.io/github/v/release/wachunei/directuc?color=%231F95EB&label=release&style=flat-square" alt="Badge: release" />
  <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/wachunei/directuc/develop-checks?label=tests%20and%20build&style=flat-square">
  <a href="https://bit.ly/directUC"><img alt="Chrome Web Store" src="https://img.shields.io/chrome-web-store/v/leflipcmaokfjdgpemeimelohgfdbdca?color=1F95EB&style=flat-square"></a>
  <a href="https://bit.ly/directUCff"><img alt="Mozilla Add-on" src="https://img.shields.io/amo/v/directuc?color=1F95EB&style=flat-square"></a>
</p>

<p align="center">
  Extensión Web que permite a alumnos y funcionarios de la Pontificia Universidad Católica de Chile el ingreso directo a diferentes servicios ofrecidos por esta.
</p>

---

- [Instalar](#install)
- [Características](#caracteristicas)
- [Development](#development)

---

<a name="install"></a>

## Instalar

<a href="https://bit.ly/directUC"><img src="./.github/readme/chrome-webstore.png" height="60" /></a>
<a href="https://bit.ly/iredirectUCff"><img src="./.github/readme/firefox-addon.png" height="60" /></a>

Disponible también en las tiendas de [Edge](https://bit.ly/directUCedge) y [Opera](https://bit.ly/directUCopera)

<a name="caracteristicas"></a>

## Características

<img src="./.github/readme/popup.png" height="230" align="right"/>

Guarda tu usuario y contraseña una sola vez y accede a través de una ventana emergente al presionar el botón.
Otras características:

- Modo directo, ingresa directamente a un servicio seleccionado al presionar el botón.
- Ingreso por Omnibox.
- Soporte para:
  - Portal UC
  - Canvas
  - LABMAT
  - SIDING
  - Biblioteca

> Esta es una extensión no oficial y no guarda relación alguna con la Pontificia Universidad Católica de Chile.

---

<a name="development"></a>

## Development

Clone this repo and install dependencies

```sh
yarn install
```

### Watch mode

Enter the watch mode by running

```sh
yarn firefox
```

or

```sh
yarn chrome
```

This will watch the `src` directory and output a development bundle in the `dist` directory.
You can load this unpacked directory into your browser or
open a browser with the extension installed by running

```sh
yarn run:firefox
```

or

```sh
yarn run:chrome
```

### Build and pack for Firefox

```sh
yarn build:firefox
yarn pack:firefox
```

Running `yarn build firefox` will output a production build in the `dist/firefox` directory,
`yarn pack:firefox` uses `web-ext` to generate a `zip` file, this will be located in the
`releases/firefox` directory.

### Build and pack for Chrome

```sh
yarn build:chrome
yarn pack:chrome
```

Running `yarn build chrome` will output a production build in the `dist/chrome` directory,
`yarn pack:chrome` uses `web-ext` to generate a `zip` file, this will be located in the
`releases/chrome` directory.
