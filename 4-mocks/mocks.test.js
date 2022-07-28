
// let's say we define a function in our code
// and throughout our code, we use that function in many different ways
// we call it a few times with no arguments, we call it a few more times with different arguments, we nest it as a callback a few times, we use it a ton in our code

// wouldn't it be nice if we had a way to store all those different arguments that were passed into that function in the code? Or maybe how many times in total it was called in the code? That would be good information to have access to
// this is where jest.fn() comes in handy

// if we write a function like this, like we always have, we won't have access to any of the information regarding it's use throughout our code
const untrackedFunction = function(arg1, arg2) {
    console.log(arg1)
    console.log(arg2)
}

untrackedFunction(2, 7)
untrackedFunction(true, 100)
untrackedFunction('this is a string', [3, 8, 10])
// where on earth do we store the fact that this function was called three times?
// when on earth do we store the fact that this function had arguments 2 and 7 when it was called first?
// all this information is untracked this way



// if we define a function using jest.fn() , we get access to all this information
const trackedFunction = jest.fn(function(arg1, arg2) {
    console.log(arg1)
    console.log(arg2)
})

trackedFunction(2, 7)
trackedFunction(true, 100)
trackedFunction('this is a string', [3, 8, 10])


describe('trackedFunction', () => {
    
    it('trackedFunction should have been called', () => {
        expect(trackedFunction).toBeCalled()
    });
    
    it('trackedFunction should have been called exactly 3 times', () => {
        expect(trackedFunction).toBeCalledTimes(3)
    });
    
    it('trackedFunction should have been called with the arguments 2 and 7', () => {
        expect(trackedFunction).toBeCalledWith(2, 7) // it won't tell you which function call was the one where 2 and 7 were passed into it, but it will tell you if that in fact did happen
    });
    
    it('trackedFunction should have been called with the arguments true and 100', () => {
        expect(trackedFunction).toBeCalledWith(true, 100) // it won't tell you which function call was the one where true and 100 were passed into it, but it will tell you if that in fact did happen
    });



    // after all the relevant unit tests, all information regarding that function, like how many times it was used, what arguments were passed into it, all that should be cleared, otherwise it will be held in that object forever!
    // sometimes it is cleared after each individual unit test, in this case it makes more sense to do it once at the end, but sometimes it makes more sense to clear it after each unit test
    afterAll(() => {
        jest.clearAllMocks()
    })
    
});



// we can also check if a function wasn't called 3 times, if a function wasn't called at all, if a function wasn't called with the arguments 2 and 7
// we just need to use .not

const helloFunction = jest.fn(function() {
    console.log('hello there')
})

const x = 30;

if(x === 29) {
    helloFunction()
} else {
    console.log('helloFuntion was not called')
}

it('helloFunction should not have been called', () => {
    expect(helloFunction).not.toBeCalled()
});



// each function created using jest.fn() has the .mock property
// this .mock property is itself an object that has a bunch of data associated with the function it's being attached to

// defining a function using jest.fn()
const greetingFunction = jest.fn(name => `Hi there ${name}`)

// calling the function 3 times
console.log(greetingFunction('Jimmy'))
console.log(greetingFunction('Hugh'))
console.log(greetingFunction('Pratik'))



console.log(greetingFunction.mock) // as you can see, this is an object with some helpful properties
console.log(greetingFunction.mock.calls) // this is an array that has arrays inside of it. These arrays contain the arguments passed into the function each time it was called
// [ ['Jimmy'], ['Hugh'], ['Pratik'] ]



