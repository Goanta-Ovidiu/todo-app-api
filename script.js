const url = "http://localhost:4730/todos";

fetchApi = () => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const todoList = document.querySelector("#todo-list");
      todoList.innerHTML = "";
      data.forEach((todo) => {
        const createList = document.createElement("li");
        const createCheckBox = document.createElement("input");
        createList.todo = todo;
        createCheckBox.type = "checkbox";

        createList.appendChild(document.createTextNode(todo.description));
        todoList.appendChild(createCheckBox);
        todoList.appendChild(createList);
        createCheckBox.checked = todo.done;
      });
    });
};

fetchApi();

const addTodoButton = document.querySelector("#add-todo");
addTodoButton.addEventListener("click", () => {
  const inputField = document.querySelector("#input-field");
  const data = {
    description: inputField.value,
    done: false,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // pessimistic concurrency control
      fetchApi();
    });
});

const removeBtn = document.querySelector("#remove-btn");
removeBtn.addEventListener("click", () => {
  // pessimistic concurrency control
  fetchApi();
});
