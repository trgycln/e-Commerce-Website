const categoryList = document.getElementById("category-list");
const productsList = document.getElementById("product-list");
const basketBtn = document.getElementById("basketBtn");
const closeBtn = document.getElementById("closeBtn");
const modalBasket = document.querySelector(".modal-basket");
const basketContent = document.getElementById("basket-content");
const expenseDisplay = document.getElementById("expense-display");
const totalAmountSpan = document.getElementById("total-amount")

// Verilerin ne zaman çekileceği
document.addEventListener("DOMContentLoaded", () => {
  fetchCategories();
  fetchProducts();
});

// Kategorilerin APİ'den çekilmesi (fetch ile)
const fetchCategories = () => {
  fetch("https://api.escuelajs.co/api/v1/categories")
    .then((res) => res.json())
    .then((data) => {
      data.slice(0, 4).forEach((category) => {
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
			<div class=" relative">
				<img src="${category.image}" alt="">
					<p id="card-text" class="bg-gray-200 md:py-5 text-center text-sm md:text-lg md:font-bold right-3">${category.name}</p>
			</div>
			`;
        categoryList.appendChild(categoryDiv);
      });
    });
};

// Ürünlerin APİ'den çekilmesi
const fetchProducts = () => {
  fetch("https://api.escuelajs.co/api/v1/products")
    .then((res) => res.json())
    .then((data) => {
      data.slice(0, 35).forEach((product) => {
        const productsDiv = document.createElement("div");
        productsDiv.classList.add(
          "sm:basis-1/4",
          "md:basis-1/5",
          "flex-wrap",
          "m-3",
          "text-center",
          "product-div"
        );
        productsDiv.innerHTML = `
					<img class="rounded-lg object-cover" src="${product.images[0]}" alt="">
					<p class="font-bold">${product?.title}</p>
					<p class="opacity-70">${product?.description.substring(0, 50)}...</p>
					<div>
					<span class="font-bold text-green-800">${product?.price} TL</span>
		 			<button onclick='addProduct({id:"${
            product.id
          }", description:"${product.description.substring(0, 50)}", title:"${
          product.title
        }",img:"${product.images[0]}",price:"${
          product.price
        }", amount:1})' class="bg-indigo-600 w-full rounded-lg text-white">SEPETE EKLE</button>
					</div>
					
		`;
        productsList.appendChild(productsDiv);
      });
    });
};

// Sepete ürün ekleme

let sepet = [];
let harcananMiktar = 0;
let totalAmount=0

const addProduct = (product) => {
  const foundedItem = sepet.find((item) => item.id === product.id);

  if (foundedItem) {
    foundedItem.amount += 1;
  } else {
    sepet.push(product);
  }

  totalAmount+=product.amount
  totalAmountSpan.innerText=`${totalAmount}`

};


// Sepetin içerisini ekrana basma
const listProduct = () => {
  sepet.forEach((product) => {
    const basketItems = document.createElement("div");
    basketItems.classList.add(
      "basket-items",
      "p-2",
      "flex",
      "justify-between",
      "items-center",
      "space-x-5"
    );
    basketItems.innerHTML = `
	<div class="basket-items p-2 flex justify-between items-center space-x-5 shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)]">
	<div class="w-1/5">
		<img
		  class="rounded-lg"
		  src="${product.img}"
		  alt=""
		/>
	  </div>
	  <div class="text-[0.7rem] flex items-center justify-between flex-1">
		<div>
		  <p class="md:text-lg">${product.title}</p>
		</div>
		<p class="md:text-lg font-bold"><span>${product.price}</span> TL</p>
	  </div>
	  <div><span class="text-sm text-white rounded-full px-2 bg-blue-500">${product.amount}</span></div>
	  <div>
		<button "
		  class="bg-red-500 text-white px-2 rounded-sm hover:opacity-70 text-[0.7rem]"
		>
		  SİL
		</button>
	  </div>
</div>
	`;
    basketContent.appendChild(basketItems);

		// Toplam harcamanın ekrana basılması
	harcananMiktar+=Number(product.price) * product.amount;
	expenseDisplay.innerText = `${harcananMiktar}`;

  });
};


// Sepeti açma/kapama

const toggleBasket = () => {
  modalBasket.classList.toggle("active");
};

basketBtn.addEventListener("click", () => {
  toggleBasket();
  listProduct();
});

closeBtn.addEventListener("click", () => {
  toggleBasket();
  basketContent.innerHTML=" "
  harcananMiktar=0
});




