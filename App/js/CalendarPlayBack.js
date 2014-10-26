////////////////////////////////////////
// Weather in Chicago-- extended Prof. Johnson's code
// by Sharad Tanwar for Project 6 : Bicycle Race 
////////////////////////////////////////
var map = null;
var Grayscale = null;
var Aerial = null;
var map3 = null;
var map3Counter = 1;
var map4Counter = 2;
var polyline;

var svg = null;

function setMap(whichMap) {
    //divvyBikeLayer();
    if (whichMap == 1) {
        function clear_polyline() {
            d3.selectAll("path").remove();
            d3.selectAll("circle").remove();
            d3.selectAll("text").remove();
            // console.log('inside polyline');
            //$("div").removeClass("leaflet-clickable");
        }

        clear_polyline();
        drawInflowOutFlow();

    }
    if (whichMap == 2) {
        // Removing the Community Layer
        d3.selectAll("path").remove();
        // removing divs
        $("div").remove(".leaflet-top leaflet-right");
        $("div").remove(".leaflet-top leaflet-right");
        $("div").remove(".info.leaflet-control");

        map.removeLayer(map3);
        // Adding Stations
        divvyBikeLayer();

    }
    else if (whichMap == 3) {

        function clear_polyline() {
            d3.selectAll("path").remove();
            d3.selectAll("circle").remove();
            d3.selectAll("text").remove();
            $("div").remove(".map.image.leaflet-control");
        }

        // Clearing pages
        clear_polyline();

        //Calling the Line Layer Function
        divvyCalendarLineLayer();

        // Calling the Trips Toggle
        drawTrips();

        // Calling up the temperature function
        usWeatherApp.updateOutsideTemp();

        // Calling up on
        drawTrips();

    }
}
function drawInflowOutFlow() {

    var csvFile = "./App/json/Map/Trips_data/trips_data.csv";

    var dropSelect = document.getElementById("Stations");

    // Get Value of the drop down list
    var xdropSelect = dropSelect.options[dropSelect.selectedIndex].text;

    console.log("xdropSelect" + xdropSelect);

    var time;
    var filteredtime;
    d3.csv(csvFile, function (unFilterData) {

        console.log('Inside csv file');
        // Filtering data for a particular time
        var data = unFilterData.filter(function (d, i) {

            if (d.from_station_name == xdropSelect || d.to_station_name == xdropSelect) {
                return d;
            }


        });
        var selected = [];
        var firstSelected = [];

        var e1 = document.getElementById("Chicago_Data");
        var e2 = e1.options[e1.selectedIndex].text;
        if (e2 == "Communities") {
            $("#leftValues2").each(function () {
                selected = $(this).val();
            })
        }
        else {
            $("#leftValues1").each(function () {
                selected = $(this).val();
            })
        }


        // console.log(selected[0][1]);

        var fromHash = {},
            toData = {},
            to_station_name,
            value = [];

        var j = 1;

        console.log('inside else for stations');

        for (var j = 0; j < data.length; j++) {
            //console.log('from_station_name');
            //console.log('conss ' + fromHash[selected[j]]);
            if (data[j]['from_station_name'] == xdropSelect) {
                //console.log('from_station_name');
                polyline = L.polyline([
                    [
                        //+data[parseInt(fromHash[name][i][1])]['from_station_latt'],
                        +data[j]['from_station_latt'],
                        //+data[parseInt(fromHash[name][i][1])]['from_station_long']
                        +data[j]['from_station_long']
                    ],
                    [
                        //+data[parseInt(fromHash[name][i][1])]['to_station_latt'],
                        +data[j]['to_station_latt'],
                        //+data[parseInt(fromHash[name][i][1])]['to_station_long']
                        +data[j]['to_station_long']
                    ]
                ], {
                    color: 'red',
                    weight: 2,
                    opacity: .7,
                    // dashArray: '20,15',
                    lineJoin: 'round'
                }).addTo(map);

            }
            else if (data[j]['to_station_name'] == xdropSelect) {
                //console.log('from_station_name');
                polyline = L.polyline([
                    [
                        //+data[parseInt(fromHash[name][i][1])]['from_station_latt'],
                        +data[j]['from_station_latt'],
                        //+data[parseInt(fromHash[name][i][1])]['from_station_long']
                        +data[j]['from_station_long']
                    ],
                    [
                        //+data[parseInt(fromHash[name][i][1])]['to_station_latt'],
                        +data[j]['to_station_latt'],
                        //+data[parseInt(fromHash[name][i][1])]['to_station_long']
                        +data[j]['to_station_long']
                    ]
                ], {
                    color: 'orange',
                    weight: 2,
                    opacity: .7,
                    // dashArray: '20,15',
                    lineJoin: 'round'
                }).addTo(map);

            }
        }

    });
}
function drawTrips(DateStringThing) {
    var TimePickerValue = DateStringThing;
        //document.getElementById("TimeControl").value;
    //= '07/12/2013 18:00';
    var DayToRun = TimePickerValue.substring(0, TimePickerValue.length - 6);
    //TimePickerValue = new Date(TimePickerValue);

    console.log('DayToRun' + DayToRun);
    var AtTimeRun = new Date(TimePickerValue).getHours();

    if (AtTimeRun.length < 2) {
        AtTimeRun = "0" + AtTimeRun;
    }

    console.log(AtTimeRun);
    console.log('drawTrips -->');


    var parseDate = ((DayToRun.substring(0, DayToRun.length - 8)).length = 2 ? (DayToRun.substring(0, DayToRun.length - 8))
        : '0' + (DayToRun.substring(0, DayToRun.length - 8)) )
        + '_'
        + DayToRun.substring(DayToRun.length - 7, DayToRun.length - 5)
        + '_'
        + DayToRun.substring(DayToRun.length - 4, DayToRun.length);


    var csvFile = "./App/json/Map/trips_by_day/trips_data_by_" + parseDate + ".csv";

    console.log('parseDate' + parseDate);

    var time;
    var filteredtime;
    d3.csv(csvFile, function (unFilterData) {

        console.log('Inside csv file');
        // Filtering data for a particular time
        var data = unFilterData.filter(function (d, i) {

            time = new Date(d.starttime).getHours();
            if (time.length < 2) {
                time = "0" + time;
            }
            if (AtTimeRun == time) {
                return d;
            }

        });
        var selected = [];
        var firstSelected = [];

        var e1 = document.getElementById("Chicago_Data");
        var e2 = e1.options[e1.selectedIndex].text;
        if (e2 == "Communities") {
            $("#leftValues2").each(function () {
                selected = $(this).val();
            })
        }
        else {
            $("#leftValues1").each(function () {
                selected = $(this).val();
            })
        }


        // console.log(selected[0][1]);

        var fromHash = {},
            toData = {},
            to_station_name,
            value = [];

        var j = 1;
        //console.log("before hashmap");
        console.log('dataLength : ' + data.length);
        console.log('getCommunityArea' + getCommunityArea.features.length);

        if (e2 == "Communities") {
            for (var i = 0; i < selected.length; i++) {
                for (var h = 0; h < getCommunityArea.features.length; h++) {
                    //console.log('fsad;fasd;fhas;hf;ashdf;asdhfkajs' + getCommunityArea.features[h].properties.name + 'ssellected'+ selected[i]);

                    if (getCommunityArea.features[h].properties.name === selected[i]) {
                        //console.log('X'  + getCommunityArea.features[h]);
                        L.geoJson(getCommunityArea.features[h]).addTo(map);
                    }
                    console.log('After');
                }
                for (var j = 0; j < data.length; j++) {
                    if (data[j]['from_community'] == selected[i]) {
                        //console.log('from_community');
                        polyline = L.polyline([
                            [
                                //+data[parseInt(fromHash[name][i][1])]['from_station_latt'],
                                +data[j]['from_station_latt'],
                                //+data[parseInt(fromHash[name][i][1])]['from_station_long']
                                +data[j]['from_station_long']
                            ],
                            [
                                //+data[parseInt(fromHash[name][i][1])]['to_station_latt'],
                                +data[j]['to_station_latt'],
                                //+data[parseInt(fromHash[name][i][1])]['to_station_long']
                                +data[j]['to_station_long']
                            ]
                        ], {
                            color: 'orange',
                            weight: 5,
                            opacity: .7,
                            // dashArray: '20,15',
                            lineJoin: 'round'
                        }).addTo(map);

                    }
                }
            }
        }
        else {
            console.log('inside else for stations');
            for (var i = 0; i < selected.length; i++) {

                for (var j = 0; j < data.length; j++) {
                    //console.log('from_station_name');
                    //console.log('conss ' + fromHash[selected[j]]);
                    if (data[j]['from_station_name'] == selected[i]) {
                        //console.log('from_station_name');
                        polyline = L.polyline([
                            [
                                //+data[parseInt(fromHash[name][i][1])]['from_station_latt'],
                                +data[j]['from_station_latt'],
                                //+data[parseInt(fromHash[name][i][1])]['from_station_long']
                                +data[j]['from_station_long']
                            ],
                            [
                                //+data[parseInt(fromHash[name][i][1])]['to_station_latt'],
                                +data[j]['to_station_latt'],
                                //+data[parseInt(fromHash[name][i][1])]['to_station_long']
                                +data[j]['to_station_long']
                            ]
                        ], {
                            color: 'red',
                            weight: 5,
                            opacity: .7,
                            // dashArray: '20,15',
                            lineJoin: 'round'
                        }).addTo(map);

                    }
                }
            }
        }
    });
}

