const { MongoClient, ObjectId }= require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Unable to connect to mongodb server:', err);
        return;
    }

    const db = client.db('TodoApp');
    console.log('Connected to mongodb server');

    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    },
    (err, result) => {
        if (err) {
            console.log('Unable to insert todo:', err);
            return;
        }

        console.log(JSON.stringify(result.ops));
        console.log(result.ops);
    });

    db.collection('Users').insertOne({
        name: 'Pepito',
        age: 15,
        location: 'Puerto Rico'
    },
    (err, result) => {
        if (err) {
            console.log('Unable to inser todo:', err);
            return;
        }

        console.log(JSON.stringify(result.ops));
    });

    client.close();
});
