const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Post extends Model {}

Post.init({
        post_title: {
            type: DataTypes.STRING,
        },
        post_body: {
            type: DataTypes.STRING,
        }
    },

    {
        sequelize
    }
);

module.exports = Post;