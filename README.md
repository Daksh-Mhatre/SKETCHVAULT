# SKETCHVAULT.

> things i didn’t delete.

SKETCHVAULT is a Swiss-minimal art portfolio built to present sketches, artworks, and commission work through a clean editorial layout.

It is structured like a visual archive — monochrome, grid-based, sharp, and art-first.

---

## Preview

A minimal portfolio experience featuring:

- Swiss-inspired visual system
- Greyscale editorial layout
- Artwork gallery with filtering
- Fullscreen artwork preview modal
- Commission booking call-to-action
- Responsive navigation and pages

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React

---

## Features

- Clean Swiss-style header
- Home page with featured artwork
- Gallery page with category filters
- Artwork modal preview
- About page
- Contact / commission section
- Responsive mobile navigation
- Greyscale design system with red accent

---

## Project Structure

```txt
SKETCHVAULT/
├── public/
│   └── images/
│       ├── artwork-01.jpg
│       ├── artwork-02.jpg
│       └── ...
├── src/
│   ├── components/
│   │   ├── SwissHeader.tsx
│   │   ├── SwissFooter.tsx
│   │   ├── ArtworkModal.tsx
│   │   └── ScrollToTop.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── AboutPage.tsx
│   │   └── ContactPage.tsx
│   ├── data/
│   │   └── artworks.ts
│   ├── utils/
│   │   └── cn.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── vite.config.ts
