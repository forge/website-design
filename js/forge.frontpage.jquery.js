/**
 * Functions for use specifically on the front page of the site – these may use some of the main forge.jquery.js functions as well.
 */


// INIT
$(function() {
    if($('.environment-os-section-flex').length) {
       rightLeftColSpacing();
       $(window).resize(function(){rightLeftColSpacing();});
    }
});

// This function makes the right & left column div heights match.
/* Functionality works on the assumption that no vert. padding has been applied  to the l/r columns in CSS and that center
   col. is largest. Sizes are matched by reducing vertical heights of outer columns down. */
function rightLeftColSpacing() {
    $c = $('.environment-os-section-flex');
    // Collect the content div's as objects. There should only be one div in each column.
    var pad = $c.children('.center-col').css('paddingTop');
    $l = $c.children('.col.left-col');
    $r = $c.children('.col.right-col');

    var colArr = [$l,$r];

    // Find and collect the heights of the right & left column content divs
    var heightArr = new Array();

    $(colArr).each(function(i,e){
        heightArr.push($(this).children('div').outerHeight());
     });
    // New height is the max of the two outer col heights, with the same vertical padding of the center col
    var newHeight = (Math.max.apply(Math,heightArr)) + (parseInt(pad) * 2);

    // New Height is the larger of the two column height vals
    $(colArr).each(function(i,e){
       $(this).css({'height':newHeight + 'px'});
    });

}