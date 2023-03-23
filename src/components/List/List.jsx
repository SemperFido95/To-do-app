import { useEffect, useState } from "react";
import axios from 'axios';
import NewTask from "../NewTask/NewTask";
import CompleteTask from "./CompleteTask";

function List() {
    const [taskList, getTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const showTasks = () => {
        axios.get('/todo').then((response) => {
            getTasks(response.data);
        }).catch((error) => {
            console.log(`Error in GET ${error}`);
            alert('Something went wrong.');
        });
    }

    useEffect(() => {
        showTasks();
    }, []);

    const removeTask = (id) => {
        axios.delete(`todo/${id}`).then((response) => {
            console.log(response);
            showTasks();
        })
    }

    return (
        <div id="list">
            <NewTask 
                newTask={newTask}
                setNewTask={setNewTask}
            />
            <h2>Tasks</h2>
            <div id="spacer"></div>
            <ul>
                {
                    taskList.map((task) => (
                        <li key={task.id}>
                            <CompleteTask 
                                task={task}
                                newTask={newTask}
                                showTasks={showTasks}
                            />
                            <button style={{cursor: 'pointer'}} className="remove" onClick={() => removeTask(task.id)}>Remove</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default List;