// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {getConfig} from 'xenia-redux/selectors/entities/general';

import GetAndroidApp from './get_android_app.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);
    const androidAppDownloadLink = config.AndroidAppDownloadLink;

    return {
        androidAppDownloadLink,
    };
}

export default connect(mapStateToProps)(GetAndroidApp);
