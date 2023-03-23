import axios from "axios";

function RemoveTask({ task, showTasks }) {
    const removeTask = (id) => {
        axios.delete(`todo/${id}`).then((response) => {
            console.log(response);
            showTasks();
        })
    }

    return (
        <button 
            style={{cursor: 'pointer'}} 
            className="remove" onClick={() => removeTask(task.id)}>Remove
        </button>
    )
}

export default RemoveTask;