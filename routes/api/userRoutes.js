const router = require('express').Router();

const {
    getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    createFriend,
    deleteFriend
} = require('../../controllers/user-controller');

router.route('/').get(getUsers).post(createUsers);

router.route('/:id').get(getUsersById).put(updateUsers).delete(deleteUsers);

router.route('/:userId/friends/:friendId').post(createFriend).delete(deleteFriend);

module.exports = router;