"use strict";
var body = document.querySelector("body");
var container = document.querySelector(".container");
var gameArea = document.querySelector(".game-area");
var buttonStart = document.querySelector(".button-start");
var buttonHistory = document.querySelector(".button-history");
var buttonHideHistory = document.querySelector(".button-hide-history");
var score1 = document.querySelector(".player1Score");
var score2 = document.querySelector(".player2Score");
var player1Name = document.querySelector(".player1Name");
var player2Name = document.querySelector(".player2Name");
var gameStatus = "inGame"; // inGame - мяч в игре; onPause - пауза в игре

var form1 = document.querySelector(".form1");
var p1name = document.querySelector(".p1-name");
var p1gender = document.querySelectorAll(".p1-radio");
var p1color = document.querySelector(".p1-choose-color");
var form1button = document.querySelector(".p1-button");

var form2 = document.querySelector(".form2");
var p2name = document.querySelector(".p2-name");
var p2gender = document.querySelectorAll(".p2-radio");
var p2color = document.querySelector(".p2-choose-color");
var form2button = document.querySelector(".p2-button");

var ballAudio=new Audio("audio/Ball.mp3");
var applauseAudio=new Audio("audio/Applause.mp3");
var noiseAudio=new Audio("audio/Noise.mp3");

var ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
var historyArr;
var stringName = "KHRAMKO_TENNIS_HISTORY";
var updatePassword;
var historyView;

if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    // window.addEventListener("touchstart", touchStart);
    window.addEventListener("touchmove", touchMove);
    // window.addEventListener("touchend", touchEnd);
    window.addEventListener("touchcancel", touchCancel);
    alert("touch не поддерживается");
} else{
    alert("touch не поддерживается");
    window.addEventListener("keydown", keyMoveDown);
    window.addEventListener("keyup", keyMoveUp);
}
buttonStart.addEventListener("click", start);
buttonHistory.addEventListener("click", readHistory);
buttonHideHistory.addEventListener("click", hideHistory);
form1button.addEventListener("click", submitP1data);
form2button.addEventListener("click", submitP2data);

p1name.focus();

var RAF=
        // находим, какой метод доступен
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        // ни один не доступен
        // будем работать просто по таймеру
        function(callback)
            { window.setTimeout(callback, 1000 / 60); }
        ;

function touchMove(EO){
    EO=EO||window.event;
    /* browser with Touch Events support */
    if(0 < EO.targetTouches[0].clientX && EO.targetTouches[0].clientX < gameAssets.player1.width && EO.targetTouches[0].clientY > gameAssets.player1.top && EO.targetTouches[0].clientY < gameAssets.player1.bottom){
        EO.touches
    }
}

function keyMoveDown(EO){
    EO=EO||window.event;
    if (EO.keyCode==16){
        gameAssets.player1.speedY = -2;
    } else if(EO.keyCode==17){
        gameAssets.player1.speedY = 2;
    } else if(EO.keyCode==38){
        gameAssets.player2.speedY = -2;
    } else if(EO.keyCode==40){
        gameAssets.player2.speedY = 2;
    }
}
    
function keyMoveUp(EO){
    EO=EO||window.event;
    if (EO.keyCode==16){
        gameAssets.player1.speedY = 0;
    } else if(EO.keyCode==17){
        gameAssets.player1.speedY = 0;
    } else if(EO.keyCode==38){
        gameAssets.player2.speedY = 0;
    } else if(EO.keyCode==40){
        gameAssets.player2.speedY = 0;
    }
}

