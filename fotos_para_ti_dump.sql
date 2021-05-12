-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema fotos_para_ti
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema fotos_para_ti
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fotos_para_ti` DEFAULT CHARACTER SET utf8 ;
USE `fotos_para_ti` ;

-- -----------------------------------------------------
-- Table `fotos_para_ti`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fotos_para_ti`.`cliente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `contrasena` VARCHAR(45) NOT NULL,
  `activo` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fotos_para_ti`.`foto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fotos_para_ti`.`foto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `contenido` VARCHAR(255) NULL,
  `titulo` VARCHAR(45) NOT NULL,
  `activa` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fotos_para_ti`.`carro_compra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fotos_para_ti`.`carro_compra` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cliente_id` INT NOT NULL,
  `foto_id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fotos_para_ti`.`orden`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fotos_para_ti`.`orden` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha` TIMESTAMP NOT NULL,
  `cliente_id` INT NOT NULL,
  `total` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fotos_para_ti`.`orden_detalle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fotos_para_ti`.`orden_detalle` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `orden_id` INT NOT NULL,
  `foto_id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fotos_para_ti`.`lista_deseo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fotos_para_ti`.`lista_deseo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cliente_id` INT NOT NULL,
  `foto_id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fotos_para_ti`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fotos_para_ti`.`admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `contrasena` VARCHAR(45) NOT NULL,
  `privilegio` TINYINT NOT NULL,
  `activo` TINYINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- -----------------------------------------------------

-- ADMINISTRADORES
-- -----------------------------------------------------
insert into `fotos_para_ti`.`admin` (`nombre`, `email`, `contrasena`, `privilegio`, `activo`) VALUES ('diego', 'diego@email.com', '123', 1, 1 );
insert into `fotos_para_ti`.`admin` (`nombre`, `email`, `contrasena`, `privilegio`, `activo`) VALUES ('pedro', 'pedro@email.com', '123', 0, 1 );
insert into `fotos_para_ti`.`admin` (`nombre`, `email`, `contrasena`, `privilegio`, `activo`) VALUES ('juan', 'juan@email.com', '123', 0, 0 );

-- -----------------------------------------------------
-- CLIENTES
-- ------------------------------------------------------- 
insert into `fotos_para_ti`.`cliente` (`nombre`, `email`, `contrasena`, `activo`) VALUES ('cesar', 'cesar@email.com', '123', 1);
insert into `fotos_para_ti`.`cliente` (`nombre`, `email`, `contrasena`, `activo`) VALUES ('maria', 'maria@email.com', '123', 0);
insert into `fotos_para_ti`.`cliente` (`nombre`, `email`, `contrasena`, `activo`) VALUES ('juana', 'juana@email.com', '123', 1);

-- -----------------------------------------------------
-- FOTOS
-- -----------------------------------------------------
insert into `fotos_para_ti`.`foto` (`contenido`, `titulo`, `activa`) VALUES ('img1.jpg', 'Palmeras', true );
insert into `fotos_para_ti`.`foto` (`contenido`, `titulo`, `activa`) VALUES ('img2.jpg', 'Playa Blanca', true );
insert into `fotos_para_ti`.`foto` (`contenido`, `titulo`, `activa`) VALUES ('img3.jpg', 'Bosque', true );
insert into `fotos_para_ti`.`foto` (`contenido`, `titulo`, `activa`) VALUES ('img4.jpg', 'Atardecer', true );
insert into `fotos_para_ti`.`foto` (`contenido`, `titulo`, `activa`) VALUES ('img5.jpg', 'Guacamayos', true );
insert into `fotos_para_ti`.`foto` (`contenido`, `titulo`, `activa`) VALUES ('img6.jpg', 'Cascada Verde', true );
-- -----------------------------------------------------
-- CONSULTAS
-- -----------------------------------------------------
use fotos_para_ti;
select * from cliente;
select * from foto;
select * from carro_compra;
select * from orden;
select * from orden_detalle;
select * from lista_deseo;
select * from admin;