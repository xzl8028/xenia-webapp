// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {shallow} from 'enzyme';

import MenuItemAction from 'components/widgets/menu/menu_items/menu_item_action.jsx';

import ToggleFavoriteChannel from './toggle_favorite_channel';

describe('components/ChannelHeaderDropdown/MenuItem.ToggleFavoriteChannel', () => {
    const baseProps = {
        channel: {
            id: 'channel_id',
        },
        actions: {
            favoriteChannel: jest.fn(),
            unfavoriteChannel: jest.fn(),
        },
    };

    const propsForFavorite = {
        ...baseProps,
        isFavorite: true,
        actions: {
            favoriteChannel: jest.fn(),
            unfavoriteChannel: jest.fn(),
        },
    };

    const propsForNotFavorite = {
        ...baseProps,
        isFavorite: false,
        actions: {
            favoriteChannel: jest.fn(),
            unfavoriteChannel: jest.fn(),
        },
    };

    it('should match snapshot for favorite channel', () => {
        const wrapper = shallow(<ToggleFavoriteChannel {...propsForFavorite}/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('should runs unfavoriteChannel function for favorite channel', () => {
        const wrapper = shallow(<ToggleFavoriteChannel {...propsForFavorite}/>);

        wrapper.find(MenuItemAction).simulate('click', {
            preventDefault: jest.fn(),
        });

        expect(propsForFavorite.actions.unfavoriteChannel).toHaveBeenCalledWith(propsForFavorite.channel.id);
        expect(propsForFavorite.actions.favoriteChannel).not.toHaveBeenCalled();
    });

    it('should match snapshot for not favorite channel', () => {
        const wrapper = shallow(<ToggleFavoriteChannel {...propsForNotFavorite}/>);

        expect(wrapper).toMatchSnapshot();
    });

    it('should runs favoriteChannel function for not favorite channel', () => {
        const wrapper = shallow(<ToggleFavoriteChannel {...propsForNotFavorite}/>);

        wrapper.find(MenuItemAction).simulate('click', {
            preventDefault: jest.fn(),
        });

        expect(propsForNotFavorite.actions.favoriteChannel).toHaveBeenCalledWith(propsForFavorite.channel.id);
        expect(propsForNotFavorite.actions.unfavoriteChannel).not.toHaveBeenCalled();
    });
});
