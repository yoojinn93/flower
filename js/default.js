var localStorage = window.localStorage;

////default DB start////
//여기서부터 회원 DB
var members = [];

members[0] = [];                                //관리자 정보를 0번째로 옮겨놨습니다 - 동환
	members[0][0] = "admin"; //ID
	members[0][1] = "admin"; //비밀번호
	members[0][2] = "관리자"; //이름
	members[0][3] = "010-1111-1111"; //전화번호
	members[0][4] = "교수회관"; //주소
	members[0][5] = 0; //마일리지
	members[0][6] = []; //장바구니
	members[0][7] = false; //로그인 여부
	members[0][8] = true; //관리자 권한 확인
	

	//혹시 몰라서 장바구니 채워놨어요

// 	members[0][6][0] = 0; //장바구니 내 첫번째 상품번호
// 	members[0][6][1] = 2; //장바구니 내 첫번째 상품 수량

members[1] = [];
	members[1][0] = "client"; //ID
	members[1][1] = "client"; //비밀번호
	members[1][2] = "고객"; //이름
	members[1][3] = "010-1111-1111"; //전화번호
	members[1][4] = "경영관"; //주소
	members[1][5] = 0; //마일리지
	members[1][6] = [[0,2], [1,1], [3,10]]; //장바구니. [item id, 수량] 제가수정했어요-유진
	members[1][7] = false; //로그인 여부. 제가 임시로 변경했습니다!-유진 main 페이지 로그인/로그아웃 체크를 위해 바꿨습니다 -동환
	members[1][8] = false; //관리자 권한 확인


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

