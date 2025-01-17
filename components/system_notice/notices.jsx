// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import FormattedMarkdownMessage from 'components/formatted_markdown_message';

import xeniaIcon from 'images/icon50x50.png';

// Notices are objects with the following fields:
//  - name - string identifier
//  - adminOnly - set to true if only system admins should see this message
//  - icon - the image to display for the notice icon
//  - title - JSX node to display for the notice title
//  - body - JSX node to display for the notice body
//  - allowForget - boolean to allow forget the notice
//  - show - function that check if we need to show the notice
//
// Order is important! The notices at the top are shown first.
export default [
    {
        name: 'apiv3_deprecation',
        adminOnly: true,
        title: (
            <FormattedMarkdownMessage
                id='system_notice.title'
                defaultMessage='**Notice**\nfrom Xenia'
            />
        ),
        icon: xeniaIcon,
        body: (
            <FormattedMarkdownMessage
                id='system_notice.body.api3'
                defaultMessage='If you’ve created or installed integrations in the last two years, find out how [recent changes](!https://about.xenia.com/default-apiv3-deprecation-guide) may have affected them.'
            />
        ),
        allowForget: true,
        show: (serverVersion, config) => {
            if (config.InstallationDate >= new Date(2018, 5, 16, 0, 0, 0, 0).getTime()) {
                return false;
            }
            return true;
        },
    },
    {
        name: 'advanced_permissions',
        adminOnly: true,
        title: (
            <FormattedMarkdownMessage
                id='system_notice.title'
                defaultMessage='**Notice**\nfrom Xenia'
            />
        ),
        icon: xeniaIcon,
        body: (
            <FormattedMarkdownMessage
                id='system_notice.body.permissions'
                defaultMessage='Some policy and permission System Console settings have moved with the release of [advanced permissions](!https://about.xenia.com/default-advanced-permissions) in Enterprise E10 and E20.'
            />
        ),
        allowForget: true,
        show: (serverVersion, config, license) => {
            if (license.IsLicensed === 'false') {
                return false;
            }
            if (config.InstallationDate > new Date(2018, 5, 16, 0, 0, 0, 0).getTime()) {
                return false;
            }
            if (license.IsLicensed === 'true' && license.IssuedAt > new Date(2018, 5, 16, 0, 0, 0, 0).getTime()) {
                return false;
            }
            return true;
        },
    },
    {
        name: 'ee_upgrade_advice',
        adminOnly: true,
        title: (
            <FormattedMarkdownMessage
                id='system_notice.title'
                defaultMessage='**Notice**\nfrom Xenia'
            />
        ),
        icon: xeniaIcon,
        body: (
            <FormattedMarkdownMessage
                id='system_notice.body.ee_upgrade_advice'
                defaultMessage='Enterprise Edition is recommended to ensure optimal operation and reliability. [Learn more](!https://xenia.com/performance).'
            />
        ),
        allowForget: false,
        show: (serverVersion, config, license, analytics) => {
            const USERS_THRESHOLD = 10000;

            // If we don't have the analytics yet, don't show
            if (!analytics.hasOwnProperty('TOTAL_USERS')) {
                return false;
            }

            if (analytics.TOTAL_USERS < USERS_THRESHOLD) {
                return false;
            }

            if (license.IsLicensed === 'true' && license.Cluster === 'true') {
                return false;
            }

            return true;
        },
    },
];
