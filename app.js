/*Интернет-магазин:Создайте простой интернет-магазин с использованием HTML, CSS и JavaScript, где можно добавлять, удалять и редактировать товары.
Задачи на JavaScript: Реализуйте функциональность добавления товаров в корзину, расчет общей стоимости и оформление заказа.*/
let openKorzina = document.querySelector('.korzina-open');
let closeKorzina = document.querySelector('.korzina-close-img');
let catalog = document.querySelector('.catalog');
let card = document.querySelector('.korzina-cards');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let kolichestvo = document.querySelector('.header-kolichestvo');

openKorzina.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeKorzina.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Крем-мёд<br>с манго и апельсином',
        name2: 'Крем-мёд с манго и апельсином',
        image: '1.PNG',
        price: 400        
    },
    {
        id: 2,
        name: 'Крем-мёд<br>с черникой',
        name2: 'Крем-мёд с черникой',
        image: '2.PNG',
        price: 300
    },
    {
        id: 3,
        name: 'Крем-мёд<br>с яблоком и корицей',
        name2: 'Крем-мёд с яблоком и корицей',
        image: '3.PNG',
        price: 250
    },
    {
        id: 4,
        name: 'Крем-мёд<br>с облепихой',
        name2: 'Крем-мёд с облепихой',
        image: '4.PNG',
        price: 300
    },
    {
        id: 5,
        name: 'Крем-мёд<br>с клубникой',
        name2: 'Крем-мёд с клубникой',
        image: '5.PNG',
        price: 250
    },
    {
        id: 6,
        name: 'Крем-мёд<br>с имбирём и лимоном',
        name2: 'Крем-мёд с имбирём и лимоном',
        image: '6.PNG',
        price: 250
    },
    {
        id: 7,
        name: 'Крем-мёд<br>с малиной',
        name2: 'Крем-мёд с малиной',
        image: '7.PNG',
        price: 400
    },
    {
        id: 8,
        name: 'Крем-мёд<br>с чёрной смородиной',
        name2: 'Крем-мёд с чёрной смородиной',
        image: '8.PNG',
        price: 300
    }
];

let cards = [];

function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `

                <img src="image/${value.image}">

                <div class="item-title">${value.name}</div>

                <div class="space-between">
                    <div class="centering">
                        <div class="price">${value.price.toLocaleString()}</div>
                        <div>&#8381</div>
                    </div>
                    <button onclick="addToCard(${key})" class="background-orange item-button"><img src="image/basket.svg" class="cursor-pointer item-button-img"></button>
                </div>`;
        catalog.appendChild(newDiv);
    })
}

initApp();

function addToCard(key){
    if(cards[key] == null){
        cards[key] = JSON.parse(JSON.stringify(products[key]));
        cards[key].kolichestvo = 1;
    }
    reloadCard();
}

function reloadCard(){
    card.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    cards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.kolichestvo;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div class="kcard space-between">

                    <div><img src="image/${value.image}"></div>

                    <div class="name-card">
                        <div>${value.name2}</div>
                        <div>${value.price.toLocaleString()}&#8381</div>
                        <div class="count">
                            <button onclick="changeQuantity(${key}, ${value.kolichestvo - 1})" class="plus-minus">-</button>
                            <div class="value-kolichestvo">${value.kolichestvo}</div>
                            <button onclick="changeQuantity(${key}, ${value.kolichestvo + 1})" class="plus-minus">+</button>                   
                        </div>
                    </div>
                    
                    <button onclick="deleteQuantity(${key}, ${value.kolichestvo})"><img src="image/trash.png" alt="корзина" class="korzina-trash" ></button>
                    
                </div >`;
            card.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    kolichestvo.innerText = count;
}

function changeQuantity(key, kolichestvo){
    if(kolichestvo == 0){
        delete cards[key];
    }else{
        cards[key].kolichestvo = kolichestvo;
        cards[key].price = kolichestvo * products[key].price;
    }
    reloadCard();
}

function deleteQuantity(key, kolichestvo) {
    delete cards[key];    
    reloadCard();
}