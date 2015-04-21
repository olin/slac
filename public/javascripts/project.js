window.onbeforeunload = null;

// Allows page to warn user if the person is still in edit mode.
var onBeforeUnload = function onBeforeUnload() {
  return "Your changes may not be saved.";
}

$(".button-to-edit").click(function() {

  // Enables warning for edit mode.
  window.onbeforeunload = onBeforeUnload;

  // Fetch all the DOM elements with text that can be edited.
  var $canEditTextElements = $(".can-edit-text");

  // Toggling which items can be edited.
  $canEditTextElements.each(function() {
    $(this).attr('contenteditable','true');
  });
  
  // Toggle the button that changes the page into editing mode.
  $(".button-to-edit").css("display", "none");
  $(".button-save-changes").css("display", "inline-block");
  
  $(".button-save-changes").click(function(){

    // Disables warning for edit mode.
    window.onbeforeunload = null;

    // Toggles back the edit button.
    // TODO: Potentially remove if the page information is re-rendered.
    $(".button-to-edit").css("display", "inline-block");
    $(".button-save-changes").css("display", "none");

    // Turn off edit mode for the view.
    $canEditTextElements.each(function() {
      $(this).attr('contenteditable','false');
    });

    // Package changed information.
    var updatedProject = project;
    updatedProject.title = $('#project-title').text();
    updatedProject.description = $('#project-description').html();

    // Send information over.
    // TODO: If there is an error saving, we should reflect that here.
    var url = "/project/" + project._id;
    $.ajax({
      url: url,
      type: 'PUT',
      data: updatedProject
    });
  });
});