
const workEl = document.getElementById("title");
const isDoneEl = document.getElementById("completed");
const tbodyEl = document.querySelector("tbody");
const updateFormEl = document.getElementById("update");
const saveFormEl = document.getElementById("save");
const updateWorkEl = document.getElementById("updateTitle");
const updateIsDoneEl = document.getElementById("updateCompleted"); 

const api = "https://localhost:7288/api/";
const apiValue = api + "Values/";
const getAll = apiValue + "GetAll";
const addTodo = apiValue + "Add";
const updateTodo = apiValue + "Update";
const removeTodo = apiValue + "RemoveTodo";

let todos = [];

let updateIndex = 0;

getApiRequest();

function getApiRequest(){
    fetch(getAll)
    .then(res=> res.json())
    .then(data => {
        console.log(data);
        todos = data;
        createTBodyHTMLUsingTodos();
    })
}

function save(e){
    e.preventDefault(); 

    const obj = {
        title: workEl.value,
        completed: isDoneEl.checked
    }

    fetch(addTodo,{
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "content-type": "text/json"
        }
    })
    .then(()=> {
        getApiRequest();
        workEl.value = "";
        isDoneEl.checked = false;
        workEl.focus();  
    });      
}

function edit(index){
    debugger
    updateIndex = index;

    updateFormEl.style.display = "block";
    saveFormEl.style.display = "none";

    updateWorkEl.value = todos[index].title;
    updateIsDoneEl.checked = todos[index].completed;

    const hideElements = document.querySelectorAll(".hide");
    for(let el of hideElements){
        el.style.display = "none";
    }
}

function cancel(){      
    updateFormEl.style.display = "none";
    saveFormEl.style.display = "block";

    const hideElements = document.querySelectorAll(".hide");
    for(let el of hideElements){
        el.style.display = "inline";
    }
}

function update(e){
    e.preventDefault();
    
    const obj = {
        id: todos[updateIndex].id,
        title: updateWorkEl.value,
        completed: updateIsDoneEl.checked
    }

    fetch(updateTodo,{
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "text/json"
        }
    }).then(()=> {
        cancel();
        getApiRequest();
    })
}

function remove(index){
    const result = confirm("You want to delete this record?");
    if(result){
        fetch(removeTodo + todos[index].id)
        .then(()=> {
            getApiRequest();
        });       
    }            
}

function createTBodyHTMLUsingTodos(){
    let text = "";
        for(let i in todos){
        text += `
        <tr id="tr${+i + 1}">
            <td>${+i + 1}</td>
            <td>${todos[i].title}</td>
            <td>${todos[i].completed ? 'Completed' : 'Not Completed'}</td>
            <td>
                <button class="btn btn-warning hide" onclick="edit('${i}')"><i class="fa fa-edit"></i></button>
                <button class="btn btn-danger hide" onclick="remove('${i}')"><i class="fa fa-trash"></i></button>
            </td>
        </tr>
        `
        }

        tbodyEl.innerHTML = text;
}