// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAudits} from 'xenia-redux/actions/admin';
import * as Selectors from 'xenia-redux/selectors/entities/admin';
import {getLicense} from 'xenia-redux/selectors/entities/general';

import Audits from './audits.jsx';

function mapStateToProps(state) {
    const license = getLicense(state);
    const isLicensed = license.Compliance === 'true';

    return {
        isLicensed,
        audits: Object.values(Selectors.getAudits(state)),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getAudits,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Audits);
