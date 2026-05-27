const CARD_BACK = "ด้านหลังไพ่.jpg";
const TOTAL_CARDS = 72;
const READING_FREE = "free";
const READING_BIRTH = "birth";
const READING_BIRTH_DOUBLE = "birth-double";
const READING_ASTRO = "astro";
const BIRTH_CARD_LIMIT = 12;
const BIRTH_DOUBLE_CARD_LIMIT = 24;

const fullDeck = Array.from({ length: TOTAL_CARDS }, (_, index) => {
  const number = index + 1;
  return {
    id: number,
    name: `ไพ่ใบที่ ${number}`,
    image: `${String(number).padStart(2, "0")}.jpg`,
  };
});

const readingConfig = {
  [READING_FREE]: {
    eyebrow: "รูปแบบที่ 1",
    title: "ทำนายรายคำถาม",
    selectedTitle: "ไพ่ที่เปิดแล้ว",
  },
  [READING_BIRTH]: {
    eyebrow: "รูปแบบที่ 2",
    title: "เปิดไพ่พื้นชะตา",
    selectedTitle: "ไพ่ที่เลือก",
  },
  [READING_BIRTH_DOUBLE]: {
    eyebrow: "รูปแบบที่ 3",
    title: "เปิดไพ่พื้นชะตาx2",
    selectedTitle: "ไพ่ที่เลือก",
  },
  [READING_ASTRO]: {
    eyebrow: "รูปแบบที่ 4",
    title: "โหราศาสตร์ไทย เรือนธาตุ",
    selectedTitle: "",
  },
};

const birthHouses = [
  { house: "ปุตตะ", cardOrder: 5, row: 1, column: 2 },
  { house: "พันธุ", cardOrder: 4, row: 1, column: 3 },
  { house: "สหัสชะ", cardOrder: 3, row: 1, column: 4 },
  { house: "อริ", cardOrder: 6, row: 2, column: 1 },
  { house: "กดุมภะ", cardOrder: 2, row: 2, column: 5 },
  { house: "ปัตนิ", cardOrder: 7, row: 3, column: 1 },
  { house: "ตนุ", cardOrder: 1, row: 3, column: 5 },
  { house: "มรณะ", cardOrder: 8, row: 4, column: 1 },
  { house: "วินาศ", cardOrder: 12, row: 4, column: 5 },
  { house: "ศุภะ", cardOrder: 9, row: 5, column: 2 },
  { house: "กัมมะ", cardOrder: 10, row: 5, column: 3 },
  { house: "ลาภะ", cardOrder: 11, row: 5, column: 4 },
];

const zodiacSigns = [
  "เมษ",
  "พฤษภ",
  "มิถุน",
  "กรกฎ",
  "สิงห์",
  "กันย์",
  "ตุลย์",
  "พิจิก",
  "ธนู",
  "มกร",
  "กุมภ์",
  "มีน",
];

const astroTokens = ["๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙", "๐", "ล"];
const astroCardTokens = ["๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙", "๐"];
const personalMatrixCardinalSigns = ["เมษ", "กรกฎ", "ตุลย์", "มกร"];
const kriyaDaoCardMapping = {
  "๑": "11.jpg",
  "๒": "12.jpg",
  "๓": "13.jpg",
  "๔": "14.jpg",
  "๕": "15.jpg",
  "๖": "16.jpg",
  "๗": "17.jpg",
  "๘": "18.jpg",
  "๙": "19.jpg",
  "๐": "20.jpg",
};

const zodiacCardMapping = {
  มกร: "31.jpg",
  กุมภ์: "32.jpg",
  มีน: "33.jpg",
  เมษ: "34.jpg",
  พฤษภ: "35.jpg",
  มิถุน: "36.jpg",
  กรกฎ: "37.jpg",
  สิงห์: "38.jpg",
  กันย์: "39.jpg",
  ตุลย์: "40.jpg",
  พิจิก: "41.jpg",
  ธนู: "42.jpg",
};

