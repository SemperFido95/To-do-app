import { useEffect, useState } from "react";
import axios from 'axios';

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

    const submitForm = event => {
        event.preventDefault();
        axios.post('./todo', {task: newTask}).then((response) => {
            console.log('in POST request');
            setNewTask('');
            showTasks();
        }).catch((error) => {
            console.log(`Error in POST ${error}`);
            alert('Something went wrong.');
        })
    }

    const markComplete = (event) => {
        let status = event.target.checked;
        let id = Number(event.target.id);
        let completeObject = {}
        if (status === true) {
            completeObject.complete = true;
        } else {
            completeObject.complete = false;
        }
        axios.put(`/todo/${id}`, completeObject).then((response) => {
            console.log(response);
            showTasks();
        }).catch((error) => {
            console.log(`Error in PUT ${error}`);
            alert('Something went wrong');
        })
    }

    const removeTask = (id) => {
        axios.delete(`todo/${id}`).then((response) => {
            console.log(response);
            showTasks();
        })
    }

    return (
        <div id="list">
            <form onSubmit={submitForm}>
                {/* <label>New Task:</label> */}
                <input id="new" placeholder="Submit New Task" type="text" onChange={(event) => setNewTask(event.target.value)} />
                <button>Submit</button>
        </form>
            <h2>Tasks</h2>
            <div id="spacer"></div>
            <ul>
                {
                    taskList.map((task) => (
                        <li key={task.id}>
                            <input id={task.id} type="checkbox" defaultChecked={task.complete} onChange={(event) => markComplete(event, task.id)}/>
                             {/* onChange={markComplete(task.id)} */}
                            {task.task}
                            {/* <button>Mark Commplete</button> */}
                            <button className="remove" onClick={(event) => removeTask(task.id)}>Remove</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default List;