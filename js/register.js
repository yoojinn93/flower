var localStorage = window.localStorage;
        var members_db = JSON.parse(localStorage.getItem("members"));
	    var get_id = document.getElementById("get_id");            //아이디
	    var pw_change_1 = document.getElementById("pw1");          //비밀번호 1
		var pw_change_2 = document.getElementById("pw2");          //비밀번호 2
		var name_change = document.getElementById("name");         //이름
		var tel_change = document.getElementById("telephone");     //전화번호
		var my_address = document.getElementById("address");       //주소
		var cnt = members_db.length;

		function save_change(){
			if(get_id.value==""){
				alert("아이디를 입력해주세요");
				return;
			}else if(pw_change_1.value==""){
				alert("비밀번호를 입력해주세요");
				return;
			}else if(name_change.value==""){
				alert("이름을 입력해주세요");
				return;
			}else if(tel_change.value==""){
				alert("전화번호를 입력해주세요");
				return;
			}else if(my_address.value==""){
				alert("주소를 입력해주세요");
				return;
			}
			var dup=-1
			for(var i=0; i<members_db.length; i++){
				if(members_db[i][0]==get_id.value){
					dup=i;
					break;
				}
			}
			if(dup!=-1){ //아이디 중복 체크
				alert("이미 존재하는 아이디입니다.");
				window.location.reload();
				return;
			}else if(pw_change_1.value!=pw_change_2.value){
		        alert("입력하신 비밀번호가 서로 같지 않습니다.");
		        return;
		    }
		    else{
		        members_db[cnt]=[];
		        members_db[cnt][0] = get_id.value;
		        members_db[cnt][1] = pw_change_1.value;
		        members_db[cnt][2] = name_change.value;
		        members_db[cnt][3] = tel_change.value;
		        members_db[cnt][4] = my_address.value;
		        members_db[cnt][5] = 0;
		        members_db[cnt][6] = [];
		        members_db[cnt][7] = false;
		        members_db[cnt][8] = false;
		    }
		    localStorage.setItem("members", JSON.stringify(members_db));
		    alert("정상적으로 회원가입 되었습니다.");
			pageload();
		}
		
		function pageload(){
			window.location.replace("login.html"); // 로그인 화면으로 돌아가기
		}