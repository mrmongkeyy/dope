const header = makeElement('header',{
	addChildShoudlBeIgnored:true,
	style:`
		display:flex;
		height:10%;
		align-items:center;
		border-bottom:1px solid white;
		background:#05274a;
		color:white;
		justify-content:space-between;
	`,
	innerHTML:`
		<div
		style="
			margin-left:20px;
			display:flex;
			width:50%;
			align-items:center;
		"
		>
			<div
			style="
				display:flex;
				align-items:center;
				margin-right:5px;
			"
			>
				<img src=/file?fn=logos.png
				style="
					width:32px;
					height:29px;
				"
				>
			</div>
			<div>
				<span
				style="
					font-size:20px;
				"
				>MetaDope</span><br>
				<span>The Drama of Personas.</span>
			</div>
			
		</div>
		<div
		style="
			margin-right:20px;
		"
		>
			<span id=placeId>ID: loading...</span>
		</div>
	`,
	onadded(){
	}
})

const content = makeElement('content',{
	style:`
		display:flex;
		height:80%;
		align-items:center;
		justify-content:center;
		flex-direction:column;
		background:#05274a;
	`,
	innerHTML:`
		<div
		style="
			font-weight:bold;
			padding:20px;
			background:#04192f;
		"
		>
			<div
			style="
				text-align:center;
			"
			>
				<img src=/file?fn=logos.png
				style="
					padding:5px;
					width:100px;
				"
				>
			</div>
			<div
			style="
				margin-top:20px;
				width:auto;
				padding:10px;
				background:white;
			"
			>
				<span
				>Anda bermain atas kemauan sendiri.</span>
			</div>
			<div
			style="
				margin-top:10px;
				padding:15px 0;
			"
			>
				<div
				>
					<span
					style="
						background:#465fac;
						color:white;
						padding:10px;
						cursor:pointer;
					"
					id=fightbutton
					>Main</span>
				</div>
			</div>
		</div>
	`,
	onadded(){
		const waitForSomeone = function(){
			const refAddress = `rooms/${userId}`;
			header.myroom = firebase.database().ref(refAddress);
			header.myroom.on('child_added',()=>{
				//someone is comming.
				//time to make chat base.
				header.chatRoom = firebase.database().ref(`chat/${userId}/0`);
				header.myroom.get().then(e=>{
					const opponent = e.val()[1];
					if(opponent){
						header.update({
							owner:true,
							opponent,
							addChildShoudlBeIgnored:false
						})
						JoinProcess();						
					}
				});
			})
		}
		this.find('#fightbutton').onclick = ()=>{
			if(!header.readyState)return;
			find('main').addChild(openLoading('Bersiap...',(thisel)=>{
				const obj = {};
				roomRef.get().then(e=>{
					const rooms = e.val();
					if(!rooms){
						//no rooms, make one.
						obj[userId] = [userId];
						roomRef.set(obj).then(()=>{waitForSomeone()});
					}else{
						let caninroom = null,roomname;
						for(let room in rooms){
							if(!rooms[room][1]){
								caninroom = rooms[room];
								roomname = room;
								break;
							}
						}
						if(caninroom){
							//find room to come in.
							caninroom.push(userId);
							header.myroom = firebase.database().ref('rooms/'+roomname);
							header.myroom.set(caninroom).then(()=>{
								header.chatRoom = firebase.database().ref(`chat/${roomname}/0`);
								header.update({
									chatRoom:firebase.database().ref(`chat/${roomname}/0`),
									opponent:roomname,
									addChildShoudlBeIgnored:false
								});
								JoinProcess();
							});
						}else{
							//room is full.
							//build one.
							rooms[userId] = [userId];
							roomRef.set(rooms).then(()=>{waitForSomeone()});
						}
					}
				})
			}));
		}
	}
})

