var localStorage = window.localStorage;

////default DB start////
var order = []; //장바구니 다시 열 때마다 clear&update;
localStorage.setItem("order", JSON.stringify(order));

var items_db = JSON.parse(localStorage.getItem("items"));
var order_db = JSON.parse(localStorage.getItem("order"));
var members_db = JSON.parse(localStorage.getItem("members"));
////default DB end////


////current user check start////
function check_current_user() {
	// localStorage.setItem("current_user_id", ""); // 추후 로그아웃 시 초기화 필요
	var cnt = -1;
	for (var i=1; i<members_db.length; i++) {
		if (members_db[i][7] == true) {
			localStorage.setItem("current_user_id", i);
			cnt=i;
		}
	}
	if(cnt==-1){
		window.location.replace("login.html");
		alert("로그인이 필요합니다");
	}
}

check_current_user()
var current_user_id = localStorage.getItem("current_user_id"); 
////current user check end////



////cart start////
//장바구니 담은 상품 보여주기
function show_cart() {
  for (var i=0; i<members_db[current_user_id][6].length; i++) {
  		var item_id = members_db[current_user_id][6][i][0];
    	
    	//각 아이템 별 개별 div 생성
        var cart_item = document.createElement("div");
        cart_item.id = "cart_item";
        document.getElementById("list_wrap_table").appendChild(cart_item);
    	   
        //item checkbox div
        var cart_item_check = document.createElement("div");
        cart_item_check.id = "cart_item_check";
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "check_item";
        checkbox.id = "cart_item_check"+i;
        checkbox.checked = "checked";
        checkbox.className = item_id; //order db에 item index 넣어주기 위해 classname을 item index로 지정
        cart_item_check.appendChild(checkbox);
        cart_item.appendChild(cart_item_check);
       
        //item photo div
        var cart_item_photo = document.createElement("div");
        cart_item_photo.id = "cart_item_photo";
        cart_item_photo.style.backgroundImage = "url('" +  items_db[item_id][3] + "')"; //item photo
        cart_item.appendChild(cart_item_photo);
        
        //item info div
        var cart_item_info = document.createElement("div");;
        cart_item_info.id = "cart_item_info"+i;
        cart_item_info.className = "cart_item_info";
        cart_item_info.value = items_db[item_id][1];
        cart_item_info.appendChild(document.createTextNode(items_db[item_id][0])); //item name
        cart_item_info.appendChild(document.createElement("br"));
        
        cart_item_info.appendChild(document.createTextNode("가격 " + items_db[item_id][1] + "원 * ")); //item price
       
        var order_num = document.createElement("input"); //주문수량 input
        order_num.type = "input";
        order_num.value = members_db[current_user_id][6][i][1];
        order_num.id = "order_num_input" + i;
        cart_item_info.appendChild(order_num);
        cart_item_info.appendChild(document.createTextNode(" set "));
        
        var btn = document.createElement("span");
        btn.innerHTML = '<button onclick="change_cart('+i+', '+item_id+')">변경</button>';
        cart_item_info.appendChild(btn);
        
        cart_item_info.appendChild(document.createElement("br"));
        
        cart_item_info.appendChild(document.createTextNode("재고 " + items_db[item_id][2] + " set")); //item stock
        cart_item.appendChild(cart_item_info);
  }
}

function change_cart(i, item_id) {
    var change_num = parseInt(document.getElementById("order_num_input"+i).value);
    if(change_num > items_db[item_id][2]){
        window.alert("한도 수량을 초과하셨습니다.");
        return;
    }
    else if(change_num <= 0) {
        window.alert("최소 수량은 1개 입니다!");
        return;
    }
    else {
        window.alert("변경되었습니다!");
        return;
    }
}

//장바구니 상품 전체 체크
var isChecked = true;
function check_all() {
	var checks = document.getElementsByName('check_item');
	
	if(isChecked === true) {
    	for(var i=0; i<checks.length; i++) {
    		checks[i].checked = false;
    	}
    	isChecked = false;
	}
	else {
	    for(var i=0; i<checks.length; i++) {
    		checks[i].checked = true;
    	}
    	isChecked = true;
	}
}   

//장바구니 상품 합계 계산
// var sum = 0;
function how_much() {
	var sum = 0;
	var item_price = 0; 
	for (var i=0; i<members_db[current_user_id][6].length; i++) {
	    if (document.getElementById("cart_item_check"+i).checked == true){
	        item_price = document.getElementById("cart_item_info"+i).value;
	        sum += parseInt(item_price) * parseInt(document.getElementById("order_num_input"+i).value);
	    }
    }
    document.getElementById("total_price").innerHTML = sum;
}

window.onload = show_cart;
////cart end////




////order start////
function order_put() {
    order = []; //중복 append 방지용 초기화;
    localStorage.setItem("order", JSON.stringify(order)); //중복 append 방지용 초기화;
    
	var checks = document.getElementsByName('check_item'); //모든 checkbox 가져오기
	
	
	//전체 주문 수량이 유효한지 검사하기 위한 값 넘기기
	var valid = 1;
	for (var i=0; i<checks.length; i++) {
		if (checks[i].checked == true) { //check된 경우만
		    valid = valid * document.getElementById("order_num_input"+i).value;
		};
	}
	
	//주문수량 유효 검사
	if (valid > 0) {
        for (var i=0; i<checks.length; i++) {
    		if (checks[i].checked == true) { //check된 경우만
    			var item_stock = document.getElementById("order_num_input"+i).value;
    			order.push([parseInt(checks[i].className), parseInt(item_stock)]); //[실제 order한 item index, 수량]
    		};
    	}
        localStorage.setItem("order", JSON.stringify(order));
        
        //유효한 경우, 선택된 상품이 있는지 검사
        if (order.length === 0) {
            alert('선택된 상품이 없습니다!');
        }
        else {
            window.location.href = "order.html";
        }
	}
	else {
	    alert("최소 주문 수량은 1개입니다!");
	}
	
	
    
    // location.href = "order.html";
    
    

}
////order end////

