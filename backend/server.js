// const jsonServer = require('json-server');
// const path = require('path');
// const auth = require('json-server-auth');

// const server = jsonServer.create();
// const router = jsonServer.router(path.join(__dirname, 'db.json'));
// const middlewares = jsonServer.defaults();

// server.use(middlewares);
// server.use(auth);
// server.use(router);

// const port = 5000;
// server.listen(port, () => {
//   console.log(`JSON Server is running on http://localhost:${port}`);

// const routes = router.db.getState();
// console.log('Available endpoints:');
// Object.keys(routes).forEach(route => {
//     console.log(`http://localhost:${port}/${route}`);
//   });
// });

// import jsonServer from 'json-server';
const jsonServer = require('json-server');
const path = require('path');
const auth = require('json-server-auth');
const { sendBookingConfirmation } = require('./emailService.js'); // Use CommonJS syntax

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(auth);
server.use(router);

// Custom endpoint to demonstrate usage of sendBookingConfirmation
server.post('/api/confirm-booking', async (req, res) => {
  const { email, professional, startDateTime, endDateTime } = req.body;

  try {
    await sendBookingConfirmation(email, { professional, startDateTime, endDateTime });
    res.status(200).json({ message: 'Confirmation email sent.' });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    res.status(500).json({ message: 'Failed to send confirmation email.' });
  }
});

// Custom endpoint to list available endpoints
server.get('/endpoints', (req, res) => {
  const endpoints = {
    '/users': 'Get users',
    '/bookings': 'Create bookings and send confirmation email',
    '/provinces': 'Get provinces',
    '/hospitals': 'Get hospitals',
    '/psychologists': 'Get psychologists',
    '/doctors': 'Get doctors',
    '/listings': 'Get listings'
  };
  res.json(endpoints);
});

const port = 5000;
server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
  
  // Print available endpoints to the console
  console.log('Available endpoints:');
  Object.keys(router.db.getState()).forEach(route => {
    console.log(`http://localhost:${port}/${route}`);
  });
});

