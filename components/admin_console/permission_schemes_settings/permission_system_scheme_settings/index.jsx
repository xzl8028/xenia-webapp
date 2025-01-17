// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {loadRolesIfNeeded, editRole} from 'xenia-redux/actions/roles';

import {getRoles} from 'xenia-redux/selectors/entities/roles';

import {setNavigationBlocked} from 'actions/admin_actions.jsx';

import PermissionSystemSchemeSettings from './permission_system_scheme_settings.jsx';

function mapStateToProps(state) {
    return {
        roles: getRoles(state),
        rolesRequest: state.requests.roles.getRolesByNames,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadRolesIfNeeded,
            editRole,
            setNavigationBlocked,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PermissionSystemSchemeSettings);
