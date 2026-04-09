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

function loadSpecialties(){
    specialtySelect.innerHTML = "";
    specialties.forEach(spec => {
        const opt = document.createElement("option");
        opt.textContent = spec;
        specialtySelect.appendChild(opt);
    });
    if(specialties.length > 0) loadTrainees(specialtySelect.value);
    updateFilterSpecialty();
    localStorage.setItem("specialties", JSON.stringify(specialties));
}

function loadTrainees(spec){
    traineeSelect.innerHTML = "";
    if(!trainees[spec]) trainees[spec] = [];
    trainees[spec].forEach(name => {
        const opt = document.createElement("option");
        opt.textContent = name;
        traineeSelect.appendChild(opt);
    });
    localStorage.setItem("trainees", JSON.stringify(trainees));
}

function updateFilterSpecialty(){
    filterSpecialty.innerHTML = '<option value="">كل التخصصات</option>';
    specialties.forEach(spec => {
        const opt = document.createElement("option");
        opt.value = spec;
        opt.textContent = spec;
        filterSpecialty.appendChild(opt);
    });
}

// زر إضافة تخصص
addSpecialtyBtn.addEventListener("click", () => {
    const spec = newSpecialty.value.trim();
    if(!spec) return alert("أدخل اسم التخصص");
    if(specialties.includes(spec)) return alert("التخصص موجود بالفعل");
    specialties.push(spec);
    newSpecialty.value = "";
    loadSpecialties();
});

// زر إضافة متربص
addTraineeBtn.addEventListener("click", () => {
    const spec = specialtySelect.value;
    if(!spec) return alert("اختر التخصص أولاً");
    const name = nameInput.value.trim();
    if(!name) return alert("أدخل اسم المتربص");
    if(!trainees[spec]) trainees[spec] = [];
    if(trainees[spec].includes(name)) return alert("المتربص موجود بالفعل");
    trainees[spec].push(name);
    nameInput.value = "";
    loadTrainees(spec);
});

// تحديث قائمة المتربصين عند تغيير التخصص
specialtySelect.addEventListener("change", () => loadTrainees(specialtySelect.value));

// تحميل القوائم عند بدء التطبيق
loadSpecialties();

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
