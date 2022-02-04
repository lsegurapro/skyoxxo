# Publicación de commons

## 1. configuración package.json
en la configuración del package.json debera contener el siguiente configuración:

```json
"publishConfig": {
        "registry": "https://nexus.pickit.net/repository/{commons-name}"
}
```
remplazando {commos-name} por el nombre del commons en cuestion

---
## 2. Commit de cambios
* git add .
* git commit -m "mi mensaje"

---
## 3. Versión
Una vez hecho el commit procedemos a generar la versión

* npm version {version}

{versión} será el nuevo número de versión que deseamos subir.

---
## 4. Login en Nexus
Se requiere contar con una cuenta de Nexus. Las credenciales otorgadas en esa cuenta seran las que se utilicen al momento de autenticarse. Ademas estas credenciales deben contar con permisos para subir nuevas versiones.

---
## 5. Para autenticarnos
```bash
npm login --registry=https://nexus.pickit.net/repository/{commons-name}
```
ejemplo con el user de Pickit:
* user: pickit
* pass: ********* 
* Nos pedirá un email e ingresamos el siguiente: javaca@pickit.net
* Para publicar ingresamos el siguiente comando ```npm publish```
* Para concluir nos deslogueamos ingresando ```npm logout```
---
## 6. Tag
Taggeamos la versión correspondiente para que quede registro de la nueva versión en el repositorio remoto

```bash
git tag -a {version} -m "{version}"
```
---
## 7. Push
Por ultimo subimos los cambios hechos en el codigo y el tag creado en el paso anterior.

```bash
git push origin branch
git push origin {version}
```

