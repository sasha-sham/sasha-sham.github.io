#!/bin/bash

# This script optimizes feedback images by:
# 1. Creating multiple sizes (small, medium, large) of each image
# 2. Converting images to WebP format for better compression
# 3. Optimizing JPEGs as fallback for browsers without WebP support
#
# Usage: ./optimize-feedback-images.sh [start-number]
#   start-number: Optional parameter to start processing from feedback-{start-number}.jpg

# Check if necessary commands are available
command -v convert >/dev/null 2>&1 || { echo "ImageMagick 'convert' command is required but not installed. Please install ImageMagick first."; exit 1; }
command -v cwebp >/dev/null 2>&1 || { echo "WebP 'cwebp' command is required but not installed. Please install WebP tools first."; exit 1; }

# Get starting image number from command line argument, default to 1 if not provided
START_NUMBER=${1:-1}

# Source directory containing original feedback images
SOURCE_DIR="images/feedback"
OUTPUT_DIR="images/feedback"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Image sizes
SMALL=400
MEDIUM=800
LARGE=1200

# JPEG quality (0-100)
JPEG_QUALITY=80

# WebP quality (0-100)
WEBP_QUALITY=75

# Process each JPG file
echo "Starting image optimization process..."
echo "Starting from image number $START_NUMBER"

count=0
# Get the total number of all feedback images
all_images=$(ls -1 "$SOURCE_DIR"/feedback-*.jpg 2>/dev/null | wc -l)
echo "Found $all_images total feedback images"

# Determine which files to process based on the start number
total=$(ls -1 "$SOURCE_DIR"/feedback-*.jpg | grep -E "feedback-([0-9]+)\.jpg" | awk -F'feedback-' '{gsub(".jpg","",$2); if($2+0 >= '$START_NUMBER') print $0}' | wc -l)

for image in "$SOURCE_DIR"/feedback-*.jpg; do
    # Skip if not a file
    [ -f "$image" ] || continue
    
    # Extract the image number from filename
    image_number=$(echo "$image" | grep -oE 'feedback-([0-9]+)\.jpg' | sed 's/feedback-\([0-9]\+\)\.jpg/\1/')
    
    # Skip if image number is less than START_NUMBER
    if [ -n "$image_number" ] && [ "$image_number" -lt "$START_NUMBER" ]; then
        echo "Skipping $image (before starting number $START_NUMBER)"
        continue
    fi
    
    # Extract filename without path and extension
    filename=$(basename "$image" .jpg)
    
    # Skip if already processed
    if [ -f "$OUTPUT_DIR/${filename}-sm.webp" ]; then
        echo "Skipping $filename (already processed)"
        continue
    fi
    
    # Increment counter
    ((count++))
    
    # Show progress
    echo "Processing $filename ($count of $total)..."
    
    # Create small JPG
    convert "$image" -resize "${SMALL}x${SMALL}>" -quality $JPEG_QUALITY "$OUTPUT_DIR/${filename}-sm.jpg"
    
    # Create medium JPG
    convert "$image" -resize "${MEDIUM}x${MEDIUM}>" -quality $JPEG_QUALITY "$OUTPUT_DIR/${filename}-md.jpg"
    
    # Create large JPG
    convert "$image" -resize "${LARGE}x${LARGE}>" -quality $JPEG_QUALITY "$OUTPUT_DIR/${filename}-lg.jpg"
    
    # Create WebP versions
    cwebp -quiet -q $WEBP_QUALITY "$OUTPUT_DIR/${filename}-sm.jpg" -o "$OUTPUT_DIR/${filename}-sm.webp"
    cwebp -quiet -q $WEBP_QUALITY "$OUTPUT_DIR/${filename}-md.jpg" -o "$OUTPUT_DIR/${filename}-md.webp"
    cwebp -quiet -q $WEBP_QUALITY "$OUTPUT_DIR/${filename}-lg.jpg" -o "$OUTPUT_DIR/${filename}-lg.webp"
    
    echo "✓ Optimized $filename"
done

echo "Image optimization complete!"
echo "Created responsive images in both JPG and WebP formats"
echo "Total images processed: $count"

# Print file size comparison
original_size=$(du -ch "$SOURCE_DIR"/feedback-*.jpg | grep total | cut -f1)
optimized_size=$(du -ch "$OUTPUT_DIR"/*-{sm,md,lg}.{jpg,webp} | grep total | cut -f1)

echo "Original size: $original_size"
echo "Optimized size (all formats): $optimized_size"
echo ""
echo "Note: This is the total size for all optimized variants. Actual bandwidth"
echo "savings will be higher since only the appropriate size will be loaded."
