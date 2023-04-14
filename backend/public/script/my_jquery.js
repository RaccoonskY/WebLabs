class Product{
    constructor(name,rating,image_src, product_sold){
        this.id = crypto.randomUUID().slice(1,7);
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
           </div>`}
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


function addNewProduct(){
    //et new_elem = $($("#tmpl").html());
    let new_elem = new Product("Повдеска",4.8,"https://planetofhotels.com/guide/sites/default/files/styles/paragraph__hero_banner__hb_image__1880bp/public/hero_banner/Niagara-falls.jpg","10 000").getHTML();
    $(".main-content").append(new_elem);
    $(new_elem).on("click",function(){
        $(".product-item").removeClass("active");
        $(new_elem).addClass("active");
        return false;
    });

}



$(document).ready(function() {

    //добавление и получение id существующих эл-ов
/*    setProductsIds();
    let productsIds = getProductsIds();
    productsIds.forEach((elem)=>{
        console.log("ID "+ elem);
    })*/


    $(".product-item").toArray().forEach((elem)=>{
        $(elem).on("click",function(){
            $(".product-item").removeClass("active");
            $(elem).addClass("active");
            return false;
        });
    });


    $(".add-bttn").on('click', addNewProduct);

});