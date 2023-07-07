const productDOM = document.querySelector('.product');
const url =
  "https://course-api.com/javascript-store-single-product";

  const fetchProduct = async () => {
  try {
    productDOM.innerHTML = '<h4 class="product-loading">Loading...</h4>';
// console.log(window.location.search);
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log(id);
    const response = await fetch(`${url}?id=${id}`);
    const data = await response.json();
    return data
  } catch (error) {
    productDOM.innerHTML = '<p class="error">There was a problem loading the product, please try again later</p>'
  }
  };

  const displayProduct = (product)=>{
   //name: title, company, price, description,image(url:img), colors

  const{company} = product.fields;
  const{price} = product.fields;
  const{name: title} = product.fields;
  const{description} = product.fields;
  const{url:img} = product.fields.image[0];
  const{colors} = product.fields;
  //colors
  const colorsList = colors.map((color)=>{
  return `<span class="product-color" style="background: ${color};"></span>`
  }).join('')

  productDOM.innerHTML = `<div class="product-wrapper">
  <img src="${img}" alt="" class="img">
  <div class="product-info">
  <h3>${title}</h3>
  <h5>${company}</h5>
  <span>$${price / 100}</span>
  <div class="colors">
    ${colorsList}
    
  </div>
  <p>${description}</p>
  <button class="btn">add to cart</button>
  </div>
</div>`

  }

  const start = async ()=>{
  const data = await fetchProduct();
  displayProduct(data);
  }
  
  start ()