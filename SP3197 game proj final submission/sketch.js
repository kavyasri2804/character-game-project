/*

- Copy your game project code into this file
- for the p5.Sound library look here https://p5js.org/reference/#/libraries/p5.sound
- for finding cool sounds perhaps look here
https://freesound.org/


*/


var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos_x;

var isLeft;
var isRight;
var isPlummeting;
var isFalling;

var collectable;
var canyon;
var mountain;
var tree;
var cloud;

var game_score;

var flagpole;

var lives;

var jumpSound;

var backgroundSound;

var fallSound;

var collectableSound;

var winSound;

var platforms;

var enemies;

function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
    
    backgroundSound = loadSound('assets/background.wav');
    backgroundSound.setVolume(0.005);
    
    fallSound = loadSound('assets/fall.wav');
    fallSound.setVolume(0.2);
    
    collectableSound = loadSound('assets/collectable.wav');
    collectableSound.setVolume(1.0);
    
    winSound = loadSound('assets/win.wav')
    winSound.setVolume(1.0);
}


function setup()
{
	createCanvas(1024, 576);
    scroll = 0;
	floorPos_y = height * 3/4;
    
    lives = 4;
    startGame();
}

function startGame()
{
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
    
    isLeft = false;
    isRight = false;
    isPlummeting = false;
    isFalling = false;
    
    collectable = [{x_pos: 50, y_pos: 75, size: 10, isFound: false},
                  {x_pos: 10, y_pos: 75, size: 10, isFound: false}];
    
    canyon = [{x_pos: 670, width: 120},
             {x_pos: 1000, width: 120},
             {x_pos: 1300, width: 120}]
    
    platforms = [];
    
    platforms.push(createPlatforms(650,floorPos_y - 100, 100));
    platforms.push(createPlatforms(970, floorPos_y - 60, 100));
    
    mountain = [{x1: 400,y1:435,x2:500,y2:135,x3:600,y3:435,r:127,g:98,b:68},
               {x1:450,y1:360,x2:500,y2:210,x3:550,y3:360,r:205,g:133,b:63},
               {x1:475,y1:322.5,x2:500,y2:247.5,x3:525,y3:322.5,r:219,g:170,b:112}];
    tree = [910];
    cloud = [{x:300, y:150}];
    
    game_score = 0;
    
    flagpole = {isReached: false, x_pos: 1500};
    
    lives -= 1;
    
    enemies = [];
    enemies.push(new Enemy(100, floorPos_y - 10, 100));
}