const kasetCardMapping = {
  มกร: "43.jpg",
  มีน: "45.jpg",
  เมษ: "46.jpg",
  พฤษภ: "47.jpg",
  มิถุน: "48.jpg",
  กรกฎ: "49.jpg",
  สิงห์: "50.jpg",
  กันย์: "51.jpg",
  ตุลย์: "52.jpg",
  พิจิก: "53.jpg",
  ธนู: "54.jpg",
  กุมภ์: "56.jpg",
};

const houseCardMapping = {
  ตนุ: "61.jpg",
  กดุมภะ: "62.jpg",
  สหัสชะ: "63.jpg",
  พันธุ: "64.jpg",
  ปุตตะ: "65.jpg",
  อริ: "66.jpg",
  ปัตนิ: "67.jpg",
  มรณะ: "68.jpg",
  ศุภะ: "69.jpg",
  กัมมะ: "70.jpg",
  ลาภะ: "71.jpg",
  วินาศ: "72.jpg",
};

const zodiacKasetPlanetMapping = {
  มกร: "๗",
  กุมภ์: "๘",
  มีน: "๕",
  เมษ: "๓",
  พฤษภ: "๖",
  มิถุน: "๔",
  กรกฎ: "๒",
  สิงห์: "๑",
  กันย์: "๔",
  ตุลย์: "๖",
  พิจิก: "๓",
  ธนู: "๕",
};

const houseOrder = ["ตนุ", "กดุมภะ", "สหัสชะ", "พันธุ", "ปุตตะ", "อริ", "ปัตนิ", "มรณะ", "ศุภะ", "กัมมะ", "ลาภะ", "วินาศ"];

let activeReading = READING_FREE;
let remainingCards = [];
let selectedCards = [];
let astroAssignments = {};

const readingEyebrow = document.querySelector("#readingEyebrow");
const readingTitle = document.querySelector("#readingTitle");
const freeReadingButton = document.querySelector("#freeReadingButton");
const birthReadingButton = document.querySelector("#birthReadingButton");
const birthDoubleReadingButton = document.querySelector("#birthDoubleReadingButton");
const astroReadingButton = document.querySelector("#astroReadingButton");
const readingBoard = document.querySelector("#readingBoard");
const drawFrame = document.querySelector("#drawFrame");
const selectedFrame = document.querySelector("#selectedFrame");
const deckGrid = document.querySelector("#deckGrid");
const selectedGrid = document.querySelector("#selectedGrid");
const birthSpreadFrame = document.querySelector("#birthSpreadFrame");
const birthSpreadGrid = document.querySelector("#birthSpreadGrid");
const astroInputFrame = document.querySelector("#astroInputFrame");
const astroResultFrame = document.querySelector("#astroResultFrame");
const astroInputGrid = document.querySelector("#astroInputGrid");
const astroResultGrid = document.querySelector("#astroResultGrid");
const astroInputCount = document.querySelector("#astroInputCount");
const astroResultStatus = document.querySelector("#astroResultStatus");
const clearButton = document.querySelector("#clearButton");
const remainingCount = document.querySelector("#remainingCount");
const selectedCount = document.querySelector("#selectedCount");
const selectedTitle = document.querySelector("#selectedTitle");
const cardModal = document.querySelector("#cardModal");
const modalBackdrop = document.querySelector("#modalBackdrop");
const modalClose = document.querySelector("#modalClose");
const modalPrint = document.querySelector("#modalPrint");
const modalContent = document.querySelector(".modal-content");
const modalImages = document.querySelector("#modalImages");
const modalCaption = document.querySelector("#modalCaption");

