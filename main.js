$(document).ready(function(){
    // Faccio partire una chiamata API, per valutare il colore:
    $.ajax({
        "url":"https://flynn.boolean.careers/exercises/api/array/music",
        "method":"GET",
        "success": function(data){
            // Tramite log vediamo che la struttura dati in ingresso è un array di 10 oggetti. Dovremo popolare la pagina con questi oggetti. -> Ciclo For.
            for (var i = 0; i < data.response.length; i++) {
                // Salvo in una variabile l'oggetto correntemente ciclato.
                var current_selection = data.response[i];
                // Mi preparo il template handlebars, e lo popolo con le mie variabili:
                var template_html = $("#template-scheda").html();
                var template_function = Handlebars.compile(template_html);
                var variabili = {
                    "poster":current_selection.poster,
                    "title":current_selection.title,
                    "author":current_selection.author,
                    "year":current_selection.year
                };
                // Ingetto le variabili nella funzione template:
                var html_finale = template_function(variabili);
                $(".cds-container").append(html_finale);
            }
        }
    })
})
