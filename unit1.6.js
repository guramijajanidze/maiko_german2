// script.js

document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".grocery_container");

  // Hide all containers first
  containers.forEach(c => c.style.display = "none");

  // Show fruit container by default
  const defaultContainer = document.getElementById("fruit_container");
  if (defaultContainer) defaultContainer.style.display = "block";

  // Utility function to show the selected container
  function showContainer(containerId) {
    containers.forEach(c => c.style.display = "none"); // hide all first
    const container = document.getElementById(containerId);
    if (container) container.style.display = "block"; // show selected
  }

  // Category buttons
  const obstBtn = document.querySelectorAll("#obst");
  const gemuseBtn = document.querySelectorAll("#gemuse");

  // Obst → show fruit_container
  obstBtn.forEach(btn => {
    btn.addEventListener("click", () => showContainer("fruit_container"));
  });

  // Gemüse → show vegetables_container
  gemuseBtn.forEach(btn => {
    btn.addEventListener("click", () => showContainer("vegetables_container"));
  });
});


//*  DRAG AND DROP GAME */
// dragdrop.js
document.addEventListener("DOMContentLoaded", () => {
  const pool = document.getElementById("fruit-pool");
  const fruits = pool.querySelectorAll(".fruit");
  const boxes = document.querySelectorAll(".box");
  const message = document.getElementById("message");
  const resetBtn = document.getElementById("resetBtn");

  // Helper to reset message
  function setMessage(text, timeout = 2000) {
    message.textContent = text || "";
    if (timeout && text) {
      setTimeout(() => { message.textContent = ""; }, timeout);
    }
  }

  // DRAG START / END
  fruits.forEach(img => {
    img.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", img.id);
      // small hack so drag image remains visible on some browsers
      e.dataTransfer.effectAllowed = "move";
      img.classList.add("dragging");
    });

    img.addEventListener("dragend", () => {
      img.classList.remove("dragging");
    });
  });

  // BOX: dragover / dragenter / dragleave / drop
  boxes.forEach(box => {
    const slot = box.querySelector(".drop-slot");

    slot.addEventListener("dragover", (e) => {
      e.preventDefault(); // allow drop
      e.dataTransfer.dropEffect = "move";
    });

    slot.addEventListener("dragenter", (e) => {
      e.preventDefault();
      box.classList.add("over");
    });

    slot.addEventListener("dragleave", () => {
      box.classList.remove("over");
    });

    slot.addEventListener("drop", (e) => {
      e.preventDefault();
      box.classList.remove("over");

      const draggedId = e.dataTransfer.getData("text/plain");
      const draggedEl = document.getElementById(draggedId);
      if (!draggedEl) return;

      // If slot already has an image, return it to pool
      const existing = slot.querySelector("img");
      if (existing) {
        pool.appendChild(existing);
        existing.draggable = true;
        existing.classList.remove("placed");
      }

      // Move dragged element into slot
      slot.appendChild(draggedEl);

      // Check correctness
      const expected = box.dataset.fruit;
      const actual = draggedEl.dataset.fruit;

      if (expected === actual) {
        box.classList.remove("incorrect");
        box.classList.add("correct");
        // Lock the image (can't drag again)
        draggedEl.draggable = false;
        draggedEl.classList.add("placed");
        setMessage("Richtig!", 1200);
      } else {
        // Visual wrong feedback + return item after brief animation
        box.classList.add("incorrect");
        setMessage("Falsch — versuche es noch einmal.", 1400);
        // put it back after the shake finishes
        setTimeout(() => {
          box.classList.remove("incorrect");
          // If the dragged element is still inside slot, move it back
          const imgInSlot = slot.querySelector("img");
          if (imgInSlot && imgInSlot.id === draggedEl.id) {
            pool.appendChild(draggedEl);
            draggedEl.draggable = true;
          }
        }, 600);
      }
    });
  });

  // Reset button - move all images back and clear states
  resetBtn.addEventListener("click", () => {
    // move all placed images back to pool
    const placed = document.querySelectorAll(".fruit.placed");
    placed.forEach(img => {
      pool.appendChild(img);
      img.draggable = true;
      img.classList.remove("placed");
    });

    // clear box states
    boxes.forEach(box => {
      box.classList.remove("correct", "incorrect", "over");
      const slot = box.querySelector(".drop-slot");
      // remove any leftover images in slots and move to pool
      const imgInSlot = slot.querySelector("img");
      if (imgInSlot) {
        pool.appendChild(imgInSlot);
        imgInSlot.draggable = true;
      }
    });

    setMessage("");
  });

});
