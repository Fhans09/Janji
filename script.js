// script.js
document.addEventListener("DOMContentLoaded", function () {
  displayAppointments();
});

function saveAppointment() {
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  const appointment = {
    description: description,
    date: date,
    time: time,
  };

  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  appointments.push(appointment);
  localStorage.setItem("appointments", JSON.stringify(appointments));

  displayAppointments();
  closeForm();
}

function displayAppointments() {
  const appointmentList = document.getElementById("appointment-list");
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  appointmentList.innerHTML = "";

  const table = document.createElement("table");
  table.innerHTML = `
      <thead>
        <tr>
          <th>Deskripsi</th>
          <th>Tanggal</th>
          <th>Waktu</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody id="appointment-table-body"></tbody>
    `;
  appointmentList.appendChild(table);
  const tableBody = document.getElementById("appointment-table-body");

  appointments.forEach((appointment) => {
    const row = tableBody.insertRow();
    const cellDescription = row.insertCell(0);
    const cellDate = row.insertCell(1);
    const cellTime = row.insertCell(2);
    const cellActions = row.insertCell(3);

    cellDescription.innerHTML = appointment.description;
    cellDate.innerHTML = appointment.date;
    cellTime.innerHTML = appointment.time;
    cellActions.innerHTML = `
        <button onclick="editAppointment('${appointment.description}')">Edit</button>
        <button onclick="deleteAppointment('${appointment.description}')">Hapus</button>`;

    row.setAttribute("data-description", appointment.description);
  });
}

function showAllAppointments() {
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  const table = document.createElement("table");
  table.innerHTML = `
      <thead>
        <tr>
          <th>Deskripsi</th>
          <th>Tanggal</th>
          <th>Waktu</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody id="all-appointment-table-body"></tbody>
    `;

  const tableBody = table.querySelector("#all-appointment-table-body");

  appointments.forEach((appointment) => {
    const row = tableBody.insertRow();
    const cellDescription = row.insertCell(0);
    const cellDate = row.insertCell(1);
    const cellTime = row.insertCell(2);
    const cellActions = row.insertCell(3);

    cellDescription.innerHTML = appointment.description;
    cellDate.innerHTML = appointment.date;
    cellTime.innerHTML = appointment.time;
    cellActions.innerHTML = `
        <button onclick="editAppointment('${appointment.description}')">Edit</button>
        <button onclick="deleteAppointment('${appointment.description}')">Hapus</button>`;
  });

  const modalContent = document.querySelector(".modal-content");
  modalContent.innerHTML = "";
  modalContent.appendChild(table);

  openForm();
}

function editAppointment(description) {
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  const appointmentToEdit = appointments.find(
    (appointment) => appointment.description === description
  );

  document.getElementById("description").value = appointmentToEdit.description;
  document.getElementById("date").value = appointmentToEdit.date;
  document.getElementById("time").value = appointmentToEdit.time;

  openForm();
}

function deleteAppointment(description) {
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  const updatedAppointments = appointments.filter(
    (appointment) => appointment.description !== description
  );
  localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

  displayAppointments();
}

function downloadAppointments() {
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  let wordContent = "Daftar Janji Temu\n\n";
  appointments.forEach((appointment) => {
    wordContent += `${appointment.description} - ${appointment.date} ${appointment.time}\n`;
  });

  const blob = new Blob([wordContent], { type: "application/msword" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "daftar_janji_temu.doc";
  document.body.appendChild(link);

  link.click();
  document.body.removeChild(link);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeForm();
  }
});

function openForm() {
  document.getElementById("myModal").style.display = "block";
}

function closeForm() {
  document.getElementById("myModal").style.display = "none";
}
