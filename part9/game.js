(function (){

    function createList(){
        let list = [];
        for (let x = 0; x < 8; x++){
            list.push(x+1);
            list.push(x+1);
        }
        return list;
    }

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
        return array;
    }

    let check = [];
    let disableCount = 0;

    function disableCard(cards){
        let card1 = document.getElementById(String(cards[0].id));
        let card2 = document.getElementById(String(cards[1].id));
        if (!card1.getAttribute("disabled") && !card2.getAttribute("disabled")){
            card1.setAttribute("disabled",true);
            card2.setAttribute("disabled",true);
            disableCount++;
        }
        if (disableCount === 8) refreshPage();
    }

    function refreshPage(){
        let button = document.createElement("button");
        button.classList.add("btn","btn-outline-primary","btn-block","btn-lg","active");
        button.setAttribute("style", "height:150px");
        button.textContent = "Сыграть ещё раз";
        button.addEventListener("click", function(){
            location.reload();
        })
        document.body.append(button)
    }

    function makeButton(card,index){
        let button = document.createElement("button");
        button.classList.add("btn","btn-outline-secondary");
        button.textContent = "Нажми сюда!";
        button.setAttribute("style", "width:25%;height:150px");
        button.setAttribute("id",String(index));
        button.addEventListener("click", function(){
            if (check.length < 2){
                check.push({
                    id : index,
                    name : card
                });
                button.textContent = card;
                setTimeout(function(){
                    if (!button.getAttribute("disabled")){
                        button.textContent = "Нажми сюда!";
                    }
                    check.splice(0,1);
                },1000);
            }
            if (check.length === 2){
                if (check[0].name === check[1].name){
                    disableCard(check);
                }
                
            }
        });
        return button;
    }

    function createCardsApp(){
        let cards = shuffle(createList());
        for (index in cards){
            document.body.append(makeButton(cards[index],index));
        }
    }
    window.createCardsApp = createCardsApp;
})();