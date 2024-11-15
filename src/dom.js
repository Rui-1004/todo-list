import { getProjects } from "./storage.js"
import { Project, Todo } from "./classes.js";
import { format } from "date-fns";

const sidebar = document.querySelector(".sidebar");

const projectList = document.querySelector(".projects");

const main = document.querySelector(".main-container");

const projectButton = document.querySelector(".new-project");

function newTodo(todo) {
  let div = document.createElement("div");
  div.id = todo.id;

  let cardInfo = document.createElement("div");

  cardInfo.classList.add("card-info");

  let details = document.createElement("button");
  details.textContent = "Details";
  details.classList.add("details");

  let remove = document.createElement("button");
  remove.textContent = "Delete";
  remove.classList.add("remove");

  let edit = document.createElement("button");
  edit.textContent = "Edit";
  edit.classList.add("edit");

  div.classList.add("todo-container");

  let title = document.createElement("p");
  let date = document.createElement("p");

  let dateObject = new Date(todo.dueDate);

  let dateMonth = format(dateObject, "MMM");

  let dateDay = format(dateObject, "do");

  title.textContent = todo.title;
  date.textContent = `${dateMonth} ${dateDay}`;

  cardInfo.append(details, remove, edit, date);
  div.append(title, cardInfo);
  main.append(div);
}

function removeTodo(todoId) {
  let todoContainer = document.getElementById(`${todoId}`);

  todoContainer.remove();
}

function updateTodo(todoId) {
  let todoContainer = document.getElementById(`${todoId}`);

  let todo = Todo.getTodo(todoId);

  let dateObject = new Date(todo.dueDate);

  let dateMonth = format(dateObject, "MMM");

  let dateDay = format(dateObject, "do");

  let date = `${dateMonth} ${dateDay}`;

  todoContainer.firstElementChild.textContent = todo.title;
  todoContainer.lastElementChild.lastElementChild.textContent = date;
}

function loadAllTodos() {
  main.textContent = "";

  let projects = getProjects();
  let todos = [];

  for (let i = 0; i < projects.length; i++) {
    for (let j = 0; j < projects[i].todos.length; j++) {
      todos.push(projects[i].todos[j]);
    }
  }

  todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).forEach(todo => newTodo(todo));
}

function loadCurrentTodos() {
  main.textContent = "";

  let projects = getProjects();
  let todos;

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].name === Project.getCurrentProject()) {
      todos = projects[i].todos;
    }
  }
  todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).forEach(todo => newTodo(todo));
}

function loadDetails(todo) {
  const title = document.querySelector(".details-title");
  const description = document.querySelector(".details-description");
  const dueDate = document.querySelector(".details-dueDate");
  const priority = document.querySelector(".details-priority");

  title.textContent = todo.title;
  description.textContent = todo.description;
  dueDate.textContent = todo.dueDate;
  priority.textContent = todo.priority;
}

function loadEdit(todoId) {
  const todoEditFormIdentifier = document.querySelector(".todo-edit-form").firstElementChild;

  todoEditFormIdentifier.dataset.index = todoId;
}

function newProject(project) {
  const div = document.createElement("div");
  div.textContent = project.name;
  div.classList.add("project");

  projectList.append(div);
}

function loadProjects() {
  let projects = getProjects();

  projects.forEach(project => newProject(project));

  loadAllTodos(projects);
}

export { newTodo, removeTodo, updateTodo, loadAllTodos, loadCurrentTodos, loadDetails, loadEdit, newProject, loadProjects };