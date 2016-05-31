var nameLuciernagas = [];

function update(){
	//console.log("ddds");
	initialPopulation = document.getElementById("initialPopulation").value;
	MAX_GEN = document.getElementById("maxgen").value;
	attractiveness = document.getElementById("attrac").value;	
	tolerancia = document.getElementById("toler").value;
}

function run(){

	agregarPad();
	

	if (checkInput()) {
		var luciernagas = generarLuciernagas();
		modalsDisplay();

		mostrarLuciernagas(FA(luciernagas),'#pobfin',true);
		scrollDown('#poblacionfinal');
	}

$('.modal-trigger').leanModal();
	

}

function scrollDown(element){
	$('html, body').animate({
         scrollTop: $(element).offset().top
    }, 2000);

    
 }

function checkInput(){

	var operador1 = readOp1(true);
	var operador2 = readOp2(true);
	var resultado = readRes(true);

	var max;

	var unicos = [];
	var suma = operador1 + operador2 + resultado;


	for (i = 0;i < suma.length; i++) {
		if(unicos.indexOf(suma[i])==-1){
			unicos.push(suma[i]);
		}
	}

	if (operador1 == "COMO" && operador2 == "HACES" && resultado == "ESTO"){
		Materialize.toast('q se yo no soy 100tifiko', 4000);
		return false;
	}


	if (unicos.length > 10){
		Materialize.toast('Existen mas de 10 caracteres en el problema.', 4000);
		return false;
	}

	for (var i = 0; i < unicos.length; i++) {
		if (isNaN(unicos[i]) == false) {
			Materialize.toast('Los operadores no puede contener digitos.', 4000);
			return false;
		}
	};


	if (operador1.length > operador2.length) max = operador1
		else max = operador2;


	if (max.length > resultado.length){
		Materialize.toast('El resultado no tiene los suficientes caracteres', 4000);
		return false;
	}

	if (resultado.length > max.length+1){
		Materialize.toast('El resultado es muy largo', 4000);
		return false;
	}

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

	return true;
}

function readOp1(way){

	var input = document.getElementById("operador1").value.trim().toUpperCase();

	if (way) return input
		else return input.split("").reverse().join("");
}

function readOp2(way){
	var input = document.getElementById("operador2").value.trim().toUpperCase();

	if (way) return input
		else return input.split("").reverse().join("");
}

function readRes(way){
	var input = document.getElementById("resultado").value.trim().toUpperCase();

	if (way) return input
		else return input.split("").reverse().join("");
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

function exists(luciernaga, nro) {
	for(var x in luciernaga){
		if(luciernaga[x]==nro){
			return true;
		}
	}
	return false;
}

/*function error(luc){

	var op1 = readOp1(false);
	var op2 = readOp2(false);
	var res = readRes(false);

	var acarreo=0;
	var h=0;
	var error=0;

	for (var i = 0; i < res.length; i++) {
		h=acarreo-luc[res[i]];
		acarreo=0;

		if(i<op1.length) h=h+luc[op1[i]];
		if(i<op2.length) h=h+luc[op2[i]];
		var suma = luc[op1[i]] + luc[op2[i]]+acarreo;
		if(suma>=10){
			if(!(i == res.length-1 && i == op1.length-1 && i == op2.length-1)){
				h=h-10;
			}
			acarreo=1;
		}
		error+=Math.abs(h);
	};
	return  error;
}*/


function error(luc){
	var op1 = readOp1(true);
	var op2 = readOp2(true);
	var res = readRes(true);
	var error = Math.abs(toNumber(luc,res)-(toNumber(luc,op1)+toNumber(luc,op2)));
	var suma=0;
	var errorString = error.toString();
	for (var i = 0; i < errorString.length; i++) {
		suma+=parseInt(errorString[i]);
	};
	////console.log(toNumber(luc,res)+":"+toNumber(luc,op1)+":"+toNumber(luc,op2));
	////console.log(error);
	
	return suma;
}

function toNumber(luc,op){
	var res = "";
	for(var i =0; i<op.length;i++){
		res+=luc[op[i]];
	}
	return (parseInt(res));
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
	var heter;
	var dist;
	var luc2res;
	
	while (checkErrors(luciernagas) && k< MAX_GEN && otracosa(luciernagas)) {
		
		for (var i = 0; i < initialPopulation; i++) {

			for (var j = 0; j < initialPopulation; j++) {
				heter = heterogeneidad(luciernagas);
				luc2res = jQuery.extend({}, luciernagas[j]);
				if (error(luciernagas[i])<error(luciernagas[j])){
					
					

				console.log("-----------------------------------------------");
				console.log("luciernaga (quieta)",i," (",error(luciernagas[i]),")");
				consoleLuc(luciernagas[i]);	
				console.log("luciernaga (mueve)",j," (",error(luciernagas[j]),")");
				consoleLuc(luciernagas[j]);	

				dist = acercar(Math.trunc(distanciaManhattan(luciernagas[i],luciernagas[j])*attractiveness),tolerancia,luciernagas,i,j);
				
				

				console.log("heter: ", heter);
				//random(luciernagas,heter, j);
				console.log("luciernaga mutada (",error(luciernagas[j]),"): ");
				consoleLuc(luciernagas[j]); 
				//showHistory(luciernagas[i],luciernagas[j],dist,heter,luc2res,i,j,k);
				}/*else if( i != j && error(luciernagas[i])==error(luciernagas[j])){
					console.log("error igual");

				console.log("luciernaga antes de mutar cuando es igual",j," (",error(luciernagas[j]),")");
				consoleLuc(luciernagas[j]);

					random(luciernagas,2, j);
					showHistory(luciernagas[i],luciernagas[j],5987,2,luc2res,i,j,k);
					console.log("luciernaga despues de mutar cuando es igual",j," (",error(luciernagas[j]),")");
				consoleLuc(luciernagas[j]);
				}*/


			}

		}

		

		k++;
		
		console.log("ciclo:", k);
	}
	return luciernagas;
}

function otracosa(luciernagas){
	var c = error(luciernagas[0]);
	for (var i = 0; i < luciernagas.length; i++) {
		if (error(luciernagas[i])!=c) return true
	};
return false
}


function checkErrors(luciernagas){
	for (var i = 0; i < luciernagas.length; i++) {
		if (error(luciernagas[i])==0) return false
	};
return true
}






