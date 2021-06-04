"$username": {
    ".read": true,
    ".write": "!data.exists() && $username === root.child('data').child('users').child(auth.uid).child('username').val()"
}