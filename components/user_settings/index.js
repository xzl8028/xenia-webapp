// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {getCurrentUser} from 'xenia-redux/selectors/entities/users';

import UserSettings from './user_settings.jsx';

function mapStateToProps(state) {
    return {
        user: getCurrentUser(state),
    };
}

export default connect(mapStateToProps)(UserSettings);
