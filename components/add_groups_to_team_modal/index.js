// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getGroupsNotAssociatedToTeam, linkGroupSyncable, getAllGroupsAssociatedToTeam} from 'xenia-redux/actions/groups';
import {getGroupsNotAssociatedToTeam as selectGroupsNotAssociatedToTeam} from 'xenia-redux/selectors/entities/groups';
import {getCurrentTeam} from 'xenia-redux/selectors/entities/teams';

import {setModalSearchTerm} from 'actions/views/search';

import AddGroupsToTeamModal from './add_groups_to_team_modal';

function mapStateToProps(state) {
    const searchTerm = state.views.search.modalSearch;

    const team = getCurrentTeam(state) || {};

    let groups = selectGroupsNotAssociatedToTeam(state, team.id);
    if (searchTerm) {
        var regex = RegExp(searchTerm, 'i');
        groups = groups.filter((group) => regex.test(group.display_name) || regex.test(group.name));
    }

    return {
        currentTeamName: team.display_name,
        currentTeamId: team.id,
        searchTerm,
        groups,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getGroupsNotAssociatedToTeam,
            setModalSearchTerm,
            linkGroupSyncable,
            getAllGroupsAssociatedToTeam,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupsToTeamModal);
