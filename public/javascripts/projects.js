$("#create-project").click(function(e) {
    $.post("/build", {}, function (data) {
        window.location = "/build/" + data._id;
    });
});