// exploring more features of .mock
describe('exploring features of .mock', () => {

    it('goodbyeFunction should have been called twice', () => {
       
        const goodbyeFunction = jest.fn(name => {
            return `Goodbye ${name}`
        })
    
        goodbyeFunction('Hugh')
        goodbyeFunction('Xavier')
    
        // use .mock.calls.length for how many times the function has been called
        expect(goodbyeFunction.mock.calls.length).toBe(2)
    
    });
    
    it('goodbyeFunction should have had certain arguments when it was called', () => {
    
        const goodbyeFunction = jest.fn(name => {
            return `Goodbye ${name}`
        })
    
        goodbyeFunction('Hugh')
        goodbyeFunction('Xavier')

        // can also access the arguments passed in of a specific instance of when the function was called
        // the reason it's [0][0] instead of just [0] is because it's ['Hugh'] not just 'Hugh'
        expect(goodbyeFunction.mock.calls[0][0]).toBe('Hugh')
        expect(goodbyeFunction.mock.calls[1][0]).toBe('Xavier')
    
    });

    it('goodbyeFunction should have certain returned values', () => {
    
        const goodbyeFunction = jest.fn(name => {
            return `Goodbye ${name}`
        })
    
        goodbyeFunction('Hugh')
        goodbyeFunction('Xavier')

        // can also access the returned values of a specific instance of when the function was called
        // goodbyeFunction.mock.results is an array on objects, one object for each time the function was called

        //  results: [
        //     { type: 'return', value: 'Goodbye Hugh' },
        //     { type: 'return', value: 'Goodbye Xavier' }
        //   ]
        expect(goodbyeFunction.mock.results[0].value).toBe('Goodbye Hugh')
        expect(goodbyeFunction.mock.results[1].value).toBe('Goodbye Xavier')
    
    });

});



// mocking the return value of a function/method
// you can imagine that if we had a fetch call to a web API, that usually costs money, and if you're a company, you probably wouldn't want to be paying a fee for testing a fetch function, you would probably only want to pay for actual fetch calls needed for the client
// in this case, we can just mock the return value of a fetch call or any function
it('should mock return value of function', () => {
    // let's say we're dealing with a fetch call to a weather API, instead of actually creating a function the returns the fetched data, let's just create a function that mocks that return value
    const fetchCityTemp = jest.fn()

    // so the next time we call fetchCityTemp() , it will return the object we specified
    // we are just setting it up here for the next time fetchCityTemp is called
    fetchCityTemp.mockReturnValueOnce({city: 'Melbourne', tempDegrees: 16})

    const melbourneData = fetchCityTemp()

    expect(melbourneData).toEqual({city: 'Melbourne', tempDegrees: 16})


    // you can chain as many as you want
    fetchCityTemp.mockReturnValueOnce({city: 'Gold Coast', tempDegrees: 19}).mockReturnValueOnce({city: 'Sydney', tempDegrees: 13}).mockReturnValueOnce({city: 'Cairns', tempDegrees: 20})

    expect(fetchCityTemp()).toEqual({city: 'Gold Coast', tempDegrees: 19})
    expect(fetchCityTemp()).toEqual({city: 'Sydney', tempDegrees: 13})
    expect(fetchCityTemp()).toEqual({city: 'Cairns', tempDegrees: 20})

});



// jest.spyOn()
// this is very similar to jest.fn() , the only difference is that we used jest.fn() to access information regarding a function, here we use jest.spyOn() to access information regarding a METHOD OF AN OBJECT, so a specific case of function

const ishanObject = {
    firstName: 'Ishan',
    lastName: 'Wijesingha',
    job: 'Developer',
    calcAge: birthYear => 2022 - birthYear  
}

it('should access information about ishanObject.calcAge', () => {
    
    // the first argument is the object, the second argument is the method of that object
    const trackedCalcAgeFunction = jest.spyOn(ishanObject, 'calcAge')

    // we can now mock the return value of this object method just like we did before
    trackedCalcAgeFunction.mockReturnValueOnce(22)
    expect(trackedCalcAgeFunction()).toBe(22)

    // we can access information about this object method just like we did above
    trackedCalcAgeFunction(2001)
    trackedCalcAgeFunction(2007)
    trackedCalcAgeFunction(1990)

    console.log(trackedCalcAgeFunction.mock)
    console.log(trackedCalcAgeFunction.mock.calls)
    console.log(trackedCalcAgeFunction.mock.results)
    console.log(trackedCalcAgeFunction.mock.lastcall)

});

















