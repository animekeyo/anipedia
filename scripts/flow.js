$('[goflow]').on('click', function() {
    const callpoint = $(this).attr("callpoint");
    const flowpoint = $(this).attr("flowpoint");

    const rxxf = firebase.database().ref('/data/users/');
    const id = callpoint;
    const applytobody = '<div class="full-wh fixed center-flex theme-XC12sDDSmaEffd" user_flow_list>' +
        '<div class="center-flex absolute theme-XC12sDDSmaEffDF pointer noselect" clear_user_flow_list >' +
        icon_close +
        '</div>' +
        '<div class="center-flex full-wh absolute theme-XC12sDDSaEECV" clear_user_flow_list>' +
        '</div>' +
        '<div flow_data class="center-flex theme-XC12sDDSaEE">' +
        '<div import_small_loader flow_data_loader></div>' +
        '</div>' +
        '</div>';
    $('body').prepend(applytobody)
    $('[clear_user_flow_list]').on('click', function() {
        setTimeout(
            function() {
                $('[user_flow_list]').remove()
            }, 0200);
        $('[user_flow_list]').fadeOut(100)
    });
    rxxf.child(id + '/' + flowpoint + '/').once('value', function(snapshot) {
        snapshot.forEach((user) => {
            var users = user.val().id;
            var flow = '<div class="center-flex theme-XC12sDDSfaEE">' +
                '<div class="center-flex theme-XC12svDDSaEE">' +
                '<a href="/u?id=' + users + '"><div  class="center-flex theme-XCb12sDDSaEE full-bg " user-status-' + users + ' flow_user_profile_pic_' + users + '>' +
                '</div></a>' +
                '<div class="center-flex theme-XC1n2sDDSaEE">' +
                '<div class="theme-FSD234FDS32">' +
                '<a class="theme-FSD234FDS32AA" href="/u?id=' + users + '" user_displayName_' + users + '><div import_small_loader></div></a>' +
                '</div>' +
                '<div class="small-badges theme-SDFsdf2334DSF">' +
                '<badge class="center-flex theme-FDSHGF45GFFFS" user_badges_' + users + '>' +
                '</badge>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="center-flex noselect pointer theme-XC12sDDSmaEE">' +
                '<a class="theme-FSD234FDS32AA" href="/u?id=' + users + '">Open</a>' +
                '</div>' +
                '</div>';
            $("[flow_data_loader]").hide()
            $(flow).appendTo($("[flow_data]"))



            var db_ref = firebase.database().ref('/data/users/' + users);
            db_ref.on('value', function(snapshot) {
                var displayName = (snapshot.val() && snapshot.val().displayName);
                var profile_picture = (snapshot.val() && snapshot.val().profile_picture);
                var mainuserid = (snapshot.val() && snapshot.val().userid);
                var onlineState = (snapshot.val() && snapshot.val().onlineState);
                if (onlineState == true) {
                    $('[user-status-' + mainuserid + ']').addClass('flow-online');
                } else {
                    $('[user-status-' + mainuserid + ']').addClass('flow-offline');
                };
                $('[user_displayName_' + mainuserid + ']').text(displayName);
                $('[flow_user_profile_pic_' + mainuserid + ']').css('background-image', 'url(' + profile_picture + '),url(/images/icon.png)');
                console.log(displayName)
            });
            db_ref.once('value', function(snapshot) {

                var mainuserid = (snapshot.val() && snapshot.val().userid);


                db_ref.child('badges').once('value', function(user) {
                    user.forEach((snapshot) => {
                        var ggk = snapshot.key + snapshot.val();
                        tippy('[tippy]', {
                            inertia: true,
                            hideOnClick: false,
                            interactive: true,
                        });
                        setTimeout(
                            function() {
                                if (ggk == 'verifiedtrue') {
                                    $('[user_badges_' + mainuserid + ']').prepend(icon_verified);
                                    console.log('verified')
                                };
                                setTimeout(
                                    function() {
                                        if (ggk == 'partnertrue') {
                                            $('[user_badges_' + mainuserid + ']').prepend(icon_turbo_1);
                                            console.log('partner')
                                        };
                                        setTimeout(
                                            function() {

                                                if (ggk == 'stafftrue') {
                                                    $('[user_badges_' + mainuserid + ']').prepend(icon_staff);
                                                    console.log('staff')
                                                };
                                            }, 0001);

                                    }, 0001);
                            }, 0001);





                    });
                });
            });





            console.log(users)
        });
    });

});