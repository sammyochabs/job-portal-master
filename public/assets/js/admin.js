/********************************************************
 *
 * Custom Javascript code for Flexor Bootstrap theme
 *
 *******************************************************/

$(document).ready(function() {

/******left-panel*******/ 
if($(window).width() > 1023){  
 $('.openbtn').click( function(){
    if ( $('.sidenav').hasClass('closebtn') ) {
        $('.sidenav').removeClass('closebtn');
    } else {
        $('.sidenav').addClass('closebtn');    
    }


    if ( $('.overlay').hasClass('admin_overlay1') ) {
        $('.overlay').removeClass('admin_overlay1');
    } else {
        $('.overlay').addClass('admin_overlay1');    
    }
});
}

 $('.side-list li').click( function(){
    if ( $('.side-list li').hasClass('active') ) {
        $('.side-list li').removeClass('active');
        $(this).addClass('active');  
    }
});

 $('.side-list li a').click( function(){
    $('.sidenav').removeClass('closebtn');
});
 
});



