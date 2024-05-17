# Instalacja

## VITE

instrukcja framework Vite na stronie tailwindcsss
https://tailwindcss.com/docs/guides/vite

- zmiana main na index
- export default na export i pozniej import {App}

---

- zmiana portu:

vite.config.js

```jsx
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
  ```jsx
  {
  "plugins": ["prettier-plugin-tailwindcss"]
  }
  ```
- npm i -D vite-plugin-svgr
- npm i react-icons

# Budowanie

## Nav.jsx

w katalogu src/components/ tworzymy Nav.jsx

### Logo

- import svg jako React Component w Vite
  i opakowac w a
  ```jsx
  import NikeLogo from "../assets/nike-logo.svg?react";
  ```
  ```html
  <a href="#">
    <NikeLogo className="h-20 w-20" />
  </a>
  ```
  nadajemy wysokosc i szerokosc

### Button

- import hamburger button

  ```jsx
  import { RxHamburgerMenu } from "react-icons/rx";
  ```

  ```html
  <button>
    <RxHamburgerMenu size="{25}" />
  </button>
  ```

  nadajemy size

  na button nadajemy wlasciwosci ring na klik

  ```html
  <button
    className="hover:bg-grey-100 rounded-lg  p-2 focus:ring-2 focus:ring-gray-200"
  >
    <RxHamburgerMenu size="{25}" />
  </button>
  ```

na calym nav nadajemy flex - uloza sie w wierszu, justify between - uloza sie po bokach, items-center wyrownaja do lini srodkowej w poziomie

```html
<nav className="flex items-center justify-between"></nav>
```

a jak pozniej dolozymy **flex-wrap** to MENU LIST pojdzie do nowej linii bo ma **w-full** i bedzie samo

---

---

w divie w App nadajemy padding calej apki

```jsx
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

```jsx
const ROUTES = ["Home", "About", "Services", "Pricing", "Contact"];
```

- div (w-full na cala strone i lg dopiero w-auto) i w srodku ul-> li
- ul dostaje **bg-gray-50** jako container oraz **rounded-lg border-gray-100 bg-gray-50 p-4 text-lg p-4**
- robimy .map() na tablicy ROUTES przekazujemy pojedynczy route z tablicy oraz key={route} oraz zwracamy tyle li ile jest w tablicy
- kazde z li dostaje **cursor-pointer rounded px-3 py-2** i wstrzykujemy \`{}` calosc jako JS bo chcemy if (conditional ?: ) aby pierwszy i===0 dostal **"bg-blue-500 text-white lg:bg-transparent lg:text-blue-500" a pozostale "hover:bg-gray-100"**
-

```jsx
<div className={`${!IsMobileMenuShown && "hidden"} w-full lg:block lg:w-auto`}>
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

index.css

```css
@layer utilities {
  .flex-center {
    @apply flex items-center justify-center;
  }
}
```

- chcemy aby cart na mobile byl w lewym dolnym rogu a na lg zamiast hamburgera wiec opakowujemy to w jeszcze jednego diva i nadajemy **fixed bottom-4 left-4 lg:static** static przywraca document flow (regular default position) czyli bedzie po menu list ale pozniej na lg pojdzie w miejsce hamburgera (na lg menu zniknie i pojawi sie w srodku nav z wszystkimi mozliwosciami oraz zniknie hamburger)

```html
<div className="fixed bottom-4 left-4 lg:static">
  <div className="flex-center h-12 w-12 rounded-full bg-white shadow-md">
    <TbShoppingBag />
  </div>
</div>
```

hamburger znika na lg

```html
<button className="lg:hidden">
  <RxHamburgerMenu size="{25}" />
