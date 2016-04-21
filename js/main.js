//esta todo mal
var MAX_GEN = 1;

var initialPopulation = 10;

var nameLuciernagas = [];

var operador1;
var operador2;
var resultado;

var op1;
var op2;
var res;


function run(){
if (checkInput()) mostrarLuciernagas(generarLuciernagas())

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
	var suma = operador1 + operador2 + resultado;


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
	}
	return distancia;
}


function maxError(){
	return resultado.length *9
}

function FA(){

var luciernagas = generarLuciernagas();

var i = 0;

while (i < MAX_GEN) {
	for (var i = 0; i < initialPopulation; i++) {
		for (var j = 0; j < initialPopulation; j++) {			
			if (error(luciernagas[i])<error(luciernagas[j])){
					//i se tiene que mover hacia j
					console.log(distanciaManhattan(luciernagas[i],luciernagas[j]))
			}

		};
	};
}

	

}







