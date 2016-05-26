  $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
	
	document.getElementById("initialPopulation").setAttribute("value", initialPopulation);
	document.getElementById("maxgen").setAttribute("value", MAX_GEN);
	document.getElementById("attrac").setAttribute("value", attractiveness);
	document.getElementById("toler").setAttribute("value", tolerancia);

  });

function mostrarLuciernagas(luciernagas, container, history){

	for(var i=0; i < luciernagas.length; i++) mostrarLuciernaga(luciernagas[i],container, i, history)

}

function mostrarLuciernaga(luc, container, i, history){

	var op1 = readOp1(true);
	var op2 = readOp2(true);
	var res = readRes(true);

		var textop1 = '<p style="text-align: right;"> '
		var textop2 = '<p style="text-align: right;"> '
		var textres = '<p style="text-align: right;"> '
		
		for (var j = 0; j < op1.length; j++) {
			textop1 += luc[op1[j]];
			textop1 += '<sub> ';
			textop1 += [op1[j][0]];
			textop1 += '</sub> ';
		};
		textop1 += '</p>';

		for (var j = 0; j < op2.length; j++) {
			textop2 += luc[op2[j]];
			textop2 += '<sub> ';
			textop2 += [op2[j]][0];
			textop2 += '</sub> ';
		};
		textop2 += '</p>';

		for (var j = 0; j < res.length; j++) {
			textres += luc[res[j]];
			textres += '<sub> ';
			textres += [res[j][0]];
			textres += '</sub> ';
		};
		textres += '</p>';

		var porError = error(luc);

		var moo = '';

		if (history) moo = '<a class="modal-trigger" href="#modal'+i+'" style="float: right;color: white"><i class="tiny material-icons">book</i></a>'

		var html = '<div class="col s3">\
						<div class="card blue-grey darken-1">\
							<div class="card-content white-text">\
								<img src="css/firefly.png">\
									<span class="card-title">'+nameLuciernagas[i]+'<sub>['+i+']</sub></span>'+moo+'\
									<br>\
									'+textop1+'<span style="float: left;">+</span>\
									'+textop2+'<div class="divider"></div>'+textres+'</div>\
									<div class="divider"></div>\
									<div class="bright card-content white-text">\
										<div class="rbright row">\
											<div class="col s2" id="brighticon">\
											<i style="float: left;" class="tiny material-icons">brightness_5</i>\
											</div>\
											<div class="progress col s8"><div class="determinate" style="width:'+porError+'%"></div>\
										</div>\
										<p class="col s2 right">'+error(luc)+'</p>\
									</div>\
							</div>\
						</div>\
					</div>'

		$('<div/>', {
			'class':'luc',
			'html': html
		}).appendTo(container);

}

function checkIndex(luciernagas,luc){
	for (var i = 0; i < luciernagas.length; i++) {
		if (luciernagas[i] = luc) return i;
	};
	return -1;
}

function agregarPad(){
		var html = '<div class="container white-text">\
      					<h5>Población Final</h5>\
      					<div class="divider"></div>\
     					<br>\
      					<div class="row" id="pobfin">\
      					</div>\
    				</div>';

	$('<div/>', {
			'class':'section',
			'id': 'poblacionfinal',
			'style': 'background-color: rgba(158, 158, 158, 0.7)',
			'html': html
		}).appendTo("#fireflyfarm")
}


function appendTrending(trending,container){
		var html = '<p>'+trending+'</p>\
		<i class="material-icons" style="font-size: -webkit-xxx-large">trending_flat</i>\
		<p>Arrimo</p>';

	$('<div/>', {
			'class':'col s1',
			'style': 'text-align: center;margin-top: 50px;',
			'html': html
		}).appendTo(container)
}

function appendShuffle(shuffle,container){
		var html = '<p>'+shuffle+'</p>\
		<i class="material-icons" style="font-size: -webkit-xxx-large">shuffle</i>\
		<p>Azar</p>';

	$('<div/>', {
			'class':'col s1',
			'style': 'text-align: center;margin-top: 50px;',
			'html': html
		}).appendTo(container)
}

function appendCiclo(ciclo,container){
		var html = '<p>'+ciclo+'</p>\
		<i class="material-icons" style="font-size: -webkit-xxx-large">replay</i>\
		<p>Ciclo</p>';

	$('<div/>', {
			'class':'col s1',
			'style': 'text-align: center;margin-top: 50px;',
			'html': html
		}).appendTo(container)
}

function showHistory(luc1,luc2,dist,heter,luc2beforemuted,i,j,k){

	var container = '#modalrow'+j;

	appendCiclo(k,container);

	mostrarLuciernaga(luc2beforemuted,container,j, false);

	appendTrending(dist,container);

	mostrarLuciernaga(luc1,container,i, false);

	appendShuffle(heter,container);

	mostrarLuciernaga(luc2,container,j, false);

}

function modalsDisplay(){

	var html;

	for (var i = 0; i < initialPopulation; i++) {

		var html = '<div id="modal'+i+'" class="modal hist modal-fixed-footer">\
    					<div class="modal-content">\
     						<div class="row" id="modalrow'+i+'"></div></div>\
    					<div class="modal-footer">\
      						<h5>Historia de '+nameLuciernagas[i]+'<sub>['+i+']</sub></h5>\
    					</div>\
  					</div>';

  		$('<div/>', {
			'html': html
		}).appendTo('#modalfarm')
	};
}


