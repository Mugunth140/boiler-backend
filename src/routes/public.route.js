import { Router } from 'express';
import Public from '../model/public.model.js';
import { validatePublic } from '../helpers/validate.helper.js';

const publicRouter = Router();

// POST /api/v1/public - Create a new public template
publicRouter.post('/', async (req, res) => {
  try {
    const { name, url, category, description } = req.body;

    const validationResult = validatePublic({
      name,
      url,
      category,
      description,
    });
    if (validationResult) {
      return res
        .status(validationResult.status)
        .json({ message: validationResult.message });
    }

    const nameExists = await Public.findOne({ name, url });
    if (nameExists) {
      return res.status(409).json({ message: 'Name or URL already exists' });
    }

    const newPublic = new Public({ name, url, category, description });
    await newPublic.save();

    return res.status(201).json({
      message: 'Public template created successfully',
      data: newPublic,
    });
  } catch (error) {
    console.error('Error in POST /public:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

publicRouter.get('/', async (req, res) => {
  try {
    const publics = await Public.find();
    res.status(200).json(publics);
  } catch (error) {
    console.error('Error in GET /public/:platform :', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default publicRouter;
