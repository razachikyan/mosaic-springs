const emailInput = document.getElementById("email");
const nameInput = document.getElementById("name");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submit");
const swapBtn = document.getElementById("swap");
const forgotBtn = document.getElementById("forgot") ?? null;
const form = document.querySelector("form");

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  if (submitBtn.textContent.toLowerCase() === "sign up") {
    const email = emailInput.value;
    const name = nameInput.value;
    const password = passwordInput.value;
    if (email && name && password) {
      fetch(`http://localhost:5000/users`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      })
        .then((res) => console.log(res))
        .catch((err) => {
          alert(err.message);
        });
    }
  } else if (submitBtn.textContent === "log in") {
    const email = emailInput.value;
    const password = passwordInput.value;
    if (email && password) {
      fetch(`http://localhost:5000/users?email="${email}"&password=${password}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }
});
