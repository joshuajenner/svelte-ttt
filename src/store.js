import { writable } from 'svelte/store';
import { readable } from 'svelte/store';

export const user = writable("userTest");
export const loggedIn = writable(false);
export const room = writable(undefined);
export const socket = writable(undefined);
// local is http://127.0.0.1:3000
//deploy is https://server-ttt.herokuapp.com
export const url = readable("https://server-ttt.herokuapp.com")
