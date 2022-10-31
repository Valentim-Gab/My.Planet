CREATE TABLE usuario (
	id SERIAL PRIMARY KEY,
	username VARCHAR(100) NOT NULL,
	email VARCHAR(200) UNIQUE NOT NULL,
	password VARCHAR(250) NOT NULL,
	descricao VARCHAR(100),
	imagem TEXT,
	permissao CHAR(1) NOT NULL DEFAULT 'u'
);

CREATE TABLE projeto (
	id_projeto SERIAL PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	descricao VARCHAR(100) NOT NULL,
	imagem TEXT,
	link VARCHAR(250),
	id_usuario INT NOT NULL,
	FOREIGN KEY (id_usuario) REFERENCES usuario (id)
);

CREATE TABLE pacote (
	id_pacote SERIAL PRIMARY KEY,
	tipo CHAR CHECK (tipo = 'i' OR tipo = 'v') NOT NULL,
	conteudo TEXT NOT NULL,
	id_projeto INT NOT NULL,
	FOREIGN KEY (id_projeto) REFERENCES projeto (id_projeto)
);