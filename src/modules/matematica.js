/* Este es el módulo "matematicas" */
const PI = 3.14;

function sumar(x, y) {
    return x + y;
}

const restar = (x, y) => x - y;

const multiplicar = (a, b) => a * b;

const dividir = (a, b) => {
    if (b === 0) {
        throw new Error("No se puede dividir por cero");
    }
    return a / b;
};

const arrayStrings = ["dos", "cuatro", "ocho", "diez"];

export { PI, sumar, restar, multiplicar, dividir, arrayStrings };