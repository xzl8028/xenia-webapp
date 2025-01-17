// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getCurrentUser} from 'xenia-redux/selectors/entities/users';

import AdminSidebarHeader from './admin_sidebar_header.jsx';

function mapStateToProps(state) {
    return {
        currentUser: getCurrentUser(state),
    };
}

export default connect(mapStateToProps)(AdminSidebarHeader);
