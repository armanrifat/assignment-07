  // ========== Global State ==========
    let cart = [];
    let total = 0;

    // ========== API Base ==========
    const BASE_URL = "https://openapi.programming-hero.com/api";

    // ========== Spinner ==========
    const showSpinner = () => {
      document.getElementById("spinner").classList.remove("hidden");
    };
    const hideSpinner = () => {
      document.getElementById("spinner").classList.add("hidden");
    };

    // ========== Load Categories ==========
    const loadCategories = async () => {
      showSpinner();
      const res = await fetch(`${BASE_URL}/categories`);
      const data = await res.json();
      hideSpinner();
      displayCategories(data.data); // ✅ fixed
    };

    // ========== Display Categories ==========
    const displayCategories = (categories) => {
      const categoryContainer = document.getElementById("category-container");
      categoryContainer.innerHTML = "";

      categories.forEach((cat) => {
        const btn = document.createElement("button");
        btn.innerText = cat.category;
        btn.className =
          "px-4 py-2 border rounded hover:bg-green-200 transition text-left";
        btn.onclick = () => {
          // remove active class
          document.querySelectorAll("#category-container button").forEach((b) =>
            b.classList.remove("bg-green-500", "text-white")
          );
          // add active
          btn.classList.add("bg-green-500", "text-white");

          loadTreesByCategory(cat.category_id);
        };
        categoryContainer.appendChild(btn);
      });
    };

    // ========== Load Trees by Category ==========
    const loadTreesByCategory = async (id) => {
      showSpinner();
      const res = await fetch(`${BASE_URL}/category/${id}`);
      const data = await res.json();
      hideSpinner();
      displayTrees(data.data);
    };

    // ========== Display Trees ==========
    const displayTrees = (trees) => {
      const container = document.getElementById("tree-container");
      container.innerHTML = "";

      trees.slice(0, 6).forEach((tree) => {
        const card = document.createElement("div");
        card.className =
          "border rounded-lg shadow bg-white p-3 flex flex-col justify-between";

        card.innerHTML = `
          <img src="${tree.image}" class="w-full h-32 object-cover rounded">
          <h2 class="text-lg font-bold cursor-pointer text-green-700 hover:underline" onclick="showDetails('${tree.plantId}')">${tree.name}</h2>
          <p class="text-sm text-gray-600">${tree.short_description}</p>
          <p class="text-sm"><b>Category:</b> ${tree.category}</p>
          <p class="text-sm font-bold text-green-600">৳ ${tree.price}</p>
          <button onclick="addToCart('${tree.plantId}', '${tree.name}', ${tree.price})" 
            class="mt-2 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600">
            Add to Cart
          </button>
        `;

        container.appendChild(card);
      });
    };

    // ========== Show Tree Details (Modal) ==========
    const showDetails = async (id) => {
      const res = await fetch(`${BASE_URL}/plant/${id}`);
      const data = await res.json();
      const tree = data.data;

      const modal = document.getElementById("modal");
      modal.innerHTML = `
        <div class="bg-white p-5 rounded shadow-lg max-w-md mx-auto relative">
          <button onclick="closeModal()" class="absolute top-2 right-2 text-red-500">✖</button>
          <img src="${tree.image}" class="w-full h-52 object-cover rounded mb-3">
          <h2 class="text-xl font-bold">${tree.name}</h2>
          <p>${tree.description}</p>
          <p class="mt-2 font-bold text-green-600">৳ ${tree.price}</p>
        </div>
      `;
      modal.classList.remove("hidden");
    };

    const closeModal = () => {
      document.getElementById("modal").classList.add("hidden");
    };

    // ========== Add to Cart ==========
    const addToCart = (id, name, price) => {
      cart.push({ id, name, price });
      total += price;
      updateCart();
    };

    // ========== Update Cart ==========
    const updateCart = () => {
      const cartContainer = document.getElementById("cart-container");
      cartContainer.innerHTML = "";

      cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.className =
          "flex justify-between items-center bg-gray-100 p-2 rounded mb-2";
        div.innerHTML = `
          <span>${item.name}</span>
          <span>৳ ${item.price}</span>
          <button onclick="removeFromCart(${index})" class="text-red-500">❌</button>
        `;
        cartContainer.appendChild(div);
      });

      document.getElementById("total-price").innerText = `৳ ${total}`;
    };

    // ========== Remove from Cart ==========
    const removeFromCart = (index) => {
      total -= cart[index].price;
      cart.splice(index, 1);
      updateCart();
    };

    // ========== Initialize ==========
    loadCategories();