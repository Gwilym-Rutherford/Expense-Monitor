CREATE DATABASE expense;

\c expense postgres;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255),
    password TEXT
);

CREATE TABLE expense(
    expense_id SERIAL PRIMARY KEY,
    user_id INT,
    expense VARCHAR(255),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE amount(
    amount_id SERIAL PRIMARY KEY,
    expense_id INT,
    amount DECIMAL,
    FOREIGN KEY(expense_id) REFERENCES expense(expense_id)
);
