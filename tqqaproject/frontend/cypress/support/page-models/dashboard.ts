class Dashboard {

	readonly BTN_CONTENT_CLASS = '.v-btn__content';

	clickViewProfile() {
		cy.contains(this.BTN_CONTENT_CLASS, 'View Profile')
			.click();
		return this;
	}

	clickEditProfile() {
		cy.contains(this.BTN_CONTENT_CLASS, 'Edit Profile')
			.click();
		return this;
	}

	clickChangePassword() {
		cy.contains(this.BTN_CONTENT_CLASS, 'Change Password')
			.click();
		return this;
	}
}
export default new Dashboard();