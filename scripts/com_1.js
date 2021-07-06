firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $("[main_profile_uid_val]").val(user.uid);
        $("[main_profile_email_val]").val(user.email);

        firebase.database().ref('/data/users/' + user.uid).once("value", snapshot => {
            const ref = firebase.database().ref('/data/users/' + user.uid);
            createTime = Date.now();
            createTime = createTime.toString();
            createTime = createTime.slice(0, -3);
            createTime = parseInt(createTime);
            ref.update({
                onlineState: true,
            });
            ref.onDisconnect().update({
                onlineState: false,
                afkTimeout: createTime,
            });
            if (snapshot.val().username) {
                console.log(snapshot.val().username)
            } else {
                firebase.database().ref('/data/users/' + user.uid).update({
                    username: 'keyo' + createTime,
                });
            };
            if (snapshot.val().userid) {
                console.log(snapshot.val().userid)
            } else {
                firebase.database().ref('/data/users/' + user.uid).update({
                    userid: user.uid
                });
            };
            if (typeof snapshot.val().banner == "undefined") {
                firebase.database().ref('/data/users/' + user.uid).update({
                    banner: "/images/b1.jpg"
                });
            } else {
                console.log(snapshot.val().banner)
            };
            if (typeof snapshot.val().profile_picture == "undefined") {
                firebase.database().ref('/data/users/' + user.uid).update({
                    profile_picture: "/images/icon.png"
                });
            } else {
                console.log(snapshot.val().profile_picture)

            };
            if (snapshot.val().displayName) {
                console.log(snapshot.val().displayName)
            } else {
                firebase.database().ref('/data/users/' + user.uid).update({
                    displayName: user.displayName
                });
            };

            if (snapshot.val().profile_picture) {
                console.log(snapshot.val().profile_picture)
            } else {
                firebase.database().ref('/data/users/' + user.uid).update({
                    profile_picture: user.photoURL
                });
            };
        });

        const data = firebase.database().ref('/data/users/' + user.uid);
        data.on('value', function(snapshot) {

            const displayName = (snapshot.val() && snapshot.val().displayName);
            const profile_picture = (snapshot.val() && snapshot.val().profile_picture);
            const banner = (snapshot.val() && snapshot.val().banner);
            const bio = (snapshot.val() && snapshot.val().bio);
            const onlineState = (snapshot.val() && snapshot.val().onlineState);
            $("[main_name]").text(displayName);
            $("[main_name_val]").val(displayName);
            $("[main_bio]").text(bio);
            $("[main_bio_val]").val(bio);
            $('head').prepend('<title>' + displayName + ' on AnimeKeyo.com</title>');
            $("[main_name_alt]").attr('title', displayName);
            $('[main_user_profile_pic_src]').attr('src', profile_picture)
            $("[main_profile_banner]").css('background-image', 'url(' + banner + '),url(/images/b1.png)', 'background-position', 'center');
            $("[main_profile_picture]").css('background-image', 'url(' + profile_picture + '),url(/images/icon.png)');

            $(document).on('click', '[main_profile_link]', function() {
                window.location.href = "/u?id=" + user.uid;
            });
            $(document).on('click', '[open_setting]', function() {
                window.location.href = "/settings#Profile";
            });
            $(document).on('click', '[open_home]', function() {
                window.location.href = "/app";
            });
            $(document).on('click', '[logout_user]', function() {
                firebase.auth().signOut();
            });

        });
    } else {
        const link = window.location.pathname;
        alert(link);
        if (link == "/login") {

        } else if (link == "/") {

        } else {
            window.location.href = "/";
        }
    }
});