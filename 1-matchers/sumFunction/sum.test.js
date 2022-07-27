
// the name of this test file must be the exact same as the js file it's testing



const {sumFunction} = require('./sum.js')



// tests must exist inside a test block

// it() is a unit test
// the first argument of it() is a name describing the test
// the second argument is a callback
it("should add 1 + 2 to equal 3", () => {
    // this is the result we get when we use the function
    const result = sumFunction(1, 2)

    // what we are expecting is 3, and we're going to test this expectation using an assertion
    // this is an assertion
    expect(result).toBe(3)
})



// we can group common unit tests together in a describe block
// the describe block isn't a test itself, it's just a way of grouping unit tests together
describe('example tests', () => {

    // for objects and arrays, it's better to use toEqual() , because {} === {} and [] === [] returns false
    it('object assignment', () => {
        const object1 = {}
        expect(object1).toEqual({})
    })

})



// matchers that deal with truthy or falsy values
// can use toBeTruthy and toBeFalsy
// can also get the opposite by using expect().not.tobeTruthy()
describe('check if something is truthy or falsy', () => {

    it('should be falsy', () => {
        const n = null;
        expect(n).toBeFalsy()
        expect(n).not.toBeTruthy()

        // you can have as many expect()'s as you want but it's recommended to only have one in a single unit test
        // if any of them fail, the entire unit test fails
    });
});

// there are a lot of other matchers, to check them out look at the jest documentation
// .toBeNull()
// .toBeUndefined



// matchers involving numbers
describe('numbers', () => {
    
    // check inequalities of numbers
    it('testing inequality', () => {
        const num = 2 + 2;
        expect(num).toBeGreaterThan(1)
        expect(num).toBeGreaterThanOrEqual(4)
        expect(num).toBeLessThan(8)
        expect(num).toBeLessThanOrEqual(4)
    });

    // matchers involving floats
    it('testing floats', () => {

        // check if a number is close enough (comes in handy for coding)
        const value1 = 3
        expect(value1).toBeCloseTo(2.99999999) // will pass

    })
    
});



// matchers involving strings
describe('strings', () => {

    // check if string includes a character
    it('the word ISHAN should contain S', () => {
        expect('ISHAN').toMatch(/S/)
    })
});



// matchers involving arrays
describe('arrays', () => {
    const namesArray = ['Ishan', 'Jimmy', 'Pratik', 'Hugh', 'Xavier']

    // check if array contains a certain element
    expect(namesArray).toContain('Hugh') // this will pass
});