var gameAssets = (function createGameAssets(){
    var field = document.createElementNS("http://www.w3.org/2000/svg","svg");
    var fieldRect = document.createElementNS("http://www.w3.org/2000/svg","rect");
    var playingField = {
        width : 500,
        height : 300,
    }
    function setAttributesPlayingField(){
        field.setAttribute("width", playingField.width);
        field.setAttribute("height", playingField.height);
    }
    var playingFieldRect = {
        width : 500,                                                //ширина игрового поля
        height : 300,                                               //высота игрового поля
        x : 0,                                                      //координата x точки построения игрового поля (левый верхний угол)
        y : 0,                                                      //координата y точки построения игрового поля (левый верхний угол)
        fill : "none",                                              //цвет заливки игрового поля
        stroke : "black",                                           //цвет обводки игрового поля
        strokeWidth: 4                                             //ширина обводки игрового поля
    }
    function setAttributesPlayingFieldRect(){
        playingFieldRect.center = {x: playingFieldRect.width/2, y : playingFieldRect.height/2};    //координаты центра игрового поля
        fieldRect.setAttribute("width", playingFieldRect.width);
        fieldRect.setAttribute("height", playingFieldRect.height);
        fieldRect.setAttribute("x", playingFieldRect.x);
        fieldRect.setAttribute("y", playingFieldRect.y);
        fieldRect.setAttribute("fill", playingFieldRect.fill);
        fieldRect.setAttribute("stroke", playingFieldRect.stroke);
        fieldRect.setAttribute("stroke-width", playingFieldRect.strokeWidth);
    }
    setAttributesPlayingField();
    setAttributesPlayingFieldRect();

    gameArea.style.width = playingField.width + "px";
    gameArea.style.height = playingField.height + "px";
    
    function Player(){
        var self = this;
        self.speedY = 0;                                                                //"скорость" ракетки
        self.width = 0.02*playingFieldRect.width;                                       //ширина ракетки
        self.height = 0.25*playingFieldRect.height;                                     //высота ракетки
        self.center = {x : self.width/2, y : playingFieldRect.center.y},                //координаты центра ракетки
        self.top =  self.center.y - self.height/2,                                      //верхняя граница ракетки
        self.bottom = self.center.y + self.height/2,                                    //нижняя граница ракетки
        self.score = 0;                                                                 //счёт игрока             
        self.move = function(centerY){                                                  //движение ракетки
            self.bottom = centerY + self.height/2;                   
            self.top = centerY - self.height/2; 
            self.view.setAttribute("y", self.top);
        }
        self.setDefaultAttributes = function(){                                         //дефолтные значения атрибутов
            self.view.setAttribute("x", self.x);
            self.view.setAttribute("y", self.top);
            self.view.setAttribute("width", self.width);
            self.view.setAttribute("height", self.height);
            self.view.setAttribute("fill", self.color);
            self.view.setAttribute("stroke-width", self.width);
        }
    }
    
    var player1 = (function createPlayer1(){
        var player1 = new Player();
        player1.view = document.createElementNS("http://www.w3.org/2000/svg","rect");
        player1.x = 0;
        player1.setDefaultAttributes();
        return player1;
    })()
    
    var player2 = (function createPlayer2(){
        var player2 = new Player();  
        player2.view = document.createElementNS("http://www.w3.org/2000/svg","rect");
        player2.center.x = playingFieldRect.width - player2.width/2;               
        player2.x = playingFieldRect.width - player2.width;
        player2.setDefaultAttributes();
        return player2;
    })()

    var ball = (function createBall(){
        var ball = {
            view : document.createElementNS("http://www.w3.org/2000/svg","circle"),
            radius : 15,
            color : "red",
            posX : playingFieldRect.center.x,
            posY : playingFieldRect.center.y,  
            move : function(){
                ball.view.setAttribute("cx", ball.posX);
                ball.view.setAttribute("cy", ball.posY);
            },
            setDefaultAttributes : function(){
                ball.view.setAttribute("cx", ball.posX);
                ball.view.setAttribute("cy", ball.posY);
                ball.view.setAttribute("r", ball.radius);
                ball.view.setAttribute("fill", ball.color);
            }
        }
        ball.setDefaultAttributes();
        return ball;
    })()
    field.appendChild(player1.view);
    field.appendChild(player2.view);
    field.appendChild(ball.view);
    field.appendChild(fieldRect);
    gameArea.appendChild(field);
    return {playingFieldRect, player1, player2, ball};
    
})();

score1.innerHTML = gameAssets.player1.score;
score2.innerHTML = gameAssets.player2.score;

function submitP1data(){
    if(p1name.value.trim() == ""){
        alert("Заполните поле имени");
        p1name.focus();
    } else {
        gameAssets.player1.name = p1name.value.trim();                  //добавляем объекту player1 класса Player свойство name 
        player1Name.innerHTML = gameAssets.player1.name;                //выводим имя игрока на html-страницу

        gameAssets.player1.color = p1color.value;                           //добавляем объекту player1 класса Player свойство color 
        gameAssets.player1.setDefaultAttributes();                          //устанавливаем представлению игрока атрибуты по умолчанию (в т.ч. цвет)
        
        form1.classList.remove("jackInTheBox");
        form1.classList.add("zoomOut");
        form2.classList.remove("hidden");                                               //"показываем" форму второго игрока
        form2.classList.add("zoomIn");
        p2name.focus();
    }
}

