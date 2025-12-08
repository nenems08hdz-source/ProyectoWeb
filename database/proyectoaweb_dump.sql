-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 06-12-2025 a las 06:48:05
-- Versión del servidor: 8.0.17
-- Versión de PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectoaweb`
--
CREATE DATABASE IF NOT EXISTS `proyectoaweb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `proyectoaweb`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
CREATE TABLE `alumnos` (
  `CVE_ALUMNOS` int(11) NOT NULL,
  `CVE_USUARIOS` int(11) DEFAULT NULL,
  `CVE_DIVISIONES` int(11) NOT NULL,
  `MATRICULA` varchar(50) DEFAULT NULL,
  `NOMBRE` varchar(25) DEFAULT NULL,
  `APELLIDO_PATERNO` varchar(25) NOT NULL,
  `APELLIDO_MATERNO` varchar(25) NOT NULL,
  `GRUPO` varchar(10) DEFAULT NULL,
  `CUATRIMESTRE` int(11) DEFAULT NULL,
  `TELEFONO` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`CVE_ALUMNOS`, `CVE_USUARIOS`, `CVE_DIVISIONES`, `MATRICULA`, `NOMBRE`, `APELLIDO_PATERNO`, `APELLIDO_MATERNO`, `GRUPO`, `CUATRIMESTRE`, `TELEFONO`) VALUES
(0, 14, 5, '234543212', 'Mariel Medina Hernández ', 'Medina ', 'Hernández', 'B', 4, '9933172497'),
(1, 14, 2, '123456654', 'Mariel Medina Hernández ', 'Medina ', 'Hernández', 'B', 4, '9933172497'),
(2, 14, 2, '123456654', 'Mariel Medina Hernández ', 'Medina ', 'Hernández', 'B', 4, '9933172497'),
(3, 14, 2, '123456654', 'Mariel Medina Hernández ', 'Medina ', 'Hernández', 'B', 4, '9933172497');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anteproyecto`
--

DROP TABLE IF EXISTS `anteproyecto`;
CREATE TABLE `anteproyecto` (
  `CVE_ANTEPROYECTO` int(11) NOT NULL,
  `CVE_ALUMNOS` int(11) NOT NULL,
  `CVE_ASESOR_ACAD` int(11) NOT NULL,
  `CVE_EMPRESAS_VINCULADAS` int(11) NOT NULL,
  `TITULO` varchar(150) NOT NULL,
  `OBJETIVO_GENERAL` text NOT NULL,
  `JUSTIFICACION` text NOT NULL,
  `ACTIVIDADES_PROPUESTAS` text,
  `METODOLOGIA` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asesores`
--

