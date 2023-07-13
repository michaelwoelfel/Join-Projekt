// Tasks rendern

let tasks = [];
let taskIdCounter = 0;
let currentDraggedElement;

// CHECK THE TASK FOR THE RIGHT ID
async function checkLastTaskId() {
    await loadTasks();
    if (tasks.length > 0) {
        const maxId = Math.max(...tasks.map(task => task.id));
        taskIdCounter = maxId + 1;
    }
}

async function addTask() {
    await checkLastTaskId();
    taskName = document.getElementById('add_task_title').value;
    let taskSubtask = document.getElementById('add_task_input_subtask').value;
    let taskDescription = document.getElementById('add_task_description').value;
    let taskCategory = document.getElementById('add_task_category_select').value;
    let taskAssign = document.getElementById('add_task_assign_select').value;
    let taskDate = document.getElementById('add_task_input_date').value;
    let taskPrio = getTaskPrio();
    // TODO = START STATUS
    let taskStatus = 'todo';
    // EVERY TASK HAS OWN ID
    let taskId = taskIdCounter++;

    tasks.push({
        id: taskId,
        name: taskName,
        subtask: taskSubtask,
        tasktext: taskDescription,
        category: taskCategory,
        user: taskAssign,
        date: taskDate,
        priority: taskPrio,
        status: taskStatus,
    });
    await setItem('tasks', JSON.stringify(tasks));
};


// HARD RESET TASKS => LÖSCHT ALLE TASKS ... IN CONSOLE AUSFÜHREN
// async function deleteAllTasks() {
//     await loadTasks();

//     if (tasks.length > 0) {
//         // Lösche alle Aufgaben im Array
//         tasks = [];
//         // Speichere das aktualisierte Array in der Datenquelle (z. B. localStorage)
//         await setItem('tasks', JSON.stringify(tasks));

//         console.log('Alle Aufgaben wurden gelöscht.');
//     } else {
//         console.log('Keine Aufgaben zum Löschen vorhanden.');
//     }
// }

function clearTask() {
    document.getElementById('add_task_title').innerHTML = '';
    document.getElementById('add_task_input_subtask').value;
    document.getElementById('add_task_description').value;
    document.getElementById('add_task_category_select').value;
    document.getElementById('add_task_assign_select').value;
    document.getElementById('add_task_input_date').value;
}

function getTaskPrio(prio) {
    if (prio === 'urgent') {
        taskPrio = `assets/img/priohigh.png`;
    }
    if (prio === 'medium') {
        taskPrio = `assets/img/priomedium.png`;
    }
    if (prio === 'low') {
        taskPrio = `assets/img/priolow.png`;
    }
    return taskPrio;
}

async function loadTasks() {
    try {
        tasks = JSON.parse(await getItem('tasks'));
    } catch (e) {
        console.error('Loading error:', e);

    }
}

// Öhm GLAUB MAN KÖNNTE DIREKT UPDATE ALS RENDER TASKS AUSFÜHREN, HAB ABER KEINE LUST / ZEIT MEHR ...
async function renderTasks() {
    await loadTasks();
    updateHTML();
}

// 4 x SELBE FUNKTION ... VERBESSERUNGSWÜRDIG ...
function updateHTML() {
    renderToDo();
    renderInProgress();
    renderAwaitFb();
    renderDone();
}

function renderToDo() {
    let toDo = tasks.filter(t => t['status'] == 'todo');
    document.getElementById('todo').innerHTML = '';
    for (let index = 0; index < toDo.length; index++) {
        const task = toDo[index];
        document.getElementById('todo').innerHTML += taskTemplate(task);
    }
}

<<<<<<< HEAD
// Tasks rendern



// PRIO COLORS CHANGING ONCLICK 

function prioColorRed() {
    let urgent = document.getElementById('prio_urgent');
    let medium = document.getElementById('prio_medium');
    let low = document.getElementById('prio_low');
    urgent.classList.toggle('prio-btn-urgent-clicked');
    medium.classList.remove('prio-btn-medium-clicked');
    low.classList.remove('prio-btn-low-clicked');   
}


function prioColorOrange() {
    let urgent = document.getElementById('prio_urgent');
    let medium = document.getElementById('prio_medium');
    let low = document.getElementById('prio_low');
    urgent.classList.remove('prio-btn-urgent-clicked');
    medium.classList.toggle('prio-btn-medium-clicked');
    low.classList.remove('prio-btn-low-clicked');
}


function prioColorGreen() {
    let urgent = document.getElementById('prio_urgent');
    let medium = document.getElementById('prio_medium');
    let low = document.getElementById('prio_low');
    urgent.classList.remove('prio-btn-urgent-clicked');
    medium.classList.remove('prio-btn-medium-clicked');
    low.classList.toggle('prio-btn-low-clicked');
}
=======
function renderInProgress() {
    let inprogress = tasks.filter(t => t['status'] == 'inprogress');
    document.getElementById('inprogress').innerHTML = '';
    for (let index = 0; index < inprogress.length; index++) {
        const task = inprogress[index];
        document.getElementById('inprogress').innerHTML += taskTemplate(task);
    }
}

function renderAwaitFb() {
    let awaitingfb = tasks.filter(t => t['status'] == 'awaitingfb');
    document.getElementById('awaitingfb').innerHTML = '';
    for (let index = 0; index < awaitingfb.length; index++) {
        const task = awaitingfb[index];
        document.getElementById('awaitingfb').innerHTML += taskTemplate(task);
    }
}

function renderDone() {
    let done = tasks.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';
    for (let index = 0; index < done.length; index++) {
        const task = done[index];
        document.getElementById('done').innerHTML += taskTemplate(task);

    }
}

// TEMPLATE FÜR RENDER ... WIRD FÜR JEDEN STATUS AUSGEFÜHRT 
let taskTemplate = (task) => /*html*/ `
    <div draggable="true" ondragstart="startDragging(${task['id']})" onclick="openTask(${task['id']})" class="content">
        <div class="taskheader">${task['category']}</div>
        <div class="taskdescription"><b>${task['subtask']}</b></div>
        <div class="tasktext">${task['tasktext']}</div>
        <div class="progresscontainer">
            <div class="taskprogressbar"></div>
            <div class="taskprogress">1/2 Done</div>
        </div>
        <div class="taskfooter">${task['user']}
            <div class="priority"><img src="${task['priority']}"></div>
        </div>
    </div>
`;

// ALLGEMEINE FUNKTIONEN ....
function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    tasks[currentDraggedElement]['status'] = category;
    updateHTML();
}

function startDragging(index) {
    console.log(index);
    currentDraggedElement = index;
}

// ENDE 






async function openTask(i) {

    document.getElementById('showtask').classList.remove('d-none');

    const task = tasks[i];
    document.getElementById('showtask').innerHTML = `<div class="bigtask" id="task${i}">
        <div class="taskheader">${task['category']}</div>
        <div class="taskdescription"><b>${task['subtask']}</b></div>
        <div class="tasktext">${task['tasktext']}</div>
        <div class="progresscontainer"><div class="taskprogressbar"></div> <div class="taskprogress">1/2 Done</div></div>
        <div class="taskfooter">${task['user']}<div class="priority"><img src="${task['priority']}"><div onclick = closeTask()>XXXX</div></div></div></div>
    </div>` ;

}

function closeTask() {
    document.getElementById('taskcontainer').classList.remove('d-none');
    document.getElementById('showtask').classList.add('d-none');
}

// Tasks rendern


// DRAG AND DROP



>>>>>>> 6c90d31d4e2c580d93fe52b4911304fa8b5bb12a
