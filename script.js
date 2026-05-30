console.log("Hello World");
const gameBoard=(()=>
{
    let board=document.querySelector('.game_Area');
    let gameMatrix = Array(9).fill('');
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
            console.table(gameMatrix);
            console.log(gameMatrix);
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