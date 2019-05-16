// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getConfig} from 'xenia-redux/selectors/entities/general';
import {isCurrentChannelReadOnly} from 'xenia-redux/selectors/entities/channels';
import {getProfilesInCurrentChannel, getCurrentUserId} from 'xenia-redux/selectors/entities/users';
import {get} from 'xenia-redux/selectors/entities/preferences';

import {Preferences} from 'utils/constants.jsx';
import {getCurrentLocale} from 'selectors/i18n';

import ChannelIntroMessage from './channel_intro_message.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);
    const enableUserCreation = config.EnableUserCreation === 'true';
    const isReadOnly = isCurrentChannelReadOnly(state);

    return {
        currentUserId: getCurrentUserId(state),
        locale: getCurrentLocale(state),
        channelProfiles: getProfilesInCurrentChannel(state),
        enableUserCreation,
        isReadOnly,
        fullWidth: get(state, Preferences.CATEGORY_DISPLAY_SETTINGS, Preferences.CHANNEL_DISPLAY_MODE, Preferences.CHANNEL_DISPLAY_MODE_DEFAULT) === Preferences.CHANNEL_DISPLAY_MODE_FULL_SCREEN,
    };
}

export default connect(mapStateToProps)(ChannelIntroMessage);
