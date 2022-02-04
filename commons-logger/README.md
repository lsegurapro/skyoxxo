# **commons-logger**


**Módulo para registrar logs**. Cuenta con un servicio creado través de la herramienta Wiston, la cual se puede configurar para establecer un `traceId` a cada request que recibe la aplicación.


## **INSTALACIÓN**

```
touch .npmrc
```

* Agregar al archivo `.npmrc` las credenciales correspondientes.

* **npm install @procontacto/commons-logger@1.1.0-beta**


## **¿CÓMO USAR?**

### Configuraciones

* Configrar el archivo `.env.*`:

```
LOG_MAX_FILE=7 //opcional
LOG_MAX_SIZE_FILE=100000 //opcional
LOG_PATH="./logs/prod-ms.log"
LOG_APP_NAME="VTEX"

```

* Configurar srcipts para ejecutar aplicación:

```json
{
    "start-prod"    : "NODE_ENV=production node ./dist/index.js",
    "start-dev"     : "NODE_ENV=development nodemon ./index.js",
    "start-test"    : "NODE_ENV=test nodemon ./index.js",
    "start-uat"     : "NODE_ENV=uat nodemon ./index.js",
}
```

* Configurar logger:

```typescript
const config = ({
    _logMaxFile: Number(process.env.LOG_MAX_FILE),
    _logMaxSizeFile: Number(process.env.LOG_MAX_SIZE_FILE),
    _logPath: process.env.LOG_PATH,
    _logAppName: process.env.LOG_APP_NAME
});

const logger = LoggerClass.createLogger(config);

export default logger;
```
### Ejemplo:

```typescript
import logger from '...';

logger.info("Test info");
logger.debug("Test debug");
logger.warn("Test warn");
logger.error("Test debug");

```
## TRACE-ID

* Ejemplo:

```typescript
import {LoggerClass} from '@procontacto/commons-logger';

LoggerClass.setTraceId();
```

# **PUBLICACIÓN**

```
npm publish
```

# Guía de estilo MS Integración.
 
## Estructura del proyecto

```
├── logs                   # Logs de las apis.
├── dist                   # Archivos compilados.
├── src                    # Source files.
├── test                   # Tests.
├── index.ts               # Página de índice.
├── package.json           
├── tsconfig.json          # Configuración compilador de ts.
├── webpack.config.js      # Configuración webpack.config.js.
├── .env                   # Variables de entorno (env.development, env.testing, ...)
└── README.md
```
### Source files

```
├── src                    # Source files.
|   ├── /config            # Contiene archivos de configuración (/database.ts, /redis.ts, /cron.ts, ...).
|   ├── /controllers       # Contiene archivos de clases para los controladores (nomenclatura: name.controller.ts).
|   ├── /daos              # Contiene archivos de lógica de acceso a datos (nomenclatura: /name.dao.ts).
|   ├── /helpers
|   |   ├── /decorators    # Contiene decoradores (nomenclatura: name.decorator.ts).
|   |   ├── /...
|   ├── /middlewares       # Contiene archivos de clases para los middlewares (nomenclatura: /name.ts).
|   ├── /models            # Contiene archivos de clases para los modelos (nomenclatura: /Name.ts).
|   ├── /resources         
|   |   ├── /sql           # Contiene querys (nomenclatura: /method/description-of-query.sql).
|   |   ├── /...
└── └──  /services         # Contiene archivos de clases para los servicios (nomenclatura: name.service.ts).
```

## Interfaces

El nombre de la interfaz debe tener la siguiente nomenclarutura: ``` INombreInterface ```

Las propiedades tienen la siguiente forma: ``` _name: type ```


```typescript
//ejemplo:
interface IAddress {
  _id: number;
  _street: string;
  _streetNumber: number;
  _neighborhood: string;
  _city: string;
  _province: string;
  _country: string;
  _zipCode: string;
  _lat: number;
  _lng: number;
  _details: string;
}
```
## Modelos

Implementa una interface.

Las propiedades son privadas y siguen la [nomenclatura especificada en la guía.](#nomenclatura-variables-y-métodos)

Los getters/setters tienen la siguiente forma:

```typescript
//ejemplos get:
 get _id(): number {
    return this.id;
  }
 //ejemplo set:
  set _id(id: number) {
    this.id = id;
  }
```

Ejemplo de un modelo:

```typescript
class Phone implements IPhone {
  private id: number;
  @IsNotEmpty({ message: 'El campo es requerido.' })
  private country: number;
  @IsNotEmpty({ message: 'El campo es requerido.' })
  private areaCode: number;
  @IsNotEmpty({ message: 'El campo es requerido.' })
  private number: number;

  constructor();
  constructor(phone?: any);
  constructor(phone?: Phone) {
    this.id = phone ? (phone.id ? phone.id : null) : null;
    this.country = phone ? (phone.country ? phone.country : null) : null;
    this.areaCode = phone ? (phone.areaCode ? phone.areaCode : null) : null;
    this.number = phone ? (phone.number ? phone.number : null) : null;
  }

  toString() {
    return `+${this._country} ${this._areaCode} ${this._number}`;
  }

  get _id(): number {
    return this.id;
  }

  get _country(): number {
    return this.country;
  }

  get _areaCode(): number {
    return this.areaCode;
  }

  get _number(): number {
    return this.number;
  }
}

export default Phone;
```

### Nomenclatura variables y métodos.

Se utiliza la convención [lowerCamelCase](https://developer.mozilla.org/en-US/docs/MDN/Contribute/Guidelines/Code_guidelines/JavaScript#Variable_naming):

```typescript
//ejemplo:
let styleGuide = 'test';

//métodos:
isExample();
```
### Versionado

Se utiliza la convención [SemVer](https://semver.org/):

- MAJOR version when you make incompatible API changes,
- MINOR version when you add functionality in a backwards compatible manner, and
- PATCH version when you make backwards compatible bug fixes.
- **-beta** en caso de que no esté testeado.

## GitFlow

El flujo de trabajo elegido tiene la siguente forma:

![Flujo de trabajo](http://bemobile.es/blog/wp-content/uploads/2016/11/GitFlow-workflow.png)

[Más info.](https://www.atlassian.com/es/git/tutorials/comparing-workflows/gitflow-workflow)

### Nomenclatura de las ramas.

Las ramas `features` tienen la siguiente forma: `feature-IDTABLERO-descripcionCorta`. Ej: `feature-MID-logger`.

Las ramas `bugfix` tienen la siguiente forma: `bugfix-IDTABLERO-descripcionCorta`. Ej: `bugfix-MID-buildDependencies`.

