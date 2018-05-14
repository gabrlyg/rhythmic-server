const router = require('express').Router();
const userController = require('../controllers/user');

// Get a public resource
router.get('/file/:path', (req, res) => {
  res.sendFile(req.params.path, options);
});

// User register
router.post('/register', userController.register);

// User login
router.post('/login', userController.login);

// User sign out
router.delete('/signout', userController.signOut);

// Check if a username or email is already used
router.post('/u/availiable', userController.available);

module.exports = router;
