import { getProjects, initiateStorage } from "./storage";
import { loadCurrentTodos } from "./dom.js";

class Project {
  static currentProject = "personal";

  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  static initialProject() {
    const personalTodos = new Project("personal");

    initiateStorage(personalTodos);
  }

  static getCurrentProject() {
    return this.currentProject;
  }

  static setCurrentProject(project) {
    this.currentProject = project;
    loadCurrentTodos();
    console.log(this.currentProject);
  }
}

class Todo {
  constructor(title, description, dueDate, priority) {
    this.id = Todo.getHighestId() + 1;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  static getTodo(id) {
    const projects = getProjects();
 
    for (let i = 0; i < projects.length; i++) {
      for (let j = 0; j < projects[i].todos.length; j++) {
        let todos = projects[i].todos;

        if(todos[j].id == id) return todos[j];
      }
    }
  }

  static getHighestId() {
    const projects = getProjects();
    let highestId = 0;

    for (let i = 0; i < projects.length; i++) {
      if (projects[i].todos.length == 1) return projects[i].todos[0].id;

      for (let j = 1; j < projects[i].todos.length; j++) {
        let previousId = projects[i].todos[j].id;
        if (previousId > highestId) highestId = previousId;
      }
    }

    return highestId;
  }
}

export { Project , Todo };