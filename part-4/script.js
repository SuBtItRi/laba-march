const goods = []

const renderCatalog = () => {
  document.querySelector(".container").innerHTML = ""
  const countGoods = document.querySelector(".countGoods")
  const allPrice = document.querySelector(".allPrice")
  countGoods.textContent = "0"
  allPrice.textContent = "0"
  goods.forEach((good, index) => {
    createGood(good, index)
    countGoods.textContent = Number(countGoods.textContent) + Number(good.count)
    allPrice.textContent = Number(allPrice.textContent) + Number(good.price)
  })
}

const createGood = (good, index) => {
  const input = document.querySelector(".search")
  const categoryFilter1 = document.querySelector("#categoryFilter1")
  const categoryFilter2 = document.querySelector("#categoryFilter2")
  const formUpdate = document.querySelector(".formUpdate")

  if (!good.name.includes(input.value)) return
  if (!categoryFilter1.checked && good.category == categoryFilter1.value) return
  if (!categoryFilter2.checked && good.category == categoryFilter2.value) return

  const div = document.createElement("div")
  div.classList.add("good")
  div.innerHTML = `
    <h2>${good.name}</h2>
    <p>${good.category}</p>
    <p>${good.price}</p>
    <p>${good.count}</p>
    <button id='updateBtn${index}'>Update</button>
    <button id='deleteBtn${index}'>Delete</button>
    `
  document.querySelector(".container").appendChild(div)

  document.querySelector(`#updateBtn${index}`).addEventListener("click", () => {
    formUpdate.style.display = 'flex'
    document.querySelector("#updateId").textContent = index
    formUpdate.name.value = good.name
    formUpdate.category.value = good.category
    formUpdate.price.value = good.price
    formUpdate.count.value = good.count
  })

  document.querySelector(`#deleteBtn${index}`).addEventListener("click", () => {
    goods[index] = []
    renderCatalog()
  })
}

document.addEventListener("DOMContentLoaded", () => {
  const formCreate = document.querySelector(".formCreate")
  const formUpdate = document.querySelector(".formUpdate")
  const input = document.querySelector(".search")
  const categoryFilter1 = document.querySelector("#categoryFilter1")
  const categoryFilter2 = document.querySelector("#categoryFilter2")

  formCreate.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(formCreate)
    const good = {}
    formData.forEach((value, key) => {
      good[key] = value
    })
    goods.push(good)
    formCreate.reset()
    renderCatalog()
  })

  formUpdate.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(formUpdate)
    const good = {}
    formData.forEach((value, key) => {
      good[key] = value
    })
    goods[Number(document.querySelector("#updateId").textContent)] = good
    formUpdate.reset()
    renderCatalog()
  })

  input.addEventListener("input", () => {
    renderCatalog()
    console.log(goods)
  })
  categoryFilter1.addEventListener("change", () => {
    renderCatalog()
  })
  categoryFilter2.addEventListener("change", () => {
    renderCatalog()
  })
})
