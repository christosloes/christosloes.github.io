 


 var config = {
    apiKey: "AIzaSyCwdYb2wb5XYAnZzmNJm8WX32LDTg8-Sv4",
    authDomain: "train-28815.firebaseapp.com",
    databaseURL: "https://train-28815.firebaseio.com",
    storageBucket: "train-28815.appspot.com",
    messagingSenderId: "567065863678"
  };

  firebase.initializeApp(config);


  var database = firebase.database();

  // Live Time of The Day 

  var updateTime = function(){
  	var now = moment().format('hh:mm');
  	$('#currentTime').html(now);
  }

  $(document).ready(function(){
    updateTime();
    setInterval(updateTime, 1000);
});

  /*******************************************/

$('#submit').on('click', function(){

	// Retrieve user inputs from form
	var trainName = $('#trainName').val().trim();
	var destination = $('#destination').val().trim();
	var firstTrain = $('#firstTrain').val().trim();
	var frequency = $('#frequency').val().trim();

	// Create an object for new train to be added
	var newTrain = {
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	}

	
	database.ref().push(newTrain);

	$('#trainName').val('');
	$('#destination').val('');
	$('#firstTrain').val('');
	$('#frequency').val('');



	return false;

});


database.ref().on('child_added', function(childSnapshot, prevChildKey) {

	var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var firstTrain = childSnapshot.val().firstTrain;
	var frequency = childSnapshot.val().frequency;


	$('.table > tbody').append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>"
		+ frequency + "</td><td>" + "Delayed" + "</td><td>" + "Unknown" + "</td></tr>");

});

