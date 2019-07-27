/**
 * @fileoverview Este archivo contiene la clase principal y unica existente en esta libreria. la cual sirve para manipular una base de datos con extencion .txt
 * @version 1.0.0
 * @author ToelF
 * @license Matias
 */
"use strict";
const fs = require('fs');
const path = require('path');
const DBtxt = require('./error.js');
const colleccion = require("./coleccion.js");
const discordcolleccion = require("./discordcolleccion.js");
/**
 * Clase principal sirve para crear o inicializar la base de datos poniendo su nombre en el constructor.
 * @example
 * const db = require("dbtxt");
 * const usuarios = db("usuarios");
 */
class dbtxt {
    /** 
     * Aqui se inicializan las propiedades necesarias para el funcionamiento de la base de datos.
     * @constructor
     * @param {string} nombredb aqui iria el nombre de la base de datos
    */
    constructor(nombredb = "txt") {
        if (!nombredb) {
            throw new DBtxt("Ingresa un valor como nombre");
        } else if (typeof nombredb != "string") {
            throw new DBtxt("Ingresa un valor de tipo string como nombre");
        } else {
            /**
             * Esta propiedad es igual al valor ingresado en el constructor con la extencion .txt agregada.
             * @type {string}
             */
            this.archivo = nombredb + ".txt";
            /**
             * Esta propiedad es igual a la propiedad archivo con un path.resolve aplicado.
             * @type {string}
             */
            this.resolvido = path.resolve(`${this.archivo}`);

            (() => {
                if (fs.existsSync(this.archivo)) return;

                try {
                    fs.createWriteStream(this.archivo);
                    return true;
                }
                catch (error) {
                    throw new DBtxt(` = Ocurrio un problema al crear los datos de ${nombredb} - el erro ${error}`);
                };
            })();
        };
    };


    /**
     * No usar esta funcion por favor.
     * @deprecated
     * @param {string} dato Es el dato que se utiliza para actualizar la db.
     */
    guardar(dato) {
        fs.writeFileSync(this.archivo, dato)
    };



    /**
     * Esta funcion sirve para agregar un dato a la base de dato.
     * @param {string} titulo Es un nombre amistoso y permanente para tu dato.
     * @param {object} dato Es el dato a almacenar puede ser un objeto o un array y no debe contener un Map o si no sera eliminado.
     * @returns {boolean} Devuelve true si todo salio bien o devuelve una excepcion si algo sale mal.
     * @example
     * const db = require("dbtxt");
     * const usuarios = new db("usuarios");
     * usuarios.agregar("Matias", { "edad": 20, "apellido": "martines" });
     */
    agregar(titulo, dato) {
        let dataStr = fs.readFileSync(this.archivo, "utf8");
        let datostrr = JSON.stringify(dato);
        let guardado = dataStr + "(" + titulo + ")[" + datostrr + "] ";
        let divicion = dataStr.split(" ");
        for (let x = 0; x < divicion.length; x++) {
            let dato = divicion[x];
            let tituloDato = dato.replace(/\[.*\]/, "").slice(1, -1);
            if (titulo == tituloDato) {
                throw new DBtxt(` = La base de datos ya tiene almacenado ese dato.`);
            } else { };
        };
        this.guardar(guardado);
        return true;
    };


    /**
     * Esto actualiza un dato ya existente en la base de datos.
     * @param {string} titulo El nombre del dato a editar. 
     * @param {Object} dato Nuevo dato que remplace al anterior.
     * @returns {boolean} Devuelve true si todo salio bien o devuelve una excepcion si algo sale mal.
     * @example
     * const db = require("dbtxt");
     * const usuarios = new db("usuarios");
     * usuarios.actualizar("Matias", { "edad": 22, "apellido": "martinez" });
     */
    actualizar(titulo, dato) {
        let dataStr = fs.readFileSync(this.archivo, "utf8");
        let divicion = dataStr.split(" ");
        for (let x = 0; x < divicion.length; x++) {
            let tituloDato = divicion[x].replace(/\[.*\]/, "").slice(1, -1);
            if (titulo == tituloDato) {
                let datostrr = JSON.stringify(dato);
                divicion[x] = "(" + titulo + ")[" + datostrr + "]";
                this.guardar(divicion.join(" "));
                return true;
            };
        };
        throw new DBtxt(` = La base de datos no tiene almacenado ese dato.`);
    };

