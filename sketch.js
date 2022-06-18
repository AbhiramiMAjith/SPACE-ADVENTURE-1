var bg, bgImg
var space, spaceImg
var story, storyImg
var instructions, instrucImg

var startBtn, instrucBtn
var leftAndRight, spaceBar
var leftAndRightImg, spaceBarImg

var player, playerImg
var shoot, shootAnime, shootGroup

var asteroids, asteroidsImg, astGroup
var planet1Img, planet1Grp
var planet2Img, planet2Grp

var coinAnime, coinGrp
var powerupImg, powerupGrp
var bubble, bubbleImg, bubbleGrp

var ufo, ufoGrp, ufoImage
var fire, fireGrp, ufoShootAnime

var gamestate = 0
var score = 0
var life = 3
var heart, heartImg
var isPowerUp = false

function preload()
{
    bgImg = loadImage ("./assets/image/background.jpg")
    spaceImg = loadImage ("./assets/image/space_adv.png")
    playerImg = loadAnimation (
        "./assets/animations/rocket.png",
        "./assets/animations/rocket2.png",
        "./assets/animations/rocket3.png",
        "./assets/animations/rocket4.png"
        )
    shootAnime = loadAnimation (
        "./assets/animations/shoot1.png",
        "./assets/animations/shoot2.png",
        "./assets/animations/shoot3.png",
        "./assets/animations/shoot4.png"
        )
    asteroidsImg = loadImage ("./assets/image/asteroid.png")
    planet1Img = loadImage ("./assets/image/planet1.png")
    planet2Img = loadImage ("./assets/image/planet2.png")
    coinAnime = loadAnimation (
        "./assets/animations/coin_1.png",
        "./assets/animations/coin_2.png",
        "./assets/animations/coin_3.png",
        "./assets/animations/coin_4.png"
    )
    powerupImg = loadImage ("./assets/image/powerup.png")
    ufoImage = loadImage ("./assets/image/ufo.png")
    ufoShootAnime = loadAnimation (
        "./assets/animations/ufo_shoot1.png",
        "./assets/animations/ufo_shoot2.png",
        "./assets/animations/ufo_shoot3.png",
        "./assets/animations/ufo_shoot4.png"
    )
    storyImg = loadImage ("./assets/image/story.png")
    instrucImg = loadImage ("./assets/image/instrucImg.png")
    leftAndRightImg = loadImage ("./assets/image/left_and_right.png")
    spaceBarImg = loadImage ("./assets/image/space.png")
    heartImg = loadImage ("./assets/image/heart.png")
}

function setup ()
{
    createCanvas (windowWidth, windowHeight)

    bg = createSprite (width/2, height - 1600)
    bg.addImage (bgImg)
    bg.scale = 1.7

    player = createSprite (width/2, height - 150)
    player.addAnimation ("playerMoving", playerImg)
    player.scale = 1.3
    player.visible = false
    //player.debug = true
    player.setCollider ("rectangle", 0, 0, 125, player.height - 125)

    space = createSprite (width/2, 150)
    space.addImage (spaceImg)
    space.scale = 1.2

    story = createSprite (380, 230)
    story.addImage (storyImg)
    story.scale = 0.5

    startBtn = createImg ("./assets/image/start_btn.png")
    startBtn.position(width/2 - 400, 700)
    startBtn.size (200, 100)
    startBtn.mouseClicked (start)

    instrucBtn = createImg ("./assets/image/instructions.png")
    instrucBtn.position (width/2 + 50, 700)
    instrucBtn.size (350, 100)
    instrucBtn.mouseClicked (instruc)

    instructions = createSprite (width/2, 100)
    instructions.addImage (instrucImg)
    instructions.scale = 0.7
    instructions.visible = false

    leftAndRight = createSprite (80, 230)
    leftAndRight.addImage (leftAndRightImg)
    leftAndRight.scale = 0.3
    leftAndRight.visible = false

    shootGroup = new Group ()
    astGroup = new Group ()
    planet1Grp = new Group ()
    planet2Grp = new Group ()
    coinGrp = new Group ()
    powerupGrp = new Group ()
    ufoGrp = new Group ()
    fireGrp = new Group ()
}

