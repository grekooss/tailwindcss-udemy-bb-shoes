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
- npm i -D vite-plugin-svgr
- npm i react-icons

# Budowanie

w katalogu src/components/ tworzymy Nav.jsx
