import { Todo } from "./classes.js"

function getProjects() {
  return JSON.parse(localStorage.getItem("projects"));
}

function initiateStorage(personal) {
  let projects = [];
  
  projects.push(personal);
  
  localStorage.setItem("projects", JSON.stringify(projects));
}

function addProjectToStorage(project) {
  let projects = getProjects();

  projects.push(project);

  localStorage.setItem("projects", JSON.stringify(projects));
}

function deleteTodoFromStorage(todoId) {
  let projects = getProjects();

  for (let i = 0; i < projects.length; i++) {
    for (let j = 0; j < projects[i].todos.length; j++) {
      let todos = projects[i].todos;

      let todo = todos[j];

      if (todo.id == todoId) {
        let todoIndex = todos.indexOf(todo);

        todos.splice(todoIndex, 1);
      }
    }
  }

  localStorage.setItem("projects", JSON.stringify(projects));
}

function editTodoInStorage(todoId, todoTitle, todoDescription, todoDueDate, todoPriority) {
  let projects = getProjects();

  for (let i = 0; i < projects.length; i++) {
    for (let j = 0; j < projects[i].todos.length; j++) {
      let todos = projects[i].todos;

      let todo = todos[j];

      if (todo.id == todoId) {
        todo.title = todoTitle;
        todo.description = todoDescription;
        todo.dueDate = todoDueDate;
        todo.priority = todoPriority;
      }
    }
  }

  localStorage.setItem("projects", JSON.stringify(projects));
}

export { getProjects, initiateStorage, addProjectToStorage, deleteTodoFromStorage, editTodoInStorage };