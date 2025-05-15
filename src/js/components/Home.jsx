import React, { useState } from "react";

//include images into your bundle
import ListElement from "./ListElement";

//create your first component
const Home = () => {

	let arrayTask = [];
	const [taskList, setTaskList] = useState([]);
	const [deleteTask, setDeleteTask] = useState(-1);

	const handleKeyDown = (event) => {
		if (event.keyCode === 13) {
			let copyTasks = [...taskList]
			copyTasks.push(event.target.value)
			setTaskList(copyTasks)
			console.log(taskList)
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
						<p className="form-control text-start" rows="1">{task}</p>
						<button id={index} type="button" className="btn-close btn-close-hover position-absolute top-0 end-0 m-2"
							onClick={() => {
								taskList.splice(index, 1)
								console.log({ index })
								console.log(taskList)
								setDeleteTask({ index })
							}
							} />
					</div>)

				})
			}

		</div>
	);
};

export default Home;