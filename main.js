let submitButton = document.querySelector("input[type= 'submit']");
let inputSelector = document.querySelector("input[type= 'text']");
let parentDiv = document.querySelector(".tasks");
// Check if there is any stored task in the local storage or not
let tasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
let counter = tasks.length ? Math.max(...tasks.map(t => Number(t.id))) + 1 : 0;
 // Load from localStorage
tasks.forEach(task => displayTask(task));

submitButton.onclick = function(){
    if(inputSelector.value===""){
        return;
    }
    addingDiv();
    inputSelector.value="";
}

function addingDiv(){
    let newElement = document.createElement("div");
    newElement.id = counter++; 
    parentDiv.appendChild(newElement);

    let p = document.createElement("p");
    p.textContent = inputSelector.value;
    newElement.appendChild(p);

    let deleteBtn = document.createElement("input");
    deleteBtn.className = "delete";
    deleteBtn.type = "submit";
    deleteBtn.value = "Delete";
    newElement.appendChild(deleteBtn);

    // Adding the element to the array
    addTask(p.textContent,newElement.id );
    // Adding the task to the local storage
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Adding the task to the array in the localstorage
function addTask(titleOfP, taskID){
    let newTaks = {
        id: taskID,
        title: titleOfP,
    };
    tasks.push(newTaks);
}

// To display the tasks when the page is reloaded
function displayTask(task) {
    let newElement = document.createElement("div");
    newElement.id = task.id;
    parentDiv.appendChild(newElement);

    let p = document.createElement("p");
    p.textContent = task.title;
    newElement.appendChild(p);

    let deleteBtn = document.createElement("input");
    deleteBtn.className = "delete";
    deleteBtn.type = "submit";
    deleteBtn.value = "Delete";
    newElement.appendChild(deleteBtn);
}

// Adding the deleting behavior to all the deletion buttons, no need for special
// treatment for the local storage!
parentDiv.addEventListener("click", function(e){
    if(e.target.classList.contains("delete")){
        let taskDiv = e.target.parentElement;
        let taskID = e.target.parentElement.id;
        tasks = tasks.filter(task => task.id !=taskID);
        window.localStorage.setItem("tasks", JSON.stringify(tasks));
        taskDiv.remove();
    }
});