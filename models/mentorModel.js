
import mongoose from "mongoose";
const currentDate = new Date();

const mentorSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
    name: {
        type: String,
        required : true
  },
  isGroupCreated: {
    type: Boolean,
    default : false
  },
  isGroupFinalized: {
    type: Boolean,
    default : false
  }


});

export default mongoose.models.Mentor || mongoose.model('Mentor', mentorSchema);
