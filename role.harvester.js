var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            creep.getEnergy();
            
        }
        else {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN) && structure.store.energy < structure.store.getCapacity(RESOURCE_ENERGY);
                    }
                });
                if(!target)
                {
                    target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.energy < structure.store.getCapacity(RESOURCE_ENERGY);
                    }
                });
                }
        }
            
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
            
        
        
	}
};

module.exports = roleHarvester;
