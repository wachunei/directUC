# directUC

WebExtension que permite a alumnos de la Pontificia Universidad Católica de Chile el ingreso directo a diferentes servicios ofrecidos por esta.

## Instalar

La extensión está disponible en la Chrome Web Store, [haz click acá para instalar](https://chrome.google.com/webstore/detail/directuc/leflipcmaokfjdgpemeimelohgfdbdca).

## Características

Guarda tu usuario y contraseña una sola vez y accede a través de una ventana emergente al presionar el botón.
Otras características:

* Modo directo, ingresa directamente a un servicio seleccionado al presionar el botón.
* Ingreso por Omnibox.
* Soporte para:
  * Portal UC
  * Canvas
  * LABMAT
  * SIDING
  * Biblioteca

> Esta es una extensión no oficial y no guarda relación alguna con la Pontificia Universidad Católica de Chile.

---

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
