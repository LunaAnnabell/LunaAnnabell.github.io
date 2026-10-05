# Luna Annabell Linné Jensen | Portfolio

This repository contains the personal portfolio website for Luna Annabell Linné Jensen, a multidisciplinary designer and developer with a background in digitalisation, application development, interaction design, and art and technology. The site presents selected projects, academic work, creative practice, and professional profile in a responsive, visually focused format.

## Overview

The portfolio highlights:

- Featured project case studies across UX, HCI, AI, and digital interaction
- Additional creative and technical work from academic and personal projects
- An art portfolio that reflects the visual and material side of the practice
- Education, technical skills, and professional background
- Direct contact links and downloadable CV access

The site is built as a lightweight static web project using HTML, CSS, and JavaScript, making it easy to maintain, host, and extend.

## Tech Stack

- HTML5
- CSS3
- JavaScript (vanilla)
- Static media assets for portfolio content and project visuals
- GitHub Pages compatible structure

## Project Structure

```text
.
├── index.html              # Homepage and main portfolio landing page
├── art.html                # Art portfolio page
├── about.html              # About section page
├── content/                # Public project content pages
│   ├── projects/          # Main project case studies
│   └── other-projects/     # Additional portfolio case studies
├── assets/                 # Website assets used in production
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   ├── data/              # Structured site data (for example, skills.json)
│   ├── images/            # General website imagery and extracted project media
│   └── art/               # Personal art portfolio assets
├── README.md               # Project documentation
├── .gitignore              # Ignores local-only or non-public files
├── Extract/                # Local-only conversion/extraction scripts (kept out of the website upload)
└── temp/                   # Optional local temp folder
```

## Local Development

This is a static website, so there is no build step or backend required.

### Option 1: Open directly in a browser

Open `index.html` in a browser to view the site locally.

### Option 2: Run a local web server

From the project root, run:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Deployment

This portfolio is suitable for deployment on GitHub Pages or any static hosting platform.

### GitHub Pages

1. Push the repository to GitHub.
2. Open the repository settings.
3. Enable GitHub Pages.
4. Select the root folder as the publishing source.

## Project Maintenance

To update the portfolio content:

- Edit `index.html` to change featured work, biography, and homepage structure.
- Update `assets/data/skills.json` to revise the skills overview.
- Replace assets in `assets/images/` and `assets/art/` with new project or artwork visuals.
- Adjust styling in `assets/css/` to refine the layout and design system.
- Keep `Extract/` and any local-processing files out of the public deployment if they are not needed for the website itself.

## Notes

- The site is intentionally lightweight and does not require a framework or server-side processing.
- Project pages and visual assets are organized for straightforward extension as new work is added.
- Consistent file naming and relative paths are important when updating sections or media.

## License

This repository is intended for personal portfolio use. If any artwork, assets, or third-party materials are included, their licensing terms should be reviewed separately.

## Contact

- LinkedIn: https://www.linkedin.com/in/luna-annabell-linn%C3%A9-jensen
- GitHub: https://github.com/LunaAnnabell
- Email: lunaannabell@outlook.dk
