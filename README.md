# Vogue Expo Landing Page

A modern, conversion-optimized landing page for Vogue Expo, showcasing their expertise in expo stand and booth building. The page is designed to generate high-quality leads while building brand authority.

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-first approach
- 🎥 Video hero section
- 🖼️ Interactive portfolio gallery
- 💼 Service showcase
- 👥 Client testimonials
- 📝 Lead generation form
- 💬 Live chat widget
- 🔄 Smooth animations
- 🎯 Conversion-optimized layout

## Project Structure

```
vogue-expo/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── main.js         # JavaScript functionality
└── assets/            # Images, videos, and other media
```

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/vogue-expo.git
   cd vogue-expo
   ```

2. Add your media assets:

   - Place your logo in `assets/logo.svg`
   - Add portfolio images in `assets/work-*.jpg`
   - Add testimonial images in `assets/testimonial-*.jpg`
   - Add your hero video in `assets/hero-video.mp4`

3. Customize content:

   - Update text content in `index.html`
   - Modify gallery items in `js/main.js`
   - Adjust testimonials in `js/main.js`
   - Configure form submission in `js/main.js`

4. Deploy:
   - Upload the files to your web server
   - Or deploy using platforms like Netlify, Vercel, or GitHub Pages

## Development

### Prerequisites

- Modern web browser
- Basic understanding of HTML, CSS, and JavaScript
- Code editor (VS Code recommended)

### Local Development

1. Open the project in your code editor
2. Use a local development server (e.g., Live Server for VS Code)
3. Make changes and see them reflected in real-time

## Customization

### Colors

Edit the CSS variables in `css/styles.css`:

```css
:root {
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
  /* ... other color variables ... */
}
```

### Typography

The site uses Inter font family from Google Fonts. To change:

1. Update the Google Fonts link in `index.html`
2. Modify the `--font-primary` variable in `css/styles.css`

### Layout

Adjust the container width and spacing:

```css
:root {
  --container-width: 1200px;
  /* ... other layout variables ... */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Performance Optimization

- Minify CSS and JavaScript for production
- Optimize images using WebP format
- Implement lazy loading for images
- Use video compression for hero section

## SEO Considerations

- Optimized meta tags
- Semantic HTML structure
- Mobile-friendly design
- Fast loading times
- Structured data implementation

## Analytics Integration

To add Google Analytics:

1. Get your Google Analytics tracking code
2. Add it before the closing `</head>` tag in `index.html`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@voguexpo.com or open an issue in the repository.

## Credits

- Font Awesome for icons
- Google Fonts for typography
- Unsplash for demo images
