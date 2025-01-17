// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {shallow} from 'enzyme';

import MenuItemAction from 'components/widgets/menu/menu_items/menu_item_action.jsx';

import ViewPinnedPosts from './view_pinned_posts';

describe('components/ChannelHeaderDropdown/MenuItem.ViewPinnedPosts', () => {
    const baseProps = {
        channel: {
            id: 'channel_id',
        },
        hasPinnedPosts: true,
        actions: {
            closeRightHandSide: jest.fn(),
            showPinnedPosts: jest.fn(),
        },
    };

    it('should match snapshot', () => {
        const wrapper = shallow(<ViewPinnedPosts {...baseProps}/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('should runs closeRightHandSide function if has any pinned posts', () => {
        const wrapper = shallow(<ViewPinnedPosts {...baseProps}/>);

        wrapper.find(MenuItemAction).simulate('click', {
            preventDefault: jest.fn(),
        });

        expect(baseProps.actions.closeRightHandSide).toHaveBeenCalled();
    });

    it('should runs showPinnedPosts function if has not pinned posts', () => {
        const props = {
            ...baseProps,
            hasPinnedPosts: false,
        };
        const wrapper = shallow(<ViewPinnedPosts {...props}/>);

        wrapper.find(MenuItemAction).simulate('click', {
            preventDefault: jest.fn(),
        });

        expect(baseProps.actions.showPinnedPosts).toHaveBeenCalled();
    });
});
