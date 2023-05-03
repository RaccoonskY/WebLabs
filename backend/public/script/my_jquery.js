class Product{
    constructor(name,rating,image_src, product_sold, id = undefined){
        id = typeof id !== 'undefined'? id: crypto.randomUUID().slice(1,7);
        this.id = id;
        this.name = name;
        this.rating = rating;
        this.image = image_src;
        this.sold = product_sold;
    }
    getHTML(){
        return `<div class="product-item id=${this.id}">
               <a class="product-item__link"  href="#" style="text-decoration: none;">
                   <img class="product__icon" src="${this.image}">
                   <p class="product__name product__text">${this.name}</p>
                   <div class="product-item__rating ">
                       <p class="product-rating product__text"> <img class="rating-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Red_star.svg/1235px-Red_star.svg.png"><span class="rating">${this.rating }</span></p>
                       <p class="product-sold product__text">${this.sold+' покупок'}</p>
                   </div>
                   <p class="product-cost product__text"></p>
               </a>
           </div>`
    }
}
function setProductsIds(){
    $(".product-item").each(()=> {
        $(this).attr('#id', `${crypto.randomUUID().slice(1,7)}`)
    });
}


function getProductsIds(){
    let idArr = [];
    $(".product-item").each(()=> {
        idArr.push($(this).attr('#id'));
    });
    return idArr;
}

function appendProductToRender(new_elem){
    new_elem = $(new_elem.getHTML());
    $(".main-content").append(new_elem);
    $(new_elem).on("click",function(){
        $(".product-item").removeClass("active");
        $(new_elem).addClass("active");
        return false;
    });
}

function addNewProduct(name){
    let data_form = document.querySelector('.add-product-container form');
    data_form = new FormData(data_form);
    let new_elem = new Product(data_form.get('name'),data_form.get('rating'),data_form.get('image'),data_form.get('sold'));
    let request = new XMLHttpRequest();
    request.open("POST", "/products/add", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(new_elem));

    appendProductToRender(new_elem);
}

function addNewProductStrs(name, rating, image,sold,id){
    let new_elem = new Product(name,rating,image,sold,id);
    appendProductToRender(new_elem);
}
function addNewMessageStrs(text, color){
    let new_msg =  document.createElement("p");
    new_msg.innerHTML = text;
    new_msg.style.color = color;
    $(".fc__items").append($(new_msg));
}
$(document).ready( function () {

    //добавление и получение id существующих эл-ов
    /*    setProductsIds();
        let productsIds = getProductsIds();
        productsIds.forEach((elem)=>{
        
            console.log("ID "+ elem);
        })*/

    $.getJSON("/products",(data)=>{
        for(let i=0;i<data.messages.length;i++){
            addNewMessageStrs(data.messages[i].text, data.messages[i].color);
        }
        for(let i=0;i<data.products.length;i++){
            addNewProductStrs(data.products[i].name,data.products[i].rating, data.products[i].image,data.products[i].sold,data.products[i].id);
        }
    })


    $(".product-item").toArray().forEach((elem) => {
        $(elem).on("click", function () {
            $(".product-item").removeClass("active");
            $(elem).addClass("active");
            return false;
        });
    });

    $(".add-bttn").on('click', addNewProduct);
});