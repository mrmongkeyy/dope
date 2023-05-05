module.exports = {
	app(config){
		return `
			<!doctype html>
			<html>
				<head>
					<title>MetaDope: Drama of personas</title>
					<meta name=viewport content=width=device-width,initial-scale=1>
					<style>
						main{
							-webkit-tap-highlight-color:transparent;
							user-select:none;
						}
						content{
							width:40%;
						}
						.bigfont{
							font-size:18px;
						}
						.smallfont{
							font-size:12px;
						}
						.normal-size:{
							font-size:13px;
						}
						.responsiveWidth{
							width:50%;
						}
						.footerSetting{
							justify-content:space-around;
							width:50%;
						}
						.footerItems{
							margin:0 5px;
						}
						#finder{
							width:50%;
						}
						header{
							width:40%;
							justify-content:space-between;
						}
						input{
							outline:none;
							background:white;
							border:none;
							padding:5px;
						}
						.photocard{
							width:50%;
						}
						.galerycard{
							max-width:50%;
						}
						button{
							background:white;
							border:none;
							padding:5px;
							cursor:pointer;
						}
						video{
							outline:none;
						}
						audio{
							outline:none;
						}
						#contentContainer{
							display:inline-block;
						}
						#lastOne{
							margin-bottom:10px;
						}
						.selectedCategory{
							font-weight:bold;
						}
						#bar-video{
							width:50%;
						}
						#category{
							justify-content:space-around;
						}
						#readerBox{
							width:50%;
						}
						#anouncebox{
							width:auto;
						}
						#contentBox{
							width:200px;
						}
						#contentBox div img{
							width:200px;
						}
						#titletohide{
							display:inline-block;
						}
						#choosebucket .choosed{
							background:rgb(1, 109, 115);
						}
						#choosebucket div{
							background:#04192f;
						}
						@media screen and (max-width:1032px){
							#content{
								width:100%;
							}
							.responsiveWidth{
								width:100%;
							}
							.footerSetting{
								justify-content:space-around;
								width:100%;
							}
							.footerItems{
								margin:0;
							}
							#profilePage{
								position:absolute;
								top:0;
								left:0;	
							}
							#finder{
								width:100%;
								justify-content:space-around;
							}
							header{
								width:100%;
								justify-content:space-around;
							}
							.photocard{
								width:100%;
							}
							.galerycard{
								max-width:95%;
							}
							#bar-video{
								width:100%;
							}
							#category{
								justify-content:space-between;
							}
							#readerBox{
								width:100%;
							}
							#anouncebox{
								width:100%;
							}
							#contentBox{
								width:100%;
							}
							#contentBox div img{
								width:100%;
							}
							#titletohide{
								display:none;
							}
							content{
								width:100%;
							}
						}
					</style>
					<link rel=icon href=file?fn=logos.png>
				</head>
				<body></body>
				<script src=https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js></script>
				<script src=https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js></script>
				<script src=https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js></script>
				<script src=/scripts?fn=infinity></script>
				<script src=/scripts?fn=components></script>
				<script>
					// TODO: Add SDKs for Firebase products that you want to use
					// https://firebase.google.com/docs/web/setup#available-libraries
					// Your web app's Firebase configuration
					const firebaseConfig = {
						apiKey: "AIzaSyDSqpU9jO82Jg_k5kfdb5huCBrGJk3EUD0",
						authDomain: "suitupchatter.firebaseapp.com",
						databaseURL: "https://suitupchatter-default-rtdb.asia-southeast1.firebasedatabase.app",
						projectId: "suitupchatter",
						storageBucket: "suitupchatter.appspot.com",
						messagingSenderId: "693883265417",
						appId: "1:693883265417:web:0587d29e45494275f80158"
					};

					// Initialize Firebase
					firebase.initializeApp(firebaseConfig);
					//auth process.
					firebase.auth().signInAnonymously().catch(err=>{
						console.log(err);
					});
					let userId,userRef,roomRef;
					firebase.auth().onAuthStateChanged(user=>{
						userId = user.uid;
						userRef = firebase.database().ref("users/"+userId);
						userRef.onDisconnect().remove();
						roomRef = firebase.database().ref("rooms");
						userRef.set({
							userId
						})
						header.find('#placeId').innerHTML = "ID:"+userId;
						header.readyState = true;
						firebase.database().ref('users').on('child_removed',(e)=>{
							const leaveData = e.val();
							if(header.opponent&&leaveData.userId===header.opponent){
								header.onUserLeave();
							}
						})
					})
					
					</script>
				<script src=/scripts?fn=flex></script>
			</html>
		`;
	}
}