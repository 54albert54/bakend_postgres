const express = require('express');
const passport = require('passport')

const UserService = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema');
const {checkRoles} = require('./../middlewares/auth.handler');

const router = express.Router();
const service = new UserService();

router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles("admin"),

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
checkRoles("admin"),
  validatorHandler(getUserSchema, 'params'),
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

//passport.authenticate('jwt', {session:false}),
//checkRoles("admin"),
 // validatorHandler(createUserSchema, 'body'),
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
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
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
  validatorHandler(getUserSchema, 'params'),
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

