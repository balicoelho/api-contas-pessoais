CREATE DATABASE dindin;

CREATE TABLE usuarios (
    id serial PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE categorias (
    id serial PRIMARY KEY,
    descricao VARCHAR(255)
);

CREATE TABLE transacoes (
    id serial PRIMARY KEY,
    descricao VARCHAR(255),
    valor INTEGER,
    data DATE,
    categoria_id INT,
    usuario_id INT,
    tipo VARCHAR(255),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

INSERT INTO categorias (descricao) VALUES
    ('Alimentação'),
    ('Assinaturas e Serviços'),
    ('Casa'),
    ('Mercado'),
    ('Cuidados Pessoais'),
    ('Educação'),
    ('Família'),
    ('Lazer'),
    ('Pets'),
    ('Presentes'),
    ('Roupas'),
    ('Saúde'),
    ('Transporte'),
    ('Salário'),
    ('Vendas'),
    ('Outras receitas'),
    ('Outras despesas');