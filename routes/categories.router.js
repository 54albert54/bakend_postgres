const express = require('express');
const passport = require('passport')
const jwt = require('jsonwebtoken');


const CategoryService = require('./../services/category.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {checkRoles} = require('./../middlewares/auth.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/category.schema');

const router = express.Router();
const service = new CategoryService();

router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles("customers",'admin'),
 async (req, res, next) => {
  try {
    const categories = await service.find();
    res.setHeader('Content-Type', 'application/json')
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles("admin","customers"),
  validatorHandler(getCategorySchema, 'params'),

  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.setHeader('Content-Type', 'application/json')
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
passport.authenticate('jwt', {session:false}),
checkRoles("admin"),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.setHeader('Content-Type', 'application/json')
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles("admin"),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.setHeader('Content-Type', 'application/json')
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles("admin"),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.setHeader('Content-Type', 'application/json')
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
