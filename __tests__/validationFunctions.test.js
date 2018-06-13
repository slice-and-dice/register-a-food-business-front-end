const {
  validatePostCode,
  validateDeclaration,
  validateEstablishmentFirstLine,
  validateStreet,
  validateTown,
  validateEstablishmentTradingName
} = require("../services/validationFunctions");

describe("Function: validateDeclaration", () => {
  it("should return false if declaration is empty", () => {
    // Arrange
    const declaration = "";

    // Act
    const valid = validateDeclaration(declaration);

    // Assert
    expect(valid).toBe(false);
  });

  it("should return true if declaration is declaration is truthy", () => {
    // Arrange
    const declaration = "Truthy value";

    // Act
    const valid = validateDeclaration(declaration);

    // Assert
    expect(valid).toBe(true);
  });
});

describe("Function: validatePostCode", () => {
  it("should return false if type is not string", () => {
    // Arrange
    const badPostCodes = [[], {}, undefined, null];

    // Act
    badPostCodes.forEach(postcode => {
      // Assert
      const valid = validatePostCode(postcode);
      expect(valid).toBe(false);
    });
  });

  it("should return false if string is not valid postcode", () => {
    // Arrange
    const badPostCodes = ["random string", "SW", "12", "1445sfds"];

    // Act
    badPostCodes.forEach(postcode => {
      // Assert
      const valid = validatePostCode(postcode);
      expect(valid).toBe(false);
    });
  });

  it("should return true if string is valid postcode", () => {
    // Arrange
    const goodPostCodes = ["SW12", "SE1 9PZ", "TW1"];

    // Act
    goodPostCodes.forEach(postcode => {
      // Assert
      const valid = validatePostCode(postcode);
      expect(valid).toBe(true);
    });
  });
});

describe("Function: validateEstablishmentFirstLine", () => {
  it("Should return false if type is not string", () => {
    // Arrange
    const badFirstLines = [[], {}, undefined, null];

    // Act
    badFirstLines.forEach(firstLine => {
      // Assert
      const valid = validateEstablishmentFirstLine(firstLine);
      expect(valid).toBe(false);
    });
  });

  it("Should return false if string is empty or contains only blank chars", () => {
    // Arrange
    const badFirstLines = ["", " ", "       "];

    // Act
    badFirstLines.forEach(firstLine => {
      // Assert
      const valid = validateEstablishmentFirstLine(firstLine);
      expect(valid).toBe(false);
    });
  });

  it("Should return false if string contains non Ascii chars", () => {
    // Arrange
    const badFirstLines = ["§", "¥", "«® ¢"];

    // Act
    badFirstLines.forEach(firstLine => {
      // Assert
      const valid = validateEstablishmentFirstLine(firstLine);
      expect(valid).toBe(false);
    });
  });

  it("Should return true if is non empty and Ascii", () => {
    // Arrange
    const goodFirstLines = [
      "16a Fake St",
      "The Mews",
      "Steve & Hanas Cottage!"
    ];

    // Act
    goodFirstLines.forEach(firstLine => {
      // Assert
      const valid = validateEstablishmentFirstLine(firstLine);
      expect(valid).toBe(true);
    });
  });
});

describe("Function: validateStreet", () => {
  it("Should return false when type is not string", () => {
    // Arrange
    const badStreetName = [[], {}, null, undefined];

    // Act
    badStreetName.forEach(streetName => {
      // Assert
      const valid = validateStreet(streetName);
      expect(valid).toBe(false);
    });
  });

  it("Should return true when input is empty", () => {
    // Arrange
    const street = "";

    // Act
    const valid = validateStreet(street);

    expect(valid).toBe(true);
  });

  it("Should return false when input is blank string", () => {
    // Arrange
    const street = "    ";

    // Act
    const valid = validateStreet(street);

    expect(valid).toBe(false);
  });

  it("Should return false if string contains non Ascii chars", () => {
    // Arrange
    const badStreets = ["§", "¥", "«® ¢"];

    // Act
    badStreets.forEach(street => {
      // Assert
      const valid = validateStreet(street);
      expect(valid).toBe(false);
    });
  });

  it("Should return true when input is Ascii string", () => {
    // Arrange
    const goodStreets = ["Fake St", "The Mews"];

    // Act
    goodStreets.forEach(street => {
      // Assert
      const valid = validateStreet(street);
      expect(valid).toBe(true);
    });
  });
});

describe("Function: validateTown", () => {
  it("Should return false when type is not string", () => {
    // Arrange
    const badTownName = [[], {}, null, undefined];

    // Act
    badTownName.forEach(townName => {
      // Assert
      const valid = validateTown(townName);
      expect(valid).toBe(false);
    });
  });

  it("Should return true when input is empty", () => {
    // Arrange
    const town = "";

    // Act
    const valid = validateTown(town);

    expect(valid).toBe(true);
  });

  it("Should return false when input is blank string", () => {
    // Arrange
    const town = "    ";

    // Act
    const valid = validateTown(town);

    expect(valid).toBe(false);
  });

  it("Should return false if string contains non Ascii chars", () => {
    // Arrange
    const badTowns = ["§", "¥", "«® ¢"];

    // Act
    badTowns.forEach(town => {
      // Assert
      const valid = validateTown(town);
      expect(valid).toBe(false);
    });
  });

  it("Should return true when input is Ascii string", () => {
    // Arrange
    const goodTowns = ["London", "Lazy Town", "Joe's Jardin"];

    // Act
    goodTowns.forEach(town => {
      // Assert
      const valid = validateTown(town);
      expect(valid).toBe(true);
    });
  });
});

describe("Function: validateEstablishmentTradingName", () => {
  it("Should return false if type is not string", () => {
    // Arrange
    const badTradingName = [[], {}, undefined, null];

    // Act
    badTradingName.forEach(tradingName => {
      // Assert
      const valid = validateEstablishmentTradingName(tradingName);
      expect(valid).toBe(false);
    });
  });

  it("Should return false if string is empty or contains only blank chars", () => {
    // Arrange
    const badTradingNames = ["", " ", "       "];

    // Act
    badTradingNames.forEach(tradingName => {
      // Assert
      const valid = validateEstablishmentTradingName(tradingName);
      expect(valid).toBe(false);
    });
  });

  it("Should return false if string contains non Ascii chars", () => {
    // Arrange
    const badTradingNames = ["§", "¥", "«® ¢"];

    // Act
    badTradingNames.forEach(tradingName => {
      // Assert
      const valid = validateEstablishmentTradingName(tradingName);
      expect(valid).toBe(false);
    });
  });

  it("Should return true if is non empty and Ascii", () => {
    // Arrange
    const goodTradingNames = [
      "Anisha's awesome avacado place",
      "Joe's Jolly Javahouse",
      "Django's Disasterous Dump"
    ];

    // Act
    goodTradingNames.forEach(tradingName => {
      // Assert
      const valid = validateEstablishmentTradingName(tradingName);
      expect(valid).toBe(true);
    });
  });
});
