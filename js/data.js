// Gallery data
class GalleryData {
    static totalImages = 142;
    
    static soldItems = [1, 4, 5, 10, 12, 15, 16, 19, 23, 24, 25, 26, 27, 30, 32, 35, 36, 37, 38, 39, 40, 41, 46, 47, 48, 49, 52, 66, 71, 75, 77, 78, 79, 83, 87, 102, 109, 125, 127, 138, 139, 140, 142];
    
    static arItems = [3, 4, 6, 7, 8, 12, 20, 22, 23, 27, 29, 30, 32, 33, 34, 42, 43, 44, 45, 48, 51, 52, 56, 58, 61, 67, 68, 75, 81, 102, 105, 106, 109, 110, 115, 116, 119, 120, 123, 126, 128, 130, 131, 136, 137, 138];

    static isItemSold(index) {
        return this.soldItems.includes(index);
    }

    static hasArContent(index) {
        return this.arItems.includes(index);
    }
}
