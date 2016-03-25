var spyOn = function (func) {
    var callCount = 0,
        callVals  = [],
        retVals   = [];
    var spy = function () {
        var args = [].slice.call(arguments);
        var retVal = func.apply(func, args);

        //store result of applying function
        retVals.push(retVal);

        // add arguments array values to called values array
        callVals = callVals.concat(args);

        //increment function call count by 1
        callCount++;

        //return the result of the function call
        return retVal;

    };

    spy.getCallCount;
    spy.wasCalledWith;
    spy.returned;

    return spy;
};