function shuffleCards(cards) {
  const shuffled = [...cards];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function isBirthReading() {
  return activeReading === READING_BIRTH || activeReading === READING_BIRTH_DOUBLE;
}

function isAstroReading() {
  return activeReading === READING_ASTRO;
}

function getSelectedCardLimit() {
  if (activeReading === READING_BIRTH_DOUBLE) {
    return BIRTH_DOUBLE_CARD_LIMIT;
  }

  if (activeReading === READING_BIRTH) {
    return BIRTH_CARD_LIMIT;
  }

  return null;
}

function isBirthComplete() {
  const limit = getSelectedCardLimit();
  return isBirthReading() && selectedCards.length === limit;
}

function updateCounts() {
  const limit = getSelectedCardLimit();
  remainingCount.textContent = `${remainingCards.length} ใบ`;
  selectedCount.textContent = limit ? `${selectedCards.length}/${limit} ใบ` : `${selectedCards.length} ใบ`;
}

function updateHeader() {
  const config = readingConfig[activeReading];
  readingEyebrow.textContent = config.eyebrow;
  readingTitle.textContent = config.title;
  selectedTitle.textContent = config.selectedTitle;
  freeReadingButton.setAttribute("aria-current", String(activeReading === READING_FREE));
  birthReadingButton.setAttribute("aria-current", String(activeReading === READING_BIRTH));
  birthDoubleReadingButton.setAttribute("aria-current", String(activeReading === READING_BIRTH_DOUBLE));
  astroReadingButton.setAttribute("aria-current", String(activeReading === READING_ASTRO));
}

function renderDeck() {
  deckGrid.innerHTML = "";

  remainingCards.forEach((card) => {
    const button = document.createElement("button");
    button.className = "deck-card";
    button.type = "button";
    button.title = "เลือกไพ่";
    button.innerHTML = `<img src="${CARD_BACK}" alt="หลังไพ่" />`;
    button.addEventListener("click", () => selectCard(card.id));
    deckGrid.append(button);
  });
}

function renderSelectedCards() {
  selectedGrid.innerHTML = "";

  selectedCards.forEach((card) => {
    const item = document.createElement("button");
    item.className = "selected-card";
    item.type = "button";
    item.title = "ขยายไพ่";
    const image = isBirthReading() ? CARD_BACK : card.image;
    const alt = isBirthReading() ? "หลังไพ่" : card.name;
    item.innerHTML = `<img src="${image}" alt="${alt}" />`;
    if (!isBirthReading()) {
      item.addEventListener("click", openFreeReadingModal);
    }
    selectedGrid.append(item);
  });
}

function renderBirthSpread() {
  birthSpreadGrid.innerHTML = "";

  for (let row = 1; row <= 5; row += 1) {
    for (let column = 1; column <= 5; column += 1) {
      const house = birthHouses.find((item) => item.row === row && item.column === column);
      const cell = document.createElement("article");

      if (!house) {
        cell.className = "birth-cell birth-cell-empty";
        birthSpreadGrid.append(cell);
        continue;
      }

      const cards = getHouseCards(house.cardOrder);
      cell.className = "birth-cell";
      cell.innerHTML = `
        <button class="birth-card-button" type="button" title="ขยายไพ่">
          <span class="birth-card-pair">
            ${cards.map((card) => `<img src="${card.image}" alt="${card.name}" />`).join("")}
          </span>
        </button>
        <strong>เรือน ${house.house}</strong>
      `;
      cell.querySelector(".birth-card-button").addEventListener("click", () => openCardModal(cards, `เรือน ${house.house}`));
      birthSpreadGrid.append(cell);
    }
  }
}

function renderAstroInput() {
  astroInputGrid.innerHTML = "";
  astroInputCount.textContent = `${Object.keys(astroAssignments).length}/${astroTokens.length}`;

  zodiacSigns.forEach((sign) => {
    const item = document.createElement("article");
    item.className = "astro-sign-input";
    item.innerHTML = `
      <div class="astro-token-grid">
        ${astroTokens
          .map(
            (token) => `
              <button class="astro-token-button" type="button" data-token="${token}" aria-pressed="${astroAssignments[token] === sign}">
                ${token}
              </button>
            `,
          )
          .join("")}
      </div>
      <strong>ราศี${sign}</strong>
    `;

    item.querySelectorAll(".astro-token-button").forEach((button) => {
      button.addEventListener("click", () => assignAstroToken(button.dataset.token, sign));
    });
    astroInputGrid.append(item);
  });
}

function renderAstroResult() {
  astroResultGrid.innerHTML = "";

  if (!isAstroComplete()) {
    astroResultStatus.textContent = "รอข้อมูล";
    const empty = document.createElement("div");
    empty.className = "astro-empty-result";
    empty.textContent = "เลือกค่า ๐ ถึง ๙ และ ล ให้ครบก่อนแสดงผล";
    astroResultGrid.append(empty);
    return;
  }

  astroResultStatus.textContent = "ครบแล้ว";
  const signToHouse = getSignToHouse();

  zodiacSigns.forEach((sign) => {
    const cell = document.createElement("article");
    cell.className = "astro-result-cell";
    cell.style.setProperty("--astro-row", getAstroCellPosition(sign).row);
    cell.style.setProperty("--astro-column", getAstroCellPosition(sign).column);
    const tokens = astroCardTokens.filter((token) => astroAssignments[token] === sign);
    const ascendantMarker = astroAssignments["ล"] === sign ? `<span class="ascendant-marker" aria-label="ลัคนา">ล</span>` : "";

    const cardGrid = getAstroCardGrid(tokens.length + (ascendantMarker ? 1 : 0));

    cell.innerHTML = `
      <div>
        <strong>ราศี${sign}</strong>
        <span>เรือน${signToHouse[sign]}</span>
      </div>
      <div class="astro-card-row" style="--astro-card-columns: ${cardGrid.columns}; --astro-card-rows: ${cardGrid.rows};">
        ${ascendantMarker}
        ${tokens.map((token) => `<img src="${kriyaDaoCardMapping[token]}" alt="ไพ่กริยาดาว ${token}" />`).join("")}
      </div>
    `;
    cell.tabIndex = 0;
    cell.setAttribute("role", "button");
    cell.setAttribute("aria-label", `ขยายผลราศี${sign}`);
    cell.addEventListener("click", () => openAstroZodiacModal(sign));
    cell.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openAstroZodiacModal(sign);
      }
    });
    cell.querySelectorAll(".astro-card-row img").forEach((image) => {
      image.addEventListener("mouseenter", () => image.classList.add("is-hovered"));
      image.addEventListener("mouseleave", () => image.classList.remove("is-hovered"));
    });
    astroResultGrid.append(cell);
  });

  const actions = document.createElement("div");
  actions.className = "astro-result-actions";
  actions.innerHTML = `
    <div class="astro-result-action-buttons">
      <button type="button" id="astroSpreadButton">แสดงรูปแบบผังพื้นชะตา</button>
      <button type="button" id="astroListButton">แสดงรูปแบบลิสต์ภพเรือน</button>
    </div>
    ${renderPersonalMatrix()}
  `;
  actions.querySelector("#astroSpreadButton").addEventListener("click", openAstroHouseSpreadModal);
  actions.querySelector("#astroListButton").addEventListener("click", openAstroHouseListModal);
  astroResultGrid.append(actions);
}

