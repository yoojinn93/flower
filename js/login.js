var localStorage = window.localStorage;
var members = [];
var cnt = -1;
var members_db = JSON.parse(localStorage.getItem("members"));

function Checklogin(){
	var id = document.getElementById("id");
	var pw = document.getElementById("pw");
	var haveID = false;
	var getLogin=false;
	var isAdmin = false;
	for(var i=0;i<members_db.length;i++){
		if(members_db[i][0]==id.value){
			haveID=true;
			cnt = i;
		}
	}
	if(!haveID){
		alert("아이디를 확인해주세요");
		return;
	}
	else{
		if(members_db[cnt][1]==pw.value){
			getLogin = true;
		}
		else{
			alert("비밀번호를 확인해주세요");
			return;
		}
	}
	if(getLogin){
		if(cnt==0){
			isAdmin=true;
		}
	}
	members_db[cnt][8] = isAdmin;
	members_db[cnt][7] = haveID;
	localStorage.setItem("members", JSON.stringify(members_db));
	return getLogin;
}
function Onlogin(){
	if(Checklogin()){
		if(cnt==0){
			alert("관리자로 로그인 되셨습니다");
			window.location.replace("admin_page.html");
		}
		else{
			alert("로그인 성공");
			check_current_user();
			window.location.replace("Main.html");
		}
	}
	else{
		alert("존재하지 않는 회원입니다.");
	}
}

function check_current_user() {

	for (var i=1; i<members_db.length; i++) {
		if (members_db[i][7]==true) {
			localStorage.setItem("current_user_id", i);
			break;
		}
		else localStorage.setItem("current_user_id", "");
	}
}