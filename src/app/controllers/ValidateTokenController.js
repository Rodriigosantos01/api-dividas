const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

router.get('/', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader)
            return res.status(401).send({ erro: 'No token provided' })

        const parts = authHeader.split(' ');

        if (!parts.length === 2)
            return res.status(401).send({ error: 'Token error' });

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme))
            return res.status(401).send({ error: 'Token malformatted' });

        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err)
                return res.status(401).send({ error: 'Token invalid' });

            req.userId = decoded.id;
        });

        return res.send({ status: true });
    } catch (err) {
        return res.status(400).send({
            error: `Error ao validar Token ${err}`
        })
    }
});

module.exports = app => app.use('/token', router);