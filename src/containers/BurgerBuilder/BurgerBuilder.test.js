//EXAMPLE OF TESTING A CONTAINER BY STRIPPING OUT COMPONENTS OUT OF IT ESSENTIALLY!!!
//WE CAN EASILY TEST NOW OUR COMPONENT USING ALL POWER OF OUR JEST AND ENZYME WITHOUT TOUCHING THE
//THIRD PARTY PACKAGES AS REDUX IN OUR CASE...


import React from 'react';

import { configure, shallow } from 'enzyme';  
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});  

describe('<BurgerBuilder/> ', () => {
    
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients = {() => {}}/>);
    });

    it('should render <BuildControls/> when receiving ingredients', () => {
        wrapper.setProps({ings: {salad: 0} });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })


} );