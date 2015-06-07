
var Cupcake = function() {
    var settings = {
    };

    var dom = {
    };

    var toolbarTemplate = rednotebook['./src/bonnet/template/toolbar.hbs'];


    function initializeToolbar() {
        console.info( 'initializeToolbar called' );
        var html = toolbarTemplate();
        $( 'body' ).append( html );
        new Vivus('cpk-lamp', {
            type: 'oneByOne',
            duration: 200,
        } );




    }

    (function init() {
        initializeToolbar();
    })();
}

$( document ).ready( function() {
    var cupcake = new Cupcake();
});
