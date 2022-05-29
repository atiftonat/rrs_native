import { getJWT, context } from './authentication';
import { create, getAny } from './reservations'
import { getAvailable, getDistinctAvailable, getDayTypes } from './sittings'

const authentication = { getJWT, context };
const sittings = { getAvailable, getDistinctAvailable, getDayTypes};
const reservations = { create, getAny };

const fetchApi = {reservations, sittings, authentication};
export { fetchApi };