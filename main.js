class Producto {
    constructor(codigo, producto, descripcion, cantidad, costo){
        this.codigo = codigo
        this.producto = producto
        this.descripcion = descripcion
        this.cantidad = cantidad
        this.costo = costo
        this.siguiente = null
        this.anterior = null
    }

    calcularPrecio(){
        let productos = this.cantidad
        let precioProducto = this.costo
        let total = productos * precioProducto
        return total
    }
}

class Almacen{
    constructor(){
        this.capacidad = []
        this.tamano = 0
        this.inicio = null
        this.final = null
    }
    

    agregarProducto(producto){
        if(this.final == null){
            this.inicio = producto
            this.final = producto
        }else{
            producto.anterior = this.final
            this.final.siguiente = producto
            this.final = producto
        }
        this.tamano++
        return producto.producto
    }

    insertarProducto(producto, posicion){
        if(posicion<0 || posicion > this.tamano){
            return false
        }else{
            let aux = this.inicio
            let anterior
            if(posicion==0){
                producto.siguiente = aux
                aux.anterior = producto
                this.inicio = producto
            } else{
                for(let i=0; i<posicion; i++){
                    anterior = aux
                    aux = aux.siguiente
                }
                producto.siguiente = aux
                producto.anterior = anterior
                anterior.siguiente = producto
                aux.anterior = producto
            }
            this.tamano++
        }
        return producto.producto
    }
    
    borrarInicio(){
        if(this.inicio == null){
            return false
        }else{
            let productoX = this.inicio.producto
            if(this.tamano == 1){
                this.inicio = null
                this.final = null
            }else{
                this.inicio = this.inicio.siguiente
                this.inicio.anterior = null
            }
            this.tamano--
            return productoX
        }
    }

    borrarFinal(){
        if(this.final == null){
            return false
        }else{
            let productoX = this.final.producto
            if(this.tamano == 1){
                this.inicio = null
                this.final = null
            }else{
                this.final = this.final.anterior
                this.final.siguiente = null
            }
            this.tamano--
            return productoX
        }
    }

    buscarProductoID(idProducto){
        let aux = this.inicio
        let anterior = null
        if(idProducto == this.inicio.codigo){
            return aux
        } else if(idProducto == this.final.codigo){
            aux = this.final
            return aux
        } else{
            while(aux !== null){
                if(aux.codigo == idProducto){
                    return aux
                }
                anterior = aux
                aux = aux.siguiente
            }
        }
        return false
    }

    borrarProductoID(idProducto){
        let productoX = this.buscarProductoID(idProducto)
        let aux = this.inicio
        let anterior = null
        if(productoX==this.inicio){
            this.borrarInicio()
            return productoX.producto
        } else if(productoX==this.final){
            this.borrarFinal()
            return productoX.producto
        } else{
            if(productoX !== false){
                anterior = productoX.anterior
                anterior.siguiente = productoX.siguiente
                productoX.siguiente.anterior = anterior
                this.tamano--
                return productoX.producto
            }
        }
        return false
    }

    listarProductos(){
        let aux = this.inicio
        let lista = ""
        while(aux){
            lista += `${aux.producto}, `
            aux = aux.siguiente
        }
        lista += "Fin de la lista"
        return lista
    }

    listarProductosInverso(){
        let aux = this.final
        let lista = ""
        while(aux){
            lista += `${aux.producto}, `
            aux = aux.anterior
        }
        lista += "Fin de la lista"
        return lista
    }

}

let testAlmacen = new Almacen()



let almacen = new Almacen()
var btnAnadir = document.querySelector("#btnAnadir")
btnAnadir.addEventListener('click', () => {
    let codigo = document.querySelector("#codigo").value
    let nombreProducto = document.querySelector("#producto").value
    let descripcion = document.querySelector("#descripcion").value
    let cantidad = Number(document.querySelector("#cantidad")).value
    let precio = Number(document.querySelector("#costo")).value
    let producto = new Producto(codigo, nombreProducto, descripcion, cantidad, precio)
    let mensaje = document.querySelector("#mensajeAnadir")
    let valor = almacen.agregarProducto(producto)
    mensaje.innerHTML = valor + " ha sido añadido al Almacen"
})

