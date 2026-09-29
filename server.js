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

const NODE_ENV = process.env.NODE_ENV || 'production';
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

// Setting EJS as the view engine
app.set('view engine', 'ejs');
// Tells Express where to find the view templates
app.set('views', path.join(__dirname, 'src/views'));

/**
 * Routes
 */
app.get('/', (req, res) => {
    const title = "Welcome Home";
    res.render('home', { title });
});

app.get('/about', (req, res) => {
    const title = "About Me";
    res.render('about', { title });
});

app.get('/products', (req, res) => {
    const title = "Our Products";
    res.render('products', { title });
});

/**
 * START THE SERVER
 */
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});