CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	task VARCHAR(2048) NOT NULL,
	complete BOOLEAN DEFAULT false
);

INSERT INTO tasks (task)
VALUES ('Take out the trash');