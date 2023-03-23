import { useEffect, useState } from "react";
import axios from 'axios';
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import RemoveTask from "./RemoveTask";

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
                            <RemoveTask
                                task={task}
                                showTasks={showTasks}
                            />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default List;