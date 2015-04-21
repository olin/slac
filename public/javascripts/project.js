var $edit = $('.test-edit');

// And this is where we should receive information from our GET request.
$edit.html("Hello with Jquery!");

$edit.on('blur', function() {
  console.log("Here is where I should send a request to the server.");

});

window.onbeforeunload = function(){
  return "Your changes may not be saved.";
}

$(".button-to-edit").click(function() {

  var $canEditTextElements = $(".can-edit-text");

  // Toggling which items can be edited.
  $canEditTextElements.each(function() {
    $(this).attr('contenteditable','true');
  });
  
  $(".button-to-edit").css("display", "none");
  $(".button-save-changes").css("display", "inline-block");
  $(".button-save-changes").click(function(){
    window.onbeforeunload = null;

    $(".button-to-edit").css("display", "inline-block");
    $(".button-save-changes").css("display", "none");

    $canEditTextElements.each(function() {
      $(this).attr('contenteditable','false');
    });

    // TODO: Trigger post request here.

  });
});