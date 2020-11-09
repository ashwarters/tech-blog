const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {

    User.findAll({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.post('/', (req, res) => {
    User.create({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password
        })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_name = dbUserData.user_name;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })

    router.post('/login', withAuth, (req, res) => {
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'This email has not been registered' });
                return;
            }

            const validPassword = dbUserData.checkPassword(req.body.password);


            if (!validPassword) {
                res.status(400).json({ message: 'Please enter correct password' });
                return;
            }

            req.session.save(() => {
                req.session.user_name = dbUserData.user_name;
                req.session.loggedIn = true;

                res.json({ user: dbUserData, message: 'Loin Successful' });
            });
        });
    });

    router.post('/logout', withAuth, (req, res) => {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }

    });


    router.put('/:id', withAuth, (req, res) => {
        User.update(req.body, {
                individualHooks: true,
                where: {
                    user_name: req.params.username
                }
            })
            .then(dbUserData => {
                if (!dbUserData[0]) {
                    res.status(404).json({ message: 'This user id can not be found' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });

    });
});


module.exports = router;