function draw()
{
    backgroundSound.play();

	///////////DRAWING CODE//////////
    
    scroll = gameChar_x - 250;

	background(100,155,255); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
    
    push();
    
    translate(- scroll, 0);
    
    //draw the cloud
    drawClouds();

    //draw the tree
    drawTrees();
    
    //draw the mountain
    drawMountains();
    
    for(var i = 0; i < platforms.length; i++)
        {
            platforms[i].draw();
        }

	//draw the canyon
    for(var i=0; i < canyon.length; i++)
        {
             drawCanyon(canyon[i]);
            checkCanyon(canyon[i]);
        }
    
    for(var i = 0; i < enemies.length; i++)
        {
            enemies[i].draw();
            
            var isContact = enemies[i].checkContact(gameChar_x, gameChar_y);
            
            if(isContact)
                {
                    if(lives > 0)
                    {
                        startGame();
                        break;
                    }
                }
        }
    
    //collectable token
    for(var i=0; i<collectable.length; i++)
        {
            if(!collectable[i].isFound)
                {
                    drawCollectable(collectable[i]);
                    checkCollectable(collectable[i]);
                }
        }
    
    renderFlagpole(); 
    
	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
        fill(150,75,0);
    //ears
   ellipse(gameChar_x + 8, gameChar_y - 72,10,10);
   ellipse(gameChar_x - 8,gameChar_y - 72,10,10);
    //face
   ellipse(gameChar_x,gameChar_y - 65,20,20);
    fill(92,64,51);
   ellipse(gameChar_x,gameChar_y - 62,12,9);
   //eyes
   fill(0);
   ellipse(gameChar_x - 4,gameChar_y - 69,3,3);
   ellipse(gameChar_x + 4,gameChar_y - 69,3,3);
   //nose
   ellipse(gameChar_x,gameChar_y - 64,4,2);
    //body
    fill(150,75,0);
    ellipse(gameChar_x, gameChar_y - 41,12,32)
    //legs
    stroke(150,75,0);
    strokeWeight(5);
    line(gameChar_x - 2, gameChar_y - 28, gameChar_x - 5, gameChar_y - 20);
    line(gameChar_x + 1, gameChar_y - 28, gameChar_x + 5, gameChar_y - 20);
    //arms
    line(gameChar_x + 3, gameChar_y - 49, gameChar_x + 8, gameChar_y - 38);
    line(gameChar_x - 4, gameChar_y - 49, gameChar_x - 13, gameChar_y - 40);

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        fill(150,75,0);
    //ears
   ellipse(gameChar_x + 8, gameChar_y - 72,10,10);
   ellipse(gameChar_x - 8,gameChar_y - 72,10,10);
    //face
   ellipse(gameChar_x,gameChar_y - 65,20,20);
    fill(92,64,51);
   ellipse(gameChar_x,gameChar_y - 62,12,9);
   //eyes
   fill(0);
   ellipse(gameChar_x - 4,gameChar_y - 69,3,3);
   ellipse(gameChar_x + 4,gameChar_y - 69,3,3);
   //nose
   ellipse(gameChar_x,gameChar_y - 64,4,2);
    //body
    fill(150,75,0);
    ellipse(gameChar_x, gameChar_y - 41,12,32)
    //legs
    stroke(150,75,0);
    strokeWeight(5);
    line(gameChar_x - 2, gameChar_y - 28, gameChar_x - 5, gameChar_y - 20);
    line(gameChar_x + 1, gameChar_y - 28, gameChar_x + 5, gameChar_y - 20);
    //arms
    line(gameChar_x + 3, gameChar_y - 49, gameChar_x + 13, gameChar_y - 45);
    line(gameChar_x - 3, gameChar_y - 49, gameChar_x - 10, gameChar_y - 38);


	}
	else if(isLeft)
	{
		// add your walking left code
        fill(150,75,0);
    //ears
   ellipse(gameChar_x + 8, gameChar_y - 52,10,10);
   ellipse(gameChar_x - 8,gameChar_y - 52,10,10);
    //face
   ellipse(gameChar_x,gameChar_y - 45,20,20);
    fill(92,64,51);
   ellipse(gameChar_x,gameChar_y - 42,12,9);
   //eyes
   fill(0);
   ellipse(gameChar_x - 4,gameChar_y - 49,3,3);
   ellipse(gameChar_x + 4,gameChar_y - 49,3,3);
   //nose
   ellipse(gameChar_x,gameChar_y - 44,4,2);
    //body
    fill(150,75,0);
    ellipse(gameChar_x, gameChar_y - 21,12,32)
    //legs
    stroke(150,75,0);
    strokeWeight(5);
    line(gameChar_x - 2, gameChar_y - 8, gameChar_x - 5, gameChar_y);
    line(gameChar_x + 1, gameChar_y - 8, gameChar_x + 5, gameChar_y);
    //arms
    line(gameChar_x + 3, gameChar_y - 29, gameChar_x + 8, gameChar_y - 18);
    line(gameChar_x - 6, gameChar_y - 29, gameChar_x - 15, gameChar_y - 29);


	}
	else if(isRight)
	{
		// add your walking right code
        fill(150,75,0);
    //ears
   ellipse(gameChar_x + 8, gameChar_y - 52,10,10);
   ellipse(gameChar_x - 8,gameChar_y - 52,10,10);
    //face
   ellipse(gameChar_x,gameChar_y - 45,20,20);
    fill(92,64,51);
   ellipse(gameChar_x,gameChar_y - 42,12,9);
   //eyes
   fill(0);
   ellipse(gameChar_x - 4,gameChar_y - 49,3,3);
   ellipse(gameChar_x + 4,gameChar_y - 49,3,3);
   //nose
   ellipse(gameChar_x,gameChar_y - 44,4,2);
    //body
    fill(150,75,0);
    ellipse(gameChar_x, gameChar_y - 21,12,32)
    //legs
    stroke(150,75,0);
    strokeWeight(5);
    line(gameChar_x - 2, gameChar_y - 8, gameChar_x - 5, gameChar_y);
    line(gameChar_x + 1, gameChar_y - 8, gameChar_x + 5, gameChar_y);
    //arms
    line(gameChar_x + 5, gameChar_y - 29, gameChar_x + 15, gameChar_y - 29);
    line(gameChar_x - 3, gameChar_y - 29, gameChar_x - 10, gameChar_y - 18);

	}
	else if(isFalling || isPlummeting)
	{
        // add your jumping facing forwards code
        fill(150,75,0);
        //ears
       ellipse(gameChar_x + 8, gameChar_y - 72,10,10);
       ellipse(gameChar_x - 8,gameChar_y - 72,10,10);
       //face
       ellipse(gameChar_x,gameChar_y - 65,20,20);
        fill(92,64,51);
       ellipse(gameChar_x,gameChar_y - 62,12,9);
       //eyes
       fill(0);
       ellipse(gameChar_x - 4,gameChar_y - 69,3,3);
       ellipse(gameChar_x + 4,gameChar_y - 69,3,3);
       //nose
       ellipse(gameChar_x,gameChar_y - 64,4,2);
        //body
        fill(150,75,0);
        ellipse(gameChar_x, gameChar_y - 41,20,32)
        //legs
        stroke(150,75,0);
        strokeWeight(5);
        line(gameChar_x - 4,gameChar_y - 28,gameChar_x - 5, gameChar_y - 20);
        line(gameChar_x + 4,gameChar_y - 28, gameChar_x + 5, gameChar_y - 20);
        //arms
        line(gameChar_x + 6, gameChar_y - 49, gameChar_x + 15, gameChar_y - 49);
        line(gameChar_x - 6, gameChar_y - 49, gameChar_x - 15, gameChar_y - 49);

	}
	else
	{
		// add your standing front facing code
        fill(150,75,0);
    //ears
   ellipse(gameChar_x + 8, gameChar_y - 52,10,10);
   ellipse(gameChar_x - 8,gameChar_y - 52,10,10);
   //face
   ellipse(gameChar_x,gameChar_y - 45,20,20);
    fill(92,64,51);
   ellipse(gameChar_x,gameChar_y - 42,12,9);
   //eyes
   fill(0);
   ellipse(gameChar_x - 4,gameChar_y - 49,3,3);
   ellipse(gameChar_x + 4,gameChar_y - 49,3,3);
   //nose
   ellipse(gameChar_x,gameChar_y - 44,4,2);
    //body
    fill(150,75,0);
    ellipse(gameChar_x, gameChar_y - 21,20,32)
    //legs
    stroke(150,75,0);
    strokeWeight(5);
    line(gameChar_x - 4, gameChar_y - 8, gameChar_x - 5, gameChar_y);
    line(gameChar_x + 4, gameChar_y - 8, gameChar_x + 5, gameChar_y);
    //arms
    line(gameChar_x + 6, gameChar_y - 29, gameChar_x + 15, gameChar_y - 29);
    line(gameChar_x - 6, gameChar_y - 29, gameChar_x - 15, gameChar_y - 29);   
        
    pop();


	}
    
    //draw game score
    fill(0);
    noStroke();
    textSize(20);
    text("score: " + game_score, 20, 55);
    text("lives: " + lives, 20, 35);
    
    if(lives < 1)
        {
            fill(255,0,0);
            textSize(50);
            text("GAME OVER", 340, height/2 - 50);
            textSize(40);
            fill(0);
            text("Press space to continue", 300, height/2 - 10);
            return;
        }
    
    if(flagpole.isReached == true)
        {
            fill(0,255,0);
            textSize(50);
            text("LEVEL COMPLETE", 300, height/2 - 50);
            fill(0);
            textSize(40);
            text("Press space to continue", 360, height/2 - 10);
            return;
        }
    

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    
    if(isPlummeting == true)
        {
            gameChar_y += 10;
            checkPlayerDie();
        }
    
    if(isLeft == true)
        {
            gameChar_x -= 5;
        }
    
    if(isRight == true)
        {
            gameChar_x += 5;
        }
    
    if(gameChar_y < floorPos_y)
        {
            var isContact = false;
            for(var i = 0; i < platforms.length; i++)
                {
                    if(platforms[i].checkContact(gameChar_x, gameChar_y) == true)
                        {
                            isContact = true;
                            break;
                        }
                }
            if(isContact == false)
                {
                    gameChar_y += 5;
                    isFalling = true;
                }
        }
    else
        {
            isFalling = false;
        }
    
    if(flagpole.isReached == false)
        {
            checkFlagpole();
        }

}

