/**
 * Created by Farzane on 08/28/2017.
 */
// setInterval(function () {product_search();}, 3000);
// function product_search(){
//     var search_input = $("#search_input");
//     var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function(){
//             if(xhttp.readyState==4){
//                var s = xhttp.response;
//                var p = xhttp.json;
//                hot_div.empty();
//                hot_div.html(hot_div.html()+s);
//             }
//         };
//         xhttp.open("POST","/hot-news-ajax/",true);
//         xhttp.send();
// }

function product_search(form){
    var url = form.attr("action");
    var formData = {};
    $(form).find("input[name]").each(function (index, node) {
        formData[node.name] = node.value;
    });
    $.post(url, formData).done(function (data) {
        alert(data);
    });
}