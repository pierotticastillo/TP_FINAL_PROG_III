-- Cargar usuariostipo:
INSERT INTO `usuariostipo` (`descripcion`) VALUES ('Administrador'),
('Empleado'), ('Cliente');

--  Cargar usuarios:
INSERT INTO `usuarios` (`nombre`, `apellido`, `correoElectronico`,
`contrasenia`, `idUsuarioTipo`, `imagen`) VALUES
('Daenerys', 'Targaryen', 'daetar@correo.com',
'b2803ace294160fd87aa85f826fa8df0c39e77282e0217af680198cef8d9edc3', 1,
NULL),
('Jon', 'Snow', 'jonsno@gmail.com',
'd98e05719dd7fa45547fbc3409eb36881bb8afe963268f7e8f6c2e24e80e58f5', 1,
NULL),
('Tyrion', 'Lannister', 'tyrlan@correo.com',
'9f9e51def43bc759ac35cd56ce8514a2c4dd0fbc9bfbb5bc97ce691f65bf5bb9', 2,
NULL),
('Margaery', 'Tyrell', 'martyr@correo.com',
'ad872b4820b164b7a25695ff77d0f6e5df812c6f9944d1d21461f57f099bce57', 2,
NULL),
('Samwell', 'Tarly', 'samtar@correo.com',
'a8487f98ab106b0ed2129a5446610b5ccba6b4bf7a937ef5194ce2f2a4c11bde', 2,
NULL),
('Jeor', 'Mormont', 'jeomor@correo.com',
'ef0b04a6eba2d3cde7b32f53b2c13b509d198189cb9da2080c7259948cbc63ca', 2,
NULL),
('Khal', 'Drogo', 'khadro@gmail.com',
'84507cc9012d1c900abb65663e3b62633cb14073aa6569b60efa2b75cf431b37', 3,
NULL),
('Catelyn', 'Stark', 'catsta@correo.com',
'229e7f7177d0e221f889eb8d3e2b422eae42adc403412fb25718b84fe5fff4d7', 3,
NULL),('Yara', 'Greyjoy', 'yargre@correo.com',
'097c61d6a3ee77e4f4a9d2c6b6fb284ee927a0c315f30172f685e4659a4f621b', 3,
NULL),
('Jose', 'Battaglia', 'josbat@gmail.com',
'c30d798692466db470eafebfb04c272b359c80f2ebbac6f51f6e9ff9b6e3177b', 3,
NULL);

-- Cargar reclamosestado:
INSERT INTO `reclamosEstado` (`descripcion`) VALUES ('Creado'), ('En
proceso'), ('Cancelado'), ('Finalizado');

--  Cargar reclamostipo:
INSERT INTO `reclamostipo` (`descripcion`)
VALUES ('Falla de motor'), ('Falla de frenos'), ('Falla de suspensión'),
('Aprobación de cobertura'), ('Verificación de términos'), ('Reemplazo de piezas'),
('Reinstalación correcta'), ('Devolución'), ('Reembolsos'), ('Revisión de facturación');

-- Cargar oficinas:
INSERT INTO `oficinas` (`nombre`, `idReclamoTipo`) VALUES ('Dpto. de
Taller y Servicio Técnico', 1), ('Dpto. de Garantías', 4), ('Dpto. de Repuestos y
Partes', 6), ('Dpto. de Facturación', 9);

-- Cargar usuariosoficinas:
INSERT INTO `usuariosoficinas` (`idUsuario`, `idOficina`) VALUES
(3, 1),
(4, 2),
(8, 3),
(9, 4);

-- Cargar reclamos:
INSERT INTO `reclamos` (`asunto`, `descripcion`, `fechaCreado`,
`fechaFinalizado`, `fechaCancelado`, `idReclamoEstado`, `idReclamoTipo`,
`idUsuarioCreador`, `idUsuarioFinalizador`) VALUES
('ruido en motor', NULL, '2024-08-19 06:00:00', NULL, NULL, 1, 1, 9, NULL),('rotura de motor ', NULL, '2024-08-19 07:00:00', NULL, NULL, 4, 1, 8, NULL),
('no frena', NULL, '2024-08-15 07:15:00', NULL, NULL, 1, 2, 8, NULL),
('ruidos extraños', NULL, '2024-08-15 08:00:00', NULL, NULL, 1, 3, 7, NULL),
('cristales rayados', NULL, '2024-08-15 09:30:00', NULL, NULL, 1, 4, 7,
NULL),
('matafuego vencido', NULL, '2024-08-15 09:00:00', NULL, NULL, 2, 4, 7,
NULL),
('suspensión lado izq fallada', NULL, '2024-08-15 15:00:00', NULL, NULL, 2,
3, 8, NULL),
('falla tren delantero', 'empece a notar ruidos molesto', '2024-08-28 19:26:12',
NULL, NULL, 1, 1, 8, NULL);

-- Cargar procedimiento almacenado de ejemplo para obtener estaditicas de los reclamos en relación al estado en que se encuentran:

/* DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerReclamosEstados` ()
BEGIN
    -- Mostrar los totales de reclamos agrupados por estado
    SELECT re.descripcion AS descripcion, COUNT(r.idReclamo) AS cantidad
    FROM `reclamos` AS r
    INNER JOIN `reclamosestado` AS re ON re.idReclamoEstado = r.idReclamoEstado
    GROUP BY re.descripcion;
END $$

DELIMITER ;
*/

-- Cargar procedimiento almacenado de ejemplo para obtener la cantidad de usuarios que existen de cada tipo:
/*
DELIMITER //

CREATE PROCEDURE obtenerUsuarioTipo()
BEGIN
    SELECT ut.descripcion, COUNT(u.idUsuario) as cantidad_usuarios
    FROM usuarios u
    INNER JOIN usuariosTipo ut ON u.idUsuarioTipo = ut.idUsuarioTipo
    GROUP BY ut.descripcion;
END //

DELIMITER ;
*/