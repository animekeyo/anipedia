$('[get_comment]').each(function(index) {
    const user_id = $(this).attr("user_id");
    const post_id = $(this).attr("post_id");
    const data_ruf = firebase.database().ref('/data/users/');

    firebase.database().ref('/data/users/' + user_id + '/posts/' + post_id + '/comments').once("value", snapshot => {
        if (snapshot.exists()) {
            console.log("000000000000exists!0000000000");
        } else {
            $('[comment_data=' + post_id + ']').html('<div class="center-flex theme-fsdfsdfsdfSDF223432">No Comments Found</div>')
        }

    });

    data_ruf.child(user_id + '/posts/' + post_id + '/comments/').once('value', function(snapshot) {

        snapshot.forEach((user) => {

            data_ruf.child(user_id + '/posts/' + post_id + '/comments/' + user.key).once('value', function(snapxshot) {
                snapxshot.forEach((snapxshotx) => {

                    const user_id = snapxshotx.val().userid;
                    data_ruf.child(user_id).once('value', function(vx) {

                        const st2x = snapxshotx.val().comment.replace(/(<([^>]+)>)/gi, "");
                        var st3x = st2x.replace(/\[/g, '<span stb class="pointer theme-FDFgdf3243FDSDF">');
                        var st4x = st3x.replace(/\]/g, '</span>');
                        $(document).on('click', '[stb]', function() {
                            $(this).css('color', 'var(--c9)');
                            $(this).css('cursor', 'unset');
                        });

                        const user_comment = st4x;
                        const user_displayName = vx.val().displayName;
                        const user_profile_picture = vx.val().profile_picture;
                        const data = '<div class="center-flex theme-fsdfsxSDhfg324234">' +
                            '<div style="background-image:url(' + user_profile_picture + ')" class="full-bg center-flex theme-fsdrfsSDFSfghfghD32423">' +
                            '<!---Proile Pic---->' +
                            '</div>' +
                            '<div class="center-flex theme-fsdfsdSDD3fghfg24234f">' +

                            '<div class="center-flex theme-fsdfssdfSDFSD3fghfffdf">' +
                            user_displayName +
                            '</div>' +
                            '<div class="center-flex  user_comment theme-fsdfassSDFSD3dg34sdf">' +
                            user_comment +
                            '</div>' +
                            '</div>' +

                            '</div>';
                        $('[comment_data=' + post_id + ']').prepend(data)
                            //$(data).appendTo($('[comment_data=' + post_id + ']'));

                    });
                });

            });
        })
    });
});