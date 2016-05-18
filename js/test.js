f1 = {"M":0,"O":1,"S":3,"N":8,"E":6,"R":5,"Y":2,"D":4};
f2 = {"M":5,"O":7,"S":8,"N":1,"E":6,"R":4,"Y":0,"D":2};

function acercar(luc1,luc2,min,max){

	var dist = distanciaManhattan(luc1,luc2);
	console.log("distancia inicial: ", dist);
	consoleLuc(luc1);
	consoleLuc(luc2);
	var luct2t;
	
	for (var x in luc2) {

		luc2t = jQuery.extend({}, luc2);

		if (luc2[x] == luc1[x]) continue;

		var resg = luc2[x];
		//console.log("resguardo: ", resg);
		
		var ind = searchbyNum(luc2,luc1[x])
		//console.log("el valor ", luc1[x],"en luc2 esta en el indice: ",ind);

		luc2[x]=luc1[x];

		//console.log("luc2 en ",x," toma el valor ", luc2[x]," de luc1 en ", x);

		if (ind) luc2[ind] = resg;
		//console.log("luc2 temporal: ");
		//consoleLuc(luc2);


		var newDist = distanciaManhattan(luc1,luc2);
		//console.log("nueva distancia: ", newDist);

		if ((newDist >= (dist-max)) && (newDist < (dist-min))) break;

		if ((newDist > dist) || (newDist < (dist-max))){ luc2 = luc2t ;luc2t= null	}
		 
	}
	console.log("distancia inicial: ",dist);
	console.log("distancia final: ",distanciaManhattan(luc1,luc2));
	console.log("diferencia",dist-distanciaManhattan(luc1,luc2));
	consoleLuc(luc1);
	consoleLuc(luc2);

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

/*function acercar(luc1,luc2,min){

	console.log(luc1,luc2);

	var dist = distanciaManhattan(luc1,luc2);
	console.log("distancia: ", dist);
	while (distanciaManhattan(luc1,luc2)+min>dist){
		

		var libres= [];

		for(var i = 0; i<10; i++){
			if(!exists(luc2,i)){
				libres.push(i);
			}
		}

		var resta = {}

		for (var x in luc1){
			resta[x]=Math.abs(luc1[x]-luc2[x]);
		}


		var letra = max(resta); //M
		
		var index = 0;
		while ((Math.abs(luc1[letra]-libres[index]) >= resta[letra]) && (index < libres.length)) {
			
			index++;
		}

		if(Math.abs(luc1[letra]-libres[index]) < resta[letra]){
			luc2[letra]=libres[index]

		}
		
	}
}*/


function max(luc){

	var max=0;
	var let;

	for (var x in luc){
		if (luc[x]>max) {
			let=x;
			max=luc[x];
		}

	}

	return let
}
