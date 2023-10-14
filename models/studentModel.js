import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  roll_no: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required : true
  },
  mentor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor'
  },
  market_score: {
    type: Number
  },
  execution_score: {
    type: Number
  },
  pitch_score: {
    type: Number
  },
  idea_score: {
    type: Number
  },
  research_score: {
    type: Number
  },
  total_score: {
    type: Number
  }
});


export default mongoose.models.Student || mongoose.model('Student', studentSchema);