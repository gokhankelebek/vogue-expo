const express = require('express');
const path = require('path');
const chokidar = require('chokidar');
const app = express();

// Watch /assets directory for new image files
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
const assetsDir = path.join(__dirname, 'assets');

const watcher = chokidar.watch(assetsDir, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
});

watcher.on('add', filePath => {
  const ext = path.extname(filePath).toLowerCase();
  if (imageExtensions.includes(ext)) {
    console.log(`New image added: ${filePath}`);
    // You can add further actions here, e.g., notify frontend, process image, etc.
  }
});

// Body parser for JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// API routes
app.use('/api', require('./api/newsletter'));
app.use('/api', require('./api/contact'));

// Serve blog pages
app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog.html'));
});

app.get('/blog/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog', `${req.params.slug}.html`));
});

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle 404s
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
