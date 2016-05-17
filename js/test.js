f1 = {"S":5,"E":7,"N":1,"D":8,"M":2,"O":9,"R":6,"Y":0}
f2 = {"S":2,"E":7,"N":1,"D":5,"M":9,"O":3,"R":6,"Y":4}




function acercar(luc1,luc2,min){

	var dist = distanciaManhattan(luc1,luc2);
	while (distanciaManhattan(luc1,luc2)+min>dist){
		console.log("while1");

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



	//if libres = [] 

		var letra = max(resta); //M

		//var index = Math.trunc(Math.random()*libres.length);
		var index = 0;
		while ((Math.abs(luc1[letra]-libres[index]) >= resta[letra]) && (index < libres.length)) {
			console.log("while2");
			index++;
		}

		if(Math.abs(luc1[letra]-libres[index]) < resta[letra]){
			luc2[letra]=libres[index]

		}
	}
}


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
