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
//ADD YOUR FIREBASE LINKS HERE
var name = localStorage.getItem("user_name")
document.getElementById("user_name").innerHTML = "Welcome " + name + "!"

function addRoom() {
      var room_name = document.getElementById("room_name").value
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding a room name"
      })
      localStorage.setItem("room_name", room_name)
      window.location = "kwitter_page.html"
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
             snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log(Room_names)
                  row="<div class = 'room_name' id="+Room_names+" onclick='redirectToRoom(this.id)'>#"+Room_names+"</div> <hr>"
                  document.getElementById("output").innerHTML +=row
                  //End code
            });
      });
}
getData();

function redirectToRoom(name){
      console.log(name)
      localStorage.setItem("room_name",name)
      window.location = "kwitter_page.html"
}

function logOut(){
      localStorage.removeItem("user_name")
      localStorage.removeItem("room_name")
      window.location = "index.html"
}