function renderPersonalMatrix() {
  const rows = getPersonalMatrixRows();

  return `
    <div class="astro-personal-matrix">
      <table>
        <thead>
          <tr>
            <th></th>
            <th colspan="${astroCardTokens.length}">ดาวประจำตัว</th>
          </tr>
          <tr>
            <th></th>
            ${astroCardTokens.map((token) => `<th>${token}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (row) => `
                <tr>
                  <th scope="row">${row.label}</th>
                  ${astroCardTokens.map((token) => `<td>${row.tokens.has(token) ? "x" : ""}</td>`).join("")}
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function getPersonalMatrixRows() {
  const moonSign = astroAssignments["๒"];
  const moonLordSign = getAssignedSignForSignLord(moonSign);
  const ascendantSign = astroAssignments["ล"];
  const ascendantLordSign = getAssignedSignForSignLord(ascendantSign);

  return [
    { label: "จันทร์", tokens: getPersonalMatrixTokens(moonSign, ["๒"]) },
    { label: "ตนุจันทร์", tokens: getPersonalMatrixTokens(moonLordSign) },
    { label: "ลัคนา", tokens: getPersonalMatrixTokens(ascendantSign) },
    { label: "ตนุลัคนา", tokens: getPersonalMatrixTokens(ascendantLordSign) },
  ];
}

function getAssignedSignForSignLord(sign) {
  const lordToken = zodiacKasetPlanetMapping[sign];
  return astroAssignments[lordToken];
}

function getPersonalMatrixTokens(baseSign, excludedTokens = []) {
  const tokens = new Set();

  addAssignedTokensAtSign(tokens, baseSign);
  [4, 6, 8].forEach((offset) => addAssignedTokensAtSign(tokens, getOffsetSign(baseSign, offset)));
  getAssignedNumberTokensAtSign(getOffsetSign(baseSign, 11))
    .filter((token) => token !== "๘" && token !== "๙")
    .forEach((token) => tokens.add(token));

  getAssignedNumberTokensAtSign(getOffsetSign(baseSign, 1))
    .filter((token) => token === "๘" || token === "๙")
    .forEach((token) => tokens.add(token));

  if (personalMatrixCardinalSigns.includes(baseSign)) {
    personalMatrixCardinalSigns.forEach((sign) => addAssignedTokensAtSign(tokens, sign));
  }

  excludedTokens.forEach((token) => tokens.delete(token));

  return tokens;
}

function getOffsetSign(sign, offset) {
  const index = zodiacSigns.indexOf(sign);
  if (index === -1) {
    return null;
  }

  return zodiacSigns[(index + offset) % zodiacSigns.length];
}

function addAssignedTokensAtSign(tokens, sign) {
  getAssignedNumberTokensAtSign(sign).forEach((token) => tokens.add(token));
}

function getAssignedNumberTokensAtSign(sign) {
  return astroCardTokens.filter((token) => astroAssignments[token] === sign);
}

function getSignToHouse() {
  const ascendantSign = astroAssignments["ล"];
  const ascendantIndex = zodiacSigns.indexOf(ascendantSign);
  const signToHouse = {};

  houseOrder.forEach((house, index) => {
    signToHouse[zodiacSigns[(ascendantIndex + index) % zodiacSigns.length]] = house;
  });

  return signToHouse;
}

function getAstroCardGrid(cardCount) {
  if (cardCount <= 1) {
    return { columns: 1, rows: 1 };
  }

  if (cardCount <= 2) {
    return { columns: 2, rows: 1 };
  }

  if (cardCount <= 4) {
    return { columns: 2, rows: 2 };
  }

  if (cardCount <= 6) {
    return { columns: 3, rows: 2 };
  }

  if (cardCount <= 8) {
    return { columns: 4, rows: 2 };
  }

  return { columns: 5, rows: 2 };
}

function getAstroCellPosition(sign) {
  const positions = {
    พฤษภ: { row: 1, column: 2 },
    เมษ: { row: 1, column: 3 },
    มีน: { row: 1, column: 4 },
    มิถุน: { row: 2, column: 1 },
    กุมภ์: { row: 2, column: 5 },
    กรกฎ: { row: 3, column: 1 },
    มกร: { row: 3, column: 5 },
    สิงห์: { row: 4, column: 1 },
    ธนู: { row: 4, column: 5 },
    กันย์: { row: 5, column: 2 },
    ตุลย์: { row: 5, column: 3 },
    พิจิก: { row: 5, column: 4 },
  };

  return positions[sign];
}

function assignAstroToken(token, sign) {
  astroAssignments[token] = sign;
  render();
}

function isAstroComplete() {
  return astroTokens.every((token) => astroAssignments[token]);
}

function getHouseCards(cardOrder) {
  const firstCard = selectedCards[cardOrder - 1];

  if (activeReading === READING_BIRTH_DOUBLE) {
    return [firstCard, selectedCards[cardOrder + BIRTH_CARD_LIMIT - 1]];
  }

  return [firstCard];
}

function openCardModal(cards, caption = "") {
  const visibleCards = Array.isArray(cards) ? cards : [cards];
  modalContent.classList.remove("modal-content-astro");
  modalImages.className = "modal-images";
  modalImages.innerHTML = visibleCards
    .map((card) => `<img class="modal-card-image" src="${card.image}" alt="${card.name}" />`)
    .join("");
  modalCaption.textContent = caption;
  modalCaption.hidden = !caption;
  cardModal.hidden = false;
}

function openFreeReadingModal() {
  modalContent.classList.remove("modal-content-astro");
  modalContent.classList.add("modal-content-free-reading", "modal-content-scrollable");
  modalImages.className = "modal-images free-reading-gallery";
  modalImages.innerHTML = selectedCards
    .map(
      (card) => `
        <div class="free-reading-card">
          <img src="${card.image}" alt="${card.name}" />
        </div>
      `,
    )
    .join("");
  modalCaption.textContent = "ทำนายรายคำถาม";
  modalCaption.hidden = false;
  cardModal.hidden = false;
}

function openAstroZodiacModal(sign) {
  const { cardA, cardB, cardC, cardD, cardE, cardF, cardG } = getAstroPopupCards(sign);
  const rows = [
    [cardA, cardB, cardC, cardD],
    [cardD, cardE, cardF, cardG],
  ];

  modalContent.classList.add("modal-content-astro");
  modalImages.className = "modal-images astro-popup-grid";
  modalImages.innerHTML = rows
    .map(
      (row) => `
        <div class="astro-popup-row">
          ${row
            .map(
              (card) => `
                <div class="astro-popup-card">
                  <img class="modal-card-image" src="${card.image}" alt="${card.name}" />
                </div>
              `,
            )
            .join("")}
        </div>
      `,
    )
    .join("");
  modalCaption.textContent = `ราศี${sign}`;
  modalCaption.hidden = false;
  cardModal.hidden = false;
}

function getAstroPopupCards(sign) {
  const signToHouse = getSignToHouse();
  const clickedHouse = signToHouse[sign];
  const clickedKasetPlanet = zodiacKasetPlanetMapping[sign];
  const floatingSign = astroAssignments[clickedKasetPlanet];
  const secondHouse = signToHouse[floatingSign];
  const floatingKasetPlanet = zodiacKasetPlanetMapping[floatingSign];
  const secondFloatingSign = astroAssignments[floatingKasetPlanet];
  const thirdHouse = signToHouse[secondFloatingSign];

  return {
    cardA: { image: houseCardMapping[clickedHouse], name: `ไพ่เรือน${clickedHouse}` },
    cardB: { image: kriyaDaoCardMapping[clickedKasetPlanet], name: `ไพ่กริยาดาว ${clickedKasetPlanet}` },
    cardC: { image: kasetCardMapping[floatingSign], name: `ไพ่เกษตรราศี${floatingSign}` },
    cardD: { image: houseCardMapping[secondHouse], name: `ไพ่เรือน${secondHouse}` },
    cardE: { image: kriyaDaoCardMapping[floatingKasetPlanet], name: `ไพ่กริยาดาว ${floatingKasetPlanet}` },
    cardF: { image: kasetCardMapping[secondFloatingSign], name: `ไพ่เกษตรราศี${secondFloatingSign}` },
    cardG: { image: houseCardMapping[thirdHouse], name: `ไพ่เรือน${thirdHouse}` },
  };
}

function getHouseToSign() {
  const signToHouse = getSignToHouse();
  return Object.fromEntries(Object.entries(signToHouse).map(([sign, house]) => [house, sign]));
}

function openAstroHouseSpreadModal() {
  const houseToSign = getHouseToSign();
  modalContent.classList.add("modal-content-astro", "modal-content-house-spread", "modal-content-scrollable");
  modalImages.className = "modal-images astro-house-orbit";
  modalImages.innerHTML = `
    <div class="astro-house-orbit-logo">
      <img src="logo-dao-song-duang.png" alt="" />
    </div>
  `;
  modalImages.innerHTML += houseOrder
    .map((house, index) => {
      const sign = houseToSign[house];
      const { cardA, cardB, cardC, cardD } = getAstroPopupCards(sign);
      return `
        <article class="astro-house-orbit-cell astro-house-orbit-${house} astro-house-orbit-pos-${index + 1}">
          <strong>เรือน${house}</strong>
          <span>ราศี${sign}</span>
          <div class="astro-house-card-grid">
            ${[cardA, cardB, cardC, cardD]
              .map(
                (card) => `
                  <div class="astro-house-card">
                    <img src="${card.image}" alt="${card.name}" />
                  </div>
                `,
              )
              .join("")}
          </div>
        </article>
      `;
    })
    .join("");

  modalImages.querySelectorAll(".astro-house-orbit-cell").forEach((cell) => {
    cell.addEventListener("mouseenter", () => cell.classList.add("is-hovered"));
    cell.addEventListener("mouseleave", () => cell.classList.remove("is-hovered"));
  });

  modalCaption.textContent = "ผังพื้นชะตา";
  modalCaption.hidden = false;
  cardModal.hidden = false;
}

function openAstroHouseListModal() {
  const houseToSign = getHouseToSign();
  modalContent.classList.add("modal-content-astro", "modal-content-house-list", "modal-content-scrollable");
  modalImages.className = "modal-images astro-house-list";
  modalImages.innerHTML = houseOrder
    .map((house) => {
      const sign = houseToSign[house];
      const { cardA, cardB, cardC, cardD } = getAstroPopupCards(sign);
      return `
        <article class="astro-house-list-row">
          <div>
            <strong>เรือน${house}</strong>
            <span>ราศี${sign}</span>
          </div>
          <div class="astro-house-list-cards">
            ${[cardA, cardB, cardC, cardD]
              .map(
                (card) => `
                  <div class="astro-house-list-card">
                    <img src="${card.image}" alt="${card.name}" />
                  </div>
                `,
              )
              .join("")}
          </div>
        </article>
      `;
    })
    .join("");

  modalCaption.textContent = "ลิสต์ภพเรือน";
  modalCaption.hidden = false;
  cardModal.hidden = false;
}

function closeCardModal() {
  cardModal.hidden = true;
  modalContent.classList.remove("modal-content-astro", "modal-content-house-spread", "modal-content-house-list", "modal-content-free-reading", "modal-content-scrollable");
  modalImages.className = "modal-images";
  modalImages.innerHTML = "";
  modalCaption.textContent = "";
  modalCaption.hidden = true;
}

function renderLayout() {
  const birthComplete = isBirthComplete();
  readingBoard.hidden = birthComplete || isAstroReading();
  birthSpreadFrame.hidden = !birthComplete || isAstroReading();
  astroInputFrame.hidden = !isAstroReading();
  astroResultFrame.hidden = !isAstroReading();
  readingBoard.classList.toggle("reading-board-birth", isBirthReading());
  drawFrame.hidden = birthComplete;
  selectedFrame.hidden = birthComplete;
}

function render() {
  updateHeader();
  updateCounts();
  renderLayout();

  if (isBirthComplete()) {
    renderBirthSpread();
    return;
  }

  if (isAstroReading()) {
    renderAstroInput();
    renderAstroResult();
    return;
  }

  renderDeck();
  renderSelectedCards();
}

function selectCard(cardId) {
  const limit = getSelectedCardLimit();

  if (limit && selectedCards.length >= limit) {
    return;
  }

  const cardIndex = remainingCards.findIndex((card) => card.id === cardId);

  if (cardIndex === -1) {
    return;
  }

  const [card] = remainingCards.splice(cardIndex, 1);
  selectedCards.push(card);
  render();
}

function resetReading() {
  remainingCards = shuffleCards(fullDeck);
  selectedCards = [];
  astroAssignments = {};
  render();
}

function switchReading(reading) {
  if (activeReading === reading) {
    return;
  }

  activeReading = reading;
  resetReading();
}

freeReadingButton.addEventListener("click", () => switchReading(READING_FREE));
birthReadingButton.addEventListener("click", () => switchReading(READING_BIRTH));
birthDoubleReadingButton.addEventListener("click", () => switchReading(READING_BIRTH_DOUBLE));
astroReadingButton.addEventListener("click", () => switchReading(READING_ASTRO));
clearButton.addEventListener("click", resetReading);
modalBackdrop.addEventListener("click", closeCardModal);
modalClose.addEventListener("click", closeCardModal);
modalPrint.addEventListener("click", () => window.print());
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !cardModal.hidden) {
    closeCardModal();
  }
});

resetReading();
