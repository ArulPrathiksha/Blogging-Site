/* eslint-disable react/prop-types */

// import SlidingImage from './Carousel';

const Post = ({ post, children }) => {
  post.image.map((data) => {
    console.log(data);
  });
  console.log('POST : ' + post.image);
  console.log('post : ' + JSON.stringify(post));

  return (
    <div className="mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-bold text-lg text-cyan-700 first-letter:uppercase">
            {post.title}
          </h2>
          <p className="text-[10px] text-slate-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div>{children}</div>
      </div>

      <p className="text-lg mt-4">{post.body}</p>

      {/* {post.image && <SlidingImage images={post.image} />} */}
      {/* <div> */}
      {post.image &&
        post.image.map((data) => {
          return (
            <img
              key={data}
              src={`http://localhost:4000/file/${data}`}
              alt={data}
              height={500}
              width={500}
              style={{ padding: 10 }}
            />
          );
        })}
      {/* </div> */}

      <div className="h-px w-full bg-gradient-to-r from-cyan-50 via-cyan-700/50 to-cyan-50 mt-6"></div>
    </div>
  );
};

export default Post;
