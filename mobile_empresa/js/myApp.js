// Init App
var myApp = new Framework7({
    modalTitle: 'Framework7',
    material: true,
});

var $$ = Dom7;

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: false
});

myApp.onPageInit('about', function (page) {
    myApp.alert("adasd");
});

function chamarDeposito() {
    var modal = myApp.modal({
        title: 'Depositar',
        text: 'Qual o valor do depósito? <br><br> ' +
        '<div class="item-input">' +
        '   <div class="range-slider">' +
        '       <div id="txtValor" class="textoCentro">R$ 1.00</div>' +
        '       <br>' +
        '       <input id="rangeValor" type="range" min="1" max="100" step="1" value="1">' +
        '       <div class="item-input"><select></select></div>' +
        '   </div>' +
        '</div>',

        buttons: [
            {
                text: 'CANCELAR',
                bold: false
            },
            {
                text: 'OK',
                bold: true,
                onClick: function () {
                    depositar($$('input#rangeValor').val());
                }
            }
        ]
    });

    $$(modal).find('input#rangeValor').on('input change', function () {
        $$(modal).find('#txtValor').html('R$ ' + Number(this.value).toFixed(2));
    });
}

myApp.onPageInit('index', function (page) {
    $$('#btnDepositar').on('click', function () {
        //LANÇAR UM POST 
        chamarDeposito();
    });

    $$('input#teste').on('input change', function () {
        //LANÇAR UM POST 
        $$('#Valor').html(this.value);
    });

    $$('.more').on('click', function () {
        //LANÇAR UM POST 
        var actionSheetButtons = [
            [
                {
                    text: 'Cadastrar PIN',
                    label: false,
                    onClick: function () {
                        
                    }
                }
            ]
        ];

        myApp.actions(this, actionSheetButtons);
    });



}).trigger();

function depositar(cValor) {
    //DEPOSITAR X VALOR NA CONTA
    console.log(cValor);
}


