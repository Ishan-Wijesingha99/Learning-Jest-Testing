
const {errorFunction} = require('./errorFunction.js')

// exceptions
// this basically tests errors
describe('exceptions', () => {

    it("errorFunction should through Error", () => {

        expect(() => errorFunction()).toThrow() // this will pass the test because the errorFunction will throw an error

        // we can also check if the function throws a SPECIFIC error, write the specific string inside
        expect(() => errorFunction()).toThrow('this is an error')
    })

});



// there are plenty of other matchers in Jest, you can read about them in the documentation, this is just a basic overview
