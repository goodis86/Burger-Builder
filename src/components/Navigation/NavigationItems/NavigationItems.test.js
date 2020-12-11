import React from 'react';

import { configure, shallow } from 'enzyme';  
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});        // this is how we connect enzyme to our project!

describe('<NavigationItems />', () => {     //discribes our test, 1arg - name of our test, 2nd arg - function.  //in console this will be called TEST SUITE
    it('should render 2 <NavigationItem/> elements if not authenticated!', () => {    //it() allows to write 1 indivisual test, takes 2 args
        const wrapper = shallow(<NavigationItems/>);  // shallow allows to render our element in shallow mode => not render all material inside nested elements!!
        expect(wrapper.find(NavigationItem)).toHaveLength(2);  // we expect here to find our NavigationItem twice!!!
    
    });     
    // it() function is the actual test and is shown as test in console after running tests!
    it('should render 3 <NavigationItem/> elements if authenticated!', () => {    // another indivisual test which is in our test suite.....our describe()
        const wrapper = shallow(<NavigationItems isAuthenticated/>);  // here we simply create props isAuthenticated for our element and by default it's true
        expect(wrapper.find(NavigationItem)).toHaveLength(3); 
    
    });     



});

// here Enzyme lets us to render just this individual element alone, without the rest of our app!!!!!!!!
// that's the reason we use Enzyme....to write isolated tests, unit tests...


// to run our test files we type: npm test   , and it runs all files with test.js extension