const btnPrimary = document.querySelector(".btn-primary");
const taskInput = document.querySelector(".task-input");

btnPrimary.addEventListener("click", addTask);

function addTask() {
  
  let task = taskInput.value.trim() ;
  
  if (task === "") {
    alert("Task cannot be empty");
    return;
  }
  createTask(task);
  localStorage.setItem("tasks",JSON.stringify(task));
  taskInput.value = "";

  function createTask(taskText) {
    const taskList = document.querySelector(".task-list");
 
    const now = new Date();

    //  create element of task
    const taskItem = document.createElement("li");
    taskItem.className = "list-group-item d-flex justify-content-between align-items-center gap-2 border border-danger";
    
    //container date
    const textContainer = document.createElement("div");
    textContainer.className = "d-flex flex-column ";
    
     //container text
    const taskContent = document.createElement("span");
    taskContent.className = "container border border-primary w-100 rounded-3";
    taskContent.textContent = taskText;
    
    //date creation
    const creationDate = document.createElement("small");
    creationDate.className = "text-muted";
    creationDate.textContent = `Created: ${formatDate(now)}`;
    
    //date last update
    const updateDate = document.createElement("small");
    updateDate.className = "text-muted";
    updateDate.textContent = `Last updated: ${formatDate(now)}`;
    
    textContainer.appendChild(taskContent);
    textContainer.appendChild(creationDate);
    textContainer.appendChild(updateDate);
    taskItem.appendChild(textContainer);

    //create selector state
    const statusSelect = document.createElement("select");
    statusSelect.className = "form-select  w-auto";
    ["Creada", "En Proceso", "Terminada"].forEach(state => {
      const option = document.createElement("option");
      option.value = state;
      option.textContent = state;
      statusSelect.appendChild(option);
    });
    taskItem.appendChild(statusSelect);
    
    // change status color
    statusSelect.addEventListener("change", () => {
      taskItem.classList.remove("bg-light", "bg-warning", "bg-success");
      if (statusSelect.value === "Creada") {
        taskItem.classList.add("bg-primary");
      } else if (statusSelect.value === "En Proceso") {
        taskItem.classList.add("bg-warning");
      } else if (statusSelect.value === "Terminada") {
        taskItem.classList.add("bg-success");
      }
      
      // update date when state modified
      updateDate.textContent = `Last updated: ${formatDate(new Date())}`;
    });

    // delete boton
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "btn btn-danger btn-sm";
    taskItem.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
      taskItem.remove();
    });

    // boton edit
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "btn btn-warning btn-sm";
    taskItem.appendChild(editButton);
    editButton.addEventListener("click", () => {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = taskContent.textContent;
      editInput.className = "form-control form-control-sm me-2";

      const saveEditButton = document.createElement("button");
      saveEditButton.textContent = "Save";
      saveEditButton.className = "btn btn-outline-success btn-sm";

      // clear and fill fields
      taskItem.innerHTML = "";
      
      const newTextContainer = document.createElement("div");
      newTextContainer.className = "d-flex flex-column";
      newTextContainer.appendChild(editInput);
      newTextContainer.appendChild(creationDate);
      
      taskItem.appendChild(newTextContainer);
      taskItem.appendChild(statusSelect);
      taskItem.appendChild(saveEditButton);

      saveEditButton.addEventListener("click", () => {
        const updatedText = editInput.value.trim();
        if (updatedText === "") {
          alert("Task cannot be empty");
          return;
        }
        taskContent.textContent = updatedText;
        updateDate.textContent = `Last updated: ${formatDate(new Date())}`;

        // Restaurar vista normal
        taskItem.innerHTML = "";
        
        const restoredTextContainer = document.createElement("div");
        restoredTextContainer.className = "d-flex flex-column";
        restoredTextContainer.appendChild(taskContent);
        restoredTextContainer.appendChild(creationDate);
        restoredTextContainer.appendChild(updateDate);
        
        taskItem.appendChild(restoredTextContainer);
        taskItem.appendChild(statusSelect);
        taskItem.appendChild(deleteButton);
        taskItem.appendChild(editButton);
      });
    });

    taskList.appendChild(taskItem);
  }
}

// function format date
function formatDate(date) {
  return date.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}