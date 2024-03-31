const ITERATOR_BTN = document.getElementById("interior");
const LANDSPACE_BTN = document.getElementById("landspace");
const form = document.getElementById("msb-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("name");
const phoeInput = document.getElementById("phone");
const messageInput = document.getElementById("text");

[ITERATOR_BTN, LANDSPACE_BTN].forEach((btn) => {
  btn.addEventListener("click", (_) => {
    localStorage.setItem("page", btn.id);
  });
});

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const name = nameInput.value;
  const email = emailInput.value;
  const phone = phoeInput.value;
  const message = messageInput.value;

  if (name && email && phone && message) {
    fetch(`http://localhost:5000/message`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        phone,
        message,
      }),
    });
  }
});