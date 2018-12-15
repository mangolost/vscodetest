window.onload = function () {
    let $title = document.querySelector("#title");
    let classList = $title.classList;
    document.querySelector("#btnRed").onclick = function () {
        classList.remove("blue");
        classList.add("red");
    }
    document.querySelector("#btnBlue").onclick = function () {
        classList.remove("red");
        classList.add("blue");
    }
}