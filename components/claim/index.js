// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {switchLdapToEmail} from 'xenia-redux/actions/users';
import {getConfig} from 'xenia-redux/selectors/entities/general';

import {getPasswordConfig} from 'utils/utils.jsx';

import ClaimController from './claim_controller.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);
    const siteName = config.SiteName;
    const ldapLoginFieldName = config.LdapLoginFieldName;

    return {
        siteName,
        ldapLoginFieldName,
        passwordConfig: getPasswordConfig(config),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            switchLdapToEmail,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimController);
