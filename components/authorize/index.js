// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {allowOAuth2, getOAuthAppInfo} from 'actions/admin_actions.jsx';

import Authorize from './authorize';

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getOAuthAppInfo,
            allowOAuth2,
        }, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(Authorize);
