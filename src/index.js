import "./style.css";
import { Project, Todo } from "./classes.js";
import { newTodo, removeTodo, loadAllTodos, loadDetails, newProject, loadProjects, loadEdit, updateTodo } from "./dom.js";
import { addProjectToStorage, getProjects, deleteTodoFromStorage, editTodoInStorage } from "./storage.js";

checkFirstTimeUser();

loadProjects();

function checkFirstTimeUser() {
  if(localStorage.getItem("projects")) return;

  Project.initialProject();
}

function createTodo() {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.querySelector("input[name='priority']:checked").value;

  let todo = new Todo(title, description, dueDate, priority);

  const projects = getProjects();
  const currentProject = Project.getCurrentProject();

  newTodo(todo);

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].name === currentProject) {
      let project = projects[i];

      project.todos.push(todo);

      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }
}

function editTodo(e) {
  event.preventDefault();

  const id = e.target.firstElementChild.dataset.index;
  const title = document.getElementById("edit-title").value;
  const description = document.getElementById("edit-description").value;
  const dueDate = document.getElementById("edit-dueDate").value;
  const priority = document.querySelector("input[name='edit-priority']:checked").value;

  editTodoInStorage(id, title, description, dueDate, priority);

  updateTodo(id);
}

function createProject() {
  event.preventDefault();

  let name = document.getElementById("name").value;

  let project = new Project(name);

  newProject(project);

  addProjectToStorage(project);
}

function projectHide() {
  projectForm.classList.add("hidden");
}

const main = document.querySelector(".main-container");

const formDialog = document.querySelector(".form-dialog");

const detailsDialog = document.querySelector(".details-dialog");

const editDialog = document.querySelector(".form-edit-dialog");

const formShowButton = document.querySelector(".open-modal");

const formCloseButton = document.querySelector(".close-modal");

const detailsCloseButton = document.querySelector(".close-details");

const editCloseButton = document.querySelector(".close-edit-modal");

const todoForm = document.querySelector(".todo-form");

const todoEditForm = document.querySelector(".todo-edit-form");

const projects = document.querySelector(".projects");

const allTodos = document.querySelector(".all-todos");

const projectNew = document.querySelector(".new-project");

const projectCancel = document.querySelector(".cancel");

const projectForm = document.querySelector(".project-form");


formShowButton.addEventListener("click", () => {
  formDialog.showModal();
});

formCloseButton.addEventListener("click", () => {
  formDialog.close();
});

todoForm.addEventListener("submit", createTodo);

todoEditForm.addEventListener("submit", (e) => editTodo(e));

main.addEventListener("click", (e) => {
  if (e.target.classList.contains("details")) {
    let todoId = e.target.parentNode.parentNode.id;
    let todo = Todo.getTodo(todoId);

    loadDetails(todo);
    detailsDialog.showModal();
  }
  if (e.target.classList.contains("remove")) {
    let todoId = e.target.parentNode.parentNode.id;

    removeTodo(todoId);

    deleteTodoFromStorage(todoId);
  }
  if (e.target.classList.contains("edit")) {
    let todoId = e.target.parentNode.parentNode.id;

    loadEdit(todoId);

    editDialog.showModal();
  }
})

detailsCloseButton.addEventListener("click", () => {
  detailsDialog.close();
})

editCloseButton.addEventListener("click", () => {
  editDialog.close();
})

projects.addEventListener("click", (e) => {
  if (e.target.classList.contains("project")) {
    Project.setCurrentProject(e.target.textContent);
  }
})

allTodos.addEventListener("click", loadAllTodos);

projectNew.addEventListener("click", () => projectForm.classList.remove("hidden"));

projectCancel.addEventListener("click", projectHide);

projectForm.addEventListener("submit", () => {
  createProject();

  let input = document.getElementById("name");
  input.value = "";

  projectHide();
});

