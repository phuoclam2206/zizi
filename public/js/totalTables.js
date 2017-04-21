$(document).ready(function () {
    var $dataRows=$("#table_owns .price");
    var totalRow = 0;
    $dataRows.each(function() {
        totalRow = totalRow + parseInt($(this).text());
    })
    
    $("#table_owns tbody").append(
        "<tr >\
            <th class='text-center'>Tổng</th>\
            <th class='text-center'></th>\
            <th class='text-center'>" + totalRow + "</th>\
            <th class='text-center'></th>\
        </tr>"
    );
});