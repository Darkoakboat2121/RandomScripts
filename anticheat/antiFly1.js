import { world, system, GameMode, Player } from "@minecraft/server"

system.runTimeout(() => {
    const players = world.getPlayers()
    for (let index = 0; index < players.length; index++) {
        const player = players[index]
        const gm = player.getGameMode()
        if (gm != GameMode.Creative && gm != GameMode.Spectator && player.isFlying) {

            examplePunishment(player)
            // ...Your stuff here

        }
    }
})

/**
 * @param {Player} player 
 */
function examplePunishment(player) {
    player.applyKnockback({x: 0, z: 0}, -1)
}