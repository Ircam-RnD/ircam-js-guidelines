/**
 * @file Greeter
 * @author Samuel Goldszmidt <samuel.goldszmidt@gmail.com>
 * @version 0.0.1
 */

/**
 * @class
 */
class Greeter {

  /** @constructs
   * @param name name
   */
  constructor(name) {
    this.name = name;
  }

  /** @function greet
   */
  greet() {
    return 'Hola, ¿ Qué tal ' + this.name + ' ?';
  }

  /** @function noGreet
  */
  noGreet(){
    return 'No, no, no, no.';
  }
};


module.exports = Greeter;
