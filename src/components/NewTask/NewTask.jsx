import { useState } from "react";
import axios from "axios";

function NewTask({ newTask, setNewTask }) {
    const [color, setColor] = useState('')

    const submitForm = () => {
        axios.post('./todo', {task: newTask}).then((response) => {
            console.log('in POST request');
            setNewTask('');
            showTasks();
        }).catch((error) => {
            console.log(`Error in POST ${error}`);
            alert('Something went wrong.');
        })
    }

    function changeStyle(event) {
        event.target.style.cursor = 'pointer';
        event.target.style.backgroundColor = color;
    }

    return (
        <form onSubmit={submitForm}>
            <p>New Task:</p>
            <input
                id="new" required 
                type="text" 
                onChange={(event) => setNewTask(event.target.value)} 
            />
            <button
                // style={{cursor: 'pointer'}} 
                onMouseEnter={(event) => {
                    setColor('');
                    changeStyle(event);
                }}
                onMouseLeave={(event) => {
                    setColor('rgba(9, 255, 50, 0.689');
                    changeStyle(event);
                }}
                >Submit
            </button>
        </form>
    )
}

export default NewTask;

