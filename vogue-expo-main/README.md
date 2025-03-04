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
- 🔒 SSL/Security implementation
- 🌐 Multi-language support
- 📊 Performance metrics tracking
- ♿ WCAG accessibility compliance

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
- Implement CDN for asset delivery
- Add service worker for offline functionality
- Enable HTTP/2 for faster resource loading

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

## Contact Form Integration

The contact form is set up to handle submissions via email notifications. Form submissions are sent via email to the specified recipient.

### Setting Up Email Notifications

1. Set up environment variables:

   ```bash
   # For production email sending
   export EMAIL_USER=your-email@gmail.com
   export EMAIL_PASS=your-app-specific-password
   ```

2. Alternatively, update the values directly in `/api/contact.js` (not recommended for production)

### Contact Form Features

- Client-side validation with immediate feedback
- Server-side validation for security
- Error handling with user-friendly messages
- Success confirmation with thank you message
- Responsive design for all devices
- Accessibility compliance (WCAG)
- Email notifications for immediate response

## Server Setup

The project includes a Node.js server for handling API requests:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   node server.js
   ```

3. The server will run on http://localhost:3001

## API Endpoints

- **POST /api/contact**: Handle contact form submissions
- **POST /api/newsletter**: Handle newsletter subscriptions

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

## Testing

### Unit Testing

- Jest for JavaScript components
- Cypress for E2E testing

### Performance Testing

- Lighthouse scores
- Web Vitals monitoring

## Deployment Checklist

- [ ] Compress all images
- [ ] Minify CSS/JS
- [ ] Test all forms
- [ ] Verify meta tags
- [ ] Check SSL certificate
- [ ] Test cross-browser compatibility
