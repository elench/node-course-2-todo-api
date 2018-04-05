const { MongoClient, ObjectId }= require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Unable to connect to mongodb server:', err);
        return;
    }

    const db = client.db('TodoApp');
    console.log('Connected to mongodb server');

    // deleteMany
    /*
    db.collection('Todos')
    .deleteMany({ text: 'Eat lunch' })
    .then(result => {
        console.log(result);
    });
    */

    // deleteOne
    /*
    db.collection('Todos')
    .deleteOne({text: 'Eat lunch'})
    .then(result => {
        console.log(result);
    });
    */

    // findOneAndDelete
    /*
    db.collection('Todos')
    .findOneAndDelete({ completed: false })
    .then(result => {
        console.log(result);
    });
    */

    db.collection('Users')
    .deleteMany({ name: 'Steven' })
    .then(result => {
        console.log(result.result);

        return db.collection('Users')
        .findOneAndDelete({ _id: new ObjectId('5ac6475faed6914171a243e4') })
    })
    .then(result => {
        console.log(JSON.stringify(result, undefined, 2));
        client.close();
    });

});
