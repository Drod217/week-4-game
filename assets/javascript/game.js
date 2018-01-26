var Character;
var Enemy;
var UserChoise = false;
var ChoosenOpponent = false;
var EnemiesLeft;
var Health;
var EnemyHealth;
var Attack;
var ChAttack;
var EnemyAttack;
var Clicks = 0;
var Images = [];

function resetGame() {
	$("#your-character-img").empty();
	$("#opponent-img").empty();
		Images.forEach(function(element, index) {
			$("#character-images").append(element);
		});
		
	$(".image-padding").each(function() {
		playerName = $(this).attr("id");
		$("#" + playerName).removeClass("red-padding");
		$("#" + playerName).addClass("padding option");
		$("#stat-"+playerName).text("Attack: " + $(this).attr("attack"));
		$("#hp-"+playerName).empty();
		$("#character-images").append($(this));
		$("#instructions").text("Choose Opponent");
		$("#instructions").removeClass("green-font red-font");
		$("#instructions").addClass("blink green-font")
		UserChoise = false;
		ChoosenOpponent = false;
		EnemiesLeft = $(".image-padding").length - 1;
		Images = [];
		Clicks = 0;
	});

	$(document).ready(gameplay);
};

function gameplay() {
	$(".image-padding").each(function() {
		playerName = $(this).attr("id");
		$("#stat-"+playerName).text("Attack: " + $(this).attr("attack"));
	});

	EnemiesLeft = $(".image-padding").length - 1;

	var chooseCharacter = $(".option");
	chooseCharacter.on("click", function() {
		console.log("in chooseCharacter click");
		if(UserChoise === false) {
			console.log("UserChoise = false");
			Character = $(this).attr("id");
			$("#" + Character).removeClass("option");
			$("#your-character-img").append($("#" + Character));
			$("#instructions").text("Choose Opponent");
			$("#instructions").removeClass("green-font");
			$("#instructions").addClass("red-font");
			$(".option").removeClass("padding");
			$(".option").addClass("red-padding");
			Health = parseInt($("#" + Character).attr("hp"));
			Attack = parseInt($("#" + Character).attr("attack"));
			ChAttack = Attack;
			$("#hp-" + Character).text("HP: " + Health); 

			$(".option").each(function(){
				playerName = $(this).attr("id");
				$("#stat-"+playerName).text("Counter: " + $(this).attr("counter"));
			});
		}

		if(UserChoise === true && ChoosenOpponent === false) {
			Enemy = $(this).attr("id");
			$("#" + Enemy).removeClass("option");
			$("#opponent-img").append($("#" + Enemy));
			$("#instructions").text("Click on sword to attack your enemy");
			$("#instructions").removeClass("red-font");
			$("#instructions").addClass("black-font");
			$("#instructions").removeClass("blink");
			EnemyHealth = parseInt($("#" + Enemy).attr("hp"));
			EnemyAttack = parseInt($("#" + Enemy).attr("counter"));
			$("#hp-" + Enemy).text("HP: " + EnemyHealth);
			ChoosenOpponent = true;
		}

		UserChoise = true;

	});

	var attackButton = $("#Sword");
	attackButton.on("click", function(){
		if(ChoosenOpponent === true && UserChoise === true && EnemyHealth > 0 && Health > 0) {
			Health = Health - EnemyAttack;
			EnemyHealth = EnemyHealth - ChAttack;
			$("#hp-" + Character).text("HP: " + Health);
			$("#hp-" + Enemy).text("HP: " + EnemyHealth);
			Clicks++;
			ChAttack = Attack*(Clicks + 1);
			$("#stat-" + Character).text("Attack: " + ChAttack);

			if(EnemyHealth <= 0) {
				EnemiesLeft--;
				Images.push($("#opponent-img").html());
				console.log("push1");
				var name = $("#" + Enemy).attr("name");
				$("#opponent-img").empty();
				$("#instructions").addClass("blink");
				$("#instructions").removeClass("black-font");
				console.log(EnemiesLeft);
				if(EnemiesLeft > 0) {
					ChoosenOpponent = false;
					$("#instructions").text("You Killed " + name); 
					$("#instructions").append("<br>");
					$("#instructions").append("Choose your next opponent");
					$("#instructions").addClass("red-font");
				}
				else {
					$("#instructions").text("You sit on the throne! for now...");
					$("#instructions").append("<br>");
					$("#instructions").append("Restarting game...");
					$("#instructions").addClass("green-font");
					Images.push($("#your-character-img").html());
					console.log("push2");
					setTimeout(resetGame, 10000);
				}
			}
			else if(Health <= 0) {
				Images.push($("#your-character-img").html());
				console.log("push3");
				Images.push($("#opponent-img").html());
				console.log("push4");
				$("#your-character-img").empty();
				$("#instructions").addClass("blink");
				$("#instructions").removeClass("black-font");
				$("#instructions").addClass("red-font");
				$("#instructions").text("Dead! Maybe next time?"); 
				$("#instructions").append("<br>");
				$("#instructions").append("Game is resetting");
				setTimeout(resetGame, 10000);
			}
			else {}
		}
	});
};

$(document).ready(gameplay);