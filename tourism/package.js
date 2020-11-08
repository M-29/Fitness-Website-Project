let carts =document.querySelectorAll('.add-cart');

let products=[
    {
        name:'three-month',
        tag:'3',
        price:4000,
        inCart: 0
    },
    {
        name:'four-month',
        tag:'4',
        price:6000,
        inCart: 0
    },
    {
        name:'five-month',
        tag:'5',
        price:8000,
        inCart: 0
    },
    {
        name:'six-month',
        tag:'6',
        price:9000,
        inCart: 0
    }
]
for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click',()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}
function onLoadCartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector(".cart span").textContent=productNumbers;
    }
}
function cartNumbers(product){
    
    let productNumbers =localStorage.getItem('cartNumbers');
    productNumbers=parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers + 1);
        document.querySelector('.cart span').textContent=productNumbers + 1;
    }
    else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent=1;
    }
    setItems(product);
}

function setItems(product){
    let cartItems =localStorage.getItem
    ("productInCart");
   cartItems = JSON.parse(cartItems);
    if(cartItems!=null){
        
        if(cartItems[product.tag] ==undefined){
            cartItems ={
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart = 1;
        cartItems = {[product.tag]:product}   
    }
   
    
    localStorage.setItem("productInCart",JSON.stringify(cartItems));
}
function totalCost(product){
    //console.log("the product price is",product.price);
    let cartCost = localStorage.getItem('totalCost');
    
    if(cartCost!=null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost',cartCost + product.price);
    }
    else{localStorage.setItem("totalCost",product.price);}
    
}
function displayCart(){
    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML = ' ';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class ="product">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src="./images/${item.tag}.jpg">
            <span>${item.name}</span>
            </div>
            <div class = "price">${item.price}</div>
            <div class =quantity">
            <ion-icon name="add-circle-outline"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon name="remove-circle-outline"></ion-icon>
            </div>
            <div class="total">
            $${item.inCart + item.price},00
            </div>
            `
        });
        productContainer.innerHTML +=`
            <div class="baskeyTotalContainer">
            <h4 class="basketTotalTitle">
                 Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost},00
                    </h4>
                    </div>
        `;
    }

}
onLoadCartNumbers();
displayCart();