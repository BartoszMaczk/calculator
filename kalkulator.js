// wygenerowanie przycisków kalkulatora
var calc = new Array(16);

calc[0] = "7";
calc[1] = "8";
calc[2] = "9";
calc[3] = "/";
calc[4] = "4";
calc[5] = "5";
calc[6] = "6";
calc[7] = "*";
calc[8] = "1";
calc[9] = "2";
calc[10] = "3";
calc[11] = "-";
calc[12] = "C";
calc[13] = "0";
calc[14] = "=";
calc[15] = "+";

function optionFirst() {
    show = "";
    calculations = [];
    simple = "";
    document.querySelector(".result").innerHTML = show;
    let allButtons = " ";
    for (let i = 0; i < calc.length; i++) {
        let el = "btn" + i;
        allButtons = allButtons + '<button class="btns" onclick="remember(innerText)" id="' + el + '">' + calc[i] + '</button>';

        if ((i + 1) % 4 == 0) allButtons = allButtons + '<div class="newLine"></div>';
    }
    document.querySelector(".buttons").innerHTML = allButtons;

}
// wygenerowanie przycisków przelicznika

function optionSecond() {
    document.querySelector("#btn3").innerHTML = "km";
    document.querySelector("#btn7").innerHTML = "mi";
    document.querySelector("#btn11").innerHTML = "ft";
    document.querySelector("#btn15").innerHTML = "cal";
    document.querySelector("#btn14").innerHTML = "=>";
    show = "";
    calculations = [];
    simple = "";
    document.querySelector(".result").innerHTML = show;

}

//funckja główna, on-click przycisków 
function remember(mark) {

    //czyszczenie wyswietlacza
    if (mark == "C") {
        show = "";
        simple = "";
        calculations = [];
        document.querySelector(".result").innerHTML = show;
        return;
    }
    //blokada przycisków po uzyskaniu wyniku w kalkulatorze
    if (show.charAt(show.length - 1) == "=") {
        return;
    }

    //limit wielkosci wyswietlacza
    if (show.length == 20) {
        return;
    }
    //blokada powtarzalnosci znaków funkcyjnych
    if ((mark == "+" || mark == "-" || mark == "/" || mark == "*" || mark == "=") && (show.charAt(show.length - 1) == "+" || show.charAt(show.length - 1) == "-" || show.charAt(show.length - 1) == "/" || show.charAt(show.length - 1) == "*" || show.charAt(show.length - 1) == "=")) {
        return;
    }
    //blokada wpisywania znaków funkcyjnych jako pierwszych
    show += mark;
    if (show.charAt(0) == "+" || show.charAt(0) == "-" || show.charAt(0) == "/" || show.charAt(0) == "*" || show.charAt(0) == "=" || show.charAt(0) == "k" || show.charAt(0) == "m" || show.charAt(0) == "f" || show.charAt(0) == "c") {
        show = "";
        return;
    }

    //warunek obsługi przelicznika
    if (mark == "km" || mark == "mi" || mark == "ft" || mark == "cal" || mark == "=>") {
        converter(mark);
        return;
    }
    //blokada przycisków w przeliczniku
    if (calculations.includes("=>") || calculations.includes("km") || calculations.includes("mi") || calculations.includes("ft") || calculations.includes("cal")) {
        return;
    }

    //warunki obsługi kalkulatora
    if (mark == "+" || mark == "-" || mark == "/" || mark == "*" || mark == "=") {
        calculations.push(simple);
        simple = "";
        calculations.push(mark);

    } else {
        simple += mark;
    }


    document.querySelector(".result").innerHTML = show;

    if (mark == "=") {
        mult_div();
        sume();
        document.querySelector(".result").innerHTML = show + " " + calculations[0];
    }

}

//funkcje kalkulatora
function mult_div() {
    for (let i = 1; i < calculations.length - 1; i++) {
        if (calculations[i] == "*") {
            calculations[i - 1] = (calculations[i - 1] * calculations[i + 1]);
            calculations.splice(i, 2);
            i += -1;
        } else if (calculations[i] == "/") {
            calculations[i - 1] = (calculations[i - 1] / calculations[i + 1]);
            calculations.splice(i, 2);
            i += -1;
        }
    }
}

function sume() {
    for (let i = 1; i < calculations.length - 1; i++) {
        if (calculations[i] == "+") {
            calculations[i - 1] = parseInt(calculations[i - 1]) + parseInt(calculations[i + 1]);
            calculations.splice(i, 2);
            i += -1;
        } else if (calculations[i] == "-") {
            calculations[i - 1] = parseInt(calculations[i - 1]) - parseInt(calculations[i + 1]);
            calculations.splice(i, 2);
            i += -1;
        }
    }
}

// funkcje przelicznika
function converter(mark) {

    calculations[0] = simple;
    if (mark == "=>") {
        if (calculations.length == 2) {
            calculations[2] = mark;
            document.querySelector(".result").innerHTML = calculations[0] + calculations[1] + calculations[2];
        }
        return;
    }

    if (calculations.length == 3) {
        howMany(mark);
        return;
    }
    calculations[1] = mark;
    document.querySelector(".result").innerHTML = calculations[0] + calculations[1];
}

function howMany(mark) {
    let score = 0;
    switch (calculations[1]) {
        case "km":
            if (mark == "km")
                score = calculations[0];
            else if (mark == "mi") score = parseInt(calculations[0]) * 0.62;
            else if (mark == "ft") score = parseInt(calculations[0]) * 3280.84;
            else if (mark == "cal") score = parseInt(calculations[0]) * 39370.08;
            break;
        case "mi":
            if (mark == "km") score = parseInt(calculations[0]) * 1.61;
            else if (mark == "mi") score = calculations[0];
            else if (mark == "ft") score = parseInt(calculations[0]) * 5280.00;
            else if (mark == "cal") score = parseInt(calculations[0]) * 63360.00;
            break;
        case "ft":
            if (mark == "km") score = parseInt(calculations[0]) * 0.0003048;
            else if (mark == "mi") score = parseInt(calculations[0]) * 0.0001894;
            else if (mark == "ft") score = calculations[0];
            else if (mark == "cal") score = parseInt(calculations[0]) * 12.00;
            break;
        case "cal":
            if (mark == "km") score = parseInt(calculations[0]) * 0.0000254;
            else if (mark == "mi") score = parseInt(calculations[0]) * 0.0000158;
            else if (mark == "ft") score = parseInt(calculations[0]) * 0.08;
            else if (mark == "cal") score = calculations[0];
            break;
        default:
            document.querySelector(".result").innerHTML = "ERROR";
    }
    score = score * 10000;
    score = Math.round(score);
    score = score / 10000;
    document.querySelector(".result").innerHTML = calculations[0] + calculations[1] + calculations[2] + score + mark;
}


var show = "";
var calculations = [];
var simple = "";

window.onload = optionFirst;
