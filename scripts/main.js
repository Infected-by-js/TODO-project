const textField = document.querySelector("#input-field-task");
const addButton = document.querySelector("#add-task-btn");
const toDoListWrapper = document.querySelector(".todolist");


function Blank(text) {
  this.value = text, 
  this.completed = false;
}

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));


let todoItemElems = []



let createTask = function(plan,id){
  return `
    <div class="new-tab ${plan.completed ? 'checked' : ''}">
      <div class="tab-discription">
        <div class="tab-label">${plan.value}</div>
      </div>
      <div class="tab-buttons">
        <input onclick="completeTask(${id})" class="tab-checkbox" type="checkbox" ${plan.completed ? "checked" : ""}>
        <button onclick="deleteTask(${id})" class='${plan.completed ? "tab-btn-delete-checked" : "tab-btn-delete"}'></button>
      </div>
    </div>
  `
}


const filterTasks = () =>{
  const activeTascks = tasks.length && tasks.filter(item => item.completed == false);
  const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
  tasks = [...activeTascks,...completedTasks];
}




const fillTodoList = () => {
  toDoListWrapper.innerHTML = '';
  if(tasks.length>0){
    filterTasks();
    tasks.forEach((plan,index)=>{
      toDoListWrapper.innerHTML += createTask(plan,index)
    });
    todoItemElems = document.querySelectorAll('.new-tab')
  }
}



fillTodoList()



const updateLocal = () => {
  localStorage.setItem('tasks',JSON.stringify(tasks));
}


const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;

  if(tasks[index].completed){
    todoItemElems[index].classList.add('checker');
  }else{
    todoItemElems[index].classList.remove('checker');
  }

  updateLocal();
  fillTodoList();
}


addButton.addEventListener("click", function () {
  if (textField.value.length > 0 && textField.value.trim() !== '') {
    tasks.push(new Blank(textField.value.trim()));
    updateLocal();
    fillTodoList();
    
  }
  textField.value = ''
});

const deleteTask = (index) =>{
  todoItemElems[index].classList.add('delition')
  setTimeout(()=>{
    tasks.splice(index,1);
    updateLocal();
    fillTodoList();
  },500)
}


