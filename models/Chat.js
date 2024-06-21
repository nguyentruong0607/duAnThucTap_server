var db = require('./db');


const chatSchema = new db.mongoose.Schema({
    users: [{
      type: db.mongoose.Schema.Types.ObjectId,
      ref: 'usersModel',
      required: true
    }],
    messages: [{
      sender: {
        type: db.mongoose.Schema.Types.ObjectId,
        ref: 'usersModel',
        required: true
      },
      content: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }]
  }, { collection: 'chats' });

let ChatModel = db.mongoose.model('ChatModel', chatSchema);


module.exports={
    ChatModel
}