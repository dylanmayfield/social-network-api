const { thought, user } = require('../models');

const thoughtController = {

    getAllThought(req, res) {
        thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThought => res.json(dbThought))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getThoughtById({params}, res) {
        thought.findOne({_id: params.id})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThought => {
            if(!dbThought) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThought);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    createThought({body}, res) {
        thought.create(body)
        .then(({_id}) => {
            return user.findOneAndUpdate({_id: body.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(dbThought => {
            if(!dbThought) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThought);
        })
        .catch(err => res.json(err));
    },

    updateThought({params, body}, res) {
        thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbThought => {
            if(!dbThought) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThought);
        })
        .catch(err => res.json(err))

    },

    deleteThought({params}, res) {
        thought.findOneAndDelete({_id: params.id})
        .then(dbThought => {
            if(!dbThought) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThought);
        })
        .catch(err => res.json(err));
    },

    createReaction({params, body}, res) {
        thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .then(dbThought => {
            if(!dbThought) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThought);
        })
        .catch(err => res.json(err));
    },

    deleteReaction({params}, res) {
        thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new: true})
        .then(dbThought => res.json(dbThought))
        .catch(err => res.json(err));
    }

};

module.exports = thoughtController;


