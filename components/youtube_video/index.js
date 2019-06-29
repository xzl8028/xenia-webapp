// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {getCurrentChannelId} from 'xenia-redux/selectors/entities/channels';
import {getConfig} from 'xenia-redux/selectors/entities/general';

import YoutubeVideo from './youtube_video';

function mapStateToProps(state) {
    const config = getConfig(state);

    return {
        currentChannelId: getCurrentChannelId(state),
        googleDeveloperKey: config.GoogleDeveloperKey,
        hasImageProxy: config.HasImageProxy === 'true',
    };
}

export default connect(mapStateToProps)(YoutubeVideo);
