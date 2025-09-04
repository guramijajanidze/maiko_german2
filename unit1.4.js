document.addEventListener("DOMContentLoaded", () => {
    const houseItems = document.querySelectorAll(".house-item");
    const houseTexts = document.querySelectorAll(".housetext");

    houseItems.forEach(item => {
        item.addEventListener("click", () => {
            // Hide all texts first
            houseTexts.forEach(text => text.style.display = "none");

            // Show the corresponding text
            const textId = item.id + "text"; // e.g., house1 -> house1text
            const textToShow = document.getElementById(textId);
            if (textToShow) {
                textToShow.style.display = "block";
            }
        });
    });
});

