var localStorage = window.localStorage;


////default DB start////
var order = []; //장바구니 다시 열 때마다 clear&update;
localStorage.setItem("order", JSON.stringify(order));

var items_db = JSON.parse(localStorage.getItem("items"));
var order_db = JSON.parse(localStorage.getItem("order"));
var members_db = JSON.parse(localStorage.getItem("members"));
////default DB end////


/// Indent 되어 있는 부분은 main.html에서 로컬스토리지 선언 부분을 빼고 모두 복사해온 것들입니다
	var cart = new Array();
	var cnt = -1; //로그인 db 참조 변수
	function loadInfo() {
		for (var i =0; i < items_db.length; i++)
			{
				var item = document.createElement("table");
				item.id = "item_"+i;
				document.getElementById("section_list").appendChild(item);
	
				var tr01 = document.createElement("tr");
				document.getElementById("item_"+i).appendChild(tr01);
	
				var td01 = document.createElement("td");
				td01.class = "product image";
				td01.setAttribute("colspan", "2");
				tr01.appendChild(td01);
	
				td01.innerHTML = '<img id="product_image" src = "' + items_db[i][3] +'" width="150px" height="150px">';
	
				var tr02 = document.createElement("tr");
				document.getElementById("item_"+i).appendChild(tr02);
	
				var td02 = document.createElement("td");
				td02.class = "product name";
				td02.setAttribute("colspan", "2");
				tr02.appendChild(td02);
	
				td02.innerHTML = '<p id="product_name">' + items_db[i][0] +'</p>';
	
				var tr03 = document.createElement("tr");
				document.getElementById("item_"+i).appendChild(tr03);
	
				var td03 = document.createElement("td");
				td03.class = "product price";
				td03.setAttribute("colspan", "2");
				tr03.appendChild(td03);
	
				td03.innerHTML = '<p id="product_price">' + items_db[i][1] +' 원</p>';
	
				var tr04 = document.createElement("tr");
				document.getElementById("item_"+i).appendChild(tr04);
	
				var td04 = document.createElement("td");
				td04.class = "product storage";
				td04.setAttribute("colspan", "2");
				tr04.appendChild(td04);
	
				td04.innerHTML = '<p id="product_image">' + items_db[i][2] +' set</p>';
	
				var tr05 = document.createElement("tr");
				document.getElementById("item_"+i).appendChild(tr05);
	
				var td05_1 = document.createElement("td");
				td05_1.innerHTML = '<input id="product_quantity'+i+'" type="number" step="1" min="1" max = "" value="1">';
				tr05.appendChild(td05_1);
	
				var td05_2 = document.createElement("td");
				td05_2.innerHTML = '<button onclick="add_cart('+i+')">장바구니 담기</button>';
				tr05.appendChild(td05_2);
	            
	            document.getElementById("product_quantity"+i).max = items_db[i][2];
			}
	}
	function add_cart(product_id){
	    
	    var product_quantity = parseInt(document.getElementById("product_quantity"+product_id).value);
	    if(product_quantity>items_db[product_id][2]){
	        window.alert("한도 수량을 초과하셨습니다.");
	        return;
	    }
	    else{
	    var case1 = true;
	    var product = [product_id,product_quantity];
        	if(cart.length == 0){
                cart.push(product);
                case1 = false;
            }
            else{
            	for(var i=0;i<cart.length;i++){
                	if(cart[i][0] == product[0]){
                	cart.splice(i,1,product);
                	case1 = false;
                	break;
                	}
        		}
            }
            if(case1 == true){
                cart.push(product);
            }
	    localStorage.setItem("cart",JSON.stringify(cart));//확인용 스토리지 추후 삭제.
	    members_db[current_user_id][6] = cart;
        localStorage.setItem("members", JSON.stringify(members_db)); 
	    }
	    
	}
	for(var i = 0; i<members_db.length; i++){
		if(members_db[i][7]){
			cnt=i;
			document.getElementById("areaLogin").style.display = "none";
			var Loginfo = document.getElementById("loginInfo");
			Loginfo.innerHTML = members_db[i][2]+"님 환영합니다"; //이 부분은 DB에 있는 데이터를 불러오는 방식으로 바꿔야 합니다.
			document.getElementById("areaLogout").style.display = "";
			break;
		}
	}
	function goLogin(){
		window.location.replace("login.html"); //login 페이지로 이동
	}
	
	function goLogout(){
	    document.getElementById("areaLogin").style.display = "";
	    document.getElementById("areaLogout").style.display = "none";
	    members_db[cnt][7]=false;
	    localStorage.setItem("members", JSON.stringify(members_db));
		check_current_user();
	    alert("로그아웃 되셨습니다");
	    window.location.reload();
	}
        
/// Indent 종료

var current_user_id = localStorage.getItem("current_user_id");

////current user check start////
function check_current_user() {

	for (var i=1; i<members_db.length; i++) {
		if (members_db[i][7]) {
			localStorage.setItem("current_user_id", i);
			break;
		}
		else localStorage.setItem("current_user_id", "");
	}
}

////current user check end////


