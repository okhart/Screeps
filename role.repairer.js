var roleRepairer = {
    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	    }
	    
	    
	    if(!creep.memory.repairing) {
            creep.getEnergy();
            
	    }     
        if(creep.memory.repairing) {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType != STRUCTURE_WALL) && structure.hits < structure.hitsMax;
                    }
            });
            if(target) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffff00'}});
                }
            }
            else {
            
                var wall = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL) && structure.hits < 50000;
                    }
                });
               if(wall) {
                    if(creep.repair(wall) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(wall, {visualizePathStyle: {stroke: '#ffff00'}});
                    }
                }
            }
        }
        
	}
};

module.exports = roleRepairer;
