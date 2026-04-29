let specialties = [];
let trainees = [];
let attendanceRecords = {}; 
let chart;
document.getElementById('attendanceDate').valueAsDate = new Date();
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if(username === "houari" && password === "1234") {
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
function deleteSpecialtyBtn.addEventListener("click", ()=>{
    const spec = specialtySelect.value;
    if(!spec){ alert("اختر التخصص للحذف"); return; }
    if(!confirm(`هل تريد حذف التخصص "${spec}" وكل المتربصين فيه؟`)) return;
    specialties = specialties.filter(s=>s!==spec);
    delete trainees[spec];
    loadSpecialties();
});
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
    let name = document.getElementById('traineeInput').value.trim();
    let phone = document.getElementById('traineePhone').value.trim(); // حقل الهاتف
    let specId = document.getElementById('specList').value;
    
    if(!name || !specId || !phone) return alert("يرجى إدخال الاسم ورقم الهاتف");
    
    data.trainees.push({ 
        id: Date.now(), 
        name: name, 
        phone: phone, // حفظ الهاتف
        specId: specId 
    });
    
    document.getElementById('traineeInput').value = '';
    document.getElementById('traineePhone').value = '';
    save(); updateTraineeList();
}
function editTraineeBtn.addEventListener("click", ()=>{
    const spec = specialtySelect.value;
    if(!spec){ alert("اختر التخصص أولاً"); return; }
    const oldName = traineeSelect.value;
    if(!oldName){ alert("اختر المتربص للتعديل"); return; }
    const newName = nameInput.value.trim();
    if(!newName){ alert("أدخل الاسم الجديد"); return; }
    if(trainees[spec].includes(newName)){ alert("المتربص موجود بالفعل"); return; }
    const index = trainees[spec].indexOf(oldName);
    trainees[spec][index] = newName;
    nameInput.value = "";
    loadTrainees(spec);
});
}
function deleteTraineeBtn.addEventListener("click", ()=>{
    const spec = specialtySelect.value;
    if(!spec){ alert("اختر التخصص أولاً"); return; }
    const name = traineeSelect.value;
    if(!name){ alert("اختر المتربص للحذف"); return; }
    if(!confirm(`هل تريد حذف المتربص "${name}"؟`)) return;
    trainees[spec] = trainees[spec].filter(n=>n!==name);
    loadTrainees(spec);
});
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
  function renderAttendanceList(){
    const date = attendanceDate.value;
    const search = searchTrainee.value.trim().toLowerCase();
    const filter = filterSpecialty.value;
    attendanceList.innerHTML="";
    if(attendanceRecords[date]){
        Object.entries(attendanceRecords[date]).forEach(([name,status])=>{
            if((!filter || (trainees[filter] && trainees[filter].includes(name))) &&
               (!search || name.toLowerCase().includes(search))){
                   const li = document.createElement("li");
                   li.textContent = `${name}: ${status}`;
                   if(status === "غائب"){
                       li.style.backgroundColor = "#f8d7da"; // أحمر فاتح
                       li.style.color = "#721c24"; // نص غامق للأحمر
                   } else {
                       li.style.backgroundColor = "#d4edda"; // أخضر فاتح للحضور
                       li.style.color = "#155724";
                   }
                   li.style.padding = "10px";
                   li.style.margin = "5px 0";
                   li.style.borderRadius = "8px";
                   attendanceList.appendChild(li);
            }
        });
    }
}
    renderChart();
}
function clearDayRecords() {
    const date = document.getElementById('attendanceDate').value;
    if(attendanceRecords[date]) {
        delete attendanceRecords[date];
exportCSVBtn.addEventListener("click", ()=>{
    let allRecords = [];
    Object.entries(attendanceRecords).forEach(([date, records])=>{
        Object.entries(records).forEach(([trainee,status])=>{
            allRecords.push({التاريخ: date, المتربص: trainee, الحالة: status});
        });
    });
    // ترتيب حسب التاريخ ثم اسم المتربص
    allRecords.sort((a,b)=>{
        if(a.التاريخ < b.التاريخ) return -1;
        if(a.التاريخ > b.التاريخ) return 1;
        return a.المتربص.localeCompare(b.المتربص);
    });
    // تحويل البيانات إلى ورقة Excel
    const ws = XLSX.utils.json_to_sheet(allRecords);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "الحضور");
    XLSX.writeFile(wb, "attendance.xlsx"); // الآن Excel يفتح الملف مباشرة
});   
    // إنشاء CSV
    let csv = "التاريخ,المتربص,الحالة\n";
    allRecords.forEach(r=>{
        csv += `${r.date},${r.trainee},${r.status}\n`;
    });
    // إنشاء الرابط وتحميل الملف
    const blob = new Blob([csv], {type:"text/csv;charset=utf-8;"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "attendance.xlsx"; // يمكن Excel فتح CSV بهذا الاسم
    link.click();
});
    attendanceDate.addEventListener("change", renderChart);
filterSpecialty.addEventListener("change", renderChart);
    function checkAbsenceAlerts() {
    const container = document.getElementById('absenceAlerts');
    container.innerHTML = '';
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    let map = {};

    data.attendance.forEach(log => {
        let d = new Date(log.date);
        if (log.status === 'غائب' && d.getMonth() === month && d.getFullYear() === year) {
            map[log.tId] = (map[log.tId] || 0) + 1;
        }
    });

    let found = false;
    for (let tId in map) {
        if (map[tId] >= 3) {
            found = true;
            let t = data.trainees.find(tr => tr.id == tId);
            
            // تحضير رسالة الواتساب
            let message = `تحية طيبة، نود إعلامكم أن المتربص ${t.name} قد تغيب ${map[tId]} أيام خلال هذا الشهر. يرجى مراجعة الإدارة.`;
            let whatsappUrl = `https://wa.me/${t.phone}?text=${encodeURIComponent(message)}`;

container.innerHTML += `
    <div class="alert-item">
        <span><strong>${t.name}</strong> غاب ${map[tId]} أيام</span>
        <div style="display:flex; gap:5px;">
            <a href="${url}" target="_blank" class="wa-btn">💬 واتساب</a>
            <button onclick="generateWordCall('${tId}')" style="background:#2980b9; font-size:0.8rem; padding:5px 10px;">
                📄 ملف Word
            </button>
        </div>
    </div>`;
        }
    }
    if (!found) container.innerHTML = '<p style="text-align:center; color:var(--success);">✅ الحضور منتظم</p>';
        function logout() {
    if(confirm("هل أنت متأكد من تسجيل الخروج؟")) {
        // إخفاء التطبيق وإظهار صفحة الدخول
        document.getElementById('mainApp').style.display = 'none';
        document.getElementById('loginPage').style.display = 'block';
        
        // تفريغ حقول الدخول لزيادة الأمان
        document.getElementById('user').value = '';
        document.getElementById('pass').value = '';
        
        // العودة لأعلى الصفحة
        window.scrollTo(0, 0);
    }
}
        async function generateFromTemplate(tId) {
    const t = data.trainees.find(tr => tr.id == tId);
    const s = data.specs.find(sp => sp.id == t.specId);
    const m = new Date().getMonth(), y = new Date().getFullYear();
    const absences = data.attendance.filter(a => a.tId == tId && a.status === 'غائب' && new Date(a.date).getMonth() === m).map(a => a.date);

    // إنشاء نافذة اختيار ملف
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.docx';
    
    input.onchange = async (e) => {
        const reader = new FileReader();
        reader.onload = async (f) => {
            try {
                const zip = new PizZip(f.target.result);
                const doc = new window.docxtemplater(zip, { 
                    paragraphLoop: true, 
                    linebreaks: true 
                });

                // إرسال البيانات (تأكد من مطابقة هذه الأسماء لما تكتبه في الوورد)
                doc.setData({
                    name: t.name,
                    specialty: s ? s.name : "غير محدد",
                    count: absences.length,
                    dates: absences.join(" / "),
                    today: new Date().toLocaleDateString('ar-DZ')
                });

                doc.render(); // هنا تتم عملية الاستبدال

                const out = doc.getZip().generate({
                    type: "blob",
                    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                });

                saveAs(out, `استدعاء_${t.name}.docx`);
                alert("تم توليد الملف بنجاح!");
            } catch (error) {
                console.error(error);
                alert("حدث خطأ: تأكد أن القالب لا يحتوي على أخطاء في الأقواس {{ }}");
            }
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    };
    input.click();
}
}
    function exportToExcel() {
    let d = document.getElementById('targetDate').value;
    // 1. تصفية سجلات اليوم المختار
    let dailyLogs = db.logs.filter(x => x.date === d);

    if (dailyLogs.length === 0) {
        alert("لا توجد سجلات لتصديرها لهذا اليوم!");
        return;
    }

    // 2. تحضير البيانات لتكون مناسبة للإكسيل
    let excelData = dailyLogs.map(log => {
        let trainee = db.trainees.find(t => t.id == log.tId);
        let spec = db.specs.find(s => s.id == (trainee ? trainee.specId : null));
        
        return {
            "التاريخ": log.date,
            "الاسم واللقب": trainee ? trainee.name : "غير معروف",
            "التخصص": spec ? spec.name : "غير معروف",
            "الحالة": log.status,
            "الهاتف": trainee ? trainee.phone : ""
        };
    });

    // 3. إنشاء ورقة العمل (Worksheet)
    const ws = XLSX.utils.json_to_sheet(excelData);
    
    // ضبط اتجاه الورقة ليكون من اليمين لليسار (للغة العربية)
    ws['!dir'] = "rtl";

    // 4. إنشاء كتاب العمل (Workbook) وتحميل الملف
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "سجل الحضور");
    
    // 5. حفظ الملف باسم يحتوي على التاريخ
    XLSX.writeFile(wb, `سجل_حضور_${d}.xlsx`);
}
    async function processMyTemplate(tId) {
    const t = data.trainees.find(tr => tr.id == tId);
    const s = data.specs.find(sp => sp.id == t.specId);
    const absences = data.attendance.filter(a => a.tId == tId && a.status === 'غائب' && new Date(a.date).getMonth() === new Date().getMonth()).map(a => a.date);

    // التحقق من وجود المكتبات قبل البدء
    if (typeof window.PizZip === "undefined") {
        alert("خطأ: مكتبة PizZip لم تُحمل بعد. يرجى التأكد من الاتصال بالإنترنت.");
        return;
    }

    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.docx';
    input.onchange = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = async (f) => {
            try {
                // استخدام المكتبات من نافذة المتصفح مباشرة
                const zip = new window.PizZip(f.target.result);
                const doc = new window.docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                });

                doc.setData({
                    name: t.name,
                    specialty: s ? s.name : "غير محدد",
                    count: absences.length,
                    dates: absences.join(" / "),
                    today: new Date().toLocaleDateString('ar-DZ')
                });

                doc.render();

                const out = doc.getZip().generate({
                    type: "blob",
                    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                });

                saveAs(out, `استدعاء_${t.name}.docx`);
            } catch (err) {
                console.error(err);
                alert("حدث خطأ في القالب. تأكد من أن الحقول داخل القالب هي {{name}} و {{specialty}} و {{count}} و {{dates}}");
            }
        };
        reader.readAsArrayBuffer(file);
    };
    input.click();
}
    function renderTable() {
    let d = document.getElementById('targetDate').value;
    let tbody = document.getElementById('logsTableBody');
    if(!tbody) return; 

    tbody.innerHTML = '';
    
    // فلترة السجلات حسب التاريخ المختار
    let filteredLogs = db.logs.filter(x => x.date === d);

    if(filteredLogs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3">لا توجد سجلات لهذا التاريخ</td></tr>';
        return;
    }

    filteredLogs.forEach(log => {
        // نستخدم == بدلاً من === للتعامل مع اختلاف نوع البيانات (رقم/نص)
        let t = db.trainees.find(x => x.id == log.tId);
        if(t) {
            let sClass = log.status === 'حاضر' ? 'status-present' : 'status-absent';
            tbody.innerHTML += `
                <tr>
                    <td>${t.name}</td>
                    <td class="${sClass}">${log.status}</td>
                    <td>
                        <button class="edit-btn" onclick="toggleStatus(${log.tId}, '${log.date}')">تغيير</button>
                    </td>
                </tr>`;
        }
    });
}
    function doLogin() {
    if(document.getElementById('sysPass').value === '1234') {
        document.getElementById('loginPanel').style.display = 'none';
        document.getElementById('appPanel').style.display = 'block';
        
        // تعيين تاريخ اليوم تلقائياً عند الدخول
        if(!document.getElementById('targetDate').value) {
            document.getElementById('targetDate').valueAsDate = new Date();
        }
        
        renderSpecs(); 
        refreshAll(); // هذا السطر هو المسؤول عن إظهار السجل فور الدخول
    } else { 
        alert("كلمة المرور خاطئة!"); 
    }
}
    document.getElementById('targetDate').addEventListener('change', refreshAll);
