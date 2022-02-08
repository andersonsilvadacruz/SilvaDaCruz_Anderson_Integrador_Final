-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-02-2022 a las 20:41:59
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `calzado`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calzados`
--

CREATE TABLE `calzados` (
  `id` int(10) NOT NULL,
  `tipo` varchar(30) NOT NULL,
  `color` varchar(30) NOT NULL,
  `talle` float NOT NULL,
  `stock` float NOT NULL,
  `imagen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `calzados`
--

INSERT INTO `calzados` (`id`, `tipo`, `color`, `talle`, `stock`, `imagen`) VALUES
(13, 'zapato', 'marron', 43, 250, 'dd2josx8rj6tmoxyocqh'),
(14, 'tennis', 'naranja', 27, 115, 'ldmrulsseh1crvwic71f'),
(15, 'taco', 'rosa', 29, 100, 'zgefzds8qc0jgy3cdda5'),
(16, 'tennis_mujer', 'negro', 26, 99, 'agxyxaagqhlk3bjhwmch'),
(18, 'ojota_mujer', 'naranja', 27, 110, 'jdnjp1viougft0k9plyz'),
(19, 'taco', 'rosa', 28, 50, 'gpqf0uy6yklpzszxfamc'),
(20, 'tennis_mujer', 'rosa', 25, 50, 'ycni7f5wm0s6c1lj0spt'),
(22, 'tennis_unisex', 'violeta', 37, 99, 'vknc2czezrhe4ycxweqv'),
(23, 'bota_hombre', 'negro', 42, 110, 'cneuiwuakdeubast3mwg'),
(26, 'sandalia', 'amarilla', 29, 78, 'calxezmhfuvsp8jutl2x'),
(29, 'zapato', 'negro', 42, 87, 'l8jeipd6g7qxpuc4fqqb');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registrados`
--

CREATE TABLE `registrados` (
  `id` int(100) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `contraseña` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `registrados`
--

INSERT INTO `registrados` (`id`, `nombre`, `contraseña`) VALUES
(1, 'anderson', 'e10adc3949ba59abbe56e057f20f883e');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calzados`
--
ALTER TABLE `calzados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `registrados`
--
ALTER TABLE `registrados`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `calzados`
--
ALTER TABLE `calzados`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `registrados`
--
ALTER TABLE `registrados`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
