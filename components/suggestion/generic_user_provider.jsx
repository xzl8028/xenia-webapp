// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {Client4} from 'xenia-redux/client';

import {autocompleteUsers} from 'actions/user_actions.jsx';
import * as Utils from 'utils/utils.jsx';

import BotBadge from 'components/widgets/badges/bot_badge.jsx';

import Provider from './provider.jsx';
import Suggestion from './suggestion.jsx';

class UserSuggestion extends Suggestion {
    render() {
        const {item, isSelection} = this.props;

        let className = 'suggestion-list__item mentions__name';
        if (isSelection) {
            className += ' suggestion--selected';
        }

        const username = item.username;
        let description = '';

        if ((item.first_name || item.last_name) && item.nickname) {
            description = `- ${Utils.getFullName(item)} (${item.nickname})`;
        } else if (item.nickname) {
            description = `- (${item.nickname})`;
        } else if (item.first_name || item.last_name) {
            description = `- ${Utils.getFullName(item)}`;
        }

        return (
            <div
                className={className}
                onClick={this.handleClick}
                {...Suggestion.baseProps}
            >
                <img
                    alt={''}
                    className='admin-setting-user__image'
                    src={Client4.getUsersRoute() + '/' + item.id + '/image?_=' + (item.last_picture_update || 0)}
                />
                <span className='admin-setting-user--align'>
                    {'@' + username}
                </span>
                <BotBadge show={Boolean(item.is_bot)}/>
                <span className='admin-setting-user__fullname'>
                    {' '}
                    {description}
                </span>
            </div>
        );
    }
}

export default class UserProvider extends Provider {
    handlePretextChanged(pretext, resultsCallback) {
        const normalizedPretext = pretext.toLowerCase();
        this.startNewRequest(normalizedPretext);

        autocompleteUsers(
            normalizedPretext,
            (data) => {
                if (this.shouldCancelDispatch(normalizedPretext)) {
                    return;
                }

                const users = Object.assign([], data.users);

                resultsCallback({
                    matchedPretext: normalizedPretext,
                    terms: users.map((user) => user.username),
                    items: users,
                    component: UserSuggestion,
                });
            }
        );

        return true;
    }
}