function divvyCalendarLineLayer() {
    // Calling the data function
    dealWithData();

    function dealWithData() {
        d3.json("./App/json/Map/ChicagoDivvy.json", function (collection) {

            var e1 = document.getElementById("Chicago_Data");
            var e2 = e1.options[e1.selectedIndex].text;
            var selected = [];

            if (e2 == "Communities") {
                $("#leftValues2").each(function () {
                    selected = $(this).val();
                })
            }
            else {
                $("#leftValues1").each(function () {
                    selected = $(this).val();
                })

            }
            console.log('selected length' + selected[0]);
            collection.stationBeanList.forEach(function (d) {
                if (d.latitude && d.longitude) {
                    if (isNaN(d.latitude))
                        console.log("latitude is not a number");
                    if (isNaN(d.longitude))
                        console.log("longitude is not a number");

                    d.LatLng = new L.LatLng(+d.latitude, +d.longitude);
                    d.color = "green";
                }
                else {
                    d.LatLng = new L.LatLng(0, 0);
                }
            });

            var selection;

            var feature = g.selectAll("circle")
                    .data(collection.stationBeanList)
                    .enter()
                    .append("svg:circle")
                    .style("stroke", "white")
                    .style("stroke-width", "1")
                    .style("opacity", 1.0)
                    .style("fill", function (d) {

                        var colorValue;
                        var bluecolor = "blue";
                        var greencolor = "green";
                        //console.log('colorValue'  + colorValue);
                        if (e2 == "Communities") {
                            for (var i = 0; i <= selected.length; i++) {
                                for (var h = 0; h < Station_Community.length; h++) {
                                    for (var k = 0; k < Station_Community[h].Stations.length; k++) {
                                        if (selected[i] == Station_Community[h].Community && Station_Community[h].Stations[k] == d.stationName) {
                                            colorValue = bluecolor;
                                        }
                                    }
                                }
                            }

                            if (colorValue) {
                                return bluecolor;
                            }
                            else {
                                return greencolor;
                            }
                        }
                        else if (e2 == "Stations") {
                            for (var i = 0; i <= selected.length; i++) {
                                if (selected[i] === d.stationName) {
                                    console.log('INSIDE STATIONS');
                                    colorValue = bluecolor;
                                }
                            }
                            if (colorValue) {
                                return colorValue;
                            }
                            else {
                                return greencolor;
                            }
                        }

                    })
                    .attr("r", 10)
                ;

            var feature2 = g.selectAll("text")
                .data(collection.stationBeanList)
                .enter()
                .append("svg:text")
                .style("fill", "white")
                .style("stroke", function (d) {
                    // console.log( "station "+ d.stationName + "selected stations"  + selected[i]);
                    return d.color;
                })
                .style("stroke-width", "1")
                .style("font-size", "30px")
                .style("font-family", "Arial")
                .style("text-anchor", "start")
                .style("font-weight", "bold")
                .text(function (d) {
                    for (var i = 0; i < selected.length; i++) {
                        if (selected[i] === d.stationName) {
                            if (e2 == "Communities") {
                                if (selected[i] == d.from_community_name) {
                                    return d.stationName;
                                }
                            }
                            else if (e2 == "Stations") {
                                return d.stationName;
                            }
                        }
                    }

                });
            ;

            map.on("viewreset", update);
            update();

            function update() {
                feature.attr("transform",
                    function (d) {
                        return "translate(" +
                            map.latLngToLayerPoint(d.LatLng).x + "," +
                            map.latLngToLayerPoint(d.LatLng).y + ")";
                    }
                );

                feature2.attr("transform",
                    function (d) {
                        return "translate(" +
                            (map.latLngToLayerPoint(d.LatLng).x + 20.0) + "," +
                            (map.latLngToLayerPoint(d.LatLng).y + 5.0) + ")";
                    }
                );


            }
        });
    }
}
function divvyBikeLayer() {
    map.addLayer(map3);
    function getPopularityColor(d) {
        console.log("feature.properties.popularity" + d);

        d = parseInt(d);

        return  d > 300 ? '#5402f6' :
            d > 250 ? '#9171d0' :
                d > 200 ? '#f20cf4' :
                    d > 150 ? '#0ccbf4' :
                        d > 100 ? '#FD8D3C' :
                            d > 50 ? '#FEB24C' :
                                d > 11 ? '#54f602' :
                                    d == 0 ? '#dcf602' :
                                        '#dcf602';
    }

    var greenMarkerOptions = {
        radius: 10,
        fillColor: "green",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };


    L.geoJson(MapGeoJson, {
        pointToLayer: function (feature, latlng) {

            var content = "<table border=1><tr><th colspan=2 bgcolor=#99CCFF font-size><b>" + feature.properties.station_name + "</th></tr><tr><th colspan=2><img src='DivvyLogo.jpg' height=80 width=200></th></tr><tr><td>Popularity Rank" + "</td><td>" + feature.properties.popularity + "</td></tr><tr><td> Community Name </td><td>" + feature.properties.community + "</td></tr><tr><td>Overall Inflow</td><td>" + feature.properties.inflow + "</td></tr><tr><td>Overall Outflow</td><td>" + feature.properties.outflow + "</td></tr></table>";
            var popup = L.popup().setContent(content);

            var greenMarkerOptions = {
                radius: 10,
                fillColor: getPopularityColor(feature.properties.popularity),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };


            var marker = L.circleMarker(latlng, greenMarkerOptions);
            marker.bindPopup(popup);
            return marker;

        }
    }).addTo(map);
}

