$('body').on('click', function() {
    $('user-search').css("height", "0rem");
    $('user-search').css("padding", "0rem");
    $('non-ffg').css("height", "0rem");
});
$('[search_bar_close]').on('click', function() {
    $('user-search').css("height", "0rem");
    $('user-search').css("padding", "0rem");
    $('non-ffg').css("height", "0rem");
});


$('[search_users]').on("change", function() {
    var search_val = $('[search_users]').val();
    $('user-search').css("height", "auto");
    $('user-search').css("padding", "1rem");
    $('non-ffg').css("height", "auto");

    if (search_val == 0) {

        $('[import_search_data]').html("");
        setTimeout(
            function() {
                $('[import_search_data]').prepend('<nen>Not Found</nen>');
            }, 0050);
    } else {
        firebase.database().ref('/data').child('users').orderByChild('username').startAt(search_val).on("value", function(snapshot) {
            console.log(snapshot.val());
            snapshot.forEach(function(data) {
                console.log(data.val().username);
                $('[import_search_data]').html("");
                setTimeout(
                    function() {
                        $('[import_search_data]').prepend('<a href="/u?id=' + data.key + '">' + data.val().username + ' <nox class=" center-flex">' + data.val().status + '</nox></a>');
                    }, 0050);

            });
        });
    }
})