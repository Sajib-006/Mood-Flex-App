const express = require('express')
const auth = require('../middleware/auth')
const Post = require('../models/Post')
const router = express.Router()

router.post('/add', auth, async (req, res) => {
  // console.log(req.user.name)
  // console.log(req.body.post)
  try {
    const post = new Post({
      content: req.body.post,
      author: req.user.name,
      anonymous: req.body.anonymous
    })
    await post.save();
  } catch (error) {
    res.status(400).json({
      error: 'internal error'
    })
  }
  res.json({
    success: true
  })
})

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({
      date: 'descending'
    });
    //console.log(posts)
    const postEdit = posts.map((post) => {
      return {
        _id: post._id,
        content: post.content,
        author: post.anonymous ? 'Anonymous' : post.author,
        date: post.date,
        comments: post.comments
      }
    })
    //console.log(postEdit)
    res.status(200).json({
      posts: postEdit
    })
  } catch (err) {
    res.status(400).json({
      error: 'something went wrong',
      msg: err
    })
  }
});

router.post('/comment', auth, async (req, res) => {
  console.log(req.body)
  console.log(req.user)
  try {
    await Post.update({
      _id: req.body._id
    }, {
      $push: {
        comments: {
          content: req.body.comment,
          author: req.user.name
        }
      }
    })
    res.json({
      success: true
    })
  } catch (err) {
    res.json({
      error: 'error occured'
    })
  }
})

module.exports = router;