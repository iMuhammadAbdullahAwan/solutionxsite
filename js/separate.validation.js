$(document).ready(function() {
    $("#contactform").validate({
     rules: {
         fullname: "required",
         mobile_number: {
             required: true,
            /* minlength: 10,
             maxlength: 10,*/
         },
         interested_in: "required",
         email: {
             required: true,
             email: true
         },
         your_location: "required",
         skype_whatsapp_no: "required",
         description: "required",
         agree: "required"
     },
     messages: {
         fullname: "Please enter your name",
         mobile_number: {
             required: "Please enter a valid mobile number",
            /* minlength: "At least 10 Numbers",
             maxlength: "Not more than 10 Numbers"*/
         },
         email: "Please enter a valid email address",
         interested_in: "Please select your interest.",
         agree: "Please accept terms and conditions",
         your_location: "Please enter your location",
         skype_whatsapp_no: "Please provide Skype/Whatsapp No.",
         description: "Please brief about your project"
     },
     errorPlacement: function(error, element) {
         var newelement = element.next('label').next('div');
         newelement.html(error);
     },
     submitHandler: function() {
         $(':input[type="submit"]').prop('disabled', true);
         $('.loader').addClass('sw-dual-ring');
         let formData = new FormData($('#contactform')[0]);
         $.ajax({
             url: "/email/send.php",
             type: "POST",
             dataType: 'json',
             data: formData,
             contentType: false,
             cache: false,
             processData: false,
             success: function(result) {
                 console.log(result);
                 if (result.success) {
                     Swal.fire({
                         title: 'Success!',
                         text: result.message,
                         icon: 'success',
                         confirmButtonText: 'Thank You'
                     })
                     $("#contactform")[0].reset();
                 } else {
                     Swal.fire({
                         title: 'Error!',
                         text: result.message,
                         icon: 'error',
                         confirmButtonText: 'Cool'
                     });
                 }
                 $('.loader').removeClass('sw-dual-ring');
                 $(':input[type="submit"]').prop('disabled', false);
             },
             error: function(msg) {
                 console.log('error', msg);
                 $('.loader').removeClass('sw-dual-ring');
                 $(':input[type="submit"]').prop('disabled', false);
                 Swal.fire({
                     title: 'Error!',
                     text: 'Oops! An error occurred, please try again later.',
                     icon: 'error',
                     confirmButtonText: 'Cool'
                 });
             }
         });
     }
 });
 $('.floating-input, .floating-select, .ctminpt').on('focusout', function() {
     $(this).valid();
 });
});