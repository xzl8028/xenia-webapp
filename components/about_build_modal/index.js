// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {getConfig, getLicense} from 'xenia-redux/selectors/entities/general';

import {ModalIdentifiers} from 'utils/constants';
import {isModalOpen} from 'selectors/views/modals';

import AboutBuildModal from './about_build_modal.jsx';

function mapStateToProps(state) {
    const modalId = ModalIdentifiers.ABOUT;
    return {
        config: getConfig(state),
        license: getLicense(state),
        show: isModalOpen(state, modalId),
    };
}

export default connect(mapStateToProps)(AboutBuildModal);
