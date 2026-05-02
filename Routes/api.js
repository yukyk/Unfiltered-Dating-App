import express from 'express';

const router = express.Router();

// Placeholder for future routes handled by Controllers
// e.g. router.get('/users', userController.getUsers);

router.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

export default router;
