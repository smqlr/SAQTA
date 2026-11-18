// Точки на карте Актобе из OpenStreetMap (src/geo/places.json собирает tools/osm/build-aktobe.mjs).
// Донор-лига — 40 школ (док: «40 школ в Донор-лиге»), боксы — 2 ЦОН и 3 вуза (док: «Ещё 5 боксов в ЦОН и вузах»).
// Хаб и склад магазина — условные точки на крупных улицах: помещение ещё не арендовано, магазин не выбран.
import P from './places.json';

export const LEAGUE = P.league;
export const BOXES = P.boxes;
export const HUB = P.hub;
export const STORE = P.store;
export const AKIMAT_PT = P.akimat;
export const LANDFILLS = P.landfill;
export const OSM_SOURCE = P.source;

const ALL = [...LEAGUE, ...BOXES];
export const pointById = (id) => ALL.find((p) => p.id === id) || null;
export const pointsFor = (method) => (method === 'school' ? LEAGUE : method === 'box' ? BOXES : ALL);
