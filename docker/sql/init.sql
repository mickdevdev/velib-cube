CREATE TABLE IF NOT EXISTS stations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    lon FLOAT NOT NULL,
    lat FLOAT NOT NULL
);

CREATE DATABASE appdb_test;

\connect appdb_test;

CREATE TABLE IF NOT EXISTS stations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    lon FLOAT NOT NULL,
    lat FLOAT NOT NULL
);