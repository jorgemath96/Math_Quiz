CREATE DATABASE dbquiz;

USE dbquiz;

-- USERS TABLE
CREATE TABLE users_quiz (
    id INT(11) NOT NULL AUTO_INCREMENT,
    user VARCHAR(20) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    PRIMARY KEY (id);
);

-- ALTER TABLE users
--     MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;


-- LINKS TABLE
CREATE TABLE alg(
    id INT(4) NOT NULL AUTO_INCREMENT,
    tipo TEXT NOT NULL,
    forma VARCHAR(255),
    op1 VARCHAR(255) NOT NULL,
    op2 VARCHAR(255) NOT NULL,
    op3 VARCHAR(255) NOT NULL,
    op4 VARCHAR(255) NOT NULL,
    res INT(1) NOT NULL,
    scr INT(4) NOT NULL,
    PRIMARY KEY (id)
);