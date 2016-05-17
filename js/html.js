

function mostrarLuciernagas(luciernagas){

	leerInput();


	for(var i=0; i < luciernagas.length; i++){
		split();
		var textop1 = '<p style="text-align: right;"> '
		var textop2 = '<p style="text-align: right;"> '
		var textres = '<p style="text-align: right;"> '
		
		for (var j = 0; j < op1.length; j++) {
			textop1 += luciernagas[i][op1[j]];
			textop1 += '<sub> ';
			textop1 += [op1[j][0]];
			textop1 += '</sub> ';
		};
		textop1 += '</p>';

		for (var j = 0; j < op2.length; j++) {
			textop2 += luciernagas[i][op2[j]];
			textop2 += '<sub> ';
			textop2 += [op2[j]][0];
			textop2 += '</sub> ';
		};
		textop2 += '</p>';

		for (var j = 0; j < res.length; j++) {
			textres += luciernagas[i][res[j]];
			textres += '<sub> ';
			textres += [res[j][0]];
			textres += '</sub> ';
		};
		textres += '</p>';

		var porError = (error(luciernagas[i])/maxError())*100

		$('<div/>', {
			'class':'col s3',
			'html': '<div class="card blue-grey darken-1">\
			<div class="card-content white-text">\
			<img src="css/firefly.png" style="width:20px;height:20px; color: white">\
			<span class="card-title">'+nameLuciernagas[i]+'</span>\
			<br>\
			'+textop1+'<span style="float: left;">+</span>'+textop2+'<div class="divider"></div>'+textres+'\
			</div>\
			<div class="divider"></div>\
			<div class="card-content white-text" style="padding-top: 7px; padding-bottom: 5px;">\
			<div class="row" style="margin-bottom: 0px; margin-top: 5px; margin-right: 0px;\
			margin-left: 0px;"><div class="col s3"><i style="float: left" class="tiny material-icons">brightness_5</i></div>\
			<div class="progress col s9" ><div class="determinate" style="width:'+porError+'%"></div></div>\
			</div></div>\
			</div>'
		}).appendTo('#fireflys');
	}

}


