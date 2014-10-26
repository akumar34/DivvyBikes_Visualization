var CalendarControl = Class.extend({

    construct: function () {
        this.dateAsString = "07/26/2013 00";
        this.station = null;

        //this.barMargin = {top: 20, right: 20, bottom: 20, left: 20};
        this.barMargin = {top: 50, right: 20, bottom: 20, left: 20};
        this.barCanvasWidth = 1000;
        this.barCanvasHeight = 500;

        this.barWidth = 0;
        this.barHeight = 0;

        this.svgBar1 = null;
        this.svgBar2 = null;

        this.myTag = "";
    },


    /////////////////////////////////////////////////////////////

    startup: function (whereToRender) {
        this.myTag = whereToRender;
        this.updateScreen();
    },


    /////////////////////////////////////////////////////////////

    //Drawing the bar chart for Origin distribution for the first visualization group.
    drawBarChart1: function (error, data) {
        var top = this.barMargin.top,
            bottom = this.barMargin.bottom,
            left = this.barMargin.left,
            right = this.barMargin.right;
        var width = this.barCanvasWidth - left - right;
        var height = this.barCanvasHeight - top - bottom;
        var date = this.dateAsString;
        //var station = this.station;


        var graph = this.svgBar1;

        graph.selectAll("*").remove();
        var dataCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        data.forEach(function (d) {
            d.starttime = new Date(d.starttime);
            switch (d.starttime.getHours()) {
                case 0 :
                    dataCount[0] += 1;
                    break;
                case 1 :
                    dataCount[1] += 1;
                    break;
                case 2 :
                    dataCount[2] += 1;
                    break;
                case 3 :
                    dataCount[3] += 1;
                    break;
                case 4 :
                    dataCount[4] += 1;
                    break;
                case 5 :
                    dataCount[5] += 1;
                    break;
                case 6 :
                    dataCount[6] += 1;
                    break;
                case 7 :
                    dataCount[7] += 1;
                    break;
                case 8 :
                    dataCount[8] += 1;
                    break;
                case 9 :
                    dataCount[9] += 1;
                    break;
                case 10 :
                    dataCount[10] += 1;
                    break;
                case 11 :
                    dataCount[11] += 1;
                    break;
                case 12 :
                    dataCount[12] += 1;
                    break;
                case 13 :
                    dataCount[13] += 1;
                    break;
                case 14 :
                    dataCount[14] += 1;
                    break;
                case 15 :
                    dataCount[15] += 1;
                    break;
                case 16 :
                    dataCount[16] += 1;
                    break;
                case 17 :
                    dataCount[17] += 1;
                    break;
                case 18 :
                    dataCount[18] += 1;
                    break;
                case 19 :
                    dataCount[19] += 1;
                    break;
                case 20 :
                    dataCount[20] += 1;
                    break;
                case 21 :
                    dataCount[21] += 1;
                    break;
                case 22 :
                    dataCount[22] += 1;
                    break;
                case 23 :
                    dataCount[23] += 1;
                    break;
                default :
                    console.log("default case reached... something wrong");
                    break;
            }
            d.stoptime = new Date(d.stoptime);
        });
        var date1 = new Date(date).getHours();

        document.getElementById("activeBikesData").innerHTML = dataCount[date1];


        var x = d3.scale.linear().domain([0, dataCount.length]).range([0, width]);
        //scale.ordinal().rangeRoundBands([0, width], .1);
        var y = d3.scale.linear().domain([0, d3.max(dataCount)])
            .range([height, 0]);
        var color = d3.scale.ordinal()
            .range(["#98abc5"]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(d3.format(".2s"));
        xAxis.tickSize(-height).tickSubdivide(true);
        var line = d3.svg.line()
            .x(function (d, i) {
                // verbose logging to show what's actually being done
                console.log('data: ' + dataCount);
                // return the X coordinate where we want to plot this datapoint
                return x(i);
            })
            .y(function (d) {

                return y(d);
            });

        graph
            .attr("width", width)
            .attr("height", height)
            .append("svg:g")
            .attr("transform", "translate(" + right + "," + top + ")");
        xAxis.ticks(23);


        graph.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("y", 50)
            .attr("x", width / 2)
            .attr("dx", ".71em")
            .style("text-anchor", "middle")
            .text("Time Interval")
        ;

        graph.append("svg:g")
            .attr("class", "y axis")
            //.attr("transform", "translate(-25,0)")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("#Active Bikes")
        ;

        graph.append("svg:path").attr("d", line(dataCount));


    },

    /////////////////////////////////////////////////////////////

    //Drawing the bar chart for Origin distribution for the second visualization group.
    drawBarChart2: function (error, data) {
        var top = this.barMargin.top,
            bottom = this.barMargin.bottom,
            left = this.barMargin.left,
            right = this.barMargin.right;
        var width = this.barCanvasWidth;
        var height = this.barCanvasHeight;
        var date = this.dateAsString;

        var svg = this.svgBar2;

        svg.selectAll("*").remove();
        var dataCount = [];
        // = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var Stations = this.station;
        dataCount[0] = Stations;
        Stations.forEach(function (s,j){
        for(var i=1;i<=24;i++){
            dataCount[i][j] = 0;
        }});
        dataCount[0].forEach(function(s,i){
        data.forEach(function (d) {
            d.starttime = new Date(d.starttime);

if(d.from_station_name == s){
            switch (d.starttime.getHours()) {
                case 0 :
                    dataCount[1][i] += 1;
                    break;
                case 1 :
                    dataCount[2][i] += 1;
                    break;
                case 2 :
                    dataCount[3][i] += 1;
                    break;
                case 3 :
                    dataCount[4][i] += 1;
                    break;
                case 4 :
                    dataCount[5][i] += 1;
                    break;
                case 5 :
                    dataCount[6][i] += 1;
                    break;
                case 6 :
                    dataCount[7][i] += 1;
                    break;
                case 7 :
                    dataCount[8][i] += 1;
                    break;
                case 8 :
                    dataCount[9][i] += 1;
                    break;
                case 9 :
                    dataCount[10][i] += 1;
                    break;
                case 10 :
                    dataCount[11][i] += 1;
                    break;
                case 11 :
                    dataCount[12][i] += 1;
                    break;
                case 12 :
                    dataCount[13][i] += 1;
                    break;
                case 13 :
                    dataCount[14][i] += 1;
                    break;
                case 14 :
                    dataCount[15][i] += 1;
                    break;
                case 15 :
                    dataCount[16][i] += 1;
                    break;
                case 16 :
                    dataCount[17][i] += 1;
                    break;
                case 17 :
                    dataCount[18][i] += 1;
                    break;
                case 18 :
                    dataCount[19][i] += 1;
                    break;
                case 19 :
                    dataCount[20][i] += 1;
                    break;
                case 20 :
                    dataCount[21][i] += 1;
                    break;
                case 21 :
                    dataCount[22][i] += 1;
                    break;
                case 22 :
                    dataCount[23][i] += 1;
                    break;
                case 23 :
                    dataCount[24][i] += 1;
                    break;
                default :
                    console.log("default case reached... something wrong");
                    break;
            }

            d.stoptime = new Date(d.stoptime);
}
            });

        });
        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear()
            .range([height, 0]);
        var color = d3.scale.category10();

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            //.tickFormat(d3.format(".2s"))
            ;

        var line = d3.svg.line()
            .interpolate("basis")
            .x(function(d,i){return x(d[i])})
            .y(function(d,i){d[i].forEach(function(s){return y(d[i][s])});})
        ;
        var symbols = d3.nest()
            .key(function(d) { return d.from_station_name; })
            .entries(data);
        symbols.forEach(function(s) {
            s.maxPrice = d3.max(s.values, function(d,i) { return d[i]; });
        });
        x.domain([
            d3.min(symbols, function(s) { return s.values[0]; }),
            d3.max(symbols, function(s) { return s.values[s.values.length - 1]; })
        ]);
        // Add an SVG element for each symbol, with the desired dimensions and margin.
        svg
            .data(symbols)
            .enter().append("svg")
            .attr("width", width + left + right)
            .attr("height", height + top + bottom)
            .append("g")
            .attr("transform", "translate(" + left + "," + top + ")");

        // Add the area path elements. Note: the y-domain is set per element.
        svg.append("path")
            .attr("class", "area")
            .attr("d", function(d) { y.domain([0, d.maxPrice]); return area(d.values); });

        // Add the line path elements. Note: the y-domain is set per element.
        svg.append("path")
            .attr("class", "line")
            .attr("d", function(d) { y.domain([0, d.maxPrice]); return line(d.values); });

        // Add a small label for the symbol name.
        svg.append("text")
            .attr("x", width - 6)
            .attr("y", height - 6)
            .style("text-anchor", "end")
            .text(function(d) { return d.key; });
    },

    /////////////////////////////////////////////////////////////

    updateWindow: function () {
        var xWin, yWin;

        xWin = d3.select(this.myTag).style("width");
        yWin = d3.select(this.myTag).style("height");

        this.barWidth = xWin;
        this.barHeight = yWin;

        var totalBarSizeX = this.barCanvasWidth + this.barMargin.left + this.barMargin.right;
        var totalBarSizeY = this.barCanvasHeight + this.barMargin.top + this.barMargin.bottom;

        switch (this.myTag) {
            case "#Vis1":
                this.svgBar1 = d3.select(this.myTag).append("svg:svg")
                    .attr("width", this.barWidth)
                    .attr("height", this.barHeight)
                    .attr("viewBox", "" + -this.barMargin.left + " 0 " + totalBarSizeX + " " + this.barCanvasHeight);
                break;
            case "#Vis2":
                this.svgBar2 = d3.select(this.myTag).append("svg:svg")
                    .attr("width", this.barWidth)
                    .attr("height", this.barHeight)
                    .attr("viewBox", "" + -this.barMargin.left + " 0 " + totalBarSizeX + " " + this.barCanvasHeight);
                break;
        }
    },

    /////////////////////////////////////////////////////////////

    updateData: function () {
        var date = this.dateAsString;
        var day, month, year, time;
        month = date.substring(0, 2);
        day = date.substring(3, 5);
        year = date.substring(6, 10);
        var fileToLoad = "App/json/Map/trips_by_day/trips_data_by_day_" + month + "_" + day + "_" + year + ".csv";
        console.log("File to be loaded: " + fileToLoad);
        switch (this.myTag) {

            case "#Vis1":
                this.inDataCallbackFunc = this.drawBarChart1.bind(this);
                d3.csv(fileToLoad, this.inDataCallbackFunc);
                break;
            case "#Vis2":
                this.inDataCallbackFunc = this.drawBarChart2.bind(this);
                d3.csv(fileToLoad, this.inDataCallbackFunc);
                break;
        }
    },

    /////////////////////////////////////////////////////////////

    updateScreen: function () {
        this.updateWindow();
        this.updateData();
    },

    setDateAndTime: function (DateString) {
        this.dateAsString = DateString;

        this.myTag = "#Vis1";
        this.updateData();

        this.myTag = "#Vis2";
        this.updateData();
    },
    updateStation: function (stationArray) {
        this.station = stationArray;
        this.updateData();
    }
});