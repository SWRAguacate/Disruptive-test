const express = require('express');
const PerfilService = require('../services/profile.service');
const service = new PerfilService();
const validatorHandler = require('../middlewares/validator.handler');
const { createPerfilDto, updatePerfilDto, getIdPerfilDto } = require('../middlewares/dtos/profile.dto');
const router = express.Router();

// SELECT
router.get('/', async (req, res, next)=> {
  try {
  const { size } = req.query;
    const profile = await service.findDB(size || 1000);
    res.json({
      'success': true,
      'message': 'Perfiles encontrados',
      'Data': profile
    });
  } catch (error) {
    next(error);
  }
});

//SELECT ONE
router.get('/:id', validatorHandler(getIdPerfilDto, 'params'), async (req, res, next)=> {
  try {
    const { id } = req.params;
    const profile = await service.findOneDB(id);
   res.json({
        'success': true,
        'message': 'Perfil encontrado',
        'Data': profile
    });
  } catch (error) {
    next(error);
  }
});

//CREATE
router.post('/', validatorHandler(createPerfilDto, 'body'), async (req, res, next)=> {
  try {
    const body = req.body;
    const profile = await service.createDB(body);
    res.json({
        'success': true,
       'message': 'Perfil creado',
       'Data': profile
    });
  } catch (error) {
    next(error);
  }
});

//UPDATE
router.patch('/:id', validatorHandler(getIdPerfilDto, 'params'), validatorHandler(updatePerfilDto, 'body'), async (req, res, next)=> {
  try {
    const { id } = req.params;
    const body = req.body;
    const {original, actualizado} = await service.updateDB(id, body);
    res.json({
        'success': true,
        'message': 'Perfil actualizado',
        'Data': {
          "cambios": actualizado,
          "original": original
        }
    });
  } catch (error) {
    next(error);
  }
});

//DELETE
router.delete('/:id', validatorHandler(getIdPerfilDto, 'params'), async (req, res, next)=> {
  try {
    const { id } = req.params;
    const profile = await service.deleteDB(id);
    res.json({
        'success': true,
        'message': 'Perfil eliminado',
        'Data': profile
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
