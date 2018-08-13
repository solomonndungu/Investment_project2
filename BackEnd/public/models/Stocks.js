var express = require("express");
var passport = require("passport");
var cookieParser = require("cookie-parser");

var stocks = new stocks("3VSFJ83DDKT105M3");//request API Key at Alpha Vantage so as to access the stock market details

var app = express();

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//authenticate the user
app.post('/Stocks',
passport.authenticate('local', { failureRedirect: '/login'}),
    function(req, res) {
        res.redirect('stocks');
    });


    


//gets the companies stock data for the last 60 minutes
/*async function TeslaRequest () {
    var Tesla = await stocks.timeSeries({
        symbol: 'TSLA',//The symbol or abbreviations of the company stock you want to follow
        interval: '60min',//interval of data points you want to retrieve. Per hour.
        amount: 1,//Amount of data points to fetch. Returns an array with following keys and values: open, high, low, close, volume, date
        time_period: 3,//Time period to calculate indicators or data. This will use 3 data points
        indicator: 'ADX'//Where you want to fetch data. ADX quantifies trend strength. Moving average of price over period of time.
    });
    }
    
async function AppleRequest () {
    var Apple = await stocks.timeSeries({
        symbol: 'AAPL',
        interval: '60min',
        amount: 1,
        time_period: 3,
        indicator: 'ADX'
    });
    document.body.innerHTML = JSON.stringify(Apple);
}

async function MicrosoftRequest () {
    var  Microsoft = await stocks.timeSeries({
        symbol: 'MSFT',
        interval: '60min',
        amount: 1,
        time_period: 3,
        indicator: 'ADX'
    });
    document.body.innerHTML = JSON.stringify(Microsoft);
}

async function DisneyRequest () {
    var Disney = await stocks.timeSeries({
        symbol: 'DIS',
        interval: '60min',
        amount: 1,
        time_period: 3,
        indicator: 'ADX'
    });
    document.body.innerHTML = JSON.stringify(Disney);
}
async function BarclaysRequest () {
    var Barclays = await stocks.timeSeries({
        symbol: 'BCS',
        interval: '60min',
        amount: 1,
        time_period: 3,
        indicator: 'ADX'
    });
    document.body.innerHTML = JSON.stringify(Barclays);

};

TeslaRequest();
AppleRequest();
MicrosoftRequest();
DisneyRequest();
BarclaysRequest();
*/