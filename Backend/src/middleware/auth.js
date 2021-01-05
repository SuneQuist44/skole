const jwt = require('jsonwebtoken');
const User = require('../Schema/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const bearer = jwt.verify(token, 'thisismynewcourse');
        const user = await User.findOne({ _id: bearer._id, 'tokens.token': token });

        if (!user) throw new Error();

        req.token = token;
        req.user = user;
        next();
    } catch (err) { res.status(401).send({ error: 'Please authenticate.' }); };
};

module.exports = auth;