const { ObjectId } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');


// User.findById
User.findById('5ac68650157fce0eca39e480')
.then(user => {
    if (!user) {
        return console.log('No such user');
    }
    console.log(user);
})
.catch(err => {
    console.log(err);
});





/*
const id = '5ac6ec4a642fd263d1f2f0d8';
const invalidId = '5ac6ec4a642fd263d1f2f0d811';

if (!ObjectId.isValid(invalidId)) {
    console.log('ID not valid');
}

Todo.find({
    _id: id
})
.then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
})
.then((todo) => {
    console.log('Todo', todo);
});

Todo.findById(invalidId)
.then(todo => {
    if (!todo) {
        return console.log('Id not found');
    }
    console.log('Todo by id', todo);
})
.catch(err => {
    console.log(err);
});
*/
