<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


# Seed User Guide
## Descripción
Guía de instalación y uso

## Documentación asociada
  - https://docs.nestjs.com/
  - https://www.npmjs.com/package/typeorm-model-generator
  - https://typeorm.io/#/migrations
## Requisitos previos
  - `docker`
  - `docker compose`
  - `permisos de grupo para docker`
## Contenido
  - `Project install`
  - `Project start`
  - `Consumer implementation`
  - `Typeorm model generator`
  - `Migration use`

## Project install
La instalación de las dependencias de node se resuelve mediante contenedores dockerizados
```
Es suficiente con clonar el repositorio
```
## Project start
Una vez clonado el repositorio ejecutar sobre el proyecto:
```bash
docker-compose up
```
## Consumer implementation
Ejecutar un consumidor de rabbit implica levantar un nuevo proceso dentro del contenedor concessionaire-node, esto se resuelve con el siguiente comando:
```bash
docker exec concessionaire-node npm run start:local:consumer
```
## Typeorm model generator
Para generar modelos en tu aplicación que reflejen el esquema de tu base de datos se implemento la biblioteca: typeorm-model-generator

Para dar uso de la misma se facilita el siguiente comando
```bash
  docker exec concessionaire-node\
  npx typeorm-model-generator\
  -h procontacto-mariadb\
  -p 3306\
  -d MECHANICAL_SERVICE\
  -u root\
  -x root\
  -e mariadb\
  -o "./apps/src/Models/Entities"
```
## Migration use
El uso de las migraciones de typeorm se limito a la creación de las mismas y a la ejecución de estas, para la creación es posible crear una migración vacía o generar una con las diferencias entre el schema de la BD y las entidades actuales.

Se presentan los comandos que permiten realizar estas acciones:
### Migration revert
```
docker exec concessionaire-node npm run typeorm:local migration:revert
```
### Migration run
```
docker exec concessionaire-node npm run typeorm:local migration:run
```
### Migration create
```
docker exec concessionaire-node npm run typeorm:local migration:create -- -n "MigrationNameInCamelCase"
```