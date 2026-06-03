# Marc Airon T. Cantal - Portfolio

A production-ready, cyberpunk-themed personal portfolio website built with modern web technologies. This project features high-performance canvas animations, glitch effects, neon geometry, and a fully custom CSS architecture.

## 🚀 Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Custom CSS (No Tailwind, No CSS-in-JS libraries)
- **Icons:** Lucide React
- **Fonts:** Orbitron (Display/Headings), Share Tech Mono (Body/Code)

## 📁 Folder Structure

```
src/
├── components/
│   ├── About/          # Split layout bio and statistics
│   ├── Contact/        # Contact form and social links
│   ├── CursorTrail/    # Custom neon cursor trail canvas
│   ├── Education/      # Academic timeline
│   ├── Experience/     # Professional timeline
│   ├── Footer/         # Footer navigation
│   ├── Hero/           # Particle canvas, glitch text, typewriter
│   ├── Navbar/         # Glassmorphic top navigation
│   ├── Preloader/      # Initialization scanner sequence
│   ├── Projects/       # Glass card project grids
│   └── Skills/         # Matrix rain canvas and skill badges
├── hooks/
│   └── useScrollReveal.ts  # IntersectionObserver for fade-in animations
├── App.tsx             # Root component wrapping
├── App.css             # Main layout styles
├── index.css           # Global resets, themes, and CSS variables
└── main.tsx            # React entry point
```

## 🛠️ How to run locally

1. Ensure you have Node.js installed on your machine.
2. Clone this repository or download the source code.
3. Open a terminal in the root directory and install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the displayed URL (usually `http://localhost:3000` or `http://localhost:5173`) in your browser.

## 🏗️ How to build for production

1. Run the build command:
   ```bash
   npm run build
   ```
2. The optimized, production-ready static assets will be generated in the `dist/` directory.

## 🎨 How to customize

- **Profile Image:** Replace `public/images/marc-graduation.jpg` with your own image, keeping the exact same filename, or update the `src` attribute in `src/components/Hero/Hero.tsx`.
- **CV File:** Place your CV at `public/files/marc-cv.pdf` for the download button to work correctly.
- **Social Links:** Update your URLs directly in `src/components/Contact/Contact.tsx`.
- **Color Theme:** Modify the root CSS variables in `src/index.css` to instantly change the neon color mappings across the entire application.

## 📜 License

MIT
