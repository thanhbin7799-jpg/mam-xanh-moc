const DISHES_KEY = "huongViVietDishes";
const BOOKINGS_KEY = "huongViVietBookings";

const categoryLabels = {
  main: "Món chính",
  street: "Đường phố",
  dessert: "Tráng miệng"
};

const form = document.querySelector(".content-form");
const search = document.querySelector(".manager-search");
const contentList = document.querySelector(".content-list");
const bookingList = document.querySelector(".booking-list");
const toast = document.querySelector(".toast");
const resetButton = document.querySelector(".reset-content");
const clearBookingsButton = document.querySelector(".clear-bookings");

let currentSearch = "";

function getDishes() {
  try {
    return JSON.parse(localStorage.getItem(DISHES_KEY)) || [];
  } catch {
    return [];
  }
}

function saveDishes(dishes) {
  localStorage.setItem(DISHES_KEY, JSON.stringify(dishes));
}

function getBookings() {
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
  } catch {
    return [];
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

function makeId(name) {
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return `${slug || "mon-an"}-${Date.now()}`;
}

function resetForm() {
  form.reset();
  form.elements.id.value = "";
  document.querySelector(".save-content").textContent = "Lưu món";
}

function renderDishes() {
  const query = currentSearch.trim().toLowerCase();
  const dishes = getDishes().filter((dish) => {
    const text = `${dish.name} ${dish.tag} ${dish.price} ${dish.description}`.toLowerCase();
    return text.includes(query);
  });

  if (!dishes.length) {
    contentList.innerHTML = '<p class="empty">Chưa có món phù hợp. Hãy thêm món mới hoặc đổi từ khóa tìm kiếm.</p>';
    return;
  }

  contentList.innerHTML = dishes.map((dish) => `
    <article class="content-row" data-id="${dish.id}">
      <img src="${dish.image}" alt="${dish.alt || dish.name}">
      <div>
        <h3>${dish.name}</h3>
        <p>${categoryLabels[dish.category] || dish.tag} · <span class="price">${dish.price}</span></p>
        <p>${dish.description}</p>
      </div>
      <div class="row-actions">
        <button class="secondary edit-content" type="button">Sửa</button>
        <button class="danger delete-content" type="button">Xóa</button>
      </div>
    </article>
  `).join("");
}

function renderBookings() {
  const bookings = getBookings();

  if (!bookings.length) {
    bookingList.innerHTML = '<p class="empty">Chưa có yêu cầu đặt bàn nào.</p>';
    return;
  }

  bookingList.innerHTML = bookings.map((booking) => `
    <article class="booking-row">
      <div>
        <h3>${booking.name}</h3>
        <p>${booking.guests} · Buổi ${booking.session.toLowerCase()} · ${booking.time}</p>
        <p>Gửi lúc: ${booking.createdAt}</p>
      </div>
      <button class="secondary delete-booking" type="button" data-id="${booking.id}">Xóa</button>
    </article>
  `).join("");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const id = data.get("id");
  const name = data.get("name").trim();
  const category = data.get("category");
  const dish = {
    id: id || makeId(name),
    name,
    category,
    tag: categoryLabels[category],
    price: data.get("price").trim(),
    image: data.get("image").trim(),
    description: data.get("description").trim(),
    alt: name
  };

  const dishes = getDishes();
  const nextDishes = id
    ? dishes.map((item) => item.id === id ? dish : item)
    : [dish, ...dishes];

  saveDishes(nextDishes);
  resetForm();
  renderDishes();
  showToast(id ? "Đã cập nhật món ăn." : "Đã thêm món mới.");
});

contentList.addEventListener("click", (event) => {
  const row = event.target.closest(".content-row");
  if (!row) return;

  const dishes = getDishes();
  const dish = dishes.find((item) => item.id === row.dataset.id);
  if (!dish) return;

  if (event.target.closest(".edit-content")) {
    form.elements.id.value = dish.id;
    form.elements.name.value = dish.name;
    form.elements.category.value = dish.category;
    form.elements.price.value = dish.price;
    form.elements.image.value = dish.image;
    form.elements.description.value = dish.description;
    document.querySelector(".save-content").textContent = "Cập nhật món";
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (event.target.closest(".delete-content")) {
    saveDishes(dishes.filter((item) => item.id !== dish.id));
    renderDishes();
    showToast("Đã xóa món khỏi thực đơn.");
  }
});

bookingList.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-booking");
  if (!button) return;

  const bookings = getBookings().filter((booking) => booking.id !== button.dataset.id);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  renderBookings();
  showToast("Đã xóa yêu cầu đặt bàn.");
});

search.addEventListener("input", () => {
  currentSearch = search.value;
  renderDishes();
});

resetButton.addEventListener("click", resetForm);

clearBookingsButton.addEventListener("click", () => {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify([]));
  renderBookings();
  showToast("Đã xóa tất cả đặt bàn.");
});

renderDishes();
renderBookings();