const JoinProcess = function(removeable){
	find('#loadingDiv').remove();
	content.clear();
	content.addChild(makeElement('div',{
		style:`
			width:100%;
			height:100%;
			display:flex;
			flex-direction:column;
		`,
		innerHTML:`
			<div
			style="
				padding:20px;
				font-weight:bold;
				display:flex;
				justify-content:center;
				background:#05274a;
			"
			>
				<div id=morebutton
				style="
					display:none;
					align-items:center;
				"
				>
					<div
					style="
						margin-right:5px;
					"
					>
						<span
						style="
							padding:5px;
							background:#465fac;
							color:white;
							cursor:pointer;
						"
						id=rematch
						>Rematch</span>
					</div>
					<div>
						<span
						style="
							padding:5px;
							background:#465fac;
							color:white;
							cursor:pointer;
						"
						id=newgame
						>New game</span>
					</div>
				</div>
				<div id=timer
				style="
					padding:5px;
					background:#04192f;
					color:white;
					margin-left:5px;
				"
				>
					<span>
						180s left.
					</span>
				</div>
			</div>
			<div
			style="
				height:90%;
				display:flex;
				align-items:center;
				justify-content:center;
				background:#05274a;
			"
			>
				<div
				style="
					height:100%;
					display:flex;
					align-items:center;
					justify-content:flex-start;
					flex-direction:column;
					margin-right:5px;
					background:#05274a;
				"
				id=choosebucket
				>
					<div
					style="
						margin:10px;
						width:150px;
						height:150px;
						display:flex;
						align-items:center;
						justify-content:center;
						cursor:pointer;
						flex-direction:column;
						margin-top:0;
					"
					>
						<img src=/file?fn=scisors.png
						style="
							width:64px;
							height:64px;
							border-radius:50%;
						"
						>
						<span value=0
						style="
							color:#00f3ff;
							margin-top:5px;
						">Scisors</span>
					</div>
					<div
					style="
						margin:10px;
						width:150px;
						height:150px;
						display:flex;
						align-items:center;
						justify-content:center;
						cursor:pointer;
						flex-direction:column;
						margin-top:0;
					"
					>
						<img src=/file?fn=rock.png
						style="
							width:64px;
							height:64px;
							border-radius:50%;
						"
						>
						<span value=1
						style="
							color:#00f3ff;
							margin-top:5px;
						">Rock</span>
					</div>
					<div
					style="
						width:150px;
						height:150px;
						margin:10px;
						display:flex;
						align-items:center;
						justify-content:center;
						cursor:pointer;
						flex-direction:column;
						margin-top:0;
					"
					>
						<img src=/file?fn=paper.png
						style="
							width:64px;
							height:64px;
							border-radius:50%;
						"
						>
						<span value=2
						style="
							color:#00f3ff;
							margin-top:5px;
						"
						>Paper</span>
					</div>
				</div>
				<div
				style="
					height:100%;
					width:100%;
					display:flex;flex-direction:column;
					justify-content:space-between;
					align-items:center;
					padding:0 10px;
					margin-left:5px;
					background:#05274a;
				"
				>
					<div
					style="
						padding:10px;
						display:flex;
						align-items:center;
						justify-content:flex-start;
						width:100%;
						padding-top:0;
					"
					>
						<input
						style="
							padding:10px;
							margin-right:2px;
							font-weight:bold;
						"
						placeholder="Tulis pesanmu disini..."
						><button
						style="
							padding:10px;
							background:#465fac;
							color:white;
						"
						id=sendButton
						>Send</button>
						<div
						style="
							padding:10px;
							margin-left:5px;
							width:100%;
							display:flex;
							justify-content:flex-end;
						"
						>
							<button
							style="
								padding:10px;
								background:#465fac;
								color:white;
							"
							id=clearChatBox
							>Clear</button>
						</div>
					</div>
					<div
					style="
						height:100%;
						width:100%;
						overflow:auto;
						background:#04192f;
						margin-bottom:10px;
					"
					id=chatBox
					>
						<div
						style="
							padding:10px 10px 0 10px;
							margin-bottom:5px;
							color:white;
						"
						>
							<span
							style="
								font-weight:bold;
								color:#00f3ff;
							"
							>System</span> Talk to your opponent, read the personalities, manipulate, then beat him.
						</div>
					</div>
				</div>
			</div>
		`,
		onadded(){
			//handling opponent jutsu's coming.
			header.myroom.on('child_added',(e)=>{
				header.myroom.get().then(async(e)=>{
					let data = e.val();
					if(data[4]){
						//mean that another client is agree to rematch.
						data = data.slice(0,2);
						if(header.sendRematch)await header.myroom.set(data);
						time = 180;
						hideElement(find('#morebutton'));
						header.theBox.classList.remove('choosed');
						header.update({
							clicked:false,
							restTime:false,
							timesUp:false,
							onWinner:null,
							sendRematch:false
						});
						header.rematch = true;
					}else if(data[3] && data[3]!==userId){
						rematchHandler();
					}else if(data[2]){
						if(header.sendRematch)return;
						displayMsg(this,`${data[2][0][1]===userId?'You':'Opponent'} just set the jutsu!`,'System')
					}
				})
			})
			//handling user leave.
			header.onUserLeave = async()=>{
				await header.myroom.remove();
				await header.chatRoom.remove();
				displayMsg(this,'Opponent just leave you alone!','System');
				displayMsg(this,`${header.winner===undefined?'You win! yayy! ':''}Reloading in 5s.`,'System');
				time = 5;
				header.userLeave = true;
			}
			//chat room work.
			header.chatRoom.on('value',()=>{
				header.chatRoom.get().then(e=>{
					const data = e.toJSON();
					if(data.from!=userId)displayMsg(this,data.msg,'Opponent');
				})
			})
			let backablebox;
			//give more button, event.
			const mapevent = {
				rematch(el){
					if(header.userLeave){
						displayMsg(el,'Cannot, Sending Rematch request.','System');
						return;
					}
					header.myroom.get().then((e)=>{
						const data = e.val();
						data.push(userId);
						header.sendRematch = true;
						header.myroom.set(data).then(()=>{
							displayMsg(el,'Rematch request sended! Waiting for the response.','System');
						})
					})
				},
				newgame(){
					//check for making user room.
					location.reload();
				}
			}
			this.findall('#morebutton span').forEach(button=>{
				button.onclick = ()=>{
					mapevent[button.id](this);
				}
			})
			//give event to all box.
			this.findall('#choosebucket div').forEach(box=>{
				box.onclick = ()=>{
					if(header.clicked || header.timesUp)return;
					backablebox = box;
					const value = box.querySelector('span').getAttribute('value');
					setJutsu(value,()=>{
						header.clicked = true;
						box.classList.add('choosed');
						header.theBox = box;
						header.onWinner = async()=>{
							displayMsg(this,`${null===header.winner?'Draw':header.winner===userId?'You win':'You loze'}!`,'System');
							restTime();
						}
					})
				}
			})
			//define rest time function.
			const restTime = ()=>{
				displayMsg(this,'Rest time 60s','System');
				showElement(find('#morebutton'),'flex');
				header.restTime = true;
				time = 60;
			}
			//time work.
			let time = 180;
			const timeInterval = setInterval(async()=>{
				time-=1;
				this.find('#timer').innerHTML = `${time}s left.`;
				if(time<=0){
					header.timesUp = true;
					if(header.userLeave){
						location.reload();
					}else if(header.restTime){
						clearInterval(timeInterval);
						//time to reset all things.
						const roomid = header.roomid;
						await header.myroom.remove();
						if(header.owner) await header.chatRoom.remove();
						await userRef.remove();
						location.reload();
					}else{
						//force check.
						//time is up. but, the game logic isnt called yet.
						displayMsg(this,`${!header.clicked?!header.opponentSetted?'Draw':'You Loze':'You Win'}!`,'System');
						restTime();
					}
				}
			},1000)
			const displayMsg = function(el,msg,from){
				const div = makeElement('div',{
					style:`
						padding:0 10px;
						margin-bottom:5px;
						color:white;
					`,
					innerHTML:`
						<span
						style="
							font-weight:bold;
							color:#00f3ff;
						"
						>${from}</span> ${msg}
					`,
				})
				el.find('#chatBox').appendChild(div);
				div.scrollIntoView();
			}
			this.find('#sendButton').onclick = ()=>{
				if(header.userLeave){
					displayMsg(this,'You alone, cannot send the message.','System');
					return;
				}
				const msg = this.find('input').value.length<1?'Nope...':this.find('input').value;
				const data = {msg,from:userId};
				header.chatRoom.set(data).then(()=>{
					this.find('input').value = '';
					displayMsg(this,msg,'You');
				})
			}
			this.find('#clearChatBox').onclick = ()=>{
				this.find('#chatBox').querySelectorAll('div').forEach((div,i)=>{
					if(i===0){
						div.innerHTML = `
							<span
							style="
								font-weight:bold;
								color:#00f3ff;
							"
							>System</span> Chat cleared.
						`;
					}else div.remove();
				})
			}
			//work on enter send chat.
			this.find('input').onfocus = ()=>{
				this.find('input').onkeydown = (e)=>{
					//adding some kind of cool functionality.
					if(e.keyCode===13){
						this.find('#sendButton').click();
					}
				}
			}
		}
	}))
}

