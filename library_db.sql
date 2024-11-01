-- Create the database
CREATE DATABASE library;

-- Connect to the database
\c library

-- Create the Books table
CREATE TABLE IF NOT EXISTS Books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(13) NOT NULL,
    year INTEGER,
    state VARCHAR(255),
    available BOOLEAN DEFAULT true
);

-- Create the Users table
CREATE TABLE IF NOT EXISTS Users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL
);

-- Create the Loans table
CREATE TABLE IF NOT EXISTS Loans (
    loan_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(user_id),
    book_id INTEGER REFERENCES Books(book_id),
    loan_date DATE NOT NULL,
    return_date DATE
);

-- Create the Categories table
CREATE TABLE IF NOT EXISTS Categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE NOT NULL
);

-- Create the BookCategories table
CREATE TABLE IF NOT EXISTS BookCategories (
    book_id INTEGER REFERENCES Books(book_id),
    category_id INTEGER REFERENCES Categories(category_id),
    PRIMARY KEY (book_id, category_id)
);