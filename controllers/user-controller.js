const { user , thought } = require('../models');


const userController = {

    getAllUsers(req, res) {
        user.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUser => res.json(dbUser))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getUsersById({params}, res) {
        user.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUser => {
            if(!dbUser) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUser);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    createUsers({body}, res) {
        user.create(body)
        .then(dbUser => res.json(dbUser))
        .catch(err => res.json(err));
    },

    updateUsers({params, body}, res) {
        user.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUser => {
            if(!dbUser) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUser);
        })
        .catch(err => res.json(err))

    },

    deleteUsers({params}, res) {
        user.findOneAndDelete({_id: params.id})
        .then(dbUser => {
            if(!dbUser) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUser);
        })
        .catch(err => res.json(err));
    },

    createFriend({params}, res) {
        user.findOneAndUpdate({_id: params.userId}, {$push: {friends: params.friendId}}, {new: true})
        .then(dbUser => {
            if(!dbUser) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUser);
        })
        .catch(err => res.json(err));
    },

    deleteFriend({params}, res) {
        user.findOneAndUpdate({_id: params.userId}, {$pull: {friends: params.friendId}}, {new: true})
        .then(dbUser => {
            if(!dbUser) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUser);
        })
        .catch(err => res.json(err));
    },

};

module.exports = userController;

