console.log("Hello World");
const gameBoard=(()=>
{
    let board=document.querySelector('.game_Area');
    let gameMatrix = Array(9).fill('');
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
            return input("Select Index 1-9 To place Marker");
        },
        playGame()
        {
            while(endGame!==true)
            {
                playerOne = this.takeInput()-1;
                gameMatrix[playerOne]='x';
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
const player_1 = createPlayer('ZK11');
const player_2 = createPlayer('Maratib');