const express = require('express');
const authMiddleware = require('../middlewares/Auth')

const Dividas = require('../models/Divida');

const router = express.Router();
router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const dividas = await Dividas.find();

        return res.send( dividas );
    } catch (err) {
        return res.status(400).send({
            error: `Error ao listar dividas ${err}`
        })
    }
});

router.post('/', async (req, res) => {
    try {
        const divida = await Dividas.create(req.body);

        return res.send({ divida })
    } catch (err) {
        return res.status(400).send({ error: `Error ao criar divida ${err}` })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const divida = await Dividas.findById(id);
        if (!divida)
            return res.status(404).send({ error: 'Divida não encontrada' })

        const newDivida = await Dividas.findOneAndUpdate({ _id: id }, req.body, { new: true });

        return res.send(newDivida)
    } catch (err) {
        return res.status(400).send({ error: `Erro ao alterar divida ${err}` })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const divida = await Dividas.findById(id);

        if (!divida)
            return res.status(404).send({ error: 'Divida não encontrada' })

        await Dividas.findOneAndRemove({ _id: id });

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: `Error ao deletar divida:  ${err}` })
    }
});

module.exports = app => app.use('/dividas', router);