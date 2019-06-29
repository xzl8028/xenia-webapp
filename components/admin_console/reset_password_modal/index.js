// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {getConfig} from 'xenia-redux/selectors/entities/general';
import {getCurrentUserId} from 'xenia-redux/selectors/entities/users';

import {getPasswordConfig} from 'utils/utils.jsx';

import ResetPasswordModal from './reset_password_modal.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);

    return {
        currentUserId: getCurrentUserId(state),
        passwordConfig: getPasswordConfig(config),
    };
}

export default connect(mapStateToProps)(ResetPasswordModal);
