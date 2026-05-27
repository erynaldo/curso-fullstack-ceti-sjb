const router   = require('express').Router();
const auth     = require('../middleware/auth');
const isAdmin  = require('../middleware/isAdmin');
const { listUsers, updateHours } = require('../controllers/adminController');
router.get('/users',                  auth, isAdmin, listUsers);
router.patch('/users/:userId/hours',  auth, isAdmin, updateHours);
module.exports = router;