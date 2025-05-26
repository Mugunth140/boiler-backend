import mongoose from 'mongoose';

const publicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
});

const Public = mongoose.model('public', publicSchema, 'publics');
export default Public;
