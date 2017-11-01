var myApp = new Framework7({
    modalTitle: 'Framework7',
    // MATERIAL DESIGN
    material: true,
});


var $$ = Dom7;

/* ADICIONA VIEW PRINCIPAL */
var mainView = myApp.addView('.view-main', {

});

/*
*
*   TELA DE CADASTRO DE ATIVIDADES
*
*/
myApp.onPageInit('cadastro-atv', function (page) {
    //myApp.alert(screen.height);
    //myApp.alert(screen.height  - $('.navbar').height());
    //myApp.alert($('.navbar').height());

    //DETERMINA A ALTURA DO QUADRO PAI
    var alturaConteudo = screen.height - $('.navbar').height() - 35;
    var listaQuadros = $("#lstQuadros");

    var larguraConteudo = listaQuadros.width();
    listaQuadros.css("height", alturaConteudo);

    //myApp.alert(larguraConteudo);
    var cQtdeLinhas = 2;
    var cQtdeColunas = 4;

    var cMargem = 5;
    var cLarguraQuadro = (larguraConteudo / cQtdeColunas) - (cMargem * (cQtdeColunas * 2) / cQtdeColunas); //- (cMargem * (cQtdeColunas * 2));
    var cAlturaQuadro = (alturaConteudo / cQtdeLinhas) - (cMargem * (cQtdeLinhas * 2) / cQtdeLinhas);  //- 20;

    var idColuna = 0;



    for (var i = 1; i <= (cQtdeLinhas * cQtdeColunas); i++) {
        listaQuadros.append("<div id='Q" + i + "' class='quadroConfig draggable droppable'></div>");

        var quadroAtual = $("#Q" + i);
        quadroAtual.css("height", cAlturaQuadro);
        quadroAtual.css("width", cLarguraQuadro);
        quadroAtual.css("margin-left", cMargem);
        quadroAtual.css("margin-right", cMargem);

        quadroAtual.css("margin-top", cMargem);
        quadroAtual.css("margin-bottom", cMargem);
    }

    /*
    for (var i = 1; i <= cQtdeLinhas; i++) {
        var idLinha = "L" + i;
        listaQuadros.append("<div id='" + idLinha + "' class='linhaQuadro'></div>");
        var linhaAtual = $("#" + idLinha);
        linhaAtual.css("height", cAlturaQuadro);

        for (var j = 1; j <= cQtdeColunas; j++) {
            linhaAtual.append("<div id='C" + idColuna + "' class='colunaQuadro'></div>");

            var colunaAtual = $("#C" + idColuna);
            colunaAtual.css("width", cLarguraQuadro);

            idColuna ++;
        }
    }
    */

    //EVENTOS
    // $$('.quadroConfig').on('click', function () {
    //     $(this).addClass('elementoComFoco') // add class to clicked element
    //         .siblings() // get siblings
    //         .removeClass('elementoComFoco'); // remove class from sibling elements
    // });

    $$('.btnDisableSort').on('click', function () {
        $(".draggable").draggable({
            revert: true,
            containment: "#lstQuadros",
            scroll: false,
            zIndex: 100,
            drag: function (event, ui) {
                //console.log(ui.offset);
            }
        });
        $(".droppable").draggable({
            accept: ".draggable",
            hoverClass: "hover"
        });


        // $("#lstQuadros").sortable({ disabled: true }).disableSelection();
    });

    $$('.btnEnableSort').on('click', function () {
        $("#lstQuadros").sortable({ disabled: false }).enableSelection();
        $("#sortable1").sortable({ disabled: false }).enableSelection();

        $("#lstQuadros").animate({
            left: '250px',
            opacity: '0.5',
            height: '150px',
            width: '150px'
        });
    });

    $("button").click(function () {

    });
});

/*
*
*   TELA DE TESTES FIREBASE
*
*/
myApp.onPageInit('teste-firebase', function (page) {
    var database = firebase.database();

    function writeUserData(userId, name, email) {
        firebase.database().ref('users/' + userId).set({
            username: name,
            email: email
        });
    }

    function deleteUserData(userId) {
        firebase.database().ref('users/' + userId).remove();
    }

    function getUserData(userId) {
        //ONCE BUSCA OS DADOS UMA VEZ E ELIMINA CONEXÃO
        firebase.database().ref('/users/' + userId).once('value', function (snapshot) {
            teste = JSON.stringify(snapshot.val());
            myApp.alert(teste);
        });
    }

    $$('.btnInsert').on('click', function () {
        writeUserData(2, "MAICON1", "adasd");
        myApp.alert("Gravado!");
    });

    $$('.btnGet').on('click', function () {
        //deleteUserData(2);
        getUserData(1);
    });
});




