//Paired Programming with Dan Brierton & Javier Mesa

let voters = [];
let democratCandidates= [];
let republicanCandidates = [];
let independentCandidates = [];

class Person { 
    constructor(name){
        this.name = name;
    }  
} 
class Voter extends Person{ 
    constructor(name, ideology){
        super(name);
        this.ideology = ideology;
        voters.push(this);
    }   
}

class Candidate extends Person{ 
    constructor(name, party){
        super(name);
        this.party = party.toLowerCase();
        this.votes=0;
        
        if (this.party == 'republican'){republicanCandidates.push(this);}
        
        else if (this.party == 'democrat') {democratCandidates.push(this);}
        
        else if (this.party == 'independent') {independentCandidates.push(this);}
        
        else {console.log('try again asshole');}
        
    }   
}



//Start jQuery
$('#voter-form form').on("submit", (event)=>{
    event.preventDefault();

    let voterName = $('#voter-name').val();
                
    let voterIdeology = $('#voter-ideology').val();
                     
    let newVoter = new Voter(voterName, voterIdeology);

    $("#voter-list ul").append(`<li>${newVoter.name}</li>`).addClass('list-group-item');

    console.log(newVoter); 

}
)

$('#candidate-form form').on("submit", (event)=>{
    event.preventDefault();
                
    let candName = $('#candidate-name').val();
                
    let candParty = $('#candidate-party').val();      
    let newCand = new Candidate(candName, candParty);

    $("#candidate-list ul").append(`<li>${newCand.name}</li>`).addClass('list-group-item');

    console.log(newCand); 

}
)

$('#randomize-btn').on("click", (event)=>{
    event.preventDefault();

    for(let i = 0; i < 100; i++){

        let voterName = 'RandomVoter#'+(i+1);
                
        let voterIdeology;
        
        let randomNumber = Math.floor(Math.random()*3)-1;

        if(randomNumber===0){
            voterIdeology = "Conservative";
        }
        else if (randomNumber===1) {
            voterIdeology = "Liberal"
        }
        else {
            voterIdeology = "Neutral";
        }

        let newVoter = new Voter(voterName, voterIdeology);
    
        
        $("#voter-list ul").append(`<li>${newVoter.name}</li>`).addClass('list-group-item');
    }    
}
)

$('div#vote-btn-div button').on('click', ()=>{
    function vote () {

    let voteDemo = 0;
    let voteRep = 0;
    let voteInd = 0;

    console.log(voters.length);
    
    for (let i=0; i<voters.length; i++){
            
            if(voters[i].ideology=='Liberal'){
                
                let randomNumber = Math.floor(Math.random()*100); 

                if(randomNumber < 61){ voteDemo++; }
                else if ( (randomNumber > 60) && (randomNumber <81) ){ voteRep++; }
                else { voteInd++; }
                // console.log(`Liberal Votes`);
            }
            
            else if (voters[i].ideology=='Neutral'){
                let randomNumber = Math.floor(Math.random()*100); 

                if(randomNumber < 26){ voteDemo++; }
                else if ( (randomNumber > 25) && (randomNumber <51) ){ voteRep++; }
                else { voteInd++; }
                // console.log(`Neutral Votes`);
            }
            
            else {
                let randomNumber = Math.floor(Math.random()*100); 

                if(randomNumber < 21){ voteDemo++; }
                else if ( (randomNumber > 20) && (randomNumber <81) ){ voteRep++; }
                else { voteInd++; }
                // console.log(`Ind Votes`);
            }
    }

    console.log(voteDemo, voteRep, voteInd);

    for(let i=0; i < voteDemo; i++){
        let randomNumber = (Math.floor(Math.random()*democratCandidates.length)); 
        // console.log(randomNumber);
        democratCandidates[randomNumber].votes++;
    }

    for(let i=0; i < voteRep; i++){
        let randomNumber = (Math.floor(Math.random()*republicanCandidates.length)); 
        // console.log(randomNumber);
        republicanCandidates[randomNumber].votes++;
    }

    for(let i=0; i < voteInd; i++){
        let randomNumber = (Math.floor(Math.random()*independentCandidates.length)); 
        // console.log(randomNumber);
        independentCandidates[randomNumber].votes++;
    }

    let potentialWinner = {votes:0};
    console.log(`Votes per party: ${voteDemo}, ${voteInd}, ${voteRep}`);


  for(let i=0; i<democratCandidates.length; i++){
      if (democratCandidates[i].votes > potentialWinner.votes) {potentialWinner = democratCandidates[i];}
  }

  for(let i=0; i<independentCandidates.length; i++){
    if (independentCandidates[i].votes > potentialWinner.votes) {potentialWinner = independentCandidates[i];}
}

for(let i=0; i<republicanCandidates.length; i++){
    if (republicanCandidates[i].votes > potentialWinner.votes) {potentialWinner = republicanCandidates[i];}
}

console.log(`rep:${republicanCandidates[0].votes} dem:${democratCandidates[0].votes} ind:${independentCandidates[0].votes}`);

console.log(`${potentialWinner.name}`);
alert(`The winner is: ${potentialWinner.name}!`);
}



vote();
}
)
