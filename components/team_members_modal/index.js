// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {getCurrentTeam} from 'xenia-redux/selectors/entities/teams';

import {ModalIdentifiers} from 'utils/constants';
import {isModalOpen} from 'selectors/views/modals';

import TeamMembersModal from './team_members_modal.jsx';

function mapStateToProps(state) {
    const modalId = ModalIdentifiers.TEAM_MEMBERS;
    return {
        currentTeam: getCurrentTeam(state),
        show: isModalOpen(state, modalId),
    };
}

export default connect(mapStateToProps)(TeamMembersModal);
