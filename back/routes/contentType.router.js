const express = require('express');
const ContentTypeService = require('../services/contentType.service');
const service = new ContentTypeService();
const validatorHandler = require('../middlewares/validator.handler');
const { createContentTypeDto, updateContentTypeDto, getIdContentTypeDto } = require('../middlewares/dtos/contentType.dto');
const router = express.Router();

// SELECT
router.get('/', async (req, res, next)=> {
  try {
  const { size } = req.query;
    const contentType = await service.findDB(size || 1000);
    res.json({
      'success': true,
      'message': 'Tipos de contenido encontrados',
      'Data': contentType
    });
  } catch (error) {
    next(error);
  }
});

//SELECT ONE
router.get('/:id', validatorHandler(getIdContentTypeDto, 'params'), async (req, res, next)=> {
  try {
    const { id } = req.params;
    const contentType = await service.findOneDB(id);
   res.json({
        'success': true,
        'message': 'Tipo de contenido encontrado',
        'Data': contentType
    });
  } catch (error) {
    next(error);
  }
});

//CREATE
router.post('/', validatorHandler(createContentTypeDto, 'body'), async (req, res, next)=> {
  try {
    const body = req.body;
    const contentType = await service.createDB(body);
    res.json({
        'success': true,
       'message': 'Tipo de contenido creado',
       'Data': contentType
    });
  } catch (error) {
    next(error);
  }
});

//UPDATE
router.patch('/:id', validatorHandler(getIdContentTypeDto, 'params'), validatorHandler(updateContentTypeDto, 'body'), async (req, res, next)=> {
  try {
    const { id } = req.params;
    const body = req.body;
    const {original, actualizado} = await service.updateDB(id, body);
    res.json({
        'success': true,
        'message': 'Tipo de contenido actualizado',
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
router.delete('/:id', validatorHandler(getIdContentTypeDto, 'params'), async (req, res, next)=> {
  try {
    const { id } = req.params;
    const contentType = await service.deleteDB(id);
    res.json({
        'success': true,
        'message': 'Tipo de contenido eliminado',
        'Data': contentType
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