var btnCalcular = document.querySelector("#btnCalcular")
btnCalcular.addEventListener('click', () => {
    let codigo = document.querySelector("#codigo").value
    let nombreProducto = document.querySelector("#producto").value
    let descripcion = document.querySelector("#descripcion").value
    let cantidad = document.querySelector("#cantidad").value
    let precio = document.querySelector("#costo").value
    let producto = new Producto(codigo, nombreProducto, descripcion, cantidad, precio)
    let mensaje = document.querySelector("#mensajeAnadir")
    let valor = producto.calcularPrecio()
    mensaje.innerHTML = valor + "$ es el precio total de " + producto.producto
})

var btnInsertar = document.querySelector("#btnInsertar")
btnInsertar.addEventListener('click', () => {
    let codigo = document.querySelector("#codigo").value
    let nombreProducto = document.querySelector("#producto").value
    let descripcion = document.querySelector("#descripcion").value
    let cantidad = document.querySelector("#cantidad").value
    let precio = document.querySelector("#costo").value
    let posicion = document.querySelector("#posicion").value
    let producto = new Producto(codigo, nombreProducto, descripcion, cantidad, precio)
    let mensaje = document.querySelector("#mensajeInsertar")
    let valor = almacen.insertarProducto(producto, posicion)
    if(valor!=false){
        mensaje.innerHTML = valor + " se ha insertado correctamente"
    } else{
        mensaje.innerHTML = "Puso una posición incorrecta"
    }
})

var btnBorrarPrimero = document.querySelector("#btnBorrarPrimero")
btnBorrarPrimero.addEventListener('click', () => {
    let mensaje = document.querySelector("#mensajeBorrarPrimero")
    let valor = almacen.borrarInicio()
    if(valor !== false){
        mensaje.innerHTML = "Se ha eliminado " + valor
    }else{
        mensaje.innerHTML = "El almacen está vacío"
    }
})

var btnBorrar = document.querySelector("#btnBorrar")
btnBorrar.addEventListener('click', () => {
    let mensaje = document.querySelector("#mensajeBorrar")
    let codigo = document.querySelector("#codigoBorrar").value
    let valor = almacen.borrarProductoID(codigo)
    if (valor == false){
        mensaje.innerHTML = "No se econtró el producto"
    }else{
        mensaje.innerHTML = "Se ha eliminado " + valor
    }
})

var btnBuscar = document.querySelector("#btnBuscar")
btnBuscar.addEventListener('click', () => {
    let mensaje = document.querySelector("#mensajeBuscar")
    let codigo = document.querySelector("#codigoBuscar").value
    let valor = almacen.buscarProductoID(codigo).producto
    if (almacen.buscarProductoID(codigo) == false){
        mensaje.innerHTML = "No se econtró el producto"
    }else{
        mensaje.innerHTML = "Se ha encontrado " + valor
    }
    
})

var btnListar = document.querySelector("#btnListar")
btnListar.addEventListener('click', () => {
    let lista1 = document.querySelector("#lista1")
    let nuevoItem = document.createElement('li')
    nuevoItem.textContent = almacen.listarProductos()
    lista1.appendChild(nuevoItem)
})

var btnListarInvertido = document.querySelector("#btnListarInv")
btnListarInvertido.addEventListener('click', () => {
    let lista2 = document.querySelector("#lista2")
    let nuevoItem = document.createElement('li')
    nuevoItem.textContent = almacen.listarProductosInverso()
    lista2.appendChild(nuevoItem)
})

let p1 = new Producto(1334, "sal", "sal de doña pelos", 100, 2)
let p2 = new Producto(1345, "pimienta", "recien molida", 30, 10)
let p3 = new Producto(1231, "ribeye", "marmoleo lvl 5", 10, 500)
let p4 = new Producto(1414, "tbone", "marmoleo lvl 4", 6, 500)

almacen.agregarProducto(p1)
almacen.agregarProducto(p2)
almacen.agregarProducto(p3)
almacen.insertarProducto(p4,1)
