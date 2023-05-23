
/**
 * Estrutura para cores
 * @param {Number} r Valor vermelho (0 a 255)
 * @param {Number} g Valor verde (0 a 255)
 * @param {Number} b Valor azul (0 a 255)
 * @param {Number} a Valor alpha (0 a 255)
 */
function Color(r, g, b, a) {
    this.red = r === undefined ? 0 : r
    this.green = g === undefined ? 0 : g
    this.blue = b === undefined ? 0 : b
    this.alpha = a === undefined ? 0 : a

    this.to_array = () => {
        return [this.red,
        this.green,
        this.blue,
        this.alpha]
    }

    this.gradient = () => {

    }
}



/**
 * Estrutura para localização de pixel
 * @param {?Number} x Coordenada X do pixel. Se 'null', então será 0
 * @param {?Number} y Coordenada Y do pixel. Se 'null', então será igual ao x
 * @param {?Number} xtex Coordenada X da textura variam de 0 a 1. 
 * @param {?Number} ytex Coordenada Y da textura variam de 0 a 1. 
 * @type {{x:Number y:Number xtex:Number ytex:Number}}
 */
function Pixel(x, y, xtex, ytex) {
    this.x = round(x === undefined ? 0 : x)
    this.y = round(y === undefined ? this.x : y)
    this.xtex = round(xtex === undefined ? 0 : xtex)
    this.ytex = round(ytex === undefined ? this.xtex : ytex)

    /**
     * Retorna as coordenadas x,y como um array
     * @returns {Array<Number>} [x,y]
     */
    this.to_array = () => {
        return [this.x, this.y]
    }

    /**
     * Retorna o índice do pixel no array do P5.js
     * @param {Number} width
     * @returns {Number} índice do pixel no array de pixels do P5.js
     */
    this.get_idx = (width) => {
        return 4 * (this.y * width + this.x)
    }

    /**
     * rotaciona um ponto
     * @param {Number} ang Ângulo (em graus) para rotação
     */
    this.rotate = (ang) => {
        let rad_ang = ang * Math.PI / 180; // converte para radianos
        let x = (Math.cos(rad_ang) * this.x - Math.sin(rad_ang) * this.y)
        let y = (Math.sin(rad_ang) * this.x + Math.cos(rad_ang) * this.y)
        return new Pixel(x, y)
    }

    /**
     * Subtrai coordenada do pixel
     * @param {Pixel} p 
     */
    this.sub = (p) => {
        this.x -= p.x
        this.y -= p.y
        return this
    }

    /**
     * Adiciona coordenada ao pixel
     * @param {Pixel} p 
     */
    this.add = (p) => {
        this.x += p.x
        this.y += p.y
        return this
    }

    /**
     * Gera uma nova instância idêntica à atual
     * @returns {Pixel} Novo pixel
     */
    this.copy = () => {
        return new Pixel(this.x, this.y)
    }
    /**
     * Gera um novo pixel com valores trocados de X e Y
     * @returns {Pixel} Novo Pixel
     */
    this.invert = () => {
        return new Pixel(this.y, this.x)
    }

    /**
     * Retorna uma lista com os valores de cada cor em RGB (todos de 0 a 255)
     * @param {boolen} force Se deve buscar na matriz de pixel mesmo que já tenha buscado antes
     * @returns {Array<Number>} [Vermelho, Verde, Azul, Alpha]
     */
    this.get_color = (force) => {
        if (!this._color || force) {
            let idx = this.get_idx()
            this._color = new Color(...pixels.slice(idx, idx + 4))
        }

        return this._color
    }
}

/**
 * Inverte os pixels: p1 vira p2 e vice-versa
 * @param {Pixel} p1 Pixel 1
 * @param {Pixel} p2 Pixel 2
 * @returns {Array<Pixel>} Novos valores para p1 e p2
 */
Pixel.switch = (p1, p2) => {
    let new_p1 = new Pixel(...p2.to_array())
    let new_p2 = new Pixel(...p1.to_array())
    return [new_p1, new_p2]
}

/**
 * Calcula a distância entre p2 e p1
 * @param {Pixel} p1 Pixel 1
 * @param {Pixel} p2 Pixel 2
 * @returns {Array<Number>} Distância no eixo X e no Y, nessa ordem
 */
Pixel.distance = (p1, p2) => {
    return [p2.x - p1.x, p2.y - p1.y]
}
