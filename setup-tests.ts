import * as td from 'testdouble';
import * as tdjest from 'testdouble-jest'

tdjest(td, jest);

afterEach(()=>{
  td.reset();
});
