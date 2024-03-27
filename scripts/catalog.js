const PAGE_TITLE = document.getElementById("title");
const ITEMS_CONTAINER = document.getElementById("items");
const page = localStorage.getItem("page") ?? "landspace";
const TITLE = document.querySelector("title");

const title = page[0].toUpperCase() + page.slice(1).toLowerCase();

PAGE_TITLE.textContent = title;
TITLE.textContent = title;

ITEMS_CONTAINER.childNodes.forEach((node) => {
  if (!node || !node.classList) return;

  if (page === "interior") {
    if (node.classList.contains("landspace_image")) {
      node.classList.remove("landspace_image");
    }
    node.classList.add("interior_image");
  } else {
    if (node.classList.contains("interior_image")) {
      node.classList.remove("interior_image");
    }
    node.classList.add("landspace_image");
  }
});