const rematchHandler = function(){
	find('main').addChild(makeElement('div',{
		style:`
			background:rgb(0,0,0,0.5);
			position:absolute;
			width:100%;
			height:100%;
			top:0;
			left:0;
			display:flex;
			align-items:center;
			justify-content:center;
		`,
		innerHTML:`
			<div
			style="
				padding:20px;
				background:#05274a;
			"
			>
				<div
				style="
					padding:10px;
					color:white;
					font-weight:bold;
				"
				>
					<span>Rematch Request!</span>
				</div>
				<div id=buttons
				style="
					display:flex;
					align-items:center;
					justify-content:center;
				"
				>
					<div
					style="
						padding: 5px;
						background: #465fac;
						color: white;
						margin-right: 5px;
						cursor: pointer;
					"
					>
						<span id=yes>Yes</span>
					</div>
					<div
					style="
						padding: 5px;
						background: #465fac;
						color: white;
						cursor: pointer;
					"
					>
						<span id=no>No</span>
					</div>
				</div>
			</div>
		`,
		onadded(){
			const mapEvent = {
				yes(el){
					//setting for user that getting the request.
					header.myroom.get().then(e=>{
						const data = e.val();
						data.push(userId);
						header.myroom.set(data).then(()=>{
							el.remove();
						});
					})
					
				},
				no(){
					location.reload();
				}
			}
			this.findall('#buttons span').forEach(button=>{
				button.onclick = ()=>{
					mapEvent[button.id](this);
				}
			})
		}
	}))
}

