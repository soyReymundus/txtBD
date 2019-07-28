var npm = require("./index.js");
const usuarios = new npm("usuario");
console.log("Se creo la base de datos.\nEn 3 segundo se creara un usuario.");
delete npm;
delete require.cache;

setTimeout(() => {
    usuarios.agregar("ToelF", {"token":"UYFyukBYftUYIKgfuiyg", "usuario": "toelf", "contraseña": "pituqueo5680" });
    console.log("Se creo un usuario cullos datos son:");
    console.log(usuarios.obtener("ToelF"));
    console.log("En 5 segundos este usuario se borrara la cuenta.");
}, 3000);

setTimeout(() => {
    usuarios.eliminar("ToelF");
    let existencia = usuarios.existe("ToelF");
    console.log("El usuario borro su cuenta. Para conprobarlo usuaremos la funcion existe()");
    console.log(existencia);
    console.log("Confirmamos que el usuarios no existe.");
},8000);