# Pathline Animation

This is a demonstration of animating SVG objects along a path. I used `framer-motion` animation library and created SVG paths using Figma (see link below).

Look out for the `<MotionPath />` wrapper component. It can that can be applied to any SVG path and controlled via the `AnimateEvents` object (powered by the DOM CustomEvent Object).

## Concept Design
Visit [Figma Link](https://www.figma.com/design/3RnSS4apvdsYBj88thxp58/Polytope-Pathline-Animation-Concept?node-id=0-1&t=NZJfqF0ynKOKa0l3-1) to see final concept idea.

## Getting Started
### Install dependencies

```bash
> npm install
```

### Start Dev Server
To start the development server, run the development server:

```bash
> npm run dev
# or
> yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you wish to run in a different port locally, run:

```bash
> PORT=4800 npm run dev
# or
> npm run dev --port=4800
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
