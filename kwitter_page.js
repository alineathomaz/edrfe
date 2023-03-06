//LINKS DO SEU APP FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyAibafOzNKHQiF1xyfLsjGSWRnftNteDEo",
  authDomain: "kwitterbd-a04f5.firebaseapp.com",
  databaseURL: "https://kwitterbd-a04f5-default-rtdb.firebaseio.com",
  projectId: "kwitterbd-a04f5",
  storageBucket: "kwitterbd-a04f5.appspot.com",
  messagingSenderId: "277677700256",
  appId: "1:277677700256:web:0f70ab1decd0e6597f05c5"
};

//inicializar o Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send()
{
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    like:0
   });

  document.getElementById("msg").value = "";
}

function getData() 
{ 
  firebase.database().ref("/"+room_name).on('value', function(snapshot) { 
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { 
      childKey  = childSnapshot.key; 
      childData = childSnapshot.val(); 
      if(childKey != "purpose") 
      {
        firebase_message_id = childKey;
        message_data = childData;
//Inicie a programar aqui
     console.log(firebase_message_id);
     console.log(message_data);
     name = message_data['name'];
     mensagem = message_data['mensagem'];
     like = message_data['like'];
name_with_tag = "<h4>" + name + "<img class = 'user_tick scr = 'tick.png></h4>";
messagem_with_tag = "<h4 class = 'messagem_h4'>"  + messagem + "</h4>"
like_button = "<button class = 'btn btn-warning> id="+ firabase_massage_id+"value="+ like +"onclick='upadetlike(this.id)'"
spam_with_tag = "<spam class='glayphicon glayphicon-thumbs=-up'>Curtidas: "+ like +"<spam></button><hr>";
row = name_with_tag + name_with_tag + like_button + spam_with_tag;
document.getElementById("output").innerHTML += row;
//Programe até aqui
      } 
    });  
  }); 
}

getData();


function updateLike(message_id)
{
  console.log("clicou no botão curtir - " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);


  firebase.database().ref(room_name).child(message_id).update({
    like : updated_likes  
  });
}
function updateLike(message_id)
{
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);


}

function logout()
{
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location.replace("index.html");
}
