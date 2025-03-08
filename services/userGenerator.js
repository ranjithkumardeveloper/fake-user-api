const { faker } = require('@faker-js/faker');
const interests = require("../utils/interests");
const degree = require("../utils/degree");

// Function to generate a single user
const generateRandomUser = (gender, minAge = 20, maxAge = 40, verified = null) => {
  try {
    const avatar = `https://randomuser.me/api/portraits/${gender === "male" ? "men" : "women"}/${faker.number.int({ min: 1, max: 99 })}.jpg`;
    const isVerified = verified !== null ? verified : faker.datatype.boolean();

    return {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(gender),
      middleName: faker.person.middleName(),
      lastName: faker.person.lastName(),
      gender,
      username: faker.internet.username(),
      dateOfBirth: faker.date.birthdate({ min: minAge, max: maxAge, mode: "age" }).toISOString().split("T")[0],
      email: faker.internet.email(),
      phone: faker.phone.number(),
      maritalStatus: faker.helpers.arrayElement(["Single", "Married", "Divorced", "Widowed"]),
      bio: faker.person.bio(),
      interests: faker.helpers.arrayElements(interests, 3),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
      },
      avatar,
      jobTitle: faker.person.jobTitle(),
      company: {
        name: faker.company.name(),
        department: faker.commerce.department(),
      },
      education: {
        university: `${faker.company.name()} University`,
        degree: faker.helpers.arrayElement(degree),
      },
      website: faker.internet.url(),
      social: {
        twitter: `https://twitter.com/${faker.internet.username()}`,
        linkedin: `https://linkedin.com/in/${faker.internet.username()}`,
      },
      isVerified
    };
  } catch (error) {
    console.error("Error generating user:", error);
    return null;
  }
};

// Function to generate multiple users
const generateUsers = (gender, count = 1, minAge = 20, maxAge = 40, verified = null) => {
  return Array.from({ length: count }, () => generateRandomUser(gender, minAge, maxAge, verified));
};

module.exports = { generateRandomUser, generateUsers };
