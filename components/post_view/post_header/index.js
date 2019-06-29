// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {getConfig} from 'xenia-redux/selectors/entities/general';
import {getUser} from 'xenia-redux/selectors/entities/users';

import PostHeader from './post_header.jsx';

function mapStateToProps(state, ownProps) {
    const config = getConfig(state);
    const enablePostUsernameOverride = config.EnablePostUsernameOverride === 'true';
    const user = getUser(state, ownProps.post.user_id);
    const isBot = Boolean(user && user.is_bot);

    return {
        enablePostUsernameOverride,
        isBot,
    };
}

export default connect(mapStateToProps)(PostHeader);
