//// 주문&결제 담당하는 JavaScript 입니다 - 제균 ////

var localStorage = window.localStorage;

var members_db = JSON.parse(localStorage.getItem("members"));
var items_db = JSON.parse(localStorage.getItem("items"));

var order_db = JSON.parse(localStorage.getItem("order"));

var logined = localStorage.getItem("current_user_id");


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
        order_item_info.innerHTML = "<p><span id='flowerName'>" + items_db[item_id][0]+"</span><br><span id='flowerPnQ'>가격 "+ items_db[item_id][1] + "원 | " + order_db[i][1] + "set</span></p><br><p id='flowerLSum'>상품금액 " + parseInt(items_db[item_id][1]) * parseInt(order_db[i][1]) + "원</p>";
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
    else mileage = final_price*0.01;
        
    var answer = confirm("총 "+ final_price + "원이 결제되며, " + mileage + "점이 마일리지로 적립됩니다..\n진행하시겠습니까?");
    
    if (answer) {
        alert("주문이 완료되었습니다.");
        members_db[logined][5] += mileage;
        saveItem();
        localStorage.setItem("members", JSON.stringify(members_db));
        members_db = JSON.parse(localStorage.getItem("members"));
        removeCart();
        
        location.href = "Main.html";
    }
    
}

function removeCart() {
    var cart_left = [];
    var left = 0;
    var checkIs = true;
	
	for (var i = 0; i < members_db[logined][6].length; i++) {
		var cnt = 0;

		for (var j = 0; j<order_db.length; j++) {
			if (members_db[logined][6][i][0] != order_db[j][0]) {
				cnt++;
			}
			else {
                if (members_db[logined][6][i][1]!=order_db[j][1]) {
                    if (members_db[logined][6][i][1]<order_db[j][1]) {
                        //아무것도 하지 않는다
                    }
                    else {
                        members_db[logined][6][i][1] -= order_db[j][1];
                        cart_left[left] = members_db[logined][6][i];
                        left++;
                        checkIs = false;
                    }
                }
			}
		}

		if (cnt == order_db.length) {
			cart_left[left] = members_db[logined][6][i];
			left++;
		}
	}

	if (checkIs) {members_db[logined][6] = [];}

	if(cart_left==null){                      //장바구니 안에 내용물 전부 구매시 장바구니 array 초기화
		members_db[logined][6]=[];
	}
	else{                                     //전부 구매하지 않고 일부를 남겨 두었을 시에는 구매하지 않은 물품만 남겨둠
		order_db = [];
		members_db[logined][6] = cart_left;
	}
	
	//장바구니 에러 해결 3단계. 주석 처리 한 부분은 제가 카톡에 말한 방식으로 해결한 방법입니다. 필요하시면 주석 해제해서 쓰세요 -동환

	localStorage.setItem("order",JSON.stringify(order_db));
	localStorage.setItem("members", JSON.stringify(members_db));

}
function saveItem(){
    for(var i=0;i<order_db.length;i++){
        items_db[order_db[i][0]][2] = parseInt(items_db[order_db[i][0]][2]) - parseInt(order_db[i][1]);
        localStorage.setItem("items",JSON.stringify(items_db));
    }
}

document.getElementById("order_name").value = members_db[logined][2];
document.getElementById("order_mileage").innerHTML = members_db[logined][5]+"점";
document.getElementById("order_address").value = members_db[logined][4];
document.getElementById("order_phone").value = members_db[logined][3];

window.onload = show_order;

//// 끝 ////


