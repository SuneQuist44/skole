const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

// Schema
const Basket = require('../Schema/Basket');

router.post('/basket/me', auth, async (req, res) => {
    const basket = new Basket({ ...req.body, user: req.user._id });

    try {
        await basket.save();
        res.status(201).send(basket);
    } catch (err) { res.status(400).send() };
});

router.get('/basket/me', auth, async (req, res) => {
    try {
        const basket = await Basket.find({ user: req.user._id })

        res.send(basket);
    } catch (err) { res.status(500).send(err.name + ': ' + err.message) };
});

router.patch('/basket/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'amount', 'cost', 'image'];
    const isValidOperation = updates.every(operation => { return allowedUpdates.includes(operation) });

    if (!isValidOperation) { return res.status(400).send('Invalid operation') };

    try {
        const basket = await Basket.findOne({ _id: req.params.id, user: req.user._id });
        if (!basket) res.status(404).send();

        updates.forEach(update => basket[update] = req.body[update]);
        await basket.save();
        res.send(basket);
    } catch (err) { res.status(400).send() };
});

router.delete('/basket/:id', auth, async (req, res) => {
    try {
        const basket = await Basket.findOneAndDelete({ _id: req.params.id, user: req.user._id });

        if (!basket) res.status(404).send();
        res.send(basket);
    } catch (err) { res.status(500).send(err) };
});

module.exports = router;