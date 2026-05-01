let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

function render(filteredStudents = students) {
  let list = document.getElementById("list");
  list.innerHTML = "";

  // Update count
  document.getElementById("count").textContent = students.length;

  if (filteredStudents.length === 0) {
    list.innerHTML = `<li class="list-group-item text-center text-muted">No students found</li>`;
    return;
  }

  filteredStudents.forEach((s, i) => {
    list.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        ${s}
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

  if (name === "") {
    alert("Please enter a student name");
    return;
  }

  if (editIndex === -1) {
    students.push(name);
  } else {
    students[editIndex] = name;
    editIndex = -1;
  }

  localStorage.setItem("students", JSON.stringify(students));
  document.getElementById("name").value = "";
  render();
}

function editStudent(i) {
  document.getElementById("name").value = students[i];
  editIndex = i;
}

function removeStudent(i) {
  students.splice(i, 1);
  localStorage.setItem("students", JSON.stringify(students));
  render();
}

// SEARCH (WORKING VERSION)
document.getElementById("search").addEventListener("input", function () {
  let input = this.value.toLowerCase();
  let filtered = students.filter(s => s.toLowerCase().includes(input));
  render(filtered);
});

render();
