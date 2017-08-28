
//callback handler for form submit
$("#searchajaxform").submit(function (e) {
    var postData = $(this).serializeArray();
    var formURL = "/search";
    console.log('im here');
    $.ajax(
        {
            url: formURL,
            type: "POST",
            data: postData,
            success: function (data, textStatus, jqXHR) {
                var d = [{'name':'kala', 'price':2000, 'id':'010'}];
                $("#body1").innerHTML = "{% for p in "+ d + " %}" +
                    '<div class="product">' +
                    '<div class="p_logo_div">' +
                    '<img class="p_logo" src="../static/media/product.jpg">' +
                    '</div><div class="p_price">' +
                    '<div class="p_price_elements">{{ p.name }}</div>' +
                    '<div class="p_price_elements">{{ p.price }}</div>' +
                    '<div class="p_price_elements"><a href="/products/{{ p.id }}" id="purchase_link">Purchase</a></div>' +
                    '</div></div>{% endfor %}'
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //if fails
            }
        });
    e.preventDefault(); //STOP default action
    e.unbind(); //unbind. to stop multiple form submit.
});

// $("#searchajaxform").submit(); //Submit  the FORM
