let carrinho = document.querySelector('.cart-container')

document.querySelector('#cart-btn').onclick = () => {
    carrinho.classList.toggle('active');
}

document.querySelector('#close-cart-btn').onclick = () => {
    carrinho.classList.remove('active');
}







// Verificaçao //
if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready()
}

var totalAmount = "0,00"

// Events //
function ready() {
    const removeProductButton = document.getElementsByClassName("remove-btn");
    console.log(removeProductButton)
    for (var i = 0; i < removeProductButton.length; i++) {
        removeProductButton[i].addEventListener("click", RemoveProduct)   
    }

    const quantidyInputs = document.getElementsByClassName("product-qtd-input")
    for (var i = 0; i < quantidyInputs.length; i++){
        quantidyInputs[i].addEventListener("change", CheckIfInputIsNull)
    }

    const addToCartButton = document.getElementsByClassName("add-btn")
    for (var i = 0; i < addToCartButton.length; i++) {
        addToCartButton[i].addEventListener("click", addProductToCart)
    }

    const purchaseButton = document.getElementsByClassName("purchase-button")[0]
    purchaseButton.addEventListener("click", makePurchase)
}

function makePurchase() {
    if (totalAmount === "0,00") {
        alert("Seu Carrinho está vazio!")
    } else {
        alert(
            `
            Obrigado pela sua compra!
            Valor do pedido: R$${totalAmount}
            Volte sempre :)
            `
        )
    }

    document.querySelector(".cart-table tbody").innerHTML = ""
    updateTotal()
}

function CheckIfInputIsNull(event) {
    if (event.target.value === '0') {
        event.target.parentElement.parentElement.remove()
    }
    updateTotal()
}



 // Função que remove produto //
function RemoveProduct(event) {
    event.target.parentElement.parentElement.remove()
    updateTotal()
}




// Atualização do preço total //
function updateTotal() {
    totalAmount = 0
    const cartProducts = document.getElementsByClassName("cart-product");

    for (var i = 0; i < cartProducts.length; i++) { 
        //console.log(cartProducts[i])
        const productPrice = cartProducts[i].getElementsByClassName("price")[0].innerText.replace("R$", "").replace(",", ".")
        const productQuantidy = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value
    

        totalAmount += (productPrice * productQuantidy)
    }

    totalAmount = totalAmount.toFixed(2)
    totalAmount = totalAmount.replace(".", ",")
    document.querySelector(".cart-total-container span").innerText = "R$" + totalAmount;
}



// Adicionar produto //
function addProductToCart(event) {
    const button = event.target
    const productInfo = button.parentElement.parentElement
    const productImage = productInfo.getElementsByClassName("img")[0].src
    const productTitle = productInfo.getElementsByClassName("name")[0].innerHTML
    const productPrice = productInfo.getElementsByClassName("price")[0].innerHTML

    const productsCartName = document.getElementsByClassName("cart-product-title")
    for (var i = 0; i < productsCartName.length; i++){
        if (productsCartName[i].innerHTML === productTitle) {
            productsCartName[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
            return
        }
    }

    let newCartProduct = document.createElement("tr")
    newCartProduct.classList.add("cart-product")

    newCartProduct.innerHTML = 
    `<td>
        <div class="cart-product-image">
            <img src="${productImage}" alt="${productTitle}">
        </div>
        <strong class="cart-product-title">${productTitle}</strong>
    </td>
    <td>
        <div class="price">${productPrice}</div>
    </td>
    <td class="qtd">
        <input type="number" value="1" min="0" class="product-qtd-input">
        <button class="btn-cart remove-btn">Remover</button>
    </td>`

    const tableBody = document.querySelector(".cart-table tbody")
    tableBody.append(newCartProduct)
    updateTotal()
    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", CheckIfInputIsNull)
    newCartProduct.getElementsByClassName("remove-btn")[0].addEventListener("click", RemoveProduct)
}