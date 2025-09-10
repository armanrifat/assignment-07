// Cart container select
const cartContainer = document.querySelector(".col-span-2 p");

// Select all Add to Cart buttons
const addToCartButtons = document.querySelectorAll(".btn.btn-primary");

// প্রতিটা বাটনের জন্য ইভেন্ট যোগ করলাম
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cartContainer.textContent = "You added an item to your cart! 🎉";
  });
});

