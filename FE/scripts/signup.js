const emailInput = document.getElementById("email");
const nameInput = document.getElementById("name");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submit");
const swapBtn = document.getElementById("swap");
const forgotBtn = document.getElementById("forgot") ?? null;
const form = document.querySelector("form");

swapBtn.addEventListener("click", (_) => {
  const temp = submitBtn.textContent;
  submitBtn.textContent = swapBtn.textContent;
  swapBtn.textContent = temp;
  if (submitBtn.textContent.toLowerCase() === "sign up") {
    nameInput.classList.remove("hidden");
    forgotBtn.classList.add("hidden");
  } else {
    nameInput.classList.add("hidden");
    forgotBtn.classList.remove("hidden");
  }
});

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  if (ev.submitter.id === "swap") return;
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
        .then((res) => {
          if (res.ok) location.href = "/FE/index.html";
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  } else if (submitBtn.textContent.toLowerCase() === "log in") {
    const email = emailInput.value;
    const password = passwordInput.value;
    if (email && password) {
      fetch(`http://localhost:5000/users?email=${email}&password=${password}`)
        .then((res) => {
          if (res.ok) location.href = "/FE/index.html";
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }
});