const setJutsu = function(value,callback){
	header.myroom.get().then((e)=>{
		let data = e.val();
		if(data[2]){
			//im in second position who input the jutsu!
			data[2][1] = [value,userId];
			//force checking!
			check(data[2]);
		}else{
			//so, im the first one.
			data[2] = [[value,userId]];
			if(!header.rematch||!header.setted){
				firebase.database().ref(`rooms/${header.myroom.key}/2`).on('child_added',(e)=>{
					const idata = e.val();
					if(idata[1]!=userId){
						header.myroom.get().then(e=>{
							const data = e.val();
							data[2].push(idata);
							check(data[2]);
						})
					}
				});
				header.setted = true;
			}
		}
		header.myroom.set(data).then(()=>{
			if(callback)callback();
		});
	});
	const check = function(datafrom){
		console.log(datafrom);
		let winner = null;
		let data = [[Number(datafrom[0][0]),datafrom[0][1]],[Number(datafrom[1][0]),datafrom[1][1]]];
		if(data[0][0]!=data[1][0]){
			//draw handling.
			if(data[0][0]+data[1][0]===1){
				winner = data[0][0]===1?0:1;
			}else if(data[0][0]+data[1][0]===3){
				winner = data[0][0]===2?0:1;
			}else if(data[0][0]+data[1][0]===2){
				winner = data[0][0]===0?0:1;
			}
		}
		header.winner = winner===null?null:data[winner][1];
		setTimeout(()=>{
			header.onWinner();
		},1000);
	}
}