$("#create-project").click(function(e) {
    $.post("/ideate", {}, function (data) {
        window.location = "/ideate/" + data._id;
    });
});