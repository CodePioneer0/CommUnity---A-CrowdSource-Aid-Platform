import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Issue', issueSchema);