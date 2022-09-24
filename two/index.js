/*
This project is a cooking project.
The goal is to get the expected amount of time it will take to cook lasagna.
*/

const EXPECT_MINUTES_IN_OVEN = 40;

function remainingMinutesInOven(acutalMinutesInOven){
    return expect_minutes_in_oven -acutalMinutesInOven;
}

function preparationTimeInMinutes(numberOfLayers){
    return numberOfLayers * 2;
}

function totalTimeInMinutes(numberOfLayers, acutalMinutesInOven){
    return remainingMinutesInOven(acutalMinutesInOven) + preparationTimeInMinutes(numberOfLayers);
}