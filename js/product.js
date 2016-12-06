		var localStorage = window.localStorage;
		var items_db = JSON.parse(localStorage.getItem("items"));
		var cnt = -1;
		function loadInfo() {
			for (var i =0; i < items_db.length; i++)
				{
					cnt = i;
					
					var item = document.createElement("table");
					item.id = "item_"+i;
					item.count = cnt;
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
					td05_1.innerHTML = '<input id="product_quantity'+i+'" type="number" step="1" min="1" value="1">';
					tr05.appendChild(td05_1);

					var td05_2 = document.createElement("td");
					td05_2.innerHTML = '<button onclick="changeQuantity('+i+')">수량 변경</button>'; //추가되어 최정 변경되는 수량을 입력받아 해당 내용을 db에 overwrite 함.
					tr05.appendChild(td05_2);
					
					document.getElementById("product_quantity"+i).max = 99999;
				}
}
function changeQuantity(product_id){
	var change =parseInt(document.getElementById("product_quantity"+product_id).value);
	if(change<=0){
		alert("변경 값을 입력해주세요");
	}
	else{
		items_db[product_id][2]=change;
		localStorage.setItem("items", JSON.stringify(items_db)); //DB에 새로운 값 덮어씌우기
		window.location.replace("product_control.html"); //새로고침
	}
}
function add_product(){
	var localStorage = window.localStorage;
	var get_name = prompt("추가할 상품의 이름을 적어주세요");
	var get_price = prompt("추가할 상품의 가격을 적어주세요");
	var get_numset = prompt("추가할 상품의 수량을 적어주세요");
	var get_img = prompt("추가할 상품의 이미지를 적어주세요");
	
	if(get_name==null){
		alert("상품 명이 입력되지 않았습니다.");
		return;
	}else if(get_price==null||get_price<=0){
		alert("상품 가격이 올바르지 않습니다.");
		return;
	}else if(get_numset==null||get_numset<0){
		alert("상품의 수량이 올바르지 않습니다.");
		return;
	}else if(get_img==null){
		alert("상품 이미지를 확인해주세요");
		return;
	}else{
		var items_db = JSON.parse(localStorage.getItem("items"));
		var len = items_db.length;
		items_db[len] = [];
		items_db[len][0] = get_name;
		items_db[len][1] = get_price;
		items_db[len][2] = get_numset;
		items_db[len][3] = get_img;
		localStorage.setItem("items", JSON.stringify(items_db));
		alert("성공적으로 상품이 추가되었습니다");
		window.location.reload();
	}
}
function remove_product(){
	var localStorage = window.localStorage;
	var items_db = JSON.parse(localStorage.getItem("items"));
	var get_name = prompt("제거할 상품의 이름을 적어주세요");
	cnt=-1;
	for(var i = 0; i<items_db.length; i++){
		if(get_name==items_db[i][0]){
			items_db.splice(i,1);
			cnt=i;
			break;
		}
	}
	if(cnt==-1){                                       //db안에 없는 목록 지우려고 할 시 alert띄우고 실행 안함.
			alert("제거할 상품의 이름을 입력해주세요");
			return;
	}
	localStorage.setItem("items", JSON.stringify(items_db));
	alert("성공적으로 제거되었습니다");
	window.location.reload();
}