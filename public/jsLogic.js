$(document).ready(function(){


	$('.datepicker').datepicker();

	$('.dropdown-trigger').dropdown();
	 
	  $("#exportToCsv").click(function(){
		   
			$("#secTable").tableToCSV();
	   });

	

	$('#f1').on('submit', e => {
					e.preventDefault();
						 document.getElementById("TableBody").innerHTML = "";
						  $('#tableDiv').hide();
						  $('#buttonDiv').hide();
						  $('#loaderDiv').show();
						  $('#errorBoard').hide();
						  document.getElementById("bot").style.position = "fixed";
						  document.getElementById("bot").style.paddingTop = "0px";
						  document.getElementById("secTableBody").innerHTML = "";
						  M.toast({html: 'Wait! Processing your request', classes: 'rounded'});
						
					 $.post('/', $('#f1').serialize()).done(data => {
						  $('#buttonDiv').show();
						 $('#loaderDiv').hide();


					 if(data.results != undefined){
						 var Fdata = data.results;
						  $('#tableDiv').show();
						  document.getElementById("bot").style.position = "relative";
						  document.getElementById("bot").style.paddingTop = "3px";

						  document.getElementById("tableCaption").innerHTML = ""+document.getElementById("origin").value+"_"+document.getElementById("destination").value+"_"+document.getElementById("DateOfJourney").value+"";
						 
						for(var i = 0; i<Fdata.length; i++){	
							if(Fdata[i].itineraries[0].outbound.flights.length == 1){
									// console.log("direct flight");
									var arrt = new Date(Fdata[i].itineraries[0].outbound.flights[0].arrives_at);
									var dept = new Date(Fdata[i].itineraries[0].outbound.flights[0].departs_at);
									var duration = msToTime(arrt-dept);
									var para = document.createElement("tr");
									var para1 = document.createElement("tr");

									var getAirline = getAirlines(Fdata[i].itineraries[0].outbound.flights[0].marketing_airline);

									   para.innerHTML = "	<td>"+(i+1)+"</td><td class='light-green'>Direct</td> <td>"+Fdata[i].itineraries[0].outbound.flights[0].origin.airport+"</td>	            <td>"+Fdata[i].itineraries[0].outbound.flights[0].destination.airport+"</td> <td>"+getAirline+"</td> <td>"+Fdata[i].itineraries[0].outbound.flights[0].marketing_airline+"</td>	            <td>"+Fdata[i].itineraries[0].outbound.flights[0].flight_number+"</td>	            	           <td>"+Fdata[i].itineraries[0].outbound.flights[0].departs_at+"</td> <td>"+Fdata[i].itineraries[0].outbound.flights[0].arrives_at+"</td>	            	            <td>"+duration+"</td>	            <td>"+Fdata[i].fare.price_per_adult.tax+"</td>	            <td>"+Fdata[i].fare.total_price+"</td>	      ";

									   para1.innerHTML = "	<td>"+(i+1)+"</td><td class='light-green'>Direct</td> <td>"+Fdata[i].itineraries[0].outbound.flights[0].origin.airport+"</td>	            <td>"+Fdata[i].itineraries[0].outbound.flights[0].destination.airport+"</td> <td>"+getAirline+"</td> <td>"+Fdata[i].itineraries[0].outbound.flights[0].marketing_airline+"</td>	            <td>"+Fdata[i].itineraries[0].outbound.flights[0].flight_number+"</td>	            	           <td>"+Fdata[i].itineraries[0].outbound.flights[0].departs_at+"</td> <td>"+Fdata[i].itineraries[0].outbound.flights[0].arrives_at+"</td>	            	            <td>"+duration+"</td>	            <td>"+Fdata[i].fare.price_per_adult.tax+"</td>	            <td>"+Fdata[i].fare.total_price+"</td>	      ";

									   document.getElementById("secTableBody").appendChild(para1);
									   document.getElementById("TableBody").appendChild(para);
									   
								}
								else{
									//console.log("Splitted Flight");
									var arrt = new Date(Fdata[i].itineraries[0].outbound.flights[0].arrives_at);
									var dept = new Date(Fdata[i].itineraries[0].outbound.flights[0].departs_at);
									var duration = msToTime(arrt-dept);
									var getAirline = getAirlines(Fdata[i].itineraries[0].outbound.flights[0].marketing_airline);
									var para = document.createElement("tr");

									var para1 = document.createElement("tr");
									para.innerHTML = "	<td rowspan="+Fdata[i].itineraries[0].outbound.flights.length+">"+(i+1)+"</td><td rowspan="+Fdata[i].itineraries[0].outbound.flights.length+" class='amber lighten-2'>Spllited</td> <td>"+Fdata[i].itineraries[0].outbound.flights[0].origin.airport+"</td>	            <td>"+Fdata[i].itineraries[0].outbound.flights[0].destination.airport+"</td> <td>"+getAirline+"</td> <td>"+Fdata[i].itineraries[0].outbound.flights[0].marketing_airline+"</td>	            <td>"+Fdata[i].itineraries[0].outbound.flights[0].flight_number+"</td>	            	           <td>"+Fdata[i].itineraries[0].outbound.flights[0].departs_at+"</td> <td>"+Fdata[i].itineraries[0].outbound.flights[0].arrives_at+"</td>	            	            <td>"+duration+"</td>	            <td rowspan="+Fdata[i].itineraries[0].outbound.flights.length+">"+Fdata[i].fare.price_per_adult.tax+"</td>	            <td rowspan="+Fdata[i].itineraries[0].outbound.flights.length+">"+Fdata[i].fare.total_price+"</td>	      ";


									para1.innerHTML = "	<td rowspan="+Fdata[i].itineraries[0].outbound.flights.length+">"+(i+1)+"</td><td rowspan="+Fdata[i].itineraries[0].outbound.flights.length+" class='amber lighten-2'>Spllited</td> <td>"+Fdata[i].itineraries[0].outbound.flights[0].origin.airport+"</td>	            <td>"+Fdata[i].itineraries[0].outbound.flights[0].destination.airport+"</td> <td>"+getAirline+"</td> <td>"+Fdata[i].itineraries[0].outbound.flights[0].marketing_airline+"</td>	            <td>"+Fdata[i].itineraries[0].outbound.flights[0].flight_number+"</td>	            	           <td>"+Fdata[i].itineraries[0].outbound.flights[0].departs_at+"</td> <td>"+Fdata[i].itineraries[0].outbound.flights[0].arrives_at+"</td>	            	            <td>"+duration+"</td>	            <td rowspan="+Fdata[i].itineraries[0].outbound.flights.length+">"+Fdata[i].fare.price_per_adult.tax+"</td>	            <td rowspan="+Fdata[i].itineraries[0].outbound.flights.length+">"+Fdata[i].fare.total_price+"</td>	      ";




									document.getElementById("secTableBody").appendChild(para1);
									document.getElementById("TableBody").appendChild(para);
									for(var j = 1; j<Fdata[i].itineraries[0].outbound.flights.length; j++)
									{
													var arrt = new Date(Fdata[i].itineraries[0].outbound.flights[j].arrives_at);
													var dept = new Date(Fdata[i].itineraries[0].outbound.flights[j].departs_at);
													var duration = msToTime(arrt-dept);
													var getAirline = getAirlines(Fdata[i].itineraries[0].outbound.flights[j].marketing_airline);
													var para = document.createElement("tr");
													var para1 = document.createElement("tr");

													para.innerHTML = "<td>"+Fdata[i].itineraries[0].outbound.flights[j].origin.airport+"</td>	            <td>"+Fdata[i].itineraries[0].outbound.flights[j].destination.airport+"</td> <td>"+getAirline+"</td> <td>"+Fdata[i].itineraries[0].outbound.flights[j].marketing_airline+"</td>	            <td>"+Fdata[i].itineraries[0].outbound.flights[j].flight_number+"</td>	            	           <td>"+Fdata[i].itineraries[0].outbound.flights[j].departs_at+"</td> <td>"+Fdata[i].itineraries[0].outbound.flights[j].arrives_at+"</td>	            	            <td>"+duration+"</td>	           ";

													para1.innerHTML = "<td></td><td></td><td>"+Fdata[i].itineraries[0].outbound.flights[j].origin.airport+"</td>	            <td>"+Fdata[i].itineraries[0].outbound.flights[j].destination.airport+"</td> <td>"+getAirline+"</td> <td>"+Fdata[i].itineraries[0].outbound.flights[j].marketing_airline+"</td>	            <td>"+Fdata[i].itineraries[0].outbound.flights[j].flight_number+"</td>	            	           <td>"+Fdata[i].itineraries[0].outbound.flights[j].departs_at+"</td> <td>"+Fdata[i].itineraries[0].outbound.flights[j].arrives_at+"</td>	            	            <td>"+duration+"</td>	           ";
													document.getElementById("secTableBody").appendChild(para1);
													document.getElementById("TableBody").appendChild(para);					

									}
								}
							console.log(Fdata[i].fare.total_price);
						}
					 }else{
						 
							 $('#errorBoard').show();
							 document.getElementById("errorBoard").innerHTML = '<div class="container">	<div class="row">		<div class="col s3"></div>			<div class="col s6 card center red lighten-3 ">		<h4>Problem Persist!</h4>				<h6>Information : <b>'+data.message+'</b></h6>	</div>			<div class="col s3"></div>		</div>	</div> ';

					 }
							  

						
					 });
					 
				});
  });

 function msToTime(duration) {
		var milliseconds = parseInt((duration % 1000) / 100),
		  seconds = parseInt((duration / 1000) % 60),
		  minutes = parseInt((duration / (1000 * 60)) % 60),
		  hours = parseInt((duration / (1000 * 60 * 60)));
	  
		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;
	  
		return hours + ":" + minutes;
	  }

function getAirlines(y)
{
	for(i=0; i<resp.length; i++)
	{
		if(resp[i].iata_code==y)
		{
			return resp[i].name;
		}
	}
}