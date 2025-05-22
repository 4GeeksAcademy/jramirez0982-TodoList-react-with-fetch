import { Button } from "bootstrap";
import React, { useState, useEffect } from "react";


//include images into your bundle


//create your first component
const Home = () => {
	useEffect(() => {
		getTaskList()
	}, [])


	//let arrayTask = [];
	const [taskList, setTaskList] = useState([]);


	const handleKeyDown = (event) => {
		if (event.keyCode === 13) {

			fetch("https://playground.4geeks.com/todo/todos/julian_ramirezr", {
				method: "POST",
				body: JSON.stringify({ label: event.target.value, is_done: false }),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((response) => {
					return response.json()
				})
				.then((data) => {
					console.log(data)
					getTaskList()
				})
				.catch((err) => { err })
			event.target.value = "";
		};
	}

	function getTaskList() {
		fetch("https://playground.4geeks.com/todo/users/julian_ramirezr")
			.then((response) => {
				console.log(response)
				if (response.ok == false) {
					throw new Error("Error al traer los datos")
				}
				return response.json()
			})
			.then((data) => {
				console.log(data.todos)
				setTaskList(data.todos)
			})
			.catch((error) => {
				alert(Error)
			})
	}

	function deleteTask(indexTaskToDelete) {
		let idTask = taskList[indexTaskToDelete].id
		console.log(idTask)
		let urlofTask = "https://playground.4geeks.com/todo/todos/" + idTask.toString()
		console.log(urlofTask)

		fetch(urlofTask, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => {
				if (response.ok)
					console.log("informacion eliminada")
				getTaskList()
			})
			.catch((err) => { err })
	}

	return (
		<div className="text-center container">

			<h1 className="text-center mt-5">TO DO LIST!</h1>
			<input className="form-control" placeholder="Ingrese una nueva tarea"
				onKeyDown={handleKeyDown} />

			{
				taskList.map((task, index) => {
					return (<div className="position-relative mt-2">
						<p className="form-control text-start mb-0" rows="1">{task.label}</p>
						<button id={index} type="button" className="btn-close btn-close-hover position-absolute top-0 end-0 m-2 mb-0"
							onClick={() => {
								deleteTask(index)
							}
							} />
					</div>)

				})
			}
			<small className="text-muted d-flex text-star mx-2">
				{taskList.length == 0 ? "No hay pendientes, añadir tareas" : taskList.length + " item left"}
			</small>
			<div className="container d-flex flex-column align-items-center m-3">
				
				<button className="btn btn-primary col-4 m-1" onClick={
					getTaskList}>Mostrar tareas</button>
				
				<button className="btn btn-danger col-4 m-1" onClick={() => {
					for (let i = 0; i < taskList.length; i++) {
						deleteTask(i);
					}
					getTaskList()
				}} >Borrar todo</button>
			</div>
		</div>
	);
};

export default Home;