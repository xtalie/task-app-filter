import { taskDetails } from "./data.js";

const textInput = document.getElementById("textInput");
const cancel = document.getElementById("cancel");
const errorMessage = document.getElementById("errorMessage");
const todoTable = document.getElementById("todoTable");
const inputedErrorText = document.getElementById("inputedErrorText");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const addTask = document.getElementById("addTask");
const modal = document.getElementById("modal");
const modalCancel = document.getElementById("modalCancel");

document.addEventListener("DOMContentLoaded", () => {
  createTable(taskDetails.taskList);
});

// input functionality
textInput.addEventListener("focus", () => {
  cancel.style.display = "block";
});

textInput.addEventListener("blur", () => {
  cancel.style.display = "none";
});

cancel.addEventListener("mousedown", (e) => {
  e.preventDefault();
  textInput.value = "";
  createTable(taskDetails.taskList);
});

// pagination increment and decrement functionality
const PER_PAGE = 10;
const pagination = {
  pageNumber: 1,
  increasePageNumber: () => {
    pagination.pageNumber++;
  },

  decreasePageNumber: () => {
    pagination.pageNumber--;
  },
};

// pagination functionality
const paginate = (list, pageSize, pageNumber) => {
  return list.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

// create table
function createTable(data) {
  const myTable = document.getElementById("myTable");
  myTable.innerHTML = "";
  let paginatedData = paginate(data, PER_PAGE, 1);

  paginatedData.forEach((el, index) => {
    const tr = document.createElement("tr");
    tr.className = "description";
    tr.innerHTML = `
    <td><input type="checkbox" name="" id="checkbox"></td>
    <td>${index + 1}</td>
    <td class='des'>${el.description}</td>
    <td><button class="btn ${el.status.toLowerCase()}">${
      el.status
    }</button></td>
    <td>${el.date}</td>
    <td><button class="btn ${el.priority.toLowerCase()}">${
      el.priority
    }</button></td>
    <td ><i class="fa-solid fa-ellipsis-vertical"></i></td>
    
 
    `;

    myTable.append(tr);
  });
  document.getElementById("currentPage").innerText = pagination.pageNumber;
  document.getElementById("totalPage").innerText = Math.round(
    taskDetails.taskList.length / PER_PAGE
  );
  document.getElementById(
    "totalItems"
  ).innerText = `of ${taskDetails.taskList.length}`;
  document.getElementById("pageNumber").innerText = pagination.pageNumber;

  prevButton.disabled = pagination.pageNumber == 1 ? true : false;
  prevButton.style.color = pagination.pageNumber <= 1 ? "#c1c0c0" : "green";

  nextButton.disabled =
    pagination.pageNumber == Math.ceil(taskDetails.taskList.length / PER_PAGE)
      ? true
      : false;
  nextButton.style.color =
    Math.ceil(taskDetails.taskList.length / PER_PAGE) == pagination.pageNumber
      ? "#c1c0c0"
      : "green";
}

createTable(taskDetails.taskList);

// filter functionality
textInput.addEventListener("input", () => {
  const value = textInput.value;
  const dataCopy = [...taskDetails.taskList];
  const data = dataCopy.filter((el) =>
    el.description.toLowerCase().includes(value.toLowerCase())
  );
  if (data.length <= 0) {
    todoTable.style.visibility = "hidden";
    inputedErrorText.textContent = `"${value}"`;
    errorMessage.style.display = "block";
  } else {
    todoTable.style.visibility = "visible";
    inputedErrorText.textContent = "";
    errorMessage.style.display = "none";
  }
  createTable(data);
});

nextButton.addEventListener("click", () => {
  let increase = pagination.increasePageNumber();
  let paginatedData = paginate(
    taskDetails.taskList,
    PER_PAGE,
    pagination.pageNumber
  );
  createTable(paginatedData);
});

prevButton.addEventListener("click", () => {
  let decrease = pagination.decreasePageNumber();

  let paginatedData = paginate(
    taskDetails.taskList,
    PER_PAGE,
    pagination.pageNumber
  );
  createTable(paginatedData);
});

// cancel button functionality

// cancel.addEventListener("click", (e) => {
//   let data;
//   data.filter((el) => el.description.toLowerCase().includes(""));
//   createTable(data);
// });

// filter by description
const buttons = document.querySelectorAll(".btn");
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    buttons.forEach((b) => {
      b.classList.add("btn-color");
    });
    e.target.classList.remove("btn-color");
    let data;
    const text = e.target.textContent.toLowerCase();
    if (text === "all") {
      const dataCopy = [...taskDetails.taskList];
      data = dataCopy.filter((el) => el.status.toLowerCase().includes(""));
    } else {
      const dataCopy = [...taskDetails.taskList];
      data = dataCopy.filter((el) => el.status.toLowerCase().includes(text));
    }
    createTable(data);
  });
});

// filter by status pagination

// function filterByStatus(data) {
//   // data=''
//   let dataList =paginate( taskDetails.taskList,PER_PAGE,pagination.pageNumber);
//  taskDetails.taskList=dataList.filter(({status})=>{
//   return status.toLowerCase().includes(data.toLowerCase().replace(/\s/g, ''))
//  })
// //  createTable(data);

// }
// filterByStatus()

// modal functionality
addTask.addEventListener("click", (e) => {
  modal.style.display = "block";
});

modalCancel.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

// modal add task functionality

const task = {
  status: "",
  priority: "",
  description: "",
  time: "",
};

// status functionality
const statusBtn = document.querySelectorAll(".status-btn");
statusBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    statusBtn.forEach((button) => {
      button.classList.remove("active-status-btn");
    });
    e.target.classList.add("active-status-btn");
    task.status = e.target.innerText;
    console.log(task.status);
  });
});

// priority functionality
const priorityBtn = document.querySelectorAll(".priority-btn");
priorityBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    priorityBtn.forEach((button) => {
      button.classList.remove("active-status-btn");
    });
    e.target.classList.add("active-status-btn");
    task.priority = e.target.innerText;
   console.log(task.priority);
  });
});

// date functionality
document.addEventListener("click", () => {
  task.time = new Date(document.getElementById("date").value).getTime();
  // console.log(task.time);
 
});

// description functionality
const description = document.querySelectorAll("#description");
description.forEach((des) => {
  des.addEventListener("change", () => {
    task.description = des.value;
    console.log(task.description);
  });
});



