// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// ***************************************************************
// - [#] indicates a test step (e.g. 1. Go to a page)
// - [*] indicates an assertion (e.g. * Check the title)
// - Use element ID when selecting an element. Create one if none.
// ***************************************************************

/*eslint max-nested-callbacks: ["error", 5]*/

import {reUrl} from '../../utils';

const feedbackEmail = 'test@example.com';
let config;

describe('Signin/Authentication', () => {
    before(() => {
        cy.apiUpdateConfig({EmailSettings: {FeedbackEmail: feedbackEmail}});
        cy.apiGetConfig().then((response) => {
            config = response.body;
        });
    });

    it('SA15008 - Sign In Forgot password - Email address has account on server', () => {
        cy.loginAsNewUser().then((user) => {
            cy.apiLogout();

            resetPasswordAndLogin(user, feedbackEmail);
        });
    });
});

function verifyForgotPasswordEmail(response, toUser, fromEmail) {
    const isoDate = new Date().toISOString().substring(0, 10);
    const {data, status} = response;

    // * Should return success status
    expect(status).to.equal(200);

    // * Verify that email is addressed to user-1
    expect(data.to.length).to.equal(1);
    expect(data.to[0]).to.contain(toUser.email);

    // * Verify that email is from default feedback email
    expect(data.from).to.contain(fromEmail);

    // * Verify that date is current
    expect(data.date).to.contain(isoDate);

    // * Verify that the email subject is correct
    expect(data.subject).to.equal(`[${config.TeamSettings.SiteName}] Reset your password`);

    // * Verify that the email body is correct
    const bodyText = data.body.text.split('\r\n');
    expect(bodyText.length).to.equal(14);
    expect(bodyText[1]).to.equal('You requested a password reset');
    expect(bodyText[4]).to.equal('To change your password, click "Reset Password" below.');
    expect(bodyText[5]).to.contain('If you did not mean to reset your password, please ignore this email and your password will remain the same. The password reset link expires in 24 hours.');
    expect(bodyText[7]).to.contain('Reset Password');
    expect(bodyText[9]).to.contain('Any questions at all, mail us any time: feedback@xenia.com');
    expect(bodyText[10]).to.equal('Best wishes,');
    expect(bodyText[11]).to.equal(`The ${config.TeamSettings.SiteName} Team`);
    expect(bodyText[13]).to.equal('To change your notification preferences, log in to your team site and go to Account Settings > Notifications.');
}

function resetPasswordAndLogin(user, fromEmail) {
    const newPassword = 'newpasswd';

    // # Visit '/'
    cy.visit('/');

    // * Verify that it redirects to /login
    cy.url().should('contain', '/login');

    // * Verify that forgot password link is present
    // # Click forgot password link
    cy.get('#login_forgot > a').should('be.visible').and('have.text', 'I forgot my password').click();

    // * Verify that it redirects to /reset_password
    cy.url().should('contain', '/reset_password');

    // * Verify that the focus is set to passwordResetEmailInput
    cy.focused().should('have.attr', 'id', 'passwordResetEmailInput');

    // # Type user email into email input field and click reset button
    cy.get('#passwordResetEmailInput').type(user.email);
    cy.get('#passwordResetButton').click();

    // * Should show that the  password reset email is sent
    cy.get('#passwordResetEmailSent').should('be.visible').within(() => {
        cy.get('span').first().should('have.text', 'If the account exists, a password reset email will be sent to:');
        cy.get('div b').first().should('have.text', user.email);
        cy.get('span').last().should('have.text', 'Please check your inbox.');
    });

    cy.task('getRecentEmail', {username: user.username}).then((response) => {
        // * Verify contents password reset email
        verifyForgotPasswordEmail(response, user, fromEmail);

        const bodyText = response.data.body.text.split('\r\n');
        const passwordResetLink = bodyText[7].match(reUrl)[0];
        const token = passwordResetLink.split('token=')[1];

        // * Verify length of a token
        expect(token.length).to.equal(64);

        // # Visit password reset link (e.g. click on email link)
        cy.visit(passwordResetLink);
        cy.url().should('contain', '/reset_password_complete?token=');

        // * Verify that the focus is set to resetPasswordInput
        cy.focused().should('have.attr', 'id', 'resetPasswordInput');

        // # Type new password and click reset button
        cy.get('#resetPasswordInput').type(newPassword);
        cy.get('#resetPasswordButton').click();

        // * Verify that it redirects to /login?extra=password_change
        cy.url().should('contain', '/login?extra=password_change');

        // * Should show that the password is updated successfully
        cy.get('#passwordUpdatedSuccess').should('be.visible').and('have.text', ' Password updated successfully');

        // # Type email and new password, then click login button
        cy.get('#loginId').should('be.visible').type(user.username);
        cy.get('#loginPassword').should('be.visible').type(newPassword);
        cy.get('#loginButton').click();

        // * Verify that it successfully logged in and redirects to /ad-1/channels/town-square
        cy.url().should('contain', '/ad-1/channels/town-square');

        // # Logout
        cy.apiLogout();
    });
}
