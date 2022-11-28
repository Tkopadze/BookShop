let date= document.getElementById("DeliveryDate");
let form = document.getElementsByTagName("form");
let today =new Date();
let element= document.createElement("span");
form[0].append(element);
element.className="DateError";
date.addEventListener("change",(event)=>{
    let changeValue =new Date(date.value);
    if (changeValue< today){
        
       error("mandatory, not earlier than next day")
    }
    else{
        let errors =  document.getElementsByClassName("DateError");
        element.innerText='';
    }
})


function error(string){

element.innerText=string;
element.style.color="red";

}