function submitP2data(){
    if(p2name.value.trim() == ""){
        alert("Заполните поле имени");
        p2name.focus();
    } else {
        gameAssets.player2.name = p2name.value.trim();                  //добавляем объекту player1 класса Player свойство name 
        player2Name.innerHTML = gameAssets.player2.name;                //выводим имя игрока на html-страницу

        for(var i = 0; i< p2gender.length; i++){                            //получаем выбранное значение пола игрока
            if(p2gender[i].name === 'gender2' && p2gender[i].checked){ 
                gameAssets.player2.gender = p2gender[i].value;
            }
        }
    
        gameAssets.player2.color = p2color.value;                           //добавляем объекту player1 класса Player свойство color 
        gameAssets.player2.setDefaultAttributes();                          //устанавливаем представлению игрока атрибуты по умолчанию (в т.ч. цвет)
        form1.classList.add("hidden");   
        form1.classList.remove("zoomOut");
        form2.classList.remove("zoomIn");
        form2.classList.add("fadeOut");
        for(var i = 0; i< form2.children.length; i++){
            form2.children[i].setAttribute("disabled", "disabled");
            form2.children[i].style.cursor = "default";
        }
        buttonStart.removeAttribute("disabled");
        buttonStart.focus();
    }
}

function setDefaultPosition(){
    gameAssets.player1.center = {x: self.width/2, y: gameAssets.playingFieldRect.center.y}; 
    gameAssets.player1.setDefaultAttributes();

    gameAssets.player2.center = {x: self.width/2, y: gameAssets.playingFieldRect.center.y};     
    gameAssets.player1.setDefaultAttributes();

    gameAssets.ball.posX = gameAssets.playingFieldRect.center.x;
    gameAssets.ball.posY = gameAssets.playingFieldRect.center.y;
    gameAssets.ball.setDefaultAttributes();
}

function start(){
    if(checkScore()){
        console.log("stop");
    } else{
        setDefaultPosition();
        applauseAudio.pause(); 
        applauseAudio.currentTime = 0;
        noiseAudio.pause();
        noiseAudio.currentTime = 0;
        
        var temp = Math.random();
        if(0 < temp && temp < 0.25){
            gameAssets.ball.speedX = 3;
            gameAssets.ball.speedY = 1.5;
        } else if(0.25 < temp && temp < 0.5){
            gameAssets.ball.speedX = -3;
            gameAssets.ball.speedY = -1.5;
        } else if(0.5 < temp && temp < 0.75){
            gameAssets.ball.speedX = 3;
            gameAssets.ball.speedY = -1.5;
        } else if(0.75 < temp && temp < 1){
            gameAssets.ball.speedX = - 3;
            gameAssets.ball.speedY = 1.5;
        }
        tick();
    }
    buttonStart.setAttribute("disabled", "disabled");
}

