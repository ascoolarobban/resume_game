const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')


//SOUND STUFF
fireAudio = new Audio('fire.wav');

//Show Sword img
document.getElementById("sword").hidden=true;




//LOOP SOUND
if (typeof fireAudio.loop == 'boolean')
{
    fireAudio.loop = true;
}
else
{
    fireAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}
fireAudio.loop = true;




//CURSOR STUFF
var cursor = document.getElementById("cursor");
document.body.addEventListener("mousemove", function(e) {
    cursor.style.left = e.clientX + "px",
        cursor.style.top = e.clientY + "px";
});





//GAME STUFF
let state = {}

function startGame(){
    state = {}
    showTextNode(1)

}

function showTextNode(textNodeIndex){
    if(state.sword){
        document.getElementById("sword").hidden=false;

    }
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while(optionButtonsElement.firstChild){
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    textNode.options.forEach(option =>{
            if (showOption(option)){
                const button = document.createElement('button')
                button.innerText = option.text
                button.classList.add('btn')
                button.addEventListener('click',() => selectOption(option))
                optionButtonsElement.appendChild(button)
            }
    })
}


function showOption(option){
    return option.requiredState == null || option.requiredState(state)
}


function selectOption(option){
     const nextTextnodeId = option.nextText
    if(nextTextnodeId <= 0){
        return startGame()
    }
     Object.assign(state, option.setState)
    showTextNode(nextTextnodeId)
}


const textNodes = [
    {
        id:1,
        text: 'Well hello there wanderer..\nWho goes there?',


        options: [
            {
                text: "I'm just passing by peacefully..",
                setState: {blueGoo: true},
                nextText: 2
            },
            {
                text: "I am looking for someone who wants a really cool job!",
                setState: {blueGoo: false},
                nextText: 3
            },

        ]
    },
    {
        id:2,
        text: 'Oh that is fine, not all who wonder is a loss, tell me this stranger, do you happen to know a boss? ',


        options: [
            {
                text: "No, I am looking for one  myself..",
                requiredState: (currentState) => currentState.blueGoo,
                // setState: {blueGoo: false, sword: true},
                nextText: 4
            },
            {
                text: "Yes!\n[Trade your boss for a sword]",
                setState: {sword: true},





                nextText: 5
            },
            {
                text: "Boss? I've neve heard of such thing!",
                nextText: 4
            },

        ]
    },
    {
        id:3,
        text: 'Oh how fortunate! Because if you like what you see ' +

            'this will sound pretty wild.\n' +
            'Because i am the creator\n' +
            'of this strange looking child...',


        options: [
            {
                text: "wait..what?",
                nextText: 4
            },
            {
                text: "Nevermind i thought this was serious..",
                nextText: 4
            },

        ]
    },
    {
        id:4,
        text: 'Monsters fucked u up good in here so you dead',


        options: [
            {
                text: "Restart",
                nextText: -1
            },

        ]
    },
    {
        id:5,
        text: 'Monsters fucked u up good in here so you dead',


        options: [
            {
                text: "Restart",
                nextText: -1
            },

        ]
    }
]

startGame()