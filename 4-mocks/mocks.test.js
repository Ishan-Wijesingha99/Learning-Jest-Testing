
// what is a mock?
// it's a fake object that holds information about mock functions

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





