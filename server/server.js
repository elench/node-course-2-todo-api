require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');


const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');


const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save()
    .then(doc => {
        res.send(doc);
    })
    .catch(err => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find()
    .then(todos => {
        res.send({ todos });
    })
    .catch(err => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id)
  .then(todo => {
      if (todo) {
        res.send({ todo });
      }
      else {
        res.status(404).send();
      }
  })
  .catch(err => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id)
  .then(todo => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({ todo });
  })
  .catch(err => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  }
  else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
  .then(todo => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({ todo });
  })
  .catch(err => {
    res.status(400).send();
  });
});

app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  user.save()
  .then(() => {
    return user.generateAuthToken();
  })
  .then(token => {
    res.header('x-auth', token).send(user);
  })
  .catch(err => {
      res.status(400).send(err);
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
})

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = { app };
