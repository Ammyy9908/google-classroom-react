export const intialState = {
    user: null,
    create:false,
    classes:[],
    assignment:false,
    link:false,
    fileURL:'',
  };

  export const actionTypes = {
      SET_USER:'SET_USER',
      SET_CREATE:'SET_CREATE',
      SET_CLASSES:'SET_CLASSES',
      SET_ASSIGNMENT_DIALOG:'SET_ASSIGNMENT_DIALOG',
      SET_LINK_DIALOG:'SET_LINK_DIALOG',
      SET_LINK:'SET_LINK'
  };

  const reducer = (state, action) =>{
      console.log(action);
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
            case actionTypes.SET_ASSIGNMENT_DIALOG:
                return {
                    ...state,
                    assignment:action.assignment
                };
                case actionTypes.SET_LINK_DIALOG:
                    return {
                        ...state,
                        link:action.link
                    };
                    case actionTypes.SET_LINK:
                        return {
                            ...state,
                            fileURL:action.fileURL
                        };
        default:
            return state;
      }
  }

  export default reducer;