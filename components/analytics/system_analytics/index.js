// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {getLicense} from 'xenia-redux/selectors/entities/general';

import SystemAnalytics from './system_analytics.jsx';

function mapStateToProps(state) {
    const license = getLicense(state);
    const isLicensed = license.IsLicensed === 'true';

    return {
        isLicensed,
        stats: state.entities.admin.analytics,
    };
}

export default connect(mapStateToProps)(SystemAnalytics);
