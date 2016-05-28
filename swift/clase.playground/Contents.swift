//: Playground - noun: a place where people can play

import UIKit

class prueba {
    var atributo = "hola soy un atributo"
    func primero (){
        var atributo = "sobreescribiendo"
        print("Ejecutando primero y el atributo global es \(self.atributo) y el sobreescrimiento \(atributo)")
    }
}



var instancia = prueba();
instancia.primero()