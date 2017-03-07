$(document).ready(function () {

    $("#docsbutton").click(function() {
      $.ajax({
        type: "GET",
        url: "http://localhost:1377/builddocs",
        dataType: 'json',
        success: function (data) {
          var url = "http://" + location.hostname + ":" + location.port + data.path;
          $("#docslink").html('<a href="' + url + '"' + ">Link to docs</a>")
        },
        error: function (err) {
          console.log(err)
          alert(err);
        }
      });
    })
})
