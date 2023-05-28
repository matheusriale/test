/**
 * Cria uma figura
 * @param {?Number} stroke Intensidade da borda (0 a 255) (padrão: 255)
 * @param {?Array<Pixel>} vertices 
 * @type {{vertices: Array<Pixel> stroke: Number}}
 */
function Figure(stroke, vertices) {
    this.vertices = vertices || []
    this.stroke = stroke || 255
    this.scale = new Pixel(1)

    /**
     * Adiciona vértices ao polígono
     * @param {Array<Pixel>} vertex 
     */
    this.add_vertex = (vertex) => {
        this.vertices.push(...vertex)
        return this
    }
    /**
     * Trata e retorna os vértices
     * @returns {Array<Pixel>} vértices
     */
    this.get_vertices = () => {
        return this.vertices
    }

    /**
     * Move a figura
     * @param {Pixel} coord 
     */
    this.translate = (coord) => {
        this.vertices = this.vertices.map(v => v.add(coord))
        return this
    }

    /**
     * Modifica o tamanho da figura
     * @param {Pixel} scale 
     */
    this.scale = (scale) => {
        this.scale = scale
        this.vertices = this.vertices.map(v => {
            let n = v.mult(scale)
            n.round_position()
            return n
        })

        return this
    }

    /**
     * Faz uma cópia da figura atual
     * @returns {Figure}
     */
    this.copy = () => {
        return new Figure(this.stroke, [...this.vertices])
    }

    /**
     * Aplica uma transformação a uma figura
     * @param {Array<Array<Number>} transformation 
     */
    this.apply_transformation = (transformation) => {
        this.vertices.forEach(v => {
            v.apply_transformation(transformation)
        })
    }
}

