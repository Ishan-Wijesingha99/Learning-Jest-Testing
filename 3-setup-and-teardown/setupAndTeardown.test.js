
let animals;

// sometimes we want to initialise something before we run each unit test
// let's say we want to define an array animals = ['elephant', 'zebra', 'bear', 'tiger']
// we could define this in every unit test's callback, but then we're just repeating ourselves
// a better way is to define this array using beforeEach()
// whatever code is passed into beforeEach() will be executed before every single unit test, repeatedly
// this is called the setup
beforeEach(() => {
    console.log('before each')
    animals = ['elephant', 'zebra', 'bear', 'tiger']
})



// we can also use afterEach()
// whatever code is written in here will be executed at the end of each unit test
// this is called tearing down
afterEach(() => {
    console.log('after each')
})



// can also execute code before ALL unit tests only once
// use beforeAll()
beforeAll(() => {
    console.log('before all')
})



// we can also execute code after ALL the unit tests, only once
afterAll(() => {
    console.log('after all')
})

// the order can be whatever you want, you can put afterAll() before beforeAll() and it will work fine



describe('animals array', () => {
    
    it('should add aligator to end of array', () => {
        animals.push('aligator')
        expect(animals[animals.length - 1]).toBe('aligator')
    });

    it('should add monkey to start of array', () => {
        animals.unshift('monkey')
        expect(animals[0]).toBe('monkey')
    });

    it('animal array should have initial length of 4', () => {
        expect(animals.length).toBe(4)
    });

});



// if you want to quickly just check a single unit test, you can use it.only() and all other unit tests will be skipped



// if you put beforeEach(), afterEach(), beforeAll(), afterAll() in the global scope, they will apply to ALL unit tests, even in different describe blocks
// if you want them to only apply to certain unit tests, you put them at the start of a describe block

