var roleClaimer = {
    run: function(creep)
    {
        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTROLLER);
                    }
                });
        if(creep.claimController(target) != OK) {
            console.log(creep.claimController(target));
                creep.moveTo(target, {visualizePathStyle: {stroke: '#00ff00'}});
        }
    }
};

module.exports = roleClaimer;

