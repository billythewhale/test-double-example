import * as td from 'testdouble';
import { getInfo, arr2list, HillBilly } from ".";

describe('getInfo', ()=>{
  const billyBob: HillBilly = {
    name: 'Billy Bob',
    age: 17,
    hobbies: ["fiddlin'", "fishin'", "yodelin'"],
    loveInterests: ['Cousin Mary'],
  };

  const cousinMary: HillBilly = {
    name: 'Cousin Mary',
    age: 16,
  };

  test('works with all features', ()=>{
    const bio = "Biography: Billy Bob is 17 years old. Billy Bob enjoys fiddlin', fishin', and yodelin'. Billy Bob has the hots for Cousin Mary.";
    expect(getInfo(billyBob)).toEqual(bio);
  });

  test('works with only required info', ()=>{
    const bio = "Biography: Cousin Mary is 16 years old.";
    expect(getInfo(cousinMary)).toEqual(bio);
  })

  test('works with req info and hobbies only', ()=>{
    const newMary: HillBilly = {
      ...cousinMary,
      hobbies: ["yodelin'", "cookin'", "particle physics"],
    };
    const bio = "Biography: Cousin Mary is 16 years old. Cousin Mary enjoys yodelin', cookin', and particle physics.";
    expect(getInfo(newMary)).toEqual(bio);
  })

  test('works with req info and love interests only', ()=>{
    const newMary: HillBilly = {
      ...cousinMary,
      loveInterests: ['Billy Bob'],
    };
    const bio = "Biography: Cousin Mary is 16 years old. Cousin Mary has the hots for Billy Bob.";
    expect(getInfo(newMary)).toEqual(bio);
  })

  describe('using td library to automock based on Type', ()=>{
    test('works with a generic mock', ()=>{
      const newPerson: HillBilly = td.object<HillBilly>()
      const info = getInfo(newPerson);
      expect(info).toEqual('Biography: undefined is undefined years old.');
    });

    test('generic model can be extended/overridden', ()=>{
      const newPerson: HillBilly = {
        ...td.object<HillBilly>(),
        name: 'Sally Sue',
        loveInterests: ['Billy Bob'],
      };
      expect(getInfo(newPerson)).toEqual('Biography: Sally Sue is undefined years old. Sally Sue has the hots for Billy Bob.');
    });
  });
});

describe('arr2list', ()=>{
  test('turns an array of strings into a human-readable list', ()=>{
    const arr = ['lions', 'tigers', 'bears'];
    expect(arr2list(arr)).toEqual('lions, tigers, and bears'); // hit em with the oxford comma
  });
  test('makes sense with a one-member list', ()=>{
    const arr = ['lions'];
    expect(arr2list(arr)).toEqual('lions');
  });
});

