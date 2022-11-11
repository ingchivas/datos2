const { Client } = require('pg');
const { faker } = require('@faker-js/faker');
const express = require('express');
const app = express();


const conndata = {
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: 'test',
    port: 5432,
};

const client = new Client(conndata);


client.connect();


// query to create a users table
const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
)`;

client.query(createUsersTable, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Users table created');
    }
}
);

// Query to create random users and insert into the users table
const insertUsers = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`;

// for (let i = 0; i < 100; i++) {
//     const name = faker.name.findName();
//     const email = faker.internet.email();
//     const password = faker.internet.password();

//     client.query(insertUsers, [name, email, password], (err, res) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('User added');
//         }
//     });
// }

app.get('/users', (req, res) => {
    client.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                status: 'success',
                data: {
                    users: result.rows,
                },
            });
        }
    });
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    client.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                status: 'success',
                data: {
                    users: result.rows,
                },
            });
        }
    });
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
    console.log('http://localhost:3000');
});
