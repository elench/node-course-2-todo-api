const { MongoClient, ObjectId }= require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Unable to connect to mongodb server:', err);
        return;
    }

    const db = client.db('TodoApp');
    console.log('Connected to mongodb server');

    // FindOneAndUpdate
    /*
    db.collection('Todos')
    .findOneAndUpdate({
        _id: ObjectId('5ac6341d941594687442930f')
    }, {
        $set: { completed: false }
    }, {
        returnOriginal: false
    })
    .then(result => {
        console.log(result);
        client.close();
    })
    .catch(err => {
        console.log(err);
        client.close();
    });
    */

    db.collection('Users')
    .findOneAndUpdate({
        _id: new ObjectId('5ac64734aed6914171a243e3')
    }, {
        $set: {
            name: 'Steven'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    })
    .then(result => {
        console.log(result);
        client.close();
    })
    .catch(err => {
        console.log(err);
        client.close();
    });
});
