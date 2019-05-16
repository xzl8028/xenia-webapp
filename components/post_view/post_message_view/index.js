// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {Preferences} from 'xenia-redux/constants';
import {getTheme, getBool} from 'xenia-redux/selectors/entities/preferences';

import {getIsRhsExpanded, getIsRhsOpen} from 'selectors/rhs';

import PostMessageView from './post_message_view.jsx';

function mapStateToProps(state) {
    return {
        enableFormatting: getBool(state, Preferences.CATEGORY_ADVANCED_SETTINGS, 'formatting', true),
        isRHSExpanded: getIsRhsExpanded(state),
        isRHSOpen: getIsRhsOpen(state),
        pluginPostTypes: state.plugins.postTypes,
        theme: getTheme(state),
    };
}

export default connect(mapStateToProps)(PostMessageView);