function draw()
{
    background (0)
    drawSprites ()
    //console.log (score)

    if (gamestate == 0)
    {
        space.visible = true

        fill ('white')
        textSize (30)
        text (
            "THE SPACESHIP IN WHICH YOU ARE TRAVELLING HAS SOME GLITCH! \n \nYOU HAVE LANDED FAR AWAY FROM WHERE YOU WERE SUPPOSED TO GO! \n \nNOW YOU MUST GET PAST ALL THE OBSTACLES AHEAD OF YOU TO GET BACK HOME!! \n \nYOU ALSO HAVE TO DESTROY THE ENEMIES ( UFO’S) IN YOUR WAY.. \n \nAND DON’T FORGET TO LISTEN TO THE CAPTAIN’S FEEDBACKS!",
            300 ,
            350
            )
    }
    else if (gamestate == 1)
    {
        space.visible = false
        story.visible = false
        instructions.visible = true
        leftAndRight.visible = true
        instrucBtn.remove ()

        startBtn.position (width/2 + 400, 700)

        fill ("white")
        textSize (25)
        text ("USE THE LEFT AND RIGHT ARROW KEYS TO MOVE TOWARDS \nLEFT AND RIGHT RESPECTIVELY! \n \nUSE SPACE TO SHOOT! \n \nSHOOT THE UFO's OR COLLECT 5 COINS EACH TO GET \nEXTRA LIFES !! \n \nYOU WILL FIND SPEED POWERUPS ON YOUR WAY! \n \nTHE CAPTAIN WILL GIVE YOU FEEDBACKS SO THAT YOU \nCAN KNOW HOW YOU ARE PERFOMING!! \n \nMAKE THE CAPTAIN AS HAPPY AS POSSIBLE!! ", 150, 230)
        text ("LIFE WILL GET REDUCED IF YOU HIT THE OBSTACLES! \n \nYOU LOSE IF THE UFO SHOOTS YOU! \n \nYOU WIN IF YOU REACH BACK HOME!!", 150, 700)
    }
    else if (gamestate == 2)
    {

        fill ("white")
        rect (width - 260, 60, 200, 20)
        textSize (20)
        text ("SCORE", width - 200, 40)
        fill ("yellow")
        rect (width - 260, 60, score, 20)
        noStroke ()

        if (score == 200 && life < 3)
        {
            life += 1
            score = 0
        }

        for (var i = 1; i <= life; i ++)
        {
            heart = createSprite (width - i*80, 130)
            heart.addImage (heartImg)
            heart.scale = 0.8
            //console.log (i)
        }

        if (isPowerUp == false)
        {
            bg.velocityY = 8
        }

        player.visible = true
        space.visible = false
        story.visible = false
        leftAndRight.visible = false
        instructions.visible = false

        startBtn.remove ()
        instrucBtn.remove ()

        playerControls ()
        //console.log (bg.y)

        addSprites (astGroup, 0.2, asteroidsImg, random (5, 9), 190, false)
        addSprites (planet1Grp, 0.3, planet1Img, random (5, 9), 130, false)
        addSprites (planet2Grp, 0.4, planet2Img, random (5, 9), 170, false)
        addSprites (coinGrp, 0.5, coinAnime, random (5, 9),150, true)
        addSprites (powerupGrp, 1, powerupImg, random (5, 9), 350, false)
        createUFO ()

        //console.log (life)
        if (isPowerUp == false)
        {
            collideSprite (astGroup, true)
            collideSprite (planet1Grp, true)
            collideSprite (planet2Grp, true)
            collideSprite (coinGrp, false)

            if (shootGroup.isTouching (ufoGrp))
            {
                shootGroup.destroyEach ()
                ufoGrp.destroyEach ()
                gamestate = 3
            }
            if (player.isTouching (fireGrp))
            {
                fireGrp.destroyEach ()
                ufoGrp.destroyEach ()
                gamestate = 4
            }
            if (player.isTouching (powerupGrp))
            {
                powerupGrp.destroyEach ()

                bg.velocityY = 25
                astGroup.setVelocityYEach (random (22, 26))
                planet1Grp.setVelocityYEach (random (22, 26))
                planet2Grp.setVelocityYEach (random (22, 26))
                coinGrp.setVelocityYEach (random (22, 26))
                powerupGrp.setVelocityYEach (random (22, 26))
                ufoGrp.setVelocityYEach (random (22, 26))
                fireGrp.setVelocityYEach (random (22, 26))
                coinGrp.setVelocityYEach (random (22, 26))
                powerupGrp.setVelocityYEach (random (22, 26))

                isPowerUp = true
                setTimeout(() => 
                {
                    isPowerUp = false
                }, 3000);
            }
            
        }
    }
    else if (gamestate == 3)
    {
        destroy (astGroup)
        destroy (planet1Grp)
        destroy (planet2Grp)
        destroy (coinGrp)
        destroy (powerupGrp)
        destroy (fireGrp)
        destroy (ufoGrp)
        player.destroy ()

        bg.velocityY = 0
    }
    else
    {
        destroy (astGroup)
        destroy (planet1Grp)
        destroy (planet2Grp)
        destroy (coinGrp)
        destroy (powerupGrp)
        destroy (fireGrp)
        destroy (ufoGrp)
        player.destroy ()

        bg.velocityY = 0
    }

    if (bg.y > height + 800)
    {
        bg.y = height - 1600
    }
}

