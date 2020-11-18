const container = document.querySelector('.product__area')
const cart = document.querySelector('.cart');
let cartArr = JSON.parse(localStorage.getItem('storeTest')) ? JSON.parse(localStorage.getItem('storeTest')) : []
function renderProduct() {
    container.innerHTML = "";
    
	for(let i = 0; i < data.length; i++) {
    let containsCart = '';
        for(let item of cartArr) {
            if(data[i].productId == item.productId) {
                containsCart = 'Товар уже в корзине'
            }
        }
    container.innerHTML += `
    <div id="products_section">
        <div class="products_page pg_0">
            <div class="product product_horizontal">                                
                <span class="product_code">Код: ${data[i].code.substr(5)}</span>                             
                <div class="product_photo">
                    <a href="#" class="url--link product__link">
                        <img src="${data[i].primaryImageUrl}">
                    </a>                                    
                </div>
                <div class="product_description">
                    <a href="#" class="product__link">${data[i].title}</a>
                </div>
                <p class="product_price_default">
                    <span class="retailPrice">${data[i].price} BYN</span>
                </p>
                <div class="product__wrapper">
                    <span class="inCart">${containsCart}</span>
                    <div class="product_count_wrapper">
                        <div class="stepper">
                            <input class="product__count stepper-input" type="number" value="1">
                            <span class="stepper-arrow up" onclick="plusCount(this)"></span>
                            <span class="stepper-arrow down" onclick="minusCount(this)"></span>                                            
                        </div>
                    </div>
                    <span class="btn btn_cart" data-url="/cart/" data-product-id="${data[i].productId}" onclick="addToCart(this)">
                        <svg class="ic ic_cart">
                           <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>
                        </svg>
                        <span class="ng-binding">В корзину</span>
                    </span>
                </div>
            </div>
        </div>
    </div>`	    
}

}renderProduct()

function addToCart(e) {
    let id = e.getAttribute('data-product-id');
    let count = +e.parentNode.querySelector('.product__count').value; 
    for(let item of data) {
        if(item.productId == id) {
            if(cartArr != 0) {
                for(let product of cartArr) {
                    if(item.productId == product.productId) {
                        product.count += count;
                        localStorage.setItem('storeTest', JSON.stringify(cartArr))
                        renderProduct()
                        renderCart()
                        return;
                    } 
                }
                cartArr.push(item)
                cartArr[cartArr.length - 1].count = count
            } else {
                cartArr.push(item)
                cartArr[cartArr.length - 1].count = count        
            }
        }
    }
    localStorage.setItem('storeTest', JSON.stringify(cartArr))
    renderProduct()
    renderCart()
}

function plusCount(e) {
    let input = +e.parentNode.querySelector('.product__count').value
    input += 1
    e.parentNode.querySelector('.product__count').value = input
    
}
function minusCount(e) {
    if(e.parentNode.querySelector('.product__count').value > 1) {
       e.parentNode.querySelector('.product__count').value -= 1 
    } 
}

function renderCart() {
    let cart__items = document.querySelector('.cart__items')
    let totalText = document.querySelector('.cart_totalPrice--total')
    let totalPrice = 0;
    cart__items.innerHTML = ''
    for(let item of cartArr) {
        cart__items.innerHTML += `
            <div class="cart__item">
                <img src="${item.primaryImageUrl}" alt="">
                <div class="cart_info">
                    <span class="cart__item--title"><a href="#">${item.title}</a></span>
                    <div class="counter__price">
                        <div class="cart__item--quantity">
                            <span>Количество: ${item.count}</span>
                        </div>
                        <div>
                        <span class="cart__item--price">${item.price * item.count}</span><span>  BYN</span>    
                        </div>                        
                    </div>
                </div>
                <div class="remove" remove-id="${item.productId}" onclick="removeFromCart(${item.productId})">x</div>
            </div>`  
        totalPrice += item.price * item.count      
    }
    totalText.textContent = totalPrice

}renderCart()

function removeFromCart(id) {
    for(let i = 0; i < cartArr.length; i++) {
        if(cartArr[i].productId == id) {
            cartArr.splice(i, 1)
        }
    }
    localStorage.setItem('storeTest', JSON.stringify(cartArr))
    renderProduct()
    renderCart()
}