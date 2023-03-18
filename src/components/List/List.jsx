import { useEffect, useState } from "react";
import axios from 'axios';
import './List.css';

function List() {
    const [taskList, getTasks] = useState([]);
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

     const [newTask, setNewTask] = useState('');
    
    const submitForm = event => {
        event.preventDefault();
        axios.post('./todo', {task: newTask}).then((response) => {
            console.log('in PUT request');
            setNewTask('');
            showTasks();
        }).catch((error) => {
            console.log(`Error in POST ${error}`);
            alert('Something went wrong.');
        })
    }

    return (
        <div id="list">
            <form onSubmit={submitForm}>
                Task: <input type="text" onChange={(event) => setNewTask(event.target.value)} />
            <button>Submit</button>
        </form>
            <h2>Tasks</h2>
            <div id="spacer"></div>
            <ul>
                {
                    taskList.map((task) => (
                        <li key={task.id}>{task.task}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default List;