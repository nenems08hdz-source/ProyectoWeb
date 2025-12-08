-- Script para crear la tabla de notificaciones
-- Ejecuta este script para agregar el sistema de notificaciones

-- Crear tabla de notificaciones
CREATE TABLE IF NOT EXISTS `notificaciones` (
  `CVE_NOTIFICACION` int(11) NOT NULL AUTO_INCREMENT,
  `CVE_USUARIOS` int(11) NOT NULL COMMENT 'ID del usuario que recibe la notificación (asesor)',
  `CVE_ANTEPROYECTO` int(11) DEFAULT NULL COMMENT 'ID del anteproyecto relacionado',
  `TITULO` varchar(200) NOT NULL COMMENT 'Título de la notificación',
  `MENSAJE` text NOT NULL COMMENT 'Mensaje de la notificación',
  `TIPO` enum('asignacion','comentario','aprobacion','rechazo','actualizacion') DEFAULT 'asignacion' COMMENT 'Tipo de notificación',
  `LEIDA` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = no leída, 1 = leída',
  `FECHA_CREACION` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora de creación',
  `FECHA_LECTURA` datetime DEFAULT NULL COMMENT 'Fecha y hora en que se leyó',
  PRIMARY KEY (`CVE_NOTIFICACION`),
  KEY `FK_NOTIFICACION_USUARIO` (`CVE_USUARIOS`),
  KEY `FK_NOTIFICACION_ANTEPROYECTO` (`CVE_ANTEPROYECTO`),
  KEY `IDX_LEIDA` (`LEIDA`),
  KEY `IDX_FECHA_CREACION` (`FECHA_CREACION`),
  CONSTRAINT `FK_NOTIFICACION_USUARIO` FOREIGN KEY (`CVE_USUARIOS`) REFERENCES `usuarios` (`CVE_USUARIOS`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_NOTIFICACION_ANTEPROYECTO` FOREIGN KEY (`CVE_ANTEPROYECTO`) REFERENCES `anteproyecto` (`CVE_ANTEPROYECTO`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de notificaciones para asesores';