</button>
```

menu list na lg w rzedzie za pomoca flex-row flex-col \
na ul nadalejemy **flex flex-col lg:flex-row** (defaultowo jest flex-row jak nadamy flex)\
nie chcemy zeby ul na lg byl w-full bo przejdzie do nowej linii wiec nadajemy na divie opakowujacym **w-auto** oraz dodakowo na ul opcje **lg:bg-transparent lg:border-none lg:space-x-8** (odstep miedzy li)\
a na li **lg:bg-transparent lg:text-blue-500**\

---

chcemy aby menu pokazywalo sie poprzez klikniecie na hamburger nadajemy useState()

```jsx
const [IsMobileMenuShown, setIsMobileMenuShown] = useState(false); //defaultowo wyswietlane false
```

na lg ma byc zawsze wyswietlane wiec **lg-block** na divie MenuList a mobile **hidden** i to mozemy togglowac
wiec div idzie w backtickie

```jsx
      <div
        className={`${!IsMobileMenuShown && "hidden"} w-full lg:block lg:w-auto`}  // IsMobileMenuShown ? "" : "hidden"
      >
```

na hamburgerze jeszcze funkcja onClick:

```jsx
      <button
        onClick={() => setIsMobileMenuShown(!IsMobileMenuShown)}
      >
```

---

---

## ShoeDetail.jsx

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

```jsx
import nike1 from "../assets/n1-min.png";

{
  /* Image */
}
<div className="flex-1">
  <img src={nike1} />
</div>;
```

na lg chcemy zeby zaszedl na MenuList - robimy to poprzez ujemny margin na divie

```html
<div className="flex-1 lg:-mt-32"></div>
```

teraz nam przykrywa MenuList aby przeniesc MenuList na wierz uzywamy z-index **z-10** na calym Nav
ale samo nie dziala bo jest ten div static domyslnie i trzeba zmienic na relative

GRADIENT background pod img:

- opakowac img w diva:

```html
<div
  className="bg-gradient-to-br from-[#F637CF] from-5% via-[#E3D876] via-40% to-[#4DD4C6]"
>
  <img src="{nike1}" />
</div>
```

dodajemy tu tez **h-full** bo przy zmniejszaniu gradient z butem sie zmniejszaly takze
oraz wysrodkowujemy img poprzez **flex-center** na divie

---

dodajemy odstep miedzy Image a Descrition na divie container - space-y-4

## FONT

z https://fontsource.org/fonts/nunito-sans/install \

- npm install @fontsource-variable/nunito-sans

w index.jsx

```jsx
import "@fontsource-variable/nunito-sans";
```

w index.css

```css
@layer base {
  body {
    font-family: "Nunito Sans Variable", sans-serif;
  }
}
```

## NAV.jsx

- dodajemy warunkowy kolor bialy na li na lg

```jsx
 ${(i === 3 || i === 4) && "lg:text-white"}`
```

dodajemy tez na li **lg:hover:bg-transparent lg:hover:text-blue-500**

## SELECT.jsx (rozwijany QTY i SIZE)

tworzymy plik constant.js z tablicami:

```js
export const SIZES = [40, 41, 42, 43, 44];
export const QTYS = [1, 2, 3, 4];
```

i przekazujemy to jako props:

```html
<Select title={"QTY"} options={QTYS} />
<Select title={"SIZE"} options={SIZES} />
```

i tworzymy component Select.jsx a w nim mapujemy po tablicy options przekazywanej przez props:

```jsx
export function Select({ title, options }) {
  return (
    <select>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}
```

mozna wylaczyc w eslincie problem prop-types:
.eslintrc.cjs

```css
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": "off",
  },
```

aby wyswietlic QTY i SIZE w liscie rozwijanej dodajemy na poczatku option i value="" a w mapowanych value={option}

```jsx
<select>
  <option value="">{title}</option>
  {options.map((option) => (
    <option value={option} key={option}>
      {option}
    </option>
  ))}
</select>
```

lecz aby nie mozna go bylo wybrac ukrywamy jego widocznosc a select wprowadzamy defaultValue="" (empty)

```jsx
  <select defaultValue="">
      <option value="" disabled hidden>
        {title}
      </option>
```

stylujemy calego select:

```jsx
<select
  defaultValue=""
  className="w-24 appearance-none border border-gray-300 p-4"
>
```

obydwa Selecty + diva z cena opakowujemy w diva i nadajemy **flex** aby ustawily sie w rzedzie i odstep miedzy nimi **space-x-6**

