# Neurex UI

A modern, registry-first React UI framework built on top of Base UI, Tailwind CSS, and a full design-token system.

---

## ✨ Overview

Neurex UI is not a traditional component library.

Instead of installing components as dependencies, Neurex uses a CLI to generate **copyable, editable components directly into your project**.

```bash
npx neurex-ui add button
```

This gives you full control over your UI without vendor lock-in.

---

## 🚀 Key Features

- 🧱 **Registry-first architecture** — components are copied, not imported
- 🎨 **Tailwind-first DX** — familiar utility-based styling
- 🧠 **Design tokens** — full design-system foundation under the hood
- ♿ **Accessible by default** — powered by Base UI primitives
- ⚡ **CLI automation** — zero manual setup
- 🔄 **Safe updates** — no silent overwrites of user code
- 🧩 **Flexible API** — variants + `className` overrides
- 🧬 **Composable components** — simple + advanced usage patterns
- 🌗 **Multi-theme support** — no runtime provider required

---

## 📦 Installation

```bash
npx neurex-ui init
```

Then add components:

```bash
npx neurex-ui add button
npx neurex-ui add dialog textfield
```

---

## 🧠 How It Works

```txt
Neurex Registry
        ↓
Neurex CLI
        ↓
Your Project
        ↓
Your Components (fully owned)
```

Components are installed into your project:

```txt
components/ui/Button/
├── Button.tsx
├── Button.types.ts
└── Button.variants.ts
```

You can modify them freely.

---

## 🎯 Philosophy

```txt
You own the code.
Neurex provides the system.
```

- No black-box components
- No forced abstractions
- No lock-in

---

## 🏗️ Architecture

Neurex is built around four core layers:

```txt
CLI + Registry
    ↓
Components (copyable)
    ↓
Tailwind Styling
    ↓
Design Tokens (source of truth)
```

Internally:

- **Base UI** → behavior & accessibility
- **Neurex** → API, styling, system design

---

## 🎨 Styling & Tokens

Neurex uses a full token system internally:

```txt
primitives → semantics → components → themes
```

But the developer experience stays simple:

```tsx
<Button variant="primary" className="w-full" />
```

---

## 🌗 Theming

Neurex uses CSS variables for theming:

```css
:root { ... }
.dark { ... }
.theme-brand { ... }
```

You can control themes using:

- class toggling
- `next-themes`
- your own logic

No provider required.

---

## ⚡ CLI Commands

```bash
neurex-ui init
neurex-ui add <component...>
neurex-ui update <component...>
neurex-ui update --all
neurex-ui list
neurex-ui doctor
```

Interactive mode:

```bash
neurex-ui add
```

---

## 🔄 Updates

Neurex respects your code.

- ✅ unchanged files → updated automatically
- ⚠️ modified files → conflict shown
- ❌ no silent overwrites

---

## 🧩 Example

```tsx
import { Button } from "@/components/ui/Button"

export function App() {
  return (
    <Button variant="primary">
      Click me
    </Button>
  )
}
```

---

## 📚 Status

🚧 Early development  
Architecture is locked and implementation is in progress.

---

## 🧠 Inspiration

- shadcn/ui
- Radix UI
- Base UI
- Material UI
- modern design system architectures

---

## 📄 License

MIT
