function acercar(paso,toler, luciernagas, i, j){
	var min = paso - toler;
	var max = paso + toler;
	//console.log("min: ",min," max: ",max)
	

	var dist = distanciaManhattan(luciernagas[i],luciernagas[j]);
	if (max > dist) max = dist;
	if (min < 0) min = 0;

	//console.log("min: ",min," max: ",max)
	var luc2t;
	
	for (var x in luciernagas[j]) {
		
		luc2t = jQuery.extend({}, luciernagas[j]);
	
		if (luciernagas[j][x] != luciernagas[i][x]) {

			//console.log("luciernaga antes (",error(luciernagas[j]),") : ");
			//consoleLuc(luciernagas[j]);


		var resg = luciernagas[j][x];
				
		var ind = searchbyNum(luciernagas[j],luciernagas[i][x])
		
		luciernagas[j][x]=luciernagas[i][x];

		if (ind) luciernagas[j][ind] = resg;

		var newDist = distanciaManhattan(luciernagas[i],luciernagas[j]);
		

		//console.log("newDist: ",newDist," dist: ", dist)
		if ((newDist >= (dist-max)) && (newDist < (dist-min))) break;
		
		if ((newDist >= dist) || (newDist < (dist-max))){ 
			//console.log("callback");
			luciernagas[j] = luc2t ;luc2t= null	
		} else {
			//console.log("luciernaga dsp(sin callback) (",error(luciernagas[j]),") : ");
			consoleLuc(luciernagas[j])
		}
		
;
	}else {
		//console.log("no entra")
	}

	} 


	console.log("paso: ", paso);
	console.log("distancia inicial: ",dist);
	console.log("distancia final: ",distanciaManhattan(luciernagas[i],luciernagas[j]));
	console.log("diferencia",dist-distanciaManhattan(luciernagas[i],luciernagas[j]));
	console.log("luciernaga movida (",error(luciernagas[j]),") : ");
	consoleLuc(luciernagas[j]);
	

	
	return (dist-distanciaManhattan(luciernagas[i],luciernagas[j]));
}

function heterogeneidad(luciernagas){
	var c=0;

	for (var i = 0; i < luciernagas.length; i++) {
		for (var j = i+1; j < luciernagas.length; j++) {
			if (equals(luciernagas[i],luciernagas[j])){
				c++;
			}
			
		};
	};

	return c
}

function random(luciernagas,heter,j){

	var vic1=0;
	var indvic1;
	var vic2=0;
	var indvic2;
	var resg=0;
	var nums;

	for (var i = 0; i < heter; i++) {
		
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

function getNumbers(luc){
	var array = [];
	for (var x in luc) array.push(luc[x]);
	return array
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

/*function acercar(luc1,luc2,min){

	//console.log(luc1,luc2);

	var dist = distanciaManhattan(luc1,luc2);
	//console.log("distancia: ", dist);
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
