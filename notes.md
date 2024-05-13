# Instalacja

## VITE

instrukcja framework Vite na stronie tailwindcsss
https://tailwindcss.com/docs/guides/vite

- zmiana main na index
- export default na export i pozniej import {App}

---

- zmiana portu:

vite.config.js

```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});
```

- npm i -D prettier
- npm i -D prettier-plugin-tailwindcss
  https://tailwindcss.com/blog/automatic-class-sorting-with-prettier
  dodac plik .prettierrc
  ```
  {
  "plugins": ["prettier-plugin-tailwindcss"]
  }
  ```
- npm i -D vite-plugin-svgr
- npm i react-icons

# Budowanie

## Nav

w katalogu src/components/ tworzymy Nav.jsx

### Logo

- import svg jako React Component w Vite
  i opakowac w a
  ```
  import NikeLogo from "../assets/nike-logo.svg?react";
  ```
  ```
  <a href="#">
    <NikeLogo className="h-20 w-20" />
  </a>
  ```
  nadajemy wysokosc i szerokosc

### Button

- import hamburger button

  ```
  import { RxHamburgerMenu } from "react-icons/rx";
  ```

  ```
    <button>
        <RxHamburgerMenu size={25} />
    </button>
  ```

  nadajemy size

  na button nadajemy wlasciwosci ring na klik

  ```
  <button className="hover:bg-grey-100 rounded-lg  p-2 focus:ring-2 focus:ring-gray-200">
      <RxHamburgerMenu size={25} />
  </button
  ```

na calym nav nadajemy flex - uloza sie w wierszu, justify between - uloza sie po bokach, items-center wyrownaja do lini srodkowej w poziomie

```
<nav className="flex items-center justify-between">
```

---

w divie w App nadajemy padding calej apki

```
import { Nav } from "./comonents/Nav";

export function App() {
  return (
    <div className="p-10 xl:px-24">
      <Nav />
    </div>
  );
}
```

wiekszy na super large screen

---

### Menu List

tworzymy tablice ROUTES:

```
const ROUTES = ["Home", "About", "Services", "Pricing", "Contact"];
```

- div (w-full na cala strone i lg dopiero w-auto) i w srodku ul-> li
- ul dostaje bg-gray-50 jako container
- robimy .map() na tablicy ROUTES przekazujemy pojredynczy route z tablicy oraz key i oraz zwracamy tyle li ile jest w tablicy
- kazde z li dostaje cursor-pointer rounded px-3 py-2 i wstrzykujemy calosc jako JS bo chcemy aby pierwszy i===0 dostal "bg-blue-500 text-white lg:bg-transparent lg:text-blue-500" a pozostale "hover:bg-gray-100"
-

```
      <div
        className={`${!IsMobileMenuShown && "hidden"} w-full lg:block lg:w-auto`}
      >
        <ul className="flex flex-col rounded-lg border-gray-100 bg-gray-50 p-4 text-lg lg:flex-row lg:space-x-8 lg:border-none lg:bg-transparent">
          {ROUTES.map((route, i) => {
            return (
              <li
                className={`cursor-pointer rounded px-3 py-2 ${i === 0 ? "bg-blue-500 text-white lg:bg-transparent lg:text-blue-500" : "hover:bg-gray-100"}`}
                key={route}
              >
                {route}
              </li>
            );
          })}
        </ul>
      </div>
```
