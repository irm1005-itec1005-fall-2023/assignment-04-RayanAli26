/* Assignment 04: Finishing a Todo List App
 *
 * 
 *
 */


//
// Variables
//

// Constants
const appID = "app";
const form = document.querySelector('form');
const input = document.querySelector('#new-task');
const taskList = document.querySelector('#task-list');
const emptyState = document.querySelector('.empty-state');
// DOM Elements
let appContainer = document.getElementById(appID);

//
// Functions
//
let tasks = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const task = {
    id: Date.now(),
    text: input.value,
    completed: false
  };
  tasks.push(task);
  input.value = '';
  renderTasks();
});

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.innerHTML = `
      <label>
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span>${task.text}</span>
      </label>
      <button class="delete">Delete</button>
    `;
    if (task.completed) {
      li.classList.add('completed');
    }
    li.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        tasks = tasks.filter((t) => t.id !== task.id);
        renderTasks();
      } else if (event.target.tagName === 'INPUT') {
        task.completed = event.target.checked;
        renderTasks();
      }
    });
    taskList.appendChild(li);
  });
  if (tasks.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }
}

// Add a heading to the app container
function inititialise() {
  // If anything is wrong with the app container then end
  if (!appContainer) {
    console.error("Error: Could not find app contianer");
    return;
  }

  // Create an h1 and add it to our app
  const h1 = document.createElement("h1");
  h1.innerText = headingText;
  appContainer.appendChild(h1);

  // Init complete
  console.log("App successfully initialised");
}

//
// Inits & Event Listeners
//
inititialise();