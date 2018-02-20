var commands = [{
    name: "clear",
    function: clearConsole
}];

var cursor = $('#cursor');
var terminal = $('#terminal');
var result = name.fontcolor("green");
var text = ["<b>File.Open(ShortBio.txt, out Console.Window());</b>\n\n      $Hi! My name is ${jwstes} I'm ${98} years old,\n      I'm a full time student, hobbyist coder and couch potato\n      I love challenging problems and turning exciting ideas into something\n      functional\n\n<b>File.Open(ReadMe.txt, out Console.Window());</b>\n\n      This site contains some of my projects and my resume. I hope it\n      impresses you in some way.\n\n      <b>WHAT I DO</b>\n      ----\n      I plan, build & pentest programs, servers and site for people as a hobby\n      When I'm free, I take on an online job/responsibility at www.mpgh.net\n      which is a forum where users can upload cheats/hacks for certain\n      games\n\n      <b>WHAT I DO ON MPGH.NET</b>\n      ----\n      The majority of my time spent is on decompiling and examining codes \n      for any malicious activities. I also do try my best to help and reply to\n      somequestions that users asks.\n\n</b>\n"];

var text2 = ["     <b>WHY DID I VOLUNTEER ON MPGH.NET?</b>\n     ----\n     Well, Curiousity. Ever since I was young I had a mindset\n     of wondering how everything i saw work. I've always been interested in\n     the veins and bones of programs and MPGH offers a great outlet for me\n     to learn and while learning I could save thousands of people from\n     having their PC ruined by malicious code.\n\n     <b>YOU MENTIONED SOMETHING ABOUT 'PENTESTING'?</b>\n     ----\n     Yup. Like I said, I've always been interested in how things work, I'm also\n     interested in the methods hackers use to break them ^-^.\n     My interest in pentesting lies mostly on Server Infrastructures,\n     Apache Exploitations and Reconnaissance."];
var commandHistrory = [];
var lineY = 1;
var index = 0;
var historyIndex = 0;

setInterval(function () {
    cursor.toggleClass('invisible');
}, 500);

function clearConsole() {
    text = [];
    lineY = 0;
}

function printConsole(txt) {
    cursor.remove();
    terminal.html(text + text2);
    terminal.append('<span id="cursor"></span>');
    cursor = $('#cursor');
}

function processCommand(rawData) {
    var args = rawData.split(" ");
    var command = args[0];
    commandHistrory[historyIndex] += rawData;
    args.shift();
    var unknownComand = true;
    for (var i = 0; i < commands.length; i++) {
        if (command === commands[i].name) {
            commands[i].function(args);
            unknownComand = false;
            break;
        }
    }
    if (unknownComand == true) {
        lineY++;
        text[lineY] = "\nsystem: command not found";
    }
    historyIndex++;
}

function nextLine() {
    processCommand(text[lineY]);
    if (lineY != 0) {
        lineY++;
        text[lineY] = "\n";
    }
    else
        text[lineY] = "";

    text[lineY] += "$> ";
    lineY++;
    text[lineY] = "";
    printConsole(text);
}

function erase(n) {
    text[lineY] = text[lineY].slice(0, -n);
    index--;
    printConsole(text);
}

$(document).ready(function () {
    printConsole(text)
})

$('html').on('keydown', function (e) {
    e = e || window.event;
    var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

    // Backspace? Erase!
    if (keyCode === 8 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
        if (index != 0)
            erase(1);
    }
});

$(document).keypress(function (e) {
    // Make sure we get the right event
    e = e || window.event;
    var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

    // Which key was pressed?
    switch (keyCode) {
        // ENTER
        case 13:
        {
            nextLine();
            break;
        }
        default:
        {
            var data = String.fromCharCode(keyCode);
            if (data != undefined) {
                var length = text[lineY].length;
                text[lineY] += data;
                index = index + (text[lineY].length - length);
                printConsole(text);
            }
          break;
        }
    }
});