function tick() {
    if(gameStatus == "inGame"){
        gameAssets.player1.center.y+=gameAssets.player1.speedY;
        gameAssets.player2.center.y+=gameAssets.player2.speedY;
        gameAssets.player1.move(gameAssets.player1.center.y);
        gameAssets.player2.move(gameAssets.player2.center.y);
        gameAssets.ball.posX+=gameAssets.ball.speedX;
        gameAssets.ball.posY+=gameAssets.ball.speedY;
        //игрок 1 выше верхнего края игрового поля
        if(gameAssets.player1.top<0){
            gameAssets.player1.center.y=gameAssets.player1.height/2;  
            gameAssets.player1.move(gameAssets.player1.center.y);
        }
        //игрок 1 ниже нижнего края игрового поля
        if(gameAssets.player1.bottom>gameAssets.playingFieldRect.height){
            gameAssets.player1.center.y=gameAssets.playingFieldRect.height - gameAssets.player1.height/2;  
            gameAssets.player1.move(gameAssets.player1.center.y);
        }
        //игрок 2 выше верхнего края игрового поля
        if(gameAssets.player2.top<0){
            gameAssets.player2.center.y=gameAssets.player2.height/2;  
            gameAssets.player2.move(gameAssets.player2.center.y);
        }
        //игрок 2 ниже нижнего края игрового поля
        if(gameAssets.player2.bottom>gameAssets.playingFieldRect.height){
            gameAssets.player2.center.y=gameAssets.playingFieldRect.height - gameAssets.player2.height/2;  
            gameAssets.player2.move(gameAssets.player2.center.y);
        }
        // мяч попал в ракетку игрока 1
        if (gameAssets.ball.posX <= gameAssets.player1.width + gameAssets.ball.radius && gameAssets.ball.posY>gameAssets.player1.top - 3*gameAssets.ball.radius/2 && gameAssets.ball.posY+gameAssets.ball.radius/2<gameAssets.player1.bottom){
            gameAssets.ball.speedX=-gameAssets.ball.speedX;
            gameAssets.ball.posX=gameAssets.player1.width + gameAssets.ball.radius;  
            playBallAudio()
            window.navigator.vibrate(1000);
        }
        // мяч попал в ракетку игрока 2
        if (gameAssets.ball.posX >= gameAssets.playingFieldRect.width - gameAssets.player2.width - gameAssets.ball.radius && gameAssets.ball.posY>gameAssets.player2.top - gameAssets.ball.radius/2 && gameAssets.ball.posY+gameAssets.ball.radius/2<gameAssets.player2.bottom){
            gameAssets.ball.speedX=-gameAssets.ball.speedX;
            gameAssets.ball.posX=gameAssets.playingFieldRect.width - gameAssets.player2.width - gameAssets.ball.radius;
            playBallAudio()
            window.navigator.vibrate(1000);
        }
        // вылетел ли мяч левее стены?
        if (gameAssets.ball.posX - gameAssets.ball.radius<0 && gameStatus == "inGame"){
            gameAssets.ball.speedX=0;
            gameAssets.ball.speedY=0;
            gameAssets.player1.speedY=0;
            gameAssets.player2.speedY=0;
            gameAssets.ball.posX = gameAssets.ball.radius + gameAssets.playingFieldRect.strokeWidth/2;
            gameAssets.player2.score++
            score2.innerHTML = gameAssets.player2.score;
            gameStatus = "onPause";
            playNoiseAudio();
            playApplauseAudio();
            window.navigator.vibrate([1000, 1000, 1000]);
            buttonStart.removeAttribute("disabled");
            buttonStart.focus();
        }
        // вылетел ли мяч правее стены?
        if (gameAssets.ball.posX+gameAssets.ball.radius>gameAssets.playingFieldRect.width && gameStatus == "inGame"){
            gameAssets.ball.speedX=0;
                gameAssets.ball.speedY=0;
                gameAssets.player1.speedY=0;
                gameAssets.player2.speedY=0;
                gameAssets.ball.posX = gameAssets.playingFieldRect.width - gameAssets.ball.radius - gameAssets.playingFieldRect.strokeWidth/2;
                gameAssets.player1.score++;
                score1.innerHTML = gameAssets.player1.score;
                gameStatus = "onPause";
                playNoiseAudio();
                playApplauseAudio();
                window.navigator.vibrate([1000, 1000, 1000]);
                buttonStart.removeAttribute("disabled");
                buttonStart.focus();
        }
        // вылетел ли мяч выше стены?
        if (gameAssets.ball.posY - gameAssets.ball.radius<0){
            gameAssets.ball.speedY=-gameAssets.ball.speedY;
            gameAssets.ball.posY=gameAssets.ball.radius;
            playBallAudio();
        }
        // вылетел ли мяч ниже стены?
        if (gameAssets.ball.posY+gameAssets.ball.radius>gameAssets.playingFieldRect.height){
            gameAssets.ball.speedY=-gameAssets.ball.speedY;
            gameAssets.ball.posY=gameAssets.playingFieldRect.height-gameAssets.ball.radius;
            playBallAudio();
        }  
        RAF(tick);
    } else if(gameStatus == "onPause"){
        gameStatus = "inGame";
    }
    gameAssets.ball.move();
}

//AUDIO API