    /**
     * Eliminas un dato de la base de datos.
     * @param {string} titulo El nombre del dato a eliminar.
     * @returns {boolean} Devuelve true si todo salio bien o devuelve una excepcion si algo sale mal.
     * @example
     * const db = require("dbtxt");
     * const usuarios = new db("usuarios");
     * usuarios.eliminar("Matias");
     */
    eliminar(titulo) {
        let dataStr = fs.readFileSync(this.archivo, "utf8");
        let divicion = dataStr.split(" ");
        for (let x = 0; x < divicion.length; x++) {
            let tituloDato = divicion[x].replace(/\[.*\]/, "").slice(1, -1);
            if (titulo == tituloDato) {
                divicion[x] = "";
                this.guardar(divicion.join(" "));
                return true;
            };
        };
        throw new DBtxt(` = La base de datos no tiene almacenado ese dato.`);
    };

    /**
     * Obtienes el volor de un dato almacenado en la base de datos devuelve null si no existe.
     * @param {string} titulo El nombre del dato a observar.
     * @returns {object} retorna el contenido del dato la base de datos o devuelve null si no lo encuentra.
     * @example
     * const db = require("dbtxt");
     * const usuarios = new db("usuarios");
     * usuarios.obtener("Matias");
     */
    obtener(titulo) {
        let dataStr = fs.readFileSync(this.archivo, "utf8");
        let divicion = dataStr.split(" ");
        for (let x = 0; x < divicion.length; x++) {
            let dato = divicion[x];
            let tituloDato = dato.replace(/\[.*\]/, "").slice(1, -1);
            if (titulo == tituloDato) {
                let script = dato.replace(/\(.*\)/, "").slice(1, -1);
                return JSON.parse(script);
            } else { };
        };
        return null;
    };


    /**
     * Verificas la existencia de un valor en la base de datos
     * @param {string} titulo El nombre del dato a verificar.
     * @returns {boolean} retorna true si el valor existe o retorna false si no existe.
     * @deprecated
     * @example
     * const db = require("dbtxt");
     * const usuarios = new db("usuarios");
     * usuarios.obtener("Matias");
     */
    existe(titulo) {
        let dataStr = fs.readFileSync(this.archivo, "utf8");
        let divicion = dataStr.split(" ");
        for (let x = 0; x < divicion.length; x++) {
            let dato = divicion[x];
            let tituloDato = dato.replace(/\[.*\]/, "").slice(1, -1);
            if (titulo == tituloDato) {
                return true;
            } else { };
        };
        return false;
    };

    /**
     * Devuelve el valor del primer elemento de la base de datos.
     * @returns {object} Devuelve el valor del primer elemento de la base de datos.
     * @example
     * const db = require("dbtxt");
     * const usuarios = new db("usuarios");
     * usuarios.primero();
     */
    primero() {
        let dataStr = fs.readFileSync(this.archivo, "utf8");
        let divicion = dataStr.split(" ");
        for (let x = 0; x < divicion.length; x++) {
            let dato = divicion[x];
            let script = dato.replace(/\(.*\)/, "").slice(1, -1);
            return JSON.parse(script);
        };
        return null;
    };


    /**
     * Quita los espacios inutiles en el archivo de base de datos.
     * @returns {boolean} Devuelve true si todo salio bien o devuelve una excepcion si algo sale mal.
     * @example
     * const db = require("dbtxt");
     * const usuarios = new db("usuarios");
     * usuarios.reordenar();
     */
    reordenar() {
        let dataStr = fs.readFileSync(this.archivo, "utf8");
        let divicion = dataStr.replace("\n", "").split(" ");
        let reorden = [];
        for (let x = 0; x < divicion.length; x++) {
            let dato = divicion[x];
            if (dato == "" || / +/g.test(dato)) { } else {
                reorden.push(dato);
            };
        };
        let guardado = reorden.join(" ").reverse();
        this.guardar(guardado);
        return true;
    };

