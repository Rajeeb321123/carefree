// .d means development
// here we can declare all of our type
// here interface is an object explaining how is our obj will look like
export interface Video {
    caption: string;
    video: {
      asset: {
        _id: string;
        url: string;
      };
    };
    _id: string;
    postedBy: {
      _id: string;
      userName: string;
      image: string;
    };
    likes: {
      postedBy: {
        _id: string;
        userName: string;
        image: string;
      };
    }[];
    comments: {
      comment: string;
      _key: string;
      postedBy: {
        _ref: string;
      };
    }[];
    userId: string;
  }

  export interface IUser {
    _id: string;
    _type: string;
    userName: string;
    image: string;
  }