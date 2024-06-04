describe("Registration Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should load all required elements", () => {
    cy.get("form").should("exist");
    cy.get('input[name="username"]').should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('input[name="dob"]').should("exist");
    cy.get('button[type="submit"]').should("exist");
  });

  it("should validate the form fields", () => {
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("contain", "Username is required");
    cy.get(".error").should("contain", "Email is required");
    cy.get(".error").should("contain", "Password is required");
    cy.get(".error").should("contain", "Date of Birth is required");
  });

  it('should have a label with text "Username:" next to the input field', () => {
    
    cy.get('label').contains('Username:').next('input[name="username"]').should('exist');
  });

  it('should have a label with text "Email:" next to the input field', () => {
    
    cy.get('label').contains('Email:').next('input[name="email"]').should('exist');
  });

  it('should have a label with text "Password:" next to the input field', () => {
    
    cy.get('label').contains('Password:').next('input[name="password"]').should('exist');
  });

  it('should have a label with text "Birthday:" next to the input field', () => {
    
    cy.get('label').contains('Birthday:').next('input[name="dob"]').should('exist');
  });



  it("displays error when email is invalid", () => {
    cy.get('input[name="email"]').type("invalid-email");
    cy.get("form").submit();
    cy.contains("Email is invalid").should("be.visible");
  });

  it("displays error when password is to short", () => {
    cy.get('input[name="password"]').type("123");
    cy.get('button[type="submit"]').click();
    cy.get(".error").should(
      "contain",
      "Password must be at least 6 characters"
    );
  });

  it("should submit the form and display the information", () => {
    const username = "testuser";
    const email = "test@example.com";
    const password = "password123";
    const dob = "2000-01-01";

    cy.get('input[name="username"]').type(username);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="dob"]').type(dob);

    cy.get('button[type="submit"]').click();

    cy.get(".submitted-info").should("exist");
    cy.get(".submitted-info").should("contain", `Username: ${username}`);
    cy.get(".submitted-info").should("contain", `Email: ${email}`);
    cy.get(".submitted-info").should("contain", `Date of Birth: ${dob}`);
  });

  
  it("should calculate and display the correct age", () => {
    const username = "testuser";
    const email = "test@example.com";
    const password = "password123";
    const dob = "2000-01-01";

    cy.get('input[name="username"]').type(username);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="dob"]').type(dob);

    cy.get('button[type="submit"]').click();

    const today = new Date();
    const birthDate = new Date(dob);
    let expectedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      expectedAge--;
    }

    cy.get(".submitted-info").within(() => {
      cy.contains(expectedAge).should("be.visible");
    });
  });
});
