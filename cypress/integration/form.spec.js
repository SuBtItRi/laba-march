describe('Тестирование форм', () => {
    beforeEach(() => {
      cy.visit('file:///C:/Users/StudentBI44/Documents/pre-lab-1/part-4/index.html'); // Укажите путь к вашему HTML-файлу
    });
  
    it('Тестирование формы создания', () => {
      // Заполнение формы создания
      cy.get('input[name="name"]').type('Яблоко');
      cy.get('input[type="radio"][value="фрукт"]').check();
      cy.get('input[name="price"]').type('100');
      cy.get('input[name="count"]').type('10');
      cy.get('input[type="submit"]').click();
  
      // Проверка, что данные добавлены
      cy.get('.countGoods').should('have.text', '1'); // Проверка количества продуктов
    });
  
    it('Тестирование формы обновления', () => {
      // Показ формы обновления
      cy.get('.formUpdate').invoke('show'); // Показываем форму обновления
      cy.get('#updateId').text('1'); // Указываем ID обновляемого продукта
      cy.get('input[name="name"]').type('Груша');
      cy.get('input[name="price"]').type('150');
      cy.get('input[name="count"]').type('5');
      cy.get('input[type="submit"]').click();
  
      // Здесь вы можете добавить проверки, чтобы убедиться, что данные обновлены правильно
    });
  
    it('Тестирование поиска', () => {
      cy.get('input[name="search"]').type('Груша');
      cy.get('input[name="search"]').type('{enter}');
  
      // Проверка, что искомый продукт отображается
      // Здесь вы можете добавить проверки, чтобы убедиться, что искомый продукт отображается
    });
  });