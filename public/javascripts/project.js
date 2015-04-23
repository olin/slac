window.onbeforeunload = null;

// Allows page to warn user if the person is still in edit mode.
var onBeforeUnload = function onBeforeUnload() {
  return "Your changes may not be saved.";
}

$("#button-to-edit").click(function() {

  // Enables warning for edit mode.
  window.onbeforeunload = onBeforeUnload;

  // Fetch all the DOM elements with text that can be edited.
  var $canEditTextElements = $(".can-edit-text");

  // Toggling which items can be edited.
  $canEditTextElements.each(function() {
    $(this).attr('contenteditable','true');
  });

  // Show hidden fields
  $(".show-on-edit").toggleClass("hidden");

  // Toggle the button that changes the page into editing mode.
  $("#button-to-edit").toggleClass("hidden");
  $("#button-save-changes").toggleClass("hidden");
});

$("#button-save-changes").click(function(){

  // Disables warning for edit mode.
  window.onbeforeunload = null;

  // Fetch all the DOM elements with text that can be edited.
  var $canEditTextElements = $(".can-edit-text");

  // Toggles back the edit button.
  // TODO: Potentially remove if the page information is re-rendered.
  $("#button-to-edit").toggleClass("hidden");
  $("#button-save-changes").toggleClass("hidden");

  // Turn off edit mode for the view.
  $canEditTextElements.each(function() {
    $(this).attr('contenteditable','false');
  });

  // Hide hidden fields
  $(".show-on-edit").toggleClass("hidden");

  // Package changed information.
  var updatedProject = project;
  updatedProject.title = $('#project-title').text();
  updatedProject.description = $('#project-description > article').html();
  
  $(".show-on-edit").each(function(index) {
    var field = $(this).data("field");
    updatedProject[field] = $(this).text();
  })

  // Send information over.
  // TODO: If there is an error saving, we should reflect that here.
  var url = "/project/" + project._id;
  $.ajax({
    url: url,
    type: 'PUT',
    data: updatedProject
  });
  location.reload();
});
