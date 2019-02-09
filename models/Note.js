var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var noteSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  
  
});

var Note = mongoose.model("Note", NoteSchema);

// ----- Exporting the Note model
module.exports = Note;
