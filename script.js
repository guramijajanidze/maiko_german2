document.addEventListener("DOMContentLoaded", () => {
  const level1 = document.getElementById("level1");
  const level2 = document.getElementById("level2");
  const container2 = document.getElementById("container2");

  let selected = false;

  level1.addEventListener("click", () => {
    if (!selected) {
      // Select level1
      level2.style.opacity = "0.25";
      container2.classList.add("visible");
      selected = true;
    } else {
      // Deselect level1
      level2.style.opacity = "1";
      container2.classList.remove("visible");
      selected = false;
    }
  });
});
