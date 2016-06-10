function toNumber(luc,op){
	var res = "";
	for(var i =0; i<op.length;i++){
		res+=luc[op[i]];
	}
	return (parseInt(res));
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

function readOperator(){
	return document.getElementById("operator").getElementsByTagName("i")[0].innerHTML
}

function exists(luciernaga, nro) {
	for(var x in luciernaga){
		if(luciernaga[x]==nro){
			return true;
		}
	}
	return false;
}

function checkErrors(luciernagas){
	for (var i = 0; i < luciernagas.length; i++) {
		if (error(luciernagas[i])==0) return false
	};
return true
}

function maxLoc(cont,errores,max,luciernagas){
	for (var i = 0; i < cont.length; i++) {
		if (cont[i]>max) {
			cont[i]=0;
			random(luciernagas,randomness,i);
			errores[i]=error(luciernagas[i]);
		}
	};
}

function getNumbers(luc){
	var array = [];
	for (var x in luc) array.push(luc[x]);
	return array;
}

function equals(luc1,luc2){
	var band = true;
	for (var x in luc1) {
		if (luc1[x] !== luc2[x]) {
			band = false;
		}
	}
	return band;
}

function searchbyNum(luc,value){
	for (var x in luc) {
		if (luc[x]==value) return x;
	};
	return false;
}

function consoleLuc(luc){
	var string = "{";
	for (var x in luc){
		string += x +": " +luc[x] + ", ";
	};
	string+= "}";
	console.log(string);
}