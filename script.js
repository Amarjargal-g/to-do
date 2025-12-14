
const input = document.getElementById('input')
const addBtn = document.getElementById('add')
const taskContainer = document.getElementById('task-container')
const emptyMessage = document.getElementById('empty-message')
const taskCounter = document.getElementById('task-counter')
const clearCompletedBtn = document.getElementById('clear-completed')

const filterAll = document.getElementById('all')
const filterActive = document.getElementById('active')
const filterCompleted = document.getElementById('completed')


let tasks = []
let taskId = 1
let currentFilter = 'all'


const addTask = () => {
    const text = input.value.trim()
    if (!text) return

    tasks.push({
        id: taskId++,
        text,
        isComplete: false
    })

    input.value = ''
    renderTasks()
}

addBtn.addEventListener('click', addTask)
input.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTask()
})


const renderTasks = () => {
    taskContainer.innerHTML = ""

   
    let filteredTasks = tasks
    if(currentFilter === "active") filteredTasks = tasks.filter(t => !t.isComplete)
    if(currentFilter === "completed") filteredTasks = tasks.filter(t => t.isComplete)


    filteredTasks.forEach(task => {
        taskContainer.innerHTML += `
        <div class="task ${task.isComplete ? 'completed' : ''}" data-id="${task.id}">
            <input type="checkbox" class="task_checkbox" ${task.isComplete ? 'checked' : ''}/>
            <p class="task_text">${task.text}</p>
            <button class="task_delete">Delete</button>
        </div>
        `
    })

    attachEventListeners()
    updateCounter()
    updateFilterButtons()
    updateEmptyMessage()
}


const attachEventListeners = () => {
    document.querySelectorAll('.task_delete').forEach(btn => {
        btn.onclick = e => {
            const id = Number(e.target.parentElement.dataset.id)
            deleteTask(id)
        }
    })

    document.querySelectorAll('.task_checkbox').forEach(box => {
        box.onchange = e => {
            const id = Number(e.target.parentElement.dataset.id)
            toggleTask(id)
        }
    })
}


const toggleTask = id => {
    const task = tasks.find(t => t.id === id)
    if(task) task.isComplete = !task.isComplete
    renderTasks()
}


const deleteTask = id => {
    tasks = tasks.filter(t => t.id !== id)
    renderTasks()
}


clearCompletedBtn.onclick = () => {
    tasks = tasks.filter(t => !t.isComplete)
    renderTasks()
}


filterAll.onclick = () => { currentFilter = 'all'; renderTasks() }
filterActive.onclick = () => { currentFilter = 'active'; renderTasks() }
filterCompleted.onclick = () => { currentFilter = 'completed'; renderTasks() }

const updateFilterButtons = () => {
    const buttons = [filterAll, filterActive, filterCompleted]
    buttons.forEach(btn => btn.classList.remove('active-filter'))
    if(currentFilter === 'all') filterAll.classList.add('active-filter')
    if(currentFilter === 'active') filterActive.classList.add('active-filter')
    if(currentFilter === 'completed') filterCompleted.classList.add('active-filter')
}


const updateCounter = () => {
    const total = tasks.length
    const completed = tasks.filter(t => t.isComplete).length
    taskCounter.innerText = 
        total === 0
        ? '0 tasks, 0 completed'
        : `${completed} completed out of ${total} task${total !== 1 ? 's' : ''}`
}


const updateEmptyMessage = () => {
    if(tasks.length === 0) {
        emptyMessage.style.display = 'block'
    } else {
        emptyMessage.style.display = 'none'
    }
}


renderTasks()
