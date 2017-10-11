    $(document).ready(function() {

    	//-------------------------Global variables----------------

    	var hero;
    	var currentEnemy;
    	var enemyArray;

    	//---------------Object Declarations--------------
    	//===============================================

    	var winston = {
       	
       		name: "Winston",
	        attack: 20,
	        counterAttack: 20,
	        hp: 500,
	        enemy: "empty",

	      //---------------Method Definitions-------------- 

	        select: function(){
	        	
	        	$(".yourReaper").hide();
	        	$(".yourTracer").hide();
	        	$(".yourBastion").hide();
	        	
	        	$(".enemyReaper").show();
        		$(".enemyTracer").show();
        		$(".enemyBastion").show();
        		$(".chatBox").html("You picked "+ this.name);
        		pickEnemy();
	        }
    	};

    	var tracer = {
       	
       		name: "Tracer",
	        attack: 70,
	        counterAttack: 50,
	        hp: 150,
	        enemy: "empty",

	      //---------------Method Definitions--------------  
	      
	        select: function(){
	        	$(".yourWinston").hide();

	        	$(".yourReaper").hide();
	        	$(".yourBastion").hide();
	        	$(".enemyWinston").show();

	        	$(".enemyReaper").show();
        		$(".enemyBastion").show();
        		//nextEnemy = [winston, reaper, bastion];
        		$(".chatBox").html("You picked "+ this.name);
        		pickEnemy();

	        }
    	};

    	var reaper = {
       	
       		name: "Reaper",
	        attack: 60,
	        counterAttack: 50,
	        hp: 200,
	        enemy: "empty",

	      //---------------Method Definitions--------------  
	       
	        select: function(){
	        	$(".yourWinston").hide();
	        	$(".yourTracer").hide();
	        	
	        	$(".yourBastion").hide();
	        	$(".enemyWinston").show();
	        	$(".enemyTracer").show();
        		
        		$(".enemyBastion").show();
        		//nextEnemy = [winston, tracer, bastion];
        		pickEnemy();

	        }
    	};

    	var bastion = {
       	
       		name: "Bastion",
	        attack: 50,
	        counterAttack: 50,
	        hp: 300,
	        enemy: "empty",

	      //---------------Method Definitions--------------  
	       
	        select: function(){
	        	$(".yourWinston").hide();
	        	$(".yourTracer").hide();
	        	$(".yourReaper").hide();
	        	
        		$(".enemyWinston").show();
        		$(".enemyTracer").show();
        		$(".enemyReaper").show();
	        	//nextEnemy = [winston, tracer, reaper];
        		pickEnemy();
	        }

    	};


    	//-------------------------Function declarations-----------------
    	//===============================================================

    	var setup = function(){
    		//Draw the initial setup (function?) and listen for character selection
    		$(".chatBox").html("Welcome to the Overwatch RPG.  Choose a character!" );
		

    				writeHealth();					//updates the health number on all pictures

	    			$(".yourWinston").on("click", function() {           //if a number is pressed.
		    			winston.select();
		    			hero = winston;
		    			enemyArray = [tracer, reaper, bastion];
	    			});

	    			$(".yourTracer").on("click", function() {           
		    			tracer.select();
		    			hero = reaper;
		    			enemyArray = [winston, reaper, bastion];
	    			});

	    			$(".yourReaper").on("click", function() {           
		    			reaper.select();
		    			hero = reaper;
		    			enemyArray = [winston, tracer, bastion];
	    			});

	    			$(".yourBastion").on("click", function() {           
		    			bastion.select();
		    			hero = bastion;
		    			enemyArray = [winston, tracer, reaper];
	    			});

    	}

    	var writeHealth = function(){
	    	$(".winstonHealth").html(winston.hp);
	    	$(".tracerHealth").html(tracer.hp);		
	    	$(".reaperHealth").html(reaper.hp);	
	    	$(".bastionHealth").html(bastion.hp);
    	}

		var hideAll = function(){
    		$(".enemyWinston").hide();
			$(".enemyReaper").hide();
        	$(".enemyTracer").hide();
        	$(".enemyBastion").hide();
        	$(".btn").hide();
    	}
    	
    	var pickEnemy = function(){
    		//Draw the initial setup (function?) and listen for character selection
    		$(".chatBox").html("Now, choose an enemy to fight." );


    		$(".enemyWinston").on("click", function() {           //These are listeners for enemy selection..
    			$(".enemyReaper").hide();
	        	$(".enemyTracer").hide();
	        	$(".enemyBastion").hide();
    			currentEnemy = enemyArray[enemyArray.indexOf(winston)];
    			fight();
    		});

    		$(".enemyTracer").on("click", function() {           
    			$(".enemyWinston").hide();
	        	
	        	$(".enemyReaper").hide();
	        	$(".enemyBastion").hide();
    			currentEnemy = enemyArray[enemyArray.indexOf(tracer)];
    			fight();
    		});

    		$(".enemyReaper").on("click", function() {           
    			$(".enemyWinston").hide();
	        	$(".enemyTracer").hide();
	        	
	        	$(".enemyBastion").hide();
    			currentEnemy = enemyArray[enemyArray.indexOf(reaper)];
    			fight();
    		});

    		$(".enemyBastion").on("click", function() {           
    			$(".enemyWinston").hide();
	        	$(".enemyTracer").hide();
	        	$(".enemyReaper").hide();
    			currentEnemy = enemyArray[enemyArray.indexOf(bastion)];
    			console.log(currentEnemy.hp);
    			fight();
    		});

    		var fight = function(){
    		$(".btn").show();
    				
	    			$(".btn").on("click", function() {           //These are listeners for the attack button
	    				
		    			if(hero.hp > 0){	//as long as you don't lose
	    					//if(currentEnemy.hp < 0){
				    			hero.hp = hero.hp - currentEnemy.counterAttack;
				    			$(".chatBox").html(hero.name + " hit " + currentEnemy.name + " for " + hero.attack);
				    			console.log(hero.name + " hit " + currentEnemy.name + " for " + hero.attack);

				    			currentEnemy.hp = currentEnemy.hp - hero.attack;
				    			console.log(currentEnemy.hp);
				    			if(currentEnemy.hp < 0){
				    				currentEnemy.hp = 0;
				    			} 
				    			$(".chatBox").append("... " + currentEnemy.name + " hit " + hero.name + " for " + currentEnemy.counterAttack);
				    			console.log(currentEnemy.name + " hit " + hero.name + " for " + currentEnemy.counterAttack);
				    			console.log("Thier HP is now " + winston.hp);
				    			
				    			hero.attack = hero.attack * 2;
				    			console.log("New hero attack is " + hero.attack);
				    			writeHealth();
				    		//}else $(".chatBox").html(currentEnemy.name +" is dead.  You win!" );
				    	}else {
				    		$(".chatBox").html("You are dead. You lose! Refresh the page to play again.");
				    	}
				    	if(currentEnemy.hp <= 0){
				    		//currentEnemy =enemyArray[enemyArray.indexOf(currentEnemy)];
				    		//console.log("The new enemy is " + currentEnemy);
				    		$(".chatBox").html(currentEnemy.name +" is dead.  You win! Refresh the page to play again." );
				    		hero.freeze();
				    		currentEnemy.freeze();
				    	}
	    			});
	    		
    	}

    	}
/*
    	var fight(hero, enemy){
    		$(".btn").on("click", function() {           
    			$(".chatBox").html("Now, choose an enemy to fight." );

    		});

    	}
*/

    	//---------------------MAIN APPLICATION------------------
    	//=======================================================
    	hideAll();							//Hides all the unnecessary pictures
    	setup();							//Pick your character 


    	//Move the selected enemy into place and listen for attack button until either enemy and char HP < 0

    	//Draw the fight setup screen and listen for opponent selection

    	//Remove the enemies from the screen when they are dead. (hide?)

    	//Continue until no enemies are left to fight then display WIN or LOSE


   });
//Where I left off:  trying to figure out a way to setup the operations for the attacking sequence..