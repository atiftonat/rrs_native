import { getJWT } from './tokens';
import { create } from './reservations'
import { getAvailable, getDistinctAvailable, getDayTypes } from './sittings'

const tokens = { getJWT };
const sittings = { getAvailable, getDistinctAvailable, getDayTypes};
const reservations = { create };

const fetchApi = {reservations, sittings, tokens};
export { fetchApi };