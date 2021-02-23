var _startingPositionZ = 1000;
var roads_count = 0;
var car_roads_count = 0;
var platforms_count = 0;
/**  @params roadMap: 1 = road, 0 = Resting Ground */
var roadsMap = [];
function updateLevel(){
    if(getPlayerPosition() >= roadsMap.length - 12){
        genereateLevel();
    }
}
function genereateLevel(){
    let platform_c=0;
    let roads_c=0;
    let generate_count = 15;
    for(let i = 0; i< generate_count; i++){
        clearScene();
        var x = Math.round(Math.random() + 0.2);

        if(x > 1) x=1;
        //Check if 3 consecutive roads, add a platform if so
        if(i==0 || (roadsMap[roads_count+i-1]==1&&roadsMap[roads_count+i-2]==1&&roadsMap[roads_count+i-3]==1)) x=0;
        if((roadsMap[roads_count+i-1]==0&&roadsMap[roads_count+i-2]==0&&roadsMap[roads_count+i-3]==0)) x=1;
        if(x==0) platform_c++; else roads_c++;
        roadsMap.push(x);
    }
    createRoads(_startingPositionZ);
    createPlatforms(_startingPositionZ);
    _startingPositionZ -=600*generate_count;
    roads_count+=generate_count;
    platforms_count+=platform_c;
    car_roads_count+=roads_c;
}

function clearScene(){
    for(let i = 0; i<trees.length; i++){
        if(-PLAYER.position.z + trees[i].position.z >= 600*5){
            removeTree(trees[i]);
        }
    }
    for(let i = 0; i<coins.length; i++){
        if(-PLAYER.position.z + coins[i].position.z >= 600*5){
            removeCoin(coins[i]);
        }
    }
    for(let i = 0; i<roads.length; i++){
        if(-PLAYER.position.z + roads[i].road.position.z >= 600*5){
            removeRoad(roads[i]);
        }
    }
    for(let i = 0; i<platforms.length; i++){
        if(-PLAYER.position.z + platforms[i].position.z >= 600*5){
            removePlatform(platforms[i]);
        }
    }
}