function soundInit() {
    ballAudio.play(); // запускаем звук
    applauseAudio.play(); // запускаем звук
    noiseAudio.play(); // запускаем звук
    ballAudio.pause(); // и сразу останавливаем
    applauseAudio.pause(); // и сразу останавливаем
    noiseAudio.pause(); // и сразу останавливаем
}

function playBallAudio() {
    ballAudio.currentTime=0; // в секундах
    ballAudio.play();
}

function playApplauseAudio() {
    applauseAudio.currentTime=0; // в секундах
    applauseAudio.play();
}

function playNoiseAudio() {
    noiseAudio.currentTime=0; // в секундах
    noiseAudio.play();
}

function checkScore(){
    if(gameAssets.player1.score==5){
        setDefaultPosition();
        console.log(`${gameAssets.player1.name}  победил(а)!`);
        saveHistory();
    } else if(gameAssets.player2.score==5){
        setDefaultPosition();
        console.log(`${gameAssets.player2.name}  победил(а)!`);
        saveHistory();
    }
}
function saveHistory() {
    updatePassword=Math.random();
    $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'LOCKGET', n : stringName, p : updatePassword },
            success : restoreHistory, error : errorHandler
        }
    );
}
    
function restoreHistory(callresult){
    if (callresult.error!=undefined )
        alert(callresult.error); 
    else {
        historyArr = JSON.parse(callresult.result);
        var gameHistory = {};  //хэш для хранения сохраняемой строки
        gameHistory.player1 = {"color": gameAssets.player1.color, "name" : gameAssets.player1.name, "score" : gameAssets.player1.score};
        gameHistory.player2 = {"score" : gameAssets.player2.score, "name" : gameAssets.player2.name, "color": gameAssets.player2.color};
        historyArr.push(gameHistory); //добавляем текущую сохраняемую строку к считанному с сервера массиву строк
        var historyJSON = JSON.stringify(historyArr); //переводим массив информации об истории игр в JSON   
        //отправляем JSON с историей игр на сервер        
        $.ajax( {
            url : ajaxHandlerScript,
            type : 'POST', dataType:'json', cache : false,
            data : { f : 'UPDATE', n : stringName, v : historyJSON, p : updatePassword }, 
            success : dataSaved, error : errorHandler
        });
    }
}
    
function dataSaved(callresult){
    console.log("Data saved: " + callresult);
}


function readHistory() {
    if(!container.contains(historyView)){
        buttonHistory.setAttribute("disabled", "disabled");
        buttonHideHistory.removeAttribute("disabled");
        $.ajax( {
            url : ajaxHandlerScript,
            type : 'POST', dataType:'json',
            data : { f : 'READ', n : stringName},
            cache : false,
            success : displayHistory,
            error : errorHandler
        });
    }
}

function displayHistory(callresult){
    historyView = document.createElement("div");
    historyView.classList.add("history-table");
    historyArr = JSON.parse(callresult.result);
    for(var i = 0; i<historyArr.length; i++){
        // historyArr.length - количество строк таблицы
        var historyDataRow = document.createElement("div");
        historyDataRow.classList.add("history-data-row");
        for(var j = 0; j<Object.keys(historyArr[i]).length; j++){
            // Object.keys(historyArr[i]).length - количество игроков в каждой строке
            for(var n = 0; n<Object.keys(historyArr[i][Object.keys(historyArr[i])[j]]).length; n++){
                // Object.keys(historyArr[i][Object.keys(historyArr[i])[j]]).length - количество ячеек
                var cell = document.createElement("div");
                cell.innerHTML = historyArr[i][Object.keys(historyArr[i])[j]][Object.keys(historyArr[i][Object.keys(historyArr[i])[j]])[n]];
                cell.classList.add("history-data-cell");
                cell.classList.add(Object.keys(historyArr[i][Object.keys(historyArr[i])[j]])[n]);
                //historyArr[i][Object.keys(historyArr[i])[j]];
                if(cell.classList.contains("color")){
                    cell.style.backgroundColor = cell.innerHTML;
                    cell.innerHTML = "";
                }
                historyDataRow.appendChild(cell);
            }
        }
        historyView.appendChild(historyDataRow);   
    }
    container.appendChild(historyView);
}

function hideHistory(){
    container.removeChild(historyView);
    buttonHideHistory.setAttribute("disabled", "disabled");
    buttonHistory.removeAttribute("disabled");
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}