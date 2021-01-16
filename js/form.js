class Form
{
    constructor()
    {
        this.input = createInput('Name');

        this.button = createButton("play");

        this.title = createElement('h2','Car Racing Game');

        this.greeting = createElement('h3')
    }

    hide()
    {
        this.button.hide();
        this.input.hide();
        this.greeting.hide();
        //this.title.hide();
    }

    display()
    {
        this.title.position(displayWidth/2,displayHeight-500);

        this.input.position(displayWidth/2,displayHeight-400);

        this.button.position((displayWidth/2)+150,displayHeight-400);

        this.button.mousePressed(() =>
        {
            this.button.hide();
            this.input.hide();
            
            player.name = this.input.value();
            playerCount++;
            player.index = playerCount;

            console.log(playerCount);
            player.update(playerCount);
            player.updateName();

            this.greeting.html('Welcome ' + player.name);
            this.greeting.position(displayWidth/2-100,displayHeight-300);

            this.greeting.show();
        })
    }
}