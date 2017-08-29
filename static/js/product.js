/**
 * Created by Farzane on 08/28/2017.
 */

// target element
var el = document.querySelector('#rating_part');

// current rating, or initial rating
var currentRating = 0;

// max rating, i.e. number of stars you want
var maxRating = 5;

// callback to run after setting the rating
var callback = function (rating) {
    alert(rating);
};

// rating instance
var myRating = rating(el, currentRating, maxRating, callback);

// sets rating and runs callback
myRating.setRating(3);

// sets rating and runs callback
myRating.setRating(3, true);

// sets rating and doesn't run callback
myRating.setRating(3, false);

// gets the rating
myRating.getRating();


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