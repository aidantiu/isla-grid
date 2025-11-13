import express from 'express';


const app = express();
const port = 8000;
 

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route for the homepage
app.get('/', (req, res) => {
  res.send('Welcome to the Express.js Application!');
});
 
// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});