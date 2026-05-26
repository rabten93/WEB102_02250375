require('dotenv').config();
const express = require('express');

const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const app = express();

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/', protectedRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('JWT Auth Server is running successfully');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  console.log('\nAvailable endpoints:');
  console.log('POST /auth/register');
  console.log('POST /auth/login');
  console.log('GET /profile');
});