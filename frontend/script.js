let tasks = [];

function addTask() {

    const input = document.getElementById("taskInput");

    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push(taskText);

    input.value = "";

    displayTasks();
}

function displayTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${task}</span>

            <button
                class="delete-btn"
                onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });
}

function deleteTask(index) {

    tasks.splice(index, 1);

    displayTasks();
}

async function checkHealth() {

    const message =
        document.getElementById("healthMessage");

    try {

        const response =
            await fetch("/api/health");

        const data =
            await response.json();

        message.textContent =
            `${data.status}: ${data.message}`;

    } catch (error) {

        message.textContent =
            "Server is not reachable";

    }
}