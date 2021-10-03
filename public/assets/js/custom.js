/********************************************************
 *
 * Custom Javascript code for Flexor Bootstrap theme
 *
 *******************************************************/
 
$(document).ready(function() {
    // var headerHeight=$(".top_panel").height();
    // alert(headerHeight); 
    $(".searcholder .search").click(function() {
        $(".search-group").show();
    });

    $(".new .btn").click(function() {
        $(".newmenu").slideToggle();
    });
    $(".account .icon").click(function() {
        $(".profile").slideToggle();
    });
    $(".morebtn").click(function() {
        $(this).next('.morelist').slideToggle();
    });

    $(".searchinp").click(function() {
        $(".searchdiv").addClass('open');
    });
    $(".searchdiv .cross").click(function() {
        $(this).parents(".searchdiv").removeClass('open');
    });

    $(".rightbar .btnclick").click(function() {
        $(".maindivision").toggleClass('maindivisionadd');
    });
    $(".expand").click(function() {
        $(".maindivision").toggleClass('maindivisionadd1');
    });

    $(".acchead").click(function() {
        $(this).next(".content").slideToggle();
    });

    $(".new_contact").click(function() {
        $("#popupcontact").addClass('sidepopupadd');
    });
    $(".new_company").click(function() {
        $("#popupcompany").addClass('sidepopupadd');
    });
    $(".popcross").click(function() {
        $("#popupcompany").removeClass('sidepopupadd');
        $("#popupcontact").removeClass('sidepopupadd');
    }); 
});



 