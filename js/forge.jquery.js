// CUSTOM JS FOR FORGE WEBSITE


// INIT FUNCTIONS
$(initializeUI); 

function initializeUI() {

    // Only use widthBox() during testing
    //widthBox();

    // Use vertical-only parallax
    runVertParallax();

    // Maintain position of emblem if viewing on a phone-size screen
    smallScreenWidthMgr();

    // If this is the front page, manage height/alignment of download boxes
    if($('.grey-div.right-div').length && $('.grey-div.left-div').length) {
        // Manage vert. aligns
        if($(window).width() > 767) {
            alignGreyBoxes();
        } else
        // Manage box display in single-column mode
        if($(window).width() <= 767) {
            smallerDivHeightMain();
        }
        $(window).resize(function(e){
            // Manage vert. aligns
            if($(window).width() > 767) {
                alignGreyBoxes();
            } else
            // Manage box display in single-column mode
            if($(window).width() <= 767) {
                smallerDivHeightMain();
            }
        });
    }



    // Init community grid row "connection bar" row column sizing
    // As of this setup, the vertical bar row and its two <span> objects must be present
    if($('.community-grid-row').length && $('.vertical-bar-row').length) {
       communityVertBars();
    }



    // Init flyover menu functionality – assumes this menu will be on every page (no .class check)
    initFlyOver();

    // This .class check assumes that since there's an advanced search area, there will also be a 'reset options' button so that event is assigned here as well.
    if($('.advanced-search-button-link').length) {
       // Add functionality to control the appearance of the up/down arrows
       $('.advanced-search-button-link').click(function(e) {
           e.preventDefault();
           initAriaCollapseDetect();
       });

       // Add the 'reset' functionality to the reset checkboxes button
       $('.reset-button').click(function(e) {
           e.preventDefault();

           $s = $('.advanced-search-checkbox-area');
           $s.children().find('input[type="checkbox"]').attr('checked',false);

       });
    }


    if($('.network-graphic-grid-container').length) {
        // Activate this if you'd like the network display images to appear in a random order upon each page load.
        // Otherwise, deactivate and fill in images manually
        runRandomNetworkImgLoader();

        // This makes a copy of the network graphic from the reg. display size and places it in the phone breakpoint display.
        sizeLocNetworkGraphic();
    }

    // Manage the network page 'network' graphic display
    if($('.network-grid').length) {
        managePhoneNetworkPhoneWidths();
        $(window).resize(function(e) {
            managePhoneNetworkPhoneWidths();
        });
    }


    // Padding fix
    initBodyPaddingFix();
}
// Close init functions



// This function calculates the correct proportions for the network grid display based on given width/height
function managePhoneNetworkPhoneWidths() {
    /*
      // Proportion of total height for each of the 4 rows
      Row 1 height:19.11%
      Row 2 height:22.06%
      Row 3 height:35.29%
      Row 4 height:23.53%
     */
    // This the phone-friendly grid var (displays at smaller breakpoints)
    $p = $('.network-div-phone-width-container .network-grid');
    // This is the laptop/desktop display grid (displays at larger breakpoints)
    $g = $('.network-graphic-grid-container .network-grid');

    // This is the height of the desktop/laptop display grid
    var gH = $g.height();
    // This is the height of the phone-friendly display grid
    var pH = $p.height();


   
    // Set Row heights (both sets)

    // Desktop/laptop
    $p.children('.network-row-1').css({'height': (pH * .1911) +'px'});
    $p.children('.network-row-2').css({'height': (pH * .2206) +'px'});
    $p.children('.network-row-3').css({'height': (pH * .3529) +'px'});
    $p.children('.network-row-4').css({'height': (pH * .2353) +'px'});

    // Phone
    $g.children('.network-row-1').css({'height': (gH * .1911) +'px'});
    $g.children('.network-row-2').css({'height': (gH * .2206) +'px'});
    $g.children('.network-row-3').css({'height': (gH * .3529) +'px'});
    $g.children('.network-row-4').css({'height': (gH * .2353) +'px'});

    // Circular image containers

    // Proportions
    var small = .138;
    var med   = .185;
    var large = .224;

    // Laptop/Desktop grid circle heights
    var gS =    gH * small;
    var gM =    gH * med;
    var gL =    gH * large;

    // Phone-friendly grid circle heights
    var pS =    pH * small;
    var pM =    pH * med;
    var pL =    pH * large;

    // Set circle heights (both sets)

    // Reg. display grid circle heights
    $g.children().find('.sml img').css({'width':gS+'px','height':gS+'px'});
    $g.children().find('.med img').css({'width':gM+'px','height':gM+'px'});
    $g.children().find('.lrg img').css({'width':gL+'px','height':gL+'px'});


    // Phone display heights
    $p.children().find('.sml img').css({'width':pS+'px','height':pS+'px'});
    $p.children().find('.med img').css({'width':pM+'px','height':pM+'px'});
    $p.children().find('.lrg img').css({'width':pL+'px','height':pL+'px'});

}


