// create a new function for StructureTower
StructureTower.prototype.defend =
    function () {
        // find closes hostile creep
        var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        // if one is found...
        if (target != undefined) {
            // ...FIRE!
            this.attack(target);
        }
    };

StructureTower.prototype.makeRepair = function(wallHits) 
{
    var closestDamagedStructure = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {return structure.hits < structure.hitsMax && 
            structure.structureType != STRUCTURE_WALL &&
            structure.structureType != STRUCTURE_RAMPART
            }});
    if(closestDamagedStructure) {
        this.repair(closestDamagedStructure);
    }
    else {
        var rampart = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {return structure.hits < 35000 && 
            structure.structureType == STRUCTURE_RAMPART
            }});
        if(rampart)
        {
            this.repair(rampart);
        }
    }
    var closestWall = this.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {return structure.hits < wallHits && 
        structure.structureType == STRUCTURE_WALL
        }});
    if(closestWall && this.store.energy >= 750) {
            this.repair(closestWall);
        }
};