function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    
    if (keyCode == 37)
        {
            console.log("left arrow");
            isLeft = true;
        }
    else if (keyCode == 39)
        {
            console.log("right arrow");
            isRight = true;
        }
    
    else if(keyCode == 38)
        {
        if(gameChar_y>=floorPos_y)
        {
            console.log("up arrow");
            gameChar_y -= 200;
            jumpSound.play();
        }
        
        }
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    
    if (keyCode == 37)
        {
            console.log("left arrow");
            isLeft = false;
        }
    else if (keyCode == 39)
        {
            console.log("right arrow");
            isRight = false;
        }

}

function drawClouds()
{
    for(var h=0;h<cloud.length;h++)
        {
            fill(255);
            ellipse(cloud[h].x, cloud[h].y, 100, 100);
            ellipse(cloud[h].x - 50, cloud[h].y, 80, 80);
            ellipse(cloud[h].x + 50, cloud[h].y, 80, 80);
            
            ellipse(cloud[h].x + 230, cloud[h].y + 50, 100, 100);
            ellipse(cloud[h].x + 180, cloud[h].y + 50, 80, 80);
            ellipse(cloud[h].x + 280, cloud[h].y + 50, 80, 80);
            
            ellipse(cloud[h].x + 580, cloud[h].y + 20, 100, 100);
            ellipse(cloud[h].x + 530, cloud[h].y + 20, 80, 80);
            ellipse(cloud[h].x + 630, cloud[h].y + 20, 80, 80);
            
            ellipse(cloud[h].x + 880, cloud[h].y - 20, 100, 100);
            ellipse(cloud[h].x + 830, cloud[h].y - 20, 80, 80);
            ellipse(cloud[h].x + 930, cloud[h].y - 20, 80, 80);
        }
}

