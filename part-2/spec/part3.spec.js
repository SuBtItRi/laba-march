const {
  groupNamesByType,
  getFastestSpawnName,
  getTallestId,
  findPokemonPrevNextEvolutions,
  getUniqueWeaknesses,
} = require("../pokemons");

describe("Part 3", () => {
  let pokemons;
  let pokemonsGroupedByType;

  beforeEach(async () => {
    pokemons = require("../data/pokemons.json").pokemon;
    pokemonsGroupedByType = require("./data_names_group");
  });

  describe("groupNamesByType", () => {
    it("Группирует им покемонов по типам", () => {
      const result = groupNamesByType(pokemons);
      expect(result).toEqual(pokemonsGroupedByType);
    });
  });

  describe("getFastestSpawnName", () => {
    it("Возвращает имя покемона с самым маленьким временем spawn", () => {
      const result = getFastestSpawnName(pokemons);
      expect(result).toBe("Kabuto");
    });
  });

  describe("getTallestId", () => {
    it("Возвращает id самого высокого   покемона", () => {
      const result = getTallestId(pokemons);
      expect(result).toBe(95);
    });
  });

  describe("findPokemonPrevNextEvolutions", () => {
    it("Возвращает предыдущую и следующую эволюцию покемона", () => {
      const result = findPokemonPrevNextEvolutions(pokemons, "Drowzee");
      expect(result).toEqual({ prevEvolution: null, nextEvolution: "Hypno" });
    });

    it("Возвращает null если нет эволюции", () => {
      const result = findPokemonPrevNextEvolutions(pokemons, "Bulbasaur");
      expect(result).toEqual({ nextEvolution: "Ivysaur", prevEvolution: null });
    });
  });

  describe("getUniqueWeaknesses", () => {
    it("Возвращает массив уникальных weaknesses", () => {
      const result = getUniqueWeaknesses(pokemons);
      expect(result).toEqual([
        "Fire",
        "Ice",
        "Flying",
        "Psychic",
        "Water",
        "Ground",
        "Rock",
        "Electric",
        "Grass",
        "Fighting",
        "Poison",
        "Bug",
        "Fairy",
        "Ghost",
        "Dark",
        "Steel",
        "Dragon",
      ]);
    });
  });
});
