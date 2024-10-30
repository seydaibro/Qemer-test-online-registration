import { createTransform } from 'redux-persist';
import { isAfter, addHours } from 'date-fns';
import { PersistedState } from 'redux-persist/es/types';

interface PersistedStateWithTimestamp extends PersistedState {
  _persistedAt?: string;
}

// Define the expiration time (24 hours in this case)
const EXPIRATION_HOURS = 24;

const expireTransform = createTransform(
  // Transform function to run before state is persisted
  (inboundState: any, key: string): PersistedStateWithTimestamp => {
    return {
      ...inboundState,
      _persistedAt: new Date().toISOString(), // Add a timestamp
    };
  },
  (outboundState: PersistedStateWithTimestamp, key: string): any => {
    if (outboundState && outboundState._persistedAt) {
      const { _persistedAt, ...restState } = outboundState;
      const persistedAtDate = new Date(_persistedAt);
      const expirationDate = addHours(persistedAtDate, EXPIRATION_HOURS);

      if (isAfter(new Date(), expirationDate)) {
        return undefined;
      }
      return restState;
    }
    return outboundState;
  },
  { whitelist: ['auth', 'branches'] } 
);


export default expireTransform;
