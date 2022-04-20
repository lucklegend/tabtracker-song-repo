const { Bookmark } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  async index (req, res) {
    try {
      const { songId, userId } = req.query
      console.log('songId', songId)
      console.log('userId', userId)
      console.log('req.params', req.params)
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })

      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the bookmark'
      })
    }
  },
  async post (req, res) {
    try {
      
      const { userId, songId } = req.body
      console.log(`${userId} ${songId}`)
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      if (bookmark) {
        return res.status(400).send({
          error: 'You already have this set as a bookmark'
        })
      }
      const newBookmark = await Bookmark.create({
        SongId: songId,
        UserId: userId
      })
      res.send(newBookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to creating the bookmark'
      })
    }
  },
  async remove (req, res) {
    try {
      const {bookmarkId} = req.params
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId
        }
      })
      if (!bookmark) {
        return res.status(403).send({
          error: 'You do not have access to this bookmark'
        })
      }
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete the bookmark'
      })
    }
  }
}
