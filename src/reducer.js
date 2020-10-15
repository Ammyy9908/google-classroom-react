export const intialState = {
    user: null,
    create:false,
    classes:[],
  };

  export const actionTypes = {
      SET_USER:'SET_USER',
      SET_CREATE:'SET_CREATE',
      SET_CLASSES:'SET_CLASSES',
  };

  const reducer = (state, action) =>{
      switch(action.type)
      {
          case actionTypes.SET_USER:
              return {
                  ...state,
                  user:action.user
              };
         case actionTypes.SET_CREATE:
             return {
                 ...state,
                 create: action.create
             }
        case actionTypes.SET_CLASSES:
            return {
                ...state,
                classes: action.classes
            }
        default:
            return state;
      }
  }

  export default reducer;