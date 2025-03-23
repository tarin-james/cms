var Sequence = require("../models/sequence");

var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;

function SequenceGenerator() {
  const sequence = Sequence.find({}).then(([seq]) => {
    sequenceId = seq._id;
    maxDocumentId = seq.maxDocumentId;
    maxMessageId = seq.maxMessageId;
    maxContactId = seq.maxContactId;
  });
}

SequenceGenerator.prototype.nextId = function (collectionType) {
  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case "documents":
      maxDocumentId++;
      updateObject = { maxDocumentId: maxDocumentId };
      nextId = maxDocumentId;
      break;
    case "messages":
      maxMessageId++;
      updateObject = { maxMessageId: maxMessageId };
      nextId = maxMessageId;
      break;
    case "contacts":
      maxContactId++;
      updateObject = { maxContactId: maxContactId };
      nextId = maxContactId;
      break;
    default:
      return -1;
  }

  Sequence.updateOne({ _id: sequenceId }, { $set: updateObject })
    .then((result) => {
      if (result.matchedCount === 0) {
        console.log(`No document found with _id: ${sequenceId}`);
        return null;
      }
    })
    .catch((err) => {
      console.error("nextId error =", err);
      return null;
    });

  return nextId;
};

module.exports = new SequenceGenerator();
