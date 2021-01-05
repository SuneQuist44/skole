const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

// Schema
const User = require('../Schema/User');

router.post('/user', async (req, res) => {
    try {
        const user = new User(req.body);
        const token = await user.generateAuthToken();

        await user.save({ user, token });
        res.status(201).send(user);

    } catch (err) { res.status(400).send(err.name + ': ' + err.message) };
});

router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({ user, token });
    } catch (err) { res.status(404).send(); };
});

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(tokens => { return tokens.token !== req.token });

        await req.user.save();
        res.send();
    } catch (err) { req.status(500).send(); };
});

router.post('/user/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];

        await req.user.save();
        res.send();
    } catch (err) { res.status(500).send(); };
});

// GET, UPDATE, DELETE

router.get('/user/me', auth, async (req, res) => {
    res.send(req.user);
});

router.patch('/user/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(operation => { return allowedUpdates.includes(operation) });

    if (!isValidOperation) { return res.status(400).send('Invalid operation') };

    try {
        updates.forEach(update => { req.user[update] = req.body[update]; });

        await req.user.save();
        res.send(req.user);
    } catch (err) { res.status(400).send('Invalid updates.') };
});

router.delete('/user/me', auth, async (req, res) => {
    try {
        await req.user.remove();

        res.send(req.user);
    } catch (err) { res.status(500).send(); };
});

module.exports = router;