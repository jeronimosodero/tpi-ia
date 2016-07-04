var nameLuciernagas = [];

 $(document).ready(function(){

    $('.modal-trigger').leanModal();
    $('#initialPopulation').val(initialPopulation);
    $('#maxgen').val(MAX_GEN);
    $('#attrac').val(attractiveness);
    $('#ale').val(randomness);
    $('#fvm').val(fvm);
    $('#mpml').val(mpml);

	$('.tooltipped').tooltip({delay: 50});
  });

function mostrarLuciernagas(luciernagas, container, history){
	var errore;
	for(var i=0; i < luciernagas.length; i++) {
		if (error(luciernagas[i])==0) {errore=true} else {errore=false;}
		mostrarLuciernaga(luciernagas[i],container, i, history, errore)
	}
	$('.tooltipped').tooltip({delay: 50});

}

function mostrarLuciernaga(luc, container, i, history, color){

	var op1 = readOp1(true);
	var op2 = readOp2(true);
	var res = readRes(true);
	var operator = readOperator();

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

		var operation;

		if (operator == "add") operation = "+";
		if (operator == "remove") operation = "-";

		var porError = error(luc);

		var optimus =  'blue-grey darken-1 white-text';

		var optimuss= 'white-text';

		if (color)  {optimuss = 'optimus' ;optimus = 'optimus';}

		var white;

		var moo = '';

		if (history) moo = '<a class="modal-trigger '+optimus+' tooltipped" data-position="top" data-delay="50" data-tooltip="Historia" href="#modal'+i+'" style="float: right;"><i class="tiny material-icons">book</i></a>'

		var html = '<div class="col l3 s12 m6">\
						<div class="card '+optimus+'">\
							<div class="card-content">\
								<i class="material-icons" style="font-size: large;">adb</i>\
									<span class="card-title">'+nameLuciernagas[i]+'<sub>['+i+']</sub></span>'+moo+'\
									<br>\
									'+textop1+'<span style="float: left;">'+operation+'</span>\
									'+textop2+'<div class="divider"></div>'+textres+'</div>\
									<div class="divider"></div>\
									<div class="bright card-content">\
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
			'class':'col s12 l1 rere',
			'html': html
		}).appendTo(container)
}

function appendShuffle(shuffle,container){
		var html = '<p>'+shuffle+'</p>\
		<i class="material-icons" style="font-size: -webkit-xxx-large">shuffle</i>\
		<p>Azar</p>';

	$('<div/>', {
			'class':'col s12 l1 rere',
			'html': html
		}).appendTo(container)
}

function appendCiclo(ciclo,container){
		var html = '<p>'+ciclo+'</p>\
		<i class="material-icons" style="font-size: -webkit-xxx-large">replay</i>\
		<p>Ciclo</p>';

	$('<div/>', {
			'class':'col s12 l1 rere',
			'html': html
		}).appendTo(container)
}

function appendSalto(error,container,ciclo){
		var html = '<div class="card red darken-1 white-text">\
							<div class="card-content">\
								<p>En el ciclo <b>'+ciclo+'</b> esta luciernaga permaneció '+mpml+' ciclos con error <b>'+error+'</b> y se le fue aplicada un vector aleatorio <b>'+randomness+'</b></p>\
							</div>\
					</div>'

	$('<div/>', {
			'class':'col s12 l12',
			'html': html
		}).appendTo(container)
}

