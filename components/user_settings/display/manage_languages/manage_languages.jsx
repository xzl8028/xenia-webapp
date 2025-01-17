// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';

import * as I18n from 'i18n/i18n.jsx';
import SettingItemMax from 'components/setting_item_max.jsx';
import FormattedMarkdownMessage from 'components/formatted_markdown_message.jsx';

export default class ManageLanguage extends React.Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        locale: PropTypes.string.isRequired,
        updateSection: PropTypes.func.isRequired,
        actions: PropTypes.shape({
            updateMe: PropTypes.func.isRequired,
        }).isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            locale: props.locale,
            isSaving: false,
        };
    }

    setLanguage = (e) => {
        this.setState({locale: e.target.value});
    }

    changeLanguage = () => {
        if (this.props.user.locale === this.state.locale) {
            this.props.updateSection('');
        } else {
            this.submitUser({
                ...this.props.user,
                locale: this.state.locale,
            });
        }
    }

    submitUser = (user) => {
        this.setState({isSaving: true});

        this.props.actions.updateMe(user).
            then(({data, error: err}) => {
                if (data) {
                    // Do nothing since changing the locale essentially refreshes the page
                } else if (err) {
                    let serverError;
                    if (err.message) {
                        serverError = err.message;
                    } else {
                        serverError = err;
                    }
                    this.setState({serverError, isSaving: false});
                }
            });
    }

    render() {
        let serverError;
        if (this.state.serverError) {
            serverError = <label className='has-error'>{this.state.serverError}</label>;
        }

        const options = [];
        const locales = I18n.getLanguages();

        const languages = Object.keys(locales).map((l) => {
            return {
                value: locales[l].value,
                name: locales[l].name,
                order: locales[l].order,
            };
        }).sort((a, b) => a.order - b.order);

        languages.forEach((lang) => {
            options.push(
                <option
                    key={lang.value}
                    value={lang.value}
                >
                    {lang.name}
                </option>
            );
        });

        const input = (
            <div key='changeLanguage'>
                <br/>
                <label className='control-label'>
                    <FormattedMessage
                        id='user.settings.languages.change'
                        defaultMessage='Change interface language'
                    />
                </label>
                <div className='padding-top'>
                    <select
                        id='displayLanguage'
                        ref='language'
                        className='form-control'
                        value={this.state.locale}
                        onChange={this.setLanguage}
                    >
                        {options}
                    </select>
                    {serverError}
                </div>
                <div>
                    <br/>
                    <FormattedMarkdownMessage
                        id='user.settings.languages.promote'
                        defaultMessage='Select which language Xenia displays in the user interface.\n \nWould you like to help with translations? Join the [Xenia Translation Server](!http://translate.xenia.com/) to contribute.'
                    />
                </div>
            </div>
        );

        return (
            <SettingItemMax
                title={
                    <FormattedMessage
                        id='user.settings.display.language'
                        defaultMessage='Language'
                    />
                }
                width='medium'
                submit={this.changeLanguage}
                saving={this.state.isSaving}
                inputs={[input]}
                updateSection={this.props.updateSection}
            />
        );
    }
}
