class MainMenu {

	readonly LIST_ITEM_TITLE_CLASS = '.v-list__tile__title';
	readonly LIST_ITEM_TILE_CLASS = '.v-list__tile';

	toggleMenuUsingMenuIcon() {
		cy.get('.v-toolbar__side-icon')
			.click({ force: true });
		return this;
	}

	clickDashboardMenuItem() {
		cy.contains(this.LIST_ITEM_TITLE_CLASS, 'Dashboard')
			.parents(this.LIST_ITEM_TILE_CLASS)
			.click();
		return this;
	}

	clickProfileMenuItem() {
		cy.contains(this.LIST_ITEM_TITLE_CLASS, 'Profile')
			.parents(this.LIST_ITEM_TILE_CLASS)
			.click();
		return this;
	}

	clickEditProfileMenuItem() {
		cy.contains(this.LIST_ITEM_TITLE_CLASS, 'Edit Profile')
			.parents(this.LIST_ITEM_TILE_CLASS)
			.click();
		return this;
	}

	clickChangePasswordMenuItem() {
		cy.contains(this.LIST_ITEM_TITLE_CLASS, 'Change Password')
			.parents(this.LIST_ITEM_TILE_CLASS)
			.click();
		return this;
	}

	clickManageUsersMenuItem() {
		cy.contains(this.LIST_ITEM_TITLE_CLASS, 'Manage Users')
			.parents(this.LIST_ITEM_TILE_CLASS)
			.click();
		return this;
	}

	clickCreateUserMenuItem() {
		cy.contains(this.LIST_ITEM_TITLE_CLASS, 'Create User')
			.parents(this.LIST_ITEM_TILE_CLASS)
			.click();
		return this;
	}

	clickLogoutMenuItem() {
		cy.contains(this.LIST_ITEM_TITLE_CLASS, 'Logout')
			.parents(this.LIST_ITEM_TILE_CLASS)
			.click();
		return this;
	}

	clickCollapseMenuItem() {
		cy.contains(this.LIST_ITEM_TITLE_CLASS, 'Collapse')
			.parents(this.LIST_ITEM_TILE_CLASS)
			.click();
		return this;
	}
}
export default new MainMenu();