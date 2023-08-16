
import React, { useState, useEffect } from "react";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	//Crear estados
	const [mitarea, setMitarea] = useState("")
	const [lista, setLista] = useState([])
	const [boton, setBoton] = useState(false)

	//2. asignacion del evento onChange lo tengo en el html
	// function handleInput(e) {
	// setInputvalue(e.target.value);
	// setInputvalue("")
	// }


		// useEffect(funcion anonima,array vacio)
		useEffect(function () {        // onload => ejecutar codigo ni bien cargue el componente
			// bloque de codigo que queremos ejecutar
		
				 crearUsuario()
				 console.log("hola")
				obtenerTareas()
			 },[])

	//3.Agregar tareas onSubmit    4b-Modificar esta función para recibir un objeto
	function agregar(e) {    //esta función recibe un evento como parámetro
		e.preventDefault()      //evita que ejecute la accion predeterminada
		const nuevaTarea = {
            done:false,
            label: mitarea
        }
        setLista([...lista, nuevaTarea])    //setLista actualiza a lista, recibe los elementos que ya existían (...) y le agrega un nuevo objeto
        setMitarea("")        //llama a la función setMitarea y le pasa como argumento una cadena vacía ("") es para que el input quede vacío despues de escribir en él
        actualizarListaTareas([...lista, nuevaTarea])     //actualiza a lista, recibe los elementos ya existentes y le agrega un objeto
		console.log(lista)     //imprime el valor del array lista

    }
		

//3-b  Crear función para agregar objeto con método PUT (actualiza)

	async function actualizarListaTareas(listanueva) {
		try {
			await fetch('https://playground.4geeks.com/apis/fake/todos/user/Ana123',{
				method:'PUT',
                headers: { "Content-Type":"application/json"},
                body: JSON.stringify(listanueva),
            })
			
		 let data = await response.json()    //guardo el objeto en data
		console.log(data);

		} catch (error) {
			console.log(error); //si hay un error me muestra cual fue
		}
	}


	function eliminar (index) {
		console.log(index)
		const arregloentero = lista.filter((fila, nuevoindex) => {   //arregloentero es mi nuevo arreglo creado por filter donde se encuentran los elementos que cumplen la condición dada
		return nuevoindex != index
		 })
		setLista(arregloentero)
		actualizarListaTareas(arregloentero)    //le avisa a la API el cambio que hubo en este caso eliminar tarea
	}

	// 1-b Crear usuario  con Post(almacenar datos)
	async function crearUsuario() {
		console.log("crear usuario")
		try {
			let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/Ana123',{
				method:'POST',
				headers: {
					"Content-Type": "application/json"
				  },
				  body: JSON.stringify([]), 
			})
			let data = await response.json()    //guardo el objeto en data
			console.log(data);

		} catch (error) {
			console.log(error); //si hay un error me muestra cual fue
		}
	}
	// 2b-obtener tareas con método Get
	async function obtenerTareas() {
		console.log("obtener tareas")
		try {
			let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/Ana123',{
				method:"GET",
				ContentType: "application/json",
                PARAMS: "None"
			})//especificamos la url donde vamos a buscar info
			let data = await response.json()
			setLista(data);    //llama a la funcion setLista y le pasa como argumento data( que es un objeto label y done)
			
	
		} catch (error) {
			console.log(error);
	
		}

	}
//Eliminar un usuario y todas sus tareas con Methodo delete

async function eliminarUsuarioTareas() {
	try {
		let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/Ana123',{
			method:'DELETE',
			headers: {
				"Content-Type": "application/json"
			  },
		})
		let data = await response.json()    //guardo el objeto en data
		console.log(data);

	} catch (error) {
		console.log(error); //si hay un error me muestra cual fue
	}
}



function borrarTodo() {
setLista([])
eliminarUsuarioTareas()
 }
	
return (

		<div className="text-center w-50 mx-auto">
			<div class="mb-3">
				<div>
					<h1>Todos</h1>
				</div>
				<form action="" onSubmit={agregar}> <input value={mitarea} type="text" onChange={function (e) { setMitarea(e.target.value) }} class="form-control shadow p-3 mb-5" id="exampleFormControlInput1" placeholder="escribe tu tarea" /></form>
			</div>
			<div class="mb-3">

				<ul className="list-group shadow p-3 mb-5">
					{
					lista.length >0?
					lista.map((tarea, index) => <li onMouseEnter={function () { setBoton(true) }} onMouseLeave={function () { setBoton(false) }} className="list-group-item d-flex flex-row justify-content-between">
						<p ClassName="m-0 p-0">{tarea.label}</p>
						{boton === true && <p className="text-danger opacity-50 m-0 p-0" onClick={function(){eliminar(index)}}>X</p>}
					</li>): <li className="list-group-item">"No hay tareas pendientes. Agregar tareas"</li> }
				</ul>
			</div>
			<div>
				{lista.length ===0 ? "No hay tareas pendientes. Agregar tareas" : lista.length + " tareas restantes"} 
			</div>
			<div>
				<button className="btn btn-primary" onClick={borrarTodo}>Borrar todas las tareas</button>
			</div>
			
		</div>
	);
};


export default Home;



