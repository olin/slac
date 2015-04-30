$("#create-project").click(function(e) {
    $.post("/project", {}, function (data) {
        window.location = "/project/" + data._id;
    });
});