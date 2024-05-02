"use strict";

//Radio button
var radioButton1 = document.getElementById("r1");
radioButton1.addEventListener('click', changeImage1);

var radioButton2 = document.getElementById("r2");
radioButton2.addEventListener('click', changeImage2);

var radioButton3 = document.getElementById("r3");
radioButton3.addEventListener('click', changeImage3);

var radioButton4 = document.getElementById("r4");
radioButton4.addEventListener('click', changeImage4);

//Radio button 2
var radioButton1_2 = document.getElementById("r1_2");
radioButton1_2.addEventListener('click', changeImage1_2);

var radioButton2_2 = document.getElementById("r2_2");
radioButton2_2.addEventListener('click', changeImage2_2);

var radioButton3_2 = document.getElementById("r3_2");
radioButton3_2.addEventListener('click', changeImage3_2);

var radioButton4_2 = document.getElementById("r4_2");
radioButton4_2.addEventListener('click', changeImage4_2);

function addEventListener(id, srcPath){
    document.getElementById(id).addEventListener('click', changeImag);
}

function changeImage1(e){
    e.preventDefault();

    document.getElementById("img").src = "./imgs/Blok2.jpg";
}

function changeImage2(e){
    e.preventDefault();

    document.getElementById("img").src = "./imgs/Blok3.jpg";
}

function changeImage3(e){
    e.preventDefault();

    document.getElementById("img").src = "./imgs/Blok4.jpg";
}

function changeImage4(e){
    e.preventDefault();

    document.getElementById("img").src = "./imgs/mansion7.jpg";
}

function changeImage1_2(e){
    e.preventDefault();
    
    document.getElementById("img1").src = "./imgs/House2.jpg";
}

function changeImage2_2(e){
    e.preventDefault();

    document.getElementById("img1").src = "./imgs/Blok8.jpg";
}

function changeImage3_2(e){
    e.preventDefault();

    document.getElementById("img1").src = "./imgs/Blok5.jpg";
}

function changeImage4_2(e){
    e.preventDefault();

    document.getElementById("img1").src = "./imgs/Blok6.jpg";
}



