-- =============================================
-- V2__inserts_initial_data.sql
-- Dados iniciais para o sistema CurriculoAi
-- =============================================

-- Area
INSERT INTO area (nome_area) VALUES ('Tecnologia');
INSERT INTO area (nome_area) VALUES ('Saúde');
INSERT INTO area (nome_area) VALUES ('Direito');
INSERT INTO area (nome_area) VALUES ('Educação');
INSERT INTO area (nome_area) VALUES ('Engenharia');
INSERT INTO area (nome_area) VALUES ('Administração');
INSERT INTO area (nome_area) VALUES ('Marketing');
INSERT INTO area (nome_area) VALUES ('Finanças');
INSERT INTO area (nome_area) VALUES ('Recursos Humanos');
INSERT INTO area (nome_area) VALUES ('Contabilidade');
INSERT INTO area (nome_area) VALUES ('Arquitetura e Urbanismo');
INSERT INTO area (nome_area) VALUES ('Design');
INSERT INTO area (nome_area) VALUES ('Comunicação');
INSERT INTO area (nome_area) VALUES ('Jornalismo');
INSERT INTO area (nome_area) VALUES ('Publicidade e Propaganda');
INSERT INTO area (nome_area) VALUES ('Logística');
INSERT INTO area (nome_area) VALUES ('Comércio Exterior');
INSERT INTO area (nome_area) VALUES ('Agronegócio');
INSERT INTO area (nome_area) VALUES ('Meio Ambiente');
INSERT INTO area (nome_area) VALUES ('Segurança');
INSERT INTO area (nome_area) VALUES ('Construção Civil');
INSERT INTO area (nome_area) VALUES ('Indústria');
INSERT INTO area (nome_area) VALUES ('Varejo');
INSERT INTO area (nome_area) VALUES ('Turismo e Hotelaria');
INSERT INTO area (nome_area) VALUES ('Gastronomia');
INSERT INTO area (nome_area) VALUES ('Arte e Cultura');
INSERT INTO area (nome_area) VALUES ('Esporte');
INSERT INTO area (nome_area) VALUES ('Ciências');
INSERT INTO area (nome_area) VALUES ('Pesquisa e Desenvolvimento');
INSERT INTO area (nome_area) VALUES ('Serviço Social');
INSERT INTO area (nome_area) VALUES ('Backend');
INSERT INTO area (nome_area) VALUES ('Frontend');
INSERT INTO area (nome_area) VALUES ('Full Stack');
INSERT INTO area (nome_area) VALUES ('Mobile');
INSERT INTO area (nome_area) VALUES ('DevOps');
INSERT INTO area (nome_area) VALUES ('Data Engineering');
INSERT INTO area (nome_area) VALUES ('QA');
INSERT INTO area (nome_area) VALUES ('UI/UX Engineering');
INSERT INTO area (nome_area) VALUES ('Software Engineering');
INSERT INTO area (nome_area) VALUES ('Segurança da informação');
INSERT INTO area (nome_area) VALUES ('Machine Learning');

-- Empresa
INSERT INTO empresa (nome) VALUES ('Accenture');
INSERT INTO empresa (nome) VALUES ('Sicap');
INSERT INTO empresa (nome) VALUES ('Google');
INSERT INTO empresa (nome) VALUES ('Amazon');
INSERT INTO empresa (nome) VALUES ('Microsoft');
INSERT INTO empresa (nome) VALUES ('Itaú');
INSERT INTO empresa (nome) VALUES ('Nubank');
INSERT INTO empresa (nome) VALUES ('Magazine Luiza');
INSERT INTO empresa (nome) VALUES ('Outra');

-- Instituicao
INSERT INTO instituicao (nome_instituicao) VALUES ('DIO');
INSERT INTO instituicao (nome_instituicao) VALUES ('Alura');
INSERT INTO instituicao (nome_instituicao) VALUES ('Coursera');
INSERT INTO instituicao (nome_instituicao) VALUES ('Udemy');
INSERT INTO instituicao (nome_instituicao) VALUES ('SENAC');
INSERT INTO instituicao (nome_instituicao) VALUES ('SENAI');
INSERT INTO instituicao (nome_instituicao) VALUES ('Outra');

