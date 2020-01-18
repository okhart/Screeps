require('prototype.creep');
require('prototype.spawn');
require('prototype.tower');

module.exports.loop = function () {
    
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];    //Delete unneccecary memory
        }
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        creep.runRole();
    }
    for(var spawnName in Game.spawns)
    {
        Game.spawns[spawnName].spawnCreepIfNecessary();
    }
    
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    // for each tower
    for (var tower of towers) {
        // run tower logic
        tower.defend();
        if(!tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS))
            tower.makeRepair(50000);
    }
  //  Game.creeps['Claimer'].moveTo(Game.flags.Flag2);
}
