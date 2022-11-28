let body = document.getElementsByTagName("body");
let header = document.createElement("header");
header.className="headerClass";
let head1=document.createElement("h1");
head1.className="h1Class";
header.append(head1);
head1.innerText="Book Shop";
body[0].append(header);
body[0].className="body";
let shoppingCart=document.createElement("div");
shoppingCart.className="shoppingCartClass";
let booksCart=document.createElement("p");
booksCart.className="booksCartClass";

shoppingCart.append(booksCart);
let navi=document.createElement("nav");
header.append(navi);
navi.className="navClass";
let navList = document.createElement("ul");
let main =  document.createElement("main");
main.className="mainClass";
let cardWrap = document.createElement("div");
cardWrap.className="cardWrapClass";
main.append(cardWrap);
body[0].appendChild(main);
navi.append(shoppingCart);
let CounterAdded = 0;
let totalPrice=0;
let dropLocation= document.createElement("div");
dropLocation.className="dropLocationClass";
main.append(dropLocation);
let cost=document.createElement("h3");
cost.className="costClass";
dropLocation.append(cost);
cost.innerText=`total price:${totalPrice}`;
let buy=document.createElement("a");
buy.className="buyClass";
buy.innerText="complete";
dropLocation.append(buy);
buy.href="../formPage/index.html";


const  books = fetch('./books.json') //path to the file with json data
        .then(response => {
            return response.json();
        });

        function createCard(photo, header1, header2, price, cardId){
            let mainDiv=document.createElement("div");
            mainDiv.id=cardId;

            mainDiv.className="mainDivClass";
            let image=document.createElement("img");
            image.src=photo;
            image.className="photoClass";
            let infoDiv=document.createElement("div");
            infoDiv.className="infoDivClass";
            let author=document.createElement("h5");
            author.className="authorClass";
            author.innerHTML=header1;
            let bName=document.createElement("h3");
            bName.className="bNameClass";
            bName.innerHTML=header2;
            let bprice=document.createElement("h6");
            bprice.className="bpriceClass";
            bprice.innerText=`price:${price}`;
            let buttonWrap=document.createElement("div");
            buttonWrap.className="buttonWrapClass";
            let showMoreAnc= document.createElement("a");
            showMoreAnc.className="showMoreAncClass";
            showMoreAnc.id=cardId;
            showMoreAnc.innerText="show more";
            let addToBagBtn= document.createElement("button");
            addToBagBtn.className="addToBagBtnClass";
            addToBagBtn.innerHTML="add to cart";
            addToBagBtn.id=cardId;
            buttonWrap.append(showMoreAnc,addToBagBtn);
            infoDiv.append(author,bName,bprice, buttonWrap);
            mainDiv.append(image,infoDiv);
            cardWrap.append(mainDiv);



        };
       


async function draw() {
    let Books =[];
   await   fetch('./books.json') //path to the file with json data
   .then(response => {
       return response.json();
   })
   .then(data => {
       data.forEach(element => {
        Books.push(element);
       });
       
   });


   for(var i=0; i<Books.length; i++){
    createCard(Books[i].imageLink, 
        Books[i].author, Books[i].title,Books[i].price,i);
}
clickBtn();
dragDrop();
clickShowMore();

}


draw();
booksCart.innerText=CounterAdded;
async function clickBtn(){
    let shelf=document.getElementsByClassName("dropLocationClass");
    
    let cnt = document.getElementsByClassName('booksCart');
    
    let buttons= document.querySelectorAll('.addToBagBtnClass');
    await buttons ; 

    buttons.forEach(x=>{
      
        x.addEventListener("click",function(event){
            booksCart.innerText='';
    
    CounterAdded++;
 
    let book= document.getElementById( `${event.target.id}`);
    let cloneBook=book.cloneNode(true);
         
         cloneBook.style.cssText=`width:70%;
         height:200px;`
         cloneBook.childNodes[1].removeChild(cloneBook.childNodes[1].childNodes[3])
         cloneBook.childNodes[1].style.cssText=`font-size: 9px;
         padding-right:4px;`
         let closeBtn=document.createElement("button");
         closeBtn.innerText="close";
         closeBtn.className="cloneBookBtnClass";
         cloneBook.append(closeBtn);
         let price=cloneBook.childNodes[1].childNodes[2].innerText.substring(6,8);
           console.log(cloneBook.childNodes[1].childNodes[2].innerText.substring(6,8))
           totalPrice+=Number(price);

           cost.innerText='';

   cost.innerText=`TotalPrice:${totalPrice}`
         closeBtn.addEventListener("click", (event)=>{

             shelf[0].removeChild(cloneBook);
             booksCart.innerText='';
             CounterAdded--;
          booksCart.append(CounterAdded);
          totalPrice-=price;
          cost.innerText='';
   cost.innerText=`TotalPrice:${totalPrice}`


           })
           
           
           

    shelf[0].append(cloneBook);
    booksCart.append(CounterAdded);




    })
    
})
    
}
 
