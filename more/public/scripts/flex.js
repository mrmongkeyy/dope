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
		}
	})
	document.body.addChild(main);
}
