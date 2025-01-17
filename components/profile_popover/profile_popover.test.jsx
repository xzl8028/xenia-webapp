// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import {shallowWithIntl} from 'tests/helpers/intl-test-helper.jsx';
import ProfilePopover from 'components/profile_popover/profile_popover';

describe('components/ProfilePopover', () => {
    const baseProps = {
        user: {
            name: 'some name',
            username: 'some_username',
        },
        src: 'src',
        currentUserId: '',
        currentTeamId: 'team_id',
        isChannelAdmin: false,
        isTeamAdmin: false,
        teamUrl: '',
        canManageAnyChannelMembersInCurrentTeam: true,
        actions: {
            getMembershipForCurrentEntities: jest.fn(),
            openDirectChannelToUserId: jest.fn(),
            openModal: jest.fn(),
            loadBot: jest.fn(),
        },
    };

    test('should match snapshot', () => {
        const props = {...baseProps};

        const wrapper = shallowWithIntl(
            <ProfilePopover {...props}/>
        ).dive();
        expect(wrapper).toMatchSnapshot();
    });

    test('should have bot description', () => {
        const props = {
            ...baseProps,
            user: {
                is_bot: true,
                bot_description: 'bot description',
            },
        };

        const wrapper = shallowWithIntl(
            <ProfilePopover {...props}/>
        ).dive();
        expect(wrapper.containsMatchingElement(
            <div
                key='bot-description'
            >
                {'bot description'}
            </div>
        )).toEqual(true);
    });
});
