"use strict";

window.onload = function () {
    let $title = document.querySelector("#title");
    let classList = $title.classList;
    // document.querySelector("#btnRed").onclick = function () {
    //     classList.remove("blue");
    //     classList.add("red");
    // }
    // document.querySelector("#btnBlue").onclick = function () {
    //     classList.remove("red");
    //     classList.add("blue");
    // }

    let $btnRed = document.querySelector("#btnRed");
    Rx.Observable
        .fromEvent($btnRed, 'click')
        .subscribe(() => {
            classList.remove("blue");
            classList.add("red");
        });

    let $btnBlue = document.querySelector("#btnBlue");
    Rx.Observable
        .fromEvent($btnBlue, 'click')
        .subscribe(() => {
            classList.remove("red");
            classList.add("blue");
        });

}