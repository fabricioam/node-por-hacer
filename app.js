'use strict'
//const argv = require('yargs').argv;
const argv = require('./config/yargs').argv; // llamamos toda la configuración que esta en el archivo yargs que creamos en la carpeta config
const porHacer = require('./por-hacer/por-hacer');
const colors = require('colors');

//console.log(argv);

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':

        let listado = porHacer.getListado(argv.completado);
        console.log(argv.completado);
        for (let tarea of listado) {
            console.log('=========Por Hacer========'.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('=========================='.green);
        }
        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado)
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        break;
    default:
        console.log('Comando no reconocido');
        break;
}