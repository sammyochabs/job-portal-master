$(document).ready(function() {

  //sideform
  $(".add_plus").click(function(){
  	$(".admin_main").toggleClass('rightsideon');
  })

  $(".add1").click(function(){
    $(".added").show();
  })

  $('.sidetab:first-child').addClass('imp');
   $(".sidlist a").click(function(){
    if (this.hash !== "") { 
        event.preventDefault(); 
        var hash = this.hash;
        $('.sidetab').removeClass('imp'); 
      $(hash).addClass('imp');
      }
   })


   $(".hashchild").click(function(){
      $(this).toggleClass('subon');
      // $(this).next().slideToggle();
  })

  $(".search").click(function(){
      $(".headersearch").addClass('searchadd'); 
  })
  $(".headersearch .close").click(function(){
      $(".headersearch").removeClass('searchadd'); 
  })

  $(".profile").click(function(event){
    event.preventDefault();
      if(!$(".profilediv").hasClass('profiledivadd')) {
        $(".profilediv").addClass('profiledivadd');
      } 
  });

  $(".notification").click(function(event){
    event.preventDefault();
      if(!$(".notificationdiv").hasClass('notificationdivadd')) {
        $(".notificationdiv").addClass('notificationdivadd');
      } 
  });

  $(document).on('mouseup', function(event){
    const target = $(event.target);
    const element_to_check_1 = $('.profilediv');
    const element_to_check_2 = $('.notificationdiv');
    if(!target.is(element_to_check_1) && !target.is( element_to_check_1.find('*') )) {
      element_to_check_1.removeClass('profiledivadd');
    }
    if(!target.is(element_to_check_2) && !target.is( element_to_check_2.find('*') )) {
      element_to_check_2.removeClass('notificationdivadd');
    }
  });
  // $(".notification").click(function(){
  //     $(".notificationdiv").toggleClass('notificationdivadd'); 
  // })
 


});

 


