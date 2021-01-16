var database;
var gameState = 0, playerCount = 0;
var Allplayers = [], form, game, player;
var reset;
var bg1,bg2;
var car1, car2, car3, car4, cars = [];
var car1Img,car2Img,car3Img,car4Img;
var resetCond;

function preload()
{
    bg1 = loadImage("bg1.jpg");
    bg2 = loadImage("images/track.jpg");
    car1Img = loadImage("images/car1.png");
    car2Img = loadImage("images/car2.png");
    car3Img = loadImage("images/car3.png");
    car4Img = loadImage("images/car4.png");
}

function setup()
{
    //reset  = createImg('https://www.google.com/imgres?imgurl=https%3A%2F%2Fmomanddogs.files.wordpress.com%2F2011%2F04%2Frounded_blue_refresh_button_4808.jpg&imgrefurl=https%3A%2F%2Fmomanddogs.wordpress.com%2F2011%2F04%2F19%2Frefreshreset-button-please%2F&tbnid=f4KaSPMRwvvVIM&vet=12ahUKEwjG-rnroo7uAhX4KrcAHY-7AkYQMyhBegQIARBk..i&docid=ZXMu-IwAdeizYM&w=256&h=256&q=reset%20button&safe=active&ved=2ahUKEwjG-rnroo7uAhX4KrcAHY-7AkYQMyhBegQIARBk','reloadImg');
    reset  = createButton("reset");
    reset.position(30,displayHeight-30);
    createCanvas(displayWidth,displayHeight);

    database = firebase.database();

    game = new Game();
    game.getState();
    game.start();
}

function draw()
{

    if(gameState == 0)
    {
        background(bg1)
    }

    reset.mousePressed( function()
    {

        // car1.visible = false;
        // car2.visible = false;
        // car3.visible = false;
        // car4.visible = false;

        player.distance = 0
        form.button.show();
        form.input.show();
        form.greeting.hide();

        for(let i in Allplayers)
        {
            Allplayers[i].distance = 0
            Allplayers[i].name = null
        }
        playerCount = 0;
        player.update(0);
            
        game.update(0);
        database.ref('/').update({
            'players': null
        })

        background(bg1);
    })

    if(playerCount == 4)
    {
        game.update(1);
    }
    else
    {
        game.update(0);
    }

    if(gameState == 1)
    {
        game.play();

        car1.visible = true;
        car2.visible = true;
        car3.visible = true;
        car4.visible = true;
    }

    if(player.distance >= 3660)
    {
        game.update(2);
        player.flag = true;
        player.updateName();
        fill("yellow");
        textSize(20);
        stroke("black");
        text("Player"+player.index +" won!",camera.position.x,camera.position.y);
        text("please wait for other players to finish",camera.position.x,camera.position.y+50);
    }

    // for(let i in Allplayers)
    // {
    //     console.log(Allplayers[i].flag);
    // }

    // if(Allplayers[1].flag != null &&
    //     Allplayers[2].flag != null &&
    //     Allplayers[3].flag != null &&
    //     Allplayers[4].flag != null)
    //     {
    //         console.log(Allplayers[1].flag);
    //         console.log(Allplayers[2].flag);
    //         console.log(Allplayers[3].flag);
    //         console.log(Allplayers[4].flag);
    //     }
}

function keyPressed()
{
    resetCond = 0;
    for(let i in Allplayers)
    {
        if(Allplayers[i].flag == true)
        {
            resetCond++;
        }
    }
    if(gameState == 2 && resetCond == 4)
    {
        // text("press 'r' to play again",camera.position.x,camera.position.y+100);

        // if(keyCode == 114 || keyCode == 82)
        // {
        //     background(bg1);

        //     player.distance = 0
        
        //     form.input.show();
        //     form.button.show();
        //     form.display();

        //     for(let i in Allplayers)
        //     {
        //         Allplayers[i].distance = 0
        //         Allplayers[i].name = null
        //     }
        //     playerCount = 0;
        //     player.update(0);
                
        //     game.update(0);
        //     database.ref('/').update({
        //         'players': null
        //     })

        //     car1.visible = false;
        //     car2.visible = false;
        //     car3.visible = false;
        //     car4.visible = false;
        // }
    }
}