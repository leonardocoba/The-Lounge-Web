import { ADD_PEER, REMOVE_PEER } from "./peersActions";
export const initialState = {};
export type PeerState = Record<string, { stream: MediaStream }>;
type PeerAction =
  | {
      type: typeof ADD_PEER;
      payload: { peerId: string; stream: MediaStream };
    }
  | {
      type: typeof REMOVE_PEER;
      payload: { peerId: string };
    };

export const peersReducer = (
  state: PeerState = initialState,
  action: PeerAction
): PeerState => {
  console.log("Reducer action received:", action); // Log the action
  switch (action.type) {
    case ADD_PEER:
      console.log("Adding peer:", action.payload.peerId);
      return {
        ...state,
        [action.payload.peerId]: {
          stream: action.payload.stream,
        },
      };
    case REMOVE_PEER:
      console.log("Removing peer:", action.payload.peerId);
      const { [action.payload.peerId]: removed, ...rest } = state;
      return { ...rest };
    default:
      return state;
  }
};
