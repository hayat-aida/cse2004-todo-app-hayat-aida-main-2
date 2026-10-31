const API = 'https://cse2004.us';
const KEY = 'dd1271-95bcbd-6d6cf8-8a06c9-653bb6'

//Adding all API functions provided
async function fetchTodos() {
    const res = await fetch(API + '/todos', { headers: { 'x-api-key': KEY } });
    const todos = await res.json();
    return todos;
}

async function addTodo(task) {
    const res = await fetch(API + '/todos', {
  method: 'POST',
  headers: {
    'x-api-key': KEY, 'content-type': 'application/json'
  },
  body: JSON.stringify({ text: task })
});
const todo = await res.json();
return todo;

}

async function getTodo(id) {
    const res = await fetch(API + '/todos/' + id, {
    headers: { 'x-api-key': KEY }
});
const todo = await res.json();
return todo;
}

async function updateTodo(id, updatedTask) {
    const res = await fetch(API + '/todos/' + id, {
    method: 'PUT',
    headers: {
        'x-api-key': KEY,
        'content-type': 'application/json'
    },
    body: JSON.stringify({ completed: true })
    });
    const updated = await res.json();
    return updated;
}

async function deleteTodo(id) {
    const res = await fetch(API + '/todos/' + id, {
    method: 'DELETE',
    headers: { 'x-api-key': KEY }
});
const result = await res.json(); 
return result;
}

// DOM elements
const input = document.getElementById('todo-input');
const addButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

//Rendering the todos on the page
async function renderTodos() {
    const todos = await fetchTodos();
    todoList.innerHTML = '';
    for (const todo of todos) {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', async () => {
            await updateTodo(todo.id, checkbox.checked);
            renderTodos();
        });

        const span = document.createElement('span');
        span.textContent = todo.text;
        if (todo.completed) {
            span.style.textDecoration = 'line-through';
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', async () => {
            await deleteTodo(todo.id);
            renderTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }
}

// event listener for adding a todo
addButton.addEventListener('click', async () => {
    const task = input.value.trim();
    if (task) {
        await addTodo(task);
        input.value = '';
        renderTodos();
    }
});

renderTodos();