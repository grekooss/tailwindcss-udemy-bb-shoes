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

a jak pozniej dolozymy flex-wrap to MENU LIST pojdzie do nowej linii bo ma w-full i bedzie samo

---

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

---

### Menu List

tworzymy tablice ROUTES:

```
const ROUTES = ["Home", "About", "Services", "Pricing", "Contact"];
```

- div (w-full na cala strone i lg dopiero w-auto) i w srodku ul-> li
- ul dostaje **bg-gray-50** jako container oraz **rounded-lg border-gray-100 bg-gray-50 p-4 text-lg p-4**
- robimy .map() na tablicy ROUTES przekazujemy pojedynczy route z tablicy oraz key={route} oraz zwracamy tyle li ile jest w tablicy
- kazde z li dostaje **cursor-pointer rounded px-3 py-2** i wstrzykujemy \`{}` calosc jako JS bo chcemy if (conditional ?: ) aby pierwszy i===0 dostal **"bg-blue-500 text-white lg:bg-transparent lg:text-blue-500" a pozostale "hover:bg-gray-100"**
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

### Cart button

- uzywamy pluginu do vsc "react icons auto import"
- TbShoppingBag opakowujemy w diva i nadajemy mu **h-12 w-12 rounded-full bg-white shadow-md** - stworzy sie okrag z cieniem ale nie wycentrowany jest ikonka w stosunku do diva wiec nadajemy **flex-center** na div (tworzymy je w index.css)

```
index.css

@layer utilities {
  .flex-center {
    @apply flex items-center justify-center;
  }
}
```

- chcemy aby cart na mobile byl w lewym dolnym rogu a na lg zamiast hamburgera wiec opakowujemy to w jeszcze jednego diva i nadajemy **fixed bottom-4 left-4 lg:static** static przywraca document flow (regular default position) czyli bedzie po menu list ale pozniej na lg pojdzie w miejsce hamburgera (na lg menu zniknie i pojawi sie w srodku nav z wszystkimi mozliwosciami oraz zniknie hamburger)

```
      <div className="fixed bottom-4 left-4 lg:static">
        <div className="flex-center h-12 w-12 rounded-full bg-white shadow-md">
          <TbShoppingBag />
        </div>
      </div>
```

hamburger znika na lg

```
  <button className="lg:hidden">
    <RxHamburgerMenu size={25} />
  </button>
```

menu list na lg w rzedzie za pomoca flex-row flex-col \
na ul nadalejemy **flex flex-col lg:flex-row** (defaultowo jest flex-row jak nadamy flex)\
nie chcemy zeby ul na lg byl w-full bo przejdzie do nowej linii wiec nadajemy na divie opakowujacym **w-auto** oraz dodakowo na ul opcje **lg:bg-transparent lg:border-none lg:space-x-8** (odstep miedzy li)\
a na li **lg:bg-transparent lg:text-blue-500**\

---

chcemy aby menu pokazywalo sie poprzez klikniecie na hamburger nadajemy useState()

```
const [IsMobileMenuShown, setIsMobileMenuShown] = useState(false); //defauletowo nie wyswietlane false
```

na lg ma byc zawsze wyswietlane wiec **lg-block** na divie MenuList a mobile **hidden** i to mozemy togglowac
wiec div idzie w backtickie

```
      <div
        className={`${!IsMobileMenuShown && "hidden"} w-full lg:block lg:w-auto`}  // IsMobileMenuShown ? "" : "hidden"
      >
```

na hamburgerze jeszcze funkcja onClick:

```
      <button
        onClick={() => setIsMobileMenuShown(!IsMobileMenuShown)}
      >
```

---

---

## ShoeDetail

- dwa divy (image i description) opakowane w diva container zajmuja dokladnie po polowie wiec uzywamy **flex-1** na obydwoch divach
- na divie container robimy **flex flex-col lg:flex-row-reverse**

### Description

---

- tytul buta jako div i stylowanie: **text-5xl font-black md:text-9xl**
- opis jako kolejny div (zmieniamy zawartosc w string w klamry {} zeby nie bylo problemu z tekstem) i stylowanie: **font-medium md:text-xl**
- cena - stylowanie: **text-3xl font-extrabold md:text-xl**
- button - add to bag - **h-14 w-44 bg-black text-white hover:bg-gray-900 active:bg-gray-700**
- view details jako link <a href=> stylowanie **text-lg font-bold underline underline-offset-4**
- view details jako link <a href=> stylowanie **text-lg font-bold underline underline-offset-4**text-lg font-bold underline underline-offset-4

---

- odstep miedzy wszystkimi:
  na divie od description **space-y-6** \
- odstep w poziomie miedzy button a link a: trzeba to opadkowac w diva i nadac mu space-x-10

---

### Image

dodajemy **img src={nike1}** w diva image

```
import nike1 from "../assets/n1-min.png";

      {/* Image */}
      <div className="flex-1">
        <img src={nike1} />
      </div>
```

---

dodajemy odstep miedzy Image a Descrition na divie container - space-y-4
