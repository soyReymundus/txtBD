/**
 * @version 1.0.0
 * @author ToelF
 * @license Matias
 */
"use strict";
/**
 * Este clase es la clase que se utiliza para el manejo de errores en esta libreria.
 * @extends {Error}
 * @example
 * var Error2 = require("error.js");
 * throw new Error2("fallo intencional.");
 */
class DBtxt extends Error {
  /** @constructor */
  constructor(error) {
    super(error);
    /**
     * Esta propiedad identifica el nombre del error.
     * @type {string}
     */
    this.name = "[DBtxt.Error]";
    /**
     * Esta propiedad identifica el mensaje del error.
     * @type {string}
     */
    this.message = error;
  };
};
module.exports = DBtxt;