var mapURL2 = 'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png';
var mapCopyright2 = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

var mapURL3 = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
var mapCopyright3 = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';


var mapURL1 = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
var mapCopyright1 = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

var Aerial = L.tileLayer(mapURL1, {attribution: mapCopyright1}),
    Grayscale = L.tileLayer(mapURL2, {attribution: mapCopyright2}),
    map3 = L.tileLayer(mapURL3, {attribution: mapCopyright3});

var baseLayers = {
    "Aerial": Aerial,
    "Grayscale": Grayscale

};

var Communities = new L.LayerGroup();
var Popularity = new L.LayerGroup();

var map = L.map('map', {
    center: [41.869910, -87.65],
    zoom: 13,
    layers: [Grayscale, Aerial]
});


// control that shows community info on hover
var info = L.control({position: 'bottomleft'});

// Updating the community div
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

// Showing the Community Name
info.update = function (props) {

    this._div.innerHTML = '<h4>Community Name</h4>' + (props ?
        '<b>' + props.name + '</b>' + '<br>' + '<b>No. of Divvy Stations: '
            + props.divvy_station + '</b>'
        : 'Hover over a community');

};

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#555',
        dashArray: '',
        fillOpacity: 0.7
    });

    info.update(layer.feature.properties);
}

function getColor(d) {
    console.log("feature.properties.divvy_station" + d);
    return  d > 35 ? '#800026' :
        d > 30 ? '#BD0026' :
            d > 25 ? '#E31A1C' :
                d > 20 ? '#FC4E2A' :
                    d > 15 ? '#FD8D3C' :
                        d > 10 ? '#FEB24C' :
                            d > 0 ? '#f2bb10' :
                                d == 0 ? '#eeeee6' :
                                    '#eeeee6';
}

