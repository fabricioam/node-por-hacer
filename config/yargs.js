'use strict'

const descripcion = {
    alias: 'd',
    demand: true,
    desc: 'Descripción de la tarea por hacer'
};

const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente la tarea'
};

const argv = require('yargs')
    .command('listar', 'lista las tareas completadas o no completadas según se especifique con el parámetro -c', {
        completado
    })
    .command('crear', 'Crea una tarea por hacer', { //creamos un comando llamado crear, y lo que hace
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra una tarea por hacer', {
        descripcion
    })
    .help() //para que nos muestre la ayuda
    .argv;

module.exports = {
    argv
}