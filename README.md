# 🎉 Birthday Wish Website

A beautiful, animated birthday wish website with interactive book pages, cake animation, and celebratory effects!

## ✨ Features

- 📖 **Interactive 3D Book** - Click to open an animated book
- 📄 **5 Beautiful Pages** - Smooth page-turning animations with images and messages
- 🎂 **Birthday Cake** - Click candles to blow them out with realistic effects
- 🎊 **Celebration Screen** - Spectacular confetti and sparkle animations
- 🎵 **Birthday Song** - Background music during celebration
- 📱 **Fully Responsive** - Works on all devices

## 🎨 How to Customize

### 1. Replace Images

Replace the placeholder images with your own photos:

- `placeholder1.jpg` - First memory photo
- `placeholder2.jpg` - Second memory photo
- `placeholder3.jpg` - Third memory photo
- `placeholder4.jpg` - Fourth memory photo
- `placeholder5.jpg` - Fifth memory photo
- `placeholder-celebration.jpg` - Final celebration photo

**Note:** Currently, the website generates colorful gradient placeholders. Simply add your images to the root folder with these exact names, and they'll automatically replace the placeholders.

### 2. Customize Text

Open `index.html` and edit the text in each page:

```html
<!-- Find sections like this and edit the text -->
<h2 class="page-heading">Our First Memory 🌟</h2>
<p class="page-text">
    Your custom message here...
</p>
```

There are 5 pages total to customize (search for "page-heading" in the HTML).

### 3. Add Birthday Song

Add a birthday song file named `birthday-song.mp3` to the root folder. The song will automatically play during the celebration screen.

**Recommended:** Use a royalty-free birthday song or record a personal message!

## 🚀 How to Run Locally

1. Simply open `index.html` in a web browser
2. No build process or server required!
3. Click the book to start the experience

## 🌐 Deploy to Vercel

### Method 1: Using Vercel CLI

1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Navigate to the project folder:
   ```bash
   cd d:/Ramyani_birth
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? (Choose your account)
   - Link to existing project? **N**
   - Project name? (Enter a name or press enter)
   - In which directory is your code located? **.**
   - Want to override settings? **N**

5. Your site will be deployed! You'll get a URL like: `https://your-project.vercel.app`

### Method 2: Using Vercel Website

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in
3. Click "Add New Project"
4. Click "Browse" and select the `d:/Ramyani_birth` folder
5. Click "Deploy"
6. Done! Share the URL with your friend

## 📂 Project Structure

```
d:/Ramyani_birth/
├── index.html          # Main HTML file
├── styles.css          # All styles and animations
├── script.js           # Interactive functionality
├── README.md           # This file
├── placeholder1.jpg    # (Add your image)
├── placeholder2.jpg    # (Add your image)
├── placeholder3.jpg    # (Add your image)
├── placeholder4.jpg    # (Add your image)
├── placeholder5.jpg    # (Add your image)
├── placeholder-celebration.jpg  # (Add your image)
└── birthday-song.mp3   # (Add your audio)
```

## 🎯 User Journey

1. **Welcome Screen** - Beautiful book with "Happy Birthday" on cover
2. **Page 1** - Image + "Our First Memory" message
3. **Page 2** - "Adventures Together" message + Image
4. **Page 3** - Image + "Special Moments" message
5. **Page 4** - "Celebrating You" message + Image
6. **Page 5** - Image + "Here's To Another Year!" message
7. **Cake Screen** - Click 3 candles to blow them out
8. **Celebration** - Confetti, sparkles, birthday song, and final image

## 💡 Tips

- **High Quality Images**: Use images with at least 800x600 resolution for best results
- **Image Format**: JPG, PNG, or WebP all work great
- **Audio Format**: MP3 is recommended for the birthday song
- **Personal Touch**: Edit the messages to make them personal and meaningful
- **Test First**: Open locally to test before deploying

## 🎨 Customization Ideas

- Change colors in `styles.css` (search for color variables at the top)
- Add more pages by duplicating page sections in HTML
- Adjust animation speeds in CSS
- Add your own custom messages
- Include inside jokes or shared memories

## 🐛 Troubleshooting

**Images not showing?**
- Make sure image file names match exactly (case-sensitive)
- Check that images are in the root folder

**Song not playing?**
- Ensure file is named `birthday-song.mp3`
- Some browsers block autoplay - user needs to interact first
- Check browser console for errors

**Animations not smooth?**
- Try in a different browser (Chrome/Edge recommended)
- Ensure hardware acceleration is enabled in browser settings

## 📝 License

Free to use for personal projects. Share the love! 💝

---

**Made with ❤️ for your special friend's birthday!**

Enjoy sharing this magical experience! 🎉
