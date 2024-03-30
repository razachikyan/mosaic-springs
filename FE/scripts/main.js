const ITERATOR_BTN = document.getElementById("interior");
const LANDSPACE_BTN = document.getElementById("landspace");

[ITERATOR_BTN, LANDSPACE_BTN].forEach((btn) => {
  btn.addEventListener("click", (_) => {
    localStorage.setItem("page", btn.id);
  });
});
