# 3D Rotatable Image Effect Setup

## What I've Added

I've implemented a 3D rotatable image effect that:
- Takes up most of the screen at the very top of the page
- Automatically rotates in 3D space with smooth animations
- Responds to mouse hover and drag for interactive rotation
- Gradually vanishes (fades out, scales down, moves up) as the user scrolls down
- Completely disappears after scrolling past a certain point

## Files Modified

1. **index.html** - Added 3D image container above hero content
2. **styles.css** - Added styles for the 3D image and parallax effect
3. **script.js** - Added scroll event listener for the zoom effect

## Image Requirements

You need to add an image file to make this work:

1. Create an `images` folder in your project root
2. Add your 3D/hero image as `hero-3d.jpg` in the images folder
3. Recommended image specs:
   - High resolution (at least 1920x1080)
   - Dark/muted colors work best with the overlay
   - Abstract, tech-related, or space-themed images work well

## How It Works

- The image starts at 1.5x scale (zoomed in)
- As you scroll, it slowly scales down to 1x (normal size)
- The image also moves upward slightly for enhanced parallax effect
- The effect is smooth and responsive to scroll speed

## Customization

You can adjust the effect by modifying these values in `script.js`:
- `1.5` - Starting scale (how zoomed in it starts)
- `0.0005` - Zoom out speed (higher = faster zoom out)
- `0.3` - Vertical movement speed (higher = more movement)

## Fallback

If no image is found, the effect will gracefully degrade and you'll still see your hero section with the gradient background. 