const users = require("./data/users.json")
/**
 * getUserById(id) получает пользователя по id
 * @param {*} id
 * @returns
 */
function getUserById(id) {
  return users.find((user) => user.id === id)
}

/**
 * getUsersAboveAge(age) найти пользователей старше age
 * @param {*} age
 * @returns
 */
function getUsersAboveAge(age) {
  return users.filter((user) => user.age > age)
}

/**
 * calculateAverageSalary() посчитать среднюю зарплату
 * @returns number
 */
function calculateAverageSalary() {
  const totalSalary = users.reduce((sum, user) => sum + user.salary, 0)
  return totalSalary / users.length
}

/**
 * getUserWithHighestSalary() найти пользователя с самой большой зарплатой
 * @returns
 */
function getUserWithHighestSalary() {
  return users.reduce(
    (max, user) => (user.salary > max.salary ? user : max),
    users[0]
  )
}

/**
 *  sortUsersByAge() - отсортировать пользователей по возрасту (asc)
 * @returns
 */
function sortUsersByAge() {
  return users.sort((a, b) => a.age - b.age)
}

/**
 *  sortUsersBySalaryDesc() - отсортировать пользователей по зарплате (desc)
 * @returns
 */
function sortUsersBySalaryDesc() {
  return users.sort((a, b) => b.salary - a.salary)
}

/**
 * addEmailsToUsers() добавить поле email всем пользователям формата: name + . + @example.com.
 * Почта должна быть в нижнем регистре без пробелов
 * @returns
 */
function addEmailsToUsers() {
  users.forEach((user) => {
    user.email = `${user.name.toLowerCase().replaceAll(' ', ".")}@example.com`
  })
  return users.reverse()
}

/**
 * increaseSalaryByPercentage(percent) увеличить всем зарплату на процент
 * @param {*} percent
 * @returns
 */
function increaseSalaryByPercentage(percent) {
  users.forEach((user) => {
    user.salary += (user.salary * percent) / 100
  })
  return users
}

/**
 * removeUserById(id) - удалить пользователя по id
 * @param {*} id
 * @returns
 */
function removeUserById(id) {
  return users.filter((user) => user.id !== id)
}

/**
 * groupUsersByAgeRange() - сгруппировать пользователей по возрастам (<30, 30-50, >50)
 * @returns
 */
function groupUsersByAgeRange() {
  const grouped = {}
  users.reverse().forEach((user) => {
    if (user.age < 30) {
      if (!grouped["<30"]) {
        grouped["<30"] = []
      }
      grouped["<30"].push(user)
    } else if (user.age >= 30 && user.age <= 50) {
      if (!grouped["30-50"]) {
        grouped["30-50"] = []
      }
      grouped["30-50"].push(user)
    } else {
      if (!grouped[">50"]) {
        grouped[">50"] = []
      }
      grouped[">50"].push(user)
    }
  })
  return grouped
}

module.exports = {
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
}