function mapStyle(feature) {
    return {
        fillColor: getColor(feature.properties.divvy_station),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

var geojson = L.geoJson(worldMap, {
    style: mapStyle,
    onEachFeature: onEachFeature
}).addTo(Communities);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        legendgrades = [0, 1, 10, 15, 20, 25, 30, 35],
        labels = [], from, to;
    labels.push('<i>No_Of_Stations</i>');
    for (var i = legendgrades.length - 1; i > 0; i--) {
        from = legendgrades[i];
        to = legendgrades[i + 1];

        if (from != 0) {
            labels.push(
                '<i style="background:' + getColor(from + 1) + '"></i>' +
                    (from + 1) + (to ? '&ndash;' + to : '+'));
        }
        else {
            labels.push(
                '<i style="background:' + getColor(from + 1) + '"></i>' +
                    (from) + (to ? '&ndash;' + to : '+'));
        }

    }

    div.innerHTML = labels.join('<br>');
    return div;
};

function getPopularityColor(d) {
    console.log("feature.properties.popularity" + d);

    d = parseInt(d);

    return  d >= 300 ? '#330000' :
        d >= 250 ? '#006600' :
            d >= 200 ? '#009933' :
                d >= 150 ? '#669900' :
                    d >= 100 ? '#CCCC00' :
                        d >= 50 ? '#7A0000' :
                            d >= 10 ? '#CC0066' :
                                d >= 0 ? '#FF0000' :
                                    '#FF0000';
}

var popularityGeoJson =
    L.geoJson(MapGeoJson, {
        pointToLayer: function (feature, latlng) {

            var content = "<table border=1><tr><th colspan=2 bgcolor=#99CCFF font-size><b>" + feature.properties.station_name + "</th></tr><tr><th colspan=2><img src='DivvyLogo.jpg' height=80 width=200></th></tr><tr><td>Popularity Rank" + "</td><td>" + feature.properties.popularity + "</td></tr><tr><td> Community Name </td><td>" + feature.properties.community + "</td></tr><tr><td>Overall Inflow</td><td>" + feature.properties.inflow + "</td></tr><tr><td>Overall Outflow</td><td>" + feature.properties.outflow + "</td></tr></table>";
            var popup = L.popup().setContent(content);

            var greenMarkerOptions = {
                radius: 10,
                fillColor: getPopularityColor(feature.properties.popularity),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };


            var marker = L.circleMarker(latlng, greenMarkerOptions);
            marker.bindPopup(popup);
            return marker;

        }
    }).addTo(Popularity);

var legend2 = L.control({position: 'bottomright'});

legend2.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        legendgrades = [0, 10, 50, 100, 150, 200, 250, 300],
        labels = [], from, to;
    labels.push('<i>Popularity_Rank</i>');
    for (var i = 0; i < legendgrades.length; i++) {
        from = legendgrades[i];
        to = legendgrades[i + 1];
        if (from != 0) {
            labels.push(
                '<i style="background:' + getPopularityColor(from) + '"></i>' +
                    (from + 1) + (to ? '&ndash;' + to : '+'));
        }
        else {
            labels.push(
                '<i style="background:' + getPopularityColor(from + 1) + '"></i>' +
                    (from) + (to ? '&ndash;' + to : '+'));
        }

    }

    div.innerHTML = labels.join('<br>');
    return div;
};

