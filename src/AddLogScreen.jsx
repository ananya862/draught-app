// ─────────────────────────────────────────────────────────────────────────────
// DROP-IN REPLACEMENT: AddLogScreen with full alcohol inventory picker
//
// HOW TO USE:
//   1. Copy alcoholInventory.js to your src/ folder
//   2. Replace the existing AddLogScreen component in App.jsx with this file's
//      contents (everything below the imports block)
//   3. Add this import at the top of App.jsx:
//      import { ALCOHOL_INVENTORY, searchInventory, getCategories, getSubcategories } from "./alcoholInventory";
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useMemo, useRef, useEffect } from "react";

// ── Paste your alcoholInventory.js exports here OR import from the file ──────
// (shown below as inline for single-file convenience)

const ALCOHOL_INVENTORY = [
  // BEERS – Lagers
  { id: "heineken", name: "Heineken", brand: "Heineken", category: "beer", subcategory: "Lager", abv: 5.0, typicalVolumes: [330, 500], icon: "🍺", origin: "Netherlands" },
  { id: "budweiser", name: "Budweiser", brand: "Budweiser", category: "beer", subcategory: "Lager", abv: 5.0, typicalVolumes: [330, 440, 568], icon: "🍺", origin: "USA" },
  { id: "corona", name: "Corona Extra", brand: "Corona", category: "beer", subcategory: "Lager", abv: 4.5, typicalVolumes: [330, 355], icon: "🍺", origin: "Mexico" },
  { id: "stella", name: "Stella Artois", brand: "Stella Artois", category: "beer", subcategory: "Lager", abv: 5.0, typicalVolumes: [330, 440, 568], icon: "🍺", origin: "Belgium" },
  { id: "carlsberg", name: "Carlsberg", brand: "Carlsberg", category: "beer", subcategory: "Lager", abv: 3.8, typicalVolumes: [330, 440, 500], icon: "🍺", origin: "Denmark" },
  { id: "peroni", name: "Peroni Nastro Azzurro", brand: "Peroni", category: "beer", subcategory: "Lager", abv: 5.1, typicalVolumes: [330, 620], icon: "🍺", origin: "Italy" },
  { id: "becks", name: "Beck's", brand: "Beck's", category: "beer", subcategory: "Lager", abv: 5.0, typicalVolumes: [275, 330, 500], icon: "🍺", origin: "Germany" },
  { id: "san-miguel", name: "San Miguel", brand: "San Miguel", category: "beer", subcategory: "Lager", abv: 5.0, typicalVolumes: [330, 440, 620], icon: "🍺", origin: "Spain" },
  { id: "modelo", name: "Modelo Especial", brand: "Modelo", category: "beer", subcategory: "Lager", abv: 4.4, typicalVolumes: [330, 355, 710], icon: "🍺", origin: "Mexico" },
  { id: "asahi", name: "Asahi Super Dry", brand: "Asahi", category: "beer", subcategory: "Lager", abv: 5.0, typicalVolumes: [330, 500, 630], icon: "🍺", origin: "Japan" },
  { id: "tiger", name: "Tiger Beer", brand: "Tiger", category: "beer", subcategory: "Lager", abv: 5.0, typicalVolumes: [330, 640], icon: "🍺", origin: "Singapore" },
  { id: "bud-light", name: "Bud Light", brand: "Budweiser", category: "beer", subcategory: "Light Lager", abv: 4.2, typicalVolumes: [330, 355, 473], icon: "🍺", origin: "USA" },
  { id: "coors-light", name: "Coors Light", brand: "Coors", category: "beer", subcategory: "Light Lager", abv: 4.2, typicalVolumes: [330, 355, 473], icon: "🍺", origin: "USA" },
  // Ales & Stouts
  { id: "guinness", name: "Guinness Draught", brand: "Guinness", category: "beer", subcategory: "Stout", abv: 4.2, typicalVolumes: [440, 500, 568], icon: "🍺", origin: "Ireland" },
  { id: "guinness-extra", name: "Guinness Extra Stout", brand: "Guinness", category: "beer", subcategory: "Stout", abv: 5.6, typicalVolumes: [330, 500], icon: "🍺", origin: "Ireland" },
  { id: "murphys", name: "Murphy's Irish Stout", brand: "Murphy's", category: "beer", subcategory: "Stout", abv: 4.0, typicalVolumes: [440, 568], icon: "🍺", origin: "Ireland" },
  { id: "kilkenny", name: "Kilkenny Irish Cream Ale", brand: "Kilkenny", category: "beer", subcategory: "Ale", abv: 4.3, typicalVolumes: [440, 500], icon: "🍺", origin: "Ireland" },
  { id: "smithwicks", name: "Smithwick's Red Ale", brand: "Smithwick's", category: "beer", subcategory: "Ale", abv: 3.8, typicalVolumes: [440, 568], icon: "🍺", origin: "Ireland" },
  { id: "blue-moon", name: "Blue Moon Belgian White", brand: "Blue Moon", category: "beer", subcategory: "Wheat Beer", abv: 5.4, typicalVolumes: [355, 473], icon: "🍺", origin: "USA" },
  { id: "hoegaarden", name: "Hoegaarden Original", brand: "Hoegaarden", category: "beer", subcategory: "Wheat Beer", abv: 4.9, typicalVolumes: [330, 500], icon: "🍺", origin: "Belgium" },
  { id: "leffe-blonde", name: "Leffe Blonde", brand: "Leffe", category: "beer", subcategory: "Abbey Ale", abv: 6.6, typicalVolumes: [330, 750], icon: "🍺", origin: "Belgium" },
  { id: "chimay-blue", name: "Chimay Blue", brand: "Chimay", category: "beer", subcategory: "Trappist Ale", abv: 9.0, typicalVolumes: [330, 750], icon: "🍺", origin: "Belgium" },
  { id: "duvel", name: "Duvel", brand: "Duvel", category: "beer", subcategory: "Strong Ale", abv: 8.5, typicalVolumes: [330, 750], icon: "🍺", origin: "Belgium" },
  { id: "paulaner", name: "Paulaner Hefeweizen", brand: "Paulaner", category: "beer", subcategory: "Wheat Beer", abv: 5.5, typicalVolumes: [500, 1000], icon: "🍺", origin: "Germany" },
  { id: "erdinger", name: "Erdinger Weissbier", brand: "Erdinger", category: "beer", subcategory: "Wheat Beer", abv: 5.3, typicalVolumes: [500, 1000], icon: "🍺", origin: "Germany" },
  { id: "newcastle", name: "Newcastle Brown Ale", brand: "Newcastle", category: "beer", subcategory: "Brown Ale", abv: 4.7, typicalVolumes: [330, 500], icon: "🍺", origin: "UK" },
  // Ciders
  { id: "bulmers", name: "Bulmers Original", brand: "Bulmers", category: "cider", subcategory: "Cider", abv: 4.5, typicalVolumes: [330, 500, 568], icon: "🍏", origin: "Ireland" },
  { id: "strongbow", name: "Strongbow Original", brand: "Strongbow", category: "cider", subcategory: "Cider", abv: 5.0, typicalVolumes: [330, 440, 500, 568], icon: "🍏", origin: "UK" },
  { id: "magners", name: "Magners Original", brand: "Magners", category: "cider", subcategory: "Cider", abv: 4.5, typicalVolumes: [330, 568], icon: "🍏", origin: "Ireland" },
  { id: "kopparberg-str", name: "Kopparberg Strawberry & Lime", brand: "Kopparberg", category: "cider", subcategory: "Fruit Cider", abv: 4.0, typicalVolumes: [330, 500], icon: "🍏", origin: "Sweden" },
  { id: "rekorderlig", name: "Rekorderlig Strawberry", brand: "Rekorderlig", category: "cider", subcategory: "Fruit Cider", abv: 4.0, typicalVolumes: [330, 500], icon: "🍏", origin: "Sweden" },
  { id: "thatchers-gold", name: "Thatchers Gold", brand: "Thatchers", category: "cider", subcategory: "Cider", abv: 4.8, typicalVolumes: [500, 568], icon: "🍏", origin: "UK" },
  // Wines – Red
  { id: "casillero-cabernet", name: "Casillero del Diablo Cabernet", brand: "Casillero del Diablo", category: "wine", subcategory: "Red Wine", abv: 13.5, typicalVolumes: [125, 175, 250, 750], icon: "🍷", origin: "Chile" },
  { id: "wolf-blass-shiraz", name: "Wolf Blass Red Label Shiraz", brand: "Wolf Blass", category: "wine", subcategory: "Red Wine", abv: 13.5, typicalVolumes: [125, 175, 250, 750], icon: "🍷", origin: "Australia" },
  { id: "jacobs-creek-shiraz", name: "Jacob's Creek Shiraz", brand: "Jacob's Creek", category: "wine", subcategory: "Red Wine", abv: 14.0, typicalVolumes: [125, 175, 250, 750], icon: "🍷", origin: "Australia" },
  { id: "yellow-tail-merlot", name: "Yellow Tail Merlot", brand: "Yellow Tail", category: "wine", subcategory: "Red Wine", abv: 13.5, typicalVolumes: [125, 175, 250, 750], icon: "🍷", origin: "Australia" },
  { id: "malbec-trivento", name: "Trivento Reserve Malbec", brand: "Trivento", category: "wine", subcategory: "Red Wine", abv: 13.5, typicalVolumes: [125, 175, 250, 750], icon: "🍷", origin: "Argentina" },
  { id: "apothic-red", name: "Apothic Red Blend", brand: "Apothic", category: "wine", subcategory: "Red Wine", abv: 13.5, typicalVolumes: [125, 175, 250, 750], icon: "🍷", origin: "USA" },
  // Wines – White
  { id: "kim-crawford-sauv", name: "Kim Crawford Sauvignon Blanc", brand: "Kim Crawford", category: "wine", subcategory: "White Wine", abv: 12.5, typicalVolumes: [125, 175, 250, 750], icon: "🥂", origin: "New Zealand" },
  { id: "cloudy-bay", name: "Cloudy Bay Sauvignon Blanc", brand: "Cloudy Bay", category: "wine", subcategory: "White Wine", abv: 13.0, typicalVolumes: [125, 175, 250, 750], icon: "🥂", origin: "New Zealand" },
  { id: "santa-margherita", name: "Santa Margherita Pinot Grigio", brand: "Santa Margherita", category: "wine", subcategory: "White Wine", abv: 12.5, typicalVolumes: [125, 175, 250, 750], icon: "🥂", origin: "Italy" },
  { id: "yellowtail-chardonnay", name: "Yellow Tail Chardonnay", brand: "Yellow Tail", category: "wine", subcategory: "White Wine", abv: 13.0, typicalVolumes: [125, 175, 250, 750], icon: "🥂", origin: "Australia" },
  { id: "barefoot-pinot-grigio", name: "Barefoot Pinot Grigio", brand: "Barefoot", category: "wine", subcategory: "White Wine", abv: 12.5, typicalVolumes: [125, 175, 250, 750], icon: "🥂", origin: "USA" },
  // Wines – Rosé & Sparkling
  { id: "whispering-angel", name: "Whispering Angel Rosé", brand: "Château d'Esclans", category: "wine", subcategory: "Rosé", abv: 13.0, typicalVolumes: [125, 175, 250, 750], icon: "🥂", origin: "France" },
  { id: "moet-chandon", name: "Moët & Chandon Brut", brand: "Moët & Chandon", category: "wine", subcategory: "Champagne", abv: 12.0, typicalVolumes: [125, 750], icon: "🥂", origin: "France" },
  { id: "veuve-clicquot", name: "Veuve Clicquot Brut", brand: "Veuve Clicquot", category: "wine", subcategory: "Champagne", abv: 12.0, typicalVolumes: [125, 750], icon: "🥂", origin: "France" },
  { id: "prosecco-mionetto", name: "Mionetto Prosecco", brand: "Mionetto", category: "wine", subcategory: "Prosecco", abv: 11.0, typicalVolumes: [125, 200, 750], icon: "🥂", origin: "Italy" },
  // Spirits – Whiskey
  { id: "jameson", name: "Jameson Irish Whiskey", brand: "Jameson", category: "spirits", subcategory: "Irish Whiskey", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Ireland" },
  { id: "jack-daniels", name: "Jack Daniel's Tennessee Whiskey", brand: "Jack Daniel's", category: "spirits", subcategory: "American Whiskey", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "USA" },
  { id: "jim-beam", name: "Jim Beam Bourbon", brand: "Jim Beam", category: "spirits", subcategory: "Bourbon", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "USA" },
  { id: "makers-mark", name: "Maker's Mark Bourbon", brand: "Maker's Mark", category: "spirits", subcategory: "Bourbon", abv: 45.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "USA" },
  { id: "woodford-reserve", name: "Woodford Reserve Bourbon", brand: "Woodford Reserve", category: "spirits", subcategory: "Bourbon", abv: 43.2, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "USA" },
  { id: "glenfiddich-12", name: "Glenfiddich 12 Year", brand: "Glenfiddich", category: "spirits", subcategory: "Scotch Whisky", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Scotland" },
  { id: "glenlivet-12", name: "Glenlivet 12 Year", brand: "Glenlivet", category: "spirits", subcategory: "Scotch Whisky", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Scotland" },
  { id: "johnnie-walker-black", name: "Johnnie Walker Black Label", brand: "Johnnie Walker", category: "spirits", subcategory: "Scotch Whisky", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Scotland" },
  { id: "macallan-12", name: "Macallan 12 Year", brand: "Macallan", category: "spirits", subcategory: "Scotch Whisky", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Scotland" },
  { id: "bushmills", name: "Bushmills Original", brand: "Bushmills", category: "spirits", subcategory: "Irish Whiskey", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Ireland" },
  { id: "redbreast-12", name: "Redbreast 12 Year", brand: "Redbreast", category: "spirits", subcategory: "Irish Whiskey", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Ireland" },
  { id: "tullamore-dew", name: "Tullamore D.E.W.", brand: "Tullamore D.E.W.", category: "spirits", subcategory: "Irish Whiskey", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Ireland" },
  { id: "powers-gold", name: "Powers Gold Label", brand: "Powers", category: "spirits", subcategory: "Irish Whiskey", abv: 43.2, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Ireland" },
  { id: "crown-royal", name: "Crown Royal", brand: "Crown Royal", category: "spirits", subcategory: "Canadian Whisky", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Canada" },
  // Spirits – Vodka
  { id: "absolut", name: "Absolut Vodka", brand: "Absolut", category: "spirits", subcategory: "Vodka", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Sweden" },
  { id: "grey-goose", name: "Grey Goose Vodka", brand: "Grey Goose", category: "spirits", subcategory: "Vodka", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "France" },
  { id: "belvedere", name: "Belvedere Vodka", brand: "Belvedere", category: "spirits", subcategory: "Vodka", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Poland" },
  { id: "ketel-one", name: "Ketel One Vodka", brand: "Ketel One", category: "spirits", subcategory: "Vodka", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Netherlands" },
  { id: "smirnoff", name: "Smirnoff No. 21", brand: "Smirnoff", category: "spirits", subcategory: "Vodka", abv: 37.5, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "UK" },
  { id: "tito-vodka", name: "Tito's Handmade Vodka", brand: "Tito's", category: "spirits", subcategory: "Vodka", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "USA" },
  // Spirits – Gin
  { id: "gordons", name: "Gordon's London Dry Gin", brand: "Gordon's", category: "spirits", subcategory: "Gin", abv: 37.5, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "UK" },
  { id: "bombay-sapphire", name: "Bombay Sapphire", brand: "Bombay Sapphire", category: "spirits", subcategory: "Gin", abv: 47.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "UK" },
  { id: "tanqueray", name: "Tanqueray London Dry Gin", brand: "Tanqueray", category: "spirits", subcategory: "Gin", abv: 43.1, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "UK" },
  { id: "hendricks", name: "Hendrick's Gin", brand: "Hendrick's", category: "spirits", subcategory: "Gin", abv: 44.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Scotland" },
  { id: "beefeater", name: "Beefeater London Dry", brand: "Beefeater", category: "spirits", subcategory: "Gin", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "UK" },
  { id: "hendricks", name: "Hendrick's Gin", brand: "Hendrick's", category: "spirits", subcategory: "Gin", abv: 44.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Scotland" },
  // Spirits – Rum
  { id: "bacardi-white", name: "Bacardí Superior White Rum", brand: "Bacardí", category: "spirits", subcategory: "Rum", abv: 37.5, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Puerto Rico" },
  { id: "captain-morgan", name: "Captain Morgan Original Spiced", brand: "Captain Morgan", category: "spirits", subcategory: "Rum", abv: 35.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Jamaica" },
  { id: "malibu", name: "Malibu Coconut Rum", brand: "Malibu", category: "spirits", subcategory: "Rum", abv: 21.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Barbados" },
  { id: "havana-club-7", name: "Havana Club 7 Year", brand: "Havana Club", category: "spirits", subcategory: "Rum", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Cuba" },
  { id: "diplomatico", name: "Diplomático Reserva Exclusiva", brand: "Diplomático", category: "spirits", subcategory: "Rum", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Venezuela" },
  // Spirits – Tequila
  { id: "patron-silver", name: "Patrón Silver Tequila", brand: "Patrón", category: "spirits", subcategory: "Tequila", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Mexico" },
  { id: "don-julio-blanco", name: "Don Julio Blanco", brand: "Don Julio", category: "spirits", subcategory: "Tequila", abv: 38.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Mexico" },
  { id: "jose-cuervo", name: "Jose Cuervo Especial Silver", brand: "Jose Cuervo", category: "spirits", subcategory: "Tequila", abv: 38.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Mexico" },
  // Spirits – Cognac / Brandy
  { id: "hennessy-vs", name: "Hennessy V.S.", brand: "Hennessy", category: "spirits", subcategory: "Cognac", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "France" },
  { id: "remy-martin-vsop", name: "Rémy Martin VSOP", brand: "Rémy Martin", category: "spirits", subcategory: "Cognac", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "France" },
  // Spirits – Liqueurs
  { id: "baileys", name: "Baileys Original Irish Cream", brand: "Baileys", category: "spirits", subcategory: "Liqueur", abv: 17.0, typicalVolumes: [25, 50, 100], icon: "🥃", origin: "Ireland" },
  { id: "kahlua", name: "Kahlúa Coffee Liqueur", brand: "Kahlúa", category: "spirits", subcategory: "Liqueur", abv: 20.0, typicalVolumes: [25, 50], icon: "🥃", origin: "Mexico" },
  { id: "sambuca-molinari", name: "Molinari Sambuca", brand: "Molinari", category: "spirits", subcategory: "Liqueur", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Italy" },
  { id: "jagermeister", name: "Jägermeister", brand: "Jägermeister", category: "spirits", subcategory: "Liqueur", abv: 35.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Germany" },
  { id: "aperol", name: "Aperol", brand: "Aperol", category: "spirits", subcategory: "Liqueur", abv: 11.0, typicalVolumes: [50, 75, 100], icon: "🥃", origin: "Italy" },
  { id: "campari", name: "Campari", brand: "Campari", category: "spirits", subcategory: "Liqueur", abv: 25.0, typicalVolumes: [25, 50], icon: "🥃", origin: "Italy" },
  { id: "disaronno", name: "Disaronno Originale Amaretto", brand: "Disaronno", category: "spirits", subcategory: "Liqueur", abv: 28.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Italy" },
  { id: "cointreau", name: "Cointreau Orange Liqueur", brand: "Cointreau", category: "spirits", subcategory: "Liqueur", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "France" },
  { id: "grand-marnier", name: "Grand Marnier Cordon Rouge", brand: "Grand Marnier", category: "spirits", subcategory: "Liqueur", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "France" },
  // RTD
  { id: "white-claw-lime", name: "White Claw Natural Lime", brand: "White Claw", category: "rtd", subcategory: "Hard Seltzer", abv: 5.0, typicalVolumes: [330, 355], icon: "🥤", origin: "USA" },
  { id: "smirnoff-ice", name: "Smirnoff Ice Original", brand: "Smirnoff", category: "rtd", subcategory: "Alcopop", abv: 4.5, typicalVolumes: [275, 330], icon: "🥤", origin: "UK" },
  { id: "bacardi-breezer", name: "Bacardí Breezer Orange", brand: "Bacardí", category: "rtd", subcategory: "Alcopop", abv: 4.0, typicalVolumes: [275], icon: "🥤", origin: "UK" },
  { id: "gordons-gt-can", name: "Gordon's Pink Gin & Tonic Can", brand: "Gordon's", category: "rtd", subcategory: "Pre-mixed", abv: 5.0, typicalVolumes: [250], icon: "🥤", origin: "UK" },
];

const CATEGORY_META = {
  beer:    { label: "Beer",    icon: "🍺", color: "amber" },
  cider:   { label: "Cider",   icon: "🍏", color: "green" },
  wine:    { label: "Wine",    icon: "🍷", color: "rose" },
  spirits: { label: "Spirits", icon: "🥃", color: "orange" },
  rtd:     { label: "RTD",     icon: "🥤", color: "sky" },
  custom:  { label: "Custom",  icon: "🫗", color: "zinc" },
};

const calcPureAlcohol = (vol, abv) => parseFloat((vol * (abv / 100) * 0.789).toFixed(2));
const stdDrinks = (g) => parseFloat((g / 10).toFixed(2));
const todayStr = () => new Date().toISOString().split("T")[0];

// ── Main upgraded AddLogScreen ────────────────────────────────────────────────
export default function AddLogScreen({ editLog, onBack, onSave }) {
  const [mode, setMode] = useState("browse"); // browse | manual
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState(null);     // chosen inventory item
  const [form, setForm] = useState(editLog ? {
    volumeMl: editLog.volumeMl,
    abv: editLog.abv,
    time: editLog.time || "",
    date: editLog.date,
    drinkName: editLog.drinkName || "",
    drinkType: editLog.drinkType,
    inventoryId: editLog.inventoryId || null,
  } : {
    volumeMl: 330, abv: 5.0, time: "", date: todayStr(),
    drinkName: "", drinkType: "beer", inventoryId: null,
  });
  const searchRef = useRef(null);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  // Pre-select if editing an inventory item
  useEffect(() => {
    if (editLog?.inventoryId) {
      const item = ALCOHOL_INVENTORY.find(a => a.id === editLog.inventoryId);
      if (item) setSelected(item);
    }
  }, []);

  const filtered = useMemo(() => {
    let list = ALCOHOL_INVENTORY;
    if (activeCategory !== "all") list = list.filter(a => a.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.brand.toLowerCase().includes(q) ||
        a.subcategory.toLowerCase().includes(q) ||
        a.origin.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeCategory]);

  // Group by subcategory for display
  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(item => {
      if (!map[item.subcategory]) map[item.subcategory] = [];
      map[item.subcategory].push(item);
    });
    return map;
  }, [filtered]);

  const pickItem = (item) => {
    setSelected(item);
    set("drinkName", item.name);
    set("drinkType", item.category);
    set("abv", item.abv);
    set("volumeMl", item.typicalVolumes[0]);
    set("inventoryId", item.id);
  };

  const preview = calcPureAlcohol(+form.volumeMl, +form.abv);

  const colorMap = { amber: "#f59e0b", green: "#10b981", rose: "#fb7185", orange: "#f97316", sky: "#38bdf8", zinc: "#71717a" };

  return (
    <div style={{ fontFamily: "'DM Mono', monospace", background: "#0a0a0a", minHeight: "100vh" }}
      className="text-zinc-100 max-w-sm mx-auto">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@700;800&display=swap');`}</style>

      {/* Header */}
      <div className="p-6 pb-0">
        <button onClick={onBack} className="flex items-center gap-1.5 text-zinc-500 text-sm mb-6 hover:text-zinc-300 transition-colors">
          ← Back
        </button>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-2xl text-zinc-100 mb-1">
          {editLog ? "Edit Entry" : "Log a Drink"}
        </h2>
        <p className="text-zinc-600 text-sm mb-4">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>

        {/* Mode toggle */}
        <div className="flex gap-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-1 mb-5">
          <button onClick={() => setMode("browse")}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${mode === "browse" ? "bg-amber-500 text-zinc-900" : "text-zinc-500"}`}>
            🔍 Browse Inventory
          </button>
          <button onClick={() => setMode("manual")}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${mode === "manual" ? "bg-amber-500 text-zinc-900" : "text-zinc-500"}`}>
            ✎ Enter Manually
          </button>
        </div>
      </div>

      {/* ── BROWSE MODE ── */}
      {mode === "browse" && (
        <div>
          {/* Search */}
          <div className="px-6 mb-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 text-sm">🔍</span>
              <input
                ref={searchRef}
                placeholder="Search brand, type, origin..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:border-amber-500/60 transition-colors"
              />
              {search && (
                <button onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400">✕</button>
              )}
            </div>
          </div>

          {/* Category filter */}
          <div className="flex gap-2 px-6 mb-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            <button onClick={() => setActiveCategory("all")}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                activeCategory === "all" ? "bg-amber-500/20 border-amber-500/50 text-amber-300" : "bg-zinc-900 border-zinc-800 text-zinc-500"
              }`}>All</button>
            {Object.entries(CATEGORY_META).filter(([k]) => k !== "custom").map(([key, meta]) => (
              <button key={key} onClick={() => setActiveCategory(key)}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  activeCategory === key ? "bg-amber-500/20 border-amber-500/50 text-amber-300" : "bg-zinc-900 border-zinc-800 text-zinc-500"
                }`}>
                {meta.icon} {meta.label}
              </button>
            ))}
          </div>

          {/* Selected item banner */}
          {selected && (
            <div className="mx-6 mb-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3 flex items-center gap-3">
              <span className="text-2xl">{selected.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-amber-300 text-sm font-medium truncate">{selected.name}</p>
                <p className="text-zinc-500 text-xs">{selected.abv}% ABV · {selected.origin}</p>
              </div>
              <button onClick={() => { setSelected(null); set("inventoryId", null); }}
                className="text-zinc-600 hover:text-zinc-400 text-xs px-2 py-1 rounded-lg hover:bg-zinc-800 transition-colors">✕</button>
            </div>
          )}

          {/* Results count */}
          <p className="px-6 text-zinc-700 text-xs mb-3">
            {filtered.length} drink{filtered.length !== 1 ? "s" : ""} {search ? `matching "${search}"` : ""}
          </p>

          {/* List grouped by subcategory */}
          <div className="px-6 pb-2" style={{ maxHeight: "42vh", overflowY: "auto" }}>
            {Object.keys(grouped).length === 0 && (
              <div className="text-center py-10 text-zinc-600 text-sm">
                No drinks found.<br />
                <button onClick={() => setMode("manual")} className="text-amber-500 text-xs mt-2 underline">Enter manually instead</button>
              </div>
            )}
            {Object.entries(grouped).map(([subcat, items]) => (
              <div key={subcat} className="mb-4">
                <p className="text-zinc-600 text-xs uppercase tracking-widest mb-2">{subcat}</p>
                <div className="flex flex-col gap-1.5">
                  {items.map(item => {
                    const isSelected = selected?.id === item.id;
                    const catColor = colorMap[CATEGORY_META[item.category]?.color] || "#f59e0b";
                    return (
                      <button key={item.id} onClick={() => pickItem(item)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl border transition-all ${
                          isSelected
                            ? "bg-amber-500/15 border-amber-500/50"
                            : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                        }`}>
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{item.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-zinc-200 text-sm truncate">{item.name}</p>
                            <p className="text-zinc-600 text-xs">{item.brand} · {item.origin}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-bold text-sm" style={{ color: catColor }}>{item.abv}%</p>
                            <p className="text-zinc-700 text-xs">{item.typicalVolumes[0]}ml+</p>
                          </div>
                          {isSelected && <span className="text-amber-400">✓</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Volume + time selectors (shown once item is selected) */}
          {selected && (
            <div className="px-6 pt-3 border-t border-zinc-800 mt-2">
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">Serving Details</p>

              {/* Volume quick picks */}
              <p className="text-zinc-600 text-xs mb-2">Volume</p>
              <div className="flex gap-2 mb-2 flex-wrap">
                {selected.typicalVolumes.map(v => (
                  <button key={v} onClick={() => set("volumeMl", v)}
                    className={`px-3 py-1.5 rounded-xl text-xs border transition-all ${
                      +form.volumeMl === v ? "bg-amber-500/20 border-amber-500/50 text-amber-300" : "bg-zinc-900 border-zinc-800 text-zinc-500"
                    }`}>{v}ml</button>
                ))}
              </div>
              <input type="number" placeholder="Custom ml"
                value={form.volumeMl} onChange={e => set("volumeMl", +e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-500/60 mb-3" />

              {/* ABV (prefilled but editable) */}
              <div className="flex justify-between mb-1">
                <p className="text-zinc-600 text-xs">ABV %</p>
                <span className="text-amber-400 text-xs">{form.abv}%</span>
              </div>
              <input type="range" min="0.5" max="70" step="0.5" value={form.abv}
                onChange={e => set("abv", +e.target.value)} className="w-full mb-3" />

              <div className="grid grid-cols-2 gap-3 mb-4">
                <label className="flex flex-col gap-1">
                  <span className="text-zinc-600 text-xs">Time</span>
                  <input type="time" value={form.time} onChange={e => set("time", e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm outline-none focus:border-amber-500/60" />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-zinc-600 text-xs">Date</span>
                  <input type="date" value={form.date} onChange={e => set("date", e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm outline-none focus:border-amber-500/60" />
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── MANUAL MODE ── */}
      {mode === "manual" && (
        <div className="px-6">
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-zinc-500 text-xs uppercase tracking-widest">Drink Name</span>
              <input placeholder="e.g. House Red, Local IPA..."
                value={form.drinkName} onChange={e => set("drinkName", e.target.value)}
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500/60" />
            </label>

            <div className="flex flex-col gap-1.5">
              <span className="text-zinc-500 text-xs uppercase tracking-widest">Category</span>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(CATEGORY_META).map(([key, meta]) => (
                  <button key={key} onClick={() => set("drinkType", key)}
                    className={`py-2.5 rounded-xl text-xs border flex flex-col items-center gap-1 transition-all ${
                      form.drinkType === key ? "bg-amber-500/20 border-amber-500/50 text-amber-300" : "bg-zinc-900 border-zinc-800 text-zinc-500"
                    }`}>
                    <span className="text-lg">{meta.icon}</span>{meta.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-zinc-500 text-xs uppercase tracking-widest">Volume (ml)</span>
              <input type="number" placeholder="330"
                value={form.volumeMl} onChange={e => set("volumeMl", +e.target.value)}
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500/60" />
            </label>

            <label className="flex flex-col gap-1.5">
              <div className="flex justify-between">
                <span className="text-zinc-500 text-xs uppercase tracking-widest">ABV %</span>
                <span className="text-amber-400 text-xs">{form.abv}%</span>
              </div>
              <input type="range" min="0.5" max="70" step="0.5" value={form.abv}
                onChange={e => set("abv", +e.target.value)} className="w-full" />
              <input type="number" placeholder="5.0" value={form.abv}
                onChange={e => set("abv", +e.target.value)}
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500/60" />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-zinc-500 text-xs uppercase tracking-widest">Time</span>
                <input type="time" value={form.time} onChange={e => set("time", e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500/60" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-zinc-500 text-xs uppercase tracking-widest">Date</span>
                <input type="date" value={form.date} onChange={e => set("date", e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500/60" />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* ── Calc preview + Save ── */}
      <div className="px-6 pt-4 pb-8">
        <div className="bg-zinc-900 border border-amber-500/20 rounded-2xl p-4 mb-4">
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Calculated</p>
          <div className="flex gap-6">
            <div>
              <p className="text-2xl font-black text-amber-400" style={{ fontFamily: "'Syne', sans-serif" }}>{preview.toFixed(1)}g</p>
              <p className="text-zinc-600 text-xs">pure alcohol</p>
            </div>
            <div>
              <p className="text-2xl font-black text-zinc-300" style={{ fontFamily: "'Syne', sans-serif" }}>{stdDrinks(preview).toFixed(2)}</p>
              <p className="text-zinc-600 text-xs">standard drinks</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (!form.volumeMl || !form.abv) return;
            onSave({
              drinkType: form.drinkType,
              drinkName: form.drinkName || selected?.name || form.drinkType,
              volumeMl: +form.volumeMl,
              abv: +form.abv,
              time: form.time,
              date: form.date,
              inventoryId: form.inventoryId || null,
            });
          }}
          disabled={!form.volumeMl || !form.abv || (mode === "browse" && !selected && !form.drinkName)}
          className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-900 font-bold rounded-2xl p-4 transition-all text-sm">
          {editLog ? "Update Entry" : "Save Drink"}
        </button>

        {mode === "browse" && !selected && (
          <p className="text-center text-zinc-700 text-xs mt-3">Select a drink from the list above to continue</p>
        )}
      </div>
    </div>
  );
}
