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
                    "year":current_selection.year,
                    "genre":current_selection.genre
                };
                // Ingetto le variabili nella funzione template:
                var html_finale = template_function(variabili);
                $(".cds-container").append(html_finale);
            }
        }
    });
    // BONUS: Interazione con il menù a tendina (select):
    $(".selettore").change(function(){
        // Intercetto il nuovo valore del campo:
        var current_genre = $(this).val();
        // Ora verifico quali tra tutti i CD hanno questo genere, e li rendo visibili (o meno) grazie ad una classe. -> EACH()
        // Ma prima, rendiamoli visibili tutti! (Altrimenti è come se stessi facendo un AND tra le due ricerche!)
        $(".cd").removeClass("non_active");
        $(".cd").each(function(){
            // Le due condizioni si possono tradurre:
            // 1) Il CD che sto ciclando non appartiene al genere corrente.
            // 2) Ho effettivamente selezionato un genere.
            if ((!$(this).hasClass(current_genre)) && (current_genre.length>0) ) {
                $(this).addClass("non_active");
            }
        })
    })
})
