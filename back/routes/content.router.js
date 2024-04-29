const express = require('express');
const ContentService = require('../services/content.service');
const service = new ContentService();
const validatorHandler = require('../middlewares/validator.handler');
const { createContentDto, updateContentDto, getIdContentDto } = require('../middlewares/dtos/content.dto');
const router = express.Router();

// SELECT
router.get('/', async (req, res, next) => {
  try {
      // Lógica para obtener los contenidos disponibles y contarlos
      const content = await service.findDB(); // Obtener todos los contenidos
      const conteoImagenes = content.filter(contenido => contenido.idContentType == 'IMG').length;
      const conteoVideos = content.filter(contenido => contenido.idContentType == 'URL').length;
      const conteoTextos = content.filter(contenido => contenido.idContentType == 'TXT').length;

      res.json({
        'success': true,
        'message': 'Contenidos encontrados',
        'Data': content,
        'conteoImagenes': conteoImagenes,
        'conteoVideos': conteoVideos,
        'conteoTextos': conteoTextos
      });

  } catch (error) {
      next(error);
  }
});

router.get('/categories', async (req, res, next) => {
  try {
    const categoriesWithCounts = await service.findCategoriesWithCounts();
    res.json({
      success: true,
      message: 'Categorías encontradas con conteos de contenido',
      data: categoriesWithCounts
    });
  } catch (error) {
    next(error);
  }
});

//SELECT
router.get('/:id', validatorHandler(getIdContentDto, 'params'), async (req, res, next)=> {
  try {
    const { id } = req.params;
    const content = await service.findOneDB(id);
   res.json({
        'success': true,
        'message': 'Contenido encontrado',
        'Data': content
    });
  } catch (error) {
    next(error);
  }
});

//CREATE
router.post('/', validatorHandler(createContentDto, 'body'), async (req, res, next)=> {
  try {
    const body = req.body;
    const content = await service.createDB(body);
    res.json({
        'success': true,
       'message': 'Contenido creado',
       'Data': content
    });
  } catch (error) {
    next(error);
  }
});

//UPDATE
router.patch('/:id', validatorHandler(getIdContentDto, 'params'), validatorHandler(updateContentDto, 'body'), async (req, res, next)=> {
    try {
      const { id } = req.params;
      const body = req.body;
      const {original, actualizado} = await service.updateDB(id, body);
      res.json({
          'success': true,
          'message': 'Contenido actualizado',
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
router.delete('/:id', validatorHandler(getIdContentDto, 'params'), async (req, res, next)=> {
    try {
      const { id } = req.params;
      const content = await service.deleteDB(id);
      res.json({
          'success': true,
          'message': 'Contenido eliminado',
          'Data': content
      });
    } catch (error) {
      next(error);
    }
});

//RUTAS CON MAS PARAMETROS

router.get('/:id/category/', validatorHandler(getIdContentDto, 'params'), async (req, res, next)=> {
  try {
    const { id } = req.params;
    const content = await service.findOneCatDB(id);
    //const category = await categoryService.findCatsDB(Content['categoria']);
   res.json({
        'success': true,
        'message': 'Contenidos encontrado',
        'Data': content
        //'cat': category
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
