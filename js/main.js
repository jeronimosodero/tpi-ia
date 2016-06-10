var nameLuciernagas = [];

function update(){
	initialPopulation = parseInt(document.getElementById("initialPopulation").value);
	MAX_GEN = parseInt(document.getElementById("maxgen").value);
	attractiveness = parseFloat(document.getElementById("attrac").value);	
	randomness = parseInt(document.getElementById("ale").value);
	fvm = parseInt(document.getElementById("fvm").value);
	mpml = parseInt(document.getElementById("mpml").value);
}


function clrscr(){
	$("#poblacionfinal").remove();

	var container;
	for (var i = 0; i < initialPopulation; i++) {
		container = '#modal'+i;
		$(container).remove();
	};
	
}

function run(){


	clrscr();
	agregarPad();

	if (checkInput()) {
		var luciernagas = generarLuciernagas();
		modalsDisplay();
		mostrarLuciernagas(FA(luciernagas),'#pobfin',true);
		scrollDown('#poblacionfinal');
	}
	$('.modal-trigger').leanModal();
}


function generarLuciernagas(){

	var operador1 = readOp1(false);
	var operador2 = readOp2(false);
	var resultado = readRes(false);

	var unicos = [];

	var suma = "";

	for (var i = 0; i < resultado.length; i++) {
		
		if (i < operador1.length) suma += operador1[i];
		if (i < operador2.length) suma += operador2[i];
		suma += resultado[i];
	};

	suma = suma.split("").reverse().join("");

	for (i = 0;i < suma.length; i++) {
		if(unicos.indexOf(suma[i])==-1){
			unicos.push(suma[i]);
		}
	}

	var luciernagas = [];

	for(j=0;j<initialPopulation;j++){
		var luc = {};
		for(i = 0; i < unicos.length;i++){
			var nro = Math.round(Math.random()*9);
			while(exists(luc,nro)){
				nro = Math.round(Math.random()*9);
			}
			luc[unicos[i]] = nro;
		}
		luciernagas.push(luc);
		nameLuciernagas.push(chance.first());
	}
	return luciernagas;
}

function error(luc){
	var op1 = readOp1(true);
	var op2 = readOp2(true);
	var res = readRes(true);
	var operator = readOperator();

	var error;

	if (operator == "add") error = Math.abs(toNumber(luc,res)-(toNumber(luc,op1)+toNumber(luc,op2)));
	if (operator == "remove") error = Math.abs(toNumber(luc,res)-(toNumber(luc,op1)-toNumber(luc,op2)));
	var suma=0;
	var errorString = error.toString();
	for (var i = 0; i < errorString.length; i++) {
		suma+=parseInt(errorString[i]);
	};
	return suma;
}

function distanciaManhattan(luc1,luc2){
	var distancia = 0;
	for (x in luc1){
		distancia+=Math.abs(luc1[x]-luc2[x]);
	}
	return distancia;
}

function FA(luciernagas){
	var k = 0;
	var dist;
	var luc2res;
	var cont = [];
	var errores = [];

	for (var i = 0; i < luciernagas.length; i++) {
		cont[i]=0;
		errores[i]=error(luciernagas[i]);
	};
	
	while (checkErrors(luciernagas) && k < MAX_GEN) {

		for (var i = 0; i < initialPopulation; i++) cont[i]++;

		for (var i = 0; i < initialPopulation; i++) {
			for (var j = 0; j < initialPopulation; j++) {
				if (error(luciernagas[i])<error(luciernagas[j])){
				showHistory(luciernagas[i],luciernagas[j],dist,randomness,i,j,k,true);
				dist = acercar(Math.ceil(distanciaManhattan(luciernagas[i],luciernagas[j])*attractiveness),luciernagas,i,j);
				random(luciernagas,randomness, j);
				errores[j]=error(luciernagas[j]);
				cont[j]=0;
				showHistory(luciernagas[i],luciernagas[j],dist,randomness,i,j,k,false);
				}else if(i != j && equals(luciernagas[i],luciernagas[j])){
					random(luciernagas,randomness,j);
				}
				maxLoc(cont,errores,4,luciernagas);
			}
		}
		k++;
		//console.log("ciclo:", k);
	}
	return luciernagas;
}

function acercar(max,luciernagas,i,j){
	var dist = distanciaManhattan(luciernagas[i],luciernagas[j]);
	var luc2t;
	var distmovile;
	var c=0;
do {
	for (var x in luciernagas[j]) {
		dismovile= distanciaManhattan(luciernagas[i],luciernagas[j]);
		luc2t = jQuery.extend({}, luciernagas[j]);

		if (luciernagas[j][x] != luciernagas[i][x]) {
			var resg = luciernagas[j][x];
			var ind = searchbyNum(luciernagas[j],luciernagas[i][x])
			luciernagas[j][x]=luciernagas[i][x];
			if (ind) luciernagas[j][ind] = resg;
			var newDist = distanciaManhattan(luciernagas[i],luciernagas[j]);
			if (newDist == (dist-max)) break;
			if ((newDist >= distmovile) || (newDist < (dist-max))){
				luciernagas[j] = luc2t;
				luc2t= null	;
			} 
		}
	}
	max++;
} while ((dist-distanciaManhattan(luciernagas[i],luciernagas[j]))==0);

	return (dist-distanciaManhattan(luciernagas[i],luciernagas[j]));
}

function random(luciernagas,heter,j){

	var iter = Math.ceil(Math.random()*heter);
	var vic1=0;
	var indvic1;
	var vic2=0;
	var indvic2;
	var resg=0;
	var nums;

	for (var i = 0; i < iter; i++) {
		
		vic1 = Math.trunc(Math.random()*10);
		
		numb = getNumbers(luciernagas[j]);

		var index = numb.indexOf(vic1);
		if (index > -1) {
    		numb.splice(index, 1);
		}

		vic2 = Math.trunc(Math.random()*10);

		while ((vic2 == vic1) || ($.inArray(vic2, numb)<0)) vic2 = Math.trunc(Math.random()*10);
				
		indvic1=searchbyNum(luciernagas[j],vic1);
		indvic2=searchbyNum(luciernagas[j],vic2);

		if (indvic1) {
			luciernagas[j][indvic1]=vic2;
			luciernagas[j][indvic2]=vic1;
		} else {
			luciernagas[j][indvic2]=vic1;
		}
	};
}