-- Role
INSERT INTO role (name_role) VALUES ('ROLE_CANDIDATO');
INSERT INTO role (name_role) VALUES ('ROLE_RECRUTADOR');

-- Idioma
INSERT INTO idioma (idioma_nome) VALUES ('PORTUGUES');
INSERT INTO idioma (idioma_nome) VALUES ('INGLES');
INSERT INTO idioma (idioma_nome) VALUES ('ESPANHOL');
INSERT INTO idioma (idioma_nome) VALUES ('FRANCES');
INSERT INTO idioma (idioma_nome) VALUES ('ALEMAO');
INSERT INTO idioma (idioma_nome) VALUES ('ITALIANO');
INSERT INTO idioma (idioma_nome) VALUES ('MANDARIM');
INSERT INTO idioma (idioma_nome) VALUES ('JAPONES');

-- Habilidade
INSERT INTO habilidade (nome) VALUES ('Java');
INSERT INTO habilidade (nome) VALUES ('Python');
INSERT INTO habilidade (nome) VALUES ('JavaScript');
INSERT INTO habilidade (nome) VALUES ('TypeScript');
INSERT INTO habilidade (nome) VALUES ('Spring Boot');
INSERT INTO habilidade (nome) VALUES ('React');
INSERT INTO habilidade (nome) VALUES ('Angular');
INSERT INTO habilidade (nome) VALUES ('Docker');
INSERT INTO habilidade (nome) VALUES ('Kubernetes');
INSERT INTO habilidade (nome) VALUES ('SQL');
INSERT INTO habilidade (nome) VALUES ('Git');
INSERT INTO habilidade (nome) VALUES ('AWS');
INSERT INTO habilidade (nome) VALUES ('Azure');
INSERT INTO habilidade (nome) VALUES ('Linux');
INSERT INTO habilidade (nome) VALUES ('Scrum');

-- Rede Social
INSERT INTO rede_social (nome) VALUES ('LinkedIn');
INSERT INTO rede_social (nome) VALUES ('GitHub');
INSERT INTO rede_social (nome) VALUES ('Instagram');
INSERT INTO rede_social (nome) VALUES ('Twitter');
INSERT INTO rede_social (nome) VALUES ('Portfolio');
INSERT INTO rede_social (nome) VALUES ('Behance');
INSERT INTO rede_social (nome) VALUES ('Dribbble');

-- Curso
INSERT INTO curso (nome_curso) VALUES ('Análise e Desenvolvimento de Sistemas');
INSERT INTO curso (nome_curso) VALUES ('Direito');
INSERT INTO curso (nome_curso) VALUES ('Psicologia');
INSERT INTO curso (nome_curso) VALUES ('Ciência da Computação');
INSERT INTO curso (nome_curso) VALUES ('Engenharia de Software');
INSERT INTO curso (nome_curso) VALUES ('Sistemas de Informação');
INSERT INTO curso (nome_curso) VALUES ('Administração');
INSERT INTO curso (nome_curso) VALUES ('Medicina');
INSERT INTO curso (nome_curso) VALUES ('Enfermagem');
INSERT INTO curso (nome_curso) VALUES ('Engenharia Civil');
INSERT INTO curso (nome_curso) VALUES ('Arquitetura');
INSERT INTO curso (nome_curso) VALUES ('Ciência de dados');
INSERT INTO curso (nome_curso) VALUES ('Inteligência artificial');
INSERT INTO curso (nome_curso) VALUES ('Segurança da informação');
INSERT INTO curso (nome_curso) VALUES ('Design Gráfico');
INSERT INTO curso (nome_curso) VALUES ('Engenharia de controle e automação');
INSERT INTO curso (nome_curso) VALUES ('Outro');