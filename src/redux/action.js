export const GET_POSTS_PAGE = "GET_POSTS_PAGE";
export const DATA_EDIT_ANNOUN = "DATA_EDIT_ANNOUN";
export const DATA_OF_POST = "DATA_OF_POST";
export const POSTS = "POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const DATA_ANNOUN = 'DATA_ANNOUN'
export const DATA_DELETE_ANNOUN = 'DATA_DELETE_ANNOUN'
export const DATA_CREATE_ANNOUN = 'DATA_CREATE_ANNOUN'
export const DATA_DELETE_POST = 'DATA_DELETE_POST'
export const DATA_CREATE_POST = 'DATA_CREATE_POST'
export const DATA_COMMENTS = 'DATA_COMMENTS'
export const DATA_CREATE_COMMENT = 'DATA_CREATE_COMMENT'
export const DATA_DELETE_COMMENT = 'DATA_DELETE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const EDIT_POSTS_PAGE = 'EDIT_POSTS_PAGE'
export const USER_DATA_POST = 'USER_DATA_POST'


export const setGetPostsPage = (response) => ({
    type: GET_POSTS_PAGE,
    payload: response,
});


export const setUserData = (dataPost) => async (dispatch) => {
  const response = 
   await fetch(
      `https://ekreative-json-server.herokuapp.com/users/${dataPost.userId}`
    )
      .then((response) => response.json())
      .then((data) => {
        return data
      });
  dispatch ({
    type: USER_DATA_POST,
    payload: response
  })
}

export const setEditPostsPage = (currentPage, postPerPage) => async (dispatch) => {
  const response = 
    await fetch(
      `https://ekreative-json-server.herokuapp.com/posts?_page=${currentPage}&_limit=${postPerPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        return data
      });
  
  dispatch({
    type: EDIT_POSTS_PAGE,
    payload: response,
})};



export const setDataAnnouncements = (data) => ({
  type: DATA_ANNOUN,
  payload: data
})

export const setDataCreateAnnoun = (data) => ({
  type: DATA_CREATE_ANNOUN,
  payload: data,
});

export const setDataEditAnnoun = (data) => ({
  type: DATA_EDIT_ANNOUN,
  payload: data,
});

export const setDataDeleteAnnoun = (data) => ({
  type: DATA_DELETE_ANNOUN,
  payload: data,
});




export const setPosts = (posts) => ({
  type: POSTS,
  payload: posts,
});

export const setDataOfPost = (dataPost) => ({
  type: DATA_OF_POST,
  payload: dataPost
  })

  export const setDataCreatePost = (data) => ({
  type: DATA_CREATE_POST,
  payload: data
  })

export const updatePostData = (updatedPost) => ({
  type: UPDATE_POST,
  payload: updatedPost,
});

export const setDataDeletePost = (data) => ({
  type: DATA_DELETE_POST,
  payload: data
})





export const setComments = (data) => ({
  type: DATA_COMMENTS,
  payload: data
})

export const setDataCreateComment = (data) => ({
  type: DATA_CREATE_COMMENT,
  payload: data
})

export const setDataUpdateComment = (data) => ({
  type: UPDATE_COMMENT,
  payload: data
})

export const setDataDeleteComment = (data) => ({
  type: DATA_DELETE_COMMENT,
  payload: data
})


