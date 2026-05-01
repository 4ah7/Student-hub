let students = JSON.parse(localStorage.getItem("students")) || [];

function render() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  students.forEach((s, i) => {
    list.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        ${s}
        <button class="btn btn-danger btn-sm" onclick="removeStudent(${i})">Delete</button>
      </li>
    `;
  });
}

function addStudent() {
  let name = document.getElementById("name").value;
  if (name === "") return;

  students.push(name);
  localStorage.setItem("students", JSON.stringify(students));
  document.getElementById("name").value = "";
  render();
}

function removeStudent(i) {
  students.splice(i, 1);
  localStorage.setItem("students", JSON.stringify(students));
  render();
}

render();
