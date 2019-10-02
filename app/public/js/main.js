$(document).ready(function() {
    $("#exibe_chat").click(function() {
        $("#conversa").show();
        $("#participantes").hide();
        ocultaNavbar();
    });
    
    $("#exibe_participantes").click(function() {
        $("#participantes").show();
        $("#conversa").hide();
        ocultaNavbar();
    });


    var socket = io('http://192.168.0.104');

			$('#mensagem').keypress(function(event){
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if(keycode == '13'){
                    enviarMensagem();
                }
                //Stop the event from propogation to other handlers
                //If this line will be removed, then keypress event handler attached
                //at document level will also be triggered
                event.stopPropagation();
            });

			$('#enviarMensagem').on('click', enviarMensagem);

			function enviarMensagem() {
                $('#mensagem').focus();

				socket.emit('enviarParaServidor',
					{ 
						apelido:$('#apelido').val(),
						mensagem: $('#mensagem').val(),
						primeiraMensagem : $('#primeiraMensagem').val()
					}
				);
				$('#mensagem').val('');
				$('#primeiraMensagem').val("0");
			}

			socket.on('mgsParaCliente', function(data) {
				var html  = '';
				
				html = `<div class="dialogo">
							<h4>` + data.apelido + `</h4>
							<p>` + data.mensagem + `</p>
						</div>`;

				$('#dialogos').append(html);
				window.scrollTo(0, document.body.scrollHeight);
			});

			socket.on('participantesParaCliente', function(data) {
				var html  = '';
				
				html = `<span class="participante">
						` + data.apelido + `
						</span>`;

				$('#participantes').append(html);
			});

});

var ocultaNavbar = function() {
    $("#btn_navbar_toggle").attr("class","navbar-toggle collapsed");
    $("#navbar-collapse-1").attr("class","navbar-collapse collapse");
    $("#btn_navbar_toggle").attr("aria-expanded","false");
    $("#navbar-collapse-1").attr("aria-expanded","false");
}




