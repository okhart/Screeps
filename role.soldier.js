//Soldiers are basic war units with weak hits and melee attack

var roleSoldier = {
    run: function(creep)
    {
        if(Game.flags.FlagAttack && creep.memory.hasReachedFlag == false)
        {
            creep.moveTo(Game.flags.FlagAttack);
            if (creep.pos.getRangeTo(Game.flags.FlagAttack) < 5)
                creep.emory.hasReachedFlag == true;
        }
        var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if(!target)
            target = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, s => s.type != STRUCTURE_CONTROLLER);
        if(creep.attack(target) == ERR_NOT_IN_RANGE) 
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ff0000'}});
    }
};

module.exports = roleSoldier;
