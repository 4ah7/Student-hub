let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

function render() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  if (students.length === 0) {
    list.innerHTML = `<li class="list-group-item text-center text-muted">No students added yet</li>`;
    return;
  }

  students.forEach((s, i) => {
    list.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        ${i + 1}. ${s}
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

render();
