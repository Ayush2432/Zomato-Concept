import { CREATE_ORDER, ORDER_PLACED } from "./order.type";

const INITIAL_STATE = {}

const orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return {
                ...state,
            }
    }
}

export default orderReducer;