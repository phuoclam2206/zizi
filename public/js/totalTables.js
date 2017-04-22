$(document).ready(function () {
    $("#waterReports tbody tr").on("change", function () {
        var before= $(this).find("#before").val();
        var after= $(this).find("#after").val();
        var sel= parseInt($(this).find("#price").text());
        var totalWaterReport = 0;
        var sum = (before - after ) * sel;
        $(this).find("td#sumRow").html(sum);
        $("#waterReports").find("td#sumRow").each(function(){
            var total = parseInt($(this).text());
            if(!isNaN(total)) {
                totalWaterReport = totalWaterReport + total;
            }
        });
        $("#finalWaterReports tbody tr input#service").val(totalWaterReport);
    });

    $("#finalWaterReports tbody tr").on("change", function () {
        var hours= parseInt($(this).find("input#hours").val());
        var service= parseInt($(this).find("input#service").val());
        $(this).find("input#total").val(hours + service);
        var final= parseInt($(this).find("input#final").val());
        if (final - (hours + service) > 0) {
            $(this).find("input#lose").val(0);
            $(this).find("input#add").val(final - (hours + service));
        } else {
            $(this).find("input#add").val(0);
            $(this).find("input#lose").val((hours + service) - final);
        }
    });
});