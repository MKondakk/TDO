\connect task6;

CREATE TABLE example (
    id SERIAL PRIMARY KEY,
    text_field TEXT,
    integer_field INTEGER
);

INSERT INTO example (text_field, integer_field) VALUES
    ('Some text', 56),
    ('New text', -1),
    ('Another text', 3);