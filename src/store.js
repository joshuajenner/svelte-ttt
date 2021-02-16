

import { writable } from 'svelte/store';

export const user = writable("userTest");
export const loggedIn = writable(false);
export const room = writable(undefined);
export const socket = writable(undefined);