DROP TABLE IF EXISTS `asesores`;
CREATE TABLE `asesores` (
  `CVE_ASESORES` int(11) NOT NULL,
  `CVE_USUARIOS` int(11) DEFAULT NULL,
  `CVE_DIVISIONES` int(11) DEFAULT NULL,
  `NOMBRE` varchar(25) DEFAULT NULL,
  `APELLIDO_PATERNO` varchar(25) DEFAULT NULL,
  `APELLIDO_MATERNO` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carreras`
--

DROP TABLE IF EXISTS `carreras`;
CREATE TABLE `carreras` (
  `CVE_CARRERAS` int(11) NOT NULL,
  `CVE_DIVISIONES` int(11) NOT NULL,
  `NOMBRE` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `carreras`
--

INSERT INTO `carreras` (`CVE_CARRERAS`, `CVE_DIVISIONES`, `NOMBRE`) VALUES
(1, 1, 'TSU en Emprendimiento, Formulación y Evaluación de Proyectos'),
(2, 1, 'TSU en Mercadotecnia'),
(3, 1, 'TSU en Contaduría'),
(4, 3, 'TSU en Productos Alimentarios Gourmet'),
(5, 3, 'TSU en Mantenimiento Industrial'),
(6, 3, 'TSU en Mantenimiento Petrolero'),
(7, 3, 'TSU en Energía Turbo Solar'),
(8, 4, 'TSU en Gestión Ambiental'),
(9, 4, 'TSU en Química Industrial'),
(10, 4, 'TSU en Perforación y Servicios a Pozos'),
(11, 2, 'TSU en Tecnologías de la Información Área Desarrollo de Software Multiplataforma'),
(12, 2, 'TSU en Tecnologías de la Información Área Entornos Virtuales y Negocios Digitales'),
(13, 2, 'TSU en Tecnologías de la Información Área Infraestructura de Redes Digitales'),
(14, 5, 'TSU en Gastronomía'),
(15, 5, 'TSU en Turismo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colonias`
--

DROP TABLE IF EXISTS `colonias`;
CREATE TABLE `colonias` (
  `CVE_COLONIA` int(11) NOT NULL,
  `CVE_MUNICIPIO` int(11) NOT NULL,
  `NOMBRE` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `colonias`
--

INSERT INTO `colonias` (`CVE_COLONIA`, `CVE_MUNICIPIO`, `NOMBRE`) VALUES
(1, 1, 'Villahermosa'),
(2, 1, 'Atasta'),
(3, 1, 'Tamulté'),
(4, 1, 'Macultepec'),
(5, 1, 'Manga'),
(6, 2, 'Colonia 7 de octubre'),
(7, 2, 'Colonia Agua Sol'),
(8, 2, 'Colonia Obrera'),
(9, 2, 'Colonia Emiliano Zapata'),
(10, 2, 'Colonia Petrolera'),
(11, 3, 'Frontera Centro'),
(12, 3, 'Vicente Guerrero'),
(13, 3, 'Álvaro Obregón'),
(14, 3, 'Benito Juárez'),
(15, 3, 'Arroyo Polo 2da. Sección'),
(16, 4, 'Comalcalco Centro'),
(17, 4, 'Adolfo López Mateos'),
(18, 4, 'Bélen'),
(19, 4, 'Gustavo de la Fuente Dorantes'),
(20, 4, 'Xochimilco'),
(21, 5, 'Paraíso Centro'),
(22, 5, 'Blancas Mariposas'),
(23, 5, 'Barra de Tupilco'),
(24, 4, 'Costa Real'),
(25, 5, 'El Bellote');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
CREATE TABLE `comentarios` (
  `CVE_COMENTARIO` int(11) NOT NULL,
  `CVE_ANTEPROYECTO` int(11) NOT NULL,
  `CVE_USUARIOS` int(11) NOT NULL,
  `TEXTO` text NOT NULL,
  `ESTATUS` enum('VISIBLE','RESUELTO','PENDIENTE') DEFAULT 'VISIBLE',
  `FECHA` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `divisiones`
--

DROP TABLE IF EXISTS `divisiones`;
CREATE TABLE `divisiones` (
  `CVE_DIVISIONES` int(11) NOT NULL,
  `NOMBRE` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `divisiones`
--

INSERT INTO `divisiones` (`CVE_DIVISIONES`, `NOMBRE`) VALUES
(1, 'División Académica de Administración y Negocios'),
(2, 'División Académica de Tecnologías de la Informació'),
(3, 'División Académica de Procesos Industriales'),
(4, 'División Académica de Química'),
(5, 'División Académica de Turismo y Gastronomía');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas_vinculadas`
--

DROP TABLE IF EXISTS `empresas_vinculadas`;
CREATE TABLE `empresas_vinculadas` (
  `CVE_EMPRESAS_VINCULADAS` int(11) NOT NULL,
  `CVE_COLONIA` int(11) DEFAULT NULL,
  `NOMBRE` varchar(100) DEFAULT NULL,
  `DIRECCION` varchar(150) DEFAULT NULL,
  `NOMBRE_ASESOR_EMP` varchar(100) DEFAULT NULL,
  `TELEFONO_ASESOR` varchar(15) DEFAULT NULL,
  `AREA` varchar(100) DEFAULT NULL,
  `CORREO` varchar(100) DEFAULT NULL,
  `SECTOR` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `empresas_vinculadas`
--

INSERT INTO `empresas_vinculadas` (`CVE_EMPRESAS_VINCULADAS`, `CVE_COLONIA`, `NOMBRE`, `DIRECCION`, `NOMBRE_ASESOR_EMP`, `TELEFONO_ASESOR`, `AREA`, `CORREO`, `SECTOR`) VALUES
(1, 14, 'Soluciones Tecnólogicas A.C.', 'Av Universidad #123', 'Lic. María Gomez', '9938279786', 'Desarrollo de software', 'medinamartinezv6@gmail.com', 'Tecnología'),
(2, NULL, 'Soluciones Tecnólogicas A.C.', 'Av Universidad #123', 'Lic. María Gomez', '9938279786', 'Desarrollo de software', 'medinamartinezv6@gmail.com', 'Tecnología'),
(3, NULL, 'Soluciones Tecnólogicas A.C.', 'Av Universidad #123', 'Lic. María Gomez', '9938279786', 'Desarrollo de software', 'medinamartinezv6@gmail.com', 'Tecnología'),
(4, NULL, 'Soluciones Tecnólogicas A.C.', 'Av Universidad #123', 'Lic. María Gomez', '9938279786', 'Desarrollo de software', 'medinamartinezv6@gmail.com', 'Tecnología');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadia`
--

DROP TABLE IF EXISTS `estadia`;
CREATE TABLE `estadia` (
  `CVE_ESTADIA` int(11) NOT NULL,
  `CVE_EMPRESAS_VINCULADAS` int(11) DEFAULT NULL,
  `CVE_ALUMNOS` int(11) DEFAULT NULL,
  `CVE_ASESOR_ACAD` int(11) DEFAULT NULL,
  `FECHA_INICIO` date DEFAULT NULL,
  `FECHA_FIN` date DEFAULT NULL,
  `ESTATUS` enum('en proceso','finalizada','cancelada') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_estadia`
--

DROP TABLE IF EXISTS `historial_estadia`;
CREATE TABLE `historial_estadia` (
  `CVE_HISTORIAL_ESTADIA` int(11) NOT NULL,
  `CVE_ESTADIA` int(11) DEFAULT NULL,
  `CVE_USUARIOS` int(11) DEFAULT NULL,
  `FECHA_CAMBIO` date DEFAULT NULL,
  `NUEVO_ESTATUS` enum('en revision','aprobado','rechazado') DEFAULT NULL,
  `COMENTARIO` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `memoria_estadia`
--

DROP TABLE IF EXISTS `memoria_estadia`;
CREATE TABLE `memoria_estadia` (
  `CVE_MEMORIA_ESTADIA` int(11) NOT NULL,
  `CVE_ESTADIA` int(11) DEFAULT NULL,
  `TITULO` varchar(50) DEFAULT NULL,
  `ESTADO_ESTADIA` bit(1) DEFAULT NULL,
  `FIRMA` varchar(40) DEFAULT NULL,
  `FECHA_ENTREGA` date DEFAULT NULL,
  `VERSION` int(11) DEFAULT NULL,
  `FECHA_APROBACION` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipios`
--

DROP TABLE IF EXISTS `municipios`;
CREATE TABLE `municipios` (
  `CVE_MUNICIPIO` int(11) NOT NULL,
  `NOMBRE` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `municipios`
--

INSERT INTO `municipios` (`CVE_MUNICIPIO`, `NOMBRE`) VALUES
(1, 'Centro'),
(2, 'Cárdenas'),
(3, 'Centla'),
(4, 'Comalcalco'),
(5, 'Paraíso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `CVE_USUARIOS` int(11) NOT NULL,
  `CORREO` varchar(100) DEFAULT NULL,
  `CONTRASENA` varchar(200) DEFAULT NULL,
  `ACTIVO` tinyint(1) NOT NULL DEFAULT '1',
  `Rol` enum('Alumno','Asesor') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Alumno'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`CVE_USUARIOS`, `CORREO`, `CONTRASENA`, `ACTIVO`, `Rol`) VALUES
(1, 'keila@gmail.com', '$2y$10$obrz/CFeImXAWxXKwfpllOBwW19z/5KpiuYc4wL3v3JmsxFlt7/dq', 1, 'Alumno'),
(2, 'keila2@gmail.com', '$2y$10$TEukezu41MRymelRs4JjH.QqjR4C77/HWuQAoJcUz7x4QCBKdd/Te', 1, 'Alumno'),
(3, 'keila3@gmail.com', '$2y$10$tuzyO6zu0P4trRMAUBM69u57RsaaVQbrdKqdaeWSrzcZ19u/hPJGG', 1, 'Alumno'),
(4, 'root@gmail', '$2y$10$keAJH6ONXu3poiXI493r4uGqyTwSpuCahcgquI0kCeuI5NDWnDAeC', 1, ''),
(5, 'capibara28@hotmail.com', '$2y$10$HLCx7sEXRksunZKpetLcsOMuheZIlppzU1gMMM3BK1v68x1pr2.5i', 1, 'Alumno'),
(6, 'maestro@hotmail.com', '123', 1, 'Asesor'),
(7, 'kevin_bobo@hotmail.com', '$2y$10$8EiPtReWhYBsSfrv8OgfUeDy.XK2p75gE1kdIyHy7UpSsQFRhLXLy', 1, 'Alumno'),
(8, 'mari_2@hotmail.com', '$2y$10$O96mpbOq7kyVt1wmaFall.mbuVO.IFKmrD9YaUgcfPzSCMjzNzQke', 1, 'Alumno'),
(9, 'gerardo_50@hotmail.com', '$2y$10$z6zfcJACebBGCQiTB58bu.CtsuaT9l90VhvARHt5sumN0I8lPtrcm', 1, 'Asesor'),
(10, 'hola@gmail.com', '$2y$10$rDORbyemggYKL1TjS7gyp.r.4wHtp/7U05pGjM/77Uo.2qYylPDuO', 1, 'Alumno'),
(11, 'nopo@gmail.com', '$2y$10$zoT1fJd..USryZzNgDvyiOdlnf.gLww7FboInmEODp/CFpu85vR3e', 1, 'Alumno'),
(12, 'ara@gmail.com', '$2y$10$suT2OlY4fb0HLy8AbPbOg.CNwnDbxtDfwk8IyZoBAQvJRb6PCM4ku', 1, 'Asesor'),
(13, 'root@gmail.com', '$2y$10$e9Y/71pKpzRF5YqQoDqALeYLNx45xvkYN5UVGlwX4MgsaJLiAThwG', 1, 'Alumno'),
(14, 'mar@gmail.com', '$2y$10$l0bYLRxF8zRQmE6og3JwaOlmbwrE4hGO.AQhtBTKl1GKTBFt5J0J6', 1, 'Alumno');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`CVE_ALUMNOS`),
  ADD KEY `FK_REFERENCE_2` (`CVE_USUARIOS`),
  ADD KEY `FK_REFERENCE_4` (`CVE_DIVISIONES`);

--
-- Indices de la tabla `anteproyecto`
--
ALTER TABLE `anteproyecto`
  ADD PRIMARY KEY (`CVE_ANTEPROYECTO`),
  ADD KEY `FK_ANTEPROYECTO_ALUMNO` (`CVE_ALUMNOS`),
  ADD KEY `FK_ANTEPROYECTO_ASESOR` (`CVE_ASESOR_ACAD`),
  ADD KEY `FK_ANTEPROYECTO_EMPRESA` (`CVE_EMPRESAS_VINCULADAS`);

--
-- Indices de la tabla `asesores`
--
ALTER TABLE `asesores`
  ADD PRIMARY KEY (`CVE_ASESORES`),
  ADD KEY `FK_REFERENCE_11` (`CVE_DIVISIONES`),
  ADD KEY `FK_REFERENCE_9` (`CVE_USUARIOS`);

--
-- Indices de la tabla `carreras`
--
ALTER TABLE `carreras`
  ADD PRIMARY KEY (`CVE_CARRERAS`),
  ADD KEY `FK_REFERENCE_1` (`CVE_DIVISIONES`);

--
-- Indices de la tabla `colonias`
--
ALTER TABLE `colonias`
  ADD PRIMARY KEY (`CVE_COLONIA`),
  ADD KEY `CVE_MUNICIPIO` (`CVE_MUNICIPIO`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`CVE_COMENTARIO`),
  ADD KEY `FK_COMENTARIO_ANTEPROYECTO` (`CVE_ANTEPROYECTO`),
  ADD KEY `FK_COMENTARIO_USUARIO` (`CVE_USUARIOS`);

--
-- Indices de la tabla `divisiones`
--
ALTER TABLE `divisiones`
  ADD PRIMARY KEY (`CVE_DIVISIONES`);

--
-- Indices de la tabla `empresas_vinculadas`
--
ALTER TABLE `empresas_vinculadas`
  ADD PRIMARY KEY (`CVE_EMPRESAS_VINCULADAS`),
  ADD KEY `CVE_COLONIA` (`CVE_COLONIA`);

--
-- Indices de la tabla `estadia`
--
ALTER TABLE `estadia`
  ADD PRIMARY KEY (`CVE_ESTADIA`),
  ADD KEY `FK_REFERENCE_10` (`CVE_ALUMNOS`),
  ADD KEY `FK_REFERENCE_12` (`CVE_ASESOR_ACAD`),
  ADD KEY `FK_REFERENCE_8` (`CVE_EMPRESAS_VINCULADAS`);

--
-- Indices de la tabla `historial_estadia`
--
ALTER TABLE `historial_estadia`
  ADD PRIMARY KEY (`CVE_HISTORIAL_ESTADIA`),
  ADD KEY `FK_REFERENCE_7` (`CVE_ESTADIA`),
  ADD KEY `FK_REFERENCE_14` (`CVE_USUARIOS`);

--
-- Indices de la tabla `memoria_estadia`
--
ALTER TABLE `memoria_estadia`
  ADD PRIMARY KEY (`CVE_MEMORIA_ESTADIA`),
  ADD KEY `FK_REFERENCE_6` (`CVE_ESTADIA`);

--
-- Indices de la tabla `municipios`
--
ALTER TABLE `municipios`
  ADD PRIMARY KEY (`CVE_MUNICIPIO`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`CVE_USUARIOS`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `anteproyecto`
--
ALTER TABLE `anteproyecto`
  MODIFY `CVE_ANTEPROYECTO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `colonias`
--
ALTER TABLE `colonias`
  MODIFY `CVE_COLONIA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `CVE_COMENTARIO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empresas_vinculadas`
--
ALTER TABLE `empresas_vinculadas`
  MODIFY `CVE_EMPRESAS_VINCULADAS` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `municipios`
--
ALTER TABLE `municipios`
  MODIFY `CVE_MUNICIPIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `CVE_USUARIOS` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD CONSTRAINT `FK_REFERENCE_2` FOREIGN KEY (`CVE_USUARIOS`) REFERENCES `usuarios` (`CVE_USUARIOS`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_REFERENCE_4` FOREIGN KEY (`CVE_DIVISIONES`) REFERENCES `divisiones` (`CVE_DIVISIONES`) ON DELETE RESTRICT;

--
-- Filtros para la tabla `anteproyecto`
--
ALTER TABLE `anteproyecto`
  ADD CONSTRAINT `FK_ANTEPROYECTO_ALUMNO` FOREIGN KEY (`CVE_ALUMNOS`) REFERENCES `alumnos` (`CVE_ALUMNOS`),
  ADD CONSTRAINT `FK_ANTEPROYECTO_ASESOR` FOREIGN KEY (`CVE_ASESOR_ACAD`) REFERENCES `asesores` (`CVE_ASESORES`);

--
-- Filtros para la tabla `asesores`
--
ALTER TABLE `asesores`
  ADD CONSTRAINT `FK_REFERENCE_11` FOREIGN KEY (`CVE_DIVISIONES`) REFERENCES `divisiones` (`CVE_DIVISIONES`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `FK_REFERENCE_9` FOREIGN KEY (`CVE_USUARIOS`) REFERENCES `usuarios` (`CVE_USUARIOS`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `carreras`
--
ALTER TABLE `carreras`
  ADD CONSTRAINT `FK_REFERENCE_1` FOREIGN KEY (`CVE_DIVISIONES`) REFERENCES `divisiones` (`CVE_DIVISIONES`) ON DELETE RESTRICT;

--
-- Filtros para la tabla `colonias`
--
ALTER TABLE `colonias`
  ADD CONSTRAINT `colonias_ibfk_1` FOREIGN KEY (`CVE_MUNICIPIO`) REFERENCES `municipios` (`CVE_MUNICIPIO`);

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `FK_COMENTARIO_ANTEPROYECTO` FOREIGN KEY (`CVE_ANTEPROYECTO`) REFERENCES `anteproyecto` (`CVE_ANTEPROYECTO`),
  ADD CONSTRAINT `FK_COMENTARIO_USUARIO` FOREIGN KEY (`CVE_USUARIOS`) REFERENCES `usuarios` (`CVE_USUARIOS`);

--
-- Filtros para la tabla `empresas_vinculadas`
--
ALTER TABLE `empresas_vinculadas`
  ADD CONSTRAINT `empresas_vinculadas_ibfk_2` FOREIGN KEY (`CVE_COLONIA`) REFERENCES `colonias` (`CVE_COLONIA`);

--
-- Filtros para la tabla `estadia`
--
ALTER TABLE `estadia`
  ADD CONSTRAINT `FK_REFERENCE_10` FOREIGN KEY (`CVE_ALUMNOS`) REFERENCES `alumnos` (`CVE_ALUMNOS`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `FK_REFERENCE_12` FOREIGN KEY (`CVE_ASESOR_ACAD`) REFERENCES `asesores` (`CVE_ASESORES`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `FK_REFERENCE_8` FOREIGN KEY (`CVE_EMPRESAS_VINCULADAS`) REFERENCES `empresas_vinculadas` (`CVE_EMPRESAS_VINCULADAS`);

--
-- Filtros para la tabla `historial_estadia`
--
ALTER TABLE `historial_estadia`
  ADD CONSTRAINT `FK_REFERENCE_14` FOREIGN KEY (`CVE_USUARIOS`) REFERENCES `usuarios` (`CVE_USUARIOS`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_REFERENCE_7` FOREIGN KEY (`CVE_ESTADIA`) REFERENCES `estadia` (`CVE_ESTADIA`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `memoria_estadia`
--
ALTER TABLE `memoria_estadia`
  ADD CONSTRAINT `FK_REFERENCE_6` FOREIGN KEY (`CVE_ESTADIA`) REFERENCES `estadia` (`CVE_ESTADIA`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

