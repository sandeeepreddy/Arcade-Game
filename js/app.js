/*Declaring scoring and moves to be zero initially*/
var scoring = 0;
var moves = 0;
/*Updating html for scores and moves initially*/
document.getElementById('playerscore').innerHTML = scoring;
document.getElementById('moves').innerHTML = moves;
/*Declaring enemy postion and speed*/
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/Goomba-icon.png';
};

/*Updating the enemy in random speed*/
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    };
    /*Check for the collison*/
    if (player.x < this.x + 80 && player.x + 80 > this.x && player.y < this.y + 60 && 60 + player.y > this.y) {
        /*Resets the player position if collison occurs*/
        scoring--;
        document.getElementById('playerscore').innerHTML = scoring;
        player.x = 200;
        player.y = 405;
    };
};


Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/*Declaring player position and speed*/
var Player = function (x, y) {
    this.x = 202;
    this.y = 405;
    this.sprite = 'images/Paper-Mario-icon.png';
}
/*Updating the player*/
Player.prototype.update = function () {
    if (player.y < 20) {
        /*Retriving player position back to normal if the player reaches the water*/

        setTimeout(() => {
            this.x = 200;
            this.y = 405;
        }, 100);
    }

}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/*Declaring enemies and thier positions*/
var allEnemies = [];
var enemyLocation = [63, 147, 230];
enemyLocation.forEach(function (locationY) {
    /*Updating the Enemy position*/
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

/*Initial player position*/
player = new Player();
/*Player position update on keypress*/

Player.prototype.handleInput = function (position) {
    /*Conditions for making player not to move out of canvas*/
    /*Defining player position shift for each keypress*/
    if (position == 'left' && this.x > 0) {
        this.x -= 102;
        moves++;
        /*Updating the moves*/
        document.getElementById('moves').innerHTML = moves;
    }
    if (position == 'right' && this.x < 400) {
        this.x += 102;
        moves++;
        document.getElementById('moves').innerHTML = moves;
    }
    if (position == 'up' && this.y > 0) {
        this.y -= 83;
        moves++;
        document.getElementById('moves').innerHTML = moves;
    }
    if (position == 'down' && this.y < 400) {
        moves++;
        document.getElementById('moves').innerHTML = moves;
        this.y += 83;
    }
    if (moves == 1) {
        starttimer();
    }
    if (this.y < 20) {
        /*Incrementing score if player reaches the water*/
        scoring++;
        document.getElementById('playerscore').innerHTML = scoring;
        if (scoring >= 2) {
            /*Changing the enemy image if the score becomes 2*/
            Enemy.prototype.update = function (dt) {
                this.sprite = 'images/enemy-bug.png';
                this.x += this.speed * dt;
                if (this.x > 510) {
                    this.x = -50;
                    this.speed = 100 + Math.floor(Math.random() * 222);
                };
                /*Check for the collison*/
                if (player.x < this.x + 80 && player.x + 80 > this.x && player.y < this.y + 60 && 60 + player.y > this.y) {
                    /*Resets the player position if collison occurs*/
                    scoring--;
                    document.getElementById('playerscore').innerHTML = scoring;
                    player.x = 200;
                    player.y = 405;
                };

            };
        };


    }
}
/*Allocating the switch cases to the keys in keyboard*/
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

function starttimer() {

    /*Initial starting of timer*/

    var seconds = 0,
        minutes = 0;
    duration = setInterval(function () {
        document.getElementById('timer').innerHTML = seconds + "secs";
        seconds++;
        if (seconds == 61) {
            clearInterval(duration);
            swal({
                /*Displaying alert on score after one minute*/
                title: "CONGRATULATIONS",
                text: `THE MOVES ARE:${moves}.THE SCORE IS:${scoring}.`,
                icon: "success",
                button: {
                    text: "Play Again"
                }
            });
            $('.swal-button').click(function () {
                $(restart());
            })


        }
    }, 1000);

};

function restart() {
    /*Game restarting after one minute*/
    /*updating the moves, timer and scoring to be zero*/
    moves = 0;
    scoring = 0;
    document.getElementById('playerscore').innerHTML = 0;
    document.getElementById('moves').innerHTML = 0;
    document.getElementById('timer').innerHTML = 0;


}