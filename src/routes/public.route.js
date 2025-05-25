import { Router } from 'express';
import Public from '../model/public.model.js';
import { validatePublic } from '../helpers/validate.helper.js';

const publicRouter = Router();

// POST /api/v1/public - Create a new public template
publicRouter.post('/', async (req, res) => {
  try {
    const { name, url, platform, description } = req.body;

    const validationResult = validatePublic({
      name,
      url,
      platform,
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

    const newPublic = new Public({ name, url, platform, description });
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

// GET /api/v1/public - Get all public templates
publicRouter.get('/', async (req, res) => {
  try {
    const publics = await Public.find();

    res.status(200).json({
      message: `${publics.length} public templates fetched successfully`,
      data: publics,
    });
  } catch (error) {
    console.error('Error in GET /public:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default publicRouter;
