const router = require('express').Router();

const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({

            include: [
                User
            ]
        })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            console.log(dbPostData[0]);
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});


router.get('/post/:id', (req, res) => {
    Post.findOne({
            where: {
                user_name: req.params.id
            },
            attributes: [
                'post_id',
                'post_url',
                'post_name',
                'user_name'
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

            res.render('single-post', {
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