const btnPrimary = document.querySelector(".btn-primary");
const taskInput = document.querySelector(".task-input");



function addTask() {
  const task = taskInput.value.trim();
  if (task === "") {
    alert("Task cannot be empty");
    return;
  }
  if (task) {
    createTask(task);
    //saveToLocalStorage(task);
    taskInput.value = ""; // Clear the input field after adding the task
  }
}

function createTask(task) {
  const taskList = document.querySelector(".task-list");
  const taskItem = document.createElement("li");
  taskItem.className =
    "list-group-item d-flex justify-content-between align-items-center";
  taskItem.textContent += task;
  taskList.appendChild(taskItem);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "btn btn-danger btn-sm btn-lg";
  taskItem.appendChild(deleteButton);
  deleteButton.addEventListener("click", () => {
    taskItem.remove();
    deleteButton.remove();
    removeFromLocalStorage(task);
  });

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "btn btn-warning btn-sm btn-lg";
  taskItem.appendChild(editButton);
  editButton.addEventListener("click", (taskItem) => {
    taskItem
  });
  
  function saveToLocalStorage() {
    const tasks = [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
    saveToLocalStorage();

}
    

function read() {}



btnPrimary.addEventListener("click", addTask)
