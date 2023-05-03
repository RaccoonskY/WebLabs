function productIsVisited(e){
    let bgclr = this.style.backgroundColor;
    bgclr == "grey"? this.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16): this.style.backgroundColor = "grey";
    alert("Ой вей, произошла какая-то ошибка!");
    e.stopPropagation();
}

async function sendMessage(msg){
    let request = new XMLHttpRequest();
    request.open("POST", "/messages/add", true);
    request.setRequestHeader("Content-Type", "application/json");
    await request.send(JSON.stringify(msg));
}


function appendItemForm(){
    let fc_items = document.querySelector(".fc__items");
    let pElement = document.createElement("p");
    pElement.innerHTML = document.search.key.value;
    if(document.search.colors.checked){
        
        pElement.style.color = "#"+ Math.floor(Math.random()*16777215).toString(16);
    }
    sendMessage({"text":pElement.innerHTML, "color":pElement.style.color}).catch((err)=>{console.log(`Error occurred: ${err.message}`)});
    fc_items.appendChild(pElement);
    alert("Спасибо за ваш отзыв!"); 
}

/*

function secondsRecordedPromise(seconds){

    return new Promise(function(resolve){

        resolve(seconds);
    });
}

function tsPGenerator(seconds, plusSecs){
    seconds+=plusSecs;
    setTimeout(function(){
        let promise = secondsRecordedPromise(seconds);
        promise.then(function(seconds){
            if(seconds % 60 == 0 & seconds >= 60)
            {alert("Персональная скидка в 30%!");}
            console.log(`${seconds} секунд уже на сайте`)
        })
        tsPGenerator(seconds, plusSecs);
    }, plusSecs*1000)
}
*/

function secondsRecordedPromise(seconds, plusSecs){
    seconds+=plusSecs;
    return new Promise(function(resolve){
        resolve(seconds);
    });
}

function tsPGenerator(seconds,plusSecs){
    setTimeout(async ()=>{
        const curSecs = await secondsRecordedPromise(seconds,plusSecs);
        console.log(`${curSecs} секунд уже на сайте`)
        if(curSecs % 30 === 0 && curSecs >= 30){
            alert("Персональная скидка в 30%!");
        }
        tsPGenerator(curSecs, plusSecs);
        
    }, plusSecs*1000)

}


function setELonProducts(){
    setTimeout(()=>{
        var products = Array.from(document.getElementsByClassName('product-item'));
        products.forEach(elem => {
            elem.addEventListener("click", productIsVisited);
        });
    },1000);
}

window.onload = function(){
    var secondsToAdd = 1;
    tsPGenerator(0,secondsToAdd);

    setELonProducts();
    document.querySelector(".add-bttn").addEventListener("click", setELonProducts);


    var form_but = document.search.send;
    try{
        form_but.addEventListener("click",appendItemForm);
    }catch(error){
        console.log(error);
    }
 };

