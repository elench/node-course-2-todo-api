const { MongoClient, ObjectId }= require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Unable to connect to mongodb server:', err);
        return;
    }

    const db = client.db('TodoApp');
    console.log('Connected to mongodb server');

    db.collection('Users')
    .find({
        name: 'Pepito'
    })
    .toArray()
    .then(docs => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
    })
    .then(msg => {
        client.close();

    })
    .catch(err => {
        console.log('Unable to fetch todos:', err);
    });

        /*
    db.collection('Todos')
    .find()
    .count()
    .then(count => {
        console.log(`Todos count: ${count}`);
    })
    .then(msg => {
        client.close();

    })
    .catch(err => {
        console.log('Unable to fetch todos:', err);
    });
    */
});
