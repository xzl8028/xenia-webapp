// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getConfig} from 'xenia-redux/selectors/entities/general';
import {resetUserPassword} from 'xenia-redux/actions/users';

import PasswordResetForm from './password_reset_form';

const mapStateToProps = (state) => {
    const {SiteName: siteName} = getConfig(state);
    return {siteName};
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        resetUserPassword,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetForm);