function drawTrees()
{
    for (var h=0;h<tree.length;h++)
    {
        fill(139,69,19);
        rect(tree[h] - 20, 282, tree[h] - 840, 150);
        fill(53,94,59);
        triangle(tree[h] - 70, 332, tree[h] + 20, 232, tree[h] + 100, 332);
        fill(0,128,0);
        triangle(tree[h] - 70, 300, tree[h] + 20, 200, tree[h] + 100, 300);
        fill(79,121,66);
        triangle(tree[h] - 70, 268, tree[h] + 20, 168, tree[h] + 100, 268);
        
        fill(139,69,19);
        rect(tree[h] + 350, 282, tree[h] - 840, 150);
        fill(53,94,59);
        triangle(tree[h] + 300, 332, tree[h] + 390, 232, tree[h] + 470, 332);
        fill(0,128,0);
        triangle(tree[h] + 300, 300, tree[h] + 390, 200, tree[h] + 470, 300);
        fill(79,121,66);
        triangle(tree[h] + 300, 268, tree[h] + 390, 168, tree[h] + 470, 268);
    }
}

function drawMountains()
{
    for (var h=0;h<mountain.length;h++)
        {
            fill(mountain[h].r,mountain[h].g,mountain[h].b);
            triangle(mountain[h].x1,mountain[h].y1,mountain[h].x2,mountain[h].y2,mountain[h].x3,mountain[h].y3);
            triangle(mountain[h].x1 + 65,mountain[h].y1,mountain[h].x2 + 65,mountain[h].y2,mountain[h].x3 + 65,mountain[h].y3);
            triangle(mountain[h].x1 + 600,mountain[h].y1,mountain[h].x2 + 600,mountain[h].y2,mountain[h].x3 + 600,mountain[h].y3);
        }
}

function drawCollectable(t_collectable)
{    
    // stem
    stroke(0, 160, 0);
    //strokeWeight(10);
    strokeWeight(t_collectable.size);
    //line(455,420,439,395);
    line(t_collectable.x_pos + 360, t_collectable.y_pos + 350, t_collectable.x_pos + 339, t_collectable.y_pos + 315);

    // orange
    fill(255,100,0);
    stroke(0,100);
    //strokeWeight(3);
    strokeWeight(t_collectable.size - 8);

    // pumpkin made of circles
    //ellipse(450,450,120,75);
    ellipse(t_collectable.x_pos + 350, t_collectable.y_pos + 350, t_collectable.size + 70, t_collectable.size + 25);
    //ellipse(450,450,90,75);
    ellipse(t_collectable.x_pos + 350, t_collectable.y_pos + 350, t_collectable.size + 40, t_collectable.size + 25);
    //ellipse(450,450,45,75);
    ellipse(t_collectable.x_pos + 350, t_collectable.y_pos + 350, t_collectable.size + 5, t_collectable.size + 25);
}

function checkCollectable(t_collectable)
{
    if(dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 515)
    {
        t_collectable.isFound = true;
        game_score += 1;
        collectableSound.play();
    }
}

function drawCanyon(t_canyon)
{
            fill(0);
            rect(t_canyon.x_pos, 430, t_canyon.width, 570);
}


function checkCanyon(t_canyon)
{
            if(gameChar_x > t_canyon.x_pos && gameChar_x < t_canyon.x_pos + t_canyon.width && gameChar_y == floorPos_y)
                {
                    isPlummeting = true
                    fallSound.play();
                }
}

function renderFlagpole()
{
    push();
    strokeWeight(5);
    stroke(180);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    fill(0,0,255);
    noStroke();
    
    if(flagpole.isReached)
        {
            rect(flagpole.x_pos, floorPos_y - 250, 80, 60);
        }
    else
        {
            rect(flagpole.x_pos, floorPos_y - 60, 80, 60);
        }
    
    pop();
}

function checkFlagpole()
{
    var d = abs(gameChar_x - flagpole.x_pos);
    
    if(d < 15)
        {
            flagpole.isReached = true;
            winSound.play();
        }
    
}

function checkPlayerDie()
{
    if(gameChar_y > height)
        {
            if(lives > 0)
                {
                    startGame();
                }
            else
            {
                
            }
        }
}

function createPlatforms(x,y,length)
{
    var p =
        {
            x: x,
            y: y,
            length: length,
            draw: function() 
            {
                fill(211,211,211);
                rect(this.x, this.y, this.length, 20);
                
        },
            checkContact: function(gc_x, gc_y)
            {
            if(gc_x > this.x && gc_x < this.x + this.length)
            {
                var d = this.y - gc_y;
                if(d >= 0 && d < 5)
                    {
                        return true;
                    }
        }
                return false;
        }
        }
    return p;
}

function Enemy(x, y, range)
{
    this.x = x;
    this.y = y;
    this.range = range;
    
    this.currentX = x;
    this.inc = 1;
    
    this.update = function()
    {
        this.currentX += this.inc;
        
        if(this.currentX >= this.x + this.range)
            {
                this.inc = -1;
            }
        else if(this.currentX < this.x)
            {
                this.inc = 1;
            }
    }
    
    this.draw = function()
    {
        this.update();
        fill(246, 220, 289);
        ellipse(this.currentX + 200, this.y, 20, 20);
        ellipse(this.currentX + 205, this.y - 10, 8, 8);
        ellipse(this.currentX + 195, this.y - 10, 8, 8);
        fill(0);
        ellipse(this.currentX + 205, this.y - 15, 4, 4);
        ellipse(this.currentX + 195, this.y - 15, 4, 4);
        fill(255,0,0)
        ellipse(this.currentX + 200, this.y - 2, 5, 5);
    }
    
    this.checkContact = function(gc_x, gc_y)
    {
        var d = dist(gc_x, gc_y, this.currentX, this.y)
        console.log(d);
        if(d < 200)
            {
                return true;
            }
        return false;
    }
    
}