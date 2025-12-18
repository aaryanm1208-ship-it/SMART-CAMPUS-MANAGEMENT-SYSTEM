function login() {
  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      role: role.value
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      window.location.href = data.role + ".html";
    } else {
      alert("Invalid Login");
    }
  });
}

function addStudent() {
  fetch("/addStudent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: sid.value,
      name: sname.value
    })
  });
  alert("Student Added");
}

function addNotice() {
  fetch("/addNotice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: notice.value
    })
  });
  alert("Notice Published");
}
