const reservas = [
    {
        tipoHabitacion: "standard",
        desayuno: false,
        pax: 1,
        noches: 3
    },
    {
        tipoHabitacion: "standard",
        desayuno: false,
        pax: 1,
        noches: 4
    },
    {
        tipoHabitacion: "suite",
        desayuno: true,
        pax: 2,
        noches: 1
    }
];



class CalculoGeneral {
    constructor() {
        this._reserva = [];
        this._subtotal = 0;
        this._iva = 1.21;
        this._total = 0;

    }
    calculaSubtotal() {

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
    calculaTotal() {
        return this._total = this._subtotal * this._iva;
    }
    calculaPax(personas) {
        return (personas > 1 ? (personas - 1) * 40 : 0)
    }
    calculaDesayuno(desayuno, personas, noches) {
        return desayuno ? (15 * personas * noches) : 0;
    }
}


class CalculoHabitacion extends CalculoGeneral {

    constructor() {
        super();
    }

    calculaSubtotal() {
        this._subtotal = reservas.reduce((acumulado, lineaReserva) =>
            acumulado + lineaReserva.noches * (
                (this.calculaPax(lineaReserva.pax))
                + this.calculaDesayuno(lineaReserva.desayuno, lineaReserva.pax, lineaReserva.noches)
                + (lineaReserva.tipoHabitacion === "standard" ? 100 + (this.calculaPax(lineaReserva.pax)) : 150)), 0);
    }
}

const precioHotel = new CalculoHabitacion();

precioHotel.reservas = reservas;
console.log("Subtotal:", precioHotel.subtotal);
console.log("Total:", precioHotel.total);


class TourOperador extends CalculoGeneral {
    constructor() {
        super();
        this._descuento = 0.15;
    }

    calculaSubtotal() {
        this._subtotal = reservas.reduce((acumulado, lineaReserva) =>
            acumulado + lineaReserva.noches * (
             (this.calculaPax(lineaReserva.pax))
             + this.calculaDesayuno(lineaReserva.desayuno, lineaReserva.pax, lineaReserva.noches)
             + 100), 0);
    }

    calculaTotal() {
        return this._total = super.calculaTotal() * (1 - this._descuento);
    }
}

const tourOperador = new TourOperador();
tourOperador.reservas = reservas;
console.log("Subtotal Tour:", tourOperador.subtotal);
console.log("Total Tour:", tourOperador.total);
