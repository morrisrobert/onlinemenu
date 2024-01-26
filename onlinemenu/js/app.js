const confirmBtn = document.getElementById("confirmBtn");
const totalDisplay = document.getElementById("total");
const cartSubtotal = document.getElementById("cartSubtotal");
const menuDivs = document.querySelectorAll(".menu-div");
const receipt = document.getElementById("receipt");

let subtotal = 0;
let tax = 0.07;
let receiptArray = [];

const menuType = [
    "appetizers",
    "entrees",
    "drinks",
    "desserts"
]

//array of menu objects
let menuItems = [{
        id: 1,
        type: 'appetizers',
        item: 'salmon dip',
        desc: 'fresh salmon spread and toast',
        imgUrl: 'rumcake.jpg',
        price: 10.99,
        qty: 0,
    },
    {
        id: 2,
        type: 'entrees',
        item: 'beef patty',
        desc: 'savory beef patty from our selection',
        imgUrl: 'minibeefpatties.jpg',
        price: 30.00,
        qty: 0,
    },
    {
        id:3,
        type:'drinks',
        item: 'rum',
        desc: 'its rumcake my guy',
        imgUrl: 'rumcake.jpg',
        price: 8.00,
        qty: 0,
    },
    {
        id:4,
        type:'desserts',
        item: 'mango',
        desc: 'cheese thats a cake mayne',
        imgUrl: 'mangocheesecake.jpg',
        price: 25.00,
        qty: 0
    },
    {
        id:5,
        type: 'entrees',
        item: 'oxtails',
        desc: 'have you ever seen an ox in america?',
        imgUrl: 'oxtails.jpg',
        price: 28.00,
        qty: 0
    },
    {
        id:6,
        type: 'drinks',
        item: 'soft drink',
        desc: 'Some soda drink',
        imgUrl: 'cansoda.jpg',
        price: 4.00,
        qty: 0
    },
    {
        id:7,
        type: 'appetizers',
        item: 'cabbage',
        desc: 'spiced cabbage',
        imgUrl: 'cabbage.jpg',
        price: 8.00,
        qty: 0
    },
    {
        id:8,
        type: 'desserts',
        item: 'salfishfritters',
        desc: 'yup',
        imgUrl: 'saltfishfritters.jpg',
        price: 4.00,
        qty: 0
    }

]



confirmBtn.addEventListener("click", (e)=> {
    e.preventDefault()
    //function that will calculate the total amt the customer pays
    getTotal();
});

const getTotal =()=> {
    const subtotal = parseFloat(cartSubtotal.innerText);
    const tipAmt = parseFloat(document.getElementById("tipAmt").value);
    const otherAmt = parseFloat(document.getElementById("otherAmt").value);
    const yourTip = document.getElementById("tipTotal");
    const theSubtotal = document.getElementById("theSubtotal");
    const taxDispay = document.getElementById("tax");

    let taxTotal = subtotal * tax;
    console.log(`this is the amount of tax to be charged: ${taxTotal}`);

    let receiptTip = isNaN(tipAmt) ? otherAmt : (subtotal * tipAmt);
    console.log(`this is the amount of tip calculated: ${receiptTip}`);

    let total = isNaN(tipAmt) ? subtotal + taxTotal + otherAmt : subtotal + taxTotal + receiptTip;
    console.log(`this is the total to pay: ${total}`);

    theSubtotal.innerText = subtotal;
    taxDispay.innerText = taxTotal.toFixed(2);
    yourTip.innerText = receiptTip.toFixed(2);
    totalDisplay.innerText = total.toFixed(2);
}

//make a receipt that populates food order information based on the menu items listed in the array
const makeReceipt = (obj, el) => {
    const tableRow = document.createElement("tr");
    tableRow.classList.add("receipt-item");

    const receiptChoice = document.createElement("td");
    receiptChoice.classList.add("receipt-choice", "text-center");

    const receiptQty = document.createElement("td");
    receiptQty.classList.add("receipt-qty", "text-center");
    receiptQty.setAttribute("id",`qty${obj.id}`);
    receiptQty.innerText = obj.qty;

    const receiptPrice = document.createElement("td");
    receiptPrice.classList.add("receipt-price", "text-center");
    receiptPrice.innerText = obj.price;

    const itemSubtotal = document.createElement("id");
    itemSubtotal.classList.add("item-subtotal", "text-center");
    itemSubtotal.setAttribute("id", `subTotal${obj.id}`);
    itemSubtotal.innerText = obj.itemTotal;

    tableRow.appendChild(receiptChoice);
    tableRow.appendChild(receiptQty);
    tableRow.appendChild(receiptPrice);
    tableRow.appendChild(itemSubtotal);
};

const updateReceipt = (obj, qty, itemTotal) =>{
    const receiptQty = document.getElementById(`qty${obj.id}`);
    receiptQty.innerText = qty;

    const itemSubtotal = document.getElementById(`subTotal${obj.id}`);
    itemSubtotal.innerText = itemTotal.toFixed(2);

    console.log(receiptArray);
}

