var roles = {
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    repairer: require('role.repairer'),
    towerCharger: require('role.towerCharger'),
    soldier: require('role.soldier'),
    saboteur: require('role.saboteur'),
    claimer: require('role.claimer')
};

Creep.prototype.runRole = function() {
    roles[this.memory.role].run(this);
};

Creep.prototype.getEnergy = function()
{
    if(this.memory.role == 'harvester')
    {
        var target = this.pos.findClosestByPath(FIND_DROPPED_RESOURCES);                    //Look for drop
        if(this.pickup(target) == ERR_NOT_IN_RANGE)
            {
                this.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        if(!target)                                                                         //If no drop, then harvest
        {
            target = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(this.harvest(target) == ERR_NOT_IN_RANGE)
            {
                this.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
    
    if(this.memory.role == 'upgrader' || 
        this.memory.role == 'builder' || 
        this.memory.role == 'repairer' ||
        this.memory.role == 'towerCharger')
    {
        var closestSource = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        var closestContainer = this.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => 
                    {
                        return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0);
                    }
        });
        
        if(this.pos.getRangeTo(closestSource) + 20 > this.pos.getRangeTo(closestContainer)) //Calculate which target is preferable
        {
           // console.log(this.pos.getRangeTo(closestSource + 10) )
            var target = closestContainer;
            if(this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            {
                this.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else
        {
            var target = closestSource;
            if(this.harvest(target) == ERR_NOT_IN_RANGE)
            {
                this.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};