```jsx
<div className="flex space-x-6">
  <div className="text-3xl font-extrabold md:text-6xl">100 $</div>
  <Select title={"QTY"} options={QTYS} />
  <Select title={"SIZE"} options={SIZES} />
</div>
```

dodajemy tez ikone rozwijania listy poprzez dodanie dodanie div po select ale ustawia sie pod selectem dlatego nadajemy jej **absolute** a na divie conteiner select **relative** warto tez wyzerowac **inset-y-0 lub inset-x-0** oraz **flex-center right-o pr-3**
Niestety klikanie na ikonke nie rozwija wiec trzeba dodac jeszcze **pointer-events-none**

```jsx
<div className="relative">
  ...
  <div className="flex-center pointer-events-none absolute inset-y-0 right-0 pr-3">
    <IoIosArrowDown />
  </div>
</div>
```

## Animacje

mamy kilka wbudowanych **animate-.....**
a poprzez plik tailwind.config.js mozemy stworzyc swoje
podajemy w keyframes: co w jakiej klatce ma byc zrobione otaczamy jakas nazwa (np. wiggle) a pozniej w sekcji animation: powolujemy sie na ta nazwe a nazwa tej animacji jest dostepna w tailwind

```jsx
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
```

```jsx
<div className="flex-center h-full bg-gradient-to-br from-[#F637CF] from-5% via-[#E3D876] via-40% to-[#4DD4C6]">
  <img className="animate-float" src={nike1} />
</div>
```

na buttonach inaczej (nie jest to typowa animacja):
dodajemy np. **transition active:scale-75** i mozna to wrzucic do index.css
transition dlatego aby nie bylo takiego przeskoku tylko plynnie

```css
@layer utilities {
  //...
  .btn-press-anim {
    @apply transition active:scale-75;
  }
}
```

## INFO.jsx (Card)

tworzymy ~JSON w constant.js z okreslonymi butami

```jsx
export const SHOE_LIST = [
  {
    id: 1,
    src: nike1,
    className: "bg-[#EEFFA4]",
    title: "Nike Air Max 270",
    description:
      "The Nike Air Max 270 is a lifestyle shoe that's sure to turn heads with its vibrant color gradient.",
    price: 160,
  },
];
```

a nastepnie Info.jsx (Card):

```jsx
  return (
    <div className="animate-fadeIn p-10 xl:px-24">
      {/* <Nav />
      <ShoeDetail /> */}
      <Info item={SHOE_LIST[0]} />
    </div>
  );
}
```

```jsx
export function Info({ item }) {
  return (
    <div
      className={`${item.className} max-w-xl transform cursor-pointer transition hover:scale-105`}
    >
      <div className="p-8">
        <div className="text-2xl font-bold">{item.title}</div>
        <div className="mt-10 font-semibold underline underline-offset-4">
          SHOP NOW+
        </div>
      </div>
      <img className="absolute left-[40%] top-0 h-40 w-56" src={item.src} />
    </div>
  );
}
```

stylujemy text oraz
img dajemy **absolute** i okreslona pozycje
a na divie conteiner aby sie dobrze na hover skalowalo musi byc dodany **transform transition hover:scale-105** bo jest kilka rzeczy skalowane

## NewArrivalsSection.jsx

tworzymy i stylujemy:

```jsx
export function NewArrivalsSection({ items }) {
  return (
    <div className="mt-20">
      <div className="flex-center">
        <div className="bg-[url('./assets/lines.png')] bg-center text-4xl font-extrabold">
          NEW ARRIVALS
        </div>
      </div>
    </div>
  );
}
```

aby dodac zdjecie jako tlo mozemy dodac w ten sposob **bg-[url('./assets/lines.png')]**
zaby je wszystkie Info wyswietlic mapujemy po props item gdzie przesylamy tablice z JSONami

```jsx
export function NewArrivalsSection({ items }) {
  return (
    <div className="flex-center mt-20">
      ...
      <div>
        {items.map((item) => (
          <Info key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
```

i tworzymy do tego grid **grid grid-cols-1 gap-y-24**

```jsx
<div className="mt-10 grid grid-cols-1 gap-y-24">
  {items.map((item) => (
    <Info key={item.id} item={item} />
  ))}
</div>
```

