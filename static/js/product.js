/**
 * Created by Farzane on 08/28/2017.
 */

$(document).ready(function(){
    function getCookie(c_name) {
        if(document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if(c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if(c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start,c_end));
            }
        }
        return "";
    }

    $(function () {
        $.ajaxSetup({
            headers: {
                "X-CSRFToken": getCookie("csrftoken")
            }
        });
    });
});


function update_rate_input(val) {
    document.getElementById('rate_input').innerHTML = val;
}

function send_comment() {

    console.log($('#comment_url').text());
    $.ajax({
        url: $('#comment_url').text(),
        type: 'post',
        data: {
            //csrfmiddlewaretoken: $('#csrf').val(),
            comment: $('#p_cm_input_form').val(), // will be accessible in $_POST['data1']
            id: $('#p_id').val()
        },
        success: function (data) {
            console.log(data);
        }
    });
}

$(document).ready(function () {

    $('input[type="range"]').change(function () {
        var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
        $(this).css('background-image',
            '-webkit-gradient(linear, left top, right top, '
            + 'color-stop(' + val + ', #94A14E), '
            + 'color-stop(' + val + ', #C5C5C5)'
            + ')'
        );
    });


});


// // target element
// var el = document.querySelector('#rating_part');
//
// // current rating, or initial rating
// var currentRating = 0;
//
// // max rating, i.e. number of stars you want
// var maxRating = 5;
//
// // callback to run after setting the rating
// var callback = function (rating) {
//     alert(rating);
// };
//
// // rating instance
// var myRating = rating(el, currentRating, maxRating, callback);
//
// // sets rating and runs callback
// myRating.setRating(3);
//
// // sets rating and runs callback
// myRating.setRating(3, true);
//
// // sets rating and doesn't run callback
// myRating.setRating(3, false);
//
// // gets the rating
// myRating.getRating();


// Get the modal
// var modal = document.getElementById('id01');
//
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// };
//
// function get_selected_product_id() {
//     console.log("salam  "+document.getElementById("purchase_form").action);
//     var url = document.URL;
//     var splitted = url.split("/");
//     var product_id = splitted[splitted.length - 1];
//     console.log("p_id   "+product_id);
//
//     document.getElementById("purchase_form").action = "/buy/" + product_id;
//     console.log("hii  "+document.getElementById("purchase_form").action);
// }
//

function on_product_order() {
    document.getElementById('purchase_part').style.display = 'block';
    document.getElementById('p_order').style.display = 'none'
}