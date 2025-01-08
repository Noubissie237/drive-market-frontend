

## Création du projet
1. Création du nouveau projet React en utilisant Vite

```bash
npm create vite@latest frontend -- --template react-ts
cd frontend
```

2. Une fois le projet créé, installons les dépendances nécessaires :

```bash
# Installation des dépendances de base
npm install

# Installation de Tailwind CSS et ses dépendances
npm install -D tailwindcss postcss autoprefixer
npm install class-variance-authority clsx tailwind-merge

# Installation de Shadcn/ui et ses dépendances
npm install @radix-ui/react-slot
npm install lucide-react
```

3. Initialisons Tailwind CSS :

```bash
npx tailwindcss init -p
```

4. Configurons Tailwind CSS. Modifions le fichier `tailwind.config.js` :

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {},
  },
  plugins: [],
}
```

5. Modifions le fichier `src/index.css` pour inclure les directives Tailwind :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. Créons une structure de dossiers organisée dans `src/` :

```
src/
├── components/
│   ├── ui/
│   └── layouts/
├── pages/
├── hooks/
├── services/
└── types/
```

Pour créer cette structure, exécuter :

```bash
mkdir -p src/components/ui src/components/layouts src/pages src/hooks src/services src/types
```

7. Enfin, lancer le serveur de développement :

```bash
npm run dev
```