na md **gap-x-6 md:grid-cols-2**
a na xl **justify-between xl:grid-cols-[repeat(3,25%)]**

## Sidebar.jsx

tworzymy komponent Sidebar:

```jsx
export function Sidebar({ children }) {
  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-white">
      <button className="absolute right-4 top-4 p-2 font-bold text-black">
        X
      </button>
      {children}
    </div>
  );
}
```

- **fixed left-0 top-0 z-50 h-full w-full bg-white** takie stylowanie diva da nam bialy na cala strone nad wszystkim oraz pozycjonujemy button X
- nastepnie wprowadzamy "animacje" wysuwania/chowania sidebara:
  **{`... transform transition duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}**

```jsx
export function Sidebar({ children, isOpen }) {
  return (
    <div
      className={`fixed right-0 top-0 z-50 h-full w-full transform bg-white transition duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <button className="absolute right-4 top-4 p-2 font-bold text-black">
        X
      </button>
      {children}
    </div>
  );
}
```

#### Wysuwanie/chowanie (REACT):

Wysuwanie

- tworzymy useState w App.jsx

```jsx
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
```

- a App.jsx tworzymy props onClickShoppingBtn w ktorym wywolujemy funkcje z useState setIsSidebarOpen ustawiajac true

```jsx
<Nav onClickShoppingBtn={() => setIsSidebarOpen(true)} />
```

- props onClickShoppingBtn odbieramy w Nav.jsx i ustawiamy na onClick na Cart Button

```jsx
export function Nav({ onClickShoppingBtn }) {
  ...
  return (
    <nav className="relative z-10 flex flex-wrap items-center justify-between">
      ...
      {/* Cart Button */}
      <div
        onClick={onClickShoppingBtn}
        className="btn-press-anim fixed bottom-4 left-4 lg:static lg:mr-8"
      >
        <div className="flex-center h-12 w-12 cursor-pointer rounded-full bg-white shadow-md">
          <TbShoppingBag />
        </div>
      </div>
    </nav>
  );
}
```

- i to true ustawione w useState na isSidebarOpen trzeba jeszcze przeslac do Sidebar poprzez props isOpen

```jsx
<Sidebar isOpen={isSidebarOpen} />
```

Chowanie

- tak samo trzeba na funkcje z useState (setIsSidebarOpen) wyslac do Sidebara z wartoscia false przez props onClickClose

```jsx
<Sidebar isOpen={isSidebarOpen} onClickClose={() => setIsSidebarOpen(false)} />
```

- odebrac ten props w Sidebar.jsx i przypisac przez onClick do buttona X

```jsx
<button
  onClick={onClickClose}
  className="absolute right-4 top-4 p-2 font-bold text-black"
>
  X
</button>
```

Sidebar moze dostawac children i odbierac je w props i wyswietlac

```jsx
<Sidebar isOpen={isSidebarOpen} onClickClose={() => setIsSidebarOpen(false)}>
  cokolwiek jako children
</Sidebar>;

export function Sidebar({ children, isOpen, onClickClose }) {
  return (
    <div
      className={`fixed left-0 top-0 z-50 h-full w-full transform bg-white p-5 transition duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      ...
      {children}
    </div>
  );
}
```

na desktop zachodzi na calosc mozemy to ograniczyc przez **md:w-[50%] lg:w-[35%]**

- stworzyc trzeba jeszcze takiego diva overlay zeby nie mozna bylo kliknac pod sidebarem
  w divie container jest div z sidebarem i div overlay

```jsx
export function Sidebar({ children, isOpen, onClickClose }) {
  return (
    <div>
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full transform bg-white p-5 shadow-lg transition duration-300 md:w-[50%] lg:w-[35%] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        ...
      </div>

      <div className="fixed left-0 top-0 z-20 h-full w-full bg-black opacity-50" />
    </div>
  );
}
```

ale wyswietlamy tylko ten overlay jak sidebar jest otwarty

```jsx
{
  isOpen && (
    <div className="fixed left-0 top-0 z-20 h-full w-full bg-black opacity-50" />
  );
}
```
