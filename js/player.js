class Player
{
    constructor()
    {
        this.name = null;
        this.distance  = 0;
        this.index = null;
        this.flag = false;
        this.x;
        this.y;
    }

    getCount()
    {
        database.ref('playerCount').on("value",function(data){
            playerCount = data.val();
        })
    }

    update(count)
    {
        database.ref('/').update({
            'playerCount': count
        })
    }

    updateName()
    {
        database.ref("players/player"+this.index).update({
            'name': this.name,
            'distance': this.distance,
            'flag': this.flag
        })
    }

    updatePosition()
    {
        database.ref("players/player"+this.index).update({
            'x': this.x,
            'y': this.y
        })
    }

    static getPlayerInfo()
    {
        database.ref("players").on("value", function(data){
            Allplayers = data.val();
        })
    }
}