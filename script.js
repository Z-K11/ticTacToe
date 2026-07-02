console.log("Hello World");
const gameBoard=(()=>
{
    let board=document.querySelector('.game_Area');
    let gameMatrix = Array(9).fill('');
    let player_1;
    let player_2;
    let playerOneTurn = true;
    let playerTwoTurn = false;
    let end=false;
    let gameStarted = false;
    let playerOneDisplayCard = document.querySelector('.player_1');
    let playerTwoDisplayCard = document.querySelector('.player_2');
    let player_1ScoreBoard=document.querySelector('#playerOneScore');
    let player_2ScoreBoard=document.querySelector('#playerTwoScore');
    const resetBoard=() =>
    {
        gameMatrix.fill('');
    }
    const changeEndStatus=()=>
    {
        end=end===true ? false : true;
    }
    const winCombinations = [
        [0,1,2], 
        [3,4,5], 
        [6,7,8], 
        [0,3,6], 
        [1,4,7], 
        [2,5,8], 
        [0,4,8], 
        [2,4,6], 
    ]
    let endGame=false;
    for (let i = 0 ; i < 9;i++)
    {
        let element = document.createElement('div');
        element.id=`box${i+1}`;
        element.classList.add('ticBox');
        board.appendChild(element);

    }
    return{
        displayPlayerData()
        {
            player_1.displayScore();
            player_2.displayScore();
        },
        displayBoardOnConsole()
        {   
            for(let i=0 ; i<9;i++)
            {
                console.log(gameMatrix[i]);
                if(i%3===2)
                {
                    console.log('');
                }
            }
        },
        changeTurn()
        {
            if(playerOneTurn)
            {
                playerOneTurn=false;
                playerTwoTurn=true;
                playerTwoDisplayCard.classList.add('activePlayer');
                playerOneDisplayCard.classList.remove('activePlayer');
            }
            else if (playerTwoTurn)
            {
                playerTwoTurn=false;
                playerOneTurn=true;
                playerOneDisplayCard.classList.add('activePlayer');
                playerTwoDisplayCard.classList.remove('activePlayer');
            }
            else
                alert("Error in changing player turn");
            return;
        },
        startGame()
        {
            if(!gameStarted)
                gameStarted=true;
            else
                alert("error game already started");
            return;
        },
        initPlayers(name,name2)
        {
            player_1=createPlayer(name);
            player_2=createPlayer(name2);
        },
        checkWin()
        {
            for (const array of winCombinations)
            {
                if(gameMatrix[array[0]]==='x' && gameMatrix[array[1]]==='x' && gameMatrix[array[2]]==='x')
                    return 1;
                //Player 1 wins
                if(gameMatrix[array[0]]==='o' && gameMatrix[array[1]]==='o' && gameMatrix[array[2]]==='o')
                    return 0;
                //Player 2 wins
            }
               
            
        },
        updateScore()
        {
            let playerOneScore = player_1.returnScore();
            let playerTwoScore = player_2.returnScore();
            player_1ScoreBoard.textContent=playerOneScore;
            player_2ScoreBoard.textContent=playerTwoScore;
        },
        playRound(input)
        {
        let boxNumber = input.substring(input.length-1,input.length)-1;

                if(gameStarted)
                {
                    console.log(`${playerOneTurn} and ${playerTwoTurn}`);
                    if(playerOneTurn)
                    {
                        let playerOne = boxNumber;
                        gameMatrix[playerOne]='x';
                        let winner = this.checkWin();
                        if(winner===1)
                        {
                            alert('Player 1 Wins');
                            player_1.addWin();
                            player_2.addLoss();
                            player_1.displayScore();
                            resetBoard();
                            return;
                        }
                    }
                    if(playerTwoTurn)
                    {
                        let playerTwo = boxNumber;
                        gameMatrix[playerTwo]='o';
                        winner=this.checkWin();
                        if(winner===0)
                        {
                          alert('Player 2 wins');
                            player_2.addWin();
                            player_1.addLoss();
                            player_2.displayScore();
                            resetBoard();
                            return;
                        }
                    }
                    this.changeTurn();
                    console.table(gameMatrix);
                }
                else
                {
                    alert("Error in playRound()");
                    return;
                }

        
        },
        playGame()
        {
            while(!end)
            {
                this.playRound();

            }
        }
    }
    
})();
function createPlayer(name)
{
    let wins=0;
    let losses=0;
    return {
        player:name,
        addWin()
        {
            wins++;
            console.log(`${name} wins!`);
        },
        addLoss()
        {   
            losses++;
            console.log(`${name} losses!`);
        },
        displayScore()
        {
            console.log(`${name} has losses = ${losses} and wins = ${wins}`);
        },
        returnPlayerData()
        {
            return{
                name,
                wins,
                losses,
            }
        },
        returnScore()
        {
            return wins-losses;
        }
    }
}
function checkForInput(targetId)
{
    let playerOneName = document.querySelector('#name').value.trim();
    let playerTwoName = document.querySelector('#name2').value.trim();
    if (playerOneName ==='' || playerTwoName==='')
    {
        alert('Please Input Player Name(s).');
        return;
    }
    else
    {
        if(targetId==='player_1Start')
            gameBoard.initPlayers(playerOneName,playerTwoName);
        else
            gameBoard.initPlayers(playerTwoName,playerOneName);
        gameBoard.displayPlayerData();
    }
}
let playerOneStart = document.querySelector('#playerOneStart');
let playerTwoStart = document.querySelector('#playerTwoStart');
playerOneStart.addEventListener('click',(e)=>
{
    console.log(`Button works and the object is ${e.target.id}`);
    gameBoard.changeTurn();
    gameBoard.changeTurn();
    checkForInput(e.target.id);
})
playerTwoStart.addEventListener('click',(e)=>
{
    console.log(`Button works and the object is ${e.target.id}`);
    gameBoard.changeTurn();
    checkForInput(e.target.id);
})
let playArea = document.querySelector('.game_Area');
playArea.addEventListener('click',(e)=>
{
    let boxId = e.target.id;
    gameBoard.playRound(boxId);
})

