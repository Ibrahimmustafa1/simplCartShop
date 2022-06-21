let row = document.getElementById('row');
let tbody = document.getElementById('tablebody');
let addBtns = document.querySelector('.row')
let totalPrice = document.createElement("h2")
let emptyCartbtn = document.getElementById('emptycart')
let x = document.querySelector("#totalprice")
let inCart = false
let cartProducts = []
let productsList = [
    {
        name: "SSD",
        price: 200,
        img: "https://m.media-amazon.com/images/I/31DCbP9ocHL._AC_SY350_.jpg",
    },
    {
        name: "Laptop",
        price: 1200,
        img: "https://cdn.mgig.fr/2021/10/mg-b8235cc6-w3000-w828-w2600-w1300.jpg",
    },
    {
        name: "Monitor",
        price: 500,
        img: "http://cdn.shopify.com/s/files/1/0577/7371/9758/products/f24t350fhm-03_1200x1200.jpg?v=1652178297",
    },
    {
        name: "0123",
        price: 600,
        img: "http://cdn.shopify.com/s/files/1/0577/7371/9758/products/f24t350fhm-03_1200x1200.jpg?v=1652178297",
    }

]
let displayProducts = () => {
    let displayedProducts = ``
    for (let i = 0; i < productsList.length; i++) {
        displayedProducts += `
        <div class="col-md-4 mb-2">
        <div class="product">
        <h2 class="text-center name">${productsList[i].name}</h2>
            <img src=${productsList[i].img}
                class="w-100 img" alt="">
            <div class=" d-flex justify-content-between p-2">
                <div class="d-flex align-items-center price">
                    <p class="m-0">${productsList[i].price}$</p>
                </div>
                <button class="btn btn-primary">add to cart</button>
            </div>
        </div>
    </div>
        `
    }
    row.innerHTML = displayedProducts
}
addBtns.addEventListener('click', (e) => {
    if (e.target.nodeName == 'BUTTON') {
        let price = e.target.parentElement.parentElement.querySelector('.price').innerText
        let img = e.target.parentElement.parentElement.querySelector('.img').src
        let name = e.target.parentElement.parentElement.querySelector('.name').innerText
        addToCart(name, img, price)
    }

})

let addToCart = (name, img, price) => {
    if (checkIfExsixt(name)[0]) {
        cartProducts.push({ name, img, price })
        let cartProduct = document.createElement('tr')
        cartProduct.innerHTML = ` <tr>
        <td class="w-25">
            <div class="d-flex justify-content-between">
                <div class="img d-flex align-items-center">
                    <img src=${img}
                        class="w-50" alt="">
                </div>
                <div class="productname mt-4">
                    <p>${name}</p>
                </div>
            </div>
        </td>
        <td class="w-25 text-center price">

            <p class="mt-4">${price}</p>

        </td>
        <td class="w-25 text-center">
            <input type="number" min="1" class="mt-3 w-50" value="1">
        </td>
        <td class="w-25 text-center"><button class="btn btn-danger mt-3">Delete</button></td>
    </tr>
        `

        tbody.appendChild(cartProduct)
        updateTotalPrice()

    }
    else alert(`${name} already added`)
}
let checkIfExsixt = (name) => {
    for (let product of cartProducts) {
        if (product.name == name)
            return [false, product]
    }
    return [true, false]
}

tbody.addEventListener('click', (e) => {
    if (e.target.nodeName == 'BUTTON') {
        let name = e.target.parentElement.parentElement.querySelector('.productname').innerText
        for (let i = 0; i < cartProducts.length; i++) {
            if (cartProducts[i].name === name) {
                cartProducts.splice(i, 1)
                break;
            }
        }
        e.target.parentElement.parentElement.remove()
        updateTotalPrice()
    }
})
tbody.addEventListener('change', (e) => {
    let price = 0
    if (e.target.nodeName == 'INPUT') {
        if (e.target.value <= 0) e.target.value = '1'
        let name = e.target.parentElement.previousElementSibling.previousElementSibling.children[0].innerText
        let item = checkIfExsixt(name)[1]

        if (item) {
            e.target.parentElement.previousElementSibling.children[0].innerText = `${Number(item.price.replace('$', '')) * Number(e.target.value)}$`
            updateTotalPrice()
        }
    }
})
let updateTotalPrice = () => {
    let inputs = document.querySelectorAll('input')
    let total = 0;
    for (let i = 0; i < cartProducts.length; i++) {
        total += Number(cartProducts[i].price.replace('$', '')) * Number(inputs[i].value)
    }
    totalPrice.innerText = `${total}$`
    x.append(totalPrice)
}
emptyCartbtn.addEventListener('click', (e) => {
    let i = 0
    console.log(cartProducts.length)
    for (let item of cartProducts) {
        e.target.parentElement.previousElementSibling.children[1].children[0].remove()
        i++;
    }
    cartProducts = []
    updateTotalPrice()
})
displayProducts()