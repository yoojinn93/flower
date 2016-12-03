var localStorage = window.localStorage;

////default DB start////
//여기서부터 회원 DB
var members = [];

members[0] = [];
	members[0][0] = "client"; //ID
	members[0][1] = "client"; //비밀번호
	members[0][2] = "고객"; //이름
	members[0][3] = "010-1111-1111"; //전화번호
	members[0][4] = "경영관"; //주소
	members[0][5] = 0; //마일리지
	members[0][6] = [[0,2], [1,1], [3,10]]; //장바구니. [item id, 수량] 제가수정했어요-유진
	members[0][7] = true; //로그인 여부. 제가 임시로 변경했습니다!-유진
	members[0][8] = false; //관리자 권한 확인

	//혹시 몰라서 장바구니 채워놨어요

// 	members[0][6][0] = 0; //장바구니 내 첫번째 상품번호
// 	members[0][6][1] = 2; //장바구니 내 첫번째 상품 수량

members[1] = [];
	members[1][0] = "admin"; //ID
	members[1][1] = "admin"; //비밀번호
	members[1][2] = "관리자"; //이름
	members[1][3] = "010-1111-1111"; //전화번호
	members[1][4] = "교수회관"; //주소
	members[1][5] = 0; //마일리지
	members[1][6] = []; //장바구니
	members[1][7] = false; //로그인 여부
	members[1][8] = true; //관리자 권한 확인


localStorage.setItem("members", JSON.stringify(members));
var members_db = JSON.parse(localStorage.getItem("members"));

//여기서부터 상품 DB

var items = [];

items[0] = [];	
	items[0][0] = "장미";
	items[0][1] = "25000";
	items[0][2] = "20";
	items[0][3] = "img/flower.jpg";

items[1] = [];
	items[1][0] = "수국";
	items[1][1] = "15000";
	items[1][2] = "4";
	items[1][3] = "img/soo.jpg";

items[2] = [];
	items[2][0] = "수국2";
	items[2][1] = "150000";
	items[2][2] = "4";
	items[2][3] = "img/flower.jpg";

items[3] = [];
	items[3][0] = "크리스마스 로즈";
	items[3][1] = "25000";
	items[3][2] = "20";
	items[3][3] = "img/rose.jpg";

items[4] = [];
	items[4][0] = "장미쓰";
	items[4][1] = "25000";
	items[4][2] = "20";
	items[4][3] = "img/flower.jpg";

items[5] = [];
	items[5][0] = "빨간장미";
	items[5][1] = "25000";
	items[5][2] = "20";
	items[5][3] = "img/flower.jpg";


localStorage.setItem("items", JSON.stringify(items));
var items_db = JSON.parse(localStorage.getItem("items"));

//여기서부터 주문 DB (공용)

var order = []; //장바구니 다시 열 때마다 clear&update;
localStorage.setItem("order", JSON.stringify(order));
var order_db = JSON.parse(localStorage.getItem("order"));
////default DB end////







////current user check start////
function check_current_user() {
	for (var i=0; i<members_db.length; i++) {
		if (members_db[i][7] == true) {
			localStorage.setItem("current_user_id", i);  
		}
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
        checkbox.id = "cart_item_check";
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
        cart_item_info.id = "cart_item_info";
        
        cart_item_info.appendChild(document.createTextNode(items_db[item_id][0])); //item name
        cart_item_info.appendChild(document.createElement("br"));
        
        cart_item_info.appendChild(document.createTextNode("가격 " + items_db[item_id][1] + "원 * ")); //item price
       
        var order_num = document.createElement("input"); //주문수량 input
        order_num.type = "input";
        order_num.value = members_db[current_user_id][6][i][1];
        order_num.id = "order_num_input" + i;
        cart_item_info.appendChild(order_num);
        cart_item_info.appendChild(document.createTextNode("개"));
        cart_item_info.appendChild(document.createElement("br"));
        
        cart_item_info.appendChild(document.createTextNode("재고 " + items_db[item_id][2] + "개")); //item stock
        cart_item.appendChild(cart_item_info);
  }
}

//장바구니 상품 전체 체크
function check_all() {
	var checks = document.getElementsByName('check_item');
	for(var i=0; i<checks.length; i++) {
		checks[i].checked = true;
	}
}   

//장바구니 상품 합계 계산
// var sum = 0;
function how_much() {
	var sum = 0;
	for (var i=0; i<members_db[0][6].length; i++) {
		var item_id = members_db[0][6][i][0];
        sum += parseInt(items_db[item_id][1]) * parseInt(document.getElementById("order_num_input"+i).value);
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
	
	for (var i=0; i<checks.length; i++) {
		if (checks[i].checked == true) { //check된 경우만
			var item_stock = document.getElementById("order_num_input"+i).value;
			// if (order == null) order = [];
			order.push([checks[i].className, item_stock]); //[실제 order한 item index, 수량]
		};
	}
    localStorage.setItem("order", JSON.stringify(order)); 

}
////order end////


