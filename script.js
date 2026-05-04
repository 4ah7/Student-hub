let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

function render(filtered = students) {
  let list = document.getElementById("list");
  let count = document.getElementById("count");

  list.innerHTML = "";
  count.textContent = students.length;

  if (filtered.length === 0) {
    list.innerHTML = "<li class='list-group-item'>No students found</li>";
    return;
  }

  filtered.forEach((s, i) => {
    list.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        <div>
          <strong>${s.name}</strong><br>
          Roll: ${s.roll} | Course: ${s.course}
        </div>
        <div>
          <button class="btn btn-warning btn-sm me-2" onclick="editStudent(${i})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="removeStudent(${i})">Delete</button>
        </div>
      </li>
    `;
  });
}

function addStudent() {
  let name = document.getElementById("name").value.trim();
  let roll = document.getElementById("roll").value.trim();
  let course = document.getElementById("course").value.trim();

  if (!name || !roll || !course) return alert("Fill all fields");

  let data = { name, roll, course };

  if (editIndex === -1) students.push(data);
  else {
    students[editIndex] = data;
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
  if (confirm("Delete all records?")) {
    students = [];
    localStorage.setItem("students", JSON.stringify(students));
    render();
  }
}

document.getElementById("search").addEventListener("input", function () {
  let val = this.value.toLowerCase();
  let filtered = students.filter(s =>
    s.name.toLowerCase().includes(val) ||
    s.roll.toLowerCase().includes(val) ||
    s.course.toLowerCase().includes(val)
  );
  render(filtered);
});

window.onload = render;
