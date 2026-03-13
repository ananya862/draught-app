// alcoholInventory.js
// Comprehensive alcohol brand database with real ABV and typical serving sizes

export const ALCOHOL_INVENTORY = [

  // ─── BEERS – Lagers ───
  { id: "heineken", name: "Heineken", brand: "Heineken", category: "beer", subcategory: "Lager", abv: 5.0, typicalVolumes: [330, 500], icon: "🍺", origin: "Netherlands" },
  { id: "budweiser", name: "Budweiser", brand: "Budweiser", category: "beer", subcategory: "Lager", abv: 5.0, typicalVolumes: [330, 440, 568], icon: "🍺", origin: "USA" },
  { id: "corona", name: "Corona Extra", brand: "Corona", category: "beer", subcategory: "Lager", abv: 4.5, typicalVolumes: [330, 355], icon: "🍺", origin: "Mexico" },
  { id: "stella", name: "Stella Artois", brand: "Stella Artois", category: "beer", subcategory: "Lager", abv: 5.0, typicalVolumes: [330, 440, 568], icon: "🍺", origin: "Belgium" },
  { id: "carlsberg", name: "Carlsberg", brand: "Carlsberg", category: "beer", subcategory: "Lager", abv: 3.8, typicalVolumes: [330, 440, 500], icon: "🍺", origin: "Denmark" },
  { id: "peroni", name: "Peroni Nastro Azzurro", brand: "Peroni", category: "beer", subcategory: "Lager", abv: 5.1, typicalVolumes: [330, 620], icon: "🍺", origin: "Italy" },
  { id: "becks", name: "Beck's", brand: "Beck's", category: "beer", subcategory: "Lager", abv: 5.0, typicalVolumes: [275, 330, 500], icon: "🍺", origin: "Germany" },
  { id: "fosters", name: "Foster's Lager", brand: "Foster's", category: "beer", subcategory: "Lager", abv: 4.0, typicalVolumes: [330, 440, 568], icon: "🍺", origin: "Australia" },
  { id: "san-miguel", name: "San Miguel", brand: "San Miguel", category: "beer", subcategory: "Lager", abv: 5.0, typicalVolumes: [330, 440, 620], icon: "🍺", origin: "Spain" },
  { id: "modelo", name: "Modelo Especial", brand: "Modelo", category: "beer", subcategory: "Lager", abv: 4.4, typicalVolumes: [330, 355, 710], icon: "🍺", origin: "Mexico" },
  { id: "tiger", name: "Tiger Beer", brand: "Tiger", category: "beer", subcategory: "Lager", abv: 5.0, typicalVolumes: [330, 640], icon: "🍺", origin: "Singapore" },
  { id: "tsing-tao", name: "Tsingtao", brand: "Tsingtao", category: "beer", subcategory: "Lager", abv: 4.7, typicalVolumes: [330, 640], icon: "🍺", origin: "China" },
  { id: "asahi", name: "Asahi Super Dry", brand: "Asahi", category: "beer", subcategory: "Lager", abv: 5.0, typicalVolumes: [330, 500, 630], icon: "🍺", origin: "Japan" },
  { id: "sapporo", name: "Sapporo Premium", brand: "Sapporo", category: "beer", subcategory: "Lager", abv: 4.9, typicalVolumes: [330, 650], icon: "🍺", origin: "Japan" },
  { id: "kirin", name: "Kirin Ichiban", brand: "Kirin", category: "beer", subcategory: "Lager", abv: 5.0, typicalVolumes: [330, 500], icon: "🍺", origin: "Japan" },
  { id: "bud-light", name: "Bud Light", brand: "Budweiser", category: "beer", subcategory: "Light Lager", abv: 4.2, typicalVolumes: [330, 355, 473], icon: "🍺", origin: "USA" },
  { id: "coors-light", name: "Coors Light", brand: "Coors", category: "beer", subcategory: "Light Lager", abv: 4.2, typicalVolumes: [330, 355, 473], icon: "🍺", origin: "USA" },
  { id: "miller-lite", name: "Miller Lite", brand: "Miller", category: "beer", subcategory: "Light Lager", abv: 4.2, typicalVolumes: [330, 355, 473], icon: "🍺", origin: "USA" },

  // ─── BEERS – Ales & Stouts ───
  { id: "guinness", name: "Guinness Draught", brand: "Guinness", category: "beer", subcategory: "Stout", abv: 4.2, typicalVolumes: [440, 500, 568], icon: "🍺", origin: "Ireland" },
  { id: "guinness-extra", name: "Guinness Extra Stout", brand: "Guinness", category: "beer", subcategory: "Stout", abv: 5.6, typicalVolumes: [330, 500], icon: "🍺", origin: "Ireland" },
  { id: "murphys", name: "Murphy's Irish Stout", brand: "Murphy's", category: "beer", subcategory: "Stout", abv: 4.0, typicalVolumes: [440, 568], icon: "🍺", origin: "Ireland" },
  { id: "kilkenny", name: "Kilkenny Irish Cream Ale", brand: "Kilkenny", category: "beer", subcategory: "Ale", abv: 4.3, typicalVolumes: [440, 500], icon: "🍺", origin: "Ireland" },
  { id: "smithwicks", name: "Smithwick's Red Ale", brand: "Smithwick's", category: "beer", subcategory: "Ale", abv: 3.8, typicalVolumes: [440, 568], icon: "🍺", origin: "Ireland" },
  { id: "sierra-nevada", name: "Sierra Nevada Pale Ale", brand: "Sierra Nevada", category: "beer", subcategory: "Pale Ale", abv: 5.6, typicalVolumes: [355, 473], icon: "🍺", origin: "USA" },
  { id: "brooklyn-lager", name: "Brooklyn Lager", brand: "Brooklyn Brewery", category: "beer", subcategory: "Lager", abv: 5.2, typicalVolumes: [355, 473], icon: "🍺", origin: "USA" },
  { id: "blue-moon", name: "Blue Moon Belgian White", brand: "Blue Moon", category: "beer", subcategory: "Wheat Beer", abv: 5.4, typicalVolumes: [355, 473], icon: "🍺", origin: "USA" },
  { id: "hoegaarden", name: "Hoegaarden Original", brand: "Hoegaarden", category: "beer", subcategory: "Wheat Beer", abv: 4.9, typicalVolumes: [330, 500], icon: "🍺", origin: "Belgium" },
  { id: "leffe-blonde", name: "Leffe Blonde", brand: "Leffe", category: "beer", subcategory: "Abbey Ale", abv: 6.6, typicalVolumes: [330, 750], icon: "🍺", origin: "Belgium" },
  { id: "leffe-brune", name: "Leffe Brune", brand: "Leffe", category: "beer", subcategory: "Abbey Ale", abv: 6.5, typicalVolumes: [330, 750], icon: "🍺", origin: "Belgium" },
  { id: "chimay-blue", name: "Chimay Blue", brand: "Chimay", category: "beer", subcategory: "Trappist Ale", abv: 9.0, typicalVolumes: [330, 750], icon: "🍺", origin: "Belgium" },
  { id: "duvel", name: "Duvel", brand: "Duvel", category: "beer", subcategory: "Strong Ale", abv: 8.5, typicalVolumes: [330, 750], icon: "🍺", origin: "Belgium" },
  { id: "delirium-tremens", name: "Delirium Tremens", brand: "Delirium", category: "beer", subcategory: "Strong Ale", abv: 8.5, typicalVolumes: [330, 750], icon: "🍺", origin: "Belgium" },
  { id: "paulaner", name: "Paulaner Hefeweizen", brand: "Paulaner", category: "beer", subcategory: "Wheat Beer", abv: 5.5, typicalVolumes: [500, 1000], icon: "🍺", origin: "Germany" },
  { id: "erdinger", name: "Erdinger Weissbier", brand: "Erdinger", category: "beer", subcategory: "Wheat Beer", abv: 5.3, typicalVolumes: [500, 1000], icon: "🍺", origin: "Germany" },
  { id: "warsteiner", name: "Warsteiner Premium", brand: "Warsteiner", category: "beer", subcategory: "Pilsner", abv: 4.8, typicalVolumes: [330, 500], icon: "🍺", origin: "Germany" },
  { id: "newcastle", name: "Newcastle Brown Ale", brand: "Newcastle", category: "beer", subcategory: "Brown Ale", abv: 4.7, typicalVolumes: [330, 500], icon: "🍺", origin: "UK" },
  { id: "old-speckled-hen", name: "Old Speckled Hen", brand: "Greene King", category: "beer", subcategory: "Ale", abv: 5.0, typicalVolumes: [440, 500], icon: "🍺", origin: "UK" },
  { id: "bishops-finger", name: "Bishop's Finger", brand: "Shepherd Neame", category: "beer", subcategory: "Ale", abv: 5.4, typicalVolumes: [500], icon: "🍺", origin: "UK" },

  // ─── CIDERS ───
  { id: "bulmers", name: "Bulmers Original", brand: "Bulmers", category: "cider", subcategory: "Cider", abv: 4.5, typicalVolumes: [330, 500, 568], icon: "🍏", origin: "Ireland" },
  { id: "strongbow", name: "Strongbow Original", brand: "Strongbow", category: "cider", subcategory: "Cider", abv: 5.0, typicalVolumes: [330, 440, 500, 568], icon: "🍏", origin: "UK" },
  { id: "magners", name: "Magners Original", brand: "Magners", category: "cider", subcategory: "Cider", abv: 4.5, typicalVolumes: [330, 568], icon: "🍏", origin: "Ireland" },
  { id: "kopparberg-str", name: "Kopparberg Strawberry & Lime", brand: "Kopparberg", category: "cider", subcategory: "Fruit Cider", abv: 4.0, typicalVolumes: [330, 500], icon: "🍏", origin: "Sweden" },
  { id: "kopparberg-mixed", name: "Kopparberg Mixed Fruit", brand: "Kopparberg", category: "cider", subcategory: "Fruit Cider", abv: 4.0, typicalVolumes: [330, 500], icon: "🍏", origin: "Sweden" },
  { id: "rekorderlig", name: "Rekorderlig Strawberry", brand: "Rekorderlig", category: "cider", subcategory: "Fruit Cider", abv: 4.0, typicalVolumes: [330, 500], icon: "🍏", origin: "Sweden" },
  { id: "angry-orchard", name: "Angry Orchard Crisp Apple", brand: "Angry Orchard", category: "cider", subcategory: "Cider", abv: 5.0, typicalVolumes: [330, 355], icon: "🍏", origin: "USA" },
  { id: "thatchers-gold", name: "Thatchers Gold", brand: "Thatchers", category: "cider", subcategory: "Cider", abv: 4.8, typicalVolumes: [500, 568], icon: "🍏", origin: "UK" },
  { id: "heineken-cider", name: "Heineken Cider", brand: "Heineken", category: "cider", subcategory: "Cider", abv: 4.5, typicalVolumes: [330, 500], icon: "🍏", origin: "Netherlands" },

  // ─── WINES – Red ───
  { id: "casillero-cabernet", name: "Casillero del Diablo Cabernet", brand: "Casillero del Diablo", category: "wine", subcategory: "Red Wine", abv: 13.5, typicalVolumes: [125, 175, 250, 750], icon: "🍷", origin: "Chile" },
  { id: "wolf-blass-shiraz", name: "Wolf Blass Red Label Shiraz", brand: "Wolf Blass", category: "wine", subcategory: "Red Wine", abv: 13.5, typicalVolumes: [125, 175, 250, 750], icon: "🍷", origin: "Australia" },
  { id: "jacobs-creek-shiraz", name: "Jacob's Creek Shiraz", brand: "Jacob's Creek", category: "wine", subcategory: "Red Wine", abv: 14.0, typicalVolumes: [125, 175, 250, 750], icon: "🍷", origin: "Australia" },
  { id: "yellow-tail-merlot", name: "Yellow Tail Merlot", brand: "Yellow Tail", category: "wine", subcategory: "Red Wine", abv: 13.5, typicalVolumes: [125, 175, 250, 750], icon: "🍷", origin: "Australia" },
  { id: "barefoot-cab", name: "Barefoot Cabernet Sauvignon", brand: "Barefoot", category: "wine", subcategory: "Red Wine", abv: 13.5, typicalVolumes: [125, 175, 250, 750], icon: "🍷", origin: "USA" },
  { id: "malbec-trivento", name: "Trivento Reserve Malbec", brand: "Trivento", category: "wine", subcategory: "Red Wine", abv: 13.5, typicalVolumes: [125, 175, 250, 750], icon: "🍷", origin: "Argentina" },
  { id: "apothic-red", name: "Apothic Red Blend", brand: "Apothic", category: "wine", subcategory: "Red Wine", abv: 13.5, typicalVolumes: [125, 175, 250, 750], icon: "🍷", origin: "USA" },

  // ─── WINES – White ───
  { id: "kim-crawford-sauv", name: "Kim Crawford Sauvignon Blanc", brand: "Kim Crawford", category: "wine", subcategory: "White Wine", abv: 12.5, typicalVolumes: [125, 175, 250, 750], icon: "🥂", origin: "New Zealand" },
  { id: "cloudy-bay", name: "Cloudy Bay Sauvignon Blanc", brand: "Cloudy Bay", category: "wine", subcategory: "White Wine", abv: 13.0, typicalVolumes: [125, 175, 250, 750], icon: "🥂", origin: "New Zealand" },
  { id: "santa-margherita", name: "Santa Margherita Pinot Grigio", brand: "Santa Margherita", category: "wine", subcategory: "White Wine", abv: 12.5, typicalVolumes: [125, 175, 250, 750], icon: "🥂", origin: "Italy" },
  { id: "yellowtail-chardonnay", name: "Yellow Tail Chardonnay", brand: "Yellow Tail", category: "wine", subcategory: "White Wine", abv: 13.0, typicalVolumes: [125, 175, 250, 750], icon: "🥂", origin: "Australia" },
  { id: "jacobs-creek-riesling", name: "Jacob's Creek Riesling", brand: "Jacob's Creek", category: "wine", subcategory: "White Wine", abv: 11.5, typicalVolumes: [125, 175, 250, 750], icon: "🥂", origin: "Australia" },
  { id: "barefoot-pinot-grigio", name: "Barefoot Pinot Grigio", brand: "Barefoot", category: "wine", subcategory: "White Wine", abv: 12.5, typicalVolumes: [125, 175, 250, 750], icon: "🥂", origin: "USA" },

  // ─── WINES – Rosé & Sparkling ───
  { id: "whispering-angel", name: "Whispering Angel Rosé", brand: "Château d'Esclans", category: "wine", subcategory: "Rosé", abv: 13.0, typicalVolumes: [125, 175, 250, 750], icon: "🥂", origin: "France" },
  { id: "mateus-rose", name: "Mateus Rosé", brand: "Mateus", category: "wine", subcategory: "Rosé", abv: 11.0, typicalVolumes: [125, 175, 250, 750], icon: "🥂", origin: "Portugal" },
  { id: "moet-chandon", name: "Moët & Chandon Brut", brand: "Moët & Chandon", category: "wine", subcategory: "Champagne", abv: 12.0, typicalVolumes: [125, 750], icon: "🥂", origin: "France" },
  { id: "veuve-clicquot", name: "Veuve Clicquot Brut", brand: "Veuve Clicquot", category: "wine", subcategory: "Champagne", abv: 12.0, typicalVolumes: [125, 750], icon: "🥂", origin: "France" },
  { id: "freixenet", name: "Freixenet Cordon Negro", brand: "Freixenet", category: "wine", subcategory: "Cava", abv: 11.5, typicalVolumes: [125, 750], icon: "🥂", origin: "Spain" },
  { id: "prosecco-mionetto", name: "Mionetto Prosecco", brand: "Mionetto", category: "wine", subcategory: "Prosecco", abv: 11.0, typicalVolumes: [125, 200, 750], icon: "🥂", origin: "Italy" },

  // ─── SPIRITS – Whiskey / Whisky ───
  { id: "jameson", name: "Jameson Irish Whiskey", brand: "Jameson", category: "spirits", subcategory: "Irish Whiskey", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Ireland" },
  { id: "jack-daniels", name: "Jack Daniel's Tennessee Whiskey", brand: "Jack Daniel's", category: "spirits", subcategory: "American Whiskey", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "USA" },
  { id: "jim-beam", name: "Jim Beam Bourbon", brand: "Jim Beam", category: "spirits", subcategory: "Bourbon", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "USA" },
  { id: "makers-mark", name: "Maker's Mark Bourbon", brand: "Maker's Mark", category: "spirits", subcategory: "Bourbon", abv: 45.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "USA" },
  { id: "woodford-reserve", name: "Woodford Reserve Bourbon", brand: "Woodford Reserve", category: "spirits", subcategory: "Bourbon", abv: 43.2, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "USA" },
  { id: "bulleit-bourbon", name: "Bulleit Bourbon", brand: "Bulleit", category: "spirits", subcategory: "Bourbon", abv: 45.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "USA" },
  { id: "wild-turkey", name: "Wild Turkey 101", brand: "Wild Turkey", category: "spirits", subcategory: "Bourbon", abv: 50.5, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "USA" },
  { id: "glenfiddich-12", name: "Glenfiddich 12 Year", brand: "Glenfiddich", category: "spirits", subcategory: "Scotch Whisky", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Scotland" },
  { id: "glenlivet-12", name: "Glenlivet 12 Year", brand: "Glenlivet", category: "spirits", subcategory: "Scotch Whisky", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Scotland" },
  { id: "johnnie-walker-red", name: "Johnnie Walker Red Label", brand: "Johnnie Walker", category: "spirits", subcategory: "Scotch Whisky", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Scotland" },
  { id: "johnnie-walker-black", name: "Johnnie Walker Black Label", brand: "Johnnie Walker", category: "spirits", subcategory: "Scotch Whisky", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Scotland" },
  { id: "johnnie-walker-blue", name: "Johnnie Walker Blue Label", brand: "Johnnie Walker", category: "spirits", subcategory: "Scotch Whisky", abv: 43.8, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Scotland" },
  { id: "chivas-regal-12", name: "Chivas Regal 12 Year", brand: "Chivas Regal", category: "spirits", subcategory: "Scotch Whisky", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Scotland" },
  { id: "lagavulin-16", name: "Lagavulin 16 Year", brand: "Lagavulin", category: "spirits", subcategory: "Scotch Whisky", abv: 43.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Scotland" },
  { id: "laphroaig-10", name: "Laphroaig 10 Year", brand: "Laphroaig", category: "spirits", subcategory: "Scotch Whisky", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Scotland" },
  { id: "macallan-12", name: "Macallan 12 Year", brand: "Macallan", category: "spirits", subcategory: "Scotch Whisky", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Scotland" },
  { id: "bushmills", name: "Bushmills Original", brand: "Bushmills", category: "spirits", subcategory: "Irish Whiskey", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Ireland" },
  { id: "redbreast-12", name: "Redbreast 12 Year", brand: "Redbreast", category: "spirits", subcategory: "Irish Whiskey", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Ireland" },
  { id: "powers-gold", name: "Powers Gold Label", brand: "Powers", category: "spirits", subcategory: "Irish Whiskey", abv: 43.2, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Ireland" },
  { id: "tullamore-dew", name: "Tullamore D.E.W.", brand: "Tullamore D.E.W.", category: "spirits", subcategory: "Irish Whiskey", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Ireland" },
  { id: "crown-royal", name: "Crown Royal", brand: "Crown Royal", category: "spirits", subcategory: "Canadian Whisky", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Canada" },
  { id: "canadian-club", name: "Canadian Club", brand: "Canadian Club", category: "spirits", subcategory: "Canadian Whisky", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Canada" },

  // ─── SPIRITS – Vodka ───
  { id: "absolut", name: "Absolut Vodka", brand: "Absolut", category: "spirits", subcategory: "Vodka", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Sweden" },
  { id: "grey-goose", name: "Grey Goose Vodka", brand: "Grey Goose", category: "spirits", subcategory: "Vodka", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "France" },
  { id: "belvedere", name: "Belvedere Vodka", brand: "Belvedere", category: "spirits", subcategory: "Vodka", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Poland" },
  { id: "ketel-one", name: "Ketel One Vodka", brand: "Ketel One", category: "spirits", subcategory: "Vodka", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Netherlands" },
  { id: "smirnoff", name: "Smirnoff No. 21", brand: "Smirnoff", category: "spirits", subcategory: "Vodka", abv: 37.5, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "UK" },
  { id: "ciroc", name: "Cîroc Vodka", brand: "Cîroc", category: "spirits", subcategory: "Vodka", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "France" },
  { id: "tito-vodka", name: "Tito's Handmade Vodka", brand: "Tito's", category: "spirits", subcategory: "Vodka", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "USA" },
  { id: "stolichnaya", name: "Stolichnaya Premium", brand: "Stolichnaya", category: "spirits", subcategory: "Vodka", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Latvia" },
  { id: "wyborowa", name: "Wyborowa Exquisite", brand: "Wyborowa", category: "spirits", subcategory: "Vodka", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Poland" },

  // ─── SPIRITS – Gin ───
  { id: "gordons", name: "Gordon's London Dry Gin", brand: "Gordon's", category: "spirits", subcategory: "Gin", abv: 37.5, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "UK" },
  { id: "bombay-sapphire", name: "Bombay Sapphire", brand: "Bombay Sapphire", category: "spirits", subcategory: "Gin", abv: 47.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "UK" },
  { id: "tanqueray", name: "Tanqueray London Dry Gin", brand: "Tanqueray", category: "spirits", subcategory: "Gin", abv: 43.1, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "UK" },
  { id: "hendricks", name: "Hendrick's Gin", brand: "Hendrick's", category: "spirits", subcategory: "Gin", abv: 44.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Scotland" },
  { id: "beefeater", name: "Beefeater London Dry", brand: "Beefeater", category: "spirits", subcategory: "Gin", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "UK" },
  { id: "monkey-47", name: "Monkey 47 Schwarzwald Dry Gin", brand: "Monkey 47", category: "spirits", subcategory: "Gin", abv: 47.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Germany" },
  { id: "roku-gin", name: "Roku Japanese Craft Gin", brand: "Roku", category: "spirits", subcategory: "Gin", abv: 43.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Japan" },
  { id: "aviation-gin", name: "Aviation American Gin", brand: "Aviation", category: "spirits", subcategory: "Gin", abv: 42.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "USA" },

  // ─── SPIRITS – Rum ───
  { id: "bacardi-white", name: "Bacardí Superior White Rum", brand: "Bacardí", category: "spirits", subcategory: "Rum", abv: 37.5, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Puerto Rico" },
  { id: "captain-morgan", name: "Captain Morgan Original Spiced", brand: "Captain Morgan", category: "spirits", subcategory: "Rum", abv: 35.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Jamaica" },
  { id: "malibu", name: "Malibu Coconut Rum", brand: "Malibu", category: "spirits", subcategory: "Rum", abv: 21.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Barbados" },
  { id: "havana-club-3", name: "Havana Club 3 Year", brand: "Havana Club", category: "spirits", subcategory: "Rum", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Cuba" },
  { id: "havana-club-7", name: "Havana Club 7 Year", brand: "Havana Club", category: "spirits", subcategory: "Rum", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Cuba" },
  { id: "diplomatico", name: "Diplomático Reserva Exclusiva", brand: "Diplomático", category: "spirits", subcategory: "Rum", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Venezuela" },
  { id: "mount-gay", name: "Mount Gay Eclipse Rum", brand: "Mount Gay", category: "spirits", subcategory: "Rum", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Barbados" },

  // ─── SPIRITS – Tequila ───
  { id: "jose-cuervo", name: "Jose Cuervo Especial Silver", brand: "Jose Cuervo", category: "spirits", subcategory: "Tequila", abv: 38.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Mexico" },
  { id: "patron-silver", name: "Patrón Silver Tequila", brand: "Patrón", category: "spirits", subcategory: "Tequila", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Mexico" },
  { id: "don-julio-blanco", name: "Don Julio Blanco", brand: "Don Julio", category: "spirits", subcategory: "Tequila", abv: 38.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Mexico" },
  { id: "1800-silver", name: "1800 Silver Tequila", brand: "1800", category: "spirits", subcategory: "Tequila", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Mexico" },
  { id: "espolon-blanco", name: "Espolòn Blanco Tequila", brand: "Espolòn", category: "spirits", subcategory: "Tequila", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Mexico" },
  { id: "olmeca-altos", name: "Olmeca Altos Plata", brand: "Olmeca Altos", category: "spirits", subcategory: "Tequila", abv: 38.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Mexico" },

  // ─── SPIRITS – Brandy & Cognac ───
  { id: "hennessy-vs", name: "Hennessy V.S.", brand: "Hennessy", category: "spirits", subcategory: "Cognac", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "France" },
  { id: "remy-martin-vsop", name: "Rémy Martin VSOP", brand: "Rémy Martin", category: "spirits", subcategory: "Cognac", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "France" },
  { id: "martell-vs", name: "Martell VS", brand: "Martell", category: "spirits", subcategory: "Cognac", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "France" },
  { id: "courvoisier-vs", name: "Courvoisier VS", brand: "Courvoisier", category: "spirits", subcategory: "Cognac", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "France" },
  { id: "torres-brandy", name: "Torres 10 Gran Reserva", brand: "Torres", category: "spirits", subcategory: "Brandy", abv: 38.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Spain" },

  // ─── SPIRITS – Liqueurs ───
  { id: "baileys", name: "Baileys Original Irish Cream", brand: "Baileys", category: "spirits", subcategory: "Liqueur", abv: 17.0, typicalVolumes: [25, 50, 100], icon: "🥃", origin: "Ireland" },
  { id: "kahlua", name: "Kahlúa Coffee Liqueur", brand: "Kahlúa", category: "spirits", subcategory: "Liqueur", abv: 20.0, typicalVolumes: [25, 50], icon: "🥃", origin: "Mexico" },
  { id: "sambuca-molinari", name: "Molinari Sambuca", brand: "Molinari", category: "spirits", subcategory: "Liqueur", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Italy" },
  { id: "jagermeister", name: "Jägermeister", brand: "Jägermeister", category: "spirits", subcategory: "Liqueur", abv: 35.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Germany" },
  { id: "cointreau", name: "Cointreau Orange Liqueur", brand: "Cointreau", category: "spirits", subcategory: "Liqueur", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "France" },
  { id: "disaronno", name: "Disaronno Originale Amaretto", brand: "Disaronno", category: "spirits", subcategory: "Liqueur", abv: 28.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "Italy" },
  { id: "aperol", name: "Aperol", brand: "Aperol", category: "spirits", subcategory: "Liqueur", abv: 11.0, typicalVolumes: [50, 75, 100], icon: "🥃", origin: "Italy" },
  { id: "campari", name: "Campari", brand: "Campari", category: "spirits", subcategory: "Liqueur", abv: 25.0, typicalVolumes: [25, 50], icon: "🥃", origin: "Italy" },
  { id: "drambuie", name: "Drambuie Whisky Liqueur", brand: "Drambuie", category: "spirits", subcategory: "Liqueur", abv: 40.0, typicalVolumes: [25, 35], icon: "🥃", origin: "Scotland" },
  { id: "frangelico", name: "Frangelico Hazelnut Liqueur", brand: "Frangelico", category: "spirits", subcategory: "Liqueur", abv: 20.0, typicalVolumes: [25, 50], icon: "🥃", origin: "Italy" },
  { id: "grand-marnier", name: "Grand Marnier Cordon Rouge", brand: "Grand Marnier", category: "spirits", subcategory: "Liqueur", abv: 40.0, typicalVolumes: [25, 35, 50], icon: "🥃", origin: "France" },
  { id: "midori", name: "Midori Melon Liqueur", brand: "Midori", category: "spirits", subcategory: "Liqueur", abv: 20.0, typicalVolumes: [25, 50], icon: "🥃", origin: "Japan" },
  { id: "peach-schnapps", name: "DeKuyper Peach Schnapps", brand: "DeKuyper", category: "spirits", subcategory: "Liqueur", abv: 15.0, typicalVolumes: [25, 50], icon: "🥃", origin: "USA" },
  { id: "blue-curacao", name: "Bols Blue Curaçao", brand: "Bols", category: "spirits", subcategory: "Liqueur", abv: 21.0, typicalVolumes: [25, 50], icon: "🥃", origin: "Netherlands" },

  // ─── READY TO DRINK ───
  { id: "white-claw-nat-lime", name: "White Claw Natural Lime", brand: "White Claw", category: "rtd", subcategory: "Hard Seltzer", abv: 5.0, typicalVolumes: [330, 355], icon: "🥤", origin: "USA" },
  { id: "white-claw-mango", name: "White Claw Mango", brand: "White Claw", category: "rtd", subcategory: "Hard Seltzer", abv: 5.0, typicalVolumes: [330, 355], icon: "🥤", origin: "USA" },
  { id: "truly-wild-berry", name: "Truly Wild Berry Hard Seltzer", brand: "Truly", category: "rtd", subcategory: "Hard Seltzer", abv: 5.0, typicalVolumes: [355], icon: "🥤", origin: "USA" },
  { id: "smirnoff-ice", name: "Smirnoff Ice Original", brand: "Smirnoff", category: "rtd", subcategory: "Alcopop", abv: 4.5, typicalVolumes: [275, 330], icon: "🥤", origin: "UK" },
  { id: "bacardi-breezer", name: "Bacardí Breezer Orange", brand: "Bacardí", category: "rtd", subcategory: "Alcopop", abv: 4.0, typicalVolumes: [275], icon: "🥤", origin: "UK" },
  { id: "gordons-gin-tonic", name: "Gordon's Pink Gin & Tonic Can", brand: "Gordon's", category: "rtd", subcategory: "Pre-mixed", abv: 5.0, typicalVolumes: [250], icon: "🥤", origin: "UK" },
  { id: "aperol-spritz-can", name: "Aperol Spritz Can", brand: "Aperol", category: "rtd", subcategory: "Pre-mixed", abv: 8.0, typicalVolumes: [200], icon: "🥤", origin: "Italy" },

];

// Helper functions
export const getByCategory = (cat) => ALCOHOL_INVENTORY.filter(a => a.category === cat);
export const getCategories = () => [...new Set(ALCOHOL_INVENTORY.map(a => a.category))];
export const getSubcategories = (cat) => [...new Set(ALCOHOL_INVENTORY.filter(a => a.category === cat).map(a => a.subcategory))];
export const searchInventory = (query) => {
  const q = query.toLowerCase();
  return ALCOHOL_INVENTORY.filter(a =>
    a.name.toLowerCase().includes(q) ||
    a.brand.toLowerCase().includes(q) ||
    a.subcategory.toLowerCase().includes(q) ||
    a.origin.toLowerCase().includes(q)
  );
};
