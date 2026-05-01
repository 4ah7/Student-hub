let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

function render(filteredStudents = students) {
  let list = document.getElementById("list");
  let countEl = document.getElementById("count");

  list.innerHTML = "";

  if (countEl) countEl.textContent = students.length;

  if (filteredStudents.length === 0) {
    list.innerHTML = `<li class="list-group-item text-center text-muted">No students found</li>`;
    return;
  }

  filteredStudents.forEach((s, i) => {
    list.innerHTML += `
      <li class="list-group-item">
        <div class="d-flex justify-content-between">
          <div>
            <strong>${s.name}</strong><br>
            Roll No: ${s.roll} | Course: ${s.course}
          </div>
          <div>
            <button class="btn btn-warning btn-sm me-2" onclick="editStudent(${i})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="removeStudent(${i})">Delete</button>
          </div>
        </div>
      </li>
    `;
  });
}

function addStudent() {
  let name = document.getElementById("name").value.trim();
  let roll = document.getElementById("roll").value.trim();
  let course = document.getElementById("course").value.trim();

  if (!name || !roll || !course) {
    alert("Please fill all fields");
    return;
  }

  name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  let newStudent = { name, roll, course };

  if (editIndex === -1) {
    students.push(newStudent);
  } else {
    students[editIndex] = newStudent;
    editIndex = -1;
  }

  localStorage.setItem("students", JSON.stringify(students));

  document.getElementById("name").value = "";
  document.getElementById("roll").value = "";
  document.getElementById("course").value = "";

  render();
}

function editStudent(i) {
  let s = students[i];
  document.getElementById("name").value = s.name;
  document.getElementById("roll").value = s.roll;
  document.getElementById("course").value = s.course;
  editIndex = i;
}

function removeStudent(i) {
  students.splice(i, 1);
  localStorage.setItem("students", JSON.stringify(students));
  render();
}

function clearAll() {
  if (confirm("Are you sure you want to delete all records?")) {
    students = [];
    localStorage.setItem("students", JSON.stringify(students));
    render();
  }
}

document.getElementById("search").addEventListener("input", function () {
  let input = this.value.toLowerCase();

  let filtered = students.filter(s =>
    s.name.toLowerCase().includes(input) ||
    s.roll.toLowerCase().includes(input) ||
    s.course.toLowerCase().includes(input)
  );

  render(filtered);
});

window.onload = function () {
  render();
};
