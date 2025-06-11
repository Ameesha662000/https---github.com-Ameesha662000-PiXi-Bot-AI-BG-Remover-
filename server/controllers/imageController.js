import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
import userModel from '../models/userModel.js'

// Controller function to remove bg from image
// http://localhost:4000/api/image/remove-bg
const removeBgImage = async (req, res) => {
  try {
    const { clerkId } = req.body

    // Log API key status
    console.log('API Key Status:', {
      exists: !!process.env.CLIPDROP_API,
      length: process.env.CLIPDROP_API ? process.env.CLIPDROP_API.length : 0
    })

    // Fetching User Details Using ClerkId
    const user = await userModel.findOne({ clerkId })
    if (!user) {
      return res.json({ success: false, message: 'User Not Found' })
    }

    // Checking User creditBalance
    if (user.creditBalance === 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
    }

    // Getting Image Path
    const imagePath = req.file.path;

    // Read the image file
    const imageFile = fs.createReadStream(imagePath)

    // Creation of new multi/part formdata
    const formdata = new FormData()
    formdata.append('image_file', imageFile)

    try {
      // Calling Clipdrop API
      const response = await axios.post('https://clipdrop-api.co/remove-background/v1', formdata, {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer"
      })

      // Convert arrayBuffer to base64
      const base64Image = Buffer.from(response.data, 'binary').toString('base64');
      const resultImage = `data:${req.file.mimetype};base64,${base64Image}`

      // Deduct credit only after successful processing
      await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 })

      // Send Response
      res.json({ 
        success: true, 
        message: "Background Removed", 
        resultImage, 
        creditBalance: user.creditBalance - 1 
      })

    } catch (apiError) {
      // Log detailed API error
      console.error('Clipdrop API Error:', {
        status: apiError.response?.status,
        statusText: apiError.response?.statusText,
        data: apiError.response?.data,
        message: apiError.message
      })

      let errorMessage = 'Failed to remove background.'
      if (apiError.response?.status === 402) {
        errorMessage = 'The Clipdrop API subscription is required. Please contact the administrator.'
      }

      res.json({ 
        success: false, 
        message: errorMessage,
        details: apiError.response?.status === 402 ? 'API subscription needed' : apiError.message
      })
    }

  } catch (error) {
    console.error('General Error:', error)
    res.json({ success: false, message: error.message })
  }
}

export { removeBgImage }