# Bienvido a DBtxt!

Hola!, has querido guardar información en un **.txt** sin tanto código y totalmente fácil. Usa este NPM.


<div align="center">
<img src="https://i.imgur.com/3pZJ5kLh.jpg">
</div>

# Informacion

Toda Información Se guarda en un archivo de texto.
usando el siguiente formato
```
(nombre)[datos]
(usuario)[{"edad": 18}]
```


# dbtxt

Clase principal sirve para crear o inicializar la base de datos poniendo su nombre en el constructor.
```js
const db = require("dbtxt");
const usuarios = db("usuarios");
```

## Propiedades

archivo: Esta propiedad es igual al valor ingresado en el constructor con la extencion **.txt** agregada.

Tipo: string


resolvido: Esta propiedad es igual a la propiedad **archivo** con un **path.resolve** aplicado.

tipo: string

## Metodos

### agregar(titulo, dato);

Esta funcion sirve para agregar un dato a la base de dato.

titulo: Es un nombre amistoso y permanente para tu dato. **string**

dato: Es el dato a almacenar puede ser un objeto o un array y no debe contener un Map o si no sera eliminado. **string**

```js
const db = require("dbtxt");
const usuarios = db("usuarios");
usuarios.agregar("Matias", { "edad": 20, "apellido": "martines" }); //true porque se creo
```


### actualizar(titulo, dato);

Esto actualiza un dato ya existente en la base de datos.

titulo: El nombre del dato a editar. **string** 

dato: Nuevo dato que remplace al anterior. **object**

```js
const db = require("dbtxt");
const usuarios = db("usuarios");
usuarios.actualizar("Matias", { "edad": 22, "apellido": "martinez" }); //true porque se actualizo
```

### eliminar(titulo);

Eliminas un dato de la base de datos.

titulo: El nombre del dato a eliminar. **string**

```js
const db = require("dbtxt");
const usuarios = db("usuarios");
usuarios.eliminar("Matias"); //lo eliminamos
```

### obtener(titulo);

Obtienes el volor de un dato almacenado en la base de datos devuelve null si no existe.

titulo: El nombre del dato a observar.

```js
const db = require("dbtxt");
const usuarios = db("usuarios");
usuarios.obtener("Matias"); //null porque lo borramos.
```

### existe(titulo);

Verificas la existencia de un valor en la base de datos

titulo: El nombre del dato a verificar. **string**

```js
const db = require("dbtxt");
const usuarios = db("usuarios");
usuarios.obtener("Matias"); //false porque lo borramos
```

### primero();

Devuelve el valor del primer elemento de la base de datos.

```js
const db = require("dbtxt");
const usuarios = db("usuarios");
usuarios.primero();
```

### reordenar();

Quita los espacios inutiles en el archivo de base de datos.

```js
const db = require("dbtxt");
const usuarios = db("usuarios");
usuarios.reordenar();
```

### toArray();

Transformas la base de dato en un array.

```js
const db = require("dbtxt");
const usuarios = db("usuarios");
var array = usuarios.toArray();
```

### toJson();

Transformas la base de dato en un objeto.

```js
const db = require("dbtxt");
const usuarios = db("usuarios");
var objeto = usuarios.toJson();
```

### toMap();

Transformas la base de dato en un objeto de tipo Map.

```js
const db = require("dbtxt");
const usuarios = db("usuarios");
var mapeado = usuarios.toMap();
```

### toString();

Transformas la base de dato en un string.

```js
const db = require("dbtxt");
const usuarios = db("usuarios");
var texto = usuarios.toString();
```

### forEach(callback);

Iteras todos los elementos de la base de datos.

```js
const db = require("dbtxt");
const usuarios = db("usuarios");
usuarios.forEach((valor) => { console.log(valor) });
```

### filtrar(callback);

Te permite filtrar dentro de elementos de la base de datos.

```js
const db = require("dbtxt");
const usuarios = db("usuarios");
var mayores = usuarios.filtrar(u => u.edad < 18);
```

### random();

Obtienes un dato completamente aleatorio.

```js
const db = require("dbtxt");
const usuarios = db("usuarios");
var ganador = usuarios.random();
```

### cantidad();

Obtienes la cantidad de datos que contiene la base de datos.

# Creditos

ToelF programador y creador principal.

Kamerr apoyo, dibujos e ideas.