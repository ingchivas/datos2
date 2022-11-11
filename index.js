const { Client } = require('pg');
const { faker } = require('@faker-js/faker');
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

for (let i = 0; i < 100; i++) {
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    client.query(insertUsers, [name, email, password], (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('User added');
        }
    });
}

client.end();