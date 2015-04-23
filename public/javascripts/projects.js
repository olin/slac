$("#create-project").click(function(e) {
    $.post("/project", {}, function (data) {
        console.log(data);
        window.location = "/project/" + data._id;
    });
});