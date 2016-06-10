
var promedio=0;
var contar=0;


function acercar(max,luciernagas,i,j){
	//var nanana;
	//contar++;
	

	var dist = distanciaManhattan(luciernagas[i],luciernagas[j]);
	//console.log("--------------------------------")

	//console.log("distancia entre ",i," y ",j," antes: ",dist);
/*	console.log("luciernaga que se queda quieta:");
	consoleLuc(luciernagas[i]);
	console.log("luciernaga que se mueve:");
	consoleLuc(luciernagas[j]);*/

	/*console.log("max: ",max);
	console.log("luciernaga ", i);
	consoleLuc(luciernagas[i]);
	console.log("luciernaga ", j);
	consoleLuc(luciernagas[j]);*/
	/*console.log("paso: ",paso);
	console.log("toler: ", toler);
	console.log("min: ", min, " max: ", max);*/
	//console.log(" dist-max: ", dist-max);
	var luc2t;
	var distmovile;
	var c=0;
do {
	max=max+c;
	//if (c>0) console.log("aumento");

	for (var x in luciernagas[j]) {
		
		dismovile= distanciaManhattan(luciernagas[i],luciernagas[j]);
		luc2t = jQuery.extend({}, luciernagas[j]);
		/*console.log("ciclo en ",x);
		console.log("referencia luciernaga que se queda quieta");
		consoleLuc(luciernagas[i]);
		consoleLuc(luciernagas[j]);*/


		if (luciernagas[j][x] != luciernagas[i][x]) {

		var resg = luciernagas[j][x];
				
		var ind = searchbyNum(luciernagas[j],luciernagas[i][x])
		
		luciernagas[j][x]=luciernagas[i][x];

		if (ind) luciernagas[j][ind] = resg;
		//console.log("movimiento");
		//consoleLuc(luciernagas[j]);

		var newDist = distanciaManhattan(luciernagas[i],luciernagas[j]);
		//console.log(x,"nueva distancia",newDist)

		if (newDist == (dist-max)) {/*console.log("break")*/;break};
		
		if ((newDist >= distmovile) || (newDist < (dist-max))){			
			luciernagas[j] = luc2t;
			luc2t= null	;
			//console.log("callback");
			//consoleLuc(luciernagas[j]);
			
		} 
		
		}
	} 
	c=1;
} while ((dist-distanciaManhattan(luciernagas[i],luciernagas[j]))==0);


	
	//console.log("distancia entre ",i," y ",j," despues:",(distanciaManhattan(luciernagas[i],luciernagas[j])));
	//console.log("diferencia: ",(dist-distanciaManhattan(luciernagas[i],luciernagas[j])))

	

/*
	console.log("paso: ", paso);
	console.log("distancia inicial: ",dist);
	console.log("distancia final: ",distanciaManhattan(luciernagas[i],luciernagas[j]));
	console.log("diferencia",dist-distanciaManhattan(luciernagas[i],luciernagas[j]));
	console.log("luciernaga movida (",error(luciernagas[j]),") : ");
	consoleLuc(luciernagas[j]);
	*/
	//nanana=(max-(dist-distanciaManhattan(luciernagas[i],luciernagas[j])));
	//console.log("nanana: ", nanana);
	//promedio+=nanana;
	//console.log("cont: ",contar," prom: ",promedio);
	return (dist-distanciaManhattan(luciernagas[i],luciernagas[j]));
}
/*

function acercar(paso,toler, luciernagas, i, j){
	var min = paso - toler;
	var max = paso + toler;
	//console.log("min: ",min," max: ",max)
	

	var dist = distanciaManhattan(luciernagas[i],luciernagas[j]);
	//console.log("--------------------------------")

	console.log("distancia antes:",dist);
	console.log("luciernaga que se mueve:");
	consoleLuc(luciernagas[j]);
	console.log("luciernaga que se queda quieta:");
	consoleLuc(luciernagas[i]);
	if (max > dist) max = dist;
	if (min < 0) min = 0;
	
	console.log("paso: ",paso);
	console.log("toler: ", toler);
	console.log("min: ", min, " max: ", max);
	console.log("dist-min: ", dist-min, " dist-max: ", dist-max);
	var luc2t;


	lucres = jQuery.extend({}, luciernagas[j]);
	
	for (var x in luciernagas[j]) {
		
		luc2t = jQuery.extend({}, luciernagas[j]);
		//console.log("ciclo en ",x);
		//console.log("referencia");
		//consoleLuc(luciernagas[i]);
		//consoleLuc(luciernagas[j]);



		if (luciernagas[j][x] != luciernagas[i][x]) {

		var resg = luciernagas[j][x];
				
		var ind = searchbyNum(luciernagas[j],luciernagas[i][x])
		
		luciernagas[j][x]=luciernagas[i][x];

		if (ind) luciernagas[j][ind] = resg;
		//console.log("movimiento");
		//consoleLuc(luciernagas[j]);

		var newDist = distanciaManhattan(luciernagas[i],luciernagas[j]);
		//console.log(x,"nueva distancia",newDist)

		if ((newDist >= (dist-max)) && (newDist <= (dist-min))) {console.log("break");break};
		
		if ((newDist >= dist) || (newDist < (dist-max))){			
			luciernagas[j] = luc2t;
			luc2t= null	;
			//console.log("callback");
			//consoleLuc(luciernagas[j]);
			
		} 
		
		}
	} 


	if ((distanciaManhattan(luciernagas[i],luciernagas[j])) > (dist-min)) {console.log("se movio pero no quedo en el rango")}
	//console.log("distancia despues:",(distanciaManhattan(luciernagas[i],luciernagas[j])));
	//console.log("diferencia: ",(dist-distanciaManhattan(luciernagas[i],luciernagas[j])))

	if ((dist-distanciaManhattan(luciernagas[i],luciernagas[j]))==0) console.log("no se movio");


	console.log("paso: ", paso);
	console.log("distancia inicial: ",dist);
	console.log("distancia final: ",distanciaManhattan(luciernagas[i],luciernagas[j]));
	console.log("diferencia",dist-distanciaManhattan(luciernagas[i],luciernagas[j]));
	console.log("luciernaga movida (",error(luciernagas[j]),") : ");
	consoleLuc(luciernagas[j]);
	

	
	return (dist-distanciaManhattan(luciernagas[i],luciernagas[j]));
}*/
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
