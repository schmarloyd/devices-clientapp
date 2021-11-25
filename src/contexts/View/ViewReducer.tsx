const viewReducer = (state: any, action: any) => {
    switch (action.type) {
        case "SHOW_MODAL":
            return {
                ...state,
                modal: action.payload
            }
        case "HIDE_MODAL":
            return {
                ...state,
                modal: action.payload
            }
        default:
            return state;
    }
}

export default viewReducer;