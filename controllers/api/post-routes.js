const router = require('express').Router();

const { Post, User, Comment } = require('../../models');

const authUtils = require('../../utils/auth');


router.get('/', (req, res) => {

    Post.findAll({

            attributes: [
                'post_title',
                'post_body',
            ],

        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.post('/', (req, res) => {
    Post.create({
        post_title: req.body.post_title,
        post_body: req.body.post_body,
    })

    .then(dbPostData => res.json(dbPostData))

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', authUtils, (req, res) => {
    Post.update({
            where: {
                post_id: req.params.postid
            }
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', authUtils, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })

    .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;