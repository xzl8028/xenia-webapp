// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getConfig} from 'xenia-redux/selectors/entities/general';
import {getUser, getStatusForUserId} from 'xenia-redux/selectors/entities/users';

import PostProfilePicture from './post_profile_picture';

function mapStateToProps(state, ownProps) {
    const config = getConfig(state);
    const user = getUser(state, ownProps.userId);

    return {
        enablePostIconOverride: config.EnablePostIconOverride === 'true',
        hasImageProxy: config.HasImageProxy === 'true',
        status: getStatusForUserId(state, ownProps.userId),
        isBot: Boolean(user && user.is_bot),
        user,
    };
}

export default connect(mapStateToProps)(PostProfilePicture);
