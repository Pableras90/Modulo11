const reservas = [
    {
        tipoHabitacion: "standard",
        pax: 1,
        noches: 3
    },
    {
        tipoHabitacion: "standard",
        pax: 1,
        noches: 4
    },
    {
        tipoHabitacion: "suite",
        pax: 2,
        noches: 1
    }
];

//Caso 1
//"standar"=100; "suite=150";
//+1 Pax=40€
// iva=subtotal + 21%;




class CalculoHabitacion {

    constructor() {
        this._reserva = [];
        this._subtotal = 0;
        this._iva = 1.21;
        this._total = 0;

    }

    calculaSubtotal() {
        this._subtotal = reservas.reduce((acumulado, lineaReserva) => acumulado + (lineaReserva.noches * (lineaReserva.pax * (lineaReserva.tipoHabitacion === "standard" ? 100 : 150))), 0);
    }
    calculaTotal() {
        return this._total = this._subtotal * this._iva;
    }

    get total() {
        return this._total;
    }
    get subtotal() {
        return this._subtotal;
    }
    set reservas(reservaHotel) {
        this._reserva = reservaHotel;
        this.calculaSubtotal();
        this.calculaTotal();
    }


}

const precioHotel = new CalculoHabitacion();

precioHotel.reservas = reservas;
console.log("subtotal:", precioHotel.total)