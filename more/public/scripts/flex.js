document.body.onload = function(){
	document.body.style.margin = '0';
	const main = makeElement('main',{
		style:`
			display:flex;
			width:100%;
			height:100%;
			background:#04192f;
			position:absolute;
			flex-direction:column;
			font-family:monospace;
			align-items:center;
			justify-content:center;
		`,
		onadded(){
			this.addChild(header);
			this.addChild(content);
			this.addChild(makeElement('div',{
				style:`
					color:white;
					margin-top:10px;
					font-weight:bold;
				`,
				innerHTML:`
					Beta version by gema.
				`
			}))
			//small screen alert.
			if(innerWidth<400){
				const loading = openLoading('Opps, sepertinya anda menggunakan mobile. Yang mana saat ini belum support UI! Tunggu untuk melanjutkan!');
				this.addChild(loading);
				setTimeout(loading.remove,3000);
			}
		}
	})
	document.body.addChild(main);
}
