// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage, intlShape} from 'react-intl';

import * as GlobalActions from 'actions/global_actions.jsx';

import {filterAndSortTeamsByDisplayName} from 'utils/team_utils.jsx';
import * as Utils from 'utils/utils.jsx';
import {ModalIdentifiers} from 'utils/constants.jsx';

import AboutBuildModal from 'components/about_build_modal';

import Menu from 'components/widgets/menu/menu';
import MenuGroup from 'components/widgets/menu/menu_group';
import MenuItemAction from 'components/widgets/menu/menu_items/menu_item_action';
import MenuItemExternalLink from 'components/widgets/menu/menu_items/menu_item_external_link';
import MenuItemToggleModalRedux from 'components/widgets/menu/menu_items/menu_item_toggle_modal_redux';
import MenuItemBlockableLink from 'components/widgets/menu/menu_items/menu_item_blockable_link';

export default class AdminNavbarDropdown extends React.Component {
    static propTypes = {
        locale: PropTypes.string.isRequired,
        siteName: PropTypes.string,
        navigationBlocked: PropTypes.bool,
        teams: PropTypes.arrayOf(PropTypes.object).isRequired,
        actions: PropTypes.shape({
            deferNavigation: PropTypes.func,
        }).isRequired,
    }

    static contextTypes = {
        intl: intlShape.isRequired,
    };

    handleLogout = (e) => {
        if (this.props.navigationBlocked) {
            e.preventDefault();
            this.props.actions.deferNavigation(GlobalActions.emitUserLoggedOutEvent);
        } else {
            GlobalActions.emitUserLoggedOutEvent();
        }
    };

    render() {
        const {locale, teams, siteName} = this.props;
        const {formatMessage} = this.context.intl;
        const teamToRender = []; // Array of team components
        let switchTeams;

        if (teams && teams.length > 0) {
            const teamsArray = filterAndSortTeamsByDisplayName(teams, locale);

            for (const team of teamsArray) {
                teamToRender.push(
                    <MenuItemBlockableLink
                        key={'team_' + team.name}
                        to={'/' + team.name}
                        text={Utils.localizeMessage('navbar_dropdown.switchTo', 'Switch to ') + ' ' + team.display_name}
                    />
                );
            }
        } else {
            switchTeams = (
                <MenuItemBlockableLink
                    to={'/select_team'}
                    icon={
                        <FormattedMessage
                            id='select_team.icon'
                            defaultMessage='Select Team Icon'
                        >
                            {(title) => (
                                <i
                                    className='fa fa-exchange'
                                    title={title}
                                />
                            )}
                        </FormattedMessage>
                    }
                    text={Utils.localizeMessage('admin.nav.switch', 'Team Selection')}
                />
            );
        }

        return (
            <Menu ariaLabel={Utils.localizeMessage('admin.nav.menuAriaLabel', 'Admin Console Menu')}>
                <MenuGroup>
                    {teamToRender}
                    {switchTeams}
                </MenuGroup>
                <MenuGroup>
                    <MenuItemExternalLink
                        url='https://about.xenia.com/administrators-guide/'
                        text={Utils.localizeMessage('admin.nav.administratorsGuide', 'Administrator Guide')}
                    />
                    <MenuItemExternalLink
                        url='https://about.xenia.com/troubleshooting-forum/'
                        text={Utils.localizeMessage('admin.nav.troubleshootingForum', 'Troubleshooting Forum')}
                    />
                    <MenuItemExternalLink
                        url='https://about.xenia.com/commercial-support/'
                        text={Utils.localizeMessage('admin.nav.commercialSupport', 'Commercial Support')}
                    />
                    <MenuItemToggleModalRedux
                        modalId={ModalIdentifiers.ABOUT}
                        dialogType={AboutBuildModal}
                        text={formatMessage({id: 'navbar_dropdown.about', defaultMessage: 'About {appTitle}'}, {appTitle: siteName || 'Xenia'})}
                    />
                </MenuGroup>
                <MenuGroup>
                    <MenuItemAction
                        onClick={this.handleLogout}
                        text={Utils.localizeMessage('navbar_dropdown.logout', 'Logout')}
                    />
                </MenuGroup>
            </Menu>
        );
    }
}
