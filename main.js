const allBoxes = document.querySelectorAll(".box");
var selectedElements = new Array();
var score = document.querySelector("#score");
var scoreCount = 0;
var imagesSrcs = [
    "AC - Copy.png", "AC.png", "AD.png", "AD - Copy.png", "AH - Copy.png", "AH.png", "AS - Copy.png", "AS.png",
    "JC - Copy.png", "JC.png", "JD.png", "JD - Copy.png", "JH - Copy.png", "JH.png", "JS - Copy.png", "JS.png",
    "KC - Copy.png", "KC.png", "KD.png", "KD - Copy.png", "KH - Copy.png", "KH.png", "KS - Copy.png", "KS.png",
    "QC - Copy.png", "QC.png", "QD.png", "QD - Copy.png", "QH - Copy.png", "QH.png", "QS - Copy.png", "QS.png",
];

imagesSrcs = shuffle(imagesSrcs);
for (var i = 0; i < imagesSrcs.length; i++) {
    allBoxes[i].childNodes[1].src = "./images/" + imagesSrcs[i];
    toggleBoxClasses(allBoxes[i]);
}

function toggleBoxClasses(elem) {
    elem.classList.toggle("rotate");
    elem.classList.toggle("back-rotate");
}

function showWinner() {
    Swal.fire({
        title: 'Congratulations',
        text: "You have successfully completed the game <3 !!!",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Restart'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.reload();
        }
    })
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


setTimeout(function () {
    allBoxes.forEach(o => {
        toggleBoxClasses(o);
        o.addEventListener("click", function () {
            if (!this.classList.contains("rotate") && selectedElements.length < 2) {
                toggleBoxClasses(this);
                selectedElements.push(this);
                checkSelectedElements();
            }
        });
    })


    function checkSelectedElements() {
        if (selectedElements.length == 2) {
            var first = getImageNameWithBox(selectedElements[0]);
            var second = getImageNameWithBox(selectedElements[1]);
            if (first.includes(second) || second.includes(first)) {
                selectedElements = new Array();
                scoreCount++;
                score.textContent = scoreCount;
                if (scoreCount == 16) {
                    showWinner();
                }
            } else {
                setTimeout(function () {
                    selectedElements.forEach(o => {
                        toggleBoxClasses(o);
                    });
                    selectedElements = new Array();
                }, 1500);
            }
        }
    }


    function getImageNameWithBox(elem) {
        return elem.childNodes[1].src.split("/").pop().split("- Copy.png")[0].trim().split(".png")[0];
    }
}, 2000)