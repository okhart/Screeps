var harvester_number = Memory.harvester;
var upgrader_number = Memory.upgrader;
var builder_number = Memory.builder;
var repairer_number = Memory.repairer;
var towerCharger_number = Memory.towerCharger;
StructureSpawn.prototype.spawnCreepIfNecessary = 
    function() {
        
        
//Need Harvesters
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if(harvesters.length < 4) {
            var newName = 'Harvester-' + Memory.harvester;
            if(Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], newName, 
                {memory: {role: 'harvester'}}) == OK)
            {
                console.log('Spawn Harvester-' + Memory.harvester + '. Total: ' + (harvesters.length + 1));
                Memory.harvester++;
            }
        }
        
        
//Need Upgraders
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        if(upgraders.length < 3 && harvesters.length > 0) {
            var newName = 'Upgrader-' + Memory.upgrader;
            if(Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, 
                {memory: {role: 'upgrader'}}) == OK)
            {
                console.log('Spawn Upgrader-' + Memory.upgrader + '. Total: ' + (upgraders.length + 1));
                Memory.upgrader++;
            }
        }

//Need Builders
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var number_of_sites = this.room.find(FIND_CONSTRUCTION_SITES).length;
        if(number_of_sites > 0 && builders.length < number_of_sites && builders.length < 3)
        {
            var newName = 'Builder-' + Memory.builder;
            if(Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName, 
                {memory: {role: 'builder'}}) == OK)
                {
                    console.log('Spawn Builder-' + Memory.builder + '. Total: ' + (builders.length + 1));
                    Memory.builder++;
                }
        }
        

      

//Need Repairers
        var towers = this.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER);
                    }
                });
        if(towers.length == 0)
        {
            var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
            if(repairers.length < 1)
            {
                var newName = 'Repairer-' + Memory.repairer;
                if(Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, 
                    {memory: {role: 'repairer'}}) == OK)
                {
                    console.log('Spawn Repairer-' + Memory.repairer + '. Total: ' + (repairers.length + 1));
                    Memory.repairer++;
                }
            }
        }
    
    
    
//Need Tower Chargers
        var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
        if(towers.length > 0)
        {
            var chargers = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerCharger');
            if(chargers.length < 1)
            {
                var newName = 'TowerCharger-' + Memory.towerCharger;
                if(Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, 
                    {memory: {role: 'towerCharger'}}) == OK)
                {
                    console.log('Spawn Tower Charger-' + Memory.towerCharger + '. Total: ' + (chargers.length + 1));
                    Memory.towerCharger++;
                }
            }
        }
    }
    
//Need Soldiers
    var hostiles = _.filter(Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS));
    var soldiers = _.filter(Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS, {filter: {memory: {role: 'soldier'}}}));
    if(soldiers.length < hostiles.length)
    {
        var newName = 'Soldier-' + Memory.soldier;
        if(Game.spawns['Spawn1'].spawnCreep([RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE], newName, 
                    {memory: {role: 'soldier'}}) == OK)
                {
                    console.log('Spawn Soldier-' + Memory.soldier + '. Total: ' + (soldiers.length + 1) + '. Hail to the King!');
                    Memory.soldier++;
                }
    }
