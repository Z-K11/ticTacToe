console.log("Hello World");
function createGame()
{

}
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
        }
    }
}
const player_1 = createPlayer('ZK11');
const player_2 = createPlayer('Maratib');