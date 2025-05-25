import mongoose from 'mongoose';

const repositorySchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    repository: {
      type: Map,
      of: repositorySchema,
      required: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('user', userSchema);

export default User;
