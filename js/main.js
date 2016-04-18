/*var luciernaga1 = [{letra:"S",nro:0},{letra:"E",nro:1},{letra:"N",nro:2},{letra:"D",nro:3},{letra:"R",nro:4},{letra:"M",nro:5},{letra:"O",nro:6},{letra:"Y",nro:7}];

console.log(luciernaga1[0].nro);
*/

/*var luc1 = {};
luc1["S"] = 0;
luc1["E"] = 1;
luc1["N"] = 2;
luc1["D"] = 3;
luc1["R"] = 4;
luc1["M"] = 5;
luc1["O"] = 6;
luc1["Y"] = 7;
//console.log(luc1["S"]);
*/
var op1 = "SEND";
var op2 = "MORE";
var op3 = "MONEY";
var suma =op1  + op2 + op3;
var unicos = [];
for (i = 0;i < suma.length; i++) {
	if(unicos.indexOf(suma[i])==-1){
		unicos.push(suma[i]);
	}
}

var luciernagas = generarLuciernagas(10,unicos);
console.log(luciernagas);


function generarLuciernagas(cant,unicos){
	var luciernagas = [];
	for(j=0;j<cant;j++){
		var luc = {};
		for(i = 0; i<unicos.length;i++){
			var nro = Math.round(Math.random()*9);
			while(exists(luc,nro)){
				nro = Math.round(Math.random()*9);
			}
			luc[unicos[i]] = nro;
		}
		luciernagas.push(luc);
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