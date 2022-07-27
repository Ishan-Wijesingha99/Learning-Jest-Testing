const {fetchFunction} = require('./async.js')



// this won't work because todo.id is undefined because it takes TIME for javascript to asynchronously return the promise todo
// javascript will immediately move on to expect(todo.id).toBe(1) before has even been defined, so this unit test will fail
// it('should return correct todo data', () => {
//     const todo = fetchFunction(1);
    
//     expect(todo.id).toBe(1);
// });



// this is how we do it properly, we use async-await
it('should return correct todo data', async () => {
    const todo = await fetchFunction(1);
    
    expect(todo.id).toBe(1);
});