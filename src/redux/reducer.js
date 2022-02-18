import {
  DATA_ANNOUN,
  DATA_COMMENTS,
  DATA_CREATE_ANNOUN,
  DATA_CREATE_COMMENT,
  DATA_CREATE_POST,
  DATA_DELETE_ANNOUN,
  DATA_DELETE_COMMENT,
  DATA_DELETE_POST,
  DATA_EDIT_ANNOUN,
  DATA_OF_POST,
  EDIT_POSTS_PAGE,
  GET_POSTS_PAGE,
  POSTS,
  UPDATE_COMMENT,
  UPDATE_POST,
  USER_DATA_POST,
} from "./action";

const initialState = {
  posts: [],
  announcements: [],
  comments: [],
  dataPost: {},
  userData: {}
};

export const userData = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA_POST:
      console.log(action.payload.firstname);
      return {
      ...state,
        userData: action.payload
    }
      
    default:
      return state
  }
}


export const paginateReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_PAGE:
      return {
        ...state,
        posts: action.payload
      };
    case EDIT_POSTS_PAGE:
      return {
        ...state,
        posts: action.payload
      };
    default:
      return state;
  }
};



export const announcementsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_ANNOUN:
      return {
        ...state,
        announcements: action.payload,
      };
    case DATA_EDIT_ANNOUN:
      return {
        ...state,
        announcements: state.announcements.map((announ) => {
          if (announ.id === action.payload.id) {
            return action.payload;
          }
          return announ;
        }),
      };
    case DATA_DELETE_ANNOUN:
      return {
        ...state,
        announcements: state.announcements.filter(
          (announ) => announ.id !== action.payload
        ),
      };
    case DATA_CREATE_ANNOUN:
      return {
        ...state,
        announcements: [...state.announcements, action.payload],
      };
    default:
      return state;
  }
};




export const posts = (state = initialState, action) => {
  switch (action.type) {
    case POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case DATA_OF_POST:
      return {
        ...state,
        dataPost: action.payload,
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.payload.id) {
            return action.payload;
          }
          return post;
        }),
      };
    case DATA_DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case DATA_CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    default:
      return state;
  }
};



export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.id) {
            return action.payload;
          }
          return comment;
        }),
      };
    case DATA_DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
      };
    case DATA_CREATE_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload]
      };
    default:
      return state;
  }
};
