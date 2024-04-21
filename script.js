let productsData = [];

function fetchProductsData() {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            productsData = data.categories;
            openCategory("");
          
        })
        .catch(error => console.error('Error fetching product data:', error));
}

function openCategory(evt, categoryName="") {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    if(categoryName)
    {
    document.getElementById(categoryName).style.display = "flex";
    evt.currentTarget.className += " active";
    }
    else{
    document.getElementById("allItems").style.display = "flex";
    }
   

    displayProducts(categoryName);
}

function displayProducts(category) {
    const categoryProducts = category ? productsData.filter(product => product.category_name === category)[0].category_products : getAllProducts(productsData);
    const productsContainer = category?document.getElementById(category): document.getElementById("allItems");
    productsContainer.innerHTML = '';

    categoryProducts.forEach(product => {
        const discount = calculateDiscount(product.compare_at_price, product.price);
        productsContainer.innerHTML += `
            <div class="product-card">
            <div class="image-container">
            ${product.badge_text ? `<div class="sale">
            <p class="offer-text">${product.badge_text}</p>
            </div>` : ``}
                <img src="${product.image}" alt="${product.title}" class="image-container">
                </div>
              <div>
              <div class="title-container">
              <p class="card-title">${product.title}</p>
              <p class="vendor"><span>&#8226;</span> ${product.vendor}</p>
              </div>
              <div class="card-price">
                <p class="effective-price">Rs ${Number(product.price).toFixed(2)}</p>
                <p class="original-price">${Number(product.compare_at_price).toFixed(2)}</p>
                <p class="discount">${discount}% off</p>
                </div>
                <button class="cart-button">Add to Cart</button>
                <div>
            </div>
        `;
    });
}

function calculateDiscount(originalPrice, salePrice) {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

function getAllProducts(data){
    const allProduct=[];
    data.forEach((category)=>{
        category.category_products.forEach((item)=>{

            allProduct.push(item)
        })
    })

    return allProduct

}

document.addEventListener('DOMContentLoaded', fetchProductsData);
