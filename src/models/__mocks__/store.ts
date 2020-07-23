/* eslint-disable @typescript-eslint/no-explicit-any */

import { configureMockStore } from '@jedmao/redux-mock-store';
import promiseMiddleware, { AsyncAction } from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk-fsa';

export default configureMockStore<any, AsyncAction, any>([thunkMiddleware, promiseMiddleware]);
