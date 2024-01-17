const {thought, user} = require('../models');

const userController = {

    getAllUsers(req, res) {
        user.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUser => res.json(dbUser))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getUserById({params}, res) {
        user.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
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

    createUser({body}, res) {
        user.create(body)
        .then(dbUser => res.json(dbUser))
        .catch(err => res.json(err));
    },

    updateUser({params, body}, res) {
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

    deleteUser({params}, res) {
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

    addFriend({params}, res) {
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

