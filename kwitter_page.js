var firebaseConfig = {
      apiKey: "AIzaSyCQxOSwgXOEMNRY9Q1sRy0wt4Tw6VdrBl8",
      authDomain: "kwitter-8c3a8.firebaseapp.com",
      databaseURL: "https://kwitter-8c3a8-default-rtdb.firebaseio.com",
      projectId: "kwitter-8c3a8",
      storageBucket: "kwitter-8c3a8.appspot.com",
      messagingSenderId: "781064214148",
      appId: "1:781064214148:web:e6819aa2bd1f3bdc3fd4d1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//YOUR FIREBASE LINKS

room_name = localStorage.getItem("room_name")
user_name = localStorage.getItem("user_name")

function send() {
      msg = document.getElementById("msg").value
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      })
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(message_data)
                        name1 = message_data["name"]
                        message = message_data["message"]
                        like = message_data["like"]

                        name_with_tag = "<h4>" + name1 + "<img src='tick.png' class='user_tick'></h4>"
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>"
                        button_with_tag = "<button class ='btn btn-warning' id="+firebase_message_id+" value=" + like + " onclick = 'updateLike(this.id)'>"
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:" + like + "</span> </button> <hr>"

                        row = name_with_tag + message_with_tag + button_with_tag + span_with_tag;

                        document.getElementById("output").innerHTML += row

                        //End code
                  }
            });
      });
}
getData();

function updateLike(messageId) {

      like_count = document.getElementById(messageId).value
      updated_like = Number(like_count) + 1
      console.log(updated_like)
      firebase.database().ref(room_name).child(messageId).update({
            like: updated_like

      })
}

function logOut() {
      localStorage.removeItem("user_name")
      localStorage.removeItem("room_name")

      window.location = "index.html"
}