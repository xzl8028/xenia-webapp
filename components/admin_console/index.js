// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getConfig, getEnvironmentConfig} from 'xenia-redux/actions/admin';
import {loadRolesIfNeeded, editRole} from 'xenia-redux/actions/roles';
import * as Selectors from 'xenia-redux/selectors/entities/admin';
import {withRouter} from 'react-router-dom';
import {getConfig as getGeneralConfig, getLicense} from 'xenia-redux/selectors/entities/general';
import {getRoles} from 'xenia-redux/selectors/entities/roles';
import {isCurrentUserSystemAdmin} from 'xenia-redux/selectors/entities/users';

import {setNavigationBlocked, deferNavigation, cancelNavigation, confirmNavigation} from 'actions/admin_actions.jsx';
import {getNavigationBlocked, showNavigationPrompt} from 'selectors/views/admin';

import AdminConsole from './admin_console.jsx';

function mapStateToProps(state) {
    const generalConfig = getGeneralConfig(state);
    const buildEnterpriseReady = generalConfig.BuildEnterpriseReady === 'true';

    return {
        config: Selectors.getConfig(state),
        environmentConfig: Selectors.getEnvironmentConfig(state),
        license: getLicense(state),
        buildEnterpriseReady,
        navigationBlocked: getNavigationBlocked(state),
        showNavigationPrompt: showNavigationPrompt(state),
        isCurrentUserSystemAdmin: isCurrentUserSystemAdmin(state),
        roles: getRoles(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getConfig,
            getEnvironmentConfig,
            setNavigationBlocked,
            deferNavigation,
            cancelNavigation,
            confirmNavigation,
            loadRolesIfNeeded,
            editRole,
        }, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminConsole));
