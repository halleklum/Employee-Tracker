INSERT INTO department (department_name)
VALUES
    (1,'Excecutive'),
    (2, 'Production'),
    (3, 'Cast'),
    (4, 'Casting'),
    (5, 'Marketing'),
    (6, 'Production Design'),
    (7, 'Camera Crew'),
    (8, 'Hair and Makeup'),
    (9, 'Wardrobe'),
    (10, 'Sound');

INSERT INTO roles (role_id, department_id, title, salary)
VALUES
    (1, 1,'Director', 100000.00),
    (2, 2,'Set Designer', 60000.00),
    (3, 4,'Casting Director', 70000.00),
    (4, 3,'Actor', 300000.00),
    (5, 10,'Songwriter', 80000.00),
    (6, 5,'President of Global Marketing', 400000.00),
    (7, 9,'Costume Designer', 60000.00),
    (8, 7,'Cameraman', 80000.00),
    (9, 2,'Set Designer', 70000.00),
    (10, 8,'Makeup Artist', 60000.00);

INSERT INTO employee (role_id, first_name, last_name)
VALUES 
    (4, 'Margot', 'Robbie'),
    (4, 'Ryan', 'Gosling'),
    (4, 'Will', 'Ferrell'),
    (7, 'Jacqueline', 'Durran'),
    (1, 'Greta', 'Gerwig'),
    (6, 'Josh', 'Goldstine'),
    (9, 'Sarah', 'Greenwood'),
    (5, 'Dua', 'Lipa');




    