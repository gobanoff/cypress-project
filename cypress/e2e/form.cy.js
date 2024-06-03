
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};
describe('Registration Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173'); 
  });

  it('should load all required elements', () => {
    cy.get('form').should('exist');
    cy.get('input[name="username"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('input[name="dob"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });
 

  it('should validate the form fields', () => {
    cy.get('button[type="submit"]').click();
    
    cy.get('.error').should('contain', 'Username is required');
    cy.get('.error').should('contain', 'Email is required');
    cy.get('.error').should('contain', 'Password is required');
    cy.get('.error').should('contain', 'Date of Birth is required');
    
  });
  
  it('displays error when email is invalid', () => {
      
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('form').submit();
    cy.contains('Email is invalid').should('be.visible');
  });

  it('displays error when password is to short', () => {

    cy.get('input[name="password"]').type('123');
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('contain', 'Password must be at least 6 characters');
  
  
  });
  

  it('should submit the form and display the information', () => {
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="dob"]').type('2000-01-01');
    
    cy.get('button[type="submit"]').click();
    
    cy.get('.submitted-info').should('exist');
    cy.get('.submitted-info').should('contain', 'Username: testuser');
    cy.get('.submitted-info').should('contain', 'Email: test@example.com');
    cy.get('.submitted-info').should('contain', 'Date of Birth: 2000-01-01');
  });


  //it('calculates age correctly based on date of birth', () => { });
  it('calculates age correctly for a past date', () => {
    const dob = '2000-01-01';
    const today = new Date();
    const expectedAge = today.getFullYear() - 2000 - (today.getMonth() < 0 || (today.getMonth() === 0 && today.getDate() < 1) ? 1 : 0);
    expect(calculateAge(dob)).to.equal(expectedAge);
  });

  it('calculates age correctly for a recent date', () => {
    const dob = '2020-12-31';
    const today = new Date();
    const expectedAge = today.getFullYear() - 2020 - (today.getMonth() < 11 || (today.getMonth() === 11 && today.getDate() < 31) ? 1 : 0);
    expect(calculateAge(dob)).to.equal(expectedAge);
  });

  it('calculates age correctly for today\'s date', () => {
    const today = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    expect(calculateAge(today)).to.equal(0);
  });
 

  it('calculates age correctly for dates in different years but same day and month', () => {
    const dob = '2010-05-31';
    const today = new Date('2024-05-31');
    cy.clock(today); // Mocking the date to ensure test consistency
    expect(calculateAge(dob)).to.equal(14);
    cy.tick(24 * 60 * 60 * 1000); // Move time forward by one day
    expect(calculateAge(dob)).to.equal(14); // Age should still be 14 the next day
  });

  it('calculates age correctly for leap years', () => {
    const dob = '2000-02-29';
    const today = new Date('2024-02-29');
    cy.clock(today); 
    expect(calculateAge(dob)).to.equal(24);
    cy.tick(24 * 60 * 60 * 1000); 
    expect(calculateAge(dob)).to.equal(24); 
  });





});
