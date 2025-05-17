import React, { useState } from "react";

//include images into your bundle
import ListElement from "./ListElement";

//create your first component
const Home = () => {

	let arrayTask = [];
	const [taskList, setTaskList] = useState([]);
	
	const handleKeyDown = (event) => {
		if (event.keyCode === 13) {
			setTaskList([...taskList, event.target.value])
			event.target.value = "";
		};

	}

	return (
		<div className="text-center container">

			<h1 className="text-center mt-5">TO DO LIST!</h1>
			<input className="form-control" placeholder="Ingrese una nueva tarea"
				onKeyDown={handleKeyDown} />

			{
				taskList.map((task, index) => {
					return (<div className="position-relative mt-2">
						<p className="form-control text-start mb-0" rows="1">{task}</p>
						<button id={index} type="button" className="btn-close btn-close-hover position-absolute top-0 end-0 m-2 mb-0"
							onClick={() => {
								setTaskList(taskList.filter((value, indexTaskList) => {
									return index !== indexTaskList

								}))

							}
							} />

					</div>)

				})
			}
			<small className="text-muted d-flex text-star mx-2">
				{taskList.length == 0 ? "No hay pendientes, añadir tareas" : taskList.length + " item left"}

			</small>

		</div>
	);
};

export default Home;