/*Lista de tareas - Dificultad:  

🟡🔴🟡
 
3 - Crea una web con bootstrap y js, que contenga un botón input donde se pueda 
cargar una tarea y un botón que al ser presionado agregue dicha tarea a una lista, 
cada elemento ingresado en la lista debe poder ser eliminado con un botón creado 
para ese fin. 
*/

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formTask");
  const input = document.getElementById("taskInput");
  const list = document.querySelector(".task-list");
  const emptyMsg = document.querySelector(".empty");

  
  function updateEmptyState() {
    emptyMsg.style.display = list.children.length ? "none" : "block";
  }

    form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;


    const li = document.createElement("li");
    li.className = "list-group-item d-flex align-items-center justify-content-between";

    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input me-2";
    checkbox.addEventListener("change", () => {
      spanText.classList.toggle("text-decoration-line-through");
    });

    
    const spanText = document.createElement("span");
    spanText.textContent = text;

    const btnDelete = document.createElement("button");
    btnDelete.className = "btn btn-outline-danger btn-sm";
    btnDelete.textContent = "Delete";
    btnDelete.addEventListener("click", () => {
      li.remove();
      updateEmptyState();
    });

    
    li.appendChild(checkbox);
    li.appendChild(spanText);
    li.appendChild(btnDelete);
    list.appendChild(li);

 input.value = "";
    updateEmptyState();
  });

 
  updateEmptyState();
});