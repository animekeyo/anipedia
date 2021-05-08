var currentwebsite = window.location.origin; // Returns base URL (https://example.com)


$('#load-header').load(currentwebsite + "/components/header.html", function(result) {
    $(this).appendTo($("#load-header"));
});