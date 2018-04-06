const { ObjectId } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');


Todo.findByIdAndRemove('5ac720eb3b8a16583aebe973')
.then(todo => {
    console.log(todo);
});

/*
Todo.remove({})
.then(result => {
    console.log(result);
});
Todo.findOneAndRemove({ _id: '5ac720eb3b8a16583aebe973' })
.then(() => {

});
*/
