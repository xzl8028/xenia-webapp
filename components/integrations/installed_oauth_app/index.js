// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {getUser} from 'xenia-redux/selectors/entities/users';

import {getDisplayNameByUser} from 'utils/utils';

import InstalledOAuthApp from './installed_oauth_app.jsx';

function mapStateToProps(state, ownProps) {
    const oauthApp = ownProps.oauthApp || {};
    return {
        creatorName: getDisplayNameByUser(getUser(state, oauthApp.creator_id)),
    };
}

export default connect(mapStateToProps)(InstalledOAuthApp);
