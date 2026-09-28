// IMPORTS
import { fileURLToPath } from 'url';
import path from 'path';
// Import express using ESM syntax
import express from 'express';

/**
 * DECLARE VARIABLES
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Defining the port number the server will listen on.
const PORT = process.env.PORT || 3000;

/**
 * EXPRESS SETUP
 */

// Create an instance of an Express application
const app = express();

const name = process.env.NAME;

/**
 * Configure Express middleware
 */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/about.html'));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/products.html'));
});

/**
 * START THE SERVER
 */
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});