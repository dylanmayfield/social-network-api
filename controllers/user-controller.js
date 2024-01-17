const { User } = require('../models');


const userController = {

    getAllUsers(req, res) {
        User.find({})
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
        User.findOne({_id: params.id})
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
        User.create(body)
        .then(dbUser => res.json(dbUser))
        .catch(err => res.json(err));
    },

    updateUsers({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
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
        User.findOneAndDelete({_id: params.id})
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
        User.findOneAndUpdate({_id: params.userId}, {$push: {friends: params.friendId}}, {new: true})
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
        User.findOneAndUpdate({_id: params.userId}, {$pull: {friends: params.friendId}}, {new: true})
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