// This takes a copy of the network-div from the reg.display and places it in the phone breakpoint container div, then adds a class
function sizeLocNetworkGraphic() {
    $p = $('.network-div-phone-width-container'); // Phone breakpoint div
    $c = $('.network-graphic-grid-container');    // Reg. Width display

    // Make a copy of the .network-grid div in the main container (which should already have images loaded), place in phone break, add class name
    var cl = $c.children('.network-grid').clone();
    $p.html(cl);

    // Now add the class tag to the phone-width version
    $p.children('.network-grid').addClass('phone-display');
}


// This pulls images from the display container for the network graphic loader and places them randomly in the network grpahic on the main page.
function runRandomNetworkImgLoader() {
    $c = $('.network-img-holder'); // Hidden container
    var imgArr = new Array();
    $c.children().each(function(i,e) {
        imgArr.push($(this));
    });

    // Length of imgArr (should be 10)
    var l = imgArr.length

    // Randomize the order of the objects in the container
    shuffleArray(imgArr);
    // Now load each item into the display container
    for(var i = 0;i < l; i++) {
        $('div[data-img-pos="'+i+'"]').html(imgArr[i]);
    }
}
// This is used in the runRandomNetworkImgLoader() and manageCommunityGridDisplay() functions
function shuffleArray(array) {
    var currIndex = array.length, temVal, randIndex ;

    // While there remain elements to shuffle...
    while (0 !== currIndex) {

        // Pick a remaining element...
        randIndex = Math.floor(Math.random() * currIndex);
        currIndex -= 1;

        // And swap it with the current element.
        tempVal = array[currIndex];
        array[currIndex] = array[randIndex];
        array[randIndex] = tempVal;
    }

    return array;
}





// This function attempts to correct an issue in some browsers, where right padding is added to the <body> tag.
function initBodyPaddingFix() {
    // Detect Body CSS
    $b = $('body');
    var p = $b.css('paddingRight');
    if(p == '15px') {
        $b.css({"paddingRight":"0"});
    }
}



// Since the aria-expanded attribute wasn't working, this function detects the button state and changes the expansion button from an up-arrow to a down-arrow and vice versa.
function initAriaCollapseDetect() {
    // Check to see if associated button's panel is opening or closing
    $a = $('.advanced-search-button-link').children('.white-chevron');
    $o = $('.advanced-search-button-link').children('.white-chevron-outline');

    $s = $('.advanced-search-section');
    // The button appearance change waits a split-second until after the slide-out/slide-in is complete.
    setTimeout(function(e){
        var c = $s.hasClass('in');
        (c === true) ? $a.addClass('up') : $a.removeClass('up');
        (c === true) ? $o.addClass('up') : $o.removeClass('up');
    },400)
}


// Inits Fly Over Menu
function initFlyOver() {

    var flyDivs = '<div class="flyover-menu"></div><div class="flyover-backdrop"></div>';
    $('body').prepend(flyDivs);

    // Backdrop overlay layer
    $b = $('.flyover-backdrop');
    // Flyover menu
    $f = $('.flyover-menu');

    // On load: obtain whatever main menu <li>'s and duplicate to the fly-over container.
    var navClone = $('.main-menu-ul').clone().html();
    $('.flyover-menu').html('<ul>'+navClone+'</ul>');


    // Resize the fly-over content to match the full height of the current page content (with resize() changes)
    sizeFlyoverMenus();
    $(window).resize(function(){
        sizeFlyoverMenus();
    });

    $('#btnFlyOver').click(function(e) {
        e.preventDefault();
        if($f.hasClass('active') === false) {
            activateFlyOver();
        }
    });

    // Allows a left swipe on the side flyover menu
    $f.swipe({
        swipeLeft:function(){
            deActivateFlyOver();
        }
    });

    // Bind deactivation to any touch to the main area overlay
    $b.click(function(e) {
        deActivateFlyOver();
    } );
}

// Shows Fly Over Menu & transparent page overlay div
function activateFlyOver() {
    // Backdrop overlay layer
    $b = $('.flyover-backdrop');
    // Flyover menu
    $f = $('.flyover-menu');

    // Add 'active' classes
    $b.addClass('active');
    $f.addClass('active');

    // Animate overlay opacity. This and the fly-over should give the appearance of animating concurrently.
    $b.animate({'opacity':.5},200);

    // Animate fly-over
    $f.animate({'marginLeft':0},{duration:400});
}

// Shows Fly Over Menu & transparent page overlay div
function deActivateFlyOver() {
    // Backdrop overlay layer
    $b = $('.flyover-backdrop');
    // Flyover menu
    $f = $('.flyover-menu');

    // Animate overlay opacity. This and the fly-over should give the appearance of animating concurrently.
    $b.animate({'opacity':.5},400);

    // Animate fly-over
    $f.animate({'marginLeft':'-195px'},{duration:200});

    // Add 'active' classes
    $b.removeClass('active');
    $f.removeClass('active');
}


// Function to resize the flyover menu and window overlay
function sizeFlyoverMenus() {
    // Backdrop overlay layer
    $b = $('.flyover-backdrop');
    // Flyover menu
    $f = $('.flyover-menu');

    var h = $('body').outerHeight();

    // Array of each fly-over var
    var arr = [$b,$f];

    $(arr).each(function(i,e) {
        $(this).css({'height':h+'px'});
    });

}






