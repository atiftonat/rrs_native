import { getJWT, context } from './authentication';
import { create } from './reservations'
import { getAvailable, getDistinctAvailable, getDayTypes } from './sittings'

const authentication = { getJWT, context };
const sittings = { getAvailable, getDistinctAvailable, getDayTypes};
const reservations = { create };

const fetchApi = {reservations, sittings, authentication};
export { fetchApi };