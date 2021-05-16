$('[click_upload_image]').click(function() {
    $('[upload_image]').trigger('click');
});
/////////////////
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        //////////////////////////////////////
        $("document").ready(function() {

            $('[upload_image]').on("change", function() {

                var $files = $(this).get(0).files;

                if ($files.length) {

                    // Reject big files
                    if ($files[0].size > $(this).data("max-size") * 1024) {
                        console.log("Please select a smaller file");
                        return false;
                    }

                    // Replace ctrlq with your own API key
                    var apiUrl = 'https://api.imgur.com/3/image';
                    var apiKey = '4b208caca83b4c4';

                    var formData = new FormData();
                    formData.append("image", $files[0]);

                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": apiUrl,
                        "method": "POST",
                        "datatype": "json",
                        "headers": {
                            "Authorization": "Client-ID " + apiKey
                        },
                        "processData": false,
                        "contentType": false,
                        "data": formData,
                        beforeSend: function(xhr) {
                            swal({
                                text: "Uploading",
                                buttons: false,
                                closeOnClickOutside: false,
                            });
                        },
                        success: function(res) {
                            console.log(res.data.link);
                            $('[hidden]').html('<img postimgdata src="' + res.data.link + '">');

                        },
                        error: function() {

                            swal("Failed | 上传失败");
                        }
                    }
                    $.ajax(settings).done(function(response) {
                        console.log("Done | 成功");
                        swal({
                            title: "Done",
                            icon: "success",
                            timer: 1500,
                        });
                    });
                }
            });
        });

        $('[go]').on('click', function() {
            var db = firebase.firestore().collection("users");
            var d = new Date();
            var aag = d.getTime();
            var aaf = d.getFullYear();
            var aae = d.getMonth();
            var aah = d.getMilliseconds();
            var aahx = d.getDay();

            str = Date.now();
            str = str.toString();
            str = str.slice(0, -3);
            str = parseInt(str);
            var create_link = aag + "" + aaf + "" + aae + "" + aah + "" + aahx;
            var dateo = str;

            const dec = $('[dec_input]').val();
            const linko = create_link;
            const the_img_url = $('[postimgdata]').attr('src');
            const the_str_url = "https://i.imgur.com/";

            if (typeof the_img_url == "undefined" || dec == "0") {
                swal({
                    text: "You have to select an image first",
                    buttons: false,
                    closeOnClickOutside: false,
                    timer: 1500,
                });
            } else {
                if (the_img_url.indexOf(the_str_url) == 0) {
                    console.log("YES");
                    var img = the_img_url;
                } else {
                    var img = "/fk.jpg";
                };
                if (isNaN(linko) == 0) {
                    var link = linko;
                };
                if (isNaN(dateo) == 0) {
                    var date = dateo;
                };
                if (dec == 0) {
                    db.doc(user.uid + '/posts/' + create_link).set({
                        userid: user.uid,
                        link: parseFloat(link),
                        img: img,
                        time: parseFloat(date),
                    });
                    setTimeout(
                        function() {
                            $('[hidden]').html('');
                            $('[dec_input]').val('');
                        }, 0100);
                } else if (trim($str) == '' || 'defined') {
                    db.doc(user.uid + '/posts/' + create_link).set({
                        userid: user.uid,
                        link: parseFloat(link),
                        img: img,
                        time: parseFloat(date),
                    });
                    setTimeout(
                        function() {
                            $('[hidden]').html('');
                            $('[dec_input]').val('');
                        }, 0100);
                } else {
                    db.doc(user.uid + '/posts/' + create_link).set({
                        userid: user.uid,
                        link: parseFloat(link),
                        img: img,
                        dec: dec,
                        time: parseFloat(date),
                    });
                    setTimeout(
                        function() {
                            $('[hidden]').html('');
                            $('[dec_input]').val('');
                        }, 0100);
                };

                swal({
                    text: "Posted!!!!",
                    buttons: false,
                    closeOnClickOutside: false,
                    timer: 1000,
                });
            };

        });
    } else {

    }
});