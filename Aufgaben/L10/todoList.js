window.addEventListener("load", function () {
    const input = document.querySelector("#addTask");
    const button = document.querySelector("#addTaskButton");
    const list = document.querySelector("#listTask");
    let number = 0;
    button.addEventListener("click", addTodo);
    function counter() {
        document.querySelector(".number").innerHTML = String(number);
    }
    counter();
    function addTodo(e) {
        number++;
        counter();
        e.preventDefault();
        const newDiv = document.createElement("div");
        newDiv.classList.add("todo");
        let checkButton = document.createElement("button");
        checkButton.classList.add("fillButton");
        checkButton.setAttribute("class", "fa-solid fa-circle");
        newDiv.appendChild(checkButton);
        const newList = document.createElement("li");
        newList.classList.add("todo-item");
        newList.innerHTML = input.value;
        newDiv.appendChild(newList);
        const trashButton = document.createElement("button");
        trashButton.classList.add("trashButton");
        trashButton.setAttribute("class", "fa-solid fa-trash");
        newDiv.appendChild(trashButton);
        list.appendChild(newDiv);
        input.value = "";
        trashButton.addEventListener("click", function () {
            list.removeChild(newDiv);
            number--;
            counter();
        });
        checkButton.addEventListener("click", function () {
            if (checkButton.getAttribute("class") == "fa-solid fa-circle") {
                checkButton.setAttribute("class", "fa-solid fa-circle-check");
            }
            else {
                (checkButton.getAttribute("class") == "fa-solid fa-circle-check");
                checkButton.setAttribute("class", "fa-solid fa-circle");
            }
        });
    }
});
//# sourceMappingURL=todoList.js.map