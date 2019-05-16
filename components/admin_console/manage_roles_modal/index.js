// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateUserRoles} from 'xenia-redux/actions/users';

import ManageRolesModal from './manage_roles_modal.jsx';

function mapStateToProps(state) {
    return {
        userAccessTokensEnabled: state.entities.admin.config.ServiceSettings.EnableUserAccessTokens,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            updateUserRoles,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRolesModal);
