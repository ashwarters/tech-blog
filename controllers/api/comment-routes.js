const router = require('express').Router();

const { Comment } = require('../../models');

const authUtils = require('../../utils/auth');


router.post('/', authUtils, (req, res) => {

    if (req.session) {
        Comment.create({
            comment_text: req.body,
            user_id: req.session.user_id
        })

        .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});



module.exports = router;