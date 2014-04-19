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
	navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });	
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