    /**
     * Transformas la base de dato en un array.
     * @returns {Array}
     * @example
     * const db = require("dbtxt");
     * const usuarios = new db("usuarios");
     * var array = usuarios.toArray();
     */
    toArray() {
        let dataStr = fs.readFileSync(this.archivo, "utf8");
        let divicion = dataStr.split(" ");
        let reorden = [];
        for (let x = 0; x < divicion.length; x++) {
            let dato = divicion[x];
            if (dato == "" || / +/g.test(dato)) { } else {
                let script = dato.replace(/\(.*\)/, "").slice(1, -1);
                reorden.push(JSON.parse(script));
            };
        };
        return reorden.reverse();
    };

    /**
     * Transformas la base de dato en un objeto.
     * @returns {object}
     * @example
     * const db = require("dbtxt");
     * const usuarios = new db("usuarios");
     * var objeto = usuarios.toJson();
     */
    toJson() {
        let dataStr = fs.readFileSync(this.archivo, "utf8");
        let divicion = dataStr.split(" ");
        let reorden = {};
        for (let x = 0; x < divicion.length; x++) {
            let dato = divicion[x];
            if (dato == "" || / +/g.test(dato)) { } else {
                let tituloDato = dato.replace(/\[.*\]/, "").slice(1, -1);
                let script = dato.replace(/\(.*\)/, "").slice(1, -1);
                reorden[tituloDato] = JSON.parse(script);
            };
        };
        return reorden;
    };

    /**
     * Transformas la base de dato en un objeto de tipo Map.
     * @returns {Map}
     * @example
     * const db = require("dbtxt");
     * const usuarios = new db("usuarios");
     * var mapeado = usuarios.toMap();
     */
    toMap() {
        let dataStr = fs.readFileSync(this.archivo, "utf8");
        let divicion = dataStr.split(" ");
        let reorden = new discordcolleccion();
        for (let x = 0; x < divicion.length; x++) {
            let dato = divicion[x];
            if (dato == "" || / +/g.test(dato)) { } else {
                let tituloDato = dato.replace(/\[.*\]/, "").slice(1, -1);
                let script = dato.replace(/\(.*\)/, "").slice(1, -1);
                reorden.set(tituloDato, JSON.parse(script));
            };
        };
        return reorden;
    };

    /**
     * Transformas la base de dato en un string.
     * @returns {string}
     * @example
     * const db = require("dbtxt");
     * const usuarios = new db("usuarios");
     * var texto = usuarios.toString();
     */
    toString() {
        return fs.readFileSync(this.archivo, "utf8");
    };


    /**
     * Iteras todos los elementos de la base de datos.
     * @param {string|Function} callback 
     * @example
     * const db = require("dbtxt");
     * const usuarios = new db("usuarios");
     * usuarios.forEach((valor) => { console.log(valor) });
     */
    forEach(callback, b, c) {
        return this.toMap().forEach(callback, b, c);
    };

    /**
     * Te permite filtrar dentro de elementos de la base de datos.
     * @param {string|Function} callback
     * @returns {object}
     * @example
     * const db = require("dbtxt");
     * const usuarios = new db("usuarios");
     * var mayores = usuarios.filtrar(u => u.edad < 18);
     */
    filtrar(callback, b) {
        let dataStr = fs.readFileSync(this.archivo, "utf8");
        let divicion = dataStr.split(" ");
        let reorden = new colleccion();
        for (let x = 0; x < divicion.length; x++) {
            let dato = divicion[x];
            if (dato == "" || / +/g.test(dato)) { } else {
                let tituloDato = dato.replace(/\[.*\]/, "").slice(1, -1);
                let script = dato.replace(/\(.*\)/, "").slice(1, -1);
                reorden.set(tituloDato, JSON.parse(script));
            };
        };
        return reorden.filter(callback, b);
    };

    /**
     * Obtienes un dato completamente aleatorio.
     * @param {number} numero 
     * @returns {object}
     * @example
     * const db = require("dbtxt");
     * const usuarios = new db("usuarios");
     * var ganador = usuarios.random();
     */
    random(numero) {
        return this.toMap().random(numero);
    };

    /**
     * Obtienes la cantidad de datos que contiene la base de datos.
     * @returns {number}
     * @example
     * const db = require("dbtxt");
     * const usuarios = new db("usuarios");
     * console.log(usuarios.cantidad());
     */
    cantidad() {
        return this.toArray().length;
    };
};
module.exports = dbtxt;