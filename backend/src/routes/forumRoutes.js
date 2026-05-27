const router  = require('express').Router();
const auth    = require('../middleware/auth');
const { listPosts, createPost, toggleReaction } = require('../controllers/forumController');
router.get('/',                   auth, listPosts);
router.post('/',                  auth, createPost);
router.post('/:postId/reaction',  auth, toggleReaction);
module.exports = router;