var overlayMaps = {
    "Communities": Communities,
    "Popularity": Popularity
};

map._initPathRoot();

L.control.layers(baseLayers, overlayMaps).addTo(map);

var LayerCounter = 1;
var LayerCounter2 = 1;
// Add and remove layers
map.on('overlayadd overlayremove', function (d) {
    // Switch to the Permafrost legend...


    console.log(d.name);
    if (d.name === 'Communities') {
        LayerCounter = LayerCounter + 1;
        if (LayerCounter % 2 == 0) {
            legend.addTo(this);
            info.addTo(this);
        }
        else {
            legend2.addTo(this);
            this.removeControl(legend2);
            this.removeControl(info);
            this.removeControl(legend);
        }
    }

    else {
        if (d.name === 'Popularity') {
            LayerCounter2 = LayerCounter2 + 1;
            if (LayerCounter2 % 2 == 0) {
                legend2.addTo(this);
            }
            else {
                legend.addTo(this);
                info.addTo(this);
                this.removeControl(legend);
                this.removeControl(info);
                this.removeControl(legend2);
            }

        }

    }
});

/* We simply pick up the SVG from the map object */
svg = d3.select(map.getPanes().overlayPane).select("svg");

var g = svg.append("g");

var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S").parse;

var today = new Date();
