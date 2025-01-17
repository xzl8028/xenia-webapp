// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {getConfig} from 'xenia-redux/selectors/entities/general';

import {copyToClipboard} from 'utils/utils';

import CopyUrlContextMenu from './copy_url_context_menu.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);

    return {
        siteURL: config.SiteURL,
    };
}

function mapDispatchToProps() {
    return {
        actions: {
            copyToClipboard,
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CopyUrlContextMenu);
