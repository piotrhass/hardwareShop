function addToCart(id) {
  const productName = document.getElementById(`productName${id.slice(-1)}`).innerHTML;
  const productPrice = document.getElementById(`productPrice${id.slice(-1)}`).innerHTML;

  let cartProducts = [];
  
  cartProducts.push(mapCartItemComponent(productName, productPrice, id));

  setCart(cartProducts);
  setPrice(productPrice);
}

function mapProductComponent(product) {
  return `<div class="product">
            <div class="productBlock">
              <h3 id="productName${product.id}">${product.name}</h3>
              <img id="productImage${product.id}" src=${product.defaultImage}>
              <p id="productId${product.id}">ID: ${product.id}</p>
              <p id="productPrice${product.id}">${product.price}</p>
              <button class="btn" id="addToCartBtn${product.id}" onclick="addToCart(this.id)">            
                <span>Add to cart</span>
              </button> 
              <button class="btn" id="deleteProductBtn${product.id}" onclick="deleteProduct(${product.id})">            
                  <span>Remove</span>
              </button>
          </div>
    </div>`;
}

function mapCartItemComponent(productName, productPrice) {
  return `<div class="cartItem">
              <h3>${productName}</h3>
              <h3 class="cartPrice">${productPrice}</h3>
    </div>`;
}

function formatProduct(
  name,
  description,
  defaultImage,
  images,
  price,
  discount
) {
  return {
    name: name,
    description: description,
    defaultImage: defaultImage,
    images: images,
    price: price,
    discount: discount,
  };
}

function clearTextFields() {
  document.getElementById("nameField").value = "";
  document.getElementById("descriptionField").value = "";
  document.getElementById("defaultImageField").value = "";
  document.getElementById("priceField").value = "";
  document.getElementById("discountField").value = "";
  document.getElementById("idField").value = "";
  document.getElementById("searchField").value = "";
}

function getTextFieldProductValue() {
  const nameValue = document.getElementById("nameField").value;
  const descriptionValue = document.getElementById("descriptionField").value;
  const defaultValue = document.getElementById("defaultImageField").value;
  const priceValue = document.getElementById("priceField").value;
  const discountValue = document.getElementById("discountField").value;

  return formatProduct(
    nameValue,
    descriptionValue,
    defaultValue,
    [],
    priceValue,
    discountValue
  );
}

async function searchProduct() {
  let productsList = document.getElementById("productsList");
  productsList.innerHTML = "";

  const productName = document.getElementById("searchField").value;
  const products = await getProductByName(productName);

  let elements = [];
  products.forEach((product) => {
    elements.push(mapProductComponent(product));
  });

  productsList.insertAdjacentHTML("beforeend", elements);
}

async function setProductList() {
  const products = await getProducts();

  let elements = [];
  products.forEach((product) => {
    elements.push(mapProductComponent(product));
  });

  const productsList = document.getElementById("productsList");
  productsList.insertAdjacentHTML("beforeend", elements);
}

function setPrice(price) {
  const totalElement = document.getElementById("total");
  let total = totalElement.innerHTML;
  const newTotal = parseInt(total) + parseInt(price);

  totalElement.innerHTML = totalElement.innerHTML.replace(total, newTotal.toString());
}

function setCart(cart) {
  const cartProducts = document.getElementById("cartProducts");
  cartProducts.insertAdjacentHTML("beforeend", cart);
}
