const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'Cascade'
});

Comment.belongsTo(User, {
    foreignKey: "userId",
    onDelete: 'CASCADE'
});

module.exports = {
    User,
    Comment,
    Post
};