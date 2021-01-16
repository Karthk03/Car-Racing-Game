class Game
{
    constructor()
    {

    }

    getState()
    {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value",function(data)
        {
            gameState = data.val();
        })
    }

    update(state)
    {
        database.ref('/').update({
            'gameState': state
        });
    }

    start()
    {
        if(gameState == 0)
        {
            player = new Player();
            player.getCount();

            form = new Form();
            form.display();

            car1 = createSprite(200,200,50,50);
            car1.addImage("car1",car1Img);

            car2 = createSprite(300,200,50,50);
            car2.addImage("car2",car2Img);

            car3 = createSprite(400,200,50,50);
            car3.addImage("car3",car3Img);

            car4 = createSprite(500,200,50,50);
            car4.addImage("car4",car4Img);

            cars = [car1, car2, car3, car4];

        }
    }

    play()
    {
        if(gameState == 1)
        {
            background(rgb(198,135,103));
            imageMode(CENTER);
            image(bg2,displayWidth/2,-displayHeight*2,displayWidth,displayHeight*4);

            var y;
            var x = 150;
            var index;

            Player.getPlayerInfo();
            form.hide();
            index = 0;
            for(let i in Allplayers)
            {
                index++;
                //  console.log(i);
                x += 200;
                y = displayHeight - Allplayers[i].distance-25;
                if(player.x != null && player.y != null)
                {
                    cars[index-1].x = player.x;
                    cars[index-1].y = player.y;
                }
                else if(cars[index-1] != null)
                {
                    cars[index-1].x = x;
                    cars[index-1].y = y;
                }

                if(index == player.index && cars[index-1] != null)
                {
                    // cars[index-1].shapeColor = "red";
                    camera.position.x = displayWidth/2
                    camera.position.y = cars[index-1].y;

                    player.x = cars[index-1].x;
                    player.y = cars[index-1].y;
                    player.updatePosition();

                    if(keyIsDown(RIGHT_ARROW) && player.index!= null && gameState ==1)
                    {
                        cars[index-1].x += 10;
                    }

                    if(keyIsDown(LEFT_ARROW) && player.index!= null && gameState ==1)
                    {
                        cars[index-1].x -= 10;
                    }

                    ellipseMode(CENTER);
                    fill("red");
                    ellipse(cars[index-1].x,camera.position.y+20,100,100);
                }
                else
                {
                    if(cars[index-1] != null)
                    {
                        cars[index-1].shapeColor = "black";
                    }
                }
            }
            drawSprites();

            // if( Allplayers[1].distance !=  null &&
            //     Allplayers[2].distance !=  null &&
            //     Allplayers[3].distance !=  null &&
            //     Allplayers[4].distance !=  null)
            //     {
            //         x += 200;
            //         y = displayHeight - Allplayers[1].distance-25;
            //         cars[1].x = x;
            //         cars[1].y = y;

            //         x += 200;
            //         y = displayHeight - Allplayers[2].distance-25;
            //         cars[2].x = x;
            //         cars[2].y = y;

            //         x += 200;
            //         y = displayHeight - Allplayers[3].distance-25;
            //         cars[3].x = x;
            //         cars[3].y = y;

            //         x += 200;
            //         y = displayHeight - Allplayers[4].distance-25;
            //         cars[4].x = x;
            //         cars[4].y = y;

            //         x = 100;

            //         drawSprites();
            //     }
        }

        if(keyIsDown(UP_ARROW) && player.index!= null && gameState ==1)
        {
            player.distance+=100;
            console.log(player.distance)
            player.updateName();
        }
    }
}