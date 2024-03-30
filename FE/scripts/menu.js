const BTN = document.getElementById("menu");
const MODAL = document.getElementById("modal");
const CLOSE_MODAL = document.getElementById("modal-close");

BTN.addEventListener("click", () => swapModal());

CLOSE_MODAL.addEventListener("click", (_) => swapModal());

MODAL.childNodes.forEach((node) => {
  if (node.nodeName === "UL") {
    node.childNodes.forEach((li) => {
      console.log(li);
      if (li.nodeName === "LI")
        li.querySelector("a")?.addEventListener("click", () => {
          console.log("aasaafadasf");
          swapModal();
        });
    });
  }
});

function swapModal() {
  if (isHidden(MODAL)) {
    MODAL.classList.remove("hidden");
    CLOSE_MODAL.classList.remove("hidden");
    document.body.style.overflowY = "hidden";
  } else {
    MODAL.classList.add("hidden");
    CLOSE_MODAL.classList.add("hidden");
    document.body.style.overflowY = "auto";
  }
}

function isHidden(el) {
  return Boolean(el?.classList?.contains?.("hidden"));
}

MODAL.addEventListener("click", (ev) => {
  ev.stopPropagation();
});
