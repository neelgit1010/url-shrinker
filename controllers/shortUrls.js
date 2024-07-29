const urlschema = require("../models/shortUrls");
const shortid = require('shortid'); // Ensure you have installed shortid for unique short URL generation

async function createTheShortenedUrl(req, res) {
  if(!req.body.originalURL) res.status(404).send('url is required');
  try {
    const shortUrl = shortid.generate();
    await urlschema.create({
      originalUrl: req.body.originalURL,
      shortUrl: shortUrl,
      createdBy : req.user._id
    });
    res.redirect("/");
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function deleteShortUrl(req, res) {
  try {
    const urlid = req.params.id;
    const deleteUrl = await urlschema.findByIdAndDelete(urlid);
    if (!deleteUrl) {
      return res.status(404).json({ message: 'Url not found' });
    }
    res.status(200).json({ message: 'Url deleted successfully' }); // Sending a JSON response with a success message
  } catch (error) {
    console.error('Error deleting Url:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  createTheShortenedUrl,
  deleteShortUrl
};
