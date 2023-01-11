let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

class Board {
    constructor(cards) {
        this.cards = cards;
        this.counter = cards.length;
    }

    add_card(card_name) {
        this.counter++;
        this.cards.push(new Card(card_name, this.counter));
    }
}


class Card {
    constructor(name, id, src) {
        this.name = name;
        this.id = id;
        this.image = new Image();
        this.image.src = src;
    }

    draw_card(x, y){
        // TODO
    }
}

async function card_by_query(q) {
    let req = () => {
        return new Promise((resolve, reject) => {
            // get picture details
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var txt = this.responseText;
                    var obj = JSON.parse(txt);
                    resolve(obj);
                }
            };
            xhttp.open("GET", "https://api.scryfall.com/cards/named?fuzzy=" + q.split(' ').join('+'), true);
            xhttp.send();

            // TODO: add card selection (possibly carousel?)

        })
    }
    return await req();
}

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var txt = this.responseText;
            var obj = JSON.parse(txt);
            document.getElementById("demo").innerHTML = "<img src=" + obj.image_uris.normal + ">";
        }
    };
    xhttp.open("GET", "https://api.scryfall.com/cards/random", true);
    xhttp.send();
}

