// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';

import {Permissions} from 'xenia-redux/constants';

import {emitUserLoggedOutEvent} from 'actions/global_actions.jsx';

import * as UserAgent from 'utils/user_agent.jsx';
import Constants from 'utils/constants.jsx';

import logoImage from 'images/logo.png';

import AnnouncementBar from 'components/announcement_bar';
import BackButton from 'components/common/back_button.jsx';
import LoadingScreen from 'components/loading_screen.jsx';
import SystemPermissionGate from 'components/permissions_gates/system_permission_gate';
import SiteNameAndDescription from 'components/common/site_name_and_description';
import LogoutIcon from 'components/icon/logout_icon';

import SelectTeamItem from './components/select_team_item.jsx';

const TEAMS_PER_PAGE = 200;

export default class SelectTeam extends React.Component {
    static propTypes = {
        currentUserId: PropTypes.string.isRequired,
        currentUserRoles: PropTypes.string,
        customDescriptionText: PropTypes.string,
        isMemberOfTeam: PropTypes.bool.isRequired,
        listableTeams: PropTypes.array,
        siteName: PropTypes.string,
        canCreateTeams: PropTypes.bool.isRequired,
        canManageSystem: PropTypes.bool.isRequired,
        canJoinPublicTeams: PropTypes.bool.isRequired,
        canJoinPrivateTeams: PropTypes.bool.isRequired,
        history: PropTypes.object,
        actions: PropTypes.shape({
            getTeams: PropTypes.func.isRequired,
            loadRolesIfNeeded: PropTypes.func.isRequired,
            addUserToTeam: PropTypes.func.isRequired,
        }).isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            loadingTeamId: '',
            error: null,
        };
    }

    componentDidMount() {
        this.props.actions.getTeams(0, TEAMS_PER_PAGE);
    }

    UNSAFE_componentWillMount() { // eslint-disable-line camelcase
        const {
            actions,
            currentUserRoles,
        } = this.props;

        actions.loadRolesIfNeeded(currentUserRoles.split(' '));
    }

    handleTeamClick = async (team) => {
        this.setState({loadingTeamId: team.id});

        const {data, error} = await this.props.actions.addUserToTeam(team.id, this.props.currentUserId);
        if (data) {
            this.props.history.push(`/${team.name}/channels/${Constants.DEFAULT_CHANNEL}`);
        } else if (error) {
            this.setState({
                error,
                loadingTeamId: '',
            });
        }
    };

    handleLogoutClick = (e) => {
        e.preventDefault();
        emitUserLoggedOutEvent('/login');
    };

    clearError = (e) => {
        e.preventDefault();

        this.setState({
            error: null,
        });
    };

    render() {
        const {
            canManageSystem,
            customDescriptionText,
            isMemberOfTeam,
            listableTeams,
            siteName,
            canCreateTeams,
            canJoinPublicTeams,
            canJoinPrivateTeams,
        } = this.props;

        let openContent;
        if (this.state.loadingTeamId) {
            openContent = <LoadingScreen/>;
        } else if (this.state.error) {
            openContent = (
                <div className='signup__content'>
                    <div className={'form-group has-error'}>
                        <label className='control-label'>{this.state.error.message}</label>
                    </div>
                </div>
            );
        } else {
            let joinableTeamContents = [];
            listableTeams.forEach((listableTeam) => {
                if ((listableTeam.allow_open_invite && canJoinPublicTeams) || (!listableTeam.allow_open_invite && canJoinPrivateTeams)) {
                    joinableTeamContents.push(
                        <SelectTeamItem
                            key={'team_' + listableTeam.name}
                            team={listableTeam}
                            onTeamClick={this.handleTeamClick}
                            loading={this.state.loadingTeamId === listableTeam.id}
                            canJoinPublicTeams={canJoinPublicTeams}
                            canJoinPrivateTeams={canJoinPrivateTeams}
                        />
                    );
                }
            });

            if (joinableTeamContents.length === 0 && (canCreateTeams || canManageSystem)) {
                joinableTeamContents = (
                    <div className='signup-team-dir-err'>
                        <div>
                            <FormattedMessage
                                id='signup_team.no_open_teams_canCreate'
                                defaultMessage='No teams are available to join. Please create a new team or ask your administrator for an invite.'
                            />
                        </div>
                    </div>
                );
            } else if (joinableTeamContents.length === 0) {
                joinableTeamContents = (
                    <div className='signup-team-dir-err'>
                        <div>
                            <SystemPermissionGate permissions={[Permissions.CREATE_TEAM]}>
                                <FormattedMessage
                                    id='signup_team.no_open_teams_canCreate'
                                    defaultMessage='No teams are available to join. Please create a new team or ask your administrator for an invite.'
                                />
                            </SystemPermissionGate>
                            <SystemPermissionGate
                                permissions={[Permissions.CREATE_TEAM]}
                                invert={true}
                            >
                                <FormattedMessage
                                    id='signup_team.no_open_teams'
                                    defaultMessage='No teams are available to join. Please ask your administrator for an invite.'
                                />
                            </SystemPermissionGate>
                        </div>
                    </div>
                );
            }

            openContent = (
                <div
                    id='teamsYouCanJoinContent'
                    className='signup__content'
                >
                    <h4>
                        <FormattedMessage
                            id='signup_team.join_open'
                            defaultMessage='Teams you can join: '
                        />
                    </h4>
                    <div className='signup-team-all'>
                        {joinableTeamContents}
                    </div>
                </div>
            );
        }

        const teamSignUp = (
            <SystemPermissionGate permissions={[Permissions.CREATE_TEAM]}>
                <div className='margin--extra'>
                    <Link
                        id='createNewTeamLink'
                        to='/create_team'
                        className='signup-team-login'
                    >
                        <FormattedMessage
                            id='login.createTeam'
                            defaultMessage='Create a new team'
                        />
                    </Link>
                </div>
            </SystemPermissionGate>
        );

        let adminConsoleLink;
        if (!UserAgent.isMobileApp()) {
            adminConsoleLink = (
                <SystemPermissionGate permissions={[Permissions.MANAGE_SYSTEM]}>
                    <div className='margin--extra hidden-xs'>
                        <Link
                            to='/admin_console'
                            className='signup-team-login'
                        >
                            <FormattedMessage
                                id='signup_team_system_console'
                                defaultMessage='Go to System Console'
                            />
                        </Link>
                    </div>
                </SystemPermissionGate>
            );
        }

        let headerButton;
        if (this.state.error) {
            headerButton = <BackButton onClick={this.clearError}/>;
        } else if (isMemberOfTeam) {
            headerButton = <BackButton/>;
        } else {
            headerButton = (
                <div className='signup-header'>
                    <a
                        href='#'
                        id='logout'
                        onClick={this.handleLogoutClick}
                    >
                        <LogoutIcon/>
                        <FormattedMessage
                            id='web.header.logout'
                            defaultMessage='Logout'
                        />
                    </a>
                </div>
            );
        }
        return (
            <div>
                <AnnouncementBar/>
                {headerButton}
                <div className='col-sm-12'>
                    <div className={'signup-team__container'}>
                        <img
                            className='signup-team-logo'
                            src={logoImage}
                        />
                        <SiteNameAndDescription
                            customDescriptionText={customDescriptionText}
                            siteName={siteName}
                        />
                        {openContent}
                        {teamSignUp}
                        {adminConsoleLink}
                    </div>
                </div>
            </div>
        );
    }
}
