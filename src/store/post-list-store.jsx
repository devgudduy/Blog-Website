import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id === action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    // console.log(`${userId} ${postTitle} ${postBody} ${reactions} ${tags}`);
    dispatchPostList({
      action: "ADD_POST",
      payload: {
        id: Date.now,
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tag: tags,
      },
    });
  };
  const deletePost = (postId) => {
    dispatchPostList({
      action: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider
      value={{
        postList,
        addPost,
        deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Mumbai",
    body: "Hi friends, I am going to Mumbai for my vaccations. hope to enjoy a lot. Peace out.",
    reactions: 3,
    userId: "user-8",
    tag: ["Mumbai", "Vaccations", "Enjoying"],
  },
  {
    id: "2",
    title: "Pass ho bhai",
    body: "4 saal ki masti k baad bhi ho gaye hai pass. Hard to believe",
    reactions: 8,
    userId: "user-12",
    tag: ["Padd", "Masti", "year"],
  },
];

export default PostListProvider;
