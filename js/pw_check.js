var localStorage = window.localStorage;
var members_db = JSON.parse(localStorage.getItem("members"));

function CheckId(){
	var id = document.getElementById("id");
	var IsID = false;
	var cnt=-1;
	for(var i=0;i<members_db.length;i++){
		if(members_db[i][0]==id.value){
			IsID=true;
			cnt = i;
		}
	}
	if(!IsID){
		alert("존재하지 않는 회원입니다.");
		window.location.replace("login.html")
		return;
	}
	else{
		alert(members_db[cnt][0]+"님의 비밀번호는"+members_db[cnt][1]+"입니다.");
		window.location.replace("login.html")
	}
}