//create menu type labes for each category of food
menuDivs.forEach(div =>{
    const menuSubheading = document.createElement("h3");
    menuSubheading.classList.add("menu-subheading", "text-capitalize");

    const row = document.createElement("div");
    row.classList.add("row");

    div.appendChild(menuSubheading);
    div.appendChild(row);
});

for(let i = 0; i < menuType.length; i++) {
    menuDivs[i].children[0].innerText = menuType[i]
    menuDivs[i].children[1].setAttribute("id", `${menuType[i]}Row`)
}

//populate menu items
//put the food type rows into containers in the DOM

const appRow = document.getElementById("appetizersRow");
const entreesRow = document.getElementById("entreesRow");
const drinksRow = document.getElementById("drinksRow");
const dessertsRow = document.getElementById("dessertsRow");

//take each object in the MenuItems array create a column div for the card to "live" in and then create a card div for the HTML we created to occupy
menuItems.forEach(item => {
    const column = document.createElement("div");
    column.classList.add("col-md-3");

    const card = document.createElement("div");
    card.classList.add("card", "h-100");
    
    card.innerHTML = `<img src="images/${item.imgUrl}" alt="${item.desc}" class="img-fluid menu-img card-image-top"/>
    <div class="card-body">
        <h4 class="card-title text-capitalize item-item">${item.item}</h4>
        <p class="card-text text-uppercase item-desc">${item.desc}</p>
    </div>
    <footer class="card-footer">
        <p class="card-text item-price">$${item.price}</p>
                    <div class="buttons-div d-flex">
                        <button 
                        class="btn btn-primary cart-btn text-capitalize"
                        id="Btn${item.id}"
                        data-id="${item.id}"
                        data-price="${item.price}"
                        data-qty="${item.qty}"
                        data-item="${item.item}"
                        >add to cart</button>
                        <div class="qty-div">
                            <button
                            class="btn btn-secondary btn-subtract"
                            id="btnSubtract${item.id}"
                            data-id="${item.id}"
                            data-qty="${item.qty}"
                            > - </button>
                            <span class="quantity" id="quantity${item.id}">${item.qty}</span>
                            <button
                            class="btn btn-secondary btn-add"
                            id="btnAdd${item.id}"
                            data-id="${item.id}"
                            data-qty="${item.qty}"
                            > + </button>
                        </div>
                    </div>
                </footer>
    
    `
    column.appendChild(card);

    // we cannot use appRow.appendChild(column), because it will push all of the menu item cards into just one section. To make our program sort the cards into the correct category, we will use a switch case. 

    switch (item.type) {
        case "appetizers":
            appRow.appendChild(column)
            break;

        case "entrees":
            entreesRow.appendChild(column)
            break;
        case "drinks":
            drinksRow.appendChild(column)
            break;
        case "desserts":
            dessertsRow.appendChild(column)
            break;
        default:
            console.log("Error menu type not listed")
            break;
    }
})

const cartButtons = document.querySelectorAll(".cart-btn")

//make the button for add to cart work
cartButtons.forEach(button => {
    const price = parseFloat(button.getAttribute("data-price"));
    const item = button.getAttribute("data-item");
    const id = parseFloat(button.getAttribute("data-id"));

    button.addEventListener("click", () => {
        let qty;
        for (let i = 0; i < menuItems.length; i++){
            menuItems[i].id == id ?  qty = menuItems[i].qty : null;
        }
        //we need to be able to add items to the receipt
        addItems(price, qty, item, id);
    })
})

const addItems = (price, qty, item, id) => {
    let itemObj = {
        id,
        item,
        qty,
        price,
        itemTotal: qty * price
    }

    receiptArray = [...receiptArray, itemObj];
    makeReceipt(itemObj, receipt);

    subtotal+= itemObj.itemTotal;
    cartSubtotal.innerText = subtotal.toFixed(2);
}

const btnSubtract = document.querySelectorAll(".btn-subtract");
const btnAdd = document.querySelectorAll("btn-add");

btnSubtract.forEach(button => {
    button.addEventListener("click", () => {
        const btnId = parseFloat(button.getAttribute("data-id"));
        const spanQty = document.getElementById(`quantity${btnId}`);
        console.log("the subtract button has been clicked");
        for (let i = 0; i < menuItems.length; i++) {
            if(menuItems[i].id == btnId && menuItems[i].qty > 0){
                menuItems[i].qty-=1
                spanQty.innerText = menuItems[i].qty
            }
        }
    })
})

btnAdd.forEach(button => {
    button.addEventListener("click", () => {
        const btnId = parseFloat(button.getAttribute("data-id"));
        const spanQty = document.getElementById(`quantity${btnId}`);

        for (let i = 0; i < menuItems.length; i++) {
            if (menuItems[i].id == btnId && menuItems[i].qty < 20 && cartButtons[i].dataset.id ==btnId) {
                menuItems[i].qty+=1

                cartButtons[i].setAttribute("data-qty", menuItems[i].qty)
                spanQty.innerText = menuItems[i].qty;
            }
        }
    })
})