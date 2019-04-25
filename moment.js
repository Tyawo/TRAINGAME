$(document).ready(function () {

    // Initialize Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyBHuiRU-wbX-NRpzF9wfXWjki2hhYJea_w",
        authDomain: "in-class-activity-34cd2.firebaseapp.com",
        databaseURL: "https://in-class-activity-34cd2.firebaseio.com",
        projectId: "in-class-activity-34cd2",
        storageBucket: "in-class-activity-34cd2.appspot.com",
        messagingSenderId: "371617324017"
    };
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    var timer = setInterval(timer, 1000);
    function timer() {
        var d = new Date();
        $("#current-time").text(d.toLocaleTimeString());

    }

    // adding new train
    $("#submit-btn").on("click", function () {
        event.preventDefault;
        // Grab user input
        var trainName = $("#train-name").val().trim();
        var destination = $("#train-destination").val().trim();
        var firstTrainTime = $("#arrival").val().trim();
        var frequency = $("#frequency").val().trim();

        // if(($("#train-name").val) ==="null")
        // alert("Entry required")

        // create temporary object to hold train data
        var newTrain = {
            name: trainName,
            destination: destination,
            frequency: frequency,
            time: firstTrainTime,

        };
        // upload train data to the database
        database.ref().push(newTrain);
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.frequency);
        console.log(newTrain.time);

        alert("Train successfully added");

        // clears all of the text-boxes
        $("#train-name").val("");
        $("#arrival").val("");
        $("#train-destination").val("");
        $("#frequency").val("");

    });
    // retrieve data from the database 
    database.ref().on("child_added", function (ChildSnapshot) {
        console.log(ChildSnapshot.val());

        var trainName = ChildSnapshot.val().name;
        var destination = ChildSnapshot.val().destination;
        var firstTrainTime = ChildSnapshot.val().time;
        var frequency = ChildSnapshot.val().frequency;

        // Console.log(variables)
        console.log(trainName);
        console.log(frequency);
        console.log(destination);
        console.log(firstTrainTime);
        console.log(nextTrain);
        console.log(minuteAway);
        console.log(currentTime);


        var trainArrivalConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
        console.log(trainArrivalConverted);

        //current time
        var currentTime = moment();
        console.log("Current time: " + moment(currentTime).format("hh:mm a"))

        // diff in time
        var diffTime = moment().diff(moment(trainArrivalConverted), "minutes")
        console.log("Time Left: " + diffTime);

        // time between
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);

        // Minutes away
        var minuteAway = frequency - tRemainder;
        console.log("Minutes Away:" + minuteAway);

        // Next Train
        var nextTrain = moment().add(minuteAway, "minutes").format("hh:mm a");
        console.log("Arrival time: " + moment(nextTrain).format("hh:mm a"));

        // create new row and display train details
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextTrain),
            $("<td>").text(minuteAway),

        );
        // Append the new row to the table
        $("#new-train-schedule").append(newRow);

    });

})

