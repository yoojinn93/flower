//// 주문&결제 담당하는 JavaScript 입니다 - 제균 ////

var localStorage = window.localStorage;

var members_db = JSON.parse(localStorage.getItem("members"));
var items_db = JSON.parse(localStorage.getItem("items"));

var order_db = JSON.parse(localStorage.getItem("order"));

//로그인 한 회원의 넘버 체크
var logined = -1;
for(var i = 0; i<members_db.length; i++) {
    if(members_db[i][7]) {
        logined = i;
        break;
    }
}


//주문할 상품 보여주기
function show_order() {
    for (var i = 0; i < order_db.length; i++) {
        var item_id = order_db[i][0];

        //각 아이템 별 개별 div 생성
        var order_item = document.createElement("div");
        order_item.id = "order_item";
        document.getElementById("list_wrap_table").appendChild(order_item);

        //item photo div
        var order_item_photo = document.createElement("div");
        order_item_photo.id = "order_item_photo";
        order_item_photo.style.backgroundImage = "url('" +  items_db[item_id][3] + "')"; //item photo
        order_item.appendChild(order_item_photo);

        //item info div
        var order_item_info = document.createElement("div");;
        order_item_info.id = "order_item_info";
        order_item_info.innerHTML = "<p><span id='flowerName'>" + items_db[item_id][0]+"</span><br><span id='flowerPnQ'>가격 "+ items_db[item_id][1] + "원 | " + order_db[i][1] + "개</span></p><br><p id='flowerLSum'>상품금액 " + parseInt(items_db[item_id][1]) * parseInt(order_db[i][1]) + "원</p>";
        order_item.appendChild(order_item_info);
    }
    order_sum();
}

var final_price = 0;
function order_sum() {
    
	for (var i=0; i<order_db.length; i++) {
		var item_id = order_db[i][0];
        final_price += parseInt(items_db[item_id][1]) * parseInt(order_db[i][1]);
    }
    document.getElementById("total_price").innerHTML = final_price + "원";
    document.getElementById("span_mileage_cash").innerHTML = "(적립 예상 마일리지 : " + final_price*0.02 + "점)";
    document.getElementById("span_mileage_card").innerHTML = "(적립 예상 마일리지 : " + final_price*0.01 + "점)";
    
}

function order_finish() {
    var mileage;
    if (document.getElementById("radio01").checked) mileage = final_price*0.02
    else mileage = final_price*0.02;
        
    var answer = confirm("총 "+ final_price + "원이 결제되며, " + mileage + "점이 마일리지로 적립됩니다..\n진행하시겠습니까?");
    if (answer) alert("주문이 완료되었습니다.");
    
    members_db[logined][5] += mileage;
    localStorage.setItem("members", JSON.stringify(members_db));
    members_db = JSON.parse(localStorage.getItem("members"));
    
    location.href = "Main.html";
    alert("총 적립된 마일리지 " + members_db[logined][5] + "점");
}

document.getElementById("order_name").innerHTML = members_db[logined][2];
document.getElementById("order_mileage").innerHTML = members_db[logined][5]+"점";
document.getElementById("order_address").innerHTML = members_db[logined][4];
document.getElementById("order_phone").innerHTML = members_db[logined][3];

window.onload = show_order;

//// 끝 ////