async function dragDrop(){
    let callCard= document.getElementsByClassName('mainDivClass');
    await callCard;
   
let draggable;
let shelf=document.getElementsByClassName("dropLocationClass")

let PriceDrop;
    // callCard.forEach(x=>{
for(item of callCard){
   
         item.addEventListener("drag",function(event){
        let a = document.getElementById(`${event.currentTarget.id}`);
        
      
      //let imageLink= this.books[event.currentTarget.id+1].imageLink;
     // console.log(imageLink);
    
         
        let cloneBook=a.cloneNode(true);

         cloneBook.style.cssText=`width:70%;
         height:200px;`
         cloneBook.childNodes[1].removeChild(cloneBook.childNodes[1].childNodes[3])
         cloneBook.childNodes[1].style.cssText=`font-size: 9px;
         padding-right:4px;`


         let closeBtn=document.createElement("button");
         closeBtn.innerText="close";
         closeBtn.className="cloneBookBtnClass";
         cloneBook.append(closeBtn);
        draggable=cloneBook;
        closeBtn.addEventListener("click", (event)=>{
     
            shelf[0].removeChild(cloneBook);
            booksCart.innerText='';
            CounterAdded--;
           
        
         booksCart.append(CounterAdded);
           
        
         cost.innerText='';
         totalPrice-=PriceDrop;
        cost.innerText=`TotalPrice:${totalPrice}`;
        
          })
    
        });
 
    }
    
    let boughtShelf =document.querySelector('.dropLocationClass'); 
    await boughtShelf;
   
    boughtShelf.addEventListener("dragover", event => {
        event.preventDefault();
      });
  
    boughtShelf.addEventListener("drop",event=>{

        let price=draggable.childNodes[1].childNodes[2].innerText.substring(6,8);
        console.log(draggable.childNodes[1].childNodes[2].innerText.substring(6,8))
        totalPrice+=Number(price);
        
       PriceDrop =Number(price);
    boughtShelf.append(draggable);
    booksCart.innerText='';
        CounterAdded++;
   
    
     booksCart.append(CounterAdded);

     cost.innerText='';

   cost.innerText=`TotalPrice:${totalPrice}`
  
    });
    
   
    };


   
    async function clickShowMore(){    
        let buttons= document.querySelectorAll('.showMoreAncClass');
        await buttons ; 
        buttons.forEach(x=>{
         
            x.addEventListener("click", (event)=>{
                showPopup(event.target.id) ;
      
               let html=  document.getElementsByTagName("html");
              // html[0].style.overflow ="hidden";
            })
        
    })
    
    }
    
   
    let popup= document.createElement("div");
 async function showPopup(id){
    let Books =[];
   await   fetch('./books.json') //path to the file with json data
   .then(response => {
       return response.json();
   })
   .then(data => {
       data.forEach(element => {
        Books.push(element);
       });
       
   });
    
    
   
    popup.className="popupClass";
    body[0].append(popup);

let image;
  image = await Books[Number(id)].imageLink;
  desc = await Books[Number(id)].description;
  let popupDiv=document.createElement("div");
  popupDiv.className="popupDivClass";
  popup.append(popupDiv);
    let popupPhoto=document.createElement("img");
    popupPhoto.className="popupPhotoClass";
    popupDiv.append(popupPhoto);
    popupPhoto.src=image;
    let popupText=document.createElement("span");
    popupText.className="popupTextClass";
    popupDiv.append(popupText);
    popup.id="myPopup";
    popupText.innerText=desc;
    let closeBtn=document.createElement("button");
    closeBtn.innerText="close";
    closeBtn.className="closeBtnClass";
    popupDiv.append(closeBtn);
    closeBtn.addEventListener("click", (event)=>{

        body[0].removeChild(popup);
      
      })
   
}


function buyBox(){
    var box = document.getElementsByClassName("shoppingCartClass");
    var shelf= document.getElementsByClassName("dropLocationClass")
    box[0].addEventListener("click", (event)=>{
        console.log("buybocccccccccxxxx")
        shelf[0].style.cssText = `display:flex;
    position:fixed;
    bottom:0.5%;right:0.5%;`
    }
    )


    let closeBtn=document.createElement("button");
    closeBtn.innerText="close";
    closeBtn.className="closeDropLocation";
    shelf[0].append(closeBtn);
    closeBtn.addEventListener("click", (event)=>{

        shelf[0].style.cssText=`display:hidden;`;
      
      })
  
}

buyBox();
 