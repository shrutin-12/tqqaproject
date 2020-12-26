class Dashboard {

	clickViewProfile() {
		cy.contains('.v-btn__content', 'View Profile')
			.click();
		return this;
	}

	clickOpenProfile() {
		cy.contains('.v-btn__content', 'Edit Profile')
			.click();
		return this;
	}

	clickChangePassword() {
		cy.contains('.v-btn__content', 'Change Password')
			.click();
		return this;
	}

	toggleMenuUsingMenuIcon() {
		cy.get('.v-toolbar__side-icon')
			.click();
		return this;
	}

}
export default new Dashboard();