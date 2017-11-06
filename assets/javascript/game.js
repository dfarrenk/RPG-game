$(document).ready(function() {
    var gameState = 'characterSelection';
    var playerCharacter;
    var enemyCharacter;

    function character(name, image, health, attack, counterAttack) {
        this.name = name;
        this.image = image;
        this.health = health;
        this.attack = attack;
        this.baseAttack = attack;
        this.counterAttack = counterAttack;

    }

    var darthJarJar = new character("Darth Darth Binks", "assets/images/darthjarjar.jpg", 100, 10, 10);
    var darthMaul = new character("Darth Maul", "assets/images/darthmaul.jpeg", 200, 5, 5);
    var darthVader = new character("Darth Vader", "assets/images/Vader.jpg", 300, 20, 20);
    var obiWan = new character("Old Ben", "assets/images/obiwan.png", 150, 15, 15);

    var numberOfEnemies = 3; // number of character - 1
    //Need to use <button> to hold a value field.
    $(".button").on("click", function() {
        //console.log(this.classList.contains("character-box"));

        if (this.classList.contains('character-box') && gameState === 'characterSelection') {
            switch (this.value) {
                case "darthJarJar":
                    playerCharacter = darthJarJar;
                    break;
                case 'darthMaul':
                    playerCharacter = darthMaul;
                    break;
                case 'darthVader':
                    playerCharacter = darthVader;
                    break;
                case 'obiWan':
                    playerCharacter = obiWan;
                    break;

            }
            alert("Player chose " + playerCharacter.name);
            $(this).addClass('fadeAway');
            $(this).val(''); //Need to learn about timersassets.  For now let's just remove the value from an invisible button.
            gameState = 'enemySelection';
            $('.player-box').append("<h5 class='character-title fadeIn'>" + playerCharacter.name + "</h5>");
            $('.player-box').append("<div class='character-portrait fadeIn'><img src='" + playerCharacter.image + "'</div>");
            $('.player-box').append("<h6 class='player-stats fadeIn' class='character-stats'>HP: " + playerCharacter.health + "  ATK: " + playerCharacter.attack + "</h6>");
        }
        else if (this.classList.contains('character-box') && gameState === 'enemySelection') {
            switch (this.value) {
                case "darthJarJar":
                    enemyCharacter = darthJarJar;
                    break;
                case 'darthMaul':
                    enemyCharacter = darthMaul;
                    break;
                case 'darthVader':
                    enemyCharacter = darthVader;
                    break;
                case 'obiWan':
                    enemyCharacter = obiWan;
                    break;
            }
            alert("Player will fight " + enemyCharacter.name);
            $(this).addClass('fadeAway');
            $(this).val('');
            gameState = 'combat';
            $('.enemy-box').append("<h5 class='character-title fadeIn'>" + enemyCharacter.name + "</h5>");
            $('.enemy-box').append("<div class='character-portrait fadeIn'><img src='" + enemyCharacter.image + "'</div>");
            $('.enemy-box').append("<h6 class='enemy-stats fadeIn' class='character-stats'>HP: " + enemyCharacter.health + "  ATK: " + enemyCharacter.attack + "</h6>");
        }
        else if (this.classList.contains('fight') && gameState === 'combat') {
            enemyCharacter.health -= playerCharacter.attack;
            $('.enemy-stats').text('HP: ' + enemyCharacter.health + '  ATK: ' + enemyCharacter.attack);
            playerCharacter.attack += playerCharacter.baseAttack;
            $('.player-stats').text('HP: ' + playerCharacter.health + '  ATK: ' + playerCharacter.attack);
            //Check if fight is won
            if (enemyCharacter.health <= 0) {
                //Are all enemies dead?
                numberOfEnemies--;
                gameState = 'enemySelection';
                $('.enemy-box').children().removeClass('fadeIn');
                $('.enemy-box').children().fadeOut(1000, function() { $(this).empty(); });
                if (numberOfEnemies <= 0) {
                    //alert("You won!");
                    $('enemy-box').addClass('fadeAway');
                    gameState = 'gameOver';
                }
            }
            else {
                playerCharacter.health -= enemyCharacter.counterAttack;
                $('.player-stats').text('HP: ' + playerCharacter.health + '  ATK: ' + playerCharacter.attack);
                if (playerCharacter.health <= 0) {
                    //alert("You lost!")
                    $('.player-box').addClass('fadeAway');
                    $('.player-box').empty();
                    gameState = 'gameOver';
                }
            }
        }
    });
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/sounds/cantina.mp3");

    // Theme Button
    $(".theme-button").on("click", function() {
        audioElement.play();
    });

    $(".pause-button").on("click", function() {
        audioElement.pause();
    });

});
