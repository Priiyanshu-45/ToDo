function savetodo() {
  localStorage.setItem("todos", document.querySelector(".todoList").innerHTML);
}



let deleteAll_flag = 1;
let input_enter = document.querySelector("input");
input_enter.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
  addTodo();
  }
})

function addTodo() {
  let inp = document.querySelector("input").value;
  if (inp === "") {}
    // alert("No ToDo Found.");
  else {
    let new_todo = document.createElement("div");
    new_todo.setAttribute("class", "todo");
    new_todo.innerHTML =
      `${inp}                       
      <div class="fxn_buttons">
            <button class="Edit" onclick="EditToDo(this)">Edit
            </button>
            <button onclick="deleteToDo(this)"  class="Delete">Delete </button>
        </div>`;
    document.querySelector(".todoList").appendChild(new_todo);
    document.querySelector("input").value = "";
    if (deleteAll_flag) {
      let dlt_all = document.createElement("button");
      dlt_all.textContent = "Delete All";
      dlt_all.setAttribute("onclick", "deleteAll()");
      dlt_all.setAttribute("class", "dlt_all");
      document.querySelector(".topbar").appendChild(dlt_all);
      alert("Double click to mark as complete.")
      deleteAll_flag = 0;
    }
  }
  savetodo();
}

function deleteToDo(dlt) {
  let element = dlt.parentElement.parentElement;
  element.remove(); 
  savetodo();
}

function EditToDo(edt) {
  let parent = edt.parentElement.parentElement;
  let text = parent.childNodes[0].nodeValue;
  let value = prompt("Edit Your ToDo here:", `${text}`);
  if (value == "" || value == " " || value == null) {}
  else { parent.childNodes[0].nodeValue = value; }
  savetodo();
}

function deleteAll() {
  let el = document.querySelector(".todoList");
  el.innerHTML = "";
  let dlt_btn = document.querySelector(".dlt_all");
  dlt_btn.remove();
  deleteAll_flag = 1;
  localStorage.removeItem("todos");
}

let mark_As_comp = document.querySelector(".todoList");
mark_As_comp.addEventListener("dblclick", mark);

function mark(e) {
  let todo = e.target.closest(".todo");
  if (!todo) return;

  todo.classList.toggle("completed");
}

window.addEventListener("load", () => {
 let data = localStorage.getItem("todos")
  document.querySelector(".todoList").innerHTML = data;
    deleteAll_flag = 0;
    let dlt_all = document.createElement("button");
    dlt_all.textContent = "Delete All";
    dlt_all.setAttribute("onclick", "deleteAll()");
    dlt_all.setAttribute("class", "dlt_all");
    document.querySelector(".topbar").appendChild(dlt_all);
})

