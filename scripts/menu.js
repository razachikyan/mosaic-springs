const BTN = document.getElementById("menu");
const MODAL = document.getElementById("modal");
const CLOSE_MODAL = document.getElementById("modal-close");

BTN.addEventListener("click", () => {
  if (MODAL.classList.contains("hidden")) {
    MODAL.classList.remove("hidden");
    CLOSE_MODAL.classList.remove("hidden");
    document.body.style.overflowY = "hidden";
  }
});

CLOSE_MODAL.addEventListener("click", (_) => {
  if (!MODAL.classList.contains("hidden")) {
    MODAL.classList.add("hidden");
    CLOSE_MODAL.classList.add("hidden");
  }
});

MODAL.addEventListener("click", (ev) => {
  ev.stopPropagation();
});
