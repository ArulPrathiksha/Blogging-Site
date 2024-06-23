/******************************Get all the posts********* */
const getPosts = async () => {
  const res = await fetch('/api/posts');
  const data = res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

/******************************Get user posts********* */
const getUserPosts = async () => {
  const res = await fetch('/api/posts/user', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

/************************************Create Post*********************** */
const createPost = async (title, body, image) => {
  if (!title || !body || !image) {
    throw Error('All the fields are required');
  }

  const formData = new FormData();
  formData.append('title', title);
  formData.append('body', body);
  for (let i = 0; i < image.length; i++) {
    formData.append('image', image[i]);
  }
  for (var pair of formData.entries()) {
    console.log('Formdata : ' + pair[0] + ', ' + pair[1]);
  }
  try {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      // body: JSON.stringify({ title, body }),
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw Error(data.error);
    }
    return data;
  } catch (error) {
    throw Error(error.message);
  }
};
/*******************************************DElete post************* */
const deletePost = async (_id) => {
  const res = await fetch(`/api/posts/${_id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }
  return data;
};

/*******************************************************Update post*************************************** */
const updatePost = async (_id, title, body) => {
  if (!title || !body) {
    throw Error('All the fields are required');
  }

  const res = await fetch(`/api/posts/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ title, body }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }
  return data;
};

export { getPosts, getUserPosts, createPost, deletePost, updatePost };
