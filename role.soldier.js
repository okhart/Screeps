var roleSoldier = {
    run: function(creep)
    {
        var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ff0000'}});
        }
    }
};

module.exports = roleSoldier;
