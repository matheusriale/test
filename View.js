/**
 * 
 * @param {Pixel} start 
 * @param {Pixel} end 
 * @type {{start:Pixel end:Pixel}}
 */
function Window(start, end) {
    this.start = start
    this.end = end
    this.diff_x = (this.end.x - this.start.x)
    this.diff_x = (this.end.y - this.start.y)
}

function Viewport(w, h) {
    this.width = w
    this.height = h
}