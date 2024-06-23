import express from 'express';
import {
  addPost,
  getPosts,
  getUserPosts,
  deletePost,
  updatePost,
} from '../controllers/postsController.js';
import auth from '../middlewares/auth.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

//Get all posts route
router.get('/', getPosts);

//Get all posts of a user route
router.get('/user', auth, getUserPosts);

//Add new post route
router.post('/', upload.array('image'), auth, addPost);

//Delete post route
router.delete('/:id', auth, deletePost);

//Update post route
router.put('/:id', auth, updatePost);

export { router as postsRoutes };
