import { getJWT, context } from './authentication';
import { create, getAny, getAll } from './reservations'
import { getAvailable, getDistinctAvailable, getDayTypes } from './sittings'

const authentication = { getJWT, context };
const sittings = { getAvailable, getDistinctAvailable, getDayTypes};
const reservations = { create, getAny, getAll };

const fetchApi = {reservations, sittings, authentication};
export { fetchApi };