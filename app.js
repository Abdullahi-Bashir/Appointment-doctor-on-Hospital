// Save form data to localStorage
function saveFormData(formId, data) {
    localStorage.setItem(formId, JSON.stringify(data));
}

// Load form data from localStorage
function loadFormData(formId) {
    const savedData = localStorage.getItem(formId);
    return savedData ? JSON.parse(savedData) : null;
}

// Function to handle patient form submission
document.getElementById('patient-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('patient-name').value;
    const age = document.getElementById('patient-age').value;
    const gender = document.getElementById('patient-gender').value;
    const address = document.getElementById('patient-address').value;

    const table = document.getElementById('patient-list').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.rows.length);
    newRow.insertCell(0).innerText = name;
    newRow.insertCell(1).innerText = age;
    newRow.insertCell(2).innerText = gender;
    newRow.insertCell(3).innerText = address;

    // Save to localStorage
    const patients = loadFormData('patients') || [];
    patients.push({ name, age, gender, address });
    saveFormData('patients', patients);

    document.getElementById('patient-form').reset();
});

// Function to load saved patients on page load
function loadSavedPatients() {
    const patients = loadFormData('patients') || [];
    const table = document.getElementById('patient-list').getElementsByTagName('tbody')[0];

    patients.forEach(patient => {
        const newRow = table.insertRow(table.rows.length);
        newRow.insertCell(0).innerText = patient.name;
        newRow.insertCell(1).innerText = patient.age;
        newRow.insertCell(2).innerText = patient.gender;
        newRow.insertCell(3).innerText = patient.address;
    });
}

document.getElementById('doctor-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('doctor-name').value;
    const specialization = document.getElementById('doctor-specialization').value;

    const list = document.getElementById('doctor-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${name} - ${specialization}`;
    list.appendChild(listItem);

    // Save to localStorage
    const doctors = loadFormData('doctors') || [];
    doctors.push({ name, specialization });
    saveFormData('doctors', doctors);

    document.getElementById('doctor-form').reset();
});

// Function to load saved doctors on page load
function loadSavedDoctors() {
    const doctors = loadFormData('doctors') || [];
    const list = document.getElementById('doctor-list');

    doctors.forEach(doctor => {
        const listItem = document.createElement('li');
        listItem.textContent = `${doctor.name} - ${doctor.specialization}`;
        list.appendChild(listItem);
    });
}

document.getElementById('appointment-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const patient = document.getElementById('appointment-patient').value;
    const doctor = document.getElementById('appointment-doctor').value;
    const date = document.getElementById('appointment-date').value;

    const list = document.getElementById('appointment-list');
    const listItem = document.createElement('li');
    listItem.textContent = `Appointment: ${patient} with Dr. ${doctor} on ${date}`;
    list.appendChild(listItem);

    // Save to localStorage
    const appointments = loadFormData('appointments') || [];
    appointments.push({ patient, doctor, date });
    saveFormData('appointments', appointments);

    document.getElementById('appointment-form').reset();
});

// Function to load saved appointments on page load
function loadSavedAppointments() {
    const appointments = loadFormData('appointments') || [];
    const list = document.getElementById('appointment-list');

    appointments.forEach(appointment => {
        const listItem = document.createElement('li');
        listItem.textContent = `Appointment: ${appointment.patient} with Dr. ${appointment.doctor} on ${appointment.date}`;
        list.appendChild(listItem);
    });
}

// Load data from localStorage when the page loads
window.addEventListener('load', function() {
    loadSavedPatients();
    loadSavedDoctors();
    loadSavedAppointments();
});