function showHistory(luc1,luc2,dist,heter,i,j,k,time){
	if (!isNaN(k%fvm) && (k%fvm)==0){
		var container = '#modalrow'+j;
		if (time){
			appendCiclo(k,container);
			mostrarLuciernaga(luc2,container,j, false, false);
		} else {
			appendTrending(dist,container);
			mostrarLuciernaga(luc1,container,i, false, false);
			appendShuffle(heter,container);
			mostrarLuciernaga(luc2,container,j, false, false);
		}
	}
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


function changeOperator(){

	var operator = $('#operator i');

	if (operator.html()=="add") operator.html("remove")
	else if (operator.html()=="remove") operator.html("add");

}

function checkInput(){

	var operador1 = readOp1(true);
	var operador2 = readOp2(true);
	var resultado = readRes(true);

	var max;

	var unicos = [];
	var suma = operador1 + operador2 + resultado;

	var operator = $('#operator i').html();

	for (i = 0;i < suma.length; i++) {
		if(unicos.indexOf(suma[i])==-1){
			unicos.push(suma[i]);
		}
	}

	if (unicos.length > 10){
		Materialize.toast('Existen mas de 10 caracteres en el problema.', 4000);
		return false;
	}

	for (var i = 0; i < unicos.length; i++) {
		if (isNaN(unicos[i]) == false) {
			Materialize.toast('Los operadores no puede contener dígitos.', 4000);
			return false;
		}
	};

	if (resultado.length == 0){
		Materialize.toast('El resultado esta vacío', 4000);
		return false;
	}

	if (operador1.length == 0){
		Materialize.toast('El primer operador es vacío', 4000);
		return false;
	}

	if (operador2.length == 0){
		Materialize.toast('El segundo operador es vacío', 4000);
		return false;
	}

	if (operador1.length > operador2.length) max = operador1
		else max = operador2;

 	if (operator == "add"){
		if (max.length > resultado.length){
			Materialize.toast('El resultado no tiene los suficientes caracteres', 4000);
			return false;
		}
	}

	if (resultado.length > max.length+1){
		Materialize.toast('El resultado es muy largo', 4000);
		return false;
	}

	if (operator == "remove"){
		if (operador1.length < operador2.length){
			Materialize.toast('El primer operador es muy corto', 4000);
			return false;
		}
		if (resultado.length > max.length){
			Materialize.toast('El resultado tiene muchos caracteres', 4000);
			return false;
		}
	}

	return true;
}

function scrollDown(element){
	$('html, body').animate({
         scrollTop: $(element).offset().top
    }, 1000);
 }

 function replaceName(index, previousName, newName){ 

  	var previousHtml = previousName + '<sub>['+ index + ']</sub>';
 	var newHtml = newName + '<sub>['+ index + ']</sub>';

 	$('span').html(function(index,oldhtml){
 		if (oldhtml==previousHtml) return newHtml;
 	})

 	jQuery(":header").html(function(index,oldhtml){
 		if (oldhtml==('Historia de '+previousHtml)) return 'Historia de '+ newHtml;
 	})

 }

function checkSolutions(luciernagas){
	var soluciones =[];
	
	for (var i = 0; i < luciernagas.length; i++) if (error(luciernagas[i])==0) soluciones.push(i);
	
	return soluciones;
}


function addSummary(ciclo, soluciones){

		var solucioneshtml = '';

		for (var i = 0; i < soluciones.length; i++) {
			solucioneshtml+= nameLuciernagas[soluciones[i]] + '<sub>['+soluciones[i]+']</sub> '
		};

		var html = '<div class="card optimus" style="padding-bottom: 20px;">\
							<div class="card-content">\
								<div class="col s6"><p>Solución/es: <b>'+solucioneshtml+'</b></p></div>\
								<div class="col s6"><p>Ciclos requeridos: <b>'+ciclo+'</b></p></div>\
							</div>\
					</div>'

	$('<div/>', {
			'class':'col s12 l12',
			'html': html
		}).appendTo('#pobfin')

}

function update(){
	initialPopulation = parseInt($('#initialPopulation').val());
	MAX_GEN = parseInt($('#maxgen').val());
	attractiveness = parseFloat($('#attrac').val());	
	randomness = parseInt($('#ale').val());
	fvm = parseInt($('#fvm').val());
	mpml = parseInt($('#mpml').val());
}


function clrscr(){
	$("#poblacionfinal").remove();

	var container;
	for (var i = 0; i < initialPopulation; i++) {
		container = '#modal'+i;
		$(container).remove();
	};
	
}