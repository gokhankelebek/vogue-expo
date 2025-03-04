const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Store subscriptions in a JSON file
const SUBSCRIPTIONS_FILE = path.join(__dirname, '../data/subscriptions.json');

// Ensure the data directory exists
async function ensureDataDir() {
  const dataDir = path.join(__dirname, '../data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir);
  }
}

// Load existing subscriptions
async function loadSubscriptions() {
  try {
    const data = await fs.readFile(SUBSCRIPTIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return { subscribers: [] };
  }
}

// Save subscriptions
async function saveSubscriptions(subscriptions) {
  await fs.writeFile(SUBSCRIPTIONS_FILE, JSON.stringify(subscriptions, null, 2));
}

// Newsletter subscription endpoint
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    await ensureDataDir();
    const subscriptions = await loadSubscriptions();

    // Check if email already exists
    if (subscriptions.subscribers.includes(email)) {
      return res.status(409).json({ error: 'Email already subscribed' });
    }

    // Add new subscriber
    subscriptions.subscribers.push(email);
    await saveSubscriptions(subscriptions);

    // In a real application, you would:
    // 1. Add email to your mailing list service (e.g., Mailchimp)
    // 2. Send a welcome email
    // 3. Store in a proper database

    res.json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
