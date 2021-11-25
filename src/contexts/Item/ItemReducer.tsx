const itemReducer = (state: any, action: any) => {
    switch (action.type) {
        case "SET_ITEMS":
            return {
                ...state,
                items: action.payload
            }
        case "ADD_ITEM":
            return {
                ...state,
                items: [ ...state.items, action.payload ]
            }
        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter((item: any) => item.id !== action.payload)
            }
        default:
            return state;
    }
}

export default itemReducer;