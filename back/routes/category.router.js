const express = require('express');
const CategoryService = require('../services/category.service');
const service = new CategoryService();
const validatorHandler = require('../middlewares/validator.handler');
const { createCategoryDto, updateCategoryDto, getIdCategoryDto } = require('../middlewares/dtos/category.dto');
const router = express.Router();

// SELECT
router.get('/', async (req, res, next)=> {
  try {
  const { size } = req.query;
    const category = await service.findDB(size || 1000);
    res.json({
      'success': true,
      'message': 'Categorías encontradas',
      'Data': category
    });
  } catch (error) {
    next(error);
  }
});

//SELECT ONE
router.get('/:id', validatorHandler(getIdCategoryDto, 'params'), async (req, res, next)=> {
  try {
    const { id } = req.params;
    const category = await service.findOneDB(id);
   res.json({
        'success': true,
        'message': 'Categoría encontrada',
        'Data': category
    });
  } catch (error) {
    next(error);
  }
});

//CREATE
router.post('/', validatorHandler(createCategoryDto, 'body'), async (req, res, next)=> {
  try {
    const body = req.body;
    const category = await service.createDB(body);
    res.json({
        'success': true,
       'message': 'Categoría creada',
       'Data': category
    });
  } catch (error) {
    next(error);
  }
});

//UPDATE
router.patch('/:id', validatorHandler(getIdCategoryDto, 'params'), validatorHandler(updateCategoryDto, 'body'), async (req, res, next)=> {
  try {
    const { id } = req.params;
    const body = req.body;
    const {original, actualizado} = await service.updateDB(id, body);
    res.json({
        'success': true,
        'message': 'Categoría actualizada',
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
router.delete('/:id', validatorHandler(getIdCategoryDto, 'params'), async (req, res, next)=> {
  try {
    const { id } = req.params;
    const category = await service.deleteDB(id);
    res.json({
        'success': true,
        'message': 'Categoría eliminada',
        'Data': category
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
