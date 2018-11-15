'use strict'
const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer); //El método stringify del objeto JSON convierte una cadena en un JSON válido

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo guardar los datos', err);
        console.log('Datos guardados correctamente en el archivo JSON');
    })

}

const cargarDB = () => { //esta función leerá un archivo JSON

    try {
        listadoPorHacer = require('../db/data.json');
        //El require tomará el archivo, lo convertirá en un arreglo y lo guardará en el arreglo que ya tenemos 'listadoPorHacer',
        //es decir lo que traiga el JSON le hará un push al arreglo, para que cuando se carge la BD ahora el arreglo 
        //tenga todo lo que trae el JSON   
    } catch (error) {
        listadoPorHacer = [];
        /*Si ocurre un error porque el JSON no tiene nada y no puede convertirlo a objeto/arreglo
        le ponemos un objeto vacio, por lo tanto el JSON ya tendrá algo, no marcará un error y se podrán guardar los datos*/
    }
}

const crear = (descripcion) => { //recibimos la descripción que viene en los argv del archivo app.js

    cargarDB();
    /*cargamos la bd (leemos el JSON)
                   para que ahora el arreglo listadoPorHacer contenga lo que se ha guardado en el JSON,
                   de esta manera cuando se hace el push de la nueva tarea se agrege al arreglo,
                   para posteriormente guardar todo lo que tenga el arreglo en un JSON
                   */

    let porHacer = {
        descripcion, //Solo se pone una vez el atributo porque en ES6 sería redundante poner descripción : descripción
        completado: false //por defecto será false
    };

    listadoPorHacer.push(porHacer); //Se agrega el objeto al arreglo listadoPorHacer
    guardarDB(); //Se guarda el objeto en el archivo .JSON
    return porHacer;
}

const getListado = (completado) => {
    cargarDB();
    if (completado === "true") {
        let nuevoListado = listadoPorHacer.filter(tareas => tareas.completado == true);
        listadoPorHacer = nuevoListado;
    } else if (completado === "false") {
        let nuevoListado = listadoPorHacer.filter(tareas => tareas.completado == false);
        listadoPorHacer = nuevoListado;
    }
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        console.log('Actualizado')
        guardarDB();
        return true;
    } else {
        console.log('No se pudo actualizar el estado de esa tarea')
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    //Aqui vamos a obtener un nuevo arreglo con todas las tareas que no coincidan con la que se va a borrar, para que se excluya la tarea que se va a borrar
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        console.log('Esa tarea no existe')
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        console.log(`La tarea ${descripcion} fue borrada exitosamente`)
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}