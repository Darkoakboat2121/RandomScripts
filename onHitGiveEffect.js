import { Entity, EntityComponentTypes, EntityHitEntityAfterEvent, Player, world } from "@minecraft/server"

const item = '' // Item type that works, leave empty to make any attack from a player add the effect
const effect = {
    type: '', // Example: invisibility
    time: 0, // In seconds
    amplifier: 0, // Amplifier
    showParticles: true, // Whether the effect particles should show
}

/**
 * @param {EntityHitEntityAfterEvent} evd 
 */
function testRequirements(evd) {
    /**
     * @type {Player}
     */
    const player = evd.damagingEntity
    if (player.typeId != 'minecraft:player') return

    const held = player.getComponent(EntityComponentTypes.Inventory).container.getItem(player.selectedSlotIndex)

    if (item && held?.typeId === item) {
        giveEffect(evd.hitEntity)
    } else if (!item) {
        giveEffect(evd.hitEntity)
    }
}

/**
 * @param {Entity} entity 
 */
function giveEffect(entity) {
    entity.addEffect(effect?.type, effect?.time * 20, {
        amplifier: effect?.amplifier,
        showParticles: effect?.showParticles
    })
}

world.afterEvents.entityHitEntity.subscribe((evd) => {
    testRequirements(evd)
})