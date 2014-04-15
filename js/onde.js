var x=document.getElementById("result");
function mostrar() {
	if (localStorage.getItem("lat")) {
		lat = localStorage.getItem("lat");
		lon = localStorage.getItem("lon");
		abrir();
	}
	else {
		x.style.display="block";
		x.scrollIntoView();
		x.innerHTML="Antes de mostrar sua localização precisamos gravá-la. Clique em \"Gravar local\", e só então, poderemos mostrá-lo.";
	}
}
function onSuccess(position) {
	localStorage.setItem("lat", position.coords.latitude);
	localStorage.setItem("lon", position.coords.longitude);
	x.innerHTML="Suas coordenadas foram salvas com sucesso";
	x.scrollIntoView();
};

function onError(error) {
	x.style.display="block";
	x.scrollIntoView();
	x.innerHTML='Erro: '    + error.code    + '\n' + 'Mensagem: ' + error.message;
}
function getLocation() {
	x.style.display="block";
	x.innerHTML="Aguarde... <br /><progress></progress>";
	x.scrollIntoView();
	
	window.plugins.diagnostic.isGpsEnabled(gpsHabilitado);
	window.plugins.diagnostic.isWirelessNetworkLocationEnabled(sfHabilitado);
	
	function gpsHabilitado(result) {
      if (result)
		{
			function sfHabilitado(result)
			{
				navigator.notification.confirm("A localização por redes sem fio está habilitada. É recomendado que apenas o GPS esteja. Deseja alterar essa configuração?", gpsConfig, "Habilitar somente GPS", "Configurações,Continuar")
				function gpsConfig(buttonIndex) {
					if(buttonIndex == 0)
					{
						window.plugins.diagnostic.switchToLocationSettings();
					}
				}
			}
			else
			{
			navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
			}
		}
      else
		{
         alert("GPS OFF");
		}
   }
}

function abrir() {
navigator.app.loadUrl("http://www.google.com/maps/?q=" + lat + "," + lon, { openExternal:true } );
}


document.addEventListener("backbutton", function(e){
    if($.mobile.activePage.is('#home')){
        e.preventDefault();
        navigator.app.exitApp();
    }
    else {
        navigator.app.backHistory()
    }
}, false);