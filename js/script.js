const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');


// array which stores every todo list record
let todos = [];

// Function to add new to do list
const addToDo = () => {
	let toDoItem = todoInput.value
    if (toDoItem !== '') {
    const todo = {
      id: Date.now(),
      name: toDoItem,
      completed: false
    };
    todos.push(todo);
    addToLocalStorage(todos);
    todoInput.value = '';
  }
  else {
	  alert("Please add the to do item");
	  return false;
  }
}


// function to render given todos to screen
const renderTodos = (todos) => {
  todoItemsList.innerHTML = '';
  todos.forEach(function(item) {
	const checked = item.completed ? 'checked': null;
	const li = document.createElement('li');
	li.setAttribute('data-key', item.id);
	li.setAttribute('class', 'item');
	if (item.completed === true) {
		li.classList.add('checked');
    }
    li.innerHTML = `
      <span class="item-name">${item.name}</span>
	  <input type="checkbox" class="checkbox" ${checked}>
      <button class="delete-button">Delete</button>
    `;
    todoItemsList.append(li);
  });
}

// Function to add todos to local storage
function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(todos);
}

// Function helps to get everything from local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

// Function to toggleCheckbox the value to completed and not completed
function toggleCheckbox(id) {
  todos.map((item) => {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  addToLocalStorage(todos);
}

// To delete the particular to do list line item
function deleteTodo(id) {
  todos = todos.filter((item) => {
    return item.id != id;
  });
  addToLocalStorage(todos);
}

// To get the data from localstorage
getFromLocalStorage();

// Add event listner on each line item and check event for checkbox and delete button
todoItemsList.addEventListener('click', (event) => {
  if (event.target.type === 'checkbox') {
    toggleCheckbox(event.target.parentElement.getAttribute('data-key'));
  }

  if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});