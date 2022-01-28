async function getProducts() {
  try {
    const products = await fetch("http://localhost:8080/products");
    const product = await products.json();

    return product;
  } catch (e) {
    console.error(e);
  }
}

async function postProduct() {
  const product = getTextFieldProductValue();

  try {
    await fetch("http://localhost:8080/products", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }).then(async (resp) => {
      if (resp.status === 201) {
        await searchProduct();
        alert("Product Added");
      } else {
        alert("Couldn't add the product");
      }
      clearTextFields();
    });
  } catch (e) {
    console.error(e);
  }
}

async function updateProduct() {
  const product = getTextFieldProductValue();
  const id = document.getElementById("idField").value;

  try {
    await fetch(`http://localhost:8080/products/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }).then(async (resp) => {
      if (resp.status === 200) {
        await searchProduct();
        alert("Product Updated");
      } else {
        alert("Couldn't update the product");
      }
      clearTextFields();
    });
  } catch (e) {
    console.error(e);
  }
}

async function deleteProduct(id) {
  try {
    await fetch(`http://localhost:8080/products/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(async (resp) => {
      if (resp.status === 200) {
        alert("Product Removed");
        await searchProduct();
      } else {
        alert("Product Not Found");
      }
    });
  } catch (e) {
    console.error(e);
  }
}

async function getProductByName(productName) {
  try {
    const products = await fetch(
      `http://localhost:8080/products?q=${productName}`
    );
    let product = await products.json();

    return product;
  } catch (e) {
    console.error(e);
  }
}
