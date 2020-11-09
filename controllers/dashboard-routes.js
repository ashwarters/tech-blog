const router = require('express').Router();

const withAuth = require('../utils/auth');

const { Post, User, Comment } = require('../models');



router.get('/', withAuth, (req, res) => {
    Post.findAll({
            attributes: [
                'post_title',
                'post_body',
            ],

            include: [{
                    model: Comment,
                    attributes: ['comment_text'],
                    include: {
                        model: User,
                        attributes: ['user_name']
                    }
                },
                {
                    model: User,
                    attributes: ['user_name']
                }
            ]
        })
        .then(dbPostData => {
            // serialize data before passing to template
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
            where: {
                user_name: req.params.username
            },
            attributes: [
                'post_id',
                'post_url',
                'user-name',
                'post_name'
            ],
            include: [{
                    model: Comment,
                    attributes: ['comment_name', 'user_name', 'post_id'],
                    include: {
                        model: User,
                        attributes: ['user_name']
                    }
                },
                {
                    model: User,
                    attributes: ['user_name']
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const post = dbPostData.get({ plain: true });

            res.render('edit-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;