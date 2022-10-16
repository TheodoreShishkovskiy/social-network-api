const router = require('express').Router();

const {
  getAllUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
  makeFriend,
  deleteFriend
} = require('../../controllers/user-controller');

router.route('/').get(getAllUsers).post(createUser)

router.route('/:id').get(findUserById).put(updateUser).delete(deleteUser)

router.route('/:userId/friends/:friendId').post(makeFriend).delete(deleteFriend)

module.exports = router;