// This function launches the modal from script. It's used with other page events as needed.
function productModal() {
    $('#productModal').modal();
}

// Vertically-oriented parallax
// Initially designed to deactivate for smaller screens but that happens automatically
function runVertParallax() {
    $('.intro-download-section').parallax({imageSrc: 'images/sparks_med_res.jpg'});
}



/* ONLY USE DURING TESTING */
// Function for running width tests
function widthBox() {
     // This is the block of code inserted into the open to contain width
     var wTxt = '<!-- TESTING WIDTH BOX --><div id="widthBox"></div><!-- / END TESTING WIDTH BOX -->';

         $('body').prepend(wTxt);

         $('#widthBox').html($(window).outerWidth());
         $(window).resize(function() {
            $('#widthBox').html($(window).outerWidth());
         });
}



// Function to check screen width for parallax effect use.
function runParallax() {
    // On load, check screen width for parallax
    if( $(window).outerWidth() > 767) {
        $('#sparkScene').parallax();
    }

    // Run same function on any window resize.
    $(window).resize(function() {
       // Show parallax
       if( $(window).outerWidth() > 767) {
           $('#sparkScene').parallax();
       }
    });
}


// This function maintains the position of the logo emblem and other items on smaller screens
function smallScreenWidthMgr() {
    var w = $(window).outerWidth();
    if( w <= 767) {
        $('div[role="navigation"]').css({'marginTop':'73px','position':'absolute'});

        // Correct logo placement
        $logo = $('.forge-logo-smaller');
        $logo.css({'marginLeft':((w/2) - 75)+'px'});
        // Add a border to dropdown menu
        //$('#navBarMain').css({'border':'1px solid white'});
    }

    // Run same function on any window resize.
    $(window).resize(function() {
        var rW = $(window).outerWidth();
        if(rW < 767) {
            $('div[role="navigation"]').css({'marginTop':'73px','position':'absolute'});

            // Correct logo placement
            $logo = $('.forge-logo-smaller');
            $logo.css({'marginLeft':((rW/2)- 75)+'px'});

            // Add a border to dropdown menu
            $('#navBarMain').css({'border':'1px solid white'});

        } else
        if(rW >= 767) {
            $('div[role="navigation"]').css({'marginTop':'30px','position':'relative'});

            // Remove border from dropdown menu, if present
            $('#navBarMain').css({'border':'none'});

        }
    });
}



// Function to give a uniform height and alignment to grey boxes in download/os section
// This function assumes the center div is always the tallest of the three.
function alignGreyBoxes() {
    // Two left/right divs
    var greyLtRtDivs    = [$('.grey-div.left-div'),$('.grey-div.right-div')];

    // Only perform size change if the two checked heights aren't equal
    // Whichever height is greater will become the height for both (+10 add'l px)
    if($('.grey-div.left-div').hasClass('height-matched') === false) {
        var greyLtRtHts     = [$('.grey-div.left-div').height(),$('.grey-div.right-div').height()];

        var newHeight = (Math.max.apply(Math,greyLtRtHts)) + 10;
        // Apply height to left and right div's
        $('.grey-div.left-div').css({'height':newHeight+'px'});
        $('.grey-div.right-div').css({'height':newHeight+'px'});

        $(greyLtRtDivs).each(function(i,e){
            $(this).addClass('height-matched');
        });
    }

    var centerHeight = $('.center-contain-div').height();
    var newMargin = (centerHeight - $('.grey-div.left-div').height() ) / 2;

    // Apply CSS
    $(greyLtRtDivs).each(function(i,e){
        $(this).css({'marginTop':newMargin+'px'})
    });
}

// This manages the div height as visible at any width below 767 (the phone breakpoint)
function smallerDivHeightMain() {
    $l = $('.grey-div.left-div');
    $r = $('.grey-div.right-div');
    var lR = [$l,$r];
    if($l.hasClass('height-matched') === true) {
        $(lR).each(function(i,e) {
            $(this).removeClass('height-matched');
            $(this).css({'height':'auto','marginTop':'0'});

        });
    }
}




// Function sizes and spaces out the vertical bar connections for the
function communityVertBars() {
    // Count the number of member <div>'s in the first row
    var ct = $('.community-grid-row:first-child').children().length;

    // Insert as many vert-bar <div>'s in each vertical-bar-row <div>
    $('.vertical-bar-row').each(function(i,e) {
        var txt = '<div class="vert-bar">&nbsp;</div>';

        // Insert <div>'s
        for(i=0;i<ct;i++) {
            if(i==0) {  $(this).html(txt);
            } else
            if(i>0) {   $(this).children('div:last-child').after(txt); }
        }
    });
}


// Function to sum up numerical values of an array (all values must be numbers).
// Used in multiple page settings (community grid and network graphic).
function sumArray(x) {
    var t = 0;
    $(x).each(function(i,e) {
        t += e;
    });
    return t;
}

