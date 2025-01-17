// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {getConfig} from 'xenia-redux/selectors/entities/general';

import PostImage from './post_image.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);
    const hasImageProxy = config.HasImageProxy === 'true';

    return {
        hasImageProxy,
    };
}

export default connect(mapStateToProps)(PostImage);
