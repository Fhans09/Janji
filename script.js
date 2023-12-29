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

  // Mengurutkan appointments berdasarkan tanggal (dari yang terlama ke terbaru)
  appointments.sort((a, b) => new Date(a.date) - new Date(b.date));

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

  // Create a new HTML document
  const htmlContent = `
    <html>
      <head>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          .blue-bg {
            background-color: #add8e6; /* Light Blue color for the "Deskripsi" column */
          }
        </style>
      </head>
      <body>
        <h2>Daftar Janji Temu</h2>
        <table>
          <thead>
            <tr>
              <th>Deskripsi</th>
              <th>Tanggal</th>
              <th>Waktu</th>
            </tr>
          </thead>
          <tbody>
            ${appointments.map((appointment, index) => `
              <tr>
                <td ${index === 0 ? 'class="blue-bg"' : ''}>${appointment.description}</td>
                <td>${appointment.date}</td>
                <td>${appointment.time}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </body>
    </html>`;

  // Create a Blob containing the HTML content
  const blob = new Blob([htmlContent], { type: 'text/html' });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a link element and trigger a click to download the file
  const link = document.createElement('a');
  link.href = url;
  link.download = 'daftar_janji_temu.doc';
  document.body.appendChild(link);

  link.click();

  // Remove the link element
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
