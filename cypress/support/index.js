// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// ***********************************************************
// Read more at: https://on.cypress.io/configuration
// ***********************************************************

import './ui_commands';
import './api_commands';
import '@testing-library/cypress/add-commands';
import 'cypress-file-upload';
import 'cypress-plugin-retries';

// Add login cookies to whitelist to preserve it
beforeEach(() => {
    Cypress.Cookies.preserveOnce('MMAUTHTOKEN', 'MMUSERID', 'MMCSRF');
});
