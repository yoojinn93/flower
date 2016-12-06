		var localStorage = window.localStorage;
		var members_db = JSON.parse(localStorage.getItem("members"));
		var cnt=-1;
		for(var i=0; i<members_db.length; i++){
			if(members_db[i][7]){
				cnt=i;
				break;
			}
		}
		if(cnt==-1){						//login status가 false면 페이지 보여주지 않고 화면전환 
			window.location.replace("login.html");		
			alert("권한이 없습니다");
			// 관리자 계정 current user 값을 false로 변경 후 login 페이지로 이동
		}
			
		var pw_change_1 = document.getElementById("pw1");
		var pw_change_2 = document.getElementById("pw2");
		var name_change = document.getElementById("name");
		var tel_change = document.getElementById("telephone");
		var get_id = document.getElementById("member_id");
		var mileage_check = document.getElementById("mileageMember");
		
		get_id.value = members_db[cnt][0];
		pw_change_1.placeholder = members_db[cnt][1];
		pw_change_2.placeholder = members_db[cnt][1];
		name_change.placeholder = members_db[cnt][2];
		tel_change.placeholder = members_db[cnt][3];
		mileage_check.value = members_db[cnt][5];
				
		function save_change(){
			if(pw_change_1.value != "" && pw_change_1.value == pw_change_2.value){
				members_db[cnt][1] = pw_change_1.value;
			}
			else{
				alert("입력한 비밀번호가 서로 같지 않습니다.");
				return;
			}
			if(name_change.value != ""){
				members_db[cnt][2] = name_change.value;
			}
			if(tel_change.value != ""){
				members_db[cnt][3] = tel_change.value;
			}
			localStorage.setItem("members", JSON.stringify(members_db));
			alert("회원 정보가 변경되었습니다.");
			pageload();
		}
		
		function pageload(){
			window.location.replace("Main.html"); //초기 화면으로 돌아가기
		}