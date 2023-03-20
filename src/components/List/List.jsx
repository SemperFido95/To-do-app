import { useEffect, useState } from "react";
import axios from 'axios';
import './List.css';

function List() {
    const [taskList, getTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [taskComplete, setTaskComplete] = useState(false);



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
        console.log(id);
        let completeObject = {}
        if (status === true) {
            completeObject.complete = true;
        } else {
            completeObject.complete = false;
        }
        console.log(completeObject);
        console.log('completeObject', completeObject)
        axios.put(`/todo/${id}`, completeObject).then((response) => {
            console.log(response);
            showTasks();
        }).catch((error) => {
            console.log(`Error in PUT ${error}`);
            alert('Something went wrong');
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
                        <li key={task.id}>
                             <input id={task.id} type="checkbox" defaultChecked={task.complete} onChange={(event) => markComplete(event, task.id)}/>
                             {/* onChange={markComplete(task.id)} */}
                            {task.task}
                            {/* <button>Mark Commplete</button> */}
                            <button>Remove</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default List;