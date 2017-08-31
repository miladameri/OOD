/**
 * Created by Farzane on 08/28/2017.
 */

$(document).ready(function () {
    function getCookie(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
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
    // if ($("#p_cm_input_form").val() === '') {
    //     $("#comment_modal_msg").innerHTML = "لطفا ابتدا نظر خود را مرقوم فرمایید.";
    // }
    //
    // else {
    $.ajax({
        url: $('#comment_url').text(),
        type: 'post',
        data: {
            comment: $('#p_cm_input_form').val(),
            id: $('#p_id').text()
        },
        success: function (data) {
            $("#cm_modal_trigger_btn").click();
            console.log("cm success");
            console.log(data);
        }
    });
    // }
}

function send_rate() {
    $.ajax({
        url: $('#rate_url').text(),
        type: 'post',
        data: {
            rate: $('#rate_input').text(),
            id: $('#p_id').text()
        },
        success: function (data) {
            $("#rate_modal_trigger_btn").click();
            console.log('rate success');
            console.log(data);
        }
    });
}


$(document).ready(function () {
    $('#submit_cm_btn').attr('disabled', 'disabled');
    $('#p_cm_input_form').keyup(function () {
        if ($(this).val() !== '') {
            $('#submit_cm_btn').removeAttr('disabled');
        }
    });

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

function on_product_order() {
    document.getElementById('purchase_part').style.display = 'block';
    document.getElementById('p_order').style.display = 'none'
}

function send_purchase_order() {
    var isValid = true;
    $('.purchase_form_field').each(function () {
        if ($(this).val() === '') {
            isValid = false;
        }
        if (isValid === true) {
            $("#purchase_modal_trigger_btn").click();
        }
    });

}
