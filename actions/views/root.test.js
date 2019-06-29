// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import * as Actions from 'actions/views/root';

const mockStore = configureStore([thunk]);

jest.mock('xenia-redux/actions/general', () => {
    const original = require.requireActual('xenia-redux/actions/general');
    return {
        ...original,
        getClientConfig: () => ({type: 'MOCK_GET_CLIENT_CONFIG'}),
        getLicenseConfig: () => ({type: 'MOCK_GET_LICENSE_CONFIG'}),
    };
});

jest.mock('xenia-redux/actions/users', () => {
    const original = require.requireActual('xenia-redux/actions/users');
    return {
        ...original,
        loadMe: () => ({type: 'MOCK_LOAD_ME'}),
    };
});

describe('root view actions', () => {
    const origCookies = document.cookie;
    const origWasLoggedIn = localStorage.getItem('was_logged_in');

    beforeAll(() => {
        document.cookie = '';
        localStorage.setItem('was_logged_in', '');
    });

    afterAll(() => {
        document.cookie = origCookies;
        localStorage.setItem('was_logged_in', origWasLoggedIn);
    });

    test('loadMeAndConfig, without user logged in', async () => {
        const testStore = await mockStore({});

        await testStore.dispatch(Actions.loadMeAndConfig());
        expect(testStore.getActions()).toEqual([{type: 'MOCK_GET_CLIENT_CONFIG'}, {type: 'MOCK_GET_LICENSE_CONFIG'}]);
    });

    test('loadMeAndConfig, with user logged in', async () => {
        const testStore = await mockStore({});

        document.cookie = 'MMUSERID=userid';
        localStorage.setItem('was_logged_in', 'true');

        await testStore.dispatch(Actions.loadMeAndConfig());
        expect(testStore.getActions()).toEqual([{type: 'MOCK_GET_CLIENT_CONFIG'}, {type: 'MOCK_GET_LICENSE_CONFIG'}, {type: 'MOCK_LOAD_ME'}]);
    });
});
