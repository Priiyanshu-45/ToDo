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
  else {
    let new_todo = document.createElement("div");
    let btn_div = document.createElement("div");
    btn_div.className = "fxn_buttons";  
    let edt_Btn = document.createElement("button");
    edt_Btn.innerText = "Edit";
    let dlt_Btn = document.createElement("button");
    dlt_Btn.innerText = "Delete";
    new_todo.setAttribute("class", "todo");
    edt_Btn.setAttribute("onclick", "EditToDo(this)");
    edt_Btn.className = "Edit";
    dlt_Btn.className = "Delete";
    dlt_Btn.setAttribute("onclick", "deleteToDo(this)");
    btn_div.appendChild(edt_Btn);
    btn_div.appendChild(dlt_Btn);
    new_todo.textContent = `${inp}`    
    new_todo.appendChild(btn_div);
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
  if (document.querySelector(".todoList").children.length === 0) {
    deleteAll();
  }
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
  if (data ) { //data can be null after delete all or it can be empty.
    document.querySelector(".todoList").innerHTML = data;
    let dlt_all = document.createElement("button");
    dlt_all.textContent = "Delete All";
    dlt_all.setAttribute("onclick", "deleteAll()");
    dlt_all.setAttribute("class", "dlt_all");
    document.querySelector(".topbar").appendChild(dlt_all);
    deleteAll_flag = 0
  }
  
})

