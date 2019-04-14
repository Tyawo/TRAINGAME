$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBDK81GcqkTPH2GO1e9mORR9Y6luKhjdXg",
    authDomain: "database1-6e7f8.firebaseapp.com",
    databaseURL: "https://database1-6e7f8.firebaseio.com",
    projectId: "database1-6e7f8",
    storageBucket: "database1-6e7f8.appspot.com",
    messagingSenderId: "397023224579"
  };
  firebase.initializeApp(config);
  
    var timer = setInterval(timer, 1000);
    function timer(){
    var d = new Date();
    $("#current-time").text(d.toLocaleTimeString());

    var frequency = 0;
    var firstTrain = 0;
    
    }
// adding new train
    $("#submit-btn").on("click", function (event) {

        event.preventDefault();
// Grab user input
        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("HH:mm");
        frequency = parseInt($("#frequency").val().trim());
        
        console.log(firstTrain);
        console.log(typeof firstTrain);
        var firstTrainConverted = moment(firstTrain, "hh:mm");
        console.log(firstTrainConverted);
        var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
        console.log(diffTime);
        var tRemainder = diffTme % frequency;
        console.log(tRemainder);
        var minuteAway = frequency - tRemainder;
        console.log(minuteAway);
// create temporary objecy to hold train data
        var newTrain = {
            name: trainName,
            destination: destination,
            frequency: frequency,
            minuteAway: minuteAway,
            nexTrain: nextTrain,
            firstTrain: firstTrain,
            
    };
   
// upload train data to the database
        database.ref().push (newTrain)

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.frequency);
        console.log(newTrain.firstTrain);
        alert("Train successfully added");

        // clears all of the text-boxes
        $("#train-name-input").val("");
        $("#firstTrian-input").val("");
        $("#destination-input").val("");
        $("#frequency").val("");
    
    });
    // adding train to the database in a row after user submission
    database.ref().on("child_added" , function(ChildSnapshot){

        // console.log(ChildSnapshot.val());


        var trainName = ChildSnapshot.val().name;
        var destination = ChildSnapshot.val().destination;
        var firstTrain = ChildSnapshot.val().firstTrain;
        var frequency = ChildSnapshot.val().firstTrain;
        var nextTrain = ChildSnapshot.val().nextTrain;
        var minuteAway = ChildSnapshot.val().minuteAway;

        console.log(trainName);
        console.log(trainDeparture);
        console.log(trainDestination);


    });

});

