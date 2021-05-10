gfgdf = "Syera"
firebase.database().ref('/data').child('users').orderByChild('username').startAt(gfgdf).on("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(data) {
        console.log(data.key);
    });
    if (search_val == 0) {
        alert('nothing')
    };
});