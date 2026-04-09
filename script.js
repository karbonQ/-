let specialties = [];
let trainees = [];
let attendanceRecords = {}; 
let chart;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if(username === "admin" && password === "1234") {
        document.getElementById('loginPage').style.display = "none";
        document.getElementById('app').style.display = "block";
        loadSpecialties();
        loadTrainees();
        renderChart();
    } else {
        alert("اسم المستخدم أو كلمة المرور خاطئة");
    }
}

function addSpecialty() {
    const newSpecialty = document.getElementById('newSpecialty').value.trim();
    if(newSpecialty && !specialties.includes(newSpecialty)) {
        specialties.push(newSpecialty);
        updateSpecialtySelect();
        document.getElementById('newSpecialty').value = '';
    }
}

function editSpecialty() {
    const select = document.getElementById('specialtySelect');
    const index = select.selectedIndex;
    if(index >= 0){
        const newName = prompt("أدخل الاسم الجديد للتخصص:", specialties[index]);
        if(newName) specialties[index] = newName;
        updateSpecialtySelect();
    }
}

function deleteSpecialty() {
    const select = document.getElementById('specialtySelect');
    const index = select.selectedIndex;
    if(index >= 0) {
        specialties.splice(index, 1);
        updateSpecialtySelect();
    }
}

function updateSpecialtySelect() {
    const select = document.getElementById('specialtySelect');
    select.innerHTML = '';
    specialties.forEach(spec => {
        const option = document.createElement('option');
        option.textContent = spec;
        select.appendChild(option);
    });
}

function addTrainee() {
    const name = document.getElementById('nameInput').value.trim();
    if(name && !trainees.includes(name)) {
        trainees.push(name);
        updateTraineeSelect();
        document.getElementById('nameInput').value = '';
    }
}

function editTrainee() {
    const select = document.getElementById('traineeSelect');
    const index = select.selectedIndex;
    if(index >= 0){
        const newName = prompt("أدخل الاسم الجديد:", trainees[index]);
        if(newName) trainees[index] = newName;
        updateTraineeSelect();
    }
}

function deleteTrainee() {
    const select = document.getElementById('traineeSelect');
    const index = select.selectedIndex;
    if(index >= 0) {
        trainees.splice(index, 1);
        updateTraineeSelect();
    }
}

function updateTraineeSelect() {
    const select = document.getElementById('traineeSelect');
    select.innerHTML = '';
    trainees.forEach(name => {
        const option = document.createElement('option');
        option.textContent = name;
        select.appendChild(option);
    });
}

function loadSpecialties() { updateSpecialtySelect(); }
function loadTrainees() { updateTraineeSelect(); }

function markAttendance(status) {
    const date = document.getElementById('attendanceDate').value;
    const trainee = document.getElementById('traineeSelect').value;

    if(!date || !trainee) {
        alert("اختر التاريخ والمتربص أولاً");
        return;
    }

    if(!attendanceRecords[date]) attendanceRecords[date] = {};
    attendanceRecords[date][trainee] = status;

    renderAttendanceList();
    renderChart();
}

function clearDayRecords() {
    const date = document.getElementById('attendanceDate').value;
    if(attendanceRecords[date]) {
        delete attendanceRecords[date];
