CREATE DATABASE journal;

\c journal postgres;

-- value tables
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255),
    password TEXT
);

CREATE TABLE dailyEntries(
    daily_entry_id SERIAL PRIMARY KEY,
    user_id INT,
    title TEXT,
    contents TEXT,
    inputted_date DATE,
    entry_date Date NOT NULL DEFAULT CURRENT_DATE,
    entry_time TIME NOT NULL DEFAULT CURRENT_TIME,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
