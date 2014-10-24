////////////////////////////////////////
// Weather in Chicago-- extended Prof. Johnson's code
/// Sharad Tanwar
////////////////////////////////////////


var USweatherApp = Class.extend({

construct: function() {

this.gwin = {};

this.gwin.canvasWidth = 1200;
this.gwin.canvasHeight = 800;

this.gwin.latMinTemp = 26.5;
this.gwin.latMaxTemp = 48.5;

this.gwin.lonMinTemp = -124;
this.gwin.lonMaxTemp = -67;

this.gwin.boxSize = 100;

this.gwin.appID = "";
this.gwin.myTag = "";

this.gwin.mode = 0;
this.gwin.itsF = "F"; // there is a sage version of this

this.gwin.projection = null;

this.gwin.maxX = 0;
this.gwin.maxY = 0;

this.gwin.iconmostlycloudynight = new Image();
this.gwin.iconpartlycloudynight = new Image();
this.gwin.iconclearnight        = new Image();
this.gwin.iconsnow              = new Image();
this.gwin.iconunknown           = new Image();
this.gwin.iconstorms            = new Image();
this.gwin.icontstorms           = new Image();
this.gwin.iconmostlycloudy      = new Image();
this.gwin.iconpartlycloudy      = new Image();
this.gwin.iconrain              = new Image();
this.gwin.iconfog               = new Image();
this.gwin.iconhazy              = new Image();
this.gwin.iconsleet             = new Image();
this.gwin.iconcloudy            = new Image();
this.gwin.iconclear             = new Image();
this.gwin.iconsunny             = new Image();

this.gwin.numIconsLoaded = 0;
},
///////////////////////////////////////

makeCallback: function (weatherOut,time)
{
    console.log('Inside makeCallback');   
    var iconSet;
    var weather;
    var weatherIcon;
    var weatherImage;

    var userSelectedTime = time;

    var userTime = new Date(userSelectedTime);
        console.log('userTime' + userTime);
    var userHour = userTime.getHours(); 

    console.log('gethours'+ userTime.getHours());

    for (var i = 0 ; i<weatherOut.history.observations.length;i++){

        if(weatherOut.history.observations[i].date.hour== userTime.getHours()){
            console.log('inside usertime');
            weather = weatherOut.history.observations[i].tempi;
            console.log('weather' + weather);
            iconSet = weatherOut.history.observations[i].icon;
            console.log('iconSet'  + iconSet)

        }
    }

    weatherIcon = iconSet;
    var weatherName = weatherIcon;

    if (weatherName === "")
            weatherName = "unknown";

    weatherImage = this.getCorrectWeatherIcon(weatherName, 0); //day
    console.log('+sdsa'  + weatherImage);

    var times = SunCalc.getTimes(userTime, 41.8739580629, -87.6277394859);
    console.log(times);

    var sunrise = times.sunrise.getHours() + times.sunrise.getMinutes()/60;
    console.log(sunrise);

    var sunset = times.sunset.getHours() + times.sunset.getMinutes()/60;
    console.log(sunset);

    if (sunset < 12)
        sunset += 24;
    console.log('userTime'  + userTime);
    // if its night then swap out the sun icons for the moon icons
    if ( (userHour < sunrise) || (userHour > sunset) )
        {
        if ((weatherName == "mostlycloudy") || (weatherName == "partlycloudy") ||
            (weatherName == "clear"))
            {
            weatherImage = this.getCorrectWeatherIcon(weatherName, 1); 
            }
        }
        console.log('img asdfbkasdf' + weatherImage);
    // I am still seeing some temp is null printouts on the console

    var self = this;

   // weatherImage.onload = function(){
    console.log('number' + this.gwin.numIconsLoaded );
    self.drawEverything(weather, weatherImage.src);
    /*if (this.gwin.numIconsLoaded === 16)
        {
        //console.log("temp is " + weather + " at " + Math.round(lat) + ", " + Math.round(lon));

        self.drawEverything(weather, weatherImage.src);
        }
    */
},

///////////////////////////////////////

updateOutsideTemp: function ()
{ 
    //Getting the temperature 
    console.log('inside updateOutsideTemp');
    var lat, lon;
 
    var self = this;
    var replace = 0;

    var userSelectedTime = document.getElementById("TimeControl").value;
    console.log('userSelectedTime' + userSelectedTime);

    var timeSS = new Date(userSelectedTime);

    var parseDate = timeSS.getFullYear() + '_' + ((timeSS.getMonth()).length ==2 ? timeSS.getMonth() : '0' + timeSS.getMonth())+ '_'+ timeSS.getDate();

    console.log('parseDate' + parseDate);

    // Concatenating the date and picking up the data files.
    var jsonFile = './App/json/weather/'+ parseDate+'__output.json';

    // Calling the Json and temp Function
    d3.json(jsonFile, 
        function(err, json)
            {
            if(err)
                {
                console.log("NO DATA");
                return;
                }
          // self.makeCallbackFunc(lat, lon, response, arrayX, arrayY);
           self.makeCallback(json,userSelectedTime);
            });

},

////////////////////////////////////////

drawEverything: function (weather, iconSrc)
{
    console.log('inside drawEverything');
    console.log( iconSrc);
   // var img = iconSrc.toString;

    var weatherlegend = L.control({position: 'bottomright'});

            weatherlegend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'map image');

            div.innerHTML = '<img src="' + iconSrc + '"/>' + weather;
            return div;
    };

    weatherlegend.addTo(map);
},
getCorrectWeatherIcon: function(weatherCondition, night)
{
    console.log('getCorrectWeatherIcon');
    if (night === 1)
        {   
            switch(weatherCondition) {
                case "mostlycloudy": return(this.gwin.iconmostlycloudynight);
                case "partlycloudy": return(this.gwin.iconpartlycloudynight);
                case "clear": return(this.gwin.iconclearnight);
            }
        }
    else // night === 0
        {
            switch(weatherCondition) {
                case "snow": return(this.gwin.iconsnow);
                case "unknown": return(this.gwin.iconunknown);
                case "storms": return(this.gwin.iconstorms);
                case "tstorms": return(this.gwin.icontstorms);
                case "mostlycloudy": return(this.gwin.iconmostlycloudy);
                case "partlycloudy": return(this.gwin.iconpartlycloudy);

                case "rain": return(this.gwin.iconrain);
                case "fog": return(this.gwin.iconfog);
                case "hazy": return(this.gwin.iconhazy);
                case "sleet": return(this.gwin.iconsleet);
                case "cloudy": return(this.gwin.iconcloudy);
                case "clear": return(this.gwin.iconclear);
                case "sunny": return(this.gwin.iconsunny);
            }
        }
},

