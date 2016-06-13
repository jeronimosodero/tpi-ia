function test(){
	testCantLuciernagas();
	testAtract();
	testRandomness();
}


function testCantLuciernagas(){
	var cantidadCorridas = 100;
	var csvContent = "data:text/csv;charset=utf-8,";
	csvContent += "Cant. Luciernagas,Ciclo Menor,Ciclo Mayor,Promedio Ciclos,PromedioOK,Porcentaje soluciones,Tiempo Menor,Tiempo mayor,Promedio Tiempo"+"\r\n";
	for(initialPopulation = 10;initialPopulation<=10;initialPopulation++){
		console.log(initialPopulation);
		var ciclosOK = 0;
		var ciclos = 0;
		var soluciones = 0;
		var timeAcum = 0;
		var tiempoMayor = 0;
		var tiempoMenor = 9999999999999;
		var cicloMenor=MAX_GEN;
		var cicloMayor=0;
		for (var i = 0; i < cantidadCorridas; i++) {
			//var start = new Date().getTime();
			var start = performance.now();
			var cicloFin = FA2(generarLuciernagas());
			ciclos += cicloFin;
			if(cicloFin != MAX_GEN){
				//var end = new Date().getTime();
				var end = performance.now();
				var time = (end - start);
				timeAcum += time;
				ciclosOK += cicloFin;
				soluciones++;
				if(time<tiempoMenor) tiempoMenor=time;
				if(time>tiempoMayor) tiempoMayor=time;
				if(cicloFin<cicloMenor) cicloMenor=cicloFin;
				if(cicloFin>cicloMayor) cicloMayor=cicloFin;

			}
		};
		var promedioCiclosOK = ciclosOK / soluciones;
		var promedioCiclos = ciclos / cantidadCorridas;
		var porcentajeEncontradas = soluciones / cantidadCorridas * 100;
		var promedioTiempo = timeAcum / cantidadCorridas;
		csvContent += initialPopulation + ","+cicloMenor+","+cicloMayor+"," + promedioCiclos  + "," + promedioCiclosOK + "," + porcentajeEncontradas + ","+ tiempoMenor+","+ tiempoMayor+ "," + promedioTiempo + "\r\n";
	}
	generarCsv(csvContent);
}

function testAtract(){
	var cantidadCorridas = 100;
	var csvContent = "data:text/csv;charset=utf-8,";
	csvContent += "Atractividad,Ciclo Menor,Ciclo Mayor,Promedio Ciclos,PromedioOK,Porcentaje soluciones,Tiempo Menor,Tiempo mayor,Promedio Tiempo"+"\r\n";
	attractiveness = 0.1;
	while(attractiveness<=0.9){
		console.log(attractiveness);
		var ciclosOK = 0;
		var ciclos = 0;
		var soluciones = 0;
		var timeAcum = 0;
		var tiempoMayor = 0;
		var tiempoMenor = 9999999999999;
		var cicloMenor=MAX_GEN;
		var cicloMayor=0;
		for (var i = 0; i < cantidadCorridas; i++) {
			var start = new Date().getTime();
			var cicloFin = FA2(generarLuciernagas());
			ciclos += cicloFin;
			if(cicloFin != MAX_GEN){
				var end = new Date().getTime();
				var time = (end - start);
				timeAcum += time;
				ciclosOK += cicloFin;
				soluciones++;
				if(time<tiempoMenor) tiempoMenor=time;
				if(time>tiempoMayor) tiempoMayor=time;
				if(cicloFin<cicloMenor) cicloMenor=cicloFin;
				if(cicloFin>cicloMayor) cicloMayor=cicloFin;

			}
		};
		var promedioCiclosOK = ciclosOK / soluciones;
		var promedioCiclos = ciclos / cantidadCorridas;
		var porcentajeEncontradas = soluciones / cantidadCorridas * 100;
		var promedioTiempo = timeAcum / cantidadCorridas;
		csvContent += attractiveness + ","+cicloMenor+","+cicloMayor+"," + promedioCiclos  + "," + promedioCiclosOK + "," + porcentajeEncontradas + ","+ tiempoMenor+","+ tiempoMayor+ "," + promedioTiempo + "\r\n";
		attractiveness += 0.1;
	}
	generarCsv(csvContent);
}

function testRandomness(){
	var cantidadCorridas = 100;
	var csvContent = "data:text/csv;charset=utf-8,";
	csvContent += "Aleatoridad,Promedio Ciclos,PromedioOK,Porcentaje soluciones"+"\r\n";
	for(randomness = 0;randomness<=6;randomness++){
		console.log(randomness);
		var ciclosOK = 0;
		var ciclos = 0;
		var soluciones = 0;
		var timeAcum = 0;
		var tiempoMayor = 0;
		var tiempoMenor = 9999999999999;
		var cicloMenor=MAX_GEN;
		var cicloMayor=0;
		for (var i = 0; i < cantidadCorridas; i++) {
			var start = new Date().getTime();
			var cicloFin = FA2(generarLuciernagas());
			ciclos += cicloFin;
			if(cicloFin != MAX_GEN){
				var end = new Date().getTime();
				var time = (end - start);
				timeAcum += time;
				ciclosOK += cicloFin;
				soluciones++;
				if(time<tiempoMenor) tiempoMenor=time;
				if(time>tiempoMayor) tiempoMayor=time;
				if(cicloFin<cicloMenor) cicloMenor=cicloFin;
				if(cicloFin>cicloMayor) cicloMayor=cicloFin;

			}
		};
		var promedioCiclosOK = ciclosOK / soluciones;
		var promedioCiclos = ciclos / cantidadCorridas;
		var porcentajeEncontradas = soluciones / cantidadCorridas * 100;
		csvContent += randomness + "," + promedioCiclos  + "," + promedioCiclosOK + "," + porcentajeEncontradas + "\r\n";
	}
	generarCsv(csvContent);
}


function generarCsv(data){
	var encodedUri = encodeURI(data);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "test.csv");
	document.body.appendChild(link); // Required for FF
	link.click();
}


function FA2(luciernagas){
	var k = 0;
	var dist;
	var luc2res;
	var cont = [];
	var errores = [];

	for (var i = 0; i < luciernagas.length; i++) {
		cont[i]=0;
		errores[i]=error(luciernagas[i]);
	};
	
	while (checkErrors(luciernagas) && k< MAX_GEN) {

		for (var i = 0; i < initialPopulation; i++) cont[i]++;

		for (var i = 0; i < initialPopulation; i++) {
			for (var j = 0; j < initialPopulation; j++) {
				if (error(luciernagas[i])<error(luciernagas[j])){
				dist = acercar(Math.ceil(distanciaManhattan(luciernagas[i],luciernagas[j])*attractiveness),luciernagas,i,j);
				random(luciernagas,randomness, j);
				errores[j]=error(luciernagas[j]);
				cont[j]=0;
				//showHistory(luciernagas[i],luciernagas[j],dist,heter,luc2res,i,j,k);
				}else if(i != j && equals(luciernagas[i],luciernagas[j])){
					random(luciernagas,randomness,j);
				}
				maxLoc(cont,errores,4,luciernagas);
			}
		}
		k++;
	}
	return k;
}

