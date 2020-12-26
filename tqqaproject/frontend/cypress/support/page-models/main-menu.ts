const list_item_class = '.v-list__tile__title';

class MainMenu {
	
	clickDashboardMenuItem() {
		cy.contains(list_item_class, 'Dashboard')
			.click();
		return this;
	}

	clickProfileMenuItem() {
		cy.contains(list_item_class , 'Profile')
			.click();
		return this;
	}

	clickEditProfileMenuItem() {
		cy.contains(list_item_class , 'Edit Profile')
			.click();
		return this;
	}

	clickChangePasswordMenuItem() {
		cy.contains(list_item_class , 'Change Password')
			.click();
		return this;
	}
	
	clickManageUsersMenuItem() {
		cy.contains(list_item_class , 'Manage Users')
			.click();
		return this;
	}

	clickCreateUserMenuItem() {
		cy.contains(list_item_class , 'Create User')
			.click();
		return this;
	}

	clickLogoutMenuItem() {
		cy.contains(list_item_class , 'Logout')
			.click();
		return this;
	}

	clickCollapseMenuItem() {
		cy.contains(list_item_class , 'Collapse')
			.click();
		return this;
	}
}
export default new MainMenu();