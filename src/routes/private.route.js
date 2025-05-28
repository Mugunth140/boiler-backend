import { Router } from 'express';
import { validatePrivate } from '../helpers/validate.helper.js';
import Private from '../model/private.model.js';
const privateRouter = Router();

privateRouter.post('/', async (req, res) => {
  const { user, name, url } = req.body;
  const privateValidateRes = await validatePrivate({ user, name, url });
  if (privateValidateRes) {
    return res
      .status(privateValidateRes.status)
      .json({ message: privateValidateRes.message });
  }
  const newPrivate = new Private({ user, name, url });
  await newPrivate.save();
  return res.status(201).json({
    message: 'Private template created successfully',
  });
});

privateRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const templates = await Private.find({ user: id });
  if (!templates) {
    return res.status(404).json({
      message: 'Private templates not found',
    });
  }
  return res.status(200).json(templates);
});

export default privateRouter;
