var localStorage = window.localStorage;
		var members_db = JSON.parse(localStorage.getItem("members"));
       
        var Loginfo = document.getElementById("loginInfo");
        Loginfo.innerHTML = "<p>" + members_db[0][2] +"님 환영합니다</p>";
			
        function fnLogout(){
           	members_db[0][8]=false;
           	members_db[0][7]=false;
			localStorage.setItem("members", JSON.stringify(members_db));
			alert("로그아웃 되셨습니다");
			window.location.replace("Main.html");
			
        }
