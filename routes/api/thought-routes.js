const router = require('express').Router();

const {
  getAllThoughts,
  findThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts);

router.route('/:userId').post(createThought);

router.route('/:thoughtId').get(findThoughtById).put(updateThought).delete(deleteThought);

router.route('/reaction/:thoughtId').post(addReaction);

router.route('/reaction/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;