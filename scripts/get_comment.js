$(document).on('click', '[get_comment]', function() {
    $(this).remove();
    const user_id = $(this).attr("user_id");
    const post_id = $(this).attr("post_id");
    const user = firebase.auth().currentUser;
    const data_ruf = firebase.database().ref('/data/users/');
    console.log('1works');
    data_ruf.child(user_id + '/posts/' + post_id + '/comments/').once('value', function(snapshot) {
        snapshot.forEach((user) => {

            data_ruf.child(user_id + '/posts/' + post_id + '/comments/' + user.key).once('value', function(snapxshot) {
                snapxshot.forEach((snapxshotx) => {
                    const user_id = snapxshotx.val().userid;
                    data_ruf.child(user_id).once('value', function(vx) {
                        //////////////////////

                        //////////////////////
                        const user_id = snapxshotx.val().userid;
                        const user_comment = snapxshotx.val().comment;
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
                            '<div class="center-flex theme-fsdfassSDFSD3dg34sdf">' +
                            user_comment +
                            '</div>' +
                            '</div>' +

                            '</div>';
                        $(data).appendTo($('[comment_data=' + post_id + ']'));
                        console.log(snapxshotx.val().userid);
                        console.log(snapxshotx.val().comment);
                        console.log(vx.val().displayName);
                        console.log(vx.val().profile_picture);

                    });
                });

            });
        })
    });
});