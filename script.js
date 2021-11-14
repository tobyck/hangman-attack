alert('Welcome to hangman dictionary attacking!\n\n 1. Enter the current state of your hangman game (e.g. cr_at___)\n 2. Use the "Enter" key to search for possibilities\n 3. Use Shift+I on your keyboard to enter the letters you know are\n     wrong (this makes the search more precise)\n 4. You can use Shift+D to change the dictionary if you would like a \n     different one\n\nVersion 1.3');
var input, regexp, options, wordlist, repeat = false, incorrect = "";
var dict = fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words.txt")
.then(x => x.text())
.then(y => wordlist = y.toLowerCase().split("\n"));
function search() {
    options = "";
    input = document.getElementById("input").value.toLowerCase();
    if (incorrect == null) {
        incorrect = "";
    }
    regexp = new RegExp(input.replaceAll("_", `[^${input.replaceAll("_", "")+incorrect}]`));
    for (var i = 0; i < wordlist.length; i++) {
        if (regexp.test(wordlist[i]) == true && input.length == wordlist[i].length) {
            for (var j = 0; j < input.length; j++) {
                if (wordlist[i].length-wordlist[i].replaceAll(input[j], "").length > input.length-input.replaceAll(input[j], "").length) {
                    repeat = true;
                }
            }
            if (repeat == false) {
                options += wordlist[i]+"\n";
            } else {
                repeat = false;
            }
        }
    }
    if (options.length == 0) {
        alert("Sorry, couldn't find any matches.")
    } else if (input.length == 0) {
        alert("Please enter a hangman state.")
    } else {
        alert("Here are some possibilities:\n\n"+options)
    }
}
document.addEventListener("keyup", function(evt) {
    if (!evt) evt = event;
    if (evt.code == "Enter") {
        search();   
    } else if (evt.shiftKey && evt.keyCode == 73 && document.activeElement != document.getElementById("input")) {
        incorrectInput = prompt("Enter letters you know are wrong:", incorrect)
        if (incorrectInput != null) {
            incorrect = incorrectInput.replaceAll(" ", "");
        }
        key.preventDefault();
    } else if (evt.shiftKey && evt.keyCode == 68 && document.activeElement != document.getElementById("input")) {
        var dict = fetch(prompt("Enter the address of the dictionary below:\n\n466,551 words (default): https://raw.githubusercontent.com/dwyl/english-words/master/words.txt\n\n7,777 words (same as hmn.surge.sh): https://raw.githubusercontent.com/openethereum/wordlist/master/res/wordlist.txt\n\n"))
        .then(x => x.text())
        .then(y => wordlist = y.toLowerCase().split("\n"));
    }
});
