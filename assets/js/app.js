//variable setting up the questions for the game

var triviaQuestions = [{
	question: "Why did Freyda Felcher dump Harry?",
	answerList: ["Cheating on her", "did not listen to her", "stole money from her", "he broke up with her"],
	answer: 1
},{
	question: "What does it say on Sea bass's cap?",
	answerList: ["Yankees", "Wine'em Dine'em 69'em", "BADASS", "Colorado"],
	answer: 1
},{
	question: "What is the name of Lloyd's crush?",
	answerList: ["Polly Craig", "Freta Felcher", "Mary Swanson", "Beth Jordan"],
	answer: 2
},{
	question: "What is Lloyd's last name?",
	answerList: ["Maison", "Edwards", "Hunter", "Christmas"],
	answer: 3
},{
	question: "What did Lloyd pretend to sell to the blind kid?",
	answerList: ["Baseball Cards and sack of marbles", "worm farm", "A parakeet", "money"],
	answer: 0
},{
	question: "What did Lloyd say when Nicolas (the bad guy) came to his hotel room?",
	answerList: ["I have your money", "We have plenty of towels, thanks", "Please don't shoot me", "I believe you are looking for a briefcase"],
	answer: 1
},{
	question: "What did Lloyd find out at the bar in Aspen?",
	answerList: ["Mary is having a party", "Man Landed on the moon", "A solar ecplise is coming", "President Kennedy was shot"],
	answer: 1
},{
	question: "When Lloyd made the wrong turn, where did he end up going instead of Aspen?",
	answerList: ["Utah", "Arizona", "Nebraska", "Texas"],
	answer: 2
},{
	question: "When Lloyd & Harry were searching for Mary, what incorrect lastname did they lookup?",
	answerList: ["Slimmin", "Simpson", "Swanson", "Sampsonite"],
	answer: 3
},{
	question: "When year did the movie Dumb and Dumber come out?",
	answerList: ["1994", "1997", "1998", "2001"],
	answer: 0

}];


var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var timer; 
var answered; 
var userSelect;

var messages = {
	correct: "Correct!",
	incorrect: "Wrong",
	endTime: "Time is up",
	finished: "Final Score"
}

//start button to begin the game and call the newGame function
$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$("#playAgain").on('click', function(){
	$(this).hide();
	newGame();
});



function newGame(){
	$("#gameOverMessage").empty();
	$("#correctAnswers").empty();
	$("#incorrectAnswers").empty();
	$("#unanswered").empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$("#message").empty();
	$("#correctedAnswer").empty();
	
	answered = true;
	
	//sets up new questions & answerList
	$("#currentQuestion").html("Question #" + (currentQuestion + 1) + " of " + triviaQuestions.length);
    
    
	$(".question").html('<h3>' + triviaQuestions[currentQuestion].question + '</h3>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	
	//checks to see correct, incorrect, or unanswered
	if((userSelect === rightAnswerIndex) && (answered === true)){
		correctAnswer++;
		$('#message').html(messages.correct);
        
	} else if((userSelect !== rightAnswerIndex) && (answered === true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion === (triviaQuestions.length-1)){
		setTimeout(scoreboard, 1500)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 1500);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	

	$('#gameOverMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$("playAgain").addId('reset');
	$("playAgain").show();
	$("playAgain").html("Play Again?");
}