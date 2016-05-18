//esta todo mal
var MAX_GEN = 50;

var initialPopulation = 8;

var nameLuciernagas = [];

var operador1;
var operador2;
var resultado;

var op1;
var op2;
var res;


function run(){
	if (checkInput()) {
		mostrarLuciernagas(generarLuciernagas());
		mostrarLuciernagas(FA());
	}

}

function checkInput(){

	leerInput()

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



function leerInput(){
	operador1 = "";
	operador2 = "";
	resultado = "";
	operador1 = document.getElementById("operador1").value.trim().toUpperCase();
	operador2 = document.getElementById("operador2").value.trim().toUpperCase();
	resultado = document.getElementById("resultado").value.trim().toUpperCase();

}


function splitReverse(){
	op1 = operador1.split("").reverse();
	op2 = operador2.split("").reverse();
	res = resultado.split("").reverse();
}

function split(){
	op1 = operador1.split("");
	op2 = operador2.split("");
	res = resultado.split("");
}


function generarLuciernagas(){

	leerInput();

	var unicos = [];

	operador1 = operador1.split("").reverse().join("");
	operador2 = operador2.split("").reverse().join("");
	resultado = resultado.split("").reverse().join("");
	
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

function error(luc){
	splitReverse();
	var acarreo=0;
	var h=0;
	var error=0;

	for (var i = 0; i < res.length; i++) {
		h= acarreo - luc[res[i]];
		acarreo=0;

		if(i<op1.length) h=h+luc[op1[i]]
			if(i<op2.length) h=h+luc[op2[i]]


				if(h>=10){
					h=h-10;
					acarreo=1;
				}
				error+=Math.abs(h);
			};
			return  maxError() - error;
		}


		function distanciaManhattan(luc1,luc2){
			var distancia = 0;
			for (x in luc1){
				distancia+=Math.abs(luc1[x]-luc2[x]);
				/*console.log(luc1[x]," - ",luc2[x]," = ", Math.abs(luc1[x]-luc2[x]));
				console.log("acumulado: ", distancia);*/
			}
			return distancia;
		}


		function maxError(){
			return resultado.length *9
		}

		function FA(){

			var luciernagas = generarLuciernagas();
			
			var k = 0;

			while (k < MAX_GEN) {
				for (var i = 0; i < initialPopulation; i++) {
					for (var j = 0; j < initialPopulation; j++) {
					console.log("luciernaga ",i," (",error(luciernagas[i]),") con ",j," (",error(luciernagas[j]),")");

						if (error(luciernagas[i])<error(luciernagas[j])){
							
						acercar(luciernagas[i],luciernagas[j],2,5);
						console.log("luciernaga ",i," (",error(luciernagas[i]),") luciernaga",j," (",error(luciernagas[j]),")");

					
				}

			};
		};

		k++;
		console.log("ciclo:", k);
	}

	return luciernagas;

}







