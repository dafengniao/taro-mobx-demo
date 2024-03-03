import { fetch } from 'Utils';

export const TEST_API = '/';

export const fetchTestApi = (parmas: any) => fetch(TEST_API, 'get', parmas);
