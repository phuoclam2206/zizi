/**
 * Created by phuoclam on 20/04/2017.
 */
$(document).ready(function () {
    var i=1;

    var option = "";
    products = JSON.parse(products.replace(/&#34;/g, '"'));
    // console.log();
    products.forEach(function (product) {
        option = option + "<option value='" + product.id + "' data-price='" + product.price + "'>" + product.name + "</option>"
    });

    $("#delete_row").click(function(){
        if(i>1){
            $("#addr"+(i-1)).html('');
            i--;
        }
    });
});