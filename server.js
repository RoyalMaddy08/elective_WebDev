const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle API requests with a simple mock backend
app.use(express.json());

// Mock API endpoints for form submissions
app.post('/api/waitlist', (req, res) => {
  console.log('Waitlist submission:', req.body);
  // In a real app, this would save to a database
  res.status(200).json({ success: true, message: 'Added to waitlist successfully' });
});

app.post('/api/contact', (req, res) => {
  console.log('Contact form submission:', req.body);
  // In a real app, this would save to a database and/or send an email
  res.status(200).json({ success: true, message: 'Message sent successfully' });
});

app.post('/api/bookings', (req, res) => {
  console.log('Booking submission:', req.body);
  // In a real app, this would save to a database
  res.status(200).json({ 
    success: true, 
    message: 'Booking created successfully',
    booking: {
      id: Math.floor(Math.random() * 1000) + 1000,
      ...req.body,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
  });
});

app.post('/api/payments', (req, res) => {
  console.log('Payment submission:', req.body);
  // In a real app, this would process the payment through a gateway
  res.status(200).json({ 
    success: true, 
    message: 'Payment processed successfully',
    transaction: {
      id: 'TXN' + Math.floor(Math.random() * 10000),
      amount: req.body.amount,
      status: 'completed',
      createdAt: new Date().toISOString()
    }
  });
});

// Authentication endpoints (mock)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  // This is just a mock - in a real app, you would validate against a database
  if (email && password) {
    res.status(200).json({
      success: true,
      user: {
        id: 1,
        name: 'John Doe',
        email: email,
        role: 'user'
      },
      token: 'mock-jwt-token'
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  
  // This is just a mock - in a real app, you would validate and save to a database
  if (name && email && password) {
    res.status(201).json({
      success: true,
      user: {
        id: 2,
        name: name,
        email: email,
        role: 'user'
      },
      token: 'mock-jwt-token'
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Invalid registration data'
    });
  }
});

// For all other routes, serve the index.html file
// This allows for client-side routing in single-page applications
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
