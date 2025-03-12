const {
  groupByGroup,
  getUniqueFlowers,
  filterSimpsonsCharacters,
  changeIsLikeBeerWithoutMutation,
} = require("../simpsons");
describe("Part 3", () => {
  let simpsonsCharacters;

  beforeEach(() => {
    simpsonsCharacters = [
      { name: "Homer Simpson", group: "Simpson Family", age : 50, isLikeBeer: true, likesFlowers:["rose", "iris"] },
      { name: "Marge Simpson", group: "Simpson Family", age : 50, isLikeBeer: false, likesFlowers:["rose","aloe", "iris"] },
      { name: "Ned Flanders", group: "Neighbor", age: 33, isLikeBeer: false, likesFlowers:["rose"] },
      { name: "Maude Flanders", group: "Neighbor", age: 23, isLikeBeer: true, likesFlowers:["rose","peony"] },
      { name: "Rod Flanders", group: "Neighbor", age: 55, isLikeBeer: false, likesFlowers:["rose", "iris"] },
      { name: "Todd Flanders", group: "Neighbor", age: 32, isLikeBeer: false, likesFlowers:["rose","aloe"] },
      { name: "Montgomery Burns", group: "Antagonists", age: 21, isLikeBeer: true, likesFlowers:["rose","aloe","peony"] },
      { name: "Waylon Smithers", group: "Antagonists", age: 66, isLikeBeer: true, likesFlowers:["rose", "peony"] },
    ];
  });

  describe("groupByGroup", () => {
    it("Функция groupByGroup() группирует персонажей по свойству group", () => {
      const result = groupByGroup(simpsonsCharacters);
      expect(result).toEqual({
        "Simpson Family": [
          { name: "Homer Simpson", group: "Simpson Family", age: 50, isLikeBeer: true, likesFlowers: ["rose", "iris"] },
          { name: "Marge Simpson", group: "Simpson Family", age: 50, isLikeBeer: false, likesFlowers: ["rose", "aloe", "iris"] },
        ],
        "Neighbor": [
          { name: "Ned Flanders", group: "Neighbor", age: 33, isLikeBeer: false, likesFlowers: ["rose"] },
          { name: "Maude Flanders", group: "Neighbor", age: 23, isLikeBeer: true, likesFlowers: ["rose", "peony"] },
          { name: "Rod Flanders", group: "Neighbor", age: 55, isLikeBeer: false, likesFlowers: ["rose", "iris"] },
          { name: "Todd Flanders", group: "Neighbor", age: 32, isLikeBeer: false, likesFlowers: ["rose", "aloe"] },
        ],
        "Antagonists": [
          { name: "Montgomery Burns", group: "Antagonists", age: 21, isLikeBeer: true, likesFlowers: ["rose", "aloe", "peony"] },
          { name: "Waylon Smithers", group: "Antagonists", age: 66, isLikeBeer: true, likesFlowers: ["rose", "peony"] },
        ],
      });
    });
  });

  describe("getUniqueFlowers", () => {
    it("Возвращает массив уникальных любимых цветов всех персонажей", () => {
      const result = getUniqueFlowers(simpsonsCharacters);
      expect(result).toEqual(["rose", "iris", "aloe", "peony"]);
    });
  });

  describe("filterSimpsonsCharacters", () => {
    const simpsonsCharacters = [
      { name: "Homer", age: 39 },
      { name: "Marge", age: 36 },
      { name: "Bart", age: 10 },
      { name: "Lisa", age: 8 },
    ];
  
    it("Фильтрует персонажей с возрастом более 30", () => {
      const result = filterSimpsonsCharacters(simpsonsCharacters, "over=30");
      expect(result).toEqual([
        { name: "Homer", age: 39 },
        { name: "Marge", age: 36 },
      ]);
    });
  
    it("Фильтрует персонажей с возрастом менее 10", () => {
      const result = filterSimpsonsCharacters(simpsonsCharacters, "under=10");
      expect(result).toEqual([
        { name: "Lisa", age: 8 },
      ]);
    });
  });

  describe("changeIsLikeBeerWithoutMutation", () => {
    it("Меняет значение свойства 'isLikeBeer' для каждого персонажа без мутации оригинального объекта", () => {
      const result = changeIsLikeBeerWithoutMutation(simpsonsCharacters);
      expect(result).toEqual([
        { name: "Homer Simpson", group: "Simpson Family", age: 50, isLikeBeer: false, likesFlowers: ["rose", "iris"] },
        { name: "Marge Simpson", group: "Simpson Family", age: 50, isLikeBeer: true, likesFlowers: ["rose", "aloe", "iris"] },
        { name: "Ned Flanders", group: "Neighbor", age: 33, isLikeBeer: true, likesFlowers: ["rose"] },
        { name: "Maude Flanders", group: "Neighbor", age: 23, isLikeBeer: false, likesFlowers: ["rose", "peony"] },
        { name: "Rod Flanders", group: "Neighbor", age: 55, isLikeBeer: true, likesFlowers: ["rose", "iris"] },
        { name: "Todd Flanders", group: "Neighbor", age: 32, isLikeBeer: true, likesFlowers: ["rose", "aloe"] },
        { name: "Montgomery Burns", group: "Antagonists", age: 21, isLikeBeer: false, likesFlowers: ["rose", "aloe", "peony"] },
        { name: "Waylon Smithers", group: "Antagonists", age: 66, isLikeBeer: false, likesFlowers: ["rose", "peony"] },
      ]);
    });
  });

});
