import { Router } from 'express';
import { validatePrivate } from '../helpers/validate.helper.js';
import Private from '../model/private.model.js';
const privateRouter = Router();

privateRouter.post('/', async (req, res) => {
  const { user, name, url } = req.body;
  const privateValidateRes = validatePrivate({ user, name, url });
  if (privateValidateRes) {
    return res
      .status(validationResult.status)
      .json({ message: validationResult.message });
  }
  const newPrivate = new Private({ user, name, url });
  await newPrivate.save();
  return res
    .status(201)
    .json({
      message: 'Private template created successfully',
      data: newPrivate,
    });
});

privateRouter.get('/', (req, res) => {
  res.json({
    message: 'Private route',
  });
});

export default privateRouter;
