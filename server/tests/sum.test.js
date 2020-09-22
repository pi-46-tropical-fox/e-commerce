const sum = require('../helpers/sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(1, 2)).not.toBe(10);
  
});


test('test untuk object assignment', ()=> {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});  
})

test('test untuk object assignment', ()=> {
    const user = {name : 'imam'};
    user['gender'] = 'male';
    expect(user).toEqual({name: 'imam', gender: 'male'}); 
    expect(user).not.toEqual({name: 'imam', gender: 'female'});  
    expect(user['gender']).toBe('male');
})

test('Test 1 is true', ()=> {
    const number1 = 1

    expect(number1).toBeTruthy()  
    expect(number1).not.toBeFalsy()  
})

test('test string regex', ()=> {
    const sentence1 = 'hubahubahuuu huhu hubahuba'

    expect(sentence1).toMatch(/huhu/)
    expect(sentence1).toMatch(/mantap/)
})