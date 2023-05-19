var arr = [
    "Miles",
    "Javonia",
    "Cocoa"
]

var userName = document.getElementById("userName");
var submit = document.getElementById("submit");
var message = document.querySelector("#message");

submit.addEventListener("click",function(){
    if (checkList() == true) {
        message.innerHTML = "Welcome " + userName.value;
    }
    else {
        message.innerHTML = "You are not invited";
    }
}) 

function checkList() {
    for (i=0; i < arr.length; i++){
        if (arr[i] == userName.value) {
            return true;
        }
    }
    return false;
}