function concatJSON(arry)
{
    var val = "";
    for (i = 0; i < this.arry.length; i++)
    {
        if(i == this.asteroids.length - 1)
            val.concat(this.arry[i].json);
        else            
            val.concat(this.arry[i].json + ",");            
    }
    return JSON.parse(val);
}