const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addUpdateButton = document.getElementById("add-update-btn");

let editMode = false;
let currentEditTask = null;

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
  Array.from(listContainer.getElementsByTagName("li")).forEach((li) => {
    li.appendChild(createEditButton());
    li.appendChild(createDeleteButton());
  });
}
showTask();

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  }
  false;
});

function addOrUpdateTask() {
  if (inputBox.value === "") {
    alert("Input valid text");
  } else {
    if (editMode) {
      // Update The Existing Task
      currentEditTask.innerHTML = inputBox.value;
      currentEditTask.appendChild(createEditButton());
      currentEditTask.appendChild(createDeleteButton());
      addUpdateButton.innerHTML = "Add";
      editMode = false;
      currentEditTask.classList.remove("disabled");
      currentEditTask = null;
    } else {
      //Add a new task
      let li = document.createElement("li");
      li.innerHTML = inputBox.value;
      li.appendChild(createEditButton());
      li.appendChild(createDeleteButton());
      listContainer.appendChild(li);
    }
    inputBox.value = "";
    saveData();
  }
}

function createEditButton() {
  let editButton = document.createElement("span");
  editButton.innerHTML = "\u270E";
  editButton.classList.add("edit");
  editButton.onclick = function (e) {
    editMode = true;
    currentEditTask = e.target.parentElement;
    inputBox.value = currentEditTask.firstChild.textContent;
    addUpdateButton.innerHTML = "Update";
    currentEditTask.classList.add("disabled");
  };
  return editButton;
}

function createDeleteButton() {
  let deleteButton = document.createElement("span");
  deleteButton.innerHTML = "\u00d7";
  deleteButton.onclick = function (e) {
    e.target.parentElement.remove();
    saveData();
  };
  return deleteButton;
}
