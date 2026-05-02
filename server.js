import express from 'express';
import apiRoutes from './Routes/api.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Simple health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Unfiltered backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
