/**
 * Created by phuoclam on 20/04/2017.
 */
$(document).ready(function () {
    var i=1;
    $("#add_row").click(function(){
        $('#addr'+i).html("<td>"+ (i+1) +"</td><td><select name='water0' class='form-control'> <option value='khoangngot'>Khoáng ngọt</option> <option value='khoanglac'>Khoáng lạc</option> <option value='pepsi'>Pepsi</option> <option value='stingvang'>Sting Vàng</option> <option value='stringdau'>Sting Dâu</option> </select></td>" +
            "<td><input  name='number"+i+"' type='text' placeholder='Số lượng nhận'  class='form-control input-md'></td>" +
            "<td><input  name='use"+i+"' type='text' placeholder='Số lượng còn'  class='form-control input-md'></td>");

        $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
        i++;
    });
    $("#delete_row").click(function(){
        if(i>1){
            $("#addr"+(i-1)).html('');
            i--;
        }
    });
});