// load in all of the weather icons at startup time
loadInIcons: function()
{
    console.log('loadInIcons');
    var path = "./App/json/weather/icons/";
    var self = this;

    this.gwin.iconmostlycloudynight.src     = path+"mostlycloudy-night.jpg";
    this.gwin.iconmostlycloudynight.onload  = function(){self.gwin.numIconsLoaded++};
    this.gwin.iconpartlycloudynight.src     = path+"partlycloudy-night.jpg";
    this.gwin.iconpartlycloudynight.onload  = function(){self.gwin.numIconsLoaded++};
    this.gwin.iconclearnight.src            = path+"clear-night.jpg";
    this.gwin.iconclearnight.onload         = function(){self.gwin.numIconsLoaded++};


    this.gwin.iconsnow.src          = path+"snow.jpg";
    this.gwin.iconsnow.onload       = function(){self.gwin.numIconsLoaded++};
    this.gwin.iconunknown.src       = path+"unknown.jpg";
    this.gwin.iconunknown.onload    = function(){self.gwin.numIconsLoaded++};
    this.gwin.iconstorms.src        = path+"storms.jpg";
    this.gwin.iconstorms.onload     = function(){self.gwin.numIconsLoaded++};
    this.gwin.icontstorms.src       = path+"tstorms.jpg";
    this.gwin.icontstorms.onload    = function(){self.gwin.numIconsLoaded++};
    this.gwin.iconmostlycloudy.src  = path+"mostlycloudy.jpg";
    this.gwin.iconmostlycloudy.onload = function(){self.gwin.numIconsLoaded++};
    this.gwin.iconpartlycloudy.src  = path+"partlycloudy.jpg";
    this.gwin.iconpartlycloudy.onload = function(){self.gwin.numIconsLoaded++};
    this.gwin.iconrain.src          = path+"rain.jpg";
    this.gwin.iconrain.onload       = function(){self.gwin.numIconsLoaded++};
    this.gwin.iconfog.src           = path+"fog.jpg";
    this.gwin.iconfog.onload        = function(){self.gwin.numIconsLoaded++};
    this.gwin.iconhazy.src          = path+"hazy.jpg";
    this.gwin.iconhazy.onload       = function(){self.gwin.numIconsLoaded++};
    this.gwin.iconsleet.src         = path+"sleet.jpg";
    this.gwin.iconsleet.onload      = function(){self.gwin.numIconsLoaded++};
    this.gwin.iconcloudy.src        = path+"cloudy.jpg";
    this.gwin.iconcloudy.onload     = function(){self.gwin.numIconsLoaded++};
    this.gwin.iconclear.src         = path+"clear.jpg";
    this.gwin.iconclear.onload      = function(){self.gwin.numIconsLoaded++};
    this.gwin.iconsunny.src         = path+"sunny.jpg";
    this.gwin.iconsunny.onload      = function(){self.gwin.numIconsLoaded++};
},
////////////////////////////////////////

init: function (newMode,whereToRender){

    this.makeCallbackFunc = this.makeCallback.bind(this);
    //this.jsonCallbackFunc = this.jsonCallback.bind(this);

    this.gwin.mode = newMode;

    this.gwin.appID = "A"+this.myTag; // search string cant start with #
 
    this.loadInIcons();
},

});