function playerControls ()
{
    if (isPowerUp == false)
    {
        if (keyIsDown (LEFT_ARROW) && player.x > 74)
        {
            player.x -= 10
        }

        if (keyIsDown (RIGHT_ARROW) && player.x < width-74)
        {
            player.x += 10
        }

        if (keyWentUp ("space"))
        {
            shootFire ()
        }
    }
}

function shootFire ()
{
    shoot = createSprite (player.x, player.y )
    shoot.addAnimation ("shooting", shootAnime)
    shoot.scale = 0.5
    shoot.velocityY = -10
    shootGroup.add (shoot)
}

function addSprites (group, scale, img, vel, count, anime)
{
    if (frameCount % count == 0)
    {
        sprite = createSprite (random (100, width - 100), -50)
        if (anime)
        {
            sprite.addAnimation ("sprites",img)
        }
        else
        {
            sprite.addImage (img)
        }
        sprite.scale = scale
        sprite.velocityY = vel
        group.add (sprite)
    }
}

function createUFO ()
{
    if (frameCount % 400 == 0)
    {
        ufo = createSprite (width/2, -100)
        ufo.addImage (ufoImage)
        ufo.scale = 0.5
        ufo.velocityY = random (5, 7)
        //ufo.debug = true
        ufo.setCollider ("rectangle", 0, 0, 400, 200)
        ufoGrp.add (ufo)

        velocity = 5
        for (i = 0; i < 3; i ++)
        {
            fire = createSprite (ufo.x, ufo.y)
            fire.addAnimation ("ufoShooting", ufoShootAnime)
            fire.scale = 1
            fire.setVelocity (velocity, 12)
            velocity -= 5
            //fire.debug = true
            fire.setCollider ("rectangle", 0, 0, 80, 80)
            fireGrp.add (fire)
        }
    }
}

function start ()
{
    gamestate = 2
}
function instruc ()
{
    gamestate = 1
}

function collideSprite (group, obstacle)
{
    if (player.isTouching (group))
    {
        group.destroyEach ()
        if (obstacle)
        {
            life -= 1
        }
        else
        {
            score += 40
        }
    }
}

function destroy (group)
{
    group.destroyEach ()
}