import axios from "axios";

function CompleteTask({task, newTask, showTasks}) {
    const markComplete = (event) => {
        let status = event.target.checked;
        let id = Number(event.target.id);
        let completeObject = {};
        status === true ? completeObject.complete = true : completeObject.complete = false;
        axios.put(`/todo/${id}`, completeObject).then((response) => {
            console.log(response);
            showTasks();
        }).catch((error) => {
            console.log(`Error in PUT ${error}`);
            alert('Something went wrong');
        })
    }

    return (
        <div id="completeDiv">
            <input id={task.id} value={newTask} type="checkbox" defaultChecked={task.complete} onChange={(event) => markComplete(event, task.id)}/>
            <p className={task.complete === true ? 'complete' : ''}>{task.task}</p>
        </div>
    ) 
}

export default CompleteTask;