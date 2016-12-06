	var localStorage = window.localStorage;
	var members_db = JSON.parse(localStorage.getItem("members"));
		var pw_change_1 = document.getElementById("pw1");
		var pw_change_2 = document.getElementById("pw2");
		var name_change = document.getElementById("name");
		var tel_change = document.getElementById("telephone");
		var get_id = document.getElementById("admin_id");
		
		get_id.value = members_db[0][0];
		pw_change_1.placeholder = members_db[0][1];
		pw_change_2.placeholder = members_db[0][1];
		name_change.placeholder = members_db[0][2];
		tel_change.placeholder = members_db[0][3];
					
				
		function save_change(){
			if(pw_change_1.value != "" && pw_change_1.value == pw_change_2.value){
				members_db[0][1] = pw_change_1.value;
			}
			else{
				alert("입력한 비밀번호가 서로 같지 않습니다.");
				return;
			}
			if(name_change.value != ""){
				members_db[0][2] = name_change.value;
			}
			if(tel_change.value != ""){
				members_db[0][3] = tel_change.value;
			}
			localStorage.setItem("members", JSON.stringify(members_db));
			alert("관리자 정보가 변경되었습니다.");
			pageload();
		}
		
		function pageload(){
			window.parent.location.replace("admin_page.html"); //초기 화면으로 돌아가기
			//window.close(); //iframe 창 닫기
		}