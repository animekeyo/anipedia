$(document).on('click', '[add_comment_btn]', function() {
    ///////////////////////////////
    console.log('Working BTN')
    const d = new Date();
    const aag = d.getTime();
    const aaf = d.getFullYear();
    const aae = d.getMonth();
    const aah = d.getMilliseconds();
    const aahx = d.getDay();
    const create_link = aag + "" + aaf + "" + aae + "" + aah + "" + aahx;

    ///////////////////////////////
    const key = $(this).attr('add_comment_btn_id');
    const val = $('[add_comment_id=' + key + ']').val();
    const user = firebase.auth().currentUser;
    const user_id = $('[add_comment_id=' + key + ']').attr('add_comment_userid');
    ////////////////////////////////

    var data_ruf = firebase.firestore().collection("users").doc(user_id + '/posts/' + key + '/comments/' + create_link).collection(user.uid);
    if (val == 0) {
        console.log('Erro -> Comment');
    } else if (val == '') {
        console.log('Erro -> Comment');
    } else if (val == '  ') {
        console.log('Erro -> Comment');
    } else {
        data_ruf.set({
            comment: val,
            userid: user.uid,
        });
        console.log('Comment Added!! <3')
    };

});