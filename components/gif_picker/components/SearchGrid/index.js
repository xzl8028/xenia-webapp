// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {saveSearchScrollPosition} from 'xenia-redux/actions/gifs';

import SearchGrid from './SearchGrid';

function mapStateToProps(state) {
    return {
        ...state.entities.gifs.cache,
        ...state.entities.gifs.search,
        appProps: state.entities.gifs.app,
    };
}

function mapDispatchToProps() {
    return {
        saveSearchScrollPosition,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchGrid);
