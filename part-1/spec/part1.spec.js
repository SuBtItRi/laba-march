

const {
  users,
  getUserById,
  getUsersAboveAge,
  calculateAverageSalary,
  getUserWithHighestSalary,
  sortUsersByAge,
  sortUsersBySalaryDesc,
  addEmailsToUsers,
  increaseSalaryByPercentage,
  removeUserById,
  groupUsersByAgeRange,
} = require("../index");

test("Get user by ID", () => {
  expect(getUserById(3)).toEqual({
    id: 3,
    name: "Jim Doe",
    email: "",
    age: 35,
    salary: 70000,
  });
});

test("Get users above age 40", () => {
  expect(getUsersAboveAge(40).length).toBe(6);
});

test("Calculate average salary", () => {
  expect(calculateAverageSalary()).toBe(95000);
});

test("Find user with highest salary", () => {
  expect(getUserWithHighestSalary()).toEqual({
    id: 10,
    name: "Jade Doe",
    email: "",
    age: 70,
    salary: 140000,
  });
});

test("Sort users by age", () => {
  expect(sortUsersByAge()[0].age).toBe(25);
});

test("Sort users by salary descending", () => {
  expect(sortUsersBySalaryDesc()[0].salary).toBe(140000);
});

test("Add emails to users", () => {
  expect(addEmailsToUsers()[0].email).toBe("john.doe@example.com");
});

test("Increase salary by 10%", () => {
  expect(increaseSalaryByPercentage(10)[0].salary).toBe(55000);
});

test("Remove user by ID", () => {
  expect(removeUserById(5).length).toBe(9);
});

test("Group users by age range", () => {
  const grouped = groupUsersByAgeRange();
  expect(grouped["<30"].length).toBe(1);
  expect(grouped["30-50"].length).toBe(5);
  expect(grouped[">50"].length).toBe(4);
});
