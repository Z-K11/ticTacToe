console.log("Hello World");
const gameBoard=(()=>
{
    let board=document.querySelector('.game_Area');
    let gameMatrix = Array(9).fill('');
    const player_1 = createPlayer('ZK11');
    const player_2 = createPlayer('Maratib');
    let end=false;
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
        takeInput()
        {
            return prompt("Select Index 1-9 To place Marker");
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
        playRound()
        {
                playerOne = this.takeInput()-1;
                gameMatrix[playerOne]='x';
                winner = this.checkWin();
                if(winner===1)
                {
                    alert('Player 1 Wins');
                    player_1.addWin();
                    player_2.addLoss();
                    player_1.displayScore();
                    resetBoard();
                    return;
                }
                playerTwo = this.takeInput()-1;
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
                console.table(gameMatrix);

        